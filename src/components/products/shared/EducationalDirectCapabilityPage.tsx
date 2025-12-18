'use client';

import React from 'react';
import { ProductSlug, CapabilitySlug } from '@/data/navigation/co-pilot-mappings';
import EducationalCapabilityPage from '@/components/capabilities/educational/EducationalCapabilityPage';
import { EducationalCapabilityPageData } from '@/types/educational-capability';

interface EducationalDirectCapabilityPageProps {
  productSlug: ProductSlug;
  capabilitySlug: CapabilitySlug;
  educationalData: EducationalCapabilityPageData;
}

/**
 * Enhanced DirectCapabilityPage that uses educational components
 * This replaces the basic OutcomeFocusedCoPilotPage with a full educational experience
 */
export default function EducationalDirectCapabilityPage({ 
  productSlug, 
  capabilitySlug,
  educationalData,
}: EducationalDirectCapabilityPageProps) {
  return (
    <EducationalCapabilityPage
      data={educationalData}
      productSlug={productSlug}
      capabilitySlug={capabilitySlug}
    />
  );
}

