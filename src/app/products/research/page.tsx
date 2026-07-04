import React from 'react';
import { Metadata } from 'next';
import { researchProductData } from '@/data/products/research-data';
import Link from 'next/link';
import ResearchHeroSection from '@/components/products/research/ResearchHeroSection';
import HypothesisTestingSection from '@/components/products/research/HypothesisTestingSection';
import EvidenceSectionRenderer from '@/components/evidence/EvidenceSectionRenderer';
import { evidenceSectionsRegistry } from '@/data/evidence/registry';

// Generate metadata for the Research product page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: researchProductData.pageTitle,
    description: researchProductData.heroSubtitle || researchProductData.vision,
  };
}

// Main Research Product Page Component (Server Component)
export default async function ResearchProductPage() {
  const content = researchProductData;

  // Related products
  const relatedProducts = [
    {
      slug: 'oncology',
      title: 'CrisPRO Oncology',
      subtitle: 'From VUS to Validated Care Plan in Minutes.',
    },
    {
      slug: 'r-d',
      title: 'CrisPRO R&D',
      subtitle: 'Design the Undruggable. Validate in Silico.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800">
      {/* Enhanced Hero Section */}
      <ResearchHeroSection />

      {/* Hypothesis Testing Section */}
      <HypothesisTestingSection />

      {/* In-Silico Data Lab - Moved from /evidence/#data-lab */}
      <section id="data-lab" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <EvidenceSectionRenderer data={evidenceSectionsRegistry['data-lab']} />
        </div>
      </section>

      {/* Cohort Context - Moved from /evidence */}
      <section id="cohort" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <EvidenceSectionRenderer data={evidenceSectionsRegistry['cohort-context']} />
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
            Explore Our Product Suite
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedProducts.map(product => (
              <Link href={`/products/${product.slug}`} key={product.slug}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 h-full flex flex-col group">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 flex-grow mb-4">{product.subtitle}</p>
                  <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    {`Explore ${product.title} →`}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
