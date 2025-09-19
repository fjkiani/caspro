'use client';

import React from 'react';
import { ValuePropositionSection } from '@/data/coPilotDetails';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { CheckCircle } from 'lucide-react';

interface ValuePropositionItemProps {
  valueProposition: ValuePropositionSection;
}

const ValuePropositionItem: React.FC<ValuePropositionItemProps> = ({ valueProposition }) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg p-6 border border-slate-700 hover:shadow-primary/10 transition-shadow duration-300 h-full">
      <h4 className="text-xl font-semibold text-primary mb-4">
        {valueProposition.audience}
      </h4>
      <ul className="space-y-4">
        {valueProposition.points.map((point: any, index: number) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="text-primary mr-4 mt-1.5 flex-shrink-0" size={24} />
            <div 
              className="text-slate-300 text-lg leading-relaxed prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={renderMarkdown(point)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValuePropositionItem; 