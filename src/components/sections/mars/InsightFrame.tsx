"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import type { InsightConfig } from '@/data/insight-frame-data';

// --- Status Badge ---
const StatusBadge = ({ pass }: { pass: boolean | null }) => {
  if (pass === null) return null;
  return pass ? (
    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline-block mr-2 flex-shrink-0" />
  ) : (
    <XCircle className="w-3.5 h-3.5 text-red-500 inline-block mr-2 flex-shrink-0" />
  );
};

// ==============================================================================
// INSIGHT FRAME — renders any InsightConfig into a comparison table
// ==============================================================================

interface InsightFrameProps {
  config: InsightConfig;
}

export const InsightFrame: React.FC<InsightFrameProps> = ({ config }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const Icon = config.icon;

  return (
    <div ref={sectionRef} className="max-w-[1200px] mx-auto px-12">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <Icon className={`w-5 h-5 ${config.highlightColor} opacity-80`} />
          <span className={`text-[9px] font-black uppercase tracking-[0.5em] ${config.highlightColor} opacity-60`}>
            {config.tagLabel}
          </span>
        </div>
        <h2 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight max-w-2xl ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {config.headline}{' '}
          <span className={config.highlightColor}>{config.highlight}</span>
        </h2>
      </motion.div>

      {/* Comparison Table */}
      <div className={`border rounded overflow-hidden ${isDarkMode ? 'border-zinc-800/60' : 'border-slate-200'}`}>

        {/* Column Headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`grid grid-cols-[260px_1fr_1fr] border-b ${isDarkMode ? 'border-zinc-800/60' : 'border-slate-200'}`}
        >
          <div className={`px-6 py-5 ${isDarkMode ? 'bg-zinc-950/80' : 'bg-slate-50'}`} />
          <div className={`px-6 py-5 border-l ${isDarkMode ? 'bg-zinc-950/80 border-zinc-800/40' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.col1.color}`}>
              {config.col1.header}
            </div>
            <div className={`text-[9px] mt-1 uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
              {config.col1.sub}
            </div>
          </div>
          <div className={`px-6 py-5 border-l ${isDarkMode ? 'bg-zinc-950/80 border-zinc-800/40' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.col2.color}`}>
              {config.col2.header}
            </div>
            <div className={`text-[9px] mt-1 uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
              {config.col2.sub}
            </div>
          </div>
        </motion.div>

        {/* Benchmark Rows */}
        {config.benchmarkRows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            className={`grid grid-cols-[260px_1fr_1fr] border-b ${
              isDarkMode ? 'border-zinc-800/30 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50/50'
            } transition-colors border-l-2 border-l-transparent`}
          >
            <div className="px-6 py-5">
              <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                {row.label}
              </span>
            </div>
            <div className={`px-6 py-5 border-l flex items-center ${isDarkMode ? 'border-zinc-800/20' : 'border-slate-200/60'}`}>
              <StatusBadge pass={row.col1.pass} />
              <span className={`text-[11px] ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                {row.col1.text}
              </span>
            </div>
            <div className={`px-6 py-5 border-l flex items-center ${isDarkMode ? 'border-zinc-800/20' : 'border-slate-200/60'}`}>
              <StatusBadge pass={row.col2.pass} />
              <span className={`text-[11px] ${row.col2.pass ? (isDarkMode ? 'text-zinc-300' : 'text-slate-600') : 'text-red-400/80'}`}>
                {row.col2.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing + CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 + config.benchmarkRows.length * 0.12 }}
        className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div className={`border-l-2 pl-8 ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
          <p className={`text-[12px] leading-relaxed max-w-2xl font-medium ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {config.closing}
          </p>
        </div>

        <button
          onClick={() => router.push(config.ctaRoute)}
          className={`group flex items-center gap-3 px-8 py-4 rounded transition-all duration-300 flex-shrink-0 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/40'
              : 'bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20 hover:border-indigo-400/40'
          }`}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            {config.ctaLabel}
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
