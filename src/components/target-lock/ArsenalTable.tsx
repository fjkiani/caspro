'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { REPURPOSING_ARSENAL, ARSENAL_STATS, type DrugCandidate } from '@/data/target-lock-data';

// --- Verdict Badge ---
const VerdictBadge = ({ verdict }: { verdict: DrugCandidate['verdict'] }) => {
  const config = {
    PASS: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    CONDITIONAL: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-500/20' },
    FAIL: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' },
  }[verdict];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] border rounded-sm ${config.bg} ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {verdict}
    </span>
  );
};

// --- Main Arsenal Table ---
export function ArsenalTable({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`border rounded-sm overflow-hidden shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-8 py-6 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <ShieldCheck className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
          <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Drug Feasibility Gate
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
          <span className="text-emerald-500">{ARSENAL_STATS.pass} PASS</span>
          <span className="text-amber-400">{ARSENAL_STATS.conditional} COND</span>
          <span className="text-red-500">{ARSENAL_STATS.fail} FAIL</span>
        </div>
      </div>

      {/* Rows — all data from REPURPOSING_ARSENAL (artifact-backed) */}
      {REPURPOSING_ARSENAL.map((drug, i) => (
        <motion.div
          key={drug.drug}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className={`flex items-center justify-between px-8 py-4 border-b transition-colors ${
            isDarkMode ? 'border-zinc-900 hover:bg-white/[0.02]' : 'border-slate-50 hover:bg-slate-50'
          } ${drug.verdict === 'PASS' ? 'border-l-2 border-l-emerald-500' : drug.verdict === 'CONDITIONAL' ? 'border-l-2 border-l-amber-500/60' : 'border-l-2 border-l-red-500/40'}`}
        >
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="w-40 shrink-0">
              <span className={`text-[13px] font-black uppercase tracking-wide block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {drug.drug}
              </span>
              <span className={`text-[11px] block mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                {drug.tier}
              </span>
            </div>
            <VerdictBadge verdict={drug.verdict} />
            <span className={`text-[14px] font-black tabular-nums w-16 text-center ${
              drug.gapRatio !== null && drug.gapRatio <= 1 ? 'text-emerald-400' :
              drug.gapRatio !== null && drug.gapRatio <= 15 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {drug.gapDisplay}
            </span>
            <p className={`text-[11px] font-mono leading-relaxed flex-1 min-w-0 truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              {drug.note}
            </p>
          </div>
          {/* Artifact links — clickable provenance */}
          <div className="flex gap-2 shrink-0 ml-4">
            {drug.artifacts.slice(0, 2).map(a => (
              a.url ? (
                <a key={a.label} href={a.url} target="_blank" rel="noopener noreferrer" className={`text-[10px] font-mono px-2 py-1 rounded-sm border transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-900 text-cyan-600 hover:text-cyan-400 hover:border-cyan-800' : 'bg-slate-50 border-slate-200 text-indigo-500 hover:text-indigo-700'}`}>
                  {a.label}
                </a>
              ) : (
                <span key={a.label} className={`text-[10px] font-mono px-2 py-1 rounded-sm border ${isDarkMode ? 'bg-black/40 border-zinc-900 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  {a.label}
                </span>
              )
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
