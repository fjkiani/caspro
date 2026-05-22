'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PostCard from './PostCard';
import BlogSeriesBlock from '@/components/blog/BlogSeriesBlock';
import { PostNode, Category } from '@/types/blog';
import { ArrowRight } from 'lucide-react';
import { planBlogListingLayout } from '@/lib/blog/series-grouping';
import { blogCategoryLabel } from '@/lib/blog/blog-series-registry';

interface BlogPageClientProps {
  posts: PostNode[];
  categories: Category[];
  initialCategory: string;
}

const FeaturedPostCard: React.FC<{ post: PostNode }> = ({ post }) => (
  <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80 mb-16 hover:border-primary/30 transition-colors duration-300">
    <Link href={`/blog/post/${post.slug}/`}>
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
        <Link href={`/blog/post/${post.slug}/`}>{post.title}</Link>
      </h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-4">{post.excerpt}</p>
      <div className="mt-auto">
        <Link
          href={`/blog/post/${post.slug}/`}
          className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
        >
          Read Full Story
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
);

export default function BlogPageClient({ posts, categories, initialCategory }: BlogPageClientProps) {
  const router = useRouter();
  const activeSlug = initialCategory || '';

  const setCategory = useCallback(
    (slug: string) => {
      router.replace(slug ? `/blog/?category=${encodeURIComponent(slug)}` : '/blog/', { scroll: false });
    },
    [router]
  );

  const { series, standalone, featuredPost } = useMemo(
    () => planBlogListingLayout(posts, { featureStandalone: !activeSlug, categorySlug: activeSlug }),
    [posts, activeSlug],
  );

  const hasVisibleContent = series.length > 0 || standalone.length > 0 || Boolean(featuredPost);

  /** Union of Hygraph/GraphCMS categories and any categories embedded on posts (CMS names win on slug clash). */
  const categoryChips = useMemo(() => {
    const bySlug = new Map<string, string>();
    (categories || []).forEach((c) => {
      if (c?.slug) bySlug.set(c.slug, c.name || c.slug);
    });
    posts.forEach((p) => {
      (p.categories || []).forEach((c) => {
        if (!c?.slug) return;
        if (!bySlug.has(c.slug)) bySlug.set(c.slug, c.name || c.slug);
      });
    });
    return Array.from(bySlug.entries())
      .map(([slug, name]) => ({ slug, name: blogCategoryLabel(slug, name) }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }, [categories, posts]);

  return (
    <main className="pt-8 pb-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">CrisPRO Blog</h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Insights, news, and research at the intersection of AI and oncology.
            </p>
          </div>

          {(categoryChips.length > 0 || posts.length > 0) && (
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCategory('')}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors ${
                  !activeSlug
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                All
              </button>
              {categoryChips.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors ${
                    activeSlug === c.slug
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {series.map((block) => (
            <BlogSeriesBlock key={block.key} displayName={block.displayName} posts={block.posts} />
          ))}

          {featuredPost && <FeaturedPostCard post={featuredPost} />}

          {standalone.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 mb-4">
                {series.length > 0 ? 'Also on the blog' : 'Latest articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {standalone.map((post: PostNode) => (
                  <PostCard key={post.slug} post={post} prominent />
                ))}
              </div>
            </div>
          )}

          {(!posts || posts.length === 0) && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 dark:text-slate-400">No blog posts found. Check back soon!</p>
            </div>
          )}

          {posts.length > 0 && activeSlug && !hasVisibleContent && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">No posts in this category.</p>
              <button type="button" onClick={() => setCategory('')} className="text-primary font-semibold underline">
                Clear filter
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
