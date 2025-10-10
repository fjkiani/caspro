'use client';

import Link from 'next/link';
import { FC } from 'react';
import { ArrowRight, Lock, Briefcase, BarChart4 } from 'lucide-react';
import { InvestorCardData } from './data';

type InvestorCardProps = Omit<InvestorCardData, 'status'> & {
  status: 'active' | 'coming-soon';
};

const icons = {
  Briefcase,
  BarChart4,
};

const InvestorCard: React.FC<InvestorCardProps> = ({ title, description, href, iconName, status }) => {
  const isLocked = status === 'coming-soon';
  const Icon = icons[iconName];

  const cardContent = (
    <div
      className={`
        bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col h-full
        transition-all duration-300 ease-in-out
        ${isLocked ? 'cursor-not-allowed bg-slate-800/20' : 'hover:bg-slate-700/50 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10'}
      `}
    >
      <div className="flex-grow">
        <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
          <div className="bg-slate-700 p-2 sm:p-3 rounded-lg">
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isLocked ? 'text-slate-500' : 'text-blue-400'}`} />
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${isLocked ? 'text-slate-500' : 'text-white'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-slate-300 text-sm sm:text-base leading-relaxed`}>
          {description}
        </p>
      </div>
      <div className="mt-4 sm:mt-6 flex items-center justify-between">
        {isLocked ? (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-400">
            <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Coming Soon</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 font-semibold group">
            <span>View Analysis</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return <div>{cardContent}</div>;
  }

  return <Link href={href}>{cardContent}</Link>;
};

export default InvestorCard; 