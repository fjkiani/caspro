'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DoubleDnaHelix from '../ui/DoubleDnaHelix';
import CrisprGenomeEditor from '../ui/CrisprGenomeEditor';
import DnaBasePairStrip from '../ui/DnaBasePairStrip';

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

// Constants for Hero Section configuration
const HERO_CONFIG = {
  titlePart1: "Engineer",
  titlePart2: " Precision Therapeutics with CRISPR-Powered Genomic Design",
  subtitle: "CrisPRO is an AI-powered platform for designing targeted CRISPR gene editing therapies, predicting protein interactions, and developing novel precision oncology treatments.",
  ctaPrimaryText: "Design Your Guide RNA",
  ctaSecondaryText: "Explore Models",
  keyFeatures: [
    { id: 'crispr', name: 'CRISPR Design', description: 'AI-optimized guide RNA design with off-target prediction' },
    { id: 'protein', name: 'Protein Engineering', description: 'Structure-based therapeutic protein design' },
    { id: 'genomic', name: 'Genomic Analysis', description: 'Mutational signature detection and classification' }
  ]
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950">
      {/* Advanced background DNA elements */}
      <div className="absolute left-10 top-10 w-24 h-3/4 opacity-70 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        {/* <DoubleDnaHelix className="w-full h-full" baseCount={15} /> */}
      </div>
      <div className="absolute right-10 top-20 w-20 h-3/4 opacity-70 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix className="w-full h-full" baseCount={12} rotationSpeed={18} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-blue-400 to-green-400 inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
                style={{ backgroundSize: '300% 100%' }}
              >
                {HERO_CONFIG.titlePart1}
              </motion.span>
              <span className="text-white">{HERO_CONFIG.titlePart2}</span>
            </h1>
            
            <p className="text-xl text-blue-100/90 mb-8 max-w-xl">
              {HERO_CONFIG.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                {HERO_CONFIG.ctaPrimaryText}
              </button>
              <button className="bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400/20 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                {HERO_CONFIG.ctaSecondaryText}
              </button>
            </div>
            
            {/* Key features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {HERO_CONFIG.keyFeatures.map(feature => (
                <motion.div 
                  key={feature.id}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 className="text-base font-semibold text-blue-300 mb-1">{feature.name}</h3>
                  <p className="text-sm text-blue-100/80">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CRISPR Visualization Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-900/80 to-blue-950/80 border border-white/10"
          >
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
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
                  <div className="animate-pulse text-white">Loading protein model...</div>
                </div>
              }>
                {/* <ProteinModelViewer className="w-full h-full" /> */}
              </Suspense>
              
              {/* Protein info overlay */}
              <div className="absolute top-2 right-4 bg-black/30 backdrop-blur-sm p-2 rounded text-xs text-white font-mono">
                Cas9 Protein • PAM: NGG • 1,368 aa
              </div>
            </div>
            
            {/* Glow effects and decorative elements */}
            <div className="absolute bottom-1/3 left-0 right-0 h-24 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
            
            {/* Floating indicators */}
            <motion.div
              className="absolute top-6 left-6 text-xs font-mono bg-green-500/20 border border-green-500/30 text-green-300 px-2 py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              On-target score: 0.92
            </motion.div>
            
            <motion.div
              className="absolute top-6 right-6 text-xs font-mono bg-red-500/20 border border-red-500/30 text-red-300 px-2 py-1 rounded-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              Off-target sites: 2
            </motion.div>
          </motion.div>
        </div>
        
        {/* DNA base pairs decorative element */}
        <DnaBasePairStrip className="my-16" />
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