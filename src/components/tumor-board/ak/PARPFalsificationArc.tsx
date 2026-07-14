'use client';

/**
 * PARPFalsificationArc — three-card centerpiece, now persona-aware +
 * light-mode + mobile-safe.
 *
 * Copy: pulled from PARP_ARC_COPY (src/data/tumor-board/persona-copy.ts).
 *       Every sentence is per-persona. No hardcoded English in this file.
 * Visibility: pulled from PARP_ARC_VISIBILITY.
 *       - patient hides p-value line + matrix_axis line
 *       - pharma  hides patient identifier (uses "prod today" instead of "AK")
 * Emphasis: rose (prod bug) / amber (manuscript) / cyan|indigo (fix) tokens
 *       swap gracefully between dark and light backgrounds.
 * Mobile: grid stays lg:grid-cols-3, wrapper drops the max-w wrapper to let
 *       the walker's parent section provide it. px-4/px-8 responsive.
 */

import { useTheme } from '@/context/ThemeContext';
import { usePatient } from '@/context/PatientContext';
import { usePersona } from '@/context/PersonaContext';
import {
  PARP_ARC_COPY,
  PARP_ARC_VISIBILITY,
} from '@/data/tumor-board/persona-copy';

export default function PARPFalsificationArc() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();
  const { persona } = usePersona();
  const copy = PARP_ARC_COPY[persona];
  const show = PARP_ARC_VISIBILITY[persona];

  if (!patient.parpFalsification) return null;
  const { prodShipsToday, manuscriptSays, pr11Fix } = patient.parpFalsification;

  // token palette (defined once)
  const heading = isDarkMode ? 'text-white' : 'text-zinc-900';
  const body    = isDarkMode ? 'text-white/60' : 'text-zinc-700';
  const bodyDim = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const meta    = isDarkMode ? 'text-white/40' : 'text-zinc-500';

  // rose / amber / cyan-or-indigo tokens
  const roseHead = isDarkMode ? 'text-rose-300' : 'text-rose-700';
  const roseBrd  = isDarkMode ? 'border-rose-400/30' : 'border-rose-300';
  const roseBg   = isDarkMode ? 'bg-rose-500/[0.05]' : 'bg-rose-50';
  const roseBg2  = isDarkMode ? 'bg-rose-500/[0.08]' : 'bg-rose-100';
  const roseTxt  = isDarkMode ? 'text-rose-100/80' : 'text-rose-900';

  const amberHead = isDarkMode ? 'text-amber-300' : 'text-amber-700';
  const amberBrd  = isDarkMode ? 'border-amber-400/30' : 'border-amber-300';
  const amberBg   = isDarkMode ? 'bg-amber-500/[0.05]' : 'bg-amber-50';
  const amberBrd2 = isDarkMode ? 'border-amber-400/40' : 'border-amber-300';
  const amberBg2  = isDarkMode ? 'bg-black/30' : 'bg-white';
  const amberTxt  = isDarkMode ? 'text-amber-200' : 'text-amber-800';

  const fixHead = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const fixHead2 = isDarkMode ? 'text-cyan-300/70' : 'text-indigo-500';
  const fixBrd  = isDarkMode ? 'border-cyan-400/40' : 'border-indigo-300';
  const fixBrd2 = isDarkMode ? 'border-cyan-400/30' : 'border-indigo-300';
  const fixBg   = isDarkMode ? 'bg-cyan-500/[0.05]' : 'bg-indigo-50';
  const fixBg2  = isDarkMode ? 'bg-black/30' : 'bg-white';
  const fixTxt  = isDarkMode ? 'text-cyan-200' : 'text-indigo-700';

  const inlineBrd = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const inlineBg  = isDarkMode ? 'bg-black/20' : 'bg-white';
  const inlineTxt = isDarkMode ? 'text-white/55' : 'text-zinc-700';
  const inlineTxt2 = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const inlineTxt3 = isDarkMode ? 'text-white/80' : 'text-zinc-900';

  // For "pharma" the identifier gets replaced with "prod today" phrasing.
  const drugLabel = show.showPatientId
    ? prodShipsToday.drugName
    : `${prodShipsToday.drugName} (recommendation on ledger)`;

  return (
    <section className="py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className={`text-[10px] uppercase tracking-[0.24em] ${roseHead}`}>
            {copy.eyebrow}
          </div>
          <h2 className={`mt-1 text-2xl font-semibold ${heading}`}>
            {copy.title}
          </h2>
          <p className={`mt-2 max-w-3xl text-sm ${body}`}>
            {copy.blurb}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Card 1 — prod today */}
        <div
          className={`flex flex-col rounded-lg border p-5 ${roseBrd} ${roseBg}`}
        >
          <div className={`text-[10px] uppercase tracking-[0.24em] ${roseHead}`}>
            {copy.card1Label}
          </div>
          <div className={`mt-3 text-sm ${bodyDim}`}>{drugLabel}</div>
          <dl className="mt-4 space-y-2 text-xs">
            {show.showMatrixAxis && (
              <Row
                label="Matrix axis"
                isDarkMode={isDarkMode}
              >
                {prodShipsToday.matrixAxis}
              </Row>
            )}
            <Row label="Tier" isDarkMode={isDarkMode}>
              {prodShipsToday.tier}
            </Row>
            <Row label="Bridge policy" isDarkMode={isDarkMode}>
              {prodShipsToday.bridgePolicy}
            </Row>
          </dl>
          <div
            className={`mt-4 rounded border p-3 text-[11px] leading-relaxed ${roseBrd} ${roseBg2} ${roseTxt}`}
          >
            <span className={roseHead}>{copy.card1Result}:</span>{' '}
            {prodShipsToday.behavior}
          </div>
        </div>

        {/* Card 2 — manuscript */}
        <div
          className={`flex flex-col rounded-lg border p-5 ${amberBrd} ${amberBg}`}
        >
          <div className={`text-[10px] uppercase tracking-[0.24em] ${amberHead}`}>
            {copy.card2Label}
          </div>
          <div className={`mt-3 text-sm ${bodyDim}`}>
            {manuscriptSays.finding}
          </div>
          {show.showPValueLine && (
            <div
              className={`mt-3 rounded border p-3 ${amberBrd2} ${amberBg2}`}
            >
              <div className={`font-mono text-xs ${amberTxt}`}>
                {manuscriptSays.stat}
              </div>
              <div className={`mt-1 text-[11px] leading-relaxed ${body}`}>
                {manuscriptSays.conclusion}
              </div>
            </div>
          )}
          {manuscriptSays.positiveControl && (
            <div
              className={`mt-4 rounded border p-3 ${inlineBrd} ${inlineBg}`}
            >
              <div
                className={`text-[10px] uppercase tracking-widest ${meta}`}
              >
                {copy.card2Positive}
              </div>
              <div className={`mt-1 text-xs ${inlineTxt3}`}>
                {manuscriptSays.positiveControl.finding}
              </div>
              {show.showPValueLine && (
                <div className={`mt-1 font-mono text-xs ${inlineTxt2}`}>
                  {manuscriptSays.positiveControl.stat}
                </div>
              )}
              <div
                className={`mt-1 text-[11px] leading-relaxed ${inlineTxt}`}
              >
                {manuscriptSays.positiveControl.point}
              </div>
            </div>
          )}
        </div>

        {/* Card 3 — PR#11 fix */}
        <div
          className={`flex flex-col rounded-lg border p-5 ${fixBrd} ${fixBg}`}
        >
          <div
            className={`text-[10px] uppercase tracking-[0.24em] ${fixHead}`}
          >
            {copy.card3Label}
          </div>
          <div className={`mt-3 text-sm ${bodyDim}`}>
            Add field{' '}
            <span className={`font-mono ${fixTxt}`}>{pr11Fix.field}</span> ={' '}
            <span className={`font-mono ${fixTxt}`}>
              &apos;{pr11Fix.value}&apos;
            </span>
          </div>
          <div
            className={`mt-4 rounded border p-3 text-[11px] leading-relaxed ${fixBrd2} ${fixBg2} ${inlineTxt3}`}
          >
            {pr11Fix.effect}
          </div>
          <div
            className={`mt-4 rounded border p-3 text-[11px] leading-relaxed ${inlineBrd} ${inlineBg} ${inlineTxt}`}
          >
            {pr11Fix.rowKept}
          </div>
          <div
            className={`mt-4 text-[10px] uppercase tracking-widest ${fixHead2}`}
          >
            {copy.card3Additive}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  children,
  isDarkMode,
}: {
  label: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt
        className={`text-[10px] uppercase tracking-widest ${
          isDarkMode ? 'text-white/40' : 'text-zinc-500'
        }`}
      >
        {label}
      </dt>
      <dd
        className={`text-right ${
          isDarkMode ? 'text-white/80' : 'text-zinc-900'
        }`}
      >
        {children}
      </dd>
    </div>
  );
}
