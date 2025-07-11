'use client';

import { motion } from 'framer-motion';
import { centralDogmaSteps } from '@/data/learn/oncology-101/genetics-data';

export const CentralDogmaFlow: React.FC = () => {
  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center justify-around text-center">
        {centralDogmaSteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            <motion.div
              className="bg-teal-100 text-teal-800 font-bold p-3 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              {step.name}
            </motion.div>
            <p className="text-xs mt-1 text-slate-600">({step.process})</p>
            <p className="text-xs mt-1 text-slate-500 max-w-24 text-center">
              {step.description}
            </p>
          </motion.div>
        ))}
        
        {/* Arrows */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center space-x-16">
            <div className="text-2xl font-bold text-teal-500">→</div>
            <div className="text-2xl font-bold text-teal-500">→</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 