'use client';

import React from 'react';
import InteractiveContentAnalysis from '@/components/co-pilot-detail/InteractiveContentAnalysis';
import DesciStyleDoctrineInsights from '@/components/co-pilot-detail/DesciStyleDoctrineInsights';
import TabbedContent, { Tab } from '@/components/ui/TabbedContent';
import { CoPilotDetailContent } from '@/data/coPilotDetails';

interface RDTabsProps {
  content: CoPilotDetailContent;
}

export default function RDTabs({ content }: RDTabsProps) {
  // Define tabs - focusing on Strategic Doctrine
  const tabs: Tab[] = [
    {
      id: 'battle-plan',
      label: 'Battle Plan',
      iconName: 'Layers',
      content: <InteractiveContentAnalysis content={content} />,
    },
    {
      id: 'strategic-doctrine',
      label: 'Strategic Doctrine',
      iconName: 'BookOpen',
      content: <DesciStyleDoctrineInsights content={content} />,
    },
  ];

  return <TabbedContent tabs={tabs} initialTab="strategic-doctrine" />;
}


