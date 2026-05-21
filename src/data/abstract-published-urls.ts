/**
 * Published abstract URLs (AACR journals direct pages).
 * Used when Hygraph Content API does not expose `externalLink` on reads.
 * Re-sync: node tools/scrape-google-scholar-abstracts.mjs && node tools/seed-conference-abstract-posts.mjs
 */

import { normalizeAbstractSlug } from '@/lib/research/abstract-slug';

/** Slug (normalized) or abstract ID → AACR journals direct abstract page */
export const ABSTRACT_AACR_JOURNAL_URLS: Record<string, string> = {
  'abstract-lb340-mechanism-based-trial-matching-reveals-a-54-target-alignment-gap':
    'https://aacrjournals.org/cancerres/article/86/8_Supplement/LB340/782958',
  'abstract-lb340-ovarian-trial-matching':
    'https://aacrjournals.org/cancerres/article/86/8_Supplement/LB340/782958',
  LB340: 'https://aacrjournals.org/cancerres/article/86/8_Supplement/LB340/782958',
  'intercepting-metastasis-8-step-crispr-design-via-multi-modal-foundation-models':
    'https://aacrjournals.org/cancerres/article/86/7_Supplement/2235/776855',
  '2235': 'https://aacrjournals.org/cancerres/article/86/7_Supplement/2235/776855',
  'abstract-b065-stage-aware-crispr-design-for-brain-metastasis-interception-multi':
    'https://aacrjournals.org/cancerres/article/86/6_Supplement/B065/775413',
  'abstract-b065-brain-metastasis-crispr':
    'https://aacrjournals.org/cancerres/article/86/6_Supplement/B065/775413',
  B065: 'https://aacrjournals.org/cancerres/article/86/6_Supplement/B065/775413',
  'abstract-lb-b013-eight-pathway-transcriptomic-biomarker-outperforms-pd-l1-for-an':
    'https://aacrjournals.org/cancerimmunolres/article/14/2_Supplement/LB-B013/775104',
  'abstract-lb-b013-eight-pathway-melanoma':
    'https://aacrjournals.org/cancerimmunolres/article/14/2_Supplement/LB-B013/775104',
  'LB-B013': 'https://aacrjournals.org/cancerimmunolres/article/14/2_Supplement/LB-B013/775104',
  'abstract-b025-an-agentic-platform-for-designing-cancer-immunotherapies-from-auto':
    'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
  'abstract-b025-agentic-immunotherapy-platform':
    'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
  B025: 'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
};

/** @deprecated Prefer ABSTRACT_AACR_JOURNAL_URLS */
export const ABSTRACT_PUBLISHED_URLS = ABSTRACT_AACR_JOURNAL_URLS;

export function parseAbstractIdFromTitle(title: string): string | null {
  const m = title.match(/Abstract\s+([A-Z]{1,3}-?[A-Z]?\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

/** e.g. "LB340-LB340", "2235-2235", "LB-B013-LB-B013" from venue line */
export function parseAbstractIdFromVenue(venue?: string | null): string | null {
  if (!venue?.trim()) return null;
  const m = venue.match(
    /,\s*((?:LB-[A-Z]?\d+)|(?:LB\d+)|(?:B\d+)|(?:\d{4,5}))(?:-[A-Za-z0-9-]+)?,\s*20\d{2}/i,
  );
  if (!m) return null;
  return m[1].toUpperCase();
}

function isAacrJournalsUrl(url: string): boolean {
  return /aacrjournals\.org/i.test(url);
}

function lookupAacrJournalUrl(slug: string, title?: string, venue?: string | null): string | null {
  const norm = normalizeAbstractSlug(slug);
  if (ABSTRACT_AACR_JOURNAL_URLS[norm]) return ABSTRACT_AACR_JOURNAL_URLS[norm];

  const fromTitle = title ? parseAbstractIdFromTitle(title) : null;
  if (fromTitle && ABSTRACT_AACR_JOURNAL_URLS[fromTitle]) return ABSTRACT_AACR_JOURNAL_URLS[fromTitle];

  const fromVenue = parseAbstractIdFromVenue(venue);
  if (fromVenue && ABSTRACT_AACR_JOURNAL_URLS[fromVenue]) return ABSTRACT_AACR_JOURNAL_URLS[fromVenue];

  for (const [key, url] of Object.entries(ABSTRACT_AACR_JOURNAL_URLS)) {
    if (key.length < 12) continue;
    if (norm === key || norm.startsWith(key) || key.startsWith(norm)) return url;
    const a = norm.slice(0, 28);
    const b = key.slice(0, 28);
    if (a.length >= 20 && b.length >= 20 && a === b) return url;
  }

  return null;
}

export type ResolveAacrJournalUrlOpts = {
  slug: string;
  title?: string;
  venue?: string | null;
  publishedUrl?: string | null;
};

/**
 * Direct AACR journals abstract page for poster image clicks.
 * Never returns generic www.aacr.org — only aacrjournals.org article URLs.
 */
export function resolveAacrJournalUrl(opts: ResolveAacrJournalUrlOpts): string {
  const published = opts.publishedUrl?.trim();
  if (published && isAacrJournalsUrl(published)) return published;

  const mapped = lookupAacrJournalUrl(opts.slug, opts.title, opts.venue);
  if (mapped) return mapped;

  if (published && !/scholar\.google/i.test(published) && isAacrJournalsUrl(published)) {
    return published;
  }

  const fallbackSlug = normalizeAbstractSlug(opts.slug);
  console.warn(`[abstract] No AACR journals URL for slug="${fallbackSlug}" — check ABSTRACT_AACR_JOURNAL_URLS`);
  return (
    ABSTRACT_AACR_JOURNAL_URLS[fallbackSlug] ??
    Object.values(ABSTRACT_AACR_JOURNAL_URLS).find((u) => isAacrJournalsUrl(u)) ??
    'https://aacrjournals.org/'
  );
}

/** Best URL for the published abstract — prefers AACR journals over Scholar. */
export function resolvePublishedAbstractUrl(opts: {
  slug: string;
  title?: string;
  venue?: string | null;
  hygraphExternalLink?: string | null;
  seedLink?: string | null;
}): string | null {
  const fromHygraph = opts.hygraphExternalLink?.trim();
  if (fromHygraph && isAacrJournalsUrl(fromHygraph)) return fromHygraph;

  const aacr = lookupAacrJournalUrl(opts.slug, opts.title, opts.venue);
  if (aacr) return aacr;

  const fromSeed = opts.seedLink?.trim();
  if (fromSeed && isAacrJournalsUrl(fromSeed)) return fromSeed;

  if (fromHygraph && !/scholar\.google/i.test(fromHygraph)) return fromHygraph;
  if (fromSeed && !/scholar\.google/i.test(fromSeed)) return fromSeed;

  return null;
}

export function isExternalPublishedUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
