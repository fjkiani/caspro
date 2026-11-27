'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  notebookBundleHasStudyContent,
  parseFaqItems,
  type NotebookBundleData,
} from '@/lib/blog/notebooklm-adapters';
import {
  formatSlideCaption,
  pairSlidesWithCaptions,
  type SlideCaption,
} from '@/lib/blog/pair-slides-with-captions';
import BlogPdfPager from './BlogPdfPager';
import BlogNotebookInfographic from './BlogNotebookInfographic';
import BlogPostBody, { type BlogPostBodyContent } from './BlogPostBody';
import { RESEARCH_SECTIONS } from '@/lib/blog/paths';

export interface BlogNotebookStudyProps {
  bundle: NotebookBundleData | null | undefined;
  /** Post body (report.md → Slate) — paired under PDF pages, not a siloed Read tab */
  readContent?: BlogPostBodyContent | null;
  title?: string;
  /** Compact chrome: fill remaining viewport (book mode) */
  bookMode?: boolean;
  /** Back link target when bookMode (defaults to research blog index) */
  blogHref?: string;
}

type ChapterId = 'deck' | 'infographic' | 'ask';

const CHAPTER_META: { id: ChapterId; label: string }[] = [
  { id: 'deck', label: 'Deck' },
  { id: 'infographic', label: 'Infographic' },
  { id: 'ask', label: 'Ask' },
];

function chapterFromHash(): ChapterId | null {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace(/^#/, '').replace(/^nlm-/, '');
  // Legacy hashes from siloed tabs → map into new chapters
  if (raw === 'read' || raw === 'see' || raw === 'listen' || raw === 'study') return 'deck';
  if (raw === 'explore') return 'infographic';
  if (CHAPTER_META.some((t) => t.id === raw)) return raw as ChapterId;
  return null;
}

export default function BlogNotebookStudy({
  bundle,
  readContent = null,
  title,
  bookMode = true,
  blogHref = RESEARCH_SECTIONS.blog,
}: BlogNotebookStudyProps) {
  const faqs = parseFaqItems(bundle?.faqJson);
  const hasAudio = Boolean(bundle?.audioUrl?.trim());
  const hasPdf = Boolean(bundle?.slidePdf?.url);
  const hasMind = Boolean(bundle?.mindMapJson?.nodes?.length || bundle?.mindMapJson?.root);
  const hasTable = Boolean(bundle?.dataTableCsv?.trim());
  const hasFlash = Boolean(bundle?.flashcardsJson?.cards?.length);
  const hasRead = Boolean(readContent?.raw || readContent?.markdown || readContent?.text);
  const hasAsk = faqs.length > 0;
  const hasInfographic = hasMind || hasTable || hasFlash || hasAsk;
  const hasDeck = hasPdf || hasRead;
  const hasAny =
    notebookBundleHasStudyContent(bundle) || hasRead;

  const available = useMemo(
    () =>
      CHAPTER_META.filter((s) => {
        if (s.id === 'deck') return hasDeck;
        if (s.id === 'infographic') return hasInfographic;
        if (s.id === 'ask') return hasAsk;
        return false;
      }),
    [hasDeck, hasInfographic, hasAsk],
  );

  const [active, setActive] = useState<ChapterId>('deck');
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!available.length) return;
    const fromHash = chapterFromHash();
    if (fromHash && available.some((t) => t.id === fromHash)) {
      setActive(fromHash);
      return;
    }
    setActive((prev) =>
      available.some((t) => t.id === prev) ? prev : available[0].id,
    );
  }, [available]);

  // Lock document scroll while book mode is mounted (ResearchChrome is CSS-hidden).
  useEffect(() => {
    if (!bookMode || !hasAny) return;
    const root = document.documentElement;
    root.classList.add('nlm-book-lock');
    return () => {
      root.classList.remove('nlm-book-lock');
    };
  }, [bookMode, hasAny]);

  const captions: SlideCaption[] = useMemo(() => {
    const count = pageCount > 0 ? pageCount : hasPdf ? 1 : 0;
    if (!count) return [];
    return pairSlidesWithCaptions({
      pageCount: count,
      reportMarkdown: readContent?.markdown,
      reportText: readContent?.text,
      reportRaw: readContent?.raw,
      faqs,
      flashcards: bundle?.flashcardsJson,
      mindMap: bundle?.mindMapJson,
    });
  }, [
    pageCount,
    hasPdf,
    readContent?.markdown,
    readContent?.text,
    readContent?.raw,
    faqs,
    bundle?.flashcardsJson,
    bundle?.mindMapJson,
  ]);

  const currentCaption = captions[Math.max(0, pageNumber - 1)];
  const captionText = formatSlideCaption(currentCaption);

  const selectChapter = useCallback((id: ChapterId) => {
    setActive(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  const onPageChange = useCallback((page: number, numPages: number) => {
    setPageNumber(page);
    setPageCount(numPages);
  }, []);

  if (!hasAny || !available.length) return null;

  // Fixed under ZetaNavbar (h-14). Document scroll is locked via .nlm-book-lock.
  const shellClass = bookMode
    ? 'not-prose fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950'
    : 'not-prose my-12 flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/40';

  return (
    <section className={shellClass}>
      {/* Sticky audio — always visible when present; play while reading deck below */}
      {hasAudio ? (
        <div className="shrink-0 border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 sm:px-6">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 shrink-0">
              <Link
                href={blogHref}
                className="inline-flex items-center text-[11px] font-semibold text-sky-700 hover:underline dark:text-sky-300"
              >
                <ChevronLeft className="mr-0.5 h-3.5 w-3.5" />
                Blog
              </Link>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
                {title || bundle?.title || 'Interactive study'}
              </p>
            </div>
            <audio
              controls
              className="w-full min-w-0 flex-1"
              preload="metadata"
              src={bundle!.audioUrl!}
            >
              <track kind="captions" />
            </audio>
          </div>
        </div>
      ) : (
        <header className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-700 sm:px-6">
          {bookMode ? (
            <Link
              href={blogHref}
              className="mb-1 inline-flex items-center text-[11px] font-semibold text-sky-700 hover:underline dark:text-sky-300"
            >
              <ChevronLeft className="mr-0.5 h-3.5 w-3.5" />
              Blog
            </Link>
          ) : (
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Notebook study
            </p>
          )}
          <h2 className="truncate text-lg font-bold text-slate-900 dark:text-slate-50 sm:text-xl">
            {title || bundle?.title || 'Interactive study'}
          </h2>
        </header>
      )}

      {/* Thin chapter switcher — not siloed Read/See/Listen */}
      <nav
        className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 px-4 py-2 dark:border-slate-700 sm:px-6"
        aria-label="Study chapters"
      >
        {available.map((s) => {
          const isOn = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectChapter(s.id)}
              className={`shrink-0 rounded-md px-3 py-1 text-xs font-semibold transition ${
                isOn
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
              aria-current={isOn ? 'page' : undefined}
            >
              {s.label}
            </button>
          );
        })}
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" role="tabpanel" id={`nlm-${active}`}>
        {active === 'deck' ? (
          hasPdf ? (
            <div className="flex h-full min-h-0 flex-col px-2 py-2 sm:px-4">
              <BlogPdfPager
                url={bundle!.slidePdf!.url}
                title={bundle?.slidePdf?.fileName || bundle?.title || 'Slides'}
                className="min-h-0 flex-1"
                compact
                onPageChange={onPageChange}
                caption={captionText || null}
              />
            </div>
          ) : hasRead ? (
            <div className="prose prose-slate dark:prose-invert max-w-none px-4 py-4 pb-8 sm:px-6">
              <BlogPostBody content={readContent} />
            </div>
          ) : null
        ) : null}

        {active === 'infographic' && bundle ? (
          <div className="px-4 py-4 sm:px-6">
            <BlogNotebookInfographic bundle={bundle} />
          </div>
        ) : null}

        {active === 'ask' ? (
          <dl className="space-y-3 px-4 py-4 pb-8 sm:px-6">
            {faqs.map((item, i) => (
              <div key={`${item.question}-${i}`} className="border-b border-slate-200 pb-3 dark:border-slate-700">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">{item.question}</dt>
                <dd className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <footer className="shrink-0 border-t border-slate-200 px-4 py-1.5 text-center text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:px-6">
        {active === 'deck' && hasPdf
          ? '← → change slide · audio stays on top'
          : 'Deck pairs each slide with its explanation'}
      </footer>
    </section>
  );
}
