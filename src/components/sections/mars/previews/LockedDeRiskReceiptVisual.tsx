'use client';

/**
 * Public-safe locked preview for vector-map trials (ADAVOSERTIB / BERZOSERTIB).
 * Shows registry metadata only — mechanistic analysis stays redacted until passcode.
 */

import { Lock, Shield } from 'lucide-react';
import { TRIAL_CASE_FILES } from '@/data/trial-case-files';

type LockedDeRiskReceiptVisualProps = {
  trialId: string;
  isDarkMode: boolean;
};

const REDACTED_ROWS = [
  'Mechanistic Stratification',
  'Patient Vector Signature',
  'Root Cause Verdict',
  'Enrollment Gate Recommendation',
];

export default function LockedDeRiskReceiptVisual({
  trialId,
  isDarkMode,
}: LockedDeRiskReceiptVisualProps) {
  const trial = TRIAL_CASE_FILES[trialId];
  if (!trial) return null;

  const panel = isDarkMode
    ? 'bg-zinc-950/80 border-zinc-800 text-zinc-100'
    : 'bg-white border-slate-300 text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const accent = isDarkMode ? 'text-violet-400' : 'text-violet-600';
  const redactedBg = isDarkMode ? 'bg-zinc-900/90' : 'bg-slate-100';
  const scanLine = isDarkMode ? 'from-violet-500/0 via-violet-400/20 to-violet-500/0' : 'from-violet-600/0 via-violet-500/15 to-violet-600/0';

  return (
    <div className={`relative flex h-full min-h-[220px] sm:min-h-[320px] w-full flex-col overflow-hidden rounded-lg border p-4 sm:p-6 ${panel}`}>
      {/* Scan sweep */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${scanLine} animate-pulse`}
        aria-hidden
      />

      <div className="relative z-10 flex items-start justify-between gap-3 border-b border-inherit pb-4">
        <div className="min-w-0">
          <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] ${accent}`}>
            De-Risking Receipt // Sealed
          </span>
          <h3 className="mt-2 text-sm sm:text-base font-black uppercase tracking-tight truncate">
            {trial.title}
          </h3>
          <p className={`mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${muted}`}>
            {trial.drugLine}
          </p>
        </div>
        <div
          className={`shrink-0 flex h-10 w-10 items-center justify-center rounded border ${
            isDarkMode ? 'border-violet-500/30 bg-violet-500/10' : 'border-violet-300 bg-violet-50'
          }`}
        >
          <Lock className={`h-4 w-4 ${accent}`} />
        </div>
      </div>

      {/* Public metadata only */}
      <div className="relative z-10 mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { label: 'Registry', value: trial.trialId },
          { label: 'Sponsor', value: trial.sponsor },
          { label: 'Phase', value: trial.phase },
          { label: 'Indication', value: trial.cancer.split('(')[0]?.trim() ?? trial.cancer },
        ].map((row) => (
          <div key={row.label} className="min-w-0">
            <span className={`block text-[8px] font-black uppercase tracking-[0.25em] ${muted}`}>
              {row.label}
            </span>
            <span className="mt-1 block text-[10px] sm:text-[11px] font-black uppercase tracking-tight truncate">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Redacted analysis blocks */}
      <div className="relative z-10 mt-5 flex-1 space-y-2.5 min-h-0">
        {REDACTED_ROWS.map((label) => (
          <div
            key={label}
            className={`rounded border px-3 py-2.5 ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${muted}`}>{label}</span>
              <Shield className={`h-3 w-3 shrink-0 ${muted}`} aria-hidden />
            </div>
            <div className={`mt-2 h-2.5 rounded-sm ${redactedBg}`} />
            <div className={`mt-1.5 h-2 w-3/4 rounded-sm opacity-70 ${redactedBg}`} />
          </div>
        ))}
      </div>

      <div className={`relative z-10 mt-4 flex items-center justify-between border-t border-inherit pt-3 text-[8px] font-black uppercase tracking-[0.25em] ${muted}`}>
        <span>Analysis withheld</span>
        <span className={accent}>Passcode required</span>
      </div>
    </div>
  );
}
