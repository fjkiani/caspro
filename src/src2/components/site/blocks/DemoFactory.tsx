import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { Play, Pause, RotateCcw, ChevronRight, Activity, Target, Dna, Scissors, Zap, ShieldCheck } from 'lucide-react';
import EnhancedDossierSummary from './EnhancedDossierSummary';
import { getDossierByAPI } from '../../../data/dossierSummaries';

interface APIDemo {
  id: string;
  name: string;
  endpoint: string;
  icon: React.ReactNode | string;
  color: string;
  description: string;
  capabilities: string[];
  useCases: {
    title: string;
    description: string;
    examples: string[];
  }[];
  simulation: {
    input: any;
    steps: {
      title: string;
      description: string;
      duration: number;
      output?: any;
    }[];
    finalOutput: any;
  };
}

// Default discriminative APIs for Oracle page
const discriminativeAPIs: APIDemo[] = [
  {
    id: 'variant_impact',
    name: 'Predict Variant Impact',
    endpoint: '/predict_variant_impact',
    icon: <Target className="w-6 h-6" />,
    color: 'blue',
    description: 'Zero-shot pathogenicity prediction for coding and non-coding variants',
    capabilities: ['Zero-shot prediction', 'Multi-modal scoring'],
    useCases: [
      {
        title: 'Clinical Interpretation',
        description: 'Classify VUS and rare variants',
        examples: ['BRCA1 missense variants', 'Non-coding regulatory variants']
      }
    ],
    simulation: {
      input: { variant: 'chr17:43044295:A>T', gene: 'BRCA1' },
      steps: [
        { title: 'Sequence Context', description: 'Loading genomic context', duration: 800 },
        { title: 'Multi-modal Analysis', description: 'Analyzing variant impact', duration: 1200 }
      ],
      finalOutput: { pathogenicity: 0.89, confidence: 0.94, classification: 'Likely Pathogenic' }
    }
  },
  {
    id: 'gene_essentiality',
    name: 'Predict Gene Essentiality',
    endpoint: '/predict_gene_essentiality',
    icon: <Dna className="w-6 h-6" />,
    color: 'green',
    description: 'Context-aware prediction of gene importance for cell survival',
    capabilities: ['Cell-type specific', 'Tissue context'],
    useCases: [
      {
        title: 'Drug Target Discovery',
        description: 'Identify essential genes in cancer vs normal',
        examples: ['Oncogene dependencies', 'Synthetic lethality']
      }
    ],
    simulation: {
      input: { gene: 'BRCA1', cell_type: 'MCF7', context: 'cancer' },
      steps: [
        { title: 'Context Loading', description: 'Loading cell-type context', duration: 900 },
        { title: 'Essentiality Scoring', description: 'Computing essentiality score', duration: 1100 }
      ],
      finalOutput: { essentiality_score: 0.76, context_specificity: 0.82, confidence: 0.91 }
    }
  },
  {
    id: 'crispr_efficacy',
    name: 'Predict CRISPR Spacer Efficacy',
    endpoint: '/predict_crispr_spacer_efficacy',
    icon: <Scissors className="w-6 h-6" />,
    color: 'purple',
    description: 'Predict guide RNA cutting efficiency and specificity',
    capabilities: ['On-target efficacy', 'Off-target prediction'],
    useCases: [
      {
        title: 'Guide Design',
        description: 'Select optimal guides for experiments',
        examples: ['Gene knockout', 'Base editing', 'Prime editing']
      }
    ],
    simulation: {
      input: { guide_sequence: 'GTTCCAGAACCTGAAAGCTG', target: 'BRCA1' },
      steps: [
        { title: 'Guide Analysis', description: 'Analyzing guide properties', duration: 700 },
        { title: 'Efficacy Prediction', description: 'Computing cutting efficiency', duration: 1000 }
      ],
      finalOutput: { efficacy: 0.87, specificity: 0.94, off_target_sites: 2 }
    }
  },
  {
    id: 'chromatin_accessibility',
    name: 'Predict Chromatin Accessibility',
    endpoint: '/predict_chromatin_accessibility',
    icon: <Zap className="w-6 h-6" />,
    color: 'orange',
    description: 'Predict chromatin accessibility and regulatory potential',
    capabilities: ['Cell-type specific', 'Regulatory prediction'],
    useCases: [
      {
        title: 'Regulatory Analysis',
        description: 'Identify accessible regulatory regions',
        examples: ['Enhancer discovery', 'Promoter analysis']
      }
    ],
    simulation: {
      input: { region: 'chr17:43000000-43100000', cell_type: 'MCF7' },
      steps: [
        { title: 'Region Loading', description: 'Loading genomic region', duration: 800 },
        { title: 'Accessibility Prediction', description: 'Predicting chromatin state', duration: 1300 }
      ],
      finalOutput: { accessibility_score: 0.73, regulatory_potential: 0.68, confidence: 0.89 }
    }
  },
  {
    id: 'protein_functional_change',
    name: 'Predict Protein Functional Change',
    endpoint: '/predict_protein_functional_change',
    icon: <Activity className="w-6 h-6" />,
    color: 'cyan',
    description: 'Predict functional impact of protein sequence changes',
    capabilities: ['Structure-function', 'Evolutionary context'],
    useCases: [
      {
        title: 'Protein Engineering',
        description: 'Design functional protein variants',
        examples: ['Enzyme optimization', 'Antibody engineering']
      }
    ],
    simulation: {
      input: { protein: 'BRCA1', mutation: 'L1407P', position: 1407 },
      steps: [
        { title: 'Structure Analysis', description: 'Analyzing protein structure', duration: 1000 },
        { title: 'Function Prediction', description: 'Predicting functional change', duration: 1400 }
      ],
      finalOutput: { functional_impact: 0.82, structural_disruption: 0.76, likelihood: 0.91 }
    }
  }
];

interface DemoFactoryProps {
  selectedAPI?: string;
  onAPISelect?: (apiId: string) => void;
  apiDemos?: APIDemo[];
}

const DemoFactory: React.FC<DemoFactoryProps> = ({ 
  selectedAPI, 
  onAPISelect, 
  apiDemos = discriminativeAPIs 
}) => {
  const { getTextSize } = useAccessibility();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [expandedAPI, setExpandedAPI] = useState<string | null>(selectedAPI || null);
  
  // Auto-select the API if provided
  React.useEffect(() => {
    if (selectedAPI && onAPISelect) {
      onAPISelect(selectedAPI);
    }
  }, [selectedAPI, onAPISelect]);

  // Handle URL hash navigation
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && apiDemos.find(api => api.id === hash)) {
      setExpandedAPI(hash);
      // Auto-scroll to the API after a short delay
      setTimeout(() => {
        const element = document.getElementById(`api-card-${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [apiDemos]);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500' },
      cyan: { bg: 'bg-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const runDemo = async (apiId: string) => {
    const api = apiDemos.find(a => a.id === apiId);
    if (!api) return;

    setActiveDemo(apiId);
    setIsRunning(true);
    setCurrentStep(0);
    setShowResults(false);

    // Auto-scroll to the simulation section
    setTimeout(() => {
      const simulationElement = document.getElementById(`simulation-${apiId}`);
      if (simulationElement) {
        simulationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    // Run through simulation steps
    for (let i = 0; i < api.simulation.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, api.simulation.steps[i].duration));
    }

    setIsRunning(false);
    setShowResults(true);
  };

  const resetDemo = () => {
    setActiveDemo(null);
    setIsRunning(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* API Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiDemos.map((api) => {
          const colors = getColorClasses(api.color);
          const isExpanded = expandedAPI === api.id;
          
          return (
            <div
              key={api.id}
              id={`api-card-${api.id}`}
              className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
                isExpanded ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              {/* API Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                                     <div className={`${colors.bg} rounded-lg p-3 flex-shrink-0`}>
                     {typeof api.icon === 'string' ? (
                       <span className="text-2xl">{api.icon}</span>
                     ) : (
                       api.icon
                     )}
                   </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-slate-900 dark:text-white mb-1 ${getTextSize('text-lg')}`}>
                      {api.name}
                    </h3>
                    <p className={`text-xs font-mono ${colors.text} mb-2`}>
                      {api.endpoint}
                    </p>
                    <p className={`text-slate-600 dark:text-slate-300 ${getTextSize('text-sm')}`}>
                      {api.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mt-4">
                                     <div className={`text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ${getTextSize('text-xs')}`}>
                    Key Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {api.capabilities.map((capability, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300`}
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="p-6">
                <button
                  onClick={() => setExpandedAPI(isExpanded ? null : api.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${getTextSize('text-sm')}`}
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {isExpanded ? 'Hide Details' : 'View Demo'}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Use Cases */}
                    <div>
                      <h4 className={`font-medium text-slate-900 dark:text-white mb-3 ${getTextSize('text-base')}`}>
                        Use Cases & Applications
                      </h4>
                      <div className="space-y-3">
                        {api.useCases.map((useCase, i) => (
                          <div key={i} className="border-l-2 border-slate-200 dark:border-slate-600 pl-4">
                            <h5 className={`font-medium text-slate-800 dark:text-slate-200 ${getTextSize('text-sm')}`}>
                              {useCase.title}
                            </h5>
                            <p className={`text-slate-600 dark:text-slate-400 mt-1 ${getTextSize('text-xs')}`}>
                              {useCase.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {useCase.examples.map((example, j) => (
                                <span
                                  key={j}
                                  className={`px-2 py-0.5 text-xs rounded bg-${api.color}-50 dark:bg-${api.color}-900/20 text-${api.color}-700 dark:text-${api.color}-300`}
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Demo Section */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium text-slate-900 dark:text-white ${getTextSize('text-base')}`}>
                          Interactive Demo
                        </h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => runDemo(api.id)}
                            disabled={isRunning && activeDemo === api.id}
                            className={`px-3 py-1.5 ${colors.bg} text-white rounded-md hover:opacity-90 disabled:opacity-50 flex items-center gap-2 ${getTextSize('text-sm')}`}
                          >
                            {isRunning && activeDemo === api.id ? (
                              <>
                                <Pause className="w-4 h-4" />
                                Running...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Run Demo
                              </>
                            )}
                          </button>
                          {activeDemo === api.id && (
                            <button
                              onClick={resetDemo}
                              className="px-3 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 flex items-center gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Input Preview */}
                      <div className="mb-4">
                        <div className={`text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 ${getTextSize('text-xs')}`}>
                          Input:
                        </div>
                        <pre className={`text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded font-mono text-slate-800 dark:text-slate-200 overflow-x-auto`}>
                          {JSON.stringify(api.simulation.input, null, 2)}
                        </pre>
                      </div>

                      {/* Simulation Steps */}
                      {activeDemo === api.id && (
                        <div id={`simulation-${api.id}`} className="space-y-3">
                          <div className={`text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 ${getTextSize('text-xs')}`}>
                            Processing:
                          </div>
                          {api.simulation.steps.map((step, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-3 p-2 rounded-md ${
                                isRunning && i === currentStep
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                  : i < currentStep || showResults
                                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                  : 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isRunning && i === currentStep
                                  ? 'bg-blue-600 text-white animate-pulse'
                                  : i < currentStep || showResults
                                  ? 'bg-green-600 text-white'
                                  : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                              }`}>
                                {i < currentStep || showResults ? '✓' : i + 1}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium text-slate-900 dark:text-white ${getTextSize('text-sm')}`}>
                                  {step.title}
                                </div>
                                <div className={`text-slate-600 dark:text-slate-400 ${getTextSize('text-xs')}`}>
                                  {step.description}
                                </div>
                              </div>
                              {isRunning && i === currentStep && (
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Results */}
                      {showResults && activeDemo === api.id && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                          <div className={`font-medium text-green-800 dark:text-green-200 mb-2 ${getTextSize('text-sm')}`}>
                            Results:
                          </div>
                          <pre className={`text-xs bg-white dark:bg-slate-800 p-2 rounded font-mono text-slate-800 dark:text-slate-200 overflow-x-auto`}>
                            {JSON.stringify(api.simulation.finalOutput, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Dossier Summary */}
                    {showResults && activeDemo === api.id && (
                      <div className="mt-4">
                                                 {(() => {
                           const dossier = getDossierByAPI(api.id);
                           return dossier ? <EnhancedDossierSummary dossier={dossier} /> : null;
                         })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoFactory; 