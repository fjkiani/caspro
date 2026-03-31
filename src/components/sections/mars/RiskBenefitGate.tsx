'use client';

import React from 'react';
import { 
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const SCATTER_DATA_STABLE = Array.from({ length: 40 }, () => ({
  x: Math.random() * 0.5 + 0.1,
  y: Math.random() * 0.6 + 0.3,
}));

const SCATTER_DATA_FUTILE = Array.from({ length: 25 }, () => ({
  x: Math.random() * 0.2 + 0.7,
  y: Math.random() * 0.3 + 0.1,
}));

const STEP_BOUNDARY = [
  { x: 0, y: 0.5 }, { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.4 }, { x: 0.5, y: 0.4 },
  { x: 0.5, y: 0.35 }, { x: 0.6, y: 0.35 }, { x: 0.6, y: 0.25 }, { x: 0.65, y: 0.25 }, { x: 0.65, y: 0 },
];

export const RiskBenefitGate = () => (
  <div className="flex flex-col h-full font-mono p-6">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">ENGINE 04 // IO RISK-BENEFIT GATE</h3>
        <p className="text-[9px] text-cyan-500 font-bold italic mt-1">
          Net Clinical Benefit = (p<sub className="text-[7px]">resp</sub> × Benefit) - (Risk<sub className="text-[7px]">tox</sub> × Toxicity<sub className="text-[7px]">cost</sub>)
        </p>
      </div>
      <div className="text-right">
        <span className="text-sm font-black text-cyan-400 tracking-tighter">AUC 0.822</span>
      </div>
    </div>
    <div className="flex-1 relative min-h-[350px] lg:min-h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
          <XAxis type="number" dataKey="x" domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#475569" fontSize={9} label={{ value: 'Toxicity Risk', position: 'bottom', fill: '#64748b', fontSize: 10, offset: 20 }} />
          <YAxis type="number" dataKey="y" domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#475569" fontSize={9} label={{ value: 'Response Probability', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
          <Scatter data={STEP_BOUNDARY} line={{ stroke: '#22d3ee', strokeWidth: 1.5 }} shape={<></>} />
          <Scatter name="Stable" data={SCATTER_DATA_STABLE} fill="#475569" opacity={0.6} />
          <Scatter name="Futile" data={SCATTER_DATA_FUTILE} fill="#f43f5e" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="absolute right-[10%] bottom-[20%] pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-12 h-[1px] bg-zinc-700" />
          <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">
            RULE OUT:<br /><span className="text-red-500">FUTILE TOXICITY</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
