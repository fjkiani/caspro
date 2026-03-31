'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface EngineItem {
  id: string;
  label: string;
  icon: React.ElementType;
  desc: string;
  status: string;
  color: string;
  border: string;
}

interface EngineSidebarProps {
  engines: EngineItem[];
  activeEngine: string;
  setActiveEngine: (id: string) => void;
}

export const EngineSidebar: React.FC<EngineSidebarProps> = ({ engines, activeEngine, setActiveEngine }) => {
  return (
    <div className="w-full lg:w-[340px] border-b lg:border-r lg:border-b-0 border-[var(--border)] bg-[var(--card)]/30 p-4 lg:p-8 flex flex-col gap-4 lg:gap-6 lg:shrink-0 max-h-[40vh] lg:max-h-none">
      <div className="space-y-1 mb-2 lg:mb-4">
        <h2 className="text-[14px] font-black text-[var(--foreground)] uppercase tracking-[0.4em]">Tactical Intelligence</h2>
        <p className="text-[11px] text-zinc-500 uppercase font-bold tracking-widest">Multi-Engine Synthesis_v6</p>
      </div>

      <div className="flex flex-row overflow-x-auto lg:flex-col gap-3 pb-2 snap-x scrollbar-hide">
        {engines.map((engine) => {
          const isActive = activeEngine === engine.id;
          const Icon = engine.icon;
          return (
            <button
              key={engine.id}
              onClick={() => setActiveEngine(engine.id)}
              className={`shrink-0 min-w-[260px] lg:min-w-0 lg:w-full text-left p-4 lg:p-5 rounded border transition-all duration-500 group relative overflow-hidden snap-start ${
                isActive 
                ? `${engine.color} ${engine.border} shadow-[0_0_30px_rgba(34,211,238,0.1)]` 
                : 'bg-zinc-950/20 border-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-2.5 rounded ${isActive ? 'bg-cyan-500/20' : 'bg-zinc-900 group-hover:bg-zinc-800'}`}>
                   <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-zinc-600'}`} />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-zinc-600">ENGINE_{engine.id}</span>
                     {isActive && <motion.div layoutId="active-dot" className="w-1 h-1 rounded-full bg-cyan-500" />}
                   </div>
                   <h3 className={`text-[12px] font-black uppercase tracking-[0.2em] mt-0.5 ${isActive ? 'text-[var(--foreground)]' : 'text-zinc-500'}`}>
                     {engine.label}
                   </h3>
                </div>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-bg"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="hidden lg:block mt-auto p-4 rounded border border-zinc-900/50 bg-zinc-950/20">
         <div className="flex items-center justify-between text-[8px] font-black text-zinc-600 uppercase mb-2">
            <span>SYNC_STATUS</span>
            <span className="text-cyan-900">100%_NOMINAL</span>
         </div>
         <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-cyan-900" />
         </div>
      </div>
    </div>
  );
};
