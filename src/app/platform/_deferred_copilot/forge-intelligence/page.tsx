'use client';

import React from 'react';
import { forgeIntelligenceData } from '@/data/copilots/forge-intelligence-data';
import { motion } from 'framer-motion';
import { Scissors, TestTube2, Dna, CheckCircle, Zap, FileText } from 'lucide-react';
import Link from 'next/link';

const ForgeIntelligencePage: React.FC = () => {
  const content = forgeIntelligenceData;

  const designCapabilities = [
    {
      title: "CRISPR Guide Generation",
      description: "Design precision CRISPR guides with PAM windowing and off-target assessment",
      icon: Scissors,
      color: "text-blue-400",
      metrics: ["100% AlphaFold validation", "15/15 guides pass tests", "PAM optimization"]
    },
    {
      title: "Protein Therapeutic Engineering",
      description: "Generate novel biologics with optimized binding affinity and stability",
      icon: TestTube2,
      color: "text-green-400",
      metrics: ["70% Pfam coherence", "Optimized PK/PD", "Patent-ready designs"]
    },
    {
      title: "HDR Template Design",
      description: "Create homology-directed repair blueprints with genomic context preservation",
      icon: Dna,
      color: "text-purple-400",
      metrics: ["Synteny preservation", "Naturalness validation", "Clinical optimization"]
    },
    {
      title: "Structural Validation",
      description: "AlphaFold 3 integration ensures every design has 3D structural integrity",
      icon: CheckCircle,
      color: "text-red-400",
      metrics: ["pLDDT ≥70 threshold", "95.8% confidence", "Complex validation"]
    },
    {
      title: "Therapeutic Optimization",
      description: "Objective-driven design with peak optimization and constraint satisfaction",
      icon: Zap,
      color: "text-orange-400",
      metrics: ["Inference scaling", "Multi-objective", "Quality control"]
    },
    {
      title: "Regulatory Documentation",
      description: "Generate FDA-grade IND packages with complete structural documentation",
      icon: FileText,
      color: "text-yellow-400",
      metrics: ["IND-ready dossiers", "Audit trails", "IP protection"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 mb-4">
              Generative Therapeutic Design
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.pageTitle.split(':')[0]}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Start Designing
              </button>
              <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                View Capabilities
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Design Capabilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Generative Therapeutic Design Engine
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Six integrated capabilities that transform therapeutic design from art to engineering
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${capability.color.replace('text-', 'bg-').replace('-400', '-100')}`}>
                  <Icon className={`w-6 h-6 ${capability.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{capability.title}</h3>
                <p className="text-gray-600 mb-4">{capability.description}</p>
                <div className="space-y-1">
                  {capability.metrics.map((metric, i) => (
                    <div key={i} className="text-sm text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      {metric}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg font-medium transition-colors">
                  Try {capability.title.split(' ')[0]}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Evo2 + AlphaFold 3 Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Evo2 + AlphaFold 3: Dual AI Validation
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 text-center mb-4">Evo2 Generative Engine</h4>
              <div className="space-y-3 text-gray-600">
                <div>• 40B parameter model with 1M token context</div>
                <div>• Guided generation from molecular first principles</div>
                <div>• Multi-objective optimization and constraint satisfaction</div>
                <div>• Quality control: dinucleotide KL divergence</div>
                <div>• Naturalness validation and synteny preservation</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <TestTube2 className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-green-900 text-center mb-4">AlphaFold 3 Structural Validation</h4>
              <div className="space-y-3 text-gray-600">
                <div>• pLDDT ≥70 threshold for structural confidence</div>
                <div>• 95.8% average confidence for generated complexes</div>
                <div>• Binding affinity prediction and complex validation</div>
                <div>• 3D conformation assessment and stability scoring</div>
                <div>• Regulatory-grade structural documentation</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Validated Design Performance
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">70%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Functional Coherence</div>
              <div className="text-sm text-gray-600">Pfam-hit rate for generated genomes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Structural Validation</div>
              <div className="text-sm text-gray-600">AlphaFold 3 confirmed folding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Design AUROC</div>
              <div className="text-sm text-gray-600">With inference-time compute scaling</div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Therapeutic Design Applications
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">CRISPR Gene Editing</h4>
              <div className="space-y-2 text-gray-600">
                <div>• Precision guide RNA design and optimization</div>
                <div>• Off-target effect minimization</div>
                <div>• HDR template generation for gene correction</div>
                <div>• Cas9/Cas12 specificity engineering</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Biologic Therapeutics</h4>
              <div className="space-y-2 text-gray-600">
                <div>• Antibody fragment and nanobody design</div>
                <div>• Protein inhibitor engineering</div>
                <div>• Multi-specific antibody optimization</div>
                <div>• Immunotoxin development</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Gene Therapy Vectors</h4>
              <div className="space-y-2 text-gray-600">
                <div>• AAV capsid engineering for tissue specificity</div>
                <div>• Promoter design and optimization</div>
                <div>• Regulatory element generation</div>
                <div>• Safety profile enhancement</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Cell & Gene Therapies</h4>
              <div className="space-y-2 text-gray-600">
                <div>• CAR-T receptor optimization</div>
                <div>• Stem cell differentiation protocols</div>
                <div>• Genome editing strategy design</div>
                <div>• Safety switch implementation</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Engineer Your Therapeutic?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join biotech founders and drug hunters using Forge Intelligence to design
            precision therapeutics with generative AI validation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products/forge">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Explore Forge Products
              </button>
            </Link>
            <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgeIntelligencePage;
