/**
 * Conference abstracts — Hygraph `Post` rows in category `conference-abstracts`.
 * Falls back to local Scholar seed when Hygraph is empty or unavailable.
 */

import { fetchWithCache, hygraphClient } from './client';
import { RESEARCH_ABSTRACTS_FALLBACK } from '@/data/research-abstracts-fallback';
import type { ResearchAbstract } from './research-abstract-types';

export const ABSTRACT_CATEGORY_SLUG = 'conference-abstracts';
const ABSTRACT_LIST_CACHE_SEC = 120;

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

const GET_ABSTRACT_POSTS = `
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

function mapPost(row: HygraphPostRow): ResearchAbstract {
  const bodyText =
    row.content?.text?.trim() ||
    row.excerpt ||
    [row.authorLine, row.venueLine].filter(Boolean).join(' · ') ||
    null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    bodyHtml: row.content?.html ?? null,
    bodyText,
    link: row.externalLink ?? null,
    imageUrl: row.featuredImage?.url ?? null,
    authorLine: row.authorLine ?? null,
    venue: row.venueLine ?? null,
    year: row.abstractYear ?? null,
    order: row.abstractOrder ?? null,
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

/**
 * Conference abstracts from Hygraph posts (category `conference-abstracts`), else local seed.
 */
export async function getResearchAbstracts(): Promise<{
  source: 'hygraph' | 'local';
  items: ResearchAbstract[];
}> {
  if (!isHygraphConfigured || !hygraphClient) {
    return { source: 'local', items: sortAbstracts(RESEARCH_ABSTRACTS_FALLBACK) };
  }

  try {
    const data = await fetchWithCache<{ posts: HygraphPostRow[] }>(
      GET_ABSTRACT_POSTS,
      undefined,
      ABSTRACT_LIST_CACHE_SEC,
    );
    const rows = data.posts ?? [];
    if (!rows.length) {
      return { source: 'local', items: sortAbstracts(RESEARCH_ABSTRACTS_FALLBACK) };
    }
    return { source: 'hygraph', items: sortAbstracts(rows.map(mapPost)) };
  } catch (error) {
    console.error('[research] Hygraph abstract posts query failed, using local seed:', error);
    return { source: 'local', items: sortAbstracts(RESEARCH_ABSTRACTS_FALLBACK) };
  }
}
