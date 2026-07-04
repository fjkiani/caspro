import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getPosts, getCategories, getDeckPosts } from '@/services';
import { getAllUseCasesCms } from '@/lib/docs/hygraph/use-case-queries';
import { getResearchAbstracts } from '@/lib/docs/hygraph/research-abstract-queries';
import { RESEARCH_SECTIONS, researchHubTabFromQuery } from '@/lib/research/paths';
import { isBlogArticlePost } from '@/lib/research/blog-posts';
import type { PostNode } from '@/types/blog';
import AppLoading from '@/components/ui/AppLoading';
import ResearchHubOverview from '@/components/research/ResearchHubOverview';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Research | CrisPRO.ai',
  description: 'Knowledge base — blog, manuscripts, decks, and conference abstracts from the CrisPRO research team.',
  openGraph: {
    title: 'Research | CrisPRO.ai',
    description: 'Knowledge base for CrisPRO research publications.',
    url: 'https://crispro.ai/research',
    siteName: 'CrisPRO',
    type: 'website',
  },
};

interface PostEdge {
  node: PostNode;
}

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: { tab?: string; category?: string };
}) {
  const tab = typeof searchParams?.tab === 'string' ? searchParams.tab : '';
  const category = typeof searchParams?.category === 'string' ? searchParams.category : '';
  if (category && (tab === 'articles' || tab === 'blog' || !tab)) {
    redirect(`${RESEARCH_SECTIONS.blog}?category=${encodeURIComponent(category)}`);
  }

  const [postsData, manuscripts, deckPosts, abstractsResult] = await Promise.all([
    getPosts().catch(() => []),
    getAllUseCasesCms().catch(() => []),
    getDeckPosts().catch(() => []),
    getResearchAbstracts().catch(() => ({ source: 'local' as const, items: [] })),
  ]);

  const posts: PostNode[] = Array.isArray(postsData)
    ? postsData.map((edge: PostEdge) => edge.node)
    : [];
  const blogPosts = posts.filter(isBlogArticlePost);

  return (
    <Suspense fallback={<AppLoading label="Loading research" />}>
      <ResearchHubOverview
        initialTab={researchHubTabFromQuery(tab || undefined)}
        blogPosts={blogPosts}
        manuscripts={manuscripts}
        deckPosts={deckPosts}
        abstracts={abstractsResult?.items ?? []}
      />
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <RelatedLinks route="/research" />
      </div>
    </Suspense>
  );
}
