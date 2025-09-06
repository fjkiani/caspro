'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JourneyNarrative from './JourneyNarrative';
import JourneyVisualization from './JourneyVisualization';
import { CapabilityJourneyData } from '@/data/capability-journeys';

interface EnhancedCapabilityJourneyProps {
  journeyData: CapabilityJourneyData;
}

const EnhancedCapabilityJourney: React.FC<EnhancedCapabilityJourneyProps> = ({ journeyData }) => {
  const [activeStepId, setActiveStepId] = useState<string | null>('old-1');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pageTitle = (
    <div className="text-center pt-16 pb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">{journeyData.title}</h2>
      <p className="text-lg text-slate-600 max-w-4xl mx-auto">
        {journeyData.subtitle}
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-white text-slate-800">
        <div className="container mx-auto px-4">
          {pageTitle}
          <div className="space-y-8">
            <JourneyNarrative journeyData={journeyData} onStepInView={() => {}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-800">
      <div className="container mx-auto">
        {pageTitle}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <JourneyNarrative journeyData={journeyData} onStepInView={setActiveStepId} />
          </div>
          <div className="w-full lg:sticky top-0">
            <JourneyVisualization activeStepId={activeStepId} journeyData={journeyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCapabilityJourney;
