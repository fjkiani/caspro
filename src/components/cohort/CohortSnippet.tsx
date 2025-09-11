'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface CohortSnippetProps {
  gene: string;
  n: number;
  prevalence: number;
  metrics: {
    auroc: number;
    auprc: number;
  };
  studyName?: string;
  index?: number;
  className?: string;
}

const CohortSnippet: React.FC<CohortSnippetProps> = ({
  gene,
  n,
  prevalence,
  metrics,
  studyName,
  index = 0,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 border-2 border-teal-200 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <h4 className="text-xl font-bold text-gray-800 mb-4">
        {studyName ? `${studyName} - Cohort Snippet` : 'Cohort Snippet'}
      </h4>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 rounded-xl">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{gene}</div>
            <div className="text-sm text-gray-600">Gene of Interest</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">{n}</div>
            <div className="text-sm text-gray-600">Cases</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">{(prevalence * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Prevalence</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">AUROC:</span>
            <span className="font-semibold text-gray-800">{metrics.auroc}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">AUPRC:</span>
            <span className="font-semibold text-gray-800">{metrics.auprc}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CohortSnippet;
