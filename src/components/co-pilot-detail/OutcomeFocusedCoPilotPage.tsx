'use client';

import React from 'react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { allCapabilityJourneys } from '@/data/capability-journeys';
import ProductHeroSection, { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import ProblemSolutionSection, { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';
import SimplifiedOutcomesSection from './sections/SimplifiedOutcomesSection';
import CoPilotDemoSection from './CoPilotDemoSection';
import CollapsibleTechnicalDetails from './CollapsibleTechnicalDetails';
import CapabilityJourneySection from './CapabilityJourneySection';
import { transformToHeroContent, transformToProblemContent, transformToSolutionContent } from './ContentTransformers';

interface OutcomeFocusedCoPilotPageProps {
  content: CoPilotDetailContent;
}

export default function OutcomeFocusedCoPilotPage({ content }: OutcomeFocusedCoPilotPageProps) {
  const hasJourney = Object.keys(allCapabilityJourneys).includes(content.slug);
  
  const heroContent: ProductHeroContent = transformToHeroContent(content);
  const problemContent: ProblemSolutionContent = transformToProblemContent(content);
  const solutionContent: ProblemSolutionContent = transformToSolutionContent(content);
  
  return (
    <>
      {/* Hero - Outcome-focused */}
      <ProductHeroSection content={heroContent} />
      
      {/* Problem - What problem does this solve? */}
      <ProblemSolutionSection content={problemContent} />
      
      {/* Solution - How does this solve it? */}
      <ProblemSolutionSection content={solutionContent} />
      
      {/* Outcomes - Key results (PROMINENT, not buried) */}
      <SimplifiedOutcomesSection outcomes={content.observedOutcomes || []} kpis={content.kpis} />
      
      {/* Interactive Demo */}
      <CoPilotDemoSection content={content} />
      
      {/* Technical Details - Collapsed (repurposed from Battle Plan + Strategic Doctrine) */}
      <CollapsibleTechnicalDetails content={content} />
      
      {/* War Stories - Optional, only if journey exists */}
      {hasJourney && (
        <section className="mb-16">
          <CapabilityJourneySection capabilityType={content.slug} />
        </section>
      )}
    </>
  );
}


