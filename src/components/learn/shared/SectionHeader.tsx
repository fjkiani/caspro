import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, color = 'blue', className = "" }) => {
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'teal': return 'border-teal-600';
      case 'cyan': return 'border-cyan-600';
      case 'red': return 'border-red-600';
      case 'green': return 'border-green-600';
      case 'purple': return 'border-purple-600';
      case 'amber': return 'border-amber-600';
      case 'indigo': return 'border-indigo-600';
      case 'yellow': return 'border-yellow-600';
      default: return 'border-blue-600';
    }
  };

  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className={`text-3xl font-bold text-slate-900 border-b-2 ${getColorClass(color)} pb-2 mb-4 inline-block`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader; 