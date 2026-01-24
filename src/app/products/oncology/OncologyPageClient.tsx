'use client';

import React, { useRef } from 'react';
import { oncologyProductData } from '@/data/products/oncology-data';
import FullPageCascadeExperience from '@/components/products/oncology/FullPageCascadeExperience';
import OncologyCapabilityShowcase from '@/components/products/oncology/OncologyCapabilityShowcase';
import ProgressiveMonitoringDashboard from '@/components/products/oncology/ProgressiveMonitoringDashboard';
import GenerateCarePlanButton from '@/components/products/oncology/GenerateCarePlanButton';
import { OncologyAgentProvider } from '@/contexts/OncologyAgentContext';

// Reusable Components
import ProductHeroSection from '@/components/products/shared/ProductHeroSection';
import ProblemSolutionSection from '@/components/products/shared/ProblemSolutionSection';
import SectionHeader from '@/components/products/shared/SectionHeader';
import RelatedProductsSection from '@/components/products/shared/RelatedProductsSection';
import RelatedIndustrySection from '@/components/products/shared/RelatedIndustrySection';
import MetricsShowcase from '@/components/products/shared/MetricsShowcase';

// CSI Components (Reuse from homepage)
import { ScoreVisualization, JourneyLevels, PatientExampleCard } from '@/components/landing/csi-journey';

// Content
import {
  oncologyHeroContent,
  oncologyProblemContent,
  oncologySolutionContent,
  oncologySectionHeaders,
  oncologyRelatedProducts
} from '@/data/products/oncology-page-content';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';
import { Award, TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import type { Metric } from '@/components/products/shared/MetricsShowcase';

/**
 * Oncology Product Page Client Component
 * Modular and reusable structure - content separated from code
 */
export default function OncologyPageClient({ content }: { content: typeof oncologyProductData }) {
  // Create modified hero content with GenerateCarePlanButton integration
  const heroContentWithCTA = {
    ...oncologyHeroContent,
    ctas: [
      {
        label: '🚀 Generate Care Plan',
        variant: 'primary' as const,
        onClick: () => {
          const element = document.getElementById('cascade-experience');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      {
        label: 'Experience Live Demos →',
        href: '#interactive-showcase',
        variant: 'secondary' as const
      }
    ]
  };

  // TOPACIO validation metrics
  const validationMetrics: Metric[] = [
    {
      icon: Award,
      value: '0.714',
      label: 'AUROC',
      description: 'TOPACIO validation - Mechanism fit component (p=0.023)',
      color: 'blue' as const,
      progress: {
        value: 71.4,
        max: 100
      }
    },
    {
      icon: TrendingUp,
      value: '0.85',
      label: 'BRCA/HRD+ Performance',
      description: 'High DDR-defective performance vs 0.58 for HRD-',
      color: 'green' as const,
      progress: {
        value: 85,
        max: 100
      }
    },
    {
      icon: Target,
      value: '35% vs 11%',
      label: 'ORR Difference',
      description: 'BRCA/HRD+ (35% ORR) vs HRD- (11% ORR) - validated mechanism fit',
      color: 'purple' as const
    },
    {
      icon: CheckCircle2,
      value: 'Retrospective Tested',
      label: 'Validation Status',
      description: 'TOPACIO trial matching validated; extending to patient-regimen pairs',
      color: 'teal' as const
    }
  ];

  return (
    <OncologyAgentProvider patientId="AK">
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* 1. Hero Section - CSI Focused */}
          <ProductHeroSection content={heroContentWithCTA} />

          {/* 2. Problem Section - Chemosensitivity Uncertainty */}
          <ProblemSolutionSection content={oncologyProblemContent} />

          {/* 3. The Score - CSI Visualization */}
          <section id="csi-score" className="mb-16">
            <SectionHeader
              title={oncologySectionHeaders.csiScore.title}
              description={oncologySectionHeaders.csiScore.description}
            />
            <ScoreVisualization />
            <div className="mt-8">
              <PatientExampleCard />
            </div>
          </section>

          {/* 4. Solution Section - CSI */}
          <ProblemSolutionSection content={oncologySolutionContent} />

          {/* 5. The Journey - What Unlocks */}
          <section id="journey-levels" className="mb-16">
            <JourneyLevels />
          </section>

          {/* 6. CSI in Action - Continuous Monitoring (Full Dashboard - Level 5) */}
          <section id="monitoring-dashboard" className="mb-16">
            <SectionHeader
              title={oncologySectionHeaders.monitoringDashboard.title}
              description={oncologySectionHeaders.monitoringDashboard.description}
            />
            <ProgressiveMonitoringDashboard level={5} patientId="AK" />
          </section>

          {/* 7. Validation - TOPACIO Metrics */}
          <section id="validation" className="mb-16">
            <MetricsShowcase
              badge={{
                text: 'TOPACIO Validation',
                icon: Award,
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800'
              }}
              title={FOCUSED_HERO_CONFIG.primaryClaim.headline}
              subtitle={FOCUSED_HERO_CONFIG.primaryClaim.subheadline}
              metrics={validationMetrics}
              cta={{
                primary: {
                  text: 'Calculate CSI for Your Patient',
                  href: '#csi-score'
                },
                secondary: {
                  text: 'View Full Validation Report',
                  href: '/evidence/csi-validation'
                }
              }}
            />
          </section>

          {/* 8. Related Products Section */}
          <RelatedProductsSection products={oncologyRelatedProducts} />

          {/* 9. Related Industry Section */}
          <RelatedIndustrySection
            industries={[
              {
                slug: 'healthcare',
                title: 'Healthcare & Clinical Oncology',
                subtitle: 'From VUS uncertainty to precision medicine with AI-powered clinical decision support',
                icon: '🏥'
              },
              {
                slug: 'genetic-testing',
                title: 'Genetic Testing Labs',
                subtitle: 'Transform from VUS crisis to precision diagnostics with automated workflows',
                icon: '🧬'
              }
            ]}
            title="See How Healthcare Uses CrisPRO"
          />
        </div>
      </main>
    </OncologyAgentProvider>
  );
}

