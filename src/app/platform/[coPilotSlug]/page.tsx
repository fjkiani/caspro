import React from 'react';
import { Metadata } from 'next';
import { coPilotDetailsData, CoPilotDetailContent } from '@/data/coPilotDetails';
import InteractiveContentAnalysis from '@/components/co-pilot-detail/InteractiveContentAnalysis';
import DesciStyleDoctrineInsights from '@/components/co-pilot-detail/DesciStyleDoctrineInsights';
import CapabilityJourneySection from '@/components/co-pilot-detail/CapabilityJourneySection';
import { notFound } from 'next/navigation';
import TabbedContent, { Tab } from '@/components/ui/TabbedContent';
import { Layers, Zap, BookOpen } from 'lucide-react';

import { allCapabilityJourneys } from '@/data/capability-journeys';
import Link from 'next/link';

// This function generates the static paths for each co-pilot page at build time.
export async function generateStaticParams() {
  return Object.keys(coPilotDetailsData).map((slug) => ({
    coPilotSlug: slug,
  }));
}

// This function generates the metadata for each co-pilot page.
export async function generateMetadata({ params }: { params: { coPilotSlug: string } }): Promise<Metadata> {
  const content = coPilotDetailsData[params.coPilotSlug];
  if (!content) {
    return {
      title: 'Co-Pilot Not Found',
    };
  }
  return {
    title: content.pageTitle,
    description: content.heroSubtitle || content.vision, 
  };
}

// This is the main page component (Server Component).
export default async function CoPilotDetailPage({ params }: { params: { coPilotSlug: string } }) {
  const { coPilotSlug } = params;
  const content: CoPilotDetailContent | undefined = coPilotDetailsData[coPilotSlug];

  if (!content) {
    notFound(); // Triggers the 404 page if content for the slug is not found
  }

  const hasJourney = Object.keys(allCapabilityJourneys).includes(coPilotSlug);

  const tabs: Tab[] = [
    {
      id: 'battle-plan',
      label: 'Battle Plan',
      iconName: 'Layers',
      content: <InteractiveContentAnalysis content={content} />,
    },
  ];

  if (hasJourney) {
    tabs.push({
      id: 'war-stories',
      label: 'War Stories',
      iconName: 'Zap',
      content: <CapabilityJourneySection capabilityType={coPilotSlug} />,
    });
  }

  tabs.push({
    id: 'strategic-doctrine',
    label: 'Strategic Doctrine',
    iconName: 'BookOpen',
    content: <DesciStyleDoctrineInsights content={content} />,
  });

  const otherCoPilots = Object.values(coPilotDetailsData).filter(p => p.slug !== coPilotSlug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
            {content.pageTitle}
          </h1>
          {content.heroSubtitle && (
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              {content.heroSubtitle}
            </p>
          )}
        </section>
        
        {/* Tabbed Content */}
        <div className="container mx-auto px-4 py-8">
          <TabbedContent tabs={tabs} initialTab="strategic-doctrine" />
        </div>

        {/* Inter-linking Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Explore Other Co-Pilots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCoPilots.map(pilot => (
              <Link href={`/platform/${pilot.slug}`} key={pilot.slug}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{pilot.pageTitle}</h3>
                  <p className="text-slate-600 flex-grow">{pilot.heroSubtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
