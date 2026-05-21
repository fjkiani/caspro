'use client';

import Link from 'next/link';
import type { EngineEntry } from '@/data/engine-registry';
import { TOP_NAV_ITEMS } from './nav-items';
import { pathsEqual } from './paths';
import type { NavTheme } from './nav-theme';

type ZetaMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: NavTheme['navMuted'];
  productEngines: EngineEntry[];
  navigate: (href: string) => void;
  // Legacy props kept for compatibility — no longer rendered
  manuscripts?: unknown[];
  blogPosts?: unknown[];
  blogCategories?: unknown[];
};

function linkRowClass(isDarkMode: boolean, isActive: boolean, navMuted: string) {
  return `uppercase block py-3 text-sm font-black tracking-widest border-b ${
    isDarkMode ? 'border-zinc-800' : 'border-slate-100'
  } ${isActive ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : navMuted}`;
}

export function ZetaMobileDrawer({
  open,
  onClose,
  pathname,
  isDarkMode,
  navMuted,
}: ZetaMobileDrawerProps) {
  return (
    <div
      className={`lg:hidden fixed inset-0 top-14 z-[1100] transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Site navigation"
    >
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={onClose} />
      <div
        className={`absolute inset-x-0 top-0 max-h-[min(85vh,calc(100dvh-3.5rem))] overflow-y-auto border-t shadow-2xl transform transition-transform duration-200 ${
          open ? 'translate-y-0' : '-translate-y-3'
        } ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}
      >
        <div className="px-4 py-4 space-y-6">

          {/* ── Dynamic TOP_NAV_ITEMS (Research, Target Validation, Resistance, MoA) ── */}
          <div className="flex flex-col gap-1">
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}
            >
              NAVIGATE
            </span>
            {TOP_NAV_ITEMS.map((item) => {
              const isActive = pathsEqual(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch={false}
                  onClick={onClose}
                  className={linkRowClass(isDarkMode, isActive, navMuted)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
