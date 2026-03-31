'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  Target,
  Binary,
  Info,
  Database,
  Cpu,
  Scale,
  Crosshair,
  ArrowRight,
} from 'lucide-react';
import {
  TrialCaseFile,
  VECTOR_AXIS_META,
  TRIAL_CASE_FILES,
  TRIAL_IDS,
} from '@/data/trial-case-files';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function buildRadarData(trial: TrialCaseFile) {
  return VECTOR_AXIS_META.map((m) => ({
    axis: m.label,
    trial: trial.trialVector[m.key],
    responder: trial.responderVector[m.key],
    non_responder: trial.nonResponderVector[m.key],
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface VectorFailureAnalysisProps {
  /** Which trial to render on mount — defaults to 'latify' */
  initialTrialId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const VectorFailureAnalysis: React.FC<VectorFailureAnalysisProps> = ({
  initialTrialId = 'latify',
}) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [activeTrialId, setActiveTrialId] = useState(initialTrialId);
  const trial = TRIAL_CASE_FILES[activeTrialId] ?? TRIAL_CASE_FILES['latify'];
  const radarData = useMemo(() => buildRadarData(trial), [trial]);

  const panelClass = isDarkMode
    ? 'bg-zinc-950/40 border-zinc-900'
    : 'bg-white border-slate-300';
  const softPanelClass = isDarkMode
    ? 'bg-zinc-950 border-zinc-800'
    : 'bg-slate-50 border-slate-300';
  const headingClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedClass = isDarkMode ? 'text-zinc-500' : 'text-slate-600';
  const subtleClass = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const dividerClass = isDarkMode ? 'border-zinc-900' : 'border-slate-200';
  const chartGridStroke = isDarkMode ? '#27272a' : '#cbd5e1';
  const chartTickColor = isDarkMode ? '#fafafa' : '#334155';
  const trialStroke = isDarkMode ? '#22d3ee' : '#0284c7';
  const responderStroke = isDarkMode ? '#10b981' : '#059669';
  const nonResponderStroke = isDarkMode ? '#f43f5e' : '#e11d48';

  return (
    <div className="flex-1 flex flex-col font-mono p-1 relative overflow-hidden h-full">

      {/* Background Reticle */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isDarkMode ? 'opacity-[0.03] text-cyan-400' : 'opacity-[0.04] text-slate-400'}`}>
        <div className="w-[70vw] h-[70vw] border border-current rounded-full" />
        <div className="absolute w-px h-full bg-current" />
        <div className="absolute h-px w-full bg-current" />
      </div>

      {/* Header */}
      <header className="z-10 mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded border flex items-center justify-center shadow-lg ${softPanelClass}`}>
            <Target className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
          </div>
          <div className="min-w-0">
            <h2 className={`text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] ${headingClass}`}>
              {trial.trialId} Failure: 8D Vector Analysis
            </h2>
            <p className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-1 ${mutedClass}`}>
              Retrospective Failure Mapping // {trial.trialId}
            </p>
          </div>
        </div>

        {/* Trial Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:justify-end">
          {TRIAL_IDS.map((id) => {
            const t = TRIAL_CASE_FILES[id];
            const isActive = id === activeTrialId;
            return (
              <button
                key={id}
                onClick={() => setActiveTrialId(id)}
                className={`px-3 sm:px-5 py-2 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                  isActive
                    ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-sky-500/10 border-sky-500/40 text-sky-700')
                    : (isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:text-zinc-400' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900')
                }`}
              >
                {t.id.toUpperCase()}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => router.push(`/proof/${activeTrialId}/case/`)}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded border text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-lg w-full sm:w-auto lg:ml-2 ${
              isDarkMode
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-cyan-500/20'
                : 'border-sky-500/40 bg-sky-500/10 text-sky-700 hover:bg-sky-600 hover:text-white hover:shadow-sky-500/20'
            }`}
          >
            OPEN FULL CASE FILE
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTrialId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-0"
        >

          {/* Left: 8D Radar Manifold */}
          <div className={`col-span-1 lg:col-span-8 flex flex-col rounded p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden border min-h-0 min-w-0 ${panelClass}`}>
            {/* Legend */}
            <div className={`flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6 border-b pb-4 ${dividerClass}`}>
              <span className={`text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] ${headingClass}`}>
                Computational Vector Space
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: trialStroke }} />
                  <span className={`text-[9px] font-black uppercase ${subtleClass}`}>TRIAL VECTOR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border" style={{ borderColor: responderStroke }} />
                  <span className={`text-[9px] font-black uppercase ${subtleClass}`}>RESPONDER</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: nonResponderStroke }} />
                  <span className={`text-[9px] font-black uppercase ${subtleClass}`}>NON-RESPONDER</span>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="flex-1 relative min-h-[280px] sm:min-h-[350px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke={chartGridStroke} />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: chartTickColor, fontSize: 14, fontWeight: 'bold' }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} axisLine={false} />

                  {/* Non-Responder (Dotted Rose) */}
                  <Radar
                    name="Non-Responder"
                    dataKey="non_responder"
                    stroke={nonResponderStroke}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill={nonResponderStroke}
                    fillOpacity={0.15}
                  />

                  {/* Responder (Emerald) */}
                  <Radar
                    name="Responder"
                    dataKey="responder"
                    stroke={responderStroke}
                    strokeWidth={2}
                    fill={responderStroke}
                    fillOpacity={0.05}
                  />

                  {/* Trial Vector (Cyan Glow) */}
                  <Radar
                    name="Trial"
                    dataKey="trial"
                    stroke={trialStroke}
                    strokeWidth={4}
                    fill={trialStroke}
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>

              {/* Floating Annotations */}
              <div className="absolute top-[25%] left-[20%] pointer-events-none">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px" style={{ backgroundColor: trialStroke }} />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: trialStroke }}>TRIAL VECTOR</span>
                </div>
              </div>
              <div className="absolute top-[15%] right-[15%] pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: responderStroke }}>RESPONDER</span>
              </div>
              <div className="absolute bottom-[35%] left-[10%] pointer-events-none text-center">
                <p className={`text-[12px] font-black uppercase tracking-widest drop-shadow-lg ${headingClass}`}>THE GAP:</p>
                <p className="text-[14px] font-black uppercase tracking-widest mt-1" style={{ color: nonResponderStroke }}>Δ {trial.deltaImpact}</p>
                <div className="w-full h-0.5 mt-2 opacity-50" style={{ backgroundColor: nonResponderStroke }} />
              </div>
              <div className={`absolute bottom-[20%] right-[20%] pointer-events-none border px-4 py-2 rounded-sm backdrop-blur-md ${
                isDarkMode ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300/80'
              }`}>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: responderStroke }}>ALIGNMENT ZONE</span>
                <p className={`text-[11px] font-black mt-1 uppercase ${headingClass}`}>COSINE = {trial.cosineResponder.toFixed(4)}</p>
              </div>
            </div>
          </div>

          {/* Right: Math + Verdict */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 min-w-0">

            {/* Vector Convergence Math */}
            <div className={`p-6 border rounded shadow-2xl ${softPanelClass}`}>
              <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${dividerClass}`}>
                <Binary className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-sky-600'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${headingClass}`}>Vector Convergence Math</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className={`text-[10px] font-black uppercase ${mutedClass}`}>Formula_Resolve:</span>
                  <div className={`p-4 rounded font-mono text-[11px] leading-relaxed ${isDarkMode ? 'bg-black text-cyan-500' : 'bg-slate-100 text-sky-700'}`}>
                    cos(θ) = (A·B) / (||A|| ||B||)
                  </div>
                </div>

                <div className={`space-y-4 pt-4 border-t ${dividerClass}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase ${subtleClass}`}>TARGET RESPONDER</span>
                    <span className={`text-xl font-light ${headingClass}`}>{trial.cosineResponder.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase ${subtleClass}`}>ITT DILUTED</span>
                    <span className="text-xl font-light" style={{ color: nonResponderStroke }}>{trial.cosineITT.toFixed(4)}</span>
                  </div>
                  <div className={`flex justify-between items-center py-3 px-4 rounded border ${isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-300/60'}`}>
                    <span className="text-[10px] font-black uppercase" style={{ color: nonResponderStroke }}>DELTA IMPACT</span>
                    <span className="text-xl font-black" style={{ color: nonResponderStroke }}>{trial.deltaImpact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Failure Interpretation */}
            <div className={`flex-1 border rounded p-6 shadow-2xl ${panelClass}`}>
              <div className="flex items-center gap-3 mb-4">
                <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-slate-500'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${headingClass}`}>Failure Interpretation</span>
              </div>
              <p className={`text-[12px] leading-relaxed font-bold uppercase tracking-tight ${mutedClass}`}>
                {trial.rootCause.summary}
              </p>

              <div className="mt-6 space-y-3">
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Trials Scored</span>
                  <span className={`uppercase ${headingClass}`}>{trial.engineRun.trialsScored}</span>
                </div>
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Gates</span>
                  <span className="uppercase" style={{ color: responderStroke }}>{trial.gatesSummary}</span>
                </div>
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Verdict</span>
                  <span className="uppercase font-black tracking-[0.2em]" style={{ color: nonResponderStroke }}>FAILURE_PREDICTED</span>
                </div>
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Validation Tier</span>
                  <span className="uppercase" style={{ color: trialStroke }}>{trial.validationTier}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>

      {/* CTA Bar */}
      <div className={`z-10 mt-6 flex items-center justify-between border-t pt-6 ${dividerClass}`}>
        <div className="flex items-center gap-8">
          <span className={`text-[10px] font-black uppercase tracking-widest ${mutedClass}`}>In Silico Failure Analyzer v1.4.2</span>
          <span className="text-lg font-light tracking-tighter leading-none" style={{ color: trialStroke }}>8D VECTOR ENGINE</span>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/proof/${activeTrialId}/case/`)}
          className={`flex items-center gap-3 px-8 py-3.5 rounded border-2 text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg group ${
            isDarkMode
              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-cyan-500/30'
              : 'border-sky-600 bg-sky-600/10 text-sky-700 hover:bg-sky-600 hover:text-white hover:shadow-sky-500/30'
          }`}
        >
          View {trial.title}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
