import React from 'react';
import { Metadata } from 'next';
import { rDProductData } from '@/data/products/r-d-data';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import RDHeroSection from '@/components/products/r-d/RDHeroSection';
import RDTransformationMetrics from '@/components/products/r-d/RDTransformationMetrics';
import RDInteractiveShowcase from '@/components/products/r-d/RDInteractiveShowcase';
import RDCapabilityTesting from '@/components/products/r-d/RDCapabilityTesting';
import RDCapabilityShowcase from '@/components/products/r-d/RDCapabilityShowcase';
import RDEnginesSection from '@/components/products/r-d/RDEnginesSection';
import RelatedIndustrySection from '@/components/products/shared/RelatedIndustrySection';

// Dynamically import RDTabs to avoid chunk loading issues
const RDTabs = dynamic(() => import('./RDTabs'), {
  ssr: true,
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="text-slate-600">Loading content...</div></div>
});

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
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800">
      {/* Hero Section */}
      <RDHeroSection />

      {/* R&D Transformation Metrics */}
      <div id="rd-metrics">
        <RDTransformationMetrics />
      </div>

      {/* Interactive R&D Showcase */}
      <RDInteractiveShowcase />

      {/* R&D Capability Testing */}
      <RDCapabilityTesting />

      {/* Original Capability Showcase (for backward compatibility) */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
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


