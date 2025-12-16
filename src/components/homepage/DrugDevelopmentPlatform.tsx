'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight,
  Play,
  Stethoscope,
  FlaskConical,
  Microscope
} from 'lucide-react';

export default function DrugDevelopmentPlatform() {
  const [activeProduct, setActiveProduct] = useState<'oncology' | 'r-d' | 'research'>('oncology');

  const products = {
    oncology: {
      id: 'oncology',
      title: 'CrisPRO Oncology',
      promise: 'From VUS to Validated Care Plan in Minutes',
      targetUser: 'For Clinicians',
      icon: Stethoscope,
      color: 'from-blue-500 to-cyan-600',
      description: 'Transform variants of unknown significance into actionable treatment decisions. Instantly resolve VUS cases with 95.7% accuracy and match patients to mechanism-aligned clinical trials.',
      keyMetric: '95.7% VUS Resolution',
      coreCapabilities: [
        'VUS Resolution',
        'Clinical Trial Matching',
        'S/P/E Framework',
        'Resistance Prediction',
        'Clinical Dossier',
        'Toxicity-Aware Nutrition'
      ],
      poweredBy: ['Oracle', 'Command Center'],
      link: '/products/oncology',
      interactiveTeasers: [
        {
          title: 'Try VUS Resolution Live',
          description: 'See how we resolve variants in real-time',
          link: '/products/oncology',
          cta: 'Resolve VUS Now'
        },
        {
          title: 'Experience Agent Swarm',
          description: 'Watch autonomous agents orchestrate care',
          link: '/products/oncology',
          cta: 'See Agent Swarm'
        },
        {
          title: 'Intelligence Cascade Demo',
          description: 'Full end-to-end processing pipeline',
          link: '/products/oncology',
          cta: 'View Cascade'
        }
      ]
    },
    'r-d': {
      id: 'r-d',
      title: 'CrisPRO R&D',
      promise: 'Design the Undruggable. Validate in Silico.',
      targetUser: 'For Biotech',
      icon: FlaskConical,
      color: 'from-orange-500 to-red-600',
      description: 'Engineer precision therapeutics from first principles. Identify novel targets, design therapeutic proteins, and validate in-silico before wet-lab investment.',
      keyMetric: '70% Functional Coherence',
      coreCapabilities: [
        'Target Discovery',
        'Lead Engineering',
        'Pre-Clinical Confirmation',
        'In Silico Validation',
        'Protein Design',
        'CRISPR Guide Optimization'
      ],
      poweredBy: ['Oracle', 'Forge', 'Boltz'],
      link: '/products/r-d',
      interactiveTeasers: [
        {
          title: 'Design CRISPR Guides',
          description: 'Optimize therapeutic guides with AI',
          link: '/products/r-d',
          cta: 'Design Guides'
        },
        {
          title: 'Protein Engineering',
          description: 'Generate novel therapeutic proteins',
          link: '/products/r-d',
          cta: 'Engineer Proteins'
        },
        {
          title: 'Structural Validation',
          description: 'Validate 3D integrity before experiments',
          link: '/products/r-d',
          cta: 'Validate Structure'
        }
      ]
    },
    research: {
      id: 'research',
      title: 'CrisPRO Research',
      promise: 'Accelerate Discovery from Years to Hours',
      targetUser: 'For Academics',
      icon: Microscope,
      color: 'from-teal-500 to-emerald-600',
      description: 'Test hypotheses across 50+ diseases instantly. Extract patterns from massive datasets, synthesize evidence from literature, and generate grant-ready data.',
      keyMetric: '50+ Diseases Supported',
      coreCapabilities: [
        'VUS Explorer',
        'Universal Hypothesis Testing',
        'Cohort Intelligence',
        'Evidence Synthesis',
        'Literature Search',
        'Grant-Ready Data'
      ],
      poweredBy: ['Oracle', 'Command Center'],
      link: '/products/research',
      interactiveTeasers: [
        {
          title: 'Test Hypotheses Live',
          description: 'Validate research questions instantly',
          link: '/products/research#hypothesis-testing',
          cta: 'Test Hypothesis'
        },
        {
          title: 'Explore Research Tools',
          description: 'Interactive tools for discovery',
          link: '/products/research#interactive-tools',
          cta: 'Explore Tools'
        },
        {
          title: 'VUS Resolution Demo',
          description: 'Turn unknowns into actionables',
          link: '/products/research#interactive-tools',
          cta: 'Resolve VUS'
        }
      ]
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Choose Your <span className="text-blue-600">Path</span>
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto mb-8">
            The Operating System for Precision Medicine - three products for different use cases
          </p>
        </motion.div>

        {/* Product Selector - Three Doors Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {Object.entries(products).map(([key, product]) => {
            const IconComponent = product.icon;
            const isActive = activeProduct === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveProduct(key as any)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isActive 
                    ? `border-blue-600 bg-blue-50 shadow-lg`
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isActive 
                    ? `bg-gradient-to-br ${product.color}` 
                    : 'bg-slate-100'
                }`}>
                  <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </div>
                
                {/* Title */}
                <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
                  {product.title}
                </h3>
                
                {/* Promise */}
                <p className={`text-sm mb-3 ${isActive ? 'text-blue-700' : 'text-slate-600'}`}>
                  {product.promise}
                </p>
                
                {/* Target User */}
                <div className={`text-xs font-semibold mb-3 ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  {product.targetUser}
                </div>
                
                {/* Key Metric */}
                <div className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  {product.keyMetric}
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active Product Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-8"
          >
            {(() => {
              const product = products[activeProduct];
              const IconComponent = product.icon;
              
              return (
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-start">
                  {/* Left Column: Icon, Title, Description */}
                  <div className="space-y-6">
                    {/* Header: Icon + Title + Promise */}
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${product.color} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{product.title}</h3>
                        <p className="text-lg text-slate-600 font-semibold">{product.promise}</p>
                      </div>
                    </div>
                    
                    {/* Target User Tag */}
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                        <IconComponent className="w-4 h-4" />
                        <span>{product.targetUser}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-lg text-slate-700 leading-relaxed">{product.description}</p>
                    
                    {/* Interactive Teasers */}
                    {product.interactiveTeasers && (
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-slate-800">Try Live Demos:</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {product.interactiveTeasers.map((teaser, idx) => (
                            <motion.a
                              key={idx}
                              href={teaser.link}
                              className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                                  {teaser.title}
                                </div>
                                <div className="text-sm text-slate-600">
                                  {teaser.description}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                                <span className="text-sm font-medium">{teaser.cta}</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <motion.a
                      href={product.link}
                      className={`w-full bg-gradient-to-r ${product.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 block`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      Explore {product.title}
                    </motion.a>
                  </div>

                  {/* Right Column: Core Capabilities and Powered By */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Core Capabilities */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4">Core Capabilities:</h4>
                      <div className="space-y-3">
                        {product.coreCapabilities.map((capability: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Powered By */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-4">Powered By:</h4>
                      <div className="space-y-3">
                        {product.poweredBy.map((engine: string, idx: number) => (
                          <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600 font-semibold text-sm">{engine}</span>
                              <span className="text-slate-500 text-xs">Engine</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Key Metric */}
                      <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-slate-600 text-xs">Key Metric</span>
                          <span className="text-blue-600 font-mono font-bold text-sm whitespace-nowrap">
                            {product.keyMetric}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}




