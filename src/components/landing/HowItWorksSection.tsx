'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/data/homepage/how-it-works-content';

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    gradient: 'from-blue-500 to-cyan-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
    gradient: 'from-purple-500 to-indigo-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    gradient: 'from-green-500 to-emerald-600'
  }
};

export default function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Transform Drug Development with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Continuous Agentic Intelligence</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            From upload to Month 18+, our agents never stop working—tracking, analyzing, and alerting you to critical changes automatically.
          </p>
        </motion.div>

        {/* Steps Flow */}
        <div className="max-w-6xl mx-auto">
          {/* Visual Flow: Upload → Orchestrate → Track */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
              
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="flex-1 w-full"
                  >
                    <div className={`bg-white rounded-2xl p-8 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all h-full`}>
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 text-3xl`}>
                        {step.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-2xl font-bold mb-3 ${colors.text}`}>
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-slate-600 mb-6">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className={`${colors.text} mt-1`}>•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Arrow between steps */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      className="hidden md:block"
                    >
                      <ArrowRight className="w-8 h-8 text-slate-400" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



