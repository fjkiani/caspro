'use client';

import HeroSection from '@/components/sections/HeroSection';
import MetricsShowcase from '@/components/landing/MetricsShowcase';
import DrugDevelopmentTransformation from '@/components/landing/DrugDevelopmentTransformation';
import BridgingValleyOfDeath from '@/components/landing/BridgingValleyOfDeath';
import DiscoveryVsEngineering from '@/components/landing/DiscoveryVsEngineering';
import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection';
import BridgingValleySimulation from '@/components/simulations/sections/BridgingValleySimulation';
import DrugDevelopmentPlatform from '@/components/homepage/DrugDevelopmentPlatform';
import DrugDevelopmentOrchestrator from '@/components/homepage/DrugDevelopmentOrchestrator';
import ROICalculatorSection from '@/components/landing/ROICalculatorSection';
import CrisproFrameworkTeaser from '@/components/landing/CrisproFrameworkTeaser';
import FusionWorkflowTeaser from '@/components/landing/FusionWorkflowTeaser';
import CTASection from '@/components/shared/CTASection';
import DiscoveryRaceSimulation from '@/components/simulations/sections/DiscoveryRaceSimulation';
import DeckViewer from '@/components/shared/DeckViewer';
import { rAndDDeckData } from '@/data/decks/r-and-d-deck';
// Removed broken imports - using DrugDevelopmentOrchestrator instead




export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <MetricsShowcase />
      <DiscoveryVsEngineering />
      {/* <BridgingValleyOfDeath /> */}
    
      <BridgingValleySimulation />
      {/* <DiscoveryRaceSimulation/> */}
       {/* <DrugDevelopmentTransformation /> */}

      {/* <DrugDevelopmentTransformation /> */}
      {/* Drug Development Orchestrator - Main Demo Section */}
      {/* <div id="drug-development-orchestrator">
        <DrugDevelopmentOrchestrator />
      </div> */}
  
      <div id="roi-calculator">
        <ROICalculatorSection />
      </div>
      <CrisproFrameworkTeaser />
      <FusionWorkflowTeaser />
      
      {/* Pitch Deck Showcase */}
      <DeckViewer 
        slides={rAndDDeckData.slides}
        title={rAndDDeckData.title}
        description={rAndDDeckData.description}
      />
      
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