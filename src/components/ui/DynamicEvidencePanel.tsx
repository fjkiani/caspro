'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { HeadlineEntry } from '@/data/hero-headlines';

// ==============================================================================
// DYNAMIC EVIDENCE PANEL — syncs with GlitchTypewriter via activeIndex
// Renders the evidence data from the currently active headline.
// ==============================================================================

interface DynamicEvidencePanelProps {
  headlines: HeadlineEntry[];
  activeIndex: number;
  isDarkMode: boolean;
  accentColor: string;       // e.g. 'text-cyan-400' — used for accent rows
}

export const DynamicEvidencePanel: React.FC<DynamicEvidencePanelProps> = ({
  headlines, activeIndex, isDarkMode, accentColor,
}) => {
  const current = headlines[activeIndex % headlines.length];
  const evidence = current?.evidence;
  if (!evidence) return null;

  const bodyText = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const bg = isDarkMode ? 'bg-zinc-950/60' : 'bg-slate-50';

  const colorMap: Record<string, string> = {
    accent: accentColor,
    rose: 'text-rose-500',
    emerald: 'text-emerald-500',
    muted: bodyText,
    body: bodyText,
  };

  // Map accent text class to bg class for the button
  const accentBgMap: Record<string, string> = {
    'text-cyan-400': 'bg-cyan-500 hover:bg-cyan-400',
    'text-indigo-600': 'bg-indigo-600 hover:bg-indigo-500',
    'text-red-400': 'bg-red-500 hover:bg-red-400',
    'text-red-500': 'bg-red-600 hover:bg-red-500',
    'text-amber-400': 'bg-amber-500 hover:bg-amber-400',
    'text-amber-600': 'bg-amber-600 hover:bg-amber-500',
    'text-rose-400': 'bg-rose-500 hover:bg-rose-400',
    'text-rose-600': 'bg-rose-600 hover:bg-rose-500',
  };
  const btnBg = accentBgMap[accentColor] || 'bg-cyan-500 hover:bg-cyan-400';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`evidence-${activeIndex}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`border rounded-sm p-3 sm:p-4 ${bg} ${border}`}
      >
        <span className={`text-[9px] font-black uppercase tracking-[0.4em] block mb-4 ${muted}`}>
          {evidence.title}
        </span>

        <div className="flex flex-col gap-2.5">
          {evidence.rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3 min-w-0">
              <span className={`text-[10px] font-black uppercase tracking-widest shrink-0 ${heading}`}>
                {row.label}
              </span>
              <span
                className={`text-[11px] sm:text-[12px] break-all sm:break-normal text-right sm:text-left ${
                  row.color === 'body' || row.color === 'muted'
                    ? 'font-medium leading-relaxed'
                    : 'font-black'
                } ${colorMap[row.color || 'accent']}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Impact footer */}
        {evidence.impact && (
          <div className={`mt-4 pt-3 border-t flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between ${border}`}>
            <span className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>
              {evidence.impact}
            </span>
            <span className={`text-xs sm:text-sm font-black tracking-tight ${accentColor}`}>
              {evidence.impactValue}
            </span>
          </div>
        )}

        {/* Proof CTA button */}
        {evidence.proofId && (
          <Link href={`/ledger/${evidence.proofId}/`} prefetch={false} className="block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-white text-[10px] font-black uppercase tracking-[0.3em] cursor-pointer transition-colors ${btnBg}`}
            >
              {evidence.proofLabel || 'View De-Risking Map'}
              <ArrowRight size={12} strokeWidth={3} />
            </motion.div>
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
