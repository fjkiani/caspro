import React from 'react';
import { Metadata } from 'next';
import { rDProductData } from '@/data/products/r-d-data';
import Link from 'next/link';
import RDHeroSection from '@/components/products/r-d/RDHeroSection';
import RDChallengeSection from '@/components/products/r-d/RDChallengeSection';
import RDPlatformArchitecture from '@/components/products/r-d/RDPlatformArchitecture';
import RDCapabilityCardsGrid from '@/components/products/r-d/RDCapabilityCardsGrid';
import RDValidationMetrics from '@/components/products/r-d/RDValidationMetrics';
import RDExampleUseCase from '@/components/products/r-d/RDExampleUseCase';
import RDIntegratedJourney from '@/components/products/r-d/RDIntegratedJourney';
import RDPlatformCapabilitiesTabs from '@/components/products/r-d/RDPlatformCapabilitiesTabs';
import RDValueProposition from '@/components/products/r-d/RDValueProposition';
import RDEnginesSection from '@/components/products/r-d/RDEnginesSection';
import RelatedIndustrySection from '@/components/products/shared/RelatedIndustrySection';
import CTASection from '@/components/shared/CTASection';
import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection';

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
      {/* 1. Hero Section */}
      <RDHeroSection />

      {/* 2. The Challenge Section */}
      {/* <RDChallengeSection /> */}

      {/* 3. Integrated Platform Architecture */}
      <RDPlatformArchitecture />

      {/* 4. Capability Cards Grid */}
      <RDCapabilityCardsGrid />

      {/* 5. Validation Metrics Showcase */}
      <RDValidationMetrics />


      {/* 7. Integrated Patient Journey */}
      {/* <RDIntegratedJourney /> */}

      {/* 8. Platform Capabilities (6 Groups) */}
      {/* <RDPlatformCapabilitiesTabs /> */}

      {/* 9. Value Proposition */}
      {/* <RDValueProposition /> */}

      {/* AI Engines Section - Moved to bottom */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-16">
        <RDEnginesSection className="mb-16" />
      </div>

      {/* Related Products Section */}
      {/* <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section> */}

      {/* Related Industry Section */}
      
      {/* 10. CTA Section */}
      <CTASection
        title="Ready to Transform Drug Development?"
        description="Explore how mechanism-aligned patient selection and proactive pharmacovigilance can improve clinical trial outcomes"
        primaryButton={{
          text: "Request a Demo",
          href: "/contact"
        }}
        secondaryButton={{
          text: "View Platform Capabilities",
          href: "#platform-capabilities"
        }}
      />
    </main>
  );
}


