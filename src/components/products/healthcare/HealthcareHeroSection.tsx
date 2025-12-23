'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Shield, Search, Clock, Globe, TestTube } from 'lucide-react';
import Link from 'next/link';

export default function HealthcareHeroSection() {
  const capabilities = [
    {
      icon: Target,
      title: 'Resolve Genetic Uncertainty',
      description: '73% VUS resolution with zero-shot prediction',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Match Patients to Therapies',
      description: '100% Top-5 drug accuracy validated',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Predict Resistance Early',
      description: '6 months before imaging confirmation',
      color: 'orange'
    }
  ];

  return (
    <section className="relative pt-20 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
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
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Heart className="w-4 h-4" />
            COMPLETE CARE PLAN PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          >
            From VUS Uncertainty
            <br />
            <span className="text-slate-800">to Complete Care Plans</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            One system that handles everything: variant interpretation, drug ranking, 
            resistance prediction, toxicity prevention, and trial matching. Complete 
            care plans in minutes, not months.
          </motion.p>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">73%</div>
              <div className="text-sm text-slate-600">VUS Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-slate-600">Top-5 Drug Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">6 months</div>
              <div className="text-sm text-slate-600">Early Detection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">Universal</div>
              <div className="text-sm text-slate-600">Any Cancer Type</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#moat-capabilities">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <TestTube className="w-5 h-5 mr-3" />
                Try Care Plan Demo
              </button>
            </Link>
            <Link href="#moat-metrics">
              <button className="inline-flex items-center px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                <Target className="w-5 h-5 mr-3" />
                View MOAT Capabilities
              </button>
            </Link>
          </motion.div>
        </div>

        {/* MOAT Capabilities Preview */}
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


