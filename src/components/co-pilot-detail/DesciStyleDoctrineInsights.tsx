'use client';

import React from 'react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { SectionHeader, TacticalCapabilityMatrix, StrategicConclusion } from './sections';
import ValuePropositionFlywheel from './sections/ValuePropositionFlywheel';
import InSilicoWorkflowSection from './sections/InSilicoWorkflowSection';
import ObservedOutcomesSection from './sections/ObservedOutcomesSection';
import InSilicoOverviewSection from './sections/InSilicoOverviewSection';

interface DesciStyleDoctrineInsightsProps {
  content: CoPilotDetailContent;
  className?: string;
}


const DesciStyleDoctrineInsights: React.FC<DesciStyleDoctrineInsightsProps> = ({ content, className = '' }) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Strategic Doctrine" 
          subtitle="Operational doctrine with KPIs, tactical strengths, and an end-to-end in-silico workflow." 
        />

        {/* In-Silico Overview */}
        <InSilicoOverviewSection content={content} className="mb-16" />

        {/* Observed Outcomes with Timeline */}
        {content.observedOutcomes && content.observedOutcomes.length > 0 && (
          <ObservedOutcomesSection observedOutcomes={content.observedOutcomes} />
        )}

        {/* Tactical Capability Matrix */}
        <TacticalCapabilityMatrix keyCapabilities={content.keyCapabilities} />

        {/* Value Proposition Flywheel */}
        {content.valuePropositionSections && (
          <ValuePropositionFlywheel valuePropositionSections={content.valuePropositionSections} />
        )}

        {/* In-Silico Workflow if present */}
        {content.inSilicoWorkflow && (
          <div className="mt-16">
            <InSilicoWorkflowSection workflow={content.inSilicoWorkflow} />
          </div>
        )}

        <StrategicConclusion conclusion={content.conclusion} />
      </div>
    </section>
  );
};

export default DesciStyleDoctrineInsights;
