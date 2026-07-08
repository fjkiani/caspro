'use client';

// ============================================================================
// <DNAHero/> — scrubbed adaptation of the uploaded `mars_v6_genomic_intelligence.tsx`.
//
// Scrubs applied:
//  - MISSION_PHRASES: removed "OVARIAN CANCER" specificity (was cancer-of-the-week)
//  - Version stamp "Mars V6 / v6.2.1 / v6.2.9" → "CrisPRO"
//  - Fabricated numerics 0.887 / 6.667 / 0.537 / 0.042ms → substrate labels
//  - "Target: BRCA1" HUD label → dynamic label from PATIENT_VECTOR_AXES
//
// The 3D DNA scene is preserved. Rendering moved from CDN-injected raw three.js
// to react-three-fiber (SSR-safe, unmounts cleanly).
// ============================================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, Cpu, Database, ShieldCheck } from 'lucide-react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import ThreeSceneMount from './ThreeSceneMount';
import { PATIENT_VECTOR_AXES } from '@/data/depth-layer';

const MISSION_PHRASES = [
  'REASONING BIOLOGY FOR OUR PATIENTS',
  'COMPUTATIONAL ONCOLOGY WITHOUT FABRICATION',
  'MECHANISM ALIGNMENT FOR EVERY TRIAL',
];

const GLITCH_CHARS = 'ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*<>[]{}';

// ---------------------------------------------------------------------------
// Glitch typewriter (unchanged mechanics)
// ---------------------------------------------------------------------------
function GlitchTypewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const currentFullText = phrases[index];

    const handleType = () => {
      if (isPaused) return;
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          const nextRealChar = currentFullText.charAt(displayText.length);
          const scrambleChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          setDisplayText((prev) => prev + scrambleChar);
          setTimeout(() => setDisplayText((prev) => prev.slice(0, -1) + nextRealChar), 30);
          timer = setTimeout(handleType, 70);
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 3000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          timer = setTimeout(handleType, 25);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    timer = setTimeout(handleType, 100);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayText, isDeleting, isPaused, index, phrases]);

  return (
    <span className="relative inline-block font-mono">
      <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1.1em] ml-2 bg-cyan-400 align-middle shadow-[0_0_10px_#22d3ee]"
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// 3D DNA strands (react-three-fiber scene)
// ---------------------------------------------------------------------------
function DoubleHelix() {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const steps = 100;
    const radius = 8;
    const heightStep = 0.5;
    const twist = 0.35;

    const buildStrand = (offset: number) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < steps; i++) {
        const angle = i * twist + offset;
        const y = (i - steps / 2) * heightStep;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      return new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
    };

    return { a: buildStrand(0), b: buildStrand(Math.PI) };
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 10]}>
      <mesh geometry={geometry.a}>
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh geometry={geometry.b}>
        <meshBasicMaterial color={0x22d3ee} wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Rotating axis label — cycles through PATIENT_VECTOR_AXES
// ---------------------------------------------------------------------------
function RotatingAxisLabel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((prev) => (prev + 1) % PATIENT_VECTOR_AXES.length), 2200);
    return () => clearInterval(t);
  }, []);
  const axis = PATIENT_VECTOR_AXES[i];
  return (
    <motion.div
      key={axis.axis}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <div className="w-4 h-4 border border-cyan-500 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-cyan-400 animate-pulse" />
      </div>
      <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
        Axis: {axis.name}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root — full-viewport hero
// ---------------------------------------------------------------------------
export default function DNAHero() {
  return (
    <div className="relative w-full h-screen bg-[#020408] overflow-hidden font-mono select-none">
      {/* 3D scene */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ThreeSceneMount camera={{ position: [0, 0, 60], fov: 30 }}>
          <DoubleHelix />
        </ThreeSceneMount>
      </div>

      {/* Overlay grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Axis label float */}
      <div className="absolute top-[45%] left-[62%] z-20 pointer-events-none">
        <RotatingAxisLabel />
      </div>

      {/* Center reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] z-10 pointer-events-none">
        <div className="w-[35rem] h-[35rem] border border-cyan-500 rounded-full flex items-center justify-center">
          <div className="w-[20rem] h-[20rem] border border-cyan-500/50 rounded-full" />
          <div className="absolute w-full h-px bg-cyan-500" />
          <div className="absolute h-full w-px bg-cyan-500" />
        </div>
      </div>

      {/* HUD layer */}
      <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between pointer-events-none">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="space-y-1 opacity-40">
            <div className="text-[11px] text-cyan-500 tracking-widest">SUBSTRATE: 8 AXES // 7 MODALITIES // 4 TIERS</div>
            <div className="text-[11px] text-cyan-500 tracking-widest">GOVERNANCE: 5 GUARDRAILS ACTIVE</div>
            <div className="text-[10px] text-white uppercase tracking-[0.4em] pt-2">Mechanism alignment layer online</div>
          </div>

          <div className="text-right">
            <div className="text-6xl md:text-7xl font-extralight text-cyan-400 tracking-tighter leading-none">
              {PATIENT_VECTOR_AXES.length}
            </div>
            <div className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-700 mt-3">
              Patient-biology axes
            </div>
          </div>
        </div>

        {/* Title row */}
        <div className="flex justify-between items-end">
          <div className="max-w-3xl border-l-4 border-cyan-500/30 pl-10 py-6 pointer-events-auto">
            <h1 className="text-3xl md:text-4xl text-white font-black tracking-tight uppercase min-h-[1.5em] mb-4">
              <GlitchTypewriter phrases={MISSION_PHRASES} />
            </h1>
            <p className="text-[12px] text-zinc-500 leading-relaxed uppercase tracking-[0.2em] font-bold max-w-lg mb-10">
              CrisPRO reasons about tumour biology across patient-biology axes, evidence modalities,
              and tier hierarchies — so every trial we help design is aligned to real mechanism,
              not marker-of-the-week.
            </p>
            <div className="flex gap-6">
              <Link
                href="/tumor-board/"
                className="px-12 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                [Enter Tumor Board]
              </Link>
              <Link
                href="/ledger/"
                className="px-12 py-4 bg-transparent border border-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] hover:text-white hover:border-zinc-500 transition-all"
              >
                [Public Receipts]
              </Link>
            </div>
          </div>

          {/* Right side stats */}
          <div className="flex flex-col gap-10 text-right opacity-80">
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-light text-cyan-400 leading-none tracking-tighter">7</div>
              <div className="text-[9px] uppercase tracking-[0.5em] font-black text-zinc-700">
                Evidence modalities
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-light text-cyan-400 leading-none tracking-tighter">4</div>
              <div className="text-[9px] uppercase tracking-[0.5em] font-black text-zinc-700">
                Tier hierarchy depth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative frame */}
      <div className="absolute top-0 left-0 w-full h-full border-[20px] border-black pointer-events-none z-50" />
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-white/5 pointer-events-none z-50" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-white/5 pointer-events-none z-50" />

      {/* Global status line */}
      <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-white/5 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-between px-12 opacity-60 font-mono">
        <div className="flex items-center gap-10">
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ranker version-locked
          </span>
          <span className="text-[9px] font-bold text-zinc-800 uppercase tracking-widest">
            Reproducibility on demand
          </span>
        </div>
        <div className="flex gap-8 text-cyan-900">
          <Activity className="w-4 h-4" />
          <Cpu className="w-4 h-4" />
          <Database className="w-4 h-4" />
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
