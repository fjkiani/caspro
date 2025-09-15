import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

export interface HeroIntroData {
  title: string;
  subtitle: string;
  description?: string;
  problem?: {
    title: string;
    description: string;
  };
  solution?: {
    title: string;
    description: string;
  };
  framework?: {
    components: Array<{
      letter: string;
      name: string;
      description: string;
      color: string;
    }>;
  };
  metrics?: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}

interface HeroIntroLayoutProps {
  data: HeroIntroData;
}

export const HeroIntroLayout: React.FC<HeroIntroLayoutProps> = ({ data }) => (
  <motion.section
    key="hero-intro"
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
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400"
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
          {data.subtitle}
        </motion.p>
        {data.description && (
          <motion.p
            className="text-xl text-slate-300 max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {data.description}
          </motion.p>
        )}
      </div>

      {(data.problem || data.solution) && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-12">
          {data.problem && (
            <motion.div
              className="text-center space-y-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-red-400">{data.problem.title}</h3>
              <p className="text-lg text-slate-300 max-w-md">
                {data.problem.description}
              </p>
            </motion.div>
          )}

          {data.solution && (
            <motion.div
              className="text-center space-y-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-green-400">{data.solution.title}</h3>
              <p className="text-lg text-slate-300 max-w-md">
                {data.solution.description}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {data.framework && (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
          <p className="text-xl font-semibold text-slate-200 mb-3">
            {data.framework.components[0]?.letter}/{data.framework.components[1]?.letter}/{data.framework.components[2]?.letter} Framework: {data.framework.components.map(c => c.name).join(' + ')} = Therapeutic Validation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {data.framework.components.map((component, index) => (
              <div key={index} className={`bg-${component.color}-500/20 p-3 rounded-lg border border-${component.color}-500/30`}>
                <span className={`text-${component.color}-400 font-bold text-lg`}>{component.letter}</span>
                <p className="text-slate-300 mt-1">{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.metrics.map((metric, index) => (
            <div key={index} className={`bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center`}>
              <p className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.section>
);


