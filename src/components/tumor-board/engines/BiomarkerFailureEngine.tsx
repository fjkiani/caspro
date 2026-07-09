// ============================================================================
// BiomarkerFailureEngine.tsx — substrate-bound biomarker admissibility surface.
//
// Adopts the visual pattern from synthetic_lethality_engine.tsx (three-column:
// vulnerability lattice · evidence heatmap · confound stress-test) but every
// candidate biomarker is illustrative and every admissibility call is a live
// read from EVIDENCE_MODALITIES_7 × EVIDENCE_TIERS_4 via the shared
// EvidenceHeatmap component.
//
// SCRUBS APPLIED:
//  - "SL / synthetic lethality" branding → renamed to "biomarker admissibility
//    + failure prediction" (that is the actual public capability).
//  - Three.js CDN inject → replaced with an r3f lattice via <ThreeSceneMount/>.
//  - Fabricated per-gene vulnerability numerics → REMOVED. Rows now carry
//    substrate metadata only (axes engaged + supporting modality + reachable
//    tier).
//  - "TRL v6.2.9" version stamps → REMOVED.
//
// Wiring source: CAPABILITY_DEPTH_WIRING['biomarker-failure-prediction']:
//   axes:       ddr · her2 · io · rss
//   modalities: clinical · crispr-dependency · in-vivo
//   tiers:      validated · strong · mechanistic
//   guardrails: ranker-version-lock, admissibility-policy, forbidden-string-audit
// ============================================================================

'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  AlertTriangle,
  Beaker,
  Layers,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

import ThreeSceneMount from '../shared/ThreeSceneMount';
import EvidenceHeatmap from '../shared/EvidenceHeatmap';
import LogStream, { LOG_MESSAGES } from '../shared/LogStream';
import {
  getAxis,
  getModality,
  getTier,
  getGuardrail,
} from '@/data/depth-layer';
import { getWiring } from '@/data/capability-depth-wiring';
import { useTheme } from '@/context/ThemeContext';

// -----------------------------------------------------------------------------
// Illustrative candidate biomarkers — substrate-only rows
// -----------------------------------------------------------------------------

interface CandidateBiomarker {
  slug: string;
  displayName: string;
  engagesAxes: string[];
  supportingModalities: string[];
  reachableTier: string;
  failureRisk: 'low' | 'medium' | 'high';
  confound: string; // one-line confound stress test
}

const ILLUSTRATIVE_BIOMARKERS: CandidateBiomarker[] = [
  {
    slug: 'CANDIDATE-A',
    displayName: 'DDR pathway loss',
    engagesAxes: ['ddr', 'rss'],
    supportingModalities: ['clinical', 'crispr-dependency', 'in-vivo'],
    reachableTier: 'validated',
    failureRisk: 'low',
    confound: 'Prior therapy exposure can reverse the deficiency signal — CRISPR-dependency + in-vivo anchor required to hold VALIDATED.',
  },
  {
    slug: 'CANDIDATE-B',
    displayName: 'HER2 low-expression subtype',
    engagesAxes: ['her2', 'io'],
    supportingModalities: ['clinical', 'crispr-dependency'],
    reachableTier: 'strong',
    failureRisk: 'medium',
    confound: 'Cutoff drift between IHC scoring standards demoted historical trials to MECHANISTIC — new admissibility requires re-scoring receipts.',
  },
  {
    slug: 'CANDIDATE-C',
    displayName: 'Replication-stress signature',
    engagesAxes: ['rss', 'ddr'],
    supportingModalities: ['crispr-dependency'],
    reachableTier: 'mechanistic',
    failureRisk: 'medium',
    confound: 'Bulk-expression signature alone is MECHANISTIC — cannot elevate to STRONG without a clinical or in-vivo anchor.',
  },
  {
    slug: 'CANDIDATE-D',
    displayName: 'IO checkpoint receptivity',
    engagesAxes: ['io'],
    supportingModalities: ['clinical'],
    reachableTier: 'mechanistic',
    failureRisk: 'high',
    confound: 'Single-modality clinical association without in-vivo confirmation flags this candidate as INSUFFICIENT under admissibility policy — flagged for curator sign.',
  },
];

// -----------------------------------------------------------------------------
// r3f lattice background — a rotating wireframe cube grid
// -----------------------------------------------------------------------------

function VulnerabilityLattice() {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.06;
  });

  const nodes: [number, number, number][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        nodes.push([x * 1.2, y * 1.2, z * 1.2]);
      }
    }
  }
  return (
    <group ref={groupRef as any}>
      {nodes.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={0x22d3ee} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function BiomarkerFailureEngine() {
  const { isDarkMode } = useTheme();
  const wiring = getWiring('biomarker-failure-prediction');
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ILLUSTRATIVE_BIOMARKERS[activeIdx];

  const activeAxes = active.engagesAxes.map(getAxis).filter(Boolean);
  const activeModalities = active.supportingModalities.map(getModality).filter(Boolean);
  const reachableTier = getTier(active.reachableTier);

  const riskColor = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  }[active.failureRisk];

  return (
    <div className={`relative w-full min-h-[720px] font-mono p-8 rounded border overflow-hidden ${isDarkMode ? 'bg-[#020408] text-zinc-400 border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200 shadow-sm'}`}>
      {/* r3f lattice background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <ThreeSceneMount cameraPosition={[0, 0, 5]}>
          <ambientLight intensity={0.4} />
          <VulnerabilityLattice />
        </ThreeSceneMount>
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* header */}
      <div className={`relative z-10 flex items-center justify-between border-b pb-6 mb-8 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded border flex items-center justify-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
            <Beaker className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Biomarker admissibility engine</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                Tier hierarchy locked
              </span>
              <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {wiring?.substrateModalities.length ?? 0} modalities × {wiring?.substrateTiers.length ?? 0} candidate tiers
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/governance/#forbidden-string-audit"
          className="px-6 py-3 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 hover:bg-zinc-800 flex items-center gap-3"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Governance
        </Link>
      </div>

      {/* substrate sentence */}
      <div className="relative z-10 mb-8 p-5 rounded border border-zinc-800 bg-zinc-950/40">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Headline substrate</div>
        <div className="text-[13px] leading-relaxed text-zinc-200">{wiring?.headlineSubstrateSentence}</div>
      </div>

      {/* main workspace */}
      <div className="relative z-10 grid grid-cols-12 gap-8">
        {/* left — candidates + confound */}
        <section className="col-span-4 flex flex-col gap-6 min-h-[600px]">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 flex-1">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Candidate biomarkers</span>
            </div>
            <div className="space-y-2">
              {ILLUSTRATIVE_BIOMARKERS.map((b, i) => (
                <button
                  key={b.slug}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full p-3 border rounded-sm text-left transition-all ${
                    i === activeIdx
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-xl'
                      : 'bg-black/40 border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black tracking-widest ${i === activeIdx ? 'text-cyan-400' : 'text-white'}`}>
                      {b.slug}
                    </span>
                    <span
                      className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm border ${
                        b.failureRisk === 'low'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : b.failureRisk === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {b.failureRisk} risk
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-zinc-400">{b.displayName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* confound stress test */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Confound stress test</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] leading-relaxed text-zinc-300"
              >
                {active.confound}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* center — evidence heatmap (shared) + active detail */}
        <section className="col-span-5 flex flex-col gap-6 min-h-[600px]">
          <EvidenceHeatmap isDarkMode={isDarkMode} />

          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {active.slug} · admissibility
              </span>
              <span className={`ml-auto text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm border ${riskColor}`}>
                {active.failureRisk} failure risk
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-3 gap-3"
              >
                <div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Axes</div>
                  <div className="flex flex-col gap-1">
                    {activeAxes.map((a) => (
                      <span
                        key={a!.axis}
                        className="px-2 py-1 rounded-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[9px] font-black uppercase tracking-widest text-center"
                      >
                        {a!.axis}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Modalities</div>
                  <div className="flex flex-col gap-1">
                    {activeModalities.map((m) => (
                      <span
                        key={m!.modality}
                        className="px-2 py-1 rounded-sm bg-zinc-900 text-zinc-300 border border-zinc-800 text-[8px] font-black uppercase tracking-widest text-center"
                      >
                        {m!.name.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Reachable</div>
                  <div
                    className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest text-center border ${
                      active.reachableTier === 'validated'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : active.reachableTier === 'strong'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {reachableTier?.name}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* right — log stream + guardrails */}
        <aside className="col-span-3 flex flex-col gap-6 min-h-[600px]">
          <div className="flex-1 min-h-[300px]">
            <LogStream messages={LOG_MESSAGES.biomarker} intervalMs={950} isDarkMode={isDarkMode} />
          </div>

          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Guardrails</span>
            </div>
            <div className="text-[10px] leading-relaxed text-zinc-400 mb-3">{wiring?.headlineGovernanceSentence}</div>
            <div className="flex flex-col gap-2">
              {(wiring?.governanceGuardrails ?? []).map((slug) => {
                const g = getGuardrail(slug);
                return (
                  <Link
                    key={slug}
                    href={`/governance/#${slug}`}
                    className="px-3 py-2 rounded-sm border border-zinc-800 bg-zinc-950 text-[9px] font-black uppercase tracking-widest text-emerald-400 hover:bg-zinc-900"
                  >
                    {g?.name ?? slug}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
