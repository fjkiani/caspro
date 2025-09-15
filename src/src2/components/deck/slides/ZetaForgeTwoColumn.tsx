import React from 'react';

type Asset = { icon: React.ComponentType<any>; label: string };

type Column1 = { input: string; mission: string; assets: Asset[] };

type Column2 = { title: string; highlight: string; description: string; infoHeader: string; infoText: string };

type Props = { column1: Column1; column2: Column2; className?: string };

const ZetaForgeTwoColumn: React.FC<Props> = ({ column1, column2, className }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto ${className || ''}`}>
    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full">
      <p className="text-slate-400 text-lg">Input:</p>
      <p className="text-2xl font-bold text-cyan-400 mb-6">{column1.input}</p>
      <p className="text-slate-400 text-lg">Mission:</p>
      <p className="text-2xl font-bold text-slate-200 mb-8">{column1.mission}</p>
      <div className="space-y-4">
        {column1.assets.map((asset, i) => (
          <div key={i} className="bg-slate-900/70 p-4 rounded-lg border border-green-500/30 flex items-center">
            {React.createElement(asset.icon, { size: 32, className: 'text-green-400 mr-4' })}
            <p className="font-semibold text-green-400">{asset.label}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/50 h-full">
      <h3 className="text-3xl font-bold text-purple-400 mb-4">{column2.title}</h3>
      <h4 className="text-5xl font-black text-white mb-4">{column2.highlight}</h4>
      <p className="text-slate-300 text-lg mb-6">{column2.description}</p>
      <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
        <p className="text-slate-400 font-semibold">{column2.infoHeader}</p>
        <p className="text-xl font-bold text-white mt-2">{column2.infoText}</p>
      </div>
    </div>
  </div>
);

export default ZetaForgeTwoColumn; 
