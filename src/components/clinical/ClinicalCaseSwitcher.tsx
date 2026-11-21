'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  CLINICAL_CASES,
  CLINICAL_METRIC_TILES,
  type ClinicalCaseId,
} from '@/data/clinical-case-ui';

export function ClinicalMetricTiles({ compact = false }: { compact?: boolean }) {
  const { isDarkMode } = useTheme();
  const tile = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/60 text-white'
    : 'border-slate-200 bg-white text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';

  return (
    <div
      className={`grid gap-2 ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'}`}
    >
      {CLINICAL_METRIC_TILES.map((m) => (
        <div key={m.id} className={`rounded border px-3 py-2 ${tile}`}>
          <p className="text-lg font-black tracking-tight sm:text-xl">{m.value}</p>
          <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${muted}`}>{m.label}</p>
        </div>
      ))}
    </div>
  );
}

export function ClinicalCaseSwitcher({
  defaultCase = 'ovarian',
  showTiles = true,
  variant = 'full',
  activeCase: controlledActive,
  onCaseChange,
}: {
  defaultCase?: ClinicalCaseId;
  showTiles?: boolean;
  variant?: 'full' | 'cases';
  activeCase?: ClinicalCaseId;
  onCaseChange?: (id: ClinicalCaseId) => void;
}) {
  const { isDarkMode } = useTheme();
  const [localActive, setLocalActive] = useState<ClinicalCaseId>(defaultCase);
  const active = controlledActive ?? localActive;
  const setActive = (id: ClinicalCaseId) => {
    setLocalActive(id);
    onCaseChange?.(id);
  };
  const [openEvidence, setOpenEvidence] = useState(false);
  const card = CLINICAL_CASES.find((c) => c.id === active) ?? CLINICAL_CASES[0];
  const showEvidenceDrawer = variant === 'full';

  const shell = isDarkMode ? 'border-zinc-800 bg-zinc-950/50' : 'border-slate-200 bg-white';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const tabOn = isDarkMode
    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
    : 'border-indigo-300 bg-indigo-50 text-indigo-800';
  const tabOff = isDarkMode
    ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
    : 'border-slate-200 text-slate-500 hover:text-slate-800';

  return (
    <div className={`w-full max-w-3xl rounded border p-3 sm:p-4 pointer-events-auto ${shell}`}>
      {showTiles ? (
        <div className="mb-3">
          <ClinicalMetricTiles compact />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {CLINICAL_CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setActive(c.id);
              setOpenEvidence(false);
            }}
            className={`rounded border px-2.5 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
              c.id === active ? tabOn : tabOff
            }`}
          >
            {c.tabLabel}
          </button>
        ))}
      </div>

      <p className={`mt-3 text-[13px] leading-snug ${body}`}>{card.body}</p>
      <p className={`mt-2 text-[11px] ${main}`}>
        <span className={accent}>PRIORITIZE</span> {card.prioritize}
      </p>
      <p className={`mt-1 text-[11px] ${main}`}>
        <span className={isDarkMode ? 'text-rose-400' : 'text-rose-700'}>BLOCK</span> {card.block}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {showEvidenceDrawer ? (
          <button
            type="button"
            onClick={() => setOpenEvidence((v) => !v)}
            className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${accent}`}
          >
            {card.evidenceTitle}
            {openEvidence ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        ) : (
          <span className={`text-[10px] ${muted}`}>Clinical proof tab holds study detail.</span>
        )}
        <Link
          href={card.href}
          className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${muted} hover:opacity-80`}
        >
          Open case
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {showEvidenceDrawer && openEvidence ? (
        <ul className={`mt-3 space-y-1.5 border-t border-dashed pt-3 text-[11px] leading-snug ${muted} ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
          {card.evidenceLines.map((line) => (
            <li key={line.slice(0, 48)}>· {line}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
