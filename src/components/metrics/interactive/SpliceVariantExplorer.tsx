'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Scissors, Play, Pause, AlertTriangle, CheckCircle, Info, Users } from 'lucide-react';

interface SpliceVariant {
  id: string;
  variant: string;
  location: 'exonic' | 'intronic';
  spliceSite: string;
  prediction: 'disrupts-splicing' | 'normal-splicing';
  confidence: number;
  mechanism: string;
  proteinEffect: string;
  diseaseAssociation: string;
  spliceStrength: {
    normal: number;
    variant: number;
  };
}

const mockSpliceVariants: SpliceVariant[] = [
  {
    id: 'splice1',
    variant: 'BRCA1 c.5467+1G>A',
    location: 'intronic',
    spliceSite: 'Donor site (+1)',
    prediction: 'disrupts-splicing',
    confidence: 0.94,
    mechanism: 'Destroys canonical GT donor site, causes exon skipping',
    proteinEffect: 'Frameshift leading to premature termination',
    diseaseAssociation: 'Hereditary breast/ovarian cancer syndrome',
    spliceStrength: { normal: 0.89, variant: 0.12 }
  },
  {
    id: 'splice2',
    variant: 'SMN1 c.840C>T',
    location: 'exonic',
    spliceSite: 'Exonic splicing enhancer',
    prediction: 'disrupts-splicing',
    confidence: 0.87,
    mechanism: 'Disrupts SR protein binding, reduces inclusion of exon 7',
    proteinEffect: 'Reduced functional SMN protein levels',
    diseaseAssociation: 'Spinal muscular atrophy (SMA)',
    spliceStrength: { normal: 0.76, variant: 0.31 }
  },
  {
    id: 'splice3',
    variant: 'CFTR c.1210-12T>C',
    location: 'intronic',
    spliceSite: 'Branch point (-12)',
    prediction: 'normal-splicing',
    confidence: 0.82,
    mechanism: 'Variant too distant from splice site to affect recognition',
    proteinEffect: 'No change in protein sequence or levels',
    diseaseAssociation: 'No association with cystic fibrosis',
    spliceStrength: { normal: 0.71, variant: 0.68 }
  }
];

interface SpliceExplorerProps {
  title?: string;
  subtitle?: string;
  variants?: SpliceVariant[];
  showAnimation?: boolean;
}

const SpliceVariantExplorer: React.FC<SpliceExplorerProps> = ({
  title = "Splice Variant Prediction",
  subtitle = "Explore how genetic changes affect RNA processing",
  variants = mockSpliceVariants,
  showAnimation = true
}) => {
  const [selectedVariant, setSelectedVariant] = useState<SpliceVariant | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSplicing, setShowSplicing] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const analyzeVariant = (variant: SpliceVariant) => {
    setIsAnalyzing(true);
    setSelectedVariant(null);
    setShowSplicing(false);
    setAnimationStep(0);
    
    setTimeout(() => {
      setSelectedVariant(variant);
      setIsAnalyzing(false);
    }, 2000);
  };

  const startSplicingAnimation = () => {
    setShowSplicing(true);
    setAnimationStep(0);
    
    const steps = [1, 2, 3, 4];
    steps.forEach((step, index) => {
      setTimeout(() => setAnimationStep(step), (index + 1) * 1000);
    });
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'disrupts-splicing' 
      ? 'text-red-600 bg-red-50 border-red-200' 
      : 'text-green-600 bg-green-50 border-green-200';
  };

  const getLocationColor = (location: string) => {
    return location === 'exonic' 
      ? 'bg-blue-100 text-blue-700' 
      : 'bg-purple-100 text-purple-700';
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
          <div className="p-2 bg-orange-100 rounded-lg">
            <Scissors className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Variant Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Select a splice variant to analyze:</h4>
        <div className="grid gap-3">
          {variants.map((variant, index) => (
            <button
              key={variant.id}
              onClick={() => analyzeVariant(variant)}
              disabled={isAnalyzing}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLocationColor(variant.location)}`}>
                  {variant.location}
                </div>
                <div>
                  <div className="font-mono text-sm font-medium text-slate-900">
                    {variant.variant}
                  </div>
                  <div className="text-xs text-slate-600">
                    {variant.spliceSite}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPredictionColor(variant.prediction)}`}>
                  {variant.prediction === 'disrupts-splicing' ? 'Disrupts' : 'Normal'}
                </div>
                <Scissors className="w-4 h-4 text-orange-600" />
              </div>
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
            className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FileText className="w-5 h-5 text-orange-600" />
              </motion.div>
              <div>
                <div className="font-medium text-orange-900">Analyzing splice impact...</div>
                <div className="text-sm text-orange-700">
                  Examining splice site strength and regulatory elements
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-orange-200 rounded-full h-2">
                <motion.div
                  className="bg-orange-600 h-2 rounded-full"
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
            {/* Variant Header */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-mono text-lg font-medium text-slate-900">
                  {selectedVariant.variant}
                </h4>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLocationColor(selectedVariant.location)}`}>
                    {selectedVariant.location}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPredictionColor(selectedVariant.prediction)}`}>
                    {selectedVariant.prediction === 'disrupts-splicing' ? (
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                    )}
                    {selectedVariant.prediction === 'disrupts-splicing' ? 'Disrupts Splicing' : 'Normal Splicing'}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                <strong>Target:</strong> {selectedVariant.spliceSite} • <strong>Confidence:</strong> {(selectedVariant.confidence * 100).toFixed(0)}%
              </div>
            </div>

            {/* Splice Strength Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-4">Splice Site Strength</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-700">Normal Sequence</span>
                      <span className="font-medium">{(selectedVariant.spliceStrength.normal * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className="bg-green-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedVariant.spliceStrength.normal * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-700">Variant Sequence</span>
                      <span className="font-medium">{(selectedVariant.spliceStrength.variant * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className="bg-red-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedVariant.spliceStrength.variant * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Clinical Impact
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Protein Effect:</strong>
                    <p className="text-slate-600 mt-1">{selectedVariant.proteinEffect}</p>
                  </div>
                  <div>
                    <strong>Disease Association:</strong>
                    <p className="text-slate-600 mt-1">{selectedVariant.diseaseAssociation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Splicing Animation */}
            {showAnimation && (
              <div className="space-y-4">
                <button
                  onClick={startSplicingAnimation}
                  className="w-full py-3 px-4 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {showSplicing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {showSplicing ? 'Reset Animation' : 'Show Splicing Process'}
                </button>

                <AnimatePresence>
                  {showSplicing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200"
                    >
                      <h5 className="font-medium text-orange-900 mb-4 text-center">
                        RNA Splicing Process
                      </h5>
                      
                      {/* Animation Steps */}
                      <div className="space-y-4">
                        <motion.div
                          className={`p-3 rounded-lg border transition-all ${
                            animationStep >= 1 ? 'bg-blue-100 border-blue-300' : 'bg-slate-100 border-slate-200'
                          }`}
                          animate={animationStep >= 1 ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`w-3 h-3 rounded-full ${animationStep >= 1 ? 'bg-blue-500' : 'bg-slate-400'}`} />
                            <span>Step 1: Pre-mRNA contains exons and introns</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className={`p-3 rounded-lg border transition-all ${
                            animationStep >= 2 ? 'bg-green-100 border-green-300' : 'bg-slate-100 border-slate-200'
                          }`}
                          animate={animationStep >= 2 ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`w-3 h-3 rounded-full ${animationStep >= 2 ? 'bg-green-500' : 'bg-slate-400'}`} />
                            <span>Step 2: Spliceosome recognizes splice sites</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className={`p-3 rounded-lg border transition-all ${
                            animationStep >= 3 ? 'bg-yellow-100 border-yellow-300' : 'bg-slate-100 border-slate-200'
                          }`}
                          animate={animationStep >= 3 ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`w-3 h-3 rounded-full ${animationStep >= 3 ? 'bg-yellow-500' : 'bg-slate-400'}`} />
                            <span>Step 3: Introns are removed, exons joined</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className={`p-3 rounded-lg border transition-all ${
                            animationStep >= 4 ? 
                              (selectedVariant.prediction === 'disrupts-splicing' ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300')
                              : 'bg-slate-100 border-slate-200'
                          }`}
                          animate={animationStep >= 4 ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <div className={`w-3 h-3 rounded-full ${
                              animationStep >= 4 ? 
                                (selectedVariant.prediction === 'disrupts-splicing' ? 'bg-red-500' : 'bg-green-500')
                                : 'bg-slate-400'
                            }`} />
                            <span>
                              Step 4: {selectedVariant.prediction === 'disrupts-splicing' 
                                ? 'Variant disrupts normal splicing pattern' 
                                : 'Normal mature mRNA produced'}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mechanism Details */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Molecular Mechanism
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedVariant.mechanism}
              </p>
            </div>

            {/* Model Performance */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">AI Model Performance</h5>
              <p className="text-sm text-blue-800">
                Our splice prediction model achieves <strong>82.6% accuracy</strong> on {selectedVariant.location} variants, 
                significantly outperforming traditional splice site prediction tools. This helps identify{' '}
                <strong>15% more splice-disrupting variants</strong> that cause genetic diseases.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">What This Demonstrates:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• How genetic variants can disrupt the normal RNA splicing process</li>
          <li>• The difference between exonic and intronic splice-affecting variants</li>
          <li>• Why splice site strength matters for proper gene expression</li>
          <li>• How splice variants contribute to genetic diseases through protein disruption</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SpliceVariantExplorer;
