import React from 'react';

type Line = { ts: string; level: 'info' | 'warn' | 'error'; msg: string };

type Props = {
	lines: Line[];
	className?: string;
};

const levelColor: Record<Line['level'], string> = {
	info: 'text-slate-700 dark:text-slate-200',
	warn: 'text-amber-600 dark:text-amber-400',
	error: 'text-red-600 dark:text-red-400',
};

const RunLogPanel: React.FC<Props> = ({ lines, className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-100">Run Log</div>
		<div className="p-3 font-mono text-xs max-h-64 overflow-auto">
			{lines.map((l, i) => (
				<div key={i} className={`whitespace-pre-wrap ${levelColor[l.level]}`}>
					<span className="text-slate-400 mr-2">{l.ts}</span>
					<span className="uppercase mr-2">{l.level}</span>
					<span>{l.msg}</span>
				</div>
			))}
		</div>
	</div>
);

export default RunLogPanel; 
