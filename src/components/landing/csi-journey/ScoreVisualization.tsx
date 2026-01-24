'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { csiScoreExamples } from '@/data/homepage/csi-score-examples';

export default function ScoreVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-8 sm:p-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            One Simple Score Answers Everything
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            CSI (ChemoSensitivity Index) is a score from 0-100 that predicts how well chemo will work for this specific patient, right now.
          </p>
        </div>

        {/* Visual Score Display - Data-Driven */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {csiScoreExamples.map((example, index) => {
            const Icon = example.icon;
            return (
              <motion.div
                key={example.score}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`${example.bgColor} rounded-2xl p-6 border-2 ${example.borderColor}`}
              >
                <div className="text-center mb-4">
                  <div className={`text-5xl font-bold ${example.iconColor} mb-2`}>
                    {example.score}
                  </div>
                  <div className={`text-sm font-semibold ${example.textColor} uppercase tracking-wide`}>
                    {example.label}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon className={`w-5 h-5 ${example.iconColor} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-900">{example.recommendation}</div>
                      <div className="text-sm text-slate-600">{example.description}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className={`w-5 h-5 ${example.iconColor} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-900">{example.benefit}</div>
                      <div className="text-sm text-slate-600">Expected response duration</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
