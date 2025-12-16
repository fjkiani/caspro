'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TransparencyComparisonCards } from './TransparencyComparisonCards';

export const AnnihilationOfUncertaintySlide: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex flex-col">
      <div className="container mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Annihilation of Uncertainty
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-6">
            Unlike black-box platforms, CrisPRO.ai shows you exactly what the AI is thinking. 
            Using <strong className="text-purple-600 dark:text-purple-400">Sparse Autoencoders (SAEs)</strong>, we reveal the{' '}
            <strong className="text-purple-600 dark:text-purple-400">32,768 biological features</strong> our models 
            learned—from exon boundaries to transcription factor binding sites—without any human annotation.
          </p>
          
          {/* SAE Feature Count Badge */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="px-4 py-2 bg-purple-900/40 text-purple-200 rounded-full text-sm sm:text-base font-semibold border border-purple-700">
              🧠 32,768 SAE Features
            </div>
            <div className="px-4 py-2 bg-indigo-900/40 text-indigo-200 rounded-full text-sm sm:text-base font-semibold border border-indigo-700">
              🔍 100% Explainable
            </div>
            <div className="px-4 py-2 bg-green-900/40 text-green-200 rounded-full text-sm sm:text-base font-semibold border border-green-700">
              ✅ FDA-Ready Evidence
            </div>
          </div>
        </motion.div>

        {/* Comparison Cards - Reusable */}
        <div className="flex-1 flex items-center">
          <TransparencyComparisonCards variant="slide" className="w-full" />
        </div>
      </div>
    </section>
  );
};

