'use client';

import React from 'react';

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureHighlight = ({ icon, title, description }: FeatureHighlightProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full transition-all duration-300 hover:border-pink-500 hover:shadow-pink-500/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
}; 