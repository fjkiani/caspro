'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, Search, CheckCircle, Clock, Target, BookOpen } from 'lucide-react';

export default function HypothesisTestingSection() {
  const [activeHypothesis, setActiveHypothesis] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const sampleHypotheses = [
    {
      id: 'curcumin-kras',
      title: 'Does curcumin inhibit KRAS signaling in pancreatic cancer?',
      compound: 'Curcumin',
      disease: 'Pancreatic Cancer',
      mechanism: 'MEK/ERK pathway inhibition',
      confidence: 94,
      time: '2.3 seconds',
      evidence: '247 studies, 89% positive correlation',
      result: 'Strong mechanistic evidence for KRAS pathway inhibition downstream of G12D mutation'
    },
    {
      id: 'metformin-breast',
      title: 'Can metformin improve outcomes in triple-negative breast cancer?',
      compound: 'Metformin',
      disease: 'Triple-Negative Breast Cancer',
      mechanism: 'AMPK activation, mTOR inhibition',
      confidence: 87,
      time: '3.1 seconds',
      evidence: '156 studies, 76% positive outcomes',
      result: 'Evidence for improved progression-free survival through metabolic reprogramming'
    },
    {
      id: 'vitamin-d-colorectal',
      title: 'Does vitamin D supplementation prevent colorectal cancer recurrence?',
      compound: 'Vitamin D',
      disease: 'Colorectal Cancer',
      mechanism: 'Vitamin D receptor activation, immune modulation',
      confidence: 78,
      time: '2.8 seconds',
      evidence: '203 studies, 67% positive association',
      result: 'Moderate evidence for recurrence prevention in deficient patients'
    },
    {
      id: 'resveratrol-prostate',
      title: 'Is resveratrol effective against androgen-resistant prostate cancer?',
      compound: 'Resveratrol',
      disease: 'Prostate Cancer',
      mechanism: 'SIRT1 activation, androgen receptor modulation',
      confidence: 65,
      time: '3.4 seconds',
      evidence: '98 studies, 54% positive effects',
      result: 'Limited evidence for androgen-resistant disease, requires further investigation'
    }
  ];

  const handleHypothesisTest = async (hypothesisId: string) => {
    setIsTesting(true);
    setActiveHypothesis(hypothesisId);

    // Simulate testing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const hypothesis = sampleHypotheses.find(h => h.id === hypothesisId);
    setTestResults(hypothesis);
    setIsTesting(false);
  };

  return (
    <section id="hypothesis-testing" className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <TestTube className="w-4 h-4" />
            UNIVERSAL HYPOTHESIS TESTING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Test Any Hypothesis Against Any Disease
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            From natural compounds to experimental drugs, test any hypothesis across
            50+ diseases with mechanistic validation and evidence synthesis.
          </motion.p>
        </div>

        {/* Hypothesis Testing Interface */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Search className="w-5 h-5 mr-3 text-blue-600" />
              Hypothesis Testing Engine
            </h3>

            {/* Sample Hypotheses */}
            <div className="space-y-4">
              {sampleHypotheses.map((hypothesis, index) => (
                <motion.div
                  key={hypothesis.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    activeHypothesis === hypothesis.id
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                  onClick={() => handleHypothesisTest(hypothesis.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {hypothesis.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {hypothesis.compound}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {hypothesis.disease}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {isTesting && activeHypothesis === hypothesis.id && (
                        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activeHypothesis === hypothesis.id && testResults?.id === hypothesis.id
                          ? testResults.confidence >= 80 ? 'bg-green-100 text-green-700' :
                            testResults.confidence >= 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {activeHypothesis === hypothesis.id && testResults?.id === hypothesis.id
                          ? `${testResults.confidence}%`
                          : 'Test'
                        }
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Custom Hypothesis Input */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-4">Test Your Own Hypothesis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Compound or intervention (e.g., aspirin, exercise)"
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Disease or condition (e.g., breast cancer, diabetes)"
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center">
                <TestTube className="w-5 h-5 mr-2" />
                Test Custom Hypothesis
              </button>
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
                    <h3 className="text-2xl font-bold text-slate-800">Hypothesis Test Results</h3>
                    <div className="flex items-center text-sm text-slate-600 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Completed in {testResults.time}
                    </div>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-slate-800">Mechanistic Confidence</span>
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
                    ></motion.div>
                  </div>
                </div>

                {/* Results Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Compound</h4>
                    <p className="text-slate-700">{testResults.compound}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Disease</h4>
                    <p className="text-slate-700">{testResults.disease}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Mechanism</h4>
                    <p className="text-slate-700">{testResults.mechanism}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">Evidence</h4>
                    <p className="text-slate-700">{testResults.evidence}</p>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">AI Analysis Summary</h4>
                  <p className="text-blue-700 leading-relaxed">{testResults.result}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-slate-200">
                  <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    View Full Evidence Report
                  </button>
                  <button className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors">
                    Export Results
                  </button>
                  <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                    Test Another Hypothesis
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
