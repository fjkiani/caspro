'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { StrategicPriorities } from '@/data/demos/types';

/**
 * StrategicPrioritiesList — Stage 7 tumor board demo.
 *
 * 3 priority sections (Defense, Attack, Data) each with priority number
 * badge + category header + actions list. Closing bottom_line callout.
 */
export default function StrategicPrioritiesList({
  data,
}: {
  data: StrategicPriorities;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.priorities.map((p) => (
          <article
            key={p.priority}
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
                {p.priority}
              </span>
              <div className="flex-1">
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.category_label}
                </p>
                <h3
                  className={`mt-1 text-[14px] font-black uppercase tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {p.category}
                </h3>
              </div>
            </div>

            <div className="mt-4">
              <p
                className={`mb-2 text-[9px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {UI_LABELS.actions_label}
              </p>
              <ul className="space-y-2">
                {p.actions.map((a) => (
                  <li
                    key={a}
                    className={`flex gap-3 rounded border p-3 text-[12px] leading-relaxed ${
                      isDarkMode
                        ? 'border-zinc-800 bg-black/40 text-zinc-300'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] leading-relaxed ${
                        isDarkMode ? 'text-cyan-500' : 'text-indigo-500'
                      }`}
                    >
                      →
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom line */}
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
          {UI_LABELS.bottom_line_label}
        </p>
        <p className="text-[13px] leading-relaxed">{data.bottom_line}</p>
      </div>
    </div>
  );
}
