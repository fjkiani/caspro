'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { StrategicRecommendation } from '@/data/demos/types';

/**
 * StrategicRecommendationList — Stage 7 pharma demo.
 *
 * 3 recommendation rows (priority number + action + rationale + status)
 * + clinical_anchor closing callout.
 */
export default function StrategicRecommendationList({
  data,
}: {
  data: StrategicRecommendation;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.recommendations.map((r) => (
          <article
            key={r.priority}
            className={`rounded border p-5 ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded border font-mono text-[13px] font-black ${
                  isDarkMode
                    ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                    : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
                }`}
              >
                {r.priority}
              </span>
              <div className="flex-1">
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.action_label}
                </p>
                <h3
                  className={`mt-1 text-[14px] font-black uppercase tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {r.action}
                </h3>
              </div>
              <span
                className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode
                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                    : 'border-emerald-500/40 bg-emerald-50 text-emerald-700'
                }`}
              >
                {r.status}
              </span>
            </div>

            <div className="mt-3">
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {UI_LABELS.rationale_label}
              </p>
              <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {r.rationale}
              </p>
            </div>
          </article>
        ))}
      </div>

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
          {UI_LABELS.clinical_anchor_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.clinical_anchor}</p>
      </div>
    </div>
  );
}
