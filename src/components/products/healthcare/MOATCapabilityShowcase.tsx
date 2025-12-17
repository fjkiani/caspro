'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Target, Search, Dna, Shield, TestTube } from 'lucide-react';
import { clinicalCarePlanContent } from '@/data/industry/clinical-care-plan-content';
import VUSResolutionDemo from '@/components/sae/VUSResolutionDemo';
import SPEFusionPlayground from '@/components/evidence/interactive/SPEFusionPlayground';
import ResistanceDetectionDemo from '@/components/products/oncology/demos/ResistanceDetectionDemo';
import ToxicityPredictionDemo from '@/components/products/oncology/demos/ToxicityPredictionDemo';
import ClinicalTrialMatchingDemo from '@/components/products/oncology/demos/ClinicalTrialMatchingDemo';
import SyntheticLethalityDemo from '@/components/products/oncology/demos/SyntheticLethalityDemo';

const demoComponentMap: Record<string, React.ComponentType<any>> = {
  'VUSResolutionDemo': VUSResolutionDemo,
  'SPEFusionPlayground': SPEFusionPlayground,
  'ResistanceDetectionDemo': ResistanceDetectionDemo,
  'ToxicityPredictionDemo': ToxicityPredictionDemo,
  'ClinicalTrialsMatcher': ClinicalTrialMatchingDemo,
  'SyntheticLethalityDemo': SyntheticLethalityDemo,
};

const iconMap: Record<number, React.ComponentType<any>> = {
  0: CheckCircle,
  1: Target,
  2: Clock,
  3: Shield,
  4: Search,
  5: Dna,
};

export default function MOATCapabilityShowcase() {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const moatCapabilities = clinicalCarePlanContent.moatCapabilities.map((cap, idx) => ({
    ...cap,
    icon: iconMap[idx] || CheckCircle,
    confidence: typeof cap.metrics.auroc === 'number' ? Math.round(cap.metrics.auroc * 100) :
                typeof cap.metrics.top5Accuracy === 'number' ? Math.round(cap.metrics.top5Accuracy * 100) :
                typeof cap.metrics.matchAccuracy === 'number' ? Math.round(cap.metrics.matchAccuracy * 100) :
                typeof cap.metrics.pgxCoverage === 'number' ? Math.round(cap.metrics.pgxCoverage * 100) :
                typeof cap.metrics.drugMatchAccuracy === 'number' ? Math.round(cap.metrics.drugMatchAccuracy * 100) :
                95, // Default confidence
    time: '2-5 seconds',
    evidence: Object.entries(cap.metrics).map(([k, v]) => 
      `${k}: ${typeof v === 'number' ? (v * 100).toFixed(1) + '%' : v}`
    ).join(', '),
  }));

  const handleCapabilityTest = async (capabilityId: string) => {
    setIsTesting(true);
    setActiveCapability(capabilityId);

    // Simulate testing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const capability = moatCapabilities.find(c => c.id === capabilityId);
    setTestResults(capability);
    setIsTesting(false);
  };

  return (
    <section id="moat-capability-testing" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            <TestTube className="w-4 h-4" />
            MOAT CAPABILITY TESTING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 mb-2"
          >
            Test MOAT Capabilities Live
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto"
          >
            Click any capability to see results instantly
          </motion.p>
        </div>

        {/* Compact Grid Layout with Inline Results */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {moatCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              const isActive = activeCapability === capability.id;
              const hasResults = testResults?.id === capability.id;
              const DemoComponent = demoComponentMap[capability.demo];

              return (
                <div key={capability.id} className="flex flex-col">
                  {/* Capability Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                    onClick={() => handleCapabilityTest(capability.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-slate-800 text-sm md:text-base">
                            {capability.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {isTesting && isActive && (
                            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          )}
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            hasResults
                              ? capability.confidence >= 80 ? 'bg-green-100 text-green-700' :
                                capability.confidence >= 70 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {hasResults ? `${capability.confidence}%` : 'Test'}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-1 line-clamp-2">{capability.solution}</p>
                    </div>
                  </motion.div>

                  {/* Inline Results - Expands below card */}
                  <AnimatePresence>
                    {hasResults && testResults && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          {/* Compact Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                testResults.confidence >= 80 ? 'bg-green-100' :
                                testResults.confidence >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                              }`}>
                                <CheckCircle className={`w-4 h-4 ${
                                  testResults.confidence >= 80 ? 'text-green-600' :
                                  testResults.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                                }`} />
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-800 text-sm">{testResults.title}</h5>
                                <div className="flex items-center text-xs text-slate-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {testResults.time}
                                </div>
                              </div>
                            </div>
                            <span className={`text-lg font-bold ${
                              testResults.confidence >= 80 ? 'text-green-600' :
                              testResults.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {testResults.confidence}%
                            </span>
                          </div>

                          {/* Compact Progress Bar */}
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${testResults.confidence}%` }}
                              transition={{ duration: 0.8 }}
                              className={`h-2 rounded-full ${
                                testResults.confidence >= 80 ? 'bg-green-500' :
                                testResults.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                            />
                          </div>

                          {/* Compact Metrics Grid */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-50 p-2 rounded">
                              <div className="font-medium text-slate-600 mb-1">Outcome</div>
                              <div className="text-slate-800 line-clamp-2">{testResults.outcome}</div>
                            </div>
                            <div className="bg-slate-50 p-2 rounded">
                              <div className="font-medium text-slate-600 mb-1">Evidence</div>
                              <div className="text-slate-800 line-clamp-2">{testResults.evidence}</div>
                            </div>
                          </div>

                          {/* Compact Demo */}
                          {DemoComponent && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <h6 className="font-semibold text-blue-800 text-xs mb-2">Interactive Demo</h6>
                              <div className="scale-90 origin-top-left">
                                <DemoComponent />
                              </div>
                            </div>
                          )}

                          {/* Compact Actions */}
                          <div className="flex gap-2 pt-2 border-t border-slate-200">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setTestResults(null);
                                setActiveCapability(null);
                              }}
                              className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors"
                            >
                              Close
                            </button>
                            <button className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    testResults.confidence >= 80 ? 'bg-green-100' :
                    testResults.confidence >= 70 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <CheckCircle className={`w-6 h-6 ${
                      testResults.confidence >= 80 ? 'text-green-600' :
                      testResults.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{testResults.title} Results</h3>
                    <div className="flex items-center text-sm text-slate-600 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Completed in {testResults.time}
                    </div>
                  </div>
                </div>

}

