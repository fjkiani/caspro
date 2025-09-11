'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, FileText, Target, TrendingUp } from 'lucide-react';

interface EvidenceBandProps {
  confidence: { value: number; tier: string };
  badges: string[];
  provenance: { hasRun: boolean };
}

const badgeIconMap = {
  'Pathway-Aligned': Target,
  'ClinVar-Strong': CheckCircle,
  'Guideline': FileText,
  'RCT': Shield
};

const EvidenceBand: React.FC<EvidenceBandProps> = ({ confidence, badges, provenance }) => {
  const getConfidenceColor = (tier: string) => {
    switch (tier) {
      case 'Supported': return 'text-green-600 bg-green-50 border-green-200';
      case 'Consider': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Insufficient': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Evidence & Trust</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every prediction comes with transparent confidence levels, evidence tiers, and full provenance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Confidence */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 ${getConfidenceColor(confidence.tier)} mb-4`}>
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Confidence: {(confidence.value * 100).toFixed(0)}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confidence Level</h3>
            <p className="text-sm text-gray-600">
              Our certainty in the current result (0-1 scale)
            </p>
          </motion.div>

          {/* Evidence Tier */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 ${getConfidenceColor(confidence.tier)} mb-4`}>
              <Shield className="w-5 h-5" />
              <span className="font-semibold">{confidence.tier}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Evidence Tier</h3>
            <p className="text-sm text-gray-600">
              Supported / Consider / Insufficient (research-mode labels)
            </p>
          </motion.div>

          {/* Badges */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {badges.map((badge, index) => {
                const IconComponent = badgeIconMap[badge as keyof typeof badgeIconMap] || CheckCircle;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    <IconComponent className="w-4 h-4" />
                    {badge}
                  </div>
                );
              })}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Evidence Badges</h3>
            <p className="text-sm text-gray-600">
              Guideline / RCT / ClinVar-Strong / Pathway-Aligned
            </p>
          </motion.div>
        </div>

        {/* Provenance */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 text-gray-700 rounded-xl border border-gray-200">
            <FileText className="w-5 h-5" />
            <span className="font-medium">
              Provenance: {provenance.hasRun ? 'run_id, profile' : 'Baseline profile'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Every result includes run ID and profile for full reproducibility
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EvidenceBand;
