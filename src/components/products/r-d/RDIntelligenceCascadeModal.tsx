'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Eye, ChevronRight, Target, Zap, Shield, FileText, Award } from 'lucide-react';

interface CascadePhase {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  color: string;
  insights: string[];
  agent: string;
}

interface RDIntelligenceCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

const rdCascadePhases: CascadePhase[] = [
  {
    id: 'target-discovery',
    title: 'Target Discovery',
    description: 'Analyzing variants and identifying therapeutic targets',
    icon: '🎯',
    duration: 2500,
    color: 'blue',
    agent: 'Target Validator',
    insights: [
      'BRCA1 variant c.123A>T identified',
      'Pathogenicity score: 0.891 (Pathogenic)',
      'Gene essentiality: 0.76 (High dependency)',
      'Synthetic lethal pair detected: PARP + BRCA1'
    ]
  },
  {
    id: 'lead-design',
    title: 'Lead Engineering',
    description: 'Generating therapeutic designs with Evo2 and structural validation',
    icon: '⚡',
    duration: 3500,
    color: 'purple',
    agent: 'Therapeutic Designer',
    insights: [
      'CRISPR guide RNA designed: 92% on-target efficiency',
      'HDR template generated: 4.2kb homology arms',
      'Therapeutic protein generated: 70% functional coherence',
      'Off-target score: <0.1 (low risk)'
    ]
  },
  {
    id: 'structural-validation',
    title: 'Structural Validation',
    description: 'Validating 3D structures with AlphaFold 3 integration',
    icon: '🛡️',
    duration: 3000,
    color: 'green',
    agent: 'Structural Validator',
    insights: [
      'AlphaFold 3 confidence: 95.8%',
      'Binding affinity predicted: High',
      'Complex structure validated',
      '3D folding confirmed'
    ]
  },
  {
    id: 'ind-package',
    title: 'IND Package Generation',
    description: 'Compiling regulatory documentation with complete evidence',
    icon: '📋',
    duration: 4000,
    color: 'orange',
    agent: 'Regulatory Assembler',
    insights: [
      'Complete evidence dossier generated',
      'Provenance trail documented',
      'IND-ready documentation compiled',
      'Audit trail complete'
    ]
  },
  {
    id: 'ip-monetization',
    title: 'IP Monetization',
    description: 'Preparing IP documentation and patent strategy',
    icon: '💎',
    duration: 2000,
    color: 'teal',
    agent: 'IP Strategist',
    insights: [
      'Novel therapeutic candidate identified',
      'Patent-worthy design confirmed',
      'IP documentation prepared',
      'Commercialization pathway mapped'
    ]
  }
];

export default function RDIntelligenceCascadeModal({
  isOpen,
  onClose,
  projectId = 'RD-001'
}: RDIntelligenceCascadeModalProps) {
  const [activeTab, setActiveTab] = useState<'target' | 'design' | 'validation' | 'ind'>('target');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [processingTime, setProcessingTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Reset modal state when opened and auto-start simulation
  useEffect(() => {
    if (isOpen) {
      setActiveTab('target');
      setIsPlaying(false);
      setCurrentPhase(0);
      setCompletedPhases(new Set());
      setProcessingTime(0);
      setIsComplete(false);
      
      // Auto-start simulation after 1 second delay
      const autoStartTimer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
      
      return () => clearTimeout(autoStartTimer);
    }
  }, [isOpen]);

  // Auto-play simulation
  useEffect(() => {
    if (!isPlaying || currentPhase >= rdCascadePhases.length) return;

    const phase = rdCascadePhases[currentPhase];

    const timer = setTimeout(() => {
      // Auto-switch tabs based on phase
      switch (phase.id) {
        case 'target-discovery':
          setActiveTab('target');
          break;
        case 'lead-design':
          setActiveTab('design');
          break;
        case 'structural-validation':
          setActiveTab('validation');
          break;
        case 'ind-package':
          setActiveTab('ind');
          break;
      }

      // Mark phase complete and move to next
      setTimeout(() => {
        setCompletedPhases((prev: Set<number>) => new Set([...prev, currentPhase]));
        setCurrentPhase(prev => prev + 1);
        setProcessingTime(prev => prev + phase.duration);

        if (currentPhase + 1 >= rdCascadePhases.length) {
          setIsComplete(true);
          setIsPlaying(false);
        }
      }, phase.duration);
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase]);

  const handlePlay = () => {
    if (isComplete) {
      // Reset and replay
      setIsPlaying(false);
      setCurrentPhase(0);
      setCompletedPhases(new Set());
      setProcessingTime(0);
      setIsComplete(false);
      setTimeout(() => setIsPlaying(true), 500);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
    setCompletedPhases(new Set());
    setProcessingTime(0);
    setIsComplete(false);
  };

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  if (!isOpen) return null;

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
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Intelligence Cascade</h2>
                <p className="text-blue-100 text-sm">
                  Autonomous R&D orchestration for {projectId} • {formatTime(processingTime)} elapsed
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
              {rdCascadePhases.map((phase, index) => {
                const isActive = currentPhase === index;
                const isCompleted = completedPhases.has(index);
                const isPending = currentPhase > index;

                return (
                  <React.Fragment key={phase.id}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? phase.color === 'blue'
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                            : phase.color === 'purple'
                            ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                            : phase.color === 'green'
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : phase.color === 'orange'
                            ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                            : 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                          : isCompleted || isPending
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-lg">{phase.icon}</span>
                      <span>{phase.title}</span>
                      {(isCompleted || isPending) && <span className="text-green-600">✓</span>}
                    </motion.div>
                    {index < rdCascadePhases.length - 1 && (
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
                {[
                  { id: 'target', label: 'Target Discovery', icon: Target },
                  { id: 'design', label: 'Lead Design', icon: Zap },
                  { id: 'validation', label: 'Structural Validation', icon: Shield },
                  { id: 'ind', label: 'IND Package', icon: FileText },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
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
                  {activeTab === 'target' && (
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
                  )}

                  {activeTab === 'design' && (
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
                  )}

                  {activeTab === 'validation' && (
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
                  )}

                  {activeTab === 'ind' && (
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
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

