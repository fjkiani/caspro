'use client';

import Link from 'next/link';
import AKBundleHeader from './ak/AKBundleHeader';
import AKMutationPanel from './ak/AKMutationPanel';
import SLPathwayGrid from './ak/SLPathwayGrid';
import SLMatrixTable from './ak/SLMatrixTable';
import PARPFalsificationArc from './ak/PARPFalsificationArc';
import EvidenceAnchorTable from './ak/EvidenceAnchorTable';
import RecommendedDrugsPanel from './ak/RecommendedDrugsPanel';
import MissingTestsPanel from './ak/MissingTestsPanel';
import ProvenanceStack from './ak/ProvenanceStack';

/**
 * /tumor-board-scroll — single continuous narrative.
 * Sequence:
 *   1) Header       — who + completeness
 *   2) Mutations    — Evo2 receipts
 *   3) Pathway grid — broken × essential
 *   4) SL matrix    — 6 axes with the intentional atr_wee1 upgrade
 *   5) PARP arc     — the memorable centerpiece
 *   6) Drugs        — 5 ranked, Rucaparib flagged
 *   7) Anchors      — 6 numeric receipts
 *   8) Missing tests — completeness ceiling
 *   9) Provenance   — receipts stack
 */
export default function ScrollBoardSurface() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-8 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">TUMOR BOARD · SCROLL VIEW</div>
            <h1 className="mt-1 text-3xl font-semibold">
              AK · walk the case top-to-bottom
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Continuous read of the AK L1 bundle. Same substrate, no tabs, no rail — for reviewers who want the story
              linearly.
            </p>
          </div>
          <Link
            href="/tumor-board"
            className="rounded border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20"
          >
            ← switch to tabs
          </Link>
        </div>
      </div>

      <AKBundleHeader />
      <AKMutationPanel />
      <SLPathwayGrid />
      <SLMatrixTable />
      <PARPFalsificationArc />
      <RecommendedDrugsPanel />
      <EvidenceAnchorTable />
      <MissingTestsPanel />
      <ProvenanceStack />

      <footer className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-[1400px] px-8 py-6 text-[11px] text-white/40">
          Continuous scroll · contract v2.0 · rendered from{' '}
          <span className="font-mono text-white/60">src/data/tumor-board/ak-l1-bundle.ts</span>
        </div>
      </footer>
    </div>
  );
}
