"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HudPosition {
  x: number;
  y: number;
  visible: boolean;
}

interface DnaHudLabelsProps {
  hudPositions: Record<string, HudPosition>;
}

export const DnaHudLabels: React.FC<DnaHudLabelsProps> = ({ hudPositions }) => {
  const { isDarkMode } = useTheme();
  return (
    <AnimatePresence>
      {hudPositions.brca1?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.brca1.x, top: hudPositions.brca1.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 ml-4">
            <div className="w-1 h-1 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
            <div className="h-[1px] w-8 bg-gradient-to-r from-[#00E5FF]/50 to-transparent" />
            <div className="flex flex-col">
              <span className={`text-[10px] items-center gap-1.5 flex font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Target className="w-2.5 h-2.5 text-[#00E5FF]" /> SLC25A32</span>
              <span className="text-[9px] text-[#00E5FF]/70 uppercase">3.1Å STRUCT_GATE</span>
            </div>
          </div>
        </div>
      )}

      {hudPositions.at?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.at.x, top: hudPositions.at.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 mr-4 -translate-x-full">
            <div className="flex flex-col items-end">
              <span className={`text-[10px] items-center gap-1.5 flex font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>A / T <Target className="w-2.5 h-2.5 text-cyan-400" /></span>
              <span className="text-[9px] text-cyan-700 uppercase">SEQ_INDX_01</span>
            </div>
            <div className="h-[1px] w-8 bg-gradient-to-l from-cyan-500/50 to-transparent" />
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
          </div>
        </div>
      )}

      {hudPositions.match?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.match.x, top: hudPositions.match.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 ml-4">
            <div className="w-1 h-1 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#00E5FF]/50 to-transparent" />
            <div className="flex flex-col">
              <span className={`text-[10px] items-center gap-1.5 flex font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Target className="w-2.5 h-2.5 text-[#00E5FF]" /> C / G</span>
              <span className="text-[9px] text-[#00E5FF]/70 uppercase">MATCH_DELTA</span>
            </div>
          </div>
        </div>
      )}

      {hudPositions.rad51?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.rad51.x, top: hudPositions.rad51.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 mr-4 -translate-x-full">
            <div className="flex flex-col items-end">
              <span className={`text-[9px] items-center gap-1.5 flex font-bold tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>RAD51: 4.84323A</span>
              <span className="text-[8px] text-zinc-600 uppercase">8 EXT 8 DEG</span>
            </div>
            <div className="h-[1px] w-4 bg-gradient-to-l from-zinc-500/50 to-transparent" />
            <div className="w-0.5 h-0.5 bg-zinc-400 rounded-full" />
          </div>
        </div>
      )}

      {hudPositions.dnoi?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.dnoi.x, top: hudPositions.dnoi.y }}>
           <div className="flex items-center gap-2 -translate-y-1/2 mr-4 -translate-x-full">
            <div className="flex flex-col items-end">
              <span className={`text-[9px] font-bold tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>DNOI: -0.0543</span>
              <span className="text-[8px] text-zinc-600 uppercase">BASE PAIRS</span>
            </div>
             <div className="h-[1px] w-4 bg-gradient-to-l from-cyan-500/50 to-transparent" />
            <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full" />
          </div>
        </div>
      )}

      {hudPositions.tp53?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.tp53.x, top: hudPositions.tp53.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 ml-4">
            <div className="w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
            <div className="h-[1px] w-6 bg-gradient-to-r from-amber-500/50 to-transparent" />
            <div className="flex flex-col">
              <span className={`text-[9px] font-bold tracking-widest ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>MBD4: LOF</span>
              <span className="text-[8px] text-amber-500 uppercase">SL_TRIGGER_ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {hudPositions.hras?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.hras.x, top: hudPositions.hras.y }}>
           <div className="flex items-center gap-2 -translate-y-1/2 mr-4 -translate-x-full">
            <div className="flex flex-col items-end">
              <span className={`text-[9px] font-bold tracking-widest ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>HRAS: AMP</span>
              <span className="text-[8px] text-purple-800 uppercase">COPY NUMBER GAIN</span>
            </div>
            <div className="h-[1px] w-6 bg-gradient-to-l from-purple-500/50 to-transparent" />
            <div className="w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" />
          </div>
        </div>
      )}

      {hudPositions.cgX?.visible && (
        <div className="absolute z-20 pointer-events-none transition-opacity duration-300" style={{ left: hudPositions.cgX.x, top: hudPositions.cgX.y }}>
          <div className="flex items-center gap-2 -translate-y-1/2 ml-4">
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
            <div className="h-[1px] w-8 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <div className="flex flex-col">
              <span className={`text-[10px] items-center gap-1.5 flex font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><Target className="w-2.5 h-2.5 text-cyan-400" /> C / G</span>
              <span className="text-[9px] text-cyan-700 uppercase">SEQ_INDX_02</span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
