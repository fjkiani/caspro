'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { ResistanceForecastPatient } from '@/data/demos/types';

/**
 * ResistanceForecastPatientCard — Stage 5 patient demo.
 *
 * how_it_works blurb + one example forecast (treatment + resistance
 * mechanism cards + strategic_implication) + disclaimer note.
 */
export default function ResistanceForecastPatientCard({
  data,
}: {
  data: ResistanceForecastPatient;
}) {
  const { isDarkMode } = useTheme();
  const ex = data.example;

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

      <section
        className={`rounded border p-5 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
          }`}
        >
          {UI_LABELS.treatment_label}
        </p>
        <h3
          className={`mb-4 text-base font-black uppercase tracking-tight ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {ex.treatment}
        </h3>

        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
          }`}
        >
          {UI_LABELS.likely_resistance_mechanisms_label}
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {ex.likely_resistance_mechanisms.map((m) => (
            <article
              key={m.mechanism}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <p
                    className={`text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.mechanism_label}
                  </p>
                  <h4
                    className={`mt-1 text-[13px] font-black ${
                      isDarkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {m.mechanism}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode
                      ? 'border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300'
                      : 'border-fuchsia-500/40 bg-fuchsia-50 text-fuchsia-700'
                  }`}
                >
                  {m.probability}
                </span>
              </div>
              <p className={`mt-3 text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {m.what_it_means}
              </p>
              <div className="mt-3">
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  {UI_LABELS.backup_plan_label}
                </p>
                <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {m.backup_plan}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`mt-6 rounded border p-3 ${
            isDarkMode
              ? 'border-cyan-500/30 bg-cyan-950/20'
              : 'border-indigo-500/30 bg-indigo-50'
          }`}
        >
          <p
            className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-300' : 'text-indigo-700'
            }`}
          >
            {UI_LABELS.strategic_implication_label}
          </p>
          <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-cyan-100' : 'text-indigo-900'}`}>
            {ex.strategic_implication}
          </p>
        </div>
      </section>

      <div
        className={`rounded border p-4 text-[11px] leading-relaxed ${
          isDarkMode
            ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
            : 'border-amber-500/30 bg-amber-50 text-amber-800'
        }`}
      >
        <p
          className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-amber-300' : 'text-amber-700'
          }`}
        >
          {UI_LABELS.note_label}
        </p>
        {data.note}
      </div>
    </div>
  );
}
