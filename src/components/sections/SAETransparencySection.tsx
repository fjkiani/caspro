'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const SAETransparencySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-slate-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                Traditional AI: Black Box
              </h3>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 sm:p-6 mb-4">
              <p className="text-slate-600 dark:text-slate-400 font-mono text-xs sm:text-sm mb-2">
                Variant: chr17:43044295:A&gt;T
              </p>
              <p className="text-slate-500 dark:text-slate-500 italic text-sm sm:text-base">
                "Variant of Unknown Significance"
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-2">
                ❌ No explanation • ❌ No biological reasoning • ❌ No trust
              </p>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p className="mb-2"><strong>Tempus:</strong> Black box predictions</p>
              <p className="mb-2"><strong>Foundation Medicine:</strong> Lookup tables only</p>
              <p><strong>Most AI platforms:</strong> No mechanistic explanations</p>
            </div>
          </motion.div>

          {/* Right: Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6" />
              <h3 className="text-xl sm:text-2xl font-bold">
                CrisPRO.ai: Transparent AI
              </h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-4">
              <p className="font-mono text-xs sm:text-sm mb-3 text-white/90">
                Variant: chr17:43044295:A&gt;T
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-300 font-mono">🧬 f15680:</span>
                  <span className="text-sm">Exon boundary disrupted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-300 font-mono">⚡ f24278:</span>
                  <span className="text-sm">Frameshift severity detected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-300 font-mono">🎯 f1050:</span>
                  <span className="text-sm">Splice site alteration</span>
                </div>
              </div>
              <p className="text-sm font-semibold mt-4 text-green-200">
                ✅ Pathogenic • ✅ Biological explanation • ✅ Trust
              </p>
            </div>
            <Link href="/products/oracle" className="inline-flex items-center gap-2 text-white hover:text-purple-200 transition-colors text-sm sm:text-base">
              See How It Works <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            The Only Cancer Genomics Platform with Mechanistically Interpretable AI
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Unlike black-box platforms, CrisPRO.ai shows you exactly what the AI is thinking. 
            Using <strong className="text-purple-600 dark:text-purple-400">Sparse Autoencoders (SAEs)</strong>, we reveal the{' '}
            <strong className="text-purple-600 dark:text-purple-400">32,768 biological features</strong> our models 
            learned—from exon boundaries to transcription factor binding sites—without any human annotation.
          </p>
          
          {/* SAE Feature Count Badge */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-sm sm:text-base font-semibold border border-purple-300 dark:border-purple-700">
              🧠 32,768 SAE Features
            </div>
            <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-full text-sm sm:text-base font-semibold border border-indigo-300 dark:border-indigo-700">
              🔍 100% Explainable
            </div>
            <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full text-sm sm:text-base font-semibold border border-green-300 dark:border-green-700">
              ✅ FDA-Ready Evidence
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

