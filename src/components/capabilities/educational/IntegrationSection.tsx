'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRight, Network } from 'lucide-react';
import { IntegrationSectionData } from '@/types/educational-capability';
import Link from 'next/link';
;

interface IntegrationSectionProps {
  data: IntegrationSectionData;
  className?: string;
}

export default function IntegrationSection({ data, className = '' }: IntegrationSectionProps) {
  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 ${className}`}>
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </motion.div>

        {/* Connections */}
        {data.connections && data.connections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              Connected Capabilities
            </h3>
            <div className="space-y-4">
              {data.connections.map((connection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Link2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-slate-900">{connection.from}</span>
                        <ArrowRight className="w-4 h-4 text-indigo-500" />
                        <span className="font-semibold text-indigo-700">{connection.to}</span>
                      </div>
                      <p className="text-slate-600">{connection.relationship}</p>
                    </div>
                    {connection.visual && (
                      <div className="flex-shrink-0">
                        {connection.visual}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Care Plan Context */}
        {data.carePlanContext && data.carePlanContext.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-indigo-200"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              Care Plan Integration
            </h3>
            <div className="space-y-4">
              {data.carePlanContext.map((context, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {context.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1">{context.component}</h4>
                    <p className="text-slate-600">{context.howThisHelps}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-lg text-slate-700 mt-12"
        >
          <span className="font-semibold text-slate-900">This capability is part of a complete, adaptive care plan</span>
          <br />
          <span className="text-indigo-600">that anticipates resistance, recommends combinations, and monitors continuously.</span>
        </motion.p>
      </div>
    </section>
  );
}

