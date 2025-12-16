'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, Search, Database, BookOpen, Eye, Target, Activity } from 'lucide-react';

export default function ResearchInteractiveShowcase() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const researchTools = [
    {
      id: 'hypothesis-testing',
      title: 'Universal Hypothesis Testing',
      description: 'Test any compound against any disease with mechanistic validation',
      icon: TestTube,
      color: 'blue',
      capabilities: [
        '50+ diseases supported simultaneously',
        '110M+ compounds from PubChem & ChEMBL',
        'Mechanistic validation (not just correlation)',
        'Evidence-backed confidence scores'
      ],
      demo: {
        query: 'Does curcumin inhibit KRAS signaling in pancreatic cancer?',
        result: '94% confidence - Curcumin targets MEK/ERK pathway downstream of KRAS G12D',
        time: '2.3 seconds'
      }
    },
    {
      id: 'vus-explorer',
      title: 'VUS Explorer',
      description: 'Turn unknown variants into actionable research insights',
      icon: Eye,
      color: 'purple',
      capabilities: [
        '73% VUS to actionable conversion rate',
        'Pathogenic probability scoring',
        'Functional impact prediction',
        'Research hypothesis generation'
      ],
      demo: {
        variant: 'BRCA1 c.123A>T (p.Lys41Asn)',
        result: 'Pathogenic (89% confidence) - Disrupts RING domain zinc coordination',
        time: '1.8 seconds'
      }
    },
    {
      id: 'cohort-intelligence',
      title: 'Cohort Intelligence',
      description: 'Extract, label, and benchmark datasets from major repositories',
      icon: Database,
      color: 'green',
      capabilities: [
        'TCGA, cBioPortal, GDC integration',
        'Automated cohort stratification',
        'Biomarker frequency analysis',
        'Comparative cohort benchmarking'
      ],
      demo: {
        query: 'TP53 mutations in breast cancer subtypes',
        result: 'Luminal A: 12%, HER2+: 45%, Triple-negative: 78% - 15 cohorts analyzed',
        time: '3.1 seconds'
      }
    },
    {
      id: 'evidence-synthesis',
      title: 'Evidence Synthesis',
      description: 'Multi-provider literature search with quality validation',
      icon: BookOpen,
      color: 'teal',
      capabilities: [
        'PubMed, OpenAlex, S2 integration',
        'Citation quality scoring',
        'Temporal evidence trends',
        'Contradictory evidence flagging'
      ],
      demo: {
        query: 'Palbociclib resistance mechanisms',
        result: '247 papers analyzed - CDK4/6 bypass (45%), RB1 loss (32%), Cyclin E amplification (23%)',
        time: '4.2 seconds'
      }
    },
    {
      id: 'metastasis-assessment',
      title: 'Metastasis Assessment',
      description: '8-step cascade risk prediction for metastatic potential',
      icon: Target,
      color: 'orange',
      capabilities: [
        'Multi-step risk assessment',
        'Organ-specific predictions',
        'Temporal progression modeling',
        'Therapeutic intervention points'
      ],
      demo: {
        tumor: 'Stage II colorectal cancer',
        result: 'High liver metastasis risk (78%) - Recommend adjuvant chemotherapy at 6 weeks',
        time: '2.7 seconds'
      }
    },
    {
      id: 'knowledge-integration',
      title: 'Knowledge Base Integration',
      description: 'Contextual help, coverage indicators, and provenance tracking',
      icon: Activity,
      color: 'indigo',
      capabilities: [
        'Real-time coverage indicators',
        'Contextual research guidance',
        'Complete provenance tracking',
        'Collaborative knowledge sharing'
      ],
      demo: {
        query: 'Coverage for rare genetic diseases',
        result: '12,847 rare diseases covered - 94% with therapeutic hypotheses available',
        time: '1.5 seconds'
      }
    }
  ];

  return (
    <section id="interactive-tools" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Search className="w-4 h-4" />
            INTERACTIVE RESEARCH TOOLS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Experience Research Acceleration Live
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Click on any research tool below to see how CrisPRO.ai accelerates
            discovery with real-time demonstrations and live results.
          </motion.p>
        </div>

        {/* Research Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {researchTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={`relative bg-white p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                activeTool === tool.id
                  ? `border-${tool.color}-500 shadow-xl`
                  : `border-slate-200 hover:border-${tool.color}-300 hover:shadow-xl`
              }`}
              onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${tool.color}-100 rounded-xl flex items-center justify-center`}>
                  <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
                </div>
                <div className={`w-3 h-3 rounded-full bg-${tool.color}-500 transition-opacity ${
                  activeTool === tool.id ? 'opacity-100' : 'opacity-0'
                }`}>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {tool.title}
              </h3>

              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Key Capabilities */}
              <div className="space-y-2 mb-4">
                {tool.capabilities.slice(0, 2).map((capability, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`w-2 h-2 bg-${tool.color}-500 rounded-full mr-2`}></div>
                    <span className="text-sm text-slate-700">{capability}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 flex items-center">
                {activeTool === tool.id ? 'Hide demo' : 'Click to see demo'}
                <motion.div
                  animate={{ rotate: activeTool === tool.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1"
                >
                  ▼
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Tool Demo */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8">
                {(() => {
                  const tool = researchTools.find(t => t.id === activeTool);
                  if (!tool) return null;

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 bg-${tool.color}-100 rounded-xl flex items-center justify-center mr-4`}>
                          <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800">{tool.title} Demo</h3>
                          <p className="text-slate-600">Live demonstration of research acceleration capabilities</p>
                        </div>
                      </div>

                      {/* Query Input */}
                      <div className={`bg-${tool.color}-50 p-6 rounded-xl border border-${tool.color}-200`}>
                        <h4 className="font-semibold text-slate-800 mb-3">Research Query</h4>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="text-slate-800 font-medium">{tool.demo.query}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          AI-Powered Results
                        </h4>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="text-slate-800 font-medium mb-2">{tool.demo.result}</p>
                          <div className="flex items-center text-sm text-slate-600">
                            <span className="font-medium">Processing time:</span>
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded">
                              {tool.demo.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Capabilities List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tool.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className={`w-2 h-2 bg-${tool.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                            <span className="text-sm text-slate-700">{capability}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="text-center pt-4 border-t border-slate-200">
                        <button className={`px-6 py-3 bg-${tool.color}-600 hover:bg-${tool.color}-700 text-white rounded-xl font-semibold transition-colors`}>
                          Try {tool.title} Now
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
