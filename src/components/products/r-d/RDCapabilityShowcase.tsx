'use client';

import React from 'react';
import CapabilityShowcase from '@/components/products/shared/CapabilityShowcase';
import { RD_CAPABILITIES } from '@/data/products/rd-capabilities-data';

interface RDCapabilityShowcaseProps {
  className?: string;
}

/**
 * R&D Capability Showcase
 * 
 * Uses generic CapabilityShowcase component with R&D-specific data.
 */
export default function RDCapabilityShowcase({ className = '' }: RDCapabilityShowcaseProps) {
  return (
    <CapabilityShowcase
      className={className}
      sectionId="interactive-showcase"
      title="Experience Our R&D Capabilities"
      description="De-risk development with in-silico validation before spending millions on wet lab work. Every design is validated with structural confidence and mechanistic explanations."
      capabilities={RD_CAPABILITIES}
      defaultCapabilityId={RD_CAPABILITIES[0].id}
      headerEmoji="🔬"
      headerGradient="from-blue-600 via-indigo-600 to-purple-600"
    />
  );
}
