import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAISampleData } from '../../../data/discriminativeAISampleData';

interface InteractiveDemoShowcaseProps {
  selectedDemo?: string;
}

const InteractiveDemoShowcase: React.FC<InteractiveDemoShowcaseProps> = ({
  selectedDemo = 'brca1Analysis'
}) => {
  const { getTextSize } = useAccessibility();
  const [activeDemo, setActiveDemo] = useState(selectedDemo);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = discriminativeAISampleData.interactiveDemos;
  const currentDemo = demos[activeDemo as keyof typeof demos];

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
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentDemo.steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(demos).map(([key, demo]) => (
          <button
            key={key}
            onClick={() => {
              setActiveDemo(key);
              resetDemo();
            }}
            className={`px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
              activeDemo === key 
                ? 'bg-cyan-600 border-transparent text-white' 
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="text-left">
              <div className={`font-semibold ${getTextSize('text-base')}`}>
                {demo.title}
              </div>
              <div className={`text-sm opacity-80 ${getTextSize('text-sm')}`}>
                {demo.description}
              </div>
              <div className={`text-xs opacity-60 mt-1 ${getTextSize('text-xs')}`}>
                {'gene' in demo ? demo.gene : demo.variant}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Demo Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={playDemo}
          disabled={isPlaying}
          className={`px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
        >
          {isPlaying ? '▶️ Playing...' : '▶️ Play Demo'}
        </button>
        <button
          onClick={resetDemo}
          className={`px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-colors ${getTextSize('text-base')}`}
        >
          🔄 Reset
        </button>
      </div>

      {/* Demo Visualization */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
        <div className="space-y-8">
          {/* Demo Header */}
          <div className="text-center space-y-4">
            <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
              {currentDemo.title}
            </h3>
            <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
              {currentDemo.description}
            </p>
            <div className={`text-cyan-400 font-mono ${getTextSize('text-xl')}`}>
              {'gene' in currentDemo ? `Target: ${currentDemo.gene}` : `Variant: ${currentDemo.variant}`}
            </div>
            {'context' in currentDemo && (
              <div className={`text-slate-400 ${getTextSize('text-base')}`}>
                Context: {currentDemo.context}
              </div>
            )}
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center space-x-4">
            {currentDemo.steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const colors = getColorClasses(getEndpointColor(step.endpoint));
              
              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                      isActive 
                        ? `${colors.bg} border-transparent text-white scale-110` 
                        : isCompleted
                        ? `${colors.bg} border-transparent text-white`
                        : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < currentDemo.steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                      isCompleted ? colors.bg : 'bg-slate-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Details - LEFT TO RIGHT FLOW */}
          {currentStep < currentDemo.steps.length && (
            <div className="space-y-8">
              {/* Current Step Only */}
              <div className="p-8 rounded-xl border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      <div className={`w-12 h-12 ${getColorClasses(getEndpointColor(currentDemo.steps[currentStep].endpoint)).bg} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {currentStep + 1}
                      </div>
                      <div className="text-left">
                        <h4 className={`font-bold text-white ${getTextSize('text-2xl')}`}>
                          {currentDemo.steps[currentStep].title}
                        </h4>
                        <p className={`text-cyan-400 font-mono ${getTextSize('text-base')}`}>
                          /{currentDemo.steps[currentStep].endpoint}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LEFT TO RIGHT: Input → Processing → Output */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* LEFT: Input */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <h5 className={`font-bold text-blue-400 ${getTextSize('text-lg')} mb-3`}>
                          📥 Input Parameters
                        </h5>
                      </div>
                      <div className="bg-slate-800/80 border border-blue-500/30 rounded-xl p-4">
                        <pre className={`text-slate-300 ${getTextSize('text-sm')} font-mono leading-relaxed`}>
                          {JSON.stringify(currentDemo.steps[currentStep].input, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* CENTER: Processing Animation */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-center">
                        <h5 className={`font-bold text-purple-400 ${getTextSize('text-lg')} mb-3`}>
                          🧠 AI Processing
                        </h5>
                      </div>
                      {isPlaying ? (
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                          <div className={`text-purple-400 font-semibold ${getTextSize('text-base')} animate-pulse`}>
                            Analyzing...
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 border-4 border-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-slate-400 text-2xl">⚡</span>
                          </div>
                          <div className={`text-slate-400 ${getTextSize('text-base')}`}>
                            Ready to analyze
                          </div>
                        </div>
                      )}
                      {/* Arrow indicators */}
                      <div className="hidden lg:flex absolute left-1/3 transform -translate-x-1/2">
                        <div className="text-cyan-400 text-2xl">→</div>
                      </div>
                      <div className="hidden lg:flex absolute right-1/3 transform translate-x-1/2">
                        <div className="text-cyan-400 text-2xl">→</div>
                      </div>
                    </div>

                    {/* RIGHT: Output (Only show if step is completed or not playing) */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <h5 className={`font-bold text-green-400 ${getTextSize('text-lg')} mb-3`}>
                          📤 Prediction Results
                        </h5>
                      </div>
                      {(currentStep < currentDemo.steps.length && !isPlaying) || currentStep === currentDemo.steps.length - 1 ? (
                        <div className="bg-slate-800/80 border border-green-500/30 rounded-xl p-4">
                          <div className="space-y-3">
                            {Object.entries(currentDemo.steps[currentStep].result).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className={`text-slate-400 ${getTextSize('text-sm')}`}>
                                  {key}:
                                </span>
                                <span className={`text-green-400 font-mono font-bold ${getTextSize('text-sm')}`}>
                                  {typeof value === 'number' ? value.toFixed(3) : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4 flex items-center justify-center h-32">
                          <div className={`text-slate-500 ${getTextSize('text-base')} text-center`}>
                            {isPlaying ? (
                              <div className="space-y-2">
                                <div className="animate-pulse">🔄 Computing...</div>
                                <div className="text-xs">Results will appear here</div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div>⏳ Awaiting analysis</div>
                                <div className="text-xs">Click Play Demo to start</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM: Explanation (Only show after step completion) */}
                  {(currentStep < currentDemo.steps.length && !isPlaying) || currentStep === currentDemo.steps.length - 1 ? (
                    <div className={`p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-600/30 rounded-xl`}>
                      <p className={`text-slate-200 ${getTextSize('text-base')} text-center`}>
                        💡 <strong>AI Insight:</strong> {currentDemo.steps[currentStep].explanation}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Completed Steps Summary (Only show previous steps, not current) */}
              {currentStep > 0 && (
                <div className="space-y-4">
                  <h4 className={`font-bold text-slate-300 ${getTextSize('text-lg')} text-center`}>
                    📋 Completed Analysis Steps
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentDemo.steps.slice(0, currentStep).map((step, index) => {
                      const colors = getColorClasses(getEndpointColor(step.endpoint));
                      return (
                        <div key={index} className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-6 h-6 ${colors.bg} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                              ✓
                            </div>
                            <div className={`font-semibold text-slate-200 ${getTextSize('text-sm')}`}>
                              {step.title}
                            </div>
                          </div>
                          <div className={`text-slate-400 ${getTextSize('text-xs')} font-mono`}>
                            {step.endpoint}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Demo Summary */}
          {currentStep >= currentDemo.steps.length - 1 && (
            <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-600/50 rounded-xl p-6">
              <h4 className={`font-bold text-white mb-4 ${getTextSize('text-xl')}`}>
                🎯 Analysis Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Final Verdict:</span>
                    <span className={`font-bold text-cyan-400 ${getTextSize('text-base')}`}>
                      {currentDemo.summary.verdict}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Confidence:</span>
                    <span className={`font-bold text-green-400 ${getTextSize('text-base')}`}>
                      {(currentDemo.summary.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-300 ${getTextSize('text-base')}`}>Clinical Action:</span>
                    <span className={`font-bold text-orange-400 ${getTextSize('text-base')}`}>
                      {currentDemo.summary.clinicalAction}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>
                    Therapeutic Options:
                  </h5>
                  <ul className="space-y-1">
                    {currentDemo.summary.therapeuticOptions.map((option, i) => (
                      <li key={i} className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        • {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemoShowcase; 