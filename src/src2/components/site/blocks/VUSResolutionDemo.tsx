import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { renderContextualComponent } from '../../../utils/componentRenderer';
import type { ComponentConfig } from '../../../types/transformation';

interface VUSVariant {
  id: string;
  gene: string;
  position: string;
  change: string;
  initialStatus: 'VUS';
  finalStatus: 'Pathogenic' | 'Benign' | 'Likely Pathogenic';
  confidence: number;
  deltaLikelihood: number;
  clinicalAction: string;
  timeToResolve: number; // seconds
}

interface VUSResolutionDemoProps {
  onVariantAnalyzed?: (variant: VUSVariant | null) => void;
}

const VUSResolutionDemo: React.FC<VUSResolutionDemoProps> = ({ onVariantAnalyzed }) => {
  const { getTextSize } = useAccessibility();
  const [selectedVariant, setSelectedVariant] = useState<VUSVariant | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const vusVariants: VUSVariant[] = [
    {
      id: 'brca1_123',
      gene: 'BRCA1',
      position: 'chr17:43044295',
      change: 'c.123A>T',
      initialStatus: 'VUS',
      finalStatus: 'Pathogenic',
      confidence: 0.94, // Real BRCA1 supervised AUROC from Evo2 paper
      deltaLikelihood: -2.34,
      clinicalAction: 'Zero-shot pathogenicity prediction with 94% confidence (BRCA1 supervised AUROC: 0.94)',
      timeToResolve: 3
    },
    {
      id: 'tp53_456',
      gene: 'TP53',
      position: 'chr17:7670123',
      change: 'c.456G>A',
      initialStatus: 'VUS',
      finalStatus: 'Likely Pathogenic',
      confidence: 0.957, // Real ClinVar SNV AUROC from Evo2 paper
      deltaLikelihood: -1.89,
      clinicalAction: 'ClinVar-level pathogenicity classification (SNV AUROC: 0.957)',
      timeToResolve: 2.5
    },
    {
      id: 'msh2_789',
      gene: 'MSH2',
      position: 'chr2:47403567',
      change: 'c.789C>T',
      initialStatus: 'VUS',
      finalStatus: 'Benign',
      confidence: 0.91,
      deltaLikelihood: -0.12,
      clinicalAction: 'Benign classification with high confidence - no functional disruption predicted',
      timeToResolve: 2
    },
    {
      id: 'apc_321',
      gene: 'APC',
      position: 'chr5:112175123',
      change: 'c.321T>G',
      initialStatus: 'VUS',
      finalStatus: 'Pathogenic',
      confidence: 0.939, // Real ClinVar non-SNV AUROC from Evo2 paper
      deltaLikelihood: -3.12,
      clinicalAction: 'Non-SNV pathogenic variant detected (non-SNV AUROC: 0.939)',
      timeToResolve: 3.5
    }
  ];

  const analysisSteps = [
    { title: 'Ingesting variant sequence', icon: '🧬', color: 'text-cyan-400' },
    { title: 'Computing Evo2 likelihood', icon: '🧠', color: 'text-purple-400' },
    { title: 'Analyzing SAE features', icon: '🔍', color: 'text-blue-400' },
    { title: 'Calibrating confidence', icon: '📊', color: 'text-orange-400' },
    { title: 'Generating clinical verdict', icon: '⚡', color: 'text-green-400' }
  ];

  const runAnalysis = (variant: VUSVariant) => {
    setSelectedVariant(variant);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setShowResult(false);

    // Auto-scroll to analysis section after a brief delay
    setTimeout(() => {
      const analysisSection = document.getElementById('analysis-section');
      if (analysisSection) {
        analysisSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 500);

    // Simulate step-by-step analysis
    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
            // Notify parent component that variant analysis is complete
            onVariantAnalyzed?.(variant);
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, variant.timeToResolve * 1000 / analysisSteps.length);
  };

  const resetDemo = () => {
    setSelectedVariant(null);
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setShowResult(false);
    // Clear the analyzed variant from parent
    onVariantAnalyzed?.(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VUS': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
      case 'Pathogenic': return 'text-red-400 bg-red-900/30 border-red-700/50';
      case 'Likely Pathogenic': return 'text-orange-400 bg-orange-900/30 border-orange-700/50';
      case 'Benign': return 'text-green-400 bg-green-900/30 border-green-700/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700/50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      {/* <div className="text-center space-y-4">
        <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
          🔮 VUS Resolution in Real-Time
        </h3>
        <p className={`text-slate-300 max-w-4xl mx-auto leading-relaxed ${getTextSize('text-lg')}`}>
          Watch Oracle transform uncertain variants into actionable clinical decisions. 
          Select any VUS below to see zero-shot prediction with explainable evidence.
        </p>
      </div> */}

      {/* Variant Selection Grid - Enhanced Beautiful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vusVariants.map((variant) => (
          <div
            key={variant.id}
            className={`bg-slate-800 border border-slate-600 rounded-2xl p-8 cursor-pointer transition-all duration-200 hover:border-slate-400 group ${
              selectedVariant?.id === variant.id 
                ? 'ring-2 ring-blue-500/50 border-blue-500/50' 
                : 'hover:bg-slate-700'
            }`}
            onClick={() => !isAnalyzing && runAnalysis(variant)}
          >
            {/* Card Header with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-cyan-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center ${getTextSize('text-2xl')}`}>
                  🧬
                </div>
                <div>
                  <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                    {variant.gene}
                  </h3>
                  <p className={`text-slate-300 font-mono font-bold ${getTextSize('text-base')}`}>
                    {variant.change}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg font-bold border ${getStatusColor(variant.initialStatus)} ${getTextSize('text-sm')}`}>
                {variant.initialStatus}
              </span>
            </div>

            {/* Genomic Position */}
            <div className={`text-white font-bold mb-4 ${getTextSize('text-lg')}`}>
              <span className="text-slate-300">Position:</span> {variant.position}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className={`text-cyan-400 font-bold ${getTextSize('text-xl')}`}>
                  {variant.gene === 'BRCA1' ? '73%' : variant.gene === 'TP53' ? '89%' : '65%'}
                </div>
                <div className={`text-white font-bold ${getTextSize('text-sm')}`}>
                  Oracle Score
                </div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className={`text-purple-400 font-bold ${getTextSize('text-xl')}`}>
                  {variant.gene === 'BRCA1' ? 'High' : variant.gene === 'TP53' ? 'Critical' : 'Medium'}
                </div>
                <div className={`text-white font-bold ${getTextSize('text-sm')}`}>
                  Impact
                </div>
              </div>
            </div>

            {/* Action Button - STANDOUT */}
            <div className={`text-center pt-6 border-t-2 border-cyan-500/30`}>
              {selectedVariant?.id === variant.id && isAnalyzing ? (
                <div className="flex items-center justify-center gap-3 text-blue-400 bg-blue-950/50 p-4 rounded-xl border border-blue-500/30">
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className={`font-bold ${getTextSize('text-lg')}`}>Analyzing with Oracle...</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-4 rounded-xl border-2 border-cyan-400/50 group-hover:border-cyan-300 transition-all duration-200 shadow-lg hover:shadow-cyan-500/20">
                  <div className="text-white font-bold">
                    <div className={`${getTextSize('text-xl')} mb-2`}>
                      🔬 Click to analyze 
                    </div>
                    <div className={`text-cyan-100 font-semibold ${getTextSize('text-base')}`}>
                      Zero-shot variant classification
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Visualization */}
      {selectedVariant && (
        <div id="analysis-section" className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600 rounded-2xl p-8">
          <div className="space-y-8">
            {/* Analysis Header */}
            <div className="text-center space-y-4">
              <h4 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                Analyzing {selectedVariant.gene}:{selectedVariant.change}
              </h4>
              <div className="flex items-center justify-center gap-4">
                <span className={`px-3 py-1 rounded border font-medium ${getStatusColor(selectedVariant.initialStatus)}`}>
                  Before: {selectedVariant.initialStatus}
                </span>
                <span className="text-slate-400">→</span>
                {showResult && (
                  <span className={`px-3 py-1 rounded border font-medium ${getStatusColor(selectedVariant.finalStatus)}`}>
                    After: {selectedVariant.finalStatus}
                  </span>
                )}
              </div>
            </div>

            {/* Analysis Steps */}
            <div className="flex items-center justify-center space-x-4">
              {analysisSteps.map((step, index) => {
                const isActive = isAnalyzing && index === analysisStep;
                const isCompleted = isAnalyzing && index < analysisStep;
                const isUpcoming = isAnalyzing && index > analysisStep;
                
                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                        isActive 
                          ? `${step.color} border-current scale-110 animate-pulse` 
                          : isCompleted
                          ? `${step.color} border-current`
                          : 'border-slate-600 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : step.icon}
                    </div>
                    {index < analysisSteps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                        isCompleted ? 'bg-cyan-500' : 'bg-slate-600'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current Step Description */}
            {isAnalyzing && (
              <div className="text-center">
                <p className={`${analysisSteps[analysisStep].color} font-semibold ${getTextSize('text-lg')}`}>
                  {analysisSteps[analysisStep].title}...
                </p>
              </div>
            )}

            {/* Results */}
            {showResult && selectedVariant && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className={`font-bold text-red-400 ${getTextSize('text-2xl')}`}>
                      {selectedVariant.deltaLikelihood.toFixed(2)}
                    </div>
                    <div className={`text-slate-400 ${getTextSize('text-sm')}`}>Δ Likelihood</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className={`font-bold text-orange-400 ${getTextSize('text-2xl')}`}>
                      {(selectedVariant.confidence * 100).toFixed(1)}%
                    </div>
                    <div className={`text-slate-400 ${getTextSize('text-sm')}`}>Confidence</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className={`font-bold text-green-400 ${getTextSize('text-2xl')}`}>
                      {selectedVariant.timeToResolve}s
                    </div>
                    <div className={`text-slate-400 ${getTextSize('text-sm')}`}>Time to Resolve</div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl">
                  <h5 className={`font-bold text-white mb-3 ${getTextSize('text-xl')}`}>
                    🧬 Discriminative AI Results
                  </h5>
                  <p className={`text-slate-200 leading-relaxed ${getTextSize('text-base')}`}>
                    <strong>Zero-shot Verdict:</strong> {selectedVariant.finalStatus} with {(selectedVariant.confidence * 100).toFixed(1)}% confidence
                  </p>
                  <p className={`text-slate-200 leading-relaxed mt-2 ${getTextSize('text-base')}`}>
                    <strong>Evo2 Capability:</strong> {selectedVariant.clinicalAction}
                  </p>
                </div>

                {/* SAE Explainability - What Oracle Actually Shows */}
                <div className="space-y-6">
                  <h5 className={`font-bold text-white text-center ${getTextSize('text-xl')}`}>
                    🧠 Sparse Autoencoder Interpretability
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Learned Biological Features */}
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
                      <h6 className={`font-semibold text-cyan-400 mb-4 ${getTextSize('text-lg')}`}>
                        🔍 Activated SAE Features
                      </h6>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Exon-intron boundary</span>
                          <span className={`px-2 py-1 bg-cyan-900/30 text-cyan-300 rounded font-mono ${getTextSize('text-xs')}`}>0.89</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>TF binding motif</span>
                          <span className={`px-2 py-1 bg-purple-900/30 text-purple-300 rounded font-mono ${getTextSize('text-xs')}`}>0.76</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Protein structural element</span>
                          <span className={`px-2 py-1 bg-orange-900/30 text-orange-300 rounded font-mono ${getTextSize('text-xs')}`}>0.92</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-slate-300 ${getTextSize('text-sm')}`}>Splice site consensus</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs font-mono">0.67</span>
                        </div>
                      </div>
                      <p className={`text-slate-400 mt-4 ${getTextSize('text-xs')}`}>
                        32,768 total features learned without supervision
                      </p>
                    </div>

                    {/* Likelihood Analysis */}
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6">
                      <h6 className={`font-semibold text-purple-400 mb-4 ${getTextSize('text-lg')}`}>
                        📊 Δ Likelihood Analysis
                      </h6>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className={`text-3xl font-bold text-red-400 ${getTextSize('text-3xl')}`}>
                            {selectedVariant.deltaLikelihood.toFixed(2)}
                          </div>
                          <div className={`text-slate-400 ${getTextSize('text-sm')}`}>
                            Functional disruption score
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, Math.abs(selectedVariant.deltaLikelihood) * 30)}%` }}
                          ></div>
                        </div>
                        <p className={`text-slate-400 ${getTextSize('text-xs')}`}>
                          Negative values indicate functional disruption
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-xl p-4">
                    <p className={`text-slate-300 text-center ${getTextSize('text-sm')}`}>
                      💡 <strong>Mechanistic Interpretability:</strong>  prediction is based on {selectedVariant.gene === 'BRCA1' ? 'DNA repair pathway disruption' : selectedVariant.gene === 'TP53' ? 'tumor suppressor function loss' : selectedVariant.gene === 'MSH2' ? 'mismatch repair deficiency' : 'oncogene activation'} detected through learned biological features
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <button
                    onClick={resetDemo}
                    className={`px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-bold transition-all duration-200 border-2 border-slate-500 hover:border-slate-400 shadow-lg ${getTextSize('text-lg')}`}
                  >
                    🔄 Try Another Variant
                  </button>
                  
                  {/* Curiosity Hook - Enhanced */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50 rounded-xl shadow-lg">
                    <h6 className={`font-bold text-white mb-4 ${getTextSize('text-2xl')}`}>
                       How did CrisPRO know that?
                    </h6>
                    <p className={`text-white font-bold leading-relaxed ${getTextSize('text-lg')}`}>
                      CrisPRO.ai didn't just guess - it analyzed <strong className="text-cyan-300">{selectedVariant.gene}</strong> through <strong className="text-purple-300">32,768 learned biological features</strong>, 
                      {/* computed likelihood disruption across the genomic window, and applied mechanistic interpretability to understand 
                      exactly <em className="text-yellow-300">why</em> this variant is <strong className="text-green-300">{selectedVariant.finalStatus.toLowerCase()}</strong>. */}
                    </p>
                    <div className="mt-6 text-center">
                      {/* <div className={`text-purple-200 font-bold ${getTextSize('text-lg')}`}>
                        ↓ Explore Oracle's thinking process below ↓
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Impact Summary */}
      {/*  */}
    </div>
  );
};

export default VUSResolutionDemo; 