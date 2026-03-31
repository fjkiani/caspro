'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

const RADAR_DATA = [
  { subject: 'EFFLUX AXIS', A: 45, B: 80 },
  { subject: 'METABOLIC SHIFT', A: 65, B: 75 },
  { subject: 'APOPTOSIS EVASION', A: 55, B: 65 },
  { subject: 'GENOMIC INSTABILITY', A: 85, B: 90 },
  { subject: 'STEMNESS', A: 40, B: 70 },
  { subject: 'DRUG INACTIVATION', A: 50, B: 85 },
  { subject: 'REPLICATION STRESS', A: 95, B: 95 },
  { subject: 'CELL CYCLE CHECKPOINT', A: 35, B: 60 },
];

export const ResistanceMatrix = () => (
  <div className="flex flex-col h-full items-center justify-center relative font-mono p-4">
    <h3 className="text-[11px] font-black text-zinc-100 uppercase tracking-[0.4em] mb-12 text-center">Cancer 'Kill Chain' Resistance Matrix</h3>
    <div className="w-full h-[350px] lg:h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Baseline" dataKey="A" stroke="#0891b2" fill="#0891b2" fillOpacity={0.1} />
          <Radar name="Patient" dataKey="B" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute left-[33%] top-[45%] z-10"
    >
      <div className="w-6 h-6 bg-rose-500/20 border border-rose-500 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)]">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
      </div>
    </motion.div>
  </div>
);
