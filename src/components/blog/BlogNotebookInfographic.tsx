'use client';

/**
 * DRY one-pager: reuses mind-map / data-table / FAQ / flashcards without a second book shell.
 */

import {
  nlmFlashcardsToCards,
  parseFaqItems,
  type NotebookBundleData,
} from '@/lib/blog/notebooklm-adapters';
import BlogNotebookMindMap from './BlogNotebookMindMap';
import BlogNotebookDataTable from './BlogNotebookDataTable';
import BlogNotebookFlashcards from './BlogNotebookFlashcards';

export interface BlogNotebookInfographicProps {
  bundle: NotebookBundleData;
}

export default function BlogNotebookInfographic({ bundle }: BlogNotebookInfographicProps) {
  const faqs = parseFaqItems(bundle.faqJson);
  const flashcards = nlmFlashcardsToCards(bundle.flashcardsJson);
  const hasMind = Boolean(bundle.mindMapJson?.nodes?.length || bundle.mindMapJson?.root);
  const hasTable = Boolean(bundle.dataTableCsv?.trim());
  const hasFaq = faqs.length > 0;
  const hasCards = flashcards.length > 0;

  if (!hasMind && !hasTable && !hasFaq && !hasCards) {
    return (
      <p className="px-1 text-sm text-slate-500 dark:text-slate-400">
        No infographic sources yet (mind map, table, FAQ, or flashcards).
      </p>
    );
  }

  return (
    <div className="space-y-8 px-1 pb-6">
      <header className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
          Infographic
        </p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          {bundle.title || 'Study at a glance'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Mind map, key facts, and flashcards in one pane.
        </p>
      </header>

      {hasMind && bundle.mindMapJson ? <BlogNotebookMindMap mindMap={bundle.mindMapJson} /> : null}

      {hasFaq ? (
        <section className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            Key questions
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {faqs.slice(0, 8).map((item, i) => (
              <div
                key={`${item.question}-${i}`}
                className="border-l-2 border-sky-500/70 pl-3 py-1"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.question}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-4">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasTable && bundle.dataTableCsv ? (
        <BlogNotebookDataTable csv={bundle.dataTableCsv} title="Metrics" />
      ) : null}

      {hasCards ? (
        <BlogNotebookFlashcards
          cards={flashcards.slice(0, 6)}
          title={bundle.flashcardsJson?.title || 'Flashcards'}
        />
      ) : null}
    </div>
  );
}
