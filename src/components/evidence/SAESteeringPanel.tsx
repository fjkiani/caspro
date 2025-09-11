'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Target, Zap, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface SteeringTarget {
  id: string;
  name: string;
  description: string;
  weight: number;
  current: number;
  target: number;
  category: 'tfbs' | 'structure' | 'motif' | 'chromatin';
}

const mockSteeringTargets: SteeringTarget[] = [
  {
    id: 'tfbs_ap1',
    name: 'AP-1 Binding Sites',
    description: 'Transcription factor binding motifs',
    weight: 0.8,
    current: 0.3,
    target: 0.7,
    category: 'tfbs'
  },
  {
    id: 'open_chromatin',
    name: 'Open Chromatin',
    description: 'Accessible chromatin regions',
    weight: 0.6,
    current: 0.5,
    target: 0.8,
    category: 'chromatin'
  },
  {
    id: 'alpha_helix',
    name: 'Alpha Helix',
    description: 'Protein secondary structure',
    weight: 0.4,
    current: 0.2,
    target: 0.6,
    category: 'structure'
  }
];

const categoryColors = {
  tfbs: 'bg-green-500',
  structure: 'bg-purple-500',
  motif: 'bg-orange-500',
  chromatin: 'bg-blue-500'
};

const categoryLabels = {
  tfbs: 'TFBS',
  structure: 'Structure',
  motif: 'Motif',
  chromatin: 'Chromatin'
};

export const SAESteeringPanel: React.FC = () => {
  const [targets, setTargets] = useState<SteeringTarget[]>(mockSteeringTargets);
  const [isGenerating, setIsGenerating] = useState(false);
  const [beamSize, setBeamSize] = useState(8);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateTargetWeight = (id: string, weight: number) => {
    setTargets(prev => prev.map(target => 
      target.id === id ? { ...target, weight } : target
    ));
  };

  const updateTargetValue = (id: string, target: number) => {
    setTargets(prev => prev.map(t => 
      t.id === id ? { ...t, target } : t
    ));
  };

  const generateWithSteering = async () => {
    setIsGenerating(true);
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results - update current values towards targets
    setTargets(prev => prev.map(target => ({
      ...target,
      current: Math.min(target.current + (target.target - target.current) * 0.3, target.target)
    })));
    
    setIsGenerating(false);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getOverallProgress = () => {
    const totalProgress = targets.reduce((sum, target) => 
      sum + getProgressPercentage(target.current, target.target), 0
    );
    return totalProgress / targets.length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Sliders className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Activation Steering (Roadmap)
          </h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" />
          Roadmap Feature
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-900">Overall Progress</h4>
          <span className="text-sm text-slate-600">
            {getOverallProgress().toFixed(0)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getOverallProgress()}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Steering Targets */}
      <div className="space-y-4 mb-6">
        {targets.map((target, index) => (
          <motion.div
            key={target.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-4 border border-slate-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${categoryColors[target.category]}`} />
                <div>
                  <h4 className="font-medium text-slate-900">{target.name}</h4>
                  <p className="text-sm text-slate-600">{target.description}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                {categoryLabels[target.category]}
              </span>
            </div>

            {/* Weight Control */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Weight: {target.weight.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={target.weight}
                onChange={(e) => updateTargetWeight(target.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Target Value Control */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target: {target.target.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={target.target}
                onChange={(e) => updateTargetValue(target.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 w-12">Current:</span>
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage(target.current, target.target)}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 w-8">
                {target.current.toFixed(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Controls */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced Controls'}
        </button>
        
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 bg-slate-50 rounded-lg"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Beam Size: {beamSize}
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={beamSize}
                  onChange={(e) => setBeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-600">
                  Quality scaling: Log-linear
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={generateWithSteering}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating with Steering...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Generate with Steering
          </>
        )}
      </button>

      {/* Roadmap Notice */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-orange-900 mb-1">Roadmap Feature</h4>
            <p className="text-orange-800 text-sm">
              Activation steering is currently in development. This demo shows the planned interface 
              for controlling feature activations during generation, with compute-aware beam search 
              and predictable quality scaling.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-medium text-slate-900 mb-2">Planned Benefits:</h4>
        <ul className="text-slate-700 text-sm space-y-1">
          <li>• Steer generation towards desired biological features</li>
          <li>• Predictable quality scaling with transparent controls</li>
          <li>• Compute-aware beam search for efficient generation</li>
          <li>• Auditable design process with clear provenance</li>
        </ul>
      </div>
    </motion.div>
  );
};
