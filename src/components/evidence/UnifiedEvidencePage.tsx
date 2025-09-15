'use client';

import React from 'react';
import TabbedInterface, { type TabItem } from '@/components/shared/TabbedInterface';
import { 
  Shield, 
  Layers, 
  Database, 
  Brain, 
  Users, 
  BookOpen
} from 'lucide-react';

// Import all interactive components - THESE ARE CRITICAL!
import {
  EvidenceIntelligenceSimulator,
  SPEFusionPlayground,
  DataLabExplorer,
  CohortContextSimulator
} from './interactive';

// Import existing SAE components
import {
  SAEFeatureVisualization,
  SAEAttributionCard,
  SAESafetyChecker,
  SAESteeringPanel
} from '@/components/evidence';

// Import our data-driven architecture
import { 
  evidenceSectionsRegistry, 
  evidenceTabsConfig, 
  evidenceOverviewData 
} from '@/data/evidence/registry';

// Import the renderer component
import EvidenceSectionRenderer from './EvidenceSectionRenderer';

const UnifiedEvidencePage: React.FC = () => {
  // Create tabs using our data-driven config
  const tabs: TabItem[] = [
    // Overview tab
    {
      id: 'overview',
      label: 'Evidence Overview',
      icon: Shield,
      content: <EvidenceSectionRenderer data={evidenceOverviewData} />
    },
    // Evidence Intelligence tab
    {
      id: 'evidence-intelligence',
      label: 'Evidence Intelligence',
      icon: BookOpen,
      content: <EvidenceSectionRenderer data={evidenceSectionsRegistry['evidence-intelligence']} />
    },
    // S/P/E Fusion tab
    {
      id: 'spe-fusion',
      label: 'S/P/E Fusion',
      icon: Layers,
      content: <EvidenceSectionRenderer data={evidenceSectionsRegistry['spe-fusion']} />
    },
    // Data Lab tab
    {
      id: 'data-lab',
      label: 'Data Lab',
      icon: Database,
      content: <EvidenceSectionRenderer data={evidenceSectionsRegistry['data-lab']} />
    },
    // SAE Intelligence tab
    {
      id: 'sae-intelligence',
      label: 'SAE Intelligence',
      icon: Brain,
      content: <EvidenceSectionRenderer data={evidenceSectionsRegistry['sae-intelligence']} />
    },
    // Cohort Context tab
    {
      id: 'cohort-context',
      label: 'Cohort Context',
      icon: Users,
      content: <EvidenceSectionRenderer data={evidenceSectionsRegistry['cohort-context']} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <TabbedInterface
        title="Evidence Intelligence Platform"
        subtitle="Transform raw findings into structured, actionable evidence"
        tabs={tabs}
        sidebarTitle="Evidence Intelligence"
        sidebarSubtitle="Explore our interconnected AI platform"
      />
    </div>
  );
};

export default UnifiedEvidencePage;