'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Info,
  Box,
  Activity,
  ChevronRight,
  Database,
  Cpu,
  Zap
} from 'lucide-react';
import { MolecularViewer } from './MolecularViewer';

export const MolecularAnalysis: React.FC = () => {
  return (
    <div className="flex-1 grid grid-cols-12 gap-8 min-h-0 font-mono p-1">
      
      {/* Left: 3D Structure Analysis */}
      <section className="col-span-8 flex flex-col bg-zinc-950/40 border border-zinc-900 rounded p-10 relative overflow-hidden shadow-2xl">
         <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-6">
            <div className="flex items-center gap-4">
               <Box className="w-5 h-5 text-cyan-500" />
               <h2 className="text-[12px] font-black tracking-[0.4em] uppercase text-zinc-200">3D Structure Viewer: CAS9/gRNA/DNA Complex</h2>
            </div>
            <Activity className="w-4 h-4 text-cyan-900" />
         </div>
         <div className="flex-1 min-h-0">
            <MolecularViewer />
         </div>
      </section>

      {/* Right: Technical Metrics Panels */}
      <aside className="col-span-4 flex flex-col gap-8 h-full overflow-hidden">
        
        <div className="bg-zinc-950 border border-zinc-900 rounded p-8 space-y-10 shadow-2xl">
           <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CRISPR Target Analysis</span>
              <Info className="w-4 h-4 text-zinc-800" />
           </div>
           
           <div className="space-y-8">
              <div>
                 <div className="flex justify-between items-end mb-3">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Target Vulnerability</span>
                    <span className="text-3xl font-extralight text-white tracking-tighter">98.4%</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '98.4%' }} transition={{ duration: 2 }} className="h-full bg-cyan-500" />
                 </div>
              </div>

              <div className="flex justify-between items-center py-6 border-y border-zinc-900/50 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                 <span>Off-Target Risk</span>
                 <span className="text-2xl font-light text-rose-500 tracking-tighter">0.02%</span>
              </div>

              <div className="flex justify-between items-center pt-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                 <span>Structural Pass Rate</span>
                 <span className="text-2xl font-light text-emerald-500">100%</span>
              </div>
           </div>
        </div>

        {/* Genomic Sequence Viewer */}
        <div className="bg-zinc-950 border border-zinc-900 rounded p-8 shadow-2xl">
           <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Genomic Sequence & PAM</span>
              <div className="px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 text-[9px] font-black text-cyan-400 rounded-sm">PAM_ID: NGG</div>
           </div>
           <div className="font-mono text-[11px] leading-[2] break-all tracking-[0.2em] p-6 bg-black/60 rounded border border-zinc-900">
              TTC<span className="text-cyan-400 bg-cyan-500/10 px-0.5 border-b border-cyan-500/30">GAGATGTTCCTGGGGAGGCCGACAC</span>ATTCGGT<br/>
              GATAGTAGGGGGA<span className="text-rose-500 bg-rose-500/10 px-0.5 font-bold border border-rose-500/30">CCGCAC</span>GGCACCAGTGAGTG
           </div>
           <div className="mt-6 flex items-center gap-6 text-[9px] text-zinc-600 font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"/> Target Guide</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"/> PAM Motif</span>
           </div>
        </div>

        {/* Off-Target Prediction Log */}
        <div className="bg-zinc-950 border border-zinc-900 rounded p-8 flex-1 flex flex-col shadow-2xl overflow-hidden min-h-0">
           <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Off-Target Prediction Log</span>
              <ChevronRight className="w-4 h-4 text-zinc-800" />
           </div>
           <div className="flex-1 overflow-y-auto space-y-2 pr-3 custom-scrollbar">
              <div className="grid grid-cols-4 text-[9px] font-black text-zinc-700 uppercase tracking-widest pb-3 border-b border-zinc-900">
                 <span>Sequence</span><span>Chr</span><span>Mis</span><span className="text-right">Risk</span>
              </div>
              {[
                { s: 'GCTTGGTGACC', c: '26', m: '1', r: '0.8%', alert: false },
                { s: 'GCCTGGTGACC', c: 'C1', m: '2', r: '0.02%', alert: false },
                { s: 'GCGTGGTCACG', c: '15', m: '2', r: '0.9%', alert: false },
                { s: 'GCATCTCCCGT', c: '61', m: '2', r: 'NONE', alert: true },
              ].map((log, i) => (
                <div key={i} className="grid grid-cols-4 text-[10px] py-2.5 border-b border-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-default group">
                   <span className="truncate text-zinc-500 font-mono group-hover:text-zinc-300">{log.s}</span>
                   <span className="text-zinc-700 font-bold">{log.c}</span>
                   <span className="text-zinc-700 font-bold">{log.m}</span>
                   <span className={`text-right font-black ${log.alert ? 'text-zinc-800' : 'text-cyan-800'}`}>{log.r}</span>
                </div>
              ))}
           </div>
        </div>
      </aside>
    </div>
  );
};
