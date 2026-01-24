'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { csiPatientExamples } from '@/data/homepage/csi-patient-examples';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';

export default function PatientExampleCard() {
  const example = csiPatientExamples[0]; // Sarah's story
  const config = FOCUSED_HERO_CONFIG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Real Example</span>
        </div>
        <div className="space-y-3">
          <p className="text-lg font-semibold text-slate-900">
            {example.name}, {example.age}, {example.cancer} cancer. {example.scenario}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-slate-500 mb-1">CSI Score</div>
              <div className="text-3xl font-bold text-blue-600">{example.result.score}/100</div>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-600" />
            <div className="flex-1 bg-white rounded-lg p-4 border border-green-200">
              <div className="text-sm text-slate-500 mb-1">Recommendation</div>
              <div className="text-lg font-bold text-green-600">{example.result.recommendation}</div>
              <div className="text-sm text-slate-600">{example.result.probability}</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 italic">
            ✅ {example.validation}
          </p>
          <Link
            href={config.cta.secondary.href}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            View TOPACIO Validation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
