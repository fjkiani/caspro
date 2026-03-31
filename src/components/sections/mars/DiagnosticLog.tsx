'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import type { DiagnosticEntry } from '@/data/trial-case-files';

interface DiagnosticLogProps {
  entries: DiagnosticEntry[];
  isDarkMode: boolean;
}

const LEVEL_CLASSES: Record<string, { dark: string; light: string }> = {
  info:    { dark: 'text-zinc-300', light: 'text-slate-700' },
  warn:    { dark: 'text-amber-400', light: 'text-amber-700' },
  success: { dark: 'text-emerald-400', light: 'text-emerald-700' },
  error:   { dark: 'text-rose-400', light: 'text-rose-600' },
  system:  { dark: 'text-zinc-100 font-bold', light: 'text-slate-950 font-black' },
};

export const DiagnosticLog: React.FC<DiagnosticLogProps> = ({ entries, isDarkMode }) => (
  <div className={`border rounded-sm p-8 flex-1 flex flex-col shadow-2xl overflow-hidden transition-colors duration-500 ${
    isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'
  }`}>
    <div className={`flex justify-between items-center mb-6 pb-3 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
      <div className="flex items-center gap-3">
        <Terminal className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-indigo-400'}`} />
        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>Diagnostic Log</span>
      </div>
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    </div>
    <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-3 pr-2 scrollbar-hide transition-colors">
      {entries.map((entry, i) => {
        const cls = LEVEL_CLASSES[entry.level] || LEVEL_CLASSES.info;
        return (
          <p key={i} className={isDarkMode ? cls.dark : cls.light}>
            [{entry.time}] {entry.message}
          </p>
        );
      })}
    </div>
  </div>
);
