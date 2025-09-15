import React from 'react';

type Item = { label: string; value: string | number; delta?: number };

type Props = {
	items: readonly Item[];
	className?: string;
};

const fmtDelta = (d?: number) => {
	if (typeof d !== 'number') return null;
	const up = d >= 0;
	return (
		<span className={`ml-2 text-xs ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
			{up ? '▲' : '▼'} {Math.abs(d).toFixed(2)}%
		</span>
	);
};

const KPIStrip: React.FC<Props> = ({ items, className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 ${className || ''}`}>
		<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
			{items.map((it, i) => (
				<div key={i} className="p-3 rounded border border-slate-100 dark:border-slate-700">
					<div className="text-xs text-slate-500 dark:text-slate-400">{it.label}</div>
					<div className="text-xl font-semibold text-slate-800 dark:text-slate-100">
						{typeof it.value === 'number' ? it.value.toLocaleString() : it.value}
						{fmtDelta(it.delta)}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default KPIStrip; 