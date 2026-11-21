'use client';

import {
  CLINICAL_CASES,
  type ClinicalCaseId,
} from '@/data/clinical-case-ui';
import { useTbProductChrome } from './useTbProductChrome';

export function TreatmentDecisionPanel({
  activeCase,
  onCaseChange,
}: {
  activeCase: ClinicalCaseId;
  onCaseChange: (id: ClinicalCaseId) => void;
}) {
  const chrome = useTbProductChrome();
  const card = CLINICAL_CASES.find((c) => c.id === activeCase) ?? CLINICAL_CASES[0];
  const tabOn = `${chrome.accent} border-current`;
  const tabOff = chrome.muted;

  return (
    <div className={`max-w-3xl rounded border p-4 ${chrome.rail}`}>
      <div className="flex flex-wrap gap-2">
        {CLINICAL_CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCaseChange(c.id)}
            className={`rounded border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
              c.id === activeCase ? tabOn : tabOff
            }`}
          >
            {c.tabLabel}
          </button>
        ))}
      </div>
      <p className={`mt-4 text-[12px] ${chrome.body}`}>{card.body}</p>
      <div className={`mt-4 space-y-2 rounded border p-3 ${chrome.bg}`}>
        <p className={`text-[11px] ${chrome.main}`}>
          <span className={chrome.accent}>PRIORITIZE</span> · {card.prioritize}
        </p>
        <p className={`text-[11px] ${chrome.main}`}>
          <span className="text-rose-500">BLOCK</span> · {card.block}
        </p>
      </div>
    </div>
  );
}