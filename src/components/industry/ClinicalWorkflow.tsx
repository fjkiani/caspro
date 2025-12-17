'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type WorkflowStep = {
  title: string;
  description: string;
  duration: string;
  outcome: string;
  status: 'uncertain' | 'actionable' | 'optimized';
  icon?: string;
};

export type ClinicalWorkflowProps = {
  title: string;
  subtitle?: string;
  traditional: WorkflowStep[];
  oracle: WorkflowStep[];
  className?: string;
};

const getStatusColor = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'uncertain': return 'border-red-700/50 bg-red-900/20 text-red-200';
    case 'actionable': return 'border-green-700/50 bg-green-900/20 text-green-200';
    case 'optimized': return 'border-cyan-700/50 bg-cyan-900/20 text-cyan-200';
    default: return 'border-slate-700 bg-slate-800 text-slate-200';
  }
};

const getStatusIcon = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'uncertain': return '❓';
    case 'actionable': return '✅';
    case 'optimized': return '🎯';
    default: return '⚪';
  }
};

const getStatusBadge = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'uncertain': return { text: 'Uncertain', color: 'bg-red-600' };
    case 'actionable': return { text: 'Actionable', color: 'bg-green-600' };
    case 'optimized': return { text: 'Optimized', color: 'bg-cyan-600' };
    default: return { text: 'Pending', color: 'bg-slate-600' };
  }
};

const WorkflowTimeline: React.FC<{ steps: WorkflowStep[]; title: string; color: string }> = ({ steps, title, color }) => (
  <div className="space-y-4">
    <h3 className={`text-xl font-semibold mb-4 ${color}`}>{title}</h3>
    <div className="space-y-3">
      {steps.map((step, i) => {
        const badge = getStatusBadge(step.status);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-xl border ${getStatusColor(step.status)}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-1">
                {step.icon || getStatusIcon(step.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <span className="text-xs text-slate-400">{step.duration}</span>
                </div>
                <p className="text-sm mb-2 opacity-90">{step.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.color} text-white`}>
                    {badge.text}
                  </span>
                  <span className="text-xs opacity-75">{step.outcome}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const ClinicalWorkflow: React.FC<ClinicalWorkflowProps> = ({
  title,
  subtitle,
  traditional,
  oracle,
  className = ''
}) => {
  // Calculate total duration for each workflow
  const calculateTotalWeeks = (steps: WorkflowStep[]) => {
    return steps.reduce((total, step) => {
      const match = step.duration.match(/(\d+)\s*week/i);
      return total + (match ? parseInt(match[1]) : 0);
    }, 0);
  };

  const traditionalWeeks = calculateTotalWeeks(traditional);
  const oracleWeeks = calculateTotalWeeks(oracle);
  const speedup = traditionalWeeks > 0 ? Math.round(traditionalWeeks / oracleWeeks) : 0;

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-lg text-slate-300 max-w-4xl mx-auto">{subtitle}</p>}
        
        {/* Timeline Summary */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="text-4xl font-black text-red-400">{traditionalWeeks}w</div>
            <div className="text-sm text-red-300">Traditional</div>
          </div>
          <div className="text-5xl text-slate-600">→</div>
          <div className="text-center">
            <div className="text-4xl font-black text-green-400">{oracleWeeks}w</div>
            <div className="text-sm text-green-300">Oracle-Powered</div>
          </div>
          {speedup > 0 && (
            <>
              <div className="text-5xl text-slate-600">=</div>
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-400">{speedup}x</div>
                <div className="text-sm text-cyan-300">Faster</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Workflows Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WorkflowTimeline 
          steps={traditional} 
          title="Traditional Approach" 
          color="text-red-300"
        />
        <WorkflowTimeline 
          steps={oracle} 
          title="Oracle-Powered Approach" 
          color="text-green-300"
        />
      </div>

      {/* Key Improvements Summary */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-blue-300 text-center mb-6">Key Workflow Improvements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">{speedup}x</div>
            <div className="text-blue-300">Faster Timeline</div>
            <div className="text-xs text-blue-400 mt-1">{traditionalWeeks}w → {oracleWeeks}w</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">
              {Math.round((oracle.filter(s => s.status === 'optimized').length / oracle.length) * 100)}%
            </div>
            <div className="text-blue-300">Optimization Rate</div>
            <div className="text-xs text-blue-400 mt-1">Steps optimized</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">
              {oracle.filter(s => s.status !== 'uncertain').length}/{oracle.length}
            </div>
            <div className="text-blue-300">Actionable Steps</div>
            <div className="text-xs text-blue-400 mt-1">Immediate insights</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalWorkflow;

