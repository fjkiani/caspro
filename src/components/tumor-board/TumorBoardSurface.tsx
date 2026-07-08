'use client';

// ============================================================================
// TumorBoardSurface.tsx — dedicated /tumor-board/ surface.
//
// Design: single-viewport tab strip across the 5 capabilities. Each tab
// mounts one engine component from ../engines/. Tab labels come from
// CAPABILITY_REGISTRY.name (canonical), and the tab strip is the
// no-scroll marker the site linter recognises.
//
// Positioning: this is where an oncologist can walk through the tumor board.
// Each engine explains one capability of CrisPRO — how a candidate is scored,
// how assets compare, why a biomarker call is admissible, who is in the
// addressable population, and why two trials diverged.
//
// No numeric readouts other than substrate cardinality. Every engine links
// out to /governance/#slug for the guardrails that back it.
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Focus,
  Boxes,
  Beaker,
  Users,
  GitBranch,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { CAPABILITY_REGISTRY } from '@/data/capability-registry';
import { CAPABILITY_DEPTH_WIRING } from '@/data/capability-depth-wiring';

import GateTierEngine from './engines/GateTierEngine';
import MultiAssetEngine from './engines/MultiAssetEngine';
import BiomarkerFailureEngine from './engines/BiomarkerFailureEngine';
import PopulationFunnelEngine from './engines/PopulationFunnelEngine';
import MechanismDivergenceEngine from './engines/MechanismDivergenceEngine';

// no-scroll linter marker (required)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type EngineSlug =
  | 'gate-tier-scoring'
  | 'multi-asset-scoring'
  | 'biomarker-failure-prediction'
  | 'population-funnel'
  | 'mechanism-divergence';

const ENGINE_MAP: Record<EngineSlug, { icon: typeof Focus; Component: () => JSX.Element }> = {
  'gate-tier-scoring': { icon: Focus, Component: GateTierEngine },
  'multi-asset-scoring': { icon: Boxes, Component: MultiAssetEngine },
  'biomarker-failure-prediction': { icon: Beaker, Component: BiomarkerFailureEngine },
  'population-funnel': { icon: Users, Component: PopulationFunnelEngine },
  'mechanism-divergence': { icon: GitBranch, Component: MechanismDivergenceEngine },
};

export default function TumorBoardSurface() {
  const [active, setActive] = useState<EngineSlug>('gate-tier-scoring');
  const activeCap = CAPABILITY_REGISTRY.find((c) => c.slug === active);
  const activeWiring = CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === active);
  const ActiveComponent = ENGINE_MAP[active].Component;

  return (
    <div className="min-h-screen bg-[#020408] text-zinc-400 font-mono">
      {/* header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-cyan-400 transition-colors">
                CrisPRO
              </span>
            </Link>
            <span className="h-6 w-px bg-zinc-800" />
            <div>
              <div className="text-lg font-black tracking-[0.3em] uppercase text-white">Tumor board</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-0.5">
                Every capability live · substrate-bound · governance-linked
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/governance/"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              Governance
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/tumor-board-scroll/"
              className="px-4 py-2 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-zinc-800 transition-colors"
            >
              Scroll view
            </Link>
          </div>
        </div>
      </header>

      {/* tab strip */}
      <SurfaceTabs>
        <div className="border-b border-white/5 bg-black/20">
          <div className="max-w-[1600px] mx-auto px-8 flex overflow-x-auto scrollbar-hide">
            {(Object.keys(ENGINE_MAP) as EngineSlug[]).map((slug) => {
              const cap = CAPABILITY_REGISTRY.find((c) => c.slug === slug);
              const Icon = ENGINE_MAP[slug].icon;
              const isActive = slug === active;
              return (
                <button
                  key={slug}
                  onClick={() => setActive(slug)}
                  className={`relative flex items-center gap-3 px-5 py-4 border-r border-white/5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/5 text-cyan-400'
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {cap?.name ?? slug}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SurfaceTabs>

      {/* one-liner strip */}
      {activeCap && (
        <div className="border-b border-white/5 bg-zinc-950/40">
          <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between gap-6">
            <div className="text-[12px] leading-relaxed text-zinc-300 max-w-3xl">
              <span className="text-cyan-400 font-black uppercase tracking-widest mr-3">
                {activeCap.name}
              </span>
              {activeCap.oneLiner}
            </div>
            <Link
              href={`/engine/#${active}`}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2 flex-shrink-0"
            >
              Capability page
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* active engine */}
      <main className="max-w-[1600px] mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* footer */}
      <footer className="border-t border-white/5 bg-black/40 mt-8">
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-zinc-600">
          <span>
            {activeWiring
              ? `Wiring · ${activeWiring.substrateAxes.length} axes · ${activeWiring.substrateModalities.length} modalities · ${activeWiring.governanceGuardrails.length} guardrails`
              : 'CrisPRO tumor board'}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/ledger/" className="hover:text-cyan-400 transition-colors">Ledger</Link>
            <span className="h-3 w-px bg-zinc-800" />
            <Link href="/kb/" className="hover:text-cyan-400 transition-colors">Knowledge base</Link>
            <span className="h-3 w-px bg-zinc-800" />
            <Link href="/research/" className="hover:text-cyan-400 transition-colors">Research chapters</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
