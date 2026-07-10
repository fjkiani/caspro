'use client';

import { useState } from 'react';
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
 * /tumor-board — 5-tab summary surface.
 * Every tab is directly wired to the AK L1 bundle (contract v2.0). No
 * placeholder tokens, no log rail.
 */
type TabId = 'patient' | 'sl-axes' | 'falsification' | 'confidence' | 'provenance';

const TABS: { id: TabId; label: string; sub: string }[] = [
  { id: 'patient', label: 'PATIENT', sub: 'AK bundle + variants' },
  { id: 'sl-axes', label: 'SL AXES', sub: 'Pathways + 6-axis matrix' },
  { id: 'falsification', label: 'FALSIFICATION', sub: 'PARP arc + PR#11' },
  { id: 'confidence', label: 'CONFIDENCE', sub: 'Anchors + drugs + gaps' },
  { id: 'provenance', label: 'PROVENANCE', sub: 'Receipts stack' },
];

export default function TumorBoardSurface() {
  const [tab, setTab] = useState<TabId>('patient');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-8 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">TUMOR BOARD · AK BUNDLE</div>
            <h1 className="mt-1 text-3xl font-semibold">Patient AK · MBD4 / PDGFRA / TP53</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Wired to the canonical AK L1 bundle (contract v2.0). Toggle tabs to walk the SL analysis, the PARP
              falsification arc, and the receipts stack.
            </p>
          </div>
          <Link
            href="/tumor-board-scroll"
            className="rounded border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20"
          >
            Read as scroll →
          </Link>
        </div>

        <nav className="mx-auto flex w-full max-w-[1400px] flex-wrap gap-1 px-8 pb-3">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-t border-b-2 px-3 py-2 text-left ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/[0.06] text-white'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest">{t.label}</div>
                <div className="mt-0.5 text-[11px] text-white/40">{t.sub}</div>
              </button>
            );
          })}
        </nav>
      </div>

      {tab === 'patient' && (
        <>
          <AKBundleHeader />
          <AKMutationPanel />
        </>
      )}
      {tab === 'sl-axes' && (
        <>
          <SLPathwayGrid />
          <SLMatrixTable />
        </>
      )}
      {tab === 'falsification' && <PARPFalsificationArc />}
      {tab === 'confidence' && (
        <>
          <RecommendedDrugsPanel />
          <EvidenceAnchorTable />
          <MissingTestsPanel />
        </>
      )}
      {tab === 'provenance' && <ProvenanceStack />}

      <footer className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-[1400px] px-8 py-6 text-[11px] text-white/40">
          Bundle-only view · contract v2.0 · rendered from{' '}
          <span className="font-mono text-white/60">src/data/tumor-board/ak-l1-bundle.ts</span>
        </div>
      </footer>
    </div>
  );
}
