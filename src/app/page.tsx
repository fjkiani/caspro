import HeroSection from '@/components/sections/HeroSection';
import WhatWeDoSection from '@/components/landing/WhatWeDoSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import MetricsShowcase from '@/components/landing/MetricsShowcase';
import DrugDevelopmentPlatform from '@/components/homepage/DrugDevelopmentPlatform';
import FeaturedDemosSection from '@/components/landing/FeaturedDemosSection';
import CSISisterQuestion from '@/components/landing/CSISisterQuestion';
import EngineRoom from '@/components/landing/EngineRoom';
// import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection'; // Moved to R&D page
import ROICalculatorSection from '@/components/landing/ROICalculatorSection';
import CTASection from '@/components/shared/CTASection';
import TrustedBy from '@/components/shared/TrustedBy';
import FeaturedMediaPreview from '@/components/homepage/FeaturedMediaPreview';
import { getAllMedia } from '@/lib/docs/hygraph/media-queries';

// Removed unnecessary imports for components not active on the homepage.

export default async function Home() {
  // Fetch featured media items
  let mediaItems: any[] = [];
  try {
    mediaItems = await getAllMedia({}, 'publishedAt_DESC');
    // Force log to see what's happening
    console.log('[Homepage Server] Fetched media items:', mediaItems.length);
    if (mediaItems.length > 0) {
      console.log('[Homepage Server] First item:', mediaItems[0]?.title);
    }
  } catch (error) {
    console.error('[Homepage Server] Error fetching media items:', error);
    // Continue without media items if fetch fails
  }

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      <HeroSection />
      
      {/* What We Do Section */}
      {/* <WhatWeDoSection /> */}
      
      <CSISisterQuestion />

      <TrustedBy />
      
      {/* Featured Media Preview */}
      {mediaItems && mediaItems.length > 0 && (
        <FeaturedMediaPreview mediaItems={mediaItems} />
      )}
      
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