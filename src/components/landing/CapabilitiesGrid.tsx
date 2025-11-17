'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CapabilityCard from './CapabilityCard';
import { CapabilityCard as CapabilityCardType } from '@/data/landing/landing-data';
import CardSlider from '@/components/shared/CardSlider';

interface CapabilitiesGridProps {
  capabilities: CapabilityCardType[];
}

const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ capabilities }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Our Capabilities</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Comprehensive in-silico tools for research oncology, from variant analysis to therapeutic guidance
          </p>
        </motion.div>

        {/* Capabilities Slider - Shows 3 cards at a time */}
        <CardSlider
          items={capabilities}
          renderCard={(capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
            />
          )}
          cardsToShow={3}
          showArrows={true}
          showDots={true}
          autoPlay={false}
        />
      </div>
    </section>
  );
};

export default CapabilitiesGrid;
