'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { EvidenceVault } from '@/data/demos/types';

/**
 * EvidenceVaultCard — Stage 6 tumor board demo.
 *
 * what_it_contains list (4 category+items rows) + traceability callout +
 * export_options callout.
 */
export default function EvidenceVaultCard({ data }: { data: EvidenceVault }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* What it contains */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.what_it_contains_label}
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.what_it_contains.map((row) => (
            <article
              key={row.category}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <p
                className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {UI_LABELS.category_label}
              </p>
              <h3
                className={`mb-3 text-[13px] font-black uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {row.category}
              </h3>
              <p
                className={`text-[12px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                {row.items}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Traceability */}
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
          {UI_LABELS.traceability_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.traceability}</p>
      </div>

      {/* Export options */}
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
          {UI_LABELS.export_options_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.export_options}</p>
      </div>
    </div>
  );
}
