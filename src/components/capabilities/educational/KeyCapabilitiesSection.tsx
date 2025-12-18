'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Activity, Apple, BookOpen, Microscope, Shield, Target, Pill, Map, Flame, Heart, Clock, CheckCircle, MessageSquare, BarChart3, Database, Link, Calculator, Gauge, Plus, Settings, AlertCircle } from 'lucide-react';
import { toxicityData } from '@/data/copilots/toxicity-data';
import { pathwayData } from '@/data/copilots/pathway-data';

interface KeyCapabilitiesSectionProps {
  dataSource?: 'toxicity' | 'pathway';
}

export default function KeyCapabilitiesSection({ dataSource = 'toxicity' }: KeyCapabilitiesSectionProps) {
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);
  
  const data = dataSource === 'pathway' ? pathwayData : toxicityData;
  const title = dataSource === 'pathway' ? 'Pathway Analysis' : 'Toxicity Risk Assessment';

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Dna, Activity, Apple, BookOpen, Microscope, Shield, Target, Pill, Map, Flame, Heart, Clock, CheckCircle, MessageSquare, BarChart3, Database, Link, Calculator, Gauge, Plus, Settings, AlertCircle,
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Core Capabilities
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Deep dive into each capability: technical implementation, scientific foundation, and business value
          </p>
        </motion.div>

        <div className="space-y-6">
          {data.keyCapabilities.map((capability, idx) => {
            const isExpanded = expandedCapability === capability.title;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedCapability(isExpanded ? null : capability.title)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Dna className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{capability.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{capability.genomicUseCasesParagraph}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-6 h-6 text-slate-400" />
                  </motion.div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-slate-200">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Technical */}
                          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold text-blue-900">{capability.technical.title}</h4>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">
                              {capability.technical.keyMetric}
                            </div>
                            <p className="text-sm text-slate-700 mb-4">{capability.technical.description}</p>
                            <div className="space-y-2">
                              {capability.technical.components.map((comp, compIdx) => {
                                const CompIcon = iconMap[comp.iconName] || Dna;
                                return (
                                  <div key={compIdx} className="flex items-start gap-2 text-sm">
                                    <CompIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <div className="font-medium text-slate-900">{comp.title}</div>
                                      <div className="text-slate-600">{comp.subtitle}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Scientific */}
                          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen className="w-5 h-5 text-green-600" />
                              <h4 className="font-semibold text-green-900">{capability.scientific.title}</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {capability.scientific.keyMetric}
                            </div>
                            <p className="text-sm text-slate-700 mb-4">{capability.scientific.description}</p>
                            <div className="space-y-2">
                              {capability.scientific.components.map((comp, compIdx) => {
                                const CompIcon = iconMap[comp.iconName] || BookOpen;
                                return (
                                  <div key={compIdx} className="flex items-start gap-2 text-sm">
                                    <CompIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <div className="font-medium text-slate-900">{comp.title}</div>
                                      <div className="text-slate-600">{comp.subtitle}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Business */}
                          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Shield className="w-5 h-5 text-purple-600" />
                              <h4 className="font-semibold text-purple-900">{capability.business.title}</h4>
                            </div>
                            <div className="text-2xl font-bold text-purple-600 mb-2">
                              {capability.business.keyMetric}
                            </div>
                            <p className="text-sm text-slate-700 mb-4">{capability.business.description}</p>
                            <div className="space-y-2">
                              {capability.business.components.map((comp, compIdx) => {
                                const CompIcon = iconMap[comp.iconName] || Shield;
                                return (
                                  <div key={compIdx} className="flex items-start gap-2 text-sm">
                                    <CompIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <div className="font-medium text-slate-900">{comp.title}</div>
                                      <div className="text-slate-600">{comp.subtitle}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

