'use client';

// ============================================================================
// <LogStream/> — typewriter log-message reel. Public-safe messages only.
//
// Original log lines in the attached components included:
//   "RESOLVING COSINE_0.983..." — forbidden (cosine numeric disclosure)
//   "FETCHING_LATIFY_RECEIPT"    — forbidden (client name)
//   "EXECUTING_MAGNITUDE_FIT"    — forbidden (formula language)
// These are replaced with governance-anchored messages that reference the 5
// public GOVERNANCE_GUARDRAILS instead.
// ============================================================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LogStreamProps {
  messages: string[];
  isDarkMode?: boolean;
  intervalMs?: number;
  title?: string;
}

export default function LogStream({ messages, isDarkMode = true, intervalMs = 1200, title = 'Log stream' }: LogStreamProps) {
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    setVisible([]);
    const t = setInterval(() => {
      setVisible((prev) => {
        if (i >= messages.length) return prev;
        const next = [messages[i], ...prev].slice(0, 8);
        i += 1;
        return next;
      });
    }, intervalMs);
    return () => clearInterval(t);
  }, [messages, intervalMs]);

  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const bg = isDarkMode ? 'bg-zinc-950/60' : 'bg-white';
  const text = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const headText = isDarkMode ? 'text-white' : 'text-slate-950';
  const accent = isDarkMode ? 'text-cyan-500' : 'text-indigo-500';

  return (
    <div className={`p-4 border rounded flex flex-col ${bg} ${border}`}>
      <div className={`flex items-center gap-3 mb-3 border-b ${border} pb-2`}>
        <Terminal className={`w-3.5 h-3.5 ${accent}`} />
        <span className={`text-[10px] font-black uppercase tracking-widest ${headText}`}>{title}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>Streaming</span>
        </div>
      </div>
      <div className="flex-1 space-y-2 font-mono text-[10px] leading-relaxed min-h-[8rem]">
        <AnimatePresence initial={false}>
          {visible.map((m, i) => (
            <motion.div
              key={`${m}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: i === 0 ? 1 : 0.5 - i * 0.06, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${i === 0 ? `font-black ${headText}` : text}`}
            >
              <span className={muted}>[{visible.length - i}]</span>
              <span className="truncate uppercase">{m}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Public-safe log message sets bound to substrate guardrails
export const LOG_MESSAGES = {
  gateTier: [
    'ADMISSIBILITY GATE OPENING',
    'RANKER V-LOCK CONFIRMED',
    'AXIS BINDING: DDR·MAPK·PI3K·IO·EFFLUX',
    'MODALITIES SCANNING: CRISPR-DEP · CLINICAL · EXPRESSION',
    'EMITTING TIER: STRONG (CANDIDATE)',
    'RECEIPT WRITTEN TO LEDGER',
    'GATE-TIER SCAN COMPLETE',
  ],
  multiAsset: [
    'CROSS-ASSET COMPARE INITIATED',
    'PHARMACOLOGIC PANEL: PRISM · GDSC',
    'ISOGENIC CONVERGENCE CHECK ACTIVE',
    'RANKER V-LOCK CONFIRMED (SHARED)',
    'ASSET-BY-SUBGROUP MATRIX BUILT',
    'RECEIPT WRITTEN TO LEDGER',
    'MULTI-ASSET COMPARE COMPLETE',
  ],
  biomarker: [
    'CANDIDATE BIOMARKER INTAKE',
    'CLINICAL EVIDENCE PULL: CIVIC · CGI',
    'CRISPR DEPENDENCY CHECK: DEPMAP',
    'IN-VIVO ANCHOR SCAN',
    'TIER ASSIGNMENT: MECHANISTIC',
    'CURATOR-SIGN REQUIRED FOR ELEVATION',
    'BIOMARKER GRADE COMPLETE',
  ],
  population: [
    'ADDRESSABLE-POPULATION MODEL START',
    'AXES: VEGF · EFFLUX · IO',
    'CLINICAL + EXPRESSION EVIDENCE MERGE',
    'FUNNEL WIDTH: MECHANISM-ALIGNED',
    'RANKER V-LOCK CONFIRMED',
    'RECEIPT WRITTEN TO LEDGER',
    'POPULATION FUNNEL COMPLETE',
  ],
  mechanism: [
    'DIVERGENCE SCAN INITIATED',
    'CROSS-AXIS PROBE: DDR·MAPK·VEGF·IO·RSS',
    'IN-VIVO ANCHOR + CLINICAL PROBE',
    'RESPONDER-VS-NON-RESPONDER DELTA MAP',
    'INTERPRETABILITY PANEL OPEN',
    'RECEIPT WRITTEN TO LEDGER',
    'DIVERGENCE MAP COMPLETE',
  ],
};
