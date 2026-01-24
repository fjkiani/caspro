'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import { AlertTriangle } from 'lucide-react';

export default function RDChallengeSection() {
  const metrics = [
    { metric: 'Relative Risk Reduction (RRR)', meaning: 'Percentage of events prevented. 83.1% RRR = Prevents 83 out of 100 events that would have occurred', example: 'PREPARE: 83.1% RRR = 34.8% → 5.9% toxicity' },
    { metric: 'Risk Ratio (RR)', meaning: 'How many times more likely an event is. 4.28× RR = 4.3× more likely', example: 'CYP2C19: Poor/intermediate 4.3× more likely to have stroke' },
    { metric: 'Sensitivity', meaning: 'Percentage of true positives caught. 100% sensitivity = Catches all toxicities (0 false negatives)', example: 'Tier 2: 6/6 toxicities identified' },
    { metric: 'Specificity', meaning: 'Percentage of true negatives correctly identified. 10% specificity = Only 1/10 non-toxicities correctly identified (9 false positives)', example: 'Tier 2: Conservative design, requires expert review' },
    { metric: 'PPV (Positive Predictive Value)', meaning: 'Percentage of positive predictions that are correct. 40% PPV = 6/10 flags are correct, 4/10 need expert review', example: 'Tier 2: 6/15 flags are correct' },
    { metric: 'NPV (Negative Predictive Value)', meaning: 'Percentage of negative predictions that are correct. 100% NPV = When system clears a patient, they are safe', example: 'Tier 2: 1/1 cleared cases are safe' },
    { metric: '0.983 DDR fit', meaning: 'Mechanism alignment score (0-1 scale). 0.983 = 98.3% biological similarity', example: 'Near-perfect alignment between patient and drug mechanism' },
    { metric: 'Top-3 Accuracy: 1.00', meaning: 'Percentage of correct answers in top 3. 1.00 = 100% (all correct trials in top 3)', example: 'Perfect ranking performance' },
    { metric: 'MRR: 0.75', meaning: 'Mean Reciprocal Rank. 0.75 = Correct answer ranked #1.33 on average', example: 'Good ranking (closer to 1.0 is better)' },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Challenge: Clinical Trial Success"
          subtitle="Clinical drug development faces ongoing challenges with trial success rates"
        />

        <div className="mt-12 space-y-8">
          {/* Industry Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Industry Context</h3>
                <p className="text-slate-700 leading-relaxed">
                  Traditional eligibility criteria typically focus on demographic and clinical factors (age, stage, prior therapy) but may not fully capture whether a patient's tumor biology aligns with a drug's mechanism of action.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Exploration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Exploration</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Mechanism Fit Score</h4>
                <p className="text-slate-700 text-sm">
                  Exploring whether mechanism-based matching can complement traditional eligibility criteria
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Goal</h4>
                <p className="text-slate-700 text-sm">
                  Understanding if biological alignment data can help inform patient selection decisions
                </p>
              </div>
            </div>
          </motion.div>

          {/* Metrics Reference Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Reference: What Our Numbers Mean</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Metric</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">What It Means</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">{item.metric}</td>
                      <td className="py-3 px-4 text-slate-700 text-sm">{item.meaning}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{item.example}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
