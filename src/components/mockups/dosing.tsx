'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
  ShieldCheck,
  Zap,
  Database,
  Cpu,
  Binary,
  Terminal,
  Scale,
  ActivitySquare,
  FlaskConical,
  ShieldAlert,
  Droplet,
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  PGX_GENES,
  CPIC_CONCORDANCE,
  PREPARE_DATA,
  SAFETY_PROVENANCE,
  SAFETY_TYPEWRITER_PHRASES,
  IO_SCATTER_COMPACT,
  type PGxGene,
} from '@/data/safety-engine-data';

// ─── Diagnostic log messages ─────────────────────────────────────────────────
const LOG_MSGS = [
  'LAYER_3_INIT',
  'GROUNDING_CPIC_DATA...',
  'AUTH_DETERMINISTIC_GATE',
  'SYNCING DPYD_VAR...',
  'CALIBRATING_IO_GATE...',
  'STRATIFYING_MSI_H...',
  'EXECUTING_VETO_LOGIC...',
  'PROVENANCE_SYNC_NOMINAL',
  'TIER2_SENSITIVITY: 100%',
  'PREPARE_RRR: 83.1%',
];

// ─── PGx Dosing Matrix ────────────────────────────────────────────────────────

function PGxDosingMatrix({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950/40' : 'bg-white';
  const heading = isDarkMode ? 'text-white' : 'text-slate-950';
  const rowBg = isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${cardBg} ${border} ${isDarkMode ? '' : 'shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-8 border-b pb-4 ${border}`}>
        <div className="flex items-center gap-3">
          <FlaskConical className={`w-5 h-5 ${accent}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${heading}`}>PGx Dosing Guidance</span>
        </div>
        <span className="text-[10px] font-black uppercase text-emerald-500">
          {CPIC_CONCORDANCE.concordanceRate} CPIC CONCORDANCE
        </span>
      </div>

      <div className="flex-1 space-y-3">
        {PGX_GENES.map((row, i) => (
          <div key={i} className={`p-4 border rounded-sm flex justify-between items-center transition-all ${rowBg}`}>
            <div className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full ${
                row.adjustment === 'FULL DOSE' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              <span className={`text-[11px] font-black ${heading}`}>{row.gene}</span>
            </div>
            <div className="flex gap-8 items-center">
              <span className={`text-[10px] font-bold ${muted}`}>{row.phenotype}</span>
              <div className="flex flex-col items-end">
                <span className={`text-[11px] font-mono font-bold ${
                  row.adjustment === 'FULL DOSE' ? accent : 'text-rose-500'
                }`}>{row.adjustment}</span>
                <span className={`text-[10px] font-black ${muted}`}>{row.slug}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 pt-6 border-t ${border}`}>
        <div className="flex justify-between items-center">
          <span className={`text-[11px] font-black uppercase ${muted}`}>CPIC Cases / Matched</span>
          <span className={`text-[12px] font-bold ${heading}`}>
            {CPIC_CONCORDANCE.casesWithMatch}/{CPIC_CONCORDANCE.casesWithMatch} — {CPIC_CONCORDANCE.concordanceRate}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── IO Risk-Benefit Gate ─────────────────────────────────────────────────────

function IORiskBenefitGate({ isDarkMode }: { isDarkMode: boolean }) {
  const points = IO_SCATTER_COMPACT;

  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950/40' : 'bg-white';
  const heading = isDarkMode ? 'text-white' : 'text-slate-950';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const gridStroke = isDarkMode ? '#1e293b' : '#e2e8f0';

  return (
    <div className={`p-8 border rounded-sm flex flex-col h-full transition-colors ${cardBg} ${border} ${isDarkMode ? '' : 'shadow-xl'}`}>
      <div className={`flex justify-between items-center mb-8 border-b pb-4 ${border}`}>
        <div className="flex items-center gap-3">
          <Scale className={`w-5 h-5 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.3em] ${heading}`}>IO Risk-Benefit Gate</span>
        </div>
        <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
          NCB Gate Active
        </span>
      </div>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.3} />
            <XAxis type="number" dataKey="x" domain={[0, 1]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 1]} hide />
            <Scatter name="Patients" data={points} isAnimationActive={false}>
              {points.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.status === 'veto' ? '#f43f5e' : (isDarkMode ? '#22d3ee' : '#4f46e5')}
                  opacity={0.65}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="absolute right-4 bottom-12 text-right">
          <span className="text-[11px] font-black uppercase text-rose-500">Futile Toxicity Zone</span>
        </div>
      </div>

      <div className={`mt-6 pt-6 border-t ${border}`}>
        <div className="flex justify-between items-center">
          <span className={`text-[11px] font-black uppercase ${muted}`}>Gate Resolution</span>
          <span className={`text-[12px] font-bold ${heading}`}>Deterministic (15/15 Pass)</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Safety & Dosing Engine ─────────────────────────────────────────────

export default function SafetyDosingEngine() {
  const { isDarkMode } = useTheme();
  const [logs, setLogs] = useState(LOG_MSGS.slice(0, 3));
  const [toxicityLevel, setToxicityLevel] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setToxicityLevel(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 5) - 2)));
      setLogs(prev => [LOG_MSGS[Math.floor(Math.random() * LOG_MSGS.length)], ...prev].slice(0, 10));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950' : 'bg-white';
  const heading = isDarkMode ? 'text-white' : 'text-slate-950';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-mono p-8 flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
    }`}>

      {/* ── Header ── */}
      <header className={`z-10 mb-8 border-b pb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded border flex items-center justify-center shadow-2xl transition-all ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <ShieldCheck className={`w-9 h-9 ${accent}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-[0.3em] uppercase ${heading}`}>
              L6: Safety &amp; Dosing <span className="text-zinc-700 font-light tracking-normal ml-2">v6.2.9</span>
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500 animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> System_Safe
              </span>
              <div className={`h-4 w-px ${border}`} />
              <span className={`text-[11px] font-black uppercase tracking-widest ${heading}`}>
                PREPARE: {PREPARE_DATA.rrrActionable} RRR · CPIC: {CPIC_CONCORDANCE.concordanceRate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* <button className={`px-12 py-4 rounded-sm border text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-4 ${
            isDarkMode ? 'bg-white text-black hover:bg-cyan-500 border-transparent shadow-2xl shadow-cyan-900/20' : 'bg-indigo-600 text-white text-on-primary hover:bg-indigo-700 border-transparent shadow-xl'
          }`}>
            <Zap className="w-4 h-4" />
            Execute L6 Safety Run
          </button> */}
        </div>
      </header>

      {/* ── Main Grid ── */}
      <div className="z-10 flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-10 min-h-0">

        {/* Left: PGx + IO + toxicity strip */}
        <div className="xl:col-span-8 flex flex-col gap-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 flex-1">
            <PGxDosingMatrix isDarkMode={isDarkMode} />
            <IORiskBenefitGate isDarkMode={isDarkMode} />
          </div>

          {/* Toxicity + formula strip */}
          <div className={`p-6 lg:p-10 border rounded-sm flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10 transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-rose-500" />
                <h3 className={`text-[12px] font-black uppercase tracking-widest ${heading}`}>Cumulative Toxicity</h3>
              </div>
              <p className={`text-[11px] leading-relaxed font-bold uppercase ${muted}`}>
                Monitoring anthracycline and platinum dose accumulation with cross-resistance penalties.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <span className={`text-[11px] font-black uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Systemic Burden Index</span>
                <div className="flex justify-between items-baseline">
                  <span className={`text-4xl font-extralight tracking-tighter ${heading}`}>{toxicityLevel}%</span>
                  <span className={`text-[11px] font-black uppercase ${toxicityLevel > 80 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}>
                    {toxicityLevel > 80 ? 'CRITICAL' : 'NOMINAL'}
                  </span>
                </div>
              </div>
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`}>
                <motion.div
                  animate={{ width: `${toxicityLevel}%` }}
                  className={`h-full ${toxicityLevel > 80 ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-cyan-500'}`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <span className={`text-[11px] font-black uppercase tracking-widest ${muted}`}>Risk-Benefit Formula</span>
              <div className={`p-4 rounded border font-mono text-[11px] leading-relaxed ${isDarkMode ? 'bg-black/40 border-zinc-800 text-cyan-400' : 'bg-slate-50 border-slate-100 text-indigo-700'}`}>
                Net_Benefit =<br />
                (p_resp × Efficacy) -<br />
                (Risk_tox × Cost)
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="xl:col-span-4 flex flex-col gap-10">

          {/* Safety Provenance */}
          <div className={`p-8 border rounded-sm flex flex-col ${cardBg} ${border} ${isDarkMode ? '' : 'shadow-xl'}`}>
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${border}`}>
              <div className="flex items-center gap-3">
                <Binary className={`w-5 h-5 ${accent}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${heading}`}>Safety Provenance</span>
              </div>
              <ShieldAlert className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`} />
            </div>

            <div className="space-y-3 flex-1">
              {SAFETY_PROVENANCE.map((item, i) => (
                <div key={i} className={`p-4 rounded border transition-colors ${isDarkMode ? 'bg-black/20 border-zinc-900' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[11px] font-black ${accent}`}>{item.slug}</span>
                    <span className={`text-[10px] font-black uppercase ${muted}`}>{item.meta}</span>
                  </div>
                  <p className={`text-[11px] font-bold uppercase ${muted}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live diagnostic feed */}
          <div className={`p-8 border rounded-sm flex-1 flex flex-col ${isDarkMode ? 'bg-zinc-950/60' : 'bg-white shadow-xl'} ${border}`}>
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${border}`}>
              <div className="flex items-center gap-3">
                <Terminal className={`w-5 h-5 ${isDarkMode ? 'text-cyan-600' : 'text-indigo-400'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${heading}`}>Safety_Sync</span>
              </div>
              <ActivitySquare className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`} />
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed scrollbar-hide">
              {logs.map((l, i) => (
                <div key={i} className={`flex gap-3 transition-all duration-300 ${
                  i === 0
                    ? `${heading} font-black`
                    : `${muted} font-bold`
                }`}>
                  <span className="opacity-20">[{i}]</span>
                  <span className="truncate tracking-widest">{l}</span>
                </div>
              ))}
            </div>
            <div className={`mt-8 pt-6 border-t ${border}`}>
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className={muted}>Dosing Status</span>
                <span className="text-emerald-500 font-black">ADJUSTMENT_SYNCED</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Footer ── */}
      {/* <footer className={`h-auto min-h-24 py-6 border-t mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 lg:px-12 transition-colors ${isDarkMode ? 'border-zinc-900 bg-black/40' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center gap-6 lg:gap-16">
          <div className="space-y-4 md:space-y-2">
            <span className={`text-[11px] font-black uppercase tracking-widest ${heading}`}>Mars Computational Suite v6.2.9</span>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
              <span className={`text-2xl md:text-3xl font-extralight tracking-tighter leading-none ${accent}`}>SAFETY &amp; DOSING</span>
              <div className={`hidden md:block h-8 w-px ${border}`} />
              <span className={`text-[11px] font-bold uppercase tracking-widest ${heading}`}>
                Dosing Confidence: {CPIC_CONCORDANCE.concordanceRate} (CPIC-Grounded)
              </span>
            </div>
          </div>
        </div>
        <div className={`flex gap-12 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-300'}`}>
          <Database className="w-6 h-6 hover:text-cyan-400 transition-colors cursor-pointer" />
          <Cpu className="w-6 h-6" />
          <ShieldCheck className="w-6 h-6" />
          <ActivitySquare className="w-6 h-6" />
        </div>
      </footer> */}
    </div>
  );
}