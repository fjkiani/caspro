import React from 'react';
import { BusinessTransformation } from '../components/site/blocks';
import { renderContextualComponent } from '../utils/componentRenderer';
import { oracleContent } from '../data/oracleContent';

const GeneticTestingTransformation: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-full">
              <span className="text-2xl">🧬</span>
              <span className="text-purple-300 font-medium">Genetic Testing Labs</span>
            </div>
            <h1 className="text-5xl font-bold text-white">
              From VUS Crisis to 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Precision Diagnostics</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Transform genetic testing from a bottlenecked, manual process into a high-throughput, automated pipeline. 
              Resolve 73% more variants with 97% cost reduction while dramatically improving patient outcomes.
            </p>
          </div>
          
          {/* Key Metrics Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">73%</div>
              <div className="text-purple-300">VUS Reduction</div>
              <div className="text-xs text-slate-400 mt-1">40-60% → 15% VUS rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">12x</div>
              <div className="text-purple-300">Faster Turnaround</div>
              <div className="text-xs text-slate-400 mt-1">2-4 weeks → 24 hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">97%</div>
              <div className="text-purple-300">Cost Reduction</div>
              <div className="text-xs text-slate-400 mt-1">$150 → $5 per variant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">20x</div>
              <div className="text-purple-300">Throughput Increase</div>
              <div className="text-xs text-slate-400 mt-1">Cases per analyst per week</div>
            </div>
          </div>
        </section>

        {/* Business Transformation */}
        <BusinessTransformation
          productName="Oracle"
          industryProblem={oracleContent.geneticTestingTransformation.industryProblem}
          valuePropositions={oracleContent.geneticTestingTransformation.valuePropositions}
          summary={oracleContent.geneticTestingTransformation.summary}
        />

        {/* Multi-Modal Genetic Testing Capabilities */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Multi-Modal Genetic Testing Capabilities</h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              See how Oracle's multi-modal analysis transforms every aspect of genetic testing, 
              from variant classification to assay design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* VUS Resolution */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-3xl mx-auto">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white">VUS Resolution</h3>
                <p className="text-slate-300 text-sm">
                  Zero-shot variant classification with calibrated confidence scores
                </p>
              </div>
              {renderContextualComponent({
                type: 'geneEssentiality',
                context: 'clinical',
                story: 'variant-classification',
                data: {},
                props: { product: 'oracle' }
              })}
            </div>

            {/* Complex Loci Analysis */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-3xl mx-auto">
                  🧩
                </div>
                <h3 className="text-xl font-bold text-white">Complex Loci Processing</h3>
                <p className="text-slate-300 text-sm">
                  Handle challenging genomic regions with 1M-token context windows
                </p>
              </div>
              {renderContextualComponent({
                type: 'proteinFunctionalChange',
                context: 'clinical',
                story: 'complex-loci-analysis',
                data: {},
                props: { product: 'oracle' }
              })}
            </div>

            {/* Assay Design */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-3xl mx-auto">
                  ⚗️
                </div>
                <h3 className="text-xl font-bold text-white">Quality Control Design</h3>
                <p className="text-slate-300 text-sm">
                  AI-designed synthetic controls with population-aware optimization
                </p>
              </div>
              {renderContextualComponent({
                type: 'chromatinAccessibility',
                context: 'clinical',
                story: 'assay-design',
                data: {},
                props: { product: 'forge' }
              })}
            </div>
          </div>
        </section>

        {/* Case Study: BRCA1/2 Testing Revolution */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Case Study: BRCA1/2 Testing Revolution</h2>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto">
              See how Oracle transforms hereditary cancer testing with instant VUS resolution and population-aware analysis
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-300">Traditional BRCA Testing</h3>
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                    <div className="font-semibold text-red-300 mb-2">High VUS Rate</div>
                    <div className="text-sm text-red-200">
                      45% of BRCA1/2 variants classified as VUS, leaving patients in uncertainty
                    </div>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                    <div className="font-semibold text-red-300 mb-2">Manual Expert Review</div>
                    <div className="text-sm text-red-200">
                      $200+ per complex variant, 3-6 weeks turnaround time
                    </div>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                    <div className="font-semibold text-red-300 mb-2">Population Bias</div>
                    <div className="text-sm text-red-200">
                      Limited representation in databases, especially for non-European populations
                    </div>
                  </div>
                </div>
              </div>

              {/* Oracle-Powered Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-300">Oracle-Powered BRCA Testing</h3>
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="font-semibold text-green-300 mb-2">VUS Resolution</div>
                    <div className="text-sm text-green-200">
                      12% VUS rate with calibrated confidence scores, 73% improvement
                    </div>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="font-semibold text-green-300 mb-2">Instant Classification</div>
                    <div className="text-sm text-green-200">
                      $5 per variant, 24-hour turnaround with explainable evidence
                    </div>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="font-semibold text-green-300 mb-2">Population-Aware</div>
                    <div className="text-sm text-green-200">
                      Zero-shot analysis works across all populations without training bias
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-8 pt-8 border-t border-purple-700/50">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-purple-300">BRCA Testing Transformation Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-2xl font-black text-purple-400">73%</div>
                    <div className="text-purple-300">VUS Reduction</div>
                    <div className="text-xs text-purple-400 mt-1">45% → 12% VUS rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-purple-400">40x</div>
                    <div className="text-purple-300">Cost Reduction</div>
                    <div className="text-xs text-purple-400 mt-1">$200 → $5 per variant</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-purple-400">90x</div>
                    <div className="text-purple-300">Faster Results</div>
                    <div className="text-xs text-purple-400 mt-1">3-6 weeks → 24 hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-purple-400">Universal</div>
                    <div className="text-purple-300">Population Coverage</div>
                    <div className="text-xs text-purple-400 mt-1">No training bias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Workflow Transformation */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-white">Complete Lab Workflow Revolution</h2>
            <p className="text-lg text-slate-300 max-w-4xl mx-auto">
              From sample intake to final report: Oracle transforms every step of the genetic testing pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Traditional Workflow */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-300 text-center">Traditional Lab Workflow</h3>
              <div className="space-y-4">
                {[
                  { step: '1. Sample Processing', time: '2-3 days', cost: '$50', issue: 'Manual QC checks' },
                  { step: '2. Sequencing & Analysis', time: '3-5 days', cost: '$200', issue: 'Standard pipelines' },
                  { step: '3. Variant Calling', time: '1-2 days', cost: '$100', issue: 'High false positive rate' },
                  { step: '4. Manual Review', time: '1-3 weeks', cost: '$150/variant', issue: '40-60% VUS rate' },
                  { step: '5. Expert Consultation', time: '1-2 weeks', cost: '$300', issue: 'Bottleneck resource' },
                  { step: '6. Report Generation', time: '2-3 days', cost: '$75', issue: 'Manual formatting' }
                ].map((item, i) => (
                  <div key={i} className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-red-300">{item.step}</div>
                      <div className="text-xs text-red-400">{item.time}</div>
                    </div>
                    <div className="text-sm text-red-200 mb-1">{item.issue}</div>
                    <div className="text-xs text-red-400">Cost: {item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-300">Total: 2-6 weeks, $875+ per case</div>
              </div>
            </div>

            {/* Oracle-Powered Workflow */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-300 text-center">Oracle-Powered Workflow</h3>
              <div className="space-y-4">
                {[
                  { step: '1. Sample Processing', time: '2-3 days', cost: '$50', improvement: 'Same high-quality processing' },
                  { step: '2. Sequencing & Analysis', time: '3-5 days', cost: '$200', improvement: 'Enhanced with Oracle integration' },
                  { step: '3. Oracle Variant Analysis', time: '2 hours', cost: '$5', improvement: 'Zero-shot classification' },
                  { step: '4. Automated Review', time: '4 hours', cost: '$10', improvement: '15% VUS rate' },
                  { step: '5. Exception Handling', time: '1 day', cost: '$50', improvement: 'Only complex cases' },
                  { step: '6. Automated Reports', time: '2 hours', cost: '$5', improvement: 'Structured, explainable' }
                ].map((item, i) => (
                  <div key={i} className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-green-300">{item.step}</div>
                      <div className="text-xs text-green-400">{item.time}</div>
                    </div>
                    <div className="text-sm text-green-200 mb-1">{item.improvement}</div>
                    <div className="text-xs text-green-400">Cost: {item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-300">Total: 1 week, $320 per case</div>
              </div>
            </div>
          </div>

          {/* Workflow Impact Summary */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h4 className="text-2xl font-bold text-purple-300">Complete Workflow Transformation</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-black text-purple-400">5x</div>
                  <div className="text-purple-300">Faster Processing</div>
                  <div className="text-xs text-purple-400 mt-1">2-6 weeks → 1 week</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-purple-400">63%</div>
                  <div className="text-purple-300">Cost Reduction</div>
                  <div className="text-xs text-purple-400 mt-1">$875 → $320 per case</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-purple-400">20x</div>
                  <div className="text-purple-300">Analyst Productivity</div>
                  <div className="text-xs text-purple-400 mt-1">Cases per week</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-purple-400">95%</div>
                  <div className="text-purple-300">Automation Rate</div>
                  <div className="text-xs text-purple-400 mt-1">Minimal manual review</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Lab?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join the genetic testing revolution. Reduce VUS rates, accelerate turnaround times, 
              and improve patient outcomes with Oracle's zero-shot variant interpretation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/site/oracle" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors text-lg"
            >
              Explore Oracle Platform
              <span className="text-xl">→</span>
            </a>
            <a 
              href="/site/biotech-transformation" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-lg"
            >
              See Biotech Transformation
              <span className="text-xl">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GeneticTestingTransformation; 