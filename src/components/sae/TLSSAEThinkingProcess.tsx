'use client';

import React from 'react';
import { OracleExplainTrack, VariantDetailCard, KPIStrip, EssentialityChart, ProteinDeltaCard, AccessibilityTrack } from './components';
import {
  DEFAULT_EXPLAIN_TRACK_DATA,
  DEFAULT_VARIANT_DETAIL_DATA,
  DEFAULT_KPI_METRICS,
  DEFAULT_ENGINEERING_METRICS,
  DEFAULT_RUO_DISCLAIMER,
  DEFAULT_THINKING_DESCRIPTION,
  DEFAULT_ANALYSIS_SUMMARY
} from './data/defaults';
import { SCROLL_DELAY, THINKING_STEP_INTERVAL } from './data/thinking-steps';

export interface TLSThinkingStep {
  title: string;
  description: string;
  detail: string;
  component: string;
  icon: string;
  color: string;
  paperRef: string;
  ruoDisclaimer?: string;
}

interface TLSSAEThinkingProcessProps {
  useCaseId: string;
  variant?: {
    gene: string;
    change: string;
    deltaLikelihood: number;
    confidence: number;
    finalStatus: string;
  };
  customSteps?: TLSThinkingStep[];
  showRUODisclaimer?: boolean;
  // Additional data for component rendering
  explainTrackData?: any;
  variantDetailData?: any;
  kpiMetrics?: Array<{ label: string; value: string }>;
  engineeringMetrics?: Array<{ label: string; value: string }>;
  ruoDisclaimer?: { title: string; description: string };
  thinkingDescription?: string;
  analysisSummary?: { saeFeatures: string; readiness: string; verdict: string };
  getTextSize?: (size: string) => string;
}

const TLSSAEThinkingProcess: React.FC<TLSSAEThinkingProcessProps> = ({ 
  useCaseId, 
  variant, 
  customSteps,
  showRUODisclaimer = true,
  explainTrackData,
  variantDetailData,
  kpiMetrics,
  engineeringMetrics,
  ruoDisclaimer,
  thinkingDescription,
  analysisSummary,
  getTextSize = (size: string) => size
}) => {
  const [thinkingStep, setThinkingStep] = React.useState(0);
  const [isThinking, setIsThinking] = React.useState(false);

  // Use provided data or fallback to defaults
  const finalExplainTrackData = explainTrackData || DEFAULT_EXPLAIN_TRACK_DATA;

  const finalVariantDetailData = variantDetailData || {
    ...DEFAULT_VARIANT_DETAIL_DATA,
    id: variant?.change || DEFAULT_VARIANT_DETAIL_DATA.id,
    zeroShot: variant?.deltaLikelihood || DEFAULT_VARIANT_DETAIL_DATA.zeroShot,
    supervised: variant?.confidence || DEFAULT_VARIANT_DETAIL_DATA.supervised
  };

  const finalKpiMetrics = kpiMetrics || DEFAULT_KPI_METRICS;

  const finalEngineeringMetrics = engineeringMetrics || DEFAULT_ENGINEERING_METRICS;

  const finalRuoDisclaimer = ruoDisclaimer || DEFAULT_RUO_DISCLAIMER;

  const finalThinkingDescription = thinkingDescription || DEFAULT_THINKING_DESCRIPTION;

  const finalAnalysisSummary = analysisSummary || DEFAULT_ANALYSIS_SUMMARY;

  const startThinkingDemo = () => {
    setIsThinking(true);
    setThinkingStep(0);
    
    setTimeout(() => {
      const thinkingSection = document.getElementById('tls-thinking-section');
      if (thinkingSection) {
        thinkingSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, SCROLL_DELAY);
    
    const interval = setInterval(() => {
      setThinkingStep(prev => {
        if (prev >= (customSteps || []).length - 1) {
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
        return <OracleExplainTrack {...finalExplainTrackData} />;
      case 'VariantDetailCard':
        return <VariantDetailCard {...finalVariantDetailData} />;
      case 'EssentialityChart':
        return (
          <EssentialityChart 
            series={[
              { context: { cellLine: 'Analysis Target', mutations: [variant?.change || 'Unknown'] }, score: variant?.confidence || 0.89 },
              { context: { cellLine: 'Control', mutations: [] }, score: Math.max(0.1, (variant?.confidence || 0.89) - 0.7) }
            ]} 
          />
        );
      case 'ProteinDeltaCard':
        return (
          <ProteinDeltaCard 
            function={variant?.deltaLikelihood || -2.1}
            stability={(variant?.deltaLikelihood || -2.1) * 0.5}
            foldingImpact={Math.abs(variant?.deltaLikelihood || -2.1) * 0.3}
            notes="Protein analysis for biological function assessment"
          />
        );
      case 'AccessibilityTrack':
        return (
          <AccessibilityTrack 
            tracks={[{
              context: 'Analysis Locus',
              points: Array.from({ length: 50 }, (_, i) => ({ 
                pos: i, 
                score: 0.4 + 0.4 * Math.sin(i / 8) + (i === 25 ? 0.3 : 0)
              }))
            }]}
          />
        );
      case 'KPIStrip':
        return (
          <KPIStrip 
            items={finalKpiMetrics}
          />
        );
      default:
        return <div className="text-slate-400">Component visualization</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* RUO Disclaimer */}
      {showRUODisclaimer && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</div>
            <div>
              <h4 className="text-yellow-800 dark:text-yellow-300 font-semibold">{finalRuoDisclaimer.title}</h4>
              <p className="text-yellow-700 dark:text-yellow-200/80 text-sm">
                {finalRuoDisclaimer.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Thinking Process */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
        <div className="mb-8 space-y-6">
          <h3 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-3xl')}`}>
            🧠 How CrisPRO.ai Thinks: {useCaseId === 'tls_seed_generation' ? 'TLS Seed Engineering' : 'Programmable Analysis'}
          </h3>
          
          <p className={`text-slate-600 dark:text-slate-300 leading-relaxed ${getTextSize('text-lg')}`}>
            {finalThinkingDescription}
          </p>

          {/* Thinking Demo Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startThinkingDemo}
              disabled={isThinking}
              className={`px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
            >
              {isThinking ? '🧠 Thinking...' : '🧠 Watch CrisPRO Think'}
            </button>
            <button
              onClick={resetThinking}
              className={`px-6 py-3 bg-slate-500 hover:bg-slate-400 text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
            >
              🔄 Reset
            </button>
          </div>

          {/* Thinking Steps Visualization */}
          <div id="tls-thinking-section" className="space-y-6">
            {(customSteps || []).map((step, index) => {
              const isActive = index === thinkingStep && isThinking;
              const isCompleted = index < thinkingStep || (!isThinking && thinkingStep >= (customSteps || []).length - 1);
              const isVisible = index <= thinkingStep || (!isThinking && thinkingStep >= (customSteps || []).length - 1);
              
              if (!isVisible) return null;
              
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-300 dark:border-purple-500/50 scale-105' 
                      : isCompleted
                      ? 'bg-slate-100 dark:bg-slate-700/30 border-slate-300 dark:border-slate-600'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl ${step.color} ${isActive ? 'animate-pulse' : ''}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-xl')}`}>
                        Step {index + 1}: {step.title}
                      </h4>
                      <p className={`${step.color} font-semibold ${getTextSize('text-base')}`}>
                        {step.description}
                      </p>
                      <p className={`text-slate-600 dark:text-slate-300 ${getTextSize('text-sm')}`}>
                        {step.detail}
                      </p>
                      <div className={`text-xs text-slate-500 dark:text-slate-400 italic ${getTextSize('text-xs')}`}>
                        📄 Evo2 Paper: {step.paperRef}
                      </div>
                      {step.ruoDisclaimer && (
                        <div className={`text-xs text-yellow-600 dark:text-yellow-400 italic ${getTextSize('text-xs')}`}>
                          {step.ruoDisclaimer}
                        </div>
                      )}
                      
                      {/* Show actual component when step is active or completed */}
                      {(isCompleted || isActive) && (
                        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-600 rounded-lg">
                          <div className={`text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 ${getTextSize('text-sm')}`}>
                            🔬 Live Analysis Component:
                          </div>
                          {renderStepComponent(step.component)}
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          <span className={`text-purple-600 dark:text-purple-400 ml-2 ${getTextSize('text-sm')}`}>Analyzing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-6">
            <h4 className={`font-bold text-cyan-600 dark:text-cyan-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
              🧠 SAE Features ({finalExplainTrackData.saeFeatures.length} activated)
            </h4>
            <p className={`text-slate-700 dark:text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
              <span className="font-bold text-cyan-600 dark:text-cyan-300">Top ribbon:</span> Shows activation of biological features learned by Evo2's layer 26. 
              Key features include {finalExplainTrackData.saeFeatures.map((f: any) => f.name.toLowerCase()).join(', ')}.
            </p>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-6">
            <h4 className={`font-bold text-purple-600 dark:text-purple-300 mb-4 flex items-center gap-3 ${getTextSize('text-xl')}`}>
              📊 Analysis Results
            </h4>
            <p className={`text-slate-700 dark:text-slate-200 leading-relaxed ${getTextSize('text-lg')}`}>
              <span className="font-bold text-purple-600 dark:text-purple-300">Bottom chart:</span> Δ likelihood of {variant?.deltaLikelihood?.toFixed(2) || '2.1'} 
              indicates {Math.abs(variant?.deltaLikelihood || -2.1) > 2 ? 'severe' : Math.abs(variant?.deltaLikelihood || -2.1) > 1 ? 'moderate' : 'mild'} biological disruption. 
              Zero-shot prediction achieves {(variant?.confidence || 0.89) * 100}% confidence for analysis.
            </p>
          </div>
        </div>
        
        <OracleExplainTrack {...finalExplainTrackData} />
        
        <div className="mt-6 p-6 bg-gradient-to-r from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 border border-cyan-300 dark:border-cyan-600/50 rounded-xl">
          <div className={`text-cyan-700 dark:text-cyan-200 font-bold mb-3 ${getTextSize('text-lg')}`}>
            Live Analysis - {variant?.gene || 'Unknown'}:{variant?.change || 'Unknown'}:
          </div>
          <div className={`text-slate-700 dark:text-slate-200 space-y-2 ${getTextSize('text-base')}`}>
            <div>🎯 <span className="text-cyan-600 dark:text-cyan-300 font-semibold">SAE Features:</span> {finalAnalysisSummary.saeFeatures}</div>
            <div>📈 <span className="text-purple-600 dark:text-purple-300 font-semibold">Analysis Score:</span> {finalAnalysisSummary.readiness}</div>
            <div>🔮 <span className="text-orange-600 dark:text-orange-300 font-semibold">Analysis Verdict:</span> {finalAnalysisSummary.verdict}</div>
          </div>
        </div>
      </div>

      {/* Dynamic Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VariantDetailCard {...finalVariantDetailData} />
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
          <h3 className={`font-bold text-slate-900 dark:text-white mb-6 text-center ${getTextSize('text-3xl')}`}>
            Analysis Metrics
          </h3>
          <KPIStrip items={finalEngineeringMetrics} />
          <div className={`mt-6 text-slate-600 dark:text-slate-300 text-center leading-relaxed space-y-2 ${getTextSize('text-base')}`}>
            <div className={`font-semibold text-slate-700 dark:text-slate-200 ${getTextSize('text-base')}`}>
              Analysis based on biological assessment:
            </div>
            <div>Analysis Score: {(variant?.confidence || 0.89) * 100}%</div>
            <div>Biological impact: {Math.abs(variant?.deltaLikelihood || -2.1) > 2 ? 'Severe' : Math.abs(variant?.deltaLikelihood || -2.1) > 1 ? 'Moderate' : 'Mild'} disruption detected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TLSSAEThinkingProcess;

