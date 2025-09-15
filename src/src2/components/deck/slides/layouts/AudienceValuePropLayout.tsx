import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

export interface AudienceValuePropData {
  title: string;
  audience: string;
  valueProp: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  quote?: string;
}

interface AudienceValuePropLayoutProps {
  data: AudienceValuePropData;
}

export const AudienceValuePropLayout: React.FC<AudienceValuePropLayoutProps> = ({ data }) => (
  <motion.section
    key="audience-value-prop"
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
          className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${
            data.audience === 'Clinicians' ? 'from-blue-400 to-indigo-400' : 'from-red-500 to-orange-500'
          }`}
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
          {data.valueProp}
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-around w-full mt-12">
        {data.steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.3 }}
          >
            <div className="p-4 rounded-full text-blue-500">
              <span className="text-4xl">{step.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-200">{step.title}</h3>
            <p className="text-lg text-slate-300">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
        <p className="text-xl font-semibold text-slate-200 mb-4">Business Impact</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.benefits.map((benefit, index) => (
            <div key={index} className={`bg-slate-700/50 p-4 rounded-lg border border-slate-600`}>
              <p className={`text-2xl font-bold text-${benefit.color}-400`}>{benefit.value}</p>
              <p className="text-sm text-slate-300">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>

      {data.quote && (
        <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-red-500 pl-6 text-left mt-12">
          {data.quote}
        </p>
      )}
    </div>
  </motion.section>
);


