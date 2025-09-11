'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PipelineControlsProps {
  isRunning: boolean;
  onRun: () => void;
  onReset: () => void;
}

const PipelineControls: React.FC<PipelineControlsProps> = ({ isRunning, onRun, onReset }) => {
  return (
    <motion.div
      className="flex justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        {isRunning ? 'Running...' : 'Run Pipeline'}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        Reset
      </button>
    </motion.div>
  );
};

export default PipelineControls;
