import React from 'react';
import { BusinessTransformation, VisualCapabilityGrid } from '../components/site/blocks';
import { TwoHitDiagram, RiskMap, Arsenal } from '../components/site/runx1';
import { renderContextualComponent } from '../utils/componentRenderer';
import { oracleContent } from '../data/oracleContent';
import { runx1Content } from '../data/runx1Content';
import { biotechDiscriminativeCapabilities, biotechTransformationMetrics } from '../data/biotechDiscriminativeContent';
import { useAccessibility } from '../contexts/AccessibilityContext';
import type { ComponentConfig } from '../types/transformation';

const transformationComponents = {
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
};

const BiotechTransformation: React.FC = () => {
  const { getTextSize } = useAccessibility();
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Enhanced Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-900/30 border border-cyan-700/50 rounded-full">
            <span className="text-2xl">🧬</span>
            <span className="text-cyan-300 font-medium">Biotech R&D</span>
          </div>
          
          <h1 className={`font-bold text-white ${getTextSize('text-5xl')}`}>
            From 90% Failure to 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Predictable Success</span>
          </h1>
          
          <p className={`text-slate-300 max-w-4xl mx-auto leading-relaxed ${getTextSize('text-xl')}`}>
            Transform biotech R&D with <strong>Discriminative AI</strong>. Validate targets, design therapeutics, and predict outcomes 
            using Oracle's 5 core endpoints—eliminating guesswork and accelerating discovery.
          </p>
          
          {/* Key Transformation Metrics Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
              <div className={`font-bold text-cyan-400 ${getTextSize('text-2xl')}`}>
                72x
              </div>
              <div className={`text-slate-300 font-medium ${getTextSize('text-sm')}`}>
                Target Validation
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                18 months → 1 week
              </div>
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
              <div className={`font-bold text-green-400 ${getTextSize('text-2xl')}`}>
                99.8%
              </div>
              <div className={`text-slate-300 font-medium ${getTextSize('text-sm')}`}>
                Cost Reduction
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                $2.5M → $3K per target
              </div>
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
              <div className={`font-bold text-purple-400 ${getTextSize('text-2xl')}`}>
                6x
              </div>
              <div className={`text-slate-300 font-medium ${getTextSize('text-sm')}`}>
                Success Rate
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                15% → 90% validated
              </div>
            </div>
            
            <div className="text-center p-4 bg-slate-800/50 border border-slate-600 rounded-xl">
              <div className={`font-bold text-orange-400 ${getTextSize('text-2xl')}`}>
                88%
              </div>
              <div className={`text-slate-300 font-medium ${getTextSize('text-sm')}`}>
                False Discovery
              </div>
              <div className={`text-slate-400 ${getTextSize('text-xs')}`}>
                85% → 10% reduction
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {oracleContent.about.evo2Context.map((badge, i) => (
              <span key={i} className={`px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 ${getTextSize('text-sm')}`}>
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
            industryProblem={oracleContent.transformation.industryProblem}
            valuePropositions={oracleContent.transformation.valuePropositions}
            summary={oracleContent.transformation.summary}
            components={transformationComponents}
          />
        </div>
      </section>

      {/* RUNX1 Research Case Study */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Research Case Study: RUNX1 Discovery Pipeline</h2>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto">
              From variant discovery to therapeutic design: Complete biotech research transformation
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
            <h4 className="text-lg font-semibold text-white mb-4">Biotech Research Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="font-medium text-slate-200">Traditional Drug Discovery</h5>
                <ul className="text-sm text-red-300 space-y-1">
                  <li>• 18 months variant characterization</li>
                  <li>• Random target selection</li>
                  <li>• 85% design failure rate</li>
                  <li>• $8M per successful candidate</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="font-medium text-slate-200">Oracle-Powered Discovery</h5>
                <ul className="text-sm text-green-300 space-y-1">
                  <li>• 2 weeks variant-to-target pipeline</li>
                  <li>• Systematic target prioritization</li>
                  <li>• 90% design success prediction</li>
                  <li>• $300K per validated portfolio</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Pipeline Metrics */}
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-700/50 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h4 className="text-xl font-bold text-blue-300">Complete Research Transformation</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-black text-blue-400">36x</div>
                  <div className="text-blue-300">Faster discovery</div>
                  <div className="text-xs text-blue-400 mt-1">18 months → 2 weeks</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">96%</div>
                  <div className="text-blue-300">Cost reduction</div>
                  <div className="text-xs text-blue-400 mt-1">$8M → $300K per program</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">90%</div>
                  <div className="text-blue-300">Success prediction</div>
                  <div className="text-xs text-blue-400 mt-1">vs 15% random chance</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">10x</div>
                  <div className="text-blue-300">Portfolio diversity</div>
                  <div className="text-xs text-blue-400 mt-1">Multiple families per target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Modal Biological Capabilities */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Multi-Modal Biological Capabilities</h2>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto">
              See how Oracle's multi-modal predictions transform biotech R&D workflows with context-specific insights
            </p>
          </div>

          {/* Gene Essentiality for Target Prioritization */}
          <div className="space-y-8">
            {renderContextualComponent({
              type: 'geneEssentiality',
              context: 'biotech',
              story: 'target-prioritization',
              data: {},
              props: { product: 'oracle' }
            } as ComponentConfig)}
          </div>

          {/* Protein Functional Change for Therapeutic Optimization */}
          <div className="space-y-8">
            {renderContextualComponent({
              type: 'proteinFunctionalChange',
              context: 'biotech',
              story: 'therapeutic-optimization',
              data: {},
              props: { product: 'forge' }
            } as ComponentConfig)}
          </div>

          {/* Chromatin Accessibility for Enhancer Design */}
          <div className="space-y-8">
            {renderContextualComponent({
              type: 'chromatinAccessibility',
              context: 'biotech',
              story: 'enhancer-design',
              data: {},
              props: { product: 'forge' }
            } as ComponentConfig)}
          </div>

          {/* Safety Profiling */}
          <div className="space-y-8">
            {renderContextualComponent({
              type: 'geneEssentiality',
              context: 'biotech',
              story: 'safety-profiling',
              data: {},
              props: { product: 'oracle' }
            } as ComponentConfig)}
          </div>
        </div>
      </section>

      {/* Discriminative AI Arsenal Enhancement */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className={`font-bold text-white ${getTextSize('text-4xl')}`}>
              🎯 Complete Discriminative AI Arsenal
            </h2>
            <p className={`text-slate-300 max-w-4xl mx-auto leading-relaxed ${getTextSize('text-lg')}`}>
              Five core AI endpoints that power every biotech transformation. Each capability includes live demos 
              showing real biotech R&D applications with factual performance metrics.
            </p>
          </div>
          
          <VisualCapabilityGrid
            capabilities={biotechDiscriminativeCapabilities}
            title=""
            subtitle=""
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-white">Ready to Transform Your R&D Pipeline?</h2>
          <p className="text-lg text-slate-300">
            Join leading biotechs using Oracle to accelerate discovery and reduce development costs by 96%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
              Request Demo
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

export default BiotechTransformation; 