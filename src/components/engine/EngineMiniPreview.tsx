'use client';

import { getEngineIcon } from './engine-icons';
import { TRIAL_CASE_FILES, VECTOR_AXIS_META } from '@/data/trial-case-files';
import { THERAPY_AXES, EVIDENCE_MODALITIES } from '@/data/sl-engine-data';
import { PGX_GENES } from '@/data/safety-engine-data';

function statusColor(status: string, isDarkMode: boolean): string {
  switch (status) {
    case 'POSITIVE':
      return isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600';
    case 'NEGATIVE':
      return isDarkMode ? 'bg-rose-500' : 'bg-rose-600';
    case 'MIXED':
      return isDarkMode ? 'bg-amber-500' : 'bg-amber-500';
    case 'CONFOUNDED':
      return isDarkMode ? 'bg-violet-500' : 'bg-violet-500';
    default:
      return isDarkMode ? 'bg-zinc-700' : 'bg-slate-300';
  }
}

export default function EngineMiniPreview({
  slug,
  isDarkMode,
}: {
  slug: string;
  isDarkMode: boolean;
}) {
  const panel = isDarkMode
    ? 'bg-zinc-900/80 border-zinc-800'
    : 'bg-slate-100 border-slate-200';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const text = isDarkMode ? 'text-zinc-200' : 'text-slate-800';

  switch (slug) {
    case 'target-lock': {
      return (
        <div className={`h-full flex flex-col items-center justify-center gap-3 p-4 border-b ${panel}`}>
          <div className="relative w-24 h-24">
            <div className={`absolute inset-0 rounded-full border-2 border-dashed ${isDarkMode ? 'border-cyan-500/40' : 'border-cyan-400'}`} />
            <div className={`absolute inset-3 rounded-full ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'}`} />
            <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase ${isDarkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
              LOCK
            </div>
          </div>
          <p className={`text-[10px] font-mono uppercase tracking-widest ${muted}`}>9/9 FDA concordance</p>
        </div>
      );
    }

    case 'mechanism-alignment': {
      const trial = TRIAL_CASE_FILES.latify;
      const max = 1;
      return (
        <div className={`h-full p-3 border-b ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${muted}`}>LATIFY · Mechanism alignment</p>
          <div className="grid grid-cols-4 gap-1.5 h-[calc(100%-1.25rem)] items-end">
            {VECTOR_AXIS_META.map((m) => {
              const v = trial.trialVector[m.key];
              const h = Math.max(12, (v / max) * 100);
              return (
                <div key={m.key} className="flex flex-col items-center gap-1 min-h-0">
                  <div
                    className={`w-full rounded-sm ${isDarkMode ? 'bg-red-500/70' : 'bg-red-400'}`}
                    style={{ height: `${h}%`, minHeight: 8, maxHeight: 72 }}
                  />
                  <span className={`text-[8px] font-bold ${muted}`}>{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case 'synthetic-lethality': {
      const axis = THERAPY_AXES[0];
      return (
        <div className={`h-full p-3 border-b ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${muted}`}>MBD4 · evidence matrix</p>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {EVIDENCE_MODALITIES.map((mod) => (
              <span key={mod} className={`text-[7px] text-center truncate ${muted}`}>
                {mod.slice(0, 3)}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {EVIDENCE_MODALITIES.map((mod) => (
              <div
                key={mod}
                className={`aspect-square rounded-sm ${statusColor(axis.modalities[mod]?.status || 'MISSING', isDarkMode)}`}
              />
            ))}
          </div>
          <p className={`mt-2 text-[10px] font-mono ${text}`}>Ceralasertib p=0.034</p>
        </div>
      );
    }

    case 'safety-dosing': {
      const genes = PGX_GENES.slice(0, 4);
      return (
        <div className={`h-full p-3 border-b flex flex-col gap-2 ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>PGx gate</p>
          {genes.map((g) => (
            <div
              key={g.slug}
              className={`flex items-center justify-between rounded px-2 py-1 text-[10px] ${
                isDarkMode ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-slate-200'
              }`}
            >
              <span className={`font-bold ${text}`}>{g.gene}</span>
              <span className={g.adjustment.includes('REDUCE') ? 'text-rose-500' : 'text-emerald-600'}>
                {g.adjustment.replace('REDUCE ', '↓')}
              </span>
            </div>
          ))}
          <p className={`text-[9px] mt-auto ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>100% CPIC</p>
        </div>
      );
    }

    case 'safety': {
      const cells = ['CRISPR', 'Pharma', 'In Vitro', 'In Vivo', 'Clinical'];
      return (
        <div className={`h-full p-3 border-b ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${muted}`}>Receipt ledger</p>
          <div className="flex flex-wrap gap-2">
            {cells.map((c, i) => (
              <span
                key={c}
                className={`rounded px-2 py-1 text-[9px] font-bold uppercase ${
                  i < 3
                    ? isDarkMode
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                    : isDarkMode
                      ? 'bg-zinc-800 text-zinc-500'
                      : 'bg-slate-200 text-slate-600'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <p className={`mt-3 text-[10px] ${text}`}>5 PubMed anchors · calibration bar</p>
        </div>
      );
    }

    default: {
      const Icon = getEngineIcon(slug);
      return (
        <div className={`h-full flex items-center justify-center border-b ${panel}`}>
          <Icon className={`w-12 h-12 opacity-25 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
        </div>
      );
    }
  }
}
