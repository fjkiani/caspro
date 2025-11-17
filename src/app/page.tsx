'use client';

import HeroSection from '@/components/sections/HeroSection';
import MetricsShowcase from '@/components/landing/MetricsShowcase';
import CapabilitiesGrid from '@/components/landing/CapabilitiesGrid';
import DrugDevelopmentTransformation from '@/components/landing/DrugDevelopmentTransformation';
import DiscoveryVsEngineering from '@/components/landing/DiscoveryVsEngineering';
import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection';
import ROICalculatorSection from '@/components/landing/ROICalculatorSection';
import CTASection from '@/components/shared/CTASection';
import TrustedBy from '@/components/shared/TrustedBy';
import { extractProductCapabilityCards } from '@/data/homepage/product-capabilities-extractor';

// Removed unnecessary imports for components not active on the homepage.

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      <HeroSection />
      
      <TrustedBy />
      
      <MetricsShowcase />

      {/* 6 Capability Cards - Core Platform Capabilities from product.mdc */}
      <CapabilitiesGrid capabilities={extractProductCapabilityCards()} />

      {/* Drug Development Transformation - 3-Stage Pipeline */}
      <DrugDevelopmentTransformation />

      {/* Discovery vs Engineering - Old Way vs New Doctrine */}
      <DiscoveryVsEngineering />

      {/* Interactive Demo Section - Try It Live */}
      <InteractiveDemoSection />

      {/* ROI Calculator Section - Business Impact */}
      <ROICalculatorSection />
        
      <CTASection
        title="Eliminate the $2.6B gamble with mathematical certainty."
        description="Join the biotech leaders who've eliminated the $2.6B gamble with mathematical certainty. Transform your R&D pipeline from gambling to engineering."
        primaryButton={{
          text: "Schedule Executive Demo",
          href: "/contact",
          color: "blue"
        }}
        secondaryButton={{
          text: "See Platform Overview",
          href: "/platform",
          color: "blue"
        }}
        backgroundColor="blue"
        className="py-20"
      />
    </main>
  );
}