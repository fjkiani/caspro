'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { ResistanceForecastTumorBoard } from '@/data/demos/types';

/**
 * ResistanceForecastTumorBoardList — Stage 4 tumor board demo.
 *
 * Sibling of ResistanceForecastPatientCard. Selected by
 * `'forecasts' in data` discriminator in DemoStageBody.
 *
 * Renders each forecast (drug + resistance_mechanisms[] +
 * strategic_implication) as a stacked panel. Each mechanism row shows
 * likelihood chip, biology, monitoring, backup_strategy.
 */
export default function ResistanceForecastTumorBoardList({
  data,
}: {
  data: ResistanceForecastTumorBoard;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      {data.forecasts.map((f) => (
        <article
          key={f.drug}
          className={`rounded border p-5 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
          }`}
        >
          <header className="mb-4">
            <p
              className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              {UI_LABELS.drug_label}
            </p>
            <h3
              className={`text-[15px] font-black uppercase tracking-tight ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {f.drug}
            </h3>
          </header>

          {/* Resistance mechanisms */}
          <div className="space-y-3">
            <p
              className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
              }`}
            >
              {UI_LABELS.resistance_mechanisms_label}
            </p>
            {f.resistance_mechanisms.map((m) => (
              <div
                key={m.mechanism}
                className={`rounded border p-4 ${
                  isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h4
                    className={`text-[13px] font-black ${
                      isDarkMode ? 'text-white' : 'text-zinc-900'
                    }`}
                  >
                    {m.mechanism}
                  </h4>
                  <span
                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                      isDarkMode
                        ? 'border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300'
                        : 'border-fuchsia-500/40 bg-fuchsia-50 text-fuchsia-700'
                    }`}
                  >
                    {UI_LABELS.likelihood_label}: {m.likelihood}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <p
                      className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                      }`}
                    >
                      {UI_LABELS.biology_label}
                    </p>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {m.biology}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                      }`}
                    >
                      {UI_LABELS.monitoring_label}
                    </p>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {m.monitoring}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      {UI_LABELS.backup_strategy_label}
                    </p>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      {m.backup_strategy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic implication */}
          <div
            className={`mt-4 rounded border p-4 ${
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
              {UI_LABELS.strategic_implication_label}
            </p>
            <p className="text-[13px] leading-relaxed">{f.strategic_implication}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
