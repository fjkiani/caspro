'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CapabilityCard from './CapabilityCard';
import { CapabilityCard as CapabilityCardType } from '@/data/landing/landing-data';

interface CapabilitiesGridProps {
  capabilities: CapabilityCardType[];
}

const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ capabilities }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive in-silico tools for research oncology, from variant analysis to therapeutic guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesGrid;
