'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Database, 
  Users, 
  Calendar,
  ExternalLink,
  Download,
  Play
} from 'lucide-react';

interface Study {
  id: string;
  name: string;
  disease: string;
  n: number;
  updated: string;
  genes: string[];
  description: string;
}

const mockStudies: Study[] = [
  {
    id: "tcga_ov_pan_can",
    name: "TCGA-OV PanCan",
    disease: "ovarian",
    n: 600,
    updated: "2025-09-01",
    genes: ["BRCA1", "BRCA2", "TP53", "PIK3CA"],
    description: "Pan-cancer ovarian cancer dataset with comprehensive genomic profiling"
  },
  {
    id: "tcga_brca_basal",
    name: "TCGA-BRCA Basal",
    disease: "breast",
    n: 1200,
    updated: "2025-08-15",
    genes: ["BRCA1", "BRCA2", "TP53", "MYC"],
    description: "Basal-like breast cancer subset with triple-negative characteristics"
  },
  {
    id: "tcga_luad_smoking",
    name: "TCGA-LUAD Smoking",
    disease: "lung",
    n: 800,
    updated: "2025-08-20",
    genes: ["KRAS", "TP53", "EGFR", "ALK"],
    description: "Lung adenocarcinoma with smoking history and mutational signatures"
  },
  {
    id: "tcga_coad_msi",
    name: "TCGA-COAD MSI",
    disease: "colorectal",
    n: 400,
    updated: "2025-08-10",
    genes: ["MLH1", "MSH2", "BRAF", "KRAS"],
    description: "Colorectal adenocarcinoma with microsatellite instability"
  }
];

export const StudyBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const diseases = ['all', ...Array.from(new Set(mockStudies.map(s => s.disease)))];
  
  const filteredStudies = mockStudies.filter(study => {
    const matchesSearch = study.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDisease = selectedDisease === 'all' || study.disease === selectedDisease;
    return matchesSearch && matchesDisease;
  });

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Study Catalog</h3>
          <p className="text-gray-600">Browse and select studies for cohort extraction</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {diseases.map(disease => (
              <option key={disease} value={disease}>
                {disease === 'all' ? 'All Diseases' : disease.charAt(0).toUpperCase() + disease.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Study Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredStudies.map((study, index) => (
          <motion.div
            key={study.id}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedStudy?.id === study.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => setSelectedStudy(study)}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">{study.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{study.disease} cancer</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                  <Users className="w-4 h-4" />
                  {study.n.toLocaleString()} samples
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {study.updated}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{study.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {study.genes.slice(0, 4).map(gene => (
                <span key={gene} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                  {gene}
                </span>
              ))}
              {study.genes.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                  +{study.genes.length - 4} more
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Study Actions */}
      {selectedStudy && (
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-gray-800">Selected: {selectedStudy.name}</h4>
              <p className="text-gray-600">{selectedStudy.n.toLocaleString()} samples • {selectedStudy.genes.length} genes</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <ExternalLink className="w-4 h-4" />
                View Details
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
                <Play className="w-4 h-4" />
                Extract Cohort
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <strong>Next:</strong> Configure extraction parameters, select genes of interest, and run cohort extraction with benchmarking.
          </div>
        </motion.div>
      )}

      {/* API Example */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h5 className="font-semibold text-gray-800 mb-2">API Example</h5>
        <code className="text-sm text-gray-600 block">
          GET /api/datasets/studies → StudyList
        </code>
      </div>
    </div>
  );
};
