'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import MarkdownText from './shared/MarkdownText';

interface StrategicConclusionProps {
  conclusion: string;
}

export default function StrategicConclusion({ conclusion }: StrategicConclusionProps) {
  if (!conclusion) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-slate-800">Strategic Conclusion</h3>
      </div>
      <MarkdownText 
        text={conclusion}
        className="text-slate-700 text-lg leading-relaxed"
      />
    </div>
  );
}

