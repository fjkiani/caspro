'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';

const FusionWorkflowTeaser = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex p-5 bg-slate-100 rounded-3xl mb-8">
            <Layers className="w-10 h-10 text-slate-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-6">
            Fusion Workflow: End-to-End Therapeutic Pipeline
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12">
            Complete RUO workflow combining discriminative and generative AI for therapeutic discovery, from problem framing to validated designs ready for wet-lab validation.
          </p>
          <Link href="/about#fusion-workflow" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors shadow-xl">
            See the Full Workflow
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FusionWorkflowTeaser;
