'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Dna, FlaskConical, Code, ArrowRight } from 'lucide-react';
import { adaptForgeForHomepage } from '@/data/adapters';
import ForgeSimulation from '@/components/simulations/generative/ForgeSimulation';

const ForgeShowcase: React.FC = () => {
  const [selectedAPI, setSelectedAPI] = useState('generate_crispr_payload');
  const forgeData = adaptForgeForHomepage();

  const apiIcons = {
    'generate_crispr_payload': Target,
    'generate_repair_template': Code,
    'generate_therapeutic_protein': FlaskConical,
    'generate_genomic_sequence': Dna,
    'generate_regulatory_element': Zap
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            Forge: Generative AI Engine
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {forgeData.content.about.oneLiner}
          </p>
        </div>

        {/* API Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {forgeData.apis.map((api) => {
            const Icon = apiIcons[api.id as keyof typeof apiIcons] || Zap;
            return (
              <button
                key={api.id}
                onClick={() => setSelectedAPI(api.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
                  selectedAPI === api.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{api.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected API Simulation */}
        <div className="mb-12">
          <ForgeSimulation apiId={selectedAPI} />
        </div>

        {/* Capabilities Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Multi-Modal Generation Capabilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forgeData.capabilities.map((capability) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{capability.icon}</span>
                  <h4 className="text-lg font-bold text-white">{capability.title}</h4>
                </div>
                <p className="text-slate-300 mb-4 text-sm">{capability.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {capability.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-lg font-bold ${
                        metric.color === 'green' ? 'text-green-400' : 
                        metric.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-1">
                  {capability.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Therapeutic Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(forgeData.useCases).slice(0, 4).map(([key, useCase]: [string, any]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{useCase.icon}</span>
                  <h4 className="text-lg font-bold text-white">{useCase.title}</h4>
                </div>
                <p className="text-slate-300 mb-4 text-sm">{useCase.description}</p>
                
                {/* Workflow Preview */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-slate-400 mb-2">WORKFLOW:</h5>
                  <ol className="text-sm text-slate-300 space-y-1">
                    {useCase.workflow.slice(0, 3).map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-mono text-xs mt-1">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(useCase.metrics).slice(0, 4).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <div className="text-green-400 font-mono">{value}</div>
                      <div className="text-slate-400 capitalize text-xs">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            Explore All Forge APIs
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ForgeShowcase;
