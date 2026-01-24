'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';
import { Target, Zap, Search, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function RDExampleUseCase() {
  const oldWayRef = useRef<HTMLDivElement>(null);
  const newWayRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrolledRef: React.RefObject<HTMLDivElement>, otherRef: React.RefObject<HTMLDivElement>) => {
    if (scrolledRef.current && otherRef.current) {
      otherRef.current.scrollTop = scrolledRef.current.scrollTop;
    }
  };

  const traditionalSteps = [
    {
      number: 1,
      title: 'Eligibility-Based Search',
      description: 'Query: "ovarian cancer phase 2 trial"',
      icon: Search,
      problems: [
        'Results: Multiple trials (all technically eligible)',
        'Challenge: Identifying which trials align with tumor biology',
        'Trial A: VEGF inhibitor (different mechanism)',
        'Trial B: Immunotherapy (partial mechanism match)',
        'Trial C: PARP inhibitor (mechanism-aligned)',
        'Other trials: Various mechanisms',
        'Consideration: Mechanism alignment may help prioritize options'
      ]
    }
  ];

  const platformSteps = [
    {
      number: 1,
      title: '7D Mechanism Vector',
      description: '[0.88, 0.12, 0.15, 0.10, 0.05, 0.0, 0.0]',
      icon: Target,
      solutions: [
        'DDR: 0.88 (elevated) ← Double DNA repair pathway involvement',
        'MBD4 loss = BER pathway involvement',
        'TP53 R175H = Checkpoint pathway involvement',
        'Combined: Suggests HRD-high profile, PARP pathway relevance'
      ]
    },
    {
      number: 2,
      title: 'Mechanism-Based Trial Matching',
      description: 'Patient-trial alignment scoring',
      icon: Zap,
      solutions: [
        'PARP + ATR Trial: Higher mechanism fit score',
        'PARP Monotherapy: Moderate mechanism fit score',
        'Immunotherapy: Lower mechanism fit score',
        'VEGF inhibitor: Lower mechanism fit score'
      ]
    },
    {
      number: 3,
      title: 'Drug Efficacy Ranking (S/P/E)',
      description: 'S/P/E framework provides ranked drug options',
      icon: CheckCircle,
      solutions: [
        'PARP inhibitors: Higher efficacy scores',
        'Carboplatin: Higher efficacy scores',
        'Framework provides ranked drug options'
      ]
    },
    {
      number: 4,
      title: 'Toxicity Risk Assessment',
      description: 'Pharmacogenomic screening and pathway overlap',
      icon: AlertTriangle,
      solutions: [
        'Pharmacogene screening: DPYD, TPMT, UGT1A1 assessed',
        'MoA-pathway overlap: Evaluated for risk signals',
        'CPIC dosing: Recommendations provided where applicable',
        'Risk assessment framework applied'
      ]
    },
    {
      number: 5,
      title: 'Outcome: Mechanism-Informed Selection',
      description: 'Integrated patient-trial-dose assessment',
      icon: CheckCircle,
      solutions: [
        'Prioritized trial list based on mechanism alignment',
        'Mechanism fit scores provided for consideration',
        'Integrated patient-trial-dose assessment framework'
      ]
    }
  ];

  const JourneyStep = ({ 
    number, 
    title, 
    description, 
    icon: Icon, 
    isLast = false,
    variant = 'old',
    problems = [],
    solutions = []
  }: any) => (
    <div className={`relative ${!isLast ? 'pb-8' : ''}`}>
      {!isLast && (
        <div className={`absolute left-6 top-12 w-0.5 h-full ${
          variant === 'old' ? 'bg-red-500/30' : 'bg-green-500/30'
        }`}></div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
          variant === 'old' 
            ? 'bg-red-500/20 border-red-500/50' 
            : 'bg-green-500/20 border-green-500/50'
        }`}>
          <Icon className={`w-6 h-6 ${
            variant === 'old' ? 'text-red-500' : 'text-green-500'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-semibold ${
              variant === 'old' ? 'text-red-600' : 'text-green-600'
            }`}>
              Step {number}
            </span>
            <h4 className={`text-lg font-bold ${
              variant === 'old' ? 'text-red-700' : 'text-green-700'
            }`}>
              {title}
            </h4>
          </div>
          <p className="text-slate-700 mb-3">{description}</p>
          {(problems.length > 0 || solutions.length > 0) && (
            <ul className="space-y-2">
              {(variant === 'old' ? problems : solutions).map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    variant === 'old' ? 'bg-red-500' : 'bg-green-500'
                  }`}></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Example Use Case: MBD4 + TP53 Patient"
          subtitle="Patient Profile: MBD4 frameshift + TP53 R175H (HGSOC)"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Traditional Approach */}
          <div className="flex flex-col bg-red-900/20 rounded-2xl shadow-xl border border-red-800/50 overflow-hidden">
            <div className="sticky top-0 bg-red-900/30 p-6 border-b border-red-800/50 z-10">
              <h4 className="text-2xl font-bold text-red-400 mb-2 flex items-center gap-3">
                <Target className="w-6 h-6" /> Traditional Approach
              </h4>
              <p className="text-red-300">Eligibility-Based Search</p>
            </div>
            <div 
              ref={oldWayRef} 
              onScroll={() => handleScroll(oldWayRef, newWayRef)}
              className="flex-1 p-8 space-y-8 overflow-y-auto thin-scrollbar max-h-[70vh]"
            >
              {traditionalSteps.map((step, index) => (
                <JourneyStep 
                  key={index}
                  {...step}
                  variant="old"
                  isLast={index === traditionalSteps.length - 1}
                />
              ))}
            </div>
          </div>
          
          {/* Platform Approach */}
          <div className="flex flex-col bg-green-900/20 rounded-2xl shadow-xl border border-green-800/50 overflow-hidden">
            <div className="sticky top-0 bg-green-900/30 p-6 border-b border-green-800/50 z-10">
              <h4 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-3">
                <Zap className="w-6 h-6" /> Platform Approach
              </h4>
              <p className="text-green-300">Mechanism-Based Analysis</p>
            </div>
            <div 
              ref={newWayRef} 
              onScroll={() => handleScroll(newWayRef, oldWayRef)}
              className="flex-1 p-8 space-y-8 overflow-y-auto thin-scrollbar max-h-[70vh]"
            >
              {platformSteps.map((step, index) => (
                <JourneyStep 
                  key={index}
                  {...step}
                  variant="new"
                  isLast={index === platformSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
