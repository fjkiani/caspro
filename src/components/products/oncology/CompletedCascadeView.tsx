'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Dna, Pill, Search, FileText } from 'lucide-react';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';
import SPEFusion from '@/components/dossier/SPEFusion';
import { useOncologyAgents } from '@/contexts/OncologyAgentContext';

interface CompletedCascadeViewProps {
  triggerAnimation?: boolean;
}

export default function CompletedCascadeView({ triggerAnimation }: CompletedCascadeViewProps) {
  const [activeTab, setActiveTab] = useState('molecular-profile');
  
  // Get data from agent context - reactive to agent progress
  const { dataStore, completedPhases, getDataForTab } = useOncologyAgents();

  // Auto-switch tabs based on agent progress
  useEffect(() => {
    if (completedPhases.has(0)) setActiveTab('molecular-profile'); // Data extraction + biomarker
    if (completedPhases.has(3)) setActiveTab('therapeutic-options'); // Drug ranking
    if (completedPhases.has(4)) setActiveTab('clinical-trials'); // Trial matching
    if (completedPhases.has(6)) setActiveTab('care-plan'); // Care plan generation
  }, [completedPhases]);

  // Create tabs with data from context - reactive updates
  const tabs = useMemo(() => [
    {
      id: 'molecular-profile',
      label: 'Molecular Profile',
      icon: Dna,
      component: SAEIntelligence,
      props: getDataForTab('molecular')
    },
    {
      id: 'therapeutic-options',
      label: 'Therapeutic Options',
      icon: Pill,
      component: SPEFusion,
      props: getDataForTab('therapeutic')
    },
    {
      id: 'clinical-trials',
      label: 'Clinical Trials',
      icon: Search,
      component: ClinicalTrial,
      props: getDataForTab('trials')
    },
    {
      id: 'care-plan',
      label: 'Care Plan',
      icon: FileText,
      component: ExecutiveSummary,
      props: getDataForTab('care')
    }
  ], [getDataForTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const hasData = completedPhases.size > 0; // Show tabs only when data is available

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={!hasData}
              className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : hasData
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-300 cursor-not-allowed'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              {hasData && completedPhases.has(
                tab.id === 'molecular-profile' ? 0 :
                tab.id === 'therapeutic-options' ? 3 :
                tab.id === 'clinical-trials' ? 4 :
                6
              ) && <span className="ml-2 text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content - Reactive to agent progress */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        {(() => {
          const activeTabData = tabs.find(tab => tab.id === activeTab);
          if (!activeTabData) {
            return (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">Waiting for agent processing...</div>
              </div>
            );
          }

          const Component = activeTabData.component;
          return <Component {...activeTabData.props} />;
        })()}
      </motion.div>
    </div>
  );
}
