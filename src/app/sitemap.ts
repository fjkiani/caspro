import type { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE_URL = 'https://crispro.ai';
const APP_DIR = join(process.cwd(), 'src', 'app');

// URL patterns to keep out of the sitemap entirely:
//   - API routes (no human content)
//   - Internal apps (co-pilot-app, decks, visualization-demo, poster)
//   - Universal-demo learn route (auth-gated, not indexable)
//   - In-silico mockups
//   - Pages that 308-redirect in next.config.js (don't list redirects)
//   - Noindex-only pages (trial-receipt gated, learn/universal-demo, etc.)
const EXCLUDE_PATTERNS: RegExp[] = [
  /^\/api(\/|$)/,
  /^\/co-pilot-app(\/|$)/,
  /^\/visualization-demo(\/|$)/,
  /^\/learn\/universal-demo(\/|$)/,
  /^\/poster(\/|$)/,
  /^\/insilico(\/|$)/,
  /^\/decks(\/|$)/,
  /^\/research\/decks(\/|$)/,
  /^\/target-validation(\/|$)/, // 308 → /ledger/
  /^\/resistance(\/|$)/,        // 308 → /ledger/
  /^\/moa(\/|$)/,               // 308 → /ledger/
  /^\/use-case(\/|$)/,          // 308 → /manuscripts
  /^\/blog(\/|$)/,              // 308 → /research
  /^\/ledger(\/|$)/,            // noindex (trial gated)
];

function isExcluded(path: string): boolean {
  return EXCLUDE_PATTERNS.some((re) => re.test(path));
}

/**
 * Recursively walk `src/app/` and collect every static (non-dynamic) route
 * with a `page.tsx`. Dynamic `[slug]` segments are deliberately skipped
 * here — they are expanded by `collectDynamicSlugs()`.
 */
function collectStaticRoutes(dir: string, prefix = ''): string[] {
  const routes: string[] = [];
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  for (const entry of entries) {
    if (entry.startsWith('_')) continue;
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      // Route groups like (auth) descend without contributing to the URL
      const isGroup = entry.startsWith('(') && entry.endsWith(')');
      // Dynamic segments cannot be enumerated by name alone
      const isDynamic = entry.startsWith('[') && entry.endsWith(']');
      const nextPrefix = isGroup ? prefix : isDynamic ? prefix : `${prefix}/${entry}`;
      if (isDynamic) continue;
      routes.push(...collectStaticRoutes(full, nextPrefix));
    } else if (entry === 'page.tsx' || entry === 'page.ts' || entry === 'page.jsx' || entry === 'page.js') {
      const url = prefix === '' ? '/' : prefix;
      if (!isExcluded(url)) {
        routes.push(url);
      }
    }
  }
  return routes;
}

/**
 * Slugs that have their OWN dedicated /platform/{slug}/page.tsx (already
 * collected as static routes). Must match R3_DEDICATED_SLUGS in the
 * `[coPilotSlug]` catch-all so we don't emit both static and dynamic entries.
 */
const R3_DEDICATED_SLUGS = new Set([
  'agentic-emr', 'chemo', 'clinical-trials', 'immunotherapy',
  'pathway', 'therapy-fit', 'toxicity-risk',
]);

/**
 * Expand every dynamic route we can enumerate at build time. Each block is
 * wrapped in try/catch — an unreachable data source degrades gracefully to
 * the static crawl instead of failing the whole sitemap.
 */
async function collectDynamicSlugs(): Promise<string[]> {
  const routes: string[] = [];

  // 1. Hygraph blog posts (CMS-backed, may be offline)
  try {
    const { getPosts } = await import('@/services');
    const posts = await getPosts();
    if (Array.isArray(posts)) {
      for (const edge of posts) {
        const slug: string | undefined = edge?.node?.slug;
        if (slug) {
          routes.push(`/research/blog/${slug}`);
        }
      }
    }
  } catch {
    // Hygraph unreachable — skip dynamic expansion gracefully.
  }

  // 2. /platform/[coPilotSlug] catch-all (co-pilot detail pages minus dedicated R3)
  try {
    const { coPilotDetailsData } = await import('@/data/coPilotDetails');
    for (const slug of Object.keys(coPilotDetailsData)) {
      if (!R3_DEDICATED_SLUGS.has(slug)) {
        routes.push(`/platform/${slug}`);
      }
    }
  } catch {
    // Data module unavailable — skip.
  }

  // 3. /doctrine/[doctrineSlug]
  try {
    const mod = await import('@/app/doctrine/doctrine-details-data');
    const data = (mod as any).doctrineDetailsData;
    if (data && typeof data === 'object') {
      for (const slug of Object.keys(data)) {
        routes.push(`/doctrine/${slug}`);
      }
    }
  } catch {
    // Skip.
  }

  // 4. /docs/api/[endpoint] (parsed from MDC)
  try {
    const { parseEndpointsMDC } = await import('@/lib/docs/parser');
    const endpoints = await parseEndpointsMDC();
    if (Array.isArray(endpoints)) {
      for (const ep of endpoints) {
        if (ep?.id) {
          routes.push(`/docs/api/${ep.id}`);
        }
      }
    }
  } catch {
    // Skip.
  }

  // 5. /docs/use-cases/[slug] — hand-authored, single entry today
  routes.push('/docs/use-cases/synthetic-lethality-essentiality-agent');

  // 6. /products/[productSlug]/[capabilitySlug] — enumerate via capability defs
  try {
    const capMod = await import('@/data/navigation/product-capabilities');
    const products: Array<'oncology' | 'r-d' | 'research'> = ['oncology', 'r-d', 'research'];
    for (const productSlug of products) {
      let defs: any[] = [];
      try {
        defs = capMod.getProductCapabilityDefinitions(productSlug as any) || [];
      } catch {
        defs = [];
      }
      for (const def of defs) {
        const capSlug = def?.slug;
        if (!capSlug) continue;
        routes.push(`/products/${productSlug}/${capSlug}`);
      }
    }
  } catch {
    // Skip.
  }

  // 7. /products/[productSlug]/[capabilitySlug]/[coPilotSlug] — the third level
  try {
    const helpers = await import('@/data/navigation/navigation-helpers');
    if (typeof helpers.generateCoPilotStaticParams === 'function') {
      const cps = helpers.generateCoPilotStaticParams() || [];
      for (const { productSlug, capabilitySlug, coPilotSlug } of cps) {
        if (productSlug && capabilitySlug && coPilotSlug) {
          routes.push(`/products/${productSlug}/${capabilitySlug}/${coPilotSlug}`);
        }
      }
    }
  } catch {
    // Skip.
  }

  // Deduplicate + drop any that hit an exclude pattern
  return Array.from(new Set(routes)).filter((r) => !isExcluded(r));
}

function priorityFor(route: string): number {
  if (route === '/') return 1.0;
  if (/^\/platform(\/|$)/.test(route) || /^\/products(\/|$)/.test(route)) return 0.9;
  if (
    /^\/(about|contact|pricing|team|faq|comparison|case-studies|validation|security)(\/|$)/.test(
      route,
    )
  )
    return 0.85;
  if (/^\/(engine|research|benchmarks|glossary|doctrine|evidence)(\/|$)/.test(route)) return 0.8;
  const depth = route.split('/').filter(Boolean).length;
  if (depth <= 1) return 0.7;
  if (depth === 2) return 0.6;
  return 0.5;
}

function changeFrequencyFor(route: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (route === '/') return 'weekly';
  if (/^\/research/.test(route) || /^\/blog/.test(route) || /^\/manuscripts/.test(route))
    return 'weekly';
  return 'monthly';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = collectStaticRoutes(APP_DIR);
  const dynamicRoutes = await collectDynamicSlugs();

  // Deduplicate (in case dynamic + static collide)
  const all = Array.from(new Set([...staticRoutes, ...dynamicRoutes]));

  return all.map((route) => ({
    url: `${BASE_URL}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: changeFrequencyFor(route),
    priority: priorityFor(route),
  }));
}
