'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { saeData } from '@/data/evidence/sae-data';

const SaeIntelligenceTeaser = () => {
  const firstCapability = saeData.capabilities[0];

  if (!firstCapability) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{firstCapability.title}</h2>
                  <span className="text-blue-600 font-semibold">SAE Intelligence</span>
                </div>
              </div>
              <p className="text-lg text-slate-700 mb-4">{firstCapability.scientific}</p>
              <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: firstCapability.business }} />
            </div>
            <div className="text-center">
              <p className="text-slate-700 text-lg mb-8" dangerouslySetInnerHTML={{ __html: firstCapability.genomicUseCases.replace(/\n/g, '<br />') }} />
              <Link href="/evidence/sae-intelligence" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl">
                Explore SAE Intelligence
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SaeIntelligenceTeaser;
