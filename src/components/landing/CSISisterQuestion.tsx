'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';

/**
 * CSI Sister Question Section
 * Shows ONE specific patient scenario where CSI is better than standard of care
 * Following Keytruda model: ONE scenario, ONE metric, ONE validation
 */
export default function CSISisterQuestion() {
  const config = FOCUSED_HERO_CONFIG;
  const useCase = config.primaryUseCase;
  const claim = config.primaryClaim;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            The Sister Question
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Can we point to a specific patient scenario where CSI is better than standard of care?
          </p>
        </motion.div>

        {/* Scenario Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-8 sm:p-10 mb-8"
        >
          {/* Scenario */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Scenario</span>
            </div>
            <p className="text-lg sm:text-xl text-slate-900 font-medium">
              {useCase.example.scenario}
            </p>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Question</span>
            </div>
            <p className="text-lg sm:text-xl text-slate-900 font-medium">
              {useCase.question}
            </p>
          </div>

          {/* Inputs */}
          <div className="mb-6 bg-slate-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">CSI Inputs</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(useCase.example.inputs).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{key}</div>
                    <div className="text-sm text-slate-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">CSI Result</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {useCase.example.result}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Validated: {useCase.validation}</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href={config.cta.primary.href}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <span>{config.cta.primary.text}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
