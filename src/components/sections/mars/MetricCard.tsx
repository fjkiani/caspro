'use client';

import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid } from 'recharts';
import type { ScoreMetric } from '@/data/trial-case-files';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  color?: 'cyan' | 'rose';
  isDarkMode: boolean;
}

const RADAR_FLAIR = [
  { axis: 'A', value: 80 }, { axis: 'B', value: 65 }, { axis: 'C', value: 90 },
  { axis: 'D', value: 70 }, { axis: 'E', value: 85 },
];

export const MetricCard: React.FC<MetricCardProps> = ({
  label, value, subtext, color = 'cyan', isDarkMode
}) => (
  <div className={`border p-4 sm:p-5 rounded-sm flex flex-col justify-between relative overflow-hidden transition-all duration-500 min-w-0 ${
    isDarkMode ? 'bg-zinc-950/50 border-zinc-900 shadow-2xl' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
  }`}>
    <div className="flex justify-between items-start z-10">
      <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{label}</span>
      <div className="w-10 h-10 opacity-20">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={RADAR_FLAIR}>
            <PolarGrid stroke={isDarkMode ? '#3f3f46' : '#e2e8f0'} />
            <Radar dataKey="value" stroke={color === 'cyan' ? '#22d3ee' : '#f43f5e'} fill={color === 'cyan' ? '#22d3ee' : '#f43f5e'} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="mt-2 flex flex-wrap items-baseline gap-2 z-10">
      <span className={`text-2xl sm:text-4xl font-extralight tracking-tighter ${
        color === 'cyan'
          ? (isDarkMode ? 'text-cyan-400' : 'text-indigo-600')
          : 'text-rose-500'
      }`}>{value}</span>
      {subtext && <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{subtext}</span>}
    </div>
  </div>
);

/** Render a row of MetricCards from typed data */
export const MetricCardGrid: React.FC<{ metrics: ScoreMetric[]; isDarkMode: boolean }> = ({ metrics, isDarkMode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {metrics.map((m, i) => (
      <MetricCard key={i} label={m.label} value={m.value} subtext={m.subtext} color={m.color} isDarkMode={isDarkMode} />
    ))}
  </div>
);
