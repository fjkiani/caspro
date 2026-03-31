"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Activity, Cpu, ShieldCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { MarsDnaBackground } from './MarsDnaBackground';
import { IoRiskBenefitChart } from './IoRiskBenefitChart';
import { EngineSidebar } from './EngineSidebar';
import { RiskBenefitGate } from './RiskBenefitGate';
import { VectorFailureAnalysis } from './VectorFailureAnalysis';
import KillChainIntercept from './KillChainIntercept';
import TargetIdentificationEngine from '@/components/mockups/targetLock';
import SyntheticLethalityEngine from '@/components/mockups/SyntheticLethalityEngine';
import SafetyDosingEngine from '@/components/mockups/dosing';
import EvidenceLedgerEngine from '@/components/mockups/evidenceMatrix';
import { toSidebarItems, getEngineById, ENGINE_REGISTRY } from '@/data/engine-registry';

const ENGINES = toSidebarItems();

// ─── Glitch Typewriter ─────────────────────────────────────────────────────────
const GLITCH_CHARS = '!@#$%^&*<>[]{}|\\/~`';

function GlitchTypewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const full = phrases[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (display.length < full.length) {
        // Scramble then settle
        timer = setTimeout(() => {
          const real = full.charAt(display.length);
          const glitch = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          setDisplay(prev => prev + glitch);
          setTimeout(() => {
            setDisplay(prev => prev.slice(0, -1) + real);
          }, 30);
        }, 55);
      } else {
        setIsPaused(true);
        timer = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 3200);
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(prev => prev.slice(0, -1)), 22);
      } else {
        setIsDeleting(false);
        setIndex(prev => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timer);
  }, [display, isDeleting, isPaused, index, phrases]);

  return (
    <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--muted)]/20 min-h-[44px] flex items-center">
      <span className="text-[11px] font-mono text-cyan-400/80 tracking-wider">
        <span className="text-cyan-600/50 mr-2 select-none">▸</span>
        {display}
        <span className="animate-pulse ml-0.5 text-cyan-400">█</span>
      </span>
    </div>
  );
}

// ─── Clock ─────────────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}_MS`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Main EngineStack ──────────────────────────────────────────────────────────
export const EngineStack: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState('03');
  const [isScanning, setIsScanning] = useState(false);
  const [scanPos, setScanPos] = useState(0);
  const [speed, setSpeed] = useState(1);

  const clock = useClock();
  const activeEngineData = ENGINES.find(e => e.id === activeEngine);
  const activeRegistry = ENGINE_REGISTRY.find(e => e.id === activeEngine);
  const activeCount = ENGINES.length;

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setSpeed(12);
    let start: number | null = null;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(progress / duration, 1);
      setScanPos(val);
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => { setIsScanning(false); setSpeed(1); setScanPos(0); }, 500);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] text-[var(--foreground)] font-mono selection:bg-cyan-500/30 overflow-hidden relative min-h-screen">
      <MarsDnaBackground speed={speed} />
      
      {/* Platform Header — lean */}
      <div className="absolute top-0 left-0 right-0 z-[40] flex items-end justify-between px-6 md:px-12 py-8 pointer-events-none">
         <div className="flex items-end gap-4 md:gap-8">
            <div className="flex flex-col">
               <span className="text-[9px] md:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1">In-Silico Precision Oncology</span>
               <h1 className="text-2xl md:text-4xl font-black text-[var(--foreground)] uppercase tracking-tighter leading-none">Intelligence Stack</h1>
            </div>
            <div className="hidden sm:block h-10 w-px bg-[var(--border)] mb-1" />
            <span className="hidden sm:inline text-xl font-light text-[var(--foreground)]/50 tabular-nums mb-1">{clock}</span>
         </div>
         <span className="hidden sm:inline text-[11px] font-bold text-[var(--foreground)]/30 uppercase tracking-widest mb-2">{activeCount} Engines Active</span>
      </div>

      {/* Main Stack Content */}
      <div className="flex-1 flex flex-col lg:flex-row mt-28 md:mt-32 relative z-10 border-t border-[var(--border)]">
        <EngineSidebar 
          engines={ENGINES} 
          activeEngine={activeEngine} 
          setActiveEngine={setActiveEngine} 
        />

        {/* Dynamic Context Area */}
        <div className="flex-1 relative flex flex-col bg-[var(--card)] backdrop-blur-sm">
           {/* Scan Line Overlay */}
           <motion.div 
             animate={{ top: ['0%', '100%', '0%'] }}
             transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
             className="absolute left-0 right-0 h-px bg-cyan-500/20 z-20 pointer-events-none"
           />

           <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Engine Route Link */}
              {(() => {
                const engineMeta = getEngineById(activeEngine);
                return engineMeta ? (
                  <div className="flex items-center justify-end px-6 py-3 border-b border-[var(--border)] bg-[var(--muted)]/30">
                    <Link
                      href={engineMeta.route}
                      className="flex items-center gap-2 text-[11px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-300 transition-colors"
                    >
                      Open Full Engine <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ) : null;
              })()}

              {/* Per-Engine Glitch Typewriter */}
              <AnimatePresence mode="wait">
                {activeRegistry?.typewriterPhrases && (
                  <motion.div key={`tw-${activeEngine}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <GlitchTypewriter phrases={activeRegistry.typewriterPhrases} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 p-6 flex flex-col h-full overflow-auto">
              <AnimatePresence mode="wait">
                {activeEngine === '04' ? (
                  <motion.div 
                    key="io-gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-hidden"
                  >
                    <div className="flex-1 overflow-hidden">
                       <RiskBenefitGate />
                    </div>
                    <div className="h-[200px] border-t border-[var(--border)] overflow-hidden bg-[var(--card)]">
                       <IoRiskBenefitChart 
                         isScanning={isScanning} 
                         scanPos={scanPos} 
                         onInitiateScan={handleScan} 
                       />
                    </div>
                  </motion.div>
                ) : activeEngine === '03' ? (
                  <motion.div 
                    key="kill-chain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-auto"
                  >
                     <KillChainIntercept />
                  </motion.div>
                ) : activeEngine === '02' ? (
                  <motion.div 
                    key="mechanism-alignment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full"
                  >
                     <VectorFailureAnalysis />
                  </motion.div>
                ) : activeEngine === '01' ? (
                  <motion.div 
                    key="target-lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-auto"
                  >
                     <TargetIdentificationEngine />
                  </motion.div>
                ) : activeEngine === '05' ? (
                  <motion.div 
                    key="synthetic-lethality" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-auto"
                  >
                     <SyntheticLethalityEngine />
                  </motion.div>
                ) : activeEngine === '06' ? (
                  <motion.div
                    key="safety-dosing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-auto"
                  >
                    <SafetyDosingEngine />
                  </motion.div>
                ) : activeEngine === '07' ? (
                  <motion.div
                    key="evidence-ledger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col h-full overflow-auto"
                  >
                    <EvidenceLedgerEngine />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="other-engine-context"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                      <Database className="w-8 h-8 text-zinc-700" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-[var(--foreground)] uppercase tracking-tighter">
                        {activeEngineData?.label}
                      </h3>
                      <p className="text-zinc-500 text-[11px] max-w-md uppercase font-bold leading-relaxed tracking-widest text-center">
                        Initializing diagnostic simulation for engine {activeEngine}...
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
        </div>
      </div>

      {/* Target Background Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
         <div className="w-[70rem] h-[70rem] border border-cyan-400 rounded-full flex items-center justify-center">
            <div className="w-[50rem] h-[50rem] border border-cyan-400 rounded-full" />
            <div className="absolute w-full h-px bg-cyan-400" />
            <div className="absolute h-full w-px bg-cyan-400" />
         </div>
      </div>

      {/* Footer Meta */}
      <footer className="z-10 mt-12 py-8 px-12 border-t border-[var(--border)] flex justify-between items-end pointer-events-none">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
             <span className="text-[11px] font-black text-[var(--foreground)]/20 uppercase tracking-[0.5em]">Platform Intelligence v6.2</span>
             <div className="flex items-center gap-8 mt-1">
                <span className="text-2xl font-light text-cyan-500 tracking-tighter leading-none">AUC 0.822</span>
                <div className="h-6 w-px bg-[var(--border)]" />
                <span className="text-[11px] font-bold text-[var(--foreground)]/30 uppercase tracking-[0.3em]">n=29 NeoPembrOV Cohort</span>
             </div>
          </div>
        </div>
        <div className="flex gap-8 opacity-20 text-cyan-500">
           <Activity className="w-5 h-5" />
           <Database className="w-5 h-5" />
           <Cpu className="w-5 h-5" />
           <ShieldCheck className="w-5 h-5" />
        </div>
      </footer>
    </div>
  );
};
