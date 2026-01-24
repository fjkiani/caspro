'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

/**
 * JourneyLevels - Compact Grid Layout (Reusing ProblemSolutionSection pattern)
 * Data-driven, no text dumps - clean, visual cards
 */
export default function JourneyLevels() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const colorThemes = {
    blue: {
      bg: 'from-blue-50 via-indigo-50 to-blue-50',
      border: 'border-blue-200',
      cardBg: 'from-white to-blue-50/30',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-700',
      accent: 'bg-blue-500',
      borderColor: 'border-blue-300',
    },
    purple: {
      bg: 'from-purple-50 via-pink-50 to-purple-50',
      border: 'border-purple-200',
      cardBg: 'from-white to-purple-50/30',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-700',
      accent: 'bg-purple-500',
      borderColor: 'border-purple-300',
    },
    orange: {
      bg: 'from-orange-50 via-amber-50 to-orange-50',
      border: 'border-orange-200',
      cardBg: 'from-white to-orange-50/30',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-700',
      accent: 'bg-orange-500',
      borderColor: 'border-orange-300',
    },
    green: {
      bg: 'from-green-50 via-emerald-50 to-green-50',
      border: 'border-green-200',
      cardBg: 'from-white to-green-50/30',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-700',
      accent: 'bg-green-500',
      borderColor: 'border-green-300',
    },
    indigo: {
      bg: 'from-indigo-50 via-blue-50 to-indigo-50',
      border: 'border-indigo-200',
      cardBg: 'from-white to-indigo-50/30',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-700',
      accent: 'bg-indigo-500',
      borderColor: 'border-indigo-300',
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="mb-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 rounded-3xl p-8 md:p-12 border-2 border-slate-200 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-sm font-semibold text-blue-800">5-Level Unlock Sequence</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            One Score. Complete Care Journey.
          </h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            CSI is just the beginning. As you add more data, we unlock more capabilities to guide the entire treatment journey.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span>Start with Level 1</span>
            <ArrowRight className="w-4 h-4" />
            <span>Progress through Levels 2-5</span>
            <ArrowRight className="w-4 h-4" />
            <span>Complete Care Plan</span>
          </div>
        </motion.div>

        {/* Capability Cards - Matching match-patients-to-therapies pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csiJourneyLevels.map((step, idx) => {
            const theme = colorThemes[step.color] || colorThemes.blue;
            const validationStatus = step.validation?.status === 'retrospective-tested' ? '✓ Retrospective Tested' : 
                                     step.validation?.status === 'proof-of-concept' ? '✓ Proof-of-Concept Ready' : 
                                     step.validation?.status === 'production' ? '✓ Production' : '';

            return (
              <Link key={step.level} href={step.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      delay: idx * 0.1,
                      ease: "easeOut"
                    }
                  } : { opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`
                    bg-gradient-to-br ${theme.bg} rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer
                    ${theme.border} hover:shadow-lg
                  `}
                >
                  <div className="flex items-start gap-3 mb-4">
                    {/* Level Badge */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full ${theme.accent} text-white flex items-center justify-center font-bold text-lg shadow-lg`}>
                        {step.level}
                      </div>
                      <div className="w-0.5 h-8 bg-slate-300"></div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center flex-shrink-0 text-2xl`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-600 mb-1 font-semibold">
                        Level {step.level}: {step.subtitle}
                      </div>
                      <div className={`text-xl font-bold ${theme.titleColor} line-clamp-2 mb-2`}>
                        {step.title}
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {step.metric}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {step.time}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">
                      View Details →
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
