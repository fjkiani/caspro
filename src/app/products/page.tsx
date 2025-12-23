import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Heart, FlaskConical, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products | CrisPRO',
    description: 'Explore CrisPRO products: Oncology, R&D, and Research platforms powered by AI.',
  };
}

const products = [
  {
    slug: 'oncology',
    title: 'CrisPRO Oncology',
    subtitle: 'From VUS to Validated Care Plan in Minutes',
    description: 'Complete clinical decision support platform for precision oncology. Resolve VUS uncertainty, match patients to therapies, and predict resistance with AI-powered intelligence.',
    icon: Heart,
    gradient: 'from-red-500 to-pink-600',
    features: [
      'VUS Resolution (73% improvement)',
      '96.6% Trial Match Accuracy',
      'Resistance Prediction (6 months early)',
      'Unified Care Plans'
    ],
    link: '/products/oncology'
  },
  {
    slug: 'r-d',
    title: 'CrisPRO R&D',
    subtitle: 'Design the Undruggable. Validate in Silico.',
    description: 'Transform drug development from 90% failure to predictable success. Validate targets, design therapeutics, and predict outcomes with zero-shot AI.',
    icon: FlaskConical,
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      '72x Faster Target Validation',
      '99.8% Cost Reduction',
      '6x Success Rate Improvement',
      '88% False Discovery Reduction'
    ],
    link: '/products/r-d'
  },
  {
    slug: 'research',
    title: 'CrisPRO Research',
    subtitle: 'Accelerate Discovery from Years to Hours',
    description: 'Complete research acceleration platform. Test hypotheses at scale, explore genomic variants, and unlock insights with multi-modal AI analysis.',
    icon: Microscope,
    gradient: 'from-purple-500 to-cyan-600',
    features: [
      '1000x Discovery Speed',
      '98.7% Variant Coverage',
      'Hypothesis Testing at Scale',
      'Interactive Data Exploration'
    ],
    link: '/products/research'
  }
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            CrisPRO Products
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Explore our AI-powered platforms transforming precision oncology, drug development, and research discovery
          </p>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, idx) => {
            const IconComponent = product.icon;
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={product.link}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 h-full flex flex-col group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-lg font-semibold text-slate-700 mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-slate-600 mb-6 flex-grow">
                      {product.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      Explore {product.title} →
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Discover how CrisPRO products can accelerate your research, improve patient outcomes, and reduce development costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Request Demo
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-800 transition-all"
            >
              View Use Cases
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}


