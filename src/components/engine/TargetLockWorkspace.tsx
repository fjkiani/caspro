'use client';

import Link from 'next/link';
import { ChevronLeft, Target } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TargetLockCascadeView } from '@/components/mockups/targetLock';
import { TARGET_LOCK_INTRO_PATH } from '@/lib/engine/paths';
import { FDA_ARTIFACTS } from '@/data/fda-prediction-data';

/**
 * Single-viewport workspace: interactive metastatic cascade only.
 * Context (two-layer matrix, thesis, explainer) lives on the intro route.
 */
export default function TargetLockWorkspace() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';

  return (
    <div
      className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-slate-600'
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      <header
        className={`relative z-10 shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b ${
          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={TARGET_LOCK_INTRO_PATH}
            className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shrink-0 ${textMuted} ${
              isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
            Overview
          </Link>
          <div className={`w-9 h-9 rounded border flex items-center justify-center shrink-0 ${panel}`}>
            <Target className={`w-4 h-4 ${accent}`} />
          </div>
          <div className="min-w-0">
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>Workspace</p>
            <h1 className={`text-sm sm:text-base font-black uppercase tracking-tight truncate ${textMain}`}>
              Metastatic Cascade Lock
            </h1>
          </div>
        </div>
        <p className={`hidden sm:block text-[9px] font-bold uppercase tracking-widest shrink-0 ${textMuted}`}>
          Click a step to lock a target
        </p>
      </header>

      <main className="relative z-10 flex-1 min-h-0 px-4 sm:px-6 py-3 overflow-hidden">
        <TargetLockCascadeView isDarkMode={isDarkMode} compact />
      </main>

      <footer
        className={`relative z-10 shrink-0 flex items-center gap-2 px-4 sm:px-6 py-2 border-t overflow-x-auto ${
          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
        }`}
      >
        <span className={`text-[9px] font-black uppercase tracking-widest shrink-0 ${textMuted}`}>
          Receipts
        </span>
        {FDA_ARTIFACTS.map((a) => (
          <a
            key={a.slug}
            href={a.slug}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[9px] font-mono px-2 py-1 rounded-sm border whitespace-nowrap shrink-0 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 text-cyan-600 hover:border-cyan-800'
                : 'border-slate-200 text-indigo-600 hover:border-indigo-300'
            }`}
          >
            {a.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
