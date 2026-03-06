'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { csiPatientExamples } from '@/data/homepage/csi-patient-examples';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';

export default function PatientExampleCard() {
  const example = csiPatientExamples[0]; // LATIFY scenario
  const config = FOCUSED_HERO_CONFIG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <div className="relative bg-[#0F1523] rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-widest">Research Scenario — LATIFY Trial</span>
          </div>
          <div className="space-y-6">
            <p className="text-base sm:text-lg font-semibold text-slate-200 leading-relaxed border-l-2 border-slate-700 pl-4">
              {example.name}, {example.age}, <span className="text-emerald-300">{example.cancer} cancer.</span> {example.scenario}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:flex-1 bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-inner text-center sm:text-left transition-all hover:border-blue-500/30">
                <div className="text-xs sm:text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wider">Match Score</div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">{example.result.score}</div>
                <div className="text-xs text-slate-500 mt-2 font-mono">Cosine similarity rank</div>
              </div>

              <div className="hidden sm:flex items-center justify-center relative w-12 h-12">
                <div className="absolute inset-0 bg-slate-800 rounded-full animate-ping opacity-20"></div>
                <ArrowRight className="w-6 h-6 text-slate-500 relative z-10" />
              </div>

              <div className="sm:hidden flex justify-center w-full py-2">
                <ArrowRight className="w-5 h-5 text-slate-500 rotate-90" />
              </div>

              <div className="w-full sm:flex-[2] bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-inner transition-all hover:border-purple-500/30">
                <div className="text-xs sm:text-sm text-slate-400 mb-2 font-semibold uppercase tracking-wider">Outcome Prediction</div>
                <div className="text-lg sm:text-xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">{example.result.recommendation}</div>
                <div className="text-sm text-slate-300 mt-2 font-medium">{example.result.probability}</div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800/80">
              <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-slate-400 italic leading-relaxed">
                  <span className="font-semibold text-slate-300">{example.validation}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Link
        href={config.cta.secondary.href}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm"
      >
        View LATIFY Validation <ArrowRight className="w-4 h-4" />
      </Link> */}
    </motion.div>
  );
}
