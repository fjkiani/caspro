import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';

type Preset = {
	id: string;
	name: string;
	description: string;
};

type Props = {
	presets: readonly Preset[];
	className?: string;
	title?: string;
	onPresetSelect?: (preset: Preset) => void;
	selectedPreset?: string;
	interactive?: boolean;
};

const PresetsPanel: React.FC<Props> = ({ 
	presets, 
	className, 
	title = 'Genome-scale presets',
	onPresetSelect,
	selectedPreset,
	interactive = false
}) => (
	<div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
		<div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
			{presets.map((p) => (
				<div 
					key={p.id} 
					className={`p-3 rounded border transition-all cursor-pointer group ${
						selectedPreset === p.id 
							? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
							: 'border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
					} ${interactive ? 'hover:shadow-md' : ''}`}
					onClick={() => interactive && onPresetSelect?.(p)}
				>
					<div className="flex items-center justify-between">
						<div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{p.name}</div>
						{interactive && (
							<div className="flex items-center gap-1">
								{selectedPreset === p.id && (
									<Zap className="w-3 h-3 text-purple-600" />
								)}
								<ChevronRight className={`w-3 h-3 transition-transform ${
									selectedPreset === p.id ? 'text-purple-600' : 'text-slate-400 group-hover:text-slate-600'
								} ${interactive ? 'group-hover:translate-x-0.5' : ''}`} />
							</div>
						)}
					</div>
					<div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</div>
					{interactive && selectedPreset === p.id && (
						<div className="mt-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
							✓ Loaded
						</div>
					)}
				</div>
			))}
		</div>
		{interactive && (
			<div className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
				Click a preset to auto-populate objectives and constraints
			</div>
		)}
	</div>
);

export default PresetsPanel; 
 
 
 
 