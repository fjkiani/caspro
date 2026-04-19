import type { PostNode } from '@/types/blog';

export type SeriesGroup = {
  key: string;
  displayName: string;
  posts: PostNode[];
};

const PART_SLUG_RE = /^(.*)-part-(\d+)$/i;

/** Slug suffix `-part-12` → series key + part index (Hygraph / blog convention). */
export function parseSeriesFromSlug(slug: string): { key: string; part: number } | null {
  const m = slug.trim().match(PART_SLUG_RE);
  if (!m) return null;
  return { key: m[1].toLowerCase(), part: parseInt(m[2], 10) };
}

export function formatSeriesDisplayName(key: string): string {
  return key
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Split posts into multi-part series (2+ posts with same `-part-` stem) vs everything else.
 * Series are ordered Part 1, 2, … ; series blocks ordered by newest activity in the group.
 */
export function partitionPostsForListing(posts: PostNode[]): {
  series: SeriesGroup[];
  standalone: PostNode[];
} {
  const byKey = new Map<string, PostNode[]>();
  const standalone: PostNode[] = [];

  for (const p of posts) {
    const parsed = parseSeriesFromSlug(p.slug);
    if (parsed) {
      const list = byKey.get(parsed.key) ?? [];
      list.push(p);
      byKey.set(parsed.key, list);
    } else {
      standalone.push(p);
    }
  }

  const series: SeriesGroup[] = [];
  for (const [key, list] of byKey) {
    if (list.length >= 2) {
      list.sort((a, b) => {
        const pa = parseSeriesFromSlug(a.slug)!.part;
        const pb = parseSeriesFromSlug(b.slug)!.part;
        return pa - pb;
      });
      series.push({
        key,
        displayName: formatSeriesDisplayName(key),
        posts: list,
      });
    } else {
      standalone.push(...list);
    }
  }

  series.sort((a, b) => {
    const ta = Math.max(...a.posts.map((p) => new Date(p.createdAt).getTime()));
    const tb = Math.max(...b.posts.map((p) => new Date(p.createdAt).getTime()));
    return tb - ta;
  });

  standalone.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { series, standalone };
}
