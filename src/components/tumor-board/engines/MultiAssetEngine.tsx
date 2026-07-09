// ============================================================================
// MultiAssetEngine.tsx — substrate-bound multi-asset ranking surface.
//
// Adopts the visual pattern from layer_2_treatment_selection.tsx (three-column:
// analysis · ranking · sidebar) but every asset row, every convergence signal,
// and every ranker verdict is a live read from depth-layer.ts +
// capability-depth-wiring.ts.
//
// SCRUBS APPLIED (source had multiple quarantined disclosures):
//  - Provenance row with a specific quarantined delta magnitude → REMOVED.
//    Governance owns the receipt disclosure on /governance/#ranker-version-lock.
//    No numeric delta surfaces on this engine.
//  - "COSINE_0.983 / RESOLVING COSINE" / "EXECUTING_MAGNITUDE_FIT" telemetry
//    → REPLACED with LOG_MESSAGES.multiAsset (public-safe strings from
//    LogStream). No cosine numeric surface.
//  - "TIER 1 / HGSOC_TIER_LOGIC / TCGA-GDC n=427" hard-coded gate → REPLACED
//    with a substrate-driven candidate-tier readout keyed to EVIDENCE_TIERS_4
//    filtered by CAPABILITY_DEPTH_WIRING['multi-asset-scoring'].substrateTiers.
//  - "Mars Computational Suite v6.2.9" version stamp → REMOVED (ranker-version-lock
//    is the real disclosure — governance owns it).
//  - Three.js VectorBackground CDN inject → replaced with an r3f grid via
//    <ThreeSceneMount/> (SSR-safe).
//  - Ranker asset panel rendered as a substrate-illustrative comparison, not a
//    fabricated top-5 with numeric scores.
//
// Wiring source: CAPABILITY_DEPTH_WIRING['multi-asset-scoring']:
//   axes:       mapk · pi3k · her2 · io
//   modalities: pharmacologic-prism · pharmacologic-gdsc · in-vitro-functional
//   tiers:      validated · strong
//   guardrails: ranker-version-lock, ranker-variant-prohibition,
//               admissibility-policy, reproducibility-lock
// ============================================================================

'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  Boxes,
  Grid3x3,
  Layers,
  ShieldCheck,
  Scale,
} from 'lucide-react';

import ThreeSceneMount from '../shared/ThreeSceneMount';
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
// Illustrative comparison rows — substrate-only, no fabricated per-patient data
//
// Rules:
//  - "Asset A/B/C" placeholders are anonymous — no anchor asset names.
//  - Each row cites which axes it engages (subset of wiring.substrateAxes)
//    and which modality has the strongest supporting evidence — this is
//    substrate metadata, not a fabricated score.
//  - The verdict column shows the tier reachable given the modality mix
//    (per EVIDENCE_TIERS_4 admissibility rules on the site).
// -----------------------------------------------------------------------------

interface AssetRow {
  slug: string;
  engagesAxes: string[];        // subset of wiring.substrateAxes
  primaryModality: string;      // subset of wiring.substrateModalities
  reachableTier: string;        // subset of wiring.substrateTiers
}

const ILLUSTRATIVE_ASSETS: AssetRow[] = [
  {
    slug: 'ASSET-α',
    engagesAxes: ['mapk', 'pi3k'],
    primaryModality: 'pharmacologic-prism',
    reachableTier: 'strong',
  },
  {
    slug: 'ASSET-β',
    engagesAxes: ['her2', 'io'],
    primaryModality: 'in-vitro-functional',
    reachableTier: 'validated',
  },
  {
    slug: 'ASSET-γ',
    engagesAxes: ['mapk', 'io'],
    primaryModality: 'pharmacologic-gdsc',
    reachableTier: 'strong',
  },
  {
    slug: 'ASSET-δ',
    engagesAxes: ['pi3k', 'her2'],
    primaryModality: 'in-vitro-functional',
    reachableTier: 'validated',
  },
];

// -----------------------------------------------------------------------------
// r3f vector grid background — substrate axes visualised as a wireframe box
// -----------------------------------------------------------------------------

function VectorGrid() {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.08;
    groupRef.current.rotation.x += dt * 0.03;
  });
  return (
    <group ref={groupRef as any}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.10} />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function MultiAssetEngine() {
  const { isDarkMode } = useTheme();
  const wiring = getWiring('multi-asset-scoring');
  const [activeAsset, setActiveAsset] = useState(0);

  const active = ILLUSTRATIVE_ASSETS[activeAsset];

  const activeAxes = active.engagesAxes.map(getAxis).filter(Boolean);
  const primaryModality = getModality(active.primaryModality);
  const reachableTier = getTier(active.reachableTier);

  return (
    <div className={`relative w-full min-h-[720px] font-mono p-8 rounded border overflow-hidden ${isDarkMode ? 'bg-[#020408] text-zinc-400 border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200 shadow-sm'}`}>
      {/* r3f background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ThreeSceneMount cameraPosition={[0, 0, 5]}>
          <ambientLight intensity={0.4} />
          <VectorGrid />
        </ThreeSceneMount>
      </div>

      {/* grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* header */}
      <div className={`relative z-10 flex items-center justify-between border-b pb-6 mb-8 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded border flex items-center justify-center ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
            <Boxes className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Multi-asset compare engine</h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                Same ranker · same library
              </span>
              <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {wiring?.substrateAxes.length ?? 0} axes · {wiring?.substrateModalities.length ?? 0} pharm/functional modalities
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/governance/#ranker-variant-prohibition"
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
        {/* left — asset table */}
        <section className="col-span-7 flex flex-col gap-6">
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-3">
                <Grid3x3 className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Illustrative asset-by-subgroup matrix</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Substrate only</span>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-widest text-zinc-500 border-b border-zinc-900">
                  <th className="text-left py-3 pl-1">Asset</th>
                  <th className="text-left py-3">Engages axes</th>
                  <th className="text-left py-3">Primary modality</th>
                  <th className="text-right py-3 pr-1">Reachable tier</th>
                </tr>
              </thead>
              <tbody>
                {ILLUSTRATIVE_ASSETS.map((row, i) => {
                  const tier = getTier(row.reachableTier);
                  const isActive = i === activeAsset;
                  return (
                    <tr
                      key={row.slug}
                      onClick={() => setActiveAsset(i)}
                      className={`cursor-pointer border-b border-zinc-900 transition-colors ${
                        isActive ? 'bg-cyan-500/5' : 'hover:bg-zinc-900/40'
                      }`}
                    >
                      <td className="py-3 pl-1">
                        <span className={`text-[11px] font-black tracking-widest ${isActive ? 'text-cyan-400' : 'text-white'}`}>
                          {row.slug}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {row.engagesAxes.map((axisSlug) => (
                            <span
                              key={axisSlug}
                              className="px-2 py-0.5 text-[8px] font-black tracking-widest uppercase rounded-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                            >
                              {axisSlug}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                          {row.primaryModality.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 pr-1 text-right">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border ${
                            row.reachableTier === 'validated'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {tier?.name ?? row.reachableTier}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600">
              <Scale className="w-3 h-3" />
              Rows illustrative only — every asset scored against the same trial-target library under the same released ranker version.
            </div>
          </div>

          {/* active asset detail */}
          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {active.slug} · substrate detail
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Axes engaged</div>
                  <div className="space-y-2">
                    {activeAxes.map((a) => (
                      <div key={a!.axis} className="p-3 border border-zinc-900 bg-black/40 rounded-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">{a!.name}</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">{a!.axis}</span>
                        </div>
                        <div className="text-[10px] leading-relaxed text-zinc-500">{a!.oneLiner}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Primary modality</div>
                  <div className="p-3 border border-zinc-900 bg-black/40 rounded-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{primaryModality?.name}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">{primaryModality?.modality}</span>
                    </div>
                    <div className="text-[10px] leading-relaxed text-zinc-500">{primaryModality?.whatItMeasures}</div>
                    <div className="mt-2 pt-2 border-t border-zinc-900 text-[9px] font-black uppercase tracking-widest text-zinc-600">
                      Positive threshold: <span className="text-zinc-400 font-bold normal-case">{primaryModality?.positiveThreshold}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Reachable tier</div>
                  <div className="p-3 border border-zinc-900 bg-black/40 rounded-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{reachableTier?.name}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">{reachableTier?.tier}</span>
                    </div>
                    <div className="text-[10px] leading-relaxed text-zinc-500">{reachableTier?.entryCriteria}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* right — log stream + guardrails */}
        <aside className="col-span-5 flex flex-col gap-6 min-h-[600px]">
          <div className="flex-1 min-h-[300px]">
            <LogStream messages={LOG_MESSAGES.multiAsset} intervalMs={1050} isDarkMode={isDarkMode} />
          </div>

          <div className="border border-zinc-800 bg-zinc-950/60 rounded-sm p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-900">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Governance stack</span>
            </div>
            <div className="text-[11px] leading-relaxed text-zinc-300 mb-4">{wiring?.headlineGovernanceSentence}</div>
            <div className="flex flex-wrap gap-2">
              {(wiring?.governanceGuardrails ?? []).map((slug) => {
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
        </aside>
      </div>
    </div>
  );
}
