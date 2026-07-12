'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { TrialDecodeSummary } from '@/data/demos/types';

/**
 * TrialDecodeSummaryPanel — Stage 6 pharma demo.
 *
 * total_trials KPI + programs table (name + trials + status chip) +
 * CEACAM5 failure-modes cards (5 rows) + ceacam5_key_finding callout.
 */
export default function TrialDecodeSummaryPanel({ data }: { data: TrialDecodeSummary }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div
        className={`flex flex-wrap items-baseline justify-between gap-3 rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.total_trials_decoded_label}
        </p>
        <p
          className={`font-mono text-4xl font-black ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {data.total_trials_decoded}
        </p>
      </div>

      {/* Programs */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.programs_label}
        </p>
        <div
          className={`overflow-hidden rounded border ${
            isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
          }`}
        >
          {data.programs.map((p, i) => (
            <div
              key={p.name}
              className={`grid grid-cols-1 items-center gap-3 p-4 md:grid-cols-[1fr_minmax(0,120px)_minmax(0,140px)] ${
                i > 0 ? (isDarkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-200') : ''
              } ${isDarkMode ? 'bg-zinc-950/40' : 'bg-white'}`}
            >
              <div>
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.program_name_label}
                </p>
                <p
                  className={`mt-1 text-[13px] font-black ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {p.name}
                </p>
              </div>
              <div>
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.trials_count_label}
                </p>
                <p
                  className={`mt-1 font-mono text-[15px] font-black ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {p.trials}
                </p>
              </div>
              <div>
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.program_status_label}
                </p>
                <span
                  className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                    p.status === 'validated'
                      ? isDarkMode
                        ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                        : 'border-emerald-500/40 bg-emerald-50 text-emerald-700'
                      : isDarkMode
                      ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                      : 'border-amber-500/40 bg-amber-50 text-amber-700'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CEACAM5 failure modes */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
          }`}
        >
          {UI_LABELS.ceacam5_failure_modes_heading}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {data.ceacam5_failure_modes.map((f) => (
            <article
              key={`${f.domain}::${f.trial}`}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p
                    className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
                    }`}
                  >
                    {UI_LABELS.domain_label}
                  </p>
                  <h3
                    className={`mt-1 text-[13px] font-black uppercase tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {f.domain}
                  </h3>
                </div>
                <div className="text-right">
                  <p
                    className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.trial_label}
                  </p>
                  <p className={`mt-1 text-[12px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {f.trial}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                  }`}
                >
                  {UI_LABELS.finding_label}
                </p>
                <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {f.finding}
                </p>
              </div>
              <p
                className={`mt-3 text-[10px] italic ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                <span
                  className={`mr-1 text-[9px] font-black uppercase not-italic tracking-widest ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.source_label}
                </span>
                {f.source}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Key finding */}
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
          {UI_LABELS.key_finding_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.ceacam5_key_finding}</p>
      </div>
    </div>
  );
}
