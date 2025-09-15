import React from 'react';

type Side = { title: string; value: string; subtitle: string };

type Props = {
  left: Side;
  right: Side;
  score: { title: string; value: string };
  className?: string;
};

const ZetaOracleInAction: React.FC<Props> = ({ left, right, score, className }) => (
  <div className={`bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-3xl mx-auto ${className || ''}`}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="text-center p-4 md:border-r md:border-slate-700">
        <p className="text-slate-400 text-lg">{left.title}</p>
        <p className="text-6xl font-extrabold text-yellow-400 my-4">{left.value}</p>
        <p className="text-slate-500">{left.subtitle}</p>
      </div>
      <div className="text-center p-4">
        <p className="text-slate-400 text-lg">{right.title}</p>
        <p className="text-6xl font-extrabold text-red-500 my-4">{right.value}</p>
        <p className="text-slate-400">{right.subtitle}</p>
      </div>
    </div>
    <div className="mt-8 text-center bg-red-900/30 p-4 rounded-lg border border-red-500/50">
      <p className="text-slate-300 text-lg">{score.title}</p>
      <p className="text-5xl font-black text-red-400 drop-shadow-lg">{score.value}</p>
    </div>
  </div>
);

export default ZetaOracleInAction; 
