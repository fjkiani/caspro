import React from 'react';
import { motion } from 'framer-motion';

// Lightweight, dependency-friendly versions of primitives from the 101 deck

export const SlideSurface: React.FC<{
	children: React.ReactNode;
	className?: string;
	enhanced?: boolean;
}> = ({ children, className = '', enhanced = false }) => (
	<motion.section
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.5 }}
		className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 ${enhanced ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'} overflow-hidden ${className}`}
	>
		<div className="relative z-10 w-full max-w-6xl space-y-8">{children}</div>
	</motion.section>
);

export const SlideHeader: React.FC<{
	title: string;
	subtitle?: string;
	titleClassName?: string;
	subtitleClassName?: string;
}> = ({ title, subtitle, titleClassName = '', subtitleClassName = '' }) => (
	<div className="space-y-3">
		<h1 className={`text-4xl md:text-6xl font-black tracking-tight ${titleClassName}`}>{title}</h1>
		{subtitle && (
			<p className={`text-lg md:text-2xl font-light opacity-80 max-w-4xl mx-auto ${subtitleClassName}`}>{subtitle}</p>
		)}
	</div>
);

export const StatCard: React.FC<{ value: string; label: string; className?: string }> = ({ value, label, className = '' }) => (
	<div className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}>
		<p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-red-400">{value}</p>
		<p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-2">{label}</p>
	</div>
);

export const InfoCard: React.FC<{
	icon?: React.ComponentType<any> | React.ReactElement;
	title: string;
	children?: React.ReactNode;
	accent?: 'cyan' | 'purple' | 'orange' | 'red' | 'green' | 'sky' | 'blue';
	className?: string;
}> = ({ icon, title, children, accent = 'cyan', className = '' }) => {
	const accentMap: Record<string, { text: string; border: string }> = {
		cyan: { text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-500/30' },
		purple: { text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-500/30' },
		orange: { text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-500/30' },
		red: { text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-500/30' },
		green: { text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-500/30' },
		sky: { text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-500/30' },
		blue: { text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/30' },
	};
	const a = accentMap[accent];
	return (
		<div className={`bg-white dark:bg-slate-800/50 p-6 rounded-xl border ${a.border} text-center ${className}`}>
			{icon && (
				typeof icon === 'function' ? (
					React.createElement(icon as React.ComponentType<any>, { size: 40, className: `mx-auto mb-3 ${a.text}` })
				) : (
					<div className={`mx-auto mb-3 text-3xl ${a.text}`}>{icon}</div>
				)
			)}
			<h4 className={`text-lg md:text-xl font-bold mb-2 ${a.text}`}>{title}</h4>
			<div className="text-slate-600 dark:text-slate-300 text-sm md:text-base">{children}</div>
		</div>
	);
};

export const TwoColumn: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
	<div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-left max-w-6xl mx-auto ${className}`}>{children}</div>
);

export const StepArrow: React.FC<{ direction?: 'right' | 'down'; className?: string }> = ({ direction = 'right', className = '' }) => (
	<div className={`text-4xl opacity-50 ${className}`}>{direction === 'right' ? '→' : '↓'}</div>
);

export const Pill: React.FC<{ children: React.ReactNode; className?: string; color?: 'green' | 'yellow' | 'sky' }> = ({ children, className = '', color = 'green' }) => {
	const map: Record<string, string> = {
		green: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
		yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300',
		sky: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
	};
	return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${map[color]} ${className}`}>{children}</span>;
};

// Simple evidence list used for dossier-style summaries
export const EvidenceList: React.FC<{ items: { title: string; value?: string; icon?: React.ComponentType<any> | React.ReactElement }[] }> = ({ items }) => (
	<ul className="space-y-3 text-left">
		{items.map((it, idx) => (
			<li key={idx} className="flex items-center gap-3">
				{it.icon && (typeof it.icon === 'function' ? React.createElement(it.icon as any, { className: 'w-4 h-4 opacity-70' }) : <span className="text-lg opacity-70">{it.icon}</span>)}
				<span className="font-medium text-slate-700 dark:text-slate-200">{it.title}</span>
				{it.value && <span className="ml-auto text-slate-500 dark:text-slate-400 font-mono text-xs">{it.value}</span>}
			</li>
		))}
	</ul>
);

export default {
	SlideSurface,
	SlideHeader,
	StatCard,
	InfoCard,
	TwoColumn,
	StepArrow,
	Pill,
	EvidenceList,
}; 