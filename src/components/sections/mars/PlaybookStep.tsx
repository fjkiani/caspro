'use client';

import React from 'react';
import type { PlaybookStep as PlaybookStepData } from '@/data/trial-case-files';

interface PlaybookStepProps {
  step: number;
  title: string;
  desc: string;
  active: boolean;
  isDarkMode: boolean;
}

export const PlaybookStep: React.FC<PlaybookStepProps> = ({ step, title, desc, active, isDarkMode }) => (
  <div className={`p-4 sm:p-5 border rounded-sm transition-all duration-700 flex gap-3 sm:gap-5 min-w-0 ${
    active
      ? (isDarkMode ? 'bg-cyan-900/10 border-cyan-500/50 sm:scale-[1.02]' : 'bg-indigo-50 border-indigo-400 shadow-xl shadow-indigo-100 sm:scale-[1.02]')
      : (isDarkMode ? 'bg-zinc-950 border-zinc-800 opacity-80' : 'bg-white border-slate-200 opacity-90')
  }`}>
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black ${
      active
        ? (isDarkMode ? 'bg-cyan-500 text-black shadow-[0_0_15px_#22d3ee]' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200')
        : (isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-600')
    }`}>
      {step}
    </div>
    <div className="space-y-1">
      <h4 className={`text-[11px] font-black uppercase tracking-widest ${active ? (isDarkMode ? 'text-white' : 'text-indigo-900') : (isDarkMode ? 'text-zinc-300' : 'text-slate-700')}`}>{title}</h4>
      <p className={`text-[11px] leading-relaxed font-medium ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>{desc}</p>
    </div>
  </div>
);

/** Render a grid of PlaybookSteps from typed data */
export const PlaybookGrid: React.FC<{
  steps: PlaybookStepData[];
  currentStep: number;
  isDarkMode: boolean;
}> = ({ steps, currentStep, isDarkMode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {steps.map((s, i) => (
      <PlaybookStep key={i} step={i + 1} title={s.title} desc={s.desc} active={currentStep >= i} isDarkMode={isDarkMode} />
    ))}
  </div>
);
