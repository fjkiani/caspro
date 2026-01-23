import React from 'react';
import { notFound } from 'next/navigation';
import { allCapabilityJourneys } from '@/data/capability-journeys';
import CapabilityJourneyPageClient from './CapabilityJourneyPageClient';

// Generate static params for all capability journeys
export async function generateStaticParams() {
  return Object.keys(allCapabilityJourneys).map((slug) => ({
    journeySlug: slug,
  }));
}

// Generate metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { journeySlug: string } 
}) {
  const journey = allCapabilityJourneys[params.journeySlug];
  
  if (!journey) {
    return {
      title: 'Capability Journey Not Found',
    };
  }
  
  return {
    title: `${journey.title} | CrisPRO Capability Journey`,
    description: journey.subtitle || '',
  };
}

// Main capability journey page (Server Component)
export default function CapabilityJourneyPage({ 
  params 
}: { 
  params: { journeySlug: string } 
}) {
  const journey = allCapabilityJourneys[params.journeySlug];
  
  if (!journey) {
    notFound();
  }
  
  // Pass to client component
  return <CapabilityJourneyPageClient journeySlug={params.journeySlug} />;
}
