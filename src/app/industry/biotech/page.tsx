import { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Target, Zap, TrendingUp } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Biotech & Pharma R&D | CrisPRO',
    description: 'Transform drug development with AI-powered target validation and therapeutic design. From undruggable to validated in hours.',
  };
}

export default function BiotechPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <FlaskConical className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
            Biotech & Pharma R&D
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transform drug development from $2.6B gamble to deterministic engineering. Design the undruggable, validate in silico, and compress years into hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

        {/* Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            R&D Transformation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Target Validation',
                description: '95.7% AUROC accuracy with pathway-aware essentiality analysis',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Zap,
                title: 'Therapeutic Design',
                description: 'Generate novel biologics with 90% AUROC guided design',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: FlaskConical,
                title: 'In-Silico Validation',
                description: 'Structural validation with 83% high-confidence threshold',
                color: 'from-rose-500 to-rose-600'
              },
              {
                icon: TrendingUp,
                title: 'Pipeline Acceleration',
                description: '18 months → 1 week target validation (72x faster)',
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
            Join leading biotech and pharma companies using CrisPRO to de-risk drug development.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Schedule a Demo
          </Link>
        </section>
      </div>
    </main>
  );
}

