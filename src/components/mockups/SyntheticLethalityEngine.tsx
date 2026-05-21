'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
  ShieldCheck, Zap, Database, Cpu, ChevronRight, Terminal,
  CheckCircle2, AlertOctagon, Combine, Scale,
  FlaskConical, Boxes, ArrowRight, Workflow, Fingerprint,
  Lock, Beaker, Activity, Target,
} from 'lucide-react';
import {
  SL_TYPEWRITER_PHRASES,
  THERAPY_AXES,
  EVIDENCE_MODALITIES,
  CONFOUND_STRESS_TESTS,
  PARP1_DATA,
  CERALASERTIB_DATA,
  PIPELINE_STEPS,
  MANIFOLD_NODES,
  MANIFOLD_EDGES,
  SL_TABS,
  type SLTabKey,
  type EvidenceStatus,
} from '@/data/sl-engine-data';

// ─── Glitch Typewriter (User-specified effect) ─────────────────────────────

const GLITCH_CHARS = '█▓▒░╔╗╚╝━│┃┄▀▄';

const SLGlitchTypewriter = ({ phrases, isDarkMode }: { phrases: string[]; isDarkMode: boolean }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitchFlash, setGlitchFlash] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = phrases[index % phrases.length];

    const handleType = () => {
      if (isPaused) return;

      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          const nextRealChar = currentFullText.charAt(displayText.length);
          const scrambleChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

          setDisplayText(prev => prev + scrambleChar);

          // random full-line glitch flash
          if (Math.random() > 0.85) {
            const g = Array.from({ length: 4 }, () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('');
            setGlitchFlash(g);
            setTimeout(() => setGlitchFlash(''), 40);
          }

          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1) + nextRealChar);
          }, 30);

          timer = setTimeout(handleType, 55);
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 5000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          timer = setTimeout(handleType, 18);
        } else {
          setIsDeleting(false);
          setIndex(prev => (prev + 1) % phrases.length);
        }
      }
    };

    timer = setTimeout(handleType, 80);
    return () => clearTimeout(timer);
  }, [displayText, isPaused, isDeleting, index, phrases]);

  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="relative min-h-[3.5em]">
      <p className={`text-base md:text-lg font-black leading-relaxed tracking-tight ${heading}`}>
        {displayText}
        <span className={`${accent} animate-pulse`}>█</span>
      </p>
      {glitchFlash && (
        <span className={`absolute top-0 left-0 ${accent} text-lg font-black pointer-events-none opacity-50`} style={{ mixBlendMode: 'screen' }}>
          {glitchFlash}
        </span>
      )}
    </div>
  );
};

// ─── Evidence Matrix Heatmap ──────────────────────────────────────────────────

const STATUS_STYLES: Record<EvidenceStatus, { dark: string; light: string; icon?: React.ReactNode }> = {
  POSITIVE: {
    dark: 'bg-emerald-500/20 border-emerald-500/50',
    light: 'bg-emerald-100 border-emerald-400',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
  },
  NEGATIVE: {
    dark: 'bg-rose-500/20 border-rose-500/50',
    light: 'bg-rose-100 border-rose-400',
    icon: <XMark />,
  },
  MIXED: {
    dark: 'bg-amber-500/15 border-amber-500/40',
    light: 'bg-amber-100 border-amber-400',
  },
  MISSING: {
    dark: 'bg-zinc-900 border-zinc-800',
    light: 'bg-slate-50 border-slate-200',
  },
  CONFOUNDED: {
    dark: 'bg-purple-500/15 border-purple-500/40',
    light: 'bg-purple-100 border-purple-400',
  },
};

function XMark() {
  return (
    <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const EvidenceMatrixView = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="flex flex-col h-full">
      <div className={`flex justify-between items-center mb-6 pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <Combine className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <span className={`text-sm font-black uppercase tracking-[0.2em] ${heading}`}>Multi-Modal Evidence Matrix</span>
        </div>
        <div className="flex gap-5">
          {(['POSITIVE', 'NEGATIVE', 'MISSING'] as EvidenceStatus[]).map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${s === 'POSITIVE' ? 'bg-emerald-500' : s === 'NEGATIVE' ? 'bg-rose-500' : 'bg-zinc-600'}`} />
              <span className={`text-[10px] font-black uppercase ${muted}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `minmax(140px, 1fr) repeat(${EVIDENCE_MODALITIES.length}, 1fr)` }}>
        <div />
        {EVIDENCE_MODALITIES.map(m => (
          <div key={m} className={`text-[10px] font-black uppercase text-center pb-3 ${muted}`}>{m}</div>
        ))}

        {THERAPY_AXES.map(axis => (
          <React.Fragment key={axis.name}>
            <div className="flex flex-col justify-center pr-4">
              <span className={`text-[12px] font-black uppercase ${heading}`}>{axis.name}</span>
              <span className={`text-[9px] font-bold uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{axis.tier}</span>
            </div>
            {EVIDENCE_MODALITIES.map(mod => {
              const cell = axis.modalities[mod];
              const s = cell?.status || 'MISSING';
              const style = STATUS_STYLES[s];
              return (
                <div
                  key={mod}
                  className={`h-10 border rounded-[2px] flex items-center justify-center transition-all ${isDarkMode ? style.dark : style.light}`}
                >
                  {style.icon || null}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ─── Confound Stress Tests ────────────────────────────────────────────────────

const ConfoundView = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';

  return (
    <div className="flex flex-col h-full">
      <div className={`flex justify-between items-center mb-6 pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <AlertOctagon className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
          <span className={`text-sm font-black uppercase tracking-[0.2em] ${heading}`}>Confound Stress Testing</span>
        </div>
        <span className={`text-[11px] font-black uppercase ${accent}`}>Target: Ceralasertib (AZD6738)</span>
      </div>

      <div className="space-y-4 flex-1">
        {CONFOUND_STRESS_TESTS.map((t, i) => (
          <div key={i} className={`p-5 border rounded-sm flex items-start justify-between transition-all ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="space-y-2 flex-1 mr-6">
              <span className={`text-[13px] font-black uppercase ${heading}`}>{t.label}</span>
              <p className={`text-[11px] font-medium leading-relaxed ${muted}`}>{t.description}</p>
              <div className="flex gap-4 flex-wrap mt-1">
                <span className={`text-[10px] font-black uppercase ${accent}`}>{t.delta}</span>
                {t.cohensD && <span className={`text-[10px] font-mono ${muted}`}>d = {t.cohensD}</span>}
                {t.n && <span className={`text-[10px] font-mono ${muted}`}>{t.n}</span>}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-base font-mono font-black ${accent}`}>p = {t.pValue}</span>
              <div className="flex items-center justify-end gap-2 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase">{t.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PARP1 Biomarker View ────────────────────────────────────────────────────

const Parp1View = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const secondaryFigure = isDarkMode ? 'text-zinc-100' : 'text-slate-800';
  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
  const d = PARP1_DATA;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Expression Comparison */}
      <div className={`p-6 border rounded-sm flex flex-col ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
        <span className={`text-sm font-black uppercase tracking-[0.2em] mb-6 ${heading}`}>PARP1 Expression</span>
        <div className="space-y-6 flex-1">
          <div className="flex justify-between items-end">
            <div>
              <span className={`text-[10px] font-black uppercase block mb-1 ${muted}`}>MBD4-LOF (n={d.nLof})</span>
              <span className={`text-3xl font-black ${accent}`}>{d.lofMedian}</span>
              <span className={`text-xs ml-2 ${muted}`}>{d.unit}</span>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-black uppercase block mb-1 ${muted}`}>Wild-Type (n={d.nWt.toLocaleString()})</span>
              <span className={`text-3xl font-black ${secondaryFigure}`}>{d.wtMedian}</span>
              <span className={`text-xs ml-2 ${muted}`}>{d.unit}</span>
            </div>
          </div>
          <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>Mann-Whitney p</span>
            <span className={`text-lg font-mono font-black ${accent}`}>{d.pValue}</span>
          </div>

          {/* Visual bar comparison */}
          <div className="space-y-3 mt-2">
            <div>
              <span className={`text-[9px] font-black uppercase ${muted}`}>LOF</span>
              <div className="h-5 bg-emerald-500/20 rounded-sm overflow-hidden mt-1">
                <div className="h-full bg-emerald-500 rounded-sm" style={{ width: `${(d.lofMedian / 10) * 100}%` }} />
              </div>
            </div>
            <div>
              <span className={`text-[9px] font-black uppercase ${muted}`}>WT</span>
              <div className={`h-5 rounded-sm overflow-hidden mt-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`}>
                <div className={`h-full rounded-sm ${isDarkMode ? 'bg-zinc-600' : 'bg-slate-400'}`} style={{ width: `${(d.wtMedian / 10) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARPi Correlation */}
      <div className={`p-6 border rounded-sm flex flex-col ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
        <span className={`text-sm font-black uppercase tracking-[0.2em] mb-6 ${heading}`}>PARPi Sensitivity Correlation</span>
        <div className="space-y-5 flex-1">
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>Spearman ρ</span>
            <span className={`text-2xl font-mono font-black ${accent}`}>{d.spearmanRho}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>p-value</span>
            <span className={`text-sm font-mono font-black ${accent}`}>{d.spearmanP}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>N (matched)</span>
            <span className={`text-sm font-mono font-black ${heading}`}>{d.nMatched}</span>
          </div>
          <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>High-PARP1 (≥Q75) Z</span>
            <span className="text-sm font-mono font-black text-emerald-500">{d.highQ75Z}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>Low-PARP1 (≤Q25) Z</span>
            <span className="text-sm font-mono font-black text-rose-500">+{d.lowQ25Z}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-black uppercase ${heading}`}>ΔZ Spread</span>
            <span className={`text-lg font-mono font-black ${accent}`}>{d.deltaZ}</span>
          </div>
          <div className={`mt-4 p-4 border rounded-sm ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <span className={`text-[10px] font-black uppercase block mb-1 ${muted}`}>RNF144A Degradation Hypothesis</span>
            <span className="text-sm font-black text-rose-500 uppercase">FALSIFIED (p = {d.rnf144aP})</span>
            <p className={`text-[11px] mt-2 ${muted}`}>PARP1 upregulation is transcriptional, not post-translational.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Ceralasertib Pharmacological View ───────────────────────────────────────

const CeralasertibView = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
  const c = CERALASERTIB_DATA;

  return (
    <div className="flex flex-col h-full">
      <div className={`flex justify-between items-center mb-6 pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div>
          <span className={`text-sm font-black uppercase tracking-[0.2em] ${heading}`}>{c.drug}</span>
          <span className={`text-[11px] font-bold block mt-1 ${muted}`}>Target: {c.target} | n={c.nLof} LOF vs {c.nWt} WT</span>
        </div>
        <FlaskConical className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
      </div>

      {/* Metrics Table */}
      <div className={`border rounded-sm overflow-hidden ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className={`grid grid-cols-6 gap-0 text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-slate-100 text-slate-600'}`}>
          <div className="p-3">Metric</div>
          <div className="p-3 text-center">LOF</div>
          <div className="p-3 text-center">WT</div>
          <div className="p-3 text-center">Δ</div>
          <div className="p-3 text-center">p-value</div>
          <div className="p-3 text-center">Cohen&apos;s d</div>
        </div>
        {c.metrics.map((m, i) => (
          <div key={i} className={`grid grid-cols-6 gap-0 text-[12px] font-mono border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            <div className={`p-3 font-black uppercase text-[11px] ${heading}`}>{m.metric}</div>
            <div className={`p-3 text-center ${accent}`}>{m.lof.toFixed(3)}</div>
            <div className={`p-3 text-center ${muted}`}>{m.wt.toFixed(3)}</div>
            <div className="p-3 text-center text-emerald-500 font-black">{m.delta.toFixed(3)}</div>
            <div className={`p-3 text-center ${accent}`}>{m.p}</div>
            <div className={`p-3 text-center ${heading}`}>{m.d}</div>
          </div>
        ))}
      </div>

      {/* Mechanism */}
      <div className={`mt-8 p-6 border rounded-sm ${isDarkMode ? 'bg-emerald-900/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
        <span className={`text-[11px] font-black uppercase block mb-3 ${accent}`}>Mechanistic Chain</span>
        <div className="flex items-center gap-3 flex-wrap">
          {['MBD4 LOF', '→', 'BER Deficiency', '→', 'Fork-Stalling Lesions', '→', 'Constitutive RS', '→', 'ATR Dependency', '→', 'Ceralasertib Kills'].map((step, i) =>
            step === '→' ? (
              <ArrowRight key={i} className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
            ) : (
              <span key={i} className={`text-[11px] font-black uppercase px-3 py-1.5 border rounded-sm ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                {step}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SyntheticLethalityEngine() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<SLTabKey>('matrix');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>(['SL_ENGINE_STANDBY', 'MBD4_LOF_DETECTED', 'DOCTRINE_AUTH_READY']);

  const startSynthesis = useCallback(() => {
    if (isSynthesizing) return;
    setIsSynthesizing(true);
    setActiveStep(0);
    let current = 0;
    const interval = setInterval(() => {
      if (current < PIPELINE_STEPS.length) {
        setLogs(prev => [`[PIPELINE] ${PIPELINE_STEPS[current]}`, ...prev].slice(0, 10));
        setActiveStep(current + 1);
        current++;
      } else {
        clearInterval(interval);
        setIsSynthesizing(false);
        setLogs(prev => ['VERDICT: MBD4 HYPOTHESIS VALIDATED // DUAL AXIS CONFIRMED', ...prev]);
      }
    }, 1200);
  }, [isSynthesizing]);

  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950/60' : 'bg-white shadow-xl';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-mono p-6 md:p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-300' : 'bg-slate-50 text-slate-700'
    }`}>

      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <header className={`z-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6 ${border}`}>
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded border flex items-center justify-center ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <Beaker className={`w-7 h-7 ${accent}`} />
          </div>
          <div>
            <h1 className={`text-lg md:text-xl font-black tracking-[0.3em] uppercase ${heading}`}>
              Synthetic Lethality Engine
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <div className={`flex items-center gap-2 px-2.5 py-1 rounded border ${isDarkMode ? 'bg-emerald-900/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <Target className={`w-3.5 h-3.5 ${accent}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${accent}`}>MBD4 (LoF)</span>
              </div>
              <span className={`text-[11px] font-bold italic uppercase ${muted}`}>Multi-Modal Evidence Fuser v4.0.0</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* <button
            onClick={startSynthesis}
            disabled={isSynthesizing}
            className={`px-8 py-3 rounded border text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 ${
              isSynthesizing
                ? `${isDarkMode ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-emerald-100 border-emerald-500 text-emerald-700'}`
                : `${isDarkMode ? 'bg-white text-black hover:bg-emerald-500 hover:text-white border-transparent' : 'bg-emerald-600 text-white hover:bg-emerald-700 border-transparent'}`
            }`}
          >
            {isSynthesizing ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {isSynthesizing ? 'Executing...' : 'Run SL Pipeline'}
          </button> */}
        </div>
      </header>

      {/* ─── Typewriter (full-width) ────────────────────────────────────── */}
      <div className={`z-10 mb-8 p-5 border rounded-sm ${cardBg} ${border}`}>
        <SLGlitchTypewriter phrases={SL_TYPEWRITER_PHRASES} isDarkMode={isDarkMode} />
      </div>

      {/* ─── Main Layout ────────────────────────────────────────────────── */}
      <div className="z-10 flex-1 grid grid-cols-12 gap-8 min-h-0">

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className={`border rounded-sm p-5 ${cardBg} ${border}`}>
            <span className={`text-[11px] font-black uppercase tracking-widest block mb-5 ${heading}`}>Discovery Layers</span>
            <div className="space-y-1.5">
              {SL_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-sm transition-all group ${
                    activeTab === tab.key
                      ? `${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500' : 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600'}`
                      : `${isDarkMode ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                  }`}
                >
                  <div className="text-left">
                    <span className="text-[12px] font-black uppercase tracking-widest block">{tab.label}</span>
                    <span className={`text-[9px] font-bold uppercase mt-0.5 block ${muted}`}>{tab.slug}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.key ? 'opacity-100' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Process Log */}
          <div className={`border rounded-sm p-5 flex-1 ${cardBg} ${border}`}>
            <div className="flex items-center gap-3 mb-5">
              <Terminal className={`w-4 h-4 ${isDarkMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span className={`text-[11px] font-black uppercase tracking-widest ${heading}`}>Process Sync</span>
            </div>
            <div className="space-y-3 font-mono text-[10px]">
              {logs.slice(0, 6).map((l, i) => (
                <div key={i} className={`truncate tracking-wider uppercase transition-all ${
                  i === 0 ? `font-black ${heading}` : `opacity-60 ${muted}`
                }`}>{l}</div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <main className={`col-span-12 lg:col-span-9 border rounded-sm p-6 md:p-8 ${cardBg} ${border}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'matrix' && <EvidenceMatrixView isDarkMode={isDarkMode} />}
              {activeTab === 'confound' && <ConfoundView isDarkMode={isDarkMode} />}
              {activeTab === 'parp1' && <Parp1View isDarkMode={isDarkMode} />}
              {activeTab === 'ceralasertib' && <CeralasertibView isDarkMode={isDarkMode} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className={`z-10 mt-8 pt-6 border-t flex items-center justify-between ${border}`}>
        <div>
        
          {/* <span className={`text-xl font-light tracking-tighter ${accent}`}>MARS COMPUTATIONAL SUITE</span> */}
        </div>
     
      </footer>
    </div>
  );
}
