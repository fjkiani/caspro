import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Users, Shield, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import ProblemSolutionSection, { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Healthcare & Clinical Oncology | CrisPRO',
    description: 'Transform clinical oncology with AI-powered precision medicine. From VUS to validated care plans in minutes.',
  };
}

export default function HealthcarePage() {
  // Problem content extracted from src2
  const problemContent: ProblemSolutionContent = {
    type: 'problem',
    title: 'Traditional Way: VUS Uncertainty Crisis',
    description: 'Clinical oncology struggles with variant uncertainty, delayed decisions, and suboptimal patient outcomes.',
    cards: [
      {
        title: '40% VUS Rate',
        description: 'Half of all genetic variants remain unactionable, forcing clinicians to make treatment decisions without clear evidence.',
        icon: 'document',
        highlight: '40% VUS'
      },
      {
        title: '18-Month Treatment Selection',
        description: 'From diagnosis to optimal therapy takes 18 months. Patients suffer while doctors navigate uncertainty.',
        icon: 'clock',
        highlight: '18 months'
      },
      {
        title: '$150K Per Patient Workup',
        description: 'Expensive workups including failed approaches. Limited tools for precision medicine decision-making.',
        icon: 'search',
        highlight: '$150K cost'
      }
    ]
  };

  // Solution content extracted from src2
  const solutionContent: ProblemSolutionContent = {
    type: 'solution',
    title: 'In-Silico Way: Precision Medicine',
    description: 'Oracle transforms clinical oncology with instant VUS resolution, resistance prediction, and personalized immunotherapy design.',
    cards: [
      {
        title: '73% VUS Resolution',
        description: 'Transform uncertain variants into actionable clinical decisions with calibrated pathogenicity scores and explainable evidence.',
        icon: 'check',
        highlight: '73% resolved'
      },
      {
        title: '12x Faster Decisions',
        description: '18 months → 6 weeks treatment selection. Instant Oracle analysis replaces manual literature review and family studies.',
        icon: 'zap',
        highlight: '12x faster'
      },
      {
        title: '40% Better Outcomes',
        description: 'Improved patient response rates through precision selection. Resistance prediction 6 months early enables preemptive therapy.',
        icon: 'infinity',
        highlight: '+40% outcomes'
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section - Extracted from src2 */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            Clinical Oncology Transformation
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            From VUS uncertainty to precision medicine: How Oracle revolutionizes clinical decision-making with instant variant interpretation and personalized therapy design.
          </p>

          {/* Key Metrics Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <div className="text-center p-4 bg-white border border-blue-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">73%</div>
              <div className="text-blue-700 font-medium text-sm">VUS Resolved</div>
              <div className="text-xs text-slate-500 mt-1">Previously uncertain</div>
            </div>
            <div className="text-center p-4 bg-white border border-blue-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">12x</div>
              <div className="text-blue-700 font-medium text-sm">Faster Decisions</div>
              <div className="text-xs text-slate-500 mt-1">18 months → 6 weeks</div>
            </div>
            <div className="text-center p-4 bg-white border border-blue-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">6 months</div>
              <div className="text-blue-700 font-medium text-sm">Early Resistance</div>
              <div className="text-xs text-slate-500 mt-1">Prediction advantage</div>
            </div>
            <div className="text-center p-4 bg-white border border-blue-200 rounded-xl shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">+40%</div>
              <div className="text-blue-700 font-medium text-sm">Better Outcomes</div>
              <div className="text-xs text-slate-500 mt-1">Improved response rates</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/products/oncology"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Explore Oncology Platform →
            </Link>
            <Link
              href="/comparisons/patient"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold px-8 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              See Patient Scenarios
            </Link>
          </div>
        </section>

        {/* Problem/Solution Comparison */}
        <ProblemSolutionSection content={problemContent} />
        <ProblemSolutionSection content={solutionContent} />

        {/* Patient Journey Transformation - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Patient Journey Transformation
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From months of uncertainty to actionable insights in days
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Traditional Approach */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Traditional Approach
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1. Genetic Testing & Variant Discovery', time: '2 weeks', outcome: '50% variants remain VUS', icon: '🧬' },
                  { step: '2. Literature Review & Expert Consultation', time: '6 weeks', outcome: 'Limited actionable insights', icon: '📚' },
                  { step: '3. Family Studies & Functional Assays', time: '12 weeks', outcome: 'Some variants classified', icon: '👨‍👩‍👧‍👦' },
                  { step: '4. Treatment Selection & Monitoring', time: '8 weeks', outcome: 'Treatment initiated, resistance monitoring', icon: '💊' }
                ].map((item, i) => (
                  <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-red-700 mb-1">{item.step}</div>
                        <div className="text-sm text-red-600 mb-1">{item.outcome}</div>
                        <div className="text-xs text-red-500">{item.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-red-700">Total: 28 weeks (7 months)</div>
              </div>
            </div>

            {/* Oracle-Powered Approach */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Oracle-Powered Approach
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1. Genetic Testing & Instant Oracle Analysis', time: '2 days', outcome: '73% variants resolved with confidence scores', icon: '⚡' },
                  { step: '2. SAE-Powered Explainable Evidence', time: '1 day', outcome: 'Explainable pathogenicity evidence', icon: '🔍' },
                  { step: '3. Resistance Pathway Prediction', time: '3 days', outcome: 'Personalized resistance-aware treatment plan', icon: '🎯' },
                  { step: '4. Personalized Immunotherapy Design', time: '1 week', outcome: 'Bespoke immunotherapy protocol', icon: '🛡️' }
                ].map((item, i) => (
                  <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-700 mb-1">{item.step}</div>
                        <div className="text-sm text-green-600 mb-1">{item.outcome}</div>
                        <div className="text-xs text-green-500">{item.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-green-700">Total: 1.5 weeks</div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Case Study: RUNX1 Leukemia - Extracted from src2 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Clinical Case Study: RUNX1 Leukemia
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Predicting tumor evolution and designing preemptive combination therapies
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traditional Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-700">Traditional Approach</h3>
                <div className="space-y-3">
                  {[
                    'React to resistance after it develops',
                    'Sequential monotherapy trials',
                    '6-month average response duration',
                    'Limited treatment options'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-red-700">
                      <span className="text-red-500">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oracle-Powered Approach */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-700">Oracle-Powered Approach</h3>
                <div className="space-y-3">
                  {[
                    'Predict resistance 6 months early',
                    'Preemptive combination therapy',
                    '12-month extended response duration',
                    'Multi-modal therapeutic arsenal'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-green-700">
                      <span className="text-green-500">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Impact Metrics */}
            <div className="mt-8 pt-8 border-t border-blue-300">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-blue-700">Clinical Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { value: '73%', label: 'VUS Resolution', desc: 'Previously uncertain variants' },
                    { value: '12x', label: 'Faster Decisions', desc: '18 months → 6 weeks' },
                    { value: '6 months', label: 'Early Resistance', desc: 'Prediction advantage' },
                    { value: '+40%', label: 'Better Outcomes', desc: 'Improved response rates' }
                  ].map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-black text-blue-600 mb-2">{metric.value}</div>
                      <div className="text-blue-700 font-medium mb-1">{metric.label}</div>
                      <div className="text-xs text-slate-600">{metric.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Clinical Transformation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'VUS Resolution',
                description: '73% VUS to actionable insights with 95.7% AUROC accuracy',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Users,
                title: 'Therapy Matching',
                description: '96.6% trial match accuracy with mechanism-based ranking',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Heart,
                title: 'Toxicity Prevention',
                description: 'Genotype-informed toxicity prediction before treatment starts',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: TrendingUp,
                title: 'Resistance Prediction',
                description: '3-6 weeks early resistance detection with pathway analysis',
                color: 'from-indigo-500 to-indigo-600'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading oncology centers using CrisPRO to deliver precision medicine at scale and improve patient outcomes by 40%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/products/oncology"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Oncology Platform
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
