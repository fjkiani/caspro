'use client';

import React from 'react';
import { Target, Database, Info } from 'lucide-react';
import { TARGET_LOCK_EXPLAINER } from '@/data/target-lock-data';
import { FDA_RETROACTIVE, FDA_PROSPECTIVE, FDA_STATS, LATIFY_RECEIPT } from '@/data/fda-prediction-data';
import { DiagnosticLog } from '@/components/sections/mars/DiagnosticLog';

// --- Build diagnostic entries from FDA data (not drug arsenal) ---
function buildDiagnosticEntries() {
  let idx = 0;
  const entries: { time: string; message: string; level: 'system' | 'info' | 'success' | 'warn' | 'error' }[] = [
    { time: String(idx++).padStart(2, '0'), message: 'L1_INIT: TARGET_LOCK_SYSTEM_ONLINE', level: 'system' },
    { time: String(idx++).padStart(2, '0'), message: `RETRO: ${FDA_RETROACTIVE.length} GENES VALIDATED`, level: 'info' },
    { time: String(idx++).padStart(2, '0'), message: `CONCORDANCE: ${FDA_STATS.retroConcordance}`, level: 'success' },
    { time: String(idx++).padStart(2, '0'), message: `PROSPECTIVE: ${FDA_PROSPECTIVE.length} PREDICTIONS LOCKED`, level: 'info' },
  ];

  // Log each prospective prediction from data
  FDA_PROSPECTIVE.forEach(p => {
    const level = p.prediction === 'APPROVE' ? 'success' as const :
                  p.prediction === 'FAILURE' ? 'error' as const :
                  p.prediction === 'PENDING' ? 'warn' as const : 'info' as const;
    entries.push({ time: String(idx++).padStart(2, '0'), message: `${p.gene}: ${p.prediction}`, level });
  });

  entries.push(
    { time: String(idx++).padStart(2, '0'), message: `LATIFY_Δ: +${LATIFY_RECEIPT.deltaFit}`, level: 'success' },
    { time: String(idx++).padStart(2, '0'), message: 'L1_STATUS: GATE_ACTIVE', level: 'system' },
  );

  return entries;
}

// --- Sidebar ---
export function TargetLockSidebar({ isDarkMode }: { isDarkMode: boolean }) {
  const diagnosticEntries = buildDiagnosticEntries();

  return (
    <aside className="lg:col-span-4 flex flex-col gap-8">

      {/* FDA Stats — from fda-prediction-data.ts */}
      <div className={`p-6 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2 mb-6">
          <Target className={`w-4 h-4 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Prediction Summary</span>
        </div>

        <div className="space-y-3">
          {/* Retroactive concordance */}
          <div className={`flex justify-between items-center p-3 rounded ${isDarkMode ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
            <span className="text-[11px] font-black text-emerald-500 uppercase">Retroactive</span>
            <span className="text-[14px] font-black text-emerald-500 tabular-nums">{FDA_STATS.retroConcordance}</span>
          </div>

          {/* Prospective count */}
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Prospective</span>
            <span className={`text-lg font-light ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{FDA_STATS.prospectiveTotal}</span>
          </div>

          {/* Period */}
          <div className="flex justify-between items-center">
            <span className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Period</span>
            <span className={`text-[12px] font-mono ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{FDA_STATS.retroPeriod}</span>
          </div>

          {/* LATIFY Delta */}
          <div className={`flex justify-between items-center p-3 rounded ${isDarkMode ? 'bg-rose-500/5 border border-rose-500/20' : 'bg-rose-50 border border-rose-200'}`}>
            <span className="text-[11px] font-black text-rose-500 uppercase">LATIFY Δ</span>
            <span className="text-[14px] font-black text-rose-500 tabular-nums">+{LATIFY_RECEIPT.deltaFit}</span>
          </div>
        </div>
      </div>

      {/* Source Artifacts — clickable, accessible at slugs */}
      <div className={`p-6 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <Database className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-400'}`} />
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Source Artifacts</span>
        </div>
        <div className="space-y-2">
          {FDA_STATS.artifacts.map(a => (
            <a
              key={a.slug}
              href={a.slug}
              target="_blank"
              rel="noopener noreferrer"
              className={`block px-3 py-2.5 rounded-sm border transition-all group ${
                isDarkMode
                  ? 'bg-black/40 border-zinc-900 hover:border-cyan-800 hover:bg-cyan-950/20'
                  : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold ${isDarkMode ? 'text-cyan-500 group-hover:text-cyan-400' : 'text-indigo-600 group-hover:text-indigo-700'}`}>
                  {a.label}
                </span>
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                  a.type === 'json'
                    ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600')
                    : (isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600')
                }`}>
                  {a.type}
                </span>
              </div>
              <p className={`text-[10px] font-mono leading-relaxed ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                {a.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* How Target Lock Works — from debrief lines 30-45 */}
      {/* <div className={`p-6 border rounded-sm transition-colors ${isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-400'}`} />
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>How Target Lock Works</span>
        </div>
        <div className="space-y-3">
          {TARGET_LOCK_EXPLAINER.map((item, i) => (
            <div key={i}>
              <span className={`text-[10px] font-black uppercase block mb-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{item.label}</span>
              <p className={`text-[11px] font-mono leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Diagnostic Log */}
      {/* <DiagnosticLog entries={diagnosticEntries} isDarkMode={isDarkMode} /> */}
    </aside>
  );
}
