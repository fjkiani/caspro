'use client';

// ============================================================================
// <MechanismFitRadar/> — scrubbed adaptation of `8d_vector_space_analysis.tsx`.
//
// Scrubs applied:
//  - Original client-linked title → "Mechanism-fit radar"
//  - Original NCT subtitle → generic
//  - Original cosine-numeric disclosure → "mechanism-fit indicator (illustrative)"
//
// Data source: PATIENT_VECTOR_AXES from depth-layer.
// The 3 profile bands (trial / responder / non-responder) become
// (trial-arm / responders / non-responders) — labelled illustrative.
// ============================================================================

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Scale } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { PATIENT_VECTOR_AXES } from '@/data/depth-layer';

// Illustrative profile shape — labelled as such. Not a fabricated patient.
// Values chosen to visually distinguish trial-arm vs responder vs non-responder
// bands so operators can see the radar mechanic. NOT bound to any real trial.
const ILLUSTRATIVE_PROFILE: Record<string, { trialArm: number; responders: number; nonResponders: number }> = {
  ddr: { trialArm: 0.78, responders: 0.80, nonResponders: 0.20 },
  mapk: { trialArm: 0.68, responders: 0.70, nonResponders: 0.10 },
  pi3k: { trialArm: 0.22, responders: 0.20, nonResponders: 0.15 },
  vegf: { trialArm: 0.18, responders: 0.15, nonResponders: 0.10 },
  her2: { trialArm: 0.72, responders: 0.75, nonResponders: 0.25 },
  io: { trialArm: 0.73, responders: 0.75, nonResponders: 0.20 },
  efflux: { trialArm: 0.48, responders: 0.45, nonResponders: 0.50 },
  rss: { trialArm: 0.28, responders: 0.25, nonResponders: 0.20 },
};

type ViewMode = 'all' | 'trial' | 'comparison';

export default function MechanismFitRadar({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [view, setView] = useState<ViewMode>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const data = useMemo(
    () =>
      PATIENT_VECTOR_AXES.map((a) => {
        const p = ILLUSTRATIVE_PROFILE[a.axis] ?? { trialArm: 0, responders: 0, nonResponders: 0 };
        return {
          axis: a.name,
          axisSlug: a.axis,
          trialArm: p.trialArm,
          responders: p.responders,
          nonResponders: p.nonResponders,
        };
      }),
    []
  );

  const tickColor = isDarkMode ? '#71717a' : '#94a3b8';
  const gridColor = isDarkMode ? '#3f3f46' : '#e2e8f0';

  const showTrial = view === 'all' || view === 'trial';
  const showResp = view === 'all' || view === 'comparison';
  const showNon = view === 'all' || view === 'comparison';

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-start justify-between">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            Substrate view · patient-biology axes
          </p>
          <h3 className={`mt-1 text-xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Mechanism-fit radar
          </h3>
          <p className={`mt-1 text-[11px] uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            Illustrative candidate profile — {PATIENT_VECTOR_AXES.length} axes
          </p>
        </div>

        {/* View toggle */}
        <div className={`flex gap-1 border rounded ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white'} p-1`}>
          {(['all', 'trial', 'comparison'] as ViewMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setView(m)}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded transition ${
                view === m
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-100'
                    : 'bg-indigo-100 text-indigo-800'
                  : isDarkMode
                    ? 'text-zinc-500 hover:text-zinc-200'
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`relative rounded border ${isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200'} p-4`}
        style={{ height: 380 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="axis" tick={{ fill: tickColor, fontSize: 10, fontWeight: 700 }} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 1]}
              tick={{ fill: tickColor, fontSize: 8 }}
              stroke={gridColor}
            />
            {showResp && (
              <Radar
                name="Responders (illustrative)"
                dataKey="responders"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.18}
              />
            )}
            {showNon && (
              <Radar
                name="Non-responders (illustrative)"
                dataKey="nonResponders"
                stroke="#f43f5e"
                fill="#f43f5e"
                fillOpacity={0.14}
              />
            )}
            {showTrial && (
              <Radar
                name="Trial-arm profile (illustrative)"
                dataKey="trialArm"
                stroke="#22d3ee"
                fill="#22d3ee"
                fillOpacity={0.22}
              />
            )}
            <Tooltip
              contentStyle={{
                background: isDarkMode ? '#020408' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#3f3f46' : '#e2e8f0'}`,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              labelStyle={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend + illustrative disclosure */}
      <div className={`text-[10px] font-bold uppercase tracking-widest space-y-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        <div className="flex items-center gap-2">
          <Info className="h-3 w-3" />
          <span>Illustrative candidate profile — no fabricated patient identity, no NCT reference.</span>
        </div>
        <div className="flex items-center gap-2">
          <Scale className="h-3 w-3" />
          <span>Axes bound to PATIENT_VECTOR_AXES · substrate is version-locked with the ranker.</span>
        </div>
      </div>

      {/* Axis descriptors */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
        {PATIENT_VECTOR_AXES.map((a) => (
          <button
            key={a.axis}
            type="button"
            onMouseEnter={() => setHovered(a.axis)}
            onMouseLeave={() => setHovered(null)}
            className={`text-left rounded border p-2 transition ${
              hovered === a.axis
                ? isDarkMode
                  ? 'bg-cyan-500/10 border-cyan-500/40'
                  : 'bg-indigo-50 border-indigo-300'
                : isDarkMode
                  ? 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
              {a.axis}
            </div>
            <div className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{a.name}</div>
            <div className={`text-[10px] mt-1 leading-snug ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{a.oneLiner}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
