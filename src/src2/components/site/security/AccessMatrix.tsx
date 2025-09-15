import React from 'react';

export type AccessItem = { label: string; status: string; statusColor?: 'green' | 'yellow' | 'red' | 'gray'; description?: string; metadata?: string };

const colorMap: Record<NonNullable<AccessItem['statusColor']>, string> = {
  green: 'text-green-600 dark:text-green-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  red: 'text-red-600 dark:text-red-400',
  gray: 'text-slate-500',
};

type Props = {
  items: AccessItem[];
  title?: string;
  className?: string;
};

const AccessMatrix: React.FC<Props> = ({ items, title, className }) => (
  <section className={className}>
    {title && <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-3">{title}</h3>}
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-900 dark:text-slate-200 font-medium">{it.label}</span>
            <span className={`${colorMap[it.statusColor || 'gray']} font-mono text-sm`}>{it.status}</span>
          </div>
          {it.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{it.description}</p>}
          {it.metadata && <p className="text-xs text-slate-500 mt-1">{it.metadata}</p>}
        </div>
      ))}
    </div>
  </section>
);

export default AccessMatrix; 