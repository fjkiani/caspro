'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, ArrowLeft, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import type { UseCase, UseCaseStepResult } from '@/types/use-case';

interface UseCaseDemoClientProps {
  useCase: UseCase;
}

const UseCaseDemoClient: React.FC<UseCaseDemoClientProps> = ({ useCase }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [results, setResults] = useState<Record<string, UseCaseStepResult>>({});
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const simulateStep = async (stepId: string, input: Record<string, any>): Promise<UseCaseStepResult> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Return simulated result
    return {
      input,
      output: {
        success: true,
        message: `${stepId} completed successfully`,
        data: { result: `Simulated result for ${stepId}` }
      },
      processingSteps: [
        { step: 'Input validation', status: 'completed', duration: '200ms' },
        { step: 'Model inference', status: 'completed', duration: '1.2s' },
        { step: 'Result generation', status: 'completed', duration: '300ms' }
      ],
      insights: [
        `Insight 1 for ${stepId}`,
        `Insight 2 for ${stepId}`
      ],
      provenance: {
        runId: `run_${Date.now()}`,
        model: 'evo2-40b',
        timestamp: new Date().toISOString()
      }
    };
  };

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setResults({});
    const newResults: Record<string, UseCaseStepResult> = {};

    for (let i = 0; i < useCase.steps.length; i++) {
      const step = useCase.steps[i];
      setCurrentStep(i);
      
      const input = step.input({ seed: useCase.seed, outputs: newResults });
      const result = await simulateStep(step.id, input);
      
      newResults[step.id] = result;
      setResults({ ...newResults });
    }

    setIsRunning(false);
    setCurrentStep(useCase.steps.length - 1);
  };

  const getStepStatus = (index: number) => {
    if (currentStep < 0) return 'pending';
    if (index < currentStep) return 'completed';
    if (index === currentStep && isRunning) return 'running';
    if (index === currentStep && !isRunning) return 'completed';
    return 'pending';
  };

  const categoryColors = {
    discriminative: {
      bg: 'from-blue-900/20 to-blue-800/20',
      border: 'border-blue-700/50',
      text: 'text-blue-300',
      badge: 'bg-blue-600',
    },
    generative: {
      bg: 'from-purple-900/20 to-purple-800/20',
      border: 'border-purple-700/50',
      text: 'text-purple-300',
      badge: 'bg-purple-600',
    },
  };

  const colors = categoryColors[useCase.category];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link 
            href="/use-cases"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Use Cases
          </Link>
          <button
            onClick={runDemo}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRunning 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Run Demo
              </>
            )}
          </button>
        </div>

        {/* Use Case Info */}
        <div className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-8 space-y-4`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block px-3 py-1 ${colors.badge} text-white text-xs font-semibold rounded-full mb-3`}>
                {useCase.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{useCase.name}</h1>
              <p className="text-lg text-slate-300">{useCase.summary}</p>
            </div>
          </div>

          {/* Tags */}
          {useCase.tags && useCase.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-600/50">
              {useCase.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Input Data */}
        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Input Data</h3>
          <pre className="text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg overflow-auto">
            {JSON.stringify(useCase.seed, null, 2)}
          </pre>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Execution Pipeline</h3>
          
          {useCase.steps.map((step, index) => {
            const status = getStepStatus(index);
            const result = results[step.id];
            const isExpanded = expandedStep === index;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-600 rounded-xl overflow-hidden"
              >
                {/* Step Header */}
                <div className="p-6 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    status === 'completed' ? 'bg-green-600' :
                    status === 'running' ? 'bg-blue-600' :
                    'bg-slate-700'
                  }`}>
                    {status === 'completed' ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : status === 'running' ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <span className="text-white font-bold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                    <p className="text-sm text-slate-400 font-mono">/{step.id}</p>
                  </div>

                  {result && (
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : index)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  )}
                </div>

                {/* Step Results (Expanded) */}
                <AnimatePresence>
                  {isExpanded && result && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-600 p-6 bg-slate-900/30 space-y-4"
                    >
                      {/* Processing Steps */}
                      {result.processingSteps && (
                        <div>
                          <h5 className="text-sm font-semibold text-slate-400 mb-2">Processing Steps</h5>
                          <div className="space-y-1">
                            {result.processingSteps.map((ps, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">{ps.step}</span>
                                <span className="text-green-400">{ps.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Output */}
                      <div>
                        <h5 className="text-sm font-semibold text-slate-400 mb-2">Output</h5>
                        <pre className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg overflow-auto">
                          {JSON.stringify(result.output, null, 2)}
                        </pre>
                      </div>

                      {/* Insights */}
                      {result.insights && result.insights.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-slate-400 mb-2">Insights</h5>
                          <ul className="space-y-1">
                            {result.insights.map((insight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        {!isRunning && currentStep >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/50 rounded-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Demo Completed Successfully</h3>
            <p className="text-slate-300 mb-6">
              All {useCase.steps.length} steps executed successfully. Explore the results above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={runDemo}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
              >
                Run Again
              </button>
              <Link
                href="/use-cases"
                className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors"
              >
                Explore More Use Cases
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UseCaseDemoClient;

