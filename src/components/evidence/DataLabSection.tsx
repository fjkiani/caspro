'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dataLabData } from '@/data/evidence/data-lab-data';
import { HeroSection } from '@/components/use-cases/HeroSection';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/shared/CTASection';
import {
  Database,
  Target,
  BarChart3,
  CheckCircle,
  Search,
  Play,
  Tag,
  Download
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Database,
  Target,
  BarChart3,
  Search,
  Play,
  Tag,
  Download
};

export const DataLabSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <HeroSection
        title={dataLabData.hero.title}
        description={dataLabData.hero.subtitle}
        whyItMatters={[
          "Interact with your data in real-time, no coding required.",
          "Visually test hypotheses and explore complex cohorts instantly.",
          "Connect population-level data to specific therapeutic insights."
        ]}
        delivered={[
          "High-performance, interactive study browser.",
          "Integrated therapeutic pipeline visualizations.",
          "A clear, explorable path from data to discovery."
        ]}
      />

      {/* Core Capabilities */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Data Lab Capabilities"
            subtitle="Tools for interactive exploration and analysis"
          />
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {dataLabData.capabilities.map((capability, index) => {
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${capability.status === 'live'
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
                      <p className="text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: capability.genomicUseCases?.replace(/\n/g, '<br/>') || '' }} />
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
        title="Explore the Evidence Ecosystem"
        description="Data Lab is one part of our interconnected Evidence Intelligence platform."
        primaryButton={{
          text: "View S/P/E Fusion",
          href: "/evidence/spe-fusion"
        }}
        secondaryButton={{
          text: "See SAE Intelligence",
          href: "/evidence/sae-intelligence"
        }}
      />
    </div>
  );
};
