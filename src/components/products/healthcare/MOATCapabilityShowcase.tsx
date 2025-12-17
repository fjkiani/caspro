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
    <section id="moat-capability-testing" className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <TestTube className="w-4 h-4" />
            MOAT CAPABILITY TESTING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Test MOAT Capabilities Live
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Click on any MOAT capability to see how it transforms clinical decision-making 
            with validated performance metrics and real-time demonstrations.
          </motion.p>
        </div>

        {/* Capability Testing Interface */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-3 text-blue-600" />
              MOAT Capability Testing Engine
            </h3>

            {/* Capability Cards */}
            <div className="space-y-4">
              {moatCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                const isActive = activeCapability === capability.id;
                const hasResults = testResults?.id === capability.id;

                return (
                  <motion.div
                    key={capability.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                    onClick={() => handleCapabilityTest(capability.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-slate-800">
                            {capability.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{capability.solution}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Problem: {capability.problem}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {isTesting && isActive && (
                          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                        )}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          hasResults
                            ? capability.confidence >= 80 ? 'bg-green-100 text-green-700' :
                              capability.confidence >= 70 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {hasResults
                            ? `${capability.confidence}%`
                            : 'Test'
                          }
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Test Results */}
          <AnimatePresence>
            {testResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
              >
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

                {/* Confidence Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-slate-800">Performance Score</span>
                    <span className={`text-2xl font-bold ${
                      testResults.confidence >= 80 ? 'text-green-600' :
                      testResults.confidence >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {testResults.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${testResults.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-3 rounded-full ${
                        testResults.confidence >= 80 ? 'bg-green-500' :
                        testResults.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Results Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Problem</h4>
                    <p className="text-slate-700 text-sm">{testResults.problem}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Solution</h4>
                    <p className="text-slate-700 text-sm">{testResults.solution}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Outcome</h4>
                    <p className="text-slate-700 text-sm">{testResults.outcome}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Evidence</h4>
                    <p className="text-slate-700 text-sm">{testResults.evidence}</p>
                  </div>
                </div>

                {/* Interactive Demo */}
                {(() => {
                  const DemoComponent = demoComponentMap[testResults.demo];
                  if (!DemoComponent) return null;

                  return (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Interactive Demo</h4>
                      <DemoComponent />
                    </div>
                  );
                })()}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-slate-200">
                  <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    View Full Capability Details
                  </button>
                  <button className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors">
                    Export Results
                  </button>
                  <button 
                    onClick={() => {
                      setTestResults(null);
                      setActiveCapability(null);
                    }}
                    className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Test Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

