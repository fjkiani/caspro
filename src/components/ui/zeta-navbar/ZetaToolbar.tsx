'use client';

import type { MouseEvent as ReactMouseEvent } from 'react';
import { Activity, Play, Settings, User, Eye, EyeOff, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

type ZetaToolbarProps = {
  isDarkMode: boolean;
  mobileMenuOpen: boolean;
  toggleMobileMenu: (e?: ReactMouseEvent<HTMLButtonElement>) => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
  isProcessing: boolean;
  onCtaClick: () => void;
};

export function ZetaToolbar({
  isDarkMode,
  mobileMenuOpen,
  toggleMobileMenu,
  isLargeText,
  toggleLargeText,
  isProcessing,
  onCtaClick,
}: ZetaToolbarProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
      <button
        type="button"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        onClick={toggleMobileMenu}
        className={`lg:hidden p-2 rounded-sm border transition-colors ${
          isDarkMode ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <button
        type="button"
        onClick={toggleLargeText}
        title={isLargeText ? 'Disable Large Text' : 'Enable Large Text Mode (Visual Impairment)'}
        className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-all ${
          isLargeText
            ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
            : isDarkMode
              ? 'border-zinc-700 text-zinc-500 hover:text-zinc-100 hover:border-zinc-500'
              : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400'
        }`}
      >
        {isLargeText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        <span className="hidden xl:inline">{isLargeText ? 'A−' : 'A+'}</span>
      </button>

      <ThemeToggle />

      <button
        type="button"
        onClick={onCtaClick}
        disabled={isProcessing}
        className={`uppercase flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-2.5 rounded-sm border text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${
          isProcessing
            ? isDarkMode
              // Dark processing: subtle cyan pulse
              ? 'bg-zinc-900 border-zinc-800 text-cyan-500 animate-pulse pointer-events-none'
              // Light processing: neutral grey — clearly muted, readable
              : 'bg-slate-200 border-slate-300 text-slate-500 animate-pulse pointer-events-none'
            : isDarkMode
              // Dark idle: white bg, black text → cyan on hover
              ? 'bg-zinc-100 text-black hover:bg-cyan-500 hover:text-white border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.08)]'
              // Light idle: solid indigo — white text, high contrast
              : 'bg-indigo-600 text-white text-on-primary hover:bg-indigo-700 border-indigo-600 shadow-md'
        }`}
      >
        {isProcessing ? <Activity className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        {isProcessing ? 'PROCESSING…' : 'CONFIRM CERTAINTY'}
      </button>

      <div className={`hidden sm:block h-6 w-px mx-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />

      <div className="hidden sm:flex items-center gap-4">
        <Settings
          className={`w-4 h-4 cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-900'}`}
        />
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <User
            className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-500 hover:text-slate-900'}`}
          />
        </div>
      </div>
    </div>
  );
}
