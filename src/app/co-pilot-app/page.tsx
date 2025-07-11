'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react'; // Icons for cards
import CoPilotOptionCard from '../platform/CoPilotOptionCard'; // Import the new card component

const coPilotOptions = [
  {
    id: 'agentic-emr',
    // The title asserts dominance over a domain.
    title: 'AgenticEMR™ Dominance',
    icon: 'Users',
    userDescription: 'For Clinicians: Doctors, Nurses, Admins, Healthcare Consultants',
    // The description focuses on the problems we annihilate.
    mainDescription: "Unleash autonomous AI agents to conquer your clinical data. Our platform transforms unstructured EMR notes into a strategic, queryable asset. Automate patient summarization, cohort discovery, and trial matching to move at the speed of command, not the speed of clicks.",
    link: '/co-pilot-app/agentic-emr',
    // The CTA is a command.
    linkText: 'Launch Terminal',
    status: 'active' as const
  },
  {
    id: 'crispr-intelligence',
    title: 'CRISPR Intelligence Platform',
    icon: 'TestTube2',
    userDescription: 'For Researchers: Scientists, Bioinformaticians, R&D Teams',
    // We don't "empower." We provide an end-to-end conquest engine.
    mainDescription: "The definitive command system for therapeutic R&D. Execute an entire pre-clinical campaign—from target validation to designing a novel therapeutic—entirely `in silico`. Annihilate the R&D quagmire and compress years of guesswork into weeks of decisive action.",
    link: '/co-pilot-app/crispr-intelligence',
    linkText: 'Access the Forge', 
    status: 'coming-soon' as const
  },
  {
    id: 'precision-rad',
    title: 'PrecisionRad™ Intelligence',
    icon: 'Radiation',
    userDescription: 'For Radiation Oncologists, Medical Physicists, Researchers',
    // We don't "revolutionize." We provide predictive firepower.
    mainDescription: "Predict patient-specific radiosensitivity and toxicity before the first dose is ever administered. Our Zeta Oracle analyzes a tumor's DNA Damage Repair pathways to provide a quantitative forecast of treatment response, arming you with the intelligence to design truly personalized radiation plans.",
    link: '/co-pilot-app/precision-rad',
    linkText: 'View Battle Plan',
    status: 'coming-soon' as const
  }
];

export default function CoPilotAppPage() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-slate-900 to-background text-foreground text-gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 text-gradient">Deploy Your Strategic Arsenal</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          Select the CrisPRO Intelligence Platform module engineered for your specific mission. We provide the weapon systems for every front in the war against cancer: clinical care, therapeutic R&D, and data intelligence.</p>
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