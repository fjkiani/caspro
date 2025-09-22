'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FlaskConical, DraftingCompass, Play, Zap, RotateCcw, Timer, BrainCircuit, Factory } from 'lucide-react';
import ComparisonVisualization, { TrackConfig, ComparisonProgress } from '../visualizations/ComparisonVisualization';

interface DiscoveryRaceSimulationProps {
  className?: string;
  autoStart?: boolean;
  showStaticVersion?: boolean;
}

const DiscoveryRaceSimulation: React.FC<DiscoveryRaceSimulationProps> = ({
  className = '',
  autoStart = false,
  showStaticVersion = true
}) => {
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState<ComparisonProgress>({
    traditional: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 },
    ai: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 }
  });

  // Traditional Screening Track Configuration
  const traditionalTrack: TrackConfig = {
    id: 'traditional-screening',
    name: 'The Old Way: A Funnel',
    description: 'Traditional high-throughput screening approach',
    approach: 'Screen & Filter',
    color: 'red',
    icon: FlaskConical,
    steps: [
      {
        name: 'Compound Library Assembly',
        duration: 8000,
        description: 'Assembling 100,000+ compound library from commercial sources',
        successRate: 100,
        cost: 5000000
      },
      {
        name: 'High-Throughput Screening',
        duration: 12000,
        description: 'Screening entire library against target protein',
        successRate: 2,
        cost: 15000000
      },
      {
        name: 'Hit Validation',
        duration: 8000,
        description: 'Confirming and validating initial hits',
        successRate: 25,
        cost: 8000000
      },
      {
        name: 'Lead Optimization',
        duration: 10000,
        description: 'Optimizing leads for potency and selectivity',
        successRate: 15,
        cost: 12000000
      }
    ],
    totalDuration: 38000,
    finalSuccessRate: 5,
    totalCost: 40000000,
    metaphor: {
      duration: '18 Months',
      realTime: '38s simulation'
    }
  };

  // AI Generation Track Configuration
  const aiTrack: TrackConfig = {
    id: 'ai-generation',
    name: 'The New Doctrine: A Factory',
    description: 'AI-powered generative approach',
    approach: 'Engineer & Validate',
    color: 'blue',
    icon: DraftingCompass,
    steps: [
      {
        name: 'Target Analysis',
        duration: 1000,
        description: 'AI analyzes target structure and binding requirements',
        successRate: 95,
        cost: 10000
      },
      {
        name: 'Generative Design',
        duration: 2000,
        description: 'Forge generates optimized therapeutic candidates',
        successRate: 85,
        cost: 20000
      },
      {
        name: 'In-Silico Validation',
        duration: 1500,
        description: 'Boltz validates binding affinity and selectivity',
        successRate: 92,
        cost: 15000
      },
      {
        name: 'Optimization Cycles',
        duration: 1000,
        description: 'Iterative refinement based on validation feedback',
        successRate: 90,
        cost: 5000
      }
    ],
    totalDuration: 5500,
    finalSuccessRate: 90,
    totalCost: 50000,
    metaphor: {
      duration: '1 Week',
      realTime: '5.5s simulation'
    }
  };

  // Start race simulation
  const startRace = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setShowResults(false);
    setProgress({
      traditional: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 },
      ai: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 }
    });

    const startTime = Date.now();
    
    // Traditional track simulation
    const traditionalPromise = new Promise<void>(async (resolve) => {
      for (let stepIndex = 0; stepIndex < traditionalTrack.steps.length; stepIndex++) {
        const step = traditionalTrack.steps[stepIndex];
        
        setProgress(prev => ({
          ...prev,
          traditional: { ...prev.traditional, currentStep: stepIndex, progress: 0 }
        }));
        
        const stepStart = Date.now();
        const stepDuration = step.duration;
        
        const progressInterval = setInterval(() => {
          const elapsed = Date.now() - stepStart;
          const stepProgress = Math.min(100, (elapsed / stepDuration) * 100);
          
          setProgress(prev => ({
            ...prev,
            traditional: { 
              ...prev.traditional, 
              progress: stepProgress,
              timeElapsed: Date.now() - startTime
            }
          }));
          
          if (elapsed >= stepDuration) {
            clearInterval(progressInterval);
          }
        }, 50);
        
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
      
      setProgress(prev => ({
        ...prev,
        traditional: { 
          ...prev.traditional, 
          completed: true,
          timeElapsed: Date.now() - startTime
        }
      }));
      
      resolve();
    });

    // AI track simulation
    const aiPromise = new Promise<void>(async (resolve) => {
      for (let stepIndex = 0; stepIndex < aiTrack.steps.length; stepIndex++) {
        const step = aiTrack.steps[stepIndex];
        
        setProgress(prev => ({
          ...prev,
          ai: { ...prev.ai, currentStep: stepIndex, progress: 0 }
        }));
        
        const stepStart = Date.now();
        const stepDuration = step.duration;
        
        const progressInterval = setInterval(() => {
          const elapsed = Date.now() - stepStart;
          const stepProgress = Math.min(100, (elapsed / stepDuration) * 100);
          
          setProgress(prev => ({
            ...prev,
            ai: { 
              ...prev.ai, 
              progress: stepProgress,
              timeElapsed: Date.now() - startTime
            }
          }));
          
          if (elapsed >= stepDuration) {
            clearInterval(progressInterval);
          }
        }, 50);
        
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
      
      setProgress(prev => ({
        ...prev,
        ai: { 
          ...prev.ai, 
          completed: true,
          timeElapsed: Date.now() - startTime
        }
      }));
      
      resolve();
    });

    await Promise.all([traditionalPromise, aiPromise]);
    
    setIsRunning(false);
    setShowResults(true);
  }, [isRunning, traditionalTrack.steps, aiTrack.steps]);

  // Reset race
  const resetRace = useCallback(() => {
    setIsRunning(false);
    setShowResults(false);
    setProgress({
      traditional: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 },
      ai: { currentStep: 0, progress: 0, completed: false, timeElapsed: 0 }
    });
  }, []);

  // Auto-start if configured
  useEffect(() => {
    if (autoStart && simulationStarted && !isRunning) {
      startRace();
    }
  }, [autoStart, simulationStarted, isRunning, startRace]);

  // Static version (original component)
  if (showStaticVersion && !simulationStarted) {
    return (
      <section className={`py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 ${className}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discovery vs. Engineering
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              The fundamental shift from a game of chance to a discipline of creation.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSimulationStarted(true)}
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 mb-12 touch-manipulation"
            >
              <Timer className="w-5 h-5" />
              🏁 START THE RACE
              <Zap className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 md:p-8 text-center"
            >
              <div className="bg-red-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FlaskConical size={32} className="text-red-600 md:w-10 md:h-10" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-4">
                The Old Way: A Funnel
              </h3>
              
              <p className="text-base md:text-lg text-red-700 mb-6">
                Screen hundreds of thousands of compounds, hoping something sticks.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center p-2 md:p-3 bg-white rounded-lg border border-red-200">
                  <span className="text-red-800 font-medium text-sm md:text-base">Timeline</span>
                  <span className="text-red-600 font-bold text-sm md:text-base">18+ Months</span>
                </div>
                
                <div className="flex justify-between items-center p-2 md:p-3 bg-white rounded-lg border border-red-200">
                  <span className="text-red-800 font-medium text-sm md:text-base">Success Rate</span>
                  <span className="text-red-600 font-bold text-sm md:text-base">~5%</span>
                </div>
                
                <div className="flex justify-between items-center p-2 md:p-3 bg-white rounded-lg border border-red-200">
                  <span className="text-red-800 font-medium text-sm md:text-base">Investment</span>
                  <span className="text-red-600 font-bold text-sm md:text-base">$40M+</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-semibold">
                  "We'll screen everything and see what works"
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4 md:p-8"
            >
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DraftingCompass size={32} className="text-blue-600 md:w-10 md:h-10" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
                  The New Doctrine: A Factory
                </h3>
                
                <p className="text-base md:text-lg text-blue-700">
                  Two AI engines working in perfect harmony
                </p>
              </div>
              
              {/* Oracle & Forge Capabilities */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Oracle - Discriminative AI */}
                <div className="bg-white p-4 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BrainCircuit size={16} className="text-blue-600" />
                    </div>
                    <h4 className="font-bold text-blue-800">Oracle</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Discriminative</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">95.7% AUROC variant prediction</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">VUS Resolution</span>
                      <span className="font-bold text-blue-800">73%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">Gene Essentiality</span>
                      <span className="font-bold text-blue-800">0.82-0.99 AUROC</span>
                    </div>
                  </div>
                </div>

                {/* Forge - Generative AI */}
                <div className="bg-white p-4 rounded-xl border border-purple-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Factory size={16} className="text-purple-600" />
                    </div>
                    <h4 className="font-bold text-purple-800">Forge</h4>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Generative</span>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">70% Pfam-hit rate generation</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-600">Guide RNA Design</span>
                      <span className="font-bold text-purple-800">92% efficiency</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-600">Protein Engineering</span>
                      <span className="font-bold text-purple-800">AF3 validated</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-lg font-bold text-blue-600">1 Week</div>
                  <div className="text-xs text-blue-700">Timeline</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-lg font-bold text-blue-600">90%</div>
                  <div className="text-xs text-blue-700">Success Rate</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-lg font-bold text-blue-600">$50K</div>
                  <div className="text-xs text-blue-700">Investment</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/products/oracle"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                >
                  Explore Oracle →
                </Link>
                <Link 
                  href="/products/forge"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                >
                  Explore Forge →
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-3xl font-bold text-slate-900 max-w-4xl mx-auto">
              The choice is clear: <span className="text-blue-600">Engineering</span> over <span className="text-red-600">Discovery</span>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Interactive race simulation version
  return (
    <section className={`py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🏁 LIVE RACE: Discovery vs Engineering
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto">
            Watch traditional screening get demolished by AI generation in real-time
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRace}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
              isRunning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Timer className="w-4 h-4 animate-pulse" />
                Race in Progress...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Race
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetRace}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors touch-manipulation"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>

        <ComparisonVisualization
          leftTrack={traditionalTrack}
          rightTrack={aiTrack}
          progress={progress}
          isRunning={isRunning}
          showResults={showResults}
          className="max-w-7xl mx-auto"
        />

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
                  🎯 The Verdict: Engineering Dominates Discovery
                </h3>
                <p className="text-lg md:text-xl text-purple-700 leading-relaxed">
                  In the time it takes traditional screening to complete just one cycle, 
                  AI has already <strong>engineered, validated, and optimized</strong> multiple therapeutic candidates.
                  <br />
                  <span className="font-bold text-purple-800">
                    This isn't just an improvement—it's a complete paradigm shift.
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DiscoveryRaceSimulation;