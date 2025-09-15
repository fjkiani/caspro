import React from 'react';

type Props = { function: number; stability?: number; foldingImpact?: number; notes?: string; className?: string; title?: string };

const badge = (v?: number) => {
	if (typeof v !== 'number') return null;
	const up = v >= 0;
	return <span className={`ml-2 text-xs ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{up ? '▲' : '▼'} {Math.abs(v).toFixed(2)}</span>;
};

const ProteinDeltaCard: React.FC<Props> = ({ function: func, stability, foldingImpact, notes, className, title = 'Protein functional change' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
			<div className="p-3 rounded border border-slate-100 dark:border-slate-700">
				<div className="text-xs text-slate-500">Function</div>
				<div className="font-mono">{func.toFixed(3)}{badge(func)}</div>
			</div>
			<div className="p-3 rounded border border-slate-100 dark:border-slate-700">
				<div className="text-xs text-slate-500">Stability</div>
				<div className="font-mono">{typeof stability === 'number' ? stability.toFixed(3) : '—'}{badge(stability)}</div>
			</div>
			<div className="p-3 rounded border border-slate-100 dark:border-slate-700">
				<div className="text-xs text-slate-500">Folding</div>
				<div className="font-mono">{typeof foldingImpact === 'number' ? foldingImpact.toFixed(3) : '—'}{badge(foldingImpact)}</div>
			</div>
		</div>
		{notes && <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">{notes}</div>}
	</div>
);

export default ProteinDeltaCard; 
 
 