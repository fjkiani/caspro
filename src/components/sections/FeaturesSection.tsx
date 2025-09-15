'use client';

import { motion, Variants } from 'framer-motion';
import { FiSearch, FiEdit, FiLayers, FiUsers, FiCpu, FiTrendingUp } from 'react-icons/fi';
import React, { Suspense, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import DnaSection from '../layouts/DnaSection';
import DnaCard from '../ui/DnaCard';
import DnaStrand from '../ui/DnaStrand';

// Dynamically import DnaRnaModelViewer with SSR disabled
const DnaRnaModelViewer = dynamic(
  () => import('@/components/ui/DnaRnaModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-foreground">
        <div className="animate-pulse">Loading 3D model...</div>
      </div>
    )
  }
);

type FeatureVariant = 'default' | 'adenine' | 'thymine' | 'guanine' | 'cytosine' | 'protein';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  variant: FeatureVariant;
}

// Constants for Features Section configuration
const FEATURES_CONFIG = {
  sectionId: "features",
  title: "Core Capabilities of CrisPRO",
  subtitle: "CrisPRO offers a comprehensive suite of AI-driven tools designed to revolutionize cancer genomics analysis, therapy design, and clinical decision-making.",
  features: [
    {
      icon: React.createElement(FiSearch),
      title: 'AI-Powered Genomic Analysis',
      description: 'Deep variant interpretation, functional impact prediction (CrisPRO.ai scores), and identification of novel therapeutic targets from complex genomic data.',
      variant: 'adenine' as FeatureVariant
    },
    {
      icon: React.createElement(FiEdit),
      title: 'AI-Guided Therapy Design',
      description: 'Leverage CrisPRO.ai generative power to design bespoke gene editing constructs (e.g., CRISPR guide RNAs, repair templates) and other biologics.',
      variant: 'thymine' as FeatureVariant
    },
    {
      icon: React.createElement(FiLayers),
      title: 'In Silico Design Evaluation',
      description: 'Predict structural viability and efficacy of designed therapies using AlphaFold 3, with comprehensive multi-modal scoring of candidates.',
      variant: 'guanine' as FeatureVariant
    },
    {
      icon: React.createElement(FiTrendingUp),
      title: 'Predictive Biomarker Discovery',
      description: 'Identify novel predictive biomarkers for treatment response and resistance, enhancing patient stratification for clinical trials and therapies.',
      variant: 'cytosine' as FeatureVariant
    },
    {
      icon: React.createElement(FiUsers),
      title: 'Intelligent Clinical Trial Matching',
      description: 'AI agent-based assistance to find relevant clinical trials based on comprehensive patient genomic and clinical profiles, accelerating enrollment.',
      variant: 'adenine' as FeatureVariant
    },
    {
      icon: React.createElement(FiCpu),
      title: 'Modular Agent Assistance',
      description: 'Your AI co-pilot for oncology: literature review, hypothesis generation, documentation support, and streamlining complex research workflows.',
      variant: 'thymine' as FeatureVariant
    }
  ] as Feature[],
  harmonyTitle: "A Symphony of Capabilities: The CrisPRO Ecosystem",
  harmonySubtitle: "What truly sets CrisPRO apart is not just the individual power of each feature, but their seamless integration into a cohesive ecosystem. This synergy creates an unparalleled workflow from raw data to actionable insights and therapeutic innovation."
};

const FeaturesSection = () => {
  return (
    <DnaSection
      id={FEATURES_CONFIG.sectionId}
      variant="helix"
      title={FEATURES_CONFIG.title}
      subtitle={FEATURES_CONFIG.subtitle}
      withDivider={true}
    >
      {(itemVariants: Variants) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_CONFIG.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <DnaCard 
                  title={feature.title}
                  icon={feature.icon}
                  variant={feature.variant}
                  showDnaStrand={true}
                  strandPosition={index % 2 === 0 ? 'left' : 'right'}
                  className="h-full"
                >
                  <p>{feature.description}</p>
                </DnaCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <DnaCard 
              title={FEATURES_CONFIG.harmonyTitle}
              variant="protein"
              showDnaStrand={true}
              strandPosition="bottom"
              className="p-4"
            >
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                {FEATURES_CONFIG.harmonySubtitle}
              </p>
              
              <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden border border-slate-200 bg-helix">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center text-foreground">
                    <div className="animate-pulse">Loading 3D model...</div>
                  </div>
                }>
                  <DnaRnaModelViewer className="w-full h-full" />
                </Suspense>
                
                {/* DNA strand decorative elements */}
                <div className="absolute left-0 top-0 bottom-0 w-16 opacity-30 pointer-events-none">
                  <DnaStrand className="w-full h-full" strandCount={2} animationDuration={15} />
                </div>
                
                <div className="absolute right-0 top-0 bottom-0 w-16 opacity-30 pointer-events-none">
                  <DnaStrand className="w-full h-full" strandCount={2} animationDuration={15} />
                </div>
              </div>
            </DnaCard>
          </motion.div>
        </>
      )}
    </DnaSection>
  );
};

export default FeaturesSection;