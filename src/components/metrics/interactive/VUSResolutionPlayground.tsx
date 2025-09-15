'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, Clock, HelpCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  variant: string;
  familyHistory: string;
  beforeClassification: 'VUS' | 'pathogenic' | 'benign';
  afterClassification: 'VUS' | 'pathogenic' | 'benign';
  confidence: number;
  clinicalImpact: string;
  costSavings: number;
  timeToResolution: string;
}

const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah M.',
    age: 34,
    variant: 'BRCA2 c.7436T>G',
    familyHistory: 'Mother with breast cancer at 45',
    beforeClassification: 'VUS',
    afterClassification: 'pathogenic',
    confidence: 0.91,
    clinicalImpact: 'Enhanced screening, genetic counseling recommended',
    costSavings: 21000,
    timeToResolution: 'Minutes vs 6+ months'
  },
  {
    id: 'p2',
    name: 'Maria L.',
    age: 28,
    variant: 'TP53 c.524G>A',
    familyHistory: 'No significant family history',
    beforeClassification: 'VUS',
    afterClassification: 'benign',
    confidence: 0.87,
    clinicalImpact: 'Standard screening protocols, family reassured',
    costSavings: 18500,
    timeToResolution: 'Minutes vs 12+ months'
  },
  {
    id: 'p3',
    name: 'Jennifer K.',
    age: 41,
    variant: 'ATM c.8734A>T',
    familyHistory: 'Sister with ovarian cancer',
    beforeClassification: 'VUS',
    afterClassification: 'VUS',
    confidence: 0.52,
    clinicalImpact: 'Requires additional functional studies',
    costSavings: 0,
    timeToResolution: 'Still uncertain'
  }
];

const VUSResolutionPlayground: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [animateTransition, setAnimateTransition] = useState(false);

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'VUS': return HelpCircle;
      case 'pathogenic': return XCircle;
      case 'benign': return CheckCircle;
      default: return HelpCircle;
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'VUS': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'pathogenic': return 'text-red-600 bg-red-50 border-red-200';
      case 'benign': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const resolvedPatients = mockPatients.filter(p => p.afterClassification !== 'VUS');
  const totalSavings = resolvedPatients.reduce((sum, p) => sum + p.costSavings, 0);
  const resolutionRate = (resolvedPatients.length / mockPatients.length) * 100;

  const toggleView = () => {
    setAnimateTransition(true);
    setTimeout(() => {
      setShowBefore(!showBefore);
      setAnimateTransition(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <HelpCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              VUS Resolution Impact
            </h3>
            <p className="text-sm text-slate-600">
              See how AI reduces uncertainty for real patients
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">
            {resolutionRate.toFixed(0)}%
          </div>
          <div className="text-xs text-blue-700">VUS Resolved</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="text-2xl font-bold text-green-900">
            ${(totalSavings / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-green-700">Total Savings</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <div className="text-2xl font-bold text-purple-900">
            {mockPatients.length}
          </div>
          <div className="text-xs text-purple-700">Patients</div>
        </div>
      </div>

      {/* Before/After Toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={toggleView}
            disabled={animateTransition}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              showBefore
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Before AI (40% VUS Rate)
          </button>
          <button
            onClick={toggleView}
            disabled={animateTransition}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !showBefore
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            After AI (15% VUS Rate)
          </button>
        </div>
      </div>

      {/* Patient Cases */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showBefore ? 'before' : 'after'}
          initial={{ opacity: 0, x: animateTransition ? (showBefore ? -20 : 20) : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: showBefore ? 20 : -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {mockPatients.map((patient, index) => {
            const classification = showBefore ? patient.beforeClassification : patient.afterClassification;
            const Icon = getClassificationIcon(classification);
            const colorClass = getClassificationColor(classification);
            
            return (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedPatient?.id === patient.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'bg-white border-slate-200'
                }`}
                onClick={() => setSelectedPatient(selectedPatient?.id === patient.id ? null : patient)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg border ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        {patient.name}, {patient.age}
                      </div>
                      <div className="text-sm text-slate-600 font-mono">
                        {patient.variant}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {patient.familyHistory}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                      {classification.toUpperCase()}
                    </div>
                    {!showBefore && patient.afterClassification !== 'VUS' && (
                      <div className="text-xs text-green-600 mt-1 font-medium">
                        {patient.confidence > 0 ? `${(patient.confidence * 100).toFixed(0)}% confident` : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedPatient?.id === patient.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-200"
                    >
                      {!showBefore && (
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <div>
                              <div className="text-xs text-slate-600">Time Saved</div>
                              <div className="font-medium text-slate-900">{patient.timeToResolution}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <div>
                              <div className="text-xs text-slate-600">Cost Savings</div>
                              <div className="font-medium text-slate-900">
                                ${patient.costSavings.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <div>
                              <div className="text-xs text-slate-600">Family Impact</div>
                              <div className="font-medium text-slate-900">
                                {patient.afterClassification !== 'VUS' ? 'Resolved' : 'Ongoing'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h5 className="font-medium text-slate-900 mb-2">
                          {showBefore ? 'Patient Journey Before AI' : 'Clinical Impact After AI'}
                        </h5>
                        <p className="text-sm text-slate-700">
                          {showBefore 
                            ? `Patient receives uncertain results, leading to anxiety and multiple follow-up appointments. Family members unsure about their own risk.`
                            : patient.clinicalImpact
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Impact Summary */}
      <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200">
        <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Real-World Impact
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-slate-800 mb-2">Before AI Classification:</div>
            <ul className="text-slate-600 space-y-1 text-xs">
              <li>• 40% of patients receive "uncertain" results</li>
              <li>• Families remain in limbo for months or years</li>
              <li>• Expensive follow-up testing and family screening</li>
              <li>• Anxiety and delayed clinical decision-making</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-slate-800 mb-2">After AI Classification:</div>
            <ul className="text-slate-600 space-y-1 text-xs">
              <li>• Only 15% remain uncertain (62% improvement)</li>
              <li>• Clear answers enable proactive healthcare decisions</li>
              <li>• Average savings of $21K per resolved VUS</li>
              <li>• Immediate results vs months of uncertainty</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">What This Demonstrates:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• How VUS resolution directly impacts patient care and family decisions</li>
          <li>• The financial burden of uncertain genetic test results</li>
          <li>• Why confidence scoring is crucial for clinical decision-making</li>
          <li>• The ripple effect of resolving one variant on entire families</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default VUSResolutionPlayground;
