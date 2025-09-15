import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

export interface EvidencePrinciplesData {
  title: string;
  principles: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    details?: Array<{ label: string; value: string }>;
  }>;
  metrics: Array<{ value: string; label: string; color: string }>;
}

interface EvidencePrinciplesLayoutProps {
  data: EvidencePrinciplesData;
}

export const EvidencePrinciplesLayout: React.FC<EvidencePrinciplesLayoutProps> = ({ data }) => (
  <motion.section
    key="evidence-principles"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
  >
    <DigitalSynapseBackground />
    <div className="relative z-10 w-full max-w-6xl space-y-12">
      <div className="space-y-4">
        <motion.h1
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {data.title}
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl font-light text-slate-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Clinical-Grade Predictions with Full Transparency
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
        {data.principles.map((principle, index) => (
          <motion.div
            key={index}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <principle.icon size={48} className="text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{principle.title}</h3>
            <p className="text-lg text-slate-300">{principle.description}</p>
            {principle.details && (
              <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm font-semibold text-blue-400">Key Points</p>
                {principle.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-slate-300">{detail.label}: {detail.value}</p>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
        <p className="text-xl font-semibold text-slate-200 mb-4">Clinical-Grade Assurance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-slate-700/50 p-4 rounded-lg border border-slate-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
            >
              <p className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-lg text-slate-300 mt-4">Every prediction is <strong>clinically safe, fully auditable, and reproducible</strong> - the standard for regulatory approval.</p>
      </div>
    </div>
  </motion.section>
);


