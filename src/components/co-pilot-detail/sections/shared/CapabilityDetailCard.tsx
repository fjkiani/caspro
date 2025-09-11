'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CapabilityDetailCardProps {
  icon: LucideIcon;
  title: string;
  keyMetric: string;
  description: string;
  color: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const CapabilityDetailCard: React.FC<CapabilityDetailCardProps> = ({
  icon: Icon,
  title,
  keyMetric,
  description,
  color,
  index,
}) => {
  const colorClasses = {
    border: `border-${color}-500/30`,
    bg: `bg-${color}-500/10`,
    text: `text-${color}-400`,
    shadow: `hover:shadow-${color}-500/20`,
  };
  
  // A helper to map colors to Tailwind's JIT compiler
  const safeColorClasses = {
    'blue': { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', shadow: 'hover:shadow-blue-500/20' },
    'teal': { border: 'border-teal-500/30', bg: 'bg-teal-500/10', text: 'text-teal-400', shadow: 'hover:shadow-teal-500/20' },
    'indigo': { border: 'border-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-400', shadow: 'hover:shadow-indigo-500/20' },
  };

  const safeColor = safeColorClasses[color as keyof typeof safeColorClasses] || safeColorClasses.blue;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      className={`flex flex-col text-left p-6 bg-slate-50 rounded-xl shadow-lg border-2 ${safeColor.border} h-full transition-all duration-300 hover:border-primary ${safeColor.shadow}`}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${safeColor.bg}`}>
          <Icon className={`w-6 h-6 ${safeColor.text}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className={`text-xl font-bold ${safeColor.text}`}>{keyMetric}</p>
        </div>
      </div>
      <p className="text-slate-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default CapabilityDetailCard;

