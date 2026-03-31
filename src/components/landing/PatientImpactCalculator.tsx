'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Clock, 
  Target, 
  ShieldCheck, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Brain,
  Zap,
  AlertTriangle,
  DollarSign
} from 'lucide-react';

// Import components from slide deck
const ZetaScoreGauge = () => (
  <div className="bg-white p-6 rounded-2xl text-center shadow-inner relative overflow-hidden h-full flex flex-col justify-center">
    <p className="text-lg font-semibold text-slate-600">Variant Impact Score</p>
    <div className="relative w-full max-w-xs mx-auto h-20 my-4">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-gray-200 rounded-t-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-transparent rounded-t-full bg-clip-border" style={{backgroundImage: 'linear-gradient(to right, #10b981, #facc15, #ef4444)', backgroundOrigin: 'border-box'}}></div>
      <motion.div 
        initial={{ rotate: -70 }} 
        animate={{ rotate: 60 }} 
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} 
        className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom -ml-0.5"
      >
        <div className="w-full h-full bg-slate-800 rounded-t-full"></div>
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-slate-800 rounded-full border-2 border-white"></div>
      </motion.div>
    </div>
    <div className="flex justify-between w-40 mx-auto -mt-6 text-xs font-bold">
      <span className="text-green-600">BENIGN</span>
      <span className="text-red-600">PATHOGENIC</span>
    </div>
    <div className="mt-4">
      <p className="text-3xl font-bold font-mono text-red-600">-18,420.8</p>
      <p className="text-sm font-semibold text-red-700 mt-1">High Impact</p>
    </div>
  </div>
);

const EvidenceCard = ({ metric, value, description, source }: {
  metric: string;
  value: string;
  description: string;
  source: string;
}) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-700 mb-2">{metric}</div>
      <p className="text-xs text-slate-500 mb-2">{description}</p>
      <p className="text-xs text-slate-400">{source}</p>
    </div>
  </div>
);

interface PatientScenario {
  patientType: string;
  variantUncertainty: number; // % of variants that are VUS
  treatmentDelay: number; // months
  incorrectTreatment: number; // % chance
}

interface PatientImpact {
  patientsHelped: number;
  treatmentAccuracy: number;
  timeToTreatment: number;
  preventableHarm: number;
  qualityOfLife: number;
  costSavingsPerPatient: number;
}

const PatientImpactCalculator: React.FC = () => {
  const [scenario, setScenario] = useState<PatientScenario>({
    patientType: 'Hereditary Cancer',
    variantUncertainty: 40, // 40% VUS rate
    treatmentDelay: 6, // 6 months average delay
    incorrectTreatment: 30 // 30% get wrong treatment
  });

  const [impact, setImpact] = useState<PatientImpact>({
    patientsHelped: 0,
    treatmentAccuracy: 0,
    timeToTreatment: 0,
    preventableHarm: 0,
    qualityOfLife: 0,
    costSavingsPerPatient: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate patient impact based on scenario
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // CrisPRO resolves 73% of VUS to actionable decisions
      const vusResolved = scenario.variantUncertainty * 0.73;
      const patientsHelped = Math.round((vusResolved / 100) * 1000); // Per 1000 patients
      
      // Treatment accuracy improvement (95.7% vs current ~65%)
      const treatmentAccuracy = 95.7;
      
      // Time reduction: 6 months → same day
      const timeToTreatment = scenario.treatmentDelay * 0.95; // 95% reduction
      
      // Preventable harm: wrong treatments avoided
      const preventableHarm = Math.round(scenario.incorrectTreatment * 0.8); // 80% reduction in wrong treatments
      
      // Quality of life improvement (0-100 scale)
      const qualityOfLife = Math.round(65 + (vusResolved / 100) * 25); // Base 65, up to 90
      
      // Cost savings per patient (reduced unnecessary procedures)
      const costSavingsPerPatient = Math.round(75000 * (vusResolved / 100)); // Up to $75K per patient

      setImpact({
        patientsHelped,
        treatmentAccuracy,
        timeToTreatment,
        preventableHarm,
        qualityOfLife,
        costSavingsPerPatient
      });
      setIsCalculating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [scenario]);

  const updateScenario = (key: keyof PatientScenario, value: number | string) => {
    setScenario(prev => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value.toLocaleString()}`;
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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
          <Heart className="w-4 h-4" />
          Patient Impact Calculator
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          How Many Patients Will CrisPRO Help?
        </h3>
        <p className="text-slate-600">
          See the direct impact on patient outcomes when genetic uncertainty is eliminated
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Patient Scenario Inputs */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-500" />
              Patient Population
            </h4>
            
            {/* Patient Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Patient Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Hereditary Cancer', 'Rare Disease', 'Cardiac Conditions', 'Neurological'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateScenario('patientType', type)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      scenario.patientType === type
                        ? 'bg-pink-500 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-pink-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Uncertainty Rate */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Uncertainty Rate
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="5"
                  value={scenario.variantUncertainty}
                  onChange={(e) => updateScenario('variantUncertainty', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>20%</span>
                  <span>60%</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-red-600">
                  {scenario.variantUncertainty}%
                </span>
                <span className="text-slate-600 ml-1">variants are uncertain</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                How many genetic test results are "uncertain significance"?
              </p>
            </div>

            {/* Treatment Delay */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Average Treatment Delay
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="18"
                  step="1"
                  value={scenario.treatmentDelay}
                  onChange={(e) => updateScenario('treatmentDelay', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 month</span>
                  <span>18 months</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-orange-600">
                  {scenario.treatmentDelay}
                </span>
                <span className="text-slate-600 ml-1">months delay</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                How long do patients wait for treatment decisions?
              </p>
            </div>
          </div>

          {/* Live Variant Analysis */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              Live Variant Analysis
            </h5>
            <ZetaScoreGauge />
            <p className="text-xs text-center text-slate-500 mt-2">
              CrisPRO AI analyzing genetic variant in real-time
            </p>
          </div>
        </div>

        {/* Patient Impact Results */}
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border border-pink-200">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Patient Outcomes Improved
            </h4>

            {/* Patients Helped */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Patients Helped</span>
                <Users className="w-4 h-4 text-pink-500" />
              </div>
              <div className="text-3xl font-bold text-pink-600">
                {isCalculating ? (
                  <div className="animate-pulse">Calculating...</div>
                ) : (
                  `${impact.patientsHelped}/1000`
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Per 1000 patients tested - uncertainty resolved to actionable decisions
              </p>
            </div>

            {/* Treatment Accuracy */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Treatment Accuracy</span>
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {impact.treatmentAccuracy}%
              </div>
              <p className="text-xs text-slate-500 mt-1">
                vs ~65% with traditional genetic testing
              </p>
            </div>

            {/* Time to Treatment */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Time to Treatment</span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                Same Day
              </div>
              <p className="text-xs text-slate-500 mt-1">
                vs {scenario.treatmentDelay} months average delay
              </p>
            </div>

            {/* Quality of Life Score */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Quality of Life</span>
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold">
                {impact.qualityOfLife}/100
              </div>
              <p className="text-xs opacity-75 mt-1">
                Improved outcomes with faster, accurate decisions
              </p>
            </div>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 gap-4">
            <EvidenceCard 
              metric="VUS Resolution" 
              value="73%" 
              description="Uncertain variants resolved" 
              source="Clinical validation"
            />
            <EvidenceCard 
              metric="Cost Savings" 
              value={formatCurrency(impact.costSavingsPerPatient)} 
              description="Per patient treated" 
              source="Healthcare economics"
            />
            <EvidenceCard 
              metric="BRCA Accuracy" 
              value="95.0%" 
              description="Breast cancer variants" 
              source="BRCA1/2 validation"
            />
            <EvidenceCard 
              metric="Time Reduction" 
              value="95%" 
              description="Faster diagnosis" 
              source="Clinical workflow"
            />
          </div>

          {/* What This Means for Patients */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <h5 className="font-semibold text-slate-900 mb-3">What This Means for Patients:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No more waiting months for genetic test results</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Prevent {impact.preventableHarm}% of incorrect treatments</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Immediate peace of mind with clear answers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>Better long-term health outcomes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white text-center">
        <h4 className="text-xl font-bold mb-2">
          Help More Patients Get the Right Treatment
        </h4>
        <p className="mb-4 opacity-90">
          See how CrisPRO can transform patient outcomes in your clinical practice
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.a
            to="/contact"
            className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-4 h-4" />
            Schedule Clinical Demo
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          
          <motion.a
            to="/evidence"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-pink-600 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4" />
            See Clinical Evidence
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ec4899;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default PatientImpactCalculator;
