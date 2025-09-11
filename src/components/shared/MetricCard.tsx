'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  dataset?: string;
  sampleSize?: number;
  source?: string;
  impact?: string;
  color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  index?: number;
  className?: string;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' }
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  description,
  dataset,
  sampleSize,
  source,
  impact,
  color = 'blue',
  index = 0,
  className = ''
}) => {
  const theme = colorVariants[color];

  return (
    <motion.div
      className={`text-center bg-white rounded-2xl p-6 border-2 ${theme.border} shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-800 mb-2">{label}</div>
      <div className="text-sm text-gray-600 mb-2">{description}</div>
      
      {dataset && sampleSize && (
        <div className="text-xs text-gray-500 mb-2">
          {dataset} ({sampleSize.toLocaleString()} samples)
        </div>
      )}
      
      {source && (
        <div className="text-xs text-gray-500 mb-2">
          Source: {source}
        </div>
      )}
      
      {impact && (
        <div className={`text-xs font-medium ${theme.text} bg-gray-50 px-2 py-1 rounded`}>
          {impact}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
