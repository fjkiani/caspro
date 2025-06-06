// \'use client\'; // Removed: This is now a Server Component

import React from 'react';
import { getPosts } from '@/services'; // Only getPosts is needed now
import BlogPageClient from './BlogPageClient'; 

// Type definitions for Hygraph post data
export interface Author {
  bio?: string;
  name: string;
  id: string;
  photo?: {
    url: string;
  };
}

export interface FeaturedImage {
  url: string;
}

export interface Category { // Keep Category type in case PostNode uses it, even if not displayed separately
  name: string;
  slug: string;
}

export interface PostNode {
  author?: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: FeaturedImage;
  categories?: Category[]; // PostNode might still have categories data
}

interface PostEdge {
  node: PostNode;
}

// RecentPost interface can be removed if not used
// export interface RecentPost extends Pick<PostNode, 'title' | 'slug' | 'createdAt' | 'featuredImage'> {}

export default async function BlogPage() {
  let posts: PostNode[] = [];
  // Removed categories and recentPosts state

  try {
    const fetchedPostsData: PostEdge[] = await getPosts();

    if (Array.isArray(fetchedPostsData)) {
      posts = fetchedPostsData.map((edge: PostEdge) => edge.node);
    } else {
      console.error("getPosts did not return an array. Fetched data:", fetchedPostsData);
    }
    console.log("Fetched Posts for Blog Page (Server Component):", posts);

  } catch (error) {
    console.error("Failed to fetch blog posts in Server Component:", error);
    posts = [];
  }

  // Pass only posts to BlogPageClient
  return <BlogPageClient posts={posts} />;
} 