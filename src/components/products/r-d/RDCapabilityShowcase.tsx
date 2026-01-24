'use client';

import React from 'react';
// This component is deprecated - replaced by RDCapabilityCardsGrid
// Keeping for backward compatibility but not actively used

interface RDCapabilityShowcaseProps {
  className?: string;
}

/**
 * R&D Capability Showcase
 * 
 * @deprecated This component is no longer used. Use RDCapabilityCardsGrid instead.
 */
export default function RDCapabilityShowcase({ className = '' }: RDCapabilityShowcaseProps) {
  return (
    <div className={className}>
      {/* Component deprecated - use RDCapabilityCardsGrid instead */}
    </div>
  );
}
