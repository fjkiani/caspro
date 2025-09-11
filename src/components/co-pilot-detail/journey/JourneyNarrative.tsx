'use client';

import React from 'react';
import JourneyStepCard from './JourneyStepCard';
import { CapabilityJourneyData } from '@/data/capability-journeys';

interface JourneyNarrativeProps {
  journeyData: CapabilityJourneyData;
  onStepInView: (id: string | null) => void;
}

const JourneyNarrative: React.FC<JourneyNarrativeProps> = ({ journeyData, onStepInView }) => {
  // Create alternating old/new steps (problems on left, solutions on right)
  const narrativeSteps: Array<{
    id: string;
    title: string;
    description: string;
    icon: any;
    variant: 'old' | 'new';
    problems?: string[];
    solutions?: string[];
  }> = [];
  
  // Add old way steps first (problems on left)
  journeyData.oldWaySteps.forEach((step, index) => {
    narrativeSteps.push({
      ...step,
      id: `old-${index + 1}`,
      variant: 'old' as const
    });
  });
  
  // Add new way steps second (solutions on right)
  journeyData.newWaySteps.forEach((step, index) => {
    narrativeSteps.push({
      ...step,
      id: `new-${index + 1}`,
      variant: 'new' as const
    });
  });

  return (
    <div className="w-full">
      {narrativeSteps.map((step, index) => (
        <JourneyStepCard 
          key={step.id} 
          step={step} 
          onInView={onStepInView} 
          isFirst={index === 0} 
        />
      ))}
    </div>
  );
};

export default JourneyNarrative;
