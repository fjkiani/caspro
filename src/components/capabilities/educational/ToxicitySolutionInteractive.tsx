'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Activity, Apple, Clock, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { SolutionNarrativeSectionData } from '@/types/educational-capability';

interface ToxicitySolutionInteractiveProps {
  data: SolutionNarrativeSectionData;
  className?: string;
}

interface SolutionStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  details: {
    label: string;
    value: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const solutionSteps: SolutionStep[] = [
  {
    id: 'pharmacogene',
    number: 1,
    title: 'Pharmacogene Detection',
    description: 'Screens 20+ drug-metabolizing enzymes for variants that affect drug breakdown',
    icon: Dna,
    color: 'blue',
    details: [
      { label: 'Genes Screened', value: '20+ pharmacogenes' },
      { label: 'High-Impact', value: 'DPYD, TPMT, UGT1A1, CYP2D6' },
      { label: 'Risk Weight', value: '0.4 for high-impact genes' },
    ],
    metrics: [
      { label: 'Coverage', value: '100% PGx' },
      { label: 'Genes', value: '20+' },
    ],
  },
  {
    id: 'pathway-overlap',
    number: 2,
    title: 'Pathway Overlap Analysis',
    description: 'Maps drug MoA to toxic pathways and computes overlap with patient germline variants',
    icon: Activity,
    color: 'green',
    details: [
      { label: 'Pathways', value: 'DNA repair, Inflammation, Cardiometabolic' },
      { label: 'Drug MoAs', value: '15+ mechanisms mapped' },
      { label: 'Example', value: 'Platinum → DNA repair: 0.9 overlap' },
    ],
    metrics: [
      { label: 'Pathways', value: '3' },
      { label: 'MoAs', value: '15+' },
    ],
  },
  {
    id: 'mitigating-foods',
    number: 3,
    title: 'Mitigating Foods Mapping',
    description: 'Connects pathway overlap to specific foods with timing and dosage',
    icon: Apple,
    color: 'purple',
    details: [
      { label: 'DNA Repair', value: 'NAC, Vitamin D, Folate (post-chemo)' },
      { label: 'Inflammation', value: 'Omega-3, Curcumin, EGCG (post-infusion)' },
      { label: 'Cardiometabolic', value: 'CoQ10, L-Carnitine, Magnesium (continuous)' },
    ],
    metrics: [
      { label: 'Compounds', value: '9' },
      { label: 'Pathways', value: '3' },
    ],
  },
  {
    id: 'timing-dosage',
    number: 4,
    title: 'Personalized Timing & Dosage',
    description: 'Recommends when to take supplements with specific dosages',
    icon: Clock,
    color: 'orange',
    details: [
      { label: 'Post-Infusion', value: 'NAC (600mg twice daily)' },
      { label: 'Continuous', value: 'Vitamin D, CoQ10' },
      { label: 'Between Meals', value: 'Curcumin' },
    ],
    metrics: [
      { label: 'Timing Types', value: '3' },
      { label: 'Personalized', value: '100%' },
    ],
  },
];

export default function ToxicitySolutionInteractive({ data, className = '' }: ToxicitySolutionInteractiveProps) {
  const [activeStep, setActiveStep] = useState<string>('pharmacogene');
  const selectedStep = solutionSteps.find(s => s.id === activeStep) || solutionSteps[0];

  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            We've built the first system that prevents drug toxicity by identifying germline risks and recommending protective foods.
          </p>
        </motion.div>

        {/* Interactive Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {solutionSteps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            
            // Get color classes based on step color
            const getColorClasses = () => {
              if (step.color === 'blue') {
                return isActive 
                  ? 'bg-blue-500 text-white border-blue-600' 
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
              }
              if (step.color === 'green') {
                return isActive 
                  ? 'bg-green-500 text-white border-green-600' 
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
              }
              if (step.color === 'purple') {
                return isActive 
                  ? 'bg-purple-500 text-white border-purple-600' 
                  : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
              }
              if (step.color === 'orange') {
                return isActive 
                  ? 'bg-orange-500 text-white border-orange-600' 
                  : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100';
              }
              return 'bg-slate-50 text-slate-700 border-slate-200';
            };

            return (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: step.number * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl p-6 border-2 transition-all text-left ${getColorClasses()} ${
                  isActive ? 'shadow-xl ring-2 ring-offset-2 ring-offset-white' : 'shadow-md'
                }`}
              >
                {/* Step Number */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${
                  isActive ? 'bg-white/20' : 'bg-white'
                }`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-3">
                  <Icon className={`w-8 h-8 ${isActive ? 'text-white' : ''}`} />
                </div>

                {/* Title */}
                <h3 className={`font-semibold mb-2 ${isActive ? 'text-white' : ''}`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${isActive ? 'text-white/90' : ''}`}>
                  {step.description}
                </p>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeStep"
                    className="absolute bottom-2 right-2"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Detailed View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-slate-200"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedStep.color === 'blue' ? 'bg-blue-100' :
                    selectedStep.color === 'green' ? 'bg-green-100' :
                    selectedStep.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <selectedStep.icon className={`w-6 h-6 ${
                      selectedStep.color === 'blue' ? 'text-blue-600' :
                      selectedStep.color === 'green' ? 'text-green-600' :
                      selectedStep.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedStep.title}</h3>
                    <p className="text-slate-600">{selectedStep.description}</p>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-3">
                  {selectedStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        selectedStep.color === 'blue' ? 'text-blue-600' :
                        selectedStep.color === 'green' ? 'text-green-600' :
                        selectedStep.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{detail.label}</div>
                        <div className="text-slate-600 text-sm">{detail.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Metrics */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {selectedStep.metrics.map((metric, idx) => {
                    const gradientClass = selectedStep.color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
                                         selectedStep.color === 'green' ? 'from-green-50 to-green-100 border-green-200' :
                                         selectedStep.color === 'purple' ? 'from-purple-50 to-purple-100 border-purple-200' :
                                         'from-orange-50 to-orange-100 border-orange-200';
                    return (
                    <div key={idx} className={`bg-gradient-to-br ${gradientClass} rounded-xl p-4 border-2`}>
                      <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                      <div className="text-sm text-slate-600">{metric.label}</div>
                    </div>
                    );
                  })}
                </div>

                {/* Visual Flow Arrow */}
                {selectedStep.number < solutionSteps.length && (
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <span className="text-sm font-medium">Next: {solutionSteps[selectedStep.number].title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MOAT Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
            The Patient MOAT (What We Just Built)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Activity, label: 'Toxicity pathway detection', value: 'Knows which pathways your drug stresses' },
              { icon: Apple, label: 'Mitigating foods mapping', value: 'Knows which foods support those pathways' },
              { icon: Clock, label: 'Personalized timing', value: 'Knows when to take supplements' },
            ].map((moat, idx) => {
              const MoatIcon = moat.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <MoatIcon className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-900 text-sm">{moat.label}</span>
                  </div>
                  <p className="text-sm text-slate-600">{moat.value}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xl font-semibold text-slate-800 mt-12"
        >
          <span className="text-green-600">This is the first system that connects</span>
          <br />
          <span className="text-slate-900">toxicity detection to precision nutrition.</span>
        </motion.p>
      </div>
    </section>
  );
}

