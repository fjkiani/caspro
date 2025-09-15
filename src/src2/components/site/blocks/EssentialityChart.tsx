import React from 'react';

type Point = { context: { cellLine: string; mutations?: string[] }; score: number };

type Props = { series: readonly Point[]; className?: string; title?: string };

const barColor = (s: number) => (s >= 0.8 ? 'bg-red-500' : s >= 0.6 ? 'bg-amber-500' : 'bg-slate-500');

const EssentialityChart: React.FC<Props> = ({ series, className, title = 'Essentiality by context' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="space-y-2">
			{series.map((p, i) => (
				<div key={i} className="flex items-center justify-between gap-4 text-sm">
					<div className="min-w-[140px] text-slate-700 dark:text-slate-200">{p.context.cellLine}{p.context.mutations && p.context.mutations.length ? ` (${p.context.mutations.join(',')})` : ''}</div>
					<div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded">
						<div className={`h-2 rounded ${barColor(p.score)}`} style={{ width: `${Math.max(0, Math.min(1, p.score)) * 100}%` }} />
					</div>
					<div className="font-mono w-12 text-right">{p.score.toFixed(2)}</div>
				</div>
			))}
		</div>
	</div>
);

export default EssentialityChart; 
