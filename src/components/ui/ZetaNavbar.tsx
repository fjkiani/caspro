"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Activity, Play, Settings, User, ChevronDown, Eye, EyeOff, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle';
import { getEnginesForNav } from '@/data/engine-registry';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';

/** Equal paths with `trailingSlash: true` (e.g. /engine/kill-chain/ vs /engine/kill-chain). */
function normalizePath(p: string | null | undefined): string {
  if (p == null || p === '') return '/';
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
}

function pathsEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  return normalizePath(a) === normalizePath(b);
}

export const ZetaNavbar = ({ 
  isProcessing = false
}: { 
  isProcessing?: boolean;
}) => {
  const pathname = usePathname();
  const [enginesOpen, setEnginesOpen] = useState(false);
  const [receiptsOpen, setReceiptsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const receiptsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isLargeText, toggleLargeText } = useAccessibility();
  const { isDarkMode } = useTheme();

  const engines = getEnginesForNav();

  const SAFETY_ROUTE = '/engine/safety/';
  const ORG_URL = 'https://crispro.org/';

  const TRIALS = [
    { label: 'LATIFY', id: 'latify', desc: 'BRAF V600E CRC · MoA failure analysis' },
    { label: 'CEACAM5', id: 'ceacam5', desc: 'Tusamitamab ADC · antigen expression gate' },
    { label: 'ADAVOSERTIB', id: 'adavosertib', desc: 'WEE1i · DNA-damage SL window' },
    { label: 'CAPRI', id: 'capri', desc: 'Ceralasertib · ATR MBD4-LOF SL proof' },
    { label: 'BERZOSERTIB', id: 'berzosertib', desc: 'ATR inhibitor · replication stress gate' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setEnginesOpen(false);
      if (receiptsRef.current && !receiptsRef.current.contains(e.target as Node)) setReceiptsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const links = [{ label: 'Home', href: '/' }];

  const isEngineRoute = pathname?.startsWith('/engine');

  const handleCtaClick = () => {
    router.push('/');
  };

  const navigate = (href: string) => {
    // Close overlays first to keep interaction snappy.
    setReceiptsOpen(false);
    setEnginesOpen(false);
    setMobileMenuOpen(false);
    router.push(href);
  };

  const toggleMobileMenu = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setMobileMenuOpen((open) => !open);
  };

  const navSurface = isDarkMode
    ? 'bg-[#020408]/95 border-zinc-800/90 text-zinc-100'
    : 'bg-white/95 border-slate-200 text-slate-900';
  const navMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const navHover = isDarkMode ? 'hover:text-zinc-100' : 'hover:text-slate-900';
  const brandBorder = isDarkMode ? 'border-zinc-800' : 'border-slate-200';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[220] w-full pointer-events-auto backdrop-blur-md border-b ${navSurface}`}>
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1920px] mx-auto w-full gap-2">
        <div className="flex items-center gap-3 sm:gap-8 min-w-0 shrink-0">
          <Link href="/" prefetch={false} className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={`w-6 h-6 rounded flex items-center justify-center border shadow-[0_0_10px_rgba(6,182,212,0.2)] ${
              isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-900 border-slate-700'
            }`}>
              <span className="text-[12px] leading-none" aria-hidden="true">🧬</span>
            </div>
            <span className={`text-lg sm:text-xl font-black tracking-tighter pr-2 sm:pr-4 border-r whitespace-nowrap ${brandBorder}`}>
              CrisPRO<span className="text-cyan-500">.ai</span>
            </span>
          </Link>
        </div>
        <div className={`hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest items-center ${navMuted}`}>
          {links.map(link => {
            const isActive = normalizePath(pathname) === '/';
            return (
              <Link key={link.href} href={link.href} prefetch={false}>
                <span
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
                      : navHover
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Receipts (trial case files) */}
          <div className="relative" ref={receiptsRef}>
            <button
              onClick={() => { setReceiptsOpen(!receiptsOpen); setEnginesOpen(false); }}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                pathname?.startsWith('/proof')
                  ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-amber-500 pb-1`
                  : navHover
              }`}
            >
              Receipts
              <ChevronDown className={`w-3 h-3 transition-transform ${receiptsOpen ? 'rotate-180' : ''}`} />
            </button>

            {receiptsOpen && (
              <div
                className={`absolute top-full left-0 mt-4 w-[300px] rounded-sm shadow-2xl backdrop-blur-xl z-[100] overflow-hidden border ${
                  isDarkMode ? 'bg-zinc-950/98 border-zinc-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`px-5 py-3 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Trial Receipts
                  </span>
                </div>
                <div className="py-2">
                  {TRIALS.map(trial => {
                    const trialPath = `/proof/${trial.id}/case/`;
                    const isActive =
                      pathsEqual(pathname, trialPath) ||
                      pathsEqual(pathname, `/proof/${trial.id}/`) ||
                      pathsEqual(pathname, `/proof/${trial.id}`);
                    return (
                      <button
                        key={trial.id}
                        onClick={() => navigate(trialPath)}
                        className={`flex items-center justify-between px-5 py-3 transition-all group ${
                          isActive
                            ? 'bg-amber-500/10 border-l-2 border-amber-500'
                            : isDarkMode
                              ? 'hover:bg-zinc-900 border-l-2 border-transparent'
                              : 'hover:bg-slate-50 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={`text-[12px] font-black uppercase tracking-widest ${
                              isActive
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

          <Link href={SAFETY_ROUTE} prefetch={false}>
            <span
              className={`cursor-pointer transition-colors ${
                pathsEqual(pathname, SAFETY_ROUTE)
                  ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
                  : navHover
              }`}
            >
              Safety
            </span>
          </Link>

          <a
            href={ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer transition-colors ${navHover}`}
          >
            ORG
          </a>

          {/* Engines Dropdown */}
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setEnginesOpen(!enginesOpen)}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                isEngineRoute && !pathsEqual(pathname, SAFETY_ROUTE)
                  ? `${isDarkMode ? 'text-white' : 'text-slate-900'} border-b border-cyan-500 pb-1`
                  : navHover
              }`}
            >
              Engines
              <ChevronDown className={`w-3 h-3 transition-transform ${enginesOpen ? 'rotate-180' : ''}`} />
            </button>

            {enginesOpen && (
              <div
                className={`absolute top-full left-0 mt-4 w-[320px] rounded-sm shadow-2xl backdrop-blur-xl z-[100] overflow-hidden border ${
                  isDarkMode ? 'bg-zinc-950/98 border-zinc-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`px-5 py-3 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Intelligence Engines
                  </span>
                </div>
                <div className="py-2">
                  {engines.map(engine => {
                    const Icon = engine.icon;
                    const isActive = pathsEqual(pathname, engine.route);
                    return (
                      <button
                        key={engine.id}
                        onClick={() => navigate(engine.route)}
                        className={`flex items-center gap-4 px-5 py-3.5 transition-all group ${
                          isActive
                            ? 'bg-cyan-500/10 border-l-2 border-cyan-500'
                            : isDarkMode
                              ? 'hover:bg-zinc-900 border-l-2 border-transparent'
                              : 'hover:bg-slate-50 border-l-2 border-transparent'
                        }`}
                      >
                        <div
                          className={`p-2 rounded ${
                            isActive ? 'bg-cyan-500/20' : isDarkMode ? 'bg-zinc-900 group-hover:bg-zinc-800' : 'bg-slate-100 group-hover:bg-slate-200'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-cyan-400' : isDarkMode ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-slate-500 group-hover:text-slate-800'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-black uppercase ${
                                isActive ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                              }`}
                            >
                              {engine.layer}
                            </span>
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                              engine.status === 'OPTIMIZED' ? 'bg-emerald-500/10 text-emerald-500'
                              : engine.status === 'ACTIVE' ? 'bg-cyan-500/10 text-cyan-500'
                              : 'bg-zinc-500/10 text-zinc-500'
                            }`}>{engine.status}</span>
                          </div>
                          <span
                            className={`text-[11px] font-black uppercase tracking-widest block mt-0.5 ${
                              isActive
                                ? isDarkMode
                                  ? 'text-white'
                                  : 'text-slate-900'
                                : isDarkMode
                                  ? 'text-zinc-300 group-hover:text-cyan-400'
                                  : 'text-slate-700 group-hover:text-cyan-600'
                            }`}
                          >
                            {engine.label}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] font-mono ${
                            isActive ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'
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
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-sm border transition-colors ${
              isDarkMode
                ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-900'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Visual Impairment / Large Text Toggle */}
          <button
            onClick={toggleLargeText}
            title={isLargeText ? 'Disable Large Text' : 'Enable Large Text Mode (Visual Impairment)'}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-all ${
              isLargeText
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                : isDarkMode
                  ? 'border-zinc-700 text-zinc-500 hover:text-zinc-100 hover:border-zinc-500'
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400'
            }`}
          >
            {isLargeText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden xl:inline">{isLargeText ? 'A−' : 'A+'}</span>
          </button>
          
          <ThemeToggle />

          <button 
            onClick={handleCtaClick}
            disabled={isProcessing}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-2.5 rounded-sm border text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${
              isProcessing 
              ? (isDarkMode
                  ? 'bg-zinc-900 border-zinc-800 text-cyan-500 animate-pulse pointer-events-none'
                  : 'bg-indigo-100 border-indigo-200 text-indigo-600 animate-pulse pointer-events-none')
              : isDarkMode
                ? 'bg-zinc-100 text-black hover:bg-cyan-500 hover:text-white border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600 shadow-md'
            }`}
          >
            {isProcessing ? <Activity className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isProcessing ? 'Processing...' : 'Confirm Certainty'}
          </button>

          <div className={`hidden sm:block h-6 w-px mx-2 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          
          <div className="hidden sm:flex items-center gap-4">
            <Settings className={`w-4 h-4 cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-900'}`} />
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <User className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-500 hover:text-slate-900'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav — always mounted drawer for reliable toggle behavior */}
      <div
        className={`lg:hidden fixed inset-0 top-14 z-[230] transition-opacity duration-200 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        aria-label="Site navigation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 max-h-[min(85vh,calc(100dvh-3.5rem))] overflow-y-auto border-t shadow-2xl transform transition-transform duration-200 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          } ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}
        >
          <div className="px-4 py-4 space-y-6">
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                  Navigate
                </span>
                {links.map((link) => {
                  const isActive = normalizePath(pathname) === '/';
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 text-sm font-black uppercase tracking-widest border-b ${
                        isDarkMode ? 'border-zinc-800' : 'border-slate-100'
                      } ${isActive ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600') : navMuted}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href={SAFETY_ROUTE}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-sm font-black uppercase tracking-widest border-b ${
                    isDarkMode ? 'border-zinc-800' : 'border-slate-100'
                  } ${
                    pathsEqual(pathname, SAFETY_ROUTE)
                      ? isDarkMode
                        ? 'text-cyan-400'
                        : 'text-indigo-600'
                      : navMuted
                  }`}
                >
                  Safety
                </Link>
                <a
                  href={ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-sm font-black uppercase tracking-widest border-b ${
                    isDarkMode ? 'border-zinc-800' : 'border-slate-100'
                  } ${navMuted}`}
                >
                  ORG (crispro.org)
                </a>
              </div>

              <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-amber-500/80' : 'text-amber-700'}`}>
                  Receipts — trial cases
                </span>
                <div className="mt-2 space-y-1">
                  {TRIALS.map((trial) => {
                    const trialPath = `/proof/${trial.id}/case/`;
                    const isActive =
                      pathsEqual(pathname, trialPath) ||
                      pathsEqual(pathname, `/proof/${trial.id}/`) ||
                      pathsEqual(pathname, `/proof/${trial.id}`);
                    return (
                      <button
                        key={trial.id}
                        type="button"
                        onClick={() => navigate(trialPath)}
                        className={`w-full text-left py-3 px-2 rounded-sm border-l-2 ${
                          isActive
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

              <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.35em] ${isDarkMode ? 'text-cyan-500/80' : 'text-cyan-700'}`}>
                  Engines
                </span>
                <div className="mt-2 space-y-1">
                  {engines.map((engine) => {
                    const Icon = engine.icon;
                    const isActive = pathsEqual(pathname, engine.route);
                    return (
                      <button
                        key={engine.id}
                        type="button"
                        onClick={() => navigate(engine.route)}
                        className={`w-full flex items-center gap-3 py-3 px-2 rounded-sm border-l-2 text-left ${
                          isActive
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : isDarkMode
                              ? 'border-transparent hover:bg-zinc-900'
                              : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`} />
                        <div className="min-w-0">
                          <span className={`block text-xs font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                            {engine.label}
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
    </nav>
  );
};
