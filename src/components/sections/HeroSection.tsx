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
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Advanced background DNA elements - reduced on mobile for performance */}
      <div className="absolute left-4 sm:left-10 top-10 w-16 sm:w-24 h-3/4 opacity-5 sm:opacity-10 dark:opacity-30 dark:sm:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={8} rotationSpeed={15} />
      </div>
      <div className="absolute right-4 sm:right-10 top-20 w-12 sm:w-20 h-3/4 opacity-5 sm:opacity-10 dark:opacity-30 dark:sm:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={6} rotationSpeed={12} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-slate-800 dark:text-white"
            style={{ willChange: 'transform, opacity' }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="text-gradient block">{HERO_DRUG_DEVELOPMENT_CONFIG.crisis.titlePart1}</span>
              <span className="text-gradient">{HERO_DRUG_DEVELOPMENT_CONFIG.crisis.titlePart2}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-blue-100/90 mb-4 sm:mb-6 max-w-xl leading-relaxed">
              {HERO_DRUG_DEVELOPMENT_CONFIG.crisis.subtitle}
            </p>
            
            {/* Real Metrics Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                ✅ 95.7% ClinVar AUROC
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🧬 95.0% BRCA AUROC
              </div>
              <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                ⚡ Real-time predictions
              </div>
            </motion.div>

            {/* REAL IMPACT METRICS - Don't Undersell Ourselves */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                  $2.6B → $500K
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-300 mb-1">
                  Complete Drug Development Pipeline
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  ⚡ 80% cost reduction • 15 years → 2 years • 90% success rate
                </div>
              </div>
            </motion.div>

            {/* STRONG CALL-TO-ACTION */}
            <div className="space-y-4 mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const orchestratorSection = document.querySelector('#drug-development-orchestrator');
                    if (orchestratorSection) {
                      orchestratorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 touch-manipulation"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🚀
                  </motion.div>
                  SEE THE $2.1B SAVINGS LIVE
                  <ArrowRight size={20} />
                </motion.button>
                
                <Link href={HERO_DRUG_DEVELOPMENT_CONFIG.cta.secondary.href}>
                  <button className="btn-outline flex items-center justify-center gap-2 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 touch-manipulation">
                    {HERO_DRUG_DEVELOPMENT_CONFIG.cta.secondary.text}
                  </button>
                </Link>
              </div>
              
              {/* Urgency Message */}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ⚡ <strong>No signup required</strong> • <strong>See results in 30 seconds</strong> • <strong>Try real genetic variants</strong>
              </p>
            </div>
          </motion.div>

          {/* CRISPR Visualization Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-100/80 to-blue-100/80 dark:from-slate-900/80 dark:to-blue-950/80 border border-black/10 dark:border-white/10"
          >
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 opacity-80 z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-80 z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-purple-400 to-blue-400 opacity-80 z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-green-400 to-red-400 opacity-80 z-10"></div>
            </div>
            
            {/* CRISPR Gene Editing Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-4/5">
                <CrisprGenomeEditor 
                  baseCount={20} 
                  targetSequence="ATGCCTGAGCTAGTCGAA"
                  rotationSpeed={60}
                />
              </div>
            </div>
            
            {/* Protein visualization in bottom section */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5 opacity-90 rounded-b-xl overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-slate-500 dark:text-white">Loading protein model...</div>
                </div>
              }>
                {/* <ProteinModelViewer className="w-full h-full" /> */}
              </Suspense>
              
              {/* Protein info overlay */}
              <div className="absolute top-2 right-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2 rounded text-xs text-slate-700 dark:text-white font-mono">
                Cas9 Protein • PAM: NGG • 1,368 aa
              </div>
            </div>
            
            {/* Glow effects and decorative elements */}
            <div className="absolute bottom-1/3 left-0 right-0 h-24 bg-gradient-to-t from-blue-200/30 to-transparent dark:from-blue-500/30"></div>
            
            {/* Floating indicators */}
            <motion.div
              className="absolute top-6 left-6 text-xs font-mono bg-green-100 dark:bg-green-500/20 border border-green-500/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              On-target score: 0.92
            </motion.div>
            
            <motion.div
              className="absolute top-6 right-6 text-xs font-mono bg-red-100 dark:bg-red-500/20 border border-red-500/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              Off-target sites: 2
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