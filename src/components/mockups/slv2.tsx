import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Activity, 
  Zap, 
  Database, 
  Cpu, 
  ChevronRight, 
  Binary,
  Layers,
  Terminal,
  Boxes,
  Workflow,
  Search,
  CheckCircle2,
  AlertOctagon,
  Dna,
  ArrowRight,
  FlaskConical,
  Crosshair,
  Microscope,
  ActivitySquare,
  Scale,
  ClipboardList,
  FileSearch,
  BookOpen,
  Lock,
  ExternalLink,
  History as HistoryIcon,
  Timer as TimerIcon,
  Fingerprint,
  Combine,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Beaker,
  FileCode,
  Flame,
  Stethoscope
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ScatterChart, 
  Scatter, 
  Cell,
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  BarChart,
  Bar,
  Rectangle
} from 'recharts';

// --- Technical 3D Neural Background (Vulnerability Lattice) ---

const VulnerabilityBackground = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = window.THREE;
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);
      camera.position.z = 100;

      const group = new THREE.Group();
      scene.add(group);

      const size = 120;
      const divisions = 24;
      // Cyan/Emerald tint for SL Engine
      const gridColor = isDarkMode ? 0x22d3ee : 0x4f46e5;
      const grid = new THREE.GridHelper(size, divisions, gridColor, gridColor);
      grid.rotation.x = Math.PI / 2;
      grid.material.opacity = 0.04;
      grid.material.transparent = true;
      group.add(grid);

      const animate = () => {
        requestAnimationFrame(animate);
        group.rotation.y += 0.0003;
        renderer.render(scene, camera);
      };
      animate();
    };
    document.head.appendChild(script);
  }, [isDarkMode]);
  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- Sub-components for SL Discovery ---

const EvidenceHeatmap = ({ isDarkMode }) => {
  const axes = ['Cytidine Analogs', 'ATR/WEE1', 'PARP Inhibitors', 'Immunotherapy', 'WRN Helicase', 'PKMYT1'];
  const modalities = ['CRISPR', 'Pharma', 'In Vitro', 'In Vivo', 'Clinical', 'Path', 'Lit'];
  
  // 1: POSITIVE (red/emerald), 0: MISSING (gray), -1: NEGATIVE (blue), 2: CONFAUNDED (purple)
  const matrix = [
    [1, 1, 1, 1, 1, 1, 1], // Cytidine
    [1, 1, 1, 0, 0, 1, 1], // ATR/WEE1
    [0, -1, 1, 0, 0, 1, 1], // PARPi (Mixed/Negative)
    [0, 1, 0, 0, 1, 0, 1], // IO
    [1, 0, 0, 0, 0, 1, 1], // WRN
    [0, 1, 0, 0, 0, 0, 1], // PKMYT1
  ];

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <Combine className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Multi-modal Evidence Matrix</span>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-black uppercase text-zinc-500">Positive</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[8px] font-black uppercase text-zinc-500">Negative</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="grid grid-cols-8 gap-1 min-w-[600px]">
          {/* Header Col */}
        <div className="col-span-1" />
        {modalities.map(m => <div key={m} className="text-[8px] font-black uppercase text-zinc-600 text-center pb-2 truncate">{m}</div>)}
        
        {axes.map((axis, i) => (
          <React.Fragment key={axis}>
            <div className={`text-[9px] font-bold uppercase truncate pr-4 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{axis}</div>
            {matrix[i].map((val, j) => (
              <div 
                key={`${i}-${j}`} 
                className={`h-8 border rounded-[1px] transition-all flex items-center justify-center ${
                  val === 1 ? (isDarkMode ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-emerald-500 text-white') :
                  val === -1 ? (isDarkMode ? 'bg-rose-500/20 border-rose-500/50' : 'bg-rose-500 text-white') :
                  val === 2 ? 'bg-purple-500/20 border-purple-500/50' :
                  (isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-100')
                }`}
              >
                 {val === 1 && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                 {val === -1 && <XIcon className="w-3 h-3 text-rose-500" />}
              </div>
            ))}
          </React.Fragment>
        ))}
        </div>
      </div>
    </div>
  );
};

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ConfoundStressTest = ({ isDarkMode }) => {
  const tests = [
    { label: 'MSI-H Ghost Purge', delta: 'Strengthened', p: '0.025', status: 'PASS' },
    { label: 'TP53 Hijack Check', delta: 'd = -0.88', p: '0.008', status: 'PASS' },
    { label: 'Leave-One-Out', delta: '14/14 Robust', p: '< 0.10', status: 'PASS' },
    { label: 'Lineage Trap', delta: '8 Lineages', p: '0.051', status: 'PASS' },
  ];

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
       <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
             <AlertOctagon className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
             <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Confound Stress Testing</span>
          </div>
          <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Target: Ceralasertib</span>
       </div>
       
       <div className="space-y-4 flex-1">
          {tests.map((t, i) => (
            <div key={i} className={`p-4 border rounded-sm flex justify-between items-center transition-all ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
               <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{t.label}</span>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{t.delta}</p>
               </div>
               <div className="text-right">
                  <span className={`text-[11px] font-mono font-bold ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>p = {t.p}</span>
                  <div className="flex items-center justify-end gap-2 mt-1">
                     <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                     <span className="text-[8px] font-black text-emerald-500 uppercase">{t.status}</span>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

// --- Main Standalone App ---

export default function SyntheticLethalityEngine() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Vulnerability Matrix');
  const [logs, setLogs] = useState(["SL_ENGINE_INIT", "MBD4_LOF_DETECTED", "RUNNING_CONFOUND_PURGE"]);

  useEffect(() => {
    const timer = setInterval(() => {
      const msgs = ["SYNCING DepMap_25Q3...", "CALIBRATING GDSC2_Z_SCORES...", "FUSING ISOGENIC_RECEIPTS...", "CALCULATING_COHEN_D...", "SHA_256_LOCKED"];
      setLogs(prev => [msgs[Math.floor(Math.random()*msgs.length)], ...prev].slice(0, 10));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
    }`}>
      <VulnerabilityBackground isDarkMode={isDarkMode} />

      {/* Header */}
      <header className={`z-10 mb-8 border-b pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 transition-colors ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className={`w-16 h-16 rounded border flex items-center justify-center shadow-2xl transition-all ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
             <Beaker className={`w-9 h-9 transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-[0.3em] uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              Synthetic Lethality Engine <span className="text-zinc-700 font-light tracking-normal ml-2">MBD4_v4.0.0</span>
            </h1>
            <div className="flex items-center gap-4 mt-2">
               <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500 animate-pulse flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> Discovery_Active
               </span>
               <div className={`h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
               <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Model: Multi-Modal Evidence Fuser</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
           <button 
             className={`px-12 py-4 rounded-sm border text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${
               isDarkMode ? 'bg-white text-black hover:bg-emerald-500 hover:text-white border-transparent shadow-2xl shadow-emerald-900/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 border-transparent shadow-xl'
             }`}
           >
             <Zap className="w-4 h-4" />
             Execute SL Pipeline
           </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="z-10 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-10 min-h-0">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-8">
          <div className={`border rounded-sm p-6 transition-colors ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <span className={`text-[11px] font-black uppercase tracking-widest block mb-6 px-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Discovery Layers</span>
            <div className="space-y-2">
              {[
                { label: 'Vulnerability Matrix', icon: Combine, slug: 'AXIS_6' },
                { label: 'Confound Purge', icon: AlertOctagon, slug: 'STRESS_4' },
                { label: 'PARP1 Biomarker', icon: Stethoscope, slug: 'TPM_L1' },
                { label: 'Evo2 Essentiality', icon: Dna, slug: 'SNV_SOTA' }
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-sm transition-all group ${
                    activeTab === tab.label 
                    ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500 shadow-xl' : 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 shadow-md') 
                    : (isDarkMode ? 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-950')
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon className={`w-5 h-5 transition-colors ${activeTab === tab.label ? 'text-emerald-500' : 'text-current'}`} />
                    <div className="text-left">
                       <span className="text-[12px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.label ? 'opacity-100' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Process Feed */}
          <div className={`p-8 border rounded-sm flex-1 flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="space-y-8">
               <div className="flex items-center gap-4 mb-4">
                  <Terminal className={`w-5 h-5 ${isDarkMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>SL_Process_Sync</span>
               </div>
               <div className={`space-y-4 font-mono text-[10px] leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                  {logs.map((l, i) => (
                    <div key={i} className={`flex gap-3 transition-all duration-300 ${i === 0 ? 'font-black' : 'opacity-30'}`}>
                       <span className="opacity-20">[{i}]</span>
                       <span className="truncate uppercase tracking-widest">{l}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
               <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-500'}>State</span>
                  <span className="text-emerald-500 font-black uppercase tracking-widest">VERIFIED</span>
               </div>
            </div>
          </div>
        </aside>

        {/* Display Center */}
        <main className="lg:col-span-9 flex flex-col gap-10">
           <AnimatePresence mode="wait">
             <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1">
                {activeTab === 'Vulnerability Matrix' && <EvidenceHeatmap isDarkMode={isDarkMode} />}
                {activeTab === 'Confound Purge' && <ConfoundStressTest isDarkMode={isDarkMode} />}
                
                {activeTab === 'PARP1 Biomarker' && (
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 h-full">
                     <div className={`p-8 border rounded-sm flex flex-col h-full ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
                        <span className={`text-[11px] font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>PARP1 expression vs PARPi Sensitivity</span>
                         <div className={`flex-1 flex items-center justify-center border border-dashed rounded relative transition-colors ${isDarkMode ? 'border-zinc-900 bg-black/20' : 'border-slate-300 bg-slate-100/50'}`}>
                           <BarChart3 className={`w-12 h-12 ${isDarkMode ? 'text-zinc-800' : 'text-slate-300'}`} />
                           <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                               Spearman ρ = -0.42
                           </div>
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-6 leading-relaxed uppercase">
                           GDSC2 matched data (n=488). High-PARP1 lines show ΔZ = -0.998 shift toward sensitivity.
                        </p>
                     </div>
                     <div className={`p-8 border rounded-sm flex flex-col h-full ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
                        <span className={`text-[11px] font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Transcription Summary</span>
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black uppercase text-zinc-500">MBD4-LOF PARP1</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>7.21 TPM</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black uppercase text-zinc-500">Wild-Type PARP1</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>6.64 TPM</span>
                           </div>
                           <div className={`pt-4 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
                              <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                                Mechanism: Transcriptional BER-stress adaptation. Ho et al. falsified (RNF144A p=0.53).
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'Evo2 Essentiality' && (
                  <div className={`flex flex-col items-center justify-center h-full space-y-12 border rounded shadow-2xl transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-200'}`}>
                     <div className="relative w-64 h-64 flex items-center justify-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full" />
                        <div className="p-10 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                           <Fingerprint className="w-16 h-16 text-emerald-500" />
                        </div>
                     </div>
                     <div className="text-center space-y-4 max-w-lg mx-auto px-8">
                        <h2 className={`text-3xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Evo2 Foundation Mapping</h2>
                        <p className={`text-[12px] leading-relaxed font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                           Zero-shot variant scoring grounded in Evo2 paper §2.3. 95.8% AUROC for non-coding variants confirmed.
                        </p>
                     </div>
                  </div>
                )}
             </motion.div>
           </AnimatePresence>

           {/* Mechanism Visual Footer Section */}
           <div className={`p-6 sm:p-10 border rounded-sm flex flex-col lg:grid lg:grid-cols-3 gap-10 transition-colors ${
             isDarkMode ? 'bg-zinc-950/40 border-zinc-900 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
           }`}>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Workflow className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
                    <h3 className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Replication Fork Intercept</h3>
                 </div>
                 <p className={`text-[11px] leading-relaxed font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                    Dual Strategy: Cytidine Analogs (Frontline) + ATRi (Checkpoint). Converging on fork-stalling lesions.
                 </p>
              </div>

              <div className="space-y-4">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>MBD4 Causal Receipt</span>
                 <div className={`p-4 rounded border flex flex-col gap-2 transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-2">
                       <FileCode className="w-3.5 h-3.5 text-cyan-600" />
                       <span className={`text-[9px] font-mono ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>hewitt_npj_2024.pdf</span>
                    </div>
                    <span className={`text-[10px] font-mono font-black ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>ISOGENIC_RESCUE: GOLD_STD</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Stethoscope className={`w-4 h-4 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Patient Selection Tool</span>
                 </div>
                 <div className={`p-4 rounded border flex flex-col gap-2 transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>PARP1 Adaptive Stress</span>
                    <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>Biomarker-Only // Not SL Target</span>
                 </div>
              </div>
           </div>
        </main>
      </div>

      {/* Global Metadata Footer */}
      <footer className={`h-24 border-t mt-10 flex items-center justify-between px-12 transition-colors ${
        isDarkMode ? 'border-zinc-900 bg-black/40' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center gap-16">
           <div className="space-y-2">
              <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Mars Computational Suite v4.0.0</span>
              <div className="flex items-center gap-10">
                 <span className={`text-3xl font-extralight tracking-tighter leading-none ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>SYNTHETIC LETHALITY</span>
                 <div className={`h-8 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                 <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Claims Validated: 49+ (RUO)</span>
              </div>
           </div>
        </div>
        <div className={`flex gap-12 ${isDarkMode ? 'text-emerald-800' : 'text-indigo-300'}`}>
           <Database className="w-6 h-6 hover:text-emerald-400 transition-colors cursor-pointer" />
           <Cpu className="w-6 h-6" />
           <Scale className="w-6 h-6" />
           <Lock className="w-6 h-6" />
        </div>
      </footer>

      {/* Frame Accent Corners */}
      <div className={`absolute top-0 left-0 w-full h-full border-[15px] pointer-events-none z-[100] transition-colors ${
        isDarkMode ? 'border-[#020408]' : 'border-slate-100/50'
      }`} />
    </div>
  );
}