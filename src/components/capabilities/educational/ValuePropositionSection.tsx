'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, CheckCircle, X } from 'lucide-react';
import { ValuePropositionSectionData } from '@/types/educational-capability';

interface ValuePropositionSectionProps {
  data: ValuePropositionSectionData;
  className?: string;
}

export default function ValuePropositionSection({ data, className = '' }: ValuePropositionSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 ${className}`}>
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 mb-8 shadow-xl border-2 border-purple-200"
        >
          <p className="text-xl font-semibold text-slate-800 text-center mb-8 italic">
            "{data.question}"
          </p>

          {/* Response Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic Response */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-100 rounded-xl p-6 border-2 border-slate-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <X className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-slate-700">Generic AI Response</h3>
              </div>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-slate-600 border border-slate-200">
                <pre className="whitespace-pre-wrap">{data.genericResponse}</pre>
              </div>
            </motion.div>

            {/* Our Response */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-400 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-purple-800">Our System's Response</h3>
              </div>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-purple-900 border-2 border-purple-200">
                <pre className="whitespace-pre-wrap">{data.ourResponse}</pre>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        {data.comparison && data.comparison.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200 overflow-x-auto"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              Feature Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                    <th className="text-center p-4 font-semibold text-slate-600">Generic AI</th>
                    <th className="text-center p-4 font-semibold text-purple-800">Our System</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="border-b border-slate-100 hover:bg-purple-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-slate-900">{row.feature}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 text-slate-600">
                          {row.generic === 'None' || row.generic.startsWith('❌') ? (
                            <>
                              <X className="w-4 h-4 text-red-500" />
                              <span>{row.generic.replace('❌', '').trim() || 'None'}</span>
                            </>
                          ) : (
                            <span>{row.generic}</span>
                          )}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 text-purple-800 font-semibold">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{row.ourSystem}</span>
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Infographic (if provided) */}
        {data.infographic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            {/* Render infographic table */}
            {data.infographic && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      {data.infographic.headers.map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-900 bg-slate-50">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {data.infographic.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {data.infographic!.headers.map((header, colIdx) => (
                          <td key={colIdx} className="px-4 py-3 text-sm text-slate-700">
                            {row[header] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
          <span className="text-purple-600">That's the difference.</span>
          <br />
          <span className="text-slate-900">Not generic advice. Precision nutrition for precision oncology.</span>
        </motion.p>
      </div>
    </section>
  );
}

