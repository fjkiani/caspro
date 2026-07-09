"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TRIAL_CASE_FILES, HAND_AUTHORED_TRIAL_IDS, type TrialCaseFile } from '@/data/trial-case-files';

// --- Derive table rows from live registry ---
function buildTrialRows() {
  return HAND_AUTHORED_TRIAL_IDS.map((id) => {
    const t = TRIAL_CASE_FILES[id];
    if (!t) return null;

    // Determine Layer 2 failure text from rootCause
    const l2Text = t.rootCause?.failureKeyword
      ? `${t.rootCause.statusQuo} → ${t.rootCause.failureKeyword}`
      : 'Layer 2 unchecked';

    return {
      label: `${t.id.toUpperCase()} (${t.trialId})`,
      layer1: `Real ${t.drug.split('(')[0].trim()} target`,
      layer2: l2Text,
      l1Pass: true,
      l2Pass: false,
      isTrial: true,
      slug: t.id,
      delta: t.deltaImpact,
    };
  }).filter(Boolean) as Array<{
    label: string; layer1: string; layer2: string;
    l1Pass: boolean; l2Pass: boolean; isTrial: boolean;
    slug: string; delta: string;
  }>;
}

const HEADER_ROWS = [
  {
    label: 'Question',
    layer1: 'Is the target a real cancer driver?',
    layer2: 'Are the right patients enrolled?',
    l1Pass: null,
    l2Pass: null,
    isTrial: false,
    slug: null,
    delta: null,
  },
  {
    label: 'Industry standard',
    layer1: 'Usually checked',
    layer2: 'Rarely checked',
    l1Pass: true,
    l2Pass: false,
    isTrial: false,
    slug: null,
    delta: null,
  },
];

// --- Status Badge ---
const StatusBadge = ({ pass }: { pass: boolean | null }) => {
  if (pass === null) return null;
  return pass ? (
    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline-block mr-2 flex-shrink-0" />
  ) : (
    <XCircle className="w-3.5 h-3.5 text-red-500 inline-block mr-2 flex-shrink-0" />
  );
};

// --- Component ---
export const LayerTwoFrame: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const TABLE_ROWS = [...HEADER_ROWS, ...buildTrialRows()];

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
          <AlertTriangle className="w-5 h-5 text-red-500/80" />
          <span className="text-[9px] font-black text-red-500/60 uppercase tracking-[0.5em]">
            Root Cause Analysis
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight max-w-2xl">
          Most cancer trials fail for a simple reason.{' '}
          <span className="text-red-400">Nobody checks Layer 2.</span>
        </h2>
      </motion.div>

      {/* Layer Comparison Table */}
      <div className="border border-zinc-800/60 rounded overflow-hidden">
        
        {/* Table Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-[260px_1fr_1fr] border-b border-zinc-800/60"
        >
          <div className="px-6 py-5 bg-zinc-950/80" />
          <div className="px-6 py-5 bg-zinc-950/80 border-l border-zinc-800/40">
            <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
              Layer 1: Target-Lock
            </div>
            <div className="text-[9px] text-zinc-300 mt-1 uppercase tracking-[0.2em]">
              Is the biology real?
            </div>
          </div>
          <div className="px-6 py-5 bg-zinc-950/80 border-l border-zinc-800/40">
            <div className="text-[10px] font-black text-red-400/80 uppercase tracking-[0.3em]">
              Layer 2: Mechanism Fit
            </div>
            <div className="text-[9px] text-zinc-300 mt-1 uppercase tracking-[0.2em]">
              Are the right patients enrolled?
            </div>
          </div>
        </motion.div>

        {/* Table Rows — staggered reveal */}
        {TABLE_ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            className={`
              grid grid-cols-[260px_1fr_1fr] border-b border-zinc-800/30 group
              hover:bg-white/[0.02] transition-colors
              ${row.isTrial ? 'border-l-2 border-l-red-500/60 cursor-pointer' : 'border-l-2 border-l-transparent'}
            `}
            onClick={() => {
              if (row.slug) router.push(`/proof/${row.slug}`);
            }}
          >
            {/* Row Label */}
            <div className="px-6 py-5">
              <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${row.isTrial ? 'text-zinc-300 group-hover:text-cyan-400 transition-colors' : 'text-zinc-300'}`}>
                {row.label}
              </span>
              {row.isTrial && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[8px] font-mono text-cyan-800 group-hover:text-cyan-500 transition-colors">
                    → View 8D Failure Analysis
                  </span>
                  {row.delta && (
                    <span className="text-[9px] font-black text-cyan-400/60 bg-cyan-500/5 px-2 py-0.5 rounded-sm">
                      Δ {row.delta}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Layer 1 Cell */}
            <div className="px-6 py-5 border-l border-zinc-800/20 flex items-center">
              <StatusBadge pass={row.l1Pass} />
              <span className={`text-[11px] ${row.l1Pass !== null ? 'text-zinc-200' : 'text-zinc-300'}`}>
                {row.layer1}
              </span>
            </div>

            {/* Layer 2 Cell */}
            <div className="px-6 py-5 border-l border-zinc-800/20 flex items-center">
              <StatusBadge pass={row.l2Pass} />
              <span className={`text-[11px] ${row.l2Pass === false ? 'text-red-400' : 'text-zinc-300'}`}>
                {row.layer2}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing statement + CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 + TABLE_ROWS.length * 0.12 }}
        className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div className="border-l-2 border-zinc-800 pl-8">
          <p className="text-[12px] text-zinc-300 leading-relaxed max-w-2xl font-medium">
            {TABLE_ROWS.filter(r => r.isTrial).length} drugs. Different cancers. Different companies.{' '}
            <span className="text-zinc-300">Same root cause.</span>{' '}
            Identified retroactively by the same engine.
          </p>
        </div>

        <button
          onClick={() => router.push('/proof/latify')}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 flex-shrink-0"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Open The Receipts
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
