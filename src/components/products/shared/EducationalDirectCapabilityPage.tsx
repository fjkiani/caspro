'use client';

import React from 'react';
import { ProductSlug, CapabilitySlug } from '@/data/navigation/co-pilot-mappings';
import EducationalCapabilityPage from '@/components/capabilities/educational/EducationalCapabilityPage';
import OncologyJourneyLevelPage from '@/components/products/oncology/OncologyJourneyLevelPage';
import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { Award } from 'lucide-react';
import type { Metric } from '@/components/products/shared/MetricsShowcase';

interface EducationalDirectCapabilityPageProps {
  productSlug: ProductSlug;
  capabilitySlug: CapabilitySlug;
  educationalData: EducationalCapabilityPageData;
}

// CSI Journey Levels - use simplified page structure (no tabs)
const csiJourneyLevels: CapabilitySlug[] = [
  'match-patients-to-therapies', // Level 2
  'predict-resistance', // Level 3
  'prevent-toxicity', // Level 4
];

/**
 * Enhanced DirectCapabilityPage that uses educational components
 * For CSI journey levels, uses simplified page structure (no tabs)
 * For other pages, uses tabbed educational layout
 */
export default function EducationalDirectCapabilityPage({ 
  productSlug, 
  capabilitySlug,
  educationalData,
}: EducationalDirectCapabilityPageProps) {
  // For CSI journey levels, use simplified page structure (no tabs)
  if (productSlug === 'oncology' && csiJourneyLevels.includes(capabilitySlug)) {
    const level = capabilitySlug === 'match-patients-to-therapies' ? 2 :
                 capabilitySlug === 'predict-resistance' ? 3 :
                 capabilitySlug === 'prevent-toxicity' ? 4 : 2;

    // Transform educational data to journey level page format
    const levelTitles = {
      2: 'Therapies & Trials',
      3: 'Resistance Prediction',
      4: 'Safety & Dosing'
    };
    
    const heroContent = {
      badge: {
        text: `Level ${level}: ${levelTitles[level as keyof typeof levelTitles]}`,
        emoji: level === 2 ? '💊' : level === 3 ? '⚠️' : '🛡️',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800'
      },
      mainHeadline: educationalData.hero?.question || '',
      subtitle: educationalData.hero?.ourAnswer || '',
      description: educationalData.solution?.narrative?.split('\n\n')[0] || '',
      headlineGradient: 'from-blue-600 via-purple-600 to-indigo-600',
      ctas: [
        {
          label: `Try Level ${level} Demo`,
          variant: 'primary' as const,
          href: '#how-it-works'
        },
        {
          label: 'View Full Journey →',
          href: '/products/oncology',
          variant: 'secondary' as const
        }
      ]
    };

    // Extract short summary from narrative (first sentence or first 100 chars)
    const getShortSummary = (narrative: string | undefined): string => {
      if (!narrative) return '';
      const firstSentence = narrative.split('.')[0];
      if (firstSentence.length <= 120) return firstSentence + '.';
      return narrative.substring(0, 120).trim() + '...';
    };

    // Simplify problem cards - make them more visual, less text
    const problemContent = {
      type: 'problem' as const,
      title: educationalData.problem?.title || '',
      description: getShortSummary(educationalData.problem?.narrative),
      cards: educationalData.problem?.painPoints?.slice(0, 3).map(p => {
        // Extract key phrase from description (first 8-10 words)
        const shortDesc = p.description.split('.').slice(0, 1).join('.').substring(0, 80);
        return {
          icon: 'alert' as const,
          title: p.title,
          description: shortDesc,
          highlight: 'Problem'
        };
      }) || []
    };

    // Simplify solution cards - make them more visual, less text
    const solutionContent = {
      type: 'solution' as const,
      title: educationalData.solution?.title || '',
      description: getShortSummary(educationalData.solution?.narrative),
      cards: educationalData.solution?.keyFeatures?.slice(0, 3).map(f => {
        // Extract key phrase from description (first sentence or 8-10 words)
        const shortDesc = f.description.split('.').slice(0, 1).join('.').substring(0, 80);
        return {
          icon: 'check' as const,
          title: f.title,
          description: shortDesc,
          highlight: f.status === 'implemented' ? '✓ Validated' : 'Solution'
        };
      }) || []
    };

    // Map steps to unlocks based on journey level and capability
    const getStepUnlock = (stepNumber: number, level: number, capabilitySlug: string): string | undefined => {
      if (capabilitySlug === 'match-patients-to-therapies') {
        // Level 2: Therapies & Trials
        const unlocks: Record<number, string> = {
          1: 'CSI Score (0-100) with 6-month PFS probability',
          2: 'Genomic profile ready for S/P/E calculation',
          3: 'S/P/E scores for each DDR-targeted drug',
          4: 'Top 5 ranked drugs + Clinical trial matches'
        };
        return unlocks[stepNumber];
      } else if (capabilitySlug === 'predict-resistance') {
        // Level 3: Resistance Prediction
        const unlocks: Record<number, string> = {
          1: 'Complete treatment context (CSI + Drug selection)',
          2: 'Treatment history standardized (PFI, PTPI, TFI)',
          3: 'Post-treatment pathway profiling complete',
          4: '3-6 weeks early resistance warnings + Timeline'
        };
        return unlocks[stepNumber];
      } else if (capabilitySlug === 'prevent-toxicity') {
        // Level 4: Safety & Dosing
        const unlocks: Record<number, string> = {
          1: 'Toxicity risk assessment',
          2: 'Germline variant analysis complete',
          3: 'PGx-guided dosing recommendations',
          4: '100% toxicity prevention coverage'
        };
        return unlocks[stepNumber];
      }
      return undefined;
    };

    const howItWorksSteps = educationalData.howItWorks?.steps.map(step => ({
      number: step.number,
      title: step.title,
      description: step.description,
      details: step.details,
      unlocks: getStepUnlock(step.number, level, capabilitySlug)
    })) || [];

    const validationMetrics: Metric[] = [
      {
        icon: Award,
        value: 'Retrospective Tested',
        label: 'Validation Status',
        description: 'Validated performance for this capability',
        color: 'blue' as const
      }
    ];

    return (
      <OncologyJourneyLevelPage
        level={level as 2 | 3 | 4}
        heroContent={heroContent}
        problemContent={problemContent}
        solutionContent={solutionContent}
        howItWorksSteps={howItWorksSteps}
        validationMetrics={validationMetrics}
      />
    );
  }

  // For other educational pages, use tabbed layout
  return (
    <EducationalCapabilityPage
      data={educationalData}
      productSlug={productSlug}
      capabilitySlug={capabilitySlug}
    />
  );
}

