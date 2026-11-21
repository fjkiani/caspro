'use client';

import { useTheme } from '@/context/ThemeContext';

/** Shared Tumor Board product chrome tokens — one place for shell + panels. */
export function useTbProductChrome() {
  const { isDarkMode } = useTheme();

  return {
    isDarkMode,
    bg: isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600',
    accent: isDarkMode ? 'text-cyan-400' : 'text-indigo-600',
    main: isDarkMode ? 'text-white' : 'text-slate-900',
    body: isDarkMode ? 'text-zinc-300' : 'text-slate-700',
    muted: isDarkMode ? 'text-zinc-500' : 'text-slate-500',
    border: isDarkMode ? 'border-white/5' : 'border-slate-200',
    rail: isDarkMode ? 'bg-zinc-950/50 border-zinc-800' : 'bg-white border-slate-200',
    laneA: isDarkMode
      ? 'border-cyan-500/40 bg-cyan-500/5'
      : 'border-indigo-200 bg-indigo-50/60',
    laneB: isDarkMode
      ? 'border-emerald-500/40 bg-emerald-500/5'
      : 'border-emerald-200 bg-emerald-50/60',
    dash: isDarkMode ? 'border-white/10' : 'border-black/10',
    header: isDarkMode
      ? 'border-white/5 bg-black/40'
      : 'border-slate-200 bg-white/80',
    tabBar: isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/40',
    footer: isDarkMode ? 'bg-black/40' : 'bg-white/80',
    tabOn: isDarkMode
      ? 'bg-cyan-500/5 text-cyan-400'
      : 'bg-indigo-50 text-indigo-700',
    tabOff: isDarkMode
      ? 'text-zinc-500 hover:bg-white/5 hover:text-white'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    cta: isDarkMode
      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
      : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100',
    iconBox: isDarkMode
      ? 'border-zinc-800 bg-zinc-950'
      : 'border-slate-200 bg-white',
    meterCard: isDarkMode
      ? 'border-white/10 bg-black/30'
      : 'border-black/10 bg-white/70',
    tabIndicator: isDarkMode ? 'bg-cyan-500' : 'bg-indigo-600',
  };
}

export type TbProductChrome = ReturnType<typeof useTbProductChrome>;

export function tbTabClass(on: boolean, chrome: TbProductChrome) {
  return `relative flex items-center gap-2 whitespace-nowrap border-r px-3 py-2 transition-all sm:px-4 ${chrome.border} ${
    on ? chrome.tabOn : chrome.tabOff
  }`;
}