'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { RankingOverview } from '@/data/demos/types';

/**
 * RankingOverviewTable — Stage 3 pharma demo.
 *
 * Cohort chip row (cohort / n_patients / n_treatments) + 8-row treatments
 * table (name, type, mean_fit with bar) + overall_result blurb +
 * rank_distribution mini-histogram.
 */
export default function RankingOverviewTable({ data }: { data: RankingOverview }) {
  const { isDarkMode } = useTheme();
  const maxFit = Math.max(...data.treatments.map((t) => t.mean_fit));

  return (
    <div className="space-y-6">
      {/* Cohort chip row */}
      <div
        className={`flex flex-wrap gap-3 rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <ChipStat isDarkMode={isDarkMode} label={UI_LABELS.cohort_label} value={data.cohort} />
        <ChipStat isDarkMode={isDarkMode} label={UI_LABELS.n_patients_label} value={String(data.n_patients)} />
        <ChipStat isDarkMode={isDarkMode} label={UI_LABELS.n_treatments_label} value={String(data.n_treatments_compared)} />
      </div>

      {/* Treatments table */}
      <div
        className={`overflow-hidden rounded border ${
          isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}
      >
        {data.treatments.map((t, i) => {
          const pct = Math.round((t.mean_fit / maxFit) * 100);
          const isStc = t.name === 'STC-1010';
          return (
            <div
              key={t.name}
              className={`grid grid-cols-1 items-center gap-3 p-4 md:grid-cols-[minmax(0,160px)_1fr_minmax(0,140px)] ${
                i > 0 ? (isDarkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-200') : ''
              } ${
                isStc
                  ? isDarkMode
                    ? 'bg-cyan-950/20'
                    : 'bg-indigo-50/60'
                  : isDarkMode
                  ? 'bg-zinc-950/40'
                  : 'bg-white'
              }`}
            >
              <div>
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.treatment_name_label}
                </p>
                <p
                  className={`mt-1 text-[13px] font-black ${
                    isStc
                      ? isDarkMode
                        ? 'text-cyan-300'
                        : 'text-indigo-700'
                      : isDarkMode
                      ? 'text-white'
                      : 'text-zinc-900'
                  }`}
                >
                  {t.name}
                </p>
              </div>
              <div>
                <p className={`text-[12px] leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {t.type}
                </p>
                <div
                  className={`mt-2 h-1.5 w-full overflow-hidden rounded ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                  }`}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full ${
                      isStc
                        ? isDarkMode
                          ? 'bg-cyan-500'
                          : 'bg-indigo-500'
                        : isDarkMode
                        ? 'bg-zinc-500'
                        : 'bg-zinc-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.mean_fit_label}
                </p>
                <p
                  className={`mt-1 font-mono text-lg font-black ${
                    isStc
                      ? isDarkMode
                        ? 'text-cyan-300'
                        : 'text-indigo-700'
                      : isDarkMode
                      ? 'text-white'
                      : 'text-zinc-900'
                  }`}
                >
                  {t.mean_fit.toFixed(4)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall result */}
      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-100'
            : 'border-fuchsia-500/30 bg-fuchsia-50 text-fuchsia-900'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-700'
          }`}
        >
          {UI_LABELS.overall_result_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.overall_result}</p>
      </div>

      {/* Rank distribution */}
      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.rank_distribution_label}
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Object.entries(data.rank_distribution).map(([rank, n]) => (
            <div
              key={rank}
              className={`rounded border p-3 text-center ${
                isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
              }`}
            >
              <p
                className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                {rank}
              </p>
              <p
                className={`mt-1 font-mono text-lg font-black ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {n}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipStat({
  label,
  value,
  isDarkMode,
}: {
  label: string;
  value: string;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`rounded border px-3 py-2 ${
        isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <p
        className={`text-[9px] font-black uppercase tracking-[0.3em] ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {label}
      </p>
      <p className={`font-mono text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        {value}
      </p>
    </div>
  );
}
