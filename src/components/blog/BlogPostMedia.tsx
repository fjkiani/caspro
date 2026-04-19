'use client';

import dynamic from 'next/dynamic';
import { Download, ExternalLink, Presentation } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';
import { isLikelyDirectPdfIframeUrl } from '@/lib/blog/embeddable-url';

const DynamicDeckViewer = dynamic(
  () => import('@/components/media/DynamicDeckViewer'),
  { ssr: false, loading: () => <div className="h-[400px] rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse" aria-hidden /> }
);

const BlogPdfPager = dynamic(() => import('@/components/blog/BlogPdfPager'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[420px] h-[min(70vh,640px)] w-full rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse" aria-hidden />
  ),
});

export interface BlogPostMediaProps {
  postTitle: string;
  pdfDeck?: { url: string; fileName?: string | null } | null;
  /** Fallback when the Hygraph Asset picker is not used — any HTTPS PDF URL. */
  pdfDeckUrl?: string | null;
  slideDeckSlug?: string | null;
  /** Hide slide-deck section when it is already shown in the hero. */
  suppressSlideDeck?: boolean;
  /** Hide PDF section when it is already shown in the hero. */
  suppressPdf?: boolean;
}

function buildDeckMedia(title: string, slug: string): MediaItem {
  const now = new Date().toISOString();
  return {
    id: `blog-deck-${slug}`,
    title,
    slug: `blog-${slug}`,
    type: 'DECK',
    order: 0,
    isPublished: true,
    publishedAt: now,
    updatedAt: now,
    deckSlug: slug,
  };
}

/** PDF (Hygraph Asset or pasted URL) + in-repo slide deck (registry slug), same patterns as use-case + media. */
export default function BlogPostMedia({
  postTitle,
  pdfDeck,
  pdfDeckUrl,
  slideDeckSlug,
  suppressSlideDeck = false,
  suppressPdf = false,
}: BlogPostMediaProps) {
  const pdfDeckAssetUrl = pdfDeck?.url?.trim() || '';
  const pdfDeckStringUrl = pdfDeckUrl?.trim() || '';
  const pdfUrl = pdfDeckAssetUrl || pdfDeckStringUrl;
  const iframePdfSrc =
    pdfDeckAssetUrl || (pdfDeckStringUrl && isLikelyDirectPdfIframeUrl(pdfDeckStringUrl) ? pdfDeckStringUrl : '');
  const deckSlug = slideDeckSlug?.trim();
  const showPdf = Boolean(pdfUrl) && !suppressPdf;
  const showDeck = Boolean(deckSlug) && !suppressSlideDeck;
  if (!showPdf && !showDeck) return null;

  return (
    <div className="not-prose space-y-10 my-10">
      {showPdf && pdfUrl && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">PDF</h2>
          {iframePdfSrc ? (
            <>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-950">
                <BlogPdfPager url={iframePdfSrc} title={`${postTitle} — PDF`} />
              </div>
              <a
                href={iframePdfSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-indigo-600 dark:text-cyan-400 hover:underline text-sm font-semibold"
              >
                <Download className="w-4 h-4" aria-hidden />
                Download PDF
              </a>
            </>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-700 dark:bg-zinc-950">
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                This link is not a direct PDF file, so it cannot be embedded. Open it in a new tab instead.
              </p>
              <a
                href={pdfDeckStringUrl || pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Open linked resource
              </a>
            </div>
          )}
        </section>
      )}

      {showDeck && deckSlug && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Presentation className="w-5 h-5 text-indigo-600 dark:text-cyan-400" aria-hidden />
            Slide deck
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Use ← → to move slides when the deck supports it. Keys: F fullscreen, P play/pause (where enabled).
          </p>
          <div className="rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden">
            <DynamicDeckViewer embedded showControls media={buildDeckMedia(postTitle, deckSlug)} />
          </div>
        </section>
      )}
    </div>
  );
}
