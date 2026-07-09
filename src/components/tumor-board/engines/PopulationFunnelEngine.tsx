// ============================================================================
// PopulationFunnelEngine.tsx — substrate-bound addressable-population funnel.
//
// Adopts the visual pattern from layer_3_safety_dosing.tsx (funnel + radar +
// log stream) but every funnel stage is derived from
// CAPABILITY_DEPTH_WIRING['population-funnel'] and the radar is the shared
// <MechanismFitRadar/> component.
//
// SCRUBS APPLIED:
//  - Fabricated safety numerics (specific mg/kg, DLT thresholds) → REMOVED.
//    Funnel now shows substrate-driven stage descriptors only.
//  - Three.js CDN inject → replaced with r3f pyramid via <ThreeSceneMount/>.
//  - Version stamps → REMOVED.
//
// Wiring source: CAPABILITY_DEPTH_WIRING['population-funnel']:
//   axes:       vegf · efflux · io
//   modalities: clinical · expression-association
//   tiers:      strong · mechanistic
//   guardrails: ranker-version-lock, admissibility-policy, reproducibility-lock
// ============================================================================

'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  Filter,
  Layers,
  ShieldCheck,
  TrendingDown,
  Users,
} from 'lucide-react';

import ThreeSceneMount from '../shared/ThreeSceneMount';
import MechanismFitRadar from '../shared/MechanismFitRadar';
import LogStream, { LOG_MESSAGES } from '../shared/LogStream';
import { getGuardrail } from '@/data/depth-layer';
import { getWiring } from '@/data/capability-depth-wiring';
import { useTheme } from '@/context/ThemeContext';

// -----------------------------------------------------------------------------
// Funnel stages — substrate-driven, no fabricated headcounts
// -----------------------------------------------------------------------------

interface FunnelStage {
  slug: string;
  name: string;
  descriptor: string;
  widthPct: number;   // visual width only, illustrative
  kind: 'disease' | 'axis' | 'modality' | 'tier' | 'enrolment';
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    slug: 'disease-wide',
    name: 'Disease-wide pool',
    descriptor: 'All patients in the indication before mechanism filtering.',
    widthPct: 100,
    kind: 'disease',
  },
  {
    slug: 'axis-eligible',
    name: 'Axis-aligned pool',
    descriptor: 'Patients whose biology engages the axes that drive this therapy — narrows the pool to a mechanism-relevant subset.',
    widthPct: 68,
    kind: 'axis',
  },
  {
    slug: 'modality-anchored',
    name: 'Modality-anchored pool',
    descriptor: 'Axis-aligned patients where at least one admissible modality provides an evidence anchor for the specific therapy.',
    widthPct: 42,
    kind: 'modality',
  },
  {
    slug: 'tier-cleared',
    name: 'Tier-cleared pool',
    descriptor: 'Modality-anchored patients where the evidence anchor clears the required tier (STRONG or MECHANISTIC for this capability).',
    widthPct: 24,
    kind: 'tier',
  },
  {
    slug: 'enrolment-target',
    name: 'Enrolment target',
    descriptor: 'Mechanism-aligned subgroup the trial can actually run against — the funnel does not narrow past reproducible clinical anchors.',
    widthPct: 12,
    kind: 'enrolment',
  },
];

// -----------------------------------------------------------------------------
// r3f pyramid background
// -----------------------------------------------------------------------------

function Pyramid() {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.15;
  });
  return (
    <group ref={groupRef as any}>
      <mesh position={[0, 0, 0] as any}>
        <coneGeometry args={[1.6, 2.4, 4]} />
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function PopulationFunnelEngine() {
  const { isDarkMode } = useTheme();
  const wiring = getWiring('population-funnel');
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FUNNEL_STAGES[activeIdx];

  return (
    <div className={`relative w-full min-h-[720px] font-mono p-8 rounded border overflow-hidden ${isDarkMode ? 'bg-[#020408] text-zinc-400 border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200 shadow-sm'}`}>
      {/* r3f pyramid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <ThreeSceneMount camera={{ position: [0, 0, 4], fov: 40, near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.4} />
          <Pyramid />
        </ThreeSceneMount>
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* header */}
      <div className={`relative z-10 flex items-center justify-between border-b pb-6 mb-8 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded border flex items-center justify-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
            <Users className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Population funnel engine</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                Source-receipted
              </span>
              <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {wiring?.substrateAxes.length ?? 0} therapy-driving axes · {wiring?.substrateModalities.length ?? 0} evidence modalities
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/governance/#reproducibility-lock"
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
        {/* left — funnel */}
        <section className="col-span-4 flex flex-col gap-6 min-h-[600px]">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 flex-1">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Funnel stages</span>
            </div>
            <div className="space-y-2">
              {FUNNEL_STAGES.map((s, i) => (
                <button
                  key={s.slug}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full p-3 border rounded-sm text-left transition-all ${
                    i === activeIdx
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-xl'
                      : 'bg-black/40 border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black tracking-widest ${i === activeIdx ? 'text-cyan-400' : 'text-white'}`}>
                      {String(i + 1).padStart(2, '0')} · {s.name}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">
                      {s.kind.toUpperCase()}
                    </span>
                  </div>
                  <div className={`h-1.5 rounded-full ${i === activeIdx ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : 'bg-zinc-800'}`} style={{ width: `${s.widthPct}%` }} />
                </button>
              ))}
            </div>
          </div>

          {/* active stage detail */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <TrendingDown className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {active.name}
              </span>
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
                {active.descriptor}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* center — mechanism-fit radar (shared) */}
        <section className="col-span-5 min-h-[600px]">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 h-full">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Axis-alignment probe</span>
              <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-zinc-500">
                Substrate radar
              </span>
            </div>
            <MechanismFitRadar isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* right — log stream + guardrails */}
        <aside className="col-span-3 flex flex-col gap-6 min-h-[600px]">
          <div className="flex-1 min-h-[300px]">
            <LogStream messages={LOG_MESSAGES.population} intervalMs={950} isDarkMode={isDarkMode} />
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
