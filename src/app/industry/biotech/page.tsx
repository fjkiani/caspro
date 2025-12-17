import { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Target, Zap, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ProblemSolutionSection, { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Biotech & Pharma R&D | CrisPRO',
    description: 'Transform drug development with AI-powered target validation and therapeutic design. From undruggable to validated in hours.',
  };
}

export default function BiotechPage() {
  // Problem content extracted from src2
  const problemContent: ProblemSolutionContent = {
    type: 'problem',
    title: 'Traditional Way: 90% Failure Crisis',
    description: 'Biotech R&D struggles with high failure rates, expensive validation, and unpredictable outcomes.',
    cards: [
      {
        title: '90% Clinical Trial Failure',
        description: 'Phase I-III combined failure rate. Most targets fail in preclinical validation, wasting $2.6B per approved drug.',
        icon: 'document',
        highlight: '90% failure'
      },
      {
        title: 'Expensive Target Validation',
        description: '$2.5M per target validation, taking 18 months. 85% of targets fail, creating massive waste.',
        icon: 'clock',
        highlight: '18 months'
      },
      {
        title: 'Random Target Selection',
        description: 'No systematic prioritization. Teams rely on limited functional data and intuition rather than prediction.',
        icon: 'search',
        highlight: 'Random selection'
      }
    ]
  };

  // Solution content extracted from src2
  const solutionContent: ProblemSolutionContent = {
    type: 'solution',
    title: 'In-Silico Way: Predictable Success',
    description: 'Oracle transforms biotech R&D with zero-shot target validation, precision therapeutic design, and systematic prioritization.',
    cards: [
      {
        title: '72x Faster Target Validation',
        description: '18 months → 1 week validation time. Multi-endpoint AI analysis replaces expensive wet-lab validation.',
        icon: 'zap',
        highlight: '72x faster'
      },
      {
        title: '99.8% Cost Reduction',
        description: '$2.5M → $3K per target. Variant impact + essentiality + protein function analysis replaces $2.5M validation.',
        icon: 'check',
        highlight: '99.8% reduction'
      },
      {
        title: '6x Success Rate Improvement',
        description: '15% → 90% validated targets. Systematic prediction replaces random selection with 90% success rate.',
        icon: 'infinity',
        highlight: '6x improvement'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section - Extracted from src2 */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <FlaskConical className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full mb-6">
            <span className="text-2xl">🧬</span>
            <span className="text-purple-700 font-medium">Biotech R&D</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
            From 90% Failure to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Predictable Success
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transform biotech R&D with <strong>Discriminative AI</strong>. Validate targets, design therapeutics, and predict outcomes 
            using Oracle's 5 core endpoints—eliminating guesswork and accelerating discovery.
          </p>

          {/* Key Transformation Metrics Preview - Extracted from src2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">72x</div>
              <div className="text-purple-700 font-medium text-sm">Target Validation</div>
              <div className="text-xs text-slate-500 mt-1">18 months → 1 week</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">99.8%</div>
              <div className="text-purple-700 font-medium text-sm">Cost Reduction</div>
              <div className="text-xs text-slate-500 mt-1">$2.5M → $3K per target</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">6x</div>
              <div className="text-purple-700 font-medium text-sm">Success Rate</div>
              <div className="text-xs text-slate-500 mt-1">15% → 90% validated</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">88%</div>
              <div className="text-purple-700 font-medium text-sm">False Discovery</div>
              <div className="text-xs text-slate-500 mt-1">85% → 10% reduction</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/products/r-d"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Explore R&D Platform →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold px-8 py-4 rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </section>

        {/* Problem/Solution Comparison */}
        <ProblemSolutionSection content={problemContent} />
        <ProblemSolutionSection content={solutionContent} />

        {/* Research Case Study: RUNX1 Discovery Pipeline - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Research Case Study: RUNX1 Discovery Pipeline
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From variant discovery to therapeutic design: Complete biotech research transformation
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Drug Discovery */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Traditional Drug Discovery
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Variant Characterization', desc: '18 months to characterize variants and understand functional impact' },
                    { title: 'Random Target Selection', desc: 'No systematic prioritization, leading to poor target choices' },
                    { title: 'High Design Failure Rate', desc: '85% of designs fail in preclinical validation' },
                    { title: 'Expensive Candidates', desc: '$8M per successful candidate after accounting for failures' }
                  ].map((item, i) => (
                    <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="font-semibold text-red-700 mb-2">{item.title}</div>
                      <div className="text-sm text-red-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oracle-Powered Discovery */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Oracle-Powered Discovery
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Rapid Pipeline', desc: '2 weeks variant-to-target pipeline with AI-powered analysis' },
                    { title: 'Systematic Prioritization', desc: 'Target prioritization based on essentiality and functional impact' },
                    { title: 'High Success Prediction', desc: '90% design success prediction before wet-lab validation' },
                    { title: 'Cost-Effective Portfolio', desc: '$300K per validated portfolio with multiple candidate families' }
                  ].map((item, i) => (
                    <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="font-semibold text-green-700 mb-2">{item.title}</div>
                      <div className="text-sm text-green-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Research Pipeline Metrics */}
            <div className="mt-8 pt-8 border-t border-purple-300">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-purple-700">Complete Research Transformation</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { value: '36x', label: 'Faster Discovery', desc: '18 months → 2 weeks' },
                    { value: '96%', label: 'Cost Reduction', desc: '$8M → $300K per program' },
                    { value: '90%', label: 'Success Prediction', desc: 'vs 15% random chance' },
                    { value: '10x', label: 'Portfolio Diversity', desc: 'Multiple families per target' }
                  ].map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-black text-purple-600 mb-2">{metric.value}</div>
                      <div className="text-purple-700 font-medium mb-1">{metric.label}</div>
                      <div className="text-xs text-slate-600">{metric.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Modal Biological Capabilities - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Multi-Modal Biological Capabilities
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how Oracle's multi-modal predictions transform biotech R&D workflows with context-specific insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Gene Essentiality for Target Prioritization',
                description: 'Context-dependent essentiality scoring to identify targets with optimal therapeutic windows',
                metrics: '0.82-0.99 AUROC Range',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Zap,
                title: 'Protein Function for Drug Design',
                description: 'Predict how variants affect protein stability, binding, and function for structure-based drug design',
                metrics: 'Strong DMS Correlation',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: FlaskConical,
                title: 'CRISPR Efficacy for Therapeutic Design',
                description: 'Predict guide RNA cutting efficiency and specificity for precision gene editing therapeutics',
                metrics: '92% Efficacy Prediction',
                color: 'from-rose-500 to-rose-600'
              },
              {
                icon: TrendingUp,
                title: 'Chromatin Accessibility for Enhancer Design',
                description: 'Predict regulatory element accessibility and TF binding for enhancer-based therapeutics',
                metrics: 'SAE TF Motif Features',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Target,
                title: 'Variant Impact for Target Validation',
                description: 'Zero-shot pathogenicity prediction for oncogene/tumor suppressor validation',
                metrics: '95.7% ClinVar AUROC',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Zap,
                title: 'Safety Profiling',
                description: 'Essentiality analysis for off-target effects and safety assessment',
                metrics: '20x Therapeutic Window',
                color: 'from-pink-500 to-pink-600'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                <div className="text-xs font-semibold text-purple-600">{item.metrics}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Impact */}
        <section className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Business Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Cost Reduction', value: '99.8%', description: '$2.5M → $3K per target' },
              { label: 'Time Acceleration', value: '72x', description: '18 months → 1 week' },
              { label: 'Success Rate', value: '6x', description: '15% → 90% validation' },
            ].map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{metric.label}</div>
                <div className="text-sm text-slate-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Pipeline?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading biotech and pharma companies using CrisPRO to de-risk drug development and accelerate discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/products/r-d"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Explore R&D Platform
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
