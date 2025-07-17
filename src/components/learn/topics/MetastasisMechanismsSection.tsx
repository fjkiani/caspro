'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Shield, Zap, Target, Activity } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { metastasisMechanisms } from '@/data/learn/oncology-101/metastasis-data';

const MechanismCard = ({ mechanism, isExpanded, onToggle, delay = 0 }: {
  mechanism: any;
  isExpanded: boolean;
  onToggle: () => void;
  delay?: number;
}) => {
  const getIcon = (mechanismId: string) => {
    switch (mechanismId) {
      case 'emt-mechanism': return Activity;
      case 'angiogenesis-mechanism': return Zap;
      case 'immune-evasion': return Shield;
      case 'dormancy-mechanism': return Target;
      default: return Activity;
    }
  };

  const getColor = (mechanismId: string) => {
    switch (mechanismId) {
      case 'emt-mechanism': return 'text-orange-500';
      case 'angiogenesis-mechanism': return 'text-red-500';
      case 'immune-evasion': return 'text-blue-500';
      case 'dormancy-mechanism': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getBgColor = (mechanismId: string) => {
    switch (mechanismId) {
      case 'emt-mechanism': return 'from-orange-50 to-orange-100';
      case 'angiogenesis-mechanism': return 'from-red-50 to-red-100';
      case 'immune-evasion': return 'from-blue-50 to-blue-100';
      case 'dormancy-mechanism': return 'from-purple-50 to-purple-100';
      default: return 'from-gray-50 to-gray-100';
    }
  };

  const Icon = getIcon(mechanism.id);

  return (
    <motion.div
      className={`bg-gradient-to-r ${getBgColor(mechanism.id)} rounded-lg shadow-lg border border-gray-200 overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon className={`w-8 h-8 ${getColor(mechanism.id)}`} />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{mechanism.name}</h3>
              <p className="text-slate-600 mt-1">{mechanism.description}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="px-6 pb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Key Factors</h4>
              <div className="flex flex-wrap gap-2">
                {mechanism.keyFactors.map((factor: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border border-slate-200"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Clinical Relevance</h4>
              <p className="text-slate-700 text-sm">{mechanism.clinicalRelevance}</p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Therapeutic Targets</h4>
              <div className="flex flex-wrap gap-2">
                {mechanism.therapeuticTargets.map((target: string, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 ${getColor(mechanism.id)} bg-white rounded-full text-sm border-2 border-current`}
                  >
                    {target}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const InteractivePathway = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const pathwaySteps = [
    { id: 'emt', name: 'EMT', description: 'Loss of adhesion, gain of mobility', color: 'orange' },
    { id: 'invasion', name: 'Invasion', description: 'Local tissue penetration', color: 'red' },
    { id: 'angiogenesis', name: 'Angiogenesis', description: 'Blood vessel formation', color: 'blue' },
    { id: 'immune', name: 'Immune Evasion', description: 'Avoiding immune detection', color: 'purple' }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Interactive Pathway Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pathwaySteps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedStep === step.id
                ? `border-${step.color}-500 bg-${step.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
          >
            <h4 className="font-semibold text-slate-900 mb-1">{step.name}</h4>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
      {selectedStep && (
        <motion.div
          className="mt-6 p-4 bg-slate-50 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-slate-700">
            Detailed information about {pathwaySteps.find(s => s.id === selectedStep)?.name} would appear here 
            with molecular details, clinical implications, and therapeutic approaches.
          </p>
        </motion.div>
      )}
    </div>
  );
};

const MetastasisMechanismsSection: React.FC = () => {
  const [expandedMechanisms, setExpandedMechanisms] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleMechanism = (mechanismId: string) => {
    const newExpanded = new Set(expandedMechanisms);
    if (newExpanded.has(mechanismId)) {
      newExpanded.delete(mechanismId);
    } else {
      newExpanded.add(mechanismId);
    }
    setExpandedMechanisms(newExpanded);
  };

  const toggleAll = () => {
    if (showAll) {
      setExpandedMechanisms(new Set());
    } else {
      setExpandedMechanisms(new Set(metastasisMechanisms.map(m => m.id)));
    }
    setShowAll(!showAll);
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Molecular Mechanisms of Metastasis"
        subtitle="Understanding the key biological processes that enable cancer spread"
        color="blue"
      />

      {/* Interactive Overview */}
      <InteractivePathway />

      {/* Control Buttons */}
      <div className="text-center">
        <button
          onClick={toggleAll}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          {showAll ? 'Collapse All Details' : 'Expand All Details'}
        </button>
      </div>

      {/* Mechanism Cards */}
      <div className="space-y-6">
        {metastasisMechanisms.map((mechanism, index) => (
          <MechanismCard
            key={mechanism.id}
            mechanism={mechanism}
            isExpanded={expandedMechanisms.has(mechanism.id)}
            onToggle={() => toggleMechanism(mechanism.id)}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Integration and Clinical Implications</h3>
        <div className="space-y-4 text-slate-700">
          <p>
            These mechanisms don't operate in isolation but work together in complex networks. 
            Understanding their interactions is crucial for developing effective therapeutic strategies.
          </p>
          <p>
            Each mechanism represents both a vulnerability that cancer exploits and an opportunity 
            for therapeutic intervention. The challenge lies in targeting these processes without 
            disrupting normal cellular functions.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 font-medium">
              Key Insight: Successful metastasis requires coordination of multiple mechanisms, 
              suggesting that combination therapies targeting several pathways simultaneously 
              may be more effective than single-agent approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetastasisMechanismsSection; 