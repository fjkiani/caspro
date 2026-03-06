'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Zap, Clock } from 'lucide-react';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

/**
 * JourneyLevels — 3 Engine Cards in responsive grid
 * Desktop: 3-column grid showing all cards
 * Mobile: stacked cards with staggered animation
 */
export default function JourneyLevels() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const colorThemes: Record<string, {
    bg: string; border: string; iconBg: string;
    iconColor: string; titleColor: string; accent: string;
    hoverBorder: string; hoverShadow: string;
  }> = {
    blue: {
      bg: 'bg-slate-800/40 backdrop-blur-sm', border: 'border-slate-700/50', iconBg: 'bg-blue-500/10 border-blue-500/20',
      iconColor: 'text-blue-400', titleColor: 'text-blue-100', accent: 'bg-blue-500',
      hoverBorder: 'hover:border-blue-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]'
    },
    purple: {
      bg: 'bg-slate-800/40 backdrop-blur-sm', border: 'border-slate-700/50', iconBg: 'bg-purple-500/10 border-purple-500/20',
      iconColor: 'text-purple-400', titleColor: 'text-purple-100', accent: 'bg-purple-500',
      hoverBorder: 'hover:border-purple-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]'
    },
    orange: {
      bg: 'bg-slate-800/40 backdrop-blur-sm', border: 'border-slate-700/50', iconBg: 'bg-orange-500/10 border-orange-500/20',
      iconColor: 'text-orange-400', titleColor: 'text-orange-100', accent: 'bg-orange-500',
      hoverBorder: 'hover:border-orange-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]'
    },
    green: {
      bg: 'bg-slate-800/40 backdrop-blur-sm', border: 'border-slate-700/50', iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      iconColor: 'text-emerald-400', titleColor: 'text-emerald-100', accent: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
    },
    indigo: {
      bg: 'bg-slate-800/40 backdrop-blur-sm', border: 'border-slate-700/50', iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      iconColor: 'text-indigo-400', titleColor: 'text-indigo-100', accent: 'bg-indigo-500',
      hoverBorder: 'hover:border-indigo-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]'
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="mb-16 bg-[#0B0F19] rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-800 relative overflow-hidden shadow-2xl"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 relative">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-50 pointer-events-none"></div>
            <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest relative z-10">Three Validated Engines</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-4">
            From Target Discovery to Resistance Detection
          </h3>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            Each engine is independently validated and connected — covering the full precision oncology pipeline from target identification through treatment monitoring.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {csiJourneyLevels.map((step, idx) => {
            const theme = colorThemes[step.color] || colorThemes.blue;
            return (
              <motion.div
                key={step.level}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {/* <Link href={step.href}> */}
                  <div
                    className={`${theme.bg} rounded-2xl p-6 border ${theme.border} ${theme.hoverBorder} ${theme.hoverShadow} transition-all duration-300 cursor-pointer h-full relative overflow-hidden group`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none" />

                    <div className="flex items-start gap-4 mb-6 relative z-10">
                      <div className={`w-10 h-10 rounded-xl ${theme.accent} text-white flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 rounded-xl pointer-events-none"></div>
                        <span className="relative z-10">{step.level}</span>
                      </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.iconBg} border flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl`}>
                        <span className={theme.iconColor}>{step.icon}</span>
                      </div>
                    </div>

                    <div className="relative z-10 mb-4">
                      <div className="text-xs sm:text-sm text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                        {step.subtitle}
                      </div>
                      <div className={`text-lg sm:text-xl font-bold ${theme.titleColor} mb-2`}>
                        {step.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Unlocks */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-4 relative z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Validated Capabilities</div>
                      <ul className="space-y-1.5">
                        {step.unlocks.slice(0, 3).map((unlock, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${theme.accent}`} />
                            <span className="leading-relaxed">{unlock}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50 relative z-10">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-slate-500" />
                          {step.metric}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {step.time}
                        </span>
                      </div>
                      {/* <span className={`text-xs sm:text-sm font-semibold ${theme.iconColor} group-hover:translate-x-1 transition-transform`}>
                        Details →
                      </span> */}
                    </div>
                  </div>
                {/* </Link> */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
