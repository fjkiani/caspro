'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Target, FlaskConical, Stethoscope, FileText } from 'lucide-react';
import { oncologyCascadePhases } from '@/data/products/oncology-cascade-data';
import { useOncologyAgents } from '@/contexts/OncologyAgentContext';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import SPEFusion from '@/components/dossier/SPEFusion';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';

interface FullPageCascadeExperienceProps {
  patientId?: string;
  autoStart?: boolean;
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

export default function FullPageCascadeExperience({ 
  patientId = 'AK',
  autoStart = false 
}: FullPageCascadeExperienceProps) {
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

  const [activeTab, setActiveTab] = useState('molecular');

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !isPlaying && !isComplete) {
      const timer = setTimeout(() => {
        startCascade();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoStart, isPlaying, isComplete, startCascade]);

  // Auto-switch tabs based on agent progress
  useEffect(() => {
    if (completedPhases.has(0)) setActiveTab('molecular'); // Data extraction + biomarker
    if (completedPhases.has(3)) setActiveTab('therapeutic'); // Drug ranking
    if (completedPhases.has(4)) setActiveTab('trials'); // Trial matching
    if (completedPhases.has(6)) setActiveTab('care'); // Care plan generation
  }, [completedPhases]);

  // Create tabs with data from context
  const tabs = useMemo(() => [
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

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Intelligence Cascade</h2>
              <p className="text-white/90 text-sm md:text-base">
                Autonomous oncology orchestration for {patientId} • {formatTime(processingTime)} elapsed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={isComplete ? resetCascade : (isPlaying ? pauseCascade : startCascade)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
            >
              {isComplete ? <RotateCcw className="w-4 h-4" /> : isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isComplete ? 'Replay' : isPlaying ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetCascade}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Phase Progress Indicator */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {oncologyCascadePhases.map((phase, index) => {
            const isActive = currentPhase === index;
            const isCompleted = completedPhases.has(index);
            const isPending = currentPhase > index;
            const colorClass = colorClasses[phase.color];

            return (
              <React.Fragment key={phase.id}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex-shrink-0 ${
                    isActive
                      ? `${colorClass.bg} ${colorClass.text} border-2 ${colorClass.border}`
                      : isCompleted || isPending
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  <span className="text-base md:text-lg">{phase.icon}</span>
                  <span className="hidden sm:inline">{phase.title}</span>
                  {(isCompleted || isPending) && <span className="text-green-600">✓</span>}
                </motion.div>
                {index < oncologyCascadePhases.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Tabbed Content Area */}
      <div className="flex flex-col min-h-[600px]">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 bg-white">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const phaseIndex = tab.id === 'molecular' ? 0 :
                                 tab.id === 'therapeutic' ? 3 :
                                 tab.id === 'trials' ? 4 : 6;
              const hasData = completedPhases.has(phaseIndex) || phaseIndex === 0;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => hasData && setActiveTab(tab.id)}
                  disabled={!hasData}
                  className={`flex items-center px-4 md:px-6 py-4 font-semibold transition-all border-b-2 flex-shrink-0 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : hasData
                      ? 'border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      : 'border-transparent text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="text-sm md:text-base">{tab.label}</span>
                  {hasData && completedPhases.has(phaseIndex) && (
                    <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Progressive Population */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentTab.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Live Insights Stream */}
      {dataStore.insights.length > 0 && (
        <div className="px-6 py-4 bg-slate-900 text-white border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Live Insights Stream</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {dataStore.insights.slice(-5).map((insight, idx) => (
              <div key={insight.id} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-slate-500">{new Date(insight.timestamp).toLocaleTimeString()}</span>
                <span>{insight.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



