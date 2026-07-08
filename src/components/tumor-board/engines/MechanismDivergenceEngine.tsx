// ============================================================================
// MechanismDivergenceEngine.tsx — substrate-bound divergence decomposition.
//
// Adopts the visual pattern from layer_4_resistance_intelligence.tsx and
// sae_interpretability_engine.tsx (bar chart of signed axis contributions +
// interpretability panel + log stream) but every axis contribution is
// illustrative and every real anchor is a substrate read.
//
// SCRUBS APPLIED:
//  - "SAE / sparse autoencoder / v6.2.9" interpretability branding →
//    renamed to "divergence decomposition" (that is the actual public
//    capability).
//  - Fabricated per-trial anchor headlines / vulnerability scores → REMOVED.
//    Two-trial comparison labelled ILLUSTRATIVE.
//  - Three.js CDN inject → replaced with r3f orbit via <ThreeSceneMount/>.
//  - "L4 // resistance intelligence" acronyms → REMOVED.
//
// Wiring source: CAPABILITY_DEPTH_WIRING['mechanism-divergence']:
//   axes:       ddr · mapk · vegf · io · rss
//   modalities: clinical · in-vivo · expression-association
//   tiers:      strong · mechanistic
//   guardrails: ranker-version-lock, admissibility-policy, forbidden-string-audit
// ============================================================================

'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  Activity,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import ThreeSceneMount from '../shared/ThreeSceneMount';
import MechanismFitRadar from '../shared/MechanismFitRadar';
import LogStream, { LOG_MESSAGES } from '../shared/LogStream';
import {
  getAxis,
  getGuardrail,
} from '@/data/depth-layer';
import { getWiring } from '@/data/capability-depth-wiring';

// -----------------------------------------------------------------------------
// Illustrative divergence deltas — substrate axes only, labelled illustrative
//
// Each axis carries a signed contribution delta representing "how much the
// responder-vs-non-responder difference lands on this axis". Deltas are
// illustrative — the site's real divergence decomposition is deterministic
// under the released ranker version, but the specific numbers here are for
// visual demonstration only.
// -----------------------------------------------------------------------------

const ILLUSTRATIVE_DELTAS: Record<string, number> = {
  ddr: 0.42,
  mapk: -0.18,
  vegf: 0.08,
  io: 0.31,
  rss: -0.05,
};

// -----------------------------------------------------------------------------
// r3f orbiting rings
// -----------------------------------------------------------------------------

function DivergenceOrbit() {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += dt * 0.2;
    groupRef.current.rotation.x += dt * 0.08;
  });
  return (
    <group ref={groupRef as any}>
      <mesh>
        <torusGeometry args={[1.4, 0.02, 16, 60]} />
        <meshBasicMaterial color={0x22d3ee} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.02, 16, 60]} />
        <meshBasicMaterial color={0x22d3ee} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.4, 0.02, 16, 60]} />
        <meshBasicMaterial color={0x22d3ee} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function MechanismDivergenceEngine() {
  const wiring = getWiring('mechanism-divergence');

  const axisRows = useMemo(() => {
    if (!wiring) return [];
    return wiring.substrateAxes.map((axisSlug) => {
      const a = getAxis(axisSlug);
      const delta = ILLUSTRATIVE_DELTAS[axisSlug] ?? 0;
      return {
        axisSlug,
        name: a?.name ?? axisSlug,
        oneLiner: a?.oneLiner ?? '',
        delta,
        abs: Math.abs(delta),
      };
    }).sort((x, y) => y.abs - x.abs);
  }, [wiring]);

  const topAxis = axisRows[0];
  const [hoverAxis, setHoverAxis] = useState<string | null>(null);
  const focused = hoverAxis
    ? axisRows.find((r) => r.axisSlug === hoverAxis) ?? topAxis
    : topAxis;

  return (
    <div className="relative w-full min-h-[720px] bg-[#020408] text-zinc-400 font-mono p-8 rounded border border-zinc-900 overflow-hidden">
      {/* r3f orbit background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <ThreeSceneMount cameraPosition={[0, 0, 4]}>
          <ambientLight intensity={0.4} />
          <DivergenceOrbit />
        </ThreeSceneMount>
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-[0.3em] uppercase text-white">Mechanism divergence engine</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                Deterministic under ranker V-lock
              </span>
              <span className="h-3 w-px bg-zinc-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {wiring?.substrateAxes.length ?? 0} decomposition axes
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

      {/* substrate sentence */}
      <div className="relative z-10 mb-8 p-5 rounded border border-zinc-800 bg-zinc-950/40">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Headline substrate</div>
        <div className="text-[13px] leading-relaxed text-zinc-200">{wiring?.headlineSubstrateSentence}</div>
      </div>

      {/* main workspace */}
      <div className="relative z-10 grid grid-cols-12 gap-8">
        {/* left — signed axis contribution bars */}
        <section className="col-span-5 flex flex-col gap-6 min-h-[600px]">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 flex-1">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Signed axis contribution</span>
              <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-zinc-500">
                Illustrative
              </span>
            </div>
            <div className="space-y-4">
              {axisRows.map((row) => {
                const isPositive = row.delta > 0;
                const isFocused = focused?.axisSlug === row.axisSlug;
                return (
                  <div
                    key={row.axisSlug}
                    onMouseEnter={() => setHoverAxis(row.axisSlug)}
                    onMouseLeave={() => setHoverAxis(null)}
                    className={`transition-opacity ${isFocused ? 'opacity-100' : 'opacity-70'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isFocused ? 'text-cyan-400' : 'text-white'}`}>
                        {row.name}
                      </span>
                      <span className={`text-[10px] font-black tracking-widest ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {isPositive ? '+' : ''}{row.delta.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-2 bg-zinc-900 rounded-sm overflow-hidden">
                      {/* zero line */}
                      <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-700" />
                      {/* bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(row.abs * 100, 50)}%` }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className={`absolute inset-y-0 ${
                          isPositive
                            ? 'left-1/2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                            : 'right-1/2 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                        }`}
                        style={isPositive ? {} : { right: '50%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-900 text-[9px] font-black uppercase tracking-widest text-zinc-600 leading-relaxed">
              The axis with the largest signed contribution difference is the mechanistic explanation for divergence — not an averaging artifact.
            </div>
          </div>

          {/* focused axis detail */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {focused?.name ?? '—'} · axis descriptor
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={focused?.axisSlug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] leading-relaxed text-zinc-300"
              >
                {focused?.oneLiner}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* center — mechanism radar */}
        <section className="col-span-4 min-h-[600px]">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5 h-full">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Responder vs. non-responder</span>
            </div>
            <MechanismFitRadar isDarkMode={true} />
          </div>
        </section>

        {/* right — log stream + guardrails */}
        <aside className="col-span-3 flex flex-col gap-6 min-h-[600px]">
          <div className="flex-1 min-h-[300px]">
            <LogStream messages={LOG_MESSAGES.mechanism} intervalMs={950} />
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
