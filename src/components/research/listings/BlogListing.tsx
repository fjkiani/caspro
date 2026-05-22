'use client';

import { useMemo, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { PostNode } from '@/types/blog';
import { researchBlogPostPath, RESEARCH_SECTIONS } from '@/lib/research/paths';
import { planBlogListingLayout } from '@/lib/blog/series-grouping';
import { blogCategoryLabel } from '@/lib/blog/blog-series-registry';
import BlogSeriesBlock from '@/components/blog/BlogSeriesBlock';
import PostCard from '@/app/blog/PostCard';
import { isBlogArticlePost } from '@/lib/research/blog-posts';
import { ABSTRACT_CATEGORY_SLUG } from '@/lib/docs/hygraph/research-abstract-queries';

export { isBlogArticlePost };

function useBlogCategoryFilter(
  posts: PostNode[],
  categories: { name: string; slug: string }[],
  serverCategory: string,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const hasCategoryKey = searchParams?.has('category');
  const rawFromUrl = hasCategoryKey ? (searchParams?.get('category')?.trim() ?? '') : '';
  let fromUrl = rawFromUrl;
  try {
    if (fromUrl) fromUrl = decodeURIComponent(rawFromUrl);
  } catch {
    /* keep raw */
  }

  /**
   * Before hydration: URL param or RSC `serverCategory` so first HTML matches a shared link.
   * After hydration: live URL only so "All" / chip changes are not stuck on stale server props.
   */
  const activeSlug = hydrated ? (hasCategoryKey ? fromUrl : '') : fromUrl || serverCategory.trim();

  const setCategory = useCallback(
    (slug: string) => {
      const base = RESEARCH_SECTIONS.blog;
      router.replace(slug ? `${base}?category=${encodeURIComponent(slug)}` : base, { scroll: false });
    },
    [router],
  );

  const categoryChips = useMemo(() => {
    const bySlug = new Map<string, string>();
    (categories || []).forEach((c) => {
      if (c?.slug && c.slug !== ABSTRACT_CATEGORY_SLUG) bySlug.set(c.slug, c.name || c.slug);
    });
    posts.forEach((p) => {
      (p.categories || []).forEach((c) => {
        if (!c?.slug || c.slug === ABSTRACT_CATEGORY_SLUG) return;
        if (!bySlug.has(c.slug)) bySlug.set(c.slug, c.name || c.slug);
      });
    });
    return Array.from(bySlug.entries())
      .map(([slug, name]) => ({ slug, name: blogCategoryLabel(slug, name) }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }, [categories, posts]);

  return { activeSlug, setCategory, categoryChips };
}

export default function BlogListing({
  posts,
  categories,
  serverCategory = '',
}: {
  posts: PostNode[];
  categories: { name: string; slug: string }[];
  /** Category filter from RSC `searchParams` — keeps layout in sync with URL and avoids hydration gaps. */
  serverCategory?: string;
}) {
  const { isDarkMode } = useTheme();
  const { activeSlug, setCategory, categoryChips } = useBlogCategoryFilter(posts, categories, serverCategory);

  const { series, standalone, featuredPost } = useMemo(
    () => planBlogListingLayout(posts, { featureStandalone: !activeSlug, categorySlug: activeSlug }),
    [posts, activeSlug],
  );

  const hasVisibleContent = series.length > 0 || standalone.length > 0 || Boolean(featuredPost);

  const chipClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors ${
      active
        ? isDarkMode
          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
          : 'border-indigo-600 bg-indigo-600 text-white text-on-primary'
        : isDarkMode
          ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
          : 'border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-900'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-6 pb-16">
      {(categoryChips.length > 0 || posts.length > 0) && (
        <div className="mb-8 md:mb-10 flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setCategory('')} className={chipClass(!activeSlug)}>
            All
          </button>
          {categoryChips.map((c) => (
            <button key={c.slug} type="button" onClick={() => setCategory(c.slug)} className={chipClass(activeSlug === c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {series.map((block) => (
        <BlogSeriesBlock key={block.key} displayName={block.displayName} posts={block.posts} />
      ))}

      {featuredPost && (
        <div
          className={`group grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-2xl border mb-14 md:mb-16 hover:border-primary/30 transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-800/30 border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <Link href={researchBlogPostPath(featuredPost.slug)} prefetch>
            <div className="relative block h-72 md:h-80 overflow-hidden rounded-lg">
              {featuredPost.featuredImage?.url ? (
                <img
                  src={featuredPost.featuredImage.url}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <span className="text-slate-500 dark:text-slate-400">No Image Available</span>
                </div>
              )}
            </div>
          </Link>
          <div className="flex flex-col">
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Featured Article</p>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
              <Link href={researchBlogPostPath(featuredPost.slug)} prefetch>{featuredPost.title}</Link>
            </h3>
            <p className={`mb-6 line-clamp-4 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{featuredPost.excerpt}</p>
            <Link
              href={researchBlogPostPath(featuredPost.slug)}
              prefetch
              className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
            >
              Read Full Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}

      {standalone.length > 0 && (
        <div className="mb-6">
          <h2 className={`text-xs font-black uppercase tracking-[0.35em] mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            {series.length > 0 ? 'Also on the blog' : featuredPost ? 'More articles' : 'Latest articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {standalone.map((post) => (
              <PostCard key={post.slug} post={post} prominent />
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className={`text-xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>No articles found. Check back soon!</p>
        </div>
      )}

      {posts.length > 0 && activeSlug && !hasVisibleContent && (
        <div className="text-center py-16">
          <p className={`text-xl mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>No posts in this topic.</p>
          <button type="button" onClick={() => setCategory('')} className="text-primary font-semibold underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
