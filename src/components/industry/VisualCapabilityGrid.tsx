'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  metrics: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  keyFeatures: string[];
  demoComponent?: React.ReactNode;
}

interface VisualCapabilityGridProps {
  capabilities: Capability[];
  title: string;
  subtitle: string;
}

const VisualCapabilityGrid: React.FC<VisualCapabilityGridProps> = ({
  capabilities,
  title,
  subtitle
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center space-y-4">
          {title && <h2 className="text-4xl font-bold text-white">{title}</h2>}
          {subtitle && <p className="text-xl text-slate-300 max-w-4xl mx-auto">{subtitle}</p>}
        </div>
      )}

      {/* Capability Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {capabilities.map((capability) => {
          const isExpanded = expandedCard === capability.id;
          
          return (
            <motion.div
              key={capability.id}
              layout
              className="bg-slate-800/50 border border-slate-600 rounded-2xl overflow-hidden hover:border-slate-500 transition-colors"
            >
              {/* Card Header */}
              <button
                onClick={() => toggleCard(capability.id)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-t-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{capability.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{capability.title}</h3>
                    <p className="text-slate-300 text-lg">{capability.description}</p>
                  </div>
                  <div className="text-slate-400">
                    {isExpanded ? '▼' : '▶'}
                  </div>
                </div>
              </button>

              {/* Card Metrics */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  {capability.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
                      <div className="text-sm text-slate-300">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-600"
                  >
                    <div className="p-6 space-y-4">
                      {/* Key Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {capability.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-300">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Demo Component */}
                      {capability.demoComponent && (
                        <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                          {capability.demoComponent}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualCapabilityGrid;

