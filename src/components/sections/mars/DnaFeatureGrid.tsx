"use client";

import React from 'react';
import { Cpu, Database, Maximize } from 'lucide-react';
import { DNA_FEATURES } from '@/data/dna-hero-data';

const IconMap: Record<string, any> = {
  Cpu,
  Database,
  Maximize
};

export const DnaFeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-48 px-12 max-w-[1400px] mx-auto">
      {DNA_FEATURES.map((feature, i) => {
        const Icon = IconMap[feature.icon];
        return (
          <div key={i} className="space-y-8 group">
            <Icon className="text-cyan-500 w-12 h-12 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-200">{feature.title}</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-[0.1em]">
              {feature.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
};
