'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { isLikelyDirectPdfIframeUrl } from '@/lib/blog/embeddable-url';

const DynamicDeckViewer = dynamic(
  () => import('@/components/media/DynamicDeckViewer'),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[min(72vh,560px)] w-full rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse"
        aria-hidden
      />
    ),
  }
);

const BlogPdfPager = dynamic(() => import('@/components/blog/BlogPdfPager'), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[420px] h-[min(72vh,640px)] w-full bg-slate-100 dark:bg-zinc-900 animate-pulse"
      aria-hidden
    />
  ),
});

function buildDeckMedia(title: string, deckSlug: string): MediaItem {
  const now = new Date().toISOString();
  return {
    id: `blog-hero-deck-${deckSlug}`,
    title,
    slug: `blog-hero-${deckSlug}`,
    type: 'DECK',
    order: 0,
    isPublished: true,
    publishedAt: now,
    updatedAt: now,
    deckSlug,
  };
}

export interface BlogPostHeroProps {
  postTitle: string;
  featuredImageUrl?: string | null;
  pdfDeck?: { url: string; fileName?: string | null } | null;
  pdfDeckUrl?: string | null;
  slideDeckSlug?: string | null;
}

const heroFrame =
  'not-prose mb-8 overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-zinc-700';

/**
 * Article hero. Priority:
 *   1. In-repo deck (registry slug) → `DynamicDeckViewer` full-width.
 *   2. PDF (Hygraph Asset or pasted URL) → client pager (one page at a time).
 *   3. Featured image.
 *
 * If both an in-repo deck and a featured image exist, render a small image/deck
 * tab strip ABOVE the hero so the deck's own controls aren't covered.
 */
export default function BlogPostHero({
  postTitle,
  featuredImageUrl,
  pdfDeck,
  pdfDeckUrl,
  slideDeckSlug,
}: BlogPostHeroProps) {
  const deckSlug = slideDeckSlug?.trim() || '';
  /** Hygraph Asset URL (same as use cases) — always iframe. Optional string `pdfDeckUrl` only if embeddable. */
  const pdfDeckAssetUrl = pdfDeck?.url?.trim() || '';
  const pdfDeckStringUrl = pdfDeckUrl?.trim() || '';
  const pdfUrl = pdfDeckAssetUrl || pdfDeckStringUrl;
  const imageUrl = featuredImageUrl?.trim() || '';
  const [heroSlide, setHeroSlide] = useState<0 | 1>(0);

  useEffect(() => {
    setHeroSlide(0);
  }, [deckSlug, imageUrl, pdfUrl]);

  if (deckSlug && imageUrl) {
    const deckMedia = buildDeckMedia(postTitle, deckSlug);
    const go = (dir: -1 | 1) => setHeroSlide((s) => ((s + dir + 2) % 2) as 0 | 1);

    return (
      <div className="not-prose mb-8">
        <div
          className="mb-3 flex flex-wrap items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-zinc-600 dark:bg-zinc-900/80"
          role="tablist"
          aria-label="Hero media"
        >
          <button
            type="button"
            role="tab"
            aria-selected={heroSlide === 0}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              heroSlide === 0
                ? 'bg-white text-slate-900 shadow dark:bg-zinc-800 dark:text-slate-100'
                : 'text-slate-600 hover:bg-white/80 dark:text-slate-400 dark:hover:bg-zinc-800'
            }`}
            onClick={() => setHeroSlide(0)}
          >
            Featured image
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={heroSlide === 1}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              heroSlide === 1
                ? 'bg-white text-slate-900 shadow dark:bg-zinc-800 dark:text-slate-100'
                : 'text-slate-600 hover:bg-white/80 dark:text-slate-400 dark:hover:bg-zinc-800'
            }`}
            onClick={() => setHeroSlide(1)}
          >
            Slide deck
          </button>
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:inline dark:bg-zinc-600" aria-hidden />
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-600 hover:bg-white/80 dark:text-slate-400 dark:hover:bg-zinc-800"
            aria-label="Previous"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-600 hover:bg-white/80 dark:text-slate-400 dark:hover:bg-zinc-800"
            aria-label="Next"
            onClick={() => go(1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className={heroFrame}>
          <div className="relative min-h-[min(72vh,640px)] w-full bg-slate-950/5 dark:bg-zinc-950/40">
            <div
              className={heroSlide === 0 ? 'relative block' : 'sr-only'}
              aria-hidden={heroSlide !== 0}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={postTitle}
                className="h-[min(72vh,640px)] min-h-[420px] w-full object-cover"
              />
            </div>
            <div
              className={
                heroSlide === 1 ? 'relative block min-h-[min(72vh,640px)]' : 'sr-only'
              }
              aria-hidden={heroSlide !== 1}
            >
              {heroSlide === 1 ? (
                <DynamicDeckViewer embedded showControls media={deckMedia} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deckSlug) {
    return (
      <div className={heroFrame}>
        <div className="relative min-h-[min(72vh,640px)] w-full bg-slate-950/5 dark:bg-zinc-950/40">
          <DynamicDeckViewer embedded showControls media={buildDeckMedia(postTitle, deckSlug)} />
        </div>
      </div>
    );
  }

  if (pdfUrl) {
    const iframeSrc = pdfDeckAssetUrl || (pdfDeckStringUrl && isLikelyDirectPdfIframeUrl(pdfDeckStringUrl) ? pdfDeckStringUrl : '');
    if (!iframeSrc) {
      return (
        <div className={heroFrame}>
          <div className="flex min-h-[280px] flex-col justify-center gap-4 bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-zinc-900 dark:to-zinc-950">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Linked resource
            </p>
            <p className="text-lg text-slate-800 dark:text-slate-200">
              This URL opens in a new tab (NotebookLM, Google Docs, and similar pages cannot be embedded here).
            </p>
            <a
              href={pdfDeckStringUrl || pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
            >
              <ExternalLink className="h-5 w-5 shrink-0" aria-hidden />
              Open slides / notebook
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className={heroFrame}>
        <BlogPdfPager url={iframeSrc} title={`${postTitle} — PDF`} />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={postTitle}
          className="h-auto max-h-[500px] w-full rounded-lg object-cover shadow-md"
        />
      </div>
    );
  }

  return null;
}
