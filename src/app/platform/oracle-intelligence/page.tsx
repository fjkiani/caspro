'use client';

import React from 'react';
import { oracleIntelligenceData } from '@/data/copilots/oracle-intelligence-data';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import { motion } from 'framer-motion';
import { Layers, Target, Search, Shield, Gauge, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const OracleIntelligencePage: React.FC = () => {
  const content = oracleIntelligenceData;

  const demoCards = [
    {
      title: "S/P/E Framework Demo",
      description: "See how Sequence, Pathway, and Evidence signals combine for robust predictions",
      icon: Layers,
      color: "text-blue-400",
      action: "Experience S/P/E"
    },
    {
      title: "Variant Confidence Scoring",
      description: "Interactive confidence calculation with gene-specific calibration",
      icon: Target,
      color: "text-green-400",
      action: "Calculate Confidence"
    },
    {
      title: "Insight Components Breakdown",
      description: "Explore the four biological insight components in detail",
      icon: Search,
      color: "text-purple-400",
      action: "Explore Insights"
    },
    {
      title: "Provenance Audit Trail",
      description: "Complete transparency with run IDs, citations, and methodology",
      icon: Shield,
      color: "text-red-400",
      action: "View Audit Trail"
    },
    {
      title: "Gene Calibration System",
      description: "See how raw scores become clinically interpretable confidence",
      icon: Gauge,
      color: "text-orange-400",
      action: "Test Calibration"
    },
    {
      title: "Multi-Modal Validation",
      description: "Compare predictions across different validation methods",
      icon: CheckCircle,
      color: "text-yellow-400",
      action: "Validate Prediction"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Multi-Modal AI Validation
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.pageTitle.split(':')[0]}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Experience S/P/E Framework
              </button>
              <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                View Performance Metrics
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* S/P/E Framework Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The S/P/E Framework: Three Signals, One Truth
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sequence analysis, pathway mapping, and evidence synthesis combine for predictions
            you can trust for clinical decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Sequence (30%)</h3>
            <p className="text-gray-600 mb-4">
              Evo2 foundation model analyzes DNA/RNA sequences for functional disruption
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• 1M token context window</div>
              <div>• 95.7% ClinVar AUROC</div>
              <div>• Zero-shot capability</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Pathway (40%)</h3>
            <p className="text-gray-600 mb-4">
              Maps mutated genes to biological pathways and drug targets
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• KEGG/Reactome integration</div>
              <div>• Drug target identification</div>
              <div>• Pathway disruption analysis</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Evidence (30%)</h3>
            <p className="text-gray-600 mb-4">
              Literature and clinical database search validates predictions
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• PubMed/OpenAlex integration</div>
              <div>• Citation quality scoring</div>
              <div>• Prior probability boosts</div>
            </div>
          </div>
        </div>

        {/* Four Insight Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Four Biological Insight Components
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <SAEIntelligence
              data={{
                biomarkerGrid: [
                  { name: "BRCA1:c.123A>T", impact: "Pathogenic", confidence: 0.94 },
                  { name: "TP53:p.R175H", impact: "Pathogenic", confidence: 0.91 },
                  { name: "KRAS:G12D", impact: "Pathogenic", confidence: 0.87 }
                ],
                resistanceAnalysis: {
                  mechanisms: ["Secondary mutations", "Bypass pathways"],
                  confidence: 0.82,
                  actionable: true
                },
                dataProcessingSummary: {
                  totalVariants: 1250,
                  processed: 1250,
                  confidence: 0.89
                }
              }}
            />
          </div>
        </motion.div>

        {/* Interactive Demos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Experience Oracle Intelligence
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCards.map((demo, index) => {
              const Icon = demo.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-6 h-full">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${demo.color.replace('text-', 'bg-').replace('-400', '-100')}`}>
                      <Icon className={`w-5 h-5 ${demo.color}`} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{demo.title}</h4>
                    <p className="text-gray-600 mb-4">{demo.description}</p>
                    <button className="w-full border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg font-medium transition-colors">
                      {demo.action}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Validated Performance Metrics
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">ClinVar Gold Standard</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Coding SNVs:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">95.7% AUROC</span>
                </div>
                <div className="flex justify-between">
                  <span>Noncoding SNVs:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">95.8% AUROC</span>
                </div>
                <div className="flex justify-between">
                  <span>BRCA1 Supervised:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">94% AUROC</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-xl font-semibold text-green-900 mb-4">Clinical Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>VUS Resolution:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">73% reduction</span>
                </div>
                <div className="flex justify-between">
                  <span>Decision Time:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">6 weeks → 1 day</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">$75K → $50</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience Transparent AI?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the clinicians and researchers using Oracle Intelligence for
            confident, auditable variant predictions.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products/oracle">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors">
                Learn More About Oracle
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

export default OracleIntelligencePage;
