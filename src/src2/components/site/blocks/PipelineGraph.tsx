import React from 'react';

type Step = { id: string; name: string; status: 'done' | 'running' | 'queued' | 'error' };

type Props = {
	steps: Step[];
	className?: string;
};

const statusColor: Record<Step['status'], string> = {
	done: 'bg-emerald-500',
	running: 'bg-amber-500',
	queued: 'bg-slate-400',
	error: 'bg-red-500',
};

const PipelineGraph: React.FC<Props> = ({ steps, className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Pipeline</div>
		<div className="flex items-center overflow-x-auto">
			{steps.map((s, i) => (
				<div key={s.id} className="flex items-center">
					<div className="flex flex-col items-center min-w-[140px]">
						<div className={`w-8 h-8 rounded-full ${statusColor[s.status]}`} />
						<div className="mt-2 text-xs text-slate-600 dark:text-slate-300 text-center px-2">{s.name}</div>
					</div>
					{i < steps.length - 1 && <div className="mx-2 w-12 h-0.5 bg-slate-300 dark:bg-slate-600" />}
				</div>
			))}
		</div>
	</div>
);

export default PipelineGraph; 



 
 
 
 