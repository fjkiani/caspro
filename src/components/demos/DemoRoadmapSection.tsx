'use client';

import { useTheme } from '@/context/ThemeContext';
import GovernanceStatusPill from './GovernanceStatusPill';
import { UI_LABELS } from './labels';
import type { GovernanceLabels, RoadmapItem } from '@/data/demos/types';

/**
 * DemoRoadmapSection — closing section on every demo route.
 *
 * Renders roadmap_items[] with an in_development pill plus governance-labels
 * legend from the spec. Card styling matches the footer cross-links on the
 * SL tabs surface.
 */
export default function DemoRoadmapSection({
  items,
  labels,
}: {
  items: RoadmapItem[];
  labels: GovernanceLabels;
}) {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`border-t ${
        isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 py-10">
        <p
          className={`mb-2 text-[10px] font-black uppercase tracking-[0.4em] ${
            isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
          }`}
        >
          {UI_LABELS.where_crispro_is_heading}
        </p>

        {/* Governance-labels legend */}
        <div
          className={`mb-8 rounded border p-4 ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
              : 'border-zinc-200 bg-white text-zinc-700'
          }`}
        >
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            {UI_LABELS.governance_legend}
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <LegendCard status="validated" text={labels.validated} isDarkMode={isDarkMode} />
            <LegendCard status="in_development" text={labels.in_development} isDarkMode={isDarkMode} />
            <LegendCard status="mechanistic_hypothesis" text={labels.mechanistic_hypothesis} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Roadmap cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.capability}
              className={`rounded border p-5 ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/60'
                  : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
                  }`}
                >
                  {UI_LABELS.capability_label}
                </p>
                <GovernanceStatusPill status={item.status} />
              </div>
              <h3
                className={`text-base font-black uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {item.capability}
              </h3>
              <p
                className={`mt-3 text-[12px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                {item.description}
              </p>
              <div
                className={`mt-4 rounded border p-3 text-[11px] leading-snug ${
                  isDarkMode
                    ? 'border-zinc-800 bg-black/40 text-zinc-400'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600'
                }`}
              >
                <p
                  className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.note_label}
                </p>
                {item.note}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegendCard({
  status,
  text,
  isDarkMode,
}: {
  status: 'validated' | 'in_development' | 'mechanistic_hypothesis';
  text: string;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`rounded border p-3 ${
        isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <GovernanceStatusPill status={status} />
      <p className={`mt-2 text-[11px] leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-zinc-700'}`}>
        {text}
      </p>
    </div>
  );
}
