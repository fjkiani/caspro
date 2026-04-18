import React from 'react';
import { getPosts, getCategories } from '@/services';
import BlogPageClient from './BlogPageClient';
import { PostNode } from '@/types/blog';

interface PostEdge {
  node: PostNode;
}

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  let posts: PostNode[] = [];
  let categories: { name: string; slug: string }[] = [];

  try {
    const fetchedPostsData = await getPosts();
    if (Array.isArray(fetchedPostsData)) {
      posts = fetchedPostsData.map((edge: PostEdge) => edge.node);
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    posts = [];
  }
  try {
    const fetchedCategories = await getCategories();
    categories = Array.isArray(fetchedCategories) ? fetchedCategories : [];
  } catch (error) {
    console.error('Failed to fetch blog categories:', error);
    categories = [];
  }

  const initialCategory = typeof searchParams?.category === 'string' ? searchParams.category : '';

  return (
    <BlogPageClient
      key={initialCategory || 'all'}
      posts={posts}
      categories={categories}
      initialCategory={initialCategory}
    />
  );
}
