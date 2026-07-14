'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { CarePlanSummary } from '@/data/demos/types';

/**
 * CarePlanSections — Stage 6 patient demo.
 *
 * Two blocks: sections[] (label · content) rows + what_you_can_do
 * checklist. Anchors the whole patient walker at the bottom.
 */
export default function CarePlanSections({ data }: { data: CarePlanSummary }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <section
        className={`overflow-hidden rounded border ${
          isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}
      >
        {data.sections.map((s, i) => (
          <div
            key={s.section}
            className={`p-4 ${
              i > 0 ? (isDarkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-200') : ''
            } ${isDarkMode ? 'bg-zinc-950/40' : 'bg-white'}`}
          >
            <p
              className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.section_label}
            </p>
            <h3
              className={`mb-2 text-[14px] font-black uppercase tracking-tight ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {s.section}
            </h3>
            <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {s.content}
            </p>
          </div>
        ))}
      </section>

      <section
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-emerald-500/30 bg-emerald-950/20'
            : 'border-emerald-500/30 bg-emerald-50'
        }`}
      >
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
          }`}
        >
          {UI_LABELS.what_you_can_do_label}
        </p>
        <ul className={`space-y-3 text-[12px] leading-relaxed ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>
          {data.what_you_can_do.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span
                className={`mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
