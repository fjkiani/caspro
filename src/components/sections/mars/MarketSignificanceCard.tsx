'use client';

import React from 'react';
import { DollarSign, TrendingUp, Terminal } from 'lucide-react';
import type { CommercialImpact } from '@/data/trial-case-files';

interface MarketSignificanceCardProps {
  commercial: CommercialImpact;
  isDarkMode: boolean;
}

export const MarketSignificanceCard: React.FC<MarketSignificanceCardProps> = ({ commercial, isDarkMode }) => (
  <div className={`p-4 sm:p-6 lg:p-8 border rounded-sm relative overflow-hidden transition-all duration-500 min-w-0 ${
    isDarkMode ? 'bg-emerald-950/10 border-emerald-500/20' : 'bg-indigo-600 border-transparent shadow-2xl'
  }`}>
    <div className="absolute top-0 right-0 p-4 opacity-5">
      <DollarSign className="w-40 h-40 text-white" />
    </div>
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-white" />
          <span className="text-[12px] font-black text-white uppercase tracking-widest">Market Significance</span>
        </div>
        <div className="space-y-8">
          <div>
            <span className={`text-[9px] font-black uppercase block mb-1 ${isDarkMode ? 'text-emerald-300/90' : 'text-indigo-200'}`}>Target Sub-Pop</span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-tighter break-words">
              {commercial.targetPopulation}{' '}
              <span className="text-[10px] font-black uppercase text-white/70">{commercial.populationUnit}</span>
            </span>
          </div>
          <div>
            <span className={`text-[9px] font-black uppercase block mb-1 ${isDarkMode ? 'text-emerald-300/90' : 'text-indigo-200'}`}>Annual Savings</span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-tighter break-words">
              {commercial.annualSavings}{' '}
              <span className="text-[10px] font-black uppercase text-white/70">{commercial.savingsUnit}</span>
            </span>
          </div>
        </div>
      </div>
      <p className={`text-[10px] leading-relaxed font-bold uppercase pt-6 border-t ${isDarkMode ? 'border-emerald-500/20 text-emerald-200' : 'border-white/10 text-indigo-100'}`}>
        {commercial.closingStatement}
      </p>
    </div>
  </div>
);

/** System summary panel — shows trial-level stats */
export const SystemSummaryCard: React.FC<{
  trialsScored: number;
  gatesSummary: string;
  isDarkMode: boolean;
}> = ({ trialsScored, gatesSummary, isDarkMode }) => (
  <div className={`p-4 sm:p-6 lg:p-8 border rounded-sm flex flex-col justify-between transition-colors duration-500 min-w-0 ${
    isDarkMode ? 'bg-zinc-950/40 border-zinc-900 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
  }`}>
    <div className={`flex justify-between items-center pb-4 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
      <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-200' : 'text-slate-600'}`}>System Summary</span>
      <Terminal className="w-4 h-4 text-indigo-500" />
    </div>
    <div className="space-y-4 py-6">
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>Database Scored</span>
        <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{trialsScored} Trials</span>
      </div>
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>Prediction Layer</span>
        <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Two-Layer AI</span>
      </div>
      <div className="flex justify-between items-center text-[11px] font-bold text-rose-500">
        <span className="opacity-60">Status</span>
        <span className="font-black uppercase tracking-widest">FAILURE PREDICTED</span>
      </div>
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>Gates</span>
        <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{gatesSummary}</span>
      </div>
    </div>
    <button className={`w-full py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] transition-all ${
      isDarkMode ? 'bg-white text-black hover:bg-cyan-500 hover:text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
    }`}>
      Run Engine Sync
    </button>
  </div>
);
