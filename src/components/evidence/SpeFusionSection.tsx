'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { speFusionData } from '@/data/evidence/spe-fusion-data';
import { HeroSection } from '@/components/use-cases/HeroSection';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/shared/CTASection';
import { 
  Lightbulb,
  Shield,
  Database,
  Users,
  BarChart3,
  CheckCircle
} from 'lucide-react';

const iconMap = {
  Lightbulb,
  Shield,
  Database,
  Users,
  BarChart3
};

export const SpeFusionSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <HeroSection
        title={speFusionData.hero.title}
        description={speFusionData.hero.subtitle}
        whyItMatters={[
          "Get a single, unified view of variant impact across multiple biological dimensions.",
          "Transform ambiguous data points into a clear, confident, and coherent evidence story.",
          "Move beyond single-metric scores to a holistic, biologically-grounded conclusion."
        ]}
        delivered={[
          "Integrated analysis of Structure, Phenotype, and Expression data.",
          "Clear, auditable evidence trail for every prediction.",
          "Actionable insights for therapeutic consideration (RUO)."
        ]}
      />

      {/* Value Propositions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="A Multi-Dimensional Approach"
            subtitle="S/P/E Fusion serves both scientific discovery and clinical research"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {speFusionData.valueProps.map((prop, index) => {
              const IconComponent = iconMap[prop.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {prop.audience}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {prop.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: point }} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="The Three Pillars of S/P/E Fusion"
            subtitle="Integrating Structure, Phenotype, and Expression"
          />
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {speFusionData.capabilities.map((capability, index) => {
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
                      <p className="text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: capability.genomicUseCases.replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to See S/P/E Fusion in Action?"
        description="Experience a unified, multi-dimensional approach to variant interpretation."
        primaryButton={{
          text: "Explore Data Lab",
          href: "/evidence/data-lab"
        }}
        secondaryButton={{
          text: "View SAE Intelligence",
          href: "/evidence/sae-intelligence"
        }}
      />
    </div>
  );
};
