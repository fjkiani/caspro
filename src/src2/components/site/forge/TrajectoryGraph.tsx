import React from 'react';

type Point = { step: number; score: number };

type Props = {
	series: readonly Point[];
	className?: string;
	title?: string;
};

const TrajectoryGraph: React.FC<Props> = ({ series, className, title = 'Search Trajectory' }) => {
	const maxScore = Math.max(...series.map(s => s.score), 1);
	const maxStep = Math.max(...series.map(s => s.step), 1);
	return (
		<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
			<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
			<div className="relative h-32 bg-slate-50 dark:bg-slate-900 rounded">
				{series.map((p, i) => {
					const left = (p.step / maxStep) * 100;
					const height = Math.max(2, (p.score / maxScore) * 100);
					return (
						<div key={i} className="absolute bottom-0 bg-indigo-500/80" style={{ left: `${left}%`, width: 3, height: `${height}%` }} />
					);
				})}
			</div>
			<div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Bar height = score; position = search step.</div>
		</div>
	);
};

export default TrajectoryGraph; 
 
 
 
 