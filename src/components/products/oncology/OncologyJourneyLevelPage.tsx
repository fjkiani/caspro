'use client';

import React from 'react';
import { OncologyAgentProvider } from '@/contexts/OncologyAgentContext';
import ProductHeroSection, { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import ProblemSolutionSection, { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';
import SectionHeader from '@/components/products/shared/SectionHeader';
import MetricsShowcase, { type Metric } from '@/components/products/shared/MetricsShowcase';
import UnifiedMonitoringDashboard from '@/components/products/oncology/UnifiedMonitoringDashboard';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
  unlocks?: string; // What this step unlocks
}

interface OncologyJourneyLevelPageProps {
  level: 2 | 3 | 4;
  heroContent: ProductHeroContent;
  problemContent: ProblemSolutionContent;
  solutionContent: ProblemSolutionContent;
  howItWorksSteps: HowItWorksStep[];
  validationMetrics: Metric[];
}

export default function OncologyJourneyLevelPage({
  level,
  heroContent,
  problemContent,
  solutionContent,
  howItWorksSteps,
  validationMetrics,
}: OncologyJourneyLevelPageProps) {
  const nextLevel = level < 4 ? csiJourneyLevels.find(l => l.level === level + 1) : null;

  return (
    <OncologyAgentProvider patientId="AK">
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* 1. Hero Section */}
          <ProductHeroSection content={heroContent} />

          {/* 2. Problem Section */}
          <ProblemSolutionSection content={problemContent} />

          {/* 3. Solution Section */}
          <ProblemSolutionSection content={solutionContent} />

          {/* 4. How It Works - With Clear Unlock Indicators */}
          <section id="how-it-works" className="mb-16">
            <SectionHeader
              title={`How Level ${level} Works`}
              description="Four steps to unlock this capability"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all relative"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.number}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block flex-1 h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{step.title}</h3>
                  
                  {/* Input/Output Info */}
                  {step.details && step.details.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {step.details.slice(0, 1).map((detail, idx) => (
                        <div key={idx} className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-500">{detail.label}:</span>{' '}
                          <span className="text-slate-700">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Unlock Badge - Most Important */}
                  {/* {step.unlocks && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-green-700">Unlocks:</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1 font-semibold">{step.unlocks}</p>
                    </div>
                  )} */}
                  
                  {/* Arrow to next step (desktop only) */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Final Unlock Summary */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-900">Complete Level {level} to Unlock:</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2 mt-2">
                {csiJourneyLevels.find(l => l.level === level)?.unlocks.slice(0, 4).map((unlock, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span>{unlock}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Unified Monitoring Dashboard with Inline Explanations */}
          <section id="monitoring-dashboard" className="mb-16">
            <SectionHeader
              title="CSI in Action: Continuous Monitoring"
              description="See how CSI updates automatically as tumor evolves. Track chemosensitivity across treatment lines with real-time alerts when CSI drops below threshold."
            />
            <UnifiedMonitoringDashboard level={level} patientId="AK" />
          </section>

          {/* 6. Validation Metrics */}
          <section id="validation" className="mb-16">
            <MetricsShowcase
              badge={{
                text: `Level ${level} Validation`,
                icon: Award,
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800'
              }}
              title={`Level ${level} Performance Metrics`}
              subtitle="Validated performance for this capability"
              metrics={validationMetrics}
            />
          </section>

          {/* 7. Next Level CTA */}
          {nextLevel && (
            <section id="next-level" className="mb-16">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Ready for Level {nextLevel.level}?
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {nextLevel.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>Unlocks:</span>
                      <span className="font-semibold text-slate-700">
                        {nextLevel.unlocks.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={nextLevel.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Level {nextLevel.level}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </OncologyAgentProvider>
  );
}
