'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import CrisprGenomeEditor from '@/components/ui/CrisprGenomeEditor';
import ProteinFoldingVisualizer from '@/components/ui/ProteinFoldingVisualizer';
import RelatedLinks from '@/components/shared/RelatedLinks';

// Page sections and elements
const targetSequences = [
  { id: 'tp53', name: 'TP53 Tumor Suppressor', sequence: 'ATGGAGGAGCCGCAGTCAGATCCTAGCGTCGAGCCCCCTCTGAGTCAGGAAAC' },
  { id: 'brca1', name: 'BRCA1 Cancer Susceptibility', sequence: 'GTACCTTGATTTCGTATTCTGAGAGGCTGCTGCTTAGCGGTAGCCCCTTGGTTTCCGTGGCAA' },
  { id: 'egfr', name: 'EGFR Oncogene', sequence: 'ATGCGACCCTCCGGGACGGCCGGGGCAGCGCTCCTGGCGCTGCTGGCTGCGCTCTGCCCGGCGA' },
  { id: 'kras', name: 'KRAS Oncogene', sequence: 'ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGGTGGCGTAGGCAAGAGTGCCTTGACGATAC' },
];

const guideRnas = [
  { id: 'guide1', name: 'High Specificity gRNA', sequence: 'GGCCGGGGCAGCGCTCCTGG', score: 0.92, offtargets: 1 },
  { id: 'guide2', name: 'High Efficiency gRNA', sequence: 'CCTCCGGGACGGCCGGGGCA', score: 0.87, offtargets: 3 },
  { id: 'guide3', name: 'Balanced gRNA', sequence: 'CGCTCCTGGCGCTGCTGGCT', score: 0.89, offtargets: 2 },
];

// Cas variants with their properties
const casVariants = [
  { id: 'cas9', name: 'Cas9', description: "Genome editing capabilities on the CrisPRO.ai platform — CRISPR therapeutic design, target validation, and mechanism-aligned editing strategies for oncology.", specificity: 0.7, efficiency: 0.9 },
  { id: 'cas12a', name: 'Cas12a (Cpf1)', description: 'Alternative nuclease, PAM: TTTV', specificity: 0.85, efficiency: 0.8 },
  { id: 'cas9-hf', name: 'High-fidelity Cas9', description: 'Engineered for higher specificity, PAM: NGG', specificity: 0.95, efficiency: 0.75 },
];

export default function GenomeEditingPage() {
  const [selectedTarget, setSelectedTarget] = useState(targetSequences[0]);
  const [selectedGuide, setSelectedGuide] = useState(guideRnas[0]);
  const [selectedCas, setSelectedCas] = useState(casVariants[0]);
  const [proteinColorScheme, setProteinColorScheme] = useState<'hydrophobicity' | 'charge' | 'structure' | 'rainbow'>('hydrophobicity');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-30">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-blue-400 to-green-400">CRISPR</span> Gene Editing Studio
          </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Advanced Genomic Engineering Visualization</h2>
          <p className="text-xl text-blue-100/90 max-w-3xl">
            Explore the cutting-edge of CRISPR-Cas9 gene editing technology through interactive visualizations.
            Design guide RNAs, analyze off-target effects, and observe protein structures to develop precision therapeutics.
          </p>
        </section>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Target sequence selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Target Sequence</h3>
              <div className="space-y-2">
                {targetSequences.map(target => (
                  <button
                    key={target.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTarget.id === target.id 
                        ? 'bg-blue-500/30 border border-blue-400/50' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTarget(target)}
                  >
                    <div className="font-medium">{target.name}</div>
                    <div className="text-xs font-mono text-blue-200/80 truncate">{target.sequence.substring(0, 30)}...</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Guide RNA selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Guide RNA</h3>
              <div className="space-y-2">
                {guideRnas.map(guide => (
                  <button
                    key={guide.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedGuide.id === guide.id 
                        ? 'bg-blue-500/30 border border-blue-400/50' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <div className="font-medium">{guide.name}</div>
                    <div className="text-xs font-mono text-blue-200/80">{guide.sequence}</div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-green-400">Score: {guide.score}</span>
                      <span className="text-red-400">Off-targets: {guide.offtargets}</span>
                    </div>
                  </button>
                ))}
                
                <button className="w-full mt-4 p-2 border border-dashed border-blue-400/50 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors">
                  + Design Custom Guide RNA
                </button>
              </div>
            </div>
            
            {/* Cas variant selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">CRISPR Nuclease</h3>
              <div className="space-y-2">
                {casVariants.map(cas => (
                  <button
                    key={cas.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCas.id === cas.id 
                        ? 'bg-blue-500/30 border border-blue-400/50' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedCas(cas)}
                  >
                    <div className="font-medium">{cas.name}</div>
                    <div className="text-xs text-blue-200/80">{cas.description}</div>
                    <div className="flex justify-between text-xs mt-2">
                      <div className="flex items-center">
                        <span className="mr-1">Specificity:</span>
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-400" 
                            style={{ width: `${cas.specificity * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">Efficiency:</span>
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-400" 
                            style={{ width: `${cas.efficiency * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Protein visualization controls */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Protein Visualization</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Color scheme</label>
                  <select 
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                    value={proteinColorScheme}
                    onChange={(e) => setProteinColorScheme(e.target.value as any)}
                  >
                    <option value="hydrophobicity">Hydrophobicity</option>
                    <option value="charge">Charge</option>
                    <option value="structure">Secondary Structure</option>
                    <option value="rainbow">Rainbow</option>
                  </select>
                </div>
                
                <button className="w-full p-2 bg-blue-500/20 border border-blue-400/50 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors">
                  Download PDB Structure
                </button>
                
                <button className="w-full p-2 bg-green-500/20 border border-green-400/50 rounded-lg text-green-300 hover:bg-green-500/30 transition-colors">
                  Analyze Protein-DNA Interactions
                </button>
              </div>
            </div>
          </div>
          
          {/* Visualization area */}
          <div className="lg:col-span-2 space-y-8">
            {/* CRISPR visualization */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2">CRISPR Gene Editing</h3>
              <div className="h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-slate-900/80 to-blue-950/80 border border-white/10">
                <CrisprGenomeEditor 
                  targetSequence={selectedTarget.sequence}
                  baseCount={20}
                  rotationSpeed={40}
                />
              </div>
              
              {/* Status bar */}
              <div className="mt-4 p-3 bg-black/30 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm">
                  <span className="text-blue-300 font-medium">Target:</span> {selectedTarget.name}
                </div>
                <div className="text-sm">
                  <span className="text-blue-300 font-medium">Guide:</span> {selectedGuide.name}
                </div>
                <div className="text-sm">
                  <span className="text-blue-300 font-medium">Nuclease:</span> {selectedCas.name}
                </div>
                <div className="text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded">
                  Edit Probability: 87%
                </div>
              </div>
            </motion.div>
            
            {/* Protein visualization */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">Protein Structure Analysis</h3>
              <div className="h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-slate-900/80 to-blue-950/80 border border-white/10">
                <ProteinFoldingVisualizer 
                  colorScheme={proteinColorScheme} 
                  foldingStages={4} 
                  animationDuration={20000}
                />
              </div>
              
              {/* Analysis panel */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-sm font-medium text-blue-300 mb-1">Structure Prediction</div>
                  <div className="text-xs">
                    Alpha Helix: 42% • Beta Sheet: 31% • Loops: 27%
                  </div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-sm font-medium text-blue-300 mb-1">Binding Energy</div>
                  <div className="text-xs">
                    DNA-Protein: -12.3 kcal/mol • Stability: High
                  </div>
                </div>
                <div className="p-3 bg-black/30 rounded-lg">
                  <div className="text-sm font-medium text-blue-300 mb-1">Critical Residues</div>
                  <div className="text-xs">
                    R447, K866, N891, D10, H840
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-blue-400/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Engineer Real Therapies?</h3>
              <p className="text-blue-100/90 max-w-2xl">
                Use our full platform for CRISPR designs. Design, validate, and test gene edits with precision.
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 min-w-40 rounded-lg transition-colors whitespace-nowrap">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    
      <RelatedLinks route="/genome-editing" />
</div>
  );
} 