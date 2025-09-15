import React from 'react';
import { discriminativeUseCases } from '../data/useCases/discriminative';
import { generativeUseCases } from '../data/useCases/generative';
import AccessibilityToggle from '../components/AccessibilityToggle';

const UseCasesIndex: React.FC = () => {
	const allUseCases = [...discriminativeUseCases, ...generativeUseCases];
	return (
		<div className="max-w-6xl mx-auto p-6 space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Use‑Cases & Guided Demos</h1>
				<AccessibilityToggle />
			</div>

			<p className="text-slate-600">
				Explore end‑to‑end demos that combine multiple AI endpoints to solve real problems. Each use‑case runs step‑by‑step with explanations, evidence, and a final dossier.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{allUseCases.map((uc) => {
					const apis = Array.from(new Set(uc.steps.map(s => s.id)));
					return (
						<div key={uc.id} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl p-6">
							<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{uc.name}</h2>
							<p className="text-slate-700 dark:text-slate-300 mb-4">{uc.summary}</p>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">APIs used</h3>
								<div className="flex flex-wrap gap-2">
									{apis.map(api => (
										<span key={api} className="px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600">/{api}</span>
									))}
								</div>
							</div>
							<div className="flex items-center justify-between">
								<a href={`/site/demo/usecase/${uc.id}`} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500">Run Demo</a>
								<a href={`/site/demo/usecase/${uc.id}`} className="text-blue-600 dark:text-blue-400 text-sm">Learn more →</a>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UseCasesIndex; 