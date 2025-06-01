'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { FiCheckCircle, FiBarChart2 } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

// Dynamically import DnaModelViewer with SSR disabled
const DnaModelViewer = dynamic(
  () => import('@/components/ui/DnaModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading 3D viewer...</div>
      </div>
    )
  }
);

// Constants for Solution Section configuration
const SOLUTION_CONFIG = {
  sectionId: "solution",
  title: "Introducing CrisPRO: The Oncology Co-Pilot",
  subtitle: "CrisPRO seamlessly integrates cutting-edge biological AI with clinical expertise to create a comprehensive platform that transforms how clinicians and researchers approach cancer.",
  benefitsTitle: "Key Benefits of CrisPRO:",
  benefits: [
    'Accelerated genomic analysis with AI-powered insights',
    'Novel therapy design capabilities using advanced foundation models',
    'Streamlined workflow: from variant analysis to therapy recommendations',
    'Precise, data-driven treatment planning for personalized care',
    'Enhanced clinical decision support, augmenting expert knowledge'
  ],
  quote: "CrisPRO is a comprehensive platform that transforms how clinicians and researchers approach cancer. It seamlessly integrates cutting-edge biological AI with clinical expertise to create a comprehensive platform that transforms how clinicians and researchers approach cancer.",
  visualPlaceholderText: "Interactive mockup of the CrisPRO dashboard, showcasing genomic analysis tools, therapy design modules, and collaborative features, presented in a clean, modern interface.",
  visualAltText: "CrisPRO platform interface mockup demonstrating AI-powered oncology solutions",
  animationVariants: {
    initialLeft: { opacity: 0, x: -20 },
    initialRight: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }
};

const SolutionSection = () => {
  return (
    <section id={SOLUTION_CONFIG.sectionId} className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* DNA Background Elements */}
      <div className="absolute left-6 top-10 w-16 h-3/4 opacity-40 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={10}
          rotationSpeed={25}
          colors={{
            adenine: '#f87171',
            thymine: '#60a5fa', 
            guanine: '#fbbf24',
            cytosine: '#34d399',
            backbone1: '#f87171',
            backbone2: '#60a5fa'
          }}
        />
      </div>
      <div className="absolute right-6 top-20 w-12 h-2/3 opacity-30 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={8}
          rotationSpeed={30}
          colors={{
            adenine: '#fbbf24',
            thymine: '#34d399',
            guanine: '#f87171', 
            cytosine: '#60a5fa',
            backbone1: '#fbbf24',
            backbone2: '#34d399'
          }}
        />
      </div>
      
      {/* DNA base pairs decorative element */}
      <DnaBasePairStrip className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model Viewer Area */}
          <motion.div
            initial={SOLUTION_CONFIG.animationVariants.initialLeft}
            whileInView={SOLUTION_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={SOLUTION_CONFIG.animationVariants.transition}
            className="relative h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-b from-white/90 to-blue-50/90 border border-blue-200/50 backdrop-blur-sm"
          >
            {/* DNA-themed glowing border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-60"></div>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-purple-400 to-blue-400 opacity-60"></div>
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-green-400 to-red-400 opacity-60"></div>
            </div>
            
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading 3D model...</div>
              </div>
            }>
              <DnaModelViewer className="w-full h-full" />
            </Suspense>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={SOLUTION_CONFIG.animationVariants.initialRight}
            whileInView={SOLUTION_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={SOLUTION_CONFIG.animationVariants.transition}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-600 to-green-600">
                {SOLUTION_CONFIG.title}
              </span>
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              {SOLUTION_CONFIG.subtitle}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{SOLUTION_CONFIG.benefitsTitle}</h3>
              <ul className="space-y-3">
                {SOLUTION_CONFIG.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <blockquote className="italic text-slate-600 border-l-4 border-gradient-to-b from-red-400 to-blue-400 pl-6 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-r-md">
              <p>"{SOLUTION_CONFIG.quote}"</p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection; 