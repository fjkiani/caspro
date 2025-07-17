'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Target } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import { tumorMicroenvironmentData } from '@/data/learn/oncology-101/metastasis-data';

// Reusable Component Grid - can be used for any categorized content
const ComponentGrid = ({ components, title, subtitle }: {
  components: any[];
  title: string;
  subtitle?: string;
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-slate-800 mb-2">{title}</h3>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((component, index) => (
        <ConceptCard
          key={component.id}
          title={component.name}
          description={`
            <strong>Role:</strong> ${component.role}<br/><br/>
            <strong>Key Characteristics:</strong><br/>
            ${component.characteristics.map((char: string) => `• ${char}`).join('<br/>')}
          `}
          color={component.color}
          index={index}
        />
      ))}
    </div>
  </div>
);

// Reusable Comparison Component - can be used for any A vs B comparison
const ComparisonSection = ({ comparison }: { comparison: any }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{comparison.title}</h3>
    <p className="text-slate-600 mb-6">{comparison.description}</p>
    
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        className={`p-6 rounded-lg border-2 border-${comparison.m1Macrophages.color}-200 bg-${comparison.m1Macrophages.color}-50`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-4">
          <div className={`w-4 h-4 rounded-full bg-${comparison.m1Macrophages.color}-500 mr-3`}></div>
          <h4 className="text-lg font-semibold text-slate-900">{comparison.m1Macrophages.name}</h4>
          <span className={`ml-auto px-3 py-1 text-sm rounded-full bg-${comparison.m1Macrophages.color}-100 text-${comparison.m1Macrophages.color}-800`}>
            {comparison.m1Macrophages.role}
          </span>
        </div>
        <ul className="space-y-2">
          {comparison.m1Macrophages.characteristics.map((char: string, index: number) => (
            <li key={index} className="flex items-center text-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              {char}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className={`p-6 rounded-lg border-2 border-${comparison.m2Macrophages.color}-200 bg-${comparison.m2Macrophages.color}-50`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <div className={`w-4 h-4 rounded-full bg-${comparison.m2Macrophages.color}-500 mr-3`}></div>
          <h4 className="text-lg font-semibold text-slate-900">{comparison.m2Macrophages.name}</h4>
          <span className={`ml-auto px-3 py-1 text-sm rounded-full bg-${comparison.m2Macrophages.color}-100 text-${comparison.m2Macrophages.color}-800`}>
            {comparison.m2Macrophages.role}
          </span>
        </div>
        <ul className="space-y-2">
          {comparison.m2Macrophages.characteristics.map((char: string, index: number) => (
            <li key={index} className="flex items-center text-slate-700">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              {char}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </div>
);

// Reusable Category List - can be used for any categorized information
const CategoryList = ({ moleculeData }: { moleculeData: any }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{moleculeData.title}</h3>
    <p className="text-slate-600 mb-6">{moleculeData.description}</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {moleculeData.categories.map((category: any, index: number) => (
        <motion.div
          key={category.name}
          className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h4 className="font-semibold text-slate-900 mb-2">{category.name}</h4>
          <p className="text-sm text-slate-600 mb-3">{category.effects}</p>
          <div className="flex flex-wrap gap-2">
            {category.examples.map((example: string) => (
              <span
                key={example}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {example}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const TumorMicroenvironmentSection: React.FC = () => {
  const { introduction, microenvironmentComponents, macrophagePolarization, secretedMolecules } = tumorMicroenvironmentData;

  return (
    <div className="space-y-12">
      <SectionHeader
        title={introduction.title}
        subtitle={introduction.description}
        color="purple"
      />

      {/* Introduction with Key Points */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold text-slate-900">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {introduction.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Target className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Microenvironment Components - Using Reusable ComponentGrid */}
      <ComponentGrid
        components={microenvironmentComponents}
        title="Components of the Tumor Microenvironment"
        subtitle="Each cell type plays a unique role in tumor progression"
      />

      {/* Macrophage Polarization - Using Reusable ComparisonSection */}
      <ComparisonSection comparison={macrophagePolarization} />

      {/* Secreted Molecules - Using Reusable CategoryList */}
      <CategoryList moleculeData={secretedMolecules} />

      {/* Summary */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center mb-4">
          <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold text-purple-800">Clinical Implications</h3>
        </div>
        <div className="space-y-4 text-slate-700">
          <p>
            Understanding the tumor microenvironment has revolutionized cancer treatment approaches. 
            Rather than targeting cancer cells alone, modern therapies increasingly focus on 
            disrupting the supportive ecosystem that enables tumor growth and metastasis.
          </p>
          <div className="bg-white/70 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-purple-800 font-medium">
              <strong>Therapeutic Insight:</strong> The tumor microenvironment represents a rich 
              source of therapeutic targets, from anti-angiogenic drugs to immunotherapies that 
              reprogram the immune landscape.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TumorMicroenvironmentSection; 