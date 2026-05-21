'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Target,
  ChevronLeft,
  ChevronRight,
  Zap,
  Terminal,
  Waypoints,
  Focus,
  ClipboardList,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// --- Modular Components ---
import { FdaArchiveView } from '@/components/target-lock/FdaArchiveView';
import { TargetLockSidebar } from '@/components/target-lock/Sidebar';
import { GuideRnaAf3Panel } from '@/components/target-lock/GuideRnaAf3Panel';

// --- Data ---
import { FDA_STATS } from '@/data/fda-prediction-data';
import {
  METASTATIC_CASCADE_STEPS,
  AF3_RNA_DNA_GATES,
  type CascadeStep,
} from '@/data/metastatic-cascade-data';

const CASCADE_STEPS = METASTATIC_CASCADE_STEPS;

// ==============================================================================
// Structure View — Cascade + Protein + Detail
// ==============================================================================
export function TargetLockCascadeView({
  isDarkMode,
  compact = false,
}: {
  isDarkMode: boolean;
  compact?: boolean;
}) {
  const [activeStep, setActiveStep] = useState(CASCADE_STEPS[0]);
  const [isLocking, setIsLocking] = useState(false);
  const [logs, setLogs] = useState(["L1_TARGET_STANDBY", "MAPPING_CASCADE_STEPS", "READY_FOR_INTERCEPT"]);

  const handleStepClick = (step: CascadeStep) => {
    if (isLocking) return;
    setIsLocking(true);
    setActiveStep(step);
    setLogs(prev => [`[AF3] ${step.af3Guide} · ${step.gene}`, ...prev].slice(0, 8));
    setTimeout(() => {
      setIsLocking(false);
      setLogs(prev => [
        `[PASS] pLDDT ${step.plddt} · iPTM ${step.iptm} · ${step.af3Guide}`,
        ...prev,
      ]);
    }, 1200);
  };

  const stepChip = (s: CascadeStep) => (
    <button
      key={s.step}
      type="button"
      onClick={() => handleStepClick(s)}
      className={`shrink-0 rounded-sm border px-2 py-1.5 text-[9px] font-black uppercase tracking-tight transition-all ${
        activeStep.step === s.step
          ? isDarkMode
            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400'
            : 'bg-indigo-50 border-indigo-400 text-indigo-700'
          : isDarkMode
            ? 'border-zinc-800 text-zinc-500'
            : 'border-slate-200 text-slate-500'
      }`}
    >
      {s.gene}
    </button>
  );

  return (
    <div
      className={`flex-1 flex flex-col min-h-0 h-full overflow-hidden ${
        compact ? 'lg:grid lg:grid-cols-12 lg:gap-3' : 'xl:grid xl:grid-cols-12 gap-6'
      }`}
    >

      {/* Left: Cascade Selector (desktop workspace + full mode) */}
      <div
        className={`${compact ? 'max-md:hidden lg:col-span-3' : 'xl:col-span-3'} flex flex-col min-h-0 ${compact ? 'gap-2' : 'gap-4'}`}
      >
        <div className={`border rounded-sm flex-1 flex flex-col min-h-0 transition-colors ${compact ? 'p-3' : 'p-4'} ${
          isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className={`flex justify-between items-center px-1 ${compact ? 'mb-2' : 'mb-4'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Metastatic Cascade
            </span>
            <Waypoints className={`w-3.5 h-3.5 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
          </div>
          <div className="space-y-1 flex-1 min-h-0 overflow-y-auto pr-1">
            {CASCADE_STEPS.map(s => (
              <button
                key={s.step}
                onClick={() => handleStepClick(s)}
                className={`w-full border rounded-sm flex items-center justify-between transition-all text-left ${compact ? 'p-2' : 'p-3'} ${
                  activeStep.step === s.step
                    ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg' : 'bg-indigo-50 border-indigo-400 shadow-md')
                    : (isDarkMode ? 'bg-black/40 border-zinc-900 hover:bg-zinc-900 hover:border-zinc-700 opacity-60' : 'bg-slate-50 border-slate-100 opacity-80 hover:opacity-100')
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black ${activeStep.step === s.step ? (isDarkMode ? 'text-cyan-500' : 'text-indigo-600') : 'text-zinc-600'}`}>
                    0{s.step}
                  </span>
                  <div className="min-w-0">
                    <span className={`text-[10px] font-bold uppercase tracking-tight block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {s.label}
                    </span>
                    <span className={`text-[8px] font-mono truncate block ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                      {s.gene} · {s.af3Guide}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-3 h-3 transition-transform ${
                  activeStep.step === s.step ? `rotate-90 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}` : (isDarkMode ? 'text-zinc-800' : 'text-slate-300')
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className={`border rounded-sm flex flex-col shrink-0 transition-colors ${compact ? 'p-3 h-24' : 'p-4 h-48'} ${
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

      {/* Center: AF3 guide:DNA hybrid (per-step cohort) */}
      <div
        className={`flex flex-col min-h-0 ${compact ? 'max-md:flex-1 max-md:min-h-0 lg:col-span-6' : 'xl:col-span-6'} ${compact ? 'gap-2' : 'gap-4'}`}
      >
        {compact && (
          <div className="lg:hidden shrink-0 flex gap-1 overflow-x-auto pb-1">{CASCADE_STEPS.map(stepChip)}</div>
        )}
        <div
          className={`flex-1 min-h-0 border rounded-sm relative overflow-hidden transition-colors ${
            compact ? 'min-h-0' : 'min-h-[280px]'
          } ${isDarkMode ? 'bg-zinc-950/80 border-zinc-900' : 'bg-slate-50 border-slate-200 shadow-lg'}`}
        >
          <GuideRnaAf3Panel step={activeStep} isDarkMode={isDarkMode} isLocking={isLocking} />
        </div>

        <div className={`border rounded-sm grid grid-cols-2 md:grid-cols-4 shrink-0 transition-colors ${
          compact ? 'p-3 gap-2 text-[9px]' : 'p-4 gap-3 text-[10px]'
        } ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-md'}`}>
          <div>
            <span className={`font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Lock gene</span>
            <p className={`font-black mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeStep.gene}</p>
          </div>
          <div>
            <span className={`font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>AF3 guide</span>
            <p className={`font-mono mt-0.5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{activeStep.af3Guide}</p>
          </div>
          <div>
            <span className={`font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Target-Lock</span>
            <p className={`font-black tabular-nums mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeStep.targetLock != null ? activeStep.targetLock.toFixed(3) : '—'}
            </p>
          </div>
          <div>
            <span className={`font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Impact</span>
            <p className={`font-black uppercase mt-0.5 ${activeStep.impact === 'Extreme' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {activeStep.impact}
            </p>
          </div>
        </div>
        {compact && (
          <p className={`lg:hidden shrink-0 text-[10px] leading-snug line-clamp-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
            {activeStep.intercept}
          </p>
        )}
      </div>

      {/* Right: Mechanism Detail (desktop workspace + full mode) */}
      <div
        className={`${compact ? 'max-md:hidden lg:col-span-3' : 'xl:col-span-3'} flex flex-col min-h-0 ${compact ? 'gap-2' : 'gap-4'}`}
      >
        <div className={`border rounded-sm flex-1 flex flex-col min-h-0 overflow-hidden transition-colors ${
          compact ? 'p-4' : 'p-6'
        } ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-md'}`}>
          <div className={`flex justify-between items-start border-b shrink-0 ${compact ? 'mb-3 pb-3' : 'mb-6 pb-4'}`} style={{ borderColor: isDarkMode ? '#27272a' : '#e2e8f0' }}>
            <div className="space-y-1">
              <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Mechanism Detail</span>
              <h3 className={`text-lg font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeStep.label}</h3>
            </div>
            <Focus className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
          </div>
          <div className={`flex-1 min-h-0 overflow-y-auto ${compact ? 'space-y-3' : 'space-y-4'}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
              {activeStep.pathway}
            </p>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
              {activeStep.intercept}
            </p>
            <div className="space-y-2">
              <span className={`text-[9px] font-black uppercase tracking-widest block border-b pb-2 ${isDarkMode ? 'text-zinc-500 border-zinc-900' : 'text-slate-400 border-slate-200'}`}>
                AF3 RNA–DNA gate
              </span>
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>pLDDT ≥{AF3_RNA_DNA_GATES.plddtMin}</span>
                <span className="text-emerald-500 tabular-nums">{activeStep.plddt.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'}>iPTM ≥{AF3_RNA_DNA_GATES.iptmMin}</span>
                <span className="text-emerald-500 tabular-nums">{activeStep.iptm.toFixed(2)}</span>
              </div>
              <p className={`text-[9px] ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                Cohort {AF3_RNA_DNA_GATES.cohortPassRate} pass · 96nt gRNA + 60bp DNA
              </p>
            </div>
            <p className={`text-[9px] leading-relaxed ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
              L1 Target-Lock ranks drivers on 38 genes × 8 steps (Evo2 + Enformer). Structural triage is pre-synthesis only — not cleavage validated.
            </p>
          </div>
          <div className={`border-t shrink-0 ${compact ? 'pt-3' : 'pt-5'} ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
            <button className={`w-full rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] transition-all ${compact ? 'py-2' : 'py-3'} ${
              isDarkMode ? 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent shadow-lg' : 'bg-indigo-600 text-white text-on-primary hover:bg-indigo-700 border-transparent shadow-md'
            }`}>
              Design gRNA
            </button>
          </div>
        </div>

        {!compact && (
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
        )}
      </div>
    </div>
  );
}

const StructureView = (props: { isDarkMode: boolean }) => (
  <TargetLockCascadeView isDarkMode={props.isDarkMode} />
);

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
    <div className={`min-h-screen transition-colors duration-700 font-mono selection:bg-cyan-500/30 p-8 max-md:p-4 flex flex-col relative overflow-x-hidden ${
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
      <header className={`z-10 mb-8 border-b pb-8 flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 md:gap-0 transition-colors duration-500 max-md:mb-6 max-md:pb-6 max-md:gap-4 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex flex-col gap-4 w-full md:flex-row md:justify-between md:items-end">
        <div className="flex flex-col gap-3 min-w-0">
        <Link
          href="/engine/target-lock/"
          className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest w-fit ${
            isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
          Overview
        </Link>
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
        </div>

        <div className="flex gap-4 items-center max-md:w-full shrink-0">
          <div className={`flex p-1 border rounded-sm transition-colors max-md:w-full ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveView(tab.key)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-[1px] max-md:flex-1 max-md:px-3 ${
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
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 flex-1 min-w-0 max-md:gap-6">
              <div className="lg:col-span-8 flex flex-col gap-8 min-w-0 max-md:gap-6">
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
      <div className={`absolute top-0 left-0 w-full h-full border-[12px] pointer-events-none z-[100] transition-colors duration-500 max-md:border-[6px] ${
        isDarkMode ? 'border-[#020408]' : 'border-transparent'
      }`} />
    </div>
  );
}