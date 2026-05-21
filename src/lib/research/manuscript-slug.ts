/** Normalize dynamic `[slug]` segment (decode, trim slashes). */
export function normalizeManuscriptSlugParam(raw: string): string {
  const s = String(raw || '')
    .replace(/\/+$/, '')
    .trim();
  try {
    return decodeURIComponent(s)
      .replace(/\/+$/, '')
      .trim();
  } catch {
    return s;
  }
}

/** URL-safe kebab form for alias matching (bookmarks, old links). */
export function manuscriptSlugify(input: string): string {
  return normalizeManuscriptSlugParam(input)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
