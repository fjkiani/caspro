'use client';
import React from 'react';
import { Eye, Target, Layers, Zap, CheckCircle, ShieldCheck } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  iconName?: string; // Changed from icon component to string identifier
  iconClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, iconName, iconClassName = "text-primary" }) => {
  // Map string identifiers to icon components
  let IconComponent: React.ElementType | null = null;
  switch (iconName) {
    case 'Eye':
      IconComponent = Eye;
      break;
    case 'Target':
      IconComponent = Target;
      break;
    case 'Layers':
      IconComponent = Layers;
      break;
    case 'Zap':
      IconComponent = Zap;
      break;
    case 'CheckCircle':
      IconComponent = CheckCircle;
      break;
    case 'ShieldCheck':
      IconComponent = ShieldCheck;
      break;
    // Add more icons as needed
  }

  return (
    <div className="mb-6 flex items-center">
      {IconComponent && <IconComponent size={32} className={`mr-3 ${iconClassName}`} />}
      <h2 className="text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight">{title}</h2>
    </div>
  );
};

export default SectionHeader; 
 