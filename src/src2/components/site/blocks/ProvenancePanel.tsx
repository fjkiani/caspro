import React from 'react';

type Props = {
	model: string;
	modelVersion: string;
	scorer: string;
	scorerVersion: string;
	seed: number;
	commit?: string;
	createdAt: string;
	className?: string;
};

const row = (k: string, v: string | number) => (
	<div className="flex items-center justify-between text-sm">
		<div className="text-slate-500 dark:text-slate-400">{k}</div>
		<div className="font-mono text-slate-800 dark:text-slate-100 ml-4">{v}</div>
	</div>
);

const ProvenancePanel: React.FC<Props> = ({ model, modelVersion, scorer, scorerVersion, seed, commit, createdAt, className }) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 ${className || ''}`}>
		<div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Provenance</div>
		<div className="space-y-2">
			{row('Model', model)}
			{row('Model ver', modelVersion)}
			{row('Scorer', scorer)}
			{row('Scorer ver', scorerVersion)}
			{row('Seed', seed)}
			{commit ? row('Commit', commit) : null}
			{row('Created', createdAt)}
		</div>
	</div>
);

export default ProvenancePanel; 

 
 