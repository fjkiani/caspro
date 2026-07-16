'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { StatCallout } from '@/data/demos/types';

/**
 * StatCalloutGrid — Stage 1 pharma demo.
 *
 * 3 large stat cards (label · value · context) in a responsive grid.
 * Style mirrors the KPI ribbon on the tumor-board surface.
 */
export default function StatCalloutGrid({ data }: { data: StatCallout }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.items.map((item) => (
        <article
          key={item.label}
          className={`rounded border p-6 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
          }`}
        >
          <p
            className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {item.label}
          </p>
          <p
            className={`font-mono text-4xl font-black leading-none ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {item.value}
          </p>
          <p
            className={`mt-3 text-[11px] leading-snug ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <span
              className={`mr-1 text-[9px] font-black uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              {UI_LABELS.context_label}
            </span>
            {item.context}
          </p>
        </article>
      ))}
    </div>
  );
}
