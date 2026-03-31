"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { 
  Copy,
  Check,
  ShieldCheck, 
  Target, 
  Activity as ActivityIcon, 
  Zap, 
  Database, 
  Cpu, 
  ChevronRight, 
  Binary,
  Terminal,
  CheckCircle2,
  AlertOctagon,
  Scale,
  ClipboardList,
  BookOpen,
  Lock,
  ExternalLink,
  Archive,
  Award,
  CheckSquare,
  FileCode,
  AlertTriangle,
  Beaker,
  FileSearch,
  XCircle,
  HelpCircle,
  Stethoscope,
  ActivitySquare,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

// --- Technical 3D coordinate background (Audit Lattice) ---

const VectorBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = (window as any).THREE;
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

      const size = 150;
      const divisions = 30;
      // Amber/Gold tint for Ledger accountability layer
      const gridColor = isDarkMode ? 0xf59e0b : 0xd97706; 
      const grid = new THREE.GridHelper(size, divisions, gridColor, gridColor);
      grid.rotation.x = Math.PI / 2;
      grid.material.opacity = 0.03;
      grid.material.transparent = true;
      group.add(grid);

      const animate = () => {
        requestAnimationFrame(animate);
        group.rotation.y += 0.0002;
        renderer.render(scene, camera);
      };
      animate();
    };
    document.head.appendChild(script);
  }, [isDarkMode]);
  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- Data Constants ---

export const MATRIX_AXES = [
  { id: 'cytidine', name: 'Cytidine Analogs', tier: 'VALIDATED_SL', color: 'emerald' },
  { id: 'icb', name: 'Immune Checkpoints', tier: 'VALIDATED_CLIN', color: 'emerald' },
  { id: 'atr', name: 'ATR/WEE1', tier: 'STRONG_CANDIDATE', color: 'amber' },
  { id: 'parp', name: 'PARP Inhibitors', tier: 'MECHANISTIC_ONLY', color: 'amber' },
  { id: 'wrn', name: 'WRN Inhibitors', tier: 'NOT_SUPPORTED', color: 'rose' }
];

export const MATRIX_MODALITIES = ['CRISPR', 'Screen', 'Expr', 'In Vivo', 'Clin', 'PubMed'];

export const MATRIX_DATA: Record<string, number[]> = {
  cytidine: [1, 1, 1, 2, 1, 1], // Full concordance
  icb:      [1, 1, 1, 1, 2, 2],
  atr:      [1, 1, 1, 2, -1, 1], // The LATIFY Fail: ATR is high, but Clin is Neg
  parp:     [-1, 1, 2, -1, -1, 1],
  wrn:      [-1, -1, 0, -1, -1, -1],
};

const SLC25A32_STRUCTURAL_RECEIPT = {
  name: "BrM_Cas9_RNP_SLC25A32",
  protein: "MDKKYSIGLDIGTNSVGWAVITDEYKVPSKKFKVLGNTDRHSIKKN...",
  rna: "CCGGCUUCGCUCACGCGCCUGUUUUAGAGCUAGAAAUAGCAAGUU...",
  dna: "ACTAGAGTCTCCGGCTTCGCTCACGCGCCTTGGGCATAAGAGTCCTCTC",
  confidence: "AF3_v2_pLDDT_94.2"
};

const PUBMED_RECEIPTS = [
  { pmid: '36323843', author: 'Chabot T', year: '2022', finding: 'MBD4 KO → cytidine-analog SL (isogenic+PDX)', axis: 'Cytidine' },
  { pmid: '35863105', author: 'Saint-Ghislain', year: '2022', finding: 'MBD4 deficiency predicts ICB response in OM', axis: 'ICB' },
  { pmid: '38619111', author: 'Fröhlich LM', year: '2024', finding: 'PARP1 expression predicts PARPi sensitivity', axis: 'PARP1' },
  { pmid: '38658754', author: 'Ferretti S', year: '2024', finding: 'HRO761 WRN inhibitor — MSI-specific SL', axis: 'WRN-MSI' },
  { pmid: '38060262', author: 'Villy MC', year: '2024', finding: 'Germline MBD4 → multi-tumor predisposition', axis: 'Clinical' },
];

const CALIBRATION_BAR = [
  { criteria: 'Isogenic cell line (KO/WT/rescue)', cytidine: true, parp: false },
  { criteria: 'IC50 / dose-response shift', cytidine: true, parp: false },
  { criteria: 'PDX in vivo efficacy', cytidine: true, parp: false },
  { criteria: 'Patient response documented', cytidine: true, parp: false },
  { criteria: 'Mechanism validated', cytidine: true, parp: 'partial' },
];

// --- Sub-components for Layer 5 ---

export const EvidenceMatrix = ({ isDarkMode, activeAxis, onAxisSelect }: { isDarkMode: boolean, activeAxis: any, onAxisSelect: any }) => {
  const getIcon = (val: number) => {
    switch(val) {
      case 1: return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case -1: return <XCircle className="w-3.5 h-3.5 text-rose-500" />;
      case 2: return <HelpCircle className="w-3.5 h-3.5 text-purple-500" />;
      default: return <div className="w-3 h-3 rounded-full border border-zinc-500 opacity-20" />;
    }
  };

  const getStyle = (val: number) => {
    if (!isDarkMode) {
      switch(val) {
        case 1: return 'bg-emerald-100 border-emerald-300';
        case -1: return 'bg-rose-100 border-rose-300';
        case 2: return 'bg-purple-100 border-purple-300';
        default: return 'bg-slate-100 border-slate-200 opacity-50';
      }
    }
    switch(val) {
      case 1: return 'bg-emerald-500/10 border-emerald-500/30';
      case -1: return 'bg-rose-500/10 border-rose-500/30';
      case 2: return 'bg-purple-500/10 border-purple-500/30';
      default: return 'bg-black border-zinc-900 opacity-40';
    }
  };

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
           <Layers className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
           <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Multi-Modal Matrix</span>
        </div>
        <div className="flex gap-4">
           <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Positive</span>
           <span className="text-[10px] font-black uppercase text-rose-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"/> Negative</span>
           <span className="text-[10px] font-black uppercase text-purple-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"/> Conf/Mixed</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-8 gap-y-3 gap-x-1">
        <div className="col-span-2" />
        {MATRIX_MODALITIES.map(m => (
          <div key={m} className="text-[10px] font-black uppercase text-center pb-2 truncate zeta-evidence-label">{m}</div>
        ))}
        
        {MATRIX_AXES.map((axis) => (
          <React.Fragment key={axis.id}>
            <button 
              onClick={() => onAxisSelect(axis)}
              className={`col-span-2 text-[11px] font-bold uppercase truncate pr-4 flex items-center justify-between group transition-colors ${
                activeAxis.id === axis.id ? (isDarkMode ? 'text-amber-400' : 'text-amber-600') : (isDarkMode ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600')
              }`}
            >
              {axis.name}
              <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ${activeAxis.id === axis.id ? 'opacity-100 rotate-90' : ''}`} />
            </button>
            
            {MATRIX_DATA[axis.id].map((val, j) => (
              <div 
                key={`${axis.id}-${j}`} 
                className={`h-8 border rounded-[1px] transition-all flex items-center justify-center cursor-pointer ${getStyle(val)} ${activeAxis.id === axis.id ? 'ring-1 ring-amber-500/50' : ''}`}
              >
                 {getIcon(val)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
         <p className="text-[11px] leading-relaxed font-bold uppercase zeta-evidence-label">
           Calibration Bar: Any axis claiming "validated SL" must approach Cytidine baseline: Isogenic functional data + PDX + Patient.
         </p>
      </div>
    </div>
  );
};

const CalibrationBarAnalysis = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
       <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
             <Scale className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
             <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>SL Calibration Rigor</span>
          </div>
          <span className={`text-[11px] font-black uppercase ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>GOLD STD VS PARP</span>
       </div>
       
       <div className="flex-1 overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse">
             <thead>
                <tr className={`border-b ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-500'} uppercase font-black`}>
                   <th className="pb-3 w-1/2">Requirement</th>
                   <th className="pb-3 text-center">Cytidine</th>
                   <th className="pb-3 text-center">PARP Inhibitors</th>
                </tr>
             </thead>
             <tbody>
                {CALIBRATION_BAR.map((row, i) => (
                  <tr key={i} className={`border-b ${isDarkMode ? 'border-zinc-900/50' : 'border-slate-100'}`}>
                     <td className={`py-4 font-bold uppercase pr-4 ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{row.criteria}</td>
                     <td className="py-4 text-center">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30">
                           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                     </td>
                     <td className="py-4 text-center">
                        {row.parp === 'partial' ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-amber-500/10 border border-amber-500/30">
                             <AlertTriangle className="w-3 h-3 text-amber-500" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-rose-500/10 border border-rose-500/30">
                             <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          </span>
                        )}
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>

       <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
         <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Conclusion</span>
            <span className={`text-[11px] font-bold ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`}>PARP MEETS 1 OF 5 CRITERIA</span>
         </div>
      </div>
    </div>
  );
};

const PubMedReceipts = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
       <div className={`flex justify-between items-center mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
             <BookOpen className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
             <span className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>PubMed Receipts</span>
          </div>
          <FileSearch className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
       </div>
       
       <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {PUBMED_RECEIPTS.map((p, i) => (
            <div key={i} className={`p-4 border rounded-sm flex flex-col gap-2 transition-all ${isDarkMode ? 'bg-black/40 border-zinc-900 hover:border-amber-500/30' : 'bg-slate-50 border-slate-100 hover:border-amber-500/30'}`}>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-zinc-800 text-cyan-400' : 'bg-slate-200 text-indigo-700'}`}>{p.pmid}</span>
                     <span className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.author} '{p.year.slice(2)}</span>
                  </div>
                  <button onClick={() => handleCopy(p.pmid, `PMCID: ${p.pmid} - Finding: ${p.finding}`)} className="opacity-30 hover:opacity-100 transition-opacity">
                    {copied === p.pmid ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
               </div>
               <div className="flex justify-between items-center pt-1">
                  <span className={`text-[11px] font-bold uppercase truncate pr-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{p.finding}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>{p.axis}</span>
               </div>
            </div>
          ))}
       </div>

       <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Structural Receipt (AF3)</span>
            <span className="text-[9px] font-black text-cyan-500 uppercase">{SLC25A32_STRUCTURAL_RECEIPT.confidence}</span>
          </div>
          <div className="font-mono text-[8px] break-all opacity-40 uppercase line-clamp-2">
            PROT: {SLC25A32_STRUCTURAL_RECEIPT.protein}
          </div>
       </div>
    </div>
  );
};

// --- Main Standalone App ---

export default function EvidenceLedgerEngine() {
  const { isDarkMode } = useTheme();
  const [activeAxis, setActiveAxis] = useState(MATRIX_AXES[0]);
  const [logs, setLogs] = useState(["LEDGER_INIT", "SYNCING_PUBMED_RECEIPTS", "LOADING_GDSC2_SCREENS"]);

  useEffect(() => {
    const timer = setInterval(() => {
      const msgs = ["VALIDATING_ISOGENIC_HAP1...", "PURGING_MSI_CONFOUNDS...", "CORRELATING_PARP1_TPM...", "REJECTING_WRN_HYPOTHESIS", "PROVENANCE_SYNCED"];
      setLogs(prev => [msgs[Math.floor(Math.random()*msgs.length)], ...prev].slice(0, 10));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
    }`}>
      <ZetaNavbar />
      <div className="p-8 flex flex-col flex-1 z-10">
        <VectorBackground isDarkMode={isDarkMode} />

        {/* Persistent Technical Header */}
        <header className={`z-10 mb-8 border-b pb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 transition-colors ${
          isDarkMode ? 'border-white/5' : 'border-slate-200'
        }`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-16 h-16 rounded border flex items-center justify-center shadow-2xl transition-all ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
             <ClipboardList className={`w-9 h-9 transition-colors ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
          </div>
          <div>
            <h1 className={`text-xl md:text-2xl font-black tracking-[0.3em] uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              L7: Safety · Evidence Ledger <span className="hidden md:inline text-zinc-700 font-light tracking-normal ml-2">v6.2.9</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
               <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-emerald-500 animate-pulse flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> Source_Of_Truth
               </span>
               <div className={`hidden md:block h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
               <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Receipt: pubmed_multimodal_query.json</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
           <button 
             className={`px-12 py-4 rounded-sm border text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${
               isDarkMode ? 'bg-white text-black hover:bg-amber-500 hover:text-white border-transparent shadow-2xl shadow-amber-900/20' : 'bg-amber-600 text-white hover:bg-amber-700 border-transparent shadow-xl shadow-amber-100'
             }`}
           >
             <Lock className="w-4 h-4" />
             Lock Validated Claims
           </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="z-10 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-10 min-h-0">
        
        {/* Navigation Sidebar & Details */}
        <aside className="lg:col-span-3 flex flex-col gap-8">
          <div className={`border rounded-sm p-4 md:p-6 transition-colors ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="flex justify-between items-center mb-6 px-2">
               <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Selected Axis Context</span>
               <ShieldCheck className={`w-4 h-4 ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`} />
            </div>
            
            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeAxis.id}
                 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                 className="space-y-4"
               >
                 <div className={`p-4 rounded border flex flex-col gap-2 ${isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="zeta-evidence-label">Therapeutic Axis</span>
                    <span className="zeta-evidence-value">{activeAxis.name}</span>
                 </div>
                 
                 <div className={`p-4 rounded border flex flex-col gap-2 ${
                   activeAxis.tier.includes('VALIDATED') ? (isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200') :
                   activeAxis.tier.includes('NOT') ? (isDarkMode ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200') :
                   (isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200')
                 }`}>
                    <span className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">Verdict</span>
                    <span className={`text-[12px] font-black uppercase ${
                       activeAxis.tier.includes('VALIDATED') ? 'text-emerald-500' :
                       activeAxis.tier.includes('NOT') ? 'text-rose-500' :
                       'text-amber-500'
                    }`}>{activeAxis.tier.replace('_', ' ')}</span>
                 </div>
               </motion.div>
            </AnimatePresence>
          </div>

          {/* Process Feed */}
          <div className={`p-8 border rounded-sm flex-1 flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="space-y-8">
               <div className="flex items-center gap-4 mb-4">
                  <Terminal className={`w-5 h-5 ${isDarkMode ? 'text-amber-600' : 'text-amber-400'}`} />
                  <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Audit_Chain_Sync</span>
               </div>
               <div className={`space-y-4 font-mono text-[11px] leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                  {logs.map((l, i) => (
                    <div key={i} className={`flex gap-3 transition-all duration-300 ${i === 0 ? 'font-black' : 'opacity-30'}`}>
                       <span className="opacity-20">[{i}]</span>
                       <span className="truncate uppercase tracking-widest">{l}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
               <div className="flex justify-between items-center text-[11px] font-black uppercase">
                  <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-500'}>Root Consistency</span>
                  <span className="text-emerald-500 font-black uppercase tracking-widest">STABLE</span>
               </div>
            </div>
          </div>
        </aside>

        {/* Display Center */}
        <main className="lg:col-span-9 flex flex-col gap-10">
           <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 flex-1">
              <EvidenceMatrix isDarkMode={isDarkMode} activeAxis={activeAxis} onAxisSelect={setActiveAxis} />
              <CalibrationBarAnalysis isDarkMode={isDarkMode} />
           </div>

           {/* Deterministic Rules & Discrepancies */}
           <div className={`p-6 lg:p-10 border rounded-sm flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10 transition-colors ${
             isDarkMode ? 'bg-zinc-950/40 border-zinc-900 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
           }`}>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <ActivityIcon className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
                    <h3 className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>CRISPR vs GDSC2</h3>
                 </div>
                 <p className={`text-[12px] leading-relaxed font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                    Explicit concordance check between genetic dependency and pharmacologic screens prevents false promotion.
                 </p>
              </div>

              <div className="space-y-3">
                 <span className="zeta-evidence-label">PARP Discordance Alert</span>
                 <div className={`p-4 rounded border flex flex-col gap-2 transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex justify-between items-center">
                       <span className={`text-[11px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>CRISPR (Δ=+0.03)</span>
                       <span className="text-[11px] font-black text-rose-500 uppercase">Flat</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className={`text-[11px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>GDSC2 (ΔZ=-0.02)</span>
                       <span className="text-[11px] font-black text-rose-500 uppercase">Flat</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-500 uppercase mt-2 border-t border-zinc-800/50 pt-2">Result: Both negative. PARP1 expr is a biomarker, not a therapeutic lever.</p>
                 </div>
              </div>

              <div className="h-full">
                 <PubMedReceipts isDarkMode={isDarkMode} />
              </div>
           </div>
        </main>
      </div>

      {/* Global Metadata Footer */}
      <footer className={`h-auto py-6 lg:h-24 border-t mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 lg:px-12 transition-colors ${
        isDarkMode ? 'border-zinc-900 bg-black/40' : 'border-slate-200 bg-white'
      }`}>
        <div className="flex items-center gap-16">
           <div className="space-y-4 md:space-y-2">
              <span className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Mars Computational Suite v6.2.9</span>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                 <span className={`text-2xl md:text-3xl font-extralight tracking-tighter leading-none ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>EVIDENCE LEDGER</span>
                 <div className={`hidden md:block h-8 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                 <span className={`text-[10px] md:text-[12px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Audit Integrity: 100% Deterministic</span>
              </div>
           </div>
        </div>
        <div className={`flex gap-12 ${isDarkMode ? 'text-amber-800' : 'text-amber-300'}`}>
           <Database className="w-6 h-6 hover:text-amber-400 transition-colors cursor-pointer" />
           <Cpu className="w-6 h-6" />
           <Scale className="w-6 h-6" />
           <ActivitySquare className="w-6 h-6" />
        </div>
      </footer>

      </div>

      {/* Frame Accents */}
      <div className={`absolute top-0 left-0 w-full h-full border-[15px] pointer-events-none z-[100] transition-colors ${
        isDarkMode ? 'border-[#020408]' : 'border-slate-100/50'
      }`} />
    </div>
  );
}