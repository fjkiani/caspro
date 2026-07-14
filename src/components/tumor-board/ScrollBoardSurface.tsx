'use client';

// ==============================================================================
// /tumor-board-scroll — single continuous L1 narrative · PATIENT-DRIVEN.
//
// The 9 sub-components (AKBundleHeader, AKMutationPanel, …) already consume
// usePatient() internally. Their filenames still carry the "AK" prefix for
// git-diff reasons, but they render whatever bundle sits in PatientContext.
//
// Theme-aware (dark: black + cyan; light: white + indigo). Mobile-safe
// (px-4 md:px-8, header wraps).
// ==============================================================================

import Link from 'next/link';
import { useOptionalPatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';
import { AK01 } from '@/data/patients/AK01';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';
import { getCapabilities } from '@/lib/capabilities';
import { productFor } from '@/lib/product-glossary';

import AKBundleHeader from './ak/AKBundleHeader';
import DiscoveryOnlyBanner from './ak/DiscoveryOnlyBanner';
import AKMutationPanel from './ak/AKMutationPanel';
import SLPathwayGrid from './ak/SLPathwayGrid';
import SLMatrixTable from './ak/SLMatrixTable';
import PARPFalsificationArc from './ak/PARPFalsificationArc';
import EvidenceAnchorTable from './ak/EvidenceAnchorTable';
import RecommendedDrugsPanel from './ak/RecommendedDrugsPanel';
import MissingTestsPanel from './ak/MissingTestsPanel';
import ProvenanceStack from './ak/ProvenanceStack';

export default function ScrollBoardSurface() {
  const patientCtx = useOptionalPatient();
  const { isDarkMode } = useTheme();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  const shell = isDarkMode ? 'bg-black text-white' : 'bg-white text-zinc-900';
  const topStrip = isDarkMode
    ? 'border-b border-white/10 bg-white/[0.02]'
    : 'border-b border-zinc-200 bg-zinc-50';
  const eyebrow = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const sub    = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const btn    = isDarkMode
    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
    : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100';
  const footer = isDarkMode
    ? 'border-t border-white/10 bg-white/[0.02] text-white/40'
    : 'border-t border-zinc-200 bg-zinc-50 text-zinc-500';
  const footerMono = isDarkMode ? 'text-white/60' : 'text-zinc-700';

  return (
    <div className={`min-h-screen ${shell}`}>
      <div className={topStrip}>
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-4 py-6 md:px-8">
          <div className="min-w-0 flex-1">
            <div className={`text-[10px] uppercase tracking-[0.24em] ${eyebrow}`}>
              TUMOR BOARD · SCROLL VIEW
            </div>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
              {patient.meta.patientId} · walk the case top-to-bottom
            </h1>
            <p className={`mt-2 max-w-2xl text-sm ${sub}`}>
              Continuous read of the {patient.meta.patientId} L1 bundle
              {patient.tumorContext?.subtype ? ` (${patient.tumorContext.subtype})` : ''}.
              Same substrate as the tabbed view, no rail — for reviewers who want the story
              linearly.
            </p>
          </div>
          <Link
            href={`/tumor-board/${patient.meta.patientId}`}
            className={`rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest ${btn}`}
          >
            ← switch to tabs
          </Link>
        </div>
      </div>

      {caps.isDiscoveryOnly && <DiscoveryOnlyBanner />}

      <AKBundleHeader />
      <AKMutationPanel />
      <SLPathwayGrid />
      <SLMatrixTable />

      {caps.hasParpFalsification && <PARPFalsificationArc />}

      <RecommendedDrugsPanel />
      <EvidenceAnchorTable />
      <MissingTestsPanel />
      <ProvenanceStack />

      <footer className={footer}>
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 text-[11px] md:px-8">
          Continuous scroll · contract {patient.meta.contractVersion ?? 'v?'} ·{' '}
          {productFor('provenance').toLowerCase()} attached · rendered from patient bundle{' '}
          <span className={`font-mono ${footerMono}`}>{patient.meta.patientId}</span>
        </div>
      </footer>
    </div>
  );
}
