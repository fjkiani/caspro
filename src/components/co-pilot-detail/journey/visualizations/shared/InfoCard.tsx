'use client';

import React from 'react';

interface InfoCardProps {
  variant: 'old' | 'new';
  title: string;
  subtitle: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ variant, title, subtitle }) => {
  const isOldWay = variant === 'old';
  
  return (
    <div className={`mt-4 p-3 rounded-lg border ${
      isOldWay 
        ? 'bg-red-50 border-red-200' 
        : 'bg-green-50 border-green-200'
    }`}>
      <p className={`text-sm font-medium ${
        isOldWay ? 'text-red-700' : 'text-green-700'
      }`}>
        {title}
      </p>
      <p className={`text-xs mt-1 ${
        isOldWay ? 'text-red-600' : 'text-green-600'
      }`}>
        {subtitle}
      </p>
    </div>
  );
};

export default InfoCard;
