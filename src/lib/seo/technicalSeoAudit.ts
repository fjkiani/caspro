/**
 * technicalSeoAudit.ts
 *
 * Technical SEO audit engine for CrisPRO.
 *
 * Live data sources:
 *   PageSpeed Insights
 *     GET https://pagespeed-insights.p.rapidapi.com/run_pagespeed
 *       ?url=https%3A%2F%2Fcrispro.ai
 *       &category=PERFORMANCE          (PERFORMANCE | ACCESSIBILITY | SEO | BEST_PRACTICES)
 *       &strategy=MOBILE               (MOBILE | DESKTOP)
 *
 * All APIs share RAPIDAPI_KEY.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CoreWebVitals {
  lcp: number;          // Largest Contentful Paint (ms) — target < 2500
  fid: number;          // First Input Delay (ms) — target < 100
  cls: number;          // Cumulative Layout Shift — target < 0.1
  fcp: number;          // First Contentful Paint (ms) — target < 1800
  ttfb: number;         // Time to First Byte (ms) — target < 800
  tbt: number;          // Total Blocking Time (ms) — target < 200
  si: number;           // Speed Index (ms) — target < 3400
  performance_score: number;
  accessibility_score: number;
  seo_score: number;
  best_practices_score: number;
}

export interface OnPageAudit {
  url: string;
  title: string;
  title_length: number;
  meta_description: string;
  meta_description_length: number;
  h1_count: number;
  h1_text: string;
  h2_count: number;
  canonical_url: string;
  robots_meta: string;
  og_title: string;
  og_description: string;
  og_image: string;
  schema_types: string[];
  word_count: number;
  internal_links: number;
  external_links: number;
  broken_links: number;
  images_without_alt: number;
  issues: SEOIssue[];
  score: number;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'links' | 'images' | 'schema' | 'performance' | 'mobile';
  message: string;
  impact: 'high' | 'medium' | 'low';
  fix: string;
}

export interface IndexCoverage {
  domain: string;
  indexed_pages: number;
  estimated_total_pages: number;
  coverage_rate: number;
  last_crawled: string;
}

export interface TechnicalAuditReport {
  domain: string;
  audited_at: string;
  core_web_vitals: CoreWebVitals;
  on_page: OnPageAudit;
  index_coverage: IndexCoverage;
  overall_score: number;
  critical_issues: SEOIssue[];
  quick_fixes: SEOIssue[];
  recommendations: TechnicalRecommendation[];
}

export interface TechnicalRecommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  estimated_impact: string;
  implementation: string;
}

// ── Shared API config ─────────────────────────────────────────────────────────

const RAPIDAPI_KEY = () => process.env.RAPIDAPI_KEY || '';
const PAGESPEED_HOST = 'pagespeed-insights.p.rapidapi.com';

const headers = (host: string) => ({
  'x-rapidapi-key': RAPIDAPI_KEY(),
  'x-rapidapi-host': host,
  'Content-Type': 'application/json',
});

// ── PageSpeed Insights ────────────────────────────────────────────────────────
// GET /run_pagespeed?url=<url>&category=PERFORMANCE&strategy=MOBILE
//
// category options: PERFORMANCE | ACCESSIBILITY | SEO | BEST_PRACTICES | CATEGORY_UNSPECIFIED
// strategy options: MOBILE | DESKTOP | STRATEGY_UNSPECIFIED
//
// To get all scores in one call, omit category (returns all categories).

export async function fetchPageSpeedReport(
  url: string,
  strategy: 'MOBILE' | 'DESKTOP' = 'MOBILE'
): Promise<CoreWebVitals | null> {
  if (!RAPIDAPI_KEY()) {
    console.warn('[technicalSeoAudit] RAPIDAPI_KEY not set');
    return null;
  }

  try {
    // Omit category to get all Lighthouse categories in one call
    const params = new URLSearchParams({ url, strategy });
    const endpoint = `https://${PAGESPEED_HOST}/run_pagespeed?${params}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: headers(PAGESPEED_HOST),
    });

    if (!response.ok) {
      console.error(`[technicalSeoAudit] PageSpeed error: ${response.status} ${await response.text()}`);
      return null;
    }

    const data = await response.json();

    // PageSpeed Insights response shape (standard Lighthouse JSON):
    // data.lighthouseResult.categories.{ performance, accessibility, seo, best-practices }
    // data.lighthouseResult.audits.{ largest-contentful-paint, cumulative-layout-shift, ... }
    const cats = data?.lighthouseResult?.categories;
    const audits = data?.lighthouseResult?.audits;

    if (!cats && !audits) {
      console.error('[technicalSeoAudit] Unexpected PageSpeed response shape:', JSON.stringify(data).slice(0, 200));
      return null;
    }

    return {
      lcp: Math.round(audits?.['largest-contentful-paint']?.numericValue || 0),
      fid: Math.round(audits?.['max-potential-fid']?.numericValue || 0),
      cls: parseFloat((audits?.['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
      fcp: Math.round(audits?.['first-contentful-paint']?.numericValue || 0),
      ttfb: Math.round(audits?.['server-response-time']?.numericValue || 0),
      tbt: Math.round(audits?.['total-blocking-time']?.numericValue || 0),
      si: Math.round(audits?.['speed-index']?.numericValue || 0),
      performance_score: Math.round((cats?.performance?.score || 0) * 100),
      accessibility_score: Math.round((cats?.accessibility?.score || 0) * 100),
      seo_score: Math.round((cats?.seo?.score || 0) * 100),
      best_practices_score: Math.round((cats?.['best-practices']?.score || 0) * 100),
    };
  } catch (err) {
    console.error('[technicalSeoAudit] PageSpeed fetch failed:', err);
    return null;
  }
}

// Convenience: fetch both mobile and desktop scores
export async function fetchPageSpeedBoth(url: string): Promise<{
  mobile: CoreWebVitals | null;
  desktop: CoreWebVitals | null;
}> {
  const [mobile, desktop] = await Promise.all([
    fetchPageSpeedReport(url, 'MOBILE'),
    fetchPageSpeedReport(url, 'DESKTOP'),
  ]);
  return { mobile, desktop };
}

// ── Recommendations engine ────────────────────────────────────────────────────

export function generateTechnicalRecommendations(
  vitals: CoreWebVitals | null,
  onPage: OnPageAudit | null,
  index: IndexCoverage | null
): TechnicalRecommendation[] {
  const recs: TechnicalRecommendation[] = [];

  if (vitals) {
    if (vitals.lcp > 2500) {
      recs.push({
        priority: 'critical',
        category: 'Performance',
        title: 'Fix Largest Contentful Paint (LCP)',
        description: `LCP is ${vitals.lcp}ms — target is under 2500ms. This directly impacts Google rankings.`,
        estimated_impact: 'High — LCP is a Core Web Vital ranking factor',
        implementation: 'Optimize hero images (WebP format, lazy loading), reduce server response time, use CDN',
      });
    }
    if (vitals.cls > 0.1) {
      recs.push({
        priority: 'high',
        category: 'Performance',
        title: 'Fix Cumulative Layout Shift (CLS)',
        description: `CLS is ${vitals.cls} — target is under 0.1.`,
        estimated_impact: 'Medium — CLS is a Core Web Vital ranking factor',
        implementation: 'Set explicit width/height on images, avoid inserting content above existing content',
      });
    }
    if (vitals.performance_score < 70) {
      recs.push({
        priority: 'high',
        category: 'Performance',
        title: 'Improve overall page performance score',
        description: `Performance score is ${vitals.performance_score}/100. Target is 90+.`,
        estimated_impact: 'High — performance affects both rankings and conversion',
        implementation: 'Enable Next.js Image optimization, implement code splitting, reduce JavaScript bundle size',
      });
    }
  }

  if (onPage) {
    onPage.issues.filter(i => i.type === 'error').forEach(issue => {
      recs.push({
        priority: 'critical',
        category: 'On-Page SEO',
        title: issue.message,
        description: `Found on ${onPage.url}`,
        estimated_impact: `${issue.impact} impact on rankings`,
        implementation: issue.fix,
      });
    });
    if (onPage.schema_types.length === 0) {
      recs.push({
        priority: 'high',
        category: 'Structured Data',
        title: 'Add JSON-LD schema markup',
        description: 'No structured data found. Schema markup helps AI engines understand your content.',
        estimated_impact: 'Medium — improves AI citation likelihood and rich results',
        implementation: 'Add Organization, MedicalWebPage, FAQPage, and Article schema to all pages',
      });
    }
  }

  if (index && index.coverage_rate < 0.8) {
    recs.push({
      priority: 'high',
      category: 'Indexing',
      title: 'Improve Google index coverage',
      description: `Only ${Math.round(index.coverage_rate * 100)}% of pages are indexed.`,
      estimated_impact: 'High — unindexed pages cannot rank',
      implementation: 'Submit XML sitemap to Google Search Console, fix crawl errors, check robots.txt',
    });
  }

  // CrisPRO-specific AI visibility recs
  recs.push({
    priority: 'critical',
    category: 'AI Visibility',
    title: 'Add Organization schema with AI-readable description',
    description: 'AI engines use structured data to understand and cite companies.',
    estimated_impact: 'High — directly improves ChatGPT/Claude/Perplexity citation likelihood',
    implementation: 'Add Organization JSON-LD with name, description, url, logo, sameAs (LinkedIn, Crunchbase, Wikipedia)',
  });
  recs.push({
    priority: 'critical',
    category: 'AI Visibility',
    title: 'Create Wikipedia page for CrisPRO',
    description: 'AI engines heavily cite Wikipedia. A Wikipedia page would dramatically improve AI visibility.',
    estimated_impact: 'Very high — Wikipedia is the #1 source for AI engine citations',
    implementation: 'Draft Wikipedia article. Reference: BreAK CRC-001 trial, Alzeeb et al. 2024, funding rounds.',
  });
  recs.push({
    priority: 'high',
    category: 'AI Visibility',
    title: 'Get listed on Crunchbase and CB Insights',
    description: 'AI engines cite Crunchbase and CB Insights for company information.',
    estimated_impact: 'High — improves AI citation for "AI drug discovery companies" prompts',
    implementation: 'Create/update Crunchbase profile with full company details, funding, team, and product description.',
  });

  return recs.sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });
}

// ── Mock data for development (when API key not set) ──────────────────────────

export function generateMockTechnicalAudit(domain: string): TechnicalAuditReport {
  const mockVitals: CoreWebVitals = {
    lcp: 3200,
    fid: 45,
    cls: 0.08,
    fcp: 1800,
    ttfb: 420,
    tbt: 180,
    si: 3800,
    performance_score: 68,
    accessibility_score: 82,
    seo_score: 74,
    best_practices_score: 79,
  };

  const mockIssues: SEOIssue[] = [
    { type: 'error', category: 'meta', message: 'Missing meta description on 12 pages', impact: 'high', fix: 'Add unique meta descriptions to all pages' },
    { type: 'warning', category: 'schema', message: 'No structured data on product pages', impact: 'medium', fix: 'Add Product and FAQPage schema markup' },
    { type: 'warning', category: 'images', message: '8 images missing alt text', impact: 'medium', fix: 'Add descriptive alt text to all images' },
    { type: 'info', category: 'links', message: '3 external links without rel="noopener"', impact: 'low', fix: 'Add rel="noopener noreferrer" to external links' },
  ];

  const mockOnPage: OnPageAudit = {
    url: `https://${domain}`,
    title: 'CrisPRO | AI-Powered Oncology Platform',
    title_length: 42,
    meta_description: 'CrisPRO is an AI-powered oncology platform for drug discovery and clinical decision support.',
    meta_description_length: 92,
    h1_count: 1,
    h1_text: 'AI-Powered Oncology Drug Discovery',
    h2_count: 6,
    canonical_url: `https://${domain}`,
    robots_meta: 'index, follow',
    og_title: 'CrisPRO | AI-Powered Oncology Platform',
    og_description: 'CrisPRO is an AI-powered oncology platform.',
    og_image: `https://${domain}/og-image.png`,
    schema_types: ['Organization'],
    word_count: 1240,
    internal_links: 18,
    external_links: 4,
    broken_links: 0,
    images_without_alt: 8,
    issues: mockIssues,
    score: 72,
  };

  const mockIndex: IndexCoverage = {
    domain,
    indexed_pages: 24,
    estimated_total_pages: 53,
    coverage_rate: 0.45,
    last_crawled: new Date().toISOString(),
  };

  const recommendations = generateTechnicalRecommendations(mockVitals, mockOnPage, mockIndex);

  return {
    domain,
    audited_at: new Date().toISOString(),
    core_web_vitals: mockVitals,
    on_page: mockOnPage,
    index_coverage: mockIndex,
    overall_score: Math.round((mockVitals.performance_score + mockOnPage.score + mockVitals.seo_score) / 3),
    critical_issues: mockIssues.filter(i => i.type === 'error'),
    quick_fixes: mockIssues.filter(i => i.impact === 'low'),
    recommendations,
  };
}
