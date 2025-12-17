'use client';

import React, { useRef } from 'react';
import { oncologyProductData } from '@/data/products/oncology-data';
import FullPageCascadeExperience from '@/components/products/oncology/FullPageCascadeExperience';
import OncologyCapabilityShowcase from '@/components/products/oncology/OncologyCapabilityShowcase';
import ContinuousMonitoringDashboard from '@/components/products/oncology/ContinuousMonitoringDashboard';
import GenerateCarePlanButton from '@/components/products/oncology/GenerateCarePlanButton';
import { OncologyAgentProvider } from '@/contexts/OncologyAgentContext';

// Reusable Components
import ProductHeroSection from '@/components/products/shared/ProductHeroSection';
import ProblemSolutionSection from '@/components/products/shared/ProblemSolutionSection';
import SectionHeader from '@/components/products/shared/SectionHeader';
import RelatedProductsSection from '@/components/products/shared/RelatedProductsSection';
import RelatedIndustrySection from '@/components/products/shared/RelatedIndustrySection';

// Content
import {
  oncologyHeroContent,
  oncologyProblemContent,
  oncologySolutionContent,
  oncologySectionHeaders,
  oncologyRelatedProducts
} from '@/data/products/oncology-page-content';

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

  return (
    <OncologyAgentProvider patientId="AK">
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <ProductHeroSection content={heroContentWithCTA} />

          {/* Problem Section */}
          <ProblemSolutionSection content={oncologyProblemContent} />

          {/* Solution Section */}
          <ProblemSolutionSection content={oncologySolutionContent} />

          {/* Continuous Monitoring Dashboard */}
          <section id="monitoring-dashboard" className="mb-16">
            <SectionHeader
              title={oncologySectionHeaders.monitoringDashboard.title}
              description={oncologySectionHeaders.monitoringDashboard.description}
            />
            <ContinuousMonitoringDashboard patientId="AK" />
          </section>

          {/* Full Page Cascade Experience - Agentic Flow */}
          <section id="cascade-experience" className="mb-16">
            <SectionHeader
              title={oncologySectionHeaders.cascadeExperience.title}
              description={oncologySectionHeaders.cascadeExperience.description}
            />
            <FullPageCascadeExperience patientId="AK" autoStart={false} />
          </section>

          {/* Capability Showcase - Interactive demos */}
          <section id="interactive-showcase" className="mb-16">
            <OncologyCapabilityShowcase />
          </section>

          {/* Related Products Section */}
          <RelatedProductsSection products={oncologyRelatedProducts} />

          {/* Related Industry Section */}
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

