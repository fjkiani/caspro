'use client';

import React, { useState } from 'react';
import { patientMBD4Scenario, patientVUSScenario, ComparisonScenario } from '@/data/comparisons/patient-scenarios';
import ComparisonShowcase from '@/components/comparisons/ComparisonShowcase';

// Reusable Components
import ProductHeroSection from '@/components/products/shared/ProductHeroSection';
import ProblemSolutionSection from '@/components/products/shared/ProblemSolutionSection';
import SectionHeader from '@/components/products/shared/SectionHeader';
import RelatedProductsSection from '@/components/products/shared/RelatedProductsSection';

// Content
import {
  patientComparisonHeroContent,
  patientComparisonProblemContent,
  patientComparisonSolutionContent,
  patientComparisonRelatedProducts
} from '@/data/comparisons/patient-comparison-content';

/**
 * Patient Comparison Page Client Component
 * Similar structure to Oncology/R&D product pages
 */
export default function PatientComparisonClient() {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(['gpt']);
  const [activeScenario, setActiveScenario] = useState<ComparisonScenario>(patientMBD4Scenario);

  const scenarios = [
    {
      id: 'toxicity',
      label: 'Toxicity-Aware Nutrition',
      scenario: patientMBD4Scenario,
      description: 'Personalized supplements with dosages, mechanisms, and timing'
    },
    {
      id: 'vus',
      label: 'VUS Resolution',
      scenario: patientVUSScenario,
      description: 'Axis-aware triage, ML resolution, and provenance receipts'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <ProductHeroSection content={patientComparisonHeroContent} />

        {/* Problem Section */}
        <ProblemSolutionSection content={patientComparisonProblemContent} />

        {/* Solution Section */}
        <ProblemSolutionSection content={patientComparisonSolutionContent} />

        {/* Comparison Showcase with Tabs */}
        <section id="comparison-showcase" className="mb-16">
          <SectionHeader
            title="Real Benchmarks: GPT vs CrisPRO"
            description="Compare real GPT responses with CrisPRO's genotype-informed recommendations. See the difference in action."
          />
          
          {/* Scenario Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-slate-200">
              {scenarios.map((tab) => {
                const isActive = activeScenario.id === tab.scenario.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScenario(tab.scenario)}
                    className={`px-6 py-3 font-semibold transition-all relative ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {scenarios.find(t => t.scenario.id === activeScenario.id)?.description}
            </p>
          </div>

          <ComparisonShowcase 
            scenario={activeScenario}
            selectedCompetitors={selectedCompetitors}
          />
        </section>

        {/* Competitor Selection (Future) */}
        <section id="competitor-selection" className="mb-16">
          <SectionHeader
            title="Compare Against Competitors"
            description="Select additional competitors to compare (coming soon)"
          />
          <div className="bg-slate-100 rounded-xl p-8 text-center text-slate-600">
            <p>Competitor selection UI will be added here</p>
            <p className="text-sm mt-2">Foundation Medicine, Tempus, Guardant Health, etc.</p>
          </div>
        </section>

        {/* Related Products Section */}
        <RelatedProductsSection products={patientComparisonRelatedProducts} />
      </div>
    </main>
  );
}

