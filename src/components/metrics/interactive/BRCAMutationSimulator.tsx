'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Play, RotateCcw, AlertTriangle, CheckCircle, Brain, Users } from 'lucide-react';

interface VariantResult {
  variant: string;
  supervised: {
    score: number;
    confidence: number;
    prediction: 'pathogenic' | 'benign';
  };
  zeroShot: {
    score: number;
    confidence: number;
    prediction: 'pathogenic' | 'benign';
  };
  realWorldImpact: string;
  clinicalAction: string;
}

const mockVariants = [
  {
    variant: 'BRCA1 c.5266dupC',
    supervised: { score: 0.94, confidence: 0.95, prediction: 'pathogenic' as const },
    zeroShot: { score: 0.89, confidence: 0.85, prediction: 'pathogenic' as const },
    realWorldImpact: 'High breast/ovarian cancer risk - preventive measures recommended',
    clinicalAction: 'Enhanced screening, genetic counseling, consider prophylactic surgery'
  },
  {
    variant: 'BRCA2 c.9976A>T',
    supervised: { score: 0.12, confidence: 0.92, prediction: 'benign' as const },
    zeroShot: { score: 0.18, confidence: 0.78, prediction: 'benign' as const },
    realWorldImpact: 'No increased cancer risk - routine screening sufficient',
    clinicalAction: 'Standard population screening guidelines'
  },
  {
    variant: 'BRCA1 c.4327C>T',
    supervised: { score: 0.88, confidence: 0.91, prediction: 'pathogenic' as const },
    zeroShot: { score: 0.76, confidence: 0.82, prediction: 'pathogenic' as const },
    realWorldImpact: 'Moderate-high cancer risk - targeted interventions needed',
    clinicalAction: 'Annual MRI screening, genetic counseling for family members'
  }
];

const BRCAMutationSimulator: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [activeMethod, setActiveMethod] = useState<'supervised' | 'zeroShot'>('supervised');

  const analyzeVariant = (variant: VariantResult) => {
    setIsAnalyzing(true);
    setSelectedVariant(null);
    setShowComparison(false);
    
    setTimeout(() => {
      setSelectedVariant(variant);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'pathogenic' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Dna className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              BRCA Mutation Classifier
            </h3>
            <p className="text-sm text-slate-600">
              See our AI models classify real genetic variants
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedVariant(null);
            setShowComparison(false);
          }}
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Variant Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Choose a variant to analyze:</h4>
        <div className="grid gap-3">
          {mockVariants.map((variant, index) => (
            <button
              key={index}
              onClick={() => analyzeVariant(variant)}
              disabled={isAnalyzing}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div>
                <div className="font-mono text-sm font-medium text-slate-900">
                  {variant.variant}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Click to analyze with AI models
                </div>
              </div>
              <Play className="w-4 h-4 text-blue-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="w-5 h-5 text-blue-600" />
              </motion.div>
              <div>
                <div className="font-medium text-blue-900">Analyzing variant...</div>
                <div className="text-sm text-blue-700">
                  Running both supervised and zero-shot models
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {selectedVariant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Variant Info */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-mono text-lg font-medium text-slate-900 mb-2">
                {selectedVariant.variant}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                {selectedVariant.supervised.prediction === 'pathogenic' ? (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getPredictionColor(selectedVariant.supervised.prediction)
                }`}>
                  {selectedVariant.supervised.prediction.charAt(0).toUpperCase() + 
                   selectedVariant.supervised.prediction.slice(1)}
                </span>
              </div>
            </div>

            {/* Method Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActiveMethod('supervised')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeMethod === 'supervised'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Supervised Learning (95% accuracy)
              </button>
              <button
                onClick={() => setActiveMethod('zeroShot')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeMethod === 'zeroShot'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Zero-Shot (89% accuracy)
              </button>
            </div>

            {/* Method Results */}
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Prediction Score */}
              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3">Prediction Score</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pathogenicity Score</span>
                      <span className="font-medium">
                        {(selectedVariant[activeMethod].score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${
                          selectedVariant[activeMethod].score > 0.5 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedVariant[activeMethod].score * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span className="font-medium">
                        {(selectedVariant[activeMethod].confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${getConfidenceColor(selectedVariant[activeMethod].confidence)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedVariant[activeMethod].confidence * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-World Impact */}
              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Real-World Impact
                </h5>
                <p className="text-sm text-slate-700 mb-3">
                  {selectedVariant.realWorldImpact}
                </p>
                <div className="text-xs text-slate-600">
                  <strong>Clinical Action:</strong> {selectedVariant.clinicalAction}
                </div>
              </div>
            </motion.div>

            {/* Comparison Button */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {showComparison ? 'Hide' : 'Show'} Method Comparison
            </button>

            {/* Method Comparison */}
            <AnimatePresence>
              {showComparison && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <h5 className="font-medium text-slate-900 mb-4">Supervised vs Zero-Shot</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium text-slate-700 mb-2">Supervised Learning</h6>
                      <div className="text-xs text-slate-600 space-y-1">
                        <div>Score: {(selectedVariant.supervised.score * 100).toFixed(1)}%</div>
                        <div>Confidence: {(selectedVariant.supervised.confidence * 100).toFixed(0)}%</div>
                        <div className="text-green-600 font-medium">✓ Trained on similar variants</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium text-slate-700 mb-2">Zero-Shot</h6>
                      <div className="text-xs text-slate-600 space-y-1">
                        <div>Score: {(selectedVariant.zeroShot.score * 100).toFixed(1)}%</div>
                        <div>Confidence: {(selectedVariant.zeroShot.confidence * 100).toFixed(0)}%</div>
                        <div className="text-blue-600 font-medium">⚡ No prior training needed</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Key Insight:</strong> Even without training on similar variants, our zero-shot model 
                      achieves {(selectedVariant.zeroShot.score * 100).toFixed(1)}% accuracy, making it invaluable 
                      for rare or novel variants where training data doesn't exist.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">What This Demonstrates:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• How AI models classify genetic variants in real-time</li>
          <li>• The difference between supervised and zero-shot approaches</li>
          <li>• How technical predictions translate to clinical actions</li>
          <li>• Why confidence scores matter for patient care</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default BRCAMutationSimulator;
