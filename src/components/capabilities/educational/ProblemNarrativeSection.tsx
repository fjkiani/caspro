'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { ProblemNarrativeSectionData } from '@/types/educational-capability';

interface ProblemNarrativeSectionProps {
  data: ProblemNarrativeSectionData;
  className?: string;
}

export default function ProblemNarrativeSection({ data, className = '' }: ProblemNarrativeSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-white ${className}`}>
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
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Visual Metaphor */}
        {data.visualMetaphor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-red-200"
          >
            <p className="text-xl font-semibold text-slate-800 text-center italic">
              {data.visualMetaphor}
            </p>
          </motion.div>
        )}

        {/* Narrative Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div 
            className="text-slate-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ 
              __html: data.narrative
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^/, '<p class="mb-4">')
                .replace(/$/, '</p>')
            }} 
          />
        </motion.div>

        {/* Pain Points */}
        {data.painPoints && data.painPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {data.painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 hover:border-red-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{point.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Closing Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xl font-semibold text-slate-800 mt-12"
        >
          <span className="text-red-600">Until now.</span>
        </motion.p>
      </div>
    </section>
  );
}

