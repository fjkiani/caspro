'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Database, Target, BookOpen, Zap, TrendingUp } from 'lucide-react';

export default function ResearchAccelerationMetrics() {
  const metrics = [
    {
      icon: Clock,
      value: "Months → Hours",
      label: "Hypothesis Validation Time",
      description: "Accelerate research from traditional timelines to AI-powered insights",
      color: "blue"
    },
    {
      icon: Database,
      value: "50+",
      label: "Diseases Supported",
      description: "Universal testing across all major disease categories",
      color: "purple"
    },
    {
      icon: Target,
      value: "110M+",
      label: "Compounds Queryable",
      description: "Access to PubChem and ChEMBL compound libraries",
      color: "green"
    },
    {
      icon: BookOpen,
      value: "Multi-Source",
      label: "Literature Integration",
      description: "PubMed, OpenAlex, S2 evidence synthesis",
      color: "teal"
    },
    {
      icon: Zap,
      value: "73%",
      label: "VUS Resolution Rate",
      description: "Convert unknown variants to actionable insights",
      color: "orange"
    },
    {
      icon: TrendingUp,
      value: "12x",
      label: "Research Acceleration",
      description: "Faster discovery with complete audit trails",
      color: "indigo"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            RESEARCH ACCELERATION METRICS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Transform Research Timelines
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Every research hypothesis validated in hours, not months. Complete audit trails
            ensure reproducible, publication-ready results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={`bg-gradient-to-br from-${metric.color}-50 to-white p-8 rounded-2xl shadow-lg border border-${metric.color}-100 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 bg-${metric.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${metric.color}-200 transition-colors`}>
                <metric.icon className={`w-8 h-8 text-${metric.color}-600`} />
              </div>

              <div className="mb-4">
                <div className={`text-3xl font-bold text-${metric.color}-600 mb-2`}>
                  {metric.value}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {metric.label}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>

              {/* Progress indicator for applicable metrics */}
              {metric.label === 'VUS Resolution Rate' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Resolution Rate</span>
                    <span>73%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: '73%' }}></div>
                  </div>
                </div>
              )}

              {metric.label === 'Research Acceleration' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Speed Improvement</span>
                    <span>12x</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Join thousands of researchers who have accelerated their discovery timelines
            with AI-powered hypothesis validation and evidence synthesis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Research Acceleration
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
              View Research Tools
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
