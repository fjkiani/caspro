'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { BiomarkerIntelligence } from '@/data/demos/types';

/**
 * BiomarkerCardGrid — Stage 2 patient demo.
 *
 * One card per biomarker: marker + result badge + what_it_means +
 * treatments_connected + questions_to_ask. Style mirrors the AK bundle
 * biomarker cards on the tumor-board surface.
 */
export default function BiomarkerCardGrid({ data }: { data: BiomarkerIntelligence }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data.biomarkers.map((b) => (
        <article
          key={b.marker}
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
                {UI_LABELS.marker_label}
              </p>
              <h3
                className={`text-base font-black uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {b.marker}
              </h3>
            </div>
            <span
              className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                  : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
              }`}
            >
              {b.result}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {UI_LABELS.what_it_means_label}
              </p>
              <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {b.what_it_means}
              </p>
            </div>
            <div>
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                {UI_LABELS.treatments_connected_label}
              </p>
              <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {b.treatments_connected}
              </p>
            </div>
            <div
              className={`rounded border p-3 ${
                isDarkMode ? 'border-fuchsia-500/30 bg-fuchsia-950/20' : 'border-fuchsia-500/30 bg-fuchsia-50'
              }`}
            >
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-700'
                }`}
              >
                {UI_LABELS.questions_to_ask_label}
              </p>
              <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-fuchsia-100' : 'text-fuchsia-900'}`}>
                {b.questions_to_ask}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
