import React from 'react';
import type { TrustBadge } from '../../types/site';

interface Props {
  badges: TrustBadge[];
  className?: string;
}

const TrustBadges: React.FC<Props> = ({ badges, className = '' }) => {
  if (!badges || badges.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((b, i) => (
        <span key={i} className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
          {b.label}
        </span>
      ))}
    </div>
  );
};

export default TrustBadges; 