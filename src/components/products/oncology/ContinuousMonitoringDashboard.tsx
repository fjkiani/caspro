'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Activity, Dna, FileText, Calendar } from 'lucide-react';

interface MonitoringMetric {
  id: string;
  name: string;
  icon: React.ElementType;
  value: number | string;
  trend: 'up' | 'down' | 'stable' | 'alert';
  trendLabel: string;
  lastUpdate: Date;
  status: 'normal' | 'warning' | 'alert';
  description: string;
}

interface MonitoringAlert {
  id: string;
  type: 'resistance' | 'trial' | 'mutation' | 'kinetics';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  action: string;
}

export default function ContinuousMonitoringDashboard({ patientId = 'AK' }: { patientId?: string }) {
  const [metrics, setMetrics] = useState<MonitoringMetric[]>([
    {
      id: 'ca125',
      name: 'CA-125',
      icon: Activity,
      value: 900,
      trend: 'stable',
      trendLabel: 'Plateau detected',
      lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: 'warning',
      description: '3 consecutive measurements ±10% - Expected decline, observed plateau'
    },
    {
      id: 'ctdna',
      name: 'ctDNA',
      icon: Dna,
      value: 'KRAS G12D: 0.8% VAF',
      trend: 'alert',
      trendLabel: 'New mutation detected',
      lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: 'alert',
      description: 'Resistance mutation: KRAS G12D (MAPK pathway) - RR=1.97 for platinum resistance'
    },
    {
      id: 'imaging',
      name: 'Imaging',
      icon: FileText,
      value: 'No progression',
      trend: 'stable',
      trendLabel: 'Last scan: 3 weeks ago',
      lastUpdate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      status: 'normal',
      description: 'CT scan shows stable disease - agents detected resistance 6 weeks before imaging'
    },
    {
      id: 'trials',
      name: 'Active Trials',
      icon: Calendar,
      value: '3 matches',
      trend: 'up',
      trendLabel: 'New trial added',
      lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'normal',
      description: 'NCT05678901: PARP + ATR combo (94% mechanism fit) - Added automatically when trial opened'
    }
  ]);

  const [alerts, setAlerts] = useState<MonitoringAlert[]>([
    {
      id: 'ca125-plateau',
      type: 'kinetics',
      severity: 'high',
      title: 'CA-125 Plateau Detected',
      description: 'Expected: Continue decline to <500. Observed: Flat trajectory at 900 for 3 cycles. Action: Consider early resistance intervention.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      action: 'Increase ctDNA monitoring frequency, consider PARP switch NOW'
    },
    {
      id: 'kras-mutation',
      type: 'mutation',
      severity: 'high',
      title: 'Resistance Mutation: KRAS G12D',
      description: 'New ctDNA mutation detected at 0.8% VAF. Associated with platinum resistance (RR=1.97, p<0.05). Re-ranking drugs, prioritizing MEK/RAF inhibitors.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      action: 'High priority - resistance mechanism identified, update care plan'
    },
    {
      id: 'new-trial',
      type: 'trial',
      severity: 'medium',
      title: 'New Trial Match: NCT05678901',
      description: 'PARP + ATR inhibitor combo specifically for DNA repair-deficient ovarian cancer. Mechanism fit: 94% (DDR pathway vector alignment). Status: RECRUITING.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      action: 'Added to dashboard, oncologist notified'
    }
  ]);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-blue-600';
      case 'stable': return 'text-yellow-600';
      case 'alert': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'alert': return AlertTriangle;
      default: return Activity;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Continuous Monitoring Dashboard</h2>
            <p className="text-white/90 text-sm md:text-base">
              Upload Once. Track Forever. Never Miss a Signal. • Patient {patientId}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const TrendIcon = getTrendIcon(metric.trend);
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl p-4 border-2 ${
                  metric.status === 'alert' ? 'border-red-300' :
                  metric.status === 'warning' ? 'border-yellow-300' :
                  'border-slate-200'
                } shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${metric.status === 'alert' ? 'text-red-600' : metric.status === 'warning' ? 'text-yellow-600' : 'text-slate-600'}`} />
                    <span className="text-sm font-semibold text-slate-700">{metric.name}</span>
                  </div>
                  {metric.status === 'alert' && (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                  <span className={getTrendColor(metric.trend)}>{metric.trendLabel}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">{metric.description}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Last update: {metric.lastUpdate.toLocaleDateString()}
                </p>
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
            {alerts.length} Active
          </span>
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{alert.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        alert.severity === 'high' ? 'bg-red-600 text-white' :
                        alert.severity === 'medium' ? 'bg-orange-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{alert.description}</p>
                    <div className="bg-white/50 rounded px-3 py-2 mt-2">
                      <p className="text-xs font-semibold text-slate-900 mb-1">Recommended Action:</p>
                      <p className="text-xs text-slate-700">{alert.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 ml-4">
                    {alert.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Monitoring Timeline</h3>
        <div className="relative">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {[
              { label: 'Day 1', event: 'Upload & Initial Analysis', status: 'complete' },
              { label: 'Month 1', event: 'CA-125: 2,842 (baseline)', status: 'complete' },
              { label: 'Month 3', event: 'CA-125: 1,500 (↓47%)', status: 'complete' },
              { label: 'Month 6', event: '🚨 Plateau Alert', status: 'alert' },
              { label: 'Month 9', event: 'New Trial Match', status: 'complete' },
              { label: 'Month 12', event: '🚨 KRAS G12D Detected', status: 'alert' },
              { label: 'Ongoing', event: 'Continuous Monitoring...', status: 'active' }
            ].map((milestone, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[120px]">
                <div className={`w-4 h-4 rounded-full mb-2 ${
                  milestone.status === 'complete' ? 'bg-green-500' :
                  milestone.status === 'alert' ? 'bg-red-500' :
                  'bg-blue-500 animate-pulse'
                }`} />
                <div className="text-xs font-semibold text-slate-700 mb-1">{milestone.label}</div>
                <div className="text-xs text-slate-600 text-center">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




