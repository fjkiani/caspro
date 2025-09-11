'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Info } from 'lucide-react';

interface VariantResult {
  variant: string;
  gene: string;
  evo2Score: number;
  alphaMissenseScore?: number;
  gpnMsaScore?: number;
  ensembleScore: number;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  tier: 'supported' | 'consider' | 'insufficient';
}

interface VariantDetailsProps {
  variant: VariantResult | null;
}

const VariantDetails: React.FC<VariantDetailsProps> = ({ variant }) => {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 p-6"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Analysis</h3>
      
      {variant ? (
        <div className="space-y-6">
          {/* Scores */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Scoring Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Evo2 Zero-shot</span>
                <span className="font-bold text-blue-600">{variant.evo2Score}</span>
              </div>
              {variant.alphaMissenseScore && (
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                  <span className="font-medium">AlphaMissense</span>
                  <span className="font-bold text-teal-600">{variant.alphaMissenseScore}</span>
                </div>
              )}
              {variant.gpnMsaScore && (
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium">GPN-MSA</span>
                  <span className="font-bold text-indigo-600">{variant.gpnMsaScore}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="font-medium">Ensemble Final</span>
                <span className="font-bold text-green-600">{variant.ensembleScore}</span>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Evidence Sources</h4>
            <div className="space-y-2">
              {variant.evidence.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Context Info */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-800">Context Window</span>
            </div>
            <p className="text-sm text-gray-700">
              Evo2 uses 8,192 bp context with reverse-complement averaging for robust scoring.
              Noncoding and splice variants benefit from extended genomic context.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Select a variant to view detailed analysis</p>
        </div>
      )}
    </motion.div>
  );
};

export default VariantDetails;
