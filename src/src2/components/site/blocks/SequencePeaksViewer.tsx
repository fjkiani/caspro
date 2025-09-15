import React from 'react';

type Peak = { start: number; end: number; value: number };

type Props = {
	length: number;
	peaks: Peak[];
	variantPos?: number;
	title?: string;
	className?: string;
};

const barWidth = 2;

const SequencePeaksViewer: React.FC<Props> = ({ length, peaks, variantPos, title = 'Target Peaks', className }) => {
	const bars = Array.from({ length }, (_, i) => i);
	return (
		<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
			<div className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
			<div className="relative overflow-x-auto">
				<div className="relative h-20 w-max bg-slate-50 dark:bg-slate-900 rounded">
					{bars.map((x) => (
						<div key={x} className="absolute bottom-0" style={{ left: x * barWidth, width: barWidth, height: 2, background: '#94a3b8' }} />
					))}
					{peaks.map((p, i) => (
						<div key={i} className="absolute bottom-0 bg-cyan-500/80" style={{ left: p.start * barWidth, width: Math.max(2, (p.end - p.start + 1) * barWidth), height: Math.max(4, p.value * 60) }} />
					))}
					{typeof variantPos === 'number' && (
						<div className="absolute top-0 bottom-0" style={{ left: variantPos * barWidth, width: barWidth, background: '#ef4444', opacity: 0.7 }} />
					)}
				</div>
			</div>
			<div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Cyan bars = desired peaks; red line = variant.</div>
		</div>
	);
};

export default SequencePeaksViewer; 