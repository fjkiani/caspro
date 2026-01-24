'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import { Target, Shield, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { PLATFORM_PHASES } from '@/data/products/rd-capabilities-data';

export default function RDPlatformArchitecture() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Integrated Platform Architecture"
          subtitle="Supporting mechanism-aligned patient selection"
        />

        <div className="mt-12 space-y-8">
          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Phase 1: Mechanism-Aligned Patient Selection</h3>
                <p className="text-slate-700 mt-1">{PLATFORM_PHASES[0].description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {PLATFORM_PHASES[0].components.map((component, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-slate-900 mb-2">{component.name}</h4>
                  <p className="text-sm text-slate-700">{component.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-slate-400" />
          </div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border-2 border-orange-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Phase 2: Toxicity Risk Assessment</h3>
                <p className="text-slate-700 mt-1">{PLATFORM_PHASES[1].description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {PLATFORM_PHASES[1].components.map((component, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-slate-900 mb-2">{component.name}</h4>
                  <p className="text-sm text-slate-700">{component.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-slate-400" />
          </div>

          {/* Phase 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 border-2 border-indigo-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Phase 3: Regulatory Support (Exploratory)</h3>
                <p className="text-slate-700 mt-1">{PLATFORM_PHASES[2].description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {PLATFORM_PHASES[2].components.map((component, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-indigo-200">
                  <h4 className="font-semibold text-slate-900 mb-2">{component.name}</h4>
                  <p className="text-sm text-slate-700">{component.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-sm text-slate-700">
                <strong>Potential Value:</strong> Supporting regulatory workflows and evidence generation for accelerated pathways
              </p>
            </div>
          </motion.div>

          {/* Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-slate-900">Outcome: Unified Feasibility Score</h3>
            </div>
            <p className="text-slate-700 mb-4">
              Patient → Trial → Dose = Integrated assessment framework
            </p>
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="font-mono text-sm text-slate-700 space-y-2">
                <div>Mechanism Fit × Safety Score × Dose Confidence</div>
                <div className="border-t border-slate-200 pt-2">= UNIFIED PATIENT-TRIAL-DOSE FEASIBILITY SCORE</div>
                <div className="text-xs text-slate-500 mt-2">(Framework validated on synthetic test cases)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
