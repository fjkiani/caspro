'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseInteractiveDemo, { AnalysisLoading, ProgressBar } from '@/components/metrics/interactive/BaseInteractiveDemo';
import { Users, Target, TrendingUp, MapPin, Calendar, Filter, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

interface CohortData {
  id: string;
  name: string;
  population: string;
  size: number;
  demographics: {
    avgAge: number;
    genderSplit: { male: number; female: number };
    ethnicity: { [key: string]: number };
  };
  geneticProfile: {
    variantFrequency: number;
    pathogenicVariants: number;
    vusCount: number;
  };
  clinicalOutcomes: {
    responseRate: number;
    progressionFreeMonths: number;
    overallSurvivalMonths: number;
  };
  biomarkers: string[];
  therapeuticRecommendations: string[];
  riskStratification: 'low' | 'moderate' | 'high';
}

const mockCohorts: CohortData[] = [
  {
    id: 'cohort1',
    name: 'BRCA+ Breast Cancer Patients',
    population: 'Hereditary Breast Cancer',
    size: 2847,
    demographics: {
      avgAge: 52,
      genderSplit: { male: 2, female: 98 },
      ethnicity: { 'Caucasian': 72, 'Hispanic': 15, 'African American': 8, 'Asian': 5 }
    },
    geneticProfile: {
      variantFrequency: 0.34,
      pathogenicVariants: 156,
      vusCount: 89
    },
    clinicalOutcomes: {
      responseRate: 0.78,
      progressionFreeMonths: 24.3,
      overallSurvivalMonths: 67.8
    },
    biomarkers: ['BRCA1/2 mutations', 'Homologous recombination deficiency', 'PARP inhibitor sensitivity'],
    therapeuticRecommendations: ['PARP inhibitors', 'Platinum-based chemotherapy', 'CDK4/6 inhibitors'],
    riskStratification: 'high'
  },
  {
    id: 'cohort2',
    name: 'EGFR+ NSCLC Asian Population',
    population: 'Non-Small Cell Lung Cancer',
    size: 1923,
    demographics: {
      avgAge: 64,
      genderSplit: { male: 45, female: 55 },
      ethnicity: { 'Asian': 100 }
    },
    geneticProfile: {
      variantFrequency: 0.42,
      pathogenicVariants: 234,
      vusCount: 67
    },
    clinicalOutcomes: {
      responseRate: 0.85,
      progressionFreeMonths: 18.7,
      overallSurvivalMonths: 42.1
    },
    biomarkers: ['EGFR L858R', 'EGFR Exon 19 deletion', 'T790M resistance'],
    therapeuticRecommendations: ['Osimertinib', 'Afatinib', 'Combination immunotherapy'],
    riskStratification: 'moderate'
  },
  {
    id: 'cohort3',
    name: 'Rare Disease Pediatric Cohort',
    population: 'Pediatric Genetic Disorders',
    size: 456,
    demographics: {
      avgAge: 8,
      genderSplit: { male: 52, female: 48 },
      ethnicity: { 'Caucasian': 65, 'Hispanic': 20, 'African American': 10, 'Asian': 3, 'Other': 2 }
    },
    geneticProfile: {
      variantFrequency: 0.89,
      pathogenicVariants: 78,
      vusCount: 234
    },
    clinicalOutcomes: {
      responseRate: 0.45,
      progressionFreeMonths: 12.4,
      overallSurvivalMonths: 28.9
    },
    biomarkers: ['De novo mutations', 'Copy number variations', 'Metabolic markers'],
    therapeuticRecommendations: ['Gene therapy', 'Enzyme replacement', 'Symptomatic treatment'],
    riskStratification: 'high'
  }
];

interface CohortSimulatorProps {
  title?: string;
  subtitle?: string;
  cohorts?: CohortData[];
  showComparison?: boolean;
}

const CohortContextSimulator: React.FC<CohortSimulatorProps> = ({
  title = "Cohort Context Engine",
  subtitle = "See how population-level insights enhance individual patient decisions",
  cohorts = mockCohorts,
  showComparison = true
}) => {
  const [selectedCohort, setSelectedCohort] = useState<CohortData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState<'demographics' | 'genetics' | 'outcomes' | 'recommendations'>('demographics');
  const [showStratification, setShowStratification] = useState(false);

  const analyzeCohort = (cohort: CohortData) => {
    setIsAnalyzing(true);
    setSelectedCohort(null);
    setShowStratification(false);
    setActiveView('demographics');
    
    setTimeout(() => {
      setSelectedCohort(cohort);
      setIsAnalyzing(false);
    }, 2200);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const demoConfig = {
    title,
    subtitle,
    icon: Users,
    iconColor: 'text-blue-600',
    primaryColor: 'bg-blue-100',
    accentColor: 'blue'
  };

  const educationalContent = {
    title: "What This Demonstrates:",
    points: [
      "How population-level genetic and clinical data informs individual treatment decisions",
      "The importance of demographic and ethnic considerations in precision medicine",
      "How cohort context reduces uncertainty in variant interpretation and therapy selection",
      "Why representative population data is critical for equitable healthcare outcomes"
    ]
  };

  return (
    <BaseInteractiveDemo config={demoConfig} educationalContent={educationalContent}>
      {/* Cohort Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Select a cohort for contextual analysis:</h4>
        <div className="grid gap-3">
          {cohorts.map((cohort) => (
            <button
              key={cohort.id}
              onClick={() => analyzeCohort(cohort)}
              disabled={isAnalyzing}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{cohort.name}</div>
                  <div className="text-xs text-slate-600">
                    {formatNumber(cohort.size)} patients • {cohort.population}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(cohort.riskStratification)}`}>
                  {cohort.riskStratification} risk
                </div>
                <Target className="w-4 h-4 text-blue-600" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnalysisLoading
            title="Analyzing cohort context..."
            subtitle="Processing population genetics, demographics, and clinical outcomes"
            icon={BarChart3}
            color="blue"
            duration={2.2}
          />
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {selectedCohort && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Cohort Header */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-slate-900">{selectedCohort.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedCohort.size)}</div>
                  <div className="text-sm text-slate-600">patients</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(selectedCohort.riskStratification)}`}>
                    {selectedCohort.riskStratification === 'high' ? (
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                    )}
                    {selectedCohort.riskStratification} risk
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">{selectedCohort.population}</p>
            </div>

            {/* View Tabs */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              {(['demographics', 'genetics', 'outcomes', 'recommendations'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeView === view
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            {/* Content based on active view */}
            <AnimatePresence mode="wait">
              {activeView === 'demographics' && (
                <motion.div
                  key="demographics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Age and Gender */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        Age Distribution
                      </h5>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {selectedCohort.demographics.avgAge}
                      </div>
                      <p className="text-sm text-slate-600">Average age (years)</p>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-3">Gender Distribution</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Female</span>
                          <span className="font-medium">{selectedCohort.demographics.genderSplit.female}%</span>
                        </div>
                        <ProgressBar
                          value={selectedCohort.demographics.genderSplit.female / 100}
                          color="blue"
                          showPercentage={false}
                          animated={true}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Male</span>
                          <span className="font-medium">{selectedCohort.demographics.genderSplit.male}%</span>
                        </div>
                        <ProgressBar
                          value={selectedCohort.demographics.genderSplit.male / 100}
                          color="green"
                          showPercentage={false}
                          animated={true}
                          delay={0.2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ethnicity Breakdown */}
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h5 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Ethnicity Distribution
                    </h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(selectedCohort.demographics.ethnicity).map(([ethnicity, percentage], index) => (
                        <div key={ethnicity} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">{ethnicity}</span>
                            <span className="font-medium text-slate-900">{percentage}%</span>
                          </div>
                          <ProgressBar
                            value={percentage / 100}
                            color={index % 2 === 0 ? 'blue' : 'green'}
                            showPercentage={false}
                            animated={true}
                            delay={index * 0.1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeView === 'genetics' && (
                <motion.div
                  key="genetics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Genetic Profile Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                      <h5 className="font-medium text-green-900 mb-2">Variant Frequency</h5>
                      <div className="text-2xl font-bold text-green-700">
                        {(selectedCohort.geneticProfile.variantFrequency * 100).toFixed(0)}%
                      </div>
                      <p className="text-xs text-green-600">Of patients carry variants</p>
                    </div>

                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h5 className="font-medium text-red-900 mb-2">Pathogenic Variants</h5>
                      <div className="text-2xl font-bold text-red-700">
                        {selectedCohort.geneticProfile.pathogenicVariants}
                      </div>
                      <p className="text-xs text-red-600">Confirmed disease-causing</p>
                    </div>

                    <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                      <h5 className="font-medium text-orange-900 mb-2">VUS Count</h5>
                      <div className="text-2xl font-bold text-orange-700">
                        {selectedCohort.geneticProfile.vusCount}
                      </div>
                      <p className="text-xs text-orange-600">Variants of unknown significance</p>
                    </div>
                  </div>

                  {/* Biomarkers */}
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h5 className="font-medium text-slate-900 mb-3">Key Biomarkers</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCohort.biomarkers.map((biomarker, index) => (
                        <motion.span
                          key={biomarker}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {biomarker}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeView === 'outcomes' && (
                <motion.div
                  key="outcomes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Clinical Outcomes */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-3">Response Rate</h5>
                      <ProgressBar
                        value={selectedCohort.clinicalOutcomes.responseRate}
                        color="green"
                        label={`${(selectedCohort.clinicalOutcomes.responseRate * 100).toFixed(0)}% of patients respond`}
                        animated={true}
                      />
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Progression-Free Survival</h5>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCohort.clinicalOutcomes.progressionFreeMonths}
                      </div>
                      <p className="text-sm text-slate-600">months (median)</p>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Overall Survival</h5>
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedCohort.clinicalOutcomes.overallSurvivalMonths}
                      </div>
                      <p className="text-sm text-slate-600">months (median)</p>
                    </div>
                  </div>

                  {/* Outcomes Visualization */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h5 className="font-medium text-slate-900 mb-3">Survival Curves</h5>
                    <div className="h-32 bg-white rounded border border-slate-200 flex items-center justify-center">
                      <p className="text-slate-500 text-sm">Interactive survival analysis would appear here</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeView === 'recommendations' && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Therapeutic Recommendations */}
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <h5 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Recommended Therapies
                    </h5>
                    <div className="space-y-3">
                      {selectedCohort.therapeuticRecommendations.map((therapy, index) => (
                        <motion.div
                          key={therapy}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-green-800 font-medium">{therapy}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Population-Specific Insights */}
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h5 className="font-medium text-blue-900 mb-3">Population-Specific Insights</h5>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• This cohort shows {selectedCohort.clinicalOutcomes.responseRate > 0.7 ? 'excellent' : 'moderate'} response to targeted therapy</p>
                      <p>• Genetic variant frequency is {selectedCohort.geneticProfile.variantFrequency > 0.5 ? 'significantly higher' : 'comparable'} to general population</p>
                      <p>• Risk stratification suggests {selectedCohort.riskStratification} priority for early intervention</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cohort Comparison */}
            {showComparison && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">Cohort Context Advantage</h5>
                <p className="text-sm text-blue-800">
                  Population-specific data improves treatment selection accuracy by <strong>67%</strong> and reduces 
                  adverse events by <strong>34%</strong>. Cohort context is especially critical for underrepresented 
                  populations where genetic variant interpretation may differ significantly.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseInteractiveDemo>
  );
};

export default CohortContextSimulator;
