'use client';

import Link from 'next/link';
import type { NavDropdownItem, NavTopItem } from './nav-items';
import { TOP_NAV_ITEMS, SITEMAP_ITEMS } from './nav-items';
import { pathsEqual } from './paths';

type ZetaMobileDrawerProps = {
  navItems?: NavTopItem[];
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: string;
  navigate: (href: string) => void;
  onDropdownClick?: (sub: NavDropdownItem) => void;
};

function linkRowClass(isDarkMode: boolean, isActive: boolean, navMuted: string) {
  return `uppercase block py-3 text-sm font-black tracking-widest border-b ${
    isDarkMode ? 'border-zinc-800' : 'border-slate-100'
  } ${isActive ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : navMuted}`;
}

function isNavItemActive(pathname: string | null, href: string, itemId: string): boolean {
  if (pathsEqual(pathname, href)) return true;
  const norm = (pathname ?? '').replace(/\/+$/, '') || '/';
  // Flat capability nav — matches ZetaDesktopNav.
  if (itemId === 'target-lock' && norm.startsWith('/engine/target-lock')) return true;
  if (itemId === 'moa-align' && norm.startsWith('/engine/mechanism-alignment')) return true;
  if (itemId === 'sl-engine' && norm.startsWith('/engine/synthetic-lethality')) return true;
  if (itemId === 'tumor-board' && norm.startsWith('/tumor-board')) return true;
  if (itemId === 'ledger' && norm.startsWith('/ledger')) return true;
  // Sitemap items (mobile only) — highlight when their route family is active.
  if (itemId === 'research' && (norm.startsWith('/research') || norm.startsWith('/blog') || norm.startsWith('/manuscripts'))) return true;
  if (itemId === 'abstracts' && norm.startsWith('/research/abstracts')) return true;
  if (itemId === 'governance' && norm.startsWith('/governance')) return true;
  if (itemId === 'pipeline' && norm.startsWith('/pipeline')) return true;
  if (itemId === 'org') return false;
  return false;
}

export function ZetaMobileDrawer({
  navItems = TOP_NAV_ITEMS,
  open,
  onClose,
  pathname,
  isDarkMode,
  navMuted,
  navigate,
  onDropdownClick,
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
          <div className="flex flex-col gap-4">
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}
            >
              CAPABILITIES
            </span>
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href, item.id);
              const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

              return (
                <div key={item.id} className="flex flex-col gap-1">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className={linkRowClass(isDarkMode, false, navMuted)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={false}
                      onClick={onClose}
                      className={linkRowClass(isDarkMode, isActive, navMuted)}
                    >
                      {item.label}
                    </Link>
                  )}
                  {hasDropdown &&
                    item.dropdownItems!.map((sub) => (
                      <button
                        key={`${sub.href}-${sub.label}`}
                        type="button"
                        onClick={() => {
                          (onDropdownClick ?? ((s) => navigate(s.href)))(sub);
                          onClose();
                        }}
                        className={`text-left pl-3 py-2 text-[11px] font-bold uppercase tracking-wider border-l-2 ${
                          isDarkMode
                            ? 'border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/50'
                            : 'border-slate-200 text-slate-600 hover:text-indigo-700 hover:border-indigo-300'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                </div>
              );
            })}
          </div>

          {/* Secondary sitemap — only in mobile drawer; keeps Research/Abstracts/Governance/Pipeline reachable. */}
          <div className={`flex flex-col gap-3 pt-2 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}
            >
              SITEMAP
            </span>
            {SITEMAP_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item.href, item.id);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  prefetch={false}
                  onClick={onClose}
                  className={`flex flex-col gap-0.5 py-2 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}
                >
                  <span className={`uppercase text-[12px] font-black tracking-widest ${
                    isActive
                      ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600')
                      : (isDarkMode ? 'text-zinc-300' : 'text-slate-700')
                  }`}>
                    {item.label}
                  </span>
                  {item.description && (
                    <span className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                      {item.description}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
