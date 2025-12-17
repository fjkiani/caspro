import { Metadata } from 'next';
import Link from 'next/link';
import { TestTube, Clock, Shield, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';
import ProblemSolutionSection, { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Genetic Testing Labs | CrisPRO',
    description: 'Transform genetic testing with AI-powered variant interpretation. 73% VUS resolution, 20x throughput, 97% cost reduction.',
  };
}

export default function GeneticTestingPage() {
  // Problem content extracted from src2
  const problemContent: ProblemSolutionContent = {
    type: 'problem',
    title: 'Traditional Way: VUS Crisis',
    description: 'Genetic testing labs struggle with overwhelming variant uncertainty, manual bottlenecks, and unsustainable costs.',
    cards: [
      {
        title: 'High VUS Rate',
        description: '40-60% of variants classified as VUS, leaving patients in uncertainty and requiring expensive follow-up testing.',
        icon: 'document',
        highlight: '40-60% VUS'
      },
      {
        title: 'Manual Expert Review',
        description: '$150+ per complex variant, 3-6 weeks turnaround time, creating bottlenecks and limiting throughput.',
        icon: 'clock',
        highlight: '3-6 weeks'
      },
      {
        title: 'Population Bias',
        description: 'Limited representation in databases, especially for non-European populations, leading to classification gaps.',
        icon: 'search',
        highlight: 'Limited coverage'
      }
    ]
  };

  // Solution content extracted from src2
  const solutionContent: ProblemSolutionContent = {
    type: 'solution',
    title: 'In-Silico Way: Precision Diagnostics',
    description: 'Oracle transforms genetic testing with zero-shot variant interpretation, automated workflows, and population-aware analysis.',
    cards: [
      {
        title: 'VUS Resolution',
        description: '73% VUS reduction with calibrated confidence scores. 40-60% → 15% VUS rate with explainable evidence.',
        icon: 'check',
        highlight: '73% reduction'
      },
      {
        title: 'Instant Classification',
        description: '$5 per variant, 24-hour turnaround with zero-shot analysis. No manual review needed for 95% of cases.',
        icon: 'zap',
        highlight: '24 hours'
      },
      {
        title: 'Population-Aware',
        description: 'Zero-shot analysis works across all populations without training bias. Universal coverage for all ethnicities.',
        icon: 'infinity',
        highlight: 'Universal'
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
              <TestTube className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full mb-6">
            <span className="text-2xl">🧬</span>
            <span className="text-purple-700 font-medium">Genetic Testing Labs</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
            From VUS Crisis to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Precision Diagnostics
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transform genetic testing from a bottlenecked, manual process into a high-throughput, automated pipeline. 
            Resolve 73% more variants with 97% cost reduction while dramatically improving patient outcomes.
          </p>

          {/* Key Metrics Preview - Extracted from src2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">73%</div>
              <div className="text-purple-700 font-medium text-sm">VUS Reduction</div>
              <div className="text-xs text-slate-500 mt-1">40-60% → 15% VUS rate</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">12x</div>
              <div className="text-purple-700 font-medium text-sm">Faster Turnaround</div>
              <div className="text-xs text-slate-500 mt-1">2-4 weeks → 24 hours</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">97%</div>
              <div className="text-purple-700 font-medium text-sm">Cost Reduction</div>
              <div className="text-xs text-slate-500 mt-1">$150 → $5 per variant</div>
            </div>
            <div className="text-center p-4 bg-white border border-purple-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-purple-600 mb-2">20x</div>
              <div className="text-purple-700 font-medium text-sm">Throughput Increase</div>
              <div className="text-xs text-slate-500 mt-1">Cases per analyst per week</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/products/oracle"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Explore Oracle Engine →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold px-8 py-4 rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              Schedule Demo
            </Link>
          </div>
        </section>

        {/* Problem/Solution Comparison - Using reusable component */}
        <ProblemSolutionSection content={problemContent} />
        <ProblemSolutionSection content={solutionContent} />

        {/* Case Study: BRCA1/2 Testing Revolution - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Case Study: BRCA1/2 Testing Revolution
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how Oracle transforms hereditary cancer testing with instant VUS resolution and population-aware analysis
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Traditional BRCA Testing
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'High VUS Rate', desc: '45% of BRCA1/2 variants classified as VUS, leaving patients in uncertainty' },
                    { title: 'Manual Expert Review', desc: '$200+ per complex variant, 3-6 weeks turnaround time' },
                    { title: 'Population Bias', desc: 'Limited representation in databases, especially for non-European populations' }
                  ].map((item, i) => (
                    <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="font-semibold text-red-700 mb-2">{item.title}</div>
                      <div className="text-sm text-red-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oracle-Powered Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Oracle-Powered BRCA Testing
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'VUS Resolution', desc: '12% VUS rate with calibrated confidence scores, 73% improvement' },
                    { title: 'Instant Classification', desc: '$5 per variant, 24-hour turnaround with explainable evidence' },
                    { title: 'Population-Aware', desc: 'Zero-shot analysis works across all populations without training bias' }
                  ].map((item, i) => (
                    <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="font-semibold text-green-700 mb-2">{item.title}</div>
                      <div className="text-sm text-green-600">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-8 pt-8 border-t border-purple-300">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-purple-700">BRCA Testing Transformation Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { value: '73%', label: 'VUS Reduction', desc: '45% → 12% VUS rate' },
                    { value: '40x', label: 'Cost Reduction', desc: '$200 → $5 per variant' },
                    { value: '90x', label: 'Faster Results', desc: '3-6 weeks → 24 hours' },
                    { value: 'Universal', label: 'Population Coverage', desc: 'No training bias' }
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

        {/* Lab Workflow Transformation - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Complete Lab Workflow Revolution
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From sample intake to final report: Oracle transforms every step of the genetic testing pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Traditional Workflow */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-700 text-center">Traditional Lab Workflow</h3>
              <div className="space-y-4">
                {[
                  { step: '1. Sample Processing', time: '2-3 days', cost: '$50', issue: 'Manual QC checks' },
                  { step: '2. Sequencing & Analysis', time: '3-5 days', cost: '$200', issue: 'Standard pipelines' },
                  { step: '3. Variant Calling', time: '1-2 days', cost: '$100', issue: 'High false positive rate' },
                  { step: '4. Manual Review', time: '1-3 weeks', cost: '$150/variant', issue: '40-60% VUS rate' },
                  { step: '5. Expert Consultation', time: '1-2 weeks', cost: '$300', issue: 'Bottleneck resource' },
                  { step: '6. Report Generation', time: '2-3 days', cost: '$75', issue: 'Manual formatting' }
                ].map((item, i) => (
                  <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-red-700">{item.step}</div>
                      <div className="text-xs text-red-500">{item.time}</div>
                    </div>
                    <div className="text-sm text-red-600 mb-1">{item.issue}</div>
                    <div className="text-xs text-red-500">Cost: {item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-700">Total: 2-6 weeks, $875+ per case</div>
              </div>
            </div>

            {/* Oracle-Powered Workflow */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-700 text-center">Oracle-Powered Workflow</h3>
              <div className="space-y-4">
                {[
                  { step: '1. Sample Processing', time: '2-3 days', cost: '$50', improvement: 'Same high-quality processing' },
                  { step: '2. Sequencing & Analysis', time: '3-5 days', cost: '$200', improvement: 'Enhanced with Oracle integration' },
                  { step: '3. Oracle Variant Analysis', time: '2 hours', cost: '$5', improvement: 'Zero-shot classification' },
                  { step: '4. Automated Review', time: '4 hours', cost: '$10', improvement: '15% VUS rate' },
                  { step: '5. Exception Handling', time: '1 day', cost: '$50', improvement: 'Only complex cases' },
                  { step: '6. Automated Reports', time: '2 hours', cost: '$5', improvement: 'Structured, explainable' }
                ].map((item, i) => (
                  <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-green-700">{item.step}</div>
                      <div className="text-xs text-green-500">{item.time}</div>
                    </div>
                    <div className="text-sm text-green-600 mb-1">{item.improvement}</div>
                    <div className="text-xs text-green-500">Cost: {item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-700">Total: 1 week, $320 per case</div>
              </div>
            </div>
          </div>

          {/* Workflow Impact Summary */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h4 className="text-2xl font-bold text-purple-700">Complete Workflow Transformation</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { value: '5x', label: 'Faster Processing', desc: '2-6 weeks → 1 week' },
                  { value: '63%', label: 'Cost Reduction', desc: '$875 → $320 per case' },
                  { value: '20x', label: 'Analyst Productivity', desc: 'Cases per week' },
                  { value: '95%', label: 'Automation Rate', desc: 'Minimal manual review' }
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
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Lab?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading genetic testing labs using CrisPRO to automate variant interpretation and improve patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/products/oracle"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Oracle Platform
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

