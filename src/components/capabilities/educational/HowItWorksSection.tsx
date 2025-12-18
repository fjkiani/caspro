'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Play, Pause } from 'lucide-react';
import { HowItWorksSectionData } from '@/types/educational-capability';

interface HowItWorksSectionProps {
  data: HowItWorksSectionData;
  className?: string;
}

export default function HowItWorksSection({ data, className = '' }: HowItWorksSectionProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0])); // First step expanded by default
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSteps(new Set(data.steps.map(s => s.number)));
  };

  const collapseAll = () => {
    setExpandedSteps(new Set([0]));
  };

  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.title}
          </h2>
          {data.interactive && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
              >
                Collapse All
              </button>
            </div>
          )}
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {data.steps.map((step, index) => {
            const isExpanded = expandedSteps.has(step.number);
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden"
              >
                {/* Step Header */}
                <button
                  onClick={() => data.interactive && toggleStep(step.number)}
                  className={`w-full p-6 flex items-center gap-4 text-left transition-colors ${
                    data.interactive ? 'hover:bg-slate-50 cursor-pointer' : ''
                  } ${isExpanded ? 'bg-blue-50' : ''}`}
                >
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                    isExpanded 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    {!isExpanded && (
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* Expand/Collapse Icon */}
                  {data.interactive && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  )}
                </button>

                {/* Step Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-200">
                        {/* Full Description */}
                        <p className="text-slate-700 leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Details Table */}
                        {step.details && step.details.length > 0 && (
                          <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <div className="grid md:grid-cols-2 gap-3">
                              {step.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="font-semibold text-slate-900 min-w-[100px]">
                                    {detail.label}:
                                  </span>
                                  <span className="text-slate-700">{detail.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Visual (if provided) */}
                        {step.visual && (
                          <div className="mt-4">
                            {step.visual}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        {data.interactive && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-sm text-slate-600">
                {expandedSteps.size} of {data.steps.length} steps expanded
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

