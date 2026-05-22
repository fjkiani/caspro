'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import type { NavDropdownItem, NavTopItem } from './nav-items';
import { TOP_NAV_ITEMS } from './nav-items';
import { pathsEqual } from './paths';
import type { NavTheme } from './nav-theme';

type ZetaDesktopNavProps = {
  navItems?: NavTopItem[];
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: NavTheme['navMuted'];
  navHover: NavTheme['navHover'];
  navigate: (href: string) => void;
  onDropdownClick?: (sub: NavDropdownItem) => void;
  openDropdownId: string | null;
  openDropdown: (id: string) => void;
  scheduleCloseDropdown: () => void;
  cancelCloseDropdown: () => void;
  setDropdownRef: (id: string, el: HTMLDivElement | null) => void;
  // Legacy props kept for compatibility — no longer rendered
  blogOpen?: boolean;
  setBlogOpen?: (open: boolean) => void;
  manuscriptsOpen?: boolean;
  setManuscriptsOpen?: (open: boolean) => void;
  toggleDropdown?: (id: string) => void;
  blogRef?: React.RefObject<HTMLDivElement>;
  manuscriptsRef?: React.RefObject<HTMLDivElement>;
  manuscripts?: unknown[];
  blogPosts?: unknown[];
  blogCategories?: unknown[];
};

function isNavItemActive(pathname: string | null, href: string, itemId: string): boolean {
  if (pathsEqual(pathname, href)) return true;
  const norm = (pathname ?? '').replace(/\/+$/, '') || '/';
  if (itemId === 'ledger' && norm.startsWith('/ledger')) return true;
  if (
    itemId === 'research' &&
    ((norm.startsWith('/research') && !norm.startsWith('/research/abstracts')) ||
      norm.startsWith('/blog') ||
      norm.startsWith('/manuscripts') ||
      norm.startsWith('/media'))
  ) {
    return true;
  }
  if (itemId === 'abstracts' && norm.startsWith('/research/abstracts')) return true;
  if (itemId === 'engines' && norm.startsWith('/engine')) return true;
  return false;
}

function navLinkClass(isActive: boolean, isDarkMode: boolean, navHover: string) {
  return `uppercase transition-colors whitespace-nowrap shrink-0 ${
    isActive ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1` : navHover
  }`;
}

function dropdownShell(isDarkMode: boolean, wide = false) {
  return `absolute top-full left-0 mt-2 ${wide ? 'w-[340px]' : 'w-[300px]'} max-h-[min(72vh,26rem)] flex flex-col rounded-sm shadow-2xl backdrop-blur-xl z-[100] overflow-hidden border ${
    isDarkMode ? 'bg-zinc-950/98 border-zinc-800' : 'bg-white border-slate-200'
  }`;
}

function dropdownHeader(isDarkMode: boolean) {
  return `shrink-0 px-5 py-3 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`;
}

function dropdownHeaderLabel(isDarkMode: boolean) {
  return `text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`;
}

function scrollBody() {
  return 'min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-2';
}

export function ZetaDesktopNav({
  navItems = TOP_NAV_ITEMS,
  pathname,
  isDarkMode,
  navMuted,
  navHover,
  navigate,
  onDropdownClick,
  openDropdownId,
  openDropdown,
  scheduleCloseDropdown,
  cancelCloseDropdown,
  setDropdownRef,
}: ZetaDesktopNavProps) {
  useSearchParams();

  return (
    <div
      className={`hidden lg:flex flex-1 min-w-0 justify-end flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-black tracking-widest ${navMuted}`}
    >
      {navItems.map((item) => {
        const isActive = isNavItemActive(pathname, item.href, item.id);
        const hasDropdown = Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0;
        const isOpen = openDropdownId === item.id;

        if (!hasDropdown) {
          return (
            <Link key={item.id} href={item.href} prefetch={false} className="shrink-0">
              <span className={navLinkClass(isActive, isDarkMode, navHover)}>{item.label}</span>
            </Link>
          );
        }

        return (
          <div
            key={item.id}
            className="relative shrink-0"
            ref={(el) => setDropdownRef(item.id, el)}
            onMouseEnter={() => {
              cancelCloseDropdown();
              openDropdown(item.id);
            }}
            onMouseLeave={scheduleCloseDropdown}
          >
            <Link
              href={item.href}
              prefetch={false}
              className={`inline-flex items-center gap-2 ${navLinkClass(isActive, isDarkMode, navHover)}`}
            >
              {item.label}
              <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
            </Link>

            {isOpen && (
              <div className={dropdownShell(isDarkMode, item.id === 'ledger' || item.id === 'abstracts')}>
                <div className={dropdownHeader(isDarkMode)}>
                  <span className={dropdownHeaderLabel(isDarkMode)}>{item.label}</span>
                </div>
                <div className={scrollBody()}>
                  <button
                    type="button"
                    onClick={() => navigate(item.href)}
                    className={`mx-2 mb-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-sm px-3 py-2.5 text-left text-[12px] font-black uppercase tracking-widest ${
                      isActive
                        ? isDarkMode
                          ? 'bg-cyan-500/15 text-cyan-300'
                          : 'bg-indigo-50 text-indigo-900'
                        : isDarkMode
                          ? 'text-zinc-100 hover:bg-zinc-900'
                          : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.id === 'ledger' ? 'Trial ledger hub // LOCKED' : 'Overview'}
                    <span className="text-[10px] font-black text-cyan-500/60">→</span>
                  </button>
                  {item.dropdownItems!.map((sub) => (
                    <button
                      key={`${sub.href}-${sub.label}`}
                      type="button"
                      onClick={() => (onDropdownClick ?? ((s) => navigate(s.href)))(sub)}
                      className={`flex w-full flex-col gap-0.5 px-5 py-2.5 text-left transition-colors ${
                        pathsEqual(pathname, sub.href)
                          ? isDarkMode
                            ? 'bg-cyan-500/10 text-cyan-200'
                            : 'bg-indigo-50 text-indigo-900'
                          : isDarkMode
                            ? 'text-zinc-100 hover:bg-zinc-900'
                            : 'text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-widest">{sub.label}</span>
                      {sub.description && (
                        <span className={`text-[10px] font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                          {sub.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
