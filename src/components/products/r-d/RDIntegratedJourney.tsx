'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import { Dna, Target, Activity, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const journeySteps = [
  {
    step: 1,
    title: 'Mechanism Profiling',
    description: 'VCF/NGS → Parse → 7D Mechanism Vector → Pathway Burden',
    example: 'MBD4 + TP53 → [0.88, 0.12, 0.15, 0.10, 0.05, 0.0, 0.0]',
    details: 'DDR-high, HRD-positive, PARP-eligible',
    validation: 'DDR dimension validated (0.983 mean fit)',
    icon: Dna,
    color: 'blue'
  },
  {
    step: 2,
    title: 'Drug-Pathway Matching',
    description: 'S/P/E Framework → Drug Ranking → Evidence Tiers → Badges',
    example: 'PARP inhibitors ranked #1-3 (0.800 efficacy)',
    details: 'Evidence tier: Supported, Badge: PathwayAligned',
    validation: '100% pathway alignment (5/5 MAPK), 100% top-5 accuracy (17/17 patients)',
    icon: Target,
    color: 'green'
  },
  {
    step: 3,
    title: 'Trial-Mechanism Fit',
    description: 'Patient Vector × Trial MoA → Mechanism Fit Score',
    example: 'PARP+ATR trial = 0.98 fit (ranked #1)',
    details: 'Combined Score: 0.7×eligibility + 0.3×mechanism_fit',
    validation: 'Top-3 accuracy: 1.00 | MRR: 0.75',
    icon: Activity,
    color: 'purple'
  },
  {
    step: 4,
    title: 'Toxicity Prevention',
    description: 'PGx Screening → MoA-Pathway Overlap → Risk Level → Dose',
    example: 'DPYD ✓, TPMT ✓, UGT1A1 ✓ → Standard dose appropriate',
    details: 'Cumulative toxicity check: No prior anthracyclines',
    validation: 'Framework tested on example cases',
    icon: Shield,
    color: 'orange'
  },
  {
    step: 5,
    title: 'Unified Feasibility Score',
    description: 'Efficacy Score × Toxicity Adjustment',
    example: 'Mechanism Fit × Safety Score × Dose Confidence',
    details: 'Policy: HIGH toxicity → AVOID (score = 0), MODERATE → CONSIDER WITH MONITORING, LOW → PREFERRED',
    validation: 'Framework tested on example cases',
    icon: CheckCircle,
    color: 'teal'
  }
];

const colorClasses = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' }
};

export default function RDIntegratedJourney() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Integrated Patient Journey"
          subtitle="One end-to-end solution"
        />

        <div className="mt-12 space-y-6">
          {journeySteps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses];
            const Icon = step.icon;

            return (
              <React.Fragment key={step.step}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200"
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-semibold ${colors.text}`}>
                          STEP {step.step}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-slate-700 mb-4">{step.description}</p>
                      <div className="bg-slate-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-mono text-slate-700 mb-2">Example:</p>
                        <p className="text-sm text-slate-600">{step.example}</p>
                        <p className="text-sm text-slate-600 mt-2">{step.details}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-slate-600">{step.validation}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {index < journeySteps.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200"
        >
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h3 className="text-2xl font-bold text-slate-900">Outcome: Integrated Assessment</h3>
          </div>
          <p className="text-slate-700">
            Framework supports patient-trial-dose assessment. Ongoing validation with partner data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
