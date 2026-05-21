/** Normalize slug for Hygraph + URL matching (no trailing hyphens). */
export function normalizeAbstractSlug(slug: string): string {
  return String(slug || '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Short / legacy Hygraph slugs → canonical Post slug used on site URLs */
export const ABSTRACT_SLUG_ALIASES: Record<string, string> = {
  'abstract-lb340-ovarian-trial-matching':
    'abstract-lb340-mechanism-based-trial-matching-reveals-a-54-target-alignment-gap',
  'abstract-b065-brain-metastasis-crispr':
    'abstract-b065-stage-aware-crispr-design-for-brain-metastasis-interception-multi',
  'abstract-lb-b013-eight-pathway-melanoma':
    'abstract-lb-b013-eight-pathway-transcriptomic-biomarker-outperforms-pd-l1-for-an',
  'abstract-b025-agentic-immunotherapy-platform':
    'abstract-b025-an-agentic-platform-for-designing-cancer-immunotherapies-from-auto',
};

export function canonicalAbstractSlug(slug: string): string {
  const norm = normalizeAbstractSlug(slug);
  return ABSTRACT_SLUG_ALIASES[norm] ?? norm;
}

export function decodeAbstractSlugParam(param: string): string {
  try {
    return canonicalAbstractSlug(decodeURIComponent(param));
  } catch {
    return canonicalAbstractSlug(param);
  }
}

/** Match URL param to an abstract row (canonical slug + legacy aliases). */
export function abstractMatchesSlugParam(itemSlug: string, param: string): boolean {
  const want = decodeAbstractSlugParam(param);
  const have = canonicalAbstractSlug(itemSlug);
  if (have === want) return true;
  const raw = normalizeAbstractSlug(itemSlug);
  return raw === want || normalizeAbstractSlug(param) === have;
}
