'use client';

/**
 * PatientTranslator — plain-English glossary strip.
 *
 * Rendered when the "patient" persona is active, so the persona-visibility
 * layer for /tumor-board never shows a raw abbreviation without an anchor.
 * Now theme-aware (dark: emerald tokens; light: emerald tokens with darker
 * text for contrast on white).
 */

import { Info } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { PATIENT_TRANSLATOR } from '@/data/patient-translator-content';

interface Props {
  termIds: string[];
  className?: string;
}

export default function PatientTranslator({ termIds, className = '' }: Props) {
  const { isDarkMode } = useTheme();

  const entries = termIds
    .map((id) => PATIENT_TRANSLATOR[id])
    .filter((e): e is { term: string; plain: string } => !!e);
  if (entries.length === 0) return null;

  const container = isDarkMode
    ? 'border-emerald-400/40 bg-emerald-500/[0.06]'
    : 'border-emerald-300 bg-emerald-50';
  const eyebrow = isDarkMode ? 'text-emerald-200' : 'text-emerald-700';
  const termToken = isDarkMode ? 'text-emerald-300' : 'text-emerald-700';
  const plainText = isDarkMode ? 'text-emerald-100/80' : 'text-emerald-900';
  const bodyText = isDarkMode ? 'text-emerald-50' : 'text-emerald-900';

  return (
    <div className={`rounded border p-4 ${container} ${className}`}>
      <div className={`mb-2 flex items-center gap-2 text-[10px] uppercase tracking-widest ${eyebrow}`}>
        <Info className="h-3.5 w-3.5" aria-hidden />
        <span>What this means (patient view)</span>
      </div>
      <dl className={`space-y-1.5 text-sm ${bodyText}`}>
        {entries.map((e) => (
          <div key={e.term} className="flex gap-2">
            <dt className={`shrink-0 font-mono ${termToken}`}>{e.term}</dt>
            <dd className={plainText}>— {e.plain}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
