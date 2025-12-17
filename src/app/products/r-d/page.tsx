import React from 'react';
import { Metadata } from 'next';
import { rDProductData } from '@/data/products/r-d-data';
import Link from 'next/link';
import RDTabs from './RDTabs';
import RDCapabilityShowcase from '@/components/products/r-d/RDCapabilityShowcase';
import RDEnginesSection from '@/components/products/r-d/RDEnginesSection';
import GenerateDesignButton from '@/components/products/r-d/GenerateDesignButton';
import RelatedIndustrySection from '@/components/products/shared/RelatedIndustrySection';

// Generate metadata for the R&D product page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: rDProductData.pageTitle,
    description: rDProductData.heroSubtitle || rDProductData.vision,
  };
}

// Main R&D Product Page Component (Server Component)
export default async function RDProductPage() {
  const content = rDProductData;

  // Related products
  const relatedProducts = [
    {
      slug: 'oncology',
      title: 'CrisPRO Oncology',
      subtitle: 'From VUS to Validated Care Plan in Minutes.',
    },
    {
      slug: 'research',
      title: 'CrisPRO Research',
      subtitle: 'Accelerate Discovery from Years to Hours.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            {content.pageTitle}
          </h1>
          {content.heroSubtitle && (
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
          )}

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GenerateDesignButton />
            <Link
              href="#interactive-showcase"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Experience Live Demos →
            </Link>
          </div>
        </section>
        
        {/* Capability Showcase */}
        <RDCapabilityShowcase className="mb-16" />

        {/* AI Engines Section - Connects orphaned engine pages */}
        <RDEnginesSection className="mb-16" />

        {/* Tabbed Content */}
        <div className="container mx-auto px-4 py-8">
          <RDTabs content={content} />
        </div>

        {/* Related Products Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Explore Other Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedProducts.map(product => (
              <Link href={`/products/${product.slug}`} key={product.slug}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{product.title}</h3>
                  <p className="text-slate-600 flex-grow">{product.subtitle}</p>
                  <span className="mt-4 text-blue-600 font-semibold">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Industry Section */}
        <RelatedIndustrySection
          industries={[
            {
              slug: 'biotech',
              title: 'Biotech & Pharma R&D',
              subtitle: 'From 90% failure to predictable success with AI-powered target validation',
              icon: '🧬'
            },
            {
              slug: 'research',
              title: 'Research Institutions',
              subtitle: 'Accelerate discovery from years to hours with multi-modal AI analysis',
              icon: '🔬'
            }
          ]}
          title="See How R&D Teams Use CrisPRO"
        />
      </div>
    </main>
  );
}


