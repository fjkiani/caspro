'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyCapability } from '@/types/copilot-types';
import KeyCapabilityDisplay from '../KeyCapabilityDisplay';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface AdvancedFeaturesSectionProps {
  capabilities: KeyCapability[];
}

export default function AdvancedFeaturesSection({ capabilities }: AdvancedFeaturesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!capabilities || capabilities.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 hover:border-primary/30 transition-all duration-300">
        {/* Collapsible Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 rounded-t-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Advanced Features</h3>
              <p className="text-sm text-slate-600">
                {capabilities.length} additional {capabilities.length === 1 ? 'capability' : 'capabilities'} for power users
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {capabilities.length}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-600" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto', marginTop: '0px' },
                collapsed: { opacity: 0, height: 0, marginTop: '0px' }
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-6 py-6 space-y-6 border-t border-slate-200">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <KeyCapabilityDisplay capability={capability} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


