'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, DraftingCompass, Clock, Target, Zap, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export interface TrackConfig {
  id: string;
  name: string;
  description: string;
  approach: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: {
    name: string;
    duration: number;
    description: string;
    successRate: number;
    cost: number;
  }[];
  totalDuration: number;
  finalSuccessRate: number;
  totalCost: number;
  metaphor: {
    duration: string;
    realTime: string;
  };
}

export interface ComparisonProgress {
  traditional: {
    currentStep: number;
    progress: number;
    completed: boolean;
    timeElapsed: number;
  };
  ai: {
    currentStep: number;
    progress: number;
    completed: boolean;
    timeElapsed: number;
  };
}

interface ComparisonVisualizationProps {
  leftTrack: TrackConfig;
  rightTrack: TrackConfig;
  progress: ComparisonProgress;
  isRunning: boolean;
  showResults: boolean;
  className?: string;
}

const ComparisonVisualization: React.FC<ComparisonVisualizationProps> = ({
  leftTrack,
  rightTrack,
  progress,
  isRunning,
  showResults,
  className = ''
}) => {
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Calculate overall progress percentages
  const leftProgress = leftTrack.steps.reduce((acc, step, index) => {
    if (index < progress.traditional.currentStep) return acc + 100;
    if (index === progress.traditional.currentStep) return acc + progress.traditional.progress;
    return acc;
  }, 0) / leftTrack.steps.length;

  const rightProgress = rightTrack.steps.reduce((acc, step, index) => {
    if (index < progress.ai.currentStep) return acc + 100;
    if (index === progress.ai.currentStep) return acc + progress.ai.progress;
    return acc;
  }, 0) / rightTrack.steps.length;

  // Format currency
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  // Format time
  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  // Track component
  const TrackVisualization: React.FC<{ 
    track: TrackConfig; 
    trackProgress: ComparisonProgress['traditional'] | ComparisonProgress['ai'];
    position: 'left' | 'right';
  }> = ({ track, trackProgress, position }) => {
    const IconComponent = track.icon;
    
    return (
      <div className={`w-full h-full p-6 ${position === 'left' ? 'border-r-2 border-gray-200' : ''}`}>
        {/* Track Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            track.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            <IconComponent className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {track.name}
          </h3>
          
          <p className="text-slate-600 mb-4">
            {track.description}
          </p>
          
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            track.color === 'red' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {track.approach}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-slate-900">
              {Math.round((trackProgress.currentStep / track.steps.length) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className={`h-4 rounded-full ${
                track.color === 'red' 
                  ? 'bg-gradient-to-r from-red-400 to-red-600' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
              }`}
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min(100, (trackProgress.currentStep / track.steps.length) * 100 + 
                  (trackProgress.progress / track.steps.length))}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {track.steps.map((step, index) => {
            const isActive = index === trackProgress.currentStep;
            const isCompleted = index < trackProgress.currentStep;
            const isPending = index > trackProgress.currentStep;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isActive
                    ? `border-${track.color === 'red' ? 'red' : 'blue'}-500 bg-${track.color === 'red' ? 'red' : 'blue'}-50`
                    : isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : isActive ? (
                      <div className={`w-5 h-5 rounded-full border-2 border-${track.color === 'red' ? 'red' : 'blue'}-500 animate-pulse`} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    
                    <h4 className="font-semibold text-slate-900">
                      {step.name}
                    </h4>
                  </div>
                  
                  <div className="text-xs text-slate-500">
                    {formatTime(step.duration)}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-3 ml-8">
                  {step.description}
                </p>
                
                <div className="flex justify-between items-center text-xs ml-8">
                  <span className="text-slate-500">
                    Success Rate: <span className="font-semibold">{step.successRate}%</span>
                  </span>
                  <span className="text-slate-500">
                    Cost: <span className="font-semibold">{formatCurrency(step.cost)}</span>
                  </span>
                </div>
                
                {/* Step Progress Bar */}
                {isActive && (
                  <div className="mt-3 ml-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          track.color === 'red' 
                            ? 'bg-red-500' 
                            : 'bg-blue-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${trackProgress.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Track Summary */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {track.metaphor.duration}
              </div>
              <div className="text-xs text-slate-600">
                Timeline ({track.metaphor.realTime})
              </div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {track.finalSuccessRate}%
              </div>
              <div className="text-xs text-slate-600">
                Success Rate
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-slate-900">
              {formatCurrency(track.totalCost)}
            </div>
            <div className="text-xs text-slate-600">
              Total Investment
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`comparison-visualization ${className}`}>
      {/* Race Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          🏁 The Discovery Race: Traditional vs AI
        </h3>
        <p className="text-xl text-slate-600">
          Watch traditional screening get demolished by AI generation in real-time
        </p>
        
        {/* Race Status */}
        {isRunning && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Traditional: {Math.round(leftProgress)}%</span>
            </div>
            
            <div className="text-2xl">🆚</div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">AI: {Math.round(rightProgress)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Race Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[800px]">
        <TrackVisualization 
          track={leftTrack} 
          trackProgress={progress.traditional}
          position="left"
        />
        
        <TrackVisualization 
          track={rightTrack} 
          trackProgress={progress.ai}
          position="right"
        />
      </div>

      {/* Race Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border border-blue-200"
          >
            <div className="text-center">
              <h4 className="text-3xl font-bold text-blue-800 mb-4">
                🏆 AI WINS BY A LANDSLIDE!
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-700">Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">72x</div>
                  <div className="text-sm text-slate-600">Faster Discovery</div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-700">Success</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">18x</div>
                  <div className="text-sm text-slate-600">Higher Success Rate</div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-slate-700">Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">99.8%</div>
                  <div className="text-sm text-slate-600">Cost Reduction</div>
                </div>
              </div>
              
              <p className="mt-6 text-lg text-slate-700">
                <strong>The verdict is clear:</strong> AI doesn't just compete with traditional methods—it makes them obsolete.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonVisualization;
