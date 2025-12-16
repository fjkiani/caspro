'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type OracleScoreProps = {
  left: { title: string; value: string; subtitle?: string };
  right: { title: string; value: string; subtitle?: string };
  score: { title: string; value: string };
  className?: string;
};

const Panel: React.FC<{ 
  title: string; 
  value: string; 
  subtitle?: string; 
  align?: 'left' | 'center' 
}> = ({ title, value, subtitle, align = 'center' }) => (
  <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 h-full">
    <div className={`text-${align} w-full`}>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 my-2">{value}</p>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>}
    </div>
  </div>
);

const OracleScore: React.FC<OracleScoreProps> = ({ left, right, score, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Two-Column Layout (inline to avoid dependency) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-left max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Panel title={left.title} value={left.value} subtitle={left.subtitle} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Panel title={right.title} value={right.value} subtitle={right.subtitle} />
        </motion.div>
      </div>
      
      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <div className="bg-white dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center max-w-2xl mx-auto">
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{score.title}</p>
          {/* StatCard inline (avoiding dependency) */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mx-auto inline-block">
            <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-red-400">{score.value}</p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-2">Zeta Score</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OracleScore;

