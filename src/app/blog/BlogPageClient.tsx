'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import PostCard from './PostCard';
import { PostNode } from '@/types/blog'; // Corrected import path
// CategoriesWidget and PostWidget imports removed
import { ArrowRight } from 'lucide-react';

interface BlogPageClientProps {
  posts: PostNode[];
  // categories and recentPosts props removed
}

const FeaturedPostCard: React.FC<{ post: PostNode }> = ({ post }) => (
  <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80 mb-16 hover:border-primary/30 transition-colors duration-300">
    <Link href={`/blog/post/${post.slug}`}>
      <div className="relative block h-80 overflow-hidden rounded-lg">
        {post.featuredImage?.url ? (
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400">No Image Available</span>
          </div>
        )}
      </div>
    </Link>
    <div className="flex flex-col">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Featured Article</p>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors duration-200">
        <Link href={`/blog/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-4">{post.excerpt}</p>
      <div className="mt-auto">
        <Link href={`/blog/post/${post.slug}`} className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary-dark transition-colors duration-300">
          Read Full Story
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
);

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const otherPosts = posts && posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <main className="pt-24 pb-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">CrisPRO Blog</h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Insights, news, and research at the intersection of AI and oncology.
              </p>
            </div>

            {featuredPost && <FeaturedPostCard post={featuredPost} />}

            {otherPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post: PostNode) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
            
            {!posts || posts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-slate-600 dark:text-slate-400">No blog posts found. Check back soon!</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
} 
 