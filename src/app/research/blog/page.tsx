import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/services';
import type { PostNode } from '@/types/blog';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import BlogListing from '@/components/research/listings/BlogListing';
import { isBlogArticlePost } from '@/lib/research/blog-posts';
import AppLoading from '@/components/ui/AppLoading';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | CrisPRO Research',
  description: 'Articles and series on AI oncology, CRISPR therapeutics, and precision medicine.',
};

interface PostEdge {
  node: PostNode;
}

function categoryFromSearchParams(searchParams: Record<string, string | string[] | undefined> | undefined): string {
  const raw = searchParams?.category;
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s || typeof s !== 'string') return '';
  try {
    return decodeURIComponent(s.trim());
  } catch {
    return s.trim();
  }
}

export default async function ResearchBlogIndexPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [postsData, categoriesData] = await Promise.all([getPosts().catch(() => []), getCategories().catch(() => [])]);

  const posts = (Array.isArray(postsData) ? postsData.map((e: PostEdge) => e.node) : []).filter(isBlogArticlePost);
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  const serverCategory = categoryFromSearchParams(searchParams);

  return (
    <Suspense fallback={<AppLoading label="Loading blog" />}>
      <ResearchSectionShell
        chrome={{
          section: 'blog',
          backHref: '/research',
          backLabel: 'Back to Research',
          sectionTitle: 'CrisPRO Blog',
          sectionDescription:
            'Insights, news, and research at the intersection of AI and oncology — organized by series where it matters.',
        }}
      >
        <BlogListing posts={posts} categories={categories} serverCategory={serverCategory} />
      </ResearchSectionShell>
    </Suspense>
  );
}
