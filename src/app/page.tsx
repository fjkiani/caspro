'use client';

import HeroSection from '@/components/sections/HeroSection';
import MetricsShowcase from '@/components/landing/MetricsShowcase';
import DrugDevelopmentProblem from '@/components/landing/DrugDevelopmentProblem';
import BridgingValleySimulation from '@/components/simulations/sections/BridgingValleySimulation';
import DiscoveryRaceSimulation from '@/components/simulations/sections/DiscoveryRaceSimulation';
import ROICalculatorSection from '@/components/landing/ROICalculatorSection';
import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection';
import CrisproFrameworkTeaser from '@/components/landing/CrisproFrameworkTeaser';
import FusionWorkflowTeaser from '@/components/landing/FusionWorkflowTeaser';
import CTASection from '@/components/shared/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <MetricsShowcase />
      <DrugDevelopmentProblem />
      <BridgingValleySimulation />
      <DiscoveryRaceSimulation />
      <InteractiveDemoSection />
      <div id="roi-calculator">
        <ROICalculatorSection />
      </div>
      <CrisproFrameworkTeaser />
      <FusionWorkflowTeaser />
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