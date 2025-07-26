'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DoubleDnaHelix from '../ui/DoubleDnaHelix';
import CrisprGenomeEditor from '../ui/CrisprGenomeEditor';
import DnaBasePairStrip from '../ui/DnaBasePairStrip';
import { ArrowRight, Brain, Dna, FileText } from 'lucide-react';
import Link from 'next/link';

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
  titlePart1: "AI-Powered Metastasis Prevention",
  titlePart2: "Transform Cancer Care from Reactive to Preventive",
  subtitle: "CrisPRO's Oncology Co-Pilot delivers precision genomic insights, VUS resolution, and predictive analytics to help clinicians prevent metastasis before it starts. The world's first AI platform designed specifically for metastasis prevention.",
  ctaPrimaryText: "Platform",
  ctaPrimaryLink: "/platform",
  ctaSecondaryText: "Research",
  ctaSecondaryLink: "/blog",
  keyFeatures: [
    {
      id: 'genomic',
      name: 'CRISPR Intelligence Platform',
      description: 'An end-to-end co-pilot for therapeutic gene editing. Accelerate your R&D from discovery to pre-clinical with AI-powered guide design, variant effect prediction, and automated experiment planning.',
      icon: Dna,
      link: '/platform/crispr-intelligence'
    },
    {
      id: 'oncology',
      name: 'PrecisionRad™ Co-Pilot',
      description: 'Fuse multi-modal data to hyper-personalize radiation therapy. Predict patient-specific radiosensitivity and toxicity by integrating deep genomic profiles with medical imaging to optimize treatment plans.',
      icon: Brain,
      link: '/platform/precision-rad'
    },
    {
      id: 'emr',
      name: 'AgenticEMR™ Co-Pilot',
      description: 'Transform unstructured clinical data into a strategic asset. Automate patient record summarization, cohort identification, and clinical trial matching to unlock deep clinical insights from your EMR.',
      icon: FileText,
      link: '/platform/agentic-emr'
    }
  ]
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Advanced background DNA elements */}
      <div className="absolute left-10 top-10 w-24 h-3/4 opacity-10 dark:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={12} rotationSpeed={25} />
      </div>
      <div className="absolute right-10 top-20 w-20 h-3/4 opacity-10 dark:opacity-70 pointer-events-none">
        <DoubleDnaHelix className="w-full h-full" baseCount={10} rotationSpeed={18} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-slate-800 dark:text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">
                <span className="block">{HERO_CONFIG.titlePart1}</span>
                {HERO_CONFIG.titlePart2}
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-blue-100/90 mb-8 max-w-xl">
              {HERO_CONFIG.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href={HERO_CONFIG.ctaPrimaryLink}>
                <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  <ArrowRight size={20} />
                  {HERO_CONFIG.ctaPrimaryText}
                </button>
              </Link>
              <Link href={HERO_CONFIG.ctaSecondaryLink}>
                <button className="btn-outline flex items-center justify-center gap-2 w-full sm:w-auto">
                  {HERO_CONFIG.ctaSecondaryText}
                </button>
              </Link>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
          </div>
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