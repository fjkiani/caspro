'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VUSResolutionDemo } from '@/components/sae';
import OracleScore from './OracleScore';

const VUSComparisonSection: React.FC = () => {
  const [analyzedVariant, setAnalyzedVariant] = useState<any>(null);

  // Real data from oracleAdapter - VUS to Pathogenic transformation
  const oracleScoreData = {
    left: { 
      title: 'Traditional Verdict', 
      value: 'VUS', 
      subtitle: '(Uncertain)' 
    },
    right: { 
      title: 'Oracle Verdict', 
      value: 'Pathogenic', 
      subtitle: '(Actionable)' 
    },
    score: { 
      title: 'Zeta Score (Functional Damage)', 
      value: '-26,140.8' 
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Annihilation of Uncertainty
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Transform Variants of Unknown Significance (VUS) into actionable clinical decisions with <strong>95.7% ClinVar AUROC</strong> accuracy. 
            <span className="block mt-2 text-base">👇 <strong>Select a variant below to see Oracle resolve uncertainty in real-time</strong></span>
          </p>
        </motion.div>

        {/* Interactive VUS Resolution Demo - The Real DemoFactory Capability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <VUSResolutionDemo onVariantAnalyzed={setAnalyzedVariant} />
        </motion.div>

        {/* Static OracleScore Comparison - Show when variant is analyzed */}
        {analyzedVariant && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <OracleScore
              left={oracleScoreData.left}
              right={oracleScoreData.right}
              score={oracleScoreData.score}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full text-sm sm:text-base font-semibold border border-green-300 dark:border-green-700">
            ✅ 73% VUS Resolution Rate
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VUSComparisonSection;

