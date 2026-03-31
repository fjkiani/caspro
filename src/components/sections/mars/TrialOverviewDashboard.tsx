'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  AlertTriangle, 
  Settings, 
  ChevronRight,
  Zap,
  Microscope,
  Database,
  Target,
  Terminal,
  Cpu,
  BarChart3,
  ShieldCheck,
  Shield,
  User
} from 'lucide-react';
import { TRIAL_DASHBOARD_TEXTS } from '@/data/trial-overview';

// --- Configuration & Global Mock Data ---
const GENES = ["KRAS", "BRCA1", "TP53", "EGFR", "CDK4", "PIK3CA", "MET", "RET", "ALK", "NTRK1"];

const generatePatientData = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const id = `P-${(8128 + i).toString().padStart(4, '0')}`;
    const scores = GENES.reduce((acc, gene) => {
      let val: number;
      if (gene === 'KRAS') val = (Math.random() > 0.3 ? 0.887 : 0.124);
      else if (gene === 'TP53') val = 0.991;
      else val = parseFloat((Math.random() * 2 - 1).toFixed(3));
      acc[gene] = val;
      return acc;
    }, {} as Record<string, number>);
    return { id, ...scores } as Record<string, any>;
  });
};

const COHORT_DATA = generatePatientData(25);

const RADAR_DATA = [
  { subject: 'EFFLUX AXIS', A: 45, B: 80 },
  { subject: 'METABOLIC SHIFT', A: 65, B: 75 },
  { subject: 'APOPTOSIS EVASION', A: 55, B: 65 },
  { subject: 'GENOMIC INSTABILITY', A: 85, B: 90 },
  { subject: 'STEMNESS', A: 40, B: 70 },
  { subject: 'DRUG INACTIVATION', A: 50, B: 85 },
  { subject: 'REPLICATION STRESS', A: 95, B: 95 },
  { subject: 'CELL CYCLE CHECKPOINT', A: 35, B: 60 },
];

const SCATTER_DATA_STABLE = Array.from({ length: 40 }, () => ({
  x: Math.random() * 0.5 + 0.1,
  y: Math.random() * 0.6 + 0.3,
}));

const SCATTER_DATA_FUTILE = Array.from({ length: 25 }, () => ({
  x: Math.random() * 0.2 + 0.7,
  y: Math.random() * 0.3 + 0.1,
}));

const STEP_BOUNDARY = [
  { x: 0, y: 0.5 }, { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.4 }, { x: 0.5, y: 0.4 },
  { x: 0.5, y: 0.35 }, { x: 0.6, y: 0.35 }, { x: 0.6, y: 0.25 }, { x: 0.65, y: 0.25 }, { x: 0.65, y: 0 },
];

export interface TrialOverviewProps {
  trialId?: string;
  tumorType?: string;
  relapseProbability?: number;
  expectedCalibrationError?: number;
}

// --- Sub-Components ---
const RiskBenefitGate = () => (
  <div className="flex flex-col h-full font-mono">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">ENGINE 04 // IO RISK-BENEFIT GATE</h3>
        <p className="text-[9px] text-cyan-500 font-bold italic mt-1">
          Net Clinical Benefit = (p<sub className="text-[7px]">resp</sub> × Benefit) - (Risk<sub className="text-[7px]">tox</sub> × Toxicity<sub className="text-[7px]">cost</sub>)
        </p>
      </div>
      <div className="text-right">
        <span className="text-sm font-black text-cyan-400 tracking-tighter">AUC 0.822</span>
      </div>
    </div>
    <div className="flex-1 relative min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
          <XAxis type="number" dataKey="x" domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#475569" fontSize={9} label={{ value: 'Toxicity Risk', position: 'bottom', fill: '#64748b', fontSize: 10, offset: 20 }} />
          <YAxis type="number" dataKey="y" domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#475569" fontSize={9} label={{ value: 'Response Probability', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
          <Scatter data={STEP_BOUNDARY} line={{ stroke: '#22d3ee', strokeWidth: 1.5 }} shape={<></>} />
          <Scatter name="Stable" data={SCATTER_DATA_STABLE} fill="#475569" opacity={0.6} />
          <Scatter name="Futile" data={SCATTER_DATA_FUTILE} fill="#f43f5e" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="absolute right-[10%] bottom-[20%] pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-12 h-[1px] bg-zinc-700" />
          <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">
            RULE OUT:<br /><span className="text-red-500">FUTILE TOXICITY</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResistanceMatrix = () => (
  <div className="flex flex-col h-full items-center justify-center relative font-mono">
    <h3 className="text-[11px] font-black text-zinc-100 uppercase tracking-[0.4em] mb-12">Cancer 'Kill Chain' Resistance Matrix</h3>
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Baseline" dataKey="A" stroke="#0891b2" fill="#0891b2" fillOpacity={0.1} />
          <Radar name="Patient" dataKey="B" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute left-[33%] top-[45%] z-10"
    >
      <div className="w-6 h-6 bg-rose-500/20 border border-rose-500 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)]">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
      </div>
    </motion.div>
  </div>
);

// --- Main Platform Component ---
export const TrialOverviewDashboard: React.FC<TrialOverviewProps> = ({
  trialId = 'NeoPembrOV',
  tumorType = 'Binding_Site_Mutation',
  relapseProbability = 4.2,
  expectedCalibrationError = 0.042
}) => {
  const [activeTab, setActiveTab] = useState('SIMULATION');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#05070a] text-zinc-400 font-mono selection:bg-cyan-500/30 flex flex-col items-center">
      {/* Container wrapper matching normal wide bounds */}
      <div className="w-full max-w-[1800px] border border-zinc-900 rounded-sm shadow-2xl overflow-hidden my-24 flex flex-col">
        
        {/* Top Restricted Navbar */}
        <nav className="flex items-center justify-between px-8 py-3 border-b border-zinc-900 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-cyan-400">
              <Shield className="w-5 h-5 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-zinc-100">
                {TRIAL_DASHBOARD_TEXTS.navbar.brandName} <span className="text-cyan-500 font-light">{TRIAL_DASHBOARD_TEXTS.navbar.brandSuffix}</span>
              </span>
            </div>
            <div className="flex gap-8">
              {TRIAL_DASHBOARD_TEXTS.navbar.tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] font-bold tracking-[0.2em] transition-all relative py-1 ${
                    activeTab === tab ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="nav-underline" className="absolute -bottom-3 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
             <div className="flex items-center gap-2 mr-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-[9px] font-bold uppercase text-zinc-300 tracking-widest">{TRIAL_DASHBOARD_TEXTS.navbar.nodeStatus}</span>
             </div>
             <Settings className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
             <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors">
                <User className="w-4 h-4 text-zinc-300" />
             </div>
          </div>
        </nav>

        {/* Dashboard Body */}
        <div className="flex-1 p-8 grid grid-cols-12 gap-8 w-full bg-black/40">
          
          {/* Left Sidebar Context */}
          <div className="col-span-12 xl:col-span-2 space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-zinc-900/40 border-b border-zinc-900 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Navigation</div>
              <div className="p-2 space-y-1">
                {[
                  { label: 'Model Overview', active: true },
                  { label: 'Treatment History', active: false },
                  { label: 'Resistance Delta', active: false },
                  { label: 'System Alerts', active: false }
                ].map(m => (
                  <button 
                    key={m.label} 
                    className={`w-full text-left px-3 py-2.5 text-[10px] uppercase font-bold tracking-widest transition-all rounded-sm ${
                      m.active ? 'bg-cyan-500/5 text-cyan-400 border-l border-cyan-500/30' : 'text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-cyan-950/5 border border-cyan-900/10 rounded space-y-4">
               <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Cohort Analysis</h4>
               <div className="flex justify-between items-end">
                  <span className="text-[8px] text-zinc-500 uppercase">Relapse Probability</span>
                  <span className="text-base font-black text-rose-500 leading-none">{relapseProbability}%</span>
               </div>
               <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" style={{ width: `${relapseProbability}%`}} />
               </div>
               <p className="text-[9px] text-zinc-600 leading-relaxed uppercase italic">
                  Critical trajectory detected toward {tumorType.replace('_', ' ')}.
               </p>
            </div>
          </div>

          {/* Central Display Area */}
          <div className="col-span-12 xl:col-span-10 h-full overflow-y-auto pr-2 scrollbar-hide">
            <AnimatePresence mode="wait">
              
              {/* --- TAB: PATIENT DATA --- */}
              {activeTab === 'PATIENT DATA' && (
                <motion.div 
                  key="patient-data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-sm shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                       <Terminal className="w-5 h-5 text-cyan-500" />
                       <h2 className="text-xs font-black uppercase tracking-[0.5em] text-white">Genomic Stream Processing</h2>
                    </div>
                    {/* Grid Header */}
                    <div className="grid grid-cols-[140px_repeat(10,1fr)_40px] gap-2 mb-8 border-b border-zinc-900 pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                      <div className="pl-4">Cohort_ID</div>
                      {GENES.map(g => <div key={g} className="text-center">{g}</div>)}
                      <div className="text-center">...</div>
                    </div>
                    {/* Grid Body */}
                    <div className="space-y-[2px]">
                      {COHORT_DATA.map((row) => (
                        <div 
                          key={row.id} 
                          onMouseEnter={() => setHoveredRow(row.id as string)} onMouseLeave={() => setHoveredRow(null)}
                          className={`grid grid-cols-[140px_repeat(10,1fr)_40px] gap-2 py-2 items-center border-l-2 transition-all cursor-crosshair ${
                            hoveredRow === row.id ? 'bg-cyan-500/5 border-cyan-500 text-cyan-100' : 'border-transparent text-zinc-600'
                          }`}
                        >
                          <div className="text-[12px] font-mono pl-4">{row.id}</div>
                          {GENES.map(gene => (
                            <div key={gene} className={`text-[12px] text-center font-mono ${(row[gene as keyof typeof row] as number) > 0.8 ? 'text-cyan-400 font-bold' : ''}`}>
                              {(row[gene as keyof typeof row] as number).toFixed(3)}
                            </div>
                          ))}
                          <div className="flex justify-center opacity-20"><ChevronRight className="w-4 h-4"/></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- TAB: SIMULATION --- */}
              {activeTab === 'SIMULATION' && (
                <motion.div 
                  key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Panel: I/O Risk-Benefit Gate */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-10 shadow-[inset_0_0_60px_rgba(6,182,212,0.03)] flex flex-col min-h-[500px]">
                    <RiskBenefitGate />
                  </div>
                  
                  {/* Panel: Resistance Matrix */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-10 flex flex-col justify-center shadow-2xl min-h-[500px]">
                    <ResistanceMatrix />
                  </div>

                  {/* Dashboard Stats Panel */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 flex flex-col justify-between">
                     <div>
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8 border-b border-zinc-900 pb-3">Pathway Activation Scores</h4>
                        <div className="space-y-6">
                          {[
                            { label: 'PI3K/AKT/MTOR', val: '9.1', color: 'text-rose-500' },
                            { label: 'WNT/BETA-CATENIN', val: '4.8', color: 'text-zinc-400' },
                            { label: 'P53/DNA-REPAIR', val: '2.3', color: 'text-zinc-500' },
                            { label: 'CDK4/CELL-CYCLE', val: '7.2', color: 'text-cyan-600' }
                          ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center text-[11px] font-black tracking-widest uppercase">
                               <span className="text-zinc-600">{stat.label}</span>
                               <span className={stat.color}>{stat.val}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>
                  
                  {/* Dashboard Recommendations Panel */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Microscope className="w-16 h-16 text-cyan-500" />
                     </div>
                     <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-3">Treatment Recommendations</h4>
                     <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded">
                        <p className="text-[12px] text-rose-500 font-black uppercase mb-2">Critical Resistance Detected</p>
                        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold">
                           Resistance probability in Alkylating Agents: 78.4%. Immediate strategy pivot required.
                        </p>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] uppercase font-black">
                           <span className="text-zinc-600">Adjuvant Therapy:</span>
                           <span className="text-cyan-400">PARP INHIBITOR</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-black">
                           <span className="text-zinc-600">Combo Strategy:</span>
                           <span className="text-cyan-400">PEMBRO + MET_I</span>
                        </div>
                     </div>
                     <button className="mt-4 w-full py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-sm text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:bg-cyan-500/20 transition-all">
                        [Download Optimization Protocol]
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Section Footer embedded in the Box */}
        <div className="bg-black/80 border-t border-zinc-900 p-8 flex flex-col md:flex-row items-end justify-between gap-10">
          <div className="space-y-3">
            <h3 className="text-zinc-200 text-lg font-light tracking-tight leading-none">
              Built the first clinical AI that tells you <span className="text-cyan-500 font-bold uppercase tracking-widest">why</span> a trial will fail.
            </h3>
            <div className="flex items-center gap-6">
               <p className="text-cyan-900 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                 <Zap className="w-3.5 h-3.5" /> Evolutionary Escape Detected: {tumorType}
               </p>
               <div className="h-3 w-px bg-zinc-800" />
               <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">n=29 {trialId}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-zinc-950 border border-zinc-900 rounded-sm text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-widest shadow-xl">
              [Scan Another Cohort]
            </button>
            <button className="px-8 py-3 bg-cyan-500 border border-cyan-400 text-[10px] font-black text-black hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              [Export Model Specs]
            </button>
          </div>
        </div>
        
        {/* Micro-status bar */}
        <div className="bg-black px-8 py-4 border-t border-zinc-900/50 flex justify-between items-center text-[9px] text-zinc-800 font-black tracking-[0.4em] uppercase">
          <div className="flex gap-10">
            <span className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> ENGINE_V6.2_ACTIVE</span>
            <span>Batch_Delta: {expectedCalibrationError} ECE</span>
          </div>
          <div className="flex gap-6">
            <Database className="w-4 h-4 text-zinc-700" />
            <Microscope className="w-4 h-4 text-zinc-700" />
            <BarChart3 className="w-4 h-4 text-zinc-700" />
            <Cpu className="w-4 h-4 text-cyan-600" />
          </div>
        </div>
      </div>
    </section>
  );
};
