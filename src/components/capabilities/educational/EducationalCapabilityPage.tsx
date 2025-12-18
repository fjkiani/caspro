'use client';

import React from 'react';
import { EducationalCapabilityPageData } from '@/types/educational-capability';
import {
  HeroQuestionSection,
  ProblemNarrativeSection,
  SolutionNarrativeSection,
  HowItWorksSection,
  ValuePropositionSection,
  IntegrationSection,
  ProcessVisualizer,
  ExampleShowcase,
  InfographicSection,
  ProgressiveDisclosureSection,
  EducationalPageLayout,
} from './index';
import ToxicitySolutionInteractive from './ToxicitySolutionInteractive';
import ValuePropsSection from './ValuePropsSection';
import ObservedOutcomesSection from './ObservedOutcomesSection';
import KeyCapabilitiesSection from './KeyCapabilitiesSection';
import CapabilityJourneySlider from '@/components/products/healthcare/CapabilityJourneySlider';

interface EducationalCapabilityPageProps {
  data: EducationalCapabilityPageData;
  productSlug?: string;
  capabilitySlug?: string;
  className?: string;
}

export default function EducationalCapabilityPage({
  data,
  productSlug,
  capabilitySlug,
  className = '',
}: EducationalCapabilityPageProps) {
  return (
    <EducationalPageLayout
      data={data.layout}
      productSlug={productSlug}
      capabilitySlug={capabilitySlug}
    >
      {/* Hero Question Section */}
      <section id="hero" className="scroll-mt-24">
        <HeroQuestionSection data={data.hero} />
      </section>

      {/* Problem Narrative Section */}
      <section id="problem" className="scroll-mt-24">
        <ProblemNarrativeSection data={data.problem} />
      </section>

      {/* Solution Interactive Section */}
      <section id="solution" className="scroll-mt-24">
        <ToxicitySolutionInteractive data={data.solution} />
      </section>

      {/* Value Propositions Section */}
      <section id="value-props" className="scroll-mt-24">
        <ValuePropsSection />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="scroll-mt-24">
        <HowItWorksSection data={data.howItWorks} />
      </section>

      {/* Observed Outcomes Section */}
      <section id="observed-outcomes" className="scroll-mt-24">
        <ObservedOutcomesSection />
      </section>

      {/* Key Capabilities Section */}
      <section id="key-capabilities" className="scroll-mt-24">
        <KeyCapabilitiesSection />
      </section>

      {/* Process Visualizer Section */}
      <section id="process" className="scroll-mt-24">
        <ProcessVisualizer data={data.process} />
      </section>

      {/* Value Proposition Section */}
      <section id="value" className="scroll-mt-24">
        <ValuePropositionSection data={data.value} />
      </section>

      {/* Example Showcase Section */}
      <section id="example" className="scroll-mt-24">
        <ExampleShowcase data={data.example} />
      </section>

      {/* Integration Section */}
      <section id="integration" className="scroll-mt-24">
        <IntegrationSection data={data.integration} />
      </section>

      {/* Capability Journey Slider */}
      <section className="scroll-mt-24">
        <CapabilityJourneySlider />
      </section>

      {/* Infographic Section (if provided) */}
      {data.infographic && (
        <section className="scroll-mt-24">
          <InfographicSection data={data.infographic} />
        </section>
      )}

      {/* Technical Details (Progressive Disclosure) */}
      <section className="scroll-mt-24">
        <ProgressiveDisclosureSection
          data={{
            title: 'Technical Details',
            summary: 'Implementation details, API endpoints, and data structures',
            details: (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Capabilities</h4>
                  <ul className="space-y-2">
                    {data.sourceData.keyCapabilities?.map((cap, idx) => (
                      <li key={idx} className="text-slate-700">
                        <strong>{cap.title}:</strong> {cap.technical?.description}
                      </li>
                    ))}
                  </ul>
                </div>
                {data.sourceData.kpis && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {data.sourceData.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-3">
                          <div className="text-sm text-slate-600">{kpi.label}</div>
                          <div className="text-lg font-semibold text-slate-900">{kpi.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ),
            defaultExpanded: false,
          }}
        />
      </section>
    </EducationalPageLayout>
  );
}

