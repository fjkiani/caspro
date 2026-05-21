'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import type { EngineEntry } from '@/data/engine-registry';
import { TOP_NAV_ITEMS } from './nav-items';
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

          {/* ── Dynamic TOP_NAV_ITEMS ── */}
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

          {/* ── BLOG ── */}
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

          {/* ── MANUSCRIPTS ── */}
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

        </div>
      </div>
    </div>
  );
}
