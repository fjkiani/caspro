'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { TrialMatching } from '@/data/demos/types';

/**
 * TrialMatchCards — Stage 3 patient demo.
 *
 * how_it_works blurb + what_you_see checklist + example_matches cards +
 * disclaimer note. Style is the same three-part shell used across the
 * tumor-board surface: eyebrow, blurb, cards.
 */
export default function TrialMatchCards({ data }: { data: TrialMatching }) {
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
        <p className={`text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {data.how_it_works}
        </p>
      </section>

      {/* What you see */}
      <section
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.what_you_see_label}
        </p>
        <ul className={`space-y-2 text-[12px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {data.what_you_see.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span
                className={`mt-1.5 inline-block h-1 w-1 rounded-full ${
                  isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'
                }`}
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Example matches */}
      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.example_matches_label}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.example_matches.map((m) => (
            <article
              key={m.trial_type}
              className={`rounded border p-4 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <p
                className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                {UI_LABELS.trial_type_label}
              </p>
              <h3
                className={`mb-4 text-base font-black uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {m.trial_type}
              </h3>
              <div className="space-y-3 text-[12px] leading-relaxed">
                <div>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                    }`}
                  >
                    {UI_LABELS.why_it_matches_label}
                  </p>
                  <p className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>{m.why_it_matches}</p>
                </div>
                <div>
                  <p
                    className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                      isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    {UI_LABELS.eligibility_label}
                  </p>
                  <p className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>{m.eligibility}</p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                      isDarkMode
                        ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                        : 'border-amber-500/40 bg-amber-50 text-amber-700'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Note */}
      <div
        className={`rounded border p-4 text-[11px] leading-relaxed ${
          isDarkMode ? 'border-amber-500/30 bg-amber-950/20 text-amber-200' : 'border-amber-500/30 bg-amber-50 text-amber-800'
        }`}
      >
        <p
          className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-amber-300' : 'text-amber-700'
          }`}
        >
          {UI_LABELS.note_label}
        </p>
        {data.note}
      </div>
    </div>
  );
}
