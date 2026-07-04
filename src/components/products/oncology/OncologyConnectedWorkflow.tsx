'use client';

import React from 'react';
import { motion } from 'framer-motion';
;
import { ArrowRight, FlaskConical, Stethoscope, Shield, Target, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

/**
 * Oncology Connected Workflow
 * 
 * Shows how all capabilities connect together in the oncology product workflow.
 * Visual flow diagram showing the integrated capabilities from start to finish.
 */
export default function OncologyConnectedWorkflow() {
  const topRowCapabilities = [
    {
      id: 'spe-framework',
      title: 'S/P/E Framework',
      icon: FlaskConical,
      color: 'bg-blue-500',
      description: 'Sequence/Pathway/Evidence fusion for mechanism-based matching'
    },
    {
      id: 'clinical-trials',
      title: 'Clinical Trial Matching',
      icon: Stethoscope,
      color: 'bg-purple-500',
      description: '96.6% match accuracy with transparent eligibility reasoning'
    },
    {
      id: 'toxicity-nutrition',
      title: 'Toxicity-Aware Nutrition',
      icon: FlaskConical,
      color: 'bg-purple-500',
      description: '100% PGx coverage with protective nutrition recommendations'
    },
    {
      id: 'resistance-prediction',
      title: 'Resistance Prediction',
      icon: Target,
      color: 'bg-red-500',
      description: '3-6 weeks earlier detection with proactive intervention'
    }
  ];

  const bottomRowCapabilities = [
    {
      id: 'universal-platform',
      title: 'Universal Platform',
      icon: Globe,
      color: 'bg-green-500',
      description: 'Works for any cancer type with multi-disease standard of care'
    },
    {
      id: 'clinical-dossier',
      title: 'Clinical Dossier',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Exportable tumor board-ready documentation with complete audit trail'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Connected <span className="text-blue-600">Intelligence</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            See how all capabilities work together in a unified oncology workflow
          </p>
        </div>

        {/* Connected Workflow Visualization */}
        <div className="relative">
          {/* Top Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8">
            {topRowCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              
              return (
                <React.Fragment key={capability.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-all overflow-hidden w-48 md:w-56">
                      <div className="p-6">
                        <div className={`${capability.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                          {capability.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Arrow between cards (except last) */}
                  {index < topRowCapabilities.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {bottomRowCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              
              return (
                <React.Fragment key={capability.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (topRowCapabilities.length + index) * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-all overflow-hidden w-48 md:w-56">
                      <div className="p-6">
                        <div className={`${capability.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                          {capability.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Arrow between cards (except last) */}
                  {index < bottomRowCapabilities.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="#interactive-showcase"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <span>Experience the complete workflow in action</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}




