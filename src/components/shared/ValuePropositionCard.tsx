'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ValuePropositionCardProps {
  audience: string;
  icon: LucideIcon;
  points: string[];
  color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  index?: number;
  className?: string;
}

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const ValuePropositionCard: React.FC<ValuePropositionCardProps> = ({
  audience,
  icon: IconComponent,
  points,
  color = 'blue',
  index = 0,
  className = ''
}) => {
  const theme = colorVariants[color];

  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 ${theme.bg} rounded-xl`}>
          <IconComponent className={`w-8 h-8 ${theme.text}`} />
        </div>
        <h4 className="text-xl font-bold text-gray-800">{audience}</h4>
      </div>
      <ul className="space-y-3">
        {points.map((point, pointIndex) => (
          <li key={pointIndex} className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full ${theme.accent} mt-2 flex-shrink-0`}></div>
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ValuePropositionCard;
