import React from 'react';

type Props = {
  description: string;
  output: { title: string; text: string };
  simulation: { title: string; icon: React.ComponentType<any> };
  verdict: { title: string; result: string; confidence: string };
  className?: string;
};

const StructuralGauntlet: React.FC<Props> = ({ description, output, simulation, verdict, className }) => (
  <div className={`bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-left ${className || ''}`}>
    <p className="text-slate-400 text-lg mb-4">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-semibold text-slate-300">
      <div className="bg-slate-900/70 p-4 rounded-lg">
        <p className="mb-2">{output.title}</p>
        <p className="font-mono text-sm text-purple-400 break-all">{output.text}</p>
      </div>
      <div className="text-4xl text-slate-600 animate-pulse">→</div>
      <div className="bg-slate-900/70 p-4 rounded-lg">
        <p className="mb-2">{simulation.title}</p>
        {React.createElement(simulation.icon, { size: 48, className: 'mx-auto text-orange-400' })}
      </div>
    </div>
    <div className="mt-8 text-center bg-green-900/30 p-4 rounded-lg border border-green-500/50">
      <p className="text-slate-300 text-lg">{verdict.title}</p>
      <p className="text-4xl font-black text-green-400 drop-shadow-lg">{verdict.result}</p>
      <p className="font-mono text-slate-400 mt-2">{verdict.confidence}</p>
    </div>
  </div>
);

export default StructuralGauntlet; 
