'use client';

import React from 'react';

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureHighlight({ icon, title, description }: FeatureHighlightProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl shadow-lg border border-slate-200 h-full transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-lg">{description}</p>
    </div>
  );
}
