'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Dna, Zap, Users, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface SNVExample {
  id: string;
  variant: string;
  type: 'coding' | 'non-coding';
  location: string;
  prediction: 'pathogenic' | 'benign';
  confidence: number;
  mechanism: string;
  clinicalImpact: string;
  populationFrequency: string;
}

const mockSNVs: SNVExample[] = [
  {
    id: 'snv1',
    variant: 'CFTR c.1521_1523delCTT',
    type: 'coding',
    location: 'Exon 10',
    prediction: 'pathogenic',
    confidence: 0.96,
    mechanism: 'Protein truncation leads to loss of CFTR function',
    clinicalImpact: 'Cystic fibrosis - severe respiratory and digestive symptoms',
    populationFrequency: '1 in 25,000 (European)'
  },
  {
    id: 'snv2',
    variant: 'APOE c.388T>C',
    type: 'coding',
    location: 'Exon 4',
    prediction: 'benign',
    confidence: 0.94,
    mechanism: 'Amino acid change does not affect protein stability',
    clinicalImpact: 'No increased disease risk - normal APOE function',
    populationFrequency: '1 in 7 (Global average)'
  },
  {
    id: 'snv3',
    variant: 'TERT promoter -124C>T',
    type: 'non-coding',
    location: 'Promoter region',
    prediction: 'pathogenic',
    confidence: 0.89,
    mechanism: 'Creates new transcription factor binding site, increases TERT expression',
    clinicalImpact: 'Associated with melanoma and glioblastoma risk',
    populationFrequency: '1 in 50,000 (Cancer patients)'
  }
];

interface SNVPlaygroundProps {
  title?: string;
  subtitle?: string;
  examples?: SNVExample[];
  showComparison?: boolean;
}

const SNVPredictionPlayground: React.FC<SNVPlaygroundProps> = ({
  title = "SNV Classification Engine",
  subtitle = "See how our AI distinguishes pathogenic from benign variants",
  examples = mockSNVs,
  showComparison = true
}) => {
  const [selectedSNV, setSelectedSNV] = useState<SNVExample | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMechanism, setShowMechanism] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'coding' | 'non-coding'>('all');

  const analyzeSNV = (snv: SNVExample) => {
    setIsAnalyzing(true);
    setSelectedSNV(null);
    setShowMechanism(false);
    
    setTimeout(() => {
      setSelectedSNV(snv);
      setIsAnalyzing(false);
    }, 1500);
  };

  const filteredExamples = examples.filter(snv => 
    activeFilter === 'all' || snv.type === activeFilter
  );

  const getPredictionColor = (prediction: string) => {
    return prediction === 'pathogenic' ? 'text-red-600 bg-red-50 border-red-200' : 'text-green-600 bg-green-50 border-green-200';
  };

  const getTypeColor = (type: string) => {
    return type === 'coding' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
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
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
        {(['all', 'coding', 'non-coding'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
              activeFilter === filter
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {filter === 'all' ? 'All SNVs' : `${filter} SNVs`}
          </button>
        ))}
      </div>

      {/* SNV Examples */}
      <div className="grid gap-4 mb-6">
        {filteredExamples.map((snv, index) => (
          <button
            key={snv.id}
            onClick={() => analyzeSNV(snv)}
            disabled={isAnalyzing}
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(snv.type)}`}>
                {snv.type}
              </div>
              <div>
                <div className="font-mono text-sm font-medium text-slate-900">
                  {snv.variant}
                </div>
                <div className="text-xs text-slate-600">
                  {snv.location} • {snv.populationFrequency}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPredictionColor(snv.prediction)}`}>
                {snv.prediction}
              </div>
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
          </button>
        ))}
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
                <Dna className="w-5 h-5 text-blue-600" />
              </motion.div>
              <div>
                <div className="font-medium text-blue-900">Analyzing variant...</div>
                <div className="text-sm text-blue-700">
                  Processing genomic context and functional impact
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {selectedSNV && (
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
                  {selectedSNV.variant}
                </h4>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedSNV.type)}`}>
                    {selectedSNV.type}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPredictionColor(selectedSNV.prediction)}`}>
                    {selectedSNV.prediction === 'pathogenic' ? (
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                    )}
                    {selectedSNV.prediction.charAt(0).toUpperCase() + selectedSNV.prediction.slice(1)}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                <strong>Location:</strong> {selectedSNV.location} • <strong>Confidence:</strong> {(selectedSNV.confidence * 100).toFixed(0)}%
              </div>
            </div>

            {/* Prediction Confidence */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3">Prediction Confidence</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pathogenicity Score</span>
                      <span className="font-medium">
                        {selectedSNV.prediction === 'pathogenic' 
                          ? (selectedSNV.confidence * 100).toFixed(1) + '%'
                          : ((1 - selectedSNV.confidence) * 100).toFixed(1) + '%'
                        }
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${
                          selectedSNV.prediction === 'pathogenic' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: selectedSNV.prediction === 'pathogenic' 
                            ? `${selectedSNV.confidence * 100}%`
                            : `${(1 - selectedSNV.confidence) * 100}%`
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Population Impact
                </h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Frequency:</strong> {selectedSNV.populationFrequency}
                  </div>
                  <div>
                    <strong>Clinical Impact:</strong>
                  </div>
                  <p className="text-slate-600">{selectedSNV.clinicalImpact}</p>
                </div>
              </div>
            </div>

            {/* Mechanism Toggle */}
            <button
              onClick={() => setShowMechanism(!showMechanism)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4" />
              {showMechanism ? 'Hide' : 'Show'} Biological Mechanism
            </button>

            {/* Mechanism Details */}
            <AnimatePresence>
              {showMechanism && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                >
                  <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    How This Variant Works
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedSNV.mechanism}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comparison Insight */}
            {showComparison && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">AI vs Traditional Methods</h5>
                <p className="text-sm text-blue-800">
                  Our model achieves <strong>95.7% accuracy</strong> on {selectedSNV.type} SNVs like this one, 
                  compared to <strong>85-90%</strong> for traditional computational methods. This means 
                  <strong>6-11% fewer patients</strong> receive incorrect classifications.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">What This Demonstrates:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• How AI distinguishes between disease-causing and harmless genetic changes</li>
          <li>• The difference between coding variants (affect proteins) and non-coding variants (affect regulation)</li>
          <li>• Why confidence scores and biological mechanisms matter for patient care</li>
          <li>• How population frequency data helps interpret variant significance</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SNVPredictionPlayground;
