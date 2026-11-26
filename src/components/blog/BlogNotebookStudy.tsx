'use client';

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

interface BlogNotebookStudyProps {
  bundle: NotebookBundleData | null | undefined;
}

const SECTIONS = [
  { id: 'listen', label: 'Listen' },
  { id: 'see', label: 'See' },
  { id: 'explore', label: 'Explore' },
  { id: 'study', label: 'Study' },
  { id: 'ask', label: 'Ask' },
] as const;

export default function BlogNotebookStudy({ bundle }: BlogNotebookStudyProps) {
  if (!notebookBundleHasStudyContent(bundle)) return null;

  const quizQuestions = nlmQuizToQuestions(bundle?.quizJson);
  const flashcards = nlmFlashcardsToCards(bundle?.flashcardsJson);
  const faqs = parseFaqItems(bundle?.faqJson);
  const hasAudio = Boolean(bundle?.audioUrl?.trim());
  const hasPdf = Boolean(bundle?.slidePdf?.url);
  const hasMind = Boolean(bundle?.mindMapJson?.nodes?.length || bundle?.mindMapJson?.root);
  const hasTable = Boolean(bundle?.dataTableCsv?.trim());
  const hasStudy = quizQuestions.length > 0 || flashcards.length > 0;

  const available = SECTIONS.filter((s) => {
    if (s.id === 'listen') return hasAudio;
    if (s.id === 'see') return hasPdf;
    if (s.id === 'explore') return hasMind || hasTable;
    if (s.id === 'study') return hasStudy;
    if (s.id === 'ask') return faqs.length > 0;
    return false;
  });

  return (
    <section className="not-prose my-12 space-y-10 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/40 sm:p-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          Notebook study pack
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {bundle?.title || 'Interactive study'}
        </h2>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Listen → See → Explore → Study → Ask. Content generated from NotebookLM and published
          through Hygraph.
        </p>
        {available.length ? (
          <nav className="flex flex-wrap gap-2 pt-2">
            {available.map((s) => (
              <a
                key={s.id}
                href={`#nlm-${s.id}`}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-slate-600 dark:text-slate-300"
              >
                {s.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      {hasAudio ? (
        <div id="nlm-listen" className="space-y-3 scroll-mt-24">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Listen</h3>
          <audio controls className="w-full" preload="metadata" src={bundle!.audioUrl!}>
            <track kind="captions" />
          </audio>
        </div>
      ) : null}

      {hasPdf ? (
        <div id="nlm-see" className="space-y-3 scroll-mt-24">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">See</h3>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <iframe
              title={bundle?.slidePdf?.fileName || 'Slide deck PDF'}
              src={bundle!.slidePdf!.url}
              className="h-[70vh] w-full bg-white"
            />
          </div>
          <a
            href={bundle!.slidePdf!.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
          >
            Open PDF
          </a>
        </div>
      ) : null}

      {hasMind || hasTable ? (
        <div id="nlm-explore" className="space-y-8 scroll-mt-24">
          {hasMind && bundle?.mindMapJson ? (
            <BlogNotebookMindMap mindMap={bundle.mindMapJson} />
          ) : null}
          {hasTable && bundle?.dataTableCsv ? (
            <BlogNotebookDataTable csv={bundle.dataTableCsv} />
          ) : null}
        </div>
      ) : null}

      {hasStudy ? (
        <div id="nlm-study" className="space-y-10 scroll-mt-24">
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
      ) : null}

      {faqs.length ? (
        <div id="nlm-ask" className="space-y-4 scroll-mt-24">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Ask</h3>
          <dl className="space-y-3">
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
        </div>
      ) : null}
    </section>
  );
}
