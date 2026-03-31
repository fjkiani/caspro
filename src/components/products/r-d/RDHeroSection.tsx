'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Target, Zap, Shield, FileText, Award, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rDProductData } from '@/data/products/r-d-data';

export default function RDHeroSection() {
  const capabilities = [
    {
      icon: Target,
      title: 'Target Discovery',
      description: '95.7% AUROC validation',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Therapeutic Design',
      description: '70% functional coherence',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Structural Validation',
      description: '95.8% confidence',
      color: 'orange'
    }
  ];

  return (
    <section className="relative pt-20 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <FlaskConical className="w-4 h-4" />
            THERAPEUTIC DEVELOPMENT PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
          >
            Pharma-Integrated Drug Development Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-4 leading-relaxed font-semibold"
          >
            Supporting mechanism-aligned patient selection and proactive pharmacovigilance
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            AI pharmacogenetics for cancer. We match patients to trials by molecular mechanism—not just histology—and provide genotype-guided dosing to prevent toxicity and optimize efficacy.
          </motion.p>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">95.7%</div>
              <div className="text-sm text-slate-600">Target Validation AUROC</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">70%</div>
              <div className="text-sm text-slate-600">Functional Coherence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">1 week</div>
              <div className="text-sm text-slate-600">vs 18 months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">99.8%</div>
              <div className="text-sm text-slate-600">Cost Reduction</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="#rd-capabilities">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <TestTube className="w-5 h-5 mr-3" />
                Try Design Demo
              </button>
            </Link>
            <Link to="#rd-metrics">
              <button className="inline-flex items-center px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                <Target className="w-5 h-5 mr-3" />
                View R&D Capabilities
              </button>
            </Link>
          </motion.div>
        </div>

        {/* R&D Capabilities Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const colorClasses = {
              blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'hover:bg-blue-200' },
              purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'hover:bg-purple-200' },
              orange: { bg: 'bg-orange-100', icon: 'text-orange-600', hover: 'hover:bg-orange-200' },
            };
            const colors = colorClasses[capability.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:${colors.hover} transition-colors`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {capability.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


