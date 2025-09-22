'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { adaptCommandCenterForHomepage } from '@/data/adapters/platform-adapter';

const CommandCenterShowcase: React.FC = () => {
  const commandCenterData = adaptCommandCenterForHomepage();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-950 text-white" id="command-center-orchestration">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent"
        >
          🎯 Command Center: Central Nervous System
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-300 text-center max-w-3xl mx-auto mb-4"
        >
          {commandCenterData.content.about.oneLiner}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16"
        >
          {commandCenterData.content.about.mission}
        </motion.p>

        {/* Core Concept */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center mb-16"
        >
          <p className="text-lg text-slate-300 mb-6">
            {commandCenterData.content.about.coreConcept}
          </p>
        </motion.div>

        {/* Real KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {commandCenterData.kpis.map((kpi, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{kpi.value}</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">{kpi.label}</div>
              {kpi.delta && (
                <div className={`text-sm ${kpi.delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.delta > 0 ? '+' : ''}{kpi.delta}%
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Kill Chain Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">In Silico Kill Chain</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {commandCenterData.killChain.states.map((state, idx) => (
              <div key={state.id} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold ${
                  state.status === 'done' ? 'bg-green-500' :
                  state.status === 'running' ? 'bg-blue-500' :
                  state.status === 'queued' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}>
                  {state.status === 'done' ? '✓' : 
                   state.status === 'running' ? '⟳' :
                   state.status === 'queued' ? '⏳' : '○'}
                </div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">{state.name}</h4>
                <p className="text-xs text-slate-400">{state.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {commandCenterData.keyFeatures.map((feature, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-mono text-lg mt-1">•</span>
                <p className="text-slate-300">{feature}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommandCenterShowcase;
