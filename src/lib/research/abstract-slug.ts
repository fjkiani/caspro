/** Normalize slug for Hygraph + URL matching (no trailing hyphens). */
export function normalizeAbstractSlug(slug: string): string {
  return String(slug || '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function decodeAbstractSlugParam(param: string): string {
  try {
    return normalizeAbstractSlug(decodeURIComponent(param));
  } catch {
    return normalizeAbstractSlug(param);
  }
}
