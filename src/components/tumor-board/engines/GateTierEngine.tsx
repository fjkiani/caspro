// ============================================================================
// GateTierEngine.tsx — substrate-bound gate-tier admissibility cascade.
//
// Adopts the visual pattern from target_lock_engine.tsx and
// layer_1_target_identification.tsx (three-column: cascade steps · target
// viewer · verdict / log stream) but every step, every axis, every modality,
// and every tier is a live read from depth-layer.ts + capability-depth-wiring.
//
// Scrubs applied to source components:
//  - "Metastatic cascade" → "Gate-tier admissibility cascade" (real substrate,
//    not a placeholder metastasis story)
//  - Fabricated per-step vulnerability numerics (0.942, 0.887, …) → REMOVED.
//    Each step now emits either a substrate label or a tier verdict, not a
//    fabricated confidence score.
//  - v6.2.9 / v6.2.1 model version stamps → REMOVED (ranker-version-lock guardrail is the
//    real disclosure — governance page owns it).
//  - Three.js CDN <script> injection → replaced with react-three-fiber Canvas
//    via <ThreeSceneMount/>. SSR-safe.
//  - COORD [X42_Y89_Z12] fake telemetry → REMOVED.
//  - Confidence: 0.992 badge → replaced with a substrate-count summary.
//
// The engine wires to CAPABILITY_DEPTH_WIRING['gate-tier-scoring']:
//   axes:       ddr · mapk · pi3k · io · efflux
//   modalities: crispr-dependency · clinical · expression-association
//   tiers:      strong · mechanistic
//   guardrails: ranker-version-lock, ranker-variant-prohibition,
//               admissibility-policy, reproducibility-lock
// ============================================================================

'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  ChevronRight,
  Crosshair,
  Focus,
  Layers,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

import ThreeSceneMount from '../shared/ThreeSceneMount';
import LogStream, { LOG_MESSAGES } from '../shared/LogStream';
import {
  PATIENT_VECTOR_AXES,
  EVIDENCE_MODALITIES_7,
  EVIDENCE_TIERS_4,
  GOVERNANCE_GUARDRAILS,
  getAxis,
  getModality,
  getTier,
  getGuardrail,
} from '@/data/depth-layer';
import { getWiring } from '@/data/capability-depth-wiring';
import { useTheme } from '@/context/ThemeContext';

// -----------------------------------------------------------------------------
// Cascade steps — derived from substrate, not fabricated
// -----------------------------------------------------------------------------

interface GateStep {
  step: number;
  label: string;            // shown in the cascade rail
  kind: 'axis' | 'modality' | 'tier' | 'ranker' | 'receipt';
  slug: string;             // maps to depth-layer entity when kind is axis/modality/tier/guardrail
  descriptor: string;       // one-liner shown in the detail panel
  emits: string;            // verdict text emitted when this step "locks"
}

function buildCascade(): GateStep[] {
  const wiring = getWiring('gate-tier-scoring');
  if (!wiring) {
    // Should never happen — capability_depth_lint guards this.
    return [];
  }

  const axisSteps: GateStep[] = wiring.substrateAxes.map((axisSlug, i) => {
    const a = getAxis(axisSlug);
    return {
      step: i + 1,
      label: `AXIS · ${axisSlug.toUpperCase()}`,
      kind: 'axis',
      slug: axisSlug,
      descriptor: a?.oneLiner ?? '',
      emits: `AXIS ${axisSlug.toUpperCase()} BOUND`,
    };
  });

  const modalitySteps: GateStep[] = wiring.substrateModalities.map((modSlug, i) => {
    const m = getModality(modSlug);
    return {
      step: axisSteps.length + i + 1,
      label: `MODALITY · ${modSlug.toUpperCase().replace('-', ' ')}`,
      kind: 'modality',
      slug: modSlug,
      descriptor: m?.whatItMeasures ?? '',
      emits: `MODALITY ${modSlug.toUpperCase()} INTAKE COMPLETE`,
    };
  });

  const total = axisSteps.length + modalitySteps.length;

  const tail: GateStep[] = [
    {
      step: total + 1,
      label: 'TIER · CANDIDATE ASSIGN',
      kind: 'tier',
      slug: 'strong',
      descriptor: getTier('strong')?.entryCriteria ?? '',
      emits: 'CANDIDATE TIER: STRONG (PROVISIONAL)',
    },
    {
      step: total + 2,
      label: 'RANKER V-LOCK',
      kind: 'ranker',
      slug: 'ranker-version-lock',
      descriptor: getGuardrail('ranker-version-lock')?.whatItLocks ?? '',
      emits: 'RANKER VERSION LOCK CONFIRMED',
    },
    {
      step: total + 3,
      label: 'RECEIPT · LEDGER',
      kind: 'receipt',
      slug: 'reproducibility-lock',
      descriptor: getGuardrail('reproducibility-lock')?.whatItLocks ?? '',
      emits: 'RECEIPT WRITTEN TO LEDGER',
    },
  ];

  return [...axisSteps, ...modalitySteps, ...tail];
}

// -----------------------------------------------------------------------------
// Protein blob — r3f wireframe icosahedron cluster
// -----------------------------------------------------------------------------

function ProteinBlob({ isLocking }: { isLocking: boolean }) {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += isLocking ? dt * 1.6 : dt * 0.15;
    groupRef.current.rotation.x += isLocking ? dt * 0.8 : dt * 0.06;
  });

  const lobes: { pos: [number, number, number]; r: number }[] = [
    { pos: [0, 0, 0], r: 1.0 },
    { pos: [0.6, 0.4, -0.4], r: 0.6 },
    { pos: [-0.6, -0.3, 0.3], r: 0.8 },
    { pos: [0.2, -0.5, -0.2], r: 0.5 },
  ];

  return (
    <group ref={groupRef as any}>
      {lobes.map((l, i) => (
        <mesh key={i} position={l.pos as any}>
          <icosahedronGeometry args={[l.r, 2]} />
          <meshBasicMaterial
            color={isLocking ? 0xf43f5e : 0x22d3ee}
            wireframe
            transparent
            opacity={isLocking ? 0.6 : 0.2}
          />
        </mesh>
      ))}
      <mesh position={[0.4, 0.2, -0.2] as any}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color={0xf43f5e} transparent opacity={isLocking ? 1 : 0.5} />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function GateTierEngine() {
  const { isDarkMode } = useTheme();
  const cascade = useMemo(buildCascade, []);
  const wiring = getWiring('gate-tier-scoring');

  const [activeIdx, setActiveIdx] = useState(0);
  const [isLocking, setIsLocking] = useState(false);

  const active = cascade[activeIdx];

  useEffect(() => {
    if (!active) return;
    setIsLocking(true);
    const t = setTimeout(() => setIsLocking(false), 900);
    return () => clearTimeout(t);
  }, [activeIdx, active]);

  const guardrails = wiring?.governanceGuardrails ?? [];
  const tiers = wiring?.substrateTiers ?? [];

  return (
    <div className={`relative w-full min-h-[720px] font-mono p-8 rounded border overflow-hidden ${isDarkMode ? 'bg-[#020408] text-zinc-400 border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200 shadow-sm'}`}>
      {/* grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* header */}
      <div className={`relative z-10 flex items-center justify-between border-b pb-6 mb-8 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded border flex items-center justify-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
            <Focus className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Gate-tier admissibility engine</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                Substrate bound
              </span>
              <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {wiring?.substrateAxes.length ?? 0} axes · {wiring?.substrateModalities.length ?? 0} modalities · {wiring?.substrateTiers.length ?? 0} candidate tiers
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/governance/#ranker-version-lock"
          className="px-6 py-3 rounded-sm border border-zinc-800 bg-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 hover:bg-zinc-800 flex items-center gap-3"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Governance
        </Link>
      </div>

      {/* main workspace */}
      <div className="relative z-10 grid grid-cols-12 gap-8">
        {/* left rail — cascade */}
        <aside className="col-span-3 border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 flex flex-col min-h-[600px]">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-900">
            <Workflow className="w-4 h-4 text-zinc-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Cascade</span>
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
            {cascade.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActiveIdx(i)}
                className={`w-full p-3 border rounded-sm flex items-center justify-between transition-all text-left ${
                  i === activeIdx
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-xl'
                    : 'bg-black/40 border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[10px] font-black ${i === activeIdx ? 'text-cyan-500' : 'text-zinc-600'}`}>
                    {String(s.step).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-white truncate">
                    {s.label}
                  </span>
                </div>
                <ChevronRight
                  className={`w-3 h-3 flex-shrink-0 transition-transform ${
                    i === activeIdx ? 'rotate-90 text-cyan-500' : 'text-zinc-800'
                  }`}
                />
              </button>
            ))}
          </div>
        </aside>

        {/* center — protein viewer + step descriptor */}
        <section className="col-span-6 flex flex-col gap-6 min-h-[600px]">
          <div className="relative flex-1 border border-zinc-800 rounded-sm bg-black/40 overflow-hidden min-h-[360px]">
            <ThreeSceneMount camera={{ position: [0, 0, 3.5], fov: 40, near: 0.1, far: 1000 }}>
              <ambientLight intensity={0.35} />
              <pointLight position={[5, 5, 5]} intensity={0.8} />
              <ProteinBlob isLocking={isLocking} />
            </ThreeSceneMount>

            {/* reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.08]">
              <div className="w-80 h-80 border border-cyan-500 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 border border-cyan-500/50 rounded-full" />
                <div className="absolute w-full h-px bg-cyan-400" />
                <div className="absolute h-full w-px bg-cyan-400" />
              </div>
            </div>

            {/* status pill */}
            <div className="absolute top-4 left-4 z-10">
              <div className={`px-3 py-1.5 border backdrop-blur-md transition-all ${
                isLocking ? 'bg-rose-500/20 border-rose-500' : 'bg-cyan-500/10 border-cyan-500/30'
              }`}>
                <span className={`text-[9px] font-black tracking-[0.2em] uppercase flex items-center gap-2 ${
                  isLocking ? 'text-rose-500' : 'text-cyan-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLocking ? 'bg-rose-500 animate-ping' : 'bg-cyan-500 animate-pulse'}`} />
                  {isLocking ? 'Resolving' : 'Locked'}
                </span>
              </div>
            </div>

            {/* focus label */}
            <div className="absolute bottom-4 right-4 z-10 text-right text-[9px] text-zinc-500 uppercase font-bold tracking-widest leading-relaxed">
              STEP FOCUS · {String(active?.step ?? 0).padStart(2, '0')}<br />
              KIND · {active?.kind.toUpperCase() ?? ''}
            </div>
          </div>

          {/* step descriptor */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-900">
              <Crosshair className="w-4 h-4 text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Step descriptor</span>
              <span className="ml-auto text-[9px] font-black uppercase text-zinc-500">
                {active?.kind.toUpperCase()} · {active?.slug}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] leading-relaxed text-zinc-400"
              >
                {active?.descriptor}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* right rail — log stream + verdict */}
        <aside className="col-span-3 flex flex-col gap-6 min-h-[600px]">
          {/* verdict */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Emit tier candidates</span>
              </div>
            </div>
            <div className="space-y-2">
              {tiers.map((tierSlug) => {
                const t = getTier(tierSlug);
                return (
                  <div key={tierSlug} className="p-3 border border-zinc-900 bg-black/40 rounded-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{t?.name}</span>
                      <span className="text-[8px] font-black uppercase text-cyan-500">{tierSlug.toUpperCase()}</span>
                    </div>
                    <div className="text-[9px] leading-relaxed text-zinc-500">{t?.entryCriteria}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* log stream */}
          <div className="flex-1 min-h-0">
            <LogStream messages={LOG_MESSAGES.gateTier} intervalMs={950} isDarkMode={isDarkMode} />
          </div>
        </aside>
      </div>

      {/* footer — guardrail bar */}
      <div className="relative z-10 mt-8 border-t border-zinc-900 pt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 mr-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Guardrails active</span>
          </div>
          {guardrails.map((slug) => {
            const g = getGuardrail(slug);
            return (
              <Link
                key={slug}
                href={`/governance/#${slug}`}
                className="px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-950 text-[9px] font-black uppercase tracking-widest text-emerald-400 hover:bg-zinc-900"
              >
                {g?.name ?? slug}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
