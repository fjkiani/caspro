import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/services';
import type { PostNode } from '@/types/blog';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import BlogListing from '@/components/research/listings/BlogListing';
import { isBlogArticlePost } from '@/lib/research/blog-posts';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | CrisPRO Research',
  description: 'Articles and series on AI oncology, CRISPR therapeutics, and precision medicine.',
};

interface PostEdge {
  node: PostNode;
}

export default async function ResearchBlogIndexPage() {
  const [postsData, categoriesData] = await Promise.all([getPosts().catch(() => []), getCategories().catch(() => [])]);

  const posts = (Array.isArray(postsData) ? postsData.map((e: PostEdge) => e.node) : []).filter(isBlogArticlePost);
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResearchSectionShell
        chrome={{
          section: 'blog',
          backHref: '/research',
          backLabel: 'Back to Research',
        }}
      >
        <BlogListing posts={posts} categories={categories} />
      </ResearchSectionShell>
    </Suspense>
  );
}
