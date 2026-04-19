/** Equal paths with `trailingSlash: true` (e.g. /engine/kill-chain/ vs /engine/kill-chain). */
export function normalizePath(p: string | null | undefined): string {
  if (p == null || p === '') return '/';
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
}

export function pathsEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  return normalizePath(a) === normalizePath(b);
}
