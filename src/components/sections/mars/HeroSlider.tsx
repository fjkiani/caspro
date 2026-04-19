"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Dna, ArrowRight, Target, Fingerprint, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import DnaHero from '@/components/mockups/dnaHero2';
import MoaRadarPreview from './previews/MoaRadarPreview';
import ProteinPreview from './previews/ProteinPreview';
import KillChainPreview from './previews/KillChainPreview';

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════

interface HeroSlide {
  id: string;
  label: string;
  sublabel: string;
  icon?: React.ElementType;
  route?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SLIDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const HeroSlider = () => {
  const { isDarkMode } = useTheme();

  const slides = useMemo((): HeroSlide[] => [
    { id: 'dna-hero', label: 'ORACLE', sublabel: 'COMMAND', icon: Dna },
    { id: 'ceacam5', label: 'CEACAM5', sublabel: 'TARGET-LOCK', icon: Target, route: '/proof/ceacam5' },
    { id: 'latify', label: 'LATIFY', sublabel: 'MOA-ALIGN', icon: Fingerprint, route: '/proof/latify' },
    { id: 'capri', label: 'CAPRI', sublabel: 'KILL-CHAIN', icon: Cpu, route: '/proof/capri' },
  ], []);

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

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
          {activeSlide.route && (
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
          )}
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

      {/* Mars-Style Navigation Bar */}
      <div className={`fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-12px)] max-w-[56rem] backdrop-blur-xl border rounded-lg flex items-center gap-0 shadow-2xl overflow-hidden px-0.5 ${
        isDarkMode ? 'bg-black/90 border-zinc-800/80' : 'bg-white/95 border-slate-200'
      }`}>
        <button type="button" onClick={goPrev} aria-label="Previous slide" className={`shrink-0 p-2 sm:p-2.5 transition-colors ${
          isDarkMode ? 'text-zinc-600 hover:text-cyan-400 hover:bg-cyan-500/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
        }`}>
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className={`flex flex-1 min-w-0 items-center gap-0.5 px-0.5 sm:px-1 border-x overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDarkMode ? 'border-zinc-800/60' : 'border-slate-200'}`}>
          {slides.map((slide, i) => {
            const isActive = i === activeIdx;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                ref={(el) => { tabBtnRefs.current[i] = el; }}
                type="button"
                onClick={() => goTo(i)}
                className={`flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2.5 transition-all duration-300 rounded-md text-[8px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] whitespace-nowrap shrink-0 ${
                  isActive
                    ? (isDarkMode ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30' : 'bg-indigo-500/15 text-indigo-600 border border-indigo-500/30')
                    : (isDarkMode ? 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 border border-transparent' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent')
                }`}
                title={`${slide.label} — ${slide.sublabel}`}
              >
                {Icon && <Icon className="w-3 h-3 shrink-0" />}
                <span className="max-[360px]:hidden">{slide.label}</span>
              </button>
            );
          })}
        </div>

        <button type="button" onClick={goNext} aria-label="Next slide" className={`shrink-0 p-2 sm:p-2.5 transition-colors ${
          isDarkMode ? 'text-zinc-600 hover:text-cyan-400 hover:bg-cyan-500/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
        }`}>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className={`hidden min-[400px]:flex px-1.5 sm:px-3 py-2 border-l text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] tabular-nums shrink-0 ${
          isDarkMode ? 'text-zinc-700 border-zinc-800/60' : 'text-slate-400 border-slate-200'
        }`}>
          {String(activeIdx + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
