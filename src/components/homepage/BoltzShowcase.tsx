'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Shield, Activity } from 'lucide-react';
import { adaptBoltzForHomepage } from '@/data/adapters/platform-adapter';

const BoltzShowcase: React.FC = () => {
  const boltzData = adaptBoltzForHomepage();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-950 text-white" id="boltz-structural-validation">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent"
        >
          ⚡ {boltzData.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-300 text-center max-w-3xl mx-auto mb-4"
        >
          {boltzData.description}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16"
        >
          {boltzData.subtext}
        </motion.p>

        {/* Core Concept */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center mb-16"
        >
          <p className="text-lg text-slate-300 mb-6">
            {boltzData.content.about.coreConcept}
          </p>
          <p className="text-slate-400">
            You see a clear pLDDT confidence score, timing, and full provenance.
          </p>
        </motion.div>

        {/* Why It Matters */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {boltzData.whyItMatters.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-orange-400 font-mono text-lg mt-1">•</span>
                <p className="text-slate-300">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real Metrics (KPIs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {boltzData.kpis.map((kpi, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{kpi.value}</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">{kpi.label}</div>
              <div className="text-sm text-slate-400">{kpi.description}</div>
            </div>
          ))}
        </motion.div>
        
        {/* RUO Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg">
            <p className="text-amber-100 text-sm">
              <span className="font-semibold">Research Use Only:</span> {boltzData.content.ruoDisclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BoltzShowcase;
