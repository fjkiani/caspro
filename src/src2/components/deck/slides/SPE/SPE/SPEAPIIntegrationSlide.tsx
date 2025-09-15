import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Database, Zap } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEAPIIntegrationSlide = () => {
  const apiCallExample = `curl -sS -X POST http://127.0.0.1:8000/api/efficacy/predict \\
  -H 'Content-Type: application/json' \\
  -d '{
    "model_id": "evo2_1b",
    "mutations": [{
      "gene": "BRAF",
      "hgvs_p": "V600E",
      "chrom": "7",
      "pos": 140453136,
      "ref": "T",
      "alt": "A"
    }],
    "options": {
      "adaptive": true,
      "ensemble": true
    },
    "api_base": "http://127.0.0.1:8000"
  }'`;

  const responseExample = `{
  "therapy": "BRAF inhibitor",
  "disease": "melanoma",
  "on_label": true,
  "tier": "I",
  "strength": "moderate",
  "efficacy_score": 0.261,
  "confidence": 0.51,
  "insights": {
    "functionality": 0.48,
    "chromatin": 0.35,
    "essentiality": 0.42,
    "regulatory": 0.38
  },
  "rationale": [
    "MoA alignment: MAPK blockade",
    "evidence_strength=0.6"
  ],
  "citations": ["39866931", "40411938"],
  "evidence_tier": "consider",
  "badges": ["ClinVar-Strong"],
  "provenance": {
    "efficacy_run": "a02d6a540d4f"
  }
}`;

  return (
    <motion.section
      key="api-integration-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
      <DigitalSynapseBackground />
      <div className="relative z-10 w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            Live API Integration
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300">
            Real-time therapeutic predictions with transparent provenance
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* API Call Example */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Terminal size={24} className="text-green-400" />
              <h3 className="text-2xl font-bold text-slate-200">API Call</h3>
            </div>
            <pre className="text-sm text-slate-300 bg-slate-700 p-4 rounded-lg overflow-x-auto">
              <code>{apiCallExample}</code>
            </pre>
          </motion.div>

          {/* Response Example */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Database size={24} className="text-cyan-400" />
              <h3 className="text-2xl font-bold text-slate-200">Live Response</h3>
            </div>
            <pre className="text-sm text-slate-300 bg-slate-700 p-4 rounded-lg overflow-x-auto">
              <code>{responseExample}</code>
            </pre>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600 text-center">
            <Zap size={48} className="text-yellow-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-slate-200 mb-2">Real-time Predictions</h4>
            <p className="text-slate-300">Get therapeutic recommendations in seconds with full S/P/E analysis</p>
          </div>
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600 text-center">
            <Code2 size={48} className="text-blue-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-slate-200 mb-2">Transparent Provenance</h4>
            <p className="text-slate-300">Every prediction includes run IDs, citations, and rationale for full auditability</p>
          </div>
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600 text-center">
            <Database size={48} className="text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-slate-200 mb-2">Evidence Hierarchy</h4>
            <p className="text-slate-300">RCTs &gt; Guidelines &gt; Cohorts &gt; Case reports with confidence scoring</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-slate-800/30 p-4 rounded-xl border border-slate-600 text-center"
        >
          <p className="text-slate-400">
            Research-mode; cohort-dependent • Backend: http://127.0.0.1:8000
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SPEAPIIntegrationSlide;