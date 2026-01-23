'use client';

import React, { useState } from 'react';
import { KeyCapability } from '@/data/coPilotDetails';
import KeyCapabilityDisplay from '../KeyCapabilityDisplay';
import { motion } from 'framer-motion';

interface CoreCapabilitiesSectionProps {
  keyCapabilities: KeyCapability[];
  totalCapabilities: number;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CoreCapabilitiesSection({ 
  keyCapabilities, 
  totalCapabilities 
}: CoreCapabilitiesSectionProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);

  if (!keyCapabilities || keyCapabilities.length === 0) {
    return null;
  }

  return (
    <motion.div 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16"
    >
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">Core Capabilities</h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          {totalCapabilities} AI-powered capabilities
        </p>
      </div>
      
      {/* Capability Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
        {keyCapabilities.map((cap, index) => (
          <button
            key={index}
            onClick={() => setActiveCapabilityTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCapabilityTab === index
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            {cap.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Capability Display */}
      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg">
        <KeyCapabilityDisplay capability={keyCapabilities[activeCapabilityTab]} />
      </div>
    </motion.div>
  );
}
