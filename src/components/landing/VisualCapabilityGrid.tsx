'use client';

import React, { useState } from 'react';
import { useAccessibilityFallback } from '@/hooks/useAccessibilityFallback';

interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  metrics: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  keyFeatures: string[];
  demoComponent?: React.ReactNode;
}

interface VisualCapabilityGridProps {
  capabilities: Capability[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const VisualCapabilityGrid: React.FC<VisualCapabilityGridProps> = ({
  capabilities,
  title,
  subtitle,
  className = ''
}) => {
  const { getTextSize } = useAccessibilityFallback();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Force large text mode for better readability
  const getLargeTextSize = (baseSize: string) => {
    const sizeMap: { [key: string]: string } = {
      'text-xs': 'text-base',
      'text-sm': 'text-lg', 
      'text-base': 'text-xl',
      'text-lg': 'text-2xl',
      'text-xl': 'text-3xl',
      'text-2xl': 'text-4xl',
      'text-3xl': 'text-5xl',
      'text-4xl': 'text-6xl'
    };
    return sizeMap[baseSize] || baseSize;
  };

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Section Header */}
      {title && (
        <div className="text-center space-y-6">
          <h2 className={`font-bold text-slate-900 ${getLargeTextSize('text-4xl')}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-slate-600 max-w-4xl mx-auto leading-relaxed ${getLargeTextSize('text-lg')}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Capability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilities.map((capability) => {
          const isExpanded = expandedCard === capability.id;
          
          return (
            <div
              key={capability.id}
              className={`bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg ${
                isExpanded ? 'ring-2 ring-blue-500/30' : ''
              }`}
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{capability.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-slate-900 ${getLargeTextSize('text-xl')}`}>
                      {capability.title}
                    </h3>
                    <p className={`text-slate-600 ${getLargeTextSize('text-sm')}`}>
                      {capability.description}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  {capability.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className={`font-bold ${metric.color} ${getLargeTextSize('text-lg')}`}>
                        {metric.value}
                      </div>
                      <div className={`text-slate-600 ${getLargeTextSize('text-xs')}`}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE DEMO - MAIN VISUAL */}
              {capability.demoComponent && (
                <div className="px-6 pb-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    {capability.demoComponent}
                  </div>
                </div>
              )}

              {/* Key Features Preview */}
              <div className="px-6 pb-6 space-y-3">
                {capability.keyFeatures.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className={`text-slate-700 ${getLargeTextSize('text-sm')}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => toggleCard(capability.id)}
                  className={`w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${getLargeTextSize('text-base')}`}
                >
                  {isExpanded ? '▼ Show Less' : '🚀 Explore Capability'}
                </button>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 border-t border-slate-200 pt-6">
                  <h4 className={`font-semibold text-slate-900 ${getLargeTextSize('text-lg')}`}>
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {capability.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className={`text-slate-700 ${getLargeTextSize('text-sm')}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );    
        })}
      </div>
    </div>
  );
};

export default VisualCapabilityGrid;

