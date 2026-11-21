'use client';

import {
  CLINICAL_CASES,
  CLINICAL_PROOF_CROSSWALK,
  type ClinicalCaseId,
} from '@/data/clinical-case-ui';
import { useTbProductChrome } from './useTbProductChrome';

export function ClinicalProofPanel({
  activeCase,
  onCaseChange,
}: {
  activeCase: ClinicalCaseId;
  onCaseChange: (id: ClinicalCaseId) => void;
}) {
  const chrome = useTbProductChrome();
  const card = CLINICAL_CASES.find((c) => c.id === activeCase) ?? CLINICAL_CASES[0];

  return (
    <div className={`max-w-3xl rounded border p-4 ${chrome.rail}`}>
      <div className="flex flex-wrap gap-2">
        {CLINICAL_CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCaseChange(c.id)}
            className={`rounded border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
              c.id === activeCase ? chrome.accent : chrome.muted
            }`}
          >
            {c.tabLabel}
          </button>
        ))}
      </div>
      <p className={`mt-3 text-[11px] font-black uppercase tracking-widest ${chrome.accent}`}>
        {card.evidenceTitle}
      </p>
      <ul className={`mt-2 space-y-1.5 text-[11px] leading-snug ${chrome.body}`}>
        {card.evidenceLines.map((line) => (
          <li key={line.slice(0, 56)}>· {line}</li>
        ))}
      </ul>
      <div className={`mt-4 border-t border-dashed pt-3 ${chrome.muted}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${chrome.accent}`}>
          Cross-case receipts
        </p>
        <ul className="mt-2 space-y-1 text-[11px]">
          {CLINICAL_PROOF_CROSSWALK.map((line) => (
            <li key={line.slice(0, 48)}>· {line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}