/**
 * Published abstract URLs (AACR journals, Google Scholar citations).
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

/** @deprecated Prefer ABSTRACT_AACR_JOURNAL_URLS — kept as alias for published-link resolution */
export const ABSTRACT_PUBLISHED_URLS = ABSTRACT_AACR_JOURNAL_URLS;

export function parseAbstractIdFromTitle(title: string): string | null {
  const m = title.match(/Abstract\s+([A-Z]{1,3}-?[A-Z]?\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

function lookupAacrJournalUrl(slug: string, title?: string): string | null {
  const norm = normalizeAbstractSlug(slug);
  if (ABSTRACT_AACR_JOURNAL_URLS[norm]) return ABSTRACT_AACR_JOURNAL_URLS[norm];

  const abstractId = title ? parseAbstractIdFromTitle(title) : null;
  if (abstractId && ABSTRACT_AACR_JOURNAL_URLS[abstractId]) return ABSTRACT_AACR_JOURNAL_URLS[abstractId];

  return null;
}

/** Direct AACR journals abstract page (poster image click). */
export function resolveAacrJournalUrl(opts: { slug: string; title?: string }): string {
  return (
    lookupAacrJournalUrl(opts.slug, opts.title) ??
    'https://www.aacr.org/'
  );
}

/** Best URL for the published abstract — prefers AACR journals over Scholar. */
export function resolvePublishedAbstractUrl(opts: {
  slug: string;
  title?: string;
  hygraphExternalLink?: string | null;
  seedLink?: string | null;
}): string | null {
  const fromHygraph = opts.hygraphExternalLink?.trim();
  if (fromHygraph && /aacr\.org|aacrjournals\.org/i.test(fromHygraph)) return fromHygraph;

  const aacr = lookupAacrJournalUrl(opts.slug, opts.title);
  if (aacr) return aacr;

  const fromSeed = opts.seedLink?.trim();
  if (fromSeed && /aacr\.org|aacrjournals\.org/i.test(fromSeed)) return fromSeed;

  if (fromHygraph) return fromHygraph;
  if (fromSeed) return fromSeed;

  return null;
}

export function isExternalPublishedUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
