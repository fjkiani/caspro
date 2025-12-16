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
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Transform Drug Development from <span className="text-red-600">Gambling</span> to <span className="text-green-600">Engineering</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Six core capabilities that eliminate the $2.6B gamble: from clinical decision support to therapeutic design, all powered by transparent AI with complete audit trails.
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
