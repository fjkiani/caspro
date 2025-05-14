'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiEdit, FiLayers, FiUsers, FiCpu, FiZap, FiActivity, FiShield, FiTrendingUp, FiShare2 } from 'react-icons/fi';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import DnaRnaModelViewer with SSR disabled
const DnaRnaModelViewer = dynamic(
  () => import('@/components/ui/DnaRnaModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-indigo-200">
        <div className="animate-pulse">Loading 3D model...</div>
      </div>
    )
  }
);

// Constants for Features Section configuration
const FEATURES_CONFIG = {
  sectionId: "features",
  title: "Core Capabilities of CasPro",
  subtitle: "CasPro offers a comprehensive suite of AI-driven tools designed to revolutionize cancer genomics analysis, therapy design, and clinical decision-making.",
  features: [
    {
      icon: React.createElement(FiSearch),
      title: 'AI-Powered Genomic Analysis',
      description: 'Deep variant interpretation, functional impact prediction (Evo2 scores), and identification of novel therapeutic targets from complex genomic data.'
    },
    {
      icon: React.createElement(FiEdit),
      title: 'AI-Guided Therapy Design',
      description: 'Leverage Evo2s generative power to design bespoke gene editing constructs (e.g., CRISPR guide RNAs, repair templates) and other biologics.'
    },
    {
      icon: React.createElement(FiLayers),
      title: 'In Silico Design Evaluation',
      description: 'Predict structural viability and efficacy of designed therapies using AlphaFold 3, with comprehensive multi-modal scoring of candidates.'
    },
    {
      icon: React.createElement(FiTrendingUp),
      title: 'Predictive Biomarker Discovery',
      description: 'Identify novel predictive biomarkers for treatment response and resistance, enhancing patient stratification for clinical trials and therapies.'
    },
    {
      icon: React.createElement(FiUsers),
      title: 'Intelligent Clinical Trial Matching',
      description: 'AI agent-based assistance to find relevant clinical trials based on comprehensive patient genomic and clinical profiles, accelerating enrollment.'
    },
    {
      icon: React.createElement(FiCpu),
      title: 'Modular Agent Assistance',
      description: 'Your AI co-pilot for oncology: literature review, hypothesis generation, documentation support, and streamlining complex research workflows.'
    }
  ],
  harmonyTitle: "A Symphony of Capabilities: The CasPro Ecosystem",
  harmonySubtitle: "What truly sets CasPro apart is not just the individual power of each feature, but their seamless integration into a cohesive ecosystem. This synergy creates an unparalleled workflow from raw data to actionable insights and therapeutic innovation.",
  harmonyVisualPlaceholder: "An elegant, interactive 3D network graph visualizing how all CasPro features (Genomic Analysis, Therapy Design, Evaluation, Trial Matching, Agent System) interconnect and exchange data, highlighting the flow and synergy.",
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const FeaturesSection = () => {
  return (
    <section id={FEATURES_CONFIG.sectionId} className="section bg-slate-50">
      <div className="container">
        <motion.div
          initial={FEATURES_CONFIG.animationVariants.initial}
          whileInView={FEATURES_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={FEATURES_CONFIG.animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="heading-2 mb-6">{FEATURES_CONFIG.title}</h2>
          <p className="subheading">
            {FEATURES_CONFIG.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_CONFIG.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={FEATURES_CONFIG.animationVariants.initial}
              whileInView={FEATURES_CONFIG.animationVariants.animate}
              viewport={{ once: true }}
              transition={FEATURES_CONFIG.animationVariants.transition(index * 0.1)}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200 flex flex-col items-start h-full"
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 text-3xl self-start">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={FEATURES_CONFIG.animationVariants.initial}
          whileInView={FEATURES_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={FEATURES_CONFIG.animationVariants.transition(0.5)}
          className="mt-20 bg-white rounded-xl p-8 md:p-12 text-center shadow-xl border border-slate-200"
        >
          <div className="flex justify-center text-5xl text-primary mb-6">
            <FiShare2 />
          </div>
          <h3 className="heading-3 mb-6 text-slate-800">{FEATURES_CONFIG.harmonyTitle}</h3>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-slate-600">
            {FEATURES_CONFIG.harmonySubtitle}
          </p>
          <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <div className="animate-pulse">Loading 3D model...</div>
              </div>
            }>
              <DnaRnaModelViewer className="w-full h-full" />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 