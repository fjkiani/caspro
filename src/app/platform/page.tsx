import React from 'react';
import Link from 'next/link';
import { Users, TestTube2, Radiation, ArrowRight, ExternalLink, UsersIcon, TestTube2Icon, RadiationIcon } from 'lucide-react'; // Icons for cards
import CoPilotOptionCard from './CoPilotOptionCard'; // Import the new card component
import { coPilotOptions } from './data';

export default function CoPilotAppPage() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-slate-900 to-background text-foreground text-gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-gradient">Launch Your Oncology Co-Pilot</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Select the CrisPRO Co-Pilot instance tailored to your specific needs in cancer care, research, or therapeutic design.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          {coPilotOptions.map((option) => (
            <CoPilotOptionCard key={option.id} option={option} />
          ))}
        </div>
      </div>
    </main>
  );
} 