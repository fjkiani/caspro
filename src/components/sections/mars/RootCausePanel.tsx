'use client';

import React from 'react';
import { Workflow, Zap, ArrowRight } from 'lucide-react';
import type { RootCause } from '@/data/trial-case-files';

interface RootCausePanelProps {
  rootCause: RootCause;
  isDarkMode: boolean;
}

export const RootCausePanel: React.FC<RootCausePanelProps> = ({ rootCause, isDarkMode }) => (
  <div className={`border rounded-sm p-6 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
    isDarkMode ? 'bg-zinc-950/40 border-zinc-900' : 'bg-white border-slate-200 shadow-indigo-100/30'
  }`}>
    {/* Header */}
    <div className={`flex justify-between items-center mb-5 pb-3 border-b ${isDarkMode ? 'border-zinc-900/50' : 'border-slate-100'}`}>
      <div className="flex items-center gap-3">
        <Workflow className={`w-4 h-4 ${isDarkMode ? 'text-rose-500' : 'text-rose-600'}`} />
        <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Clinical Failure Root Cause</span>
      </div>
      <Zap className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-900' : 'text-indigo-200'}`} />
    </div>

    {/* Failure Summary */}
    <p className={`text-[12px] leading-relaxed font-bold uppercase tracking-tight mb-5 ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
      Predicted Mode: Trial enrolled{' '}
      <span className="text-rose-500">{rootCause.failureKeyword}</span>{' '}
      {rootCause.summary.split(rootCause.failureKeyword).pop()}
    </p>

    {/* Status Quo → Intercept */}
    <div className="flex items-center gap-3">
      <div className={`flex-1 p-3 border rounded-sm text-center ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
        <span className={`text-[8px] font-black uppercase block mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{rootCause.statusQuoLabel}</span>
        <span className="text-[11px] font-bold text-rose-500 uppercase">{rootCause.statusQuo}</span>
      </div>
      <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-300'}`} />
      <div className={`flex-1 p-3 border rounded-sm text-center ${isDarkMode ? 'bg-cyan-900/10 border-cyan-500/30' : 'bg-indigo-50 border-indigo-200'}`}>
        <span className={`text-[8px] font-black uppercase block mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{rootCause.interceptLabel}</span>
        <span className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{rootCause.intercept}</span>
      </div>
    </div>
  </div>
);
