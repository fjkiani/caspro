import { NextResponse } from 'next/server';
import { getCategories, getPosts } from '@/services/index';

const POST_LIMIT = 24;

type PostEdge = { node?: { slug?: string | null; title?: string | null } };

/**
 * Lightweight blog payload for navbar dropdowns (Hygraph / GraphCMS).
 */
export async function GET() {
  try {
    const [edges, categories] = await Promise.all([getPosts(), getCategories()]);
    const posts = (Array.isArray(edges) ? edges : [])
      .map((edge: PostEdge) => {
        const n = edge?.node;
        if (!n) return null;
        const slug = n.slug?.trim();
        if (!slug) return null;
        const titleRaw = n.title != null ? String(n.title).trim() : '';
        return { slug, title: titleRaw || slug };
      })
      .filter((p): p is { slug: string; title: string } => p != null)
      .slice(0, POST_LIMIT);

    const cats = (Array.isArray(categories) ? categories : [])
      .map((c: { slug?: string | null; name?: string | null }) => {
        const slug = c?.slug?.trim();
        if (!slug) return null;
        return { slug, name: (c.name && String(c.name).trim()) || slug };
      })
      .filter((c): c is { slug: string; name: string } => c != null);

    return NextResponse.json(
      { posts, categories: cats },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (e) {
    console.error('[api/blog/nav]', e);
    return NextResponse.json({ posts: [], categories: [] }, { status: 200 });
  }
}
