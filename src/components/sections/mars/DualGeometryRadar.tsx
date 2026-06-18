'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { VECTOR_AXIS_META, type TrialCaseFile } from '@/data/trial-case-files';

export function buildDualGeometryRadarData(trial: TrialCaseFile) {
  return VECTOR_AXIS_META.map((m) => ({
    axis: m.label,
    responder: trial.responderVector[m.key],
    non_responder: trial.nonResponderVector[m.key],
  }));
}

type DualGeometryRadarProps = {
  data: ReturnType<typeof buildDualGeometryRadarData>;
  isDarkMode: boolean;
  outerRadius?: string;
  responderStroke?: string;
  nonResponderStroke?: string;
};

/** Responder + non-responder only — no axis labels, no trial vector overlay */
export function DualGeometryRadar({
  data,
  isDarkMode,
  outerRadius = '80%',
  responderStroke,
  nonResponderStroke,
}: DualGeometryRadarProps) {
  const gridStroke = isDarkMode ? '#27272a' : '#cbd5e1';
  const respStroke = responderStroke ?? (isDarkMode ? '#10b981' : '#059669');
  const nonRespStroke = nonResponderStroke ?? (isDarkMode ? '#f43f5e' : '#e11d48');

  return (
    <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={data}>
      <PolarGrid stroke={gridStroke} />
      <PolarAngleAxis dataKey="axis" tick={false} />
      <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} axisLine={false} />
      <Radar
        name="Non-Responder"
        dataKey="non_responder"
        stroke={nonRespStroke}
        strokeWidth={2}
        strokeDasharray="4 4"
        fill={nonRespStroke}
        fillOpacity={0.15}
      />
      <Radar
        name="Responder"
        dataKey="responder"
        stroke={respStroke}
        strokeWidth={2}
        fill={respStroke}
        fillOpacity={0.05}
      />
    </RadarChart>
  );
}

export function DualGeometryLegend({
  isDarkMode,
  responderStroke,
  nonResponderStroke,
  className = '',
}: {
  isDarkMode: boolean;
  responderStroke?: string;
  nonResponderStroke?: string;
  className?: string;
}) {
  const respStroke = responderStroke ?? (isDarkMode ? '#10b981' : '#059669');
  const nonRespStroke = nonResponderStroke ?? (isDarkMode ? '#f43f5e' : '#e11d48');
  const subtleClass = isDarkMode ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-2 sm:gap-6 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full border" style={{ borderColor: respStroke }} />
        <span className={`text-[9px] font-black uppercase ${subtleClass}`}>Responder</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: nonRespStroke }} />
        <span className={`text-[9px] font-black uppercase ${subtleClass}`}>Non-Responder</span>
      </div>
    </div>
  );
}
