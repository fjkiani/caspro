'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  FlaskConical, 
  ArrowRight, 
  Play,
  CheckCircle,
  Dna,
  Activity,
  Shield
} from 'lucide-react';

// Import real interactive components
import { BRCAMutationSimulator, VUSResolutionPlayground } from '@/components/metrics/interactive';
import { SPEFusionPlayground, DataLabExplorer } from '@/components/evidence/interactive';

interface InteractiveDemoSectionProps {
  className?: string;
}

// Drug Development Pipeline Demos - Based on discriminative use cases
const DRUG_DEVELOPMENT_DEMOS = [
  {
    id: 'target-validation',
    title: 'Target Validation',
    subtitle: 'Hereditary Breast Cancer Triage',
    description: 'End-to-end triage of BRCA1 variant with downstream context and actionability',
    icon: Target,
    color: 'from-red-500 to-pink-600',
    component: BRCAMutationSimulator,
    seed: { gene: 'BRCA1', variant: 'c.5266dupC', pos: 'chr17:43044295' },
    apis: [
      'predict_variant_impact',
      'predict_protein_functionality_change', 
      'predict_chromatin_accessibility'
    ],
    metrics: '95.7% ClinVar AUROC',
    time: '30 seconds',
    badge: 'Mathematical Proof',
    businessImpact: 'Eliminates $2.1M target validation costs',
    pipeline: 'Discovery Phase • Stage 1'
  },
  {
    id: 'lead-engineering',
    title: 'Lead Engineering',
    subtitle: 'Oncogene Activation Assessment',
    description: 'Assess KRAS G12C activating mutations and engineer therapeutic responses',
    icon: Zap,
    color: 'from-blue-500 to-cyan-600',
    component: SPEFusionPlayground,
    seed: { gene: 'KRAS', variant: 'G12C', pos: 'chr12:25398285' },
    apis: [
      'generate_optimized_guide_rna',
      'predict_protein_functionality_change',
      'generate_therapeutic_protein'
    ],
    metrics: '70% Pfam-hit Rate',
    time: '45 seconds',
    badge: 'AI Engineering',
    businessImpact: '36x faster lead discovery',
    pipeline: 'Discovery Phase • Stage 2'
  },
  {
    id: 'preclinical-confirmation',
    title: 'Pre-Clinical Confirmation',
    subtitle: 'Therapeutic Targeting Strategy',
    description: 'Evaluate gene essentiality and context-specific therapeutic strategies',
    icon: FlaskConical,
    color: 'from-purple-500 to-violet-600',
    component: DataLabExplorer,
    seed: { gene: 'KRAS', contextA: 'KRAS-mutant NSCLC', contextB: 'Normal lung' },
    apis: [
      'predict_gene_essentiality',
      'predict_chromatin_accessibility',
      'generate_repair_template'
    ],
    metrics: '0.82-0.99 AUROC Range',
    time: '60 seconds',
    badge: 'Structural Proof',
    businessImpact: 'IND-ready dossier generation',
    pipeline: 'Discovery Phase • Stage 3'
  }
];

const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ className = '' }) => {
  const [activeDemo, setActiveDemo] = useState<string>(DRUG_DEVELOPMENT_DEMOS[0].id);
  const [demoStarted, setDemoStarted] = useState<boolean>(false);

  const currentDemo = DRUG_DEVELOPMENT_DEMOS.find(demo => demo.id === activeDemo);

  const handleStartDemo = () => {
    setDemoStarted(true);
  };

  const renderActiveDemo = () => {
    if (!currentDemo) return null;
    const DemoComponent = currentDemo.component;
    return <DemoComponent />;
  };

  return (
    <section className={`py-20 bg-gradient-to-b from-white to-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            🧬 <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Build Your Next Cancer Drug
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Experience the complete <strong>drug development pipeline</strong> powered by AI. 
            From target validation to lead engineering to pre-clinical confirmation - 
            <strong>all in-silico, all in minutes</strong>.
          </p>
          
          {/* Pipeline Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">LIVE DRUG DEVELOPMENT PIPELINE</span>
            </div>
            <span className="text-sm text-slate-600">3-Stage Process • Real APIs • Validated Results</span>
          </div>
        </motion.div>

        {/* Drug Development Pipeline Stages - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {DRUG_DEVELOPMENT_DEMOS.map((demo, index) => {
            const Icon = demo.icon;
            const isActive = activeDemo === demo.id;
            
            return (
              <motion.button
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setDemoStarted(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-300 group touch-manipulation ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Pipeline Stage Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 bg-gradient-to-r ${demo.color} text-white text-xs font-bold rounded-full`}>
                    {demo.badge}
                  </span>
                </div>
                
                {/* Stage Number */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-8 transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${demo.color}` 
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'}`} />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {demo.title}
                  </h3>
                  <div className="text-xs md:text-sm text-slate-500 mb-2">{demo.subtitle}</div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                {/* APIs Used */}
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">APIs Used:</div>
                  <div className="flex flex-wrap gap-1">
                    {demo.apis.slice(0, 2).map((api, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
                        {api.split('_').pop()}
                      </span>
                    ))}
                    {demo.apis.length > 2 && (
                      <span className="text-xs text-slate-400">+{demo.apis.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                {/* Metrics & Business Impact */}
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">{demo.metrics}</span>
                    <span className="text-slate-500">{demo.time}</span>
                  </div>
                  <div className="text-xs text-purple-600 font-semibold">{demo.businessImpact}</div>
                  <div className="text-xs text-slate-500">{demo.pipeline}</div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-200">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-semibold">Selected for Demo</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
        >
          {/* Demo Header */}
          {currentDemo && (
            <div className={`p-6 bg-gradient-to-r ${currentDemo.color} text-white`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <currentDemo.icon className="w-6 h-6 md:w-8 md:h-8" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{currentDemo.title}</h3>
                    <p className="text-white/90 mb-2 text-sm md:text-base">{currentDemo.subtitle}</p>
                    <p className="text-white/80 text-xs md:text-sm">{currentDemo.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs md:text-sm opacity-90">Performance</div>
                  <div className="text-lg md:text-xl font-bold">{currentDemo.metrics}</div>
                  <div className="text-xs md:text-sm opacity-80">{currentDemo.businessImpact}</div>
                </div>
              </div>
              
              {/* API Pipeline */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-xs md:text-sm opacity-90 mb-2">API Pipeline:</div>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {currentDemo.apis.map((api, idx) => (
                    <span key={idx} className="text-xs bg-white/20 px-2 md:px-3 py-1 rounded-full font-mono">
                      /{api}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Demo Content - Mobile Responsive */}
          <div className="p-4 md:p-8">
            {!demoStarted ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Ready to Build Your Next Cancer Drug?
                  </h4>
                  <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                    This demonstration will show you how to go from a genetic variant to a validated 
                    therapeutic target using our complete AI-powered drug development pipeline.
                  </p>
                </div>
                
                <motion.button
                  onClick={handleStartDemo}
                  className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${currentDemo?.color} text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 touch-manipulation`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Start Drug Development Pipeline</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
                <p className="mt-4 text-xs md:text-sm text-slate-500">
                  Live APIs • Real validation data • Complete therapeutic dossier
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveDemo()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* What You Just Experienced */}
        {demoStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              What You Just Experienced: The Future of Drug Development
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-green-900 mb-2">Mathematical Certainty</h4>
                <p className="text-green-700 text-sm">95.7% AUROC precision replaces the $2.6B gamble with validated targets</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-blue-900 mb-2">Complete Pipeline</h4>
                <p className="text-blue-700 text-sm">End-to-end drug development from variant to therapeutic in minutes</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Dna className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-purple-900 mb-2">Multi-Engine AI</h4>
                <p className="text-purple-700 text-sm">Oracle + Forge + Boltz working together for validated results</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InteractiveDemoSection;