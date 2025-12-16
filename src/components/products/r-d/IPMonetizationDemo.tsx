'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react';

/**
 * IP Monetization Demo component
 * Shows the 5-stage IP monetization workflow
 */
export default function IPMonetizationDemo() {
  const ipStages = [
    { stage: 'Victory', title: 'Design Generation', status: 'complete' },
    { stage: 'Fortify', title: 'Validation & Testing', status: 'complete' },
    { stage: 'Arm', title: 'IP Documentation', status: 'complete' },
    { stage: 'Fund', title: 'Patent Filing', status: 'pending' },
    { stage: 'Conquer', title: 'Commercialization', status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {ipStages.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-xl border-2 text-center ${
              item.status === 'complete'
                ? 'border-teal-500 bg-teal-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="text-xs font-bold text-teal-600 mb-2">{item.stage}</div>
            <div className="text-sm font-semibold text-slate-900 mb-2">{item.title}</div>
            {item.status === 'complete' ? (
              <CheckCircle className="w-5 h-5 text-teal-600 mx-auto" />
            ) : (
              <div className="w-5 h-5 border-2 border-slate-300 rounded-full mx-auto" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
        <h4 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Complete IP Documentation Package
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-teal-800">
          <div>
            <div className="font-semibold mb-2">Design Provenance</div>
            <ul className="space-y-1 text-xs">
              <li>• Complete design history</li>
              <li>• Validation evidence</li>
              <li>• Source citations</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Patent-Ready Materials</div>
            <ul className="space-y-1 text-xs">
              <li>• Novel sequence documentation</li>
              <li>• Functional validation proof</li>
              <li>• Prior art analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



