'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { TherapyFit } from '@/data/demos/types';

/**
 * TherapyFitCategories — Stage 4 patient demo.
 *
 * how_it_works blurb + list of category cards, each with category name,
 * examples, fit_for_this_patient, next_steps. Mirrors the standard
 * "explainer + cards" pattern used elsewhere.
 */
export default function TherapyFitCategories({ data }: { data: TherapyFit }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
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
        <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {data.how_it_works}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {data.categories.map((c) => (
          <article
            key={c.category}
            className={`rounded border p-5 ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.category_label}
                </p>
                <h3
                  className={`text-base font-black uppercase tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {c.category}
                </h3>
              </div>
              <p
                className={`max-w-md text-right text-[11px] leading-snug ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <span
                  className={`mr-1 text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.examples_label}
                </span>
                {c.examples}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                  }`}
                >
                  {UI_LABELS.fit_for_this_patient_label}
                </p>
                <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {c.fit_for_this_patient}
                </p>
              </div>
              <div
                className={`rounded border p-3 ${
                  isDarkMode
                    ? 'border-emerald-500/30 bg-emerald-950/20'
                    : 'border-emerald-500/30 bg-emerald-50'
                }`}
              >
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}
                >
                  {UI_LABELS.next_steps_label}
                </p>
                <p
                  className={`text-[12px] leading-relaxed ${
                    isDarkMode ? 'text-emerald-100' : 'text-emerald-900'
                  }`}
                >
                  {c.next_steps}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
