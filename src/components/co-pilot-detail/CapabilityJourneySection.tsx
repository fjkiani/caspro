'use client';

import React from 'react';
import { EnhancedCapabilityJourney } from './journey';
import { capabilityJourneys, CapabilityJourneyData, CapabilityType } from '@/data/capability-journeys';

interface CapabilityJourneySectionProps {
  capabilityType: CapabilityType;
  customJourney?: CapabilityJourneyData;
}

export const CapabilityJourneySection: React.FC<CapabilityJourneySectionProps> = ({
  capabilityType,
  customJourney
}) => {
  const journeyData = customJourney || capabilityJourneys[capabilityType];

  if (!journeyData) {
    console.warn(`No journey data found for capability type: ${capabilityType}`);
    return null;
  }

  return (
    <div className="mb-12">
      <EnhancedCapabilityJourney journeyData={journeyData} />
    </div>
  );
};

export default CapabilityJourneySection;
