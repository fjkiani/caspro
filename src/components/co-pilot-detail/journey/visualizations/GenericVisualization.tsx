'use client';

import React from 'react';
import { Brain } from 'lucide-react';
import { CapabilityJourneyData } from '@/data/capability-journeys';
import StepVisualization from './shared/StepVisualization';

interface GenericVisualizationProps {
  journeyData: CapabilityJourneyData;
  stepId: string;
  variant: 'old' | 'new';
}

const GenericVisualization: React.FC<GenericVisualizationProps> = ({ journeyData, stepId, variant }) => {
  const stepNumber = parseInt(stepId.split('-')[1]) - 1; // Convert to 0-based index
  
  const getStepData = () => {
    if (variant === 'old') {
      return journeyData.oldWaySteps[stepNumber];
    } else {
      return journeyData.newWaySteps[stepNumber];
    }
  };
  
  const stepData = getStepData();
  
  if (!stepData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading visualization...</p>
        </div>
      </div>
    );
  }
  
  return <StepVisualization step={stepData} variant={variant} />;
};

export default GenericVisualization;
