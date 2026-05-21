'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import {
  FDA_RETROACTIVE, FDA_PROSPECTIVE, TWO_LAYER_MATRIX,
  FDA_STATS, LATIFY_RECEIPT, DRUG_CORRECTIONS,
} from '@/data/fda-prediction-data';

/** Desktop padding; tighter only below md */
const headerPad = 'px-8 py-6 max-md:px-4 max-md:py-4';
const rowPad = 'px-8 py-3 max-md:px-4';

export function FdaArchiveView({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="flex flex-col gap-8 max-md:gap-6 min-w-0">

      {/* Two-Layer Decision Matrix — from debrief lines 38-44 */}
      {/* <div className={`border rounded-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className={`flex items-center justify-between ${headerPad} border-b max-md:flex-col max-md:items-start max-md:gap-2 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <Target className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
            <span className={`text-[12px] font-black uppercase tracking-[0.4em] max-md:tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Two-Layer Prediction Framework
            </span>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`}>L1 × L2 → Outcome</span>
        </div>
        {TWO_LAYER_MATRIX.map((row, i) => (
          <div key={i} className={`flex items-center ${rowPad} max-md:py-4 border-b transition-colors max-md:flex-wrap max-md:gap-x-3 max-md:gap-y-1 ${
            row.isCritical
              ? (isDarkMode ? 'bg-rose-500/5 border-rose-500/20 border-l-2 border-l-rose-500' : 'bg-rose-50 border-rose-200 border-l-2 border-l-rose-500')
              : (isDarkMode ? 'border-zinc-900' : 'border-slate-50')
          }`}>
            <span className={`text-[14px] font-black w-24 max-md:w-auto ${row.l1 === 'HIGH' ? 'text-emerald-500' : 'text-rose-500'}`}>{row.l1}</span>
            <span className={`text-[14px] font-black w-24 max-md:w-auto ${row.l2 === 'HIGH' ? 'text-emerald-500' : 'text-rose-500'}`}>{row.l2}</span>
            <span className={`text-[13px] font-bold flex-1 min-w-0 max-md:basis-full ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{row.prediction}</span>
            {row.cost && <span className="text-[14px] font-black text-rose-500 shrink-0 max-md:ml-0">{row.cost}</span>}
          </div>
        ))}
      </div> */}

      {/* LATIFY Chain of Custody — from latify_curl_receipts.json */}
      <div className={`border rounded-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className={`flex items-center justify-between ${headerPad} border-b max-md:flex-col max-md:items-start max-md:gap-2 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <Zap className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
            <span className={`text-[12px] font-black uppercase tracking-[0.4em] max-md:tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>LATIFY Chain of Custody</span>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`}>Production Engine Output</span>
        </div>

        <div className="grid grid-cols-3 gap-8 p-8 max-md:grid-cols-1 max-md:gap-4 max-md:p-4">
          <div className={`p-6 border rounded transition-colors max-md:p-4 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="zeta-evidence-label block mb-4">Responder</span>
            <div className="flex justify-between items-end mb-3 gap-4">
              <span className="zeta-evidence-label">Score</span>
              <span className="text-2xl font-black text-emerald-500 tabular-nums">{LATIFY_RECEIPT.responderScore}</span>
            </div>
            <div className="flex justify-between items-end gap-4">
              <span className="zeta-evidence-label">Rank</span>
              <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>#{LATIFY_RECEIPT.responderRank}</span>
            </div>
          </div>

          <div className={`p-6 border rounded transition-colors max-md:p-4 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="zeta-evidence-label block mb-4">Non-Responder</span>
            <div className="flex justify-between items-end mb-3 gap-4">
              <span className="zeta-evidence-label">Score</span>
              <span className="text-2xl font-black text-rose-500 tabular-nums">{LATIFY_RECEIPT.nonResponderScore}</span>
            </div>
            <div className="flex justify-between items-end gap-4">
              <span className="zeta-evidence-label">Rank</span>
              <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>#{LATIFY_RECEIPT.nonResponderRank}</span>
            </div>
          </div>

          <div className={`p-6 border rounded text-center transition-colors max-md:p-4 ${isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] block mb-4">Delta Fit</span>
            <span className="text-4xl font-black text-rose-500 tabular-nums block">
              {LATIFY_RECEIPT.deltaFit > 0 ? '+' : ''}{LATIFY_RECEIPT.deltaFit}
            </span>
            <span className={`text-[11px] font-mono block mt-3 max-md:break-words ${isDarkMode ? 'text-zinc-500' : 'text-slate-700'}`}>Production cosine_sim()</span>
          </div>
        </div>

        {/* Citation — from receipt */}
        <div className={`px-8 pb-6 border-t max-md:px-4 max-md:pb-4 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
          <p className={`text-[11px] font-mono leading-relaxed pt-4 max-md:break-words ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {LATIFY_RECEIPT.manuscriptCitation}
          </p>
        </div>
      </div>

      {/* Retroactive + Prospective — from predictions JSONs */}
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-6 min-w-0">
        {/* Retroactive: from predictions_2024_retroactive.json */}
        <div className={`border rounded-sm overflow-hidden shadow-2xl min-w-0 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
          <div className={`flex items-center justify-between ${headerPad} border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Retroactive ({FDA_STATS.retroPeriod})
              </span>
            </div>
            <span className="text-lg font-black text-emerald-500 shrink-0">{FDA_STATS.retroConcordance}</span>
          </div>
          {FDA_RETROACTIVE.map((entry, i) => (
            <motion.div key={entry.gene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center justify-between gap-3 ${rowPad} border-b border-l-2 border-l-emerald-500/40 ${isDarkMode ? 'border-zinc-900 hover:bg-white/[0.02]' : 'border-slate-50 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <span className={`text-[12px] font-black uppercase w-16 shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{entry.gene}</span>
                <span className={`text-[12px] max-md:truncate ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{entry.drug}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px] font-black text-emerald-500 tabular-nums">{entry.score.toFixed(4)}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prospective: from predictions_2026_02_21.json */}
        <div className={`border rounded-sm overflow-hidden shadow-2xl min-w-0 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
          <div className={`flex items-center justify-between ${headerPad} border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <ArrowRight className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
              <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Prospective (Feb 2026)</span>
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-widest shrink-0 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`}>Immutable</span>
          </div>
          {FDA_PROSPECTIVE.map((entry, i) => (
            <motion.div key={entry.gene} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center justify-between gap-3 ${rowPad} border-b ${
                entry.highlight
                  ? (isDarkMode ? 'bg-rose-500/5 border-l-2 border-l-rose-500 border-zinc-900' : 'bg-rose-50 border-l-2 border-l-rose-500 border-slate-50')
                  : (isDarkMode ? 'border-zinc-900 hover:bg-white/[0.02]' : 'border-slate-50 hover:bg-slate-50')
              }`}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <span className={`text-[12px] font-black uppercase w-20 shrink-0 ${entry.highlight ? 'text-rose-500' : (isDarkMode ? 'text-cyan-400' : 'text-indigo-600')}`}>{entry.gene}</span>
                <span className={`text-[12px] max-md:truncate ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{entry.drug}</span>
              </div>
              <span className={`text-[12px] font-black uppercase shrink-0 ${
                entry.prediction === 'APPROVE' ? 'text-emerald-500' :
                entry.prediction === 'FAILURE' ? 'text-rose-500' :
                entry.prediction === 'PENDING' ? 'text-amber-400' : (isDarkMode ? 'text-zinc-600' : 'text-slate-400')
              }`}>
                {entry.prediction}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The $300M Row — from debrief line 45 */}
      <div className={`p-8 border rounded-sm text-center transition-colors max-md:p-4 ${isDarkMode ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] block mb-3">THE $300M ROW</span>
        <p className={`text-[14px] font-bold leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
          {FDA_STATS.thesisStatement}
        </p>
        <div className="flex justify-center gap-3 mt-5 max-md:flex-wrap">
          {FDA_STATS.artifacts.map(a => (
            <a key={a.slug} href={a.slug} target="_blank" rel="noopener noreferrer" className={`text-[10px] font-mono px-3 py-1.5 rounded-sm border transition-colors ${isDarkMode ? 'bg-black/40 border-zinc-900 text-cyan-600 hover:text-cyan-400 hover:border-cyan-800' : 'bg-white border-slate-200 text-indigo-500 hover:text-indigo-700'}`}>
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* Drug Correction Provenance — from debrief lines 83-90 */}
      {/* <div className={`border rounded-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className={`flex items-center justify-between ${headerPad} border-b max-md:flex-col max-md:items-start max-md:gap-2 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Correction Provenance</span>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`}>{DRUG_CORRECTIONS.length} Pre-Lock Fixes</span>
        </div>
        {DRUG_CORRECTIONS.map((c) => (
          <div key={c.gene} className={`flex items-center px-8 py-4 border-b border-l-2 border-l-amber-500/40 max-md:flex-col max-md:items-start max-md:gap-2 max-md:px-4 max-md:py-3 ${isDarkMode ? 'border-zinc-900' : 'border-slate-50'}`}>
            <span className={`text-[12px] font-black uppercase w-24 shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>{c.gene}</span>
            <span className={`text-[12px] line-through flex-1 min-w-0 ${isDarkMode ? 'text-rose-400/60' : 'text-rose-400'}`}>{c.error}</span>
            <span className={`text-[12px] font-bold flex-1 min-w-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{c.correction}</span>
            <span className={`text-[11px] font-bold w-32 text-right shrink-0 max-md:w-auto max-md:text-left ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{c.source}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
