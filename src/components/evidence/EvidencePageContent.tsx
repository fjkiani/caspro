'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  EvidenceSection, 
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
  Zap
} from 'lucide-react';

const iconMap = {
  BookOpen,
  Layers,
  Database,
  Brain,
  Shield,
  Target,
  ArrowRight,
  Link,
  Zap
};

const evidenceCapabilities = [
  {
    title: "Evidence Intelligence",
    status: "live" as const,
    technical: "Automated evidence tiering, confidence scoring, and citation management with full provenance tracking.",
    scientific: "Transforms raw research findings into structured, auditable evidence stories with clear confidence levels.",
    business: "Enables evidence-based decision making with transparent, traceable confidence assessments.",
    genomicUseCases: "Automatically categorizes research findings by evidence strength and biological relevance.",
    icon: "BookOpen",
    color: "text-blue-400"
  },
  {
    title: "S/P/E Fusion",
    status: "live" as const,
    technical: "Integrates Structure, Phenotype, and Expression data for comprehensive variant impact assessment.",
    scientific: "Provides unified view of variant effects across multiple biological dimensions with confidence scoring.",
    business: "Reduces analysis time while increasing confidence in variant interpretation and therapeutic targeting.",
    genomicUseCases: "Combines structural predictions, phenotypic data, and expression patterns for holistic variant analysis.",
    icon: "Layers",
    color: "text-green-400"
  },
  {
    title: "Data Lab",
    status: "live" as const,
    technical: "Interactive study browser with real-time data access and therapeutic pipeline visualization.",
    scientific: "Enables rapid hypothesis testing and data exploration across multiple research datasets.",
    business: "Accelerates research workflows with instant access to curated datasets and analysis tools.",
    genomicUseCases: "Browse and analyze genomic datasets with integrated therapeutic pipeline insights.",
    icon: "Database",
    color: "text-purple-400"
  },
  {
    title: "SAE Intelligence",
    status: "live" as const,
    technical: "Interpretable AI features with disruption scoring and activation steering capabilities.",
    scientific: "Reveals the biological features driving AI predictions with quantitative disruption metrics.",
    business: "Builds trust in AI predictions through transparent, biologically-grounded explanations.",
    genomicUseCases: "Visualizes exon boundaries, TF motifs, and protein structures that drive variant predictions.",
    icon: "Brain",
    color: "text-orange-400"
  }
];

const interconnectedFeatures = [
  {
    title: "Evidence → S/P/E Fusion",
    description: "Evidence Intelligence provides confidence scores that enhance S/P/E Fusion predictions",
    icon: <ArrowRight className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "S/P/E Fusion → Data Lab",
    description: "Fusion results feed into Data Lab for comprehensive study analysis and validation",
    icon: <ArrowRight className="w-5 h-5" />,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Data Lab → SAE Intelligence",
    description: "Data Lab findings inform SAE feature attribution and disruption scoring",
    icon: <ArrowRight className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "SAE Intelligence → Evidence",
    description: "SAE explanations provide biological context that strengthens evidence confidence",
    icon: <ArrowRight className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-600"
  }
];

export const EvidencePageContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Evidence Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto"
          >
            Turn raw findings into a clear evidence story: confidence, tier, badges, and citations — all with provenance (RUO).
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/evidence/spe-fusion"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore S/P/E Fusion
            </a>
            <a
              href="/evidence/data-lab"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Visit Data Lab
            </a>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Evidence Intelligence Ecosystem"
            subtitle="Four interconnected capabilities that transform research into actionable insights"
          />
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {evidenceCapabilities.map((capability, index) => {
              const IconComponent = iconMap[capability.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${capability.color.replace('text-', 'bg-').replace('-400', '-100')}`}>
                      <IconComponent className={`w-6 h-6 ${capability.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{capability.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        capability.status === 'live' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {capability.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Technical</h4>
                      <p className="text-slate-700 text-sm">{capability.technical}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Scientific</h4>
                      <p className="text-slate-700 text-sm">{capability.scientific}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Business</h4>
                      <p className="text-slate-700 text-sm">{capability.business}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Use Cases</h4>
                      <p className="text-slate-700 text-sm">{capability.genomicUseCases}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interconnected Workflow */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="How They Work Together"
            subtitle="Evidence Intelligence components form a powerful, interconnected ecosystem"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {interconnectedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demonstrations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Live Demonstrations"
            subtitle="See Evidence Intelligence components in action"
          />
          
          {/* Evidence Intelligence Demo */}
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Evidence Intelligence
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <EvidenceBadge
                tier="Tier 1"
                confidence={0.95}
                category="Clinical"
                title="FDA-Approved Therapeutic Target"
                description="Validated therapeutic target with clinical evidence"
                citations={3}
                lastUpdated="2024-01-15"
              />
              <EvidenceTier
                tier="Tier 2"
                confidence={0.78}
                category="Preclinical"
                title="Preclinical Validation"
                description="Strong preclinical evidence with in vivo validation"
                citations={5}
                lastUpdated="2024-01-10"
              />
            </div>
          </div>

          {/* SAE Intelligence Demo */}
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Brain className="w-6 h-6 text-orange-600" />
              SAE Intelligence
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <SAEFeatureVisualization />
              <SAEAttributionCard />
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              <SAESafetyChecker />
              <SAESteeringPanel />
            </div>
          </div>

          {/* Data Lab Demo */}
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-600" />
              Data Lab
            </h3>
            <StudyBrowser />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Why Evidence Intelligence Matters"
            subtitle="Transform your research workflow with interconnected AI capabilities"
          />
          <div className="mt-12">
            <ValuePropositionCard
              audience="For Research Teams"
              icon={Target}
              points={[
                "Unified evidence assessment across multiple data sources and methodologies",
                "Transparent confidence scoring with full provenance tracking",
                "Interactive tools for hypothesis testing and data exploration",
                "Interpretable AI that explains every prediction with biological context"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Explore Evidence Intelligence"
            subtitle="Dive deeper into each component"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <a
              href="/evidence/spe-fusion"
              className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-green-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Layers className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">S/P/E Fusion</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Integrate Structure, Phenotype, and Expression data for comprehensive variant analysis.
              </p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="/evidence/data-lab"
              className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Data Lab</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Interactive study browser with real-time data access and therapeutic insights.
              </p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="/evidence/sae-intelligence"
              className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-orange-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Brain className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900">SAE Intelligence</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Interpretable AI features with disruption scoring and biological explanations.
              </p>
              <div className="flex items-center text-orange-600 text-sm font-medium">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="/cohort"
              className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Cohort Context</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Population-level insights and cohort-specific evidence analysis.
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Research?"
        description="Experience the power of interconnected Evidence Intelligence"
        primaryButton={{
          text: "Start with S/P/E Fusion",
          href: "/evidence/spe-fusion"
        }}
        secondaryButton={{
          text: "Explore Data Lab",
          href: "/evidence/data-lab"
        }}
      />
    </div>
  );
};
