'use client';

import React, { useState } from 'react';
import { ValuePropositionSection as ValuePropositionSectionType } from '@/data/coPilotDetails';
import ValuePropositionItem from '../ValuePropositionItem';
import { motion } from 'framer-motion';

interface ValuePropositionSectionProps {
  valuePropositionSections: ValuePropositionSectionType[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ValuePropositionSection({ 
  valuePropositionSections 
}: ValuePropositionSectionProps) {
  const [activeValueTab, setActiveValueTab] = useState(0);

  if (!valuePropositionSections || valuePropositionSections.length === 0) {
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
        <h2 className="text-4xl font-bold text-white mb-4">Value Proposition</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"></div>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Tailored benefits for different stakeholders in the precision medicine ecosystem
        </p>
      </div>

      {/* Value Proposition Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {valuePropositionSections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveValueTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeValueTab === index
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {section.audience}
          </button>
        ))}
      </div>

      {/* Active Value Proposition Display */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600">
        <ValuePropositionItem 
          valueProposition={valuePropositionSections[activeValueTab]}
        />
      </div>
    </motion.div>
  );
}
