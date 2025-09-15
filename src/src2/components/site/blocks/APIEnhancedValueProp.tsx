import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface APIEndpoint {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  keyCapability: string;
}

interface ComparisonItem {
  label: string;
  cost: string;
}

interface ImpactMetric {
  label: string;
  before: string;
  after: string;
}

interface APIEnhancedValuePropProps {
  title: string;
  description: string;
  apiEndpoints: APIEndpoint[];
  comparison: {
    traditional: ComparisonItem[];
    oracle: ComparisonItem[];
  };
  impact: ImpactMetric[];
  demoComponent?: React.ReactNode;
  className?: string;
}

const APIEnhancedValueProp: React.FC<APIEnhancedValuePropProps> = ({
  title,
  description,
  apiEndpoints,
  comparison,
  impact,
  demoComponent,
  className = ''
}) => {
  const { getTextSize } = useAccessibility();
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500/50' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500/50' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500/50' },
      red: { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500/50' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500/50' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500/50' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Value Prop Header */}
      <div className="space-y-4">
        <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
          {title}
        </h3>
        <p className={`text-slate-300 leading-relaxed ${getTextSize('text-lg')}`}>
          {description}
        </p>
      </div>

      {/* API Endpoints Showcase */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
        <h4 className={`font-bold text-white mb-4 ${getTextSize('text-lg')}`}>
          🎯 Powered by Discriminative AI Endpoints
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {apiEndpoints.map((endpoint) => {
            const colors = getColorClasses(endpoint.color);
            const isSelected = selectedAPI === endpoint.id;
            
            return (
              <div
                key={endpoint.id}
                onClick={() => setSelectedAPI(isSelected ? null : endpoint.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? `${colors.border} bg-slate-700/50` 
                    : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{endpoint.icon}</span>
                  <div className="flex-1">
                    <div className={`font-semibold ${colors.text} ${getTextSize('text-sm')}`}>
                      {endpoint.name}
                    </div>
                    <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                      /{endpoint.id}
                    </div>
                  </div>
                </div>
                
                <p className={`text-slate-300 ${getTextSize('text-xs')} mb-2`}>
                  {endpoint.description}
                </p>
                
                <div className={`${colors.text} font-semibold ${getTextSize('text-xs')}`}>
                  💡 {endpoint.keyCapability}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected API Details */}
        {selectedAPI && (
          <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
            {(() => {
              const endpoint = apiEndpoints.find(e => e.id === selectedAPI);
              if (!endpoint) return null;
              const colors = getColorClasses(endpoint.color);
              
              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{endpoint.icon}</span>
                    <div>
                      <h5 className={`font-bold ${colors.text} ${getTextSize('text-base')}`}>
                        {endpoint.name}
                      </h5>
                      <div className={`text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                        POST /api/v1/{endpoint.id}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-3 bg-slate-800 rounded border-l-4 ${colors.border}`}>
                    <div className={`${colors.text} font-semibold ${getTextSize('text-sm')} mb-1`}>
                      Key Capability:
                    </div>
                    <div className={`text-slate-300 ${getTextSize('text-sm')}`}>
                      {endpoint.keyCapability}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Traditional vs AI-Powered Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traditional Approach */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h4 className={`font-semibold text-white mb-4 ${getTextSize('text-lg')}`}>
            ❌ Traditional Approach
          </h4>
          <div className="space-y-3">
            {comparison.traditional.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-red-900/30 border border-red-700/50 rounded">
                <span className={`text-red-200 ${getTextSize('text-sm')}`}>{item.label}</span>
                <span className={`text-red-300 font-mono font-bold ${getTextSize('text-sm')}`}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Powered Approach */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h4 className={`font-semibold text-white mb-4 ${getTextSize('text-lg')}`}>
            ✅ Discriminative AI Approach
          </h4>
          <div className="space-y-3">
            {comparison.oracle.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-green-900/30 border border-green-700/50 rounded">
                <span className={`text-green-200 ${getTextSize('text-sm')}`}>{item.label}</span>
                <span className={`text-green-300 font-mono font-bold ${getTextSize('text-sm')}`}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Component */}
      {demoComponent && (
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
          <h4 className={`font-bold text-white mb-4 ${getTextSize('text-lg')}`}>
            🔬 Live Discriminative AI Demo
          </h4>
          {demoComponent}
        </div>
      )}

      {/* Business Impact */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h4 className={`font-semibold text-white mb-4 ${getTextSize('text-lg')}`}>
          📈 Quantified Business Impact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impact.map((metric, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-green-900/20 border border-green-700/30 rounded">
              <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{metric.label}:</span>
              <span className={`text-green-400 font-bold ${getTextSize('text-sm')}`}>
                {metric.before} → {metric.after}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIEnhancedValueProp; 