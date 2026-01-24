'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Lock, CheckCircle2, ArrowRight, BarChart3, Activity, Dna, FileText, Calendar, AlertTriangle } from 'lucide-react';

interface MetricExplanation {
  id: string;
  name: string;
  icon: React.ElementType;
  unlockLevel: number;
  whatItMeans: string;
  whyItMatters: string;
  example: string;
}

interface MonitoringDashboardExplainerProps {
  level: 1 | 2 | 3 | 4 | 5;
}

const metricExplanations: MetricExplanation[] = [
  {
    id: 'csi',
    name: 'CSI Score',
    icon: BarChart3,
    unlockLevel: 1,
    whatItMeans: 'ChemoSensitivity Index (0-100) predicts how well chemo will work right now',
    whyItMatters: 'Tells you if the tumor is likely to respond to DDR-targeted therapy (platinum, PARPi)',
    example: 'CSI 72 = 72% chance of 6-month progression-free survival'
  },
  {
    id: 'ca125',
    name: 'CA-125',
    icon: Activity,
    unlockLevel: 1,
    whatItMeans: 'Tumor marker that tracks treatment response in ovarian cancer',
    whyItMatters: 'Rising or plateauing CA-125 = early warning that treatment might be failing',
    example: 'Plateau at 900 = treatment not working, need to switch therapy'
  },
  {
    id: 'imaging',
    name: 'Imaging',
    icon: FileText,
    unlockLevel: 1,
    whatItMeans: 'CT scans show if tumor is growing, shrinking, or stable',
    whyItMatters: 'Confirms what biomarkers suggest - but imaging lags 6+ weeks behind',
    example: 'Stable on CT = good, but CSI already dropped = early warning'
  },
  {
    id: 'ctdna',
    name: 'ctDNA',
    icon: Dna,
    unlockLevel: 2,
    whatItMeans: 'Circulating tumor DNA - detects new mutations in blood',
    whyItMatters: 'Shows resistance mutations before they cause treatment failure',
    example: 'KRAS G12D detected = platinum resistance, switch to MEK inhibitor'
  },
  {
    id: 'trials',
    name: 'Active Trials',
    icon: Calendar,
    unlockLevel: 2,
    whatItMeans: 'Clinical trials you qualify for based on your genomic profile',
    whyItMatters: 'Finds experimental therapies when standard options are running out',
    example: 'PARP + ATR combo trial = 94% mechanism fit for your tumor'
  },
  {
    id: 'resistance',
    name: 'Resistance Alerts',
    icon: AlertTriangle,
    unlockLevel: 3,
    whatItMeans: 'Early warnings that treatment might stop working',
    whyItMatters: 'Gives you 3-6 weeks head start to switch therapy before imaging shows progression',
    example: 'CSI dropping + new mutation = resistance detected, change therapy now'
  }
];

export default function MonitoringDashboardExplainer({ level }: MonitoringDashboardExplainerProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const unlockedMetrics = metricExplanations.filter(m => m.unlockLevel <= level);
  const lockedMetrics = metricExplanations.filter(m => m.unlockLevel > level);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          What Each Metric Means
        </h3>
        <p className="text-slate-600">
          Level {level} of 5 unlocked. Here's what you can see and why it matters:
        </p>
      </div>

      {/* Unlocked Metrics */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-slate-900">Unlocked at Level {level}</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {unlockedMetrics.map((metric) => {
            const Icon = metric.icon;
            const isExpanded = expandedMetric === metric.id;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 cursor-pointer transition-all ${
                  isExpanded ? 'shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{metric.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">
                        Level {metric.unlockLevel}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{metric.whatItMeans}</p>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-blue-200 space-y-2"
                        >
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Why it matters:</span>
                            <p className="text-sm text-slate-700 mt-1">{metric.whyItMatters}</p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-600">Example:</span>
                            <p className="text-sm text-slate-700 mt-1 italic">{metric.example}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-semibold">
                      {isExpanded ? 'Show less' : 'Learn more →'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Locked Metrics Preview */}
      {lockedMetrics.length > 0 && (
        <div className="border-t-2 border-dashed border-slate-300 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-600">Unlock at Level {lockedMetrics[0].unlockLevel}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {lockedMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.id}
                  className="bg-slate-50 rounded-xl p-4 border-2 border-dashed border-slate-300 opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-300 text-slate-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-500">{metric.name}</h4>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full font-semibold">
                          Level {metric.unlockLevel}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{metric.whatItMeans}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        Unlock by progressing to Level {metric.unlockLevel}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Level Progression */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Your Progress</h4>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    lvl <= level
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {lvl}
                </div>
              ))}
            </div>
          </div>
          {level < 5 && (
            <div className="text-sm text-slate-600">
              <span className="font-semibold">Next:</span> Unlock {lockedMetrics[0]?.name || 'more capabilities'} at Level {level + 1}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
