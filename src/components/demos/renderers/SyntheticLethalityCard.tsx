'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { SyntheticLethality } from '@/data/demos/types';

/**
 * SyntheticLethalityCard — Stage 5 tumor board demo.
 *
 * how_it_works + current_status (amber — in_development gating) +
 * potential_pairs cards (tumor_mutation, potential_vulnerability,
 * drug_class, evidence_level, requires) + what_unlocks_it callout.
 */
export default function SyntheticLethalityCard({ data }: { data: SyntheticLethality }) {
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

      {/* Current status */}
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
          {UI_LABELS.current_status_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.current_status}</p>
      </div>

      {/* Potential pairs */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.potential_pairs_label}
        </p>
        <div className="space-y-3">
          {data.potential_pairs.map((p) => (
            <article
              key={p.tumor_mutation}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="flex-1">
                  <p
                    className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.tumor_mutation_label}
                  </p>
                  <h3
                    className={`mt-1 text-[13px] font-black ${
                      isDarkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {p.tumor_mutation}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode
                      ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                      : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
                  }`}
                >
                  {p.drug_class}
                </span>
              </div>

              <div className="mt-3 space-y-3">
                <div>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                    }`}
                  >
                    {UI_LABELS.potential_vulnerability_label}
                  </p>
                  <p
                    className={`text-[12px] leading-relaxed ${
                      isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    {p.potential_vulnerability}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <p
                      className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
                      }`}
                    >
                      {UI_LABELS.evidence_level_label}
                    </p>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {p.evidence_level}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
                      }`}
                    >
                      {UI_LABELS.requires_label}
                    </p>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {p.requires}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* What unlocks it */}
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
          {UI_LABELS.what_unlocks_it_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.what_unlocks_it}</p>
      </div>
    </div>
  );
}
