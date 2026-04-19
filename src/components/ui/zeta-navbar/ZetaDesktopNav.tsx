'use client';

import type { RefObject } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { EngineEntry } from '@/data/engine-registry';
import { TRIAL_RECEIPT_NAV } from '@/data/trial-receipt-nav';
import { PRIMARY_NAV_LINKS } from './constants';
import { productMenuTitle } from './product-engines';
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
  productOpen: boolean;
  setProductOpen: (open: boolean) => void;
  receiptsOpen: boolean;
  setReceiptsOpen: (open: boolean) => void;
  blogOpen: boolean;
  setBlogOpen: (open: boolean) => void;
  manuscriptsOpen: boolean;
  setManuscriptsOpen: (open: boolean) => void;
  navigate: (href: string) => void;
  receiptsRef: RefObject<HTMLDivElement>;
  productRef: RefObject<HTMLDivElement>;
  blogRef: RefObject<HTMLDivElement>;
  manuscriptsRef: RefObject<HTMLDivElement>;
  manuscripts: ManuscriptNavItem[];
  blogPosts: BlogNavPost[];
  blogCategories: BlogNavCategory[];
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
  productEngines,
  productOpen,
  setProductOpen,
  receiptsOpen,
  setReceiptsOpen,
  blogOpen,
  setBlogOpen,
  manuscriptsOpen,
  setManuscriptsOpen,
  navigate,
  receiptsRef,
  productRef,
  blogRef,
  manuscriptsRef,
  manuscripts,
  blogPosts,
  blogCategories,
}: ZetaDesktopNavProps) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams?.get('category')?.trim() ?? '';
  let categoryParam = rawCategory;
  try {
    categoryParam = decodeURIComponent(rawCategory);
  } catch {
    /* keep raw */
  }

  const productActive = productEngines.some((e) => pathsEqual(pathname, e.route));
  const blogActive = pathname != null && normalizePath(pathname).startsWith('/blog');
  const manuscriptsActive = pathname != null && normalizePath(pathname).startsWith('/manuscripts');

  const openOnly = (which: 'blog' | 'manuscripts' | 'receipts' | 'product') => {
    setBlogOpen(which === 'blog');
    setManuscriptsOpen(which === 'manuscripts');
    setReceiptsOpen(which === 'receipts');
    setProductOpen(which === 'product');
  };

  return (
    <div
      className={`hidden lg:flex flex-1 min-w-0 justify-end flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-black tracking-widest ${navMuted}`}
    >
      {PRIMARY_NAV_LINKS.map((link) => {
        const isActive = normalizePath(link.href) === '/' ? normalizePath(pathname) === '/' : pathsEqual(pathname, link.href);
        return (
          <Link key={link.href} href={link.href} prefetch={false} className="shrink-0">
            <span className={navLinkClass(isActive, isDarkMode, navHover)}>{link.label}</span>
          </Link>
        );
      })}

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

      <div className="relative shrink-0" ref={receiptsRef}>
        <button
          type="button"
          onClick={() => {
            if (receiptsOpen) setReceiptsOpen(false);
            else openOnly('receipts');
          }}
          className={`uppercase flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            pathname?.startsWith('/proof')
              ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-amber-500 pb-1`
              : navHover
          }`}
        >
          RECEIPTS
          <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${receiptsOpen ? 'rotate-180' : ''}`} />
        </button>

        {receiptsOpen && (
          <div className={dropdownShell(isDarkMode, false)}>
            <div className={dropdownHeader(isDarkMode)}>
              <span className={dropdownHeaderLabel(isDarkMode)}>TRIAL RECEIPTS</span>
            </div>
            <div className={scrollBody()}>
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
                    className={`flex items-center justify-between px-5 py-3 transition-all group w-full text-left ${
                      active
                        ? 'bg-amber-500/10 border-l-2 border-amber-500'
                        : isDarkMode
                          ? 'hover:bg-zinc-900 border-l-2 border-transparent'
                          : 'hover:bg-slate-50 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-[12px] font-black uppercase tracking-widest ${
                          active
                            ? 'text-amber-400'
                            : isDarkMode
                              ? 'text-zinc-100 group-hover:text-amber-400'
                              : 'text-slate-900 group-hover:text-amber-600'
                        }`}
                      >
                        {trial.label}
                      </span>
                      <span className={`text-[11px] font-bold ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                        {trial.desc}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-amber-500/60 uppercase">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="relative shrink-0" ref={productRef}>
        <button
          type="button"
          onClick={() => {
            if (productOpen) setProductOpen(false);
            else openOnly('product');
          }}
          className={`uppercase flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            productActive
              ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
              : navHover
          }`}
        >
          PRODUCT
          <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${productOpen ? 'rotate-180' : ''}`} />
        </button>

        {productOpen && (
          <div className={`${dropdownShell(isDarkMode, false)} max-h-[min(72vh,28rem)]`}>
            <div className={dropdownHeader(isDarkMode)}>
              <span className={dropdownHeaderLabel(isDarkMode)}>PRODUCT</span>
            </div>
            <div className={scrollBody()}>
              {productEngines.map((engine) => {
                const Icon = engine.icon;
                const active = pathsEqual(pathname, engine.route);
                const title = productMenuTitle(engine);
                return (
                  <button
                    key={engine.id}
                    type="button"
                    onClick={() => navigate(engine.route)}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-all group w-full text-left ${
                      active
                        ? 'bg-cyan-500/10 border-l-2 border-cyan-500'
                        : isDarkMode
                          ? 'hover:bg-zinc-900 border-l-2 border-transparent'
                          : 'hover:bg-slate-50 border-l-2 border-transparent'
                    }`}
                  >
                    <div
                      className={`p-2 rounded ${
                        active ? 'bg-cyan-500/20' : isDarkMode ? 'bg-zinc-900 group-hover:bg-zinc-800' : 'bg-slate-100 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          active ? 'text-cyan-400' : isDarkMode ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-slate-500 group-hover:text-slate-800'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-black uppercase ${
                            active ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                          }`}
                        >
                          {engine.layer}
                        </span>
                        <span
                          className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                            engine.status === 'OPTIMIZED'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : engine.status === 'ACTIVE'
                                ? 'bg-cyan-500/10 text-cyan-500'
                                : 'bg-zinc-500/10 text-zinc-500'
                          }`}
                        >
                          {engine.status}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-black uppercase tracking-widest block mt-0.5 ${
                          active
                            ? isDarkMode
                              ? 'text-white'
                              : 'text-slate-900'
                            : isDarkMode
                              ? 'text-zinc-300 group-hover:text-cyan-400'
                              : 'text-slate-700 group-hover:text-cyan-600'
                        }`}
                      >
                        {title}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-mono ${
                        active ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                      }`}
                    >
                      {engine.keyMetric}
                    </span>
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
