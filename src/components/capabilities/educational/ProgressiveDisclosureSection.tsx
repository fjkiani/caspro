'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code, Database, Settings } from 'lucide-react';
import { ProgressiveDisclosureSectionData } from '@/types/educational-capability';

interface ProgressiveDisclosureSectionProps {
  data: ProgressiveDisclosureSectionData;
  className?: string;
}

export default function ProgressiveDisclosureSection({ 
  data, 
  className = '' 
}: ProgressiveDisclosureSectionProps) {
  const [isExpanded, setIsExpanded] = useState(data.defaultExpanded || false);

  return (
    <section className={`py-8 px-4 md:px-8 bg-slate-50 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden"
        >
          {/* Header - Always Visible */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Code className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {data.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {data.summary}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </button>

          {/* Details - Collapsible */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 border-t border-slate-200">
                  {data.details}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

