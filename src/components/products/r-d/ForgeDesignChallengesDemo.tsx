'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Scissors } from 'lucide-react';

/**
 * Simple wrapper for ForgeDesignChallenges demo
 * Used in R&D capability showcase
 */
export default function ForgeDesignChallengesDemo() {
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  
  const designChallenges = [
    {
      id: 'guide_rna',
      title: 'CRISPR Guide RNA Design',
      description: 'Design precision CRISPR guides with Evo2-powered generation',
      metrics: '100% AlphaFold validation'
    },
    {
      id: 'protein',
      title: 'Therapeutic Protein Design',
      description: 'Generate novel biologics with 70% functional coherence',
      metrics: 'Patent-worthy designs'
    },
    {
      id: 'hdr_template',
      title: 'HDR Template Design',
      description: 'Create homology-directed repair blueprints',
      metrics: 'Synteny preservation'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designChallenges.map((challenge) => (
          <motion.button
            key={challenge.id}
            onClick={() => setSelectedDesign(challenge.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selectedDesign === challenge.id
                ? 'border-green-500 bg-green-50'
                : 'border-slate-200 bg-white hover:border-green-300'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Scissors className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-bold text-slate-900">{challenge.title}</h4>
            </div>
            <p className="text-sm text-slate-600 mb-2">{challenge.description}</p>
            <div className="text-xs font-semibold text-green-600">{challenge.metrics}</div>
          </motion.button>
        ))}
      </div>
      {selectedDesign && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
        >
          <h4 className="font-bold text-green-900 mb-3">Design Pipeline Active</h4>
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Evo2 sequence generation complete</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Off-target analysis validated</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>AlphaFold 3 structural validation (95.8% confidence)</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}




