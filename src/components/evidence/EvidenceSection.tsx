'use client';

import React from 'react';
import { 
  ShieldCheck, BookOpen, Database, Users
} from 'lucide-react';
import { evidenceData } from '@/data/evidence/evidence-data';
import { 
  MetricCard, 
  CapabilityCard, 
  ValuePropositionCard, 
  SectionHeader, 
  CTASection, 
  ObservedOutcomes 
} from '@/components/shared';
import { EvidenceBadge, EvidenceTier } from './index';

const iconMap = {
  ShieldCheck,
  BookOpen,
  Database,
  Users
};

const EvidenceSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <SectionHeader
          title={evidenceData.hero.title}
          subtitle={evidenceData.hero.subtitle}
          description={evidenceData.hero.description}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {evidenceData.hero.keyMetrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              dataset={metric.dataset}
              sampleSize={metric.sampleSize}
              source={metric.source}
              color="blue"
              index={index}
            />
          ))}
        </div>

        {/* Evidence Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Evidence Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {evidenceData.tiers.map((tier, index) => (
              <EvidenceTier
                key={tier.level}
                tier={tier.level}
                confidence={tier.level === 'Supported' ? 95 : tier.level === 'Consider' ? 75 : 45}
                category="Clinical Evidence"
                title={tier.level}
                description={tier.description}
                citations={tier.level === 'Supported' ? 50 : tier.level === 'Consider' ? 25 : 10}
                lastUpdated="2024-01-15"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Evidence Badges */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Evidence Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {evidenceData.badges.map((badge, index) => (
              <EvidenceBadge
                key={badge.type}
                tier={badge.type}
                confidence={badge.type === 'RCT' ? 95 : badge.type === 'ClinVar-Strong' ? 90 : badge.type === 'Guideline' ? 85 : 80}
                category="Evidence Type"
                title={badge.type}
                description={badge.description}
                citations={badge.type === 'RCT' ? 100 : badge.type === 'ClinVar-Strong' ? 75 : badge.type === 'Guideline' ? 50 : 25}
                lastUpdated="2024-01-15"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {evidenceData.capabilities.map((capability, index) => {
              const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || ShieldCheck;
              
              return (
                <CapabilityCard
                  key={capability.title}
                  title={capability.title}
                  description={capability.description}
                  icon={IconComponent}
                  color={capability.color}
                  technical={capability.technical}
                  scientific={capability.scientific}
                  business={capability.business}
                  features={capability.features}
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* Value Propositions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Value Propositions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {evidenceData.valueProps.map((prop, index) => {
              const IconComponent = iconMap[prop.icon as keyof typeof iconMap] || ShieldCheck;
              
              return (
                <ValuePropositionCard
                  key={prop.audience}
                  audience={prop.audience}
                  icon={IconComponent}
                  points={prop.points}
                  color="blue"
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* Observed Outcomes */}
        <ObservedOutcomes outcomes={evidenceData.observedOutcomes} color="green" />

        {/* CTA */}
        <CTASection
          title="Ready to Experience Evidence Intelligence?"
          description="Explore our evidence capabilities and see how confidence, tiers, badges, and citations can transform your research workflow."
          primaryButton={{
            text: "Explore In-Silico Platform",
            href: "/insilico",
            color: "blue"
          }}
          secondaryButton={{
            text: "View Cohort Context",
            href: "/cohort",
            color: "blue"
          }}
          backgroundColor="blue"
        />
      </div>
    </section>
  );
};

export default EvidenceSection;
