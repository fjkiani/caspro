'use client';

import React from 'react';
import { JourneyStep } from '@/data/capability-journeys';
import VisualContainer from './VisualContainer';
import DataFlow from './DataFlow';
import InfoCard from './InfoCard';
import { 
  Dna, Cpu, FileText, GitBranch, Database, 
  Stethoscope, Pill, Beaker, Layers, 
  Activity, BarChart3, AlertTriangle, CheckCircle 
} from 'lucide-react';

interface StepVisualizationProps {
  step: JourneyStep;
  variant: 'old' | 'new';
}

const StepVisualization: React.FC<StepVisualizationProps> = ({ step, variant }) => {
  const isOldWay = variant === 'old';
  
  // Determine visualization type based on step content
  const getVisualizationType = () => {
    const title = step.title.toLowerCase();
    const description = step.description.toLowerCase();
    
    if (title.includes('genetic') || title.includes('testing')) {
      return 'genetic';
    } else if (title.includes('clinical') || title.includes('confusion')) {
      return 'clinical';
    } else if (title.includes('trial') || title.includes('error')) {
      return 'trial';
    } else if (title.includes('resistance') || title.includes('outcome')) {
      return 'resistance';
    }
    return 'default';
  };
  
  const getDataFlowType = () => {
    const type = getVisualizationType();
    switch (type) {
      case 'genetic':
        return isOldWay ? 'confused' : 'connected';
      case 'clinical':
        return 'connected';
      case 'trial':
        return 'timeline';
      case 'resistance':
        return 'chart';
      default:
        return 'confused';
    }
  };
  
  const getInfoCardData = () => {
    if (isOldWay && step.problems && step.problems.length > 0) {
      return {
        title: step.problems[0],
        subtitle: step.problems.length > 1 ? step.problems[1] : ''
      };
    } else if (!isOldWay && step.solutions && step.solutions.length > 0) {
      return {
        title: step.solutions[0],
        subtitle: step.solutions.length > 1 ? step.solutions[1] : ''
      };
    }
    return {
      title: step.description,
      subtitle: ''
    };
  };
  
  const renderCustomVisual = () => {
    const type = getVisualizationType();
    
    // Special handling for new way genetic testing (S/P/E fusion)
    if (!isOldWay && type === 'genetic') {
      return (
        <div className="space-y-3">
          <div className="flex justify-center space-x-3">
            <div className="w-8 h-8 bg-green-200 rounded flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-600" />
            </div>
            <div className="w-8 h-8 bg-green-200 rounded flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-green-600" />
            </div>
            <div className="w-8 h-8 bg-green-200 rounded flex items-center justify-center">
              <Database className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="h-2 bg-green-200 rounded w-full mx-auto"></div>
          <div className="h-2 bg-green-200 rounded w-5/6 mx-auto"></div>
          <div className="h-2 bg-green-200 rounded w-4/5 mx-auto"></div>
        </div>
      );
    }
    
    // Special handling for new way trial (1M token context)
    if (!isOldWay && type === 'trial') {
      return (
        <div className="space-y-3">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="w-6 h-6 bg-green-200 rounded flex items-center justify-center">
                <Database className="w-3 h-3 text-green-600" />
              </div>
            ))}
          </div>
          <div className="h-2 bg-green-200 rounded w-full mx-auto"></div>
          <div className="h-2 bg-green-200 rounded w-5/6 mx-auto"></div>
        </div>
      );
    }
    
    // Default data flow for other cases
    return (
      <DataFlow 
        variant={variant} 
        type={getDataFlowType()}
        data={type === 'clinical' ? { 
          leftIcon: <Pill className="w-8 h-8" />, 
          rightIcon: <Dna className="w-8 h-8" /> 
        } : undefined}
      />
    );
  };
  
  const infoCardData = getInfoCardData();
  
  return (
    <VisualContainer
      title={step.title}
      description={step.description}
      icon={step.icon}
      variant={variant}
    >
      {renderCustomVisual()}
      <InfoCard
        variant={variant}
        title={infoCardData.title}
        subtitle={infoCardData.subtitle}
      />
    </VisualContainer>
  );
};

export default StepVisualization;
