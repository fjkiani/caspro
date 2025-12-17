import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Users, Shield, TrendingUp } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Healthcare & Clinical Oncology | CrisPRO',
    description: 'Transform clinical oncology with AI-powered precision medicine. From VUS to validated care plans in minutes.',
  };
}

export default function HealthcarePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            Healthcare & Clinical Oncology
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transform patient care with AI-powered precision oncology. Resolve genetic uncertainty, match patients to optimal therapies, and predict resistance before it happens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            Join leading oncology centers using CrisPRO to deliver precision medicine at scale.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Schedule a Demo
          </Link>
        </section>
      </div>
    </main>
  );
}

