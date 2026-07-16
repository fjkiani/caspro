'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * CoreQuestionSection — Section opener for CSI Journey
 * 
 * Decoupled from FOCUSED_HERO_CONFIG.problem to avoid duplicating
 * the hero headline ("We Predicted 5 Major Clinical Trials...").
 * Instead, frames the HOW: the 8-Dimensional Fingerprint.
 */
export default function CoreQuestionSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 sm:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 sm:mb-6 leading-tight">
        The 8-Dimensional Biological Fingerprint
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
        Every tumor has a unique biological signature — an mechanism-alignment mechanism vector covering DDR, IO, PI3K, MAPK, Efflux, and Replication Stress. CrisPRO reads this fingerprint to predict which drugs will work and which will fail.
      </p>
    </motion.div>
  );
}
