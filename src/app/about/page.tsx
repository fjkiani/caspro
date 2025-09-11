import React from 'react';
import { Metadata } from 'next';
import { aboutData } from '@/data/about/about-data';
import AboutHero from '@/components/about/AboutHero';
import AboutSection from '@/components/about/AboutSection';
import EvidenceMetrics from '@/components/insilico/EvidenceBackbone/EvidenceMetrics';
import TherapeuticPipeline from '@/components/insilico/FusionWorkflow/TherapeuticPipeline';
import CapabilitiesGrid from '@/components/landing/CapabilitiesGrid';

export const metadata: Metadata = {
  title: 'About CrisPRO.ai - In-Silico Research Framework',
  description: 'Learn about CrisPRO.ai, our in-silico research framework that accelerates drug discovery through AI fusion of discriminative and generative capabilities.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <AboutHero {...aboutData.hero} />

      {/* Story Section */}
      <AboutSection section={aboutData.story} index={0} />

      {/* Evidence Backbone - Reuse existing component */}
      <EvidenceMetrics />

      {/* Discriminative AI Section */}
      <AboutSection section={aboutData.evidence.discriminative} index={1} />

      {/* Generative AI Section */}
      <AboutSection section={aboutData.evidence.generative} index={2} />

      {/* Fusion Workflow - Reuse existing component */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Fusion Workflow</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Complete RUO workflow combining discriminative and generative AI for therapeutic discovery
            </p>
          </div>
          <TherapeuticPipeline />
        </div>
      </section>

      {/* Fusion Approach Section */}
      <AboutSection section={aboutData.fusion} index={3} />

      {/* Capabilities Grid - Reuse existing component */}
      <CapabilitiesGrid capabilities={aboutData.capabilities} />

      {/* Business Value Section */}
      <AboutSection section={aboutData.businessValue} index={4} />

      {/* RUO Disclaimer */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 border border-orange-200 shadow-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Research Use Only (RUO)</h3>
              <p className="text-gray-700 leading-relaxed">
                All capabilities and performance metrics are designed for research purposes. Not intended for diagnostic or therapeutic decision-making without independent validation and regulatory review. All results should be validated through appropriate experimental and clinical studies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}