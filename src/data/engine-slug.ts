/** Server-safe slug helpers (no Lucide icons). */

export function normalizeEngineSlug(raw: string | undefined | null): string {
  if (raw == null) return '';
  let s = String(raw).trim();
  try {
    s = decodeURIComponent(s);
  } catch {
    /* ignore */
  }
  return s.replace(/^\/+|\/+$/g, '');
}
