/**
 * Conference abstracts — Hygraph `Post` rows in category `conference-abstracts`.
 * Falls back to local Scholar seed when Hygraph is empty or the query fails.
 */

import { clearCache, fetchWithCache, hygraphClient } from './client';
import { resolvePublishedAbstractUrl } from '@/data/abstract-published-urls';
import { RESEARCH_ABSTRACTS_FALLBACK } from '@/data/research-abstracts-fallback';
import { decodeAbstractSlugParam } from '@/lib/research/abstract-slug';
import {
  abstractHasDeck,
  fetchAbstractDeckBySlug,
  toResearchAbstractDeck,
} from './research-abstract-deck';
import { researchAbstractHref } from '@/lib/research/paths';
import type { ResearchAbstract } from './research-abstract-types';

export const ABSTRACT_CATEGORY_SLUG = 'conference-abstracts';
/** Short TTL so new CMS publishes show up quickly after seeding. */
const ABSTRACT_LIST_CACHE_SEC = 30;

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

const GET_ABSTRACT_POSTS_FULL = `
  query GetResearchAbstractPosts {
    posts(
      first: 50
      orderBy: abstractOrder_ASC
      where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }
    ) {
      id
      slug
      title
      excerpt
      authorLine
      venueLine
      abstractYear
      abstractOrder
      externalLink
      publishedAt
      content {
        html
        text
      }
      featuredImage {
        url
      }
    }
  }
`;

/** Fallback when custom Post fields are missing on the Content API schema. */
const GET_ABSTRACT_POSTS_BARE = `
  query GetResearchAbstractPostsBare {
    posts(
      first: 50
      orderBy: publishedAt_DESC
      where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }
    ) {
      id
      slug
      title
      excerpt
      publishedAt
      content {
        html
        text
      }
      featuredImage {
        url
      }
    }
  }
`;

type HygraphPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  authorLine?: string | null;
  venueLine?: string | null;
  abstractYear?: number | null;
  abstractOrder?: number | null;
  externalLink?: string | null;
  publishedAt?: string | null;
  content?: { html?: string | null; text?: string | null } | null;
  featuredImage?: { url: string } | null;
};

/** Parse "Author · Venue, 2026" from Hygraph excerpt when custom fields are not on Content API yet. */
function parseExcerptMeta(excerpt?: string | null): {
  authorLine?: string;
  venue?: string;
  year?: number;
} {
  if (!excerpt?.trim()) return {};
  const parts = excerpt.split('·').map((s) => s.trim());
  if (parts.length < 2) return { authorLine: parts[0] };
  const authorLine = parts[0];
  const venuePart = parts.slice(1).join(' · ');
  const yearMatch = venuePart.match(/\b(20\d{2})\b/);
  return {
    authorLine,
    venue: venuePart,
    year: yearMatch ? Number(yearMatch[1]) : undefined,
  };
}

function seedFallbackForSlug(slug: string) {
  const norm = slug.replace(/-+$/, '');
  return RESEARCH_ABSTRACTS_FALLBACK.find(
    (f) => f.slug === slug || f.slug.replace(/-+$/, '') === norm || norm.startsWith(f.slug.slice(0, 24)),
  );
}

function mapPost(row: HygraphPostRow): ResearchAbstract {
  const seed = seedFallbackForSlug(row.slug);
  const parsed = parseExcerptMeta(row.excerpt);
  const authorLine = row.authorLine ?? parsed.authorLine ?? seed?.authorLine ?? null;
  const venue = row.venueLine ?? parsed.venue ?? seed?.venue ?? null;
  const year = row.abstractYear ?? parsed.year ?? seed?.year ?? null;
  const bodyText =
    row.content?.text?.trim() ||
    row.excerpt ||
    [authorLine, venue].filter(Boolean).join(' · ') ||
    null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    bodyHtml: row.content?.html ?? null,
    bodyText,
    link:
      resolvePublishedAbstractUrl({
        slug: row.slug,
        title: row.title,
        hygraphExternalLink: row.externalLink,
        seedLink: seed?.link,
      }) ?? null,
    imageUrl: row.featuredImage?.url ?? null,
    authorLine,
    venue,
    year,
    order: row.abstractOrder ?? seed?.order ?? null,
    publishedAt: row.publishedAt ?? null,
  };
}

function sortAbstracts(items: ResearchAbstract[]): ResearchAbstract[] {
  return [...items].sort((a, b) => {
    const oa = a.order ?? 999;
    const ob = b.order ?? 999;
    if (oa !== ob) return oa - ob;
    const ya = a.year ?? 0;
    const yb = b.year ?? 0;
    if (ya !== yb) return yb - ya;
    return a.title.localeCompare(b.title);
  });
}

async function fetchAbstractPostsFromHygraph(): Promise<HygraphPostRow[]> {
  if (!hygraphClient) return [];

  // Bare query first — custom Post fields are not always on the published Content API.
  try {
    const data = await fetchWithCache<{ posts: HygraphPostRow[] }>(
      GET_ABSTRACT_POSTS_BARE,
      undefined,
      ABSTRACT_LIST_CACHE_SEC,
    );
    if (data.posts?.length) return data.posts;
  } catch (bareErr) {
    console.warn('[research] Hygraph abstract bare query failed:', bareErr);
  }

  try {
    const data = await fetchWithCache<{ posts: HygraphPostRow[] }>(
      GET_ABSTRACT_POSTS_FULL,
      undefined,
      ABSTRACT_LIST_CACHE_SEC,
    );
    return data.posts ?? [];
  } catch (fullErr) {
    console.warn('[research] Hygraph abstract full query failed:', fullErr);
    return [];
  }
}

/**
 * Conference abstracts from Hygraph posts (category `conference-abstracts`), else local seed.
 */
export async function getResearchAbstracts(options?: { noCache?: boolean }): Promise<{
  source: 'hygraph' | 'local';
  items: ResearchAbstract[];
}> {
  if (!isHygraphConfigured || !hygraphClient) {
    const items = await enrichAbstractsWithDecks(sortAbstracts(RESEARCH_ABSTRACTS_FALLBACK));
    return { source: 'local', items };
  }

  if (options?.noCache) {
    clearCache('GetResearchAbstractPosts');
  }

  const rows = await fetchAbstractPostsFromHygraph();
  if (!rows.length) {
    const items = await enrichAbstractsWithDecks(sortAbstracts(RESEARCH_ABSTRACTS_FALLBACK));
    return { source: 'local', items };
  }
  const items = await enrichAbstractsWithDecks(sortAbstracts(rows.map(mapPost)));
  return { source: 'hygraph', items };
}

async function enrichAbstractsWithDecks(items: ResearchAbstract[]): Promise<ResearchAbstract[]> {
  return Promise.all(
    items.map(async (item) => {
      const merged = await fetchAbstractDeckBySlug(item.slug);
      const deck = toResearchAbstractDeck(merged);
      return deck ? { ...item, deck } : item;
    }),
  );
}

export type AbstractNavItem = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  href: string;
};

/** Navbar dropdown — same Hygraph source as the abstracts page. */
export async function getResearchAbstractsForNav(options?: { noCache?: boolean }): Promise<{
  source: 'hygraph' | 'local';
  items: AbstractNavItem[];
}> {
  const { source, items } = await getResearchAbstracts(options);
  const navItems = items
    .filter((ab) => ab.slug)
    .map((ab) => ({
      id: ab.id,
      slug: ab.slug,
      title: ab.title,
      description: [ab.authorLine, ab.venue, ab.year ? String(ab.year) : null]
        .filter(Boolean)
        .join(' · '),
      href: researchAbstractHref(ab.slug, ab.link, abstractHasDeck(ab.deck)),
    }));
  return { source, items: navItems };
}

/** Resolve one abstract by URL slug (Hygraph or local fallback). */
export async function getResearchAbstractBySlug(
  slugParam: string,
): Promise<{ source: 'hygraph' | 'local'; item: ResearchAbstract } | null> {
  const slug = decodeAbstractSlugParam(slugParam);
  const { source, items } = await getResearchAbstracts();
  const item =
    items.find((a) => a.slug === slug) ||
    items.find((a) => a.slug.replace(/-+$/, '') === slug) ||
    null;
  if (!item) return null;
  return { source, item };
}
