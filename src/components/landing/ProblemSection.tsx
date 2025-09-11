'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, DollarSign, Users } from 'lucide-react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: '40% VUS Rate',
      description: 'Variants of Uncertain Significance block research progress',
      color: 'red'
    },
    {
      icon: Clock,
      title: 'Months of Delays',
      description: 'Researchers spend weeks on variants they can\'t interpret',
      color: 'orange'
    },
    {
      icon: DollarSign,
      title: '$2.1M Per Program',
      description: 'Exploratory experiments drain research budgets',
      color: 'yellow'
    },
    {
      icon: Users,
      title: 'Stalled Decisions',
      description: 'Clinical teams wait for clear variant guidance',
      color: 'purple'
    }
  ];

  const colorVariants = {
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'text-orange-500' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'text-purple-500' }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">The Research Bottleneck</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Precision medicine research is stalled by variants that can't be interpreted, 
            leading to costly delays and missed opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            const theme = colorVariants[problem.color as keyof typeof colorVariants];
            
            return (
              <motion.div
                key={problem.title}
                className={`relative overflow-hidden bg-white rounded-2xl p-6 border-2 ${theme.border} shadow-lg`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl mb-4 ${theme.bg}`}>
                  <IconComponent className={`w-6 h-6 ${theme.icon}`} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold ${theme.text} mb-3`}>
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.bg.replace('50', '500')}`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* Transformation Arrow */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <span className="text-lg font-semibold text-gray-600">But what if...</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <span className="text-lg font-semibold text-green-600">...we could solve this?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
