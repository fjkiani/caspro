'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { DataReadiness } from '@/data/demos/types';

/**
 * DataReadinessCard — Stage 2 tumor board demo.
 *
 * completeness_score progress bar + confidence_cap callout +
 * missing_tests table (test, unlocks, priority, clinical_impact) +
 * recommendation closing block.
 */
export default function DataReadinessCard({ data }: { data: DataReadiness }) {
  const { isDarkMode } = useTheme();
  const pct = Math.round(data.completeness_score * 100);

  return (
    <div className="space-y-6">
      {/* Completeness score */}
      <div
        className={`rounded border p-5 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <div className="flex items-baseline justify-between">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.completeness_score_label}
          </p>
          <p
            className={`font-mono text-2xl font-black ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {pct}%
          </p>
        </div>
        <div
          className={`mt-3 h-2 w-full overflow-hidden rounded ${
            isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
          }`}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Confidence cap */}
      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-amber-500/30 bg-amber-950/20 text-amber-100'
            : 'border-amber-500/30 bg-amber-50 text-amber-900'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-amber-300' : 'text-amber-700'
          }`}
        >
          {UI_LABELS.confidence_cap_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.confidence_cap}</p>
      </div>

      {/* Missing tests table */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
          }`}
        >
          {UI_LABELS.missing_tests_label}
        </p>
        <div className="space-y-3">
          {data.missing_tests.map((t) => (
            <article
              key={t.test}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p
                    className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.test_label}
                  </p>
                  <h3
                    className={`mt-1 text-[13px] font-black uppercase tracking-tight ${
                      isDarkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {t.test}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode
                      ? 'border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300'
                      : 'border-fuchsia-500/40 bg-fuchsia-50 text-fuchsia-700'
                  }`}
                >
                  {t.priority}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                    }`}
                  >
                    {UI_LABELS.unlocks_label}
                  </p>
                  <p
                    className={`text-[12px] leading-relaxed ${
                      isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    {t.unlocks}
                  </p>
                </div>
                <div>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                    }`}
                  >
                    {UI_LABELS.clinical_impact_label}
                  </p>
                  <p
                    className={`text-[12px] leading-relaxed ${
                      isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    {t.clinical_impact}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recommendation */}
      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-100'
            : 'border-emerald-500/30 bg-emerald-50 text-emerald-900'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
          }`}
        >
          {UI_LABELS.recommendation_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.recommendation}</p>
      </div>
    </div>
  );
}
