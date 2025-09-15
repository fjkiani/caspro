import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAIContent } from '../../../data/discriminativeAIContent';

interface DiscriminativeAIShowcaseProps {
  selectedEndpoint?: string;
  showUseCases?: boolean;
  interactive?: boolean;
}

const DiscriminativeAIShowcase: React.FC<DiscriminativeAIShowcaseProps> = ({
  selectedEndpoint,
  showUseCases = true,
  interactive = true
}) => {
  const { getTextSize } = useAccessibility();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [activeUseCase, setActiveUseCase] = useState<string>('hallmarksOfCancer');

  const endpoints = discriminativeAIContent.endpoints;

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500' },
      red: { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const toggleCardExpansion = (endpointKey: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(endpointKey)) {
      newExpanded.delete(endpointKey);
    } else {
      newExpanded.add(endpointKey);
    }
    setExpandedCards(newExpanded);
  };

  const getTopMetrics = (endpoint: any) => {
    const metrics = Object.entries(endpoint.metrics).slice(0, 2);
    return metrics.map(([key, metric]: [string, any]) => ({
      label: metric?.description || key,
      value: metric?.auroc 
        ? (metric.auroc * 100).toFixed(1) + '%'
        : metric?.correlation
        ? (metric.correlation * 100).toFixed(1) + '%'
        : metric?.accuracy
        ? (metric.accuracy * 100).toFixed(1) + '%'
        : metric?.aurocRange || 'N/A'
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {Object.entries(endpoints).map(([key, endpoint]) => {
        const colors = getColorClasses(endpoint.color);
        const isExpanded = expandedCards.has(key);
        const topMetrics = getTopMetrics(endpoint);
        
        return (
          <div key={key} className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
            {/* Card Header - Similar to Multi-Modal style */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-2xl`}>
                  {endpoint.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                    {endpoint.name}
                  </h3>
                  <p className={`text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                    /{endpoint.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleCardExpansion(key)}
                className={`px-3 py-2 rounded-lg border ${colors.border} border-opacity-50 hover:border-opacity-100 transition-all duration-200 ${getTextSize('text-sm')}`}
              >
                <span className={`${colors.text}`}>
                  {isExpanded ? '▼ Less' : '▶ More'}
                </span>
              </button>
            </div>

            {/* Description - Always visible */}
            <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-base')}`}>
              {endpoint.description}
            </p>

            {/* Top Performance Metrics - Always visible */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {topMetrics.map((metric, index) => (
                <div key={index} className="text-center bg-slate-700/30 rounded-lg p-3">
                  <div className={`font-bold ${colors.text} ${getTextSize('text-lg')}`}>
                    {metric.value}
                  </div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded Details - Only when expanded */}
            {isExpanded && (
              <div className="mt-6 pt-6 border-t border-slate-600 space-y-6">
                {/* API Outputs - Reuse existing badge style */}
                <div>
                  <h4 className={`font-semibold ${colors.text} mb-3 ${getTextSize('text-lg')}`}>
                    API Outputs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {endpoint.outputs.map((output: string, index: number) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 bg-slate-700 border ${colors.border} border-opacity-50 rounded-full font-mono ${getTextSize('text-xs')} text-slate-300`}
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Use Cases & Applications - Reuse existing selector pattern */}
                {showUseCases && endpoint.useCases && (
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-4 ${getTextSize('text-lg')}`}>
                      Use Cases & Applications
                    </h4>
                    
                    {/* Use Case Selector - Reuse existing button style */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.keys(endpoint.useCases).map((useCaseKey) => (
                        <button
                          key={useCaseKey}
                          onClick={() => setActiveUseCase(useCaseKey)}
                          className={`px-3 py-2 rounded-lg border transition-all duration-200 ${getTextSize('text-sm')} ${
                            activeUseCase === useCaseKey
                              ? `${colors.bg} border-transparent text-white`
                              : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {useCaseKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </button>
                      ))}
                    </div>

                    {/* Active Use Case Applications - Reuse existing list style */}
                    {activeUseCase && endpoint.useCases[activeUseCase as keyof typeof endpoint.useCases] && (
                      <div className="bg-slate-700/20 border border-slate-600 rounded-lg p-4">
                        <div className="space-y-2">
                          {(endpoint.useCases[activeUseCase as keyof typeof endpoint.useCases] as readonly string[]).slice(0, 4).map((application, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className={`${colors.text} mt-1 text-sm`}>•</span>
                              <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{application}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Applications (for endpoints without use cases) */}
                {showUseCases && 'applications' in endpoint && (
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-3 ${getTextSize('text-lg')}`}>
                      Key Applications
                    </h4>
                    <div className="bg-slate-700/20 border border-slate-600 rounded-lg p-4">
                      <div className="space-y-2">
                        {(endpoint.applications as readonly string[]).slice(0, 4).map((application, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className={`${colors.text} mt-1 text-sm`}>•</span>
                            <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{application}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DiscriminativeAIShowcase; 