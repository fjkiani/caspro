'use client';

import React from 'react';
import { motion } from 'framer-motion';
;
import { Target, Users, Pill, AlertTriangle, Route, Network } from 'lucide-react';
import Link from 'next/link';

interface Capability {
  title: string;
  description: string;
  link: string;
  icon: string;
  metrics?: string[];
  color: string;
}

interface DetailedCapabilitiesSectionProps {
  capabilities: Capability[];
  className?: string;
}

const iconMap = {
  Target,
  Users,
  Pill,
  AlertTriangle,
  Route,
  Network
};

export default function DetailedCapabilitiesSection({
  capabilities,
  className = ''
}: DetailedCapabilitiesSectionProps) {
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Explore <span className="text-blue-600">Detailed Capabilities</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Each capability in CrisPRO Oncology is powered by specialized co-pilots with interactive demos and deep-dive documentation.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon as keyof typeof iconMap] || Target;

            return (
              <motion.div
                key={capability.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={capability.link}>
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6 h-full hover:border-blue-300 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors`}>
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                          {capability.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {capability.description}
                        </p>
                      </div>
                    </div>

                    {/* Metrics */}
                    {capability.metrics && capability.metrics.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {capability.metrics.map((metric, metricIndex) => (
                          <div key={metricIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-slate-500 font-medium">{metric}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                        Try Interactive Demo →
                      </span>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 mb-6">
            Want to see how these capabilities work together? Generate a unified care plan.
          </p>
          <Link
            href="/api/complete_care/universal"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <Network className="w-5 h-5" />
            Generate Unified Care Plan
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
