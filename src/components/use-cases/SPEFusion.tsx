'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dna, 
  Network, 
  BookOpen, 
  Plus,
  ArrowRight,
  Target,
  TrendingUp,
  CheckCircle,
  Zap
} from 'lucide-react';

interface FusionComponent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

const fusionComponents: FusionComponent[] = [
  {
    id: 'sequence',
    title: 'Sequence (S)',
    description: 'CrisPRO.ai multi-scale magnitudes with hotspot-aware functionality',
    icon: <Dna className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    details: [
      'CrisPRO.ai multi/exon magnitudes',
      'Hotspot-aware functionality lift',
      'Truncation gates for protein impact',
      'Multi-scale context windows (1k/2k/4k/8k)'
    ],
    metrics: [
      { label: 'Delta Threshold', value: '≤ -3.0', description: 'Strong disruption indicator' },
      { label: 'Context Window', value: '8,192 nt', description: 'Optimal signal-to-noise balance' },
      { label: 'Multi-Scale Consistency', value: '85%', description: 'Cross-window agreement rate' }
    ]
  },
  {
    id: 'pathway',
    title: 'Pathway (P)',
    description: 'Gene-to-pathway burden mapping with MoA-aligned aggregation',
    icon: <Network className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    details: [
      'Map variants to MoA-aligned pathways',
      'Weighted aggregation per drug class',
      'RAS/MAPK pathway focus (KRAS/NRAS/BRAF)',
      'TP53 cooperation analysis'
    ],
    metrics: [
      { label: 'RAS/MAPK Coverage', value: '95%', description: 'Pathway variant coverage' },
      { label: 'TP53 Cooperation', value: '25%', description: 'Cooperating hit frequency' },
      { label: 'Pathway Accuracy', value: '89%', description: 'Prediction accuracy' }
    ]
  },
  {
    id: 'evidence',
    title: 'Evidence (E)',
    description: 'ClinVar priors with optional literature integration',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    details: [
      'ClinVar prior integration',
      'Optional literature (PubMed/OpenAlex)',
      'Badges and tier transparency',
      'Citation management with caching'
    ],
    metrics: [
      { label: 'ClinVar AUROC', value: '0.957', description: 'Overall accuracy (n=53,210)' },
      { label: 'SpliceVarDB AUROC', value: '0.826', description: 'Splice prediction (n=4,950)' },
      { label: 'Tier Promotions', value: '10-20%', description: 'Consider→Supported when aligned' }
    ]
  }
];

export const SPEFusion: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">S/P/E Fusion Methodology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sequence + Pathway + Evidence fusion for explainable therapy ranking with confidence and citations
          </p>
        </motion.div>

        {/* Fusion Flow Visualization */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            {fusionComponents.map((component, index) => (
              <React.Fragment key={component.id}>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-r ${component.color} text-white shadow-xl mb-4`}>
                    {component.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{component.title}</h3>
                  <p className="text-sm text-gray-600 text-center max-w-40">{component.description}</p>
                </motion.div>
                
                {index < fusionComponents.length - 1 && (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    <Plus className="w-6 h-6 text-gray-400 mx-2" />
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Result */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-xl">
              <Target className="w-6 h-6" />
              <span className="text-lg font-bold">Ranked Therapy Classes</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">With confidence, evidence tier, badges, and citations</p>
          </motion.div>
        </div>

        {/* Detailed Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {fusionComponents.map((component, index) => (
            <motion.div
              key={component.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${component.color} text-white shadow-lg`}>
                  {component.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{component.title}</h3>
                  <p className="text-gray-600 text-sm">{component.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {component.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  {component.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="p-3 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                        <span className="text-lg font-bold text-gray-800">{metric.value}</span>
                      </div>
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Observed Outcomes */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Observed Outcomes</h3>
            <p className="text-gray-600">Real-world impact from pilot research applications</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Faster Decisions',
                description: 'Explainable ranking reduces meeting time'
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Tier Promotions',
                description: '10-20% Consider→Supported when ClinVar-Strong + Pathway-Aligned'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Confidence Lifts',
                description: '+0.05-0.12 with aligned cohort/literature overlays'
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: 'Trial Shortlist',
                description: '50+ → ~5-12 with Likely/Potential/Unlikely labels'
              }
            ].map((outcome, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="p-4 bg-white rounded-xl shadow-md inline-block mb-4">
                  <div className="text-blue-600">{outcome.icon}</div>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{outcome.title}</h4>
                <p className="text-sm text-gray-600">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
