import React from 'react';
import type { PathwayData } from '../../../types/slides';

interface PathwayContentProps {
  data: PathwayData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const PathwayContent: React.FC<PathwayContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-6xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getStepStatusColor = (status?: string) => {
    switch (status) {
      case 'highlight':
        return 'border-blue-500 bg-blue-50 text-blue-900';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900';
      case 'danger':
        return 'border-red-500 bg-red-50 text-red-900';
      default:
        return 'border-gray-300 bg-white text-gray-900';
    }
  };

  const getStepAnimation = (animation?: string) => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'bounce':
        return 'animate-bounce';
      default:
        return '';
    }
  };

  const renderConnector = (index: number) => {
    if (index === data.steps.length - 1) return null;
    
    return (
      <div className="flex items-center justify-center my-4">
        <div className="text-4xl text-gray-400 animate-pulse">
          ⚡
        </div>
      </div>
    );
  };

  return (
    <div className={getContainerClass()}>
      <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
        {data.steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Step Node */}
            <div className={`
              relative w-32 h-32 rounded-full flex items-center justify-center 
              shadow-2xl transform transition-transform hover:scale-110 border-4
              ${getStepStatusColor(step.status)} ${getStepAnimation(step.animation)}
            `}>
              {step.status === 'danger' && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs">⚠️</span>
                </div>
              )}
              {step.status === 'highlight' && (
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              )}
              
              <div className="text-center z-10">
                {step.icon && <div className="text-2xl mb-1">{step.icon}</div>}
                <span className="text-sm font-bold leading-tight">{step.title}</span>
              </div>
            </div>

            {/* Step Description */}
            <div className={`
              mt-4 px-4 py-2 rounded-lg border text-center max-w-xs
              ${getStepStatusColor(step.status)}
            `}>
              <p className="text-sm font-semibold">{step.description}</p>
            </div>

            {/* Connector */}
            {renderConnector(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathwayContent; 