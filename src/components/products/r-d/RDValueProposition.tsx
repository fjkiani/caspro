'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import ValuePropositionCard from '@/components/shared/ValuePropositionCard';
import { Users, FlaskConical, Microscope, ClipboardList } from 'lucide-react';

const valueProps = [
  {
    audience: 'For Oncologists',
    icon: Users,
    color: 'blue' as const,
    points: [
      'Faster treatment decision workflows',
      'Action-ready output formats',
      'Transparent reasoning approaches',
      'Confidence frameworks based on available data',
      'Toxicity risk assessment support',
      'Treatment sequencing guidance',
      'Biomarker-aware care frameworks',
      'Evidence-backed dosage frameworks',
      'Proactive resistance detection',
      'Unified care plan frameworks',
      'Early resistance detection support',
      'Honest limitations communication',
      'Progressive disclosure approaches',
      'Seamless upgrade path'
    ]
  },
  {
    audience: 'For Biotechs',
    icon: FlaskConical,
    color: 'purple' as const,
    points: [
      'De-risk development (validate in-silico before lab work)',
      'Faster iteration (test hypotheses in hours, not months)',
      'Structural validation support',
      'Patent-ready framework (generate IND packages automatically)',
      'IP monetization workflow (multi-stage workflow from discovery to licensing)'
    ]
  },
  {
    audience: 'For Researchers',
    icon: Microscope,
    color: 'green' as const,
    points: [
      'Universal hypothesis testing (multiple diseases, large compound databases)',
      'Mechanistic validation (S/P/E framework explains why)',
      'Reproducible results (complete provenance tracking)',
      'Cohort intelligence (extract, label, benchmark datasets)',
      'Evidence synthesis (multi-provider literature search)'
    ]
  },
  {
    audience: 'For Clinical Trial Teams',
    icon: ClipboardList,
    color: 'indigo' as const,
    points: [
      'Patient matching (biomarker intelligence)',
      'Autonomous search (no manual query)',
      'Graph intelligence (relationship-based optimization)',
      'Eligibility transparency (see exactly why patients are eligible)'
    ]
  }
];

export default function RDValueProposition() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Value Considerations"
          subtitle="For different audiences"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {valueProps.map((prop, index) => (
            <ValuePropositionCard
              key={prop.audience}
              audience={prop.audience}
              icon={prop.icon}
              points={prop.points}
              color={prop.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
