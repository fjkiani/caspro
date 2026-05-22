import type { PostNode } from '@/types/blog';
import { ABSTRACT_CATEGORY_SLUG } from '@/lib/docs/hygraph/research-abstract-queries';

export type SeriesGroup = {
  key: string;
  displayName: string;
  posts: PostNode[];
};

const PART_SLUG_RE = /^(.*)-part-(\d+)$/i;
const TITLE_PART_RE = /^part\s+(\d+)\s*(?:[—:\-–.]|$)/i;

/** Slug suffix `-part-12` → series key + part index (Hygraph / blog convention). */
export function parseSeriesFromSlug(slug: string): { key: string; part: number } | null {
  const m = slug.trim().match(PART_SLUG_RE);
  if (!m) return null;
  return { key: m[1].toLowerCase(), part: parseInt(m[2], 10) };
}

/** Title prefix `Part 2 — …` / `Part 1: …` → part index. */
export function parsePartFromTitle(title: string): number | null {
  const m = title.trim().match(TITLE_PART_RE);
  if (!m) return null;
  const part = parseInt(m[1], 10);
  return Number.isFinite(part) && part > 0 ? part : null;
}

/** Part index for series rail badges — slug convention wins, then title. */
export function seriesPartIndex(post: PostNode): number {
  return parseSeriesFromSlug(post.slug)?.part ?? parsePartFromTitle(post.title) ?? 0;
}

export function formatSeriesDisplayName(key: string): string {
  return key
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

type SeriesMembership = {
  key: string;
  displayName: string;
  part: number;
};

function inferSeriesCategorySlugs(posts: PostNode[]): Set<string> {
  const counts = new Map<string, { count: number; name: string }>();

  for (const post of posts) {
    const isPart =
      Boolean(parsePartFromTitle(post.title)) || Boolean(parseSeriesFromSlug(post.slug));
    if (!isPart) continue;
    for (const cat of post.categories || []) {
      if (!cat.slug || cat.slug === ABSTRACT_CATEGORY_SLUG) continue;
      const prev = counts.get(cat.slug) ?? { count: 0, name: cat.name || cat.slug };
      counts.set(cat.slug, { count: prev.count + 1, name: prev.name || cat.slug });
    }
  }

  return new Set(
    [...counts.entries()].filter(([, v]) => v.count >= 2).map(([slug]) => slug),
  );
}

function resolveSeriesMembership(
  post: PostNode,
  inferredSeriesCats: Set<string>,
): SeriesMembership | null {
  const fromSlug = parseSeriesFromSlug(post.slug);
  if (fromSlug) {
    return {
      key: fromSlug.key,
      displayName: formatSeriesDisplayName(fromSlug.key),
      part: fromSlug.part,
    };
  }

  const part = parsePartFromTitle(post.title);
  if (!part) return null;

  const seriesCat = (post.categories || []).find(
    (c) => c.slug && inferredSeriesCats.has(c.slug),
  );
  if (seriesCat) {
    return {
      key: seriesCat.slug.toLowerCase(),
      displayName: seriesCat.name || formatSeriesDisplayName(seriesCat.slug),
      part,
    };
  }

  return null;
}

/**
 * Split posts into multi-part series (2+ posts sharing a series key) vs standalone.
 * Matches `-part-N` slugs OR `Part N` titles grouped by shared Hygraph category.
 */
export function partitionPostsForListing(posts: PostNode[]): {
  series: SeriesGroup[];
  standalone: PostNode[];
} {
  const inferredSeriesCats = inferSeriesCategorySlugs(posts);
  const byKey = new Map<string, { displayName: string; posts: PostNode[] }>();
  const standalone: PostNode[] = [];

  for (const post of posts) {
    const membership = resolveSeriesMembership(post, inferredSeriesCats);
    if (membership) {
      const bucket = byKey.get(membership.key) ?? {
        displayName: membership.displayName,
        posts: [],
      };
      bucket.posts.push(post);
      byKey.set(membership.key, bucket);
    } else {
      standalone.push(post);
    }
  }

  const series: SeriesGroup[] = [];
  for (const [key, bucket] of byKey) {
    if (bucket.posts.length >= 2) {
      bucket.posts.sort((a, b) => seriesPartIndex(a) - seriesPartIndex(b));
      series.push({ key, displayName: bucket.displayName, posts: bucket.posts });
    } else {
      standalone.push(...bucket.posts);
    }
  }

  series.sort((a, b) => {
    const ta = Math.max(...a.posts.map((p) => new Date(p.createdAt).getTime()));
    const tb = Math.max(...b.posts.map((p) => new Date(b.createdAt).getTime()));
    return tb - ta;
  });

  standalone.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { series, standalone };
}

/** Pull standalone Part N posts into a series when they share its Hygraph category. */
function mergeOrphanPartsIntoSeries(
  series: SeriesGroup[],
  standalone: PostNode[],
): { series: SeriesGroup[]; standalone: PostNode[] } {
  if (series.length === 0) return { series, standalone };

  const merged = series.map((s) => ({ ...s, posts: [...s.posts] }));
  const remaining: PostNode[] = [];

  for (const post of standalone) {
    const fromSlug = parseSeriesFromSlug(post.slug);
    if (fromSlug) {
      const target = merged.find((s) => s.key === fromSlug.key);
      if (target) {
        target.posts.push(post);
        target.posts.sort((a, b) => seriesPartIndex(a) - seriesPartIndex(b));
        continue;
      }
    }

    const part = parsePartFromTitle(post.title);
    if (!part) {
      remaining.push(post);
      continue;
    }

    const postCats = new Set((post.categories || []).map((c) => c.slug).filter(Boolean));
    const target = merged.find((s) => postCats.has(s.key));
    if (target) {
      target.posts.push(post);
      target.posts.sort((a, b) => seriesPartIndex(a) - seriesPartIndex(b));
    } else {
      remaining.push(post);
    }
  }

  return { series: merged, standalone: remaining };
}

export type BlogListingLayout = {
  series: SeriesGroup[];
  standalone: PostNode[];
  featuredPost: PostNode | null;
};

/**
 * Partition full post list first so every series part stays in its rail.
 * Featured slot is reserved for standalone (non-series) posts only.
 */
export function planBlogListingLayout(
  posts: PostNode[],
  opts?: { featureStandalone?: boolean },
): BlogListingLayout {
  const { series: rawSeries, standalone: rawStandalone } = partitionPostsForListing(posts);
  const { series, standalone: mergedStandalone } = mergeOrphanPartsIntoSeries(rawSeries, rawStandalone);

  const featureStandalone = opts?.featureStandalone !== false;
  let featuredPost: PostNode | null = null;
  let standalone = mergedStandalone;

  if (featureStandalone && mergedStandalone.length > 0) {
    featuredPost = mergedStandalone[0];
    standalone = mergedStandalone.slice(1);
  }

  return { series, standalone, featuredPost };
}
