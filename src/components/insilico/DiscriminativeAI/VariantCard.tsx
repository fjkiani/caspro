'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VariantResult {
  variant: string;
  gene: string;
  crisproScore: number;
  alphaMissenseScore?: number;
  gpnMsaScore?: number;
  ensembleScore: number;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  tier: 'supported' | 'consider' | 'insufficient';
}

interface VariantCardProps {
  variant: VariantResult;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const VariantCard: React.FC<VariantCardProps> = ({ variant, isSelected, onSelect, index }) => {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'supported': return 'text-green-600 bg-green-50';
      case 'consider': return 'text-yellow-600 bg-yellow-50';
      case 'insufficient': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      className={`p-6 bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {variant.gene} {variant.variant}
          </h4>
          <p className="text-sm text-gray-600">Ensemble Score: {variant.ensembleScore}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(variant.confidence)}`}>
            {variant.confidence}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(variant.tier)}`}>
            {variant.tier}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">CrisPRO.ai</p>
          <p className="font-semibold">{variant.crisproScore}</p>
        </div>
        {variant.alphaMissenseScore && (
          <div>
            <p className="text-gray-500">AlphaMissense</p>
            <p className="font-semibold">{variant.alphaMissenseScore}</p>
          </div>
        )}
        {variant.gpnMsaScore && (
          <div>
            <p className="text-gray-500">GPN-MSA</p>
            <p className="font-semibold">{variant.gpnMsaScore}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VariantCard;
