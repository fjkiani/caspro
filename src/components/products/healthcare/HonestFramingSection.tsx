'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { clinicalCarePlanContent } from '@/data/industry/clinical-care-plan-content';
import SectionHeader from '../shared/SectionHeader';

export default function HonestFramingSection() {
  const { honestFraming } = clinicalCarePlanContent;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <SectionHeader
          title={honestFraming.title}
          description="Transparent about what's validated and what's not. We focus on mechanism alignment, not outcome prediction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Validated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 p-8 rounded-2xl border-2 border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-slate-800">Validated Capabilities</h3>
            </div>
            <ul className="space-y-4">
              {honestFraming.validated.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Validated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <h3 className="text-2xl font-bold text-slate-800">Not Validated</h3>
            </div>
            <ul className="space-y-4">
              {honestFraming.notValidated.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Mechanism Alignment Assessment, Not Outcome Prediction</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                Our scores reflect how well each drug targets the disrupted pathways in this tumor. 
                They do NOT predict response rates or survival outcomes. We provide biological plausibility, 
                not clinical guarantees.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

