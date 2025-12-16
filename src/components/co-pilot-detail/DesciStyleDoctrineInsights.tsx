'use client';

import React, { useMemo } from 'react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { SectionHeader, TacticalCapabilityMatrix, StrategicConclusion } from './sections';
import ValuePropositionFlywheel from './sections/ValuePropositionFlywheel';
import InSilicoWorkflowSection from './sections/InSilicoWorkflowSection';
import ObservedOutcomesSection from './sections/ObservedOutcomesSection';
import InSilicoOverviewSection from './sections/InSilicoOverviewSection';
import AdvancedFeaturesSection from './sections/AdvancedFeaturesSection';
import IntegratedCareSection from './sections/IntegratedCareSection';
import MobileCollapsibleSection from '../products/MobileCollapsibleSection';

interface DesciStyleDoctrineInsightsProps {
  content: CoPilotDetailContent;
  className?: string;
}


const DesciStyleDoctrineInsights: React.FC<DesciStyleDoctrineInsightsProps> = ({ content, className = '' }) => {
  // Filter capabilities by priority
  const { primaryCapabilities, advancedCapabilities } = useMemo(() => {
    const primary = content.keyCapabilities.filter(
      cap => !cap.priority || cap.priority === 'primary'
    );
    const advanced = content.keyCapabilities.filter(
      cap => cap.priority === 'advanced'
    );
    return { primaryCapabilities: primary, advancedCapabilities: advanced };
  }, [content.keyCapabilities]);

  return (
    <section className={`py-8 md:py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
  

        {/* In-Silico Overview - Collapsible on Mobile */}
        <MobileCollapsibleSection id="overview" title="Product Overview" defaultExpanded={true}>
          <InSilicoOverviewSection content={content} className="!mb-0" />
        </MobileCollapsibleSection>

        {/* Observed Outcomes - Collapsible on Mobile */}
        {content.observedOutcomes && content.observedOutcomes.length > 0 && (
          <MobileCollapsibleSection 
            id="outcomes" 
            title="Outcomes" 
            badge={content.observedOutcomes.length}
            defaultExpanded={false}
          >
            <ObservedOutcomesSection observedOutcomes={content.observedOutcomes} />
          </MobileCollapsibleSection>
        )}

        {/* Primary Capabilities - Collapsible on Mobile */}
        {primaryCapabilities.length > 0 && (
          <MobileCollapsibleSection 
            id="capabilities" 
            title="Core Capabilities" 
            badge={primaryCapabilities.length}
            defaultExpanded={true}
          >
            <TacticalCapabilityMatrix keyCapabilities={primaryCapabilities} />
          </MobileCollapsibleSection>
        )}

        {/* Advanced Features - Collapsible Section */}
        {advancedCapabilities.length > 0 && (
          <MobileCollapsibleSection 
            id="advanced" 
            title="Advanced Features" 
            badge={advancedCapabilities.length}
            defaultExpanded={false}
          >
            <AdvancedFeaturesSection capabilities={advancedCapabilities} />
          </MobileCollapsibleSection>
        )}

        {/* Integrated Care Plan - Prominent Section - Always Visible */}
        {content.integratedCare && (
          <div className="mb-8 md:mb-16">
            <IntegratedCareSection capability={content.integratedCare} />
          </div>
        )}

        {/* Value Proposition Flywheel - Collapsible on Mobile */}
        {content.valuePropositionSections && (
          <MobileCollapsibleSection 
            id="value-prop" 
            title="Value Propositions" 
            defaultExpanded={false}
          >
            <ValuePropositionFlywheel valuePropositionSections={content.valuePropositionSections} />
          </MobileCollapsibleSection>
        )}

        {/* In-Silico Workflow if present */}
        {content.inSilicoWorkflow && (
          <div className="mt-8 md:mt-16">
            <InSilicoWorkflowSection workflow={content.inSilicoWorkflow} />
          </div>
        )}

        <StrategicConclusion conclusion={content.conclusion} />
      </div>
    </section>
  );
};

export default DesciStyleDoctrineInsights;
