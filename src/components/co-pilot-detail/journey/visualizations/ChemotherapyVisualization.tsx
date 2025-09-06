'use client';

import React from 'react';
import { Brain } from 'lucide-react';
import { chemotherapyJourney } from '@/data/capability-journeys/chemotherapy';
import StepVisualization from './shared/StepVisualization';

interface ChemotherapyVisualizationProps {
  stepId: string;
  variant: 'old' | 'new';
}

const ChemotherapyVisualization: React.FC<ChemotherapyVisualizationProps> = ({ stepId, variant }) => {
  const stepNumber = parseInt(stepId.split('-')[1]) - 1; // Convert to 0-based index
  
  const getStepData = () => {
    if (variant === 'old') {
      return chemotherapyJourney.oldWaySteps[stepNumber];
    } else {
      return chemotherapyJourney.newWaySteps[stepNumber];
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

export default ChemotherapyVisualization;
