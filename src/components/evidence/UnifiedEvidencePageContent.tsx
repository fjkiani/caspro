'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  EvidenceBadge, 
  EvidenceTier, 
  StudyBrowser,
  SAEFeatureVisualization,
  SAEAttributionCard,
  SAESafetyChecker,
  SAESteeringPanel
} from '@/components/evidence';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/shared/CTASection';
import CapabilityCard from '@/components/shared/CapabilityCard';
import ValuePropositionCard from '@/components/shared/ValuePropositionCard';
import { 
  BookOpen, 
  Layers, 
  Database, 
  Brain, 
  Shield, 
  Target,
  ArrowRight,
  Link,
  Zap,
  TrendingUp,
  CheckCircle,
  Award,
  Users
} from 'lucide-react';
import { unifiedEvidenceData } from '@/data/evidence/unified-evidence-data';
import { mapMetricsToEvidence, createEvidenceBadgesFromMetrics, createEvidenceTiersFromMetrics } from '@/data/evidence/metrics-to-evidence-mapper';
import { discriminativeMetrics, generativeMetrics, businessMetrics } from '@/data/metrics/core-metrics';
import { formatMetricValue } from '@/data/metrics';

const iconMap = {
  BookOpen,
  Layers,
  Database,
  Brain,
  Shield,
  Target,
  ArrowRight,
  Link,
  Zap,
  TrendingUp,
  CheckCircle,
  Award,
  Users
};

// Enhanced evidence tabs that merge metrics
const evidenceTabs = [
  { id: 'overview', label: 'Evidence Overview', icon: Shield, description: 'Comprehensive evidence summary' },
  { id: 'discriminative', label: 'Discriminative AI', icon: Target, description: 'Variant interpretation & prediction' },
  { id: 'generative', label: 'Generative AI', icon: Brain, description: 'Genome generation & design' },
  { id: 'business', label: 'Business Impact', icon: TrendingUp, description: 'ROI & efficiency metrics' },
  { id: 'validation', label: 'Validation Studies', icon: CheckCircle, description: 'Clinical validation & studies' },
  { id: 'capabilities', label: 'Capabilities', icon: Database, description: 'Platform capabilities & features' }
];

export const UnifiedEvidencePageContent: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  // Handle hash-based navigation
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && evidenceTabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);
  
  // Get dynamically mapped metrics
  const metricsMapping = mapMetricsToEvidence();
  const dynamicBadges = createEvidenceBadgesFromMetrics();
  const dynamicTiers = createEvidenceTiersFromMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {unifiedEvidenceData.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-4xl mx-auto mb-8"
          >
            {unifiedEvidenceData.hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-3xl mx-auto mb-12"
          >
            {unifiedEvidenceData.hero.description}
          </motion.p>
          
          {/* Key Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          >
            {unifiedEvidenceData.hero.keyMetrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-slate-800 mb-2">{metric.label}</div>
                <div className="text-sm text-slate-600">{metric.description}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    metric.tier === 'Supported' ? 'bg-green-100 text-green-700' :
                    metric.tier === 'Consider' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {metric.tier}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    metric.badge === 'ClinVar-Strong' ? 'bg-purple-100 text-purple-700' :
                    metric.badge === 'SOTA' ? 'bg-blue-100 text-blue-700' :
                    metric.badge === 'Validated' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {metric.badge}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/evidence/spe-fusion"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore S/P/E Fusion
            </a>
            <a
              href="/evidence/data-lab"
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition-colors"
            >
              Visit Data Lab
            </a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Tabbed Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {evidenceTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.location.hash = tab.id;
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {activeTab === 'overview' && (
            <div className="space-y-16">
              {/* Condensed Metrics Section */}
              <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Evidence-Driven Metrics"
            subtitle="Performance metrics condensed into evidence tiers and badges"
            description="All our metrics are now organized by evidence strength, making it easier to understand what you can trust and why."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Evidence Tiers */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-600" />
                Evidence Tiers
              </h3>
              <div className="space-y-4">
                {dynamicTiers.map((tier, index) => (
                  <motion.div
                    key={tier.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      tier.color === 'green' ? 'border-green-500 bg-green-50' :
                      tier.color === 'yellow' ? 'border-yellow-500 bg-yellow-50' :
                      'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{tier.level}</h4>
                      <span className="text-sm text-slate-600">{tier.metrics.length} metrics</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{tier.description}</p>
                    <p className="text-xs text-slate-500">{tier.criteria}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Evidence Badges */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                Evidence Badges
              </h3>
              <div className="space-y-4">
                {dynamicBadges.map((badge, index) => (
                  <motion.div
                    key={badge.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      badge.color === 'purple' ? 'border-purple-200 bg-purple-50' :
                      badge.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                      badge.color === 'green' ? 'border-green-200 bg-green-50' :
                      'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{badge.type}</h4>
                      <span className="text-sm text-slate-600">{badge.metrics.length} metrics</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{badge.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {badge.metrics.slice(0, 3).map((metric, metricIndex) => (
                        <span key={metricIndex} className="px-2 py-1 bg-white rounded text-xs text-slate-600">
                          {metric}
                        </span>
                      ))}
                      {badge.metrics.length > 3 && (
                        <span className="px-2 py-1 bg-white rounded text-xs text-slate-500">
                          +{badge.metrics.length - 3} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Evidence Intelligence Capabilities"
            subtitle="Core features for evidence-driven decision making"
            description="Transform raw findings into actionable insights with confidence scoring, tiering, and provenance tracking."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {unifiedEvidenceData.capabilities.map((capability, index) => {
              const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || Target;
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CapabilityCard
                    title={capability.title}
                    description={capability.description}
                    icon={IconComponent}
                    color={capability.color}
                    technical={capability.technical}
                    scientific={capability.scientific}
                    business={capability.business}
                    features={capability.features}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Observed Outcomes */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Observed Outcomes"
            subtitle="Real-world validation showing measurable improvements"
            description="Evidence-based performance metrics demonstrating the impact of our evidence intelligence platform."
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unifiedEvidenceData.observedOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">{outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Value Propositions"
            subtitle="Benefits for different user types"
            description="How evidence intelligence serves researchers and clinicians with different needs and workflows."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {unifiedEvidenceData.valueProps.map((proposition, index) => {
              const IconComponent = iconMap[proposition.icon as keyof typeof iconMap] || Users;
              return (
                <ValuePropositionCard
                  key={index}
                  audience={proposition.audience}
                  points={proposition.points}
                  icon={IconComponent}
                  color="blue"
                />
              );
            })}
          </div>
        </div>
      </section>
            </div>
          )}

          {activeTab === 'discriminative' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Discriminative AI Metrics</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Variant interpretation and prediction performance across multiple datasets and benchmarks
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {discriminativeMetrics.map((group: any, groupIndex: number) => (
                  <div key={groupIndex} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-8 h-8 text-blue-600" />
                      <h3 className="text-2xl font-bold text-gray-800">{group.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{group.description}</p>
                    
                    <div className="space-y-4">
                      {group.benchmarks.map((benchmark: any, index: number) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{benchmark.title}</h4>
                            <span className="text-2xl font-bold text-blue-600">
                              {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{benchmark.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {benchmark.dataset || 'Internal validation'}
                            </span>
                            {benchmark.isStateOfTheArt && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                SOTA
                              </span>
                            )}
                            {benchmark.sampleSize && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                n={benchmark.sampleSize}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'generative' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Generative AI Metrics</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Genome generation and design capabilities with quality and diversity metrics
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {generativeMetrics.map((group: any, groupIndex: number) => (
                  <div key={groupIndex} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Brain className="w-8 h-8 text-purple-600" />
                      <h3 className="text-2xl font-bold text-gray-800">{group.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{group.description}</p>
                    
                    <div className="space-y-4">
                      {group.benchmarks.map((benchmark: any, index: number) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{benchmark.title}</h4>
                            <span className="text-2xl font-bold text-purple-600">
                              {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{benchmark.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {benchmark.dataset || 'Internal validation'}
                            </span>
                            {benchmark.isStateOfTheArt && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                SOTA
                              </span>
                            )}
                            {benchmark.sampleSize && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                n={benchmark.sampleSize}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'business' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Business Impact Metrics</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  ROI, efficiency, and cost reduction metrics that drive business value
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {businessMetrics.map((group: any, groupIndex: number) => (
                  <div key={groupIndex} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                      <h3 className="text-2xl font-bold text-gray-800">{group.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{group.description}</p>
                    
                    <div className="space-y-4">
                      {group.benchmarks.map((benchmark: any, index: number) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{benchmark.title}</h4>
                            <span className="text-2xl font-bold text-green-600">
                              {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{benchmark.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                              {benchmark.dataset || 'Business validation'}
                            </span>
                            {benchmark.isStateOfTheArt && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Industry Leading
                              </span>
                            )}
                            {benchmark.sampleSize && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                n={benchmark.sampleSize}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Validation Studies</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Clinical validation, peer-reviewed studies, and real-world evidence
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {unifiedEvidenceData.tiers.map((tier, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className={`w-8 h-8 ${
                        tier.level === 'Supported' ? 'text-green-600' :
                        tier.level === 'Consider' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                      <h3 className="text-2xl font-bold text-gray-800">{tier.level}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{tier.description}</p>
                    
                    <div className="space-y-3">
                      {(Array.isArray(tier.criteria) ? tier.criteria : []).map((criterion: any, criterionIndex: number) => (
                        <div key={criterionIndex} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            tier.level === 'Supported' ? 'bg-green-500' :
                            tier.level === 'Consider' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <span className="text-gray-700">{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Capabilities</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Core capabilities and features that power evidence-driven research
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {unifiedEvidenceData.capabilities.map((capability, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Database className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-2xl font-bold text-gray-800">{capability.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{capability.description}</p>
                    
                    <div className="space-y-3">
                      {(Array.isArray(capability.keyMetrics) ? capability.keyMetrics : []).map((metric: any, metricIndex: number) => (
                        <div key={metricIndex} className="flex justify-between items-center">
                          <span className="text-gray-700">{metric.label}</span>
                          <span className="font-semibold text-indigo-600">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <CTASection
            title="Ready to Transform Your Evidence Workflow?"
            description="Start with evidence intelligence, explore S/P/E fusion, or dive into the data lab for comprehensive evidence-driven research."
            primaryButton={{
              text: "Explore Evidence Intelligence",
              href: "/evidence",
              color: "blue"
            }}
            secondaryButton={{
              text: "Visit Data Lab",
              href: "/evidence/data-lab",
              color: "blue"
            }}
            backgroundColor="blue"
          />
        </div>
      </section>
    </div>
  );
};
