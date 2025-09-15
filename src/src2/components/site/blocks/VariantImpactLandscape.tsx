import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

interface VariantData {
  position: number;
  ref: string;
  alt: string;
  deltaLikelihood: number;
  pathogenicity: 'Pathogenic' | 'Benign' | 'VUS';
  confidence: number;
  consequence: string;
  gene?: string;
}

interface GenomicRegion {
  start: number;
  end: number;
  type: 'exon' | 'intron' | 'promoter' | 'enhancer' | 'intergenic';
  name?: string;
}

interface VariantImpactLandscapeProps {
  locus: string;
  variants: VariantData[];
  regions: GenomicRegion[];
  windowSize: number;
  metrics?: {
    totalVariants: number;
    pathogenicCount: number;
    vusResolved: number;
    avgConfidence: number;
  };
}

const VariantImpactLandscape: React.FC<VariantImpactLandscapeProps> = ({
  locus,
  variants,
  regions,
  windowSize,
  metrics
}) => {
  const { getTextSize } = useAccessibility();
  const [selectedVariant, setSelectedVariant] = useState<VariantData | null>(null);
  const [filterPathogenicity, setFilterPathogenicity] = useState<'all' | 'pathogenic' | 'vus' | 'benign'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getPathogenicityColor = (pathogenicity: string, confidence: number) => {
    const alpha = Math.max(0.3, confidence);
    switch (pathogenicity) {
      case 'Pathogenic': return `rgba(239, 68, 68, ${alpha})`; // red
      case 'Benign': return `rgba(34, 197, 94, ${alpha})`; // green
      case 'VUS': return `rgba(156, 163, 175, ${alpha})`; // gray
      default: return `rgba(156, 163, 175, ${alpha})`;
    }
  };

  const getRegionColor = (type: string) => {
    switch (type) {
      case 'exon': return 'bg-blue-600';
      case 'intron': return 'bg-slate-600';
      case 'promoter': return 'bg-green-600';
      case 'enhancer': return 'bg-yellow-600';
      case 'intergenic': return 'bg-gray-600';
      default: return 'bg-slate-600';
    }
  };

  const getDeltaLikelihoodIntensity = (delta: number) => {
    // More negative = more disruptive = higher intensity
    const intensity = Math.min(1, Math.abs(delta) / 3);
    return intensity;
  };

  // Calculate genomic window bounds
  const genomicStart = Math.min(...regions.map(r => r.start), ...variants.map(v => v.position));
  const genomicEnd = Math.max(...regions.map(r => r.end), ...variants.map(v => v.position));
  const actualWindowSize = genomicEnd - genomicStart;

  // Filter variants based on selected pathogenicity
  const filteredVariants = variants.filter(variant => {
    if (filterPathogenicity === 'all') return true;
    return variant.pathogenicity.toLowerCase() === filterPathogenicity;
  });

  // Interactive demo functions
  const handleVariantClick = (variant: VariantData) => {
    setSelectedVariant(variant);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold text-white ${getTextSize('text-xl')}`}>
              🗺️ Variant Impact Landscape
            </h3>
            <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
              {locus} • {actualWindowSize.toLocaleString()} bp window
            </p>
          </div>
          {metrics && (
            <div className="text-right">
              <div className={`font-bold text-blue-400 ${getTextSize('text-2xl')}`}>
                {((metrics.pathogenicCount / metrics.totalVariants) * 100).toFixed(1)}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                Pathogenic Rate
              </div>
            </div>
          )}
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-slate-300 font-medium ${getTextSize('text-sm')}`}>Filter:</span>
              <select
                value={filterPathogenicity}
                onChange={(e) => setFilterPathogenicity(e.target.value as any)}
                className="px-3 py-1 bg-slate-600 border border-slate-500 rounded text-slate-200 text-sm"
              >
                <option value="all">All Variants ({variants.length})</option>
                <option value="pathogenic">Pathogenic ({variants.filter(v => v.pathogenicity === 'Pathogenic').length})</option>
                <option value="vus">VUS ({variants.filter(v => v.pathogenicity === 'VUS').length})</option>
                <option value="benign">Benign ({variants.filter(v => v.pathogenicity === 'Benign').length})</option>
              </select>
            </div>
            <div className={`text-slate-400 ${getTextSize('text-sm')}`}>
              Showing {filteredVariants.length} of {variants.length} variants
            </div>
          </div>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors ${getTextSize('text-sm')}`}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              '🔬 Run Analysis'
            )}
          </button>
        </div>

        {/* Metrics Overview */}
        {metrics && (
          <div className="grid grid-cols-4 gap-4 p-4 bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <div className={`font-bold text-blue-400 ${getTextSize('text-lg')}`}>
                {filteredVariants.length.toLocaleString()}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Filtered Variants</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-red-400 ${getTextSize('text-lg')}`}>
                {filteredVariants.filter(v => v.pathogenicity === 'Pathogenic').length}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Pathogenic</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-yellow-400 ${getTextSize('text-lg')}`}>
                {filteredVariants.filter(v => v.pathogenicity === 'VUS').length}
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>VUS</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-cyan-400 ${getTextSize('text-lg')}`}>
                {filteredVariants.length > 0 ? (filteredVariants.reduce((sum, v) => sum + v.confidence, 0) / filteredVariants.length * 100).toFixed(1) : 0}%
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>Avg Confidence</div>
            </div>
          </div>
        )}

        {/* Genomic Regions Track */}
        <div className="space-y-2">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Genomic Regions
          </h4>
          <div className="relative h-8 bg-slate-700 rounded">
            {regions.map((region, index) => {
              const width = ((region.end - region.start) / actualWindowSize) * 100;
              const left = ((region.start - genomicStart) / actualWindowSize) * 100;
              return (
                <div
                  key={index}
                  className={`absolute h-full ${getRegionColor(region.type)} opacity-80 rounded`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${region.type}${region.name ? `: ${region.name}` : ''} (${region.start.toLocaleString()}-${region.end.toLocaleString()})`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Exon</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-slate-600 rounded"></div>
              <span>Intron</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>Promoter</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-600 rounded"></div>
              <span>Enhancer</span>
            </div>
          </div>
        </div>

        {/* Variant Impact Visualization */}
        <div className="space-y-2">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            Variant Impact Distribution
          </h4>
          <div className="relative h-32 bg-slate-700 rounded overflow-hidden">
            {filteredVariants.map((variant, index) => {
              const left = ((variant.position - genomicStart) / actualWindowSize) * 100;
              const height = getDeltaLikelihoodIntensity(variant.deltaLikelihood) * 100;
              const isSelected = selectedVariant?.position === variant.position;
              return (
                <div
                  key={index}
                  className={`absolute bottom-0 transition-all duration-200 cursor-pointer rounded-t ${
                    isSelected 
                      ? 'w-4 ring-2 ring-white ring-opacity-80' 
                      : 'w-2 hover:w-3'
                  }`}
                  style={{
                    left: `${left}%`,
                    height: `${Math.max(height, 10)}%`,
                    backgroundColor: getPathogenicityColor(variant.pathogenicity, variant.confidence)
                  }}
                  onClick={() => handleVariantClick(variant)}
                  title={`Click to analyze: ${variant.gene}:${variant.ref}${variant.position}${variant.alt}`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Low Impact</span>
            <span>High Impact</span>
          </div>
        </div>

        {/* Selected Variant Analysis */}
        {selectedVariant && (
          <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-bold text-white ${getTextSize('text-xl')}`}>
                🔬 Variant Analysis
              </h4>
              <button
                onClick={() => setSelectedVariant(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h5 className={`font-semibold text-blue-400 mb-2 ${getTextSize('text-base')}`}>Variant Details</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Position:</span>
                      <span className={`font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                        {selectedVariant.gene}:{selectedVariant.position.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Change:</span>
                      <span className={`font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                        {selectedVariant.ref} → {selectedVariant.alt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Consequence:</span>
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        {selectedVariant.consequence.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className={`font-semibold text-purple-400 mb-2 ${getTextSize('text-base')}`}>Oracle Prediction</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Pathogenicity:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedVariant.pathogenicity === 'Pathogenic' 
                          ? 'bg-red-900/30 border border-red-700/50 text-red-300'
                          : selectedVariant.pathogenicity === 'VUS'
                          ? 'bg-yellow-900/30 border border-yellow-700/50 text-yellow-300'
                          : 'bg-green-900/30 border border-green-700/50 text-green-300'
                      }`}>
                        {selectedVariant.pathogenicity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Δ Likelihood:</span>
                      <span className={`font-bold text-red-400 ${getTextSize('text-sm')}`}>
                        {selectedVariant.deltaLikelihood.toFixed(3)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Confidence:</span>
                      <span className={`font-bold text-orange-400 ${getTextSize('text-sm')}`}>
                        {(selectedVariant.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className={`font-semibold text-green-400 mb-2 ${getTextSize('text-base')}`}>Clinical Interpretation</h5>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <p className={`text-slate-300 ${getTextSize('text-sm')} leading-relaxed`}>
                      {selectedVariant.pathogenicity === 'Pathogenic' 
                        ? `This variant is predicted to be pathogenic with high confidence (${(selectedVariant.confidence * 100).toFixed(1)}%). The negative delta likelihood score (${selectedVariant.deltaLikelihood.toFixed(2)}) indicates significant functional disruption.`
                        : selectedVariant.pathogenicity === 'VUS'
                        ? `This variant of uncertain significance requires additional evidence for clinical interpretation. Oracle's analysis suggests moderate functional impact.`
                        : `This variant is predicted to be benign with minimal functional impact. The delta likelihood score indicates no significant disruption.`
                      }
                    </p>
                  </div>
                </div>
                
                <div>
                  <h5 className={`font-semibold text-yellow-400 mb-2 ${getTextSize('text-base')}`}>Recommended Actions</h5>
                  <div className="space-y-2">
                    {selectedVariant.pathogenicity === 'Pathogenic' && (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">•</span>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Consider genetic counseling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">•</span>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Evaluate family screening</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">•</span>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Review treatment options</span>
                        </div>
                      </>
                    )}
                    {selectedVariant.pathogenicity === 'VUS' && (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">•</span>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Collect additional evidence</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">•</span>
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Consider functional studies</span>
                        </div>
                      </>
                    )}
                    {selectedVariant.pathogenicity === 'Benign' && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">•</span>
                        <span className={`text-slate-300 ${getTextSize('text-sm')}`}>No further action required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Pathogenic Variants */}
        <div className="space-y-3">
          <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
            {filterPathogenicity === 'all' ? 'Top Pathogenic Variants' : `Filtered Variants (${filterPathogenicity})`}
          </h4>
          {filteredVariants
            .sort((a, b) => a.deltaLikelihood - b.deltaLikelihood)
            .slice(0, 5)
            .map((variant, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedVariant?.position === variant.position 
                    ? 'bg-blue-900/30 border border-blue-700/50' 
                    : 'bg-slate-700/30 hover:bg-slate-700/50'
                }`}
                onClick={() => handleVariantClick(variant)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-cyan-300 ${getTextSize('text-sm')}`}>
                       {variant.ref}&gt;{variant.alt}
                     </span>
                    <span className={`text-slate-400 ${getTextSize('text-xs')}`}>
                      {variant.gene && `${variant.gene} • `}pos: {variant.position.toLocaleString()}
                    </span>
                  </div>
                  <div className={`text-slate-400 ${getTextSize('text-xs')} mt-1`}>
                    {variant.consequence}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`font-bold text-red-400 ${getTextSize('text-sm')}`}>
                      {variant.deltaLikelihood.toFixed(2)}
                    </div>
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Δ Likelihood</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`font-bold text-orange-400 ${getTextSize('text-sm')}`}>
                      {(variant.confidence * 100).toFixed(1)}%
                    </div>
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Confidence</div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    variant.pathogenicity === 'Pathogenic' 
                      ? 'bg-red-900/30 border border-red-700/50 text-red-300'
                      : variant.pathogenicity === 'VUS'
                      ? 'bg-yellow-900/30 border border-yellow-700/50 text-yellow-300'
                      : 'bg-green-900/30 border border-green-700/50 text-green-300'
                  }`}>
                    {variant.pathogenicity}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Performance Indicators */}
        <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🎯</span>
            <span className={`text-blue-300 font-medium ${getTextSize('text-sm')}`}>
              Zero-shot AUROC: 95.7%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">📊</span>
            <span className={`text-blue-300 font-medium ${getTextSize('text-sm')}`}>
              VUS resolution: 73%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantImpactLandscape; 