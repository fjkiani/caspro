'use client';

import HeroSection from '@/components/sections/HeroSection';
import WhatWeDoSection from '@/components/landing/WhatWeDoSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import MetricsShowcase from '@/components/landing/MetricsShowcase';
import DrugDevelopmentPlatform from '@/components/homepage/DrugDevelopmentPlatform';
import FeaturedDemosSection from '@/components/landing/FeaturedDemosSection';
import PlatformCapabilitiesShowcase from '@/components/landing/PlatformCapabilitiesShowcase';
import EngineRoom from '@/components/landing/EngineRoom';
// import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection'; // Moved to R&D page
import ROICalculatorSection from '@/components/landing/ROICalculatorSection';
import CTASection from '@/components/shared/CTASection';
import TrustedBy from '@/components/shared/TrustedBy';

// Removed unnecessary imports for components not active on the homepage.

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      <HeroSection />
      
      {/* What We Do Section */}
      {/* <WhatWeDoSection /> */}
      
      <PlatformCapabilitiesShowcase />

      <TrustedBy />
      
      {/* <MetricsShowcase /> */}
      
      {/* How It Works Section */}
      {/* <HowItWorksSection /> */}

      {/* Choose Your Path - Three Products (Oncology, R&D, Research) */}
      {/* <DrugDevelopmentPlatform /> */}

      {/* Featured AI Demonstrations - Experience Our Products Live */}
      {/* <FeaturedDemosSection /> */}

      {/* Platform Capabilities Showcase - End-to-End Platform */}

      {/* Engine Room - Technical Validation */}
      {/* <EngineRoom /> */}

      {/* Interactive Demo Section - Moved to R&D page */}
      {/* <InteractiveDemoSection /> */}

      {/* ROI Calculator Section - Business Impact */}
      {/* <ROICalculatorSection /> */}
        
      
    </main>
  );
}