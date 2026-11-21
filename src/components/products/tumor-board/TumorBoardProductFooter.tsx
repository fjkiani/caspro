'use client';

import Link from 'next/link';
import type { TbProductChrome } from './useTbProductChrome';

export function TumorBoardProductFooter({
  chrome,
  footerLabel,
}: {
  chrome: TbProductChrome;
  footerLabel: string;
}) {
  return (
    <footer className={`shrink-0 border-t ${chrome.border} ${chrome.footer}`}>
      <div
        className={`mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest sm:px-8 ${chrome.muted}`}
      >
        <span>
          {footerLabel}
          <span className={`ml-2 font-normal normal-case ${chrome.muted}`}>· Research use only</span>
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/tumor-board/"
            className={chrome.isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
          >
            Live workspace
          </Link>
          <span className={`h-3 w-px ${chrome.isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
          <Link
            href="/contact/"
            className={chrome.isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}