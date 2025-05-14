'use client';

import Link from 'next/link';
// import Image from 'next/image'; // No longer using next/image directly for the main visual
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic'; // Import dynamic
import { Suspense } from 'react';

// Dynamically import ProteinModelViewer with SSR turned off
const ProteinModelViewer = dynamic(
  () => import('@/components/ui/ProteinModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">
        <div className="animate-pulse text-gray-600">Loading viewer...</div>
      </div>
    )
  }
);

// Constants for Hero Section configuration
const HERO_CONFIG = {
  titlePart1: "Unlock",
  titlePart2: " Precision Oncology with AI-Powered Genomic Insight",
  subtitle: "CasPro is an AI platform for clinicians and researchers to analyze cancer genomics and design novel therapies, leveraging Evo2 and AlphaFold 3 for data-driven cancer treatment decisions.",
  ctaPrimaryText: "Request a Demo",
  ctaSecondaryText: "Learn More",
  visualPlaceholderText: "Dynamic 3D visualization of AI analyzing genomic data streams, transforming into a precise therapeutic pathway, symbolizing innovation and hope.",
  visualAltText: "AI-driven genomic analysis and therapy design visualization for CasPro"
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-1 mb-6">
              <span className="text-primary">{HERO_CONFIG.titlePart1}</span>
              {HERO_CONFIG.titlePart2}
            </h1>
            <p className="subheading mb-8 max-w-xl">
              {HERO_CONFIG.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="btn-primary text-center">
                {HERO_CONFIG.ctaPrimaryText}
              </Link>
              <Link href="#features" className="btn-outline text-center">
                {HERO_CONFIG.ctaSecondaryText}
              </Link>
            </div>
          </motion.div>

          {/* Image/Visual Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-blue-50"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading 3D viewer...</div>
              </div>
            }>
              <div className="w-full h-full">
                <ProteinModelViewer className="w-full h-full" />
              </div>
            </Suspense>
            
            {/* Background decorative elements */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-100/30 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-100/30 rounded-full filter blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background elements */}
      <div className="absolute top-1/4 right-0 w-52 h-52 bg-blue-200/50 rounded-full filter blur-3xl opacity-30 -z-10 animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-52 h-52 bg-purple-200/50 rounded-full filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-4000"></div>
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