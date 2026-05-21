/**
 * Published abstract URLs (AACR journals, Google Scholar citations).
 * Used when Hygraph Content API does not expose `externalLink` on reads.
 * Re-sync: node tools/scrape-google-scholar-abstracts.mjs && node tools/seed-conference-abstract-posts.mjs
 */

import { normalizeAbstractSlug } from '@/lib/research/abstract-slug';

/** Slug (normalized) or abstract ID → canonical published URL */
export const ABSTRACT_PUBLISHED_URLS: Record<string, string> = {
  'abstract-lb340-mechanism-based-trial-matching-reveals-a-54-target-alignment-gap':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:lSLTfruPkqcC',
  'abstract-lb340-ovarian-trial-matching':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:lSLTfruPkqcC',
  'intercepting-metastasis-8-step-crispr-design-via-multi-modal-foundation-models':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:RYcK_YlVTxYC',
  'abstract-b065-stage-aware-crispr-design-for-brain-metastasis-interception-multi':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:J_g5lzvAfSwC',
  'abstract-b065-brain-metastasis-crispr':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:J_g5lzvAfSwC',
  'abstract-lb-b013-eight-pathway-transcriptomic-biomarker-outperforms-pd-l1-for-an':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:NaGl4SEjCO4C',
  'abstract-lb-b013-eight-pathway-melanoma':
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HrO6JwkAAAAJ&citation_for_view=HrO6JwkAAAAJ:NaGl4SEjCO4C',
  'abstract-b025-an-agentic-platform-for-designing-cancer-immunotherapies-from-auto':
    'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
  'abstract-b025-agentic-immunotherapy-platform':
    'https://aacrjournals.org/cancerimmunolres/article/13/9_Supplement/B025/765414/Abstract-B025-An-agentic-platform-for-designing',
};

export function parseAbstractIdFromTitle(title: string): string | null {
  const m = title.match(/Abstract\s+([A-Z]{1,3}-?[A-Z]?\d+)/i);
  return m ? m[1].toUpperCase() : null;
}

/** Best URL for the published abstract (journal / Scholar). */
export function resolvePublishedAbstractUrl(opts: {
  slug: string;
  title?: string;
  hygraphExternalLink?: string | null;
  seedLink?: string | null;
}): string | null {
  const fromHygraph = opts.hygraphExternalLink?.trim();
  if (fromHygraph) return fromHygraph;

  const fromSeed = opts.seedLink?.trim();
  if (fromSeed) return fromSeed;

  const slug = normalizeAbstractSlug(opts.slug);
  if (ABSTRACT_PUBLISHED_URLS[slug]) return ABSTRACT_PUBLISHED_URLS[slug];

  const abstractId = opts.title ? parseAbstractIdFromTitle(opts.title) : null;
  if (abstractId && ABSTRACT_PUBLISHED_URLS[abstractId]) return ABSTRACT_PUBLISHED_URLS[abstractId];

  return null;
}

export function isExternalPublishedUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
