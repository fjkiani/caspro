'use client';

import dynamic from 'next/dynamic';
import { Download, Presentation } from 'lucide-react';
import type { MediaItem } from '@/lib/docs/hygraph/media-types';

const DynamicDeckViewer = dynamic(
  () => import('@/components/media/DynamicDeckViewer'),
  { ssr: false, loading: () => <div className="h-[400px] rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse" aria-hidden /> }
);

export interface BlogPostMediaProps {
  postTitle: string;
  pdfDeck?: { url: string; fileName?: string | null } | null;
  slideDeckSlug?: string | null;
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

/** PDF (Hygraph Asset) + in-repo slide deck (registry slug), same patterns as use-case + media. */
export default function BlogPostMedia({ postTitle, pdfDeck, slideDeckSlug }: BlogPostMediaProps) {
  const pdfUrl = pdfDeck?.url?.trim();
  const deckSlug = slideDeckSlug?.trim();
  if (!pdfUrl && !deckSlug) return null;

  return (
    <div className="not-prose space-y-10 my-10">
      {pdfUrl && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">PDF</h2>
          <div className="rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden bg-slate-50 dark:bg-zinc-950">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-[min(70vh,640px)] min-h-[420px] border-0"
              title={`${postTitle} — PDF`}
            />
          </div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-indigo-600 dark:text-cyan-400 hover:underline text-sm font-semibold"
          >
            <Download className="w-4 h-4" aria-hidden />
            Download PDF
          </a>
        </section>
      )}

      {deckSlug && (
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
