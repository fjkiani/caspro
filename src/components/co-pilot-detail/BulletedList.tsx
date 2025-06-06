'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface BulletedListProps {
  items: string[];
  className?: string;
}

const BulletedList: React.FC<BulletedListProps> = ({ items, className = "" }) => {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
            <Check size={12} className="text-primary" />
          </div>
          <span className="text-slate-300 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletedList; 
 