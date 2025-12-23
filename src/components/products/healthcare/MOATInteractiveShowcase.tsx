'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Target, Clock, Shield, Search, Dna,
  TestTube, AlertTriangle, Activity
} from 'lucide-react';
import { clinicalCarePlanContent } from '@/data/industry/clinical-care-plan-content';
import VUSResolutionDemo from '@/components/sae/VUSResolutionDemo';
import SPEFusionPlayground from '@/components/evidence/interactive/SPEFusionPlayground';
import ResistanceDetectionDemo from '@/components/products/oncology/demos/ResistanceDetectionDemo';
import ToxicityPredictionDemo from '@/components/products/oncology/demos/ToxicityPredictionDemo';
import ClinicalTrialMatchingDemo from '@/components/products/oncology/demos/ClinicalTrialMatchingDemo';
import SyntheticLethalityDemo from '@/components/products/oncology/demos/SyntheticLethalityDemo';

const iconMap: Record<string, React.ComponentType<any>> = {
  CheckCircle, Target, Clock, Shield, Search, Dna, TestTube, AlertTriangle, Activity
};

const demoComponentMap: Record<string, React.ComponentType<any>> = {
  'VUSResolutionDemo': VUSResolutionDemo,
  'SPEFusionPlayground': SPEFusionPlayground,
  'ResistanceDetectionDemo': ResistanceDetectionDemo,
  'ToxicityPredictionDemo': ToxicityPredictionDemo,
  'ClinicalTrialsMatcher': ClinicalTrialMatchingDemo,
  'SyntheticLethalityDemo': SyntheticLethalityDemo,
};

export default function MOATInteractiveShowcase() {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  const moatCapabilities = clinicalCarePlanContent.moatCapabilities.map((cap, idx) => {
    const colorMap: Record<number, string> = {
      0: 'blue',
      1: 'purple',
      2: 'orange',
      3: 'green',
      4: 'teal',
      5: 'indigo'
    };
    return {
      ...cap,
      color: colorMap[idx] || 'blue',
      icon: idx === 0 ? CheckCircle : idx === 1 ? Target : idx === 2 ? Clock : idx === 3 ? Shield : idx === 4 ? Search : Dna
    };
  });

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, any> = {
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-500', hover: 'hover:border-blue-300', demo: 'bg-blue-50', demoBorder: 'border-blue-200' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', border: 'border-purple-500', hover: 'hover:border-purple-300', demo: 'bg-purple-50', demoBorder: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-500', hover: 'hover:border-orange-300', demo: 'bg-orange-50', demoBorder: 'border-orange-200' },
      green: { bg: 'bg-green-100', icon: 'text-green-600', border: 'border-green-500', hover: 'hover:border-green-300', demo: 'bg-green-50', demoBorder: 'border-green-200' },
      teal: { bg: 'bg-teal-100', icon: 'text-teal-600', border: 'border-teal-500', hover: 'hover:border-teal-300', demo: 'bg-teal-50', demoBorder: 'border-teal-200' },
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', border: 'border-indigo-500', hover: 'hover:border-indigo-300', demo: 'bg-indigo-50', demoBorder: 'border-indigo-200' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="moat-capabilities" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Target className="w-4 h-4" />
            MOAT CAPABILITIES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Experience Complete Care Plan Intelligence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Click on any MOAT capability below to see how CrisPRO.ai transforms 
            clinical decision-making with real-time demonstrations and validated results.
          </motion.p>
        </div>

        {/* MOAT Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {moatCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            const colors = getColorClasses(capability.color);
            const isActive = activeCapability === capability.id;

            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className={`relative bg-white p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${colors.border} shadow-xl`
                    : `border-slate-200 ${colors.hover} hover:shadow-xl`
                }`}
                onClick={() => setActiveCapability(isActive ? null : capability.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className={`w-3 h-3 rounded-full ${colors.bg} transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {capability.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {capability.solution}
                </p>

                {/* Key Metrics */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-700">
                    <div className={`w-2 h-2 ${colors.bg} rounded-full mr-2`} />
                    <span className="font-semibold">{capability.outcome}</span>
                  </div>
                  {Object.entries(capability.metrics).slice(0, 1).map(([key, value]) => (
                    <div key={key} className="flex items-center text-xs text-slate-600">
                      <div className={`w-2 h-2 ${colors.bg} rounded-full mr-2`} />
                      <span>{key}: {typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-500 flex items-center">
                  {isActive ? 'Hide demo' : 'Click to see demo'}
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-1"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Capability Demo */}
        <AnimatePresence>
          {activeCapability && (() => {
            const capability = moatCapabilities.find(c => c.id === activeCapability);
            if (!capability) return null;

            const colors = getColorClasses(capability.color);
            const DemoComponent = demoComponentMap[capability.demo];

            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mr-4`}>
                        {React.createElement(capability.icon, { className: `w-6 h-6 ${colors.icon}` })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{capability.title} Demo</h3>
                        <p className="text-slate-600">Live demonstration of {capability.title.toLowerCase()} capability</p>
                      </div>
                    </div>

                    {/* Problem/Solution */}
                    <div className={`${colors.demo} p-6 rounded-xl border ${colors.demoBorder}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Problem</h4>
                          <p className="text-sm text-slate-700">{capability.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">Solution</h4>
                          <p className="text-sm text-slate-700">{capability.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Demo Component */}
                    {DemoComponent && (
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h4 className="font-semibold text-slate-800 mb-4">Interactive Demo</h4>
                        <DemoComponent />
                      </div>
                    )}

                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(capability.metrics).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          <div className="text-lg font-bold text-slate-800">
                            {typeof value === 'number' ? (value * 100).toFixed(1) + '%' : value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-4 border-t border-slate-200">
                      <button className={`px-6 py-3 ${colors.bg} ${colors.icon} rounded-xl font-semibold transition-colors`}>
                        Try {capability.title} Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}


