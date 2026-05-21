import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPosts, getCategories, getDeckPosts } from '@/services';
import { getAllUseCasesCms } from '@/lib/docs/hygraph/use-case-queries';
import type { PostNode } from '@/types/blog';
import ResearchClient from './ResearchClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Research | CrisPRO.ai',
  description: 'Articles, blog posts, and long-form manuscripts from the CrisPRO research team — covering AI oncology, CRISPR therapeutics, and precision medicine.',
  openGraph: {
    title: 'Research | CrisPRO.ai',
    description: 'Articles and manuscripts from the CrisPRO research team.',
    url: 'https://crispro.ai/research',
    siteName: 'CrisPRO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research | CrisPRO.ai',
    description: 'Articles and manuscripts from the CrisPRO research team.',
    site: '@crispro_ai',
  },
};

interface PostEdge {
  node: PostNode;
}

export default async function ResearchPage() {
  const [postsData, categoriesData, manuscripts, deckPosts] = await Promise.all([
    getPosts().catch(() => []),
    getCategories().catch(() => []),
    getAllUseCasesCms().catch(() => []),
    getDeckPosts().catch(() => []),
  ]);

  const posts: PostNode[] = Array.isArray(postsData)
    ? postsData.map((edge: PostEdge) => edge.node)
    : [];

  const categories: { name: string; slug: string }[] = Array.isArray(categoriesData)
    ? categoriesData
    : [];

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#020408] flex items-center justify-center">
        <div className="text-slate-400 dark:text-zinc-600 text-sm font-mono uppercase tracking-widest">Loading…</div>
      </div>
    }>
      <ResearchClient
        posts={posts}
        categories={categories}
        manuscripts={manuscripts}
        deckPosts={deckPosts}
      />
    </Suspense>
  );
}
