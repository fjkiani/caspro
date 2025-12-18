'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { SolutionNarrativeSectionData } from '@/types/educational-capability';

interface SolutionNarrativeSectionProps {
  data: SolutionNarrativeSectionData;
  className?: string;
}

export default function SolutionNarrativeSection({ data, className = '' }: SolutionNarrativeSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Narrative Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div 
            className="text-slate-700 leading-relaxed text-lg bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200"
            dangerouslySetInnerHTML={{ 
              __html: data.narrative
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^/, '<p class="mb-4">')
                .replace(/$/, '</p>')
            }} 
          />
        </motion.div>

        {/* Key Features */}
        {data.keyFeatures && data.keyFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {data.keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-xl p-6 border-2 ${
                  feature.status === 'implemented' 
                    ? 'border-green-400 shadow-lg' 
                    : 'border-slate-200'
                } hover:shadow-xl transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    feature.status === 'implemented' 
                      ? 'bg-green-100' 
                      : 'bg-slate-100'
                  }`}>
                    {feature.status === 'implemented' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                      {feature.status === 'implemented' && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          ✅ Implemented
                        </span>
                      )}
                      {feature.status === 'planned' && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">
                          🔜 Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Visual Flow (if provided) */}
        {data.visualFlow && data.visualFlow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              How It Works
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {data.visualFlow.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg">
                      {step.number}
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-600 max-w-[200px]">{step.description}</p>
                  </motion.div>
                  {index < data.visualFlow!.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-green-500 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}

        {/* Closing Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-xl font-semibold text-slate-800 mt-12"
        >
          <span className="text-green-600">This is the first system that connects</span>
          <br />
          <span className="text-slate-900">toxicity detection to precision nutrition.</span>
        </motion.p>
      </div>
    </section>
  );
}

