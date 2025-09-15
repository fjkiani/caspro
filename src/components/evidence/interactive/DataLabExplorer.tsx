'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseInteractiveDemo, { AnalysisLoading, ProgressBar } from '@/components/metrics/interactive/BaseInteractiveDemo';
import { Database, Search, Filter, Download, Eye, BarChart3, Users, Calendar, Microscope } from 'lucide-react';

interface StudyData {
  id: string;
  title: string;
  type: 'genomic' | 'clinical' | 'therapeutic' | 'population';
  patientCount: number;
  dataPoints: number;
  completion: number;
  therapeuticPipeline: string[];
  keyFindings: string[];
  accessibility: 'public' | 'restricted' | 'proprietary';
  lastUpdated: string;
  collaborators: number;
}

const mockStudies: StudyData[] = [
  {
    id: 'study1',
    title: 'TCGA Pan-Cancer Atlas - Breast Cancer Cohort',
    type: 'genomic',
    patientCount: 1084,
    dataPoints: 2847392,
    completion: 100,
    therapeuticPipeline: ['CDK4/6 inhibitors', 'PI3K/mTOR pathway', 'Immunotherapy'],
    keyFindings: [
      'PIK3CA mutations in 36% of samples',
      'TP53 mutations correlate with triple-negative subtype',
      'Novel fusion events in 12% of cases'
    ],
    accessibility: 'public',
    lastUpdated: '2024-01-15',
    collaborators: 23
  },
  {
    id: 'study2',
    title: 'Real-World Evidence: NSCLC Treatment Outcomes',
    type: 'clinical',
    patientCount: 5847,
    dataPoints: 1923847,
    completion: 85,
    therapeuticPipeline: ['EGFR TKIs', 'ALK inhibitors', 'PD-1/PD-L1 checkpoint inhibitors'],
    keyFindings: [
      '23% improvement in progression-free survival',
      'Biomarker-guided therapy shows 40% higher response rates',
      'Resistance mechanisms identified in 67% of progressive cases'
    ],
    accessibility: 'restricted',
    lastUpdated: '2024-01-20',
    collaborators: 45
  },
  {
    id: 'study3',
    title: 'Therapeutic Target Discovery - Rare Diseases',
    type: 'therapeutic',
    patientCount: 234,
    dataPoints: 892374,
    completion: 60,
    therapeuticPipeline: ['Gene therapy', 'Small molecule inhibitors', 'Antisense oligonucleotides'],
    keyFindings: [
      'Novel therapeutic target identified in FOXG1 pathway',
      '3 potential drug candidates in preclinical testing',
      'Patient-derived organoids show 78% response rate'
    ],
    accessibility: 'proprietary',
    lastUpdated: '2024-01-18',
    collaborators: 12
  }
];

interface DataLabProps {
  title?: string;
  subtitle?: string;
  studies?: StudyData[];
  showPipeline?: boolean;
}

const DataLabExplorer: React.FC<DataLabProps> = ({
  title = "Data Lab Interactive Browser",
  subtitle = "Explore genomic datasets and therapeutic pipelines in real-time",
  studies = mockStudies,
  showPipeline = true
}) => {
  const [selectedStudy, setSelectedStudy] = useState<StudyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'genomic' | 'clinical' | 'therapeutic' | 'population'>('all');
  const [showDetails, setShowDetails] = useState(false);

  const exploreStudy = (study: StudyData) => {
    setIsLoading(true);
    setSelectedStudy(null);
    setShowDetails(false);
    
    setTimeout(() => {
      setSelectedStudy(study);
      setIsLoading(false);
    }, 1800);
  };

  const filteredStudies = studies.filter(study => 
    activeFilter === 'all' || study.type === activeFilter
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'genomic': return 'bg-blue-100 text-blue-700';
      case 'clinical': return 'bg-green-100 text-green-700';
      case 'therapeutic': return 'bg-purple-100 text-purple-700';
      case 'population': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAccessibilityColor = (accessibility: string) => {
    switch (accessibility) {
      case 'public': return 'text-green-600 bg-green-50';
      case 'restricted': return 'text-orange-600 bg-orange-50';
      case 'proprietary': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const demoConfig = {
    title,
    subtitle,
    icon: Database,
    iconColor: 'text-purple-600',
    primaryColor: 'bg-purple-100',
    accentColor: 'purple'
  };

  const educationalContent = {
    title: "What This Demonstrates:",
    points: [
      "How researchers can instantly access and explore large-scale genomic datasets",
      "Real-time therapeutic pipeline insights integrated with study data",
      "The power of collaborative research platforms for accelerating discovery",
      "How data accessibility levels balance open science with intellectual property"
    ]
  };

  return (
    <BaseInteractiveDemo config={demoConfig} educationalContent={educationalContent}>
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search studies, genes, or therapeutic targets..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex bg-slate-100 rounded-lg p-1">
          {(['all', 'genomic', 'clinical', 'therapeutic'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                activeFilter === filter
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Studies Grid */}
      <div className="grid gap-4 mb-6">
        {filteredStudies.map((study) => (
          <motion.button
            key={study.id}
            onClick={() => exploreStudy(study)}
            disabled={isLoading}
            className="w-full p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(study.type)}`}>
                  {study.type}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 mb-1">{study.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {formatNumber(study.patientCount)} patients
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {formatNumber(study.dataPoints)} data points
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {study.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessibilityColor(study.accessibility)}`}>
                  {study.accessibility}
                </div>
                <div className="text-sm text-slate-500">{study.completion}%</div>
              </div>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${study.completion}%` }}
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <AnalysisLoading
            title="Loading study data..."
            subtitle="Accessing datasets and therapeutic pipeline information"
            icon={Database}
            color="purple"
            duration={1.8}
          />
        )}
      </AnimatePresence>

      {/* Study Details */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Study Header */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">{selectedStudy.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedStudy.type)}`}>
                      {selectedStudy.type}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessibilityColor(selectedStudy.accessibility)}`}>
                      {selectedStudy.accessibility}
                    </div>
                    <span>{selectedStudy.collaborators} collaborators</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{selectedStudy.completion}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                </div>
              </div>
            </div>

            {/* Study Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h5 className="font-medium text-slate-900">Patient Cohort</h5>
                </div>
                <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedStudy.patientCount)}</div>
                <p className="text-xs text-slate-600">Enrolled patients</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <h5 className="font-medium text-slate-900">Data Volume</h5>
                </div>
                <div className="text-2xl font-bold text-green-600">{formatNumber(selectedStudy.dataPoints)}</div>
                <p className="text-xs text-slate-600">Data points analyzed</p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Microscope className="w-5 h-5 text-purple-600" />
                  <h5 className="font-medium text-slate-900">Progress</h5>
                </div>
                <ProgressBar
                  value={selectedStudy.completion / 100}
                  color="purple"
                  showPercentage={false}
                  animated={true}
                />
                <p className="text-xs text-slate-600 mt-1">Study completion</p>
              </div>
            </div>

            {/* Key Findings */}
            <div className="p-4 border border-slate-200 rounded-lg">
              <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600" />
                Key Findings
              </h5>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedStudy.keyFindings.map((finding, index) => (
                  <motion.div
                    key={finding}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{finding}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Therapeutic Pipeline */}
            {showPipeline && selectedStudy.therapeuticPipeline.length > 0 && (
              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                <h5 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Therapeutic Pipeline Insights
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.therapeuticPipeline.map((therapy, index) => (
                    <motion.span
                      key={therapy}
                      className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium border border-purple-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {therapy}
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm text-purple-800 mt-3">
                  This study provides direct insights for {selectedStudy.therapeuticPipeline.length} therapeutic approaches currently in development.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button className="flex-1 py-2 px-4 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
            </div>

            {/* Platform Advantage */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-900 mb-2">Data Lab Advantage</h5>
              <p className="text-sm text-purple-800">
                Access <strong>50+ curated datasets</strong> with real-time therapeutic pipeline integration. 
                Our platform reduces data discovery time from <strong>weeks to minutes</strong> and provides 
                direct connections to <strong>200+ active drug development programs</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseInteractiveDemo>
  );
};

export default DataLabExplorer;
