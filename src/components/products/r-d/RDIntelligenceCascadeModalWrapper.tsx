'use client';

import React from 'react';
import IntelligenceCascadeModal, { CascadeTab } from '@/components/products/shared/IntelligenceCascadeModal';
import { rdCascadePhases } from '@/data/products/rd-cascade-data';
import { Target, Zap, Shield, FileText } from 'lucide-react';

interface RDIntelligenceCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

export default function RDIntelligenceCascadeModalWrapper({
  isOpen,
  onClose,
  projectId = 'RD-001'
}: RDIntelligenceCascadeModalProps) {
  // Create tabs with JSX content (generated in component, not data file)
  const tabs: CascadeTab[] = [
    {
      id: 'target',
      label: 'Target Discovery',
      icon: Target,
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Target Discovery & Validation</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-3">
              {rdCascadePhases[0].insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'design',
      label: 'Lead Design',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Therapeutic Design & Generation</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-3">
              {rdCascadePhases[1].insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'validation',
      label: 'Structural Validation',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Structural Validation</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-3">
              {rdCascadePhases[2].insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ind',
      label: 'IND Package',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">IND Package Generation</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-3">
              {rdCascadePhases[3].insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <IntelligenceCascadeModal
      isOpen={isOpen}
      onClose={onClose}
      title="Intelligence Cascade"
      subtitle="Autonomous R&D orchestration"
      phases={rdCascadePhases}
      tabs={tabs}
      defaultTabId="target"
      entityId={projectId}
      headerGradient="from-blue-600 via-indigo-600 to-purple-600"
    />
  );
}

