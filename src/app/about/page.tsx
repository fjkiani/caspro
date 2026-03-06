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
  description: 'Learn about CrisPRO.ai, our in-silico research framework for drug discovery through AI fusion of discriminative and generative capabilities.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <AboutHero data={aboutData.hero} />

      {/* Story Section */}
      {/* <AboutSection section={aboutData.story} index={0} /> */}

      {/* In-Page Navigation — trimmed by Zo (Alpha's orders 2026-03-06) */}
      <nav className="sticky top-20 bg-white/80 backdrop-blur-md z-40 shadow-md rounded-full py-2 px-4 max-w-3xl mx-auto my-8 sm:my-12">
        <ul className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto">
          <li><a href="#evidence-backbone" className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1">Evidence</a></li>
          {/* <li><a href="#fusion-workflow" className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1">Workflow</a></li> */}
          {/* <li><a href="#capabilities" className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1">Capabilities</a></li> */}
      
        </ul>
      </nav>

    

 

      {/* Generative AI Section — COMMENTED OUT BY ZO (Alpha's orders 2026-03-06) */} 


      {/* Fusion Workflow — COMMENTED OUT BY ZO (Alpha's orders 2026-03-06) */}
      <section id="fusion-workflow" className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            {/* <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Fusion Workflow</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              Complete workflow combining discriminative and generative AI for therapeutic discovery
            </p> */}
          </div>
          <TherapeuticPipeline />
        </div>
      </section>

      {/* Fusion Approach Section — COMMENTED OUT BY ZO (Alpha's orders 2026-03-06) */}
      {/* <AboutSection section={aboutData.fusion} index={3} /> */}

      {/* Capabilities Grid — COMMENTED OUT BY ZO (Alpha's orders 2026-03-06) */}
      {/* <div id="capabilities">
        <CapabilitiesGrid capabilities={aboutData.capabilities} />
      </div> */}

      {/* Business Value Section — COMMENTED OUT BY ZO (Alpha's orders 2026-03-06) */}
      <div id="business-value">
        <AboutSection section={aboutData.businessValue} index={4} />
      </div>

      {/* RUO Disclaimer */}
     
    </div>
  );
}