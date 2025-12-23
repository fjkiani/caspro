'use client';

import React from 'react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import SectionHeader from '@/components/products/shared/SectionHeader';

interface CoPilotDemoSectionProps {
  content: CoPilotDetailContent;
}

export default function CoPilotDemoSection({ content }: CoPilotDemoSectionProps) {
  return (
    <section id="demo" className="mb-16">
      <SectionHeader
        title="See It In Action"
        description="Interactive demonstration of this capability"
      />
      
      {/* Placeholder for demo - will be implemented based on co-pilot slug */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border-2 border-blue-200 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Live Demo Coming Soon
          </h3>
          <p className="text-slate-600 mb-6">
            Interactive demonstration for {content.pageTitle} will be available here.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Request Demo →
          </div>
        </div>
      </div>
    </section>
  );
}


