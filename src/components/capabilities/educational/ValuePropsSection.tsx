'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Users, CheckCircle } from 'lucide-react';
import { toxicityData } from '@/data/copilots/toxicity-data';

export default function ValuePropsSection() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield,
    FileText,
    Users,
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Value Propositions
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            How Toxicity Risk Assessment helps different audiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {toxicityData.valueProps.map((prop, idx) => {
            const Icon = iconMap[prop.icon] || Shield;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {prop.audience}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {prop.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

