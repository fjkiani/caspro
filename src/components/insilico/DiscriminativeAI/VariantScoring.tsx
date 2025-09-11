'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import VariantSearch from './VariantSearch';
import VariantCard from './VariantCard';
import VariantDetails from './VariantDetails';

interface VariantResult {
  variant: string;
  gene: string;
  evo2Score: number;
  alphaMissenseScore?: number;
  gpnMsaScore?: number;
  ensembleScore: number;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  tier: 'supported' | 'consider' | 'insufficient';
}

const mockVariants: VariantResult[] = [
  {
    variant: 'R175H',
    gene: 'TP53',
    evo2Score: 0.92,
    alphaMissenseScore: 0.95,
    gpnMsaScore: 0.89,
    ensembleScore: 0.94,
    confidence: 'high',
    evidence: ['ClinVar pathogenic', 'DMS correlation', 'Structural impact'],
    tier: 'supported'
  },
  {
    variant: 'V600E',
    gene: 'BRAF',
    evo2Score: 0.88,
    alphaMissenseScore: 0.91,
    ensembleScore: 0.90,
    confidence: 'high',
    evidence: ['ClinVar pathogenic', 'Oncogenic hotspot'],
    tier: 'supported'
  },
  {
    variant: 'c.1234+1G>A',
    gene: 'BRCA1',
    evo2Score: 0.85,
    ensembleScore: 0.85,
    confidence: 'medium',
    evidence: ['Splice prediction', 'Conservation score'],
    tier: 'consider'
  }
];

const VariantScoring: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<VariantResult | null>(null);

  const handleScoreVariants = () => {
    // TODO: Implement actual variant scoring logic
    console.log('Scoring variants:', searchTerm);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Discriminative AI: Variant Scoring</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Evo2 zero-shot ΔLL scoring with specialist ensemble (AlphaMissense/GPN-MSA) 
          for comprehensive variant effect prediction across coding and noncoding regions.
        </p>
      </motion.div>

      <VariantSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onScoreVariants={handleScoreVariants}
      />

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Variant List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Variant Results</h3>
          {mockVariants.map((variant, index) => (
            <VariantCard
              key={variant.variant}
              variant={variant}
              isSelected={selectedVariant?.variant === variant.variant}
              onSelect={() => setSelectedVariant(variant)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Detailed View */}
        <VariantDetails variant={selectedVariant} />
      </div>
    </div>
  );
};

export default VariantScoring;
