import React from 'react';

type Props = {
  inputs: string[];
  outputs: string[];
  info: { title: string; text: string }[];
  className?: string;
};

const CommandCenter: React.FC<Props> = ({ inputs, outputs, info, className }) => (
  <section className={className}>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div className="flex flex-col space-y-3">
        <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">Inputs</h3>
        {inputs.map((t, i) => (
          <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-3xl">🧬</div>
            <div className="font-medium text-slate-900 dark:text-slate-200">{t}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="relative text-7xl">🧠<div className="absolute inset-0 -m-4 border-2 border-sky-400/50 rounded-full animate-ping" /></div>
        <h3 className="text-3xl font-bold text-sky-500">AI Core</h3>
      </div>
      <div className="flex flex-col space-y-3">
        <h3 className="text-xl font-bold text-green-600 dark:text-green-400">Outputs</h3>
        {outputs.map((t, i) => (
          <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-3xl">✅</div>
            <div className="font-medium text-slate-900 dark:text-slate-200">{t}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {info.map((b, i) => (
        <div key={i} className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-cyan-200 dark:border-cyan-500/30 text-center">
          <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">{b.title}</h4>
          <p className="text-slate-700 dark:text-slate-300 text-sm">{b.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CommandCenter; 