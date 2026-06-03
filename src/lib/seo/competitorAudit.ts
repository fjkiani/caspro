/**
 * competitorAudit.ts
 *
 * Competitor intelligence engine for CrisPRO SEO platform.
 *
 * Live data sources:
 *   - Similarweb Insights (RAPIDAPI_SIMILARWEB_KEY)
 *   - Domain Metrics Check / Ahrefs+Moz+Majestic (RAPIDAPI_DOMAIN_METRICS_KEY)
 *   - SEO - Get competitors ranking keywords (RAPIDAPI_COMPETITOR_KEYWORDS_KEY)
 *   - SEO tools - Historical Website Traffic (RAPIDAPI_HISTORICAL_TRAFFIC_KEY)
 *
 * Falls back to seed data from competitors.ts when APIs are unavailable.
 */

import { COMPETITORS, CompetitorProfile, getCompetitorsByAIVisibility } from '@/data/seo/competitors';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LiveDomainMetrics {
  domain: string;
  ahrefs_dr: number;
  moz_da: number;
  moz_pa: number;
  majestic_tf: number;
  majestic_cf: number;
  backlinks: number;
  referring_domains: number;
  organic_keywords: number;
  monthly_organic_traffic: number;
  source: 'live' | 'seed';
  fetchedAt: string;
}

export interface LiveTrafficData {
  domain: string;
  monthly_visits: number;
  avg_visit_duration: string;
  pages_per_visit: number;
  bounce_rate: number;
  top_countries: { country: string; share: number }[];
  traffic_sources: {
    direct: number;
    search: number;
    social: number;
    referral: number;
    email: number;
    paid: number;
  };
  top_keywords: { keyword: string; share: number }[];
  source: 'live' | 'seed';
  fetchedAt: string;
}

export interface CompetitorKeywordGap {
  keyword: string;
  competitor_position: number;
  competitor_domain: string;
  crispro_position: number | null;
  volume: number;
  difficulty: number;
  opportunity: 'steal' | 'compete' | 'monitor';
}

export interface CompetitorAuditReport {
  domain: string;
  competitor: CompetitorProfile;
  metrics: LiveDomainMetrics;
  traffic: LiveTrafficData;
  keyword_gaps: CompetitorKeywordGap[];
  crispro_advantages: string[];
  recommended_actions: string[];
  threat_level: 'high' | 'medium' | 'low';
}

// ── API Configuration ─────────────────────────────────────────────────────────

const RAPIDAPI_HOST_SIMILARWEB = 'similarweb-insights.p.rapidapi.com';
const RAPIDAPI_HOST_DOMAIN_METRICS = 'domain-metrics-check.p.rapidapi.com';
const RAPIDAPI_HOST_COMPETITOR_KW = 'seo-get-competitors-ranking-keywords.p.rapidapi.com';
const RAPIDAPI_HOST_HISTORICAL = 'seo-tools-historical-website-traffic.p.rapidapi.com';

const getHeaders = (apiKey: string, host: string) => ({
  'X-RapidAPI-Key': apiKey,
  'X-RapidAPI-Host': host,
  'Content-Type': 'application/json',
});

// ── Similarweb Traffic Data ───────────────────────────────────────────────────

export async function fetchSimilarwebTraffic(domain: string): Promise<LiveTrafficData | null> {
  const apiKey = process.env.RAPIDAPI_SIMILARWEB_KEY;
  if (!apiKey) {
    console.warn('[competitorAudit] RAPIDAPI_SIMILARWEB_KEY not set — using seed data');
    return null;
  }

  try {
    const url = `https://${RAPIDAPI_HOST_SIMILARWEB}/traffic`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...getHeaders(apiKey, RAPIDAPI_HOST_SIMILARWEB),
        domain,
      },
    });

    if (!response.ok) {
      console.error(`[competitorAudit] Similarweb API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      domain,
      monthly_visits: data?.visits || data?.monthly_visits || 0,
      avg_visit_duration: data?.avg_visit_duration || '0:00',
      pages_per_visit: data?.pages_per_visit || 0,
      bounce_rate: data?.bounce_rate || 0,
      top_countries: data?.top_countries || [],
      traffic_sources: {
        direct: data?.traffic_sources?.direct || 0,
        search: data?.traffic_sources?.search || 0,
        social: data?.traffic_sources?.social || 0,
        referral: data?.traffic_sources?.referral || 0,
        email: data?.traffic_sources?.email || 0,
        paid: data?.traffic_sources?.paid || 0,
      },
      top_keywords: data?.top_keywords || [],
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[competitorAudit] Similarweb fetch failed:', err);
    return null;
  }
}

// ── Domain Metrics (Ahrefs DR, Moz DA, Majestic TF) ─────────────────────────

export async function fetchDomainMetrics(domain: string): Promise<LiveDomainMetrics | null> {
  const apiKey = process.env.RAPIDAPI_DOMAIN_METRICS_KEY;
  if (!apiKey) {
    console.warn('[competitorAudit] RAPIDAPI_DOMAIN_METRICS_KEY not set — using seed data');
    return null;
  }

  try {
    const url = `https://${RAPIDAPI_HOST_DOMAIN_METRICS}/metrics`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...getHeaders(apiKey, RAPIDAPI_HOST_DOMAIN_METRICS),
        domain,
      },
    });

    if (!response.ok) {
      console.error(`[competitorAudit] Domain Metrics API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      domain,
      ahrefs_dr: data?.ahrefs?.domain_rating || data?.dr || 0,
      moz_da: data?.moz?.domain_authority || data?.da || 0,
      moz_pa: data?.moz?.page_authority || data?.pa || 0,
      majestic_tf: data?.majestic?.trust_flow || data?.tf || 0,
      majestic_cf: data?.majestic?.citation_flow || data?.cf || 0,
      backlinks: data?.backlinks || 0,
      referring_domains: data?.referring_domains || 0,
      organic_keywords: data?.organic_keywords || 0,
      monthly_organic_traffic: data?.organic_traffic || 0,
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[competitorAudit] Domain Metrics fetch failed:', err);
    return null;
  }
}

// ── Competitor Keyword Gaps ───────────────────────────────────────────────────

export async function fetchCompetitorKeywords(
  competitorDomain: string,
  limit: number = 50
): Promise<CompetitorKeywordGap[]> {
  const apiKey = process.env.RAPIDAPI_COMPETITOR_KEYWORDS_KEY;
  if (!apiKey) {
    console.warn('[competitorAudit] RAPIDAPI_COMPETITOR_KEYWORDS_KEY not set');
    return [];
  }

  try {
    const url = `https://${RAPIDAPI_HOST_COMPETITOR_KW}/keywords`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...getHeaders(apiKey, RAPIDAPI_HOST_COMPETITOR_KW),
        domain: competitorDomain,
        limit: String(limit),
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const keywords = data?.keywords || data?.data || [];

    return keywords.map((kw: {
      keyword: string;
      position: number;
      volume: number;
      difficulty: number;
    }) => ({
      keyword: kw.keyword,
      competitor_position: kw.position,
      competitor_domain: competitorDomain,
      crispro_position: null, // Will be filled by SERP check
      volume: kw.volume || 0,
      difficulty: kw.difficulty || 0,
      opportunity: classifyOpportunity(kw.position, kw.difficulty),
    }));
  } catch (err) {
    console.error('[competitorAudit] Competitor keywords fetch failed:', err);
    return [];
  }
}

function classifyOpportunity(
  competitorPosition: number,
  difficulty: number
): CompetitorKeywordGap['opportunity'] {
  if (competitorPosition > 5 && difficulty < 40) return 'steal';
  if (competitorPosition <= 5 && difficulty < 60) return 'compete';
  return 'monitor';
}

// ── Seed data fallback ────────────────────────────────────────────────────────

function buildSeedMetrics(competitor: CompetitorProfile): LiveDomainMetrics {
  return {
    domain: competitor.domain,
    ahrefs_dr: competitor.seo.domainRating,
    moz_da: competitor.seo.domainAuthority,
    moz_pa: competitor.seo.domainAuthority - 5,
    majestic_tf: competitor.seo.trustFlow,
    majestic_cf: competitor.seo.trustFlow + 10,
    backlinks: competitor.seo.backlinks,
    referring_domains: competitor.seo.referringDomains,
    organic_keywords: competitor.seo.organicKeywords,
    monthly_organic_traffic: competitor.seo.monthlyOrganicTraffic,
    source: 'seed',
    fetchedAt: new Date().toISOString(),
  };
}

function buildSeedTraffic(competitor: CompetitorProfile): LiveTrafficData {
  return {
    domain: competitor.domain,
    monthly_visits: competitor.seo.monthlyOrganicTraffic,
    avg_visit_duration: '2:30',
    pages_per_visit: 3.2,
    bounce_rate: 0.62,
    top_countries: [
      { country: 'United States', share: 0.45 },
      { country: 'United Kingdom', share: 0.12 },
      { country: 'Germany', share: 0.08 },
    ],
    traffic_sources: {
      direct: 0.35,
      search: 0.42,
      social: 0.08,
      referral: 0.10,
      email: 0.03,
      paid: 0.02,
    },
    top_keywords: competitor.topKeywords.map(k => ({
      keyword: k.keyword,
      share: k.traffic / competitor.seo.monthlyOrganicTraffic,
    })),
    source: 'seed',
    fetchedAt: new Date().toISOString(),
  };
}

// ── Full competitor audit ─────────────────────────────────────────────────────

export async function auditCompetitor(competitorId: string): Promise<CompetitorAuditReport | null> {
  const competitor = COMPETITORS.find(c => c.id === competitorId);
  if (!competitor) return null;

  // Fetch live data (falls back to seed if API keys not set)
  const [liveMetrics, liveTraffic, keywordGaps] = await Promise.all([
    fetchDomainMetrics(competitor.domain),
    fetchSimilarwebTraffic(competitor.domain),
    fetchCompetitorKeywords(competitor.domain),
  ]);

  const metrics = liveMetrics || buildSeedMetrics(competitor);
  const traffic = liveTraffic || buildSeedTraffic(competitor);

  // Determine threat level
  const threatLevel: CompetitorAuditReport['threat_level'] =
    metrics.moz_da > 60 ? 'high' :
    metrics.moz_da > 45 ? 'medium' : 'low';

  // Generate recommended actions
  const recommendedActions: string[] = [];

  if (keywordGaps.filter(k => k.opportunity === 'steal').length > 0) {
    recommendedActions.push(
      `Target ${keywordGaps.filter(k => k.opportunity === 'steal').length} keywords where ${competitor.name} ranks 6-20 with difficulty < 40`
    );
  }

  competitor.weaknesses.forEach(weakness => {
    recommendedActions.push(`Create content addressing: ${weakness}`);
  });

  return {
    domain: competitor.domain,
    competitor,
    metrics,
    traffic,
    keyword_gaps: keywordGaps,
    crispro_advantages: [competitor.crispro_advantage],
    recommended_actions: recommendedActions,
    threat_level: threatLevel,
  };
}

// ── Competitive landscape summary ─────────────────────────────────────────────

export async function generateCompetitiveLandscape(): Promise<{
  competitors: CompetitorAuditReport[];
  crispro_position: string;
  top_opportunities: CompetitorKeywordGap[];
  ai_visibility_ranking: CompetitorProfile[];
}> {
  const audits = await Promise.all(
    COMPETITORS.map(c => auditCompetitor(c.id))
  );

  const validAudits = audits.filter(Boolean) as CompetitorAuditReport[];

  // Collect all steal opportunities across competitors
  const allOpportunities = validAudits
    .flatMap(a => a.keyword_gaps.filter(k => k.opportunity === 'steal'))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 20);

  return {
    competitors: validAudits,
    crispro_position: 'Not yet ranking for primary category terms — significant opportunity',
    top_opportunities: allOpportunities,
    ai_visibility_ranking: getCompetitorsByAIVisibility(),
  };
}
