'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookOpen, FileText, Presentation, ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import moment from 'moment';
import type { PostNode } from '@/types/blog';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';

type Tab = 'articles' | 'manuscripts' | 'decks';

/** Deck post — PostNode extended with optional deck fields from getDeckPosts */
interface DeckPost extends PostNode {
  pdfDeck?: { url: string; fileName?: string | null } | null;
  pdfDeckUrl?: string | null;
  slideDeckSlug?: string | null;
}

interface ResearchClientProps {
  posts: PostNode[];
  categories: { name: string; slug: string }[];
  manuscripts: CmsUseCase[];
  deckPosts: DeckPost[];
}

// ─── Shared helpers ──────────────────────────────────────────────────────────

function tabButtonClass(active: boolean, isDarkMode: boolean) {
  return `flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all ${
    active
      ? isDarkMode
        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
        : 'bg-white text-indigo-700 border border-indigo-200 shadow-sm'
      : isDarkMode
        ? 'text-zinc-400 hover:text-zinc-200'
        : 'text-slate-500 hover:text-slate-800'
  }`;
}

function badgeClass(active: boolean, isDarkMode: boolean) {
  return `text-[9px] px-1.5 py-0.5 rounded font-black ${
    active
      ? isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-indigo-100 text-indigo-600'
      : isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-500'
  }`;
}

// ─── Articles tab ─────────────────────────────────────────────────────────────

function ArticlesTab({
  posts,
  categories,
  isDarkMode,
}: {
  posts: PostNode[];
  categories: { name: string; slug: string }[];
  isDarkMode: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCategory = searchParams?.get('category')?.trim() ?? '';
  let activeSlug = rawCategory;
  try { activeSlug = decodeURIComponent(rawCategory); } catch { /* keep raw */ }

  const setCategory = useCallback(
    (slug: string) => {
      router.replace(slug ? `/research?category=${encodeURIComponent(slug)}` : '/research', { scroll: false });
    },
    [router]
  );

  const filteredPosts = useMemo(() => {
    if (!activeSlug) return posts;
    return posts.filter((p) => (p.categories || []).some((c) => c.slug === activeSlug));
  }, [posts, activeSlug]);

  // Build category chips from both CMS categories and post-embedded categories
  const categoryChips = useMemo(() => {
    const bySlug = new Map<string, string>();
    (categories || []).forEach((c) => { if (c?.slug) bySlug.set(c.slug, c.name || c.slug); });
    posts.forEach((p) => {
      (p.categories || []).forEach((c) => {
        if (!c?.slug) return;
        if (!bySlug.has(c.slug)) bySlug.set(c.slug, c.name || c.slug);
      });
    });
    return Array.from(bySlug.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }, [categories, posts]);

  const featuredPost = !activeSlug && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = useMemo(() => {
    if (activeSlug) return filteredPosts;
    return filteredPosts.slice(1);
  }, [activeSlug, filteredPosts]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
      {/* Category filter chips */}
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

      {/* Featured post */}
      {featuredPost && (
        <div className={`group grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-2xl border mb-16 hover:border-primary/30 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-800/30 border-slate-700/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <Link href={`/blog/post/${featuredPost.slug}/`} prefetch>
            <div className="relative block h-80 overflow-hidden rounded-lg">
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
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Featured Article</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors duration-200">
              <Link href={`/blog/post/${featuredPost.slug}/`} prefetch>{featuredPost.title}</Link>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-4">{featuredPost.excerpt}</p>
            <div className="mt-auto">
              <Link
                href={`/blog/post/${featuredPost.slug}/`}
                prefetch
                className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
              >
                Read Full Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Post grid */}
      {gridPosts.length > 0 && (
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 mb-4">
            {featuredPost ? 'More articles' : 'Latest articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {gridPosts.map((post) => (
              <div
                key={post.slug}
                className="group rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col border shadow-md hover:shadow-lg bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-600 hover:border-cyan-500/40"
              >
                <Link href={`/blog/post/${post.slug}/`} prefetch>
                  <div className="relative block overflow-hidden h-52 sm:h-56">
                    {post.featuredImage?.url ? (
                      <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </Link>
                <div className="flex flex-col flex-grow p-6 sm:p-7">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {moment(post.createdAt).format('MMMM DD, YYYY')}
                  </p>
                  <h3 className="font-semibold text-xl leading-snug text-slate-900 dark:text-slate-100 mb-3 flex-grow hover:text-primary transition-colors duration-200">
                    <Link href={`/blog/post/${post.slug}/`} prefetch>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto">
                    <Link
                      href={`/blog/post/${post.slug}/`}
                      prefetch
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-slate-600 dark:text-slate-400">No articles found. Check back soon!</p>
        </div>
      )}

      {posts.length > 0 && filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">No posts in this category.</p>
          <button type="button" onClick={() => setCategory('')} className="text-primary font-semibold underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Manuscripts tab ──────────────────────────────────────────────────────────

function ManuscriptsTab({
  manuscripts,
  isDarkMode,
}: {
  manuscripts: CmsUseCase[];
  isDarkMode: boolean;
}) {
  const withSlug = manuscripts.filter((u) => u.slug);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 font-mono">
      {withSlug.length === 0 ? (
        <div className={`rounded-xl border p-8 text-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60 text-zinc-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No manuscripts published yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {withSlug.map((uc) => (
            <li key={uc.id}>
              <Link
                href={`/manuscripts/${encodeURIComponent(uc.slug!)}/`}
                prefetch
                className={`block rounded-xl border p-5 shadow-sm transition-all ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                  {uc.title}
                </h2>
                {(uc.resultsHeadline || uc.description) && (
                  <p className={`mt-1 text-sm line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {uc.resultsHeadline || uc.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// ─── Decks tab ────────────────────────────────────────────────────────────────

function DecksTab({
  deckPosts,
  isDarkMode,
}: {
  deckPosts: DeckPost[];
  isDarkMode: boolean;
}) {
  if (deckPosts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Presentation className={`w-12 h-12 mx-auto mb-3 opacity-40 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
        <p className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>No decks published yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deckPosts.map((post) => {
          const pdfUrl = post.pdfDeck?.url || post.pdfDeckUrl || null;
          const hasDeckViewer = Boolean(post.slideDeckSlug?.trim());

          return (
            <div
              key={post.slug}
              className={`group rounded-xl border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all ${
                isDarkMode
                  ? 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Thumbnail */}
              <Link href={`/blog/post/${post.slug}/`} prefetch className="block">
                <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-zinc-900">
                  {post.featuredImage?.url ? (
                    <img
                      src={post.featuredImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Presentation className={`w-10 h-10 opacity-30 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
                    </div>
                  )}
                  {/* Deck badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                      hasDeckViewer
                        ? 'bg-indigo-600 text-white'
                        : 'bg-cyan-600 text-white'
                    }`}>
                      {hasDeckViewer ? 'Slides' : 'PDF'}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {moment(post.createdAt).format('MMM YYYY')}
                </p>
                <h3 className={`text-sm font-bold leading-snug mb-2 flex-grow ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                  <Link href={`/blog/post/${post.slug}/`} prefetch className="hover:text-cyan-500 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p className={`text-xs line-clamp-2 mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {post.excerpt}
                  </p>
                )}

                {/* CTAs */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <Link
                    href={`/blog/post/${post.slug}/`}
                    prefetch
                    className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Presentation className="w-3 h-3" />
                    View deck
                  </Link>
                  {pdfUrl && (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ResearchClient({ posts, categories, manuscripts, deckPosts }: ResearchClientProps) {
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams?.get('tab');
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam === 'manuscripts' ? 'manuscripts' : tabParam === 'decks' ? 'decks' : 'articles'
  );

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    // Clear category filter when switching away from articles
    if (tab !== 'articles') params.delete('category');
    if (tab === 'articles') {
      params.delete('tab');
    } else {
      params.set('tab', tab);
    }
    const qs = params.toString();
    router.replace(`/research${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  useEffect(() => {
    setActiveTab(
      tabParam === 'manuscripts' ? 'manuscripts' : tabParam === 'decks' ? 'decks' : 'articles'
    );
  }, [tabParam]);

  const withSlug = manuscripts.filter((u) => u.slug);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'}`}>
      {/* Sticky tab bar */}
      <div className={`sticky top-14 z-40 border-b backdrop-blur-md ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              CRISPRO · KNOWLEDGE BASE
            </p>
            <h1 className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              RESEARCH
            </h1>
          </div>

          {/* Tab pills */}
          <div className={`inline-flex rounded-lg p-1 gap-1 border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
            <button type="button" onClick={() => switchTab('articles')} className={tabButtonClass(activeTab === 'articles', isDarkMode)}>
              <BookOpen className="w-3.5 h-3.5" />
              Articles
              <span className={badgeClass(activeTab === 'articles', isDarkMode)}>{posts.length}</span>
            </button>

            <button type="button" onClick={() => switchTab('manuscripts')} className={tabButtonClass(activeTab === 'manuscripts', isDarkMode)}>
              <FileText className="w-3.5 h-3.5" />
              Manuscripts
              <span className={badgeClass(activeTab === 'manuscripts', isDarkMode)}>{withSlug.length}</span>
            </button>

            <button type="button" onClick={() => switchTab('decks')} className={tabButtonClass(activeTab === 'decks', isDarkMode)}>
              <Presentation className="w-3.5 h-3.5" />
              Decks
              <span className={badgeClass(activeTab === 'decks', isDarkMode)}>{deckPosts.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'articles' && (
        <ArticlesTab posts={posts} categories={categories} isDarkMode={isDarkMode} />
      )}
      {activeTab === 'manuscripts' && (
        <ManuscriptsTab manuscripts={manuscripts} isDarkMode={isDarkMode} />
      )}
      {activeTab === 'decks' && (
        <DecksTab deckPosts={deckPosts} isDarkMode={isDarkMode} />
      )}
    </div>
  );
}
