'use client';

import Link from 'next/link';
import { FC } from 'react';
import { ArrowRight, Lock, BookOpen, Dna, ShieldCheck, Crosshair } from 'lucide-react';
import { DoctrineCardData } from './data';

type DoctrineCardProps = Omit<DoctrineCardData, 'status'> & {
  status: 'active' | 'coming-soon';
};

const icons = {
  BookOpen,
  Dna,
  ShieldCheck,
  Crosshair,
};

const DoctrineCard: React.FC<DoctrineCardProps> = ({ title, description, href, iconName, status }) => {
  const isLocked = status === 'coming-soon';
  const Icon = icons[iconName];

  const cardContent = (
    <div
      className={`
        bg-slate-800/80 border border-slate-700/80 rounded-xl p-8 flex flex-col h-full
        transition-all duration-300 ease-in-out
        ${isLocked 
          ? 'cursor-not-allowed bg-slate-800/40' 
          : 'group-hover:bg-slate-800 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1.5'
        }
      `}
    >
      <div className="flex-grow">
        <div className="mb-4 flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-primary/20">
            <Icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${isLocked ? 'text-slate-500' : 'text-primary'}`} />
          </div>
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isLocked ? 'text-slate-500' : 'text-slate-100 group-hover:text-primary'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm transition-colors duration-300 ${isLocked ? 'text-slate-600' : 'text-slate-300 group-hover:text-slate-200'}`}>
          {description}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        {isLocked ? (
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <Lock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-primary font-semibold">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return <div className="h-full">{cardContent}</div>;
  }

  return <Link href={href} className="group block h-full">{cardContent}</Link>;
};

export default DoctrineCard; 