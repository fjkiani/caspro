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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-6"></div>
        <p className="text-slate-300 max-w-2xl mx-auto">
          {totalCapabilities} advanced AI-powered capabilities designed to transform your workflow
        </p>
      </div>
      
      {/* Capability Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {keyCapabilities.map((cap, index) => (
          <button
            key={index}
            onClick={() => setActiveCapabilityTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCapabilityTab === index
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cap.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Capability Display */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600">
        <KeyCapabilityDisplay capability={keyCapabilities[activeCapabilityTab]} />
      </div>
    </motion.div>
  );
}
