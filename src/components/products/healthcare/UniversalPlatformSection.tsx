'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Dna, Activity } from 'lucide-react';
import { clinicalCarePlanContent } from '@/data/industry/clinical-care-plan-content';
import SectionHeader from '../shared/SectionHeader';

export default function UniversalPlatformSection() {
  const { universalPlatform } = clinicalCarePlanContent;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <SectionHeader
          title={universalPlatform.title}
          description={universalPlatform.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Cancer Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Dna className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Supported Cancer Types</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {universalPlatform.cancerTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border border-slate-200 text-center font-semibold text-slate-800"
                >
                  {type}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Biomarkers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Universal Biomarker Intelligence</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {universalPlatform.biomarkers.map((biomarker, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border border-slate-200 text-center font-semibold text-slate-800"
                >
                  {biomarker}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full">
            <Globe className="w-5 h-5" />
            <span className="font-semibold">One API call → Complete care plan for any cancer type</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

