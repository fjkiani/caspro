import React from 'react';

type Track = { context?: string; points: { pos: number; score: number }[] };

type Props = { tracks: readonly Track[]; title?: string; className?: string };

const height = 80;

const AccessibilityTrack: React.FC<Props> = ({ tracks, title = 'Chromatin Accessibility', className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="space-y-3">
			{tracks.map((t, i) => (
				<div key={i}>
					{t.context && <div className="text-xs text-slate-500 mb-1">{t.context}</div>}
					<div className="relative w-full" style={{ height }}>
						{t.points.map((p, j) => (
							<div key={j} className="absolute bottom-0 bg-cyan-500/80" style={{ left: `${(j / Math.max(1, t.points.length - 1)) * 100}%`, width: 2, height: `${Math.min(100, Math.max(0, p.score) * 100)}%` }} />
						))}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default AccessibilityTrack; 
 
 