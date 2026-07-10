'use client';

import { Info } from 'lucide-react';
import { PATIENT_TRANSLATOR } from '@/data/patient-translator-content';

interface Props {
  termIds: string[];
  className?: string;
}

export default function PatientTranslator({ termIds, className = '' }: Props) {
  const entries = termIds
    .map((id) => PATIENT_TRANSLATOR[id])
    .filter((e): e is { term: string; plain: string } => !!e);
  if (entries.length === 0) return null;

  return (
    <div className={`border border-emerald-400/40 bg-emerald-500/[0.06] rounded p-4 ${className}`}>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-200 mb-2">
        <Info className="h-3.5 w-3.5" aria-hidden />
        <span>What this means (patient view)</span>
      </div>
      <dl className="space-y-1.5 text-sm text-emerald-50">
        {entries.map((e) => (
          <div key={e.term} className="flex gap-2">
            <dt className="font-mono text-emerald-300 shrink-0">{e.term}</dt>
            <dd className="text-emerald-100/80">— {e.plain}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
