'use client';

import React from 'react';
import { EnhancedCapabilityJourney } from './journey';
import { allCapabilityJourneys, CapabilityJourneyData } from '@/data/capability-journeys';

interface CapabilityJourneySectionProps {
  capabilityType: string; // Now just a string slug
  customJourney?: CapabilityJourneyData;
}

export const CapabilityJourneySection: React.FC<CapabilityJourneySectionProps> = ({
  capabilityType,
  customJourney
}) => {
  const journeyData = customJourney || allCapabilityJourneys[capabilityType];

  if (!journeyData) {
    console.warn(`No journey data found for capability type: ${capabilityType}`);
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-slate-800">Journey Data Not Found</h3>
        <p className="text-slate-600">The "War Stories" for this capability are still being compiled.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <EnhancedCapabilityJourney journeyData={journeyData} />
    </div>
  );
};

export default CapabilityJourneySection;
