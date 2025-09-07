'use client';

import React, { useState } from 'react';
import { KeyCapability } from '@/data/coPilotDetails';
import FeatureHighlight from './shared/FeatureHighlight';
import IconSelector from './shared/IconSelector';
import MarkdownText from './shared/MarkdownText';
import { Settings, Microscope, Briefcase, Brain } from 'lucide-react';

interface TacticalCapabilityMatrixProps {
  keyCapabilities: KeyCapability[];
}

export default function TacticalCapabilityMatrix({ keyCapabilities }: TacticalCapabilityMatrixProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);

  if (!keyCapabilities || keyCapabilities.length === 0) {
    return null;
  }

  const activeCapability = keyCapabilities[activeCapabilityTab];

  return (
    <div className="mb-16">
      {/* Capability Tabs */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-8">Tactical Capability Matrix</h3>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {keyCapabilities.map((cap, index) => (
            <button
              key={index}
              onClick={() => setActiveCapabilityTab(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCapabilityTab === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <IconSelector title={cap.title} size={16} />
              {cap.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Capability Display */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg mb-16">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
              {activeCapabilityTab + 1}
            </span>
            <div className="flex items-center gap-3">
              <IconSelector title={activeCapability.title} />
              <h4 className="text-2xl font-bold text-slate-800">{activeCapability.title}</h4>
            </div>
          </div>
        </div>

        {/* Capability Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FeatureHighlight 
            icon={<Settings size={48} className="text-blue-400" />}
            title="Technical Approach"
            description={activeCapability.technical}
          />
          
          <FeatureHighlight 
            icon={<Microscope size={48} className="text-teal-400" />}
            title="Scientific Impact"
            description={activeCapability.scientific}
          />
          
          <FeatureHighlight 
            icon={<Briefcase size={48} className="text-indigo-400" />}
            title="Business Value"
            description={activeCapability.business}
          />
        </div>
        
        {/* Genomic Use Cases Integration */}
        {activeCapability.genomicUseCasesParagraph && (
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={20} className="text-pink-600" />
              <h5 className="font-semibold text-pink-600">Genomic Use Cases Integration</h5>
            </div>
            <MarkdownText 
              text={activeCapability.genomicUseCasesParagraph}
              className="text-slate-700 text-sm leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
