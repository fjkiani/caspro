import React from 'react';
import Link from 'next/link';
import { Users, TestTube2, Radiation, ArrowRight, ExternalLink } from 'lucide-react'; // Icons for cards
import CoPilotOptionCard from './CoPilotOptionCard'; // Import the new card component

const coPilotOptions = [
  {
    id: 'agentic-emr',
    title: 'Agentic EMR Co-Pilot',
    icon: 'UsersIcon',
    userDescription: 'For Clinicians: Doctors, Nurses, Admins, Healthcare Consultants',
    mainDescription: "Oncology CoPilot is an AI-powered clinical decision support platform designed for oncologists. It integrates with patient EHR data to provide comprehensive insights, including AI-driven summaries, genomic analysis, clinical trial matching, and collaborative consultation tools.\n\nThe platform aims to streamline workflows, enhance diagnostic accuracy, and personalize treatment strategies by leveraging advanced data analysis and multi-agent AI assistance, ultimately empowering healthcare professionals to deliver optimized patient care.",
    link: '/co-pilot-app/agentic-emr',
    linkText: 'View Details & Launch',
    status: 'active' as const // Added 'as const' for stricter type checking with the card
  },
  {
    id: 'crispr-intelligence',
    title: 'CRISPR Therapeutic Intelligence Platform',
    icon: 'TestTube2Icon',
    userDescription: 'For Researchers: Scientists, Bioinformaticians, R&D Teams, Clinical Trial Designers',
    mainDescription: "Empower your research with context-aware LLM support throughout the entire therapeutic design and analysis workflow. Our end-to-end CRISPR therapeutic intelligence platform moves beyond fragmented bioinformatics tools to offer integrated, therapeutically-focused solutions for both prophylactic and therapeutic interventions.\n\nAccelerate discovery, optimize designs, and gain deeper insights into complex biological systems.",
    link: '/co-pilot-app/crispr-intelligence',
    linkText: 'Learn More', 
    status: 'coming-soon' as const
  },
  {
    id: 'precision-rad',
    title: 'PrecisionRad Co-Pilot',
    icon: 'RadiationIcon',
    userDescription: 'For Radiation Oncologists, Medical Physicists, Dosimetrists, Researchers',
    mainDescription: "Revolutionize targeted radiation therapy by empowering clinicians and researchers with an AI-driven platform that integrates multi-modal data, advanced analytics, and intelligent decision support.\n\nOur vision is to enhance treatment precision, personalize care based on individual tumor biology and patient genetics, optimize workflows, and ultimately improve patient outcomes while minimizing toxicities.",
    link: '/co-pilot-app/precision-rad',
    linkText: 'Learn More',
    status: 'coming-soon' as const
  }
];

export default function CoPilotAppPage() {
  return (
    <main className="pt-24 pb-16 bg-gradient-to-b from-slate-900 to-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">Launch Your Oncology Co-Pilot</h1>
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