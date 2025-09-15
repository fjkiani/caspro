import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

export interface FrameworkExplanationData {
  title: string;
  framework: string;
  components: Array<{
    letter: string;
    name: string;
    icon: React.ComponentType<any>;
    description: string;
    color: string;
    example?: string;
  }>;
  clinicalExample?: {
    prediction: string;
    confidence: string;
    evidence: string;
  };
}

interface FrameworkExplanationLayoutProps {
  data: FrameworkExplanationData;
}

export const FrameworkExplanationLayout: React.FC<FrameworkExplanationLayoutProps> = ({ data }) => (
  <motion.section
    key="framework-explanation"
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
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
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
          {data.framework}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        {data.components.map((component, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.div
              className={`absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-${component.color}-500 to-${component.color}-600`}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            />
            <div className="relative z-10 flex items-start space-x-4">
              <motion.div
                animate={index === 1 ? { scale: [1, 1.1, 1] } : index === 2 ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: index === 1 ? 3 : 6, repeat: Infinity, delay: index * 2 }}
              >
                <component.icon size={48} className={`text-${component.color}-400 flex-shrink-0`} />
              </motion.div>
              <div>
                <motion.h3
                  className="text-2xl font-bold text-slate-200 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${component.color}-400 to-${component.color}-500`}>{component.letter}:</span> {component.name}
                </motion.h3>
                <motion.p
                  className="text-lg text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                >
                  {component.description}
                </motion.p>
                {component.example && (
                  <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className={`text-sm font-semibold text-${component.color}-400`}>Example: {component.example}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {data.clinicalExample && (
        <div className="md:col-span-1 lg:col-span-3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-left mt-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-200 mb-2">Clinical Decision Engine</h3>
              <p className="text-lg text-slate-300">Combines {data.framework} into treatment recommendations with confidence scores and auditable evidence manifests.</p>
              <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm font-semibold text-slate-200">Example Output:</p>
                <p className="text-sm text-slate-300"><strong>Prediction:</strong> {data.clinicalExample.prediction}</p>
                <p className="text-sm text-slate-300"><strong>Confidence:</strong> {data.clinicalExample.confidence}</p>
                <p className="text-sm text-slate-300"><strong>Evidence:</strong> {data.clinicalExample.evidence}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </motion.section>
);


