'use client';

import { motion } from 'framer-motion';
import { MetastasisStep } from '@/data/learn/oncology-101/metastasis-data';

interface MetastasisCascadeProps {
  steps: MetastasisStep[];
  title: string;
}

export const MetastasisCascade: React.FC<MetastasisCascadeProps> = ({ steps, title }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-slate-800">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="p-4 bg-slate-50 rounded-lg text-center hover:bg-cyan-50 transition-colors border border-slate-200 hover:border-cyan-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {/* Step Number */}
            <motion.div
              className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (index * 0.1) + 0.2 }}
            >
              {step.stepNumber}
            </motion.div>
            
            {/* Step Title */}
            <h5 className="font-bold text-cyan-700 mb-2">
              {step.title}
            </h5>
            
            {/* Step Description */}
            <p className="text-xs text-slate-600 mb-2">
              {step.description}
            </p>
            
            {/* Step Details */}
            <motion.div
              className="text-xs text-slate-500 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index * 0.1) + 0.4 }}
            >
              {step.details}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Flow Arrows (for larger screens) */}
      <div className="hidden lg:block mt-4">
        <div className="flex justify-center items-center space-x-8">
          {Array.from({ length: 7 }, (_, i) => (
            <motion.div
              key={i}
              className="text-2xl text-cyan-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i + 1) * 0.1 }}
            >
              →
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 