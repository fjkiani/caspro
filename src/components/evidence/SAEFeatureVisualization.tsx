'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Eye, EyeOff, Play, Pause } from 'lucide-react';

interface SAEFeature {
  id: string;
  label: string;
  type: 'exon' | 'intron' | 'tfbs' | 'structure' | 'motif';
  position: number;
  strength: number;
  description: string;
}

const mockFeatures: SAEFeature[] = [
  {
    id: 'f_102',
    label: 'Exon Boundary',
    type: 'exon',
    position: 43044290,
    strength: 0.82,
    description: 'Critical exon-intron junction'
  },
  {
    id: 'f_211',
    label: 'TF Motif (AP-1)',
    type: 'tfbs',
    position: 43044310,
    strength: 0.67,
    description: 'Transcription factor binding site'
  },
  {
    id: 'f_156',
    label: 'Secondary Structure',
    type: 'structure',
    position: 43044350,
    strength: 0.45,
    description: 'Alpha-helix formation region'
  },
  {
    id: 'f_089',
    label: 'Splice Site',
    type: 'motif',
    position: 43044400,
    strength: 0.73,
    description: 'Canonical splice acceptor site'
  }
];

const typeColors = {
  exon: 'bg-blue-500',
  intron: 'bg-gray-500',
  tfbs: 'bg-green-500',
  structure: 'bg-purple-500',
  motif: 'bg-orange-500'
};

const typeLabels = {
  exon: 'Exon',
  intron: 'Intron',
  tfbs: 'TFBS',
  structure: 'Structure',
  motif: 'Motif'
};

export const SAEFeatureVisualization: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<SAEFeature | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set(mockFeatures.map(f => f.id)));

  const toggleFeature = (featureId: string) => {
    const newVisible = new Set(visibleFeatures);
    if (newVisible.has(featureId)) {
      newVisible.delete(featureId);
    } else {
      newVisible.add(featureId);
    }
    setVisibleFeatures(newVisible);
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
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
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Feature Overlay Visualization
          </h3>
        </div>
        <button
          onClick={startAnimation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAnimating ? 'Animating...' : 'Animate'}
        </button>
      </div>

      {/* Feature Controls */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Toggle Features:</h4>
        <div className="flex flex-wrap gap-2">
          {mockFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                visibleFeatures.has(feature.id)
                  ? `${typeColors[feature.type]} text-white`
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {visibleFeatures.has(feature.id) ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
              {typeLabels[feature.type]}
            </button>
          ))}
        </div>
      </div>

      {/* Genomic Sequence Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Genomic Sequence (43044290-43044450):</h4>
        <div className="relative bg-slate-100 rounded-lg p-4 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {Array.from({ length: 160 }, (_, i) => {
              const position = 43044290 + i;
              const feature = mockFeatures.find(f => 
                Math.abs(f.position - position) <= 5 && visibleFeatures.has(f.id)
              );
              
              return (
                <motion.div
                  key={i}
                  className={`w-3 h-8 rounded-sm ${
                    feature 
                      ? `${typeColors[feature.type]} opacity-80` 
                      : 'bg-slate-300'
                  }`}
                  animate={isAnimating && feature ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  } : {}}
                  transition={{ duration: 0.5, delay: i * 0.01 }}
                  onMouseEnter={() => feature && setSelectedFeature(feature)}
                  onMouseLeave={() => setSelectedFeature(null)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Details */}
      {selectedFeature && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 rounded-lg p-4 border border-slate-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-3 h-3 rounded-full ${typeColors[selectedFeature.type]}`} />
            <h5 className="font-medium text-slate-900">{selectedFeature.label}</h5>
            <span className="text-sm text-slate-600">({typeLabels[selectedFeature.type]})</span>
          </div>
          <p className="text-sm text-slate-700 mb-2">{selectedFeature.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Position: {selectedFeature.position.toLocaleString()}</span>
            <span>Strength: {(selectedFeature.strength * 100).toFixed(0)}%</span>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Feature Types:</h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(typeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${typeColors[type as keyof typeof typeColors]}`} />
              <span className="text-xs text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
