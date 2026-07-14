'use client';

// ============================================================================
// <EvidenceHeatmap/> — 7 modalities × 4 tiers admissibility grid.
//
// Adapted from `synthetic_lethality_engine.tsx` EvidenceHeatmap. Original used
// fabricated evidence weights; this version renders which modality × tier
// combinations are admissible per each tier's entryCriteria field.
//
// Rules encoded (public):
//  - VALIDATED requires in-vitro + in-vivo + clinical (all three)
//  - STRONG requires in-vitro + (in-vivo OR pharmacologic-prism OR pharmacologic-gdsc)
//  - MECHANISTIC allows expression-association + pathway logic (no in-vitro/in-vivo required)
//  - INSUFFICIENT holds expression-only or single-modality claims
// ============================================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, BookOpen } from 'lucide-react';
import { EVIDENCE_MODALITIES_7, EVIDENCE_TIERS_4 } from '@/data/depth-layer';

type Admissibility = 'required' | 'sufficient' | 'contributes' | 'excluded';

const ADMISSIBILITY_MATRIX: Record<string, Record<string, Admissibility>> = {
  validated: {
    'crispr-dependency': 'contributes',
    'in-vitro-functional': 'required',
    'in-vivo': 'required',
    clinical: 'required',
    'pharmacologic-prism': 'contributes',
    'pharmacologic-gdsc': 'contributes',
    'expression-association': 'contributes',
  },
  strong: {
    'crispr-dependency': 'sufficient',
    'in-vitro-functional': 'required',
    'in-vivo': 'sufficient',
    clinical: 'contributes',
    'pharmacologic-prism': 'sufficient',
    'pharmacologic-gdsc': 'sufficient',
    'expression-association': 'contributes',
  },
  mechanistic: {
    'crispr-dependency': 'contributes',
    'in-vitro-functional': 'contributes',
    'in-vivo': 'contributes',
    clinical: 'contributes',
    'pharmacologic-prism': 'contributes',
    'pharmacologic-gdsc': 'contributes',
    'expression-association': 'sufficient',
  },
  insufficient: {
    'crispr-dependency': 'excluded',
    'in-vitro-functional': 'excluded',
    'in-vivo': 'excluded',
    clinical: 'excluded',
    'pharmacologic-prism': 'excluded',
    'pharmacologic-gdsc': 'excluded',
    'expression-association': 'contributes',
  },
};

const cellColor = (a: Admissibility, isDark: boolean): { bg: string; border: string; text: string } => {
  if (a === 'required') return isDark ? { bg: 'bg-cyan-500/25', border: 'border-cyan-400/60', text: 'text-cyan-100' } : { bg: 'bg-indigo-200', border: 'border-indigo-500', text: 'text-indigo-950' };
  if (a === 'sufficient') return isDark ? { bg: 'bg-emerald-500/20', border: 'border-emerald-400/50', text: 'text-emerald-200' } : { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900' };
  if (a === 'contributes') return isDark ? { bg: 'bg-zinc-800/50', border: 'border-zinc-700', text: 'text-zinc-400' } : { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-600' };
  return isDark ? { bg: 'bg-zinc-950/60', border: 'border-zinc-900', text: 'text-zinc-700' } : { bg: 'bg-white', border: 'border-slate-100', text: 'text-slate-300' };
};

const glyph: Record<Admissibility, string> = {
  required: '◆',
  sufficient: '●',
  contributes: '·',
  excluded: '—',
};

export default function EvidenceHeatmap({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [hoverCell, setHoverCell] = useState<{ modality: string; tier: string } | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
          Substrate view · evidence admissibility
        </p>
        <h3 className={`mt-1 text-xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Modality × tier grid
        </h3>
        <p className={`mt-1 text-[11px] uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          {EVIDENCE_MODALITIES_7.length} modalities × {EVIDENCE_TIERS_4.length} tiers
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`overflow-x-auto rounded border ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200'} p-4`}
      >
        <table className="w-full border-collapse text-[10px] font-mono">
          <thead>
            <tr>
              <th className={`text-left px-2 py-2 uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                <div className="flex items-center gap-1.5">
                  <Beaker className="h-3 w-3" />
                  <span>Modality</span>
                </div>
              </th>
              {EVIDENCE_TIERS_4.map((t) => (
                <th key={t.tier} className={`text-center px-2 py-2 uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  <div className="flex flex-col items-center gap-0.5">
                    <BookOpen className="h-3 w-3" />
                    <span className="font-black">{t.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVIDENCE_MODALITIES_7.map((m) => (
              <tr key={m.modality}>
                <td className={`px-2 py-2 uppercase font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <div className="flex flex-col">
                    <span>{m.name}</span>
                    <span className={`text-[9px] font-normal tracking-widest opacity-60 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                      {m.dataSource}
                    </span>
                  </div>
                </td>
                {EVIDENCE_TIERS_4.map((t) => {
                  const a = ADMISSIBILITY_MATRIX[t.tier]?.[m.modality] ?? 'contributes';
                  const { bg, border, text } = cellColor(a, isDarkMode);
                  const hover = hoverCell?.modality === m.modality && hoverCell?.tier === t.tier;
                  return (
                    <td
                      key={t.tier}
                      onMouseEnter={() => setHoverCell({ modality: m.modality, tier: t.tier })}
                      onMouseLeave={() => setHoverCell(null)}
                      className={`text-center px-2 py-2 border rounded-sm transition ${bg} ${border} ${text} ${hover ? 'scale-[1.03] shadow' : ''}`}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-base leading-none">{glyph[a]}</span>
                        <span className="text-[8px] uppercase tracking-widest">{a}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Legend */}
      <div className={`flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-400">◆</span> required
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-400">●</span> sufficient
        </span>
        <span className="flex items-center gap-1.5">
          <span>·</span> contributes
        </span>
        <span className="flex items-center gap-1.5">
          <span>—</span> excluded
        </span>
      </div>

      {/* Hover detail */}
      {hoverCell && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded border p-3 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}
        >
          {(() => {
            const m = EVIDENCE_MODALITIES_7.find((x) => x.modality === hoverCell.modality)!;
            const t = EVIDENCE_TIERS_4.find((x) => x.tier === hoverCell.tier)!;
            return (
              <div className="text-[11px]">
                <div className={`font-black uppercase ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                  {m.name} × {t.name}
                </div>
                <div className={`mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {t.entryCriteria}
                </div>
                <div className={`mt-1 italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Positive threshold: {m.positiveThreshold}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
