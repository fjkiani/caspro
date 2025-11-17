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
		<span className={`ml-2 text-sm ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
			{up ? '▲' : '▼'} {Math.abs(d).toFixed(2)}%
		</span>
	);
};

const KPIStrip: React.FC<Props> = ({ items, className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 ${className || ''}`}>
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
			{items.map((it, i) => (
				<div key={i} className="p-2 md:p-4 rounded border border-slate-100 dark:border-slate-700 text-center">
					<div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{it.label}</div>
					<div className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 dark:text-slate-100">
						{typeof it.value === 'number' ? it.value.toLocaleString() : it.value}
						{fmtDelta(it.delta)}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default KPIStrip;



