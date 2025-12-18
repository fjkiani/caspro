'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { HeroQuestionSectionData } from '@/types/educational-capability';

interface HeroQuestionSectionProps {
  data: HeroQuestionSectionData;
  className?: string;
}

export default function HeroQuestionSection({ data, className = '' }: HeroQuestionSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {/* Question Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4"
        >
          The Question Nobody Was Answering
        </motion.h2>

        {/* Main Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-blue-200 mb-8"
        >
          <p className="text-xl md:text-2xl font-semibold text-slate-800 text-center mb-8 italic">
            "{data.question}"
          </p>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic Answer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-100 rounded-xl p-6 border-2 border-slate-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center">
                  <span className="text-white text-sm">❌</span>
                </div>
                <h3 className="font-semibold text-slate-700">Traditional Approach</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {data.genericAnswer}
              </p>
            </motion.div>

            {/* Our Answer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-400 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm">✅</span>
                </div>
                <h3 className="font-semibold text-blue-800">Our System's Answer</h3>
              </div>
              <p className="text-blue-900 leading-relaxed font-medium">
                {data.ourAnswer}
              </p>
            </motion.div>
          </div>

          {/* Visual Comparison (if provided) */}
          {data.visualComparison && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 pt-8 border-t border-slate-200"
            >
              <div className="flex items-center justify-center gap-4 text-slate-600">
                <div className="text-center">
                  <div className="text-sm font-semibold mb-2">Before</div>
                  <div className="bg-slate-100 rounded-lg p-4 text-sm">{data.visualComparison.before}</div>
                </div>
                <ArrowRight className="w-6 h-6 text-blue-500" />
                <div className="text-center">
                  <div className="text-sm font-semibold mb-2">After</div>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm border-2 border-blue-200">{data.visualComparison.after}</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-slate-600 text-lg"
        >
          <span className="font-semibold text-slate-800">Until now, nobody could answer that question.</span>
          <br />
          <span className="text-blue-600 font-semibold">We just built the first system that can.</span>
        </motion.p>
      </div>
    </section>
  );
}

