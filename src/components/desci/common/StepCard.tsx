'use client';

import React from 'react';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const StepCard = ({ step, title, description, icon }: StepCardProps) => {
  return (
    <div className="flex flex-col text-left p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full transition-all duration-300 hover:border-teal-500 hover:shadow-teal-500/20">
      <div className="flex items-center mb-4">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mr-4">
          {step}.
        </div>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  );
}; 