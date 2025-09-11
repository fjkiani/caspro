'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ObservedOutcomesProps {
  outcomes: string[];
  color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  className?: string;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', accent: 'bg-red-500' }
};

const ObservedOutcomes: React.FC<ObservedOutcomesProps> = ({
  outcomes,
  color = 'green',
  className = ''
}) => {
  const theme = colorVariants[color];

  return (
    <motion.div
      className={`mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Observed Outcomes</h3>
      <div className={`bg-white rounded-2xl p-8 border-2 ${theme.border} shadow-lg`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full ${theme.accent} mt-2 flex-shrink-0`}></div>
              <span className="text-gray-700">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ObservedOutcomes;
