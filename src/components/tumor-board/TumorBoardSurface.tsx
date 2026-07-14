'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Layers, XCircle, ShieldCheck, ScrollText, ArrowRight,
} from 'lucide-react';
import { usePatient } from '@/context/PatientContext';
import { usePersona, PERSONA_LABELS, type Persona } from '@/context/PersonaContext';
import { useTheme } from '@/context/ThemeContext';
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
 * Left nav = icon+badge sticky rail (md+); mobile: nav stacks above content.
 * Right = active tab. Bottom = persona CTAs.
 *
 * PATIENT-GENERIC: header, subtitle, counts, and the "driver-gene" chip line
 * all derive from `usePatient()` at render time. The 11 tab components
 * underneath are patient-generic.
 *
 * Theme-aware (dark: black + cyan; light: white + indigo). Mobile-safe
 * (grid collapses to 1-col below md; sticky rail becomes wrapping row).
 */
type TabId = 'patient' | 'sl-axes' | 'falsification' | 'confidence' | 'provenance';

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
  const { isDarkMode } = useTheme();

  // Driver gene chip line
  const driverGenes = Array.from(
    new Set(patient.mutations.map((m) => m.gene)),
  ).slice(0, 3);
  const driverChips = driverGenes.length > 0 ? driverGenes.join(' / ') : '—';

  const displayName = patient.meta.displayName ?? patient.meta.patientId;
  const tumorLabel =
    patient.tumorContext.subtype ??
    prettifyCancerType(patient.tumorContext.cancerType);
  const bundleLabel = `${patient.meta.patientId} bundle`.toUpperCase();

  const headerTitle = `Patient ${patient.meta.patientId} · ${driverChips}`;

  const contractVersion = patient.meta.contractVersion ?? 'v2.0';
  const subtitle = patient.meta.demoDisclaimer
    ? patient.meta.demoDisclaimer
    : `Wired to the canonical ${patient.meta.patientId} L1 bundle (contract ${contractVersion}). Toggle tabs to walk the SL analysis, the falsification arc, and the receipts stack.`;

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

  const hasCrcAnchor = Boolean(patient.anchorPanels?.crc);
  const hasBrmAnchor = Boolean(patient.anchorPanels?.brm);

  // ------ tokens ------
  const shell = isDarkMode ? 'bg-black text-white' : 'bg-white text-zinc-900';
  const topStrip = isDarkMode
    ? 'border-b border-white/10 bg-white/[0.02]'
    : 'border-b border-zinc-200 bg-zinc-50';
  const eyebrow = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const bodySub = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const bodySub2 = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const scrollBtn = isDarkMode
    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
    : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100';
  const activeChip = isDarkMode
    ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100'
    : 'border-indigo-400 bg-indigo-50 text-indigo-800';
  const inactiveChip = isDarkMode
    ? 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:border-white/30'
    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300';
  const activeIcon = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const inactiveIcon = isDarkMode
    ? 'text-white/40 group-hover:text-white/70'
    : 'text-zinc-400 group-hover:text-zinc-600';
  const tabSub = isDarkMode ? 'text-white/50' : 'text-zinc-500';
  const actionBar = isDarkMode
    ? 'border-t border-white/10'
    : 'border-t border-zinc-200';
  const personaLabel = isDarkMode ? 'text-white/40' : 'text-zinc-500';

  return (
    <div className={`min-h-screen ${shell}`}>
      <div className={topStrip}>
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-4 py-6 md:px-8">
          <div className="min-w-0 flex-1">
            <div className={`text-[10px] uppercase tracking-[0.24em] ${eyebrow}`}>
              TUMOR BOARD · {bundleLabel}
            </div>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">{headerTitle}</h1>
            <p className={`mt-1 text-xs uppercase tracking-widest ${bodySub}`}>
              {tumorLabel}
            </p>
            <p className={`mt-2 max-w-2xl text-sm ${bodySub2}`}>{subtitle}</p>
          </div>
          <Link
            href="/tumor-board-scroll"
            className={`rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest ${scrollBtn}`}
          >
            Read as scroll →
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 md:grid md:grid-cols-[240px_1fr] md:px-8">
        {/* Left nav — sticky at md+, stacked scroll at mobile */}
        <nav
          aria-label="Tumor-board sections"
          className="flex flex-row gap-2 overflow-x-auto md:sticky md:top-20 md:flex-col md:space-y-1 md:self-start md:overflow-visible"
        >
          {TABS.map(({ id, label, sub, Icon, count }) => {
            const active = id === tab;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`group flex min-w-[180px] items-start gap-3 rounded border px-3 py-3 text-left transition-colors md:min-w-0 ${
                  active ? activeChip : inactiveChip
                }`}
                tabIndex={0}
              >
                <Icon
                  className={`mt-0.5 h-4 w-4 ${active ? activeIcon : inactiveIcon}`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold uppercase tracking-widest">
                      {label}
                    </div>
                    <span className="font-mono text-[9px] opacity-60">{count}</span>
                  </div>
                  <div className={`mt-0.5 text-[11px] ${tabSub}`}>{sub}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="min-w-0 space-y-4">
          {persona === 'patient' && <PatientTranslator termIds={TAB_TERMS[tab]} />}

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
              {hasBrmAnchor ? <BrmTargetLockPanel /> : null}
            </div>
          )}
          {tab === 'falsification' &&
            (patient.parpFalsification ? (
              <PARPFalsificationArc />
            ) : (
              <NoFalsificationArc
                patientId={patient.meta.patientId}
                isDarkMode={isDarkMode}
              />
            ))}
          {tab === 'confidence' && (
            <div className="space-y-4">
              <EvidenceAnchorTable />
              <RecommendedDrugsPanel />
              <MissingTestsPanel />
              {hasCrcAnchor ? <CrcAnchorEvidencePanel /> : null}
            </div>
          )}
          {tab === 'provenance' && <ProvenanceStack />}

          <div className={`mt-6 flex flex-wrap items-center gap-2 pt-4 ${actionBar}`}>
            <div className={`mr-2 text-[10px] uppercase tracking-widest ${personaLabel}`}>
              Explain to:
            </div>
            {(['oncologist', 'patient', 'pharma'] as Persona[]).map((p) => {
              const active = persona === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersona(p)}
                  className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors ${
                    active ? activeChip : inactiveChip
                  }`}
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

function prettifyCancerType(ct: string): string {
  return ct.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function countReceipts(patient: ReturnType<typeof usePatient>): number {
  let n = 0;
  if (patient.tumorContext.path) n++;
  if (patient.completeness.path) n++;
  if (patient.suggestedTherapy.path) n++;
  n++;
  const crcProv = (patient.anchorPanels?.crc as { provenance?: unknown[] } | undefined)?.provenance;
  if (Array.isArray(crcProv)) n += crcProv.length;
  const brmProv = (patient.anchorPanels?.brm as { provenance?: unknown[] } | undefined)?.provenance;
  if (Array.isArray(brmProv)) n += brmProv.length;
  return n;
}

function NoFalsificationArc({
  patientId,
  isDarkMode,
}: {
  patientId: string;
  isDarkMode: boolean;
}) {
  const wrap = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-zinc-50';
  const label = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const head  = isDarkMode ? 'text-white' : 'text-zinc-900';
  const body  = isDarkMode ? 'text-white/60' : 'text-zinc-600';

  return (
    <div className={`rounded border p-6 ${wrap}`}>
      <p className={`text-xs uppercase tracking-widest ${label}`}>Falsification arc</p>
      <h3 className={`mt-1 text-lg font-semibold ${head}`}>
        {patientId} carries no PARP-falsification arc.
      </h3>
      <p className={`mt-2 text-sm ${body}`}>
        This patient&rsquo;s recommended-drug set does not overlap with the AK-anchored
        PARP falsification story (BRCA1/MBD4-LOF + olaparib + positive control). Nothing
        to falsify here — the tab is intentionally empty rather than fabricating an arc.
      </p>
    </div>
  );
}
