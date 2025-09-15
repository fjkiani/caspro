'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { APIEndpoint, getAPIEndpoint } from '@/data/simulations/api-registry';
import { TimingConfig, getTimingConfig, applySpeedMultiplier } from '@/data/simulations/simulation-timing';

// Core interfaces for API simulation
export interface SimulationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  apiEndpoint?: string;
  input?: Record<string, any>;
  expectedOutput?: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export interface SimulationConfig {
  id: string;
  name: string;
  description: string;
  steps: SimulationStep[];
  timingConfig: string;
  speedMultiplier?: 'slow' | 'normal' | 'fast' | 'instant';
  autoStart?: boolean;
  showResults?: boolean;
}

export interface SimulationResults {
  [stepId: string]: {
    input: Record<string, any>;
    output: Record<string, any>;
    timing: {
      startTime: number;
      endTime: number;
      duration: number;
    };
    success: boolean;
    error?: string;
  };
}

interface APISimulationEngineProps {
  config: SimulationConfig;
  onStepComplete?: (stepId: string, result: any) => void;
  onSimulationComplete?: (results: SimulationResults) => void;
  onSimulationError?: (error: string) => void;
  className?: string;
}

const APISimulationEngine: React.FC<APISimulationEngineProps> = ({
  config,
  onStepComplete,
  onSimulationComplete,
  onSimulationError,
  className = ''
}) => {
  // State management
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<SimulationStep[]>(config.steps);
  const [results, setResults] = useState<SimulationResults>({});
  const [showResults, setShowResults] = useState(false);

  // Get timing configuration
  const timingConfig = getTimingConfig(config.timingConfig);
  const adjustedTiming = timingConfig && config.speedMultiplier 
    ? applySpeedMultiplier(timingConfig, config.speedMultiplier)
    : timingConfig;

  // Auto-start if configured
  useEffect(() => {
    if (config.autoStart && !isRunning) {
      startSimulation();
    }
  }, [config.autoStart]);

  // Simulate API call
  const simulateAPICall = useCallback(async (step: SimulationStep): Promise<any> => {
    const startTime = Date.now();
    
    // Get API endpoint configuration
    const apiEndpoint = step.apiEndpoint ? getAPIEndpoint(step.apiEndpoint) : null;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, step.duration));
    
    // Return expected output or API default
    const output = step.expectedOutput || apiEndpoint?.simulationDefaults.expectedOutput || {};
    
    return {
      input: step.input || {},
      output,
      timing: {
        startTime,
        endTime: Date.now(),
        duration: Date.now() - startTime
      },
      success: true
    };
  }, []);

  // Start simulation
  const startSimulation = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStepIndex(0);
    setShowResults(false);
    setResults({});

    // Reset step statuses
    setSteps(prevSteps => 
      prevSteps.map(step => ({ ...step, status: 'pending' as const }))
    );

    try {
      // Run through each step sequentially
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        
        // Update current step
        setCurrentStepIndex(i);
        
        // Mark step as running
        setSteps(prevSteps => 
          prevSteps.map((s, idx) => 
            idx === i ? { ...s, status: 'running' } : s
          )
        );

        // Simulate API call
        try {
          const result = await simulateAPICall(step);
          
          // Update results
          setResults(prevResults => ({
            ...prevResults,
            [step.id]: result
          }));

          // Mark step as completed
          setSteps(prevSteps => 
            prevSteps.map((s, idx) => 
              idx === i ? { ...s, status: 'completed' } : s
            )
          );

          // Notify step completion
          onStepComplete?.(step.id, result);

        } catch (error) {
          // Mark step as error
          setSteps(prevSteps => 
            prevSteps.map((s, idx) => 
              idx === i ? { ...s, status: 'error' } : s
            )
          );

          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          onSimulationError?.(errorMessage);
          setIsRunning(false);
          return;
        }
      }

      // Simulation completed successfully
      setIsRunning(false);
      setShowResults(true);
      onSimulationComplete?.(results);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Simulation failed';
      onSimulationError?.(errorMessage);
      setIsRunning(false);
    }
  }, [steps, results, onStepComplete, onSimulationComplete, onSimulationError, isRunning, simulateAPICall]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setShowResults(false);
    setResults({});
    
    setSteps(prevSteps => 
      prevSteps.map(step => ({ ...step, status: 'pending' as const }))
    );
  }, []);

  // Get step status icon
  const getStepStatusIcon = (status: SimulationStep['status'], isActive: boolean) => {
    switch (status) {
      case 'running':
        return <Activity className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return (
          <div className={`w-5 h-5 rounded-full border-2 ${
            isActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
          }`}>
            <span className="sr-only">Pending</span>
          </div>
        );
    }
  };

  return (
    <div className={`api-simulation-engine space-y-6 ${className}`}>
      {/* Simulation Header */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {config.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {config.description}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Simulation
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSimulation}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>
      </div>

      {/* Simulation Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = step.status === 'completed';
          const isRunning = step.status === 'running';
          const hasError = step.status === 'error';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                isActive && isRunning
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : isCompleted
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : hasError
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800'
              }`}
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-4">
                {getStepStatusIcon(step.status, isActive)}
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>

                {/* Duration Badge */}
                <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {step.duration}ms
                </div>
              </div>

              {/* Step Content - Show when active or completed */}
              <AnimatePresence>
                {(isActive || isCompleted || hasError) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Input/Output Display */}
                    {step.input && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Input
                          </h5>
                          <pre className="text-xs text-gray-600 dark:text-gray-400 font-mono overflow-x-auto">
                            {JSON.stringify(step.input, null, 2)}
                          </pre>
                        </div>

                        {results[step.id] && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Output
                            </h5>
                            <pre className="text-xs text-gray-600 dark:text-gray-400 font-mono overflow-x-auto">
                              {JSON.stringify(results[step.id].output, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Progress Bar for Running Steps */}
                    {isRunning && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: step.duration / 1000 }}
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Results Summary */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl"
          >
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              🎉 Simulation Complete!
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {steps.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Steps Completed
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Object.keys(results).length}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  API Calls
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {adjustedTiming?.durations.total || config.steps.reduce((sum, step) => sum + step.duration, 0)}ms
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Total Time
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default APISimulationEngine;
