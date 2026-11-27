'use client';

/**
 * True one-pager infographic — hierarchy + metrics + process + key facts
 * synthesized via synthesizeNotebookInfographic (not a vertical dump of widgets).
 */

import { useMemo } from 'react';
import type { NotebookBundleData } from '@/lib/blog/notebooklm-adapters';
import { synthesizeNotebookInfographic } from '@/lib/blog/synthesize-notebook-infographic';

export interface BlogNotebookInfographicProps {
  bundle: NotebookBundleData;
}

export default function BlogNotebookInfographic({ bundle }: BlogNotebookInfographicProps) {
  const model = useMemo(() => synthesizeNotebookInfographic(bundle), [bundle]);

  if (!model) {
    return (
      <p className="px-1 text-sm text-slate-500 dark:text-slate-400">
        No infographic sources yet (mind map, metrics table, FAQ, or flashcards).
      </p>
    );
  }

  return (
    <article
      className="nlm-infographic mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/80 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950/40"
      aria-label="Notebook infographic"
    >
      {/* Title band */}
      <header className="border-b border-slate-200/80 bg-slate-900 px-5 py-5 text-white dark:border-slate-700 sm:px-8 sm:py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300">
          Infographic · derived
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{model.title}</h3>
        <p className="mt-1 text-sm text-slate-300">{model.subtitle}</p>
      </header>

      <div className="space-y-6 px-4 py-5 sm:px-8 sm:py-7">
        {/* Hierarchy — root → branch columns (one composition, not nested tree dump) */}
        {model.branches.length > 0 ? (
          <section aria-label="Concept hierarchy">
            <div className="mb-4 flex flex-col items-center gap-2">
              <div className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm">
                {model.root}
              </div>
              <div
                className="h-6 w-px bg-gradient-to-b from-sky-500 to-slate-300 dark:to-slate-600"
                aria-hidden
              />
            </div>
            <div
              className={`grid gap-3 ${
                model.branches.length === 1
                  ? 'grid-cols-1'
                  : model.branches.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {model.branches.map((b, i) => (
                <div
                  key={b.id}
                  className="relative rounded-lg border border-slate-200 bg-white/90 p-3 dark:border-slate-700 dark:bg-slate-900/80"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{b.label}</p>
                  {b.children.length ? (
                    <ul className="mt-2 space-y-1.5">
                      {b.children.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                            aria-hidden
                          />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Metrics strip */}
        {model.metrics.length > 0 ? (
          <section aria-label="Key metrics">
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {model.metrics.map((m) => (
                <div
                  key={`${m.label}-${m.value}`}
                  className="border-l-2 border-sky-500/80 bg-white/70 px-3 py-2 dark:bg-slate-900/60"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {m.label}
                  </p>
                  <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-slate-50">
                    {m.value}
                  </p>
                  {m.detail ? (
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {m.detail}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Process trail */}
        {model.process.length > 0 ? (
          <section aria-label="Process">
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Process
            </h4>
            <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
              {model.process.map((step, i) => (
                <li key={`${step}-${i}`} className="flex min-w-0 flex-1 items-stretch gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white dark:bg-sky-600">
                      {i + 1}
                    </span>
                    <span className="min-w-0 text-xs font-medium text-slate-800 dark:text-slate-100">
                      {step}
                    </span>
                  </div>
                  {i < model.process.length - 1 ? (
                    <span
                      className="hidden shrink-0 self-center text-slate-300 sm:inline dark:text-slate-600"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Key facts — compact, integrated into the one-pager */}
        {model.keyFacts.length > 0 ? (
          <section aria-label="Key facts">
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Key facts
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {model.keyFacts.map((f, i) => (
                <div
                  key={`${f.question}-${i}`}
                  className="rounded-md bg-sky-50/80 px-3 py-2 dark:bg-sky-950/40"
                >
                  <p className="text-xs font-semibold text-sky-900 dark:text-sky-200">
                    {f.question}
                  </p>
                  <p className="mt-1 line-clamp-3 text-xs text-slate-600 dark:text-slate-300">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
