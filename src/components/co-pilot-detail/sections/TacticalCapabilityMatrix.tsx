'use client';

import React, { useState, ElementType } from 'react';
import { KeyCapability } from '@/data/coPilotDetails';
import IconSelector from './shared/IconSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Settings, Microscope, Briefcase, Database, Target, FileText, Users, ShieldCheck, TrendingUp, Activity, AlertTriangle, Layers, Zap, MessageSquare, RefreshCw, Brain, Clock, Eye, Hash, Download, Share, Workflow, Repeat, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { normalizeAspect } from './shared/AspectNormalizer';

interface TacticalCapabilityMatrixProps {
  keyCapabilities: KeyCapability[];
}

const iconComponents: { [key: string]: ElementType } = {
  Settings, Microscope, Briefcase, Database, Target, FileText, Users, ShieldCheck, TrendingUp, Activity, AlertTriangle, Layers, CheckCircle, Zap, MessageSquare, RefreshCw, Brain, Clock, Eye, Hash, Download, Share, Workflow, Repeat, BarChart,
};

const getIconComponent = (iconName: string): ElementType => {
  return iconComponents[iconName] || CheckCircle;
};

export default function TacticalCapabilityMatrix({ keyCapabilities }: TacticalCapabilityMatrixProps) {
  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);

  if (!keyCapabilities || keyCapabilities.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="mb-8 md:mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 md:mb-4">Core Capabilities</h3>
        <p className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto">
          {keyCapabilities.length} capabilities
        </p>
      </div>

      {/* Capabilities Grid - Side by Side like Homepage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {keyCapabilities.map((capability, capIndex) => {
          const technicalAspect = typeof capability.technical === 'object' ? capability.technical : null;
          const scientificAspect = typeof capability.scientific === 'object' ? capability.scientific : null;
          const businessAspect = typeof capability.business === 'object' ? capability.business : null;
          
          // Get primary icon and color from technical aspect
          const primaryAspect = technicalAspect || scientificAspect || businessAspect;
          const aspectData = primaryAspect ? normalizeAspect(primaryAspect, 0) : null;
          const IconComp = aspectData ? getIconComponent(aspectData.icon) : CheckCircle;
          const isExpanded = expandedCapability === capIndex;
          
          return (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: capIndex * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl md:rounded-2xl border-2 border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              <button
                onClick={() => setExpandedCapability(isExpanded ? null : capIndex)}
                className="w-full text-left p-4 md:p-6"
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-base md:text-xl font-bold text-slate-900 mb-1">{capability.title}</h4>
                    {technicalAspect && (
                      <p className="text-xs md:text-sm text-slate-600 line-clamp-2">{technicalAspect.description?.substring(0, 100)}...</p>
                    )}
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {technicalAspect?.keyMetric && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                      {technicalAspect.keyMetric}
                    </span>
                  )}
                  {scientificAspect?.keyMetric && (
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-semibold">
                      {scientificAspect.keyMetric}
                    </span>
                  )}
                  {businessAspect?.keyMetric && (
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                      {businessAspect.keyMetric}
                    </span>
                  )}
                </div>
                
                {/* Expand Indicator */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-xs md:text-sm text-blue-600 font-semibold">
                    {isExpanded ? 'Hide details' : 'View details'}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-blue-600" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-slate-200"
                  >
                    <div className="p-4 md:p-6 bg-slate-50">
                      <div className="space-y-4">
                        {[capability.technical, capability.scientific, capability.business].map((aspect, index) => {
                          if (typeof aspect !== 'object' || !aspect) return null;
                          const aspectData = normalizeAspect(aspect, index);
                          const IconComp = getIconComponent(aspectData.icon);
                          const aspectTypes = ['Technical', 'Scientific', 'Business'];
                          
                          return (
                            <div key={index} className="bg-white p-5 rounded-lg border border-slate-200">
                              <div className="flex items-center gap-3 mb-3">
                                <IconComp className="w-5 h-5 text-blue-600" />
                                <h5 className="text-base font-semibold text-slate-800">{aspectTypes[index]}</h5>
                              </div>
                              {aspectData.keyMetric && (
                                <p className="text-sm font-medium text-slate-700 mb-3">{aspectData.keyMetric}</p>
                              )}
                              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {aspectData.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
