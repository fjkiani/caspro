'use client';

import React from 'react';
import CapabilityShowcase from '@/components/products/shared/CapabilityShowcase';
import { MATCH_PATIENTS_CAPABILITY } from '@/data/products/oncology-capabilities-data';

interface OncologyCapabilityShowcaseProps {
  className?: string;
}

/**
 * Oncology Capability Showcase
 * 
 * Uses generic CapabilityShowcase component with oncology-specific data.
 */
export default function OncologyCapabilityShowcase({ className = '' }: OncologyCapabilityShowcaseProps) {
  // Only show Match Patients to Therapies as the flagship capability
  const flagshipCapability = [MATCH_PATIENTS_CAPABILITY];
  
  return (
    <CapabilityShowcase
      className={className}
      sectionId="capability-showcase"
      title="Experience Our Capabilities"
      description="Match Patients to Therapies: Mechanism-Based Drug Ranking. S/P/E fusion (Sequence/Pathway/Evidence) matches patients to therapies. Mechanism-based matching, not just standard of care."
      capabilities={flagshipCapability}
      defaultCapabilityId={flagshipCapability[0].id}
      headerEmoji="🎯"
      headerGradient="from-green-600 via-emerald-600 to-teal-600"
      productSlug="oncology"
    />
  );
}
