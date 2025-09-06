'use client';

import React from 'react';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import DoctrineStyleCoPilotSection from '@/components/co-pilot-detail/DoctrineStyleCoPilotSection';
import DemoRequestForm from '@/components/co-pilot-detail/DemoRequestForm';

interface DoctrineCoPilotPageProps {
  params: { coPilotSlug: string };
}

export default function DoctrineCoPilotPage({ params }: DoctrineCoPilotPageProps) {
  const { coPilotSlug } = params;
  const content = coPilotDetailsData[coPilotSlug];

  if (!content) {
    return (
      <main className="min-h-screen bg-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Co-Pilot Not Found</h1>
            <p className="text-lg text-slate-600">The requested co-pilot could not be found.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-800 pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            {content.pageTitle}
          </h1>
          {content.heroSubtitle && (
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {content.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Doctrine-Style Co-Pilot Section */}
      <DoctrineStyleCoPilotSection content={content} />

      {/* Demo Request Form */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Ready to Deploy This Co-Pilot?
              </h2>
              <p className="text-lg text-slate-600">
                Request a strategic briefing to witness this capability in action.
              </p>
            </div>
            <DemoRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
