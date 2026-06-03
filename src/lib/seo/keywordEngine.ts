/**
 * keywordEngine.ts
 *
 * Keyword intelligence engine for CrisPRO SEO platform.
 *
 * Live data sources:
 *   Semrush Keyword Magic Tool
 *     GET https://semrush-keyword-magic-tool.p.rapidapi.com/global-volume?keyword=<kw>&country=us
 *     GET https://semrush-keyword-magic-tool.p.rapidapi.com/questions?keyword=<kw>&country=us
 *
 *   Google Keyword Insight (google-keyword-insight1)
 *     GET https://google-keyword-insight1.p.rapidapi.com/keysuggest/?keyword=<kw>&location=United+States&lang=en
 *     GET https://google-keyword-insight1.p.rapidapi.com/questions/?keyword=<kw>&location=United+States&lang=en
 *     GET https://google-keyword-insight1.p.rapidapi.com/topkeyword/?keyword=<kw>&location=United+States&lang=en
 *
 * All APIs share the same RapidAPI key (RAPIDAPI_KEY).
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
  source: 'semrush' | 'google' | 'seed';
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

export interface SERPResult {
  position: number;
  url: string;
  title: string;
  domain: string;
  type: 'organic' | 'featured_snippet' | 'ai_overview' | 'paid';
}

// ── Shared API config ─────────────────────────────────────────────────────────

// All RapidAPI tools share one key — set RAPIDAPI_KEY in .env.local
const RAPIDAPI_KEY = () => process.env.RAPIDAPI_KEY || '';

const SEMRUSH_HOST = 'semrush-keyword-magic-tool.p.rapidapi.com';
const GOOGLE_KW_HOST = 'google-keyword-insight1.p.rapidapi.com';

const headers = (host: string) => ({
  'x-rapidapi-key': RAPIDAPI_KEY(),
  'x-rapidapi-host': host,
  'Content-Type': 'application/json',
});

// ── Semrush Keyword Magic Tool ────────────────────────────────────────────────
// GET /global-volume?keyword=ai+tools&country=us
// GET /questions?keyword=ai+tools&country=us

export async function fetchSemrushGlobalVolume(
  keyword: string,
  country: string = 'us'
): Promise<LiveKeywordData | null> {
  if (!RAPIDAPI_KEY()) {
    console.warn('[keywordEngine] RAPIDAPI_KEY not set — using seed data');
    return null;
  }

  try {
    const params = new URLSearchParams({ keyword, country });
    const url = `https://${SEMRUSH_HOST}/global-volume?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(SEMRUSH_HOST),
    });

    if (!response.ok) {
      console.error(`[keywordEngine] Semrush global-volume error: ${response.status} ${await response.text()}`);
      return null;
    }

    const data = await response.json();

    // Semrush global-volume response shape:
    // { keyword, volume, cpc, competition, trend: [...], keyword_difficulty, ... }
    return {
      keyword,
      volume: data?.volume || data?.search_volume || 0,
      difficulty: data?.keyword_difficulty || data?.difficulty || 0,
      cpc: data?.cpc || 0,
      trend: Array.isArray(data?.trend) ? data.trend : [],
      serp_features: data?.serp_features || [],
      related_keywords: [],
      questions: [],
      source: 'semrush',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[keywordEngine] Semrush global-volume failed:', err);
    return null;
  }
}

export async function fetchSemrushQuestions(
  keyword: string,
  country: string = 'us'
): Promise<string[]> {
  if (!RAPIDAPI_KEY()) return [];

  try {
    const params = new URLSearchParams({ keyword, country });
    const url = `https://${SEMRUSH_HOST}/questions?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(SEMRUSH_HOST),
    });

    if (!response.ok) return [];

    const data = await response.json();
    // Response: array of { keyword, volume, ... } question-format keywords
    const items = Array.isArray(data) ? data : (data?.data || []);
    return items.map((item: { keyword: string }) => item.keyword).slice(0, 20);
  } catch (err) {
    console.error('[keywordEngine] Semrush questions failed:', err);
    return [];
  }
}

// ── Google Keyword Insight ────────────────────────────────────────────────────
// GET /keysuggest/?keyword=<kw>&location=United+States&lang=en
// GET /questions/?keyword=<kw>&location=United+States&lang=en
// GET /topkeyword/?keyword=<kw>&location=United+States&lang=en

export async function fetchGoogleKeywordSuggestions(
  keyword: string,
  location: string = 'United States',
  lang: string = 'en'
): Promise<LiveKeywordData | null> {
  if (!RAPIDAPI_KEY()) {
    console.warn('[keywordEngine] RAPIDAPI_KEY not set — using seed data');
    return null;
  }

  try {
    const params = new URLSearchParams({ keyword, location, lang });
    const url = `https://${GOOGLE_KW_HOST}/keysuggest/?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(GOOGLE_KW_HOST),
    });

    if (!response.ok) {
      console.error(`[keywordEngine] Google KW keysuggest error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    // Response: array of { keyword, search_volume, competition, cpc, ... }
    const items = Array.isArray(data) ? data : [];
    const primary = items[0];

    if (!primary) return null;

    return {
      keyword,
      volume: primary?.search_volume || primary?.volume || 0,
      difficulty: primary?.competition_index || primary?.competition || 0,
      cpc: primary?.cpc || primary?.high_top_of_page_bid || 0,
      trend: primary?.monthly_search_volumes?.map((m: { search_volume: number }) => m.search_volume) || [],
      serp_features: [],
      related_keywords: items.slice(1, 8).map((k: { keyword: string }) => k.keyword),
      questions: [],
      source: 'google',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[keywordEngine] Google KW keysuggest failed:', err);
    return null;
  }
}

export async function fetchGoogleQuestions(
  keyword: string,
  location: string = 'United States',
  lang: string = 'en'
): Promise<string[]> {
  if (!RAPIDAPI_KEY()) return [];

  try {
    const params = new URLSearchParams({ keyword, location, lang });
    const url = `https://${GOOGLE_KW_HOST}/questions/?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(GOOGLE_KW_HOST),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const items = Array.isArray(data) ? data : [];
    return items.map((k: { keyword: string }) => k.keyword).slice(0, 20);
  } catch (err) {
    console.error('[keywordEngine] Google KW questions failed:', err);
    return [];
  }
}

export async function fetchGoogleTopKeywords(
  keyword: string,
  location: string = 'United States',
  lang: string = 'en'
): Promise<LiveKeywordData[]> {
  if (!RAPIDAPI_KEY()) return [];

  try {
    const params = new URLSearchParams({ keyword, location, lang });
    const url = `https://${GOOGLE_KW_HOST}/topkeyword/?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(GOOGLE_KW_HOST),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const items = Array.isArray(data) ? data : [];

    return items.map((k: { keyword: string; search_volume?: number; volume?: number; competition?: number; cpc?: number }) => ({
      keyword: k.keyword,
      volume: k.search_volume || k.volume || 0,
      difficulty: k.competition || 0,
      cpc: k.cpc || 0,
      trend: [],
      serp_features: [],
      related_keywords: [],
      questions: [],
      source: 'google' as const,
      fetchedAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error('[keywordEngine] Google KW topkeyword failed:', err);
    return [];
  }
}

// ── Unified keyword enrichment ────────────────────────────────────────────────

export async function enrichKeyword(keyword: string): Promise<LiveKeywordData> {
  // Try Semrush first (most accurate volume + difficulty), fall back to Google, then seed
  const semrush = await fetchSemrushGlobalVolume(keyword);
  if (semrush) {
    // Augment with questions from Google
    const questions = await fetchGoogleQuestions(keyword);
    return { ...semrush, questions };
  }

  const google = await fetchGoogleKeywordSuggestions(keyword);
  if (google) {
    const questions = await fetchGoogleQuestions(keyword);
    return { ...google, questions };
  }

  // Seed data fallback
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

  for (let i = 0; i < keywords.length; i += concurrency) {
    const chunk = keywords.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(kw => enrichKeyword(kw)));
    results.push(...chunkResults);

    // Respect RapidAPI rate limits between chunks
    if (i + concurrency < keywords.length) {
      await new Promise(resolve => setTimeout(resolve, 1200));
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
  const intentMultiplier = {
    transactional: 3,
    commercial: 2,
    informational: 1,
    navigational: 1.5,
  }[kw.intent];

  const raw = (kw.crispro_relevance * kw.monthlyVolume * intentMultiplier) / (kw.difficulty + 1);
  return Math.min(100, Math.round(raw / 1000));
}
