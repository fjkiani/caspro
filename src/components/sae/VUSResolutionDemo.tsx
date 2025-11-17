'use client';

import React, { useState } from 'react';
import { VUS_VARIANTS, ANALYSIS_STEPS, DEFAULT_SAE_FEATURES } from './data/variant-data';
import { getStatusColor, getOracleScore, getImpactLevel, getGenePathwayDescription } from './utils';
import type { VUSVariant } from './types';

interface VUSResolutionDemoProps {
  onVariantAnalyzed?: (variant: VUSVariant | null) => void;
  getTextSize?: (size: string) => string;
}

const VUSResolutionDemo: React.FC<VUSResolutionDemoProps> = ({ 
  onVariantAnalyzed,
  getTextSize = (size: string) => size 
}) => {
  const [selectedVariant, setSelectedVariant] = useState<VUSVariant | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
        if (prev >= ANALYSIS_STEPS.length - 1) {
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
    }, variant.timeToResolve * 1000 / ANALYSIS_STEPS.length);
  };

  const resetDemo = () => {
    setSelectedVariant(null);
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setShowResult(false);
    // Clear the analyzed variant from parent
    onVariantAnalyzed?.(null);
  };

  return (
    <div className="space-y-8">
      {/* Variant Selection Grid - Enhanced Beautiful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VUS_VARIANTS.map((variant) => (
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
                  {getOracleScore(variant.gene)}
                </div>
                <div className={`text-white font-bold ${getTextSize('text-sm')}`}>
                  Oracle Score
                </div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className={`text-purple-400 font-bold ${getTextSize('text-xl')}`}>
                  {getImpactLevel(variant.gene)}
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
              {ANALYSIS_STEPS.map((step, index) => {
                const isActive = isAnalyzing && index === analysisStep;
                const isCompleted = isAnalyzing && index < analysisStep;
                
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
                    {index < ANALYSIS_STEPS.length - 1 && (
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
                <p className={`${ANALYSIS_STEPS[analysisStep].color} font-semibold ${getTextSize('text-lg')}`}>
                  {ANALYSIS_STEPS[analysisStep].title}...
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
                        {DEFAULT_SAE_FEATURES.map((feature, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{feature.name}</span>
                            <span className={`px-2 py-1 ${feature.bgColor} ${feature.textColor} rounded font-mono ${getTextSize('text-xs')}`}>
                              {feature.score.toFixed(2)}
                            </span>
                          </div>
                        ))}
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
                      💡 <strong>Mechanistic Interpretability:</strong> prediction is based on {getGenePathwayDescription(selectedVariant.gene)} detected through learned biological features
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
                      CrisPRO.ai didn't just guess - it analyzed <strong className="text-cyan-300">{selectedVariant.gene}</strong> through <strong className="text-purple-300">32,768 learned biological features</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VUSResolutionDemo;

