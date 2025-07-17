'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Clock, Target, CheckCircle, AlertCircle } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { clinicalCases } from '@/data/learn/oncology-101/metastasis-data';

const CaseCard = ({ clinicalCase, isSelected, onClick, delay = 0 }: {
  clinicalCase: any;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.div
    className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'border-blue-500 bg-blue-50 shadow-lg'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
  >
    <div className="flex items-start space-x-4">
      <User className="w-8 h-8 text-blue-600 mt-1" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {clinicalCase.cancerType}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Age: {clinicalCase.patientAge}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Primary: {clinicalCase.primarySite}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">
              Metastases: {clinicalCase.metastaticSites.join(', ')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600">Timeline: {clinicalCase.timeToMetastasis}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CaseDetails = ({ clinicalCase }: { clinicalCase: any }) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    key={clinicalCase.id}
  >
    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Case Study Details</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Patient Information */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          Patient Profile
        </h4>
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-900">Age:</span>
            <span className="ml-2 text-slate-700">{clinicalCase.patientAge} years</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-900">Diagnosis:</span>
            <span className="ml-2 text-slate-700">{clinicalCase.cancerType}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-900">Primary Site:</span>
            <span className="ml-2 text-slate-700">{clinicalCase.primarySite}</span>
          </div>
        </div>
      </div>

      {/* Metastatic Pattern */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-red-600" />
          Metastatic Pattern
        </h4>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <span className="font-medium text-slate-900">Sites:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {clinicalCase.metastaticSites.map((site: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {site}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="font-medium text-slate-900">Timeline:</span>
            <span className="ml-2 text-slate-700">{clinicalCase.timeToMetastasis}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Clinical Outcome */}
    <div className="mt-8">
      <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
        Clinical Management & Outcome
      </h4>
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-slate-700">{clinicalCase.outcome}</p>
      </div>
    </div>

    {/* Key Lessons */}
    <div className="mt-8">
      <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
        Key Learning Points
      </h4>
      <div className="space-y-3">
        {clinicalCase.keyLessons.map((lesson: string, index: number) => (
          <div key={index} className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
            <p className="text-orange-800">{lesson}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CaseComparison = () => {
  const comparisonData = [
    {
      aspect: 'Primary Cancer',
      cases: clinicalCases.map(c => c.cancerType)
    },
    {
      aspect: 'Time to Metastasis',
      cases: clinicalCases.map(c => c.timeToMetastasis)
    },
    {
      aspect: 'Most Common Site',
      cases: clinicalCases.map(c => c.metastaticSites[0])
    },
    {
      aspect: 'Treatment Approach',
      cases: [
        'Bone-targeted therapy',
        'Brain-directed treatment',
        'Surgical resection'
      ]
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Case Comparison Analysis</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-slate-300 p-3 bg-slate-50 text-left font-semibold text-slate-900">
                Aspect
              </th>
              {clinicalCases.map((_, index) => (
                <th key={index} className="border border-slate-300 p-3 bg-slate-50 text-left font-semibold text-slate-900">
                  Case {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-slate-300 p-3 font-medium text-slate-900">
                  {row.aspect}
                </td>
                {row.cases.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-slate-300 p-3 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ClinicalInsights = () => {
  const insights = [
    {
      title: "Pattern Recognition",
      description: "Each cancer type shows predictable metastatic patterns that can guide surveillance strategies.",
      icon: Target
    },
    {
      title: "Timing Variability",
      description: "Time to metastasis varies significantly, from synchronous presentation to years after initial diagnosis.",
      icon: Clock
    },
    {
      title: "Site-Specific Therapy",
      description: "Treatment approaches must be tailored to both the primary cancer type and metastatic sites.",
      icon: CheckCircle
    },
    {
      title: "Early Intervention",
      description: "Cases demonstrate the importance of early detection and intervention in improving outcomes.",
      icon: AlertCircle
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Clinical Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <insight.icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">{insight.title}</h4>
                <p className="text-slate-700 text-sm">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ClinicalCasesSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<any>(null);

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Clinical Case Studies: Metastasis in Practice"
        subtitle="Real-world examples illustrating metastatic patterns and management strategies"
        color="purple"
      />

      {/* Case Selection */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Select a Case to Explore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {clinicalCases.map((clinicalCase, index) => (
            <CaseCard
              key={clinicalCase.id}
              clinicalCase={clinicalCase}
              isSelected={selectedCase?.id === clinicalCase.id}
              onClick={() => setSelectedCase(
                selectedCase?.id === clinicalCase.id ? null : clinicalCase
              )}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {selectedCase && <CaseDetails clinicalCase={selectedCase} />}
      </div>

      {/* Case Comparison */}
      <CaseComparison />

      {/* Clinical Insights */}
      <ClinicalInsights />

      {/* Summary */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          What These Cases Teach Us
        </h3>
        <div className="space-y-4 text-slate-700">
          <p>
            These clinical cases illustrate the diversity of metastatic patterns and the importance 
            of understanding organ-specific tropism in clinical practice.
          </p>
          <p>
            Each case demonstrates how knowledge of metastatic biology translates into practical 
            clinical decisions regarding surveillance, treatment selection, and patient counseling.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-purple-800 font-medium">
              Clinical Pearl: Understanding metastatic patterns enables proactive rather than 
              reactive care, potentially improving outcomes through early intervention and 
              targeted surveillance strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCasesSection; 