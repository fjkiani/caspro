'use client';

import React from 'react';

interface KillChainFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const KillChainFeatureCard = ({ icon, title, description }: KillChainFeatureCardProps) => {
  return (
    <div className="bg-slate-900/50 border-2 border-red-500/30 rounded-lg p-6 h-full text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-red-900/50 border-2 border-red-500/60 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-red-300 mb-2 tracking-wider">{title}</h3>
      <p className="text-slate-400 flex-grow">{description}</p>
    </div>
  );
}; 