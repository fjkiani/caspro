'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Layers, XCircle, ShieldCheck, ScrollText, ArrowRight,
} from 'lucide-react';
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

/**
 * /tumor-board — 5-tab summary surface with persona action bar.
 *
 * Left nav = icon+badge sticky rail. Right = active tab. Bottom = persona CTAs.
 *
 * PATIENT-GENERIC: header, subtitle, counts, and the "driver-gene" chip line
 * all derive from `usePatient()` at render time. The 11 tab components
 * underneath were already patient-generic; this shell now matches.
 *
 * Anchor panels (Brenus for CRC01, evo2-e2e for BM01) integrate INTO the tab
 * flow — Brenus goes under CONFIDENCE, evo2-e2e goes under SL AXES — not as
 * separate above-the-fold cards.
 */
type TabId = 'patient' | 'sl-axes' | 'falsification' | 'confidence' | 'provenance';

// Terms that show up per tab — for the patient translator strip
const TAB_TERMS: Record<TabId, string[]> = {
  'patient':       ['mbd4_lof', 'target_lock'],
  'sl-axes':       ['sl_axis', 'mechanism_fit', 'ln_ic50', 'cohens_d', 'atr_axis'],
  'falsification': ['parp_falsified', 'p_value', 'cohens_d'],
  'confidence':    ['target_lock', 'p_value', 'cohens_d'],
  'provenance':    [],
};

export default function TumorBoardSurface() {
  const patient = usePatient();
  const [tab, setTab] = useState<TabId>('patient');
  const { persona, setPersona } = usePersona();

  // -------- Header derivation from the active bundle --------
  // Driver gene chip line: first 3 gene symbols from mutations (unique).
  const driverGenes = Array.from(
    new Set(patient.mutations.map((m) => m.gene)),
  ).slice(0, 3);
  const driverChips = driverGenes.length > 0 ? driverGenes.join(' / ') : '—';

  const displayName = patient.meta.displayName ?? patient.meta.patientId;
  const tumorLabel =
    patient.tumorContext.subtype ??
    prettifyCancerType(patient.tumorContext.cancerType);
  const bundleLabel = `${patient.meta.patientId} bundle`.toUpperCase();

  // Header title — "Patient <id> · <driver gene chips>" so every patient
  // reads distinctly (AK reads MBD4/PDGFRA/TP53; OV01 reads BRCA1/TP53;
  // BM01 reads TP53/PIK3CA; etc.).
  const headerTitle = `Patient ${patient.meta.patientId} · ${driverChips}`;

  // Subtitle — patient-scoped explanation, not the AK contract hardcode.
  // Fall back to the bundle's own demoDisclaimer when present.
  const contractVersion = patient.meta.contractVersion ?? 'v2.0';
  const subtitle = patient.meta.demoDisclaimer
    ? patient.meta.demoDisclaimer
    : `Wired to the canonical ${patient.meta.patientId} L1 bundle (contract ${contractVersion}). Toggle tabs to walk the SL analysis, the falsification arc, and the receipts stack.`;

  // -------- Tab count derivation --------
  // Each count is a real quantity computed from the active bundle. Falsy or
  // zero-count tabs still render (the tab itself still shows "0"), so
  // patients with e.g. no PARP-falsification arc don't hide the tab.
  const nVar = patient.mutations.length;
  const nAxes = patient.brokenPathways.length;
  const nArc = patient.parpFalsification ? 1 : 0;
  const nAnchors = patient.evidenceAnchors.length;
  const nReceipts = countReceipts(patient);

  const TABS: {
    id: TabId;
    label: string;
    sub: string;
    Icon: typeof User;
    count: string;
  }[] = [
    {
      id: 'patient',
      label: 'PATIENT',
      sub: `${displayName.split(' · ')[0]} bundle + variants`,
      Icon: User,
      count: `${nVar} var`,
    },
    {
      id: 'sl-axes',
      label: 'SL AXES',
      sub: 'Pathways + 6-axis matrix',
      Icon: Layers,
      count: `${nAxes} ax`,
    },
    {
      id: 'falsification',
      label: 'FALSIFICATION',
      sub: patient.parpFalsification ? 'PARP arc + receipts' : 'no falsification arc',
      Icon: XCircle,
      count: `${nArc} arc`,
    },
    {
      id: 'confidence',
      label: 'CONFIDENCE',
      sub: 'Anchors + drugs + gaps',
      Icon: ShieldCheck,
      count: `${nAnchors} anc`,
    },
    {
      id: 'provenance',
      label: 'PROVENANCE',
      sub: 'Receipts stack',
      Icon: ScrollText,
      count: `${nReceipts} rcpt`,
    },
  ];

  // Anchor panel presence — panels integrate INTO tabs, not above the fold.
  const hasCrcAnchor = Boolean(patient.anchorPanels?.crc);
  const hasBrmAnchor = Boolean(patient.anchorPanels?.brm);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-8 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              TUMOR BOARD · {bundleLabel}
            </div>
            <h1 className="mt-1 text-3xl font-semibold">{headerTitle}</h1>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
              {tumorLabel}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-white/60">{subtitle}</p>
          </div>
          <Link
            href="/tumor-board-scroll"
            className="rounded border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20"
          >
            Read as scroll →
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-[240px_1fr] gap-6 px-8 py-6">
        {/* Left sticky nav */}
        <nav aria-label="Tumor-board sections" className="sticky top-20 self-start space-y-1">
          {TABS.map(({ id, label, sub, Icon, count }) => {
            const active = id === tab;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={
                  'group w-full text-left px-3 py-3 rounded border flex items-start gap-3 transition-colors cursor-pointer ' +
                  (active
                    ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100'
                    : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:border-white/30')
                }
                tabIndex={0}
              >
                <Icon className={`h-4 w-4 mt-0.5 ${active ? 'text-cyan-300' : 'text-white/40 group-hover:text-white/70'}`} aria-hidden />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold uppercase tracking-widest">{label}</div>
                    <span className="text-[9px] font-mono opacity-60">{count}</span>
                  </div>
                  <div className="text-[11px] text-white/50 mt-0.5">{sub}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right pane */}
        <section className="min-w-0 space-y-4">
          {persona === 'patient' && (
            <PatientTranslator termIds={TAB_TERMS[tab]} />
          )}

          {tab === 'patient' && (
            <div className="space-y-4">
              <AKBundleHeader />
              <AKMutationPanel />
            </div>
          )}
          {tab === 'sl-axes' && (
            <div className="space-y-4">
              <SLPathwayGrid />
              <SLMatrixTable />
              {/* BM01 (evo2-e2e brain-met cascade) plugs in here — the panel
                  is the SL-axis story for a brain-met patient: 7 steps × 29
                  genes × real GPU-scored target-lock ranks. Only renders if
                  the active bundle carries anchorPanels.brm. */}
              {hasBrmAnchor ? <BrmTargetLockPanel /> : null}
            </div>
          )}
          {tab === 'falsification' && (
            patient.parpFalsification ? (
              <PARPFalsificationArc />
            ) : (
              <NoFalsificationArc patientId={patient.meta.patientId} />
            )
          )}
          {tab === 'confidence' && (
            <div className="space-y-4">
              <EvidenceAnchorTable />
              <RecommendedDrugsPanel />
              <MissingTestsPanel />
              {/* CRC01 (Brenus IO_APPENDIX trials) plugs in here — the panel
                  IS the confidence story for a Lynch/MSI-H patient:
                  KEYNOTE-177 + CheckMate-142 pulled from Brenus's 42-trial
                  registry with admissibility tags and provenance paths.
                  Only renders if the active bundle carries anchorPanels.crc. */}
              {hasCrcAnchor ? <CrcAnchorEvidencePanel /> : null}
            </div>
          )}
          {tab === 'provenance' && <ProvenanceStack />}

          {/* Bottom action bar */}
          <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center gap-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mr-2">Explain to:</div>
            {(['oncologist', 'patient', 'pharma'] as Persona[]).map((p) => {
              const active = persona === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersona(p)}
                  className={
                    'inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors ' +
                    (active
                      ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100'
                      : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]')
                  }
                >
                  {PERSONA_LABELS[p]}
                  {active && <ArrowRight className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------- helpers ----------

function prettifyCancerType(ct: string): string {
  return ct
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Count receipts across every provenance-bearing block. Receipts are the
// "canonicalPath / path" stamps that let a reader trace a value back to its
// source JSON. Different bundles ship different counts, so this must derive
// from the bundle, not hardcoded.
function countReceipts(patient: ReturnType<typeof usePatient>): number {
  let n = 0;
  if (patient.tumorContext.path) n++;
  if (patient.completeness.path) n++;
  if (patient.suggestedTherapy.path) n++;
  // slProvenance is always present in the bundle contract
  n++;
  // anchor panels carry their own provenance arrays
  const crcProv = (patient.anchorPanels?.crc as { provenance?: unknown[] } | undefined)?.provenance;
  if (Array.isArray(crcProv)) n += crcProv.length;
  const brmProv = (patient.anchorPanels?.brm as { provenance?: unknown[] } | undefined)?.provenance;
  if (Array.isArray(brmProv)) n += brmProv.length;
  return n;
}

function NoFalsificationArc({ patientId }: { patientId: string }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.02] p-6">
      <p className="text-xs uppercase tracking-widest text-white/40">Falsification arc</p>
      <h3 className="mt-1 text-lg font-semibold text-white">
        {patientId} carries no PARP-falsification arc.
      </h3>
      <p className="mt-2 text-sm text-white/60">
        This patient&rsquo;s recommended-drug set does not overlap with the
        AK-anchored PARP falsification story (BRCA1/MBD4-LOF + olaparib +
        positive control). Nothing to falsify here — the tab is intentionally
        empty rather than fabricating an arc.
      </p>
    </div>
  );
}
