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
  Shield,
  Brain,
  Eye
} from 'lucide-react';

// Import real interactive components
import { BRCAMutationSimulator, VUSResolutionPlayground } from '@/components/metrics/interactive';
import { SPEFusionPlayground, DataLabExplorer } from '@/components/evidence/interactive';
import AnimatedText from '@/components/shared/AnimatedText';
import Link from 'next/link';
;
// Removed CardSlider - using grid layout instead

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
    metrics: '0.82-0.95 AUROC Range',
    time: '60 seconds',
    badge: 'Structural Proof',
    businessImpact: 'IND-ready dossier generation',
  }
];

const InteractiveDemoSection: React.FC<InteractiveDemoSectionProps> = ({ className = '' }) => {
  const [activeDemo, setActiveDemo] = useState<string>(DRUG_DEVELOPMENT_DEMOS[0].id);
  const [demoStarted, setDemoStarted] = useState<boolean>(false); // Reintroduce demoStarted state

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
    <section id="interactive-demo" data-section="interactive-demo" className={`py-20 bg-gradient-to-b from-white to-slate-50 ${className}`}>
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
              <AnimatedText 
                texts={[
                  'Research ',
                  'Validate',
                  'Engineer ',
                  'CURE',
                  'Discover '
                ]}
                interval={2000}
              />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            <strong>Try it live:</strong> Experience the complete drug development pipeline powered by AI. 
            Select a stage above to run an interactive demo with real variants and see SAE explainability in action.
          </p>
          
          {/* Pipeline Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Research Use Only - Simulated Results</span>
            </div>
            <span className="text-sm text-slate-600">From Target Validation to Therapeutic Dossier (RUO)</span>
          </div>
        </motion.div>

        {/* Drug Development Pipeline Stages - Side by Side Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-12">
          {DRUG_DEVELOPMENT_DEMOS.map((demo, index) => {
            const Icon = demo.icon;
            const isActive = activeDemo === demo.id;

            return (
              <motion.button
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setDemoStarted(false); // Reset demo started state when a new card is clicked
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-300 group touch-manipulation w-full ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Stage Number */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 bg-gradient-to-r ${demo.color} text-white text-xs font-bold rounded-full`}>
                    {demo.badge}
                  </span>
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

        {/* Interactive Demo Area - Only show when a demo is selected */}
        {currentDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
          >
            {/* Demo Header - Clean and Focused - Mobile Optimized */}
            <div className={`p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-r ${currentDemo.color} text-white`}>
              {/* Top Row: Icon, Title, Badge */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <currentDemo.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-0.5 sm:mb-1 truncate">{currentDemo.title}</h3>
                  <p className="text-white/90 text-[10px] sm:text-xs md:text-sm lg:text-base truncate">{currentDemo.subtitle}</p>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <span className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/20 text-white text-[10px] sm:text-xs md:text-sm font-bold rounded-full`}>
                    {currentDemo.badge}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Performance Metrics and API Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Performance Metrics */}
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm">
                  <div className="text-[10px] sm:text-xs md:text-sm opacity-90 mb-1 sm:mb-2 font-semibold">Performance</div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-0.5 sm:mb-1 leading-tight">{currentDemo.metrics}</div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm opacity-80 line-clamp-2">{currentDemo.businessImpact}</div>
                </div>
                
                {/* API Pipeline */}
                <div className="bg-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm">
                  <div className="text-[10px] sm:text-xs md:text-sm opacity-90 mb-2 sm:mb-3 font-semibold">API Pipeline</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentDemo.apis.map((api, idx) => (
                      <span key={idx} className="text-[9px] sm:text-[10px] md:text-xs bg-white/20 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full font-mono backdrop-blur-sm">
                        /{api}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Content - Mobile Responsive */}
          <div className="p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
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
                  </div>
                ) : (
                  renderActiveDemo()
                )}
                
                {/* SAE Features Visualization */}
                {demoStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6 border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        🧠 See What the AI Sees (SAE Features)
                      </h4>
                    </div>
                    <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4">
                      Every prediction includes <strong>32,768 learned biological features</strong> that explain exactly why the AI made this decision.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {[
                        { id: 'f15680', name: 'Exon Boundaries', description: 'Coding regions identified' },
                        { id: 'f24278', name: 'Mutation Severity', description: 'Frameshift vs synonymous' },
                        { id: 'f1050', name: 'Splice Sites', description: 'Splice acceptor recognition' },
                        { id: 'tf_features', name: 'TF Binding', description: 'Transcription factor motifs' },
                        { id: 'f19746', name: 'Mobile Elements', description: 'Prophage detection' },
                        { id: 'structure', name: 'Protein Structure', description: 'α-helices & β-sheets' }
                      ].map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-purple-600 dark:text-purple-400">{feature.id}</span>
                            <Eye className="w-3 h-3 text-purple-500" />
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">{feature.name}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{feature.description}</div>
                        </div>
                      ))}
                    </div>
                    <Link 
                      href="/evidence/sae-intelligence"
                      className="inline-flex items-center gap-2 text-sm md:text-base text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition-colors"
                    >
                      Explore All 32,768 SAE Features
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-xs md:text-sm text-slate-500 text-center">
              Research Use Only - Simulated Results
            </p>
          </div>
          </motion.div>
        )}

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