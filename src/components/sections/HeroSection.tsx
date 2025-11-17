'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DoubleDnaHelix from '../ui/DoubleDnaHelix';
import CrisprGenomeEditor from '../ui/CrisprGenomeEditor';
import DnaBasePairStrip from '../ui/DnaBasePairStrip';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HERO_DRUG_DEVELOPMENT_CONFIG } from '@/data/homepage/hero-drug-development';

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


const HeroSection = () => {
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
            {/* Main Hero Headline - Bold & Visible */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-5 sm:mb-6 md:mb-7 leading-tight"
            >
              <span className="block mb-2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                {HERO_DRUG_DEVELOPMENT_CONFIG.crisis.titlePart1}
              </span>
              {HERO_DRUG_DEVELOPMENT_CONFIG.crisis.titlePart2 && (
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {HERO_DRUG_DEVELOPMENT_CONFIG.crisis.titlePart2}
                </span>
              )}
            </motion.h1>
            
            {/* Subtitle - Enhanced Visibility */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              {HERO_DRUG_DEVELOPMENT_CONFIG.crisis.subtitle}
            </motion.p>
            
            {/* SAE Badges - Centered & Captivating */}
           

            {/* Call-to-Action Buttons - Centered & Enhanced */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4 sm:space-y-5 mb-6 sm:mb-7 flex flex-col items-center lg:items-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const interactiveDemo = document.querySelector('#interactive-demo');
                  if (interactiveDemo) {
                    interactiveDemo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    const demoSection = document.querySelector('[data-section="interactive-demo"]');
                    if (demoSection) {
                      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-3 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-4.5 md:py-5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all touch-manipulation relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-xl sm:text-2xl relative z-10"
                >
                  🚀
                </motion.div>
                <span className="relative z-10">SEE THE $2.1B SAVINGS LIVE</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              </motion.button>
              
              <Link href={HERO_DRUG_DEVELOPMENT_CONFIG.cta.secondary.href} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-4 sm:py-4.5 md:py-5 bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all touch-manipulation"
                >
                  {HERO_DRUG_DEVELOPMENT_CONFIG.cta.secondary.text}
                </motion.button>
              </Link>
            </motion.div>
            
          

            {/* Root Cause Message */}
           

            {/* Customer Segments - For Clinicians/Researchers/Biotech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto"
            >
              <Link href="/contact" className="group flex-1 min-w-[140px] max-w-[200px]">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl sm:text-2xl">🏥</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">For Clinicians</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">Unified care plans in minutes</p>
                </div>
              </Link>
              <Link href="/contact" className="group flex-1 min-w-[140px] max-w-[200px]">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl sm:text-2xl">🔬</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">For Researchers</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">Validate targets in-silico</p>
                </div>
              </Link>
              <Link href="/contact" className="group flex-1 min-w-[140px] max-w-[200px]">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-4 border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl sm:text-2xl">⚔️</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">For Biotech</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">Design therapeutics, not experiments</p>
                </div>
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
        
        {/* Co-Pilots Showcase Section (Integrated) */}
        <motion.div
          id="co-pilots-showcase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-24"
        >
          {/* <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {HERO_CONFIG.keyFeatures.map((feature) => (
              <Link href={feature.link} key={feature.id} className="block group">
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-primary">
                      <feature.icon size={22} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{feature.name}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

// Added to globals.css or a new animation.css for these keyframes:
/*
@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
}
.animate-pulse {
  animation: pulse 4s infinite ease-in-out;
}

@keyframes blob {
  0% {
    transform: scale(1) translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: scale(1.1) translateY(-10px) translateX(10px) rotate(10deg);
  }
  50% {
    transform: scale(1) translateY(0px) translateX(0px) rotate(0deg);
  }
  75% {
    transform: scale(0.9) translateY(10px) translateX(-10px) rotate(-10deg);
  }
  100% {
    transform: scale(1) translateY(0px) translateX(0px) rotate(0deg);
  }
}
.animate-blob {
  animation: blob 15s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
*/ 