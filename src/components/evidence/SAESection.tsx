'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { saeData } from '@/data/evidence/sae-data';
import { HeroSection } from '@/components/use-cases/HeroSection';
import CapabilityCard from '@/components/shared/CapabilityCard';
import ObservedOutcomes from '@/components/shared/ObservedOutcomes';
import ValuePropositionCard from '@/components/shared/ValuePropositionCard';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/shared/CTASection';
import { SAEFeatureVisualization } from './SAEFeatureVisualization';
import { SAEAttributionCard } from './SAEAttributionCard';
import { SAESafetyChecker } from './SAESafetyChecker';
import { SAESteeringPanel } from './SAESteeringPanel';
import { 
  Lightbulb, 
  Settings, 
  Layers, 
  TrendingDown, 
  Shield, 
  Sliders,
  CheckCircle,
  AlertTriangle,
  Code,
  Database,
  Target
} from 'lucide-react';

const iconMap = {
  Lightbulb,
  Settings,
  Layers,
  TrendingDown,
  Shield,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Code,
  Database
};

export const SAESection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <HeroSection
        title={saeData.hero.title}
        description={saeData.hero.subtitle}
        whyItMatters={[
          "Transform black-box predictions into transparent, biologically-grounded stories",
          "Expose the model's internal logic to explain variant impact",
          "Flag risky designs and steer generative AI (roadmap)"
        ]}
        delivered={[
          "Interactive feature visualizations with disruption scores",
          "Automated prompt safety checks",
          "Clear biological explanations for every prediction"
        ]}
      />

      {/* Value Propositions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Built for Different Audiences"
            subtitle="SAE Intelligence serves both scientific discovery and engineering excellence"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {saeData.valueProps.map((prop, index) => {
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

      {/* How It Works Today */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={saeData.buildsOn.title}
            subtitle="Current implementation details and technical foundation"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {saeData.buildsOn.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900">Component {index + 1}</h4>
                </div>
                <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: point }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Core Capabilities"
            subtitle="From feature attribution to activation steering"
          />
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {saeData.capabilities.map((capability, index) => {
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
                      <p className="text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: capability.business }} />
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

      {/* Interactive Demonstrations */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Interactive Demonstrations"
            subtitle="See SAE Intelligence in action"
          />
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <SAEFeatureVisualization />
            <SAEAttributionCard />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <SAESafetyChecker />
            <SAESteeringPanel />
          </div>
        </div>
      </section>

      {/* Observed Outcomes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Observed Outcomes"
            subtitle="Real-world impact from SAE Intelligence"
          />
          <ObservedOutcomes outcomes={saeData.observedOutcomes} />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Institutional Value"
            subtitle="Why SAE Intelligence matters for your organization"
          />
          <div className="mt-12">
            {saeData.valueProposition.map((prop, index) => (
              <ValuePropositionCard
                key={index}
                audience={prop.audience}
                icon={Target}
                points={prop.points}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Technical Implementation"
            subtitle="Current state and roadmap details"
          />
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-600" />
                Data Contract
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">SAE Features</h4>
                  <p className="text-slate-700 text-sm">{saeData.technicalDetails.dataContract.saeFeatures}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Delta LL Series</h4>
                  <p className="text-slate-700 text-sm">{saeData.technicalDetails.dataContract.deltaLLSeries}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Provenance</h4>
                  <p className="text-slate-700 text-sm">{saeData.technicalDetails.dataContract.provenance}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-green-600" />
                Code Locations
              </h3>
              <div className="space-y-4">
                {saeData.technicalDetails.codeLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{location.component}</h4>
                      <p className="text-slate-600 text-sm">{location.path}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      location.status === 'live' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {location.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to See SAE Intelligence in Action?"
        description="Experience interpretable AI that explains every prediction"
        primaryButton={{
          text: "Explore S/P/E Fusion",
          href: "/evidence/spe-fusion"
        }}
        secondaryButton={{
          text: "View Data Lab",
          href: "/evidence/data-lab"
        }}
      />
    </div>
  );
};
