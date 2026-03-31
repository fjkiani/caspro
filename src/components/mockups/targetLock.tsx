'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Target,
  Microscope,
  ChevronRight,
  Binary,
  Zap,
  Terminal,
  Waypoints,
  Focus,
  ClipboardList,
  RotateCw,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// --- Modular Components ---
import { FdaArchiveView } from '@/components/target-lock/FdaArchiveView';
import { TargetLockSidebar } from '@/components/target-lock/Sidebar';

// --- Data ---
import { FDA_STATS } from '@/data/fda-prediction-data';

// ==============================================================================
// 3D Protein Viewer — reuses DnaHero2 point-cloud protein (no CDN reload)
// ==============================================================================
const ProteinViewer = ({ isDarkMode, activeTarget, isLocking }: {
  isDarkMode: boolean;
  activeTarget: typeof CASCADE_STEPS[number];
  isLocking: boolean;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).THREE) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
      return () => { if (document.head.contains(script)) document.head.removeChild(script); };
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mountRef.current) return;
    const THREE = (window as any).THREE;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 55;

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // --- Point-Cloud DNA Protein (from DnaHero2) ---
    const numNodes = 400;
    const radius = 5.5;
    const heightSpacing = 0.12;
    const turns = 3;
    const twist = Math.PI * 2 * turns / numNodes;

    const posArray: number[] = [];
    const colorArray: number[] = [];

    const accentColor = new THREE.Color(isDarkMode ? '#00E5FF' : '#4f46e5');
    const gray = new THREE.Color('#3A4B5C');
    const white = new THREE.Color('#E8E8F0');

    for (let i = 0; i < numNodes; i++) {
      const angle1 = i * twist;
      const angle2 = angle1 + Math.PI;
      const y = (i - numNodes / 2) * heightSpacing;
      const x1 = Math.cos(angle1) * radius;
      const z1 = Math.sin(angle1) * radius;
      const x2 = Math.cos(angle2) * radius;
      const z2 = Math.sin(angle2) * radius;

      for (let p = 0; p < 20; p++) {
        const o1x = (Math.random() - 0.5) * 1.5, o1y = (Math.random() - 0.5) * 1.5, o1z = (Math.random() - 0.5) * 1.5;
        posArray.push(x1 + o1x, y + o1y, z1 + o1z);
        const c1 = accentColor.clone().lerp(white, Math.random() * 0.3);
        colorArray.push(c1.r, c1.g, c1.b);

        const o2x = (Math.random() - 0.5) * 1.5, o2y = (Math.random() - 0.5) * 1.5, o2z = (Math.random() - 0.5) * 1.5;
        posArray.push(x2 + o2x, y + o2y, z2 + o2z);
        const c2 = gray.clone().lerp(white, Math.random() * 0.5);
        if (Math.random() > 0.85) c2.copy(accentColor);
        colorArray.push(c2.r, c2.g, c2.b);
      }

      if (i % 8 === 0) {
        const rungsCount = 20;
        for (let j = 0; j <= rungsCount; j++) {
          const step = j / rungsCount;
          const rx = x1 + (x2 - x1) * step;
          const rz = z1 + (z2 - z1) * step;
          for (let k = 0; k < 3; k++) {
            posArray.push(rx + (Math.random() - 0.5) * 0.5, y + (Math.random() - 0.5) * 0.5, rz + (Math.random() - 0.5) * 0.5);
            colorArray.push(accentColor.r, accentColor.g, accentColor.b);
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1, vertexColors: true, transparent: true, opacity: isLocking ? 0.9 : 0.7,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    dnaGroup.add(particles);
    dnaGroup.rotation.z = Math.PI / 8;
    dnaGroup.rotation.x = 0.2;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      dnaGroup.rotation.y += isLocking ? 0.008 : 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, [isLoaded, isDarkMode, isLocking]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="absolute inset-0 z-0 rounded-sm overflow-hidden" />
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none p-6 z-10 font-mono flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className={`px-3 py-1.5 border backdrop-blur-md transition-all rounded-sm ${
            isLocking
              ? (isDarkMode ? 'bg-rose-500/20 border-rose-500' : 'bg-rose-50 border-rose-400')
              : (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-indigo-50 border-indigo-400/30')
          }`}>
            <span className={`text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2 ${
              isLocking
                ? 'text-rose-500'
                : (isDarkMode ? 'text-cyan-400' : 'text-indigo-600')
            }`}>
              <div className={`w-2 h-2 rounded-full ${isLocking ? 'bg-rose-500 animate-ping' : (isDarkMode ? 'bg-cyan-500 animate-pulse' : 'bg-indigo-500 animate-pulse')}`} />
              {isLocking ? 'Analyzing...' : 'Structure_Ready'}
            </span>
          </div>
          <div className={`text-right text-[9px] uppercase font-bold tracking-widest leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
            Target: {activeTarget.gene}<br />
            Step: 0{activeTarget.step}
          </div>
        </div>
        <div className="flex justify-between items-end opacity-60">
          <div className="flex items-center gap-2">
            <RotateCw className={`w-3.5 h-3.5 ${isLocking ? 'animate-spin' : ''} ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}`} />
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Kinetic Simulation</span>
          </div>
        </div>
      </div>
      {/* Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
        <div className={`w-64 h-64 border rounded-full flex items-center justify-center ${isDarkMode ? 'border-cyan-500' : 'border-indigo-400'}`}>
          <div className={`w-48 h-48 border rounded-full ${isDarkMode ? 'border-cyan-500/50' : 'border-indigo-400/50'}`} />
          <div className={`absolute w-full h-px ${isDarkMode ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
          <div className={`absolute h-full w-px ${isDarkMode ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// Metastasis Cascade Steps
// ==============================================================================
const CASCADE_STEPS = [
  { step: 1, label: 'Local Invasion',   gene: 'MMP9',  vuln: 0.942, impact: 'High' as const,     desc: 'Breakdown of extracellular matrix.' },
  { step: 2, label: 'Intravasation',    gene: 'TGFB1', vuln: 0.887, impact: 'Critical' as const, desc: 'Entry into systemic circulation.' },
  { step: 3, label: 'Circulation',       gene: 'CD44',  vuln: 0.812, impact: 'Moderate' as const, desc: 'Survival against hemodynamic shear.' },
  { step: 4, label: 'Arrest at Site',   gene: 'ITGB1', vuln: 0.951, impact: 'Critical' as const, desc: 'Adhesion to distant capillary beds.' },
  { step: 5, label: 'Extravasation',    gene: 'CCL2',  vuln: 0.763, impact: 'High' as const,     desc: 'Migration into secondary tissue.' },
  { step: 6, label: 'Micrometastasis',  gene: 'AKT1',  vuln: 0.899, impact: 'High' as const,     desc: 'Early proliferative seeding.' },
  { step: 7, label: 'Colonization',      gene: 'MYC',   vuln: 0.988, impact: 'Extreme' as const,  desc: 'Overt secondary growth formation.' },
  { step: 8, label: 'Angiogenesis',      gene: 'VEGFA', vuln: 0.922, impact: 'Extreme' as const,  desc: 'Recruitment of secondary blood supply.' },
];

// ==============================================================================
// Structure View — Cascade + Protein + Detail
// ==============================================================================
const StructureView = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [activeStep, setActiveStep] = useState(CASCADE_STEPS[0]);
  const [isLocking, setIsLocking] = useState(false);
  const [logs, setLogs] = useState(["L1_TARGET_STANDBY", "MAPPING_CASCADE_STEPS", "READY_FOR_INTERCEPT"]);

  const handleStepClick = (step: typeof CASCADE_STEPS[number]) => {
    if (isLocking) return;
    setIsLocking(true);
    setActiveStep(step);
    setLogs(prev => [`[PIPELINE] LOCKING: ${step.gene}...`, ...prev].slice(0, 8));
    setTimeout(() => {
      setIsLocking(false);
      setLogs(prev => [`[LOCKED] ${step.label} // VULN: ${step.vuln}`, ...prev]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-6 min-h-0">

      {/* Left: Cascade Selector */}
      <div className="xl:col-span-3 flex flex-col gap-4">
        <div className={`border rounded-sm p-4 flex-1 flex flex-col transition-colors ${
          isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex justify-between items-center mb-4 px-1">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Metastatic Cascade
            </span>
            <Waypoints className={`w-3.5 h-3.5 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto pr-1">
            {CASCADE_STEPS.map(s => (
              <button
                key={s.step}
                onClick={() => handleStepClick(s)}
                className={`w-full p-3 border rounded-sm flex items-center justify-between transition-all text-left ${
                  activeStep.step === s.step
                    ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg' : 'bg-indigo-50 border-indigo-400 shadow-md')
                    : (isDarkMode ? 'bg-black/40 border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 opacity-60' : 'bg-slate-50 border-slate-100 opacity-80 hover:opacity-100')
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black ${activeStep.step === s.step ? (isDarkMode ? 'text-cyan-500' : 'text-indigo-600') : 'text-zinc-600'}`}>
                    0{s.step}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {s.label}
                  </span>
                </div>
                <ChevronRight className={`w-3 h-3 transition-transform ${
                  activeStep.step === s.step ? `rotate-90 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}` : (isDarkMode ? 'text-zinc-800' : 'text-slate-300')
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className={`p-4 border rounded-sm h-48 flex flex-col transition-colors ${
          isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex items-center gap-2 mb-3 border-b pb-2" style={{ borderColor: isDarkMode ? '#27272a' : '#e2e8f0' }}>
            <Terminal className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-700' : 'text-indigo-400'}`} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Log</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[8px] leading-relaxed">
            {logs.map((l, i) => (
              <div key={i} className={`flex gap-2 ${i === 0 ? (isDarkMode ? 'text-white font-black' : 'text-slate-900 font-black') : 'opacity-30'}`}>
                <span className="opacity-20">[{i}]</span>
                <span className="truncate uppercase">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Protein Viewer */}
      <div className="xl:col-span-6 flex flex-col gap-4">
        <div className={`flex-1 border rounded-sm relative overflow-hidden min-h-[400px] transition-colors ${
          isDarkMode ? 'border-zinc-900 shadow-2xl' : 'border-slate-200 shadow-lg'
        }`}>
          <ProteinViewer isDarkMode={isDarkMode} activeTarget={activeStep} isLocking={isLocking} />
        </div>

        {/* Active Target Stats */}
        <div className={`p-6 border rounded-sm flex flex-col md:grid md:grid-cols-3 gap-6 transition-colors ${
          isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="space-y-2">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Active Candidate</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-extralight tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeStep.gene}</span>
              <span className="text-[9px] font-black text-rose-500 uppercase">Target</span>
            </div>
          </div>
          <div className={`space-y-2 md:border-x px-0 md:px-6 py-4 md:py-0 border-y md:border-y-0 ${isDarkMode ? 'border-zinc-900/50' : 'border-slate-200'}`}>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Vulnerability Score</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-extralight tracking-tighter ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{activeStep.vuln}</span>
              <span className="text-[9px] font-black text-emerald-500 uppercase">High</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Biological Impact</span>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${activeStep.impact === 'Extreme' ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`} />
              <span className={`text-lg font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeStep.impact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Mechanism Detail + Evidence */}
      <div className="xl:col-span-3 flex flex-col gap-4">
        <div className={`p-6 border rounded-sm flex-1 flex flex-col transition-colors ${
          isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex justify-between items-start mb-6 border-b pb-4" style={{ borderColor: isDarkMode ? '#27272a' : '#e2e8f0' }}>
            <div className="space-y-1">
              <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Mechanism Detail</span>
              <h3 className={`text-lg font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeStep.label}</h3>
            </div>
            <Focus className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
          </div>
          <div className="space-y-6 flex-1">
            <p className={`text-[11px] leading-relaxed font-bold uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              {activeStep.desc}
            </p>
            <div className="space-y-3">
              <span className={`text-[9px] font-black uppercase tracking-widest block border-b pb-2 ${isDarkMode ? 'text-zinc-500 border-zinc-900' : 'text-slate-400 border-slate-200'}`}>
                CRISPR Target Analysis
              </span>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>Off-Target Risk</span>
                  <span className="text-emerald-500">0.02%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>Structural Fit</span>
                  <span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>Nominal</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>gRNA Efficiency</span>
                  <span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>0.94</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`pt-5 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
            <button className={`w-full py-3 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
              isDarkMode ? 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent shadow-lg' : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-md'
            }`}>
              Design gRNA
            </button>
          </div>
        </div>

        {/* Evidence Path */}
        <div className={`p-5 border rounded-sm flex flex-col gap-4 transition-colors ${
          isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex items-center gap-2">
            <ClipboardList className={`w-3.5 h-3.5 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Evidence Path</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>FDA_CONCORDANCE</span>
              <span className="text-emerald-500 font-bold">{FDA_STATS.retroConcordance}</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>ARTIFACTS</span>
              <span className={`font-bold ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>LOCKED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================================
// Tab Config
// ==============================================================================
const TABS = [
  { key: 'fda-archive' as const, label: 'FDA Archive' },
  { key: 'structure' as const, label: 'Target Cascade' },
];
type TabKey = typeof TABS[number]['key'];

// ==============================================================================
// MAIN ORCHESTRATOR
// ==============================================================================
export default function TargetIdentificationEngine() {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState<TabKey>('fda-archive');

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono selection:bg-cyan-500/30 p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-slate-600'
    }`}>

      {/* Background Grid */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
      } bg-[size:48px_48px]`} />

      {/* Background Reticle */}
      <div className={`absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none ${isDarkMode ? 'text-cyan-400' : 'text-indigo-500'}`}>
        <div className="w-[60vw] h-[60vw] border border-current rounded-full" />
        <div className="absolute w-px h-full bg-current" />
        <div className="absolute h-px w-full bg-current" />
      </div>

      {/* Header */}
      <header className={`z-10 mb-8 border-b pb-8 flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 md:gap-0 transition-colors duration-500 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded border flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <Target className={`w-9 h-9 transition-colors ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className={`text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                L1: Target Identification
              </h1>
              <span className={`self-start sm:self-auto px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border ${
                isDarkMode ? 'bg-zinc-950 border-zinc-800 text-emerald-500' : 'bg-slate-100 border-slate-200 text-emerald-600'
              }`}>Receipt-Locked</span>
            </div>
            <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
              Two-Layer Prediction Framework • {FDA_STATS.retroConcordance} Retroactive Concordance • {FDA_STATS.prospectiveTotal} Prospective
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className={`flex p-1 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveView(tab.key)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-[1px] ${
                  activeView === tab.key
                    ? (isDarkMode ? 'bg-cyan-500 text-black shadow-xl' : 'bg-indigo-600 text-white shadow-lg')
                    : (isDarkMode ? 'text-zinc-700 hover:text-zinc-400' : 'text-slate-400 hover:text-slate-700')
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="z-10 flex-1 flex flex-col min-h-0"
        >
          {activeView === 'fda-archive' ? (
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 flex-1">
              <div className="lg:col-span-8 flex flex-col gap-8">
                <FdaArchiveView isDarkMode={isDarkMode} />
              </div>
              <TargetLockSidebar isDarkMode={isDarkMode} />
            </div>
          ) : (
            <StructureView isDarkMode={isDarkMode} />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Frame Accent */}
      <div className={`absolute top-0 left-0 w-full h-full border-[12px] pointer-events-none z-[100] transition-colors duration-500 ${
        isDarkMode ? 'border-[#020408]' : 'border-transparent'
      }`} />
    </div>
  );
}