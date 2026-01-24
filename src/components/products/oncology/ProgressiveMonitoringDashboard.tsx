'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Dna, FileText, Calendar, BarChart3, Lock } from 'lucide-react';

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
  unlockLevel: number;
  unlockReason?: string;
}

interface MonitoringAlert {
  id: string;
  type: 'resistance' | 'trial' | 'mutation' | 'kinetics' | 'toxicity';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  action: string;
  unlockLevel: number;
}

interface ProgressiveMonitoringDashboardProps {
  level: 1 | 2 | 3 | 4 | 5;
  patientId?: string;
}

// All metrics with their unlock levels
const allMetrics: MonitoringMetric[] = [
  {
    id: 'csi',
    name: 'CSI Score',
    icon: BarChart3,
    value: 72,
    trend: 'down',
    trendLabel: 'Decreased from 78',
    lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'warning',
    description: 'CSI dropped from 78 to 72. Still above threshold (≥70), but monitor closely. CA-125 plateau may indicate early resistance.',
    unlockLevel: 1
  },
  {
    id: 'ca125',
    name: 'CA-125',
    icon: Activity,
    value: 900,
    trend: 'stable',
    trendLabel: 'Plateau detected',
    lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'warning',
    description: '3 consecutive measurements ±10% - Expected decline, observed plateau',
    unlockLevel: 1
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
    description: 'CT scan shows stable disease - agents detected resistance 6 weeks before imaging',
    unlockLevel: 1
  },
  {
    id: 'ctdna',
    name: 'ctDNA',
    icon: Dna,
    value: 'KRAS G12D: 0.8% VAF',
    trend: 'alert',
    trendLabel: 'New mutation detected',
    lastUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'alert',
    description: 'Resistance mutation: KRAS G12D (MAPK pathway) - RR=1.97 for platinum resistance',
    unlockLevel: 2,
    unlockReason: 'Requires genomic test results (NGS)'
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
    description: 'NCT05678901: PARP + ATR combo (94% mechanism fit) - Added automatically when trial opened',
    unlockLevel: 2,
    unlockReason: 'Requires drug recommendations'
  }
];

// All alerts with their unlock levels
const allAlerts: MonitoringAlert[] = [
  {
    id: 'csi-drop',
    type: 'kinetics',
    severity: 'high',
    title: 'CSI Score Decreased: 78 → 72',
    description: 'CSI dropped 6 points over 6 months. Still above threshold (≥70), but declining trend suggests early resistance. CA-125 plateau correlates with CSI decrease.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    action: 'Monitor closely. If CSI drops below 70, consider alternative therapy. Current CSI (72) still indicates likely benefit, but trend is concerning.',
    unlockLevel: 1
  },
  {
    id: 'ca125-plateau',
    type: 'kinetics',
    severity: 'high',
    title: 'CA-125 Plateau Detected',
    description: 'Expected: Continue decline to <500. Observed: Flat trajectory at 900 for 3 cycles. Action: Consider early resistance intervention.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    action: 'Increase ctDNA monitoring frequency, consider PARP switch NOW',
    unlockLevel: 1
  },
  {
    id: 'trial-match',
    type: 'trial',
    severity: 'medium',
    title: 'New Trial Match: NCT05678901',
    description: 'PARP + ATR inhibitor combo specifically for DNA repair-deficient ovarian cancer. Mechanism fit: 94% (DDR pathway vector alignment). Status: RECRUITING.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    action: 'Added to dashboard, oncologist notified',
    unlockLevel: 2
  },
  {
    id: 'resistance-mutation',
    type: 'mutation',
    severity: 'high',
    title: 'Resistance Mutation: KRAS G12D',
    description: 'New ctDNA mutation detected at 0.8% VAF. Associated with platinum resistance (RR=1.97, p<0.05). Re-ranking drugs, prioritizing MEK/RAF inhibitors.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    action: 'High priority - resistance mechanism identified, update care plan',
    unlockLevel: 3
  }
];

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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'border-red-500 bg-red-50';
    case 'medium': return 'border-yellow-500 bg-yellow-50';
    default: return 'border-blue-500 bg-blue-50';
  }
};

export default function ProgressiveMonitoringDashboard({
  level,
  patientId = 'AK'
}: ProgressiveMonitoringDashboardProps) {
  // Filter metrics based on level
  const unlockedMetrics = allMetrics.filter(m => m.unlockLevel <= level);
  const lockedMetrics = allMetrics.filter(m => m.unlockLevel > level);
  
  // Filter alerts based on level
  const unlockedAlerts = allAlerts.filter(a => a.unlockLevel <= level);
  const lockedAlerts = allAlerts.filter(a => a.unlockLevel > level);
  
  // Get next unlock level
  const nextUnlockLevel = lockedMetrics.length > 0 
    ? Math.min(...lockedMetrics.map(m => m.unlockLevel))
    : null;

  return (
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
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {metric.id === 'csi' ? `${metric.value}/100` : metric.value}
                </div>
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
          
          {/* Locked Metrics */}
          {lockedMetrics.map((metric) => {
            const Icon = metric.icon;
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
                  {metric.unlockReason && (
                    <div>{metric.unlockReason}</div>
                  )}
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
            {unlockedAlerts.length} Active
          </span>
          {lockedAlerts.length > 0 && (
            <span className="text-sm text-slate-500">
              ({lockedAlerts.length} locked at Level {nextUnlockLevel})
            </span>
          )}
        </div>
        
        {/* Unlocked Alerts */}
        <div className="space-y-3">
          {unlockedAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{alert.title}</h4>
                  <p className="text-sm text-slate-700 mb-2">{alert.description}</p>
                  <div className="text-xs text-slate-600 font-semibold mb-2">
                    Recommended Action:
                  </div>
                  <p className="text-sm text-slate-800">{alert.action}</p>
                </div>
                <div className="text-xs text-slate-500">
                  {alert.timestamp.toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Locked Alerts Preview */}
        {lockedAlerts.length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">
                Unlock at Level {nextUnlockLevel}: {lockedMetrics.find(m => m.unlockLevel === nextUnlockLevel)?.unlockReason || 'Additional capabilities'}
              </span>
            </div>
            <div className="text-sm text-slate-500">
              {lockedAlerts.map(alert => alert.title).join(', ')} will be available
            </div>
          </div>
        )}
      </div>

      {/* Monitoring Timeline - Only at Level 5 */}
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
  );
}
