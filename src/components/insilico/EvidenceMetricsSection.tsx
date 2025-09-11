'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Database, Shield } from 'lucide-react';

const EvidenceMetricsSection: React.FC = () => {
  const evidenceMetrics = [
    {
      icon: CheckCircle,
      title: 'Confidence',
      description: '0–1',
      details: 'Transparent confidence scores based on evidence quality and model performance'
    },
    {
      icon: FileText,
      title: 'Evidence Tier',
      description: 'Supported / Consider / Insufficient',
      details: 'Clear classification of evidence strength to guide decision-making'
    },
    {
      icon: Database,
      title: 'Sources',
      description: 'Citations (count + key refs)',
      details: 'Transparent source attribution with key references and citation counts'
    },
    {
      icon: Shield,
      title: 'Provenance',
      description: 'run_id and profile (Baseline/Richer/Fusion)',
      details: 'Complete audit trail with run IDs and model profile information'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Evidence (Core) – Card Metrics</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Consistent evidence metrics used across all in-silico capabilities for transparency and trust
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {evidenceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={metric.title}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl mb-6 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                  {metric.title}
                </h3>

                {/* Description */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">{metric.description}</span>
                </div>

                {/* Details */}
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {metric.details}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Research-Grade Standards</h3>
            <p className="text-gray-600 leading-relaxed">
              All in-silico capabilities follow research-grade standards with transparent methodology, 
              auditable provenance, and clear evidence tiers. Every output includes confidence scores, 
              source attribution, and complete run tracking for reproducibility and peer review.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EvidenceMetricsSection;
