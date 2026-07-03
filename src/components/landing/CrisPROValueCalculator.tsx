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
  Shield
} from 'lucide-react';

interface ProgramInputs {
  monthlyRDSpend: number;  // Monthly R&D spend in millions
  targetsPerYear: number;  // How many targets they evaluate per year
  currentVUSRate: number;  // Current VUS rate (variants of uncertain significance)
}

interface CrisPROImpact {
  costSavingsPerMonth: number;
  timeAcceleration: number;
  vusResolutionImprovement: number;
  annualROI: number;
  targetsValidatedFaster: number;
  programsDeRisked: number;
}

const CrisPROValueCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ProgramInputs>({
    monthlyRDSpend: 10, // $10M per month
    targetsPerYear: 12, // 1 target per month
    currentVUSRate: 40   // 40% VUS rate (industry standard)
  });

  const [impact, setImpact] = useState<CrisPROImpact>({
    costSavingsPerMonth: 0,
    timeAcceleration: 0,
    vusResolutionImprovement: 0,
    annualROI: 0,
    targetsValidatedFaster: 0,
    programsDeRisked: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate CrisPRO impact based on inputs
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // CrisPRO delivers 95.7% accuracy vs industry standard ~75%
      const accuracyImprovement = (95.7 - 75) / 100; // 20.7% improvement
      
      // VUS resolution: CrisPRO resolves 73% of VUS to actionable decisions
      const vusResolutionImprovement = (inputs.currentVUSRate * 0.73); // 73% of VUS resolved
      
      // Cost savings: 30% of R&D failures due to poor target validation
      // CrisPRO's accuracy improvement reduces these failures
      const monthlyFailureCost = inputs.monthlyRDSpend * 0.30; // 30% of spend on failed targets
      const costSavingsPerMonth = monthlyFailureCost * accuracyImprovement;
      
      // Time acceleration: Oracle provides instant target validation vs 6-18 months traditional
      const timeAcceleration = 72; // 72x faster (18 months → 1 week)
      
      // Annual ROI calculation (CrisPRO costs $500K/year per program)
      const annualCostSavings = costSavingsPerMonth * 12;
      const crisproCost = 0.5; // $500K per program
      const annualROI = (annualCostSavings / crisproCost);
      
      // Targets validated faster due to instant Oracle analysis
      const targetsValidatedFaster = inputs.targetsPerYear * (timeAcceleration / 72); // Proportional improvement
      
      // Programs de-risked through pre-clinical validation
      const programsDeRisked = inputs.targetsPerYear * 0.6; // 60% of targets become viable programs

      setImpact({
        costSavingsPerMonth,
        timeAcceleration,
        vusResolutionImprovement,
        annualROI,
        targetsValidatedFaster: Math.min(targetsValidatedFaster, inputs.targetsPerYear * 3), // Cap at 3x
        programsDeRisked
      });
      setIsCalculating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [inputs]);

  const updateInput = (key: keyof ProgramInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
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
          <Brain className="w-4 h-4" />
          CrisPRO Impact Calculator
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          See How CrisPRO Transforms Your R&D
        </h3>
        <p className="text-slate-600">
          Adjust your current R&D parameters to see immediate impact from our AI platform
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Controls - What You Tell Us */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Tell Us About Your R&D Program
            </h4>
            
            {/* Monthly R&D Spend */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly R&D Investment
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={inputs.monthlyRDSpend}
                  onChange={(e) => updateInput('monthlyRDSpend', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$1M</span>
                  <span>$50M</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(inputs.monthlyRDSpend)}
                </span>
                <span className="text-slate-600 ml-1">/month</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                How much do you spend on R&D monthly?
              </p>
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
                  max="50"
                  step="1"
                  value={inputs.targetsPerYear}
                  onChange={(e) => updateInput('targetsPerYear', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2/year</span>
                  <span>50/year</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-green-600">
                  {inputs.targetsPerYear}
                </span>
                <span className="text-slate-600 ml-1">targets/year</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                How many therapeutic targets do you evaluate annually?
              </p>
            </div>

            {/* Current VUS Rate */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Uncertainty Rate
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={inputs.currentVUSRate}
                  onChange={(e) => updateInput('currentVUSRate', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>20%</span>
                  <span>70%</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-red-600">
                  {inputs.currentVUSRate}%
                </span>
                <span className="text-slate-600 ml-1">uncertain variants</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                What % of genetic variants are "uncertain significance"?
              </p>
            </div>
          </div>
        </div>

        {/* Results - What CrisPRO Delivers */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              CrisPRO Impact on Your Program
            </h4>

            {/* Monthly Cost Savings */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Monthly Cost Savings</span>
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {isCalculating ? (
                  <div className="animate-pulse">Calculating...</div>
                ) : (
                  formatCurrency(impact.costSavingsPerMonth)
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Saved by avoiding failed target validation
              </p>
            </div>

            {/* Time Acceleration */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Validation Speed</span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {impact.timeAcceleration}x faster
              </div>
              <p className="text-xs text-slate-500 mt-1">
                18 months → 1 week with Oracle AI
              </p>
            </div>

            {/* VUS Resolution */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Uncertainty Eliminated</span>
                <CheckCircle className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {impact.vusResolutionImprovement.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Of uncertain variants resolved to actionable decisions
              </p>
            </div>

            {/* Annual ROI */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Annual ROI</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold">
                {impact.annualROI.toFixed(1)}x
              </div>
              <p className="text-xs opacity-75 mt-1">
                Return on CrisPRO investment ($500K/year)
              </p>
            </div>
          </div>

          {/* Key Benefits Summary */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <h5 className="font-semibold text-slate-900 mb-3">What This Means:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Validate {impact.targetsValidatedFaster.toFixed(0)} more targets per year</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>De-risk {impact.programsDeRisked.toFixed(0)} programs before expensive trials</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>95.7% accuracy vs industry standard ~75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center">
        <h4 className="text-xl font-bold mb-2">
          Ready to See These Results?
        </h4>
        <p className="mb-4 opacity-90">
          Schedule a demo to see how CrisPRO transforms your specific R&D pipeline
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.a
            href="/contact"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="w-4 h-4" />
            Schedule Demo
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          
          <motion.a
            href="/metrics"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="w-4 h-4" />
            See All Metrics
          </motion.a>
        </div>
      </div>

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

export default CrisPROValueCalculator;
