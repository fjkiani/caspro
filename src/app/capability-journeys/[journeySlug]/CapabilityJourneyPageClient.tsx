'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { allCapabilityJourneys, CapabilityJourneyData } from '@/data/capability-journeys';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import OutcomeFocusedCoPilotPage from '@/components/co-pilot-detail/OutcomeFocusedCoPilotPage';
import CapabilityJourneySection from '@/components/co-pilot-detail/CapabilityJourneySection';

// Map journey slugs to co-pilot slugs
const journeyToCoPilotMap: Record<string, string> = {
  'chemo': 'chemo',
  'crispr-intelligence': 'crispr-intelligence',
  'agentic-emr': 'agentic-emr',
  'clinical-trials': 'clinical-trials',
  'pathway': 'pathway',
  'therapy-fit': 'therapy-fit',
  'toxicity-risk': 'toxicity-risk',
};

interface CapabilityJourneyPageClientProps {
  journeySlug: string;
}

export default function CapabilityJourneyPageClient({ journeySlug }: CapabilityJourneyPageClientProps) {
  const journey = allCapabilityJourneys[journeySlug];
  const coPilotSlug = journeyToCoPilotMap[journeySlug];
  const coPilotData = coPilotSlug ? coPilotDetailsData[coPilotSlug] : null;
  
  if (!journey) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-slate-800">Journey Not Found</h3>
        <p className="text-slate-600">The capability journey you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/use-cases" className="hover:text-blue-600 transition-colors">
              Use Cases
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{journey.title}</span>
          </div>
        </nav>
        
        {/* Back Button */}
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Use Cases</span>
        </Link>
      </div>
      
      {/* If co-pilot data exists, use the full page structure (same as match-patients-to-therapies) */}
      {coPilotData ? (
        /* Use the same structure as match-patients-to-therapies - OutcomeFocusedCoPilotPage already includes CapabilityJourneySection */
        <OutcomeFocusedCoPilotPage content={coPilotData} />
      ) : (
        /* Fallback: Show header and journey if no co-pilot data */
        <>
          <div className="container mx-auto max-w-7xl px-4 md:px-8 mb-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {journey.title}
              </h1>
              {journey.subtitle && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {journey.subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Capability Journey Section */}
          <section className="mb-16">
            <CapabilityJourneySection capabilityType={journeySlug} />
          </section>
        </>
      )}
    </main>
  );
}
