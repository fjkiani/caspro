import React from 'react';
import Link from 'next/link';
import CoPilotOptionCard, { CoPilotOption } from './CoPilotOptionCard'; // Import the new card component

const coPilotOptions: CoPilotOption[] = [
  {
    id: 'agentic-emr',
    title: 'AgenticEMR™ Dominance',
    icon: 'UsersIcon',
    userDescription: 'For Clinicians: Doctors, Nurses, Admins, Healthcare Consultants',
    mainDescription: "Unleash autonomous AI agents to conquer your clinical data. Our platform transforms unstructured EMR notes into a strategic, queryable asset. Automate patient summarization, cohort discovery, and trial matching to move at the speed of command, not the speed of clicks.",
    link: '/platform/agentic-emr',
    linkText: 'Launch Terminal',
    status: 'active'
  },
  {
    id: 'crispr-intelligence',
    title: 'CRISPR Intelligence Platform',
    icon: 'TestTube2Icon',
    userDescription: 'For Researchers: Scientists, Bioinformaticians, R&D Teams',
    mainDescription: "The definitive command system for therapeutic R&D. Execute an entire pre-clinical campaign—from target validation to designing a novel therapeutic—entirely `in silico`. Annihilate the R&D quagmire and compress years of guesswork into weeks of decisive action.",
    link: '/platform/crispr-intelligence',
    linkText: 'Access the Forge', 
    status: 'coming-soon'
  },
  {
    id: 'precision-rad',
    title: 'PrecisionRad™ Intelligence',
    icon: 'RadiationIcon',
    userDescription: 'For Radiation Oncologists, Medical Physicists, Researchers',
    mainDescription: "Predict patient-specific radiosensitivity and toxicity before the first dose is ever administered. Our Zeta Oracle analyzes a tumor's DNA Damage Repair pathways to provide a quantitative forecast of treatment response, arming you with the intelligence to design truly personalized radiation plans.",
    link: '/platform/precision-rad',
    linkText: 'View Battle Plan',
    status: 'coming-soon'
  }
];

export default function CoPilotAppPage() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-slate-900 to-background text-foreground text-gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-gradient">Launch Your Oncology Co-Pilot</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Select the CrisPRO Co-Pilot instance tailored to your specific needs in cancer care, research, or therapeutic design.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
          {coPilotOptions.map((option) => (
            <CoPilotOptionCard key={option.id} option={option} />
          ))}
        </div>
      </div>
    </main>
  );
} 