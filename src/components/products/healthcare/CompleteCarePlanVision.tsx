'use client';

import React from 'react';
import { Navigation, TrendingUp, Shield, Activity, RefreshCw } from 'lucide-react';
import { clinicalCarePlanContent } from '@/data/industry/clinical-care-plan-content';
import ProblemSolutionSection, { ProblemSolutionContent } from '../shared/ProblemSolutionSection';

export default function CompleteCarePlanVision() {
  const visionContent: ProblemSolutionContent = {
    type: 'solution',
    title: clinicalCarePlanContent.completeCarePlanVision.title,
    description: clinicalCarePlanContent.completeCarePlanVision.description,
    cards: clinicalCarePlanContent.completeCarePlanVision.components.map((component, idx) => {
      const icons: Array<'navigation' | 'trendingUp' | 'activity' | 'shield' | 'check'> = ['navigation', 'trendingUp', 'activity', 'shield', 'check'];
      return {
        icon: icons[idx] || 'navigation',
        title: component,
        description: getComponentDescription(component),
      };
    }),
    bgGradient: 'from-blue-50 to-purple-50',
    borderColor: 'border-blue-200',
  };

  function getComponentDescription(component: string): string {
    const descriptions: Record<string, string> = {
      'Anticipates resistance': 'Predicts likely resistance mechanisms before they develop, enabling proactive therapy switches',
      'Recommends combinations': 'Suggests smart drug pairs that attack cancer from multiple angles simultaneously',
      'Monitors continuously': 'Tracks biomarkers and pathway signals in real-time, alerting to changes',
      'Prevents toxicity': 'Flags genetic variants that cause severe reactions and recommends protective nutrition',
      'Adapts to progression': 'Generates new care plans when cancer evolves, maintaining optimal treatment',
    };
    return descriptions[component] || 'Core component of the complete care plan system';
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <ProblemSolutionSection content={visionContent} />
      </div>
    </section>
  );
}

