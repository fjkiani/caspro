'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, Zap, Target, Dna, FlaskConical } from 'lucide-react';
import { forgeGenerativeAPIs } from '@/data/products/forge/apis';

interface ForgeSimulationProps {
  apiId: string;
  className?: string;
}

const ForgeSimulation: React.FC<ForgeSimulationProps> = ({ apiId, className = '' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  const api = forgeGenerativeAPIs.find(api => api.id === apiId);
  
  if (!api) {
    return <div className="text-red-500">API not found: {apiId}</div>;
  }

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setIsComplete(false);
    setResults(null);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setIsComplete(false);
    setResults(null);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      if (currentStep < api.simulation.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsRunning(false);
        setIsComplete(true);
        setResults(api.simulation.finalOutput);
      }
    }, api.simulation.steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep, api.simulation.steps]);

  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (stepIndex === currentStep) return <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />;
    return <div className="w-5 h-5 rounded-full border-2 border-slate-400" />;
  };

  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{api.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{api.name}</h3>
            <p className="text-sm text-slate-400">{api.endpoint}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {!isRunning && !isComplete && (
            <button
              onClick={startSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              Run Simulation
            </button>
          )}
          
          {isRunning && (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          )}
          
          {(isComplete || currentStep > 0) && (
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 mb-6">{api.description}</p>

      {/* Input Parameters */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">INPUT PARAMETERS:</h4>
        <div className="bg-slate-900 rounded-lg p-4">
          <pre className="text-sm text-slate-300 font-mono">
            {JSON.stringify(api.simulation.input, null, 2)}
          </pre>
        </div>
      </div>

      {/* Simulation Steps */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">SIMULATION STEPS:</h4>
        <div className="space-y-3">
          {api.simulation.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                index <= currentStep ? 'bg-slate-700' : 'bg-slate-900'
              }`}
            >
              {getStepIcon(index)}
              <div className="flex-1">
                <div className="font-medium text-white">{step.title}</div>
                <div className="text-sm text-slate-400">{step.description}</div>
                {index === currentStep && isRunning && (
                  <div className="text-xs text-yellow-400 mt-1">
                    Running... ({Math.round(step.duration / 1000)}s)
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {isComplete && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-900/20 border border-green-500/30 rounded-lg p-4"
          >
            <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              SIMULATION COMPLETE
            </h4>
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-sm text-slate-300 font-mono overflow-x-auto">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capabilities */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">CAPABILITIES:</h4>
        <div className="flex flex-wrap gap-2">
          {api.capabilities.map((capability, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full border border-purple-700"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForgeSimulation;




