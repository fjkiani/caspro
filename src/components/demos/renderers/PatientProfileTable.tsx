'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { PatientProfileSummary } from '@/data/demos/types';

/**
 * PatientProfileTable — Stage 1 patient demo.
 *
 * Renders an 8-row table of profile items (label · value · source ·
 * what_it_means) plus a completeness scorecard at the top. Style mirrors
 * the tumor-board `SectionRow` idiom (border rows + eyebrow labels).
 */
export default function PatientProfileTable({ data }: { data: PatientProfileSummary }) {
  const { isDarkMode } = useTheme();
  const pct = Math.round(data.completeness_score * 100);

  return (
    <div className="space-y-6">
      {/* Completeness scorecard */}
      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p
            className={`text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.completeness_score_label}
          </p>
          <span
            className={`font-mono text-3xl font-black ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {pct}%
          </span>
        </div>
        <div
          className={`mt-3 h-1.5 w-full overflow-hidden rounded ${
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
        <div className="mt-4">
          <p
            className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            {UI_LABELS.completeness_explanation_label}
          </p>
          <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {data.completeness_explanation}
          </p>
        </div>
      </div>

      {/* Profile rows */}
      <div
        className={`overflow-hidden rounded border ${
          isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}
      >
        {data.items.map((item, i) => (
          <div
            key={item.label}
            className={`grid gap-3 p-4 md:grid-cols-[minmax(0,180px)_1fr_minmax(0,220px)] ${
              i > 0 ? (isDarkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-200') : ''
            } ${isDarkMode ? 'bg-zinc-950/40' : 'bg-white'}`}
          >
            <div>
              <p
                className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {item.label}
              </p>
              <p
                className={`mt-1 text-[13px] font-black ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {item.value}
              </p>
            </div>
            <div>
              {item.what_it_means && (
                <>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.what_it_means_label}
                  </p>
                  <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {item.what_it_means}
                  </p>
                </>
              )}
            </div>
            <div>
              <p
                className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                {UI_LABELS.source_label}
              </p>
              <p className={`mt-1 text-[11px] leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {item.source}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
