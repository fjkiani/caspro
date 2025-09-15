import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { ChevronRight, X, Play, CheckCircle, Clock, Zap, Activity, Target, Dna, Scissors, ShieldCheck, Info } from 'lucide-react';

interface AnalysisStep {
  id: string;
  name: string;
  endpoint: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'running' | 'pending';
  color: string;
  duration: string;
  inputData: any;
  processingSteps: {
    name: string;
    description: string;
    duration: number;
    details: string[];
  }[];
  outputData: any;
  insights: string[];
  evidence?: {
    conservation?: number;
    saeTags?: string[];
    domainHits?: string[];
    motifHits?: string[];
    notes?: string[];
    benchmarks?: string[];
  };
  provenance?: 'evo2-core' | 'tier2-augmented' | 'simulated';
}

interface InteractiveAnalysisPipelineProps {
  variant: string;
  steps: AnalysisStep[];
  currentStep?: number;
}

const StepDetailModal = ({ step, onClose }: { step: AnalysisStep; onClose: () => void }) => {
  const { getTextSize } = useAccessibility();
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-${step.color}-600 rounded-xl flex items-center justify-center`}>
              {React.createElement(step.icon, { className: "w-6 h-6 text-white" })}
            </div>
            <div>
              <h3 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-2xl')}`}>
                {step.name}
              </h3>
              <p className={`text-slate-600 dark:text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                {step.endpoint}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Why It Matters */}
          <div>
            <h4 className={`font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 ${getTextSize('text-lg')}`}>
              <Info className="w-5 h-5" /> Why this step matters
            </h4>
            <ul className="space-y-2">
              {step.insights.map((line, i) => (
                <li key={i} className={`text-slate-700 dark:text-slate-300 ${getTextSize('text-sm')}`}>• {line}</li>
              ))}
            </ul>
          </div>

          {/* Evidence */}
          {step.evidence && (
            <div>
              <h4 className={`font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2 ${getTextSize('text-lg')}`}>
                <ShieldCheck className="w-5 h-5" /> Evidence
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {typeof step.evidence.conservation === 'number' && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Conservation (proxy)</div>
                    <div className={`font-semibold ${getTextSize('text-base')}`}>{(step.evidence.conservation * 100).toFixed(0)}%</div>
                  </div>
                )}
                {step.evidence.domainHits && step.evidence.domainHits.length > 0 && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Domain hits</div>
                    <div className={`font-semibold ${getTextSize('text-sm')}`}>{step.evidence.domainHits.join(', ')}</div>
                  </div>
                )}
                {step.evidence.motifHits && step.evidence.motifHits.length > 0 && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Motif hits</div>
                    <div className={`font-semibold ${getTextSize('text-sm')}`}>{step.evidence.motifHits.join(', ')}</div>
                  </div>
                )}
                {step.evidence.saeTags && step.evidence.saeTags.length > 0 && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className={`text-slate-500 ${getTextSize('text-xs')}`}>SAE tags</div>
                    <div className={`font-semibold ${getTextSize('text-sm')}`}>{step.evidence.saeTags.join(', ')}</div>
                  </div>
                )}
              </div>

              {(step.evidence.notes || step.evidence.benchmarks)?.length ? (
                <div className="mt-3 space-y-1">
                  {[...(step.evidence.notes ?? []), ...(step.evidence.benchmarks ?? [])].map((n, i) => (
                    <div key={i} className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-xs')}`}>– {n}</div>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {/* Input Parameters */}
          <div>
            <h4 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
              📥 Input Parameters
            </h4>
            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <pre className={`text-slate-700 dark:text-slate-300 font-mono ${getTextSize('text-sm')}`}>
                {JSON.stringify(step.inputData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Processing Steps */}
          <div>
            <h4 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
              ⚡ Processing Pipeline
            </h4>
            <div className="space-y-4">
              {step.processingSteps.map((processStep, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold text-slate-900 dark:text-white ${getTextSize('text-base')}`}>
                      {processStep.name}
                    </h5>
                    <span className={`text-${step.color}-600 font-mono ${getTextSize('text-sm')}`}>
                      {processStep.duration}ms
                    </span>
                  </div>
                  <p className={`text-slate-600 dark:text-slate-400 mb-3 ${getTextSize('text-sm')}`}>
                    {processStep.description}
                  </p>
                  <div className="space-y-1">
                    {processStep.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-xs')}`}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output Results */}
          <div>
            <h4 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
              📤 Output Results
            </h4>
            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <pre className={`text-slate-700 dark:text-slate-300 font-mono ${getTextSize('text-sm')}`}>
                {JSON.stringify(step.outputData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Provenance */}
          {step.provenance && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className={`text-slate-500 ${getTextSize('text-xs')}`}>Provenance</div>
              <div className={`font-semibold capitalize ${getTextSize('text-sm')}`}>{step.provenance.replace('-', ' ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InteractiveAnalysisPipeline: React.FC<InteractiveAnalysisPipelineProps> = ({
  variant,
  steps,
  currentStep = -1
}) => {
  const { getTextSize } = useAccessibility();
  const [selectedStep, setSelectedStep] = useState<AnalysisStep | null>(null);

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Play className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-slate-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-600',
      red: 'bg-red-600',
      orange: 'bg-orange-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      yellow: 'bg-yellow-600'
    };
    return colorMap[color] || 'bg-slate-600';
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <div className="text-center">
        <h3 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-2xl')} mb-2`}>
          Variant: {variant}
        </h3>
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                index <= currentStep ? `bg-${step.color}-600` : 'bg-slate-400'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < currentStep ? `bg-${steps[index + 1].color}-600` : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Display */}
      {currentStep >= 0 && currentStep < steps.length && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-4">
                          <div className={`w-16 h-16 bg-${steps[currentStep].color}-600 rounded-xl flex items-center justify-center`}>
                {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
            <div>
              <h4 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-xl')}`}>
                {steps[currentStep].name}
              </h4>
              <p className={`text-slate-600 dark:text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                {steps[currentStep].endpoint}
              </p>
            </div>
          </div>

          {/* Live processing visualization would go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className={`font-semibold text-slate-900 dark:text-white mb-2 ${getTextSize('text-base')}`}>
                🔄 Input Parameters
              </h5>
              <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-center py-4">
                  <Activity className="w-8 h-8 text-blue-500 mx-auto animate-pulse" />
                  <p className={`text-slate-600 dark:text-slate-400 mt-2 ${getTextSize('text-sm')}`}>
                    Ready to analyze
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h5 className={`font-semibold text-slate-900 dark:text-white mb-2 ${getTextSize('text-base')}`}>
                🧠 AI Processing
              </h5>
              <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-center py-4">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto animate-pulse" />
                  <p className={`text-slate-600 dark:text-slate-400 mt-2 ${getTextSize('text-sm')}`}>
                    Processing...
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h5 className={`font-semibold text-slate-900 dark:text-white mb-2 ${getTextSize('text-base')}`}>
                📊 Prediction Results
              </h5>
              <div className="bg-white dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-sm')}`}>
                      accessibility:
                    </span>
                    <span className={`font-bold ${getTextSize('text-sm')}`}>0.820</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-sm')}`}>
                      state:
                    </span>
                    <span className={`font-bold ${getTextSize('text-sm')}`}>Open_Chromatin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-sm')}`}>
                      tissueSpecificity:
                    </span>
                    <span className={`font-bold ${getTextSize('text-sm')}`}>0.910</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className={`font-semibold text-blue-800 dark:text-blue-200 ${getTextSize('text-sm')}`}>
                AI Insight:
              </span>
            </div>
            <p className={`text-blue-800 dark:text-blue-200 mt-1 ${getTextSize('text-sm')}`}>
              Variant in accessible chromatin region, high tissue relevance
            </p>
          </div>
        </div>
      )}

      {/* Completed Analysis Steps */}
      <div>
        <h4 className={`font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 ${getTextSize('text-lg')}`}>
          📋 Completed Analysis Steps
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.filter(step => step.status === 'completed').map((step) => (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 text-left group hover:shadow-lg"
            >
                             <div className={`w-12 h-12 bg-${step.color}-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                 {React.createElement(step.icon, { className: "w-6 h-6 text-white" })}
               </div>
              <div className="flex-1">
                <h5 className={`font-semibold text-slate-900 dark:text-white ${getTextSize('text-base')}`}>
                  {step.name}
                </h5>
                <p className={`text-slate-600 dark:text-slate-400 font-mono ${getTextSize('text-xs')}`}>
                  {step.endpoint}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStepStatusIcon(step.status)}
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step Detail Modal */}
      {selectedStep && (
        <StepDetailModal 
          step={selectedStep} 
          onClose={() => setSelectedStep(null)} 
        />
      )}
    </div>
  );
};

export default InteractiveAnalysisPipeline; 