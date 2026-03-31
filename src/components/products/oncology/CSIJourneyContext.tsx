'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

interface CSIJourneyContextProps {
  level: number;
  capabilitySlug?: string;
}

export default function CSIJourneyContext({ level, capabilitySlug }: CSIJourneyContextProps) {
  const journeyLevel = csiJourneyLevels.find(l => l.level === level);
  if (!journeyLevel) return null;

  const previousLevel = level > 1 ? csiJourneyLevels.find(l => l.level === level - 1) : null;
  const nextLevel = level < 5 ? csiJourneyLevels.find(l => l.level === level + 1) : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      {/* Journey Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {level}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Level {level} of CSI Journey: {journeyLevel.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {journeyLevel.description}
                </p>
              </div>
            </div>
            
            {/* Data Requirement & Unlocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">Data Required</span>
                </div>
                <p className="text-sm text-slate-600">{journeyLevel.data}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-slate-700">Unlocks</span>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  {journeyLevel.unlocks.slice(0, 3).map((unlock, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{unlock}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Validation Status */}
            {journeyLevel.validation && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                  {journeyLevel.validation.status.replace('-', ' ').toUpperCase()}
                </span>
                {journeyLevel.validation.metric && (
                  <span className="text-slate-600">
                    {journeyLevel.validation.metric}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link
          to="/products/oncology"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to CSI Overview</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {previousLevel && (
            <Link
              to={previousLevel.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Level {previousLevel.level}: {previousLevel.title}
            </Link>
          )}
          {nextLevel && (
            <Link
              to={nextLevel.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Level {nextLevel.level}: {nextLevel.title} →
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
