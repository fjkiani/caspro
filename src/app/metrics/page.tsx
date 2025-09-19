'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { metricsRegistry } from '@/data/metrics/registry';
import { BarChart, TrendingUp, Briefcase, FileText, Target, ShieldCheck, Dna, Rocket, CheckCircle } from 'lucide-react';
import TabbedInterface, { type TabItem } from '@/components/shared/TabbedInterface';
import EnhancedMetricCard from '@/components/metrics/EnhancedMetricCard';
import { BRCAMutationSimulator, VUSResolutionPlayground, PatientImpactCalculator, SNVPredictionPlayground, SpliceVariantExplorer } from '@/components/metrics/interactive';

const iconMap = {
  brca: Dna,
  snv: Target,
  splice: FileText,
  vus: ShieldCheck,
  generative: Rocket,
  business: Briefcase
};

// Helper function to render enhanced metric cards
const renderEnhancedCards = (benchmarks: any[], startIndex: number = 0) => {
  return benchmarks.map((benchmark, index) => (
    <EnhancedMetricCard 
      key={benchmark.title} 
      benchmark={benchmark} 
      index={startIndex + index}
    />
  ));
};

const MetricGroupDisplay: React.FC<{ group: any }> = ({ group }) => {
  return (
    <div className="mb-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Performance Metrics</span>
        </div>
        <h3 className="text-4xl font-black text-slate-900 mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {group.title}
        </h3>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{group.description}</p>
      </div>

      {/* Metrics Grid - Adaptive Layout */}
      <div className="space-y-8">
        {group.benchmarks.length === 1 ? (
          // Single card - make it hero sized
          <div className="max-w-2xl mx-auto">
            {renderEnhancedCards([group.benchmarks[0]])}
          </div>
        ) : group.benchmarks.length === 2 ? (
          // Two cards - side by side
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {renderEnhancedCards(group.benchmarks)}
          </div>
        ) : group.benchmarks.length === 3 ? (
          // Three cards - one large, two smaller
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderEnhancedCards([group.benchmarks[0]])}
            </div>
            <div className="space-y-8">
              {renderEnhancedCards(group.benchmarks.slice(1), 1)}
            </div>
          </div>
        ) : (
          // Four or more cards - responsive grid
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {renderEnhancedCards(group.benchmarks)}
          </div>
        )}
      </div>
    </div>
  );
};

const MetricSectionContent: React.FC<{ metric: any }> = ({ metric }) => {
  const allMetricGroups = [
    ...metric.metrics.discriminative,
    ...metric.metrics.generative,
    ...metric.metrics.business,
  ];

  // Get the appropriate interactive demo based on metric type
  const getInteractiveDemo = (metricId: string) => {
    switch (metricId) {
      case 'brca':
        return <BRCAMutationSimulator />;
      case 'snv':
        return <SNVPredictionPlayground />;
      case 'splice':
        return <SpliceVariantExplorer />;
      case 'vus':
        return <VUSResolutionPlayground />;
      case 'business':
        return <PatientImpactCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{metric.title}</h2>
        <p className="text-xl text-slate-700 mb-8">{metric.description}</p>
      </div>

      {/* Interactive Demonstration */}
      {getInteractiveDemo(metric.useCaseId) && (
        <section className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-black text-slate-900 mb-4">Interactive Demonstration</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See our technology in action - explore real examples and understand the impact
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            {getInteractiveDemo(metric.useCaseId)}
          </div>
        </section>
      )}

      {/* Core Metrics Display */}
      <section className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-4">Performance Benchmarks</h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Validated results from peer-reviewed studies and real-world deployments
          </p>
        </div>
        <div>
          {allMetricGroups.map(group => (
            <MetricGroupDisplay key={group.id} group={group} />
          ))}
        </div>
      </section>

      {/* Additional Details */}
      {(metric.whyItMatters || metric.delivered || metric.howToRead) && (
        <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.3) 2px, transparent 0)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="relative px-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-black text-slate-900 mb-4">Understanding the Impact</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Deep dive into why these metrics matter and how our technology delivers exceptional results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {metric.whyItMatters && (
                <motion.div 
                  className="relative bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-2xl" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white"/>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">Why It Matters</h4>
                  </div>
                  <ul className="space-y-4">
                    {metric.whyItMatters.map((item: string, index: number) => (
                      <motion.li 
                        key={item}
                        className="flex items-start gap-3 text-slate-600 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
          </motion.div>
              )}
              
              {metric.delivered && (
                <motion.div
                  className="relative bg-white p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-2xl" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white"/>
                      </div>
                    <h4 className="text-2xl font-bold text-slate-800">What We Deliver</h4>
                          </div>
                  <ul className="space-y-4">
                    {metric.delivered.map((item: string, index: number) => (
                      <motion.li 
                        key={item}
                        className="flex items-start gap-3 text-slate-600 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {metric.howToRead && (
                <motion.div 
                  className="relative bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-t-2xl" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg">
                      <FileText className="w-6 h-6 text-white"/>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800">How to Read</h4>
                  </div>
                  <ul className="space-y-4">
                    {metric.howToRead.map((item: string, index: number) => (
                      <motion.li 
                        key={item}
                        className="flex items-start gap-3 text-slate-600 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
        </div>
      </section>
      )}
    </div>
  );
};

const UnifiedMetricsPage = () => {
  // Create tabs configuration
  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Metrics Overview',
      icon: BarChart,
      content: <div>Overview content will be auto-generated by TabbedInterface</div>
    },
    {
      id: 'brca',
      label: 'BRCA1/2',
      icon: Dna,
      content: <MetricSectionContent metric={metricsRegistry.brca} />
    },
    {
      id: 'snv',
      label: 'SNV Prediction',
      icon: Target,
      content: <MetricSectionContent metric={metricsRegistry.snv} />
    },
    {
      id: 'splice',
      label: 'Splice Variants',
      icon: FileText,
      content: <MetricSectionContent metric={metricsRegistry.splice} />
    },
    {
      id: 'vus',
      label: 'VUS Resolution',
      icon: ShieldCheck,
      content: <MetricSectionContent metric={metricsRegistry.vus} />
    },
    {
      id: 'generative',
      label: 'Generative AI',
      icon: Rocket,
      content: <MetricSectionContent metric={metricsRegistry.generative} />
    },
    {
      id: 'business',
      label: 'Patient Impact',
      icon: Briefcase,
      content: <MetricSectionContent metric={metricsRegistry.business} />
    }
  ];

  return (
    <TabbedInterface
      title="Performance Metrics"
      subtitle="Our in-silico research framework is grounded in peer-reviewed validation and transparent methodology. Explore our state-of-the-art performance across key benchmarks and discover the real-world impact of our technology."
      tabs={tabs}
      sidebarTitle="Metrics"
      sidebarSubtitle="Navigate sections"
    />
  );
};

export default UnifiedMetricsPage;
