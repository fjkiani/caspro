'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import DoubleDnaHelix from '../ui/DoubleDnaHelix';
import CrisprGenomeEditor from '../ui/CrisprGenomeEditor';
import DnaBasePairStrip from '../ui/DnaBasePairStrip';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HERO_DRUG_DEVELOPMENT_CONFIG } from '@/data/homepage/hero-drug-development';
import { RotatingText } from '../shared/RotatingText';

// Dynamically import ProteinModelViewer with SSR turned off
const ProteinModelViewer = dynamic(
  () => import('@/components/ui/ProteinModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-800/30 rounded-lg">
        <div className="animate-pulse text-white">Loading protein model...</div>
      </div>
    )
  }
);

// Reusable Rotating Sentence Component
const RotatingSentence = ({ sentences, interval = 3500 }: { sentences: string[]; interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sentences.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sentences.length);
    }, interval);
    return () => clearInterval(timer);
  }, [sentences.length, interval]);

  if (sentences.length === 1) return <>{sentences[0]}</>;

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {sentences[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const HeroSection = () => {
  const config = HERO_DRUG_DEVELOPMENT_CONFIG;
  const rotatingWords = config.crisis.rotatingWords || [];
  const captivatingSentences = config.crisis.captivatingSentences || [];
  const primaryFocus = config.primaryFocus;
  const audiences = config.audiences || [];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Background DNA elements - hidden on mobile */}
      <div className="hidden lg:block absolute left-10 top-10 w-24 h-3/4 opacity-10 dark:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={8} rotationSpeed={15} />
      </div>
      <div className="hidden lg:block absolute right-10 top-20 w-20 h-3/4 opacity-10 dark:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={6} rotationSpeed={12} />
      </div>
      
      {/* Enhanced Hero Layout - Centered & Lower */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-10 sm:pb-14 md:pb-20 lg:pb-24 relative z-10">
        
        {/* Mobile: Single Column, Desktop: Two Column */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          
          {/* Content Section - Centered & Captivating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left mb-8 lg:mb-0"
          >
            {/* Primary Focus Badge */}
            {primaryFocus && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-indigo-900/40 text-slate-800 dark:text-slate-200 rounded-full text-sm font-bold mb-6 border border-blue-300 dark:border-blue-700"
              >
                <span className="text-lg">🎯</span>
                {primaryFocus.badge}
              </motion.div>
            )}
            
            {/* Main Hero Headline - With Rotating Words */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-5 sm:mb-6 md:mb-7 leading-tight"
            >
              <span className="block mb-2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                {config.crisis.titlePart1}
              </span>
              {rotatingWords.length > 0 && (
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  <RotatingText 
                    texts={rotatingWords} 
                    interval={2500}
                    gradient="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                  />
                </span>
              )}
              {config.crisis.titlePart2 && (
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {config.crisis.titlePart2}
                </span>
              )}
            </motion.h1>
            
            {/* Enhanced Subtitle with Primary Focus */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              {primaryFocus?.shortDescription || config.crisis.subtitle}
            </motion.p>
            
            {/* Full Description (Optional - can be shown on hover or as expandable) */}
            {primaryFocus?.fullDescription && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {primaryFocus.fullDescription}
              </motion.p>
            )}
            
            {/* Audience Indicators */}
            {audiences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 sm:mb-7"
              >
                {audiences.map((audience) => (
                  <div
                    key={audience.id}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border-2 ${audience.color} dark:border-opacity-50`}
                  >
                    <span className="mr-2">{audience.icon}</span>
                    <span className="font-bold">{audience.label}</span>
                    <span className="hidden sm:inline ml-2 text-xs opacity-75">• {audience.description}</span>
                  </div>
                ))}
              </motion.div>
            )}
            
            {/* SAE Badges - Centered & Captivating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-7"
            >
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-xs sm:text-sm md:text-base font-semibold border border-purple-300 dark:border-purple-700">
                🧠 32,768 SAE Features
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-full text-xs sm:text-sm md:text-base font-semibold border border-indigo-300 dark:border-indigo-700">
                🔍 100% Explainable
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full text-xs sm:text-sm md:text-base font-semibold border border-green-300 dark:border-green-700">
                ✅ FDA-Ready Evidence
              </div>
            </motion.div>

            {/* Consolidated CTA Buttons - 3 buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 flex flex-col items-center lg:items-start"
            >
              {/* Primary: I am treating patients */}
              <Link href={config.cta.primary.href} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-4.5 md:py-5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all touch-manipulation relative overflow-hidden group"
                >
                  <span className="text-xl sm:text-2xl">{config.cta.primary.icon}</span>
                  <span>{config.cta.primary.text}</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </Link>

              {/* Secondary: I am designing a drug */}
              <Link href={config.cta.secondary.href} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-4.5 md:py-5 bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all touch-manipulation"
                >
                  <span className="text-xl sm:text-2xl">{config.cta.secondary.icon}</span>
                  <span>{config.cta.secondary.text}</span>
                </motion.button>
              </Link>

              {/* Tertiary: I am a patient */}
              <Link href={config.cta.tertiary.href} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-4.5 md:py-5 bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 shadow-md hover:shadow-lg transition-all touch-manipulation"
                >
                  <span className="text-xl sm:text-2xl">{config.cta.tertiary.icon}</span>
                  <span>{config.cta.tertiary.text}</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* DNA Visualization - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-100/80 to-blue-100/80 dark:from-slate-900/80 dark:to-blue-950/80 border border-black/10 dark:border-white/10 mt-6 sm:mt-8 lg:mt-0"
          >
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 opacity-80 z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-80 z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-purple-400 to-blue-400 opacity-80 z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-green-400 to-red-400 opacity-80 z-10"></div>
            </div>
            
            {/* CRISPR Gene Editing Visualization - Responsive */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-4/5 scale-70 sm:scale-80 md:scale-90 lg:scale-100">
                <CrisprGenomeEditor 
                  baseCount={8} 
                  targetSequence="ATGCCTGAGCTAGTCGAA"
                  rotationSpeed={60}
                />
              </div>
            </div>
            
            {/* Protein visualization in bottom section */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5 opacity-90 rounded-b-xl overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-slate-500 dark:text-white text-xs">Loading...</div>
                </div>
              }>
                {/* <ProteinModelViewer className="w-full h-full" /> */}
              </Suspense>
              
              {/* Protein info overlay */}
              <div className="absolute top-1 right-2 sm:top-2 sm:right-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-1 sm:p-2 rounded text-[8px] sm:text-[10px] md:text-xs text-slate-700 dark:text-white font-mono">
                <span className="hidden sm:inline">Cas9 • </span>1,368 aa
              </div>
            </div>
            
            {/* Glow effects */}
            <div className="absolute bottom-1/3 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-blue-200/30 to-transparent dark:from-blue-500/30"></div>
            
            {/* Floating indicators */}
            <motion.div
              className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 lg:top-6 lg:left-6 text-[9px] sm:text-[10px] md:text-xs font-mono bg-green-100 dark:bg-green-500/20 border border-green-500/30 text-green-800 dark:text-green-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hidden sm:inline">On-target: </span>0.92
            </motion.div>
            
            <motion.div
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 text-[9px] md:text-xs font-mono bg-red-100 dark:bg-red-500/20 border border-red-500/30 text-red-800 dark:text-red-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="hidden sm:inline">Off-target: </span>2
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
