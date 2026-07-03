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
 * Lazy import + best-effort expansion of CMS-backed dynamic routes.
 * Safe-fails to empty list if Hygraph is unreachable so the sitemap
 * still returns the static crawl.
 */
async function collectDynamicSlugs(): Promise<string[]> {
  const routes: string[] = [];
  try {
    const { getPosts } = await import('@/services');
    const posts = await getPosts();
    if (Array.isArray(posts)) {
      for (const edge of posts) {
        const slug: string | undefined = edge?.node?.slug;
        if (slug) {
          routes.push(`/research/blog/${slug}`);
          routes.push(`/blog/post/${slug}`);
        }
      }
    }
  } catch {
    // Hygraph unreachable — skip dynamic expansion gracefully.
  }
  return routes;
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
  if (/^\/(engine|research)(\/|$)/.test(route)) return 0.8;
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
