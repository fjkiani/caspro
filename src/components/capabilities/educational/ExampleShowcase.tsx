'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, TrendingUp } from 'lucide-react';
import { ExampleShowcaseData } from '@/types/educational-capability';

interface ExampleShowcaseProps {
  data: ExampleShowcaseData;
  className?: string;
}

export default function ExampleShowcase({ data, className = '' }: ExampleShowcaseProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 ${className}`}>
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Patient Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-8 shadow-xl border-2 border-amber-200"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Meet {data.patient.name}
              </h3>
              <div className="space-y-2">
                {data.patient.profile.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient's Question */}
          <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
            <p className="text-lg font-semibold text-slate-900 mb-2">Her Question:</p>
            <p className="text-slate-700 italic">"{data.patient.question}"</p>
          </div>
        </motion.div>

        {/* Solution Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            The Complete Solution
          </h3>
          <div className="space-y-4">
            {data.solution.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-700 mb-3">{step.description}</p>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm font-semibold text-green-800">
                        Result: {step.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Outcome Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-xl border-2 border-amber-200"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            Real-World Impact
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.outcome.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {outcome.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {outcome.metric}
                </div>
                <div className="text-sm text-slate-600">
                  {outcome.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-lg font-semibold text-slate-800 mt-12"
        >
          <span className="text-amber-600">Before:</span> Isolated recommendations. "Here's a drug." "Here's a trial." "Eat healthy."
          <br />
          <span className="text-green-600">After:</span> Complete care plan that adapts when biology adapts.
        </motion.p>
      </div>
    </section>
  );
}

