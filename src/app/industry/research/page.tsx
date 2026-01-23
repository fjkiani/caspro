import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Search, Sparkles, TrendingUp } from 'lucide-react';
import RelatedProductsSection from '@/components/industry/RelatedProductsSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Research Institutions | CrisPRO',
    description: 'AI-powered research tools for hypothesis testing, VUS exploration, and pathway analysis.',
  };
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">
            Research Institutions
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Test hypotheses at scale, explore genomic variants, and analyze pathways with AI-powered research tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products/research"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Explore Research Platform →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold px-8 py-4 rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition-all"
            >
              Request Access
            </Link>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Research Acceleration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: 'VUS Explorer',
                description: 'Interactive exploration of variants with 95.7% AUROC accuracy',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Sparkles,
                title: 'Hypothesis Testing',
                description: 'Test genomic hypotheses at scale with zero-shot predictions',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: GraduationCap,
                title: 'Pathway Analysis',
                description: 'Context-aware pathway insights with essentiality scoring',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: TrendingUp,
                title: 'Data Lab',
                description: 'Interactive data exploration with real-time visualization',
                color: 'from-purple-500 to-purple-600'
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

        {/* Research Impact */}
        <section className="mb-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-12 border-2 border-indigo-200">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Research Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Discovery Speed', value: '1000x', description: 'Test hypotheses in seconds' },
              { label: 'Variant Coverage', value: '98.7%', description: 'All variant types supported' },
              { label: 'Collaboration', value: '10x', description: 'Faster team coordination' },
            ].map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{metric.label}</div>
                <div className="text-sm text-slate-600">{metric.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Get Started with CrisPRO Research
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            See how research institutions use CrisPRO for genomic analysis.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Request Research Access
          </Link>
        </section>

        {/* Related Products Section */}
        <RelatedProductsSection
          products={[
            {
              slug: 'research',
              title: 'CrisPRO Research',
              subtitle: 'Complete research platform for hypothesis testing and variant analysis.',
            },
            {
              slug: 'r-d',
              title: 'CrisPRO R&D',
              subtitle: 'Design the Undruggable. Validate in Silico. Therapeutic development platform.',
            }
          ]}
          title="Explore CrisPRO Products for Research"
        />
      </div>
    </main>
  );
}

