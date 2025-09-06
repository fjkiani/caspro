'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CapabilityJourneyData } from '@/data/capability-journeys';
import GenericVisualization from './visualizations/GenericVisualization';

interface JourneyVisualizationProps {
  activeStepId: string | null;
  journeyData: CapabilityJourneyData;
}

const JourneyVisualization: React.FC<JourneyVisualizationProps> = ({ activeStepId, journeyData }) => {
  const renderVisualization = () => {
    if (!activeStepId) {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-600 mb-4">Journey Visualization</h3>
          <p className="text-slate-500">Scroll down to view the transformation journey.</p>
        </div>
      );
    }

    const variant = activeStepId.startsWith('old-') ? 'old' : 'new';

    return (
      <GenericVisualization 
        journeyData={journeyData}
        stepId={activeStepId} 
        variant={variant} 
      />
    );
  };

  return (
    <div className="sticky top-24 h-[calc(100vh-12rem)] w-full rounded-xl border-2 border-slate-200 bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Journey Visualization</h2>
        {activeStepId && (
          <p className="text-sm text-slate-600 mt-1">
            <span className={`font-semibold ${
              activeStepId.startsWith('old') ? 'text-red-600' : 'text-green-600'
            }`}>
              {activeStepId.startsWith('old') ? 'Traditional Approach:' : 'In-Silico Approach:'}
            </span> {journeyData.title}
          </p>
        )}
      </div>
      
      {/* Visualization Content */}
      <div className="flex-grow p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepId || 'initial'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderVisualization()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneyVisualization;
