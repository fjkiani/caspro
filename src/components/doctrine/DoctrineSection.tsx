'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Cpu, ShieldCheck } from 'lucide-react';
import { DoctrineDetail } from '@/app/doctrine/doctrine-details-data';

type DoctrineSectionProps = {
  doctrine: DoctrineDetail['doctrine'];
}

const DoctrineSection: React.FC<DoctrineSectionProps> = ({ doctrine }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleCard = (title: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedCards(newExpanded);
  };

  const toggleAll = () => {
    if (showAll) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(doctrine.tacticalBreakdown.steps.map(step => step.title)));
    }
    setShowAll(!showAll);
  };

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">{doctrine.title}</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">{doctrine.corePhilosophy}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-7 w-7 text-green-400" />
              <h3 className="text-xl font-bold text-white">Key Capabilities Deployed</h3>
            </div>
            <ul className="space-y-2">
              {doctrine.capabilities.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-200 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-7 w-7 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Tactical Breakdown</h3>
            </div>
            <p className="text-slate-300 text-base">
              Our operational approach is a multi-stage process designed for maximum impact. Each step builds upon the last, creating a cascade of strategic advantage.
            </p>
            <div className="text-center mt-6">
                <button
                    onClick={toggleAll}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                    {showAll ? 'Collapse All Steps' : 'Expand All Steps'}
                </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {doctrine.tacticalBreakdown.steps.map((step, index) => (
            <div 
                key={index} 
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-blue-500"
                onClick={() => toggleCard(step.title)}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">{index + 1}</span>
                        <h4 className="text-lg font-bold text-white">{step.title}</h4>
                    </div>
                    {expandedCards.has(step.title) ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                </div>
                {expandedCards.has(step.title) && (
                    <div className="mt-4 pl-12 border-l-2 border-slate-700">
                        <p className="text-slate-200 text-base leading-relaxed ml-6">{step.content}</p>
                    </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctrineSection; 