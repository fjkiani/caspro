import React from 'react';
import { TwoColumn } from '../CrisproDeckPrimitives';

export type ForgeAssetsProps = {
  input: string;
  mission: string;
  assets: { icon: React.ReactElement | React.ComponentType<any>; label: string }[];
  advantageTitle: string;
  advantageHighlight: string;
  advantageDescription: string;
  forgeHeader: string;
  forgeText: string;
  className?: string;
};

const AssetRow: React.FC<{ icon: React.ReactElement | React.ComponentType<any>; label: string }> = ({ icon, label }) => (
  <div className="bg-slate-50 dark:bg-slate-900/70 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center">
    <span className="mr-3 text-xl text-green-600 dark:text-green-400">
      {typeof icon === 'function' ? React.createElement(icon as any) : icon}
    </span>
    <p className="font-semibold text-green-700 dark:text-green-400">{label}</p>
  </div>
);

const ForgeAssets: React.FC<ForgeAssetsProps> = ({ input, mission, assets, advantageTitle, advantageHighlight, advantageDescription, forgeHeader, forgeText, className = '' }) => (
  <TwoColumn className={className}>
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 h-full">
      <p className="text-slate-500 dark:text-slate-400 text-sm">Input:</p>
      <p className="text-xl md:text-2xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">{input}</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Mission:</p>
      <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">{mission}</p>
      <div className="space-y-3">
        {assets.map((a, i) => (
          <AssetRow key={i} icon={a.icon} label={a.label} />
        ))}
      </div>
    </div>
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-purple-200 dark:border-purple-500/50 h-full">
      <h3 className="text-2xl md:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">{advantageTitle}</h3>
      <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">{advantageHighlight}</h4>
      <p className="text-slate-700 dark:text-slate-300 mb-6">{advantageDescription}</p>
      <div className="bg-slate-50 dark:bg-slate-900/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-300 font-semibold">{forgeHeader}</p>
        <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white mt-2">{forgeText}</p>
      </div>
    </div>
  </TwoColumn>
);

export default ForgeAssets; 