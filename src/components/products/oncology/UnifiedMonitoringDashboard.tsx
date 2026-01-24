'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Dna, FileText, Calendar, BarChart3, Lock, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { allMonitoringMetrics, alertExplanations, levelUnlockSummary, iconMap } from '@/data/monitoring/monitoring-metrics-data';

interface UnifiedMonitoringDashboardProps {
  level: 1 | 2 | 3 | 4 | 5;
  patientId?: string;
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return TrendingDown;
    default: return Activity;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    case 'alert': return 'text-red-600';
    default: return 'text-slate-600';
  }
};

export default function UnifiedMonitoringDashboard({
  level,
  patientId = 'AK'
}: UnifiedMonitoringDashboardProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [showExplainer, setShowExplainer] = useState(true);

  // Filter metrics based on level
  const unlockedMetrics = allMonitoringMetrics.filter(m => m.unlockLevel <= level);
  const lockedMetrics = allMonitoringMetrics.filter(m => m.unlockLevel > level);
  
  // Get level summary
  const currentLevelSummary = levelUnlockSummary[level as keyof typeof levelUnlockSummary];
  const nextLevelSummary = level < 5 ? levelUnlockSummary[(level + 1) as keyof typeof levelUnlockSummary] : null;

  // Sample data for unlocked metrics (in real app, this would come from API)
  const sampleMetricValues: Record<string, { value: number | string; trend: 'up' | 'down' | 'stable' | 'alert'; trendLabel: string; status: 'normal' | 'warning' | 'alert'; lastUpdate: Date }> = {
    csi: {
      value: 72,
      trend: 'down',
      trendLabel: 'Decreased from 78',
      status: 'warning',
      lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    ca125: {
      value: 900,
      trend: 'stable',
      trendLabel: 'Plateau detected',
      status: 'warning',
      lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    imaging: {
      value: 'No progression',
      trend: 'stable',
      trendLabel: 'Last scan: 3 weeks ago',
      status: 'normal',
      lastUpdate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    },
    ctdna: {
      value: 'KRAS G12D: 0.8% VAF',
      trend: 'alert',
      trendLabel: 'New mutation detected',
      status: 'alert',
      lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    trials: {
      value: '3 matches',
      trend: 'up',
      trendLabel: 'New trial added',
      status: 'normal',
      lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Summary Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                {level}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Level {level}: {currentLevelSummary.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {currentLevelSummary.description}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="text-xs font-semibold text-slate-500 mb-1">What You Can See:</div>
                <div className="text-sm text-slate-700">
                  {currentLevelSummary.metrics.join(', ')}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="text-xs font-semibold text-slate-500 mb-1">Data Required:</div>
                <div className="text-sm text-slate-700">
                  {currentLevelSummary.dataRequired}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">CSI Continuous Monitoring</h2>
              <p className="text-white/90 text-sm md:text-base">
                Track CSI score updates as tumor evolves. Never miss a chemosensitivity change. • Patient {patientId}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">LIVE</span>
              <span className="text-sm text-white/80">• Level {level} of 5 Unlocked</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Unlocked Metrics */}
            {unlockedMetrics.map((metric) => {
              const Icon = iconMap[metric.iconName] || BarChart3;
              const TrendIcon = getTrendIcon(metric.exampleTrend);
              const sampleData = sampleMetricValues[metric.id];
              const isExpanded = expandedMetric === metric.id;
              
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl p-4 border-2 ${
                    sampleData?.status === 'alert' ? 'border-red-300' :
                    sampleData?.status === 'warning' ? 'border-yellow-300' :
                    'border-slate-200'
                  } shadow-sm cursor-pointer transition-all hover:shadow-md`}
                  onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${sampleData?.status === 'alert' ? 'text-red-600' : sampleData?.status === 'warning' ? 'text-yellow-600' : 'text-slate-600'}`} />
                      <span className="text-sm font-semibold text-slate-700">{metric.name}</span>
                    </div>
                    {sampleData?.status === 'alert' && (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {metric.id === 'csi' ? `${sampleData?.value}/100` : sampleData?.value || metric.exampleValue}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.exampleTrend)}`} />
                    <span className={getTrendColor(metric.exampleTrend)}>{sampleData?.trendLabel || metric.exampleInterpretation.split('=')[0]}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-1">
                    {metric.shortName}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {sampleData?.lastUpdate.toLocaleDateString() || 'Recent'}
                  </p>
                  
                  {/* Expanded Explanation - Compact */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-slate-200"
                      >
                        <p className="text-xs text-slate-600 mb-2">{metric.whatItIs}</p>
                        <p className="text-xs text-slate-500 italic">{metric.exampleInterpretation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-semibold">
                    {isExpanded ? 'Less' : 'More →'}
                  </button>
                </motion.div>
              );
            })}
            
            {/* Locked Metrics */}
            {lockedMetrics.map((metric) => {
              const Icon = iconMap[metric.iconName] || Lock;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-100 rounded-xl p-4 border-2 border-dashed border-slate-300 opacity-60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-500">{metric.name}</span>
                    </div>
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Locked</div>
                  <div className="text-xs text-slate-500 mt-2">
                    <div className="font-semibold mb-1">Unlock at Level {metric.unlockLevel}</div>
                    <div>{metric.unlockReason}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-bold text-slate-900">Active Alerts & Insights</h3>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
              {alertExplanations.filter(a => a.unlockLevel <= level).length} Active
            </span>
            {alertExplanations.filter(a => a.unlockLevel > level).length > 0 && (
              <span className="text-sm text-slate-500">
                ({alertExplanations.filter(a => a.unlockLevel > level).length} locked at Level {Math.min(...alertExplanations.filter(a => a.unlockLevel > level).map(a => a.unlockLevel))})
              </span>
            )}
          </div>
          
          {/* Unlocked Alerts - Compact */}
          <div className="space-y-2">
            {alertExplanations
              .filter(a => a.unlockLevel <= level)
              .map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-3"
                >
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{alert.name}</h4>
                  <p className="text-xs text-slate-600">{alert.whatItIs}</p>
                </motion.div>
              ))}
          </div>
          
          {/* Locked Alerts Preview */}
          {alertExplanations.filter(a => a.unlockLevel > level).length > 0 && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-600">
                  Unlock at Level {Math.min(...alertExplanations.filter(a => a.unlockLevel > level).map(a => a.unlockLevel))}: {nextLevelSummary?.title || 'Additional capabilities'}
                </span>
              </div>
              <div className="text-sm text-slate-500">
                {alertExplanations
                  .filter(a => a.unlockLevel > level)
                  .map(alert => alert.name)
                  .join(', ')} will be available
              </div>
            </div>
          )}
        </div>

        {/* Timeline - Only at Level 5 */}
        {level === 5 ? (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Monitoring Timeline</h3>
            <div className="space-y-3">
              {[
                { period: 'Day 1', data: 'CSI: 78/100 (Initial)' },
                { period: 'Month 1', data: 'CSI: 78, CA-125: 2,842' },
                { period: 'Month 3', data: 'CSI: 78, CA-125: 1,500 (↓47%)' },
                { period: 'Month 6', data: '🚨 CSI: 72 (↓6), CA-125 Plateau', alert: true },
                { period: 'Month 9', data: 'CSI: 72, New Trial Match' },
                { period: 'Month 12', data: '🚨 CSI: 68 (↓4), KRAS G12D', alert: true },
                { period: 'Ongoing', data: 'CSI Monitoring...' }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg ${item.alert ? 'bg-red-50 border border-red-200' : 'bg-white border border-slate-200'}`}>
                  <div className="font-semibold text-slate-700 min-w-[80px]">{item.period}</div>
                  <div className="text-sm text-slate-600">{item.data}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">
                Unlock at Level 5: Complete Care Plan
              </span>
            </div>
            <div className="text-sm text-slate-500">
              Full monitoring timeline showing progression across all treatment lines will be available
            </div>
          </div>
        )}
      </div>

      {/* Next Level Preview */}
      {nextLevelSummary && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                  {level + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Next: Level {level + 1} - {nextLevelSummary.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {nextLevelSummary.description}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-indigo-200">
                <div className="text-xs font-semibold text-slate-500 mb-1">Unlocks:</div>
                <div className="text-sm text-slate-700">
                  {nextLevelSummary.metrics.filter(m => !currentLevelSummary.metrics.includes(m)).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
