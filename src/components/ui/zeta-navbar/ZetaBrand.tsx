'use client';

import Link from 'next/link';
import type { NavTheme } from './nav-theme';

type ZetaBrandProps = {
  isDarkMode: boolean;
  brandBorder: NavTheme['brandBorder'];
};

export function ZetaBrand({ isDarkMode, brandBorder }: ZetaBrandProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-8 min-w-0 shrink-0">
      <Link href="/" prefetch={false} className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          className={`w-6 h-6 rounded flex items-center justify-center border shadow-[0_0_10px_rgba(6,182,212,0.2)] ${
            isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-900 border-slate-700'
          }`}
        >
          <span className="text-[12px] leading-none" aria-hidden="true">
            🧬
          </span>
        </div>
        <span
          className={`text-lg sm:text-xl font-black tracking-tighter pr-2 sm:pr-4 border-r whitespace-nowrap uppercase ${brandBorder}`}
        >
          CRISPRO<span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>.AI</span>
        </span>
      </Link>
    </div>
  );
}
