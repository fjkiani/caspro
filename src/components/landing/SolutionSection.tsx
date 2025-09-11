'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target, FileText } from 'lucide-react';

const SolutionSection: React.FC = () => {
  const transformation = [
    {
      step: 1,
      title: 'Plain Signals',
      description: 'Four clear chips: Function, Regulatory, Essentiality, Chromatin',
      icon: Target,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Ranked Therapies',
      description: 'Will-It-Work-For-Me with confidence scores and rationale',
      icon: CheckCircle,
      color: 'teal'
    },
    {
      step: 3,
      title: 'Trial Shortlist',
      description: '50+ trials → 5-12 relevant with clear eligibility',
      icon: FileText,
      color: 'green'
    },
    {
      step: 4,
      title: 'Complete Dossier',
      description: 'Exportable report with run IDs and full provenance',
      icon: ArrowRight,
      color: 'purple'
    }
  ];

  const colorVariants = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">The Solution</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            In-silico guidance you can read, trust, and share (research-mode)
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full text-lg font-semibold">
            <CheckCircle className="w-5 h-5" />
            Transform VUS into actionable insights in minutes
          </div>
        </motion.div>

        {/* Transformation Flow */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 via-green-500 to-purple-500 hidden lg:block transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformation.map((item, index) => {
              const IconComponent = item.icon;
              const theme = colorVariants[item.color as keyof typeof colorVariants];
              
              return (
                <motion.div
                  key={item.step}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center font-bold text-sm text-gray-600 z-10">
                    {item.step}
                  </div>

                  {/* Card */}
                  <div className={`relative overflow-hidden bg-white rounded-2xl p-6 border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${theme.bg}`}>
                      <IconComponent className={`w-6 h-6 ${theme.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold ${theme.text} mb-3`}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent}`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">95.7%</div>
            <div className="text-sm text-gray-600">AUROC across 53,210 variants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">40% → 15%</div>
            <div className="text-sm text-gray-600">VUS rate reduction target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$2.1M</div>
            <div className="text-sm text-gray-600">Saved per program</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
