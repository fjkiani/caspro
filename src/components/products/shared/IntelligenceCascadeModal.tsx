'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface CascadePhase {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo' | 'teal';
  insights: string[];
  agent: string;
  tabId?: string; // Optional: which tab to switch to when this phase completes
}

export interface CascadeTab {
  id: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
}

export interface IntelligenceCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  phases: CascadePhase[];
  tabs: CascadeTab[];
  defaultTabId: string;
  entityId?: string; // e.g., 'AK' for patient, 'RD-001' for project
  headerGradient?: string; // Optional custom gradient
  onPhaseComplete?: (phaseIndex: number, phaseId: string, outputData?: any) => void; // Callback when phase completes
  externalState?: {
    currentPhase: number;
    completedPhases: Set<number>;
    isPlaying: boolean;
    isComplete: boolean;
    processingTime: number;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
  }; // Optional external state management
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    dot: 'bg-blue-500'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-300',
    dot: 'bg-purple-500'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-300',
    dot: 'bg-green-500'
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-300',
    dot: 'bg-orange-500'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
    dot: 'bg-red-500'
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    dot: 'bg-indigo-500'
  },
  teal: {
    bg: 'bg-teal-100',
    text: 'text-teal-700',
    border: 'border-teal-300',
    dot: 'bg-teal-500'
  }
};

export default function IntelligenceCascadeModal({
  isOpen,
  onClose,
  title,
  subtitle,
  phases,
  tabs,
  defaultTabId,
  entityId = '',
  headerGradient = 'from-blue-600 via-indigo-600 to-purple-600',
  onPhaseComplete,
  externalState
}: IntelligenceCascadeModalProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId);
  
  // Use external state if provided, otherwise use internal state
  const isExternalState = !!externalState;
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [internalCurrentPhase, setInternalCurrentPhase] = useState(0);
  const [internalCompletedPhases, setInternalCompletedPhases] = useState<Set<number>>(new Set());
  const [internalProcessingTime, setInternalProcessingTime] = useState(0);
  const [internalIsComplete, setInternalIsComplete] = useState(false);

  const isPlaying = isExternalState ? externalState.isPlaying : internalIsPlaying;
  const currentPhase = isExternalState ? externalState.currentPhase : internalCurrentPhase;
  const completedPhases = isExternalState ? externalState.completedPhases : internalCompletedPhases;
  const processingTime = isExternalState ? externalState.processingTime : internalProcessingTime;
  const isComplete = isExternalState ? externalState.isComplete : internalIsComplete;

  // Reset modal state when opened and auto-start simulation
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTabId);
      if (!isExternalState) {
        setInternalIsPlaying(false);
        setInternalCurrentPhase(0);
        setInternalCompletedPhases(new Set());
        setInternalProcessingTime(0);
        setInternalIsComplete(false);
        
        // Auto-start simulation after 1 second delay
        const autoStartTimer = setTimeout(() => {
          setInternalIsPlaying(true);
        }, 1000);
        
        return () => clearTimeout(autoStartTimer);
      }
    }
  }, [isOpen, defaultTabId, isExternalState]);

  // Auto-play simulation
  useEffect(() => {
    if (!isPlaying || currentPhase >= phases.length || isExternalState) return;

    const phase = phases[currentPhase];

    const timer = setTimeout(() => {
      // Auto-switch tabs if phase has tabId
      if (phase.tabId) {
        setActiveTab(phase.tabId);
      }

      // Call phase complete callback
      if (onPhaseComplete) {
        onPhaseComplete(currentPhase, phase.id);
      }

      // Mark phase complete and move to next
      setTimeout(() => {
        setInternalCompletedPhases((prev: Set<number>) => new Set([...prev, currentPhase]));
        setInternalCurrentPhase(prev => prev + 1);
        setInternalProcessingTime(prev => prev + phase.duration);

        if (currentPhase + 1 >= phases.length) {
          setInternalIsComplete(true);
          setInternalIsPlaying(false);
        }
      }, phase.duration);
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase, phases, isExternalState, onPhaseComplete]);
  
  // Handle external state phase progression
  useEffect(() => {
    if (isExternalState && isPlaying && currentPhase < phases.length) {
      const phase = phases[currentPhase];
      
      const timer = setTimeout(() => {
        // Auto-switch tabs if phase has tabId
        if (phase.tabId) {
          setActiveTab(phase.tabId);
        }
        
        // Call phase complete callback
        if (onPhaseComplete) {
          onPhaseComplete(currentPhase, phase.id);
        }
      }, phase.duration);

      return () => clearTimeout(timer);
    }
  }, [isExternalState, isPlaying, currentPhase, phases, onPhaseComplete]);

  const handlePlay = () => {
    if (isExternalState) {
      externalState.onPlay();
    } else {
      if (isComplete) {
        // Reset and replay
        setInternalIsPlaying(false);
        setInternalCurrentPhase(0);
        setInternalCompletedPhases(new Set());
        setInternalProcessingTime(0);
        setInternalIsComplete(false);
        setTimeout(() => setInternalIsPlaying(true), 500);
      } else {
        setInternalIsPlaying(true);
      }
    }
  };

  const handleReset = () => {
    if (isExternalState) {
      externalState.onReset();
    } else {
      setInternalIsPlaying(false);
      setInternalCurrentPhase(0);
      setInternalCompletedPhases(new Set());
      setInternalProcessingTime(0);
      setInternalIsComplete(false);
    }
  };

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  if (!isOpen) return null;

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const TabIcon = currentTab.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${headerGradient} text-white p-6 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TabIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-white/90 text-sm">
                  {subtitle} {entityId && `for ${entityId}`} • {formatTime(processingTime)} elapsed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Controls */}
              <button
                onClick={handlePlay}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {phases.map((phase, index) => {
                const isActive = currentPhase === index;
                const isCompleted = completedPhases.has(index);
                const isPending = currentPhase > index;
                const colorClass = colorClasses[phase.color];

                return (
                  <React.Fragment key={phase.id}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? `${colorClass.bg} ${colorClass.text} border-2 ${colorClass.border}`
                          : isCompleted || isPending
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-lg">{phase.icon}</span>
                      <span>{phase.title}</span>
                      {(isCompleted || isPending) && <span className="text-green-600">✓</span>}
                    </motion.div>
                    {index < phases.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="border-b border-slate-200 bg-white">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 font-semibold transition-all border-b-2 ${
                        isActive
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentTab.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
