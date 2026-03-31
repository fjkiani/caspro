import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Search, 
  Layers, 
  Share2, 
  FileText, 
  Image as ImageIcon, 
  Dna,
  Link as LinkIcon,
  ChevronRight,
  Crosshair,
  Maximize2,
  AlertOctagon,
  Combine,
  CheckCircle2,
  Scale,
  FlaskConical,
  Boxes,
  ArrowRight,
  Target
} from 'lucide-react';

// --- Technical Background (Neural Node Lattice) ---

const EvidenceBackground = ({ isSynthesizing = false, isDarkMode = true }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = window.THREE;
      if (!mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);
      camera.position.z = 100;

      const group = new THREE.Group();
      scene.add(group);

      const nodeCount = 60;
      const geometry = new THREE.SphereGeometry(0.4, 8, 8);
      const nodeColor = isDarkMode ? 0x22d3ee : 0x4f46e5;
      const material = new THREE.MeshBasicMaterial({ color: nodeColor, transparent: true, opacity: isDarkMode ? 0.3 : 0.15 });
      
      const nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
        mesh.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05);
        group.add(mesh);
        nodes.push(mesh);
      }

      const animate = () => {
        requestAnimationFrame(animate);
        const speedMultiplier = isSynthesizing ? 12 : 1;
        group.rotation.y += 0.0005 * speedMultiplier;
        nodes.forEach(n => {
          n.position.add(n.velocity.clone().multiplyScalar(speedMultiplier));
          if (Math.abs(n.position.x) > 80) n.velocity.x *= -1;
          if (Math.abs(n.position.y) > 60) n.velocity.y *= -1;
        });
        renderer.render(scene, camera);
      };
      animate();
    };
    document.head.appendChild(script);
  }, [isSynthesizing, isDarkMode]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- Sub-components ---

const PipelineNode = ({ step, currentStep, label, subtext, isDarkMode }) => {
  const isActive = currentStep >= step;
  const isCurrent = currentStep === step;
  
  return (
    <div className={`relative flex flex-col items-center justify-center p-3 border rounded transition-all duration-500 ${
      isActive 
      ? (isDarkMode ? 'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-indigo-50 border-indigo-400 shadow-lg')
      : (isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-100')
    }`}>
      {isCurrent && (
        <motion.div 
          layoutId="glow"
          className={`absolute inset-0 rounded border-2 z-10 ${isDarkMode ? 'border-cyan-400' : 'border-indigo-600'}`}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}
      <span className={`text-[8px] font-black uppercase mb-1 ${isActive ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : 'text-zinc-700'}`}>
        Step {step}
      </span>
      <span className={`text-[9px] font-black text-center leading-tight ${isActive ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-zinc-600'}`}>
        {label}
      </span>
      {subtext && (
        <span className="text-[7px] font-bold text-zinc-500 uppercase mt-1 opacity-60">
          ({subtext})
        </span>
      )}
    </div>
  );
};

const StructuredEvidenceMatrix = ({ isDarkMode }) => (
  <div className={`p-6 border rounded-sm transition-colors duration-500 flex-1 flex flex-col ${
    isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-xl'
  }`}>
    <div className={`flex justify-between items-center mb-6 pb-3 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
       <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Confidence Ranking Matrix</span>
       <Scale className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}`} />
    </div>
    <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
       {[
         { modality: 'Genomic Loss', score: 0.942, doctrine: 'High-Fidelity', status: 'LOCKED' },
         { modality: 'Transcriptomic Shift', score: 0.821, doctrine: 'Governed', status: 'SYNCED' },
         { modality: 'RWD Mortality Correlation', score: 0.755, doctrine: 'Governed', status: 'VALIDATING' },
         { modality: 'Pharmacological Delta', score: 0.887, doctrine: 'Stress-Tested', status: 'LOCKED' }
       ].map((cell, idx) => (
         <div key={idx} className={`p-4 border rounded-sm flex items-center justify-between group transition-all ${
           isDarkMode ? 'bg-zinc-900/50 border-zinc-800 hover:border-cyan-500/30' : 'bg-slate-50 border-slate-100 hover:border-indigo-500/30'
         }`}>
            <div className="space-y-1">
               <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{cell.modality}</span>
               <div className="flex gap-4">
                  <span className={`text-[8px] font-black uppercase ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`}>Doctrine: {cell.doctrine}</span>
               </div>
            </div>
            <div className="text-right">
               <span className={`text-sm font-mono font-bold ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{cell.score}</span>
               <div className={`text-[7px] font-black mt-1 ${cell.status === 'LOCKED' ? 'text-emerald-500' : 'text-amber-500'}`}>{cell.status}</div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

// --- Main Platform Interface ---

export default function EvidenceSynthesisEngine() {
  const { isDarkMode } = useTheme();
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState(["ENGINE_STANDBY", "HYPOTHESIS_INPUT: MBD4_LOF", "DOCTRINE_AUTH_READY"]);

  const workflowSteps = useMemo(() => [
    "INSTANTIATING 7D VULNERABILITY AXES...",
    "QUERYING DepMap CHRONOS (CRISPR FILL)...",
    "STRATIFYING PRISM+GDSC (PHARMA FILL)...",
    "FETCHING FROZEN VALIDATED RECEIPTS...",
    "CALCULATING RS SCORE + MODALITY WEIGHTS...",
    "ASSESSING PATHWAY CONVERGENCE...",
    "RESOLVING MSI/CO-MUT CONFOUNDS...",
    "GENERATING AGREEMENT REPORT..."
  ], []);

  const startSynthesis = () => {
    if (isSynthesizing) return;
    setIsSynthesizing(true);
    setActiveStep(0);
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < workflowSteps.length) {
        setLogs(prev => [`[PIPELINE] ${workflowSteps[current]}`, ...prev].slice(0, 12));
        setActiveStep(current + 1);
        current++;
      } else {
        clearInterval(interval);
        setIsSynthesizing(false);
        setLogs(prev => ["VERDICT: MBD4 HYPOTHESIS VALIDATED // PFS GAIN +240d", ...prev]);
      }
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono selection:bg-cyan-500/30 p-8 overflow-hidden flex flex-col relative ${
      isDarkMode ? 'bg-[#05070a] text-zinc-400' : 'bg-[#f8fafc] text-slate-600'
    }`}>
      <EvidenceBackground isSynthesizing={isSynthesizing} isDarkMode={isDarkMode} />

      {/* Global Header */}
      <header className={`z-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 border-b pb-6 transition-colors duration-500 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className={`w-14 h-14 rounded border flex shrink-0 items-center justify-center shadow-lg transition-all duration-500 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
             <Combine className={`w-7 h-7 transition-colors ${
               isSynthesizing ? (isDarkMode ? 'text-white animate-pulse' : 'text-indigo-600 animate-pulse') : (isDarkMode ? 'text-cyan-500' : 'text-indigo-500')
             }`} />
          </div>
          <div>
            <h1 className={`text-lg font-black tracking-[0.4em] uppercase mb-1 leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>MARS Engine 01 // Synthesis</h1>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-cyan-900/10 border border-cyan-500/20">
                  <Target className="w-3 h-3 text-cyan-500" />
                  <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Input: MBD4 (LoF)</span>
               </div>
               <div className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-widest italic ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Ovarian_Carcinoma_RS</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
           <button 
             onClick={startSynthesis}
             disabled={isSynthesizing}
             className={`px-10 py-3.5 rounded border text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${
               isSynthesizing 
               ? (isDarkMode ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-indigo-500/20 border-indigo-500 text-indigo-600') 
               : (isDarkMode ? 'bg-white text-black hover:bg-cyan-500 border-transparent' : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-xl')
             }`}
           >
             {isSynthesizing ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
             {isSynthesizing ? 'Executing Matrix...' : 'Run Evidence Sync'}
           </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="z-10 flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-8 min-h-0">
        
        {/* Left: Synthesis Manifold (Traversing Logic) */}
        <div className={`xl:col-span-8 flex flex-col border rounded-sm p-4 sm:p-8 shadow-2xl relative group overflow-hidden transition-colors duration-500 ${
          isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white/90 border-slate-200 shadow-indigo-100'
        }`}>
           <div className={`flex justify-between items-center mb-6 pb-6 border-b transition-colors duration-500 ${isDarkMode ? 'border-zinc-900/50' : 'border-slate-100'}`}>
              <div className="flex flex-col">
                 <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>Synthetic Evidence Manifold</span>
                 <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 italic ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Target: MBD4 | Mutation: Loss-of-Function | Type: HGSOC</span>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6 items-center mt-4 sm:mt-0">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`} /> 
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>Validated</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <AlertOctagon className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} /> 
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>MSI Confound Resolved</span>
                 </div>
              </div>
           </div>

           <div className="flex-1 relative cursor-crosshair">
              {/* Manifold SVG Traversal */}
              <svg className="w-full h-full">
                 <motion.line initial={{ opacity: 0.1 }} animate={{ opacity: activeStep >= 5 ? 1 : 0.1 }} x1="150" y1="150" x2="350" y2="250" stroke={isDarkMode ? "#22d3ee" : "#4f46e5"} strokeWidth="2" strokeDasharray="5,5" />
                 <motion.line initial={{ opacity: 0.1 }} animate={{ opacity: activeStep >= 6 ? 1 : 0.1 }} x1="450" y1="120" x2="350" y2="250" stroke={isDarkMode ? "#22d3ee" : "#4f46e5"} strokeWidth="2" strokeDasharray="5,5" />
                 
                 {[
                   { id: 'n1', label: 'MBD4 LOSS', type: 'input', x: 150, y: 150 },
                   { id: 'n2', label: 'MSI-H Conf', type: 'confound', x: 450, y: 120 },
                   { id: 'n3', label: 'Synthetic Lethality', type: 'output', x: 350, y: 250 },
                   { id: 'n4', label: 'DOXORUBICIN', type: 'pharma', x: 120, y: 350 },
                 ].map(n => (
                   <g key={n.id}>
                      <circle 
                        cx={n.x} cy={n.y} r={n.type === 'output' ? 10 : 5}
                        fill={n.type === 'input' ? (isDarkMode ? '#22d3ee' : '#4f46e5') : 'none'}
                        stroke={n.type === 'confound' ? '#f43f5e' : (isDarkMode ? '#475569' : '#94a3b8')}
                        strokeWidth="1.5"
                      />
                      <text x={n.x + 15} y={n.y + 4} fill={isDarkMode ? '#fff' : '#1e1b4b'} fontSize="9" fontWeight="black" className="uppercase tracking-widest opacity-60">{n.label}</text>
                   </g>
                 ))}
              </svg>

              {/* Data Bubble Annotations */}
              <div className="absolute top-[5%] right-[5%] text-right pointer-events-none space-y-4">
                 <div className={`p-4 border rounded shadow-xl ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'}`}>
                    <span className={`text-[8px] font-black uppercase block mb-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Confound Analysis</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Co-occurring TP53 Locked</span>
                 </div>
              </div>

              {/* Tactical Scope Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none ${isDarkMode ? 'text-cyan-400' : 'text-indigo-400'}`}>
                 <div className="w-full h-full border border-current rounded-full" />
                 <div className="absolute w-px h-full bg-current" />
                 <div className="absolute h-px w-full bg-current" />
              </div>
           </div>
        </div>

        {/* Right Sidebar: Evidence Matrix & New Pipeline Diagram */}
        <div className="col-span-4 flex flex-col gap-6">
           
           {/* Step 1: Structured Evidence Matrix */}
           <StructuredEvidenceMatrix isDarkMode={isDarkMode} />

           {/* Step 2: Multi-modal Evidence Matrix Pipeline (The Diagram) */}
           <div className={`flex-1 border rounded-sm p-6 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
             isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-xl shadow-indigo-100/20'
           }`}>
              <div className={`flex justify-between items-center mb-4 border-b pb-3 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                 <div className="flex items-center gap-2">
                    <Boxes className={`w-4 h-4 ${isDarkMode ? 'text-cyan-700' : 'text-indigo-500'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Matrix Pipeline</span>
                 </div>
              </div>

              {/* Graphical Pipeline Steps */}
              <div className="overflow-x-auto pb-4">
                 <div className="grid grid-cols-3 gap-2 relative min-w-[500px]">
                    <PipelineNode step={1} currentStep={activeStep} label="Axis Init" subtext="6 Std + Cust" isDarkMode={isDarkMode} />
                    <PipelineNode step={2} currentStep={activeStep} label="CRISPR Fill" subtext="Chronos" isDarkMode={isDarkMode} />
                    <PipelineNode step={3} currentStep={activeStep} label="Pharma Fill" subtext="Stratified" isDarkMode={isDarkMode} />
                    
                    <div className="col-span-3 flex justify-center py-1 opacity-20"><ArrowRight className="w-3 h-3 rotate-90" /></div>
                    
                    <PipelineNode step={4} currentStep={activeStep} label="Lit Receipts" subtext="Frozen Data" isDarkMode={isDarkMode} />
                    <PipelineNode step={5} currentStep={activeStep} label="RS Score" subtext="Mod Weights" isDarkMode={isDarkMode} />
                    <PipelineNode step={8} currentStep={activeStep} label="Combinatorial" subtext="Convergence" isDarkMode={isDarkMode} />
                 </div>
              </div>

              {/* Output Readout */}
              <div className={`mt-6 p-3 border rounded-sm transition-all duration-700 ${
                activeStep >= 8 
                ? (isDarkMode ? 'bg-cyan-900/10 border-cyan-500/30' : 'bg-emerald-50 border-emerald-400/30 shadow-lg shadow-emerald-500/5') 
                : (isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-100')
              }`}>
                 <div className="flex justify-between items-start mb-2">
                    <span className={`text-[8px] font-black uppercase ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Pipeline Output</span>
                    <Terminal className="w-2.5 h-2.5 opacity-40" />
                 </div>
                 <p className={`text-[9px] font-bold uppercase leading-relaxed ${activeStep >= 8 ? (isDarkMode ? 'text-cyan-400' : 'text-emerald-700') : 'text-zinc-700'}`}>
                    {activeStep >= 8 
                      ? 'EvidenceMatrix: Agreement Locked // Recommendation generated.' 
                      : 'Awaiting Pipeline Completion...'}
                 </p>
              </div>

              {/* Step Logs (Small Feed) */}
              <div className="mt-4 flex-1 overflow-hidden font-mono text-[8px] opacity-40 space-y-1">
                 {logs.slice(0, 3).map((l, i) => (
                    <div key={i} className="truncate tracking-tighter transition-all">{l}</div>
                 ))}
              </div>
           </div>
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className={`h-16 border-t mt-8 flex items-center justify-between px-10 pointer-events-none opacity-40 transition-colors duration-500 ${
        isDarkMode ? 'border-zinc-900' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-12">
           <div className="space-y-1">
              <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Systematic Pharmacological Stratification</span>
              <div className="flex items-center gap-6">
                 <span className={`text-xl font-light tracking-tighter leading-none ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>MARS SYNC</span>
                 <div className={`h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Latency: 0.042ms</span>
              </div>
           </div>
        </div>
        <div className={`flex gap-10 ${isDarkMode ? 'text-cyan-700' : 'text-indigo-400'}`}>
           <Database className="w-4 h-4" />
           <Cpu className="w-4 h-4" />
           <ShieldCheck className="w-4 h-4" />
           <FlaskConical className="w-4 h-4" />
        </div>
      </footer>

      {/* Frame Accent */}
      <div className={`absolute top-0 left-0 w-full h-full border-[10px] pointer-events-none z-[100] transition-colors duration-500 ${
        isDarkMode ? 'border-[#020408]' : 'border-slate-50'
      }`} />
    </div>
  );
}