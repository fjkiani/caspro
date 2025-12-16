'use client';

import React from 'react';
import { useAccessibilityFallback } from '@/hooks/useAccessibilityFallback';

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
  const { getTextSize } = useAccessibilityFallback();

  return (
    <div className={`bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-8 ${className}`}>
      {/* Problem Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-100 border border-red-300 rounded-full">
          <span className="text-2xl">{problemIcon}</span>
          <span className="text-red-700 font-medium">Industry Crisis</span>
        </div>
        
        <h2 className={`font-bold text-slate-900 ${getTextSize('text-3xl')}`}>
          {title}
        </h2>
        
        <p className={`text-slate-600 max-w-3xl mx-auto leading-relaxed ${getTextSize('text-lg')}`}>
          {description}
        </p>
      </div>

      {/* Problem Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-6 bg-white border border-red-200 rounded-xl">
            <div className={`font-bold ${metric.color || 'text-red-600'} ${getTextSize('text-3xl')} mb-2`}>
              {metric.value}
            </div>
            <div className={`text-red-700 font-medium ${getTextSize('text-sm')} mb-1`}>
              {metric.label}
            </div>
            <div className={`text-red-600 ${getTextSize('text-xs')}`}>
              {metric.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Problem Impact Statement */}
      <div className="mt-8 p-6 bg-red-100 border border-red-300 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💔</span>
          <h3 className={`font-bold text-red-800 ${getTextSize('text-lg')}`}>
            The Cost of Inaction
          </h3>
        </div>
        <p className={`text-red-700 leading-relaxed ${getTextSize('text-base')}`}>
          Every day without discriminative AI costs the industry millions in failed targets, 
          wasted resources, and delayed therapies. Traditional approaches can't keep pace 
          with the complexity of modern therapeutic development.
        </p>
      </div>
    </div>
  );
};

export default IndustryProblemShowcase;

