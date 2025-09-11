'use client';

import React from 'react';
import { 
  Users, Database, List, Play, GitMerge, Download
} from 'lucide-react';
import { cohortData } from '@/data/cohort/cohort-data';
import { 
  MetricCard, 
  CapabilityCard, 
  ValuePropositionCard, 
  SectionHeader, 
  CTASection, 
  ObservedOutcomes 
} from '@/components/shared';
import { CohortSnippet, StudyCard, ArtifactCard } from './index';

const iconMap = {
  Users,
  Database,
  List,
  Play,
  GitMerge,
  Download
};

const CohortSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <SectionHeader
          title={cohortData.hero.title}
          subtitle={cohortData.hero.subtitle}
          description={cohortData.hero.description}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cohortData.hero.keyMetrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              impact={metric.impact}
              color="teal"
              index={index}
            />
          ))}
        </div>

        {/* Capabilities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Key Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cohortData.capabilities.map((capability, index) => {
              const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || Users;
              
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

        {/* Sample Study and Snippet */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sample Cohort Context</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StudyCard
              {...cohortData.studies[0]}
              index={0}
            />
            <CohortSnippet
              {...cohortData.sampleSnippet}
              studyName={cohortData.studies[0].name}
              index={1}
            />
          </div>
        </div>

        {/* Artifacts */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Generated Artifacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cohortData.sampleArtifacts.map((artifact, index) => (
              <ArtifactCard
                key={artifact.name}
                {...artifact}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Value Propositions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Value Propositions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cohortData.valueProps.map((prop, index) => {
              const IconComponent = iconMap[prop.icon as keyof typeof iconMap] || Users;
              
              return (
                <ValuePropositionCard
                  key={prop.audience}
                  audience={prop.audience}
                  icon={IconComponent}
                  points={prop.points}
                  color="teal"
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* Observed Outcomes */}
        <ObservedOutcomes outcomes={cohortData.observedOutcomes} color="green" />

        {/* CTA */}
        <CTASection
          title="Ready to Add Cohort Context?"
          description="Enhance your in-silico results with real-world cohort overlays and see how context can boost confidence and accelerate decisions."
          primaryButton={{
            text: "Explore Cohort Lab",
            href: "/insilico",
            color: "teal"
          }}
          secondaryButton={{
            text: "View Evidence Intelligence",
            href: "/evidence",
            color: "teal"
          }}
          backgroundColor="teal"
        />
      </div>
    </section>
  );
};

export default CohortSection;
