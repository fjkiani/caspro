'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RDCapabilityCard } from '@/data/products/rd-capabilities-data';
import { CheckCircle, X } from 'lucide-react';

interface RDCapabilityDetailProps {
  capability: RDCapabilityCard;
}

export default function RDCapabilityDetail({ capability }: RDCapabilityDetailProps) {
  if (!capability.details) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide text-slate-500">
            Technical
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed">{capability.details.technical}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide text-slate-500">
            Scientific
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed">{capability.details.scientific}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide text-slate-500">
            Business
          </h4>
          <p className="text-slate-700 text-sm leading-relaxed">{capability.details.business}</p>
        </div>
      </div>

      {capability.details.useCases && capability.details.useCases.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide text-slate-500">
            Use Cases
          </h4>
          <ul className="space-y-2">
            {capability.details.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
