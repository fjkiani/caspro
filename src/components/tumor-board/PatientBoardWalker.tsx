'use client';

/**
 * PatientBoardWalker — new tumor-board shell.
 *
 * Visually mirrors src/components/demos/DemoWalker.tsx (sticky header, stage
 * rail, body, prev/next, footer cross-links) but consumes usePatient()
 * instead of a DemoSpec. Every child panel (AKMutationPanel, SLPathwayGrid,
 * etc.) is imported verbatim from TumorBoardSurface's tab flow — no panel
 * rewrites happen here.
 *
 * Persona is EMPHASIS-only: on mount, if no persona-scoped tab is already
 * open, the walker jumps to the tab that best matches the active persona:
 *   oncologist → sl-axes
 *   patient    → patient
 *   pharma     → falsification
 * The pill row at the bottom still lets the user override.
 *
 * Mobile: every layout wrapper uses the uniform pattern
 *   mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-10
 * and the stage rail is flex-wrap so 5 buttons wrap cleanly at 375px.
 *
 * Bridge: this file is wired in by src/app/tumor-board/[patientId]/page.tsx
 * only when usesNewSurface(patientId) returns true (see
 * src/data/patients/new-surface-registry.ts).
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Layers,
  ListTree,
  ScrollText,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePatient } from '@/context/PatientContext';
import { usePersona, PERSONA_LABELS, type Persona } from '@/context/PersonaContext';
import AKBundleHeader from './ak/AKBundleHeader';
import AKMutationPanel from './ak/AKMutationPanel';
import SLPathwayGrid from './ak/SLPathwayGrid';
import SLMatrixTable from './ak/SLMatrixTable';
import PARPFalsificationArc from './ak/PARPFalsificationArc';
import EvidenceAnchorTable from './ak/EvidenceAnchorTable';
import RecommendedDrugsPanel from './ak/RecommendedDrugsPanel';
import MissingTestsPanel from './ak/MissingTestsPanel';
import ProvenanceStack from './ak/ProvenanceStack';
import CrcAnchorEvidencePanel from './anchor/CrcAnchorEvidencePanel';
import BrmTargetLockPanel from './anchor/BrmTargetLockPanel';
import PatientTranslator from './PatientTranslator';

type TabId = 'patient' | 'sl-axes' | 'falsification' | 'confidence' | 'provenance';

interface Stage {
  id: TabId;
  name: string;
  Icon: LucideIcon;
}

const STAGES: Stage[] = [
  { id: 'patient',       name: 'PATIENT',       Icon: User },
  { id: 'sl-axes',       name: 'SL AXES',       Icon: Layers },
  { id: 'falsification', name: 'FALSIFICATION', Icon: XCircle },
  { id: 'confidence',    name: 'CONFIDENCE',    Icon: ShieldCheck },
  { id: 'provenance',    name: 'PROVENANCE',    Icon: ScrollText },
];

const SIBLING_LINKS = [
  { href: '/tumor-board', label: 'PICKER' },
  { href: '/pipeline',    label: 'PIPELINE' },
  { href: '/ledger',      label: 'LEDGER' },
];

// Terms that show up per tab — powers PatientTranslator for the patient persona.
const TAB_TERMS: Record<TabId, string[]> = {
  patient:       ['mbd4_lof', 'target_lock'],
  'sl-axes':     ['sl_axis', 'mechanism_fit', 'ln_ic50', 'cohens_d', 'atr_axis'],
  falsification: ['parp_falsified', 'p_value', 'cohens_d'],
  confidence:    ['target_lock', 'p_value', 'cohens_d'],
  provenance:    [],
};

// Emphasis map — which tab the walker opens on mount for each persona.
const DEFAULT_TAB_FOR_PERSONA: Record<Persona, TabId> = {
  oncologist:  'sl-axes',
  patient:     'patient',
  pharma:      'falsification',
};

export default function PatientBoardWalker() {
  const { isDarkMode } = useTheme();
  const patient = usePatient();
  const { persona, setPersona } = usePersona();

  const initialTab = DEFAULT_TAB_FOR_PERSONA[persona] ?? 'patient';
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  // Emphasis effect: if the persona changes AFTER mount, jump to that
  // persona's preferred tab (non-destructive — user can still click any tab).
  useEffect(() => {
    setActiveTab(DEFAULT_TAB_FOR_PERSONA[persona]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona]);

  // Scroll to top when tab changes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const activeIndex = STAGES.findIndex((s) => s.id === activeTab);
  const prevStage = activeIndex > 0 ? STAGES[activeIndex - 1] : null;
  const nextStage = activeIndex < STAGES.length - 1 ? STAGES[activeIndex + 1] : null;

  // -------- Header derivation from the bundle (mirrors TumorBoardSurface) --------
  const driverGenes = useMemo(
    () => Array.from(new Set(patient.mutations.map((m) => m.gene))).slice(0, 3),
    [patient.mutations],
  );
  const driverChips = driverGenes.length > 0 ? driverGenes.join(' / ') : '—';
  const headerTitle = `Patient ${patient.meta.patientId} · ${driverChips}`;
  const contractVersion = patient.meta.contractVersion ?? 'v2.0';
  const subtitle = patient.meta.demoDisclaimer
    ? patient.meta.demoDisclaimer
    : `Wired to the canonical ${patient.meta.patientId} L1 bundle (contract ${contractVersion}). Walk the SL analysis, the falsification arc, and the receipts stack.`;

  // Anchor panel presence (matches the TumorBoardSurface pattern).
  const hasCrcAnchor = Boolean(patient.anchorPanels?.crc);
  const hasBrmAnchor = Boolean(patient.anchorPanels?.brm);

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'
      }`}
    >
      {/* -------- Sticky top header -------- */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-sm ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/tumor-board" className="group flex items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                    : 'border-zinc-200 bg-zinc-100 group-hover:border-indigo-500/50'
                }`}
              >
                <ListTree
                  className={isDarkMode ? 'h-4 w-4 text-cyan-400' : 'h-4 w-4 text-indigo-500'}
                  aria-hidden
                />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${
                  isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-zinc-900 group-hover:text-indigo-600'
                }`}
              >
                CRISPRO
              </span>
            </Link>
            <span
              className={`hidden h-6 w-px md:block ${
                isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'
              }`}
              aria-hidden
            />
            <span
              className={`hidden text-[10px] font-black uppercase tracking-[0.4em] md:block ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              /tumor-board/{patient.meta.patientId}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
            {SIBLING_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  isDarkMode
                    ? 'text-zinc-400 transition-colors hover:text-cyan-400'
                    : 'text-zinc-600 transition-colors hover:text-indigo-600'
                }
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* -------- Stage rail (horizontal tab strip, wraps on mobile) -------- */}
      <nav
        aria-label="Patient board stages"
        className={`border-b ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap gap-2 px-4 py-3 md:px-8">
          {STAGES.map((s, i) => {
            const active = s.id === activeTab;
            const { Icon } = s;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveTab(s.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                  active
                    ? isDarkMode
                      ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                      : 'border-indigo-500/50 bg-indigo-50 text-indigo-700'
                    : isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-cyan-500/30 hover:text-cyan-300'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                <Icon className="h-3 w-3" aria-hidden />
                <span
                  className={`font-mono text-[9px] ${
                    active
                      ? isDarkMode
                        ? 'text-cyan-400'
                        : 'text-indigo-500'
                      : isDarkMode
                      ? 'text-zinc-600'
                      : 'text-zinc-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* -------- Manuscript-style title strip -------- */}
      <div
        className={`mx-auto w-full max-w-[1400px] border-b px-4 py-6 md:px-8 md:py-8 ${
          isDarkMode ? 'border-white/5' : 'border-zinc-200'
        }`}
      >
        <p
          className={`mb-1 text-[10px] font-black uppercase tracking-[0.4em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {headerTitle}
        </p>
        <p
          className={`max-w-4xl text-[13px] leading-relaxed ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {subtitle}
        </p>
      </div>

      {/* -------- Active tab body -------- */}
      <section className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
        {persona === 'patient' && (
          <PatientTranslator termIds={TAB_TERMS[activeTab]} />
        )}

        <div className="mt-4 space-y-4">
          {activeTab === 'patient' && (
            <>
              <AKBundleHeader />
              <AKMutationPanel />
            </>
          )}
          {activeTab === 'sl-axes' && (
            <>
              <SLPathwayGrid />
              <SLMatrixTable />
              {hasBrmAnchor ? <BrmTargetLockPanel /> : null}
            </>
          )}
          {activeTab === 'falsification' &&
            (patient.parpFalsification ? (
              <PARPFalsificationArc />
            ) : (
              <NoFalsificationArc
                patientId={patient.meta.patientId}
                isDarkMode={isDarkMode}
              />
            ))}
          {activeTab === 'confidence' && (
            <>
              <EvidenceAnchorTable />
              <RecommendedDrugsPanel />
              <MissingTestsPanel />
              {hasCrcAnchor ? <CrcAnchorEvidencePanel /> : null}
            </>
          )}
          {activeTab === 'provenance' && <ProvenanceStack />}
        </div>
      </section>

      {/* -------- Prev / next nav row -------- */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-8 md:px-8 md:pb-10">
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded border p-4 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <button
            type="button"
            disabled={!prevStage}
            onClick={() => prevStage && setActiveTab(prevStage.id)}
            className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
              prevStage
                ? isDarkMode
                  ? 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-300'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-indigo-400 hover:text-indigo-600'
                : 'cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600 opacity-40'
            }`}
          >
            <ChevronLeft className="h-3 w-3" aria-hidden />
            PREVIOUS
            {prevStage && <span className="opacity-60"> · {prevStage.name}</span>}
          </button>
          <span
            className={`text-[10px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            STAGE {activeIndex + 1} OF {STAGES.length}
          </span>
          <button
            type="button"
            disabled={!nextStage}
            onClick={() => nextStage && setActiveTab(nextStage.id)}
            className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
              nextStage
                ? isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-500/60'
                  : 'border-indigo-500/40 bg-indigo-50 text-indigo-700 hover:border-indigo-500/60'
                : 'cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600 opacity-40'
            }`}
          >
            {nextStage && <span className="opacity-60">{nextStage.name} · </span>}
            NEXT
            <ChevronRight className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>

      {/* -------- Persona pill row -------- */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-8 md:px-8 md:pb-10">
        <div
          className={`flex flex-wrap items-center gap-2 border-t pt-4 ${
            isDarkMode ? 'border-white/10' : 'border-zinc-200'
          }`}
        >
          <div
            className={`mr-2 text-[10px] uppercase tracking-widest ${
              isDarkMode ? 'text-white/40' : 'text-zinc-500'
            }`}
          >
            Explain to:
          </div>
          {(['oncologist', 'patient', 'pharma'] as Persona[]).map((p) => {
            const active = persona === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                aria-pressed={active}
                className={
                  'inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors ' +
                  (active
                    ? isDarkMode
                      ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100'
                      : 'border-indigo-500/60 bg-indigo-50 text-indigo-700'
                    : isDarkMode
                    ? 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50')
                }
              >
                {PERSONA_LABELS[p]}
                {active && <ArrowRight className="h-3 w-3" aria-hidden />}
              </button>
            );
          })}
        </div>
      </div>

      {/* -------- Footer cross-links -------- */}
      <footer
        className={`border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3 md:px-8">
          {SIBLING_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group rounded border p-4 transition-colors ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50'
                  : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
              }`}
            >
              <p
                className={`mb-1 text-[10px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {l.label}
              </p>
              <ClipboardList
                className={`mt-3 h-4 w-4 ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// NoFalsificationArc — themed variant of the empty-state block from
// TumorBoardSurface. Kept local so this file is self-contained.
function NoFalsificationArc({
  patientId,
  isDarkMode,
}: {
  patientId: string;
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`rounded border p-6 ${
        isDarkMode
          ? 'border-white/10 bg-white/[0.02]'
          : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-widest ${
          isDarkMode ? 'text-white/40' : 'text-zinc-500'
        }`}
      >
        Falsification arc
      </p>
      <h3
        className={`mt-1 text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {patientId} carries no PARP-falsification arc.
      </h3>
      <p
        className={`mt-2 text-sm ${
          isDarkMode ? 'text-white/60' : 'text-zinc-600'
        }`}
      >
        This patient&rsquo;s recommended-drug set does not overlap with the
        AK-anchored PARP falsification story (BRCA1/MBD4-LOF + olaparib +
        positive control). Nothing to falsify here — the tab is intentionally
        empty rather than fabricating an arc.
      </p>
    </div>
  );
}
