'use client';

// ==============================================================================
// /tumor-board-scroll — single continuous L1 narrative · PATIENT-DRIVEN.
//
// The 9 sub-components (AKBundleHeader, AKMutationPanel, …) already consume
// usePatient() internally. Their filenames still carry the "AK" prefix for
// git-diff reasons, but they render whatever bundle sits in PatientContext.
// This surface (a) reads the same bundle via useOptionalPatient(), (b) shows
// a patient-identity header instead of hardcoded "AK", (c) gates the PARP arc
// on caps.hasParpFalsification, and (d) surfaces the discovery-only banner
// where applicable.
// ==============================================================================

import Link from 'next/link';
import { useOptionalPatient } from '@/context/PatientContext';
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

/**
 * Continuous linear read of the L1 bundle for the active patient.
 * Sequence (each block gated by capability if optional):
 *   0) Header strip     — patient id + tumor context + link to tabs view
 *   1) Bundle header    — identity + completeness (always present)
 *   2) Discovery banner — shown only if patient is discovery-only
 *   3) Mutations        — Evo2 receipts (always present)
 *   4) Pathway grid     — broken × essential (always present)
 *   5) SL matrix        — patient axes (always present)
 *   6) PARP arc         — gated on caps.hasParpFalsification
 *   7) Drugs            — ranked recommendedDrugs (always present)
 *   8) Anchors          — evidence receipts (always present)
 *   9) Missing tests    — completeness ceiling (always present)
 *  10) Provenance       — receipts stack (always present)
 */
export default function ScrollBoardSurface() {
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-8 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
              TUMOR BOARD · SCROLL VIEW
            </div>
            <h1 className="mt-1 text-3xl font-semibold">
              {patient.meta.patientId} · walk the case top-to-bottom
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Continuous read of the {patient.meta.patientId} L1 bundle
              {patient.tumorContext?.subtype ? ` (${patient.tumorContext.subtype})` : ''}. Same
              substrate as the tabbed view, no rail — for reviewers who want the story linearly.
            </p>
          </div>
          <Link
            href={`/tumor-board/${patient.meta.patientId}`}
            className="rounded border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20"
          >
            ← switch to tabs
          </Link>
        </div>
      </div>

      {/* Discovery-only banner appears only for CRC01 / BM01 currently. */}
      {caps.isDiscoveryOnly && <DiscoveryOnlyBanner />}

      <AKBundleHeader />
      <AKMutationPanel />
      <SLPathwayGrid />
      <SLMatrixTable />

      {/* PARP falsification arc — gated on caps.hasParpFalsification so
          non-AK01 patients don't crash on patient.parpFalsification. */}
      {caps.hasParpFalsification && <PARPFalsificationArc />}

      <RecommendedDrugsPanel />
      <EvidenceAnchorTable />
      <MissingTestsPanel />
      <ProvenanceStack />

      <footer className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-[1400px] px-8 py-6 text-[11px] text-white/40">
          Continuous scroll · contract {patient.meta.contractVersion ?? 'v?'} ·{' '}
          {productFor('provenance').toLowerCase()} attached · rendered from patient bundle{' '}
          <span className="font-mono text-white/60">{patient.meta.patientId}</span>
        </div>
      </footer>
    </div>
  );
}
