'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  nlmFlashcardsToCards,
  nlmQuizToQuestions,
  notebookBundleHasStudyContent,
  parseFaqItems,
  type NotebookBundleData,
} from '@/lib/blog/notebooklm-adapters';
import BlogNotebookQuiz from './BlogNotebookQuiz';
import BlogNotebookFlashcards from './BlogNotebookFlashcards';
import BlogNotebookMindMap from './BlogNotebookMindMap';
import BlogNotebookDataTable from './BlogNotebookDataTable';
import BlogPdfPager from './BlogPdfPager';
import BlogPostBody, { type BlogPostBodyContent } from './BlogPostBody';
import { RESEARCH_SECTIONS } from '@/lib/blog/paths';

export interface BlogNotebookStudyProps {
  bundle: NotebookBundleData | null | undefined;
  /** Post body (report.md → Slate) for the Read tab */
  readContent?: BlogPostBodyContent | null;
  title?: string;
  /** Compact chrome: fill remaining viewport (book mode) */
  bookMode?: boolean;
  /** Back link target when bookMode (defaults to research blog index) */
  blogHref?: string;
}

type TabId = 'read' | 'listen' | 'see' | 'explore' | 'study' | 'ask';

const TAB_META: { id: TabId; label: string }[] = [
  { id: 'read', label: 'Read' },
  { id: 'listen', label: 'Listen' },
  { id: 'see', label: 'See' },
  { id: 'explore', label: 'Explore' },
  { id: 'study', label: 'Study' },
  { id: 'ask', label: 'Ask' },
];

function tabFromHash(): TabId | null {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace(/^#/, '').replace(/^nlm-/, '');
  if (TAB_META.some((t) => t.id === raw)) return raw as TabId;
  return null;
}

export default function BlogNotebookStudy({
  bundle,
  readContent = null,
  title,
  bookMode = true,
  blogHref = RESEARCH_SECTIONS.blog,
}: BlogNotebookStudyProps) {
  const quizQuestions = nlmQuizToQuestions(bundle?.quizJson);
  const flashcards = nlmFlashcardsToCards(bundle?.flashcardsJson);
  const faqs = parseFaqItems(bundle?.faqJson);
  const hasAudio = Boolean(bundle?.audioUrl?.trim());
  const hasPdf = Boolean(bundle?.slidePdf?.url);
  const hasMind = Boolean(bundle?.mindMapJson?.nodes?.length || bundle?.mindMapJson?.root);
  const hasTable = Boolean(bundle?.dataTableCsv?.trim());
  const hasStudy = quizQuestions.length > 0 || flashcards.length > 0;
  const hasRead = Boolean(readContent?.raw || readContent?.markdown || readContent?.text);
  const hasAsk = faqs.length > 0;
  const hasExplore = hasMind || hasTable;
  const hasAny =
    notebookBundleHasStudyContent(bundle) || hasRead;

  const available = useMemo(
    () =>
      TAB_META.filter((s) => {
        if (s.id === 'read') return hasRead;
        if (s.id === 'listen') return hasAudio;
        if (s.id === 'see') return hasPdf;
        if (s.id === 'explore') return hasExplore;
        if (s.id === 'study') return hasStudy;
        if (s.id === 'ask') return hasAsk;
        return false;
      }),
    [hasRead, hasAudio, hasPdf, hasExplore, hasStudy, hasAsk],
  );

  const [active, setActive] = useState<TabId>('read');
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!available.length) return;
    const fromHash = tabFromHash();
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

  const selectTab = useCallback((id: TabId) => {
    setActive(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  const goRelative = useCallback(
    (delta: number) => {
      const idx = available.findIndex((t) => t.id === active);
      if (idx < 0) return;
      const next = available[idx + delta];
      if (next) selectTab(next.id);
    },
    [available, active, selectTab],
  );

  useEffect(() => {
    if (!hasAny) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goRelative(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goRelative(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goRelative, hasAny]);

  if (!hasAny || !available.length) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (Math.abs(dx) < 56) return;
    if (dx < 0) goRelative(1);
    else goRelative(-1);
  };

  const pane: Record<TabId, ReactNode> = {
    read: hasRead ? (
      <div className="prose prose-slate dark:prose-invert max-w-none px-1 pb-8">
        <BlogPostBody content={readContent} />
      </div>
    ) : null,
    listen: hasAudio ? (
      <div className="flex h-full flex-col items-center justify-center gap-6 px-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">Audio overview</p>
        <audio controls className="w-full max-w-xl" preload="metadata" src={bundle!.audioUrl!}>
          <track kind="captions" />
        </audio>
      </div>
    ) : null,
    see: hasPdf ? (
      <div className="flex h-full min-h-0 flex-col">
        <BlogPdfPager
          url={bundle!.slidePdf!.url}
          title={bundle?.slidePdf?.fileName || bundle?.title || 'Slides'}
          className="min-h-0 flex-1"
        />
      </div>
    ) : null,
    explore: hasExplore ? (
      <div className="space-y-8 px-1 pb-8">
        {hasMind && bundle?.mindMapJson ? (
          <BlogNotebookMindMap mindMap={bundle.mindMapJson} />
        ) : null}
        {hasTable && bundle?.dataTableCsv ? (
          <BlogNotebookDataTable csv={bundle.dataTableCsv} />
        ) : null}
      </div>
    ) : null,
    study: hasStudy ? (
      <div className="space-y-10 px-1 pb-8">
        {quizQuestions.length ? (
          <BlogNotebookQuiz
            questions={quizQuestions}
            title={bundle?.quizJson?.title || 'Study quiz'}
          />
        ) : null}
        {flashcards.length ? (
          <BlogNotebookFlashcards
            cards={flashcards}
            title={bundle?.flashcardsJson?.title || 'Flashcards'}
          />
        ) : null}
      </div>
    ) : null,
    ask: hasAsk ? (
      <dl className="space-y-3 px-1 pb-8">
        {faqs.map((item, i) => (
          <div
            key={`${item.question}-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <dt className="font-semibold text-slate-900 dark:text-slate-100">{item.question}</dt>
            <dd className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</dd>
          </div>
        ))}
      </dl>
    ) : null,
  };

  // Fixed under ZetaNavbar (h-14). Document scroll is locked via .nlm-book-lock.
  const shellClass = bookMode
    ? 'not-prose fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950'
    : 'not-prose my-12 flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/40';

  const activeIdx = available.findIndex((t) => t.id === active);

  return (
    <section className={shellClass}>
      <header className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-700 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
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
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Previous chapter"
              disabled={activeIdx <= 0}
              onClick={() => goRelative(-1)}
              className="rounded-lg border border-slate-300 p-2 text-slate-600 disabled:opacity-30 dark:border-slate-600 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next chapter"
              disabled={activeIdx < 0 || activeIdx >= available.length - 1}
              onClick={() => goRelative(1)}
              className="rounded-lg border border-slate-300 p-2 text-slate-600 disabled:opacity-30 dark:border-slate-600 dark:text-slate-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="mt-3 flex gap-1 overflow-x-auto pb-1" aria-label="Study chapters">
          {available.map((s) => {
            const isOn = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectTab(s.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  isOn
                    ? 'bg-sky-600 text-white shadow'
                    : 'border border-slate-300 text-slate-700 hover:border-sky-500 dark:border-slate-600 dark:text-slate-300'
                }`}
                aria-current={isOn ? 'page' : undefined}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="tabpanel"
        id={`nlm-${active}`}
      >
        {pane[active]}
      </div>

      <footer className="shrink-0 border-t border-slate-200 px-4 py-2 text-center text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:px-6">
        Swipe or ← → to change chapter · {activeIdx + 1}/{available.length || 1}
      </footer>
    </section>
  );
}
