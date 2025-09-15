import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAISampleData } from '../../../data/discriminativeAISampleData';
import { InteractiveDemoShowcase, VariantDetailCard, ProteinDeltaCard, EssentialityChart, AccessibilityTrack, OracleExplainTrack } from './';

interface FactoryDemoShowcaseProps {
  demoConfig: {
    type: 'factory' | 'legacy';
    category?: string;
    scenario?: string;
    demo?: string;
  };
  valueProposition?: any;
  hideResultsUntilRun?: boolean;
}

const FactoryDemoShowcase: React.FC<FactoryDemoShowcaseProps> = ({
  demoConfig,
  valueProposition,
  hideResultsUntilRun = false
}) => {
  const { getTextSize } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showOracleThinking, setShowOracleThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  // Handle legacy demos by delegating to existing component
  if (demoConfig.type === 'legacy' && demoConfig.demo) {
    return <InteractiveDemoShowcase selectedDemo={demoConfig.demo} />;
  }

  // Handle factory demos
  if (demoConfig.type === 'factory' && demoConfig.category && demoConfig.scenario) {
    const factoryData = discriminativeAISampleData.demoFactory;
    const categoryData = factoryData[demoConfig.category as keyof typeof factoryData];
    const scenarioData = categoryData?.[demoConfig.scenario as keyof typeof categoryData];

    if (!scenarioData) {
      return <div className="text-red-400">Demo scenario not found</div>;
    }

    const getEndpointColor = (endpoint: string) => {
      const colorMap: { [key: string]: string } = {
        'predict_variant_impact': 'blue',
        'predict_protein_functionality_change': 'red',
        'predict_chromatin_accessibility': 'orange',
        'predict_gene_essentiality': 'green',
        'predict_crispr_spacer_efficacy': 'purple'
      };
      return colorMap[endpoint] || 'blue';
    };

    const getColorClasses = (color: string) => {
      const colorMap = {
        blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-900/20' },
        red: { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-900/20' },
        orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-900/20' },
        green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500', light: 'bg-green-900/20' },
        purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500', light: 'bg-purple-900/20' }
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    };

    const playDemo = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= scenarioData.steps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            // Trigger Oracle thinking process after API steps complete
            setTimeout(() => {
              setShowOracleThinking(true);
              startOracleThinking();
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    };

    const startOracleThinking = () => {
      setIsThinking(true);
      setThinkingStep(0);
      
      const thinkingSteps = ['OracleExplainTrack', 'VariantDetailCard', 'ProteinDeltaCard', 'EssentialityChart'];
      
      const thinkingInterval = setInterval(() => {
        setThinkingStep(prev => {
          if (prev >= thinkingSteps.length - 1) {
            setIsThinking(false);
            clearInterval(thinkingInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    };

    const resetDemo = () => {
      setCurrentStep(0);
      setIsPlaying(false);
      setHasStarted(false);
      setShowOracleThinking(false);
      setThinkingStep(0);
      setIsThinking(false);
    };

    // Generate contextual data for Oracle thinking components
    const getContextualData = () => {
      const variant = scenarioData.variant;
      const confidence = scenarioData.summary.confidence;
      
      return {
        variant: {
          id: variant,
          gene: variant.split(':')[0] || 'GENE',
          change: variant.split(':')[1] || 'c.123A>T',
          deltaLikelihood: -2.34,
          confidence: confidence,
          finalStatus: (scenarioData.summary.verdict.includes('High-Priority') ? 'Pathogenic' : 
                      scenarioData.summary.verdict.includes('Low-Risk') ? 'Benign' : 'Pathogenic') as 'Pathogenic' | 'Benign' | 'Uncertain'
        }
      };
    };

    // Render Oracle thinking step components
    const renderThinkingComponent = (componentName: string, stepIndex: number) => {
      const data = getContextualData();
      const isActive = stepIndex <= thinkingStep;
      
      if (!isActive) return null;

      switch (componentName) {
        case 'OracleExplainTrack':
          return (
            <div className="animate-in slide-in-from-top-4 duration-500">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-cyan-300 mb-2">🧠 Oracle's Reasoning Process</h5>
                <p className="text-sm text-slate-300">
                  <span className="font-medium text-cyan-300">Top ribbon:</span> Learned features (exon/intron boundaries, TF motifs). 
                  <span className="font-medium text-purple-300">Bottom chart:</span> Δ likelihood around variant.
                </p>
              </div>
              <OracleExplainTrack
                sequence="ATCGATCGATCGATCGATCGATCGATCGATCG"
                variant={{ ref: 'A', pos: 15, alt: 'T' }}
                saeFeatures={[
                  { name: 'Exon boundary', start: 10, end: 15, score: 0.9 },
                  { name: 'TF motif', start: 20, end: 25, score: 0.8 }
                ]}
                deltaLLSeries={Array.from({ length: 20 }, (_, i) => ({ 
                  pos: i + 5, 
                  delta: Math.sin(i / 3) * (i === 10 ? -2.5 : 0.5) 
                }))}
              />
            </div>
          );
        case 'VariantDetailCard':
          return (
            <div className="animate-in slide-in-from-top-4 duration-500">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-blue-300 mb-2">📊 Variant Classification</h5>
              </div>
              <VariantDetailCard
                id={data.variant.id}
                region="coding"
                zeroShot={Math.abs(data.variant.deltaLikelihood)}
                supervised={data.variant.confidence}
                verdict={data.variant.finalStatus}
                notes={`${scenarioData.summary.clinicalAction}`}
              />
            </div>
          );
        case 'ProteinDeltaCard':
          return (
            <div className="animate-in slide-in-from-top-4 duration-500">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-red-300 mb-2">🔬 Protein Impact Analysis</h5>
              </div>
              <ProteinDeltaCard
                function={data.variant.deltaLikelihood}
                stability={data.variant.deltaLikelihood * 0.6}
                foldingImpact={Math.abs(data.variant.deltaLikelihood) * 0.4}
                notes={`Functional impact assessment for ${scenarioData.title.toLowerCase()}`}
              />
            </div>
          );
        case 'EssentialityChart':
          return (
            <div className="animate-in slide-in-from-top-4 duration-500">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-green-300 mb-2">🧬 Gene Essentiality Context</h5>
              </div>
              <EssentialityChart
                series={[
                  { context: { cellLine: 'Target Context', mutations: [data.variant.change] }, score: data.variant.confidence },
                  { context: { cellLine: 'Control Context', mutations: [] }, score: Math.max(0.1, data.variant.confidence - 0.6) }
                ]}
              />
            </div>
          );
        default:
          return <div className="text-slate-400">Component visualization</div>;
      }
    };

    return (
      <div className="space-y-6">
        {/* Demo Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
              {scenarioData.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={playDemo}
                disabled={isPlaying}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {isPlaying ? 'Running...' : '▶ Run Demo'}
              </button>
              <button
                onClick={resetDemo}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-slate-400">{scenarioData.variant}</span>
            <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
            <span className="text-slate-300">{scenarioData.description}</span>
          </div>
          
          {/* Problem vs Solution - Only show after demo starts */}
          {hasStarted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto animate-in slide-in-from-top-4 duration-500">
              <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                <div className="text-red-300 font-medium mb-2">❌ Traditional Approach</div>
                <div className="text-red-200 text-sm">{scenarioData.problem}</div>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                <div className="text-green-300 font-medium mb-2">✅ Oracle Solution</div>
                <div className="text-green-200 text-sm">{scenarioData.solution}</div>
              </div>
            </div>
          )}
        </div>

        {/* API Steps */}
        <div className="space-y-4">
          {scenarioData.steps.map((step, index) => {
            const color = getEndpointColor(step.endpoint);
            const colorClasses = getColorClasses(color);
            const isActive = index <= currentStep;
            const isCurrentStep = index === currentStep;

            return (
              <div
                key={index}
                className={`p-6 border rounded-xl transition-all duration-500 ${
                  isActive 
                    ? `${colorClasses.light} ${colorClasses.border}/50 border-2` 
                    : 'bg-slate-800/30 border-slate-700'
                } ${isCurrentStep ? 'ring-2 ring-cyan-400/50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${colorClasses.bg}/20 border ${colorClasses.border}/30`}>
                    <span className="text-xl">
                      {step.endpoint === 'predict_variant_impact' && '🎯'}
                      {step.endpoint === 'predict_gene_essentiality' && '🧬'}
                      {step.endpoint === 'predict_crispr_spacer_efficacy' && '✂️'}
                      {step.endpoint === 'predict_chromatin_accessibility' && '🧭'}
                      {step.endpoint === 'predict_protein_functionality_change' && '🔬'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className={`font-semibold ${colorClasses.text} ${getTextSize('text-lg')}`}>
                        {step.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded ${colorClasses.bg}/20 ${colorClasses.text}`}>
                        /{step.endpoint}
                      </span>
                      {isActive && (
                        <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded">
                          ✓ Complete
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        {/* Input */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                            <h5 className="text-sm font-medium text-slate-300 mb-2">Input</h5>
                            <div className="space-y-1 text-xs text-slate-400 font-mono">
                              {Object.entries(step.input).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-slate-500">{key}:</span> {Array.isArray(value) ? value.join(', ') : String(value)}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                            <h5 className="text-sm font-medium text-slate-300 mb-2">Result</h5>
                            <div className="space-y-1 text-xs text-slate-400 font-mono">
                              {Object.entries(step.result).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-slate-500">{key}:</span> 
                                  <span className={`ml-1 ${typeof value === 'number' && value > 0.8 ? 'text-green-400' : 'text-slate-300'}`}>
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
                          <div className={`text-sm ${colorClasses.text} leading-relaxed`}>
                            {step.explanation}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Oracle's Thinking Process - Beautiful Cards */}
        {showOracleThinking && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <h4 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                🧠 Oracle's Thinking Process
              </h4>
              <p className={`text-slate-300 max-w-3xl mx-auto ${getTextSize('text-base')}`}>
                Watch how Oracle analyzes this {scenarioData.title.toLowerCase()} with multi-modal biological insights
              </p>
            </div>

            {/* Thinking Steps with Beautiful Components */}
            <div className="space-y-8">
              {['OracleExplainTrack', 'VariantDetailCard', 'ProteinDeltaCard', 'EssentialityChart'].map((componentName, index) => (
                <div key={componentName}>
                  {renderThinkingComponent(componentName, index)}
                </div>
              ))}
            </div>

            {/* Final Verdict Card */}
            {thinkingStep >= 3 && (
              <div className="p-8 bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-700/50 rounded-2xl animate-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-6">
                  <h4 className={`font-bold text-green-300 ${getTextSize('text-2xl')}`}>
                    ✅ {scenarioData.summary.verdict}
                  </h4>
                  <div className="max-w-2xl mx-auto">
                    <div className={`text-green-200 ${getTextSize('text-lg')} leading-relaxed`}>
                      {scenarioData.summary.clinicalAction}
                    </div>
                    <div className={`text-green-300 mt-4 ${getTextSize('text-base')}`}>
                      Confidence: {(scenarioData.summary.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return <div className="text-red-400">Invalid demo configuration</div>;
};

export default FactoryDemoShowcase; 