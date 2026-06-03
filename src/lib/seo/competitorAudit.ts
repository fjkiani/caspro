/**
 * competitorAudit.ts
 *
 * Competitor intelligence engine for CrisPRO SEO platform.
 *
 * Live data sources:
 *   Similarweb Insights
 *     GET https://similarweb-insights.p.rapidapi.com/seo?domain=<domain>
 *     GET https://similarweb-insights.p.rapidapi.com/traffic?domain=<domain>
 *     GET https://similarweb-insights.p.rapidapi.com/all-insights?domain=<domain>
 *
 *   Domain Metrics Check (Ahrefs DR + Moz DA + Majestic TF)
 *     GET https://domain-metrics-check.p.rapidapi.com/domain-metrics/<domain>/
 *
 * All APIs share RAPIDAPI_KEY.
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

export interface LiveSEOData {
  domain: string;
  organic_traffic: number;
  organic_keywords: number;
  paid_traffic: number;
  backlinks: number;
  referring_domains: number;
  top_organic_keywords: { keyword: string; position: number; traffic: number }[];
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
  seo: LiveSEOData;
  crispro_advantages: string[];
  recommended_actions: string[];
  threat_level: 'high' | 'medium' | 'low';
}

// ── Shared API config ─────────────────────────────────────────────────────────

const RAPIDAPI_KEY = () => process.env.RAPIDAPI_KEY || '';

const SIMILARWEB_HOST = 'similarweb-insights.p.rapidapi.com';
const DOMAIN_METRICS_HOST = 'domain-metrics-check.p.rapidapi.com';

const headers = (host: string) => ({
  'x-rapidapi-key': RAPIDAPI_KEY(),
  'x-rapidapi-host': host,
  'Content-Type': 'application/json',
});

// ── Similarweb SEO endpoint ───────────────────────────────────────────────────
// GET https://similarweb-insights.p.rapidapi.com/seo?domain=teamtrees.org

export async function fetchSimilarwebSEO(domain: string): Promise<LiveSEOData | null> {
  if (!RAPIDAPI_KEY()) {
    console.warn('[competitorAudit] RAPIDAPI_KEY not set — using seed data');
    return null;
  }

  try {
    const params = new URLSearchParams({ domain });
    const url = `https://${SIMILARWEB_HOST}/seo?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(SIMILARWEB_HOST),
    });

    if (!response.ok) {
      console.error(`[competitorAudit] Similarweb SEO error: ${response.status} ${await response.text()}`);
      return null;
    }

    const data = await response.json();

    // Similarweb SEO response shape (varies — normalize defensively)
    return {
      domain,
      organic_traffic: data?.organic_search?.traffic || data?.organicTraffic || data?.organic_traffic || 0,
      organic_keywords: data?.organic_search?.keywords || data?.organicKeywords || 0,
      paid_traffic: data?.paid_search?.traffic || data?.paidTraffic || 0,
      backlinks: data?.backlinks?.total || data?.backlinks || 0,
      referring_domains: data?.backlinks?.referring_domains || data?.referringDomains || 0,
      top_organic_keywords: (data?.organic_search?.top_keywords || data?.topKeywords || [])
        .slice(0, 10)
        .map((k: { keyword?: string; name?: string; position?: number; rank?: number; traffic?: number; visits?: number }) => ({
          keyword: k.keyword || k.name || '',
          position: k.position || k.rank || 0,
          traffic: k.traffic || k.visits || 0,
        })),
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[competitorAudit] Similarweb SEO failed:', err);
    return null;
  }
}

// ── Similarweb Traffic endpoint ───────────────────────────────────────────────
// GET https://similarweb-insights.p.rapidapi.com/traffic?domain=<domain>

export async function fetchSimilarwebTraffic(domain: string): Promise<LiveTrafficData | null> {
  if (!RAPIDAPI_KEY()) return null;

  try {
    const params = new URLSearchParams({ domain });
    const url = `https://${SIMILARWEB_HOST}/traffic?${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(SIMILARWEB_HOST),
    });

    if (!response.ok) {
      console.error(`[competitorAudit] Similarweb traffic error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    return {
      domain,
      monthly_visits: data?.visits || data?.monthly_visits || data?.totalVisits || 0,
      avg_visit_duration: data?.avg_visit_duration || data?.avgVisitDuration || '0:00',
      pages_per_visit: data?.pages_per_visit || data?.pagesPerVisit || 0,
      bounce_rate: data?.bounce_rate || data?.bounceRate || 0,
      top_countries: (data?.top_countries || data?.topCountries || [])
        .slice(0, 5)
        .map((c: { country?: string; name?: string; share?: number; value?: number }) => ({
          country: c.country || c.name || '',
          share: c.share || c.value || 0,
        })),
      traffic_sources: {
        direct: data?.traffic_sources?.direct || data?.trafficSources?.direct || 0,
        search: data?.traffic_sources?.search || data?.trafficSources?.organicSearch || 0,
        social: data?.traffic_sources?.social || data?.trafficSources?.social || 0,
        referral: data?.traffic_sources?.referral || data?.trafficSources?.referrals || 0,
        email: data?.traffic_sources?.email || data?.trafficSources?.mail || 0,
        paid: data?.traffic_sources?.paid || data?.trafficSources?.paidSearch || 0,
      },
      top_keywords: (data?.top_keywords || data?.topKeywords || [])
        .slice(0, 10)
        .map((k: { keyword?: string; name?: string; share?: number; value?: number }) => ({
          keyword: k.keyword || k.name || '',
          share: k.share || k.value || 0,
        })),
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[competitorAudit] Similarweb traffic failed:', err);
    return null;
  }
}

// ── Domain Metrics Check ──────────────────────────────────────────────────────
// GET https://domain-metrics-check.p.rapidapi.com/domain-metrics/<domain>/
// Note: domain goes in the URL path, not query params

export async function fetchDomainMetrics(domain: string): Promise<LiveDomainMetrics | null> {
  if (!RAPIDAPI_KEY()) {
    console.warn('[competitorAudit] RAPIDAPI_KEY not set — using seed data');
    return null;
  }

  try {
    // Domain in path — strip protocol if present
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${DOMAIN_METRICS_HOST}/domain-metrics/${cleanDomain}/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: headers(DOMAIN_METRICS_HOST),
    });

    if (!response.ok) {
      console.error(`[competitorAudit] Domain Metrics error: ${response.status} ${await response.text()}`);
      return null;
    }

    const data = await response.json();

    // Domain Metrics Check response shape:
    // { ahrefs: { dr, backlinks, ... }, moz: { da, pa, ... }, majestic: { tf, cf, ... } }
    return {
      domain,
      ahrefs_dr: data?.ahrefs?.dr || data?.ahrefs?.domain_rating || data?.dr || 0,
      moz_da: data?.moz?.da || data?.moz?.domain_authority || data?.da || 0,
      moz_pa: data?.moz?.pa || data?.moz?.page_authority || data?.pa || 0,
      majestic_tf: data?.majestic?.tf || data?.majestic?.trust_flow || data?.tf || 0,
      majestic_cf: data?.majestic?.cf || data?.majestic?.citation_flow || data?.cf || 0,
      backlinks: data?.ahrefs?.backlinks || data?.backlinks || 0,
      referring_domains: data?.ahrefs?.referring_domains || data?.referring_domains || 0,
      organic_keywords: data?.ahrefs?.organic_keywords || data?.organic_keywords || 0,
      monthly_organic_traffic: data?.ahrefs?.organic_traffic || data?.organic_traffic || 0,
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[competitorAudit] Domain Metrics failed:', err);
    return null;
  }
}

// ── Seed data fallbacks ───────────────────────────────────────────────────────

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
      share: competitor.seo.monthlyOrganicTraffic > 0
        ? k.traffic / competitor.seo.monthlyOrganicTraffic
        : 0,
    })),
    source: 'seed',
    fetchedAt: new Date().toISOString(),
  };
}

function buildSeedSEO(competitor: CompetitorProfile): LiveSEOData {
  return {
    domain: competitor.domain,
    organic_traffic: competitor.seo.monthlyOrganicTraffic,
    organic_keywords: competitor.seo.organicKeywords,
    paid_traffic: 0,
    backlinks: competitor.seo.backlinks,
    referring_domains: competitor.seo.referringDomains,
    top_organic_keywords: competitor.topKeywords.map(k => ({
      keyword: k.keyword,
      position: k.position,
      traffic: k.traffic,
    })),
    source: 'seed',
    fetchedAt: new Date().toISOString(),
  };
}

// ── Full competitor audit ─────────────────────────────────────────────────────

export async function auditCompetitor(competitorId: string): Promise<CompetitorAuditReport | null> {
  const competitor = COMPETITORS.find(c => c.id === competitorId);
  if (!competitor) return null;

  const [liveMetrics, liveTraffic, liveSEO] = await Promise.all([
    fetchDomainMetrics(competitor.domain),
    fetchSimilarwebTraffic(competitor.domain),
    fetchSimilarwebSEO(competitor.domain),
  ]);

  const metrics = liveMetrics || buildSeedMetrics(competitor);
  const traffic = liveTraffic || buildSeedTraffic(competitor);
  const seo = liveSEO || buildSeedSEO(competitor);

  const threatLevel: CompetitorAuditReport['threat_level'] =
    metrics.moz_da > 60 ? 'high' :
    metrics.moz_da > 45 ? 'medium' : 'low';

  const recommendedActions: string[] = [];
  competitor.weaknesses.forEach(weakness => {
    recommendedActions.push(`Create content addressing: ${weakness}`);
  });

  return {
    domain: competitor.domain,
    competitor,
    metrics,
    traffic,
    seo,
    crispro_advantages: [competitor.crispro_advantage],
    recommended_actions: recommendedActions,
    threat_level: threatLevel,
  };
}

// ── Competitive landscape summary ─────────────────────────────────────────────

export async function generateCompetitiveLandscape(): Promise<{
  competitors: CompetitorAuditReport[];
  crispro_position: string;
  ai_visibility_ranking: CompetitorProfile[];
}> {
  const audits = await Promise.all(COMPETITORS.map(c => auditCompetitor(c.id)));
  const validAudits = audits.filter(Boolean) as CompetitorAuditReport[];

  return {
    competitors: validAudits,
    crispro_position: 'Not yet ranking for primary category terms — significant opportunity',
    ai_visibility_ranking: getCompetitorsByAIVisibility(),
  };
}
