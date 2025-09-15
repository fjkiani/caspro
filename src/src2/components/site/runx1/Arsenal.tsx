import React from 'react';

type Props = {
  input: string;
  processTitle: string;
  outputs: string[];
  className?: string;
};

const Arsenal: React.FC<Props> = ({ input, processTitle, outputs, className }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-center ${className || ''}`}>
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
      <p className="text-slate-500 text-sm">Input:</p>
      <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{input}</p>
    </div>
    <div className="flex flex-col items-center">
      <div className="text-5xl">🔨</div>
      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{processTitle}</h3>
    </div>
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Therapeutic Arsenal</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {outputs.map((o, i) => (
          <div key={i} className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 text-sm font-semibold">{o}</div>
        ))}
      </div>
    </div>
  </div>
);

export default Arsenal; 