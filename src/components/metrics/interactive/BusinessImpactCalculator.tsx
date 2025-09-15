'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, Target, DollarSign, Users, Zap } from 'lucide-react';

interface CalculatorInputs {
  programBudget: number;
  timelineMonths: number;
  targetCount: number;
  currentAccuracy: number;
  vusRate: number;
  teamSize: number;
}

interface CalculatorResults {
  costSavings: number;
  timeSavings: number;
  successProbability: number;
  roi: number;
  vusReduction: number;
  productivityGain: number;
}

const PatientImpactCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    programBudget: 100, // in millions
    timelineMonths: 60,
    targetCount: 10,
    currentAccuracy: 75,
    vusRate: 40,
    teamSize: 25
  });

  const [results, setResults] = useState<CalculatorResults>({
    costSavings: 0,
    timeSavings: 0,
    successProbability: 0,
    roi: 0,
    vusReduction: 0,
    productivityGain: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate results based on inputs
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // Cost savings calculation
      const baseFailureRate = 0.90; // 90% drug development failure rate
      const accuracyImprovement = (95 - inputs.currentAccuracy) / 100;
      const failureReduction = accuracyImprovement * 0.3; // 30% of failures due to poor target selection
      const costSavings = inputs.programBudget * failureReduction * inputs.targetCount;

      // Time savings (months)
      const timeSavings = inputs.timelineMonths * 0.15; // 15% time reduction

      // Success probability improvement
      const baseSuccessRate = 10; // 10% success rate
      const successProbability = baseSuccessRate + (accuracyImprovement * 15);

      // ROI calculation
      const investmentCost = 0.5; // $500K per program for our platform
      const roi = (costSavings / investmentCost);

      // VUS reduction impact
      const vusReduction = ((inputs.vusRate - 15) / inputs.vusRate) * 100;

      // Productivity gain
      const productivityGain = (accuracyImprovement * 0.4 + (vusReduction / 100) * 0.3) * 100;

      setResults({
        costSavings,
        timeSavings,
        successProbability: Math.min(successProbability, 25), // Cap at 25%
        roi,
        vusReduction: Math.max(vusReduction, 0),
        productivityGain
      });
      setIsCalculating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [inputs]);

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
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
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Calculator className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Patient Impact Calculator
          </h3>
          <p className="text-sm text-slate-600">
            See how better genetics helps more patients get the right treatments
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Parameters */}
        <div className="space-y-6">
          <h4 className="font-medium text-slate-900 mb-4">Treatment Program Details</h4>
          
          {/* Program Budget */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Program Budget (millions)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={inputs.programBudget}
                onChange={(e) => updateInput('programBudget', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>$10M</span>
                <span className="font-medium">${inputs.programBudget}M</span>
                <span>$500M</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Development Timeline (months)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="24"
                max="120"
                step="6"
                value={inputs.timelineMonths}
                onChange={(e) => updateInput('timelineMonths', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>2 years</span>
                <span className="font-medium">{inputs.timelineMonths} months</span>
                <span>10 years</span>
              </div>
            </div>
          </div>

          {/* Target Count */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Therapeutic Targets
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={inputs.targetCount}
                onChange={(e) => updateInput('targetCount', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>1</span>
                <span className="font-medium">{inputs.targetCount} targets</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Current Accuracy */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Target Selection Accuracy
            </label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={inputs.currentAccuracy}
                onChange={(e) => updateInput('currentAccuracy', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>50%</span>
                <span className="font-medium">{inputs.currentAccuracy}%</span>
                <span>90%</span>
              </div>
            </div>
          </div>

          {/* VUS Rate */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current VUS Rate
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={inputs.vusRate}
                onChange={(e) => updateInput('vusRate', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>20%</span>
                <span className="font-medium">{inputs.vusRate}%</span>
                <span>60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h4 className="font-medium text-slate-900 mb-4">Patient & Healthcare Impact</h4>
          
          {/* Loading State */}
          {isCalculating && (
            <div className="flex items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-8 h-8 text-blue-600" />
              </motion.div>
            </div>
          )}

          {/* Results Grid */}
          {!isCalculating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-4"
            >
              {/* Patient Access */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">More Patients Helped</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(results.costSavings)}
                </div>
                <div className="text-sm text-green-700">
                  Resources freed for patient care
                </div>
              </div>

              {/* Treatment Success */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Treatment Success</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {results.roi.toFixed(1)}x
                </div>
                <div className="text-sm text-blue-700">
                  More effective treatments reach patients
                </div>
              </div>

              {/* Treatment Accuracy */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Treatment Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {results.successProbability.toFixed(1)}%
                </div>
                <div className="text-sm text-purple-700">
                  Patients get right treatments faster
                </div>
              </div>

              {/* Patient Wait Time */}
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-900">Faster Access</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {results.timeSavings.toFixed(0)} months
                </div>
                <div className="text-sm text-orange-700">
                  Sooner patients get treatments
                </div>
              </div>

              {/* Clear Answers */}
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Clear Answers</span>
                </div>
                <div className="text-2xl font-bold text-yellow-900">
                  {results.vusReduction.toFixed(0)}%
                </div>
                <div className="text-sm text-yellow-700">
                  Fewer patients left uncertain
                </div>
              </div>

              {/* Healthcare Efficiency */}
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">Healthcare Efficiency</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {results.productivityGain.toFixed(0)}%
                </div>
                <div className="text-sm text-slate-700">
                  Better resource utilization
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Summary Insight */}
      <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">Patient Impact Summary</h4>
        <p className="text-sm text-slate-700">
          With better genetic analysis, you could help{' '}
          <span className="font-semibold text-green-600">{formatCurrency(results.costSavings)} worth</span> of additional patients over{' '}
          <span className="font-semibold">{inputs.timelineMonths} months</span> while increasing treatment accuracy to{' '}
          <span className="font-semibold text-purple-600">{results.successProbability.toFixed(1)}%</span>.
          More patients get the right treatments{' '}
          <span className="font-semibold text-orange-600">{results.timeSavings.toFixed(0)} months sooner</span>, and{' '}
          <span className="font-semibold text-yellow-600">{results.vusReduction.toFixed(0)}% fewer</span> are left with uncertain results.
        </p>
      </div>

      {/* Educational Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">How This Helps Patients:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• More accurate genetic analysis means patients get personalized treatments</li>
          <li>• Faster drug development gets life-saving treatments to patients sooner</li>
          <li>• Fewer uncertain results means families can make informed healthcare decisions</li>
          <li>• Better resource allocation means more patients can access advanced care</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default PatientImpactCalculator;
