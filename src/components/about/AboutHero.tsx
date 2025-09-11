'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Clock } from 'lucide-react';

interface AboutHeroProps {
  title: string;
  subtitle: string;
  description: string;
  keyMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

const AboutHero: React.FC<AboutHeroProps> = ({ title, subtitle, description, keyMetrics }) => {
  const iconMap = {
    'ClinVar AUROC': Target,
    'VUS Resolution': TrendingUp,
    'R&D Acceleration': Clock
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{title}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-8">{subtitle}</p>
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {keyMetrics.map((metric, index) => {
            const IconComponent = iconMap[metric.label as keyof typeof iconMap] || Target;
            
            return (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="inline-flex p-4 bg-blue-50 rounded-xl mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
