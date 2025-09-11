'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { multipleMyelomaUseCase, multipleMyelomaCapabilities } from '@/data/use-cases/multiple-myeloma';
import { formatMetricValue } from '@/data/metrics';
import { 
  HeroSection, 
  SpecificFindingCard, 
  CapabilityShowcase, 
  EnhancedMetricCard,
  TechnicalPipeline
} from '@/components/use-cases';

interface UseCasePageProps {
  params: {
    slug: string;
  };
}

const useCaseData = {
  'multiple-myeloma': {
    useCase: multipleMyelomaUseCase,
    capabilities: multipleMyelomaCapabilities
  }
};

export default function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = params;
  const data = useCaseData[slug as keyof typeof useCaseData];

  if (!data) {
    notFound();
  }

  const { useCase, capabilities } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <HeroSection
        title={useCase.title}
        description={useCase.description}
        whyItMatters={[
          'Reduce VUS from ~40% to ~15% (target) to unblock decisions and experiments.',
          'Explainable therapy ranking with citations speeds tumor board alignment.',
          'Provenance (run IDs) ensures repeatability and auditability.'
        ]}
        delivered={[
          'Variant Insight chips; Therapy Fit table; Pathway View; Trials shortlist.',
          'Toxicity Risk chip; CRISPR Readiness (demo).',
          'Exports (JSON/CSV) and provenance across views.'
        ]}
      />

      {/* Validation Metrics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Validation Metrics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rigorous validation across multiple datasets demonstrates our platform's accuracy and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {useCase.metrics.validation?.map((metric, index) => (
              <EnhancedMetricCard key={`validation-${index}`} metric={metric} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Specific Findings Section */}
      {useCase.specificFindings && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Research Findings</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real-world insights from Multiple Myeloma research applications
              </p>
            </motion.div>

            <div className="space-y-12 max-w-7xl mx-auto">
              {useCase.specificFindings.map((finding, index) => (
                <SpecificFindingCard key={index} finding={finding} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Pipeline Section */}
      <TechnicalPipeline />

      {/* Capabilities Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools for variant analysis, therapy guidance, and clinical trial matching
            </p>
          </motion.div>

          <CapabilityShowcase capabilities={capabilities} />
        </div>
      </section>

      {/* How to Read Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">How to Read Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                'Confidence (0–1) is a certainty hint; Evidence Tier is Supported/Consider/Insufficient.',
                'Badges show strength (Guideline, RCT, ClinVar-Strong, Pathway-Aligned).',
                'Fusion labeled when eligible; Baseline remains deterministic.'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-4">{index + 1}</div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}