import React from 'react';

type Constraint = { label: string; value: string };

type Props = {
	constraints: readonly Constraint[];
	className?: string;
	title?: string;
};

const ConstraintPanel: React.FC<Props> = ({ constraints, className, title = 'Constraints' }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="flex flex-wrap gap-2">
			{constraints.map((c, i) => (
				<span key={i} className="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{c.label}: {c.value}</span>
			))}
		</div>
	</div>
);

export default ConstraintPanel; 
 
 
 
 