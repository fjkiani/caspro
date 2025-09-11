import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dna, 
  Cpu, 
  Database, 
  CheckCircle, 
  ArrowRight, 
  Zap,
  Target,
  FileText,
  Code,
  Shield
} from 'lucide-react';

interface PipelineStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
  technical: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'validation',
    title: 'Input Validation',
    description: 'Strict data hygiene with allele and coordinate validation',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-500 to-red-600',
    details: ['Build validation (GRCh37/38)', 'Coordinate verification', 'REF>ALT allele checking'],
    technical: 'Hard fail on errors; no mock data generation'
  },
  {
    id: 'context',
    title: 'Genomic Context',
    description: 'Fetch and center genomic window from Ensembl',
    icon: <Database className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
    details: ['8,192 nt default window', 'Variant centering', 'Ensembl API integration'],
    technical: 'Optimal signal-to-noise balance for Evo2 scoring'
  },
  {
    id: 'scoring',
    title: 'Evo2 Delta Scoring',
    description: 'Live genome-scale language model scoring',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
    details: ['Reference vs alternate scoring', 'Zeta score calculation', 'Multi-scale windows (1k/2k/4k/8k)'],
    technical: 'Transcript-aware, no canned lookups'
  },
  {
    id: 'mapping',
    title: 'Impact Mapping',
    description: 'Map delta scores to functional impact levels',
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-green-600',
    details: ['≤ -10 → 3.0 (high impact)', '≤ -3 → 2.0 (moderate)', '≤ -0.5 → 1.0 (low)', 'else 0.5 (neutral)'],
    technical: 'Clinically relevant thresholds for resistance prediction'
  },
  {
    id: 'aggregation',
    title: 'Pathway Aggregation',
    description: 'Sum impacts into RAS/MAPK and TP53 pathways',
    icon: <Dna className="w-6 h-6" />,
    color: 'from-orange-500 to-orange-600',
    details: ['RAS/MAPK pathway scoring', 'TP53 cooperation analysis', 'Resistance risk estimation'],
    technical: 'Clinically relevant pathway focus for MM'
  },
  {
    id: 'output',
    title: 'JSON Output',
    description: 'Structured results with full provenance',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-indigo-500 to-indigo-600',
    details: ['Zeta scores per variant', 'Pathway-level summaries', 'Prediction (Resistant/Sensitive)', 'Run IDs and timestamps'],
    technical: 'Complete audit trail and repeatability'
  }
];

export const TechnicalPipeline: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Live Technical Pipeline</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert-grade Evo2 genome-scale language model with strict data hygiene and transparent error handling
          </p>
        </motion.div>

        {/* Pipeline Flow */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Pipeline */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-12">
              {pipelineSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${step.color} text-white shadow-lg mb-4`}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-gray-600 text-center max-w-32">{step.description}</p>
                  </motion.div>
                  
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      className="flex-1 mx-4"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    >
                      <div className="h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 relative">
                        <ArrowRight className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Pipeline */}
          <div className="lg:hidden space-y-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color} text-white shadow-md flex-shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  <p className="text-xs text-gray-500 italic">{step.technical}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Steps */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color} text-white`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                
                <div className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 italic">{step.technical}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Technical Features */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">What Makes This Expert-Grade</h3>
            <p className="text-gray-600">Live, transcript-aware scoring with strict data hygiene</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Live Evo2 Scoring',
                description: 'No canned lookups, real-time genome-scale language model'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Strict Data Hygiene',
                description: 'Fail rather than fabricate; transparent error handling'
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Clinically Relevant',
                description: 'KRAS/NRAS/BRAF and TP53 pathway focus'
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: 'Extensible Architecture',
                description: 'Fusion-ready with splice-aware checks and protein models'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white inline-block mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
