import React from 'react';
import IconSelector from './IconSelector';

interface CapabilityTabButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CapabilityTabButton({ title, isActive, onClick }: CapabilityTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
      }`}
    >
      <IconSelector title={title} size={16} />
      {title.split(':')[0]}
    </button>
  );
}
