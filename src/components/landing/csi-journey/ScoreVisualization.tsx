'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Shield, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy-load the heavy visualizer components to avoid SSR issues
const FinalBattlePlanViz = dynamic(
  () => import('@/components/kill-chain-visualizations/FinalBattlePlanViz'),
  { ssr: false, loading: () => <VizLoader /> }
);
const IntelligenceGatheringViz = dynamic(
  () => import('@/components/kill-chain-visualizations/IntelligenceGatheringViz'),
  { ssr: false, loading: () => <VizLoader /> }
);
const VulnerabilityAssessmentViz = dynamic(
  () => import('@/components/kill-chain-visualizations/VulnerabilityAssessmentViz'),
  { ssr: false, loading: () => <VizLoader /> }
);

function VizLoader() {
  return (
    <div className="flex items-center justify-center h-[400px] sm:h-[450px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        <span className="text-sm text-slate-500 font-mono">Loading visualizer...</span>
      </div>
    </div>
  );
}

const ENGINE_TABS = [
  {
    id: 'interception',
    label: 'INTERCEPTION',
    subtitle: 'Target-Lock Engine',
    metric: '0.988 AUROC',
    icon: Target,
    color: 'blue',
    description: '4-signal composite (Evo2 + Enformer) • 304 gene-step combinations • 11/11 FDA targets prospectively predicted • Precision@3 = 1.000',
  },
  {
    id: 'io-engine',
    label: 'IO ENGINE',
    subtitle: 'Immunotherapy Prediction',
    metric: 'AUC 0.806',
    icon: Shield,
    color: 'purple',
    description: '8-pathway transcriptomic model • Held-out AUC 0.806 • KEYNOTE-158 proxy delta +0.358 • 3x responder enrichment',
  },
  {
    id: 'kill-chain',
    label: 'KILL CHAIN + SPE',
    subtitle: 'Resistance Detection',
    metric: '680 Patients',
    icon: Zap,
    color: 'rose',
    description: '10 resistance classes • 6 datasets (ARIEL, TCGA-OV, MSK) • Temporal ctDNA modeling • SLFN11 33.6% detection',
  },
];

const TAB_COLORS: Record<string, { active: string; inactive: string; glow: string; border: string }> = {
  blue: {
    active: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
    inactive: 'border-slate-700/50 text-slate-400 hover:border-blue-500/30 hover:text-blue-400',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    border: 'border-blue-500/30',
  },
  purple: {
    active: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
    inactive: 'border-slate-700/50 text-slate-400 hover:border-purple-500/30 hover:text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    border: 'border-purple-500/30',
  },
  rose: {
    active: 'bg-rose-500/20 border-rose-500/50 text-rose-300',
    inactive: 'border-slate-700/50 text-slate-400 hover:border-rose-500/30 hover:text-rose-400',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    border: 'border-rose-500/30',
  },
};

export default function ScoreVisualization() {
  const [activeTab, setActiveTab] = useState('interception');

  const renderVisualizer = () => {
    switch (activeTab) {
      case 'interception':
        return <FinalBattlePlanViz />;
      case 'io-engine':
        return <IntelligenceGatheringViz />;
      case 'kill-chain':
        return <VulnerabilityAssessmentViz />;
      default:
        return <FinalBattlePlanViz />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="relative backdrop-blur-xl bg-slate-900/60 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <div className="text-center pt-8 sm:pt-10 px-6 relative z-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-3">
            Three Validated, Connected Engines
          </h3>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
            Click each engine to explore its live visualization — real interactive components, not static text.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {ENGINE_TABS.map((tab) => {
              const Icon = tab.icon;
              const colors = TAB_COLORS[tab.color];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 group relative rounded-xl p-4 sm:p-5 border transition-all duration-300 text-left ${isActive
                    ? `${colors.active} ${colors.glow}`
                    : colors.inactive
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEngineGlow"
                      className="absolute inset-0 rounded-xl bg-white/5 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-800/50'} transition-colors`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-white/10' : 'bg-slate-800/50'}`}>
                          {tab.metric}
                        </span>
                      </div>
                      <div className={`text-sm font-semibold ${isActive ? 'text-slate-200' : 'text-slate-300'} mb-1`}>
                        {tab.subtitle}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed hidden sm:block">{tab.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visualizer Viewport */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 overflow-hidden min-h-[400px] sm:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderVisualizer()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 sm:px-8 pb-6 relative z-10">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Interactive Visualization • Research Use Only</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
