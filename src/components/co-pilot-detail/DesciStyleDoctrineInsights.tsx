'use client';

import React from 'react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { SectionHeader, TacticalCapabilityMatrix, ValuePropositionFlywheel, StrategicConclusion } from './sections';

interface DesciStyleDoctrineInsightsProps {
  content: CoPilotDetailContent;
  className?: string;
}

const DesciStyleDoctrineInsights: React.FC<DesciStyleDoctrineInsightsProps> = ({ content, className = '' }) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Strategic Doctrine Header */}
        <SectionHeader 
          title="Strategic Doctrine" 
          subtitle="Our operational approach delivers multi-stage precision with cascading strategic advantages. Each capability builds upon the last, creating overwhelming competitive superiority." 
        />

        {/* Tactical Capability Matrix */}
        <TacticalCapabilityMatrix keyCapabilities={content.keyCapabilities} />

        {/* Value Proposition Flywheel */}
        <ValuePropositionFlywheel valuePropositionSections={content.valuePropositionSections} />

        {/* Strategic Conclusion */}
        <StrategicConclusion conclusion={content.conclusion} />
      </div>
    </section>
  );
};

export default DesciStyleDoctrineInsights;
