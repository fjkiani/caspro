'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Database, Zap, Brain, Code, FileText, Server, Sparkles, AlertTriangle } from 'lucide-react';
import { ScenarioQuestion } from '@/data/comparisons/patient-scenarios';

interface ThinkingProcessComparisonProps {
  question: ScenarioQuestion;
  onClose?: () => void;
}

interface ThinkingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  duration: number;
}

// GPT Thinking Steps - Generic pattern matching
const getGPTThinkingSteps = (question: ScenarioQuestion): ThinkingStep[] => {
  // VUS-specific GPT steps
  if (question.category === 'vus') {
    return [
      {
        id: 'parse-question',
        title: 'Parse Question',
        description: 'Analyze question text for keywords: "RAD51C", "variant", "significance"',
        icon: <FileText className="w-5 h-5" />,
        color: 'yellow',
        duration: 800
      },
      {
        id: 'search-training',
        title: 'Search Training Data',
        description: 'Match RAD51C patterns from training corpus (general gene info, no patient-specific context)',
        icon: <Database className="w-5 h-5" />,
        color: 'yellow',
        duration: 1200
      },
      {
        id: 'generate-generic',
        title: 'Generate Generic Response',
        description: 'Produce text: "RAD51C is involved in DNA repair... variants may increase cancer risk..." (same for all patients)',
        icon: <Brain className="w-5 h-5" />,
        color: 'yellow',
        duration: 1000
      },
      {
        id: 'no-vus-capabilities',
        title: 'No VUS Capabilities',
        description: 'No ClinVar index, no Evo2 API, no axis inference, no pathway relevance, no provenance receipts',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'red',
        duration: 600
      }
    ];
  }

  // Default toxicity steps
  return [
    {
      id: 'parse-question',
      title: 'Parse Question',
      description: 'Analyze question text for keywords: "carboplatin", "BRCA1", "side effects"',
      icon: <FileText className="w-5 h-5" />,
      color: 'yellow',
      duration: 800
    },
    {
      id: 'search-training',
      title: 'Search Training Data',
      description: 'Match patterns from training corpus (general medical knowledge, no patient-specific data)',
      icon: <Database className="w-5 h-5" />,
      color: 'yellow',
      duration: 1200
    },
    {
      id: 'generate-response',
      title: 'Generate Generic Response',
      description: 'Produce text based on learned patterns: "Stay hydrated, eat protein, fruits and vegetables"',
      icon: <Brain className="w-5 h-5" />,
      color: 'yellow',
      duration: 1000
    },
    {
      id: 'no-validation',
      title: 'No Validation',
      description: 'No API calls, no patient data access, no pathway analysis - generic advice only',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'red',
      duration: 600
    }
  ];
};

// CrisPRO Thinking Steps - Live API calls and pathway analysis
const getCrisPROThinkingSteps = (question: ScenarioQuestion): ThinkingStep[] => {
  const baseSteps: ThinkingStep[] = [
    {
      id: 'parse-context',
      title: 'Parse Patient Context',
      description: 'Extract variant, drug, and patient-specific information from question',
      icon: <FileText className="w-5 h-5" />,
      color: 'blue',
      duration: 600
    },
    {
      id: 'api-toxicity-risk',
      title: 'API: Toxicity Risk Assessment',
      description: 'Call /api/safety/toxicity_risk with BRCA1 variant → Calculate risk score: 1.0 (HIGH)',
      icon: <Server className="w-5 h-5" />,
      color: 'blue',
      duration: 1500
    },
    {
      id: 'pathway-analysis',
      title: 'Pathway Overlap Analysis',
      description: 'Compute pathway overlap: BRCA1 + platinum → BER pathway stress → DNA repair overload',
      icon: <Code className="w-5 h-5" />,
      color: 'purple',
      duration: 1200
    },
    {
      id: 'sae-features',
      title: 'SAE Feature Detection',
      description: 'Activate 32,768 SAE features → Identify BER pathway elements (APEX1, POLB) → Map to toxicity',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'indigo',
      duration: 1000
    },
    {
      id: 'mitigating-foods',
      title: 'Get Mitigating Foods',
      description: 'Query food database: Pathway overlap → NAC (600mg), Vitamin D (5000 IU), Folate (400-800mcg)',
      icon: <Zap className="w-5 h-5" />,
      color: 'green',
      duration: 1000
    },
    {
      id: 'evidence-citation',
      title: 'Evidence & Citations',
      description: 'Retrieve evidence tiers, citations (De Flora 2001, Sanders 2018) → MODERATE evidence tier',
      icon: <Database className="w-5 h-5" />,
      color: 'green',
      duration: 800
    },
    {
      id: 'structured-output',
      title: 'Structured Response',
      description: 'Format response: Risk score + specific dosages + mechanisms + timing + evidence',
      icon: <Brain className="w-5 h-5" />,
      color: 'blue',
      duration: 600
    }
  ];

  // VUS-specific thinking steps
  if (question.category === 'vus') {
    return [
      {
        id: 'parse-variant-context',
        title: 'Parse Variant & Patient Context',
        description: 'Extract variant coordinates, patient mutations (MBD4, TP53) → Identify patient axis',
        icon: <FileText className="w-5 h-5" />,
        color: 'blue',
        duration: 600
      },
      {
        id: 'api-clinvar',
        title: 'API: ClinVar Lookup',
        description: 'Call /api/vus/identify → ClinVar query → Check classification status (Pathogenic/Uncertain/VUS)',
        icon: <Server className="w-5 h-5" />,
        color: 'blue',
        duration: 1200
      },
      {
        id: 'api-evo2-ml',
        title: 'API: Evo2 ML Resolution',
        description: 'If ClinVar uncertain → Evo2 API call → Compute min_delta score → ML resolution (likely damaging/benign/inconclusive)',
        icon: <Brain className="w-5 h-5" />,
        color: 'purple',
        duration: 1500
      },
      {
        id: 'axis-inference',
        title: 'Axis Inference',
        description: 'Detect patient axis: MBD4 + TP53 → DDR axis (DNA Damage Response) → Map variant pathway (RAD51C → DDR)',
        icon: <Code className="w-5 h-5" />,
        color: 'indigo',
        duration: 1000
      },
      {
        id: 'pathway-relevance',
        title: 'Pathway Relevance Calculation',
        description: 'Calculate variant→patient relevance: DDR variant + DDR patient → HIGH relevance (vs MAPK patient → LOW)',
        icon: <Sparkles className="w-5 h-5" />,
        color: 'purple',
        duration: 1000
      },
      {
        id: 'provenance-tracking',
        title: 'Provenance Tracking',
        description: 'Log all API calls → Generate run_id → Store receipts (ClinVar: ok, Evo2: ok, status codes, response times)',
        icon: <Database className="w-5 h-5" />,
        color: 'green',
        duration: 800
      },
      {
        id: 'next-actions-routing',
        title: 'Next Actions Routing',
        description: 'Route by pathway relevance: HIGH → WIWFM, DDR trials, dossier | LOW → Lower priority monitoring',
        icon: <Zap className="w-5 h-5" />,
        color: 'green',
        duration: 700
      },
      {
        id: 'structured-vus-output',
        title: 'Structured VUS Artifact',
        description: 'Format unified output: resolution_path (prior/evo2/still_vus) + verdict + pathway_relevance + next_actions + provenance',
        icon: <Brain className="w-5 h-5" />,
        color: 'blue',
        duration: 600
      }
    ];
  }

  // Customize steps based on question category
  if (question.category === 'toxicity' && question.id.includes('mbd4')) {
    baseSteps[1].description = 'Call /api/safety/toxicity_risk with MBD4 variant → BER pathway deficiency';
    baseSteps[2].description = 'Pathway analysis: MBD4 homozygous loss → BER deficiency → C>T hypermutator phenotype';
    baseSteps[4].description = 'Query supplements: NAC (600mg), Folate (400-800mcg), B12 (1000mcg)';
  }

  if (question.id.includes('mechanism')) {
    baseSteps.splice(2, 0, {
      id: 'mechanism-mapping',
      title: 'Mechanism Pathway Mapping',
      description: 'Map NAC → Cysteine → GSH → APEX1 → BER → Reduced toxicity (5-step pathway)',
      icon: <Code className="w-5 h-5" />,
      color: 'purple',
      duration: 1500
    });
  }

  // Customize for specific VUS questions (already handled above in VUS-specific return)
  // This code won't be reached for VUS questions since we return early

  return baseSteps;
};

const ThinkingProcessComparison: React.FC<ThinkingProcessComparisonProps> = ({ question, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gptStep, setGptStep] = useState(0);
  const [crisproStep, setCrisproStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const gptSteps = getGPTThinkingSteps(question);
  const crisproSteps = getCrisPROThinkingSteps(question);

  const startThinking = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setGptStep(0);
    setCrisproStep(0);

    // Play GPT steps first (faster)
    let gptTimeout: NodeJS.Timeout;
    let crisproTimeout: NodeJS.Timeout;
    let gptIndex = 0;
    let crisproIndex = 0;
    let gptElapsed = 0;
    let crisproElapsed = 0;

    const playGptStep = () => {
      if (gptIndex < gptSteps.length) {
        setGptStep(gptIndex);
        gptElapsed += gptSteps[gptIndex].duration;
        gptIndex++;
        gptTimeout = setTimeout(playGptStep, gptSteps[gptIndex - 1]?.duration || 0);
      }
    };

    const playCrisproStep = () => {
      if (crisproIndex < crisproSteps.length) {
        setCrisproStep(crisproIndex);
        crisproElapsed += crisproSteps[crisproIndex].duration;
        crisproIndex++;
        crisproTimeout = setTimeout(playCrisproStep, crisproSteps[crisproIndex - 1]?.duration || 0);
      } else {
        setIsPlaying(false);
      }
    };

    // Start both processes
    playGptStep();
    // CrisPRO starts slightly after GPT (showing it's more thorough)
    setTimeout(playCrisproStep, 300);
  };

  const pauseThinking = () => {
    setIsPlaying(false);
  };

  const resetThinking = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setGptStep(0);
    setCrisproStep(0);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; light: string }> = {
      yellow: { bg: 'bg-yellow-600', border: 'border-yellow-500', text: 'text-yellow-400', light: 'bg-yellow-900/20' },
      blue: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-400', light: 'bg-blue-900/20' },
      purple: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-400', light: 'bg-purple-900/20' },
      indigo: { bg: 'bg-indigo-600', border: 'border-indigo-500', text: 'text-indigo-400', light: 'bg-indigo-900/20' },
      green: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-400', light: 'bg-green-900/20' },
      red: { bg: 'bg-red-600', border: 'border-red-500', text: 'text-red-400', light: 'bg-red-900/20' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              🧠 How Both Systems Think
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              See the difference in reasoning processes
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!hasStarted ? (
              <button
                onClick={startThinking}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Comparison
              </button>
            ) : (
              <>
                {isPlaying ? (
                  <button
                    onClick={pauseThinking}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={startThinking}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </button>
                )}
                <button
                  onClick={resetThinking}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPT Thinking Process */}
            <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border-2 border-yellow-200 dark:border-yellow-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">GPT/ChatGPT</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Generic Pattern Matching</p>
                </div>
              </div>

              <div className="space-y-3">
                {gptSteps.map((step, idx) => {
                  const isActive = idx === gptStep && hasStarted;
                  const isCompleted = idx < gptStep;
                  const colors = getColorClasses(step.color);

                  return (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        opacity: isActive || isCompleted ? 1 : 0.4,
                        scale: isActive ? 1.02 : 1
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? `${colors.border} ${colors.light} shadow-lg`
                          : isCompleted
                          ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${colors.bg} rounded-lg p-2 ${isActive ? 'animate-pulse' : ''}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                              {step.title}
                            </h4>
                            {isActive && (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-2 h-2 bg-yellow-600 rounded-full"
                              />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Result:</strong> Generic advice without patient-specific analysis
                </div>
              </div>
            </div>

            {/* CrisPRO Thinking Process */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl border-2 border-blue-300 dark:border-blue-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">CrisPRO.ai</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Live APIs + Pathway Analysis</p>
                </div>
              </div>

              <div className="space-y-3">
                {crisproSteps.map((step, idx) => {
                  const isActive = idx === crisproStep && hasStarted;
                  const isCompleted = idx < crisproStep;
                  const colors = getColorClasses(step.color || 'blue');

                  return (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        opacity: isActive || isCompleted ? 1 : 0.4,
                        scale: isActive ? 1.02 : 1
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? `${colors.border} ${colors.light} shadow-lg ring-2 ring-blue-200`
                          : isCompleted
                          ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${colors.bg} rounded-lg p-2 ${isActive ? 'animate-pulse' : ''}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                              {step.title}
                            </h4>
                            {isActive && (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-2 h-2 bg-blue-600 rounded-full"
                              />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Result:</strong> Personalized, evidence-backed recommendations with specific dosages
                </div>
              </div>
            </div>
          </div>

          {/* Key Difference Summary */}
          {hasStarted && gptStep >= gptSteps.length - 1 && crisproStep >= crisproSteps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">
                💎 Key Difference: Why CrisPRO Wins
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-red-600 dark:text-red-400 mb-2">GPT Limitations:</div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• No patient-specific data access</li>
                    <li>• No live API calls</li>
                    <li>• No pathway analysis</li>
                    <li>• Generic pattern matching only</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">CrisPRO Advantages:</div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Live API integration</li>
                    <li>• Pathway-specific analysis</li>
                    <li>• SAE feature detection (32,768 concepts)</li>
                    <li>• Evidence-backed with citations</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ThinkingProcessComparison;

