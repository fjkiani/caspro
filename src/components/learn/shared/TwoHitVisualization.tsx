'use client';

import { motion } from 'framer-motion';
import { TwoHitPathway } from '@/data/learn/oncology-101/genetics-data';

interface TwoHitVisualizationProps {
  pathway: TwoHitPathway;
}

interface GeneProps {
  status: 'normal' | 'mutated';
}

const Gene: React.FC<GeneProps> = ({ status }) => {
  return (
    <motion.div
      className={`w-4 h-12 rounded border-2 border-slate-500 ${
        status === 'normal' ? 'bg-green-600' : 'bg-red-600'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export const TwoHitVisualization: React.FC<TwoHitVisualizationProps> = ({ pathway }) => {
  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-center text-slate-800 text-lg">
        {pathway.title}
      </h4>
      
      <div className="space-y-4">
        {pathway.steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Gene Visualization */}
            <div className="flex gap-1">
              {step.genes.map((gene, geneIndex) => (
                <Gene key={geneIndex} status={gene.status} />
              ))}
            </div>
            
            {/* Step Description */}
            <div className="flex-1">
              <h5 className="font-medium text-slate-800">{step.title}</h5>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
        
        {/* Arrow between steps */}
        {pathway.steps.length > 1 && (
          <div className="flex justify-center">
            <motion.div
              className="text-2xl text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ↓
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}; 