'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ObservedOutcome, KPI } from '@/data/coPilotDetails';
import { AlertTriangle, CheckCircle, TrendingUp, Clock, Users, Shield, Target } from 'lucide-react';
import SectionHeader from '@/components/products/shared/SectionHeader';

interface SimplifiedOutcomesSectionProps {
  outcomes: ObservedOutcome[];
  kpis?: KPI[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Target,
};

const colorMap: Record<string, string> = {
  red: 'from-red-50 to-red-100 border-red-200 text-red-700',
  green: 'from-green-50 to-green-100 border-green-200 text-green-700',
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
  teal: 'from-teal-50 to-teal-100 border-teal-200 text-teal-700',
  orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
};

export default function SimplifiedOutcomesSection({ outcomes, kpis }: SimplifiedOutcomesSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  if (!outcomes || outcomes.length === 0) {
    return null;
  }
  
  return (
    <section ref={sectionRef} className="mb-16">
      <SectionHeader
        title="Real-World Results"
        description="Measurable outcomes from using this capability"
      />
      
      {/* Key Outcomes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {outcomes.slice(0, 3).map((outcome, idx) => {
          const IconComponent = iconMap[outcome.icon] || CheckCircle;
          const colorClass = colorMap[outcome.color] || colorMap.blue;
          
          return (
            <motion.div
              key={`outcome-${idx}-${outcome.title}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`bg-gradient-to-br ${colorClass} rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold mb-2">{outcome.keyMetric}</div>
                  <h3 className="text-lg font-semibold mb-2">{outcome.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{outcome.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* KPI Strip */}
      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.slice(0, 6).map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
              className="bg-white rounded-xl p-4 border-2 border-slate-200 text-center hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl font-bold text-blue-600 mb-1">{kpi.value}</div>
              <div className="text-xs text-slate-600">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

