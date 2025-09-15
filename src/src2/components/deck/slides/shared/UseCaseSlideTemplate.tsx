import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import DigitalSynapseBackground from '../../../site/blocks/DigitalSynapseBackground.tsx';

interface UseCaseSlideProps {
  title: string;
  subtitle: string;
  jsonOutput: string;
  explanations: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  footnote?: string;
  runId?: string;
}

const UseCaseSlideTemplate: React.FC<UseCaseSlideProps> = ({
  title,
  subtitle,
  jsonOutput,
  explanations,
  footnote = "Research-mode; cohort-dependent",
  runId
}) => {
  return (
    <motion.section
      key="use-case-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
      <DigitalSynapseBackground />
      <div className="relative z-10 w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300">
            {subtitle}
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-start">
          {/* Left Panel - Live JSON Output */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 overflow-x-auto text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Code2 size={24} className="text-cyan-400" />
              <h3 className="text-2xl font-bold text-slate-200">Live JSON Output</h3>
            </div>
            <pre className="text-sm md:text-base text-slate-300 bg-slate-700 p-4 rounded-lg overflow-x-auto">
              <code>{jsonOutput}</code>
            </pre>
          </motion.div>

          {/* Right Panel - Explanations */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 text-left"
          >
            <h3 className="text-2xl font-bold text-slate-200 mb-6">What This Output Means</h3>
            <div className="space-y-6">
              {explanations.map((explanation, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-2 bg-slate-700/50 rounded-lg">
                    {explanation.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-200 mb-2">{explanation.title}</h4>
                    <p className="text-lg text-slate-300">{explanation.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-slate-800/30 p-4 rounded-xl border border-slate-600 text-center"
        >
          <p className="text-slate-400">
            {footnote}
            {runId && (
              <span className="ml-2 text-cyan-400 font-mono text-sm">
                • Run ID: {runId}
              </span>
            )}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UseCaseSlideTemplate;
