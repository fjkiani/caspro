/**
 * keywordEngine.ts
 *
 * Keyword intelligence engine for CrisPRO SEO platform.
 *
 * Live data sources (wire API keys via environment variables):
 *   - Semrush Keyword Magic Tool (RAPIDAPI_SEMRUSH_KEY)
 *   - Google Keyword Insight by Hexaplay (RAPIDAPI_GOOGLE_KEYWORD_KEY)
 *   - SEO Keyword Research by VebAPI (RAPIDAPI_VEBAPI_KEY)
 *   - Answer The Public by Csequery (RAPIDAPI_ATP_KEY)
 *
 * Falls back to seed data from crispro-keywords.ts when APIs are unavailable.
 */

import { CRISPRO_KEYWORDS, Keyword, getQuickWins, getCriticalGaps } from '@/data/seo/crispro-keywords';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LiveKeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: number[];           // 12-month search volume trend
  serp_features: string[];   // 'featured_snippet', 'people_also_ask', 'ai_overview', etc.
  related_keywords: string[];
  questions: string[];       // "People also ask" questions
  source: 'semrush' | 'google' | 'vebapi' | 'seed';
  fetchedAt: string;
}

export interface KeywordGapReport {
  crispro_missing: Keyword[];
  quick_wins: Keyword[];
  critical_gaps: Keyword[];
  total_opportunity_volume: number;
  avg_difficulty: number;
  recommended_content_order: Keyword[];
}

export interface SERPAnalysis {
  keyword: string;
  top10: SERPResult[];
  ai_overview_present: boolean;
  featured_snippet: boolean;
  people_also_ask: string[];
  crispro_position: number | null;
}

export interface SERPResult {
  position: number;
  url: string;
  title: string;
  domain: string;
  type: 'organic' | 'featured_snippet' | 'ai_overview' | 'paid';
}

// ── API Configuration ─────────────────────────────────────────────────────────

const RAPIDAPI_HOST_SEMRUSH = 'semrush-keyword-magic-tool.p.rapidapi.com';
const RAPIDAPI_HOST_GOOGLE_KW = 'google-keyword-insight1.p.rapidapi.com';
const RAPIDAPI_HOST_VEBAPI = 'seo-keyword-research.p.rapidapi.com';
const RAPIDAPI_HOST_ATP = 'answer-the-public.p.rapidapi.com';

const getHeaders = (apiKey: string, host: string) => ({
  'X-RapidAPI-Key': apiKey,
  'X-RapidAPI-Host': host,
  'Content-Type': 'application/json',
});

// ── Semrush Keyword Magic Tool ────────────────────────────────────────────────

export async function fetchSemrushKeywordData(
  keyword: string,
  database: string = 'us'
): Promise<LiveKeywordData | null> {
  const apiKey = process.env.RAPIDAPI_SEMRUSH_KEY;
  if (!apiKey) {
    console.warn('[keywordEngine] RAPIDAPI_SEMRUSH_KEY not set — using seed data');
    return null;
  }

  try {
    const url = `https://${RAPIDAPI_HOST_SEMRUSH}/keywords`;
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(apiKey, RAPIDAPI_HOST_SEMRUSH),
      body: JSON.stringify({
        keyword,
        database,
        limit: 10,
        sort_by: 'search_volume',
      }),
    });

    if (!response.ok) {
      console.error(`[keywordEngine] Semrush API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Normalize Semrush response shape
    const kw = data?.data?.[0] || data;
    return {
      keyword,
      volume: kw.search_volume || kw.volume || 0,
      difficulty: kw.keyword_difficulty || kw.difficulty || 0,
      cpc: kw.cpc || 0,
      trend: kw.trend || [],
      serp_features: kw.serp_features || [],
      related_keywords: (data?.data || []).slice(1, 6).map((k: { keyword: string }) => k.keyword),
      questions: [],
      source: 'semrush',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[keywordEngine] Semrush fetch failed:', err);
    return null;
  }
}

// ── Google Keyword Insight ────────────────────────────────────────────────────

export async function fetchGoogleKeywordData(
  keyword: string,
  location: string = 'United States',
  language: string = 'English'
): Promise<LiveKeywordData | null> {
  const apiKey = process.env.RAPIDAPI_GOOGLE_KEYWORD_KEY;
  if (!apiKey) {
    console.warn('[keywordEngine] RAPIDAPI_GOOGLE_KEYWORD_KEY not set — using seed data');
    return null;
  }

  try {
    const url = `https://${RAPIDAPI_HOST_GOOGLE_KW}/keysuggest`;
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(apiKey, RAPIDAPI_HOST_GOOGLE_KW),
      body: JSON.stringify({ keyword, location, language }),
    });

    if (!response.ok) {
      console.error(`[keywordEngine] Google Keyword API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const kw = Array.isArray(data) ? data[0] : data;

    return {
      keyword,
      volume: kw?.search_volume || kw?.avg_monthly_searches || 0,
      difficulty: kw?.competition_index || 0,
      cpc: kw?.high_top_of_page_bid || kw?.cpc || 0,
      trend: kw?.monthly_search_volumes?.map((m: { search_volume: number }) => m.search_volume) || [],
      serp_features: [],
      related_keywords: (Array.isArray(data) ? data.slice(1, 6) : []).map((k: { keyword: string }) => k.keyword),
      questions: [],
      source: 'google',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[keywordEngine] Google Keyword fetch failed:', err);
    return null;
  }
}

// ── Answer The Public (question keywords) ────────────────────────────────────

export async function fetchQuestionKeywords(
  keyword: string,
  country: string = 'us'
): Promise<string[]> {
  const apiKey = process.env.RAPIDAPI_ATP_KEY;
  if (!apiKey) {
    console.warn('[keywordEngine] RAPIDAPI_ATP_KEY not set');
    return [];
  }

  try {
    const url = `https://${RAPIDAPI_HOST_ATP}/search`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(apiKey, RAPIDAPI_HOST_ATP),
    });

    if (!response.ok) return [];

    const data = await response.json();
    // Extract question-format keywords
    const questions: string[] = [];
    const questionTypes = ['what', 'how', 'why', 'when', 'where', 'which', 'who', 'will', 'can'];

    for (const type of questionTypes) {
      const group = data?.data?.[type]?.list || [];
      questions.push(...group.map((item: { query: string }) => item.query));
    }

    return questions.slice(0, 20);
  } catch (err) {
    console.error('[keywordEngine] ATP fetch failed:', err);
    return [];
  }
}

// ── Unified keyword enrichment ────────────────────────────────────────────────

export async function enrichKeyword(keyword: string): Promise<LiveKeywordData> {
  // Try Semrush first, fall back to Google, then seed data
  const semrush = await fetchSemrushKeywordData(keyword);
  if (semrush) return semrush;

  const google = await fetchGoogleKeywordData(keyword);
  if (google) return google;

  // Fall back to seed data
  const seed = CRISPRO_KEYWORDS.find(k => k.keyword.toLowerCase() === keyword.toLowerCase());
  return {
    keyword,
    volume: seed?.monthlyVolume || 0,
    difficulty: seed?.difficulty || 0,
    cpc: seed?.cpc || 0,
    trend: [],
    serp_features: [],
    related_keywords: [],
    questions: [],
    source: 'seed',
    fetchedAt: new Date().toISOString(),
  };
}

// ── Batch enrichment ──────────────────────────────────────────────────────────

export async function enrichKeywordBatch(
  keywords: string[],
  concurrency: number = 3
): Promise<LiveKeywordData[]> {
  const results: LiveKeywordData[] = [];

  // Process in chunks to respect rate limits
  for (let i = 0; i < keywords.length; i += concurrency) {
    const chunk = keywords.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(kw => enrichKeyword(kw)));
    results.push(...chunkResults);

    // Rate limit pause between chunks
    if (i + concurrency < keywords.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// ── Gap analysis ──────────────────────────────────────────────────────────────

export function generateKeywordGapReport(): KeywordGapReport {
  const missing = CRISPRO_KEYWORDS.filter(k => k.crispro_current_rank === null);
  const quickWins = getQuickWins();
  const criticalGaps = getCriticalGaps();

  const totalVolume = missing.reduce((sum, k) => sum + k.monthlyVolume, 0);
  const avgDifficulty = missing.length > 0
    ? Math.round(missing.reduce((sum, k) => sum + k.difficulty, 0) / missing.length)
    : 0;

  // Prioritize: high relevance × high volume × low difficulty
  const recommended = [...missing].sort((a, b) => {
    const scoreA = (a.crispro_relevance * a.monthlyVolume) / (a.difficulty + 1);
    const scoreB = (b.crispro_relevance * b.monthlyVolume) / (b.difficulty + 1);
    return scoreB - scoreA;
  });

  return {
    crispro_missing: missing,
    quick_wins: quickWins,
    critical_gaps: criticalGaps,
    total_opportunity_volume: totalVolume,
    avg_difficulty: avgDifficulty,
    recommended_content_order: recommended.slice(0, 20),
  };
}

// ── Keyword cluster grouping ──────────────────────────────────────────────────

export function groupKeywordsByCluster(): Record<string, Keyword[]> {
  return CRISPRO_KEYWORDS.reduce((acc, kw) => {
    if (!acc[kw.category]) acc[kw.category] = [];
    acc[kw.category].push(kw);
    return acc;
  }, {} as Record<string, Keyword[]>);
}

// ── Opportunity score ─────────────────────────────────────────────────────────

export function calculateOpportunityScore(kw: Keyword): number {
  // Score = (relevance × volume) / (difficulty + 1) × intent_multiplier
  const intentMultiplier = {
    transactional: 3,
    commercial: 2,
    informational: 1,
    navigational: 1.5,
  }[kw.intent];

  const raw = (kw.crispro_relevance * kw.monthlyVolume * intentMultiplier) / (kw.difficulty + 1);
  // Normalize to 0-100
  return Math.min(100, Math.round(raw / 1000));
}
