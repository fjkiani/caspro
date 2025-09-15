import React, { useState } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';

type PeakObjective = {
	type: 'peak';
	start: number;
	end: number;
	value: number;
};

type TFObjective = {
	type: 'tf';
	motif: string;
	start: number;
	end: number;
	weight?: number;
};

type Objective = PeakObjective | TFObjective;

type Constraint = {
	label: string;
	value: string;
};

type Props = {
	objectives: readonly Objective[];
	constraints?: readonly Constraint[];
	className?: string;
	title?: string;
	onObjectivesChange?: (objectives: Objective[]) => void;
	onRunDesign?: () => void;
	editable?: boolean;
};

const chip = (text: string, color = 'slate') => (
	<span className={`px-2 py-0.5 text-xs rounded bg-${color}-100 dark:bg-${color}-700 text-${color}-700 dark:text-${color}-200`}>{text}</span>
);

const ObjectiveList: React.FC<Props> = ({ 
	objectives, 
	constraints, 
	className, 
	title = 'Design Objectives',
	onObjectivesChange,
	onRunDesign,
	editable = false
}) => {
	const [isAddingObjective, setIsAddingObjective] = useState(false);
	const [newObjective, setNewObjective] = useState<Partial<Objective>>({ type: 'peak' });

	const addObjective = () => {
		if (newObjective.type === 'peak' && newObjective.start && newObjective.end && newObjective.value) {
			const obj: PeakObjective = {
				type: 'peak',
				start: newObjective.start,
				end: newObjective.end,
				value: newObjective.value
			};
			onObjectivesChange?.([...objectives, obj]);
		} else if (newObjective.type === 'tf' && newObjective.motif && newObjective.start && newObjective.end) {
			const obj: TFObjective = {
				type: 'tf',
				motif: newObjective.motif,
				start: newObjective.start,
				end: newObjective.end,
				weight: newObjective.weight
			};
			onObjectivesChange?.([...objectives, obj]);
		}
		setNewObjective({ type: 'peak' });
		setIsAddingObjective(false);
	};

	const removeObjective = (index: number) => {
		const newObjectives = objectives.filter((_, i) => i !== index);
		onObjectivesChange?.(newObjectives);
	};

	return (
		<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
			<div className="flex items-center justify-between mb-2">
				<h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
				<div className="flex items-center gap-2">
					{chip(`${objectives.length} objectives`)}
					{editable && (
						<button
							onClick={() => setIsAddingObjective(true)}
							className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
							title="Add objective"
						>
							<Plus className="w-4 h-4" />
						</button>
					)}
				</div>
			</div>
			
			<div className="space-y-2">
				{objectives.map((o, i) => (
					<div key={i} className="text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 group">
						{o.type === 'peak' ? chip('peak', 'blue') : chip('tf', 'purple')}
						<span className="font-mono flex-1">
							{o.type === 'peak' 
								? `${o.start}-${o.end} = ${o.value}` 
								: `${o.motif} @ ${o.start}-${o.end}${typeof (o as TFObjective).weight === 'number' ? ` (w=${(o as TFObjective).weight})` : ''}`
							}
						</span>
						{editable && (
							<button
								onClick={() => removeObjective(i)}
								className="opacity-0 group-hover:opacity-100 p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-opacity"
								title="Remove objective"
							>
								<X className="w-3 h-3" />
							</button>
						)}
					</div>
				))}
			</div>

			{/* Add Objective Form */}
			{isAddingObjective && (
				<div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
					<div className="space-y-3">
						<div className="flex gap-2">
							<select
								value={newObjective.type}
								onChange={(e) => setNewObjective({ ...newObjective, type: e.target.value as 'peak' | 'tf' })}
								className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
							>
								<option value="peak">Peak</option>
								<option value="tf">TF Binding</option>
							</select>
						</div>
						
						{newObjective.type === 'peak' ? (
							<div className="grid grid-cols-3 gap-2">
								<input
									type="number"
									placeholder="Start"
									value={newObjective.start || ''}
									onChange={(e) => setNewObjective({ ...newObjective, start: parseInt(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
								<input
									type="number"
									placeholder="End"
									value={newObjective.end || ''}
									onChange={(e) => setNewObjective({ ...newObjective, end: parseInt(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
								<input
									type="number"
									step="0.1"
									placeholder="Value"
									value={newObjective.value || ''}
									onChange={(e) => setNewObjective({ ...newObjective, value: parseFloat(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
							</div>
						) : (
							<div className="grid grid-cols-4 gap-2">
								<input
									type="text"
									placeholder="Motif"
									value={newObjective.motif || ''}
									onChange={(e) => setNewObjective({ ...newObjective, motif: e.target.value })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
								<input
									type="number"
									placeholder="Start"
									value={newObjective.start || ''}
									onChange={(e) => setNewObjective({ ...newObjective, start: parseInt(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
								<input
									type="number"
									placeholder="End"
									value={newObjective.end || ''}
									onChange={(e) => setNewObjective({ ...newObjective, end: parseInt(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
								<input
									type="number"
									step="0.1"
									placeholder="Weight"
									value={newObjective.weight || ''}
									onChange={(e) => setNewObjective({ ...newObjective, weight: parseFloat(e.target.value) })}
									className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
								/>
							</div>
						)}
						
						<div className="flex gap-2">
							<button
								onClick={addObjective}
								className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Add
							</button>
							<button
								onClick={() => setIsAddingObjective(false)}
								className="px-3 py-1 text-sm bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded hover:bg-slate-400 dark:hover:bg-slate-500"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Run Design Button */}
			{editable && onRunDesign && (
				<div className="mt-4">
					<button
						onClick={onRunDesign}
						className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
					>
						🚀 Run Design with Current Objectives
					</button>
				</div>
			)}

			{constraints && constraints.length > 0 && (
				<div className="mt-4">
					<div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Constraints</div>
					<div className="flex flex-wrap gap-2">
						{constraints.map((c, i) => (
							<span key={i} className="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{c.label}: {c.value}</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ObjectiveList; 