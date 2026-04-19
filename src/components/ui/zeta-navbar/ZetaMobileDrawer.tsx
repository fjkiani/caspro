'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import type { EngineEntry } from '@/data/engine-registry';
import { TRIAL_RECEIPT_NAV } from '@/data/trial-receipt-nav';
import { PRIMARY_NAV_LINKS } from './constants';
import { productMenuTitle } from './product-engines';
import type { BlogNavCategory, BlogNavPost, ManuscriptNavItem } from './useZetaNavFeed';
import { normalizePath, pathsEqual } from './paths';
import type { NavTheme } from './nav-theme';

const BLOG_INDEX = '/blog/';

type ZetaMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: NavTheme['navMuted'];
  productEngines: EngineEntry[];
  navigate: (href: string) => void;
  manuscripts: ManuscriptNavItem[];
  blogPosts: BlogNavPost[];
  blogCategories: BlogNavCategory[];
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
  productEngines,
  navigate,
  manuscripts,
  blogPosts,
  blogCategories,
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
          <div className="flex flex-col gap-1">
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}
            >
              NAVIGATE
            </span>
            {PRIMARY_NAV_LINKS.map((link) => {
              const isActive = normalizePath(link.href) === '/' ? normalizePath(pathname) === '/' : pathsEqual(pathname, link.href);
              return (
                <Link key={link.href} href={link.href} prefetch={false} onClick={onClose} className={linkRowClass(isDarkMode, isActive, navMuted)}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div>
            <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-700'}`}>BLOG</span>
            <div className="mt-2 space-y-1">
              <Link
                href={BLOG_INDEX}
                prefetch={false}
                onClick={onClose}
                className={`block rounded-sm px-2 py-2.5 text-xs font-black uppercase tracking-widest ${
                  pathsEqual(pathname, BLOG_INDEX) || pathsEqual(pathname, '/blog')
                    ? isDarkMode
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'bg-indigo-50 text-indigo-900'
                    : isDarkMode
                      ? 'text-zinc-200 hover:bg-zinc-900'
                      : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                All posts
              </Link>
              {blogCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/?category=${encodeURIComponent(c.slug)}`}
                  prefetch={false}
                  onClick={onClose}
                  className={`block rounded-sm px-2 py-2 text-[11px] font-bold ${
                    isDarkMode ? 'text-zinc-200 hover:bg-zinc-900' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
              {blogPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/post/${encodeURIComponent(p.slug)}/`}
                  prefetch={false}
                  onClick={onClose}
                  className={`block rounded-sm px-2 py-2 text-xs font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-100 hover:bg-zinc-900' : 'text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-700'}`}>
              MANUSCRIPTS
            </span>
            <div className="mt-2 space-y-1">
              <Link
                href={ROUTES.MANUSCRIPTS}
                prefetch={false}
                onClick={onClose}
                className={`block rounded-sm px-2 py-2.5 text-xs font-black uppercase tracking-widest ${
                  pathsEqual(pathname, ROUTES.MANUSCRIPTS) || normalizePath(pathname) === '/manuscripts'
                    ? isDarkMode
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'bg-indigo-50 text-indigo-900'
                    : isDarkMode
                      ? 'text-zinc-200 hover:bg-zinc-900'
                      : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                All manuscripts
              </Link>
              {manuscripts.map((m) => (
                <Link
                  key={m.id}
                  href={`/manuscripts/${encodeURIComponent(m.slug)}/`}
                  prefetch={false}
                  onClick={onClose}
                  className={`block rounded-sm px-2 py-2 text-xs font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-100 hover:bg-zinc-900' : 'text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {m.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span
              className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-amber-500/90' : 'text-amber-800'}`}
            >
              RECEIPTS · TRIAL CASES
            </span>
            <div className="mt-2 space-y-1">
              {TRIAL_RECEIPT_NAV.map((trial) => {
                const trialPath = `/proof/${trial.id}/case/`;
                const active =
                  pathsEqual(pathname, trialPath) ||
                  pathsEqual(pathname, `/proof/${trial.id}/`) ||
                  pathsEqual(pathname, `/proof/${trial.id}`);
                return (
                  <button
                    key={trial.id}
                    type="button"
                    onClick={() => navigate(trialPath)}
                    className={`w-full text-left py-3 px-2 rounded-sm border-l-2 ${
                      active
                        ? 'border-amber-500 bg-amber-500/10'
                        : isDarkMode
                          ? 'border-transparent hover:bg-zinc-900'
                          : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <span className={`block text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                      {trial.label}
                    </span>
                    <span className={`block text-[11px] mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>{trial.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
            <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-700'}`}>
              PRODUCT
            </span>
            <div className="mt-2 space-y-1">
              {productEngines.map((engine) => {
                const Icon = engine.icon;
                const active = pathsEqual(pathname, engine.route);
                return (
                  <button
                    key={engine.id}
                    type="button"
                    onClick={() => navigate(engine.route)}
                    className={`w-full flex items-center gap-3 py-3 px-2 rounded-sm border-l-2 text-left ${
                      active
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : isDarkMode
                          ? 'border-transparent hover:bg-zinc-900'
                          : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`} />
                    <div className="min-w-0">
                      <span className={`block text-xs font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                        {productMenuTitle(engine)}
                      </span>
                      <span className={`block text-[10px] font-mono truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                        {engine.keyMetric}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
