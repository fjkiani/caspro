'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { SubgroupComparison } from '@/data/demos/types';

/**
 * SubgroupComparisonTable — Stage 4 pharma demo.
 *
 * 3-row table: subgroup name + n + STC-1010 metrics (mean_fit,
 * ranks_first, recall@3, mean_rank, delta_vs_best, interpretation) +
 * key_metric definition + clinical_anchor.
 *
 * TMB≥25 row is highlighted — that's the responder subgroup where recall
 * hits 1.0 and every patient ranks STC-1010 first.
 */
export default function SubgroupComparisonTable({ data }: { data: SubgroupComparison }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div
        className={`overflow-x-auto rounded border ${
          isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}
      >
        <table
          className={`min-w-full text-left text-[12px] ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          <thead>
            <tr
              className={
                isDarkMode
                  ? 'border-b border-zinc-800 bg-black/40'
                  : 'border-b border-zinc-200 bg-zinc-50'
              }
            >
              <Th isDark={isDarkMode}>{UI_LABELS.subgroup_label}</Th>
              <Th isDark={isDarkMode} right>
                {UI_LABELS.n_label}
              </Th>
              <Th isDark={isDarkMode} right>
                {UI_LABELS.stc1010_mean_fit_label}
              </Th>
              <Th isDark={isDarkMode}>{UI_LABELS.stc1010_ranks_first_label}</Th>
              <Th isDark={isDarkMode} right>
                {UI_LABELS.recall_at_3_label}
              </Th>
              <Th isDark={isDarkMode}>{UI_LABELS.mean_rank_label}</Th>
              <Th isDark={isDarkMode} right>
                {UI_LABELS.delta_vs_best_label}
              </Th>
            </tr>
          </thead>
          <tbody>
            {data.subgroups.map((s) => {
              const isResponder = s.recall_at_3 === 1.0;
              return (
                <tr
                  key={s.name}
                  className={`border-t ${
                    isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
                  } ${
                    isResponder
                      ? isDarkMode
                        ? 'bg-cyan-950/20'
                        : 'bg-indigo-50/70'
                      : ''
                  }`}
                >
                  <Td>
                    <span
                      className={`font-black ${
                        isResponder
                          ? isDarkMode
                            ? 'text-cyan-300'
                            : 'text-indigo-700'
                          : isDarkMode
                          ? 'text-white'
                          : 'text-zinc-900'
                      }`}
                    >
                      {s.name}
                    </span>
                  </Td>
                  <Td right>{s.n}</Td>
                  <Td right>{s.stc1010_mean_fit.toFixed(4)}</Td>
                  <Td>{s.stc1010_ranks_first}</Td>
                  <Td right>{s.recall_at_3.toFixed(4)}</Td>
                  <Td>{s.mean_rank}</Td>
                  <Td right>
                    <span
                      className={
                        s.delta_vs_best > 0
                          ? isDarkMode
                            ? 'text-emerald-300'
                            : 'text-emerald-700'
                          : isDarkMode
                          ? 'text-zinc-400'
                          : 'text-zinc-600'
                      }
                    >
                      {s.delta_vs_best > 0 ? '+' : ''}
                      {s.delta_vs_best.toFixed(4)}
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interpretations row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {data.subgroups.map((s) => {
          const isResponder = s.recall_at_3 === 1.0;
          return (
            <article
              key={s.name}
              className={`rounded border p-4 ${
                isResponder
                  ? isDarkMode
                    ? 'border-cyan-500/40 bg-cyan-950/20'
                    : 'border-indigo-500/40 bg-indigo-50'
                  : isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/60'
                  : 'border-zinc-200 bg-white'
              }`}
            >
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isResponder
                    ? isDarkMode
                      ? 'text-cyan-300'
                      : 'text-indigo-700'
                    : isDarkMode
                    ? 'text-zinc-500'
                    : 'text-zinc-500'
                }`}
              >
                {s.name}
              </p>
              <p
                className={`text-[12px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                <span
                  className={`mr-1 text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.interpretation_label}
                </span>
                {s.interpretation}
              </p>
            </article>
          );
        })}
      </div>

      {/* Key metric + clinical anchor */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className={`rounded border p-4 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
          }`}
        >
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.key_metric_label}
          </p>
          <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {data.key_metric}
          </p>
        </div>
        <div
          className={`rounded border p-4 ${
            isDarkMode
              ? 'border-emerald-500/30 bg-emerald-950/20'
              : 'border-emerald-500/30 bg-emerald-50'
          }`}
        >
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}
          >
            {UI_LABELS.clinical_anchor_label}
          </p>
          <p
            className={`text-[12px] leading-relaxed ${
              isDarkMode ? 'text-emerald-100' : 'text-emerald-900'
            }`}
          >
            {data.clinical_anchor}
          </p>
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  right,
  isDark,
}: {
  children: React.ReactNode;
  right?: boolean;
  isDark: boolean;
}) {
  return (
    <th
      className={`px-3 py-2 text-[9px] font-black uppercase tracking-[0.3em] ${
        isDark ? 'text-cyan-400' : 'text-indigo-600'
      } ${right ? 'text-right' : 'text-left'}`}
    >
      {children}
    </th>
  );
}

function Td({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <td className={`px-3 py-3 font-mono ${right ? 'text-right' : 'text-left'}`}>{children}</td>
  );
}
