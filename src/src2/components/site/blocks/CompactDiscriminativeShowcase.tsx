import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAIContent } from '../../../data/discriminativeAIContent';
import { discriminativeAISampleData } from '../../../data/discriminativeAISampleData';
import CrisprEfficacyCard from './CrisprEfficacyCard';
import VariantImpactLandscape from './VariantImpactLandscape';
import EssentialityChart from './EssentialityChart';
import ProteinDeltaCard from './ProteinDeltaCard';
import AccessibilityTrack from './AccessibilityTrack';

interface CompactDiscriminativeShowcaseProps {
  onEndpointClick?: (endpointKey: string) => void;
}

const CompactDiscriminativeShowcase: React.FC<CompactDiscriminativeShowcaseProps> = ({
  onEndpointClick
}) => {
  const { getTextSize } = useAccessibility();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  const renderEndpointComponent = (endpointKey: string) => {
    switch (endpointKey) {
      case 'variantImpact':
        return (
          <VariantImpactLandscape
            locus="chr17:43044000-43052000"
            windowSize={8000}
            variants={[...discriminativeAISampleData.variantImpactLandscape.brca1Region.variants]}
            regions={[...discriminativeAISampleData.variantImpactLandscape.brca1Region.regions]}
            metrics={discriminativeAISampleData.variantImpactLandscape.brca1Region.metrics}
          />
        );
      case 'crisprEfficacy':
        return (
          <CrisprEfficacyCard
            targetGene="KRAS"
            targetLocus="chr12:25245350-25245370"
            guides={[...discriminativeAISampleData.crisprEfficacy.krasExample.guides]}
            metrics={discriminativeAISampleData.crisprEfficacy.krasExample.metrics}
          />
        );
      case 'geneEssentiality':
        return (
          <EssentialityChart 
            series={[
              { context: { cellLine: 'KRAS-driven NSCLC', mutations: ['KRAS-G12C'] }, score: 0.94 },
              { context: { cellLine: 'EGFR-driven NSCLC', mutations: ['EGFR-L858R'] }, score: 0.89 },
              { context: { cellLine: 'Normal lung epithelium', mutations: [] }, score: 0.12 },
              { context: { cellLine: 'Normal hepatocytes', mutations: [] }, score: 0.08 }
            ]}
          />
        );
      case 'proteinFunctionality':
        return (
          <ProteinDeltaCard
            function={-0.89}
            stability={-0.45}
            foldingImpact={0.76}
            notes="High-impact variant (Δ likelihood: -2.34) correlates with severe protein dysfunction"
          />
        );
      case 'chromatinAccessibility':
        return (
          <AccessibilityTrack
            tracks={[{
              context: 'CRISPR target accessibility analysis',
              points: [
                { pos: 15, score: 0.89 },
                { pos: 30, score: 0.95 },
                { pos: 45, score: 0.23 },
                { pos: 60, score: 0.78 },
                { pos: 85, score: 0.92 }
              ]
            }]}
          />
        );
      default:
        return null;
    }
  };

  const handleCardClick = (endpointKey: string) => {
    if (expandedCard === endpointKey) {
      setExpandedCard(null);
    } else {
      setExpandedCard(endpointKey);
    }
    if (onEndpointClick) {
      onEndpointClick(endpointKey);
    }
  };

  const getTopMetrics = (endpoint: any) => {
    const metrics = Object.entries(endpoint.metrics).slice(0, 2);
    return metrics.map(([key, metric]) => ({
      label: typeof metric === 'object' ? metric.description : key,
      value: typeof metric === 'object' && 'auroc' in metric 
        ? (metric.auroc * 100).toFixed(1) + '%'
        : typeof metric === 'object' && 'correlation' in metric
        ? (metric.correlation * 100).toFixed(1) + '%'
        : typeof metric === 'object' && 'accuracy' in metric
        ? (metric.accuracy * 100).toFixed(1) + '%'
        : typeof metric === 'object' && 'aurocRange' in metric
        ? metric.aurocRange
        : 'N/A'
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {Object.entries(endpoints).map(([key, endpoint]) => {
        const colors = getColorClasses(endpoint.color);
        const isExpanded = expandedCard === key;
        const topMetrics = getTopMetrics(endpoint);
        
        return (
          <div key={key} className="space-y-8">
            <div 
              className={`bg-slate-800/50 border border-slate-600 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-slate-500 ${
                isExpanded ? 'ring-2 ring-opacity-50 ' + colors.border : ''
              }`}
              onClick={() => handleCardClick(key)}
            >
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
                <div className="flex items-center gap-2">
                  <span className={`text-slate-400 ${getTextSize('text-sm')}`}>
                    {isExpanded ? 'Click to collapse' : 'Click for details'}
                  </span>
                  <span className={`${colors.text} ${getTextSize('text-lg')}`}>
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </div>

              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-base')}`}>
                {endpoint.description}
              </p>

              {/* Top Performance Metrics */}
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

              {/* Component Preview */}
              <div className="mb-4">
                {renderEndpointComponent(key)}
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-slate-600 space-y-4">
                  {/* API Outputs */}
                  <div>
                    <h4 className={`font-semibold ${colors.text} mb-3 ${getTextSize('text-base')}`}>
                      API Outputs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.outputs.map((output, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 bg-slate-700 border ${colors.border} border-opacity-50 rounded-full font-mono ${getTextSize('text-xs')} text-slate-300`}
                        >
                          {output}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Applications */}
                  {'applications' in endpoint && (
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-3 ${getTextSize('text-base')}`}>
                        Key Applications
                      </h4>
                      <div className="space-y-2">
                        {[...(endpoint.applications as readonly string[])].slice(0, 3).map((application, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className={`${colors.text} mt-1 text-sm`}>•</span>
                            <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{application}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEndpointClick) onEndpointClick(key);
                      }}
                      className={`w-full px-4 py-3 ${colors.bg} hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200 ${getTextSize('text-sm')}`}
                    >
                      Explore Full API Details & Use Cases →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompactDiscriminativeShowcase; 