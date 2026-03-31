'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import {
  ShieldCheck,
  Database,
  Search,
  ClipboardCheck,
  Target,
  Binary,
  Info,
} from 'lucide-react';

// --- Data ---
import { TRIAL_CASE_FILES, VECTOR_AXIS_META, type TrialCaseFile } from '@/data/trial-case-files';

// --- Extracted Primitives ---
import { MetricCardGrid } from '@/components/sections/mars/MetricCard';
import { ArtifactList } from '@/components/sections/mars/ArtifactRow';
import { PlaybookGrid } from '@/components/sections/mars/PlaybookStep';
import { RootCausePanel } from '@/components/sections/mars/RootCausePanel';
import { GateStatusPanel } from '@/components/sections/mars/GateStatusPanel';
import { DiagnosticLog } from '@/components/sections/mars/DiagnosticLog';
import { MarketSignificanceCard, SystemSummaryCard } from '@/components/sections/mars/MarketSignificanceCard';

// --- 8D Radar ---
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

// ═══════════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════════

function buildRadarData(trial: TrialCaseFile) {
  return VECTOR_AXIS_META.map((m) => ({
    axis: m.label,
    trial: trial.trialVector[m.key],
    responder: trial.responderVector[m.key],
    non_responder: trial.nonResponderVector[m.key],
  }));
}

/** Bottom nav only — order matches product receipts */
const PROOF_CASE_NAV = [
  { id: 'latify', label: 'LATIFY' },
  { id: 'ceacam5', label: 'CEACAM5' },
  { id: 'adavosertib', label: 'ADAVOSERTIB' },
  { id: 'capri', label: 'CAPRI' },
  { id: 'berzosertib', label: 'BERZOSERTIB' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TRIAL DE-RISK MAP — Data-Driven, Layout: 8D Radar = Main, Clinical = Sidebar
// ═══════════════════════════════════════════════════════════════════════════════

export default function TrialDeRiskMap({ initialTrialId = 'latify' }: { initialTrialId?: string }) {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Overview');
  const [currentPlayStep, setCurrentPlayStep] = useState(0);
  const [activeTrialId, setActiveTrialId] = useState(initialTrialId);

  const trial: TrialCaseFile = TRIAL_CASE_FILES[activeTrialId] ?? TRIAL_CASE_FILES['latify'];
  const radarData = buildRadarData(trial);

  useEffect(() => {
    setActiveTrialId(initialTrialId);
  }, [initialTrialId]);

  // Auto-advance playbook steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPlayStep(prev => (prev + 1) % (trial.playbook.length + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [trial.playbook.length]);

  // Reset on trial switch
  useEffect(() => { setCurrentPlayStep(0); }, [activeTrialId]);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono selection:bg-cyan-500/30 p-4 md:p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
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

      {/* ─── Header ─── */}
      <header className={`z-10 mb-8 border-b pb-8 flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-6 transition-colors duration-500 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-16 h-16 rounded border flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <ShieldCheck className={`w-9 h-9 transition-colors ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className={`text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{trial.title}</h1>
              <span className={`self-start md:self-auto px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border ${
                isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>{trial.trialId}</span>
            </div>
            <p className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
              {trial.drugLine}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full xl:w-auto">
          {/* View Tabs */}
          <div className={`flex flex-wrap p-1 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
            {['Overview', 'Artifacts', 'Playbook'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all rounded-[1px] ${
                  activeTab === tab
                    ? (isDarkMode ? 'bg-white text-black shadow-xl' : 'bg-indigo-600 text-white shadow-lg')
                    : (isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Main Layout: 8D Radar = WIDE, Clinical = SIDEBAR ─── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTrialId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="z-10 flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-8 min-h-0"
        >

          {/* ──────── LEFT: 8D RADAR (col-span-8) ──────── */}
          <div className="xl:col-span-8 flex flex-col gap-8">

            {/* 8D Radar Chart */}
            <div className={`border rounded-sm p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
              isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'
            }`}>
              {/* Radar Header */}
              <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <Target className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
                  <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    8D Vector Failure Analysis
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>Trial Vector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-emerald-500" />
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>Responder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-rose-500 border-dashed" />
                    <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>Non-Responder</span>
                  </div>
                </div>
              </div>

              {/* Radar + Sidebar Math */}
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                {/* Radar */}
                <div className="lg:col-span-2 relative h-[min(50vh,360px)] sm:h-[400px] lg:h-[420px] min-h-[240px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke={isDarkMode ? '#27272a' : '#e2e8f0'} />
                      <PolarAngleAxis dataKey="axis" tick={{ fill: isDarkMode ? '#fafafa' : '#1e293b', fontSize: 10, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} axisLine={false} />

                      <Radar name="Non-Responder" dataKey="non_responder" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" fill="#f43f5e" fillOpacity={0.15} />
                      <Radar name="Responder" dataKey="responder" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.05} />
                      <Radar name="Trial" dataKey="trial" stroke={isDarkMode ? '#22d3ee' : '#4f46e5'} strokeWidth={4} fill={isDarkMode ? '#22d3ee' : '#4f46e5'} fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>

                  {/* Floating Annotations */}
                  <div className="absolute bottom-[35%] left-[5%] pointer-events-none text-center hidden sm:block">
                    <p className={`text-[12px] font-black uppercase tracking-widest drop-shadow-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The Futility:</p>
                    <p className="text-[16px] font-black text-rose-500 uppercase tracking-widest mt-1">HR 0.90 / P 0.287</p>
                    <div className="w-full h-0.5 bg-rose-500 mt-2 opacity-50" />
                  </div>
                  <div className={`absolute bottom-[18%] right-[12%] pointer-events-none border px-2 py-1.5 sm:px-4 sm:py-2 rounded-sm backdrop-blur-md max-w-[45%] sm:max-w-none ${
                    isDarkMode ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-600/40 bg-emerald-50/90'
                  }`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Alignment Zone</span>
                    <p className={`text-[11px] font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>cosine = {trial.cosineResponder.toFixed(4)}</p>
                  </div>
                </div>

                {/* Math Panel (inline right) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Convergence Math */}
                  <div className={`p-5 border rounded transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Binary className={`w-4 h-4 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Vector Math</span>
                    </div>
                    <div className={`p-3 rounded font-mono text-[10px] mb-4 ${isDarkMode ? 'bg-black text-cyan-500' : 'bg-slate-50 text-indigo-700'}`}>
                      cos(θ) = (A·B) / (||A|| ||B||)
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="zeta-evidence-label">Target Responder</span>
                        <span className={`text-lg font-light ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{trial.cosineResponder.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="zeta-evidence-label">ITT Diluted</span>
                        <span className="text-lg font-light text-rose-500">{trial.cosineITT.toFixed(4)}</span>
                      </div>
                      <div className={`flex justify-between items-center p-3 rounded ${isDarkMode ? 'bg-rose-500/5 border border-rose-500/20' : 'bg-rose-50 border border-rose-200'}`}>
                        <span className="text-[9px] font-black text-rose-500 uppercase">Observed HR</span>
                        <span className="text-lg font-black text-rose-500">0.90</span>
                      </div>
                    </div>
                  </div>

                  {/* Gate Results */}
                  <div className="space-y-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Gate Evaluation</span>
                    {trial.gates.map(gate => (
                      <div key={gate.id} className={`flex justify-between items-center p-2.5 border rounded text-[9px] transition-colors ${
                        isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div className="flex-1 mr-2">
                          <span className="zeta-evidence-label block">{gate.label}</span>
                          <span className="zeta-evidence-value block text-[10px] mt-1">{gate.result}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${gate.pass ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className={`text-[9px] font-black ${gate.pass ? 'text-emerald-500' : 'text-rose-500'}`}>{gate.pass ? 'PASS' : 'FAIL'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verdict */}
                  <div className={`p-4 border rounded text-center transition-colors ${isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
                    <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em] block mb-1">VERDICT</span>
                    <span className="text-[12px] font-black text-rose-500 uppercase tracking-widest">FAILURE_PREDICTED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <MetricCardGrid metrics={trial.scores} isDarkMode={isDarkMode} />

            {/* Dynamic Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'Artifacts' ? (
                <motion.div
                  key="artifacts" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className={`flex-1 border rounded-sm p-4 sm:p-8 flex flex-col shadow-2xl transition-colors duration-500 ${
                    isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b gap-2 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <Database className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-cyan-700' : 'text-indigo-500'}`} />
                      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Artifact Chain of Custody</span>
                    </div>
                    <Search className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  </div>
                  <ArtifactList artifacts={trial.artifacts} isDarkMode={isDarkMode} />
                </motion.div>
              ) : activeTab === 'Playbook' ? (
                <motion.div
                  key="playbook" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className={`flex-1 border rounded-sm p-4 sm:p-8 flex flex-col shadow-2xl transition-colors duration-500 ${
                    isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-4 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <ClipboardCheck className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`} />
                    <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The De-Risking Protocol</span>
                  </div>
                  <PlaybookGrid steps={trial.playbook} currentStep={currentPlayStep} isDarkMode={isDarkMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-8"
                >
                  <MarketSignificanceCard commercial={trial.commercial} isDarkMode={isDarkMode} />
                  <SystemSummaryCard trialsScored={trial.engineRun.trialsScored} gatesSummary={trial.gatesSummary} isDarkMode={isDarkMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ──────── RIGHT SIDEBAR (col-span-4) — Dynamic per Tab ──────── */}
          <aside className="xl:col-span-4 flex flex-col gap-8">

            {/* Dynamic Top Section */}
            <AnimatePresence mode="wait">
              {activeTab === 'Artifacts' ? (
                <motion.div
                  key="sidebar-artifacts"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`border rounded-sm p-4 sm:p-6 shadow-2xl transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}
                >
                  <div className={`flex items-center justify-between mb-5 pb-3 border-b gap-2 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <Database className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-cyan-700' : 'text-indigo-500'}`} />
                      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Artifact Chain of Custody</span>
                    </div>
                    <Search className={`w-3.5 h-3.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  </div>
                  <ArtifactList artifacts={trial.artifacts} isDarkMode={isDarkMode} />
                </motion.div>
              ) : activeTab === 'Playbook' ? (
                <motion.div
                  key="sidebar-playbook"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`border rounded-sm p-4 sm:p-6 shadow-2xl transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}
                >
                  <div className={`flex items-center gap-2 sm:gap-3 mb-5 pb-3 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <ClipboardCheck className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`} />
                    <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The De-Risking Protocol</span>
                  </div>
                  <PlaybookGrid steps={trial.playbook} currentStep={currentPlayStep} isDarkMode={isDarkMode} />
                </motion.div>
              ) : (
                <motion.div
                  key="sidebar-rootcause"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <RootCausePanel rootCause={trial.rootCause} isDarkMode={isDarkMode} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Biology Summary (always visible) */}
            <div className={`p-4 sm:p-6 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-400'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Biology Cascade</span>
              </div>
              <div className="space-y-2">
                {trial.biologyCascade.map((step, i) => (
                  <p key={i} className={`text-[11px] font-mono leading-relaxed ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>{step}</p>
                ))}
              </div>
            </div>

            {/* Diagnostic Log (always visible) */}
            <DiagnosticLog entries={trial.diagnosticLog} isDarkMode={isDarkMode} />
          </aside>
        </motion.main>
      </AnimatePresence>

      <footer
        className={`relative z-[110] mt-8 flex flex-wrap justify-center gap-2 px-2 py-6 border-t ${
          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
        }`}
      >
        {PROOF_CASE_NAV.map(({ id, label }) => {
          const active = activeTrialId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveTrialId(id);
                router.push(`/proof/${id}/case/`);
              }}
              className={`px-2.5 sm:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded border transition-colors ${
                active
                  ? isDarkMode
                    ? 'text-white border-cyan-400 bg-cyan-500/15'
                    : 'text-slate-900 border-sky-700 bg-sky-50'
                  : isDarkMode
                    ? 'text-white border-zinc-600 bg-zinc-950 hover:border-zinc-400'
                    : 'text-slate-900 border-slate-300 bg-white hover:border-slate-500'
              }`}
            >
              {label}
            </button>
          );
        })}
      </footer>

      {/* Frame Accent */}
      <div className={`absolute top-0 left-0 w-full h-full border-4 sm:border-[12px] pointer-events-none z-[100] transition-colors duration-500 ${
        isDarkMode ? 'border-black' : 'border-slate-100/50'
      }`} />
    </div>
  );
}