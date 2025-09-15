import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';

export interface CaseStudyData {
  title: string;
  disease: string;
  description: string;
  components: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
  jsonOutput?: string;
  explanation?: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}

interface CaseStudyLayoutProps {
  data: CaseStudyData;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ data }) => (
  <motion.section
    key="case-study"
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
          {data.description}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
        {data.components.map((component, index) => (
          <motion.div
            key={index}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <component.icon size={48} className="text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{component.title}</h3>
            <p className="text-lg text-slate-300">{component.description}</p>
          </motion.div>
        ))}
      </div>

      {data.jsonOutput && (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 overflow-x-auto text-left">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">Live JSON Output</h3>
            <pre className="text-sm md:text-base text-slate-300 bg-slate-700 p-4 rounded-lg overflow-x-auto">
              <code>{data.jsonOutput}</code>
            </pre>
          </div>

          {data.explanation && (
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 text-left">
              <h3 className="text-2xl font-bold text-slate-200 mb-4">Why This Output Matters</h3>
              <div className="space-y-4">
                {data.explanation.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    <item.icon size={48} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl text-slate-200">{item.title}</h4>
                      <p className="text-lg text-slate-300 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </motion.section>
);


