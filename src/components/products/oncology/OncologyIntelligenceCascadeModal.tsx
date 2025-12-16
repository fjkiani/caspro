'use client';

import React, { useEffect, useMemo } from 'react';
import IntelligenceCascadeModal, { CascadeTab } from '@/components/products/shared/IntelligenceCascadeModal';
import { oncologyCascadePhases } from '@/data/products/oncology-cascade-data';
import { Target, FlaskConical, Stethoscope, FileText } from 'lucide-react';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import SPEFusion from '@/components/dossier/SPEFusion';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';
import { useOncologyAgents } from '@/contexts/OncologyAgentContext';

interface OncologyIntelligenceCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

export default function OncologyIntelligenceCascadeModal({
  isOpen,
  onClose,
  patientId = 'AK'
}: OncologyIntelligenceCascadeModalProps) {
  // Get agent context - single source of truth
  const {
    dataStore,
    currentPhase,
    completedPhases,
    isPlaying,
    isComplete,
    processingTime,
    startCascade,
    pauseCascade,
    resetCascade,
    getDataForTab
  } = useOncologyAgents();

  // Start cascade when modal opens
  useEffect(() => {
    if (isOpen) {
      // Delay start slightly for better UX
      const timer = setTimeout(() => {
        startCascade();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      resetCascade();
    }
  }, [isOpen, startCascade, resetCascade]);

  // Create tabs with data from context - reactive to agent progress
  const tabs: CascadeTab[] = useMemo(() => [
    {
      id: 'molecular',
      label: 'Molecular Profile',
      icon: Target,
      content: <SAEIntelligence {...getDataForTab('molecular')} />
    },
    {
      id: 'therapeutic',
      label: 'Therapeutic Options',
      icon: FlaskConical,
      content: <SPEFusion {...getDataForTab('therapeutic')} />
    },
    {
      id: 'trials',
      label: 'Clinical Trials',
      icon: Stethoscope,
      content: <ClinicalTrial {...getDataForTab('trials')} />
    },
    {
      id: 'care',
      label: 'Care Plan',
      icon: FileText,
      content: <ExecutiveSummary {...getDataForTab('care')} />
    }
  ], [getDataForTab]);

  return (
    <IntelligenceCascadeModal
      isOpen={isOpen}
      onClose={onClose}
      title="Intelligence Cascade"
      subtitle="Autonomous oncology orchestration"
      phases={oncologyCascadePhases}
      tabs={tabs}
      defaultTabId="molecular"
      entityId={patientId}
      headerGradient="from-blue-600 via-purple-600 to-indigo-600"
      externalState={{
        currentPhase,
        completedPhases,
        isPlaying,
        isComplete,
        processingTime,
        onPlay: startCascade,
        onPause: pauseCascade,
        onReset: resetCascade
      }}
    />
  );
}

