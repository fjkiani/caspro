'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Database, 
  Brain, 
  ArrowRight, 
  Play,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Import our interactive components
import { BRCAMutationSimulator } from '@/components/metrics/interactive';
import { SPEFusionPlayground } from '@/components/evidence/interactive';
import { DataLabExplorer } from '@/components/evidence/interactive';

const DEMO_OPTIONS = [
  {
    id: 'brca',
    title: 'BRCA Mutation Analysis',
    description: 'See how our AI classifies genetic variants with 95.0% accuracy',
    icon: Target,
    color: 'from-green-500 to-emerald-600',
    component: BRCAMutationSimulator,
    metrics: '95.0% BRCA AUROC',
    time: '30 seconds'
  },
  {
    id: 'spe-fusion',
    title: 'S/P/E Fusion Analysis',
    description: 'Multi-dimensional variant interpretation combining Structure + Phenotype + Expression',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    component: SPEFusionPlayground,
    metrics: '95.7% ClinVar validation',
    time: '45 seconds'
  },
  {
    id: 'data-lab',
    title: 'Data Lab Explorer',
    description: 'Interactive study browser with real-time cohort extraction',
    icon: Database,
    color: 'from-purple-500 to-violet-600',
    component: DataLabExplorer,
    metrics: '10x faster analysis',
    time: '60 seconds'
  }
];

const LiveDemoSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('brca');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentDemo = DEMO_OPTIONS.find(demo => demo.id === activeDemo);
  const ActiveComponent = currentDemo?.component;

  return (
    <section id="live-demo-section" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            🚀 <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Try Our AI Live
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Don't just read about our AI - <strong>interact with it!</strong> Choose a demo below and see real results in seconds.
          </p>
          
          {/* Urgency Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-700">LIVE SYSTEM</span>
            </div>
            <span className="text-sm text-slate-600">No signup • Real data • Instant results</span>
          </motion.div>
        </motion.div>

        {/* Demo Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {DEMO_OPTIONS.map((demo, index) => (
            <motion.button
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                setActiveDemo(demo.id);
                setIsPlaying(true);
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                activeDemo === demo.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${demo.color}`}>
                  <demo.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {demo.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>⚡ {demo.metrics}</span>
                    <span>🕒 {demo.time}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-600 mb-4 leading-relaxed">
                {demo.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Play className="w-4 h-4" />
                  Try This Demo
                </div>
                {activeDemo === demo.id && (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Demo Display */}
        <AnimatePresence mode="wait">
          {currentDemo && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Demo Header */}
              <div className={`p-6 bg-gradient-to-r ${currentDemo.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <currentDemo.icon className="w-8 h-8" />
                    <div>
                      <h3 className="text-2xl font-bold">{currentDemo.title}</h3>
                      <p className="text-white/90">{currentDemo.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm opacity-90">Performance</div>
                    <div className="text-xl font-bold">{currentDemo.metrics}</div>
                  </div>
                </div>
              </div>

              {/* Demo Component */}
              <div className="p-8">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>
    </section>
  );
};

export default LiveDemoSection;
