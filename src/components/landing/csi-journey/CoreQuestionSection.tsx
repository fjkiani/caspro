'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';

export default function CoreQuestionSection() {
  const problem = FOCUSED_HERO_CONFIG.problem;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
        {problem.headline.split('?')[0]}?<br />
        <span className="text-blue-600">For How Long?</span><br />
        <span className="text-slate-600">When Should We Stop?</span>
      </h2>
      <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Our mission: <strong className="text-slate-900">Reduce unnecessary chemo</strong> by answering these critical questions before treatment starts.
      </p>
    </motion.div>
  );
}
