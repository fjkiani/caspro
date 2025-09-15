'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  FlaskConical, 
  ArrowRight, 
  Play,
  CheckCircle
} from 'lucide-react';

// Import real interactive components
import { BRCAMutationSimulator, VUSResolutionPlayground } from '@/components/metrics/interactive';
import { SPEFusionPlayground, DataLabExplorer } from '@/components/evidence/interactive';

interface InteractiveDemoSectionProps {
  className?: string;
}

const DEMO_OPTIONS = [
  {
    id: 'brca-analysis',
    title: 'BRCA Variant Analysis',
    description: 'Watch AI resolve VUS to actionable clinical decisions',
    icon: Target,
    color: 'from-green-500 to-emerald-600',
    component: BRCAMutationSimulator,
    metrics: '95.0% BRCA AUROC',
    time: '30 seconds',
    badge: 'Clinical Grade'
  },
  {
    id: 'spe-fusion',
    title: 'Multi-Modal Analysis',
    description: 'Structure + Phenotype + Expression fusion analysis',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    component: SPEFusionPlayground,
    metrics: '95.7% ClinVar validation',
    time: '45 seconds',
    badge: 'SOTA'
  },
  {
    id: 'data-lab',
    title: 'Research Acceleration',
    description: 'Interactive cohort extraction and study analysis',
    icon: FlaskConical,
    color: 'from-purple-500 to-violet-600',
    component: DataLabExplorer,
    metrics: '10x faster analysis',
    time: '60 seconds',
    badge: '10x Faster'
  }
];

const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ className = '' }) => {
  const [activeDemo, setActiveDemo] = useState<string>(DEMO_OPTIONS[0].id);
  const [demoStarted, setDemoStarted] = useState<boolean>(false);

  const currentDemo = DEMO_OPTIONS.find(demo => demo.id === activeDemo);

  const handleStartDemo = () => {
    setDemoStarted(true);
  };

  const renderActiveDemo = () => {
    if (!currentDemo) return null;
    const DemoComponent = currentDemo.component;
    return <DemoComponent />;
  };

  return (
    <section className={`py-20 bg-gradient-to-b from-white to-slate-50 ${className}`}>
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
            🧬 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Try Our AI Live
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Don't just read about our capabilities - <strong>interact with our AI directly</strong>. 
            Choose a demonstration and see real results in seconds.
          </p>
          
          {/* Live System Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">LIVE SYSTEM</span>
            </div>
            <span className="text-sm text-slate-600">No signup • Real data • Instant results</span>
          </div>
        </motion.div>

        {/* Demo Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {DEMO_OPTIONS.map((demo, index) => {
            const Icon = demo.icon;
            const isActive = activeDemo === demo.id;
            
            return (
              <motion.button
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setDemoStarted(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 bg-gradient-to-r ${demo.color} text-white text-xs font-bold rounded-full`}>
                    {demo.badge}
                  </span>
                </div>
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${demo.color}` 
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'}`} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {demo.description}
                </p>
                
                {/* Metrics */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-semibold">{demo.metrics}</span>
                  <span className="text-slate-500">{demo.time}</span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-200">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-semibold">Selected</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
        >
          {/* Demo Header */}
          {currentDemo && (
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
          )}

          {/* Demo Content */}
          <div className="p-8">
            {!demoStarted ? (
              <div className="text-center py-12">
                <motion.button
                  onClick={handleStartDemo}
                  className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentDemo?.color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Start Interactive Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <p className="mt-4 text-slate-500">
                  Click to start the live demonstration • No signup required
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveDemo()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* What You Just Experienced */}
        {demoStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              What You Just Experienced
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-green-900 mb-2">Real AI Analysis</h4>
                <p className="text-green-700 text-sm">Production AI analyzing real data with validated accuracy</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">Instant Results</h4>
                <p className="text-blue-700 text-sm">Predictions and insights in real-time, no waiting</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-purple-900 mb-2">Validated Performance</h4>
                <p className="text-purple-700 text-sm">95%+ accuracy on clinical datasets like ClinVar and BRCA</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InteractiveDemoSection;
