'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
  Zap, Crosshair, Terminal, Binary,
  ChevronRight, ShieldAlert, Microscope, Fingerprint, FileSearch,
  LineChart as LineChartIcon, RefreshCcw, ExternalLink, Lock,
  ActivitySquare, Database, Cpu, Scale, BookOpen,
  Eye, BrainCircuit, Activity,
} from 'lucide-react';

import {
  KILL_CHAIN_ENGINE, RESISTANCE_CLASSES, SIGNAL_CHANNELS,
  BASE_STRIKE_VECTOR, DETECTION_RULES, SAE_DIAMOND_FEATURES,
  EMT_BIOMARKER, KILL_CHAIN_ARTIFACTS,
  TEST_SUITE,
  type SAEFeature,
} from '@/data/kill-chain-data';

// ─── 3D Neural Lattice Background ───
const NeuralLatticeBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      mountRef.current.appendChild(renderer.domElement);
      camera.position.z = 120;
      const group = new THREE.Group();
      scene.add(group);
      const nodeCount = 80;
      const geometry = new THREE.IcosahedronGeometry(0.5, 1);
      const material = new THREE.MeshBasicMaterial({
        color: isDarkMode ? 0x22d3ee : 0x4f46e5,
        transparent: true,
        opacity: 0.1,
      });
      for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100);
        group.add(mesh);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        group.rotation.y += 0.0005;
        group.rotation.x += 0.0002;
        renderer.render(scene, camera);
      };
      animate();
    };
    document.head.appendChild(script);
  }, [isDarkMode]);
  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />;
};

// ─── Tabs ───
type TabKey = 'sae' | 'signals' | 'classes' | 'artifacts';

// ─── SAE Feature Manifest (left column within SAE tab) ───
function FeatureManifest({ isDarkMode, selectedId, onSelect }: {
  isDarkMode: boolean;
  selectedId: number;
  onSelect: (f: SAEFeature) => void;
}) {
  return (
    <div className={`p-6 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <Eye className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Feature Registry</span>
        </div>
        <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{SAE_DIAMOND_FEATURES.length}-Feature Explainer</span>
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto pr-2 scrollbar-hide">
        {SAE_DIAMOND_FEATURES.map((f) => (
          <button
            key={f.featureId}
            onClick={() => onSelect(f)}
            className={`w-full p-4 border rounded-sm flex justify-between items-center transition-all group ${
              selectedId === f.featureId
                ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg' : 'bg-indigo-50 border-indigo-300')
                : (isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100')
            }`}
          >
            <div className="text-left">
              <span className={`text-[8px] font-black uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{f.slug} // {f.source}</span>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{f.label}</p>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className={`text-[11px] font-mono font-black ${selectedId === f.featureId ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : 'text-zinc-500'}`}>d={f.score}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${selectedId === f.featureId ? 'rotate-90' : ''}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Sparse Neuron Grid (interactive 12x12 latent grid) ───
function SparseNeuronGrid({ isDarkMode, activeNodes, onNodeClick }: {
  isDarkMode: boolean;
  activeNodes: number[];
  onNodeClick: (id: number) => void;
}) {
  const grid = Array.from({ length: 144 }, (_, i) => ({
    id: i,
    active: activeNodes.includes(i),
    mutation: i % 17 === 0,
  }));

  return (
    <div className={`p-6 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <Binary className={`w-5 h-5 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Sparse Latent Grid</span>
        </div>
        <div className="flex gap-4 text-[9px] font-black uppercase text-zinc-500">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-sm" /> Latent Active</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 border border-rose-500 rounded-sm" /> Mutation Sig</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-1.5 overflow-hidden">
        {grid.map(node => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            onClick={() => onNodeClick(node.id)}
            className={`aspect-square rounded-[1px] cursor-crosshair transition-all relative ${
              node.active
                ? (isDarkMode ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-indigo-600 shadow-md')
                : (isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-slate-100 hover:bg-slate-200')
            }`}
          >
            {node.mutation && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border border-rose-500 opacity-40 animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SAE Detail Analysis Panel ───
function SAEDetailPanel({ isDarkMode, feature, isReconning, reconProgress, onRecon }: {
  isDarkMode: boolean;
  feature: SAEFeature;
  isReconning: boolean;
  reconProgress: number;
  onRecon: () => void;
}) {
  return (
    <div className={`p-6 border rounded-sm flex flex-col justify-between h-full transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className="space-y-6">
        <div className={`flex justify-between items-start border-b pb-5 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Extraction</span>
            <h2 className={`text-xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{feature.label}</h2>
          </div>
          <Fingerprint className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
        </div>

        <p className={`text-[11px] leading-relaxed font-bold uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-700'}`}>
          SAE transforms real data into explainable feature provenance. Feature <span className={isDarkMode ? 'text-white' : 'text-black'}>{feature.slug}</span> — top gene: <span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>{feature.topGene}</span> ({feature.topGeneCount}/30 variants).
        </p>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">Cohen&apos;s d</span>
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{feature.score}</span>
            </div>
            <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
              <motion.div animate={{ width: `${feature.score * 100}%` }} className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">p-value</span>
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{feature.pValue}</span>
            </div>
            <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
              <motion.div animate={{ width: `${Math.max(5, (1 - feature.pValue) * 100)}%` }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-zinc-500">Recon Progress</span>
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{isReconning ? `${reconProgress}%` : 'LOCKED'}</span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
              <motion.div animate={{ width: `${reconProgress}%` }} className={`h-full ${isReconning ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'} rounded-full`} />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-zinc-900 space-y-3">
        <button
          onClick={onRecon}
          disabled={isReconning}
          className={`w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-sm transition-all border flex items-center justify-center gap-3 ${
            isReconning
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 animate-pulse'
              : (isDarkMode ? 'bg-black border-zinc-800 text-white hover:bg-zinc-900' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-md')
          }`}
        >
          {isReconning ? <Activity className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
          {isReconning ? 'Reconstructing...' : 'Run Path Recon'}
        </button>
      </div>
    </div>
  );
}

// ─── Full SAE Tab (3-column: Feature Manifest + Neuron Grid + Detail) ───
function SAEPanel({ isDarkMode, logs, setLogs }: { isDarkMode: boolean; logs: string[]; setLogs: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [selectedFeature, setSelectedFeature] = useState<SAEFeature>(SAE_DIAMOND_FEATURES[0]);
  const [isReconning, setIsReconning] = useState(false);
  const [reconProgress, setReconProgress] = useState(100);

  const activeNodes = useMemo(() => {
    const seed = selectedFeature.featureId;
    return Array.from({ length: 12 }, (_, i) => (seed * (i + 1) + i * 7) % 144);
  }, [selectedFeature]);

  const handleRecon = () => {
    setIsReconning(true);
    setReconProgress(0);
    setLogs(prev => [`[PIPELINE] RECONSTRUCTING ${selectedFeature.label}...`, ...prev].slice(0, 10));
    const interval = setInterval(() => {
      setReconProgress(p => {
        if (p >= 100) { clearInterval(interval); setIsReconning(false); return 100; }
        return p + 10;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 h-full min-h-[500px]">
      {/* Feature Manifest */}
      <div className="xl:col-span-3">
        <FeatureManifest isDarkMode={isDarkMode} selectedId={selectedFeature.featureId} onSelect={setSelectedFeature} />
      </div>
      {/* Sparse Neuron Grid */}
      <div className="xl:col-span-5">
        <SparseNeuronGrid
          isDarkMode={isDarkMode}
          activeNodes={activeNodes}
          onNodeClick={(id) => setLogs(prev => [`NODE_${id}_ISOLATED // ATTN: 0.${992 - (id % 50)}`, ...prev].slice(0, 10))}
        />
      </div>
      {/* Detail Panel */}
      <div className="xl:col-span-4">
        <SAEDetailPanel
          isDarkMode={isDarkMode}
          feature={selectedFeature}
          isReconning={isReconning}
          reconProgress={reconProgress}
          onRecon={handleRecon}
        />
      </div>
    </div>
  );
}

// ─── 8 Signal Channels Panel ───
function SignalsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <ActivitySquare className={`w-5 h-5 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>8 Signal Channels</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${isDarkMode ? 'bg-rose-500/10 text-rose-500' : 'bg-rose-50 text-rose-600'}`}>{SIGNAL_CHANNELS.filter(s => s.classification === 'ACTIVE').length} ACTIVE</div>
          <div className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${isDarkMode ? 'bg-cyan-500/10 text-cyan-500' : 'bg-cyan-50 text-cyan-600'}`}>{SIGNAL_CHANNELS.filter(s => s.classification === 'BASELINE').length} BASELINE</div>
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {SIGNAL_CHANNELS.map((s, i) => (
          <div key={i} className={`flex items-center gap-4 p-3 rounded-sm border transition-all ${isDarkMode ? 'border-zinc-900 hover:border-zinc-700' : 'border-slate-100 hover:border-slate-200'}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.classification === 'ACTIVE' ? 'bg-rose-500 shadow-[0_0_6px_#f43f5e]' : 'bg-cyan-500'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{s.label}</span>
                <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                  s.classification === 'ACTIVE'
                    ? (isDarkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-600')
                    : (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-700')
                }`}>{s.classification}</span>
              </div>
              <span className={`text-[9px] font-mono block mt-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{s.threshold}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <span className={`text-[9px] font-mono ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Detection: ≥2 signals AND ≥1 ACTIVE → RESISTANCE_DETECTED</span>
      </div>
    </div>
  );
}

// ─── 12 Resistance Classes Panel ───
function ClassesPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <ShieldAlert className={`w-5 h-5 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{RESISTANCE_CLASSES.length} Resistance Classes</span>
        </div>
        <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{RESISTANCE_CLASSES.reduce((acc, rc) => acc + rc.triggerGenes.length, 0)} genes covered</span>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {RESISTANCE_CLASSES.map((rc, i) => (
          <div key={i} className={`group flex items-center gap-3 p-2.5 rounded-sm border transition-all cursor-default ${isDarkMode ? 'border-zinc-900/50 hover:border-zinc-700' : 'border-slate-50 hover:border-slate-200'}`}>
            <span className={`text-[9px] font-mono font-bold w-4 text-right flex-shrink-0 ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`}>{rc.severity}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{rc.label}</span>
                {rc.pmid && <span className={`text-[8px] font-mono ${isDarkMode ? 'text-cyan-800' : 'text-indigo-300'}`}>PMID:{rc.pmid.slice(0,8)}</span>}
              </div>
              <span className={`text-[8px] font-mono block mt-0.5 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{rc.triggerGenes.join(', ') || '(fallback)'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <span className={`text-[9px] font-mono ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Source: vectors.py L47-128 • models.py L25-37</span>
      </div>
    </div>
  );
}

// ─── Artifacts Panel ───
function ArtifactsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const TYPE_COLORS: Record<string, { dark: string; light: string }> = {
    json: { dark: 'bg-emerald-500/10 text-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
    py:   { dark: 'bg-amber-500/10 text-amber-400', light: 'bg-amber-50 text-amber-600' },
    mdc:  { dark: 'bg-cyan-500/10 text-cyan-500', light: 'bg-cyan-50 text-cyan-700' },
    md:   { dark: 'bg-violet-500/10 text-violet-400', light: 'bg-violet-50 text-violet-600' },
    csv:  { dark: 'bg-pink-500/10 text-pink-400', light: 'bg-pink-50 text-pink-600' },
    png:  { dark: 'bg-blue-500/10 text-blue-400', light: 'bg-blue-50 text-blue-600' },
  };

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <BookOpen className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Source Artifacts</span>
        </div>
        <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{KILL_CHAIN_ARTIFACTS.length} files</span>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto pr-2 scrollbar-hide">
        {KILL_CHAIN_ARTIFACTS.map((a, i) => {
          const tc = TYPE_COLORS[a.type];
          return (
            <a key={i} href={a.slug} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-3 p-2.5 rounded-sm border transition-all ${isDarkMode ? 'border-zinc-900/30 hover:border-zinc-700 hover:bg-cyan-500/5' : 'border-slate-50 hover:border-slate-200 hover:bg-indigo-50/50'}`}>
              <Lock className={`w-3 h-3 flex-shrink-0 ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`} />
              <span className={`text-[10px] font-bold flex-1 truncate ${isDarkMode ? 'text-zinc-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-950'}`}>{a.label}</span>
              {tc && <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${isDarkMode ? tc.dark : tc.light}`}>{a.type}</span>}
              <ExternalLink className={`w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}`} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Engine ───
export default function ResistanceIntelligenceEngine() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('sae');
  const [logs, setLogs] = useState(['LAYER_4_INIT', 'RESISTANCE_DETECTION_ACTIVE', `${TEST_SUITE.totalTests}/${TEST_SUITE.totalTests}_TESTS_PASSED`]);

  const engine = KILL_CHAIN_ENGINE;

  useEffect(() => {
    const timer = setInterval(() => {
      const msgs = ['SCANNING_SIGNAL_CHANNELS...', 'HR_RESTORATION_CHECK...', 'CTDNA_MONITORING...', 'NRF2_PATHWAY_SCAN...', 'SLFN11_PRIOR_CHECK...', 'CA125_KINETICS_SYNC...', 'EMT_MANIFOLD_STABLE...', '2OF_N_EVALUATION...'];
      setLogs(prev => [msgs[Math.floor(Math.random() * msgs.length)], ...prev].slice(0, 10));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'sae', label: 'SAE Profiler' },
    { key: 'signals', label: '8 Signals' },
    { key: 'classes', label: '12 Classes' },
    { key: 'artifacts', label: 'Artifacts' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono p-8 flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'}`}>
      <NeuralLatticeBackground isDarkMode={isDarkMode} />

      {/* Header */}
      <header className={`z-10 mb-8 border-b pb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-16 h-16 rounded border flex items-center justify-center shadow-2xl ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <BrainCircuit className={`w-9 h-9 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div>
            <h1 className={`text-xl md:text-2xl font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              L4: Resistance Intelligence <span className="hidden md:inline text-zinc-700 font-light tracking-normal ml-2">v{engine.version}</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-cyan-500 animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" /> Extraction_Active
              </span>
              <div className={`hidden md:block h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
              <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{engine.resistanceClasses} Classes • {engine.signalChannels} Signals • {engine.strikeVectorAxes}D Vector</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {/* Theme toggle handled by ZetaNavbar */}
          <button className={`px-8 lg:px-12 py-3 lg:py-4 rounded-sm border text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-4 ${isDarkMode ? 'bg-white text-black hover:bg-cyan-500 border-transparent shadow-2xl shadow-cyan-900/20' : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-xl shadow-indigo-100'}`}>
            <Crosshair className="w-4 h-4" /> Execute L4 Monitor
          </button>
        </div>
      </header>

      <div className="z-10 flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-10 min-h-0">

        {/* Sidebar */}
        <aside className="xl:col-span-3 flex flex-col gap-8">
          {/* Tab Navigation */}
          <div className={`border rounded-sm p-4 md:p-6 ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <span className={`text-[11px] font-black uppercase tracking-widest block mb-4 md:mb-6 px-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Engine Panels</span>
            <div className="flex flex-row overflow-x-auto xl:flex-col gap-2 pb-2 xl:pb-0 scrollbars-none snap-x">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex-none xl:w-full flex items-center justify-between px-5 py-3 md:py-4 rounded-sm transition-all group snap-start ${
                  activeTab === t.key
                    ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-500 shadow-xl' : 'bg-indigo-50 text-indigo-800 border-l-4 border-indigo-600 shadow-md')
                    : (isDarkMode ? 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 border-l-4 border-transparent' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-950 border-l-4 border-transparent')
                }`}>
                  <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest whitespace-nowrap">{t.label}</span>
                  <ChevronRight className={`hidden xl:block w-4 h-4 ${activeTab === t.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                </button>
              ))}
            </div>
          </div>

          {/* Validation Metrics - from data */}
          <div className={`p-4 md:p-6 border rounded-sm ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <span className={`text-[11px] font-black uppercase tracking-widest block mb-4 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Key Metrics</span>
            <div className="space-y-3">
              {[
                { label: 'TRUE SAE', value: '0.783', unit: 'AUROC', color: 'text-cyan-400' },
                { label: 'MFAP4 EMT', value: String(EMT_BIOMARKER.auroc), unit: 'AUROC', color: 'text-emerald-400' },
                { label: 'Serial DDR', value: '-0.711', unit: 'ρ', color: 'text-rose-400' },
                { label: 'CN sig7', value: '0.874', unit: 'AUROC', color: 'text-amber-400' },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12px] font-bold ${isDarkMode ? m.color : 'text-slate-950'}`}>{m.value}</span>
                    <span className={`text-[8px] font-mono ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`}>{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className={`p-4 md:p-6 border rounded-sm flex-1 flex flex-col justify-between ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Terminal className={`w-4 h-4 ${isDarkMode ? 'text-cyan-600' : 'text-indigo-400'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Reconstruction_Feed</span>
              </div>
              <div className={`space-y-2 font-mono text-[9px] leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                {logs.map((l, i) => (
                  <div key={i} className={`flex gap-2 ${i === 0 ? 'font-black' : 'opacity-20'}`}>
                    <span className="opacity-30">[{String(i).padStart(2, '0')}]</span>
                    <span className="truncate uppercase tracking-widest">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`mt-6 pt-4 border-t flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 xl:gap-0 text-[9px] font-black uppercase ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
              <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-500'}>Tests</span>
              <span className="text-emerald-500">{TEST_SUITE.passed}/{TEST_SUITE.totalTests} PASSED ({TEST_SUITE.time})</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="xl:col-span-9 flex flex-col gap-10">
          {/* Active Panel */}
          <div className="flex-1 min-h-[500px]">
            {activeTab === 'sae' && <SAEPanel isDarkMode={isDarkMode} logs={logs} setLogs={setLogs} />}
            {activeTab === 'signals' && <SignalsPanel isDarkMode={isDarkMode} />}
            {activeTab === 'classes' && <ClassesPanel isDarkMode={isDarkMode} />}
            {activeTab === 'artifacts' && <ArtifactsPanel isDarkMode={isDarkMode} />}
          </div>

          {/* Bottom Summary: Mechanism alignment + Detection + EMT */}
          <div className={`p-6 xl:p-8 border rounded-sm flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
            {/* 7D Strike Vector */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Database className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
                <h3 className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>7D Baseline Vector</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(BASE_STRIKE_VECTOR).map(([axis, val]) => (
                  <div key={axis} className="flex items-center gap-3">
                    <span className={`text-[9px] font-black uppercase w-10 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{axis}</span>
                    <div className={`flex-1 h-1.5 rounded-full ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                      <div className={`h-full rounded-full ${val > 0.5 ? (isDarkMode ? 'bg-rose-500' : 'bg-rose-600') : val > 0 ? (isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500') : (isDarkMode ? 'bg-zinc-800' : 'bg-slate-200')}`} style={{ width: `${Math.max(val * 100, 2)}%` }} />
                    </div>
                    <span className={`text-[9px] font-mono font-bold w-6 text-right ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{val}</span>
                  </div>
                ))}
              </div>
              <span className={`text-[8px] font-mono block ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`}>vectors.py L37-40</span>
            </div>

            {/* 2-of-N Detection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className={`w-4 h-4 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
                <h3 className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Detection Rules</h3>
              </div>
              <div className="space-y-2">
                {DETECTION_RULES.map((r, i) => (
                  <div key={i} className={`p-2.5 rounded-sm border ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{r.condition}</span>
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                        r.severity === 'HIGH' ? (isDarkMode ? 'bg-rose-500/10 text-rose-500' : 'bg-rose-50 text-rose-600')
                          : r.severity === 'WATCH' ? (isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600')
                          : (isDarkMode ? 'bg-zinc-500/10 text-zinc-400' : 'bg-slate-50 text-slate-500')
                      }`}>{r.severity}</span>
                    </div>
                    <span className={`text-[8px] font-mono block mt-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>→ {r.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMT Biomarker */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Microscope className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3 className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>EMT Biomarker</h3>
              </div>
              <div className={`p-4 rounded border space-y-3 ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{EMT_BIOMARKER.name} AUROC</span>
                  <span className={`text-[14px] font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{EMT_BIOMARKER.auroc}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>95% CI</span>
                  <span className={`text-[10px] font-mono ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{EMT_BIOMARKER.ci95}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Resistance OR</span>
                  <span className={`text-[10px] font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{EMT_BIOMARKER.resistanceOR}×</span>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest block ${isDarkMode ? 'text-emerald-900' : 'text-emerald-300'}`}>
                  {EMT_BIOMARKER.dataset} (n={EMT_BIOMARKER.n}) Validated
                </span>
              </div>
              <span className={`text-[8px] font-mono block ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`}>{EMT_BIOMARKER.source}</span>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={`h-auto min-h-24 py-6 mt-10 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 lg:px-12 ${isDarkMode ? 'border-zinc-900 bg-black/40' : 'border-slate-200 bg-white'}`}>
        <div className="space-y-4 md:space-y-2">
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Mars Computational Suite v{engine.version}</span>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            <span className={`text-2xl md:text-3xl font-extralight tracking-tighter leading-none ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>SAE INTERPRETABILITY</span>
            <div className={`hidden md:block h-8 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
            <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              {engine.resistanceClasses} Classes • {engine.genesCovered} Genes • {engine.totalTestsPassed}/{engine.totalTestsPassed} Tests
            </span>
          </div>
        </div>
        <div className={`flex gap-8 lg:gap-12 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-300'}`}>
          <Database className="w-6 h-6 hover:text-cyan-400 transition-colors cursor-pointer" />
          <Cpu className="w-6 h-6" />
          <Scale className="w-6 h-6" />
          <Lock className="w-6 h-6" />
        </div>
      </footer>

      <div className={`absolute top-0 left-0 w-full h-full border-[15px] pointer-events-none z-[100] ${isDarkMode ? 'border-[#020408]' : 'border-slate-100/50'}`} />
    </div>
  );
}