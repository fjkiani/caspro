'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VUSResolutionDemo from '@/components/sae/VUSResolutionDemo';
import TLSSAEThinkingProcess from '@/components/sae/TLSSAEThinkingProcess';
import OracleExplainTrack from '@/components/sae/components/OracleExplainTrack';

interface InteractiveDemo {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  icon: string;
  color: string;
}

const interactiveDemos: InteractiveDemo[] = [
  {
    id: 'vus-resolution',
    title: 'Live VUS Resolution',
    description: 'Watch uncertain variants become actionable decisions with 73% conversion rate',
    component: VUSResolutionDemo,
    icon: 'Target',
    color: 'blue'
  },
  {
    id: 'sae-thinking',
    title: 'SAE Biological Reasoning',
    description: 'See how Sparse Autoencoders explain biological decisions transparently',
    component: TLSSAEThinkingProcess,
    icon: 'Brain',
    color: 'purple'
  },
  {
    id: 'oracle-explain',
    title: 'Oracle Feature Attribution',
    description: 'Visualize which biological features drive 95.7% AUROC predictions',
    component: OracleExplainTrack,
    icon: 'Eye',
    color: 'green'
  }
];

interface OncologyInteractiveShowcaseProps {
  className?: string;
}

export default function OncologyInteractiveShowcase({ className = '' }: OncologyInteractiveShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoClick = async (demoId: string) => {
    if (activeDemo === demoId) {
      setActiveDemo(null);
      return;
    }

    setIsLoading(true);
    setActiveDemo(demoId);

    // Simulate loading time for dramatic effect
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const activeDemoData = interactiveDemos.find(demo => demo.id === activeDemo);
  const ActiveComponent = activeDemoData?.component;

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Experience <span className="text-blue-600">Live Intelligence</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See our AI capabilities in action with real-time demonstrations powered by our quantum foundation models
          </p>
        </motion.div>

        {/* Demo Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {interactiveDemos.map((demo, index) => (
            <motion.button
              key={demo.id}
              onClick={() => handleDemoClick(demo.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                activeDemo === demo.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${demo.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <div className={`w-6 h-6 text-${demo.color}-600`}>
                    {/* Icon placeholder - replace with actual icons */}
                    <div className="w-full h-full bg-current rounded"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {demo.description}
                  </p>
                  {activeDemo === demo.id && (
                    <div className="mt-3 text-xs text-blue-600 font-medium">
                      Running live demo...
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Demo Display */}
        <AnimatePresence mode="wait">
          {activeDemo && (
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden"
            >
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-600">Initializing live demonstration...</p>
                </div>
              ) : ActiveComponent ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {activeDemoData?.title}
                    </h3>
                    <p className="text-slate-600">
                      {activeDemoData?.description}
                    </p>
                  </div>
                  {activeDemo === 'sae-thinking' ? (
                    <ActiveComponent useCaseId="oncology-product-demo" />
                  ) : (
                    <ActiveComponent />
                  )}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-slate-600">Demo component not available</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Performance Metrics */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">95.7%</div>
            <div className="text-sm text-slate-600">ClinVar AUROC Accuracy</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">73%</div>
            <div className="text-sm text-slate-600">VUS Resolution Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">2-3 sec</div>
            <div className="text-sm text-slate-600">Analysis Response Time</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
