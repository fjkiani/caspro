'use client';

import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { PasscodeModal } from '@/components/ui/PasscodeModal';
import type { TrialLedgerEntry } from '@/data/trial-ledger-registry';
import { isGatedLedgerTrial } from '@/data/trial-gate';

type GatedLedgerTrialLinkProps = {
  entry: TrialLedgerEntry;
  isDarkMode: boolean;
};

export default function GatedLedgerTrialLink({ entry, isDarkMode }: GatedLedgerTrialLinkProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const gated = isGatedLedgerTrial(entry.slug);

  const rowClass = `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border px-4 py-3 transition-colors cursor-pointer ${
    isDarkMode
      ? 'border-zinc-800 bg-zinc-950/60 hover:border-violet-500/40'
      : 'border-slate-200 bg-slate-50/80 hover:border-violet-400'
  }`;

  const inner = (
    <>
      <div className="min-w-0">
        <span className="text-sm font-black uppercase tracking-wide flex items-center gap-2">
          {entry.label} // {entry.sublabel}
          {gated && (
            <Lock
              className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}
              aria-hidden
            />
          )}
        </span>
        <p className={`text-xs mt-0.5 truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          {entry.trialId} · {entry.cancer}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <code
          className={`text-[10px] font-bold px-2 py-1 rounded ${
            isDarkMode ? 'bg-zinc-900 text-violet-400' : 'bg-white text-violet-700 border border-slate-200'
          }`}
        >
          {entry.route}
        </code>
        <span
          className={`text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1 ${
            isDarkMode ? 'text-zinc-600 group-hover:text-violet-400' : 'text-slate-500 group-hover:text-violet-600'
          }`}
        >
          {gated ? 'Unlock receipt' : 'Open receipt'}
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </>
  );

  if (!gated) {
    return (
      <a href={entry.route} className={`group ${rowClass}`}>
        {inner}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setModalOpen(true)} className={`group w-full text-left ${rowClass}`}>
        {inner}
      </button>
      <PasscodeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        proofUrl={entry.route}
        targetLabel={entry.label}
      />
    </>
  );
}
