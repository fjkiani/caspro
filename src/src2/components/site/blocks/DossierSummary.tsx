import React from 'react';
import { EvidenceList, Pill } from '../CrisproDeckPrimitives';

export type DossierSummaryProps = {
  assetId: string;
  status: string;
  checkpoints: { icon?: React.ComponentType<any> | React.ReactElement; label: string; color?: 'green' | 'yellow' | 'sky' }[];
  description?: string;
  className?: string;
};

const DossierSummary: React.FC<DossierSummaryProps> = ({ assetId, status, checkpoints, description, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{assetId}</h3>
      <Pill color="green">{status}</Pill>
    </div>
    <EvidenceList items={checkpoints.map(c => ({ title: c.label, icon: c.icon }))} />
    {description && <p className="text-slate-700 dark:text-slate-300 mt-6">{description}</p>}
  </div>
);

export default DossierSummary; 