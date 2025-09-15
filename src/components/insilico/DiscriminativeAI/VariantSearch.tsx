'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Target, TrendingUp, Database, FileText } from 'lucide-react';

interface VariantSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onScoreVariants: () => void;
}

const VariantSearch: React.FC<VariantSearchProps> = ({ searchTerm, onSearchChange, onScoreVariants }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search variants (e.g., TP53 R175H, BRAF V600E)"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button 
          onClick={onScoreVariants}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Score Variants
        </button>
      </div>

      {/* Fusion Approach Info */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Fusion Approach
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <span><strong>CrisPRO.ai:</strong> Zero-shot ΔLL (8,192 bp context)</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span><strong>Specialists:</strong> AlphaMissense/GPN-MSA</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span><strong>Coverage:</strong> Coding + noncoding + splice</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VariantSearch;
