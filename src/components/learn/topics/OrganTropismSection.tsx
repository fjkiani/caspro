'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Bone, Heart, Activity, Zap, MapPin } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { organTropism } from '@/data/learn/oncology-101/metastasis-data';

const OrganIcon = ({ organ }: { organ: string }) => {
  switch (organ.toLowerCase()) {
    case 'brain': return <Brain className="w-6 h-6" />;
    case 'bone': return <Bone className="w-6 h-6" />;
    case 'liver': return <Activity className="w-6 h-6" />;
    case 'lung': return <Zap className="w-6 h-6" />;
    case 'heart': return <Heart className="w-6 h-6" />;
    default: return <MapPin className="w-6 h-6" />;
  }
};

const CancerTypeCard = ({ cancer, isSelected, onClick, delay = 0 }: {
  cancer: any;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.div
    className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'border-blue-500 bg-blue-50 shadow-lg'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{cancer.primaryCancer}</h3>
    <div className="flex flex-wrap gap-2 mb-3">
      {cancer.commonMetastaticSites.slice(0, 3).map((site: string, index: number) => (
        <div key={index} className="flex items-center space-x-1 text-sm text-slate-600">
          <OrganIcon organ={site} />
          <span>{site}</span>
        </div>
      ))}
    </div>
    <p className="text-sm text-slate-500">{cancer.survivalImpact}</p>
  </motion.div>
);

const MetastasisMap = ({ selectedCancer }: { selectedCancer: any }) => {
  if (!selectedCancer) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-slate-500">Select a cancer type to see its metastatic pattern</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      key={selectedCancer.primaryCancer}
    >
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        {selectedCancer.primaryCancer} Metastatic Pattern
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Metastatic Sites */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Common Metastatic Sites</h4>
          <div className="space-y-3">
            {selectedCancer.commonMetastaticSites.map((site: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <OrganIcon organ={site} />
                <span className="font-medium text-slate-900">{site}</span>
                <span className="text-sm text-slate-500 ml-auto">
                  Rank #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mechanisms */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Key Mechanisms</h4>
          <div className="space-y-3">
            {selectedCancer.mechanisms.map((mechanism: string, index: number) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-slate-900">{mechanism}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Survival Impact */}
      <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
        <h4 className="font-semibold text-red-800 mb-2">Clinical Impact</h4>
        <p className="text-red-700">{selectedCancer.survivalImpact}</p>
      </div>
    </motion.div>
  );
};

const SeedAndSoilVisualization = () => {
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const examples = [
    {
      id: 'breast-bone',
      seed: 'Breast Cancer Cells',
      soil: 'Bone Microenvironment',
      compatibility: 'High',
      mechanism: 'CXCR4/CXCL12 signaling pathway',
      outcome: 'Successful colonization'
    },
    {
      id: 'lung-brain',
      seed: 'Lung Cancer Cells',
      soil: 'Brain Microenvironment',
      compatibility: 'Moderate',
      mechanism: 'Blood-brain barrier disruption',
      outcome: 'Frequent metastasis'
    },
    {
      id: 'colon-liver',
      seed: 'Colorectal Cancer Cells',
      soil: 'Liver Microenvironment',
      compatibility: 'High',
      mechanism: 'Portal circulation route',
      outcome: 'Most common pattern'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Paget's "Seed and Soil" Hypothesis in Action
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {examples.map((example) => (
          <div
            key={example.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              activeExample === example.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setActiveExample(activeExample === example.id ? null : example.id)}
          >
            <div className="text-center">
              <div className="text-sm font-medium text-slate-900 mb-1">{example.seed}</div>
              <div className="text-xs text-slate-500 mb-2">↓</div>
              <div className="text-sm font-medium text-slate-900">{example.soil}</div>
              <div className={`text-xs mt-2 px-2 py-1 rounded ${
                example.compatibility === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {example.compatibility} Compatibility
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeExample && (
        <motion.div
          className="p-4 bg-slate-50 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {(() => {
            const example = examples.find(e => e.id === activeExample);
            return example ? (
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Mechanism</h4>
                <p className="text-slate-700 mb-2">{example.mechanism}</p>
                <h4 className="font-semibold text-slate-900 mb-2">Clinical Outcome</h4>
                <p className="text-slate-700">{example.outcome}</p>
              </div>
            ) : null;
          })()}
        </motion.div>
      )}
    </div>
  );
};

const OrganTropismSection: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState<any>(null);

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Organ-Specific Metastasis: The Seed and Soil Principle"
        subtitle="Understanding why different cancers prefer specific metastatic sites"
        color="green"
      />

      {/* Introduction */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Why Don't All Cancers Metastasize Everywhere?
        </h3>
        <p className="text-slate-700 mb-4">
          In 1889, Stephen Paget observed that breast cancer metastases were not randomly distributed 
          throughout the body but showed clear preferences for certain organs. He proposed the "seed and soil" 
          hypothesis: cancer cells (the "seed") can only successfully grow in compatible organ environments (the "soil").
        </p>
        <p className="text-slate-700">
          This fundamental principle explains the predictable patterns of metastatic spread we observe 
          clinically and has profound implications for surveillance, prevention, and treatment strategies.
        </p>
      </div>

      {/* Interactive Cancer Selection */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Explore Metastatic Patterns by Cancer Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {organTropism.map((cancer, index) => (
            <CancerTypeCard
              key={cancer.primaryCancer}
              cancer={cancer}
              isSelected={selectedCancer?.primaryCancer === cancer.primaryCancer}
              onClick={() => setSelectedCancer(
                selectedCancer?.primaryCancer === cancer.primaryCancer ? null : cancer
              )}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <MetastasisMap selectedCancer={selectedCancer} />
      </div>

      {/* Seed and Soil Visualization */}
      <SeedAndSoilVisualization />

      {/* Clinical Implications */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Clinical Implications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Surveillance Strategies</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Targeted imaging of high-risk organs
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Biomarker monitoring for specific sites
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Risk-stratified follow-up protocols
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Therapeutic Approaches</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Site-specific prevention strategies
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Organ-targeted drug delivery
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Microenvironment modification
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganTropismSection; 