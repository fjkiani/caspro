'use client';

import type { RefObject } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { EngineEntry } from '@/data/engine-registry';
import { TOP_NAV_ITEMS } from './nav-items';
import type { BlogNavCategory, BlogNavPost, ManuscriptNavItem } from './useZetaNavFeed';
import { normalizePath, pathsEqual } from './paths';
import type { NavTheme } from './nav-theme';

const BLOG_INDEX = '/blog/';

type ZetaDesktopNavProps = {
  pathname: string | null;
  isDarkMode: boolean;
  navMuted: NavTheme['navMuted'];
  navHover: NavTheme['navHover'];
  productEngines: EngineEntry[];
  // Legacy dropdown state — kept for blog/manuscripts
  blogOpen: boolean;
  setBlogOpen: (open: boolean) => void;
  manuscriptsOpen: boolean;
  setManuscriptsOpen: (open: boolean) => void;
  navigate: (href: string) => void;
  blogRef: RefObject<HTMLDivElement>;
  manuscriptsRef: RefObject<HTMLDivElement>;
  manuscripts: ManuscriptNavItem[];
  blogPosts: BlogNavPost[];
  blogCategories: BlogNavCategory[];
  // New unified dropdown state
  openDropdownId: string | null;
  toggleDropdown: (id: string) => void;
  setDropdownRef: (id: string, el: HTMLDivElement | null) => void;
  // Removed: receiptsOpen, receiptsRef, productOpen, productRef
};

function navLinkClass(isActive: boolean, isDarkMode: boolean, navHover: string) {
  return `uppercase cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
    isActive ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1` : navHover
  }`;
}

function dropdownShell(isDarkMode: boolean, wide = false) {
  return `absolute top-full right-0 mt-4 ${wide ? 'w-[340px]' : 'w-[300px]'} max-h-[min(72vh,26rem)] flex flex-col rounded-sm shadow-2xl backdrop-blur-xl z-[100] overflow-hidden border ${
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
  pathname,
  isDarkMode,
  navMuted,
  navHover,
  blogOpen,
  setBlogOpen,
  manuscriptsOpen,
  setManuscriptsOpen,
  navigate,
  blogRef,
  manuscriptsRef,
  manuscripts,
  blogPosts,
  blogCategories,
  openDropdownId,
  toggleDropdown,
  setDropdownRef,
}: ZetaDesktopNavProps) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams?.get('category')?.trim() ?? '';
  let categoryParam = rawCategory;
  try {
    categoryParam = decodeURIComponent(rawCategory);
  } catch {
    /* keep raw */
  }

  const blogActive = pathname != null && normalizePath(pathname).startsWith('/blog');
  const manuscriptsActive = pathname != null && normalizePath(pathname).startsWith('/manuscripts');

  const openOnly = (which: 'blog' | 'manuscripts') => {
    setBlogOpen(which === 'blog');
    setManuscriptsOpen(which === 'manuscripts');
  };

  return (
    <div
      className={`hidden lg:flex flex-1 min-w-0 justify-end flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-black tracking-widest ${navMuted}`}
    >
      {/* ── Dynamic TOP_NAV_ITEMS ── */}
      {TOP_NAV_ITEMS.map((item) => {
        const isActive = pathsEqual(pathname, item.href);
        const hasDropdown = Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0;
        const isOpen = openDropdownId === item.id;

        if (!hasDropdown) {
          // Plain link
          return (
            <Link key={item.id} href={item.href} prefetch={false} className="shrink-0">
              <span className={navLinkClass(isActive, isDarkMode, navHover)}>{item.label}</span>
            </Link>
          );
        }

        // Dropdown-capable item
        return (
          <div
            key={item.id}
            className="relative shrink-0"
            ref={(el) => setDropdownRef(item.id, el)}
          >
            <button
              type="button"
              onClick={() => toggleDropdown(item.id)}
              className={`uppercase flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
                isActive
                  ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
                  : navHover
              }`}
            >
              {item.label}
              <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className={dropdownShell(isDarkMode, false)}>
                <div className={dropdownHeader(isDarkMode)}>
                  <span className={dropdownHeaderLabel(isDarkMode)}>{item.label}</span>
                </div>
                <div className={scrollBody()}>
                  {/* Primary link to the page itself */}
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
                    Overview
                    <span className="text-[10px] font-black text-cyan-500/60">→</span>
                  </button>
                  {item.dropdownItems!.map((sub) => (
                    <button
                      key={sub.href}
                      type="button"
                      onClick={() => navigate(sub.href)}
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

      {/* ── BLOG dropdown (Hygraph-driven) ── */}
      <div className="relative shrink-0" ref={blogRef}>
        <button
          type="button"
          onClick={() => {
            if (blogOpen) setBlogOpen(false);
            else openOnly('blog');
          }}
          className={`uppercase flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            blogActive
              ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
              : navHover
          }`}
        >
          BLOG
          <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${blogOpen ? 'rotate-180' : ''}`} />
        </button>
        {blogOpen && (
          <div className={`${dropdownShell(isDarkMode, true)}`}>
            <div className={dropdownHeader(isDarkMode)}>
              <span className={dropdownHeaderLabel(isDarkMode)}>BLOG</span>
            </div>
            <div className={scrollBody()}>
              <button
                type="button"
                onClick={() => navigate(BLOG_INDEX)}
                className={`mx-2 mb-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-sm px-3 py-2.5 text-left text-[12px] font-black uppercase tracking-widest ${
                  (pathsEqual(pathname, BLOG_INDEX) || pathsEqual(pathname, '/blog')) && !categoryParam
                    ? isDarkMode
                      ? 'bg-cyan-500/15 text-cyan-300'
                      : 'bg-indigo-50 text-indigo-900'
                    : isDarkMode
                      ? 'text-zinc-100 hover:bg-zinc-900'
                      : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                All posts
                <span className="text-[10px] font-black text-cyan-500/60">→</span>
              </button>
              {blogCategories.length > 0 && (
                <>
                  <div className={`px-5 pb-1 pt-2 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Categories
                  </div>
                  {blogCategories.map((c) => {
                    const href = `/blog/?category=${encodeURIComponent(c.slug)}`;
                    const active = categoryParam === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => navigate(href)}
                        className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-[11px] font-bold transition-colors ${
                          active
                            ? isDarkMode
                              ? 'bg-cyan-500/10 text-cyan-300'
                              : 'bg-indigo-50 text-indigo-900'
                            : isDarkMode
                              ? 'text-zinc-200 hover:bg-zinc-900'
                              : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {c.name}
                        <span className="text-[10px] font-black text-cyan-500/50">→</span>
                      </button>
                    );
                  })}
                </>
              )}
              {blogPosts.length > 0 && (
                <>
                  <div className={`px-5 pb-1 pt-3 text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Posts
                  </div>
                  {blogPosts.map((p) => {
                    const href = `/blog/post/${encodeURIComponent(p.slug)}/`;
                    const active = pathsEqual(pathname, href);
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => navigate(href)}
                        className={`flex w-full flex-col gap-0.5 px-5 py-2.5 text-left transition-colors ${
                          active
                            ? isDarkMode
                              ? 'bg-cyan-500/10 text-cyan-200'
                              : 'bg-indigo-50 text-indigo-900'
                            : isDarkMode
                              ? 'text-zinc-100 hover:bg-zinc-900'
                              : 'text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest">{p.title}</span>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── MANUSCRIPTS dropdown (Hygraph-driven) ── */}
      <div className="relative shrink-0" ref={manuscriptsRef}>
        <button
          type="button"
          onClick={() => {
            if (manuscriptsOpen) {
              setManuscriptsOpen(false);
            } else {
              openOnly('manuscripts');
            }
          }}
          className={`uppercase flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            manuscriptsActive
              ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
              : navHover
          }`}
        >
          MANUSCRIPTS
          <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${manuscriptsOpen ? 'rotate-180' : ''}`} />
        </button>
        {manuscriptsOpen && (
          <div className={dropdownShell(isDarkMode, true)}>
            <div className={dropdownHeader(isDarkMode)}>
              <span className={dropdownHeaderLabel(isDarkMode)}>MANUSCRIPTS</span>
            </div>
            <div className={scrollBody()}>
              <button
                type="button"
                onClick={() => navigate(ROUTES.MANUSCRIPTS)}
                className={`mx-2 mb-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-sm px-3 py-2.5 text-left text-[12px] font-black uppercase tracking-widest ${
                  pathsEqual(pathname, ROUTES.MANUSCRIPTS) || normalizePath(pathname) === '/manuscripts'
                    ? isDarkMode
                      ? 'bg-cyan-500/15 text-cyan-300'
                      : 'bg-indigo-50 text-indigo-900'
                    : isDarkMode
                      ? 'text-zinc-100 hover:bg-zinc-900'
                      : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                All manuscripts
                <span className="text-[10px] font-black text-cyan-500/60">→</span>
              </button>
              {manuscripts.map((m) => {
                const href = `/manuscripts/${encodeURIComponent(m.slug)}/`;
                const active = pathsEqual(pathname, href);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => navigate(href)}
                    className={`flex w-full flex-col gap-0.5 px-5 py-2.5 text-left transition-colors ${
                      active
                        ? isDarkMode
                          ? 'bg-cyan-500/10 text-cyan-200'
                          : 'bg-indigo-50 text-indigo-900'
                        : isDarkMode
                          ? 'text-zinc-100 hover:bg-zinc-900'
                          : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-widest">{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
