'use client';

/**
 * MoaGlyphStrip
 *
 * Governance-safe substitute for numeric cosine/delta rows. Renders a ranked
 * ordinal list with directional glyphs (responder-lean / non-responder-lean)
 * and bar lengths bucketed by qualitative magnitude. No raw numbers surface.
 *
 * Data source: `trial.moaGlyphs` on every TrialCaseFile. Absence hides the strip.
 *
 * Precedent: mirrors the "Ranked-only, no values" pattern approved on
 * 2026-04-28 for MechanismDivergenceEngine (commit 305a804).
 */

import type { MoaGlyphRow, VectorAxes } from '@/data/trial-case-files';
import { VECTOR_AXIS_META } from '@/data/trial-case-files';

const MAGNITUDE_BUCKET: Record<MoaGlyphRow['magnitude'], number> = {
  strongest: 100,
  strong: 78,
  moderate: 52,
  minimal: 28,
  trace: 14,
};

const MAGNITUDE_ORDINAL: MoaGlyphRow['magnitude'][] = [
  'strongest',
  'strong',
  'moderate',
  'minimal',
  'trace',
];

function axisLabel(axis: keyof VectorAxes) {
  const meta = VECTOR_AXIS_META.find((m) => m.key === axis);
  return meta ? meta.label : axis.toUpperCase();
}

function axisFullName(axis: keyof VectorAxes) {
  const meta = VECTOR_AXIS_META.find((m) => m.key === axis);
  return meta ? meta.fullName : axis;
}

export interface MoaGlyphStripProps {
  rows: MoaGlyphRow[];
  isDarkMode: boolean;
}

export function MoaGlyphStrip({ rows, isDarkMode }: MoaGlyphStripProps) {
  if (!rows || rows.length === 0) return null;

  const sorted = [...rows].sort((a, b) => {
    const ai = MAGNITUDE_ORDINAL.indexOf(a.magnitude);
    const bi = MAGNITUDE_ORDINAL.indexOf(b.magnitude);
    return ai - bi;
  });

  return (
    <div
      className={`p-5 border rounded transition-colors ${
        isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Axis engagement (ranked)
        </span>
      </div>
      <p
        className={`text-[10px] leading-relaxed mb-4 ${
          isDarkMode ? 'text-zinc-400' : 'text-slate-500'
        }`}
      >
        Sign shows direction (responder-lean / non-responder-lean). Position and bar
        length show relative strength. Numeric magnitudes are gated.
      </p>
      <ol className="space-y-2">
        {sorted.map((row, i) => {
          const rank = String(i + 1).padStart(2, '0');
          const isTop = i === 0;
          const isResponder = row.direction === 'responder';
          const barPct = MAGNITUDE_BUCKET[row.magnitude];
          const barWidth = Math.min(barPct / 2, 50);
          const tagText = isResponder ? 'responder-lean' : 'non-responder-lean';
          const barColor = isResponder
            ? isDarkMode
              ? 'bg-emerald-500/70'
              : 'bg-emerald-600'
            : isDarkMode
            ? 'bg-rose-500/70'
            : 'bg-rose-600';
          const tagColor = isResponder
            ? isDarkMode
              ? 'text-emerald-300'
              : 'text-emerald-700'
            : isDarkMode
            ? 'text-rose-300'
            : 'text-rose-700';
          const rankColor = isTop
            ? isDarkMode
              ? 'text-cyan-300'
              : 'text-indigo-600'
            : isDarkMode
            ? 'text-zinc-500'
            : 'text-slate-500';

          return (
            <li
              key={row.axis}
              className={`grid grid-cols-[auto_1fr_auto] gap-3 items-center text-[10px] ${
                isDarkMode ? 'text-zinc-200' : 'text-slate-800'
              }`}
              title={row.note ?? axisFullName(row.axis)}
            >
              <span className={`font-black tabular-nums ${rankColor}`}>{rank}</span>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-widest">
                    {axisLabel(row.axis)}
                  </span>
                  <span className={`text-[9px] uppercase tracking-widest font-black ${tagColor}`}>
                    {tagText}
                  </span>
                </div>
                <div
                  className={`relative h-1.5 rounded-full ${
                    isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'
                  }`}
                >
                  {/* Center line */}
                  <div
                    className={`absolute top-0 bottom-0 w-px left-1/2 ${
                      isDarkMode ? 'bg-zinc-700' : 'bg-slate-300'
                    }`}
                  />
                  {/* Directional bar */}
                  <div
                    className={`absolute top-0 bottom-0 rounded-full ${barColor}`}
                    style={{
                      width: `${barWidth}%`,
                      ...(isResponder
                        ? { right: '50%' }
                        : { left: '50%' }),
                    }}
                  />
                </div>
              </div>
              <span
                className={`text-[9px] uppercase tracking-widest font-black ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                {row.magnitude}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default MoaGlyphStrip;
