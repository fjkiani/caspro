'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { VALIDATION_METRICS } from '@/data/products/rd-capabilities-data';

export default function RDValidationMetrics() {
  const validatedMetrics = VALIDATION_METRICS.filter(m => m.status === 'validated');
  const frameworkMetrics = VALIDATION_METRICS.filter(m => m.status === 'framework');

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Validation Metrics"
          subtitle="What we can prove today (outcome-linked validation)"
        />

        {/* Validated Metrics Table */}
        <div className="mt-12 mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Outcome-Linked Validation
          </h3>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">Capability</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">Metric</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">Value</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">What It Means</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-900">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {validatedMetrics.map((metric, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-4 px-6 font-medium text-slate-900">{metric.capability}</td>
                      <td className="py-4 px-6 text-slate-700">{metric.metric}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {metric.value}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700 text-sm">{metric.meaning}</td>
                      <td className="py-4 px-6 text-slate-600 text-xs font-mono">
                        {metric.receipt || 'JSON'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Framework Status */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Framework Status (Requires Partner Data)
          </h3>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Outcome Validation</h4>
                <p className="text-slate-700 text-sm">Framework ready. Partner collaboration for validation.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Integration Opportunities</h4>
                <p className="text-slate-700 text-sm">Framework capabilities exist. Exploration of integration pathways.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Regulatory Support</h4>
                <p className="text-slate-700 text-sm">Framework supports reporting. Ongoing development.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
