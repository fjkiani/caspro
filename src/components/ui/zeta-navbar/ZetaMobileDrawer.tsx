'use client';

import Link from 'next/link';
import { TOP_NAV_ITEMS } from './nav-items';
import { pathsEqual } from './paths';

type ZetaMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: string;
  navigate: (href: string) => void;
};

function linkRowClass(isDarkMode: boolean, isActive: boolean, navMuted: string) {
  return `uppercase block py-3 text-sm font-black tracking-widest border-b ${
    isDarkMode ? 'border-zinc-800' : 'border-slate-100'
  } ${isActive ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : navMuted}`;
}

function isNavItemActive(pathname: string | null, href: string, itemId: string): boolean {
  if (pathsEqual(pathname, href)) return true;
  const norm = (pathname ?? '').replace(/\/+$/, '') || '/';
  if (itemId === 'ledger' && norm.startsWith('/ledger')) return true;
  if (itemId === 'research' && (norm.startsWith('/research') || norm.startsWith('/blog') || norm.startsWith('/manuscripts') || norm.startsWith('/media'))) return true;
  if (itemId === 'engines' && norm.startsWith('/engine')) return true;
  return false;
}

export function ZetaMobileDrawer({ open, onClose, pathname, isDarkMode, navMuted, navigate }: ZetaMobileDrawerProps) {
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
              NAVIGATE
            </span>
            {TOP_NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item.href, item.id);
              const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={onClose}
                    className={linkRowClass(isDarkMode, isActive, navMuted)}
                  >
                    {item.label}
                  </Link>
                  {hasDropdown &&
                    item.dropdownItems!.map((sub) => (
                      <button
                        key={sub.href}
                        type="button"
                        onClick={() => {
                          navigate(sub.href);
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
        </div>
      </div>
    </div>
  );
}
