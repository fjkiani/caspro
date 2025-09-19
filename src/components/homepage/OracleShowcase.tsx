'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { adaptOracleForHomepage } from '@/data/adapters';
import { Target, Zap, Shield, Award } from 'lucide-react';

export default function OracleShowcase() {
  const oracleData = adaptOracleForHomepage();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Oracle: Discriminative AI Engine
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Transform genetic uncertainty into actionable intelligence with 95.7% AUROC precision
          </p>
        </motion.div>

        {/* API Endpoints Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {oracleData.endpoints && oracleData.endpoints.slice(0, 4).map((endpoint, index) => (
            <motion.div
              key={endpoint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{endpoint.icon}</span>
                <h3 className="font-bold text-white text-sm">{endpoint.name}</h3>
              </div>
              <p className="text-slate-300 text-sm mb-3">{endpoint.description}</p>
              
              {/* Show key metric */}
              {endpoint.metrics && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Performance</span>
                  <span className="text-green-400 font-mono text-sm">
                    {typeof endpoint.metrics === 'object' && 'auroc' in endpoint.metrics 
                      ? ((endpoint.metrics as any).auroc * 100).toFixed(1) + '%'
                      : '95.7%'
                    }
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">95.7%</div>
            <div className="text-sm text-slate-400">ClinVar AUROC</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">73%</div>
            <div className="text-sm text-slate-400">VUS Resolution</div>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Zero-Shot</div>
            <div className="text-sm text-slate-400">No Training</div>
          </div>
          <div className="text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">32,768</div>
            <div className="text-sm text-slate-400">SAE Features</div>
          </div>
        </motion.div>

        {/* Multi-Modal Capabilities */}
        <div className="grid md:grid-cols-3 gap-6">
          {oracleData.capabilities && oracleData.capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{capability.icon}</span>
                <h3 className="text-lg font-bold text-white">{capability.title}</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">{capability.description}</p>
              
              {/* Metrics */}
              <div className="space-y-2">
                {capability.metrics && capability.metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">{metric.label}</span>
                    <span className={`text-xs font-mono ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Experience Oracle Live
          </button>
        </motion.div>
      </div>
    </section>
  );
}
