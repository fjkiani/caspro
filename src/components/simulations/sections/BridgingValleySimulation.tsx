'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Factory, Beaker, FlaskConical, Shield, ArrowUp, Play, Zap } from 'lucide-react';
import APISimulationEngine, { SimulationConfig, SimulationResults } from '../core/APISimulationEngine';
import ClinicalDossier from '../results/ClinicalDossier';

interface BridgingValleySimulationProps {
  className?: string;
  autoStart?: boolean;
  showStaticVersion?: boolean;
}

const BridgingValleySimulation: React.FC<BridgingValleySimulationProps> = ({
  className = '',
  autoStart = false,
  showStaticVersion = true
}) => {
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [results, setResults] = useState<SimulationResults>({});

  // Define the 3-stage simulation configuration
  const simulationConfig: SimulationConfig = {
    id: 'bridging-valley-simulation',
    name: 'Bridging the Valley of Death',
    description: 'Live 3-stage API demonstration: Target Validation → Lead Engineering → Pre-Clinical Confirmation',
    steps: [
      {
        id: 'target-validation',
        title: '1. Target Validation',
        description: 'Replace years of exploration with 60-second in-silico verdict',
        duration: 2000,
        apiEndpoint: 'predict_variant_impact',
        input: { 
          variant: 'chr17:43044295:A>T', 
          gene: 'BRCA1' 
        },
        expectedOutput: { 
          pathogenicity: 0.89, 
          confidence: 0.94, 
          classification: 'Likely Pathogenic',
          deltaLikelihood: -2.34
        },
        status: 'pending'
      },
      {
        id: 'lead-engineering',
        title: '2. Lead Engineering',
        description: 'Make screening obsolete by engineering optimized leads from first principles',
        duration: 3000,
        apiEndpoint: 'generate_optimized_guide_rna',
        input: { 
          target: 'BRCA1', 
          gene: 'BRCA1', 
          strategy: 'knockout' 
        },
        expectedOutput: { 
          guides: ['GTTCCAGAACCTGAAAGCTG'], 
          efficiency: 0.87, 
          specificity: 0.94, 
          offTargetSites: 2 
        },
        status: 'pending'
      },
      {
        id: 'preclinical-confirmation',
        title: '3. Pre-Clinical Confirmation',
        description: 'Shift confirmation from expensive wet lab to near-zero-cost in-silico trial',
        duration: 2500,
        apiEndpoint: 'predict_protein_functionality_change',
        input: { 
          protein: 'BRCA1', 
          mutation: 'L1407P', 
          position: 1407 
        },
        expectedOutput: { 
          functionalImpact: 0.82, 
          structuralDisruption: 0.76, 
          likelihood: 0.91,
          stabilityChange: -0.45
        },
        status: 'pending'
      }
    ],
    timingConfig: 'pipeline',
    speedMultiplier: 'normal',
    autoStart: autoStart,
    showResults: true
  };

  // Handle simulation events
  const handleStepComplete = useCallback((stepId: string, result: any) => {
    console.log(`Step ${stepId} completed:`, result);
  }, []);

  const handleSimulationComplete = useCallback((finalResults: SimulationResults) => {
    setResults(finalResults);
    setSimulationComplete(true);
  }, []);

  const handleSimulationError = useCallback((error: string) => {
    console.error('Simulation error:', error);
  }, []);

  const startSimulation = () => {
    setSimulationStarted(true);
  };

  // Static version (original component)
  if (showStaticVersion && !simulationStarted) {
    return (
      <section className={`py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 ${className}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Bridging the Valley of Death
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              Replacing ambiguity with a <strong>deterministic launchpad</strong> through AI-powered intelligence.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSimulation}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 mb-12"
            >
              <Zap className="w-5 h-5" />
              🚀 RUN LIVE SIMULATION
              <Play className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="flex flex-col items-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <FlaskConical size={32} className="text-slate-400" />
              <p className="text-xl font-semibold text-slate-600">10,000+ Potential Starting Points</p>
              <FlaskConical size={32} className="text-slate-400" />
            </motion.div>

            <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-blue-300"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-100/50 border-2 border-blue-400 p-8 rounded-2xl w-full max-w-4xl shadow-xl"
            >
              <h3 className="text-3xl font-bold text-blue-700 text-center mb-8">
                The CrisPRO.ai Intelligence Platform
              </h3>
              
              <div className="relative w-full pt-20 pb-12">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-8"></div>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 -translate-y-8 opacity-75"></div>
                
                <div className="relative flex justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="w-1/3 px-4"
                  >
                    <div className="relative bg-white p-6 rounded-2xl border-2 border-blue-400 shadow-xl text-center h-full">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                        <Target size={32} />
                      </div>
                      <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">1. Target Validation</h4>
                      <p className="text-lg text-slate-600 mb-4">
                        Replace years of exploration with a <strong>60-second in-silico verdict</strong>.
                      </p>
                      <div className="text-sm text-blue-600 font-semibold">
                        95.7% ClinVar AUROC
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="w-1/3 px-4"
                  >
                    <div className="relative bg-white p-6 rounded-2xl border-2 border-purple-400 shadow-xl text-center h-full">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                        <Factory size={32} />
                      </div>
                      <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">2. Lead Engineering</h4>
                      <p className="text-lg text-slate-600 mb-4">
                        Make screening obsolete by <strong>engineering optimized leads</strong> from first principles.
                      </p>
                      <div className="text-sm text-purple-600 font-semibold">
                        70% Pfam-hit rate
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="w-1/3 px-4"
                  >
                    <div className="relative bg-white p-6 rounded-2xl border-2 border-orange-400 shadow-xl text-center h-full">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-white">
                        <Beaker size={32} />
                      </div>
                      <h4 className="font-bold text-2xl text-gray-800 mt-8 mb-4">3. Pre-Clinical Confirmation</h4>
                      <p className="text-lg text-slate-600 mb-4">
                        Shift confirmation from expensive wet lab to <strong>near-zero-cost in-silico trial</strong>.
                      </p>
                      <div className="text-sm text-orange-600 font-semibold">
                        DMS Validated
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="w-px h-12 bg-gradient-to-b from-blue-300 to-emerald-400 relative flex justify-center">
              <ArrowUp size={32} className="text-emerald-500 absolute -bottom-4 animate-pulse" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <Shield size={48} className="text-emerald-600" />
                <Shield size={48} className="text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-700">
                A Portfolio of High-Certainty Assets
              </p>
              <div className="flex items-center space-x-2">
                <Shield size={48} className="text-emerald-600" />
                <Shield size={48} className="text-emerald-600" />
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-gray-800 max-w-4xl mx-auto pt-8 font-bold text-center"
          >
            We don't gamble on discovery; we <span className="text-emerald-600">engineer success</span>.
          </motion.p>
        </div>
      </section>
    );
  }

  // Interactive simulation version
  return (
    <section className={`py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              🚀 LIVE SIMULATION: Bridging the Valley of Death
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Watch our AI transform drug development in real-time with <strong>live API calls</strong>
          </p>
        </motion.div>

        <APISimulationEngine
          config={simulationConfig}
          onStepComplete={handleStepComplete}
          onSimulationComplete={handleSimulationComplete}
          onSimulationError={handleSimulationError}
          className="max-w-6xl mx-auto"
        />

        <AnimatePresence>
          {simulationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <ClinicalDossier
                results={results}
                patientProfile={{
                  variant: 'chr17:43044295:A>T',
                  gene: 'BRCA1',
                  classification: 'Likely Pathogenic',
                  confidence: 0.94
                }}
                className="max-w-6xl mx-auto"
              />
              
              {/* Success Message */}
              <div className="max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl border border-emerald-200 text-center">
                <h3 className="text-2xl font-bold text-emerald-800 mb-3">
                  🎉 Valley of Death Successfully Bridged!
                </h3>
                <p className="text-lg text-emerald-700">
                  From a <strong>$2.6B gamble</strong> to a <strong>high-certainty victory</strong> for biotech partners.
                  <br />
                  <span className="font-bold text-emerald-800">
                    This is the power of deterministic engineering over gambling.
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

export default BridgingValleySimulation;