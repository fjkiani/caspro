'use client';

import type { CascadeStep } from '@/data/metastatic-cascade-data';
import { AF3_RNA_DNA_GATES } from '@/data/metastatic-cascade-data';
import ProteinModelViewer from '@/components/ui/ProteinModelViewer';

/** AF3 structural triage — 3D structure preview swaps per cascade step */
export function GuideRnaAf3Panel({
  step,
  isDarkMode,
  isLocking,
}: {
  step: CascadeStep;
  isDarkMode: boolean;
  isLocking: boolean;
}) {
  const inAf3Cohort = step.af3Guide !== 'L1_PRIOR';
  const pass = inAf3Cohort && step.plddt >= AF3_RNA_DNA_GATES.plddtMin && step.iptm >= AF3_RNA_DNA_GATES.iptmMin;

  return (
    <div className="relative w-full h-full flex flex-col font-mono min-h-[220px]">
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <ProteinModelViewer
          key={step.af3Guide}
          viewPreset={step.view}
          isDarkMode={isDarkMode}
          className="absolute inset-0 w-full h-full min-h-0 !bg-transparent rounded-none shadow-none"
        />
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-gradient-to-t from-[#020408]/90 via-transparent to-[#020408]/40'
              : 'bg-gradient-to-t from-slate-50/90 via-transparent to-white/30'
          }`}
        />
      </div>

      <div
        className={`relative z-10 shrink-0 px-4 pb-4 pt-2 border-t grid grid-cols-2 gap-3 text-[9px] uppercase font-bold tracking-widest ${
          isDarkMode ? 'border-zinc-800 bg-[#020408]/80' : 'border-slate-200 bg-white/90'
        }`}
      >
        <div>
          <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>AF3 Guide</span>
          <p className={`mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{step.af3Guide}</p>
        </div>
        <div>
          <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>Target</span>
          <p className={`mt-0.5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{step.gene}</p>
        </div>
        <div>
          <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>pLDDT</span>
          <p className="mt-0.5 text-emerald-500 tabular-nums">{step.plddt.toFixed(1)}</p>
        </div>
        <div>
          <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>iPTM</span>
          <p className="mt-0.5 text-emerald-500 tabular-nums">{step.iptm.toFixed(2)}</p>
        </div>
      </div>

      <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-none z-10">
        <span
          className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase border ${
            isLocking
              ? 'border-rose-500/50 text-rose-500 bg-rose-500/10'
              : pass
                ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
                : 'border-amber-500/40 text-amber-500'
          }`}
        >
          {isLocking ? 'AF3 RUN…' : !inAf3Cohort ? 'L1 ONLY' : pass ? 'AF3 PASS' : 'REVIEW'}
        </span>
        <span className={`text-[8px] font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
          {step.gene} · structure
        </span>
      </div>
    </div>
  );
}
