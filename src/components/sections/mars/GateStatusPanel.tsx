'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Binary, Target } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { GateResult, TrialCaseFile } from '@/data/trial-case-files';
import { VECTOR_AXIS_META } from '@/data/trial-case-files';

// ─────────────────────────────────────────────────────────────────────────────

function buildRadarData(trial: TrialCaseFile) {
  return VECTOR_AXIS_META.map((m) => ({
    axis: m.label,
    trial: trial.trialVector[m.key],
    responder: trial.responderVector[m.key],
    non_responder: trial.nonResponderVector[m.key],
  }));
}

// ─────────────────────────────────────────────────────────────────────────────

interface GateStatusPanelProps {
  trial: TrialCaseFile;
  isDarkMode: boolean;
  /** Legacy compat — ignored if trial is provided */
  gates?: GateResult[];
}

export const GateStatusPanel: React.FC<GateStatusPanelProps> = ({ trial, isDarkMode }) => {
  const radarData = useMemo(() => buildRadarData(trial), [trial]);

  return (
    <div className={`border rounded-sm flex flex-col relative overflow-hidden shadow-2xl transition-colors duration-500 ${
      isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-200'
    }`}>

      {/* Header */}
      <div className={`p-5 border-b flex justify-between items-center transition-colors ${
        isDarkMode ? 'bg-black/60 border-zinc-900' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <Target className={`w-4 h-4 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            8D Mechanism Projection
          </span>
        </div>
        <Layers className={`w-3.5 h-3.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
      </div>

      {/* Radar Chart */}
      <div className="px-4 pt-4 relative" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke={isDarkMode ? '#27272a' : '#e2e8f0'} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: isDarkMode ? '#e4e4e7' : '#334155', fontSize: 10, fontWeight: 'bold' }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} axisLine={false} />

            {/* Non-Responder (Dotted Rose) */}
            <Radar
              name="Non-Responder"
              dataKey="non_responder"
              stroke="#f43f5e"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="#f43f5e"
              fillOpacity={0.1}
            />

            {/* Responder (Emerald) */}
            <Radar
              name="Responder"
              dataKey="responder"
              stroke="#10b981"
              strokeWidth={1.5}
              fill="#10b981"
              fillOpacity={0.05}
            />

            {/* Trial Vector (Cyan Glow) */}
            <Radar
              name="Trial"
              dataKey="trial"
              stroke={isDarkMode ? '#22d3ee' : '#4f46e5'}
              strokeWidth={3}
              fill={isDarkMode ? '#22d3ee' : '#4f46e5'}
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 pb-3 px-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
            TRIAL
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border border-emerald-500" />
          <span className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
            RESPONDER
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border border-rose-500 border-dashed" />
          <span className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
            NON-RESP
          </span>
        </div>
      </div>

      {/* Convergence Math */}
      <div className={`mx-4 mb-4 p-4 border rounded transition-colors ${
        isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100'
      }`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            COS(θ) RESPONDER
          </span>
          <span className={`text-sm font-light tabular-nums ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {trial.cosineResponder.toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            COS(θ) ITT DILUTED
          </span>
          <span className="text-sm font-light text-rose-500 tabular-nums">{trial.cosineITT.toFixed(4)}</span>
        </div>
        <div className={`flex justify-between items-center p-2 rounded ${
          isDarkMode ? 'bg-rose-500/5 border border-rose-500/20' : 'bg-rose-50 border border-rose-200'
        }`}>
          <span className="text-[9px] font-black text-rose-500 uppercase">Δ Impact</span>
          <span className="text-sm font-black text-rose-500">{trial.deltaImpact}</span>
        </div>
      </div>

      {/* Gate Results */}
      <div className="px-4 pb-4 space-y-2">
        {trial.gates.map((gate) => (
          <div key={gate.id} className={`flex justify-between items-center p-3 border rounded transition-colors ${
            isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-slate-50 border-slate-100'
          }`}>
            <div className="flex-1 mr-3 min-w-0">
              <span className={`block text-[11px] font-black uppercase tracking-wide ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
                {gate.label.toUpperCase()}
              </span>
              <span className={`block text-[10px] font-bold uppercase mt-1 leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                {gate.result.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-1.5 h-1.5 rounded-full ${gate.pass ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className={`text-[10px] font-black uppercase ${gate.pass ? 'text-emerald-500' : 'text-rose-500'}`}>
                {gate.pass ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
