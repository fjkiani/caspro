'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Target, 
  DollarSign, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Brain,
  Shield,
  FlaskConical,
  Microscope,
  Play
} from 'lucide-react';

// Slide deck components
const ZetaScoreGauge = () => (
  <div className="bg-white p-4 rounded-xl text-center shadow-inner relative overflow-hidden h-full flex flex-col justify-center">
    <p className="text-sm font-semibold text-slate-600 mb-2">Target Validation Score</p>
    <div className="relative w-full max-w-xs mx-auto h-16 my-2">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-[6px] border-l-[6px] border-r-[6px] border-gray-200 rounded-t-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-[6px] border-l-[6px] border-r-[6px] border-transparent rounded-t-full bg-clip-border" style={{backgroundImage: 'linear-gradient(to right, #ef4444, #facc15, #10b981)', backgroundOrigin: 'border-box'}}></div>
      <motion.div 
        initial={{ rotate: -60 }} 
        animate={{ rotate: 45 }} 
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }} 
        className="absolute bottom-0 left-1/2 w-1 h-16 origin-bottom -ml-0.5"
      >
        <div className="w-full h-full bg-slate-800 rounded-t-full"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-800 rounded-full border border-white"></div>
      </motion.div>
    </div>
    <div className="flex justify-between w-32 mx-auto -mt-4 text-xs font-bold">
      <span className="text-red-600">FAIL</span>
      <span className="text-green-600">VALID</span>
    </div>
    <div className="mt-2">
      <p className="text-2xl font-bold font-mono text-green-600">+18,420</p>
      <p className="text-xs font-semibold text-green-700">VALIDATED TARGET</p>
    </div>
  </div>
);

interface BiotechInputs {
  monthlyRDSpend: number;  // Monthly R&D spend in millions
  targetsPerYear: number;  // How many targets they evaluate per year
  currentSuccessRate: number;  // Current target validation success rate %
  teamSize: number; // R&D team size
}

interface BiotechROI {
  monthlyFailureCost: number;
  costSavingsPerMonth: number;
  timeAcceleration: number;
  successRateImprovement: number;
  annualROI: number;
  additionalTargets: number;
  programsDeRisked: number;
}

const BiotechROICalculator: React.FC = () => {
  // Mode toggle
  const [mode, setMode] = useState<'auto' | 'custom'>('auto');
  
  // Industry standard inputs
  const industryStandards = {
    monthlyRDSpend: 20, // $20M per month (typical mid-size biotech)
    targetsPerYear: 10, // 10 targets per year
    currentSuccessRate: 15, // 15% success rate (industry standard)
    teamSize: 40 // 40 person R&D team
  };

  // Custom inputs for interactive mode
  const [customInputs, setCustomInputs] = useState<BiotechInputs>({
    monthlyRDSpend: 20,
    targetsPerYear: 10,
    currentSuccessRate: 15,
    teamSize: 40
  });

  const [roi, setRoi] = useState<BiotechROI>({
    monthlyFailureCost: 0,
    costSavingsPerMonth: 0,
    timeAcceleration: 0,
    successRateImprovement: 0,
    annualROI: 0,
    additionalTargets: 0,
    programsDeRisked: 0
  });

  const [isCalculating, setIsCalculating] = useState(true);
  const [simulationStep, setSimulationStep] = useState(0);

  // Calculate ROI based on current inputs (auto or custom)
  const calculateROI = (inputs: BiotechInputs) => {
    const currentFailureRate = (100 - inputs.currentSuccessRate) / 100;
    const monthlyFailureCost = inputs.monthlyRDSpend * currentFailureRate;
    
    // CrisPRO: 95.7% accuracy = 90% success rate
    const crisprOSuccessRate = 0.90;
    const successRateImprovement = (crisprOSuccessRate * 100) - inputs.currentSuccessRate;
    
    // Cost savings = reduced failures
    const failureReduction = currentFailureRate - (1 - crisprOSuccessRate);
    const costSavingsPerMonth = inputs.monthlyRDSpend * failureReduction;
    
    // Time acceleration: 18 months → 1 week = 72x faster
    const timeAcceleration = 72;
    
    // Additional capacity from speed
    const additionalTargets = Math.round(inputs.targetsPerYear * 0.6);
    
    // Programs de-risked
    const programsDeRisked = Math.round(inputs.targetsPerYear * 0.75);
    
    // Annual ROI
    const annualCostSavings = costSavingsPerMonth * 12;
    const crisproCost = 2.0; // $2M per year
    const annualROI = annualCostSavings / crisproCost;

    return {
      monthlyFailureCost,
      costSavingsPerMonth,
      timeAcceleration,
      successRateImprovement,
      annualROI,
      additionalTargets,
      programsDeRisked
    };
  };

  // Auto simulation effect
  useEffect(() => {
    if (mode === 'auto') {
      setIsCalculating(true);
      setSimulationStep(0);
      
      const simulationSteps = [
        { step: 0, delay: 0 },
        { step: 1, delay: 1000 },
        { step: 2, delay: 2500 },
        { step: 3, delay: 4000 },
      ];

      simulationSteps.forEach(({ step, delay }) => {
        setTimeout(() => {
          setSimulationStep(step);
          
          if (step === 3) {
            setRoi(calculateROI(industryStandards));
            setIsCalculating(false);
          }
        }, delay);
      });
    }
  }, [mode]);

  // Custom mode calculation effect
  useEffect(() => {
    if (mode === 'custom') {
      setIsCalculating(true);
      const timer = setTimeout(() => {
        setRoi(calculateROI(customInputs));
        setIsCalculating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mode, customInputs]);

  const updateCustomInput = (key: keyof BiotechInputs, value: number) => {
    setCustomInputs(prev => ({ ...prev, [key]: value }));
  };


  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    } else if (value >= 1) {
      return `$${value.toFixed(1)}M`;
    } else {
      return `$${(value * 1000).toFixed(0)}K`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-200"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          <Calculator className="w-4 h-4" />
          Biotech ROI Calculator
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Calculate Your R&D ROI Improvement
        </h3>
        <p className="text-slate-600 mb-6">
          See exactly how CrisPRO's AI reduces failure costs and accelerates your pipeline
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMode('auto')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                mode === 'auto' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Play className="w-4 h-4" />
              Auto Simulation
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                mode === 'custom' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              Custom Calculator
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          {mode === 'auto' 
            ? '🚀 Watch live simulation with industry standard data' 
            : '🎯 Adjust parameters to match your specific R&D program'
          }
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Mode Dependent */}
        <div className="space-y-6">
          {mode === 'auto' ? (
            /* Auto Simulation Display */
            <div className="p-6 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-500" />
                Live ROI Simulation
              </h4>
            
            {/* Simulation Steps */}
            <div className="space-y-4">
              {/* Step 1: Current Industry Standards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: simulationStep >= 1 ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-lg border-2 ${
                  simulationStep >= 1 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-700">Current Industry Reality</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-red-600 font-bold">{formatCurrency(industryStandards.monthlyRDSpend)}/month</div>
                    <div className="text-red-500">R&D Investment</div>
                  </div>
                  <div>
                    <div className="text-red-600 font-bold">{industryStandards.currentSuccessRate}%</div>
                    <div className="text-red-500">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-red-600 font-bold">{industryStandards.targetsPerYear}/year</div>
                    <div className="text-red-500">Targets Validated</div>
                  </div>
                  <div>
                    <div className="text-red-600 font-bold">18 months</div>
                    <div className="text-red-500">Validation Time</div>
                  </div>
                </div>
                {simulationStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 p-3 bg-red-100 rounded border border-red-200"
                  >
                    <div className="text-red-700 font-bold">Monthly Waste: {formatCurrency(roi.monthlyFailureCost || 17)}</div>
                    <div className="text-red-600 text-xs">85% of targets fail - pure waste</div>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 2: CrisPRO Transformation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: simulationStep >= 2 ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`p-4 rounded-lg border-2 ${
                  simulationStep >= 2 ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-700">CrisPRO Transformation</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-green-600 font-bold">95.7% AUROC</div>
                    <div className="text-green-500">Oracle Accuracy</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">1 week</div>
                    <div className="text-green-500">Validation Time</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">90% success</div>
                    <div className="text-green-500">Target Success Rate</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">72x faster</div>
                    <div className="text-green-500">Speed Improvement</div>
                  </div>
                </div>
                {simulationStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 p-3 bg-green-100 rounded border border-green-200"
                  >
                    <div className="text-green-700 font-bold">Monthly Savings: {formatCurrency(roi.costSavingsPerMonth || 15)}</div>
                    <div className="text-green-600 text-xs">Eliminate failure costs with validated targets</div>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 3: Final ROI */}
              {simulationStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{roi.annualROI?.toFixed(0)}x ROI</div>
                    <div className="text-lg opacity-90">Annual Return on Investment</div>
                    <div className="text-sm opacity-75 mt-2">
                      {formatCurrency((roi.costSavingsPerMonth || 15) * 12)} saved annually vs $2M CrisPRO cost
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          ) : (
            /* Custom Input Controls */
            <div className="p-6 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Your R&D Program Parameters
              </h4>
              
              {/* Monthly R&D Spend */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly R&D Investment
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={customInputs.monthlyRDSpend}
                    onChange={(e) => updateCustomInput('monthlyRDSpend', Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$5M</span>
                    <span>$100M</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(customInputs.monthlyRDSpend)}
                  </span>
                  <span className="text-slate-600 ml-1">/month</span>
                </div>
              </div>

              {/* Targets Per Year */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Validation Projects
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="1"
                    value={customInputs.targetsPerYear}
                    onChange={(e) => updateCustomInput('targetsPerYear', Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>2/year</span>
                    <span>30/year</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-green-600">
                    {customInputs.targetsPerYear}
                  </span>
                  <span className="text-slate-600 ml-1">targets/year</span>
                </div>
              </div>

              {/* Current Success Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Success Rate
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={customInputs.currentSuccessRate}
                    onChange={(e) => updateCustomInput('currentSuccessRate', Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-red-600">
                    {customInputs.currentSuccessRate}%
                  </span>
                  <span className="text-slate-600 ml-1">succeed</span>
                </div>
              </div>
            </div>
          )}

          {/* Live Target Analysis - Always Shown */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              CrisPRO Target Analysis
            </h5>
            <ZetaScoreGauge />
            <p className="text-xs text-center text-slate-500 mt-2">
              Oracle AI validating therapeutic target in real-time
            </p>
          </div>
        </div>

        {/* ROI Results */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              CrisPRO ROI Impact
            </h4>

            {/* Current Failure Cost */}
            <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-700">Current Monthly Failures</span>
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(roi.monthlyFailureCost)}
              </div>
              <p className="text-xs text-red-600 mt-1">
                Wasted on failed targets ({100 - (mode === 'auto' ? industryStandards : customInputs).currentSuccessRate}% failure rate)
              </p>
            </div>

            {/* Monthly Cost Savings */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Monthly Savings</span>
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {isCalculating ? (
                  <div className="animate-pulse">Calculating...</div>
                ) : (
                  formatCurrency(roi.costSavingsPerMonth)
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Saved by reducing target validation failures
              </p>
            </div>

            {/* Success Rate Improvement */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Success Rate</span>
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                90%
              </div>
              <p className="text-xs text-slate-500 mt-1">
                vs {(mode === 'auto' ? industryStandards : customInputs).currentSuccessRate}% current (+{roi.successRateImprovement.toFixed(0)}% improvement)
              </p>
            </div>

            {/* Time Acceleration */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Validation Speed</span>
                <Clock className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {roi.timeAcceleration}x faster
              </div>
              <p className="text-xs text-slate-500 mt-1">
                18 months → 1 week with Oracle AI
              </p>
            </div>

            {/* Annual ROI */}
            <div className="mb-4 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Annual ROI</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold">
                {roi.annualROI.toFixed(1)}x
              </div>
              <p className="text-xs opacity-75 mt-1">
                Return on CrisPRO investment ($2M/year)
              </p>
            </div>
          </div>

          {/* What This Means */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <h5 className="font-semibold text-slate-900 mb-3">What This Means for Your Pipeline:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Validate {roi.additionalTargets} more targets per year</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>De-risk {roi.programsDeRisked} additional programs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span>95.7% accuracy vs {(mode === 'auto' ? industryStandards : customInputs).currentSuccessRate}% current</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-orange-500" />
                <span>Focus wet-lab resources on validated targets only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
     

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default BiotechROICalculator;
