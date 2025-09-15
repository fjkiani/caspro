import React from 'react';
import { BusinessTransformation, ClinicalWorkflow } from '../components/site/blocks';
import { TwoHitDiagram, RiskMap, Arsenal } from '../components/site/runx1';
import { renderContextualComponent } from '../utils/componentRenderer';
import { oracleContent } from '../data/oracleContent';
import { runx1Content } from '../data/runx1Content';
import { forgeContent } from '../data/forgeContent';
import type { ComponentConfig } from '../types/transformation';

const clinicalWorkflowData = {
  traditional: [
    {
      title: 'Genetic Testing & Variant Discovery',
      description: 'Comprehensive genomic sequencing reveals multiple variants of unknown significance',
      duration: '2 weeks',
      outcome: '50% variants remain VUS',
      status: 'uncertain' as const,
      icon: '🧬'
    },
    {
      title: 'Literature Review & Expert Consultation',
      description: 'Manual research across databases and specialist consultations to interpret variants',
      duration: '6 weeks',
      outcome: 'Limited actionable insights',
      status: 'uncertain' as const,
      icon: '📚'
    },
    {
      title: 'Family Studies & Functional Assays',
      description: 'Coordinate family member testing and expensive functional validation studies',
      duration: '12 weeks',
      outcome: 'Some variants classified',
      status: 'actionable' as const,
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Treatment Selection & Monitoring',
      description: 'Select therapy based on available evidence and monitor for resistance',
      duration: '8 weeks',
      outcome: 'Treatment initiated, resistance monitoring',
      status: 'optimized' as const,
      icon: '💊'
    }
  ],
  oracle: [
    {
      title: 'Genetic Testing & Instant Oracle Analysis',
      description: 'Genomic sequencing with immediate zero-shot variant interpretation',
      duration: '2 days',
      outcome: '73% variants resolved with confidence scores',
      status: 'actionable' as const,
      icon: '⚡'
    },
    {
      title: 'SAE-Powered Explainable Evidence',
      description: 'Mechanistic interpretability reveals biological features driving predictions',
      duration: '1 day',
      outcome: 'Explainable pathogenicity evidence',
      status: 'optimized' as const,
      icon: '🔍'
    },
    {
      title: 'Resistance Pathway Prediction',
      description: 'Predict likely tumor evolution paths and design preemptive combination therapies',
      duration: '3 days',
      outcome: 'Personalized resistance-aware treatment plan',
      status: 'optimized' as const,
      icon: '🎯'
    },
    {
      title: 'Personalized Immunotherapy Design',
      description: 'Generate patient-specific neoantigens and CAR-T designs with structural validation',
      duration: '1 week',
      outcome: 'Bespoke immunotherapy protocol',
      status: 'optimized' as const,
      icon: '🛡️'
    }
  ]
};

const ClinicalTransformation: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">
            Clinical Oncology Transformation
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            From VUS uncertainty to precision medicine: How Oracle revolutionizes clinical decision-making
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {oracleContent.about.evo2Context.map((badge, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Transformation Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <BusinessTransformation
            productName="Oracle"
            industryProblem={oracleContent.oncologyTransformation.industryProblem}
            valuePropositions={oracleContent.oncologyTransformation.valuePropositions}
            summary={oracleContent.oncologyTransformation.summary}
            components={{
              explainTrack: oracleContent.explain,
              guidedDesign: {
                objectives: [
                  { type: 'peak' as const, start: 20, end: 60, value: 1 },
                  { type: 'tf' as const, motif: 'CTCF', start: 80, end: 90, weight: 0.8 }
                ],
                scorer: 'enformer',
                beamWidth: 8,
                tokensPerBp: 4
              },
              sequencePeaks: {
                length: 200,
                peaks: [
                  { start: 20, end: 60, value: 1 },
                  { start: 80, end: 90, value: 0.8 }
                ],
                variantPos: 88
              }
            }}
          />
        </div>
      </section>

      {/* Clinical Workflow Enhancement */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <ClinicalWorkflow
            title="Patient Journey Transformation"
            subtitle="From months of uncertainty to actionable insights in days"
            traditional={clinicalWorkflowData.traditional}
            oracle={clinicalWorkflowData.oracle}
          />

          {/* RUNX1 Clinical Case Study */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-white">Clinical Case Study: RUNX1 Leukemia</h3>
              <p className="text-lg text-slate-300">
                Predicting tumor evolution and designing preemptive combination therapies
              </p>
            </div>

            <TwoHitDiagram steps={runx1Content.twoHit.steps} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RiskMap {...runx1Content.riskMap} />
              <Arsenal 
                input={runx1Content.arsenal.input}
                processTitle={runx1Content.arsenal.processTitle}
                outputs={[...runx1Content.arsenal.outputs]}
              />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Clinical Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-200">Traditional Approach</h5>
                  <ul className="text-sm text-red-300 space-y-1">
                    <li>• React to resistance after it develops</li>
                    <li>• Sequential monotherapy trials</li>
                    <li>• 6-month average response duration</li>
                    <li>• Limited treatment options</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-200">Oracle-Powered Approach</h5>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• Predict resistance 6 months early</li>
                    <li>• Preemptive combination therapy</li>
                    <li>• 12-month extended response duration</li>
                    <li>• Multi-modal therapeutic arsenal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Immunotherapy Personalization */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white text-center">Personalized Cancer Immunotherapy</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forgeContent.immunotherapy.presets.map((preset, i) => (
                <div key={i} className="p-6 bg-slate-800 border border-slate-700 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-3">{preset.name}</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    {Object.entries(preset.params).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                        <span className="font-mono text-xs text-slate-400">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/50 rounded-xl p-8">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-green-300">Immunotherapy Transformation Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-black text-green-400">65%</div>
                    <div className="text-green-300">Response rate</div>
                    <div className="text-xs text-green-400 mt-1">vs 25% standard protocols</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">4 weeks</div>
                    <div className="text-green-300">Design time</div>
                    <div className="text-xs text-green-400 mt-1">vs 12 months traditional</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">Individual</div>
                    <div className="text-green-300">Personalization</div>
                    <div className="text-xs text-green-400 mt-1">vs population-based</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">-60%</div>
                    <div className="text-green-300">Adverse events</div>
                    <div className="text-xs text-green-400 mt-1">Reduced toxicity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                  </div>
        </section>

        {/* Multi-Modal Clinical Capabilities */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-semibold text-white">Multi-Modal Clinical Capabilities</h2>
              <p className="text-lg text-slate-300 max-w-4xl mx-auto">
                See how Oracle's multi-modal predictions revolutionize clinical decision-making with patient-specific insights
              </p>
            </div>

            {/* Gene Essentiality for Tumor Selectivity */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'geneEssentiality',
                context: 'clinical',
                story: 'tumor-selectivity',
                data: {},
                props: { product: 'oracle' }
              } as ComponentConfig)}
            </div>

            {/* Protein Functional Change for Resistance Prediction */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'proteinFunctionalChange',
                context: 'clinical',
                story: 'resistance-prediction',
                data: {},
                props: { product: 'oracle' }
              } as ComponentConfig)}
            </div>

            {/* Chromatin Accessibility for Regulatory Variants */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'chromatinAccessibility',
                context: 'clinical',
                story: 'regulatory-variants',
                data: {},
                props: { product: 'oracle' }
              } as ComponentConfig)}
            </div>

            {/* Personalized Medicine */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'proteinFunctionalChange',
                context: 'clinical',
                story: 'personalized-medicine',
                data: {},
                props: { product: 'forge' }
              } as ComponentConfig)}
            </div>

            {/* Resistance Mechanisms Analysis */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'geneEssentiality',
                context: 'clinical',
                story: 'resistance-mechanisms',
                data: {},
                props: { product: 'oracle' }
              } as ComponentConfig)}
            </div>

            {/* Epigenetic Therapy Targeting */}
            <div className="space-y-8">
              {renderContextualComponent({
                type: 'chromatinAccessibility',
                context: 'clinical',
                story: 'epigenetic-therapy',
                data: {},
                props: { product: 'forge' }
              } as ComponentConfig)}
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-white">Ready to Transform Patient Care?</h2>
          <p className="text-lg text-slate-300">
            Join leading cancer centers using Oracle to resolve VUS uncertainty and improve patient outcomes by 40%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
              Request Clinical Demo
            </button>
            <button className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors">
              View Oracle Platform
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicalTransformation; 