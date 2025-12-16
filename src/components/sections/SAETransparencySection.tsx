'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const SAETransparencySection = () => {
  return (
    <section className="pt-0 pb-8 sm:pb-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-purple-950">
      <div className="container mx-auto px-4 pt-4 sm:pt-6">
        {/* Key Message - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
            The Only Cancer Genomics Platform with Mechanistically Interpretable AI
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed mb-6">
            Unlike black-box platforms, CrisPRO.ai shows you exactly what the AI is thinking. 
            Using <strong className="text-purple-600 dark:text-purple-400">Sparse Autoencoders (SAEs)</strong>, we reveal the{' '}
            <strong className="text-purple-600 dark:text-purple-400">32,768 biological features</strong> our models 
            learned—from exon boundaries to transcription factor binding sites—without any human annotation.
          </p>
          
          {/* SAE Feature Count Badge */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
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

        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* Left: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-200 dark:border-slate-700 shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-400 flex-shrink-0" />
              <h3 className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold text-slate-800 dark:text-white leading-tight">
                Traditional AI: Black Box
              </h3>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 mb-2 sm:mb-3 md:mb-4 flex-grow">
              <p className="text-slate-600 dark:text-slate-400 font-mono text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 break-all">
                chr17:43044295:A&gt;T
              </p>
              <p className="text-slate-500 dark:text-slate-500 italic text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight">
                "Variant of Unknown Significance"
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 dark:text-slate-600 mt-1 sm:mt-2 leading-tight">
                ❌ No explanation • ❌ No biological reasoning • ❌ No trust
              </p>
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <p className="leading-tight"><strong className="text-[9px] sm:text-[10px] md:text-xs">Tempus:</strong> <span className="text-[9px] sm:text-[10px] md:text-xs">Black box</span></p>
              <p className="leading-tight"><strong className="text-[9px] sm:text-[10px] md:text-xs">Foundation:</strong> <span className="text-[9px] sm:text-[10px] md:text-xs">Lookup only</span></p>
              <p className="leading-tight"><strong className="text-[9px] sm:text-[10px] md:text-xs">Most AI:</strong> <span className="text-[9px] sm:text-[10px] md:text-xs">No explanations</span></p>
            </div>
          </motion.div>

          {/* Right: Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 text-white shadow-xl flex flex-col"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
              <h3 className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold leading-tight">
                CrisPRO.ai: Transparent AI
              </h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 mb-2 sm:mb-3 md:mb-4 flex-grow">
              <p className="font-mono text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 text-white/90 break-all">
                chr17:43044295:A&gt;T
              </p>
              <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-purple-300 font-mono text-[9px] sm:text-xs flex-shrink-0">🧬 f15680:</span>
                  <span className="text-[10px] sm:text-xs md:text-sm leading-tight">Exon boundary disrupted</span>
                </div>
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-purple-300 font-mono text-[9px] sm:text-xs flex-shrink-0">⚡ f24278:</span>
                  <span className="text-[10px] sm:text-xs md:text-sm leading-tight">Frameshift severity</span>
                </div>
                <div className="flex items-start gap-1 sm:gap-2">
                  <span className="text-purple-300 font-mono text-[9px] sm:text-xs flex-shrink-0">🎯 f1050:</span>
                  <span className="text-[10px] sm:text-xs md:text-sm leading-tight">Splice site alteration</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold mt-2 sm:mt-3 md:mt-4 text-green-200 leading-tight">
                ✅ Pathogenic • ✅ Biological explanation • ✅ Trust
              </p>
            </div>
            <Link href="/products/oracle" className="inline-flex items-center gap-1 sm:gap-2 text-white hover:text-purple-200 transition-colors text-[10px] sm:text-xs md:text-sm lg:text-base mt-auto">
              See How It Works <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

