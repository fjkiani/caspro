'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { DrugRanking } from '@/data/demos/types';

/**
 * DrugRankingTiers — Stage 3 tumor board demo.
 *
 * how_it_works blurb + 3 tier sections (Strong match, Moderate match,
 * Weak match/not recommended) each with drug rows: name, fit_rationale,
 * blocking_factor (amber), estimated_fit (chip). Closing ranking_note.
 */
export default function DrugRankingTiers({ data }: { data: DrugRanking }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* How it works */}
      <section
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.how_it_works_label}
        </p>
        <p
          className={`text-[13px] leading-relaxed ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {data.how_it_works}
        </p>
      </section>

      {/* Tiers */}
      {data.ranking_categories.map((cat, idx) => {
        const isStrong = idx === 0;
        const isWeak = idx === data.ranking_categories.length - 1;
        return (
          <section key={cat.tier}>
            <p
              className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
                isStrong
                  ? isDarkMode
                    ? 'text-emerald-400'
                    : 'text-emerald-600'
                  : isWeak
                  ? isDarkMode
                    ? 'text-fuchsia-400'
                    : 'text-fuchsia-600'
                  : isDarkMode
                  ? 'text-cyan-400'
                  : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.tier_label}: {cat.tier}
            </p>
            <div className="space-y-3">
              {cat.drugs.map((d) => (
                <article
                  key={d.name}
                  className={`rounded border p-4 ${
                    isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3
                      className={`text-[14px] font-black uppercase tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      {d.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                        isDarkMode
                          ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                          : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {UI_LABELS.estimated_fit_label}: {d.estimated_fit}
                    </span>
                  </div>

                  <div className="mt-3 space-y-3">
                    <div>
                      <p
                        className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                          isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                        }`}
                      >
                        {UI_LABELS.fit_rationale_label}
                      </p>
                      <p
                        className={`text-[12px] leading-relaxed ${
                          isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                        }`}
                      >
                        {d.fit_rationale}
                      </p>
                    </div>
                    <div
                      className={`rounded border p-3 ${
                        isDarkMode
                          ? 'border-amber-500/30 bg-amber-950/20 text-amber-100'
                          : 'border-amber-500/30 bg-amber-50 text-amber-900'
                      }`}
                    >
                      <p
                        className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                          isDarkMode ? 'text-amber-300' : 'text-amber-700'
                        }`}
                      >
                        {UI_LABELS.blocking_factor_label}
                      </p>
                      <p className="text-[12px] leading-relaxed">{d.blocking_factor}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Ranking note */}
      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-100'
            : 'border-indigo-500/30 bg-indigo-50 text-indigo-900'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-300' : 'text-indigo-700'
          }`}
        >
          {UI_LABELS.ranking_note_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.ranking_note}</p>
      </div>
    </div>
  );
}
