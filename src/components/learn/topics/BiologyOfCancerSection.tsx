'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import { biologyConcepts, pathToMalignancy } from '@/data/learn/oncology-101/biology-concepts';

const PathStep: React.FC<{ step: number; name: string; description: string; index: number }> = ({ 
  step, name, description, index 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg"
  >
    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
      {step}
    </div>
    <div>
      <h4 className="font-semibold text-slate-800">{name}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </motion.div>
);

const BiologyOfCancerSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Part 1: Defining the Enemy - The Biology of Cancer"
        subtitle="Understanding the fundamental nature of cancer, its classification, and progression"
      />

      {/* Core Concepts and Classification */}
      {biologyConcepts.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">{section.title}</h3>
            <p className="text-slate-600">{section.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {section.items.map((concept, index) => (
              <ConceptCard
                key={index}
                term={concept.term}
                definition={concept.definition}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Path to Malignancy */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">1.3 The Path to Malignancy</h3>
          <p className="text-slate-600">The progression from normal cells to invasive cancer</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="space-y-4">
            {pathToMalignancy.map((step, index) => (
              <PathStep
                key={index}
                step={step.step}
                name={step.name}
                description={step.description}
                index={index}
              />
            ))}
          </div>
          
          {/* Visual Arrow Flow */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-sm">Normal Cells</span>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-slate-300 rounded-full"></div>
                ))}
              </div>
              <span className="text-sm">→</span>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-red-500 rounded-full"></div>
                ))}
              </div>
              <span className="text-sm">Invasive Cancer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiologyOfCancerSection; 