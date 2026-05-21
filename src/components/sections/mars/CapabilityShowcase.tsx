"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';
import { getActiveEngines } from '@/data/engine-registry';
import { getEngineIcon } from '@/components/engine/engine-icons';

// Re-export for backward compat
export interface Capability {
  id: string;
  label: string;
  question: string;
  icon: React.ElementType;
  route: string;
}

const buildCapabilities = (): Capability[] =>
  getActiveEngines().map(e => ({
    id: e.id,
    label: e.label.toUpperCase(),
    question: e.desc,
    icon: getEngineIcon(e.slug),
    route: e.route,
  }));

export const HERO_CAPABILITIES = buildCapabilities();

interface CapabilityShowcaseProps {
  activeIndex: number;
  onSelect?: (index: number) => void;
}

export const CapabilityShowcase: React.FC<CapabilityShowcaseProps> = ({
  activeIndex,
  onSelect,
}) => {
  const router = useRouter();
  const capabilities = buildCapabilities();
  const active = capabilities[activeIndex];

  return (
    <div className="flex flex-col gap-0">
      {/* Engine List — lightweight, sidebar only */}
      {capabilities.map((cap, i) => {
        const isActive = i === activeIndex;
        const Icon = cap.icon;
        return (
          <motion.div
            key={cap.id}
            onClick={() => onSelect?.(i)}
            className={`
              flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-300 border-l-2
              ${isActive
                ? 'border-l-cyan-400 bg-cyan-500/5'
                : 'border-l-zinc-800 hover:border-l-zinc-600 hover:bg-white/[0.02]'
              }
            `}
            layout
          >
            <span className={`text-[9px] font-black tracking-[0.3em] w-5 ${isActive ? 'text-cyan-400' : 'text-zinc-700'}`}>
              {cap.id}
            </span>
            <Icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-700'}`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? 'text-white' : 'text-zinc-600'}`}>
              {cap.label}
            </span>
          </motion.div>
        );
      })}

      {/* 2 CTA Buttons */}
      {active && (
        <div className="flex flex-col gap-2 mt-4 px-4">
          <button
            onClick={() => router.push(active.route)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
          >
            <Zap className="w-3 h-3" />
            Execute Interception
          </button>
          <button
            onClick={() => router.push(active.route)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-zinc-800 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
          >
            Open Full Engine
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
