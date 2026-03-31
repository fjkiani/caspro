import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
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
  ZAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  Dna, 
  Shield, 
  Settings, 
  Bell, 
  User,
  ChevronRight,
  Zap,
  Microscope,
  Database,
  Target,
  Terminal,
  Crosshair,
  Cpu,
  Search,
  X,
  Play,
  BarChart3,
  ShieldCheck
} from 'lucide-react';

// --- Configuration & Global Mock Data ---

const GENES = ["KRAS", "BRCA1", "TP53", "EGFR", "CDK4", "PIK3CA", "MET", "RET", "ALK", "NTRK1"];

const generatePatientData = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const id = `P-${(8128 + i).toString().padStart(4, '0')}`;
    const scores = GENES.reduce((acc, gene) => {
      let val;
      if (gene === 'KRAS') val = (Math.random() > 0.3 ? 0.887 : 0.124);
      else if (gene === 'TP53') val = 0.991;
      else val = (Math.random() * 2 - 1).toFixed(3);
      acc[gene] = parseFloat(val);
      return acc;
    }, {});
    return { id, ...scores };
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
          <Scatter data={STEP_BOUNDARY} line={{ stroke: '#22d3ee', strokeWidth: 1.5 }} shape={() => null} />
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

// --- Main Platform App ---

export default function App() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('SIMULATION');
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className={`min-h-screen font-mono selection:bg-cyan-500/30 flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#05070a] text-zinc-400' : 'bg-slate-50 text-slate-600'}`}>
      
      {/* Top Navbar */}
      <nav className={`flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 px-4 md:px-8 py-3 border-b backdrop-blur-xl sticky top-0 z-50 ${isDarkMode ? 'border-zinc-900 bg-black/50' : 'border-slate-200 bg-white/50'}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 w-full md:w-auto">
          <div className="flex items-center gap-3 text-cyan-500">
            <Shield className="w-5 h-5 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
            <span className={`text-xs font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mars V6 <span className="text-cyan-700 font-light">Intelligence</span></span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {['PATIENT DATA', 'SIMULATION', 'DATA ANALYSIS', 'SETTINGS'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-bold tracking-[0.2em] transition-all relative py-1 ${
                  activeTab === tab ? 'text-cyan-400' : 'text-zinc-600 hover:text-zinc-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-3 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-zinc-600">
           <div className="flex items-center gap-2 mr-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase text-zinc-500">Node Syncing</span>
           </div>
           <Settings className="w-4 h-4 cursor-pointer hover:text-white" />
           <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-500" />
           </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 p-4 md:p-8 flex flex-col xl:grid xl:grid-cols-12 gap-8 max-w-[1800px] mx-auto w-full overflow-hidden">
        
        {/* Left Sidebar Context */}
        <div className="xl:col-span-2 space-y-6">
          <div className={`border rounded-sm overflow-hidden shadow-2xl transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'}`}>
            <div className={`px-4 py-3 border-b text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-zinc-900/40 border-zinc-900 text-zinc-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>Navigation</div>
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
                    m.active 
                      ? (isDarkMode ? 'bg-cyan-500/5 text-cyan-400 border-l border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-500') 
                      : (isDarkMode ? 'text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-5 border rounded space-y-4 transition-colors ${isDarkMode ? 'bg-cyan-950/5 border-cyan-900/10' : 'bg-white border-slate-200 shadow-sm'}`}>
             <h4 className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>Cohort Analysis</h4>
             <div className="flex justify-between items-end">
                <span className={`text-[8px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Relapse Probability</span>
                <span className="text-base font-black text-rose-500 leading-none">4.2%</span>
             </div>
             <div className={`h-1 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-200'}`}>
                <div className="w-[4.2%] h-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
             </div>
             <p className={`text-[9px] leading-relaxed uppercase italic ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                Critical trajectory detected toward binding site mutation.
             </p>
          </div>
        </div>

        {/* Central Display Area */}
        <div className="xl:col-span-10 h-full min-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
          <AnimatePresence mode="wait">
            
            {/* --- TAB: PATIENT DATA (V5 Axis/Grid) --- */}
            {activeTab === 'PATIENT DATA' && (
              <motion.div 
                key="patient-data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`border p-4 md:p-8 rounded-sm shadow-2xl overflow-hidden transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-4 mb-8">
                     <Terminal className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-cyan-600'}`} />
                     <h2 className={`text-xs font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Genomic Stream Processing</h2>
                  </div>
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="min-w-[800px]">
                      {/* Grid Header */}
                      <div className={`grid grid-cols-[140px_repeat(10,1fr)_40px] gap-2 mb-8 border-b pb-4 text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'border-zinc-900 text-zinc-600' : 'border-slate-200 text-slate-500'}`}>
                        <div className="pl-4">Cohort_ID</div>
                        {GENES.map(g => <div key={g} className="text-center">{g}</div>)}
                        <div className="text-center">...</div>
                      </div>
                      {/* Grid Body */}
                      <div className="space-y-[2px]">
                        {COHORT_DATA.map((row) => (
                          <div 
                            key={row.id} 
                            onMouseEnter={() => setHoveredRow(row.id)} onMouseLeave={() => setHoveredRow(null)}
                            className={`grid grid-cols-[140px_repeat(10,1fr)_40px] gap-2 py-2 items-center border-l-2 transition-all cursor-crosshair ${
                              hoveredRow === row.id 
                                ? (isDarkMode ? 'bg-cyan-500/5 border-cyan-500 text-cyan-100' : 'bg-cyan-50 border-cyan-600 text-cyan-900') 
                                : `border-transparent ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`
                            }`}
                          >
                            <div className="text-[12px] font-mono pl-4">{row.id}</div>
                            {GENES.map(gene => (
                              <div key={gene} className={`text-[12px] text-center font-mono ${row[gene] > 0.8 ? (isDarkMode ? 'text-cyan-400 font-bold' : 'text-cyan-700 font-bold') : ''}`}>
                                {row[gene].toFixed(3)}
                              </div>
                            ))}
                            <div className="flex justify-center opacity-20"><ChevronRight className="w-4 h-4"/></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- TAB: SIMULATION (Analytical Unified View) --- */}
            {activeTab === 'SIMULATION' && (
              <motion.div 
                key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex flex-col lg:grid lg:grid-cols-2 gap-8"
              >
                {/* Panel: I/O Risk-Benefit Gate */}
                <div className={`border rounded-sm p-10 flex flex-col transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900 shadow-[inset_0_0_60px_rgba(6,182,212,0.03)]' : 'bg-white border-slate-200 shadow-xl'}`}>
                  <RiskBenefitGate />
                </div>
                
                {/* Panel: Resistance Matrix */}
                <div className={`border rounded-sm p-10 flex flex-col justify-center shadow-2xl transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'}`}>
                  <ResistanceMatrix />
                </div>

                {/* Dashboard Stats Panel */}
                <div className={`border rounded-sm p-8 flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-xl'}`}>
                   <div>
                      <h4 className={`text-[10px] font-black uppercase tracking-widest mb-8 border-b pb-3 ${isDarkMode ? 'text-zinc-500 border-zinc-900' : 'text-slate-500 border-slate-100'}`}>Pathway Activation Scores</h4>
                      <div className="space-y-6">
                        {[
                          { label: 'PI3K/AKT/MTOR', val: '9.1', color: 'text-rose-500' },
                          { label: 'WNT/BETA-CATENIN', val: '4.8', color: 'text-zinc-400' },
                          { label: 'P53/DNA-REPAIR', val: '2.3', color: 'text-zinc-500' },
                          { label: 'CDK4/CELL-CYCLE', val: '7.2', color: 'text-cyan-600' }
                        ].map((stat, i) => (
                          <div key={i} className={`flex justify-between items-center text-[11px] font-black tracking-widest uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                             <span>{stat.label}</span>
                             <span className={isDarkMode ? stat.color : stat.color.replace('zinc-400', 'slate-400').replace('zinc-500', 'slate-500')}>{stat.val}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
                
                {/* Dashboard Recommendations Panel */}
                <div className={`border rounded-sm p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'}`}>
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Microscope className={`w-16 h-16 ${isDarkMode ? 'text-cyan-500' : 'text-cyan-600'}`} />
                   </div>
                   <h4 className={`text-[10px] font-black uppercase tracking-widest border-b pb-3 ${isDarkMode ? 'text-zinc-500 border-zinc-900' : 'text-slate-500 border-slate-100'}`}>Treatment Recommendations</h4>
                   <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded">
                      <p className={`text-[12px] font-black uppercase mb-2 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`}>Critical Resistance Detected</p>
                      <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold">
                         Resistance probability in Alkylating Agents: 78.4%. Immediate strategy pivot required.
                      </p>
                   </div>
                   <div className={`space-y-4 font-black ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                      <div className="flex justify-between items-center text-[10px] uppercase">
                         <span>Adjuvant Therapy:</span>
                         <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>PARP INHIBITOR</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase">
                         <span>Combo Strategy:</span>
                         <span className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}>PEMBRO + MET_I</span>
                      </div>
                   </div>
                   <button className={`mt-4 w-full py-3 border rounded-sm text-[9px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/20' : 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100'}`}>
                      [Download Optimization Protocol]
                   </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Technical Footer */}
      <footer className={`border-t px-6 lg:px-12 py-8 z-50 transition-colors ${isDarkMode ? 'bg-black border-zinc-900' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-10">
          <div className="space-y-3">
            <h3 className={`text-lg md:text-xl font-light tracking-tight leading-snug md:leading-none ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
              Built the first clinical AI that tells you <span className={`font-bold uppercase tracking-widest break-words lg:break-normal ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>why</span> a trial will fail.
            </h3>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
               <p className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${isDarkMode ? 'text-cyan-900' : 'text-indigo-600/60'}`}>
                 <Zap className="w-3.5 h-3.5 flex-shrink-0" /> Evolutionary Escape Detected: Binding_Site_Mutation
               </p>
               <div className={`hidden md:block h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-700' : 'text-slate-500'}`}>n=29 NeoPembrOV</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className={`w-full sm:w-auto px-6 lg:px-10 py-3.5 border rounded-sm text-[10px] font-black transition-all uppercase tracking-widest shadow-xl ${isDarkMode ? 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'}`}>[See Receipts]</button>
            <button className={`w-full sm:w-auto px-6 lg:px-10 py-3.5 border text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-cyan-500 border-cyan-400 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-700 shadow-xl'}`}>[Talk to us]</button>
          </div>
        </div>
        <div className={`max-w-[1440px] mx-auto w-full pt-6 mt-6 border-t flex justify-between items-center text-[9px] font-black tracking-[0.4em] uppercase ${isDarkMode ? 'border-zinc-900/50 text-zinc-800' : 'border-slate-200 text-slate-400'}`}>
          <div className="flex gap-10">
            <span className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'}`} /> ENGINE_V6.2_ACTIVE</span>
            <span>Batch_Delta: 0.042 ECE</span>
          </div>
          <div className={`flex gap-6 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>
            <Database className="w-4 h-4 text-zinc-700" />
            <Microscope className="w-4 h-4 text-zinc-700" />
            <BarChart3 className="w-4 h-4 text-zinc-700" />
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
          </div>
        </div>
      </footer>
    </div>
  );
}