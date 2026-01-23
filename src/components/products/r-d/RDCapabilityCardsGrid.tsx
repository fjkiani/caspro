'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import RDCapabilityCardComponent from './RDCapabilityCard';
import { RD_CAPABILITIES } from '@/data/products/rd-capabilities-data';
import RDCapabilityDetail from './RDCapabilityDetail';

export default function RDCapabilityCardsGrid() {
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  const handleCardClick = (capabilityId: string) => {
    setActiveCapability(activeCapability === capabilityId ? null : capabilityId);
  };

  const activeCapabilityData = activeCapability 
    ? RD_CAPABILITIES.find(c => c.id === activeCapability)
    : null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Platform Capabilities"
          subtitle="Six integrated capabilities supporting mechanism-aligned patient selection and proactive pharmacovigilance"
        />

        {/* Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-12">
          {RD_CAPABILITIES.map((capability, index) => (
            <RDCapabilityCardComponent
              key={capability.id}
              capability={capability}
              isActive={activeCapability === capability.id}
              onClick={() => handleCardClick(capability.id)}
              index={index}
            />
          ))}
        </div>

        {/* Active Capability Detail View */}
        {activeCapabilityData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <RDCapabilityDetail capability={activeCapabilityData} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
