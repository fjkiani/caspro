'use client';

import React from 'react';
import { OracleExplainTrack, VariantDetailCard, KPIStrip, EssentialityChart, ProteinDeltaCard, AccessibilityTrack } from './components';
import { getSAEFeatures, getDeltaLikelihoodSeries, getPerformanceMetrics, getBiologicalExplanation, getVariantRegion, getVerdictFromStatus } from './utils/variant-helpers';
import { createThinkingSteps, THINKING_STEP_INTERVAL, SCROLL_DELAY } from './data/thinking-steps';
import type { VUSVariant } from './types';

interface DynamicOracleExplainProps {
  analyzedVariant: VUSVariant | null;
  getTextSize?: (size: string) => string;
}

const DynamicOracleExplain: React.FC<DynamicOracleExplainProps> = ({ 
  analyzedVariant, 
  getTextSize = (size: string) => size 
}) => {
  const [thinkingStep, setThinkingStep] = React.useState(0);
  const [isThinking, setIsThinking] = React.useState(false);

  if (!analyzedVariant) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <div className={`text-slate-400 ${getTextSize('text-2xl')}`}>
            🧠 9.3 trillion parameter brain
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-cyan-400 text-2xl mb-2">🔍</div>
              <div className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>Feature Detection</div>
              <div className={`text-slate-400 ${getTextSize('text-sm')}`}>32,768 biological concepts</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-purple-400 text-2xl mb-2">📊</div>
              <div className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>Likelihood Analysis</div>
              <div className={`text-slate-400 ${getTextSize('text-sm')}`}>Functional disruption scoring</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-orange-400 text-2xl mb-2">🧬</div>
              <div className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>Biological Reasoning</div>
              <div className={`text-slate-400 ${getTextSize('text-sm')}`}>Mechanistic interpretability</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const explainTrackData = {
    sequence: 'A'.repeat(200),
    variant: { pos: 88, ref: 'C', alt: 'T' },
    saeFeatures: getSAEFeatures(analyzedVariant.gene),
    deltaLLSeries: getDeltaLikelihoodSeries(analyzedVariant.deltaLikelihood)
  };

  const variantDetailData = {
    id: analyzedVariant.change,
    region: getVariantRegion(analyzedVariant.gene),
    zeroShot: analyzedVariant.deltaLikelihood,
    supervised: analyzedVariant.confidence,
    verdict: getVerdictFromStatus(analyzedVariant.finalStatus),
    notes: getBiologicalExplanation(analyzedVariant)
  };

  // Real Evo2 thinking steps from the paper - each uses actual components
  const thinkingSteps = createThinkingSteps(analyzedVariant);

  const startThinkingDemo = () => {
    setIsThinking(true);
    setThinkingStep(0);
    
    // Auto-scroll to thinking process section
    setTimeout(() => {
      const thinkingSection = document.getElementById('oracle-thinking-section');
      if (thinkingSection) {
        thinkingSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, SCROLL_DELAY);
    
    const interval = setInterval(() => {
      setThinkingStep(prev => {
        if (prev >= thinkingSteps.length - 1) {
          setIsThinking(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, THINKING_STEP_INTERVAL);
  };

  const resetThinking = () => {
    setThinkingStep(0);
    setIsThinking(false);
  };

  // Render the actual component for each thinking step
  const renderStepComponent = (componentName: string) => {
    switch (componentName) {
      case 'OracleExplainTrack':
        return <OracleExplainTrack {...explainTrackData} />;
      case 'VariantDetailCard':
        return <VariantDetailCard {...variantDetailData} />;
      case 'EssentialityChart':
        return (
          <EssentialityChart 
            series={[
              { context: { cellLine: `${analyzedVariant.gene} Cancer`, mutations: [analyzedVariant.change] }, score: analyzedVariant.confidence },
              { context: { cellLine: 'Normal Tissue', mutations: [] }, score: Math.max(0.1, analyzedVariant.confidence - 0.7) }
            ]} 
          />
        );
      case 'ProteinDeltaCard':
        return (
          <ProteinDeltaCard 
            function={analyzedVariant.deltaLikelihood}
            stability={analyzedVariant.deltaLikelihood * 0.5}
            foldingImpact={Math.abs(analyzedVariant.deltaLikelihood) * 0.3}
            notes={getBiologicalExplanation(analyzedVariant)}
          />
        );
      case 'AccessibilityTrack':
        return (
          <AccessibilityTrack 
            tracks={[{
              context: `${analyzedVariant.gene} Locus`,
              points: Array.from({ length: 50 }, (_, i) => ({ 
                pos: i, 
                score: 0.4 + 0.4 * Math.sin(i / 8) + (i === 25 ? 0.3 : 0) // Peak at variant position
              }))
            }]}
          />
        );
      default:
        return <div className="text-slate-400">Component visualization</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Thinking Process */}
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
        <div className="mb-8 space-y-6">
          <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
            🧠 How CrisPRO.ai Thinks: {analyzedVariant.gene}:{analyzedVariant.change}
          </h3>

          {/* Thinking Demo Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startThinkingDemo}
              disabled={isThinking}
              className={`px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
            >
              {isThinking ? '🧠 Thinking...' : '🧠 Watch CrisPRO Think'}
            </button>
            <button
              onClick={resetThinking}
              className={`px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
            >
              🔄 Reset
            </button>
          </div>

          {/* Thinking Steps Visualization */}
          <div id="oracle-thinking-section" className="space-y-6">
            {thinkingSteps.map((step, index) => {
              const isActive = index === thinkingStep && isThinking;
              const isCompleted = index < thinkingStep || (!isThinking && thinkingStep >= thinkingSteps.length - 1);
              const isVisible = index <= thinkingStep || (!isThinking && thinkingStep >= thinkingSteps.length - 1);
              
              if (!isVisible) return null;
              
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50 scale-105' 
                      : isCompleted
                      ? 'bg-slate-700/30 border-slate-600'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl ${step.color} ${isActive ? 'animate-pulse' : ''}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className={`font-bold text-white ${getTextSize('text-xl')}`}>
                        Step {index + 1}: {step.title}
                      </h4>
                      <p className={`${step.color} font-semibold ${getTextSize('text-base')}`}>
                        {step.description}
                      </p>
                      <p className={`text-slate-400 ${getTextSize('text-sm')}`}>
                        {step.detail}
                      </p>
                      <div className={`text-xs text-slate-500 italic ${getTextSize('text-xs')}`}>
                        📄 Evo2 Paper: {step.paperRef}
                      </div>
                      
                      {/* Show actual component when step is active or completed */}
                      {(isCompleted || isActive) && (
                        <div className="mt-6 p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                          <div className={`text-sm font-semibold text-slate-300 mb-3 ${getTextSize('text-sm')}`}>
                            🔬 Live Analysis Component:
                          </div>
                          {renderStepComponent(step.component)}
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          <span className={`text-purple-300 ml-2 ${getTextSize('text-sm')}`}>Analyzing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-6">
            <h4 className={`font-bold text-cyan-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
              🧠 Sparse Autoencoder Features ({getSAEFeatures(analyzedVariant.gene).length} activated)
            </h4>
            <p className={`text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
              <span className="font-bold text-cyan-300">Top ribbon:</span> Shows activation of gene-specific biological features learned by Evo2's layer 26. 
              For {analyzedVariant.gene}, key features include {getSAEFeatures(analyzedVariant.gene).map(f => f.name.toLowerCase()).join(', ')}.
            </p>
          </div>
          
          <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-6">
            <h4 className={`font-bold text-purple-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
              📊 Discriminative Likelihood Analysis
            </h4>
            <p className={`text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
              <span className="font-bold text-purple-300">Bottom chart:</span> Δ likelihood of {analyzedVariant.deltaLikelihood.toFixed(2)} 
              indicates {Math.abs(analyzedVariant.deltaLikelihood) > 2 ? 'severe' : Math.abs(analyzedVariant.deltaLikelihood) > 1 ? 'moderate' : 'mild'} functional disruption. 
              Zero-shot prediction achieves {(analyzedVariant.confidence * 100).toFixed(1)}% confidence.
            </p>
          </div>
        </div>
        
        <OracleExplainTrack {...explainTrackData} />
        
        <div className="mt-6 p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-600/50 rounded-xl">
          <div className={`text-cyan-200 font-bold mb-3 ${getTextSize('text-lg')}`}>
            Live Analysis - {analyzedVariant.gene}:{analyzedVariant.change}:
          </div>
          <div className={`text-slate-100 space-y-2 ${getTextSize('text-base')}`}>
            <div>🎯 <span className="text-cyan-300 font-semibold">SAE Features:</span> {getSAEFeatures(analyzedVariant.gene).length} gene-specific features activated</div>
            <div>📈 <span className="text-purple-300 font-semibold">Likelihood Impact:</span> {Math.abs(analyzedVariant.deltaLikelihood) > 2 ? 'Severe' : Math.abs(analyzedVariant.deltaLikelihood) > 1 ? 'Moderate' : 'Mild'} disruption ({analyzedVariant.deltaLikelihood.toFixed(2)} Δ likelihood)</div>
            <div>🔮 <span className="text-orange-300 font-semibold">Zero-shot Verdict:</span> {analyzedVariant.finalStatus} ({(analyzedVariant.confidence * 100).toFixed(1)}% confidence)</div>
          </div>
        </div>
      </div>

      {/* Dynamic Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VariantDetailCard {...variantDetailData} />
        <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
          <h3 className={`font-bold text-white mb-6 text-center ${getTextSize('text-3xl')}`}>
            Live Analysis Metrics
          </h3>
          <KPIStrip items={getPerformanceMetrics(analyzedVariant)} />
          <div className={`mt-6 text-slate-300 text-center leading-relaxed space-y-2 ${getTextSize('text-base')}`}>
            <div className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
              Analysis based on {analyzedVariant.gene} variant:
            </div>
            <div>Pathogenicity: {analyzedVariant.finalStatus}</div>
            <div>Biological impact: {getBiologicalExplanation(analyzedVariant)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicOracleExplain;

