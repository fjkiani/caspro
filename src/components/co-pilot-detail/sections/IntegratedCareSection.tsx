'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KeyCapability } from '@/types/copilot-types';
import KeyCapabilityDisplay from '../KeyCapabilityDisplay';
import { Network, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
;

interface IntegratedCareSectionProps {
  capability: KeyCapability;
}

export default function IntegratedCareSection({ capability }: IntegratedCareSectionProps) {
  if (!capability) {
    return null;
  }

  return (
    <motion.div
      className="mb-8 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Link 
        href="/api/complete_care/universal" 
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-xl md:rounded-2xl border-2 border-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer">
          {/* Prominent Header - Mobile Optimized */}
          <div className="px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-xl md:rounded-t-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Network className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-1 leading-tight">{capability.title}</h2>
                  <p className="text-blue-100 text-xs md:text-sm leading-tight">All capabilities unified in one actionable output</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:flex-shrink-0">
                <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <span className="text-white text-xs md:text-sm font-semibold">FLAGSHIP</span>
                </div>
                <LinkIcon className="w-5 h-5 text-white flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Content - Mobile Optimized */}
          <div className="px-4 md:px-8 py-4 md:py-6">
            <KeyCapabilityDisplay capability={capability} />
            
            {/* Clickable API Link - Mobile Optimized */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-semibold text-blue-900">API Endpoint</p>
                    <p className="text-xs text-blue-700 font-mono truncate">/api/complete_care/universal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs md:text-sm mt-2 sm:mt-0">
                  <span>Click to explore</span>
                  <LinkIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

