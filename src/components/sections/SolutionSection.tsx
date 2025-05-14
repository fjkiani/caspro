'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { FiCheckCircle, FiBarChart2 } from 'react-icons/fi';
import dynamic from 'next/dynamic';

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
  title: "Introducing CasPro: The Oncology Co-Pilot",
  subtitle: "CasPro seamlessly integrates cutting-edge biological AI with clinical expertise to create a comprehensive platform that transforms how clinicians and researchers approach cancer.",
  benefitsTitle: "Key Benefits of CasPro:",
  benefits: [
    'Accelerated genomic analysis with AI-powered insights',
    'Novel therapy design capabilities using advanced foundation models',
    'Streamlined workflow: from variant analysis to therapy recommendations',
    'Precise, data-driven treatment planning for personalized care',
    'Enhanced clinical decision support, augmenting expert knowledge'
  ],
  quote: "Bridging a key gap in the current landscape, CasPro: Oncology Copilot delivers an integrated pipeline from genomic insight to therapeutic design by understanding variant functional impact and generating novel sequences to enable precise molecular design of interventions",
  visualPlaceholderText: "Interactive mockup of the CasPro dashboard, showcasing genomic analysis tools, therapy design modules, and collaborative features, presented in a clean, modern interface.",
  visualAltText: "CasPro platform interface mockup demonstrating AI-powered oncology solutions",
  animationVariants: {
    initialLeft: { opacity: 0, x: -20 },
    initialRight: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }
};

const SolutionSection = () => {
  return (
    <section id={SOLUTION_CONFIG.sectionId} className="section bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model Viewer Area */}
          <motion.div
            initial={SOLUTION_CONFIG.animationVariants.initialLeft}
            whileInView={SOLUTION_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={SOLUTION_CONFIG.animationVariants.transition}
            className="relative h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-xl bg-white border border-slate-200"
          >
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
            <h2 className="heading-2 mb-6">{SOLUTION_CONFIG.title}</h2>
            <p className="text-lg text-slate-700 mb-8">
              {SOLUTION_CONFIG.subtitle}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">{SOLUTION_CONFIG.benefitsTitle}</h3>
              <ul className="space-y-3">
                {SOLUTION_CONFIG.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <blockquote className="italic text-slate-600 border-l-4 border-primary pl-6 py-2 bg-slate-100 rounded-r-md">
              <p>"{SOLUTION_CONFIG.quote}"</p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection; 