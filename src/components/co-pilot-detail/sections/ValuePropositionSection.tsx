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
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">Value Proposition</h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          Tailored benefits for different stakeholders in the precision medicine ecosystem
        </p>
      </div>

      {/* Value Proposition Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
        {valuePropositionSections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveValueTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeValueTab === index
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            {section.audience}
          </button>
        ))}
      </div>

      {/* Active Value Proposition Display */}
      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg">
        <ValuePropositionItem 
          valueProposition={valuePropositionSections[activeValueTab]}
        />
      </div>
    </motion.div>
  );
}
