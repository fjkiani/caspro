"use client";

import React from 'react';
import { Terminal } from 'lucide-react';
import { GENES, MOCK_COHORT_DATA } from '@/data/dna-hero-data';

export const GenomicStream: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-12">
      {/* Terminal Section */}
      <div className="flex items-center justify-between mb-24 border-b border-zinc-900 pb-12">
        <div className="flex items-center gap-6">
          <Terminal className="w-6 h-6 text-cyan-500" />
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white">Genomic Stream Processing</h2>
        </div>
        <div className="px-8 py-2 rounded bg-zinc-950 border border-zinc-800 text-[9px] text-cyan-500 font-bold uppercase tracking-widest flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          STATUS: NOMINAL_v6.2
        </div>
      </div>

      <div className="grid grid-cols-[240px_repeat(6,1fr)] gap-10 border-b border-zinc-800 pb-6 mb-6 text-[10px] font-black text-zinc-700 uppercase tracking-[0.35em]">
         <div>Cohort UID</div>
         {GENES.map(g => <div key={g}>{g}</div>)}
      </div>

      <div className="space-y-1">
         {MOCK_COHORT_DATA.map((row) => (
            <div key={row.id} className="grid grid-cols-[240px_repeat(6,1fr)] gap-10 py-7 border-b border-zinc-900/40 hover:bg-cyan-500/5 transition-all cursor-default group">
               <div className="text-[12px] text-zinc-500 group-hover:text-white transition-colors">{row.id}</div>
               {GENES.map(g => (
                  <div key={g} className="text-[12px] text-cyan-400/80">
                     {row[g as keyof typeof row]}
                  </div>
               ))}
            </div>
         ))}
      </div>
    </div>
  );
};
