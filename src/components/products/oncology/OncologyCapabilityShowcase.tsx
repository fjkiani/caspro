'use client';

import React from 'react';
import CapabilityShowcase from '@/components/products/shared/CapabilityShowcase';
import { ONCOLOGY_CAPABILITIES } from '@/data/products/oncology-capabilities-data';

interface OncologyCapabilityShowcaseProps {
  className?: string;
}

/**
 * Oncology Capability Showcase
 * 
 * Uses generic CapabilityShowcase component with oncology-specific data.
 */
export default function OncologyCapabilityShowcase({ className = '' }: OncologyCapabilityShowcaseProps) {
  return (
    <CapabilityShowcase
      className={className}
      sectionId="capability-showcase"
      title="Experience Our Capabilities"
      description="Try it live: See how our AI-powered oncology platform matches patients to the right therapies using mechanism-based intelligence. Every recommendation shows WHY (eligibility + fit + conditions), not just WHAT."
      capabilities={ONCOLOGY_CAPABILITIES}
      defaultCapabilityId={ONCOLOGY_CAPABILITIES[0].id}
      headerEmoji="🎯"
      headerGradient="from-green-600 via-emerald-600 to-teal-600"
    />
  );
}
