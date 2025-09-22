'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Factory, Beaker, FlaskConical, Shield, ArrowUp } from 'lucide-react';

interface BridgingValleyOfDeathProps {
  className?: string;
}

const BridgingValleyOfDeath: React.FC<BridgingValleyOfDeathProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Replacing ambiguity with a <strong>deterministic launchpad</strong> through AI-powered intelligence.
          </p>
        </motion.div>

        <div className="flex flex-col items-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <FlaskConical size={32} className="text-slate-400" />
            <p className="text-xl font-semibold text-slate-600">10,000+ Potential Starting Points</p>
            <FlaskConical size={32} className="text-slate-400" />
          </motion.div>

          <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-blue-300"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-blue-100/50 border-2 border-blue-400 p-8 rounded-2xl w-full max-w-4xl shadow-xl"
          >
            <h3 className="text-3xl font-bold text-blue-700 text-center mb-8">
              The CrisPRO.ai Intelligence Platform
            </h3>
            
            <div className="relative w-full pt-20 pb-12">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-8"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 -translate-y-8 opacity-75"></div>
              
              <div className="relative flex justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="w-1/3 px-4"
                >
                  <div className="relative bg-white p-6 rounded-2xl border-2 border-blue-400 shadow-xl text-center h-full">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                      <Target size={32} />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">1. Target Validation</h4>
                    <p className="text-lg text-slate-600 mb-4">
                      Replace years of exploration with a <strong>60-second in-silico verdict</strong>.
                    </p>
                    <div className="text-sm text-blue-600 font-semibold">
                      95.7% ClinVar AUROC
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="w-1/3 px-4"
                >
                  <div className="relative bg-white p-6 rounded-2xl border-2 border-purple-400 shadow-xl text-center h-full">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                      <Factory size={32} />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">2. Lead Engineering</h4>
                    <p className="text-lg text-slate-600 mb-4">
                      Make screening obsolete by <strong>engineering optimized leads</strong> from first principles.
                    </p>
                    <div className="text-sm text-purple-600 font-semibold">
                      70% Pfam-hit rate
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="w-1/3 px-4"
                >
                  <div className="relative bg-white p-6 rounded-2xl border-2 border-orange-400 shadow-xl text-center h-full">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                      <Beaker size={32} />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">3. Pre-Clinical Confirmation</h4>
                    <p className="text-lg text-slate-600 mb-4">
                      Shift confirmation from expensive wet lab to <strong>near-zero-cost in-silico trial</strong>.
                    </p>
                    <div className="text-sm text-orange-600 font-semibold">
                      DMS Validated
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="w-px h-12 bg-gradient-to-b from-blue-300 to-emerald-400 relative flex justify-center">
            <ArrowUp size={32} className="text-emerald-500 absolute -bottom-4 animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center space-x-8"
          >
            <div className="flex items-center space-x-2">
              <Shield size={48} className="text-emerald-600" />
              <Shield size={48} className="text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-700">
              A Portfolio of High-Certainty Assets
            </p>
            <div className="flex items-center space-x-2">
              <Shield size={48} className="text-emerald-600" />
              <Shield size={48} className="text-emerald-600" />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl text-gray-800 max-w-4xl mx-auto pt-8 font-bold text-center"
        >
          We don't gamble on discovery; we <span className="text-emerald-600">engineer success</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default BridgingValleyOfDeath;