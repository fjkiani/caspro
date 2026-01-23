'use client';

import React from 'react';
import CapabilityJourney from '@/components/co-pilot-detail/CapabilityJourney';
import { CapabilityJourneyData } from '@/data/capability-journeys';

interface EnhancedCapabilityJourneyProps {
  journeyData: CapabilityJourneyData;
}

const EnhancedCapabilityJourney: React.FC<EnhancedCapabilityJourneyProps> = ({ journeyData }) => {
  return (
    <div className="bg-slate-900 text-white py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <CapabilityJourney
          title={journeyData.title}
          subtitle={journeyData.subtitle}
          oldWaySteps={journeyData.oldWaySteps}
          newWaySteps={journeyData.newWaySteps}
        />
      </div>
    </div>
  );
};

export default EnhancedCapabilityJourney;
