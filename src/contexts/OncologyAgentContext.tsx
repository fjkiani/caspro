'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { oncologyCascadePhases } from '@/data/products/oncology-cascade-data';

/**
 * Agent State Interface
 * Each agent corresponds to a cascade phase
 */
export interface AgentState {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'complete';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  insights: string[];
  outputData?: any; // Phase-specific output data
}

/**
 * Unified Oncology Data Store
 * All components read from this single source of truth
 */
export interface OncologyDataStore {
  // Molecular Profile Data
  molecular: {
    biomarkers?: {
      tmb?: { value: number; status: string; confidence: number };
      msi?: { status: string; confidence: number };
      hrd?: { score: number; status: string; confidence: number };
      ioEligibility?: { status: string; reason?: string };
    };
    resistance?: {
      kras?: { mutation: string; resistance: string; confidence: number };
      pik3ca?: { mutation: string; pathway: string; confidence: number };
      platinum?: { sensitivity: number; status: string };
      mapk?: { status: string; prognosis: string };
    };
    variants?: Array<{
      name: string;
      impact: string;
      confidence: number;
    }>;
  };
  
  // Therapeutic Options Data
  therapeutic: {
    drugRankings?: Array<{
      name: string;
      type: string;
      confidence: number;
      tier: string;
      mechanism?: string;
    }>;
  };
  
  // Clinical Trials Data
  trials: {
    matches?: Array<{
      nct: string;
      title: string;
      fit: number;
      status?: string;
    }>;
    summary?: {
      totalMatches: number;
      highFit: number;
      within50Miles: number;
    };
  };
  
  // Care Plan Data
  carePlan: {
    patient?: string;
    diagnosis?: string;
    stage?: string;
    recommendedTherapy?: string;
    monitoring?: Record<string, string>;
    nutrition?: string;
    clinicalTrials?: string;
    nextSteps?: string;
  };
  
  // Live Insights Stream
  insights: Array<{
    id: string;
    text: string;
    timestamp: Date;
    type: 'mutation' | 'prediction' | 'trial' | 'nutrition' | 'care';
    agent: string;
  }>;
}

/**
 * Agent Context Interface
 */
interface OncologyAgentContextType {
  // Agent States
  agents: Record<string, AgentState>;
  getAgentStatus: (agentId: string) => AgentState | undefined;
  
  // Unified Data Store
  dataStore: OncologyDataStore;
  
  // Cascade Control
  currentPhase: number;
  completedPhases: Set<number>;
  isPlaying: boolean;
  isComplete: boolean;
  processingTime: number;
  
  // Control Methods
  startCascade: () => void;
  pauseCascade: () => void;
  resetCascade: () => void;
  completePhase: (phaseIndex: number, outputData?: any) => void;
  
  // Data Access
  getDataForTab: (tabId: string) => any;
  getAllInsights: () => OncologyDataStore['insights'];
}

const OncologyAgentContext = createContext<OncologyAgentContextType | undefined>(undefined);

/**
 * Data Transformation Layer
 * Converts cascade phase outputs into structured data for components
 */
function transformPhaseToData(phaseId: string, phaseOutput: any): Partial<OncologyDataStore> {
  switch (phaseId) {
    case 'data-extraction':
      return {
        molecular: {
          variants: phaseOutput?.variants || []
        }
      };
    
    case 'biomarker-calculation':
      return {
        molecular: {
          biomarkers: {
            tmb: phaseOutput?.tmb || { value: 12.3, status: 'TMB-High', confidence: 0.967 },
            msi: phaseOutput?.msi || { status: 'MSS', confidence: 0.942 },
            hrd: phaseOutput?.hrd || { score: 42, status: 'Suggestive', confidence: 0.823 },
            ioEligibility: phaseOutput?.ioEligibility || { status: 'Candidate', reason: 'TMB-High' }
          },
          resistance: phaseOutput?.resistance || {
            kras: { mutation: 'G12D', resistance: 'EGFR', confidence: 0.891 },
            pik3ca: { mutation: 'H1047R', pathway: 'mTOR', confidence: 0.734 },
            platinum: { sensitivity: 78, status: 'Favorable' },
            mapk: { status: 'Wild-type', prognosis: 'Good' }
          }
        }
      };
    
    case 'drug-ranking':
      return {
        therapeutic: {
          drugRankings: phaseOutput?.drugRankings || [
            { name: 'Olaparib', type: 'PARP', confidence: 0.94, tier: 'I', mechanism: 'DDR targeting' },
            { name: 'Carboplatin', type: 'Platinum', confidence: 0.88, tier: 'I', mechanism: 'DNA cross-linking' },
            { name: 'Niraparib', type: 'PARP', confidence: 0.91, tier: 'I', mechanism: 'DDR targeting' }
          ]
        }
      };
    
    case 'trial-matching':
      return {
        trials: {
          matches: phaseOutput?.matches || [
            { nct: 'NCT05678901', title: 'PARP + ATR in DDR Deficient OC', fit: 0.94, status: 'Recruiting' },
            { nct: 'NCT04729387', title: 'Olaparib + Cediranib', fit: 0.88, status: 'Recruiting' }
          ],
          summary: phaseOutput?.summary || { totalMatches: 3, highFit: 2, within50Miles: 2 }
        }
      };
    
    case 'care-plan-generation':
      return {
        carePlan: phaseOutput?.carePlan || {
          patient: 'AK',
          diagnosis: 'High-grade serous ovarian carcinoma',
          stage: 'IIIC',
          recommendedTherapy: 'PARP inhibitor + platinum doublet',
          monitoring: {
            'CA-125': 'q3weeks',
            'ctDNA': 'q6weeks',
            'NGS re-evaluation': 'At progression',
            'Imaging': 'q12weeks'
          },
          nutrition: 'Toxicity-aware nutrition plan: NAC 600mg, Vitamin D 2000 IU, curcumin 500mg BID',
          clinicalTrials: '3 matching clinical trials found with 94%+ mechanism fit',
          nextSteps: 'Tumor board review recommended for same-day decision making'
        }
      };
    
    default:
      return {};
  }
}

/**
 * Oncology Agent Provider
 * Centralized agent orchestration and data management
 */
export function OncologyAgentProvider({ children, patientId = 'AK' }: { children: ReactNode; patientId?: string }) {
  // Initialize agents from cascade phases
  const [agents, setAgents] = useState<Record<string, AgentState>>(() => {
    const initialAgents: Record<string, AgentState> = {};
    oncologyCascadePhases.forEach((phase, index) => {
      initialAgents[phase.id] = {
        id: phase.id,
        name: phase.agent,
        status: 'idle',
        insights: phase.insights
      };
    });
    return initialAgents;
  });

  // Unified data store - single source of truth
  const [dataStore, setDataStore] = useState<OncologyDataStore>({
    molecular: {},
    therapeutic: {},
    trials: {},
    carePlan: {},
    insights: []
  });

  // Cascade control state
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);

  /**
   * Complete a phase and update agent state + data store
   */
  const completePhase = useCallback((phaseIndex: number, outputData?: any) => {
    const phase = oncologyCascadePhases[phaseIndex];
    if (!phase) return;

    const startTime = new Date();
    
    // Update agent status
    setAgents(prev => ({
      ...prev,
      [phase.id]: {
        ...prev[phase.id],
        status: 'complete',
        startTime,
        endTime: new Date(),
        duration: phase.duration,
        outputData
      }
    }));

    // Transform phase output to structured data
    const transformedData = transformPhaseToData(phase.id, outputData);

    // Merge into data store (progressive population)
    setDataStore(prev => ({
      ...prev,
      molecular: { ...prev.molecular, ...transformedData.molecular },
      therapeutic: { ...prev.therapeutic, ...transformedData.therapeutic },
      trials: { ...prev.trials, ...transformedData.trials },
      carePlan: { ...prev.carePlan, ...transformedData.carePlan },
      insights: [
        ...prev.insights,
        ...phase.insights.map((insight, idx) => ({
          id: `${phase.id}-${idx}`,
          text: insight,
          timestamp: new Date(),
          type: phase.id.includes('trial') ? 'trial' as const :
                phase.id.includes('nutrition') ? 'nutrition' as const :
                phase.id.includes('care') ? 'care' as const :
                phase.id.includes('resistance') ? 'prediction' as const :
                'mutation' as const,
          agent: phase.agent
        }))
      ]
    }));

    // Mark phase complete
    setCompletedPhases(prev => new Set([...prev, phaseIndex]));
  }, []);

  // Auto-progress cascade when playing
  useEffect(() => {
    if (!isPlaying || currentPhase >= oncologyCascadePhases.length || isComplete) return;

    const phase = oncologyCascadePhases[currentPhase];
    if (!phase) return;

    // Mark agent as processing
    setAgents(prev => ({
      ...prev,
      [phase.id]: {
        ...prev[phase.id],
        status: 'processing',
        startTime: new Date()
      }
    }));

    // Auto-switch to next phase after duration
    const timer = setTimeout(() => {
      completePhase(currentPhase);
      
      // Move to next phase
      const nextPhaseIndex = currentPhase + 1;
      setCurrentPhase(nextPhaseIndex);
      setProcessingTime(prev => prev + phase.duration);

      // Check if cascade is complete
      if (nextPhaseIndex >= oncologyCascadePhases.length) {
        setIsComplete(true);
        setIsPlaying(false);
      }
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase, isComplete, completePhase]);

  /**
   * Start cascade - activate first agent
   */
  const startCascade = useCallback(() => {
    setCurrentPhase(0);
    setCompletedPhases(new Set());
    setProcessingTime(0);
    setIsComplete(false);
    
    // Reset data store
    setDataStore({
      molecular: {},
      therapeutic: {},
      trials: {},
      carePlan: {},
      insights: []
    });

    // Reset all agents
    setAgents(prev => {
      const reset: Record<string, AgentState> = {};
      Object.keys(prev).forEach(id => {
        reset[id] = { ...prev[id], status: 'idle', startTime: undefined, endTime: undefined };
      });
      return reset;
    });

    // Start playing (which triggers auto-progression)
    setIsPlaying(true);
  }, []);

  /**
   * Pause cascade
   */
  const pauseCascade = useCallback(() => {
    setIsPlaying(false);
  }, []);

  /**
   * Reset cascade
   */
  const resetCascade = useCallback(() => {
    setIsPlaying(false);
    setCurrentPhase(0);
    setCompletedPhases(new Set());
    setProcessingTime(0);
    setIsComplete(false);
    
    // Reset data store
    setDataStore({
      molecular: {},
      therapeutic: {},
      trials: {},
      carePlan: {},
      insights: []
    });

    // Reset all agents
    setAgents(prev => {
      const reset: Record<string, AgentState> = {};
      Object.keys(prev).forEach(id => {
        reset[id] = { ...prev[id], status: 'idle' };
      });
      return reset;
    });
  }, []);

  /**
   * Get agent status
   */
  const getAgentStatus = useCallback((agentId: string) => {
    return agents[agentId];
  }, [agents]);

  /**
   * Get data for specific tab
   */
  const getDataForTab = useCallback((tabId: string) => {
    switch (tabId) {
      case 'molecular':
        return { data: dataStore.molecular };
      case 'therapeutic':
        return { data: dataStore.therapeutic };
      case 'trials':
        return { data: dataStore.trials };
      case 'care':
        return { data: { carePlan: dataStore.carePlan } };
      default:
        return { data: {} };
    }
  }, [dataStore]);

  /**
   * Get all insights
   */
  const getAllInsights = useCallback(() => {
    return dataStore.insights;
  }, [dataStore.insights]);

  return (
    <OncologyAgentContext.Provider
      value={{
        agents,
        getAgentStatus,
        dataStore,
        currentPhase,
        completedPhases,
        isPlaying,
        isComplete,
        processingTime,
        startCascade,
        pauseCascade,
        resetCascade,
        completePhase,
        getDataForTab,
        getAllInsights
      }}
    >
      {children}
    </OncologyAgentContext.Provider>
  );
}

/**
 * Hook to access oncology agent context
 */
export function useOncologyAgents() {
  const context = useContext(OncologyAgentContext);
  if (context === undefined) {
    throw new Error('useOncologyAgents must be used within OncologyAgentProvider');
  }
  return context;
}

