'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Brain
} from 'lucide-react';
import { DRUG_DEVELOPMENT_STAGES } from '@/data/homepage/drug-development-homepage';
import type { DrugDevelopmentStage } from '@/data/homepage/drug-development-homepage';

// Import real interactive components
import { BRCAMutationSimulator, VUSResolutionPlayground, SNVPredictionPlayground } from '@/components/metrics/interactive';
import { SPEFusionPlayground, DataLabExplorer, EvidenceIntelligenceSimulator } from '@/components/evidence/interactive';

interface DrugDevelopmentShowcaseProps {
  className?: string;
}

const DrugDevelopmentShowcase: React.FC<DrugDevelopmentShowcaseProps> = ({ className = '' }) => {
  const [activeStage, setActiveStage] = useState<string>(DRUG_DEVELOPMENT_STAGES[0].id);
  const [demoRunning, setDemoRunning] = useState<string | null>(null);

  const currentStage = DRUG_DEVELOPMENT_STAGES.find(stage => stage.id === activeStage);

  const stageIcons = {
    'target-validation': Target,
    'lead-engineering': Zap,
    'preclinical-confirmation': FlaskConical
  };

  const handleRunDemo = (stageId: string) => {
    setDemoRunning(stageId);
    // Simulate demo completion after 3 seconds
    setTimeout(() => setDemoRunning(null), 3000);
  };

  const renderInteractiveDemo = (stage: DrugDevelopmentStage) => {
    switch (stage.id) {
      case 'target-validation':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-2">🎯 Live BRCA1/2 VUS Resolution</h4>
              <p className="text-blue-700 text-sm mb-4">
                Watch our AI transform variants of uncertain significance into actionable clinical decisions
              </p>
            </div>
            <BRCAMutationSimulator />
          </div>
        );
      
      case 'lead-engineering':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <h4 className="font-bold text-purple-900 mb-2">⚡ Live S/P/E Fusion Analysis</h4>
              <p className="text-purple-700 text-sm mb-4">
                Multi-dimensional variant interpretation combining Structure + Phenotype + Expression
              </p>
            </div>
            <SPEFusionPlayground />
          </div>
        );
      
      case 'preclinical-confirmation':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h4 className="font-bold text-green-900 mb-2">🔬 Live Data Lab Explorer</h4>
              <p className="text-green-700 text-sm mb-4">
                Interactive study browser with real-time cohort extraction and analysis
              </p>
            </div>
            <DataLabExplorer />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            🚀 <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Drug Development Transformation
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Watch our AI transform each stage of drug development from <strong>gambling to engineering</strong>. 
            Interactive demonstrations with real performance metrics.
          </p>
          
          {/* Crisis Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">90%</div>
              <div className="text-sm text-slate-600">Failure Rate</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">$2.6B</div>
              <div className="text-sm text-slate-600">Average Cost</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">15 years</div>
              <div className="text-sm text-slate-600">Timeline</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">&lt;5%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Stage Navigation */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stage Selector */}
          <div className="lg:w-1/3 space-y-4">
            {DRUG_DEVELOPMENT_STAGES.map((stage, index) => {
              const Icon = stageIcons[stage.id as keyof typeof stageIcons];
              const isActive = activeStage === stage.id;
              
              return (
                <motion.button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      isActive ? 'bg-blue-500' : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {stage.subtitle}
                      </p>
                      
                      {/* Business Impact Preview */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-green-600 font-semibold">
                            {stage.businessImpact.timeReduction}
                          </span>
                          <div className="text-slate-500">Faster</div>
                        </div>
                        <div>
                          <span className="text-blue-600 font-semibold">
                            {stage.businessImpact.costReduction}
                          </span>
                          <div className="text-slate-500">Cost Reduction</div>
                        </div>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 pt-3 border-t border-slate-200"
                        >
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <CheckCircle className="w-4 h-4" />
                            Currently Active
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Demo Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {currentStage && (
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8"
                >
                  {/* Stage Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      {currentStage.title}
                    </h3>
                    
                    {/* Problem vs Solution */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <h4 className="font-semibold text-red-700 mb-2">Traditional Problem</h4>
                        <p className="text-slate-600 text-sm mb-3">{currentStage.problem.description}</p>
                        <div className="space-y-1 text-xs">
                          <div className="text-slate-500">Cost: <span className="text-red-600">{currentStage.problem.cost}</span></div>
                          <div className="text-slate-500">Time: <span className="text-red-600">{currentStage.problem.timeframe}</span></div>
                          <div className="text-slate-500">Failure: <span className="text-red-600">{currentStage.problem.failureRate}</span></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                        <h4 className="font-semibold text-green-700 mb-2">CrisPRO Solution</h4>
                        <p className="text-slate-600 text-sm mb-3">{currentStage.solution.approach}</p>
                        <div className="text-xs text-green-700 font-semibold">
                          {currentStage.solution.deliverable}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Demo */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-slate-900">
                        {currentStage.interactiveDemo.title}
                      </h4>
                      
                      <motion.button
                        onClick={() => handleRunDemo(currentStage.id)}
                        disabled={demoRunning === currentStage.id}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {demoRunning === currentStage.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4" />
                            Run Live Demo
                          </>
                        )}
                      </motion.button>
                    </div>
                    
                    {renderInteractiveDemo(currentStage)}
                  </div>

                  {/* Evidence & Business Impact */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h5 className="font-semibold text-slate-900 mb-3">Validated Evidence</h5>
                      <div className="space-y-2">
                        {currentStage.evidence.map((evidence, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">{evidence.metric}:</span>
                              <span className="text-green-600 font-semibold">{evidence.value}</span>
                            </div>
                            <div className="text-xs text-slate-500">{evidence.source}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h5 className="font-semibold text-slate-900 mb-3">Business Impact</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Time Reduction:</span>
                          <span className="text-blue-600 font-semibold">{currentStage.businessImpact.timeReduction}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Cost Reduction:</span>
                          <span className="text-green-600 font-semibold">{currentStage.businessImpact.costReduction}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Success Rate:</span>
                          <span className="text-purple-600 font-semibold">{currentStage.businessImpact.successRate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">ROI:</span>
                          <span className="text-orange-600 font-semibold">{currentStage.businessImpact.roi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrugDevelopmentShowcase;
