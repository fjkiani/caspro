"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Dna, ArrowRight, Target, Fingerprint, Cpu, Scale, Lock } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PasscodeModal } from '@/components/ui/PasscodeModal';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import DnaHero from '@/components/mockups/dnaHero2';
import MoaRadarPreview from './previews/MoaRadarPreview';
import ProteinPreview from './previews/ProteinPreview';
import KillChainPreview from './previews/KillChainPreview';
import VectorMapPreviewGated from './previews/VectorMapPreviewGated';

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════

interface HeroSlide {
  id: string;
  label: string;
  sublabel: string;
  icon?: React.ElementType;
  route?: string;
  /** Passcode required before opening ledger receipt */
  gated?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SLIDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const HeroSlider = () => {
  const { isDarkMode } = useTheme();

  const slides = useMemo((): HeroSlide[] => [
    { id: 'dna-hero', label: 'ORACLE', sublabel: 'COMMAND', icon: Dna },
    { id: 'ceacam5', label: 'CEACAM5', sublabel: 'TARGET-LOCK', icon: Target, route: '/ledger/ceacam5/' },
    { id: 'latify', label: 'LATIFY', sublabel: 'MOA-ALIGN', icon: Fingerprint, route: '/ledger/latify/' },
    { id: 'capri', label: 'CAPRI', sublabel: 'KILL-CHAIN', icon: Cpu, route: '/ledger/capri/' },
    {
      id: 'adavosertib',
      label: 'ADAVOSERTIB',
      sublabel: 'DE-RISK MAP',
      icon: Scale,
      route: '/ledger/adavosertib/',
      gated: true,
    },
    {
      id: 'berzosertib',
      label: 'BERZOSERTIB',
      sublabel: 'DE-RISK MAP',
      icon: Scale,
      route: '/ledger/berzosertib/',
      gated: true,
    },
  ], []);

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [gateModalOpen, setGateModalOpen] = useState(false);

  const [isSimulating, setIsSimulating] = useState(false);
  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  }, [activeIdx]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIdx(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const el = tabBtnRefs.current[activeIdx];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIdx]);

  // NO auto-advance — click only

  const activeSlide = slides[activeIdx];

  // Render the active slide component
  const renderSlide = () => {
    if (activeSlide.id === 'dna-hero') return <DnaHero key="v6-hero" embedded />;

    // Trial Previews
    const trialId = activeSlide.id;

    const getVisual = () => {
      if (isGatedLedgerTrial(trialId)) {
        return (
          <VectorMapPreviewGated
            trialId={trialId}
            targetLabel={activeSlide.label}
            isDarkMode={isDarkMode}
          />
        );
      }
      switch (trialId) {
        case 'ceacam5':
          return <ProteinPreview isDarkMode={isDarkMode} />;
        case 'latify':
          return <MoaRadarPreview isDarkMode={isDarkMode} />;
        case 'capri':
          return <KillChainPreview isDarkMode={isDarkMode} />;
        default:
          return null;
      }
    };

    return (
      <div key={activeSlide.id} className={`flex-1 min-h-0 w-full flex flex-col font-mono select-none transition-colors duration-500 ${
        isDarkMode ? 'bg-[#020408]' : 'bg-white'
      }`}>
        {/* Grid overlay */}
        <div className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`} />

        {/* Trial Identity */}
        <div className="relative z-10 pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12 flex items-center gap-3 sm:gap-5">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded border flex items-center justify-center ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
          }`}>
            {activeSlide.icon && <activeSlide.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'}`} />}
          </div>
          <div className="min-w-0">
            <span className={`hidden sm:block text-[9px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'}`}>
              RECEIPT_ID: {activeSlide.id.toUpperCase()} // ZETA_SIG_LOCKED
            </span>
            <h2 className={`text-sm sm:text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeSlide.label} // {activeSlide.sublabel}
            </h2>
          </div>
        </div>

        {/* Key Visual — centered, lazy loaded */}
        <div className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-3 sm:px-8 lg:px-12 py-1 sm:py-4 min-h-0 overflow-hidden">
          {getVisual()}
        </div>

        {/* CTA Bar */}
        <div className="relative z-10 px-3 sm:px-8 lg:px-12 pb-28 sm:pb-28 flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className={`hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
             DE-RISKING RECEIPT: 2026_03_24_V2 // LOCKED FOR AUDIT
          </p>
          {activeSlide.route &&
            (activeSlide.gated ? (
              <button
                type="button"
                onClick={() => setGateModalOpen(true)}
                className={`group flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2 sm:py-3 rounded border text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] transition-all shadow-lg w-full sm:w-auto shrink-0 ${
                  isDarkMode
                    ? 'border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-black'
                    : 'border-violet-600/40 bg-violet-600/10 text-violet-700 hover:bg-violet-600 hover:text-white text-on-primary'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Unlock Trial Receipt
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                href={activeSlide.route}
                className={`group flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2 sm:py-3 rounded border text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] transition-all shadow-lg w-full sm:w-auto shrink-0 ${
                  isDarkMode
                    ? 'border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[#00E5FF]/20'
                    : 'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white hover:shadow-indigo-500/20'
                }`}
              >
                Open Trial Receipt
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-[#05070a]' : 'bg-white'
    }`}>
      <ZetaNavbar isProcessing={isSimulating} />

      {/* Slide Content */}
      <div className="flex-1 relative w-full min-h-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full min-h-0 flex flex-col overflow-hidden"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Slide dock — content-width (no stretched empty rail), high contrast in light + dark */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[90] flex justify-center pointer-events-none px-3 pb-3 sm:pb-5 pt-8 bg-gradient-to-t to-transparent ${
          isDarkMode ? 'from-black/75 via-black/40' : 'from-slate-900/40 via-slate-900/12'
        }`}
      >
        <div
          className={`pointer-events-auto inline-flex max-w-full items-stretch overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md ${
            isDarkMode
              ? 'border-2 border-zinc-500/70 bg-zinc-950/95 text-zinc-100 ring-1 ring-cyan-500/25'
              : 'border-2 border-slate-800/90 bg-white text-slate-900 shadow-[0_8px_32px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/10'
          }`}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className={`shrink-0 flex items-center justify-center px-3 py-3 sm:px-3.5 transition-colors border-r ${
              isDarkMode
                ? 'border-zinc-700/90 text-zinc-200 hover:bg-zinc-800 hover:text-cyan-300'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-indigo-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-1 px-1.5 sm:px-2 py-1 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {slides.map((slide, i) => {
              const isActive = i === activeIdx;
              const Icon = slide.icon;
              return (
                <button
                  key={slide.id}
                  ref={(el) => {
                    tabBtnRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] sm:tracking-[0.16em] whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]'
                        : 'bg-indigo-700 text-white text-on-primary border border-indigo-800 shadow-sm'
                      : isDarkMode
                        ? 'text-zinc-400 border border-transparent hover:bg-zinc-800/80 hover:text-zinc-100'
                        : 'text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-950'
                  }`}
                  title={`${slide.label} — ${slide.sublabel}`}
                >
                  {Icon && (
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive && !isDarkMode ? 'text-white' : ''}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  )}
                  <span className="max-[380px]:sr-only">{slide.label}</span>
                  {slide.gated && (
                    <Lock
                      className={`w-3 h-3 shrink-0 ${isActive && !isDarkMode ? 'text-white/90' : isDarkMode ? 'text-violet-400/80' : 'text-violet-600'}`}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className={`shrink-0 flex items-center justify-center px-3 py-3 sm:px-3.5 transition-colors border-l ${
              isDarkMode
                ? 'border-zinc-700/90 text-zinc-200 hover:bg-zinc-800 hover:text-cyan-300'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-indigo-700'
            }`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div
            className={`hidden min-[420px]:flex items-center px-3 sm:px-3.5 border-l tabular-nums shrink-0 ${
              isDarkMode ? 'border-zinc-700/90 bg-zinc-900/50' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <span
              className={`text-[10px] sm:text-[11px] font-black tracking-[0.2em] ${
                isDarkMode ? 'text-cyan-300/90' : 'text-indigo-800'
              }`}
            >
              {String(activeIdx + 1).padStart(2, '0')}
              <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-400'}>/</span>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {activeSlide.route && activeSlide.gated && (
        <PasscodeModal
          open={gateModalOpen}
          onClose={() => setGateModalOpen(false)}
          proofUrl={activeSlide.route}
          targetLabel={activeSlide.label}
        />
      )}
    </div>
  );
};
