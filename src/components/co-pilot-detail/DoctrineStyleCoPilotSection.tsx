'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Cpu, ShieldCheck, Target, Zap, Brain, Users } from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';

interface DoctrineStyleCoPilotSectionProps {
  content: CoPilotDetailContent;
}

const DoctrineStyleCoPilotSection: React.FC<DoctrineStyleCoPilotSectionProps> = ({ content }) => {
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
      setExpandedCards(new Set(content.keyCapabilities.map(cap => cap.title)));
    }
    setShowAll(!showAll);
  };

  // Transform key capabilities into tactical steps
  const tacticalSteps = content.keyCapabilities.map((capability, index) => ({
    title: capability.title,
    content: `${capability.technical}\n\n**Scientific Impact:** ${capability.scientific}\n\n**Business Value:** ${capability.business}`,
    stepNumber: index + 1
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tighter mb-4">
            {content.pageTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {content.vision}
          </p>
        </header>

        {/* Strategic Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Core Capabilities */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-7 w-7 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-800">Core Capabilities</h3>
            </div>
            <ul className="space-y-2">
              {content.keyCapabilities.slice(0, 3).map((capability, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{capability.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-7 w-7 text-green-600" />
              <h3 className="text-xl font-bold text-slate-800">Target Audience</h3>
            </div>
            <ul className="space-y-2">
              {content.valuePropositionSections.map((section, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{section.audience}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Impact */}
          

        {/* Tactical Breakdown */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
            <h3 className="text-2xl font-bold text-slate-800">Tactical Breakdown</h3>
          </div>
          
          <div className="space-y-4">
            {tacticalSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                onClick={() => toggleCard(step.title)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                  </div>
                  {expandedCards.has(step.title) ? 
                    <ChevronDown className="w-5 h-5 text-slate-400" /> : 
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  }
                </div>
                {expandedCards.has(step.title) && (
                  <div className="mt-4 pl-12 border-l-2 border-slate-200">
                    <div 
                      className="text-slate-700 text-base leading-relaxed ml-6 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: step.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/^(.*)$/, '<p>$1</p>')
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition Matrix */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="h-8 w-8 text-green-600" />
            <h3 className="text-2xl font-bold text-slate-800">Value Proposition Matrix</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.valuePropositionSections.map((section, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h4 className="text-lg font-bold text-slate-800 mb-4">{section.audience}</h4>
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Conclusion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">Strategic Conclusion</h3>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed">
            {content.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DoctrineStyleCoPilotSection;
