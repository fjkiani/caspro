'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Layers, XCircle, ShieldCheck, ScrollText, ArrowRight,
} from 'lucide-react';
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
import PatientTranslator from './PatientTranslator';

/**
 * /tumor-board — 5-tab summary surface with persona action bar.
 * Left nav = icon+badge sticky rail. Right = active tab. Bottom = persona CTAs.
 */
type TabId = 'patient' | 'sl-axes' | 'falsification' | 'confidence' | 'provenance';

const TABS: { id: TabId; label: string; sub: string; Icon: typeof User; count?: string }[] = [
  { id: 'patient',        label: 'PATIENT',        sub: 'AK bundle + variants',      Icon: User,       count: '2 var' },
  { id: 'sl-axes',        label: 'SL AXES',        sub: 'Pathways + 6-axis matrix',  Icon: Layers,     count: '6 ax' },
  { id: 'falsification',  label: 'FALSIFICATION',  sub: 'PARP arc + PR#11',          Icon: XCircle,    count: '1 arc' },
  { id: 'confidence',     label: 'CONFIDENCE',     sub: 'Anchors + drugs + gaps',    Icon: ShieldCheck,count: '8 anc' },
  { id: 'provenance',     label: 'PROVENANCE',     sub: 'Receipts stack',            Icon: ScrollText, count: '4 rcpt' },
];

// Terms that show up per tab — for the patient translator strip
const TAB_TERMS: Record<TabId, string[]> = {
  'patient':       ['mbd4_lof', 'target_lock'],
  'sl-axes':       ['sl_axis', 'mechanism_fit', 'ln_ic50', 'cohens_d', 'atr_axis'],
  'falsification': ['parp_falsified', 'p_value', 'cohens_d'],
  'confidence':    ['target_lock', 'p_value', 'cohens_d'],
  'provenance':    [],
};

export default function TumorBoardSurface() {
  const [tab, setTab] = useState<TabId>('patient');
  const { persona, setPersona } = usePersona();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-baseline justify-between gap-3 px-8 py-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">TUMOR BOARD · AK BUNDLE</div>
            <h1 className="mt-1 text-3xl font-semibold">Patient AK · MBD4 / PDGFRA / TP53</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Wired to the canonical AK L1 bundle (contract v2.0). Toggle tabs to walk the SL analysis,
              the PARP falsification arc, and the receipts stack.
            </p>
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
                    {count && <span className="text-[9px] font-mono opacity-60">{count}</span>}
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
            </div>
          )}
          {tab === 'falsification' && <PARPFalsificationArc />}
          {tab === 'confidence' && (
            <div className="space-y-4">
              <EvidenceAnchorTable />
              <RecommendedDrugsPanel />
              <MissingTestsPanel />
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
