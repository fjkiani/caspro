'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Dna, Zap, Target, Shield, Factory } from 'lucide-react';

interface AboutHeroProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    keyMetrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  className?: string;
}

export default function AboutHero({ data, className = '' }: AboutHeroProps) {
  const saeFeatures = [
    {
      icon: Brain,
      title: 'Virus Hunter',
      description: 'Identifies viral sequences and prophage regions',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Dna,
      title: '3D Folding Master',
      description: 'Predicts protein structure from 1D sequences',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Genetic Surgery',
      description: 'Precise CRISPR guide RNA design and optimization',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Universal Knowledge',
      description: 'Cross-species biological understanding',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className={`py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* SAE Biological Mastery Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-200">
            SAE Biological Mastery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {saeFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-3`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-200 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-slate-200 mb-2">
                {metric.label}
              </div>
              <div className="text-sm text-slate-400">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Integration Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-200 mb-8">
            Complete AI Platform Integration
          </h3>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-300 font-medium">Oracle</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-400"></div>
            <div className="flex items-center space-x-2">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-300 font-medium">Forge</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-400"></div>
            <div className="flex items-center space-x-2">
              <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-300 font-medium">Boltz</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-400"></div>
            <div className="flex items-center space-x-2">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-300 font-medium">Command Center</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}