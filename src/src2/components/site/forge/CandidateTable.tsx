import React from 'react';
import { Download, Eye, Zap, FileText } from 'lucide-react';

type Candidate = {
	id: string;
	score: number;
	qc: {
		synteny: number;
		dinucKL: number;
	};
	notes?: string;
	sequence?: string;
};

type Props = {
	candidates: readonly Candidate[];
	className?: string;
	title?: string;
	onCandidateSelect?: (candidate: Candidate) => void;
	onExportCandidate?: (candidate: Candidate, format: 'fasta' | 'json' | 'csv') => void;
	onAnalyzeCandidate?: (candidate: Candidate) => void;
	selectedCandidate?: string;
	interactive?: boolean;
};

const fmt = (n: number) => n.toFixed(3);

const CandidateTable: React.FC<Props> = ({ 
	candidates, 
	className, 
	title = 'Top Designs',
	onCandidateSelect,
	onExportCandidate,
	onAnalyzeCandidate,
	selectedCandidate,
	interactive = false
}) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="flex items-center justify-between mb-2">
			<div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
			{interactive && candidates.length > 0 && (
				<div className="flex items-center gap-2">
					<button
						onClick={() => onExportCandidate?.(candidates[0], 'fasta')}
						className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
					>
						<Download className="w-3 h-3" />
						Export All
					</button>
				</div>
			)}
		</div>
		<div className="overflow-x-auto">
			<table className="min-w-full text-sm">
				<thead>
					<tr className="text-left text-slate-600 dark:text-slate-300">
						<th className="px-2 py-1">ID</th>
						<th className="px-2 py-1">Score</th>
						<th className="px-2 py-1">Synteny</th>
						<th className="px-2 py-1">Dinuc KL</th>
						<th className="px-2 py-1">Notes</th>
						{interactive && <th className="px-2 py-1">Actions</th>}
					</tr>
				</thead>
				<tbody>
					{candidates.map((c, i) => (
						<tr 
							key={i} 
							className={`border-t border-slate-100 dark:border-slate-700 transition-colors ${
								interactive ? 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer' : ''
							} ${selectedCandidate === c.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
							onClick={() => interactive && onCandidateSelect?.(c)}
						>
							<td className="px-2 py-1 font-mono text-slate-800 dark:text-slate-100">
								<div className="flex items-center gap-2">
									{c.id}
									{selectedCandidate === c.id && (
										<Zap className="w-3 h-3 text-purple-600" />
									)}
								</div>
							</td>
							<td className="px-2 py-1 font-mono">
								<span className={`${c.score >= 0.8 ? 'text-green-600 dark:text-green-400' : c.score >= 0.6 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
									{fmt(c.score)}
								</span>
							</td>
							<td className="px-2 py-1 font-mono">{fmt(c.qc.synteny)}</td>
							<td className="px-2 py-1 font-mono">{fmt(c.qc.dinucKL)}</td>
							<td className="px-2 py-1 text-slate-700 dark:text-slate-200">{c.notes || '—'}</td>
							{interactive && (
								<td className="px-2 py-1">
									<div className="flex items-center gap-1">
										<button
											onClick={(e) => {
												e.stopPropagation();
												onAnalyzeCandidate?.(c);
											}}
											className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
											title="Analyze candidate"
										>
											<Eye className="w-3 h-3" />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												onExportCandidate?.(c, 'fasta');
											}}
											className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
											title="Export FASTA"
										>
											<Download className="w-3 h-3" />
										</button>
										<button
											onClick={(e) => {
												e.stopPropagation();
												onExportCandidate?.(c, 'json');
											}}
											className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
											title="Export JSON"
										>
											<FileText className="w-3 h-3" />
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
		{interactive && (
			<div className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
				Click a candidate to select it, or use action buttons to analyze/export
			</div>
		)}
	</div>
);

export default CandidateTable; 

 
 
 
 