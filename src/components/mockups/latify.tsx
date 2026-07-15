'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
  ShieldCheck,
  Database,
  Search,
  Target,
  Binary,
  Info,
} from 'lucide-react';

// --- Data ---
import { TRIAL_CASE_FILES, type TrialCaseFile } from '@/data/trial-case-files';
import { getTrialPersonaHeaders } from '@/data/trial-case-files/trials-persona-copy';
import { usePersona } from '@/context/PersonaContext';
import {
  buildDualGeometryRadarData,
  DualGeometryRadar,
  DualGeometryLegend,
} from '@/components/sections/mars/DualGeometryRadar';
import { MetricCardGrid } from '@/components/sections/mars/MetricCard';
import { ArtifactList } from '@/components/sections/mars/ArtifactRow';
import { RootCausePanel } from '@/components/sections/mars/RootCausePanel';
// import { DiagnosticLog } from '@/components/sections/mars/DiagnosticLog';
import { marsReadable } from '@/components/sections/mars/readable-text';
import { ProofCaseFooter } from '@/components/sections/mars/ProofCaseFooter';
import { MoaGlyphStrip } from '@/components/sections/mars/MoaGlyphStrip';
import { GATED_SENTINEL, toneClasses } from '@/components/sections/mars/gated-values';
import { ResponsiveContainer } from 'recharts';


// ═══════════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════════

function buildRadarData(trial: TrialCaseFile) {
  return buildDualGeometryRadarData(trial);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRIAL DE-RISK MAP — Data-Driven, Layout: 8D Radar = Main, Clinical = Sidebar
// ═══════════════════════════════════════════════════════════════════════════════

export default function TrialDeRiskMap({ initialTrialId = 'latify' }: { initialTrialId?: string }) {
  const { isDarkMode } = useTheme();
  const { persona } = usePersona();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Artifacts'>('Overview');
  const [activeTrialId, setActiveTrialId] = useState(initialTrialId);

  const trial: TrialCaseFile = TRIAL_CASE_FILES[activeTrialId] ?? TRIAL_CASE_FILES['latify'];
  const trialHeader = getTrialPersonaHeaders(trial, persona);
  const radarData = buildRadarData(trial);
  const { body: bodyText, secondary: secondaryText } = marsReadable(isDarkMode);

  useEffect(() => {
    setActiveTrialId(initialTrialId);
  }, [initialTrialId]);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono selection:bg-cyan-500/30 p-3 sm:p-4 md:p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-300' : 'bg-slate-50 text-slate-700'
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
      <header className={`z-10 mb-4 sm:mb-8 border-b pb-4 sm:pb-8 flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 sm:gap-6 transition-colors duration-500 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded border flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
          }`}>
            <ShieldCheck className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className={`text-base sm:text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{trialHeader.title}</h1>
              <span className={`self-start md:self-auto px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border ${
                isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>{trial.trialId}</span>
            </div>
            <p className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
              {trialHeader.drugLine}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full xl:w-auto">
          {/* View Tabs */}
          <div className={`flex flex-wrap p-1 border rounded-sm transition-colors w-full sm:w-auto ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
            {(['Overview', 'Artifacts'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-3 sm:px-6 md:px-8 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all rounded-[1px] ${
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
          className="z-10 flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 min-h-0"
        >

          {/* ──────── LEFT: 8D RADAR (col-span-8) ──────── */}
          <div className="xl:col-span-8 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-w-0">

            {/* 8D Radar Chart */}
            <div className={`border rounded-sm p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
              isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'
            }`}>
              {/* Radar Header */}
              <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b pb-4 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <Target className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
                  <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Multi-Layer Failure Analysis
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <DualGeometryLegend isDarkMode={isDarkMode} />
                </div>
              </div>

              {/* Radar + Sidebar Math */}
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                {/* Radar */}
                <div className="lg:col-span-2 relative h-[min(50vh,360px)] sm:h-[400px] lg:h-[420px] min-h-[240px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <DualGeometryRadar data={radarData} isDarkMode={isDarkMode} />
                  </ResponsiveContainer>

                  {/* Floating Annotations — DATA-DRIVEN from trial.publishedReadout */}
                  {trial.publishedReadout ? (() => {
                    const rt = toneClasses(trial.publishedReadout.tone);
                    return (
                      <div className="absolute bottom-[35%] left-[5%] pointer-events-none text-center hidden sm:block">
                        <p className={`text-[12px] font-black uppercase tracking-widest drop-shadow-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {trial.publishedReadout.headlineLabel}
                        </p>
                        <p className={`text-[16px] font-black uppercase tracking-widest mt-1 ${rt.text}`}>
                          {trial.publishedReadout.headlineValue}
                        </p>
                        <div className={`w-full h-0.5 mt-2 opacity-50 ${rt.text.replace('text-', 'bg-')}`} />
                      </div>
                    );
                  })() : null}

                  {/* Alignment-zone chip — only when a NON-gated cosine exists */}
                  {trial.cosineResponder !== GATED_SENTINEL && (
                    <div className={`absolute bottom-[18%] right-[12%] pointer-events-none border px-2 py-1.5 sm:px-4 sm:py-2 rounded-sm backdrop-blur-md max-w-[45%] sm:max-w-none ${
                      isDarkMode ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-600/40 bg-emerald-50/90'
                    }`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Alignment Zone</span>
                      <p className={`text-[11px] font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fit {trial.cosineResponder.toFixed(4)}</p>
                    </div>
                  )}
                </div>

                {/* Math Panel (inline right) */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Mechanism fit — renders numeric row ONLY when non-gated;
                      otherwise renders ranked-glyph MoA strip (governance policy). */}
                  {trial.cosineResponder !== GATED_SENTINEL ? (
                    <div className={`p-5 border rounded transition-colors ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <Binary className={`w-4 h-4 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mechanism Fit</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed mb-4 tracking-tight ${bodyText}`}>
                        Retrospective alignment between trial mechanism and responder vs. ITT signatures.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${secondaryText}`}>
                            Responder signature
                          </span>
                          <span className={`text-lg font-light tabular-nums shrink-0 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {trial.cosineResponder.toFixed(4)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${secondaryText}`}>
                            ITT diluted
                          </span>
                          <span className="text-lg font-light text-rose-500 tabular-nums shrink-0">{trial.cosineITT.toFixed(4)}</span>
                        </div>
                        {trial.publishedReadout && (() => {
                          const rt = toneClasses(trial.publishedReadout.tone);
                          return (
                            <div className={`flex justify-between items-center p-3 rounded ${rt.chipBg}`}>
                              <span className={`text-[9px] font-black uppercase ${rt.chipText}`}>{trial.publishedReadout.endpointLabel}</span>
                              <span className={`text-lg font-black ${rt.chipText}`}>{trial.publishedReadout.endpointValue}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  ) : trial.moaGlyphs && trial.moaGlyphs.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      <MoaGlyphStrip rows={trial.moaGlyphs} isDarkMode={isDarkMode} />
                      {trial.publishedReadout && (() => {
                        const rt = toneClasses(trial.publishedReadout.tone);
                        return (
                          <div className={`flex justify-between items-center p-3 rounded ${rt.chipBg}`}>
                            <span className={`text-[9px] font-black uppercase ${rt.chipText}`}>{trial.publishedReadout.endpointLabel}</span>
                            <span className={`text-lg font-black ${rt.chipText}`}>{trial.publishedReadout.endpointValue}</span>
                          </div>
                        );
                      })()}
                    </div>
                  ) : null}

                  {/* Gate Results */}
                  <div className="space-y-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Gate Evaluation</span>
                    {trial.gates.map(gate => (
                      <div key={gate.id} className={`flex justify-between items-center p-2.5 border rounded text-[9px] transition-colors ${
                        isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div className="flex-1 mr-2 min-w-0">
                          <span className={`block text-[10px] font-black uppercase tracking-wide ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
                            {gate.label.toUpperCase()}
                          </span>
                          <span className={`block text-[9px] sm:text-[10px] font-bold uppercase mt-1 leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                            {gate.result.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${gate.pass ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className={`text-[9px] font-black ${gate.pass ? 'text-emerald-500' : 'text-rose-500'}`}>{gate.pass ? 'PASS' : 'FAIL'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verdict — DATA-DRIVEN */}
                  {trial.verdict ? (() => {
                    const vt = toneClasses(trial.verdict.tone);
                    return (
                      <div className={`p-4 border rounded text-center transition-colors ${vt.bg} ${vt.border}`}>
                        <span className={`text-[9px] font-black uppercase tracking-[0.3em] block mb-1 ${vt.text}`}>VERDICT</span>
                        <span className={`text-[12px] font-black uppercase tracking-widest ${vt.text}`}>{trial.verdict.label}</span>
                        {trial.verdict.caption && (
                          <p className={`text-[9px] mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                            {trial.verdict.caption}
                          </p>
                        )}
                      </div>
                    );
                  })() : null}
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
                    <Search className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  </div>
                  <ArtifactList artifacts={trial.artifacts} isDarkMode={isDarkMode} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* ──────── RIGHT SIDEBAR (col-span-4) — Dynamic per Tab ──────── */}
          <aside className="xl:col-span-4 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-w-0">

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
                    <Search className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  </div>
                  <ArtifactList artifacts={trial.artifacts} isDarkMode={isDarkMode} />
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
            {/* <DiagnosticLog entries={trial.diagnosticLog} isDarkMode={isDarkMode} /> */}
          </aside>
        </motion.main>
      </AnimatePresence>

      <ProofCaseFooter activeTrialId={activeTrialId} isDarkMode={isDarkMode} />

      {/* Frame Accent */}
      <div className={`absolute top-0 left-0 w-full h-full border-2 sm:border-4 md:border-[12px] pointer-events-none z-[100] transition-colors duration-500 ${
        isDarkMode ? 'border-black' : 'border-slate-100/50'
      }`} />
    </div>
  );
}