import React from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface ProblemMetric {
  label: string;
  value: string;
  subtitle: string;
  color?: string;
}

interface IndustryProblemShowcaseProps {
  title: string;
  description: string;
  metrics: ProblemMetric[];
  problemIcon?: string;
  className?: string;
}

const IndustryProblemShowcase: React.FC<IndustryProblemShowcaseProps> = ({
  title,
  description,
  metrics,
  problemIcon = '⚠️',
  className = ''
}) => {
  const { getTextSize } = useAccessibility();

  return (
    <div className={`bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/50 rounded-xl p-8 ${className}`}>
      {/* Problem Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-900/30 border border-red-700/50 rounded-full">
          <span className="text-2xl">{problemIcon}</span>
          <span className="text-red-300 font-medium">Industry Crisis</span>
        </div>
        
        <h2 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
          {title}
        </h2>
        
        <p className={`text-slate-300 max-w-3xl mx-auto leading-relaxed ${getTextSize('text-lg')}`}>
          {description}
        </p>
      </div>

      {/* Problem Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-6 bg-red-900/20 border border-red-700/30 rounded-xl">
            <div className={`font-bold ${metric.color || 'text-red-400'} ${getTextSize('text-3xl')} mb-2`}>
              {metric.value}
            </div>
            <div className={`text-red-200 font-medium ${getTextSize('text-sm')} mb-1`}>
              {metric.label}
            </div>
            <div className={`text-red-300 ${getTextSize('text-xs')}`}>
              {metric.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Problem Impact Statement */}
      <div className="mt-8 p-6 bg-red-900/30 border border-red-700/50 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💔</span>
          <h3 className={`font-bold text-red-200 ${getTextSize('text-lg')}`}>
            The Cost of Inaction
          </h3>
        </div>
        <p className={`text-red-300 leading-relaxed ${getTextSize('text-base')}`}>
          Every day without discriminative AI costs the industry millions in failed targets, 
          wasted resources, and delayed therapies. Traditional approaches can't keep pace 
          with the complexity of modern therapeutic development.
        </p>
      </div>
    </div>
  );
};

export default IndustryProblemShowcase; 