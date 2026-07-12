'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { MechanismProfile } from '@/data/demos/types';

/**
 * MechanismProfileCard — Stage 2 pharma demo.
 *
 * drug + mechanism_summary (long block) + primary_pathway (highlighted)
 * + secondary_pathways (chip list). Two-column layout for readability.
 */
export default function MechanismProfileCard({ data }: { data: MechanismProfile }) {
  const { isDarkMode } = useTheme();

  return (
    <article
      className={`rounded border p-6 ${
        isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
      }`}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,220px)_1fr]">
        {/* Left: drug identity */}
        <div>
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            {UI_LABELS.drug_label}
          </p>
          <h3
            className={`text-2xl font-black uppercase leading-tight tracking-tight ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {data.drug}
          </h3>
        </div>

        {/* Right: mechanism + pathways */}
        <div className="space-y-6">
          <div>
            <p
              className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.mechanism_summary_label}
            </p>
            <p
              className={`text-[13px] leading-relaxed ${
                isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {data.mechanism_summary}
            </p>
          </div>

          <div
            className={`rounded border p-4 ${
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
              {UI_LABELS.primary_pathway_label}
            </p>
            <p
              className={`text-[13px] font-black ${
                isDarkMode ? 'text-cyan-100' : 'text-indigo-900'
              }`}
            >
              {data.primary_pathway}
            </p>
          </div>

          <div>
            <p
              className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              {UI_LABELS.secondary_pathways_label}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.secondary_pathways.map((p) => (
                <span
                  key={p}
                  className={`inline-flex items-center rounded border px-2 py-1 text-[11px] ${
                    isDarkMode
                      ? 'border-zinc-800 bg-black/40 text-zinc-300'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
