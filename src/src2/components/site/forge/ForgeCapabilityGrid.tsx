import React from 'react';
import { Scissors, Dna, Zap, Target, Wrench, FlaskConical, Rocket } from 'lucide-react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';

type ForgeCapability = {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	primaryEndpoint: string;
	useCases: string[];
	demoRoute: string;
	color: string;
	featured?: boolean;
};

type Props = {
	onRunDemo?: (capabilityId: string) => void;
	className?: string;
};

const forgeCapabilities: ForgeCapability[] = [
	{
		id: 'guide_rna_design',
		title: 'Guide RNA Design',
		description: 'Generate optimized CRISPR guide RNAs with high efficacy and minimal off-targets',
		icon: Scissors,
		primaryEndpoint: '/generate_optimized_guide_rna',
		useCases: ['Knockout specific genes', 'Precise editing', 'Multiplex targeting'],
		demoRoute: '/site/demo/usecase/knockout_brca1',
		color: 'purple',
		featured: true
	},
	{
		id: 'repair_templates',
		title: 'HDR Repair Templates',
		description: 'Design homology-directed repair templates for precise genome editing',
		icon: Wrench,
		primaryEndpoint: '/generate_repair_template',
		useCases: ['Correct pathogenic variants', 'Insert therapeutic sequences', 'Safe harbor integration'],
		demoRoute: '/site/demo/usecase/repair_brca1_correction',
		color: 'blue',
		featured: true
	},
	{
		id: 'therapeutic_proteins',
		title: 'Therapeutic Proteins',
		description: 'Engineer optimized protein sequences for enhanced therapeutic properties',
		icon: Dna,
		primaryEndpoint: '/generate_therapeutic_protein',
		useCases: ['Antibody optimization', 'Enzyme engineering', 'Novel therapeutics'],
		demoRoute: '/site/demo/usecase/design_pd_l1_binder',
		color: 'green',
		featured: true
	},
	{
		id: 'regulatory_elements',
		title: 'Regulatory Elements',
		description: 'Design custom promoters and enhancers for controlled gene expression',
		icon: Zap,
		primaryEndpoint: '/generate_optimized_regulatory_element',
		useCases: ['Tissue-specific expression', 'Inducible systems', 'Enhanced promoters'],
		demoRoute: '/site/demo/usecase/tissue_specific_promoter',
		color: 'orange'
	},
	{
		id: 'epigenome_optimization',
		title: 'Epigenome Optimization',
		description: 'Optimize sequences for chromatin accessibility and epigenetic modulation',
		icon: Target,
		primaryEndpoint: '/generate_epigenome_optimized_sequence',
		useCases: ['Enhance accessibility', 'Epigenetic editing', 'Chromatin engineering'],
		demoRoute: '/site/demo/usecase/chromatin_accessibility',
		color: 'cyan'
	}
];

const ForgeCapabilityGrid: React.FC<Props> = ({ onRunDemo, className }) => {
	const { getTextSize, getBackgroundClass, getCardClass } = useAccessibility();

	return (
		<div className={`space-y-8 ${className || ''}`}>
			<div className="text-center space-y-4">
				<h2 className={`font-bold text-slate-900 dark:text-white ${getTextSize('text-3xl')}`}>
					Forge Design Capabilities
				</h2>
				<p className={`text-slate-600 dark:text-slate-300 max-w-3xl mx-auto ${getTextSize('text-lg')}`}>
					Interactive demos showcasing Forge's generative AI capabilities for therapeutic design
				</p>
			</div>

			{/* Featured Capabilities */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{forgeCapabilities.filter(cap => cap.featured).map((capability) => (
					<div
						key={capability.id}
						className={`${getCardClass()} p-6 rounded-xl border transition-all hover:shadow-lg group`}
					>
						<div className="flex items-center gap-3 mb-4">
							<div className={`w-12 h-12 bg-${capability.color}-600 rounded-xl flex items-center justify-center`}>
								<capability.icon className="w-6 h-6 text-white" />
							</div>
							<div>
								<h3 className={`font-semibold text-slate-900 dark:text-white ${getTextSize('text-lg')}`}>
									{capability.title}
								</h3>
								<div className={`text-xs text-${capability.color}-600 dark:text-${capability.color}-400 font-mono`}>
									{capability.primaryEndpoint}
								</div>
							</div>
						</div>

						<p className={`text-slate-600 dark:text-slate-300 mb-4 ${getTextSize('text-sm')}`}>
							{capability.description}
						</p>

						<div className="space-y-3">
							<div>
								<div className={`text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 ${getTextSize()}`}>
									Use Cases:
								</div>
								<div className="flex flex-wrap gap-1">
									{capability.useCases.map((useCase, i) => (
										<span
											key={i}
											className={`px-2 py-1 text-xs rounded bg-${capability.color}-50 dark:bg-${capability.color}-900/20 text-${capability.color}-700 dark:text-${capability.color}-300`}
										>
											{useCase}
										</span>
									))}
								</div>
							</div>

							<div className="flex gap-2">
								<button
									onClick={() => onRunDemo?.(capability.id)}
									className={`flex-1 px-4 py-2 bg-${capability.color}-600 text-white rounded-lg hover:bg-${capability.color}-700 transition-colors font-medium flex items-center justify-center gap-2 ${getTextSize('text-sm')}`}
								>
									<FlaskConical className="w-4 h-4" />
									Quick Demo
								</button>
								<a
									href={capability.demoRoute}
									className={`px-3 py-2 border border-${capability.color}-300 dark:border-${capability.color}-700 text-${capability.color}-700 dark:text-${capability.color}-300 rounded-lg hover:bg-${capability.color}-50 dark:hover:bg-${capability.color}-900/20 transition-colors flex items-center justify-center`}
									title="Full use case demo"
								>
									<Rocket className="w-4 h-4" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Additional Capabilities */}
			<div>
				<h3 className={`font-semibold text-slate-900 dark:text-white mb-4 ${getTextSize('text-xl')}`}>
					Additional Capabilities
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{forgeCapabilities.filter(cap => !cap.featured).map((capability) => (
						<div
							key={capability.id}
							className={`${getCardClass()} p-4 rounded-lg border transition-all hover:shadow-md group`}
						>
							<div className="flex items-center gap-3 mb-3">
								<div className={`w-8 h-8 bg-${capability.color}-600 rounded-lg flex items-center justify-center`}>
									<capability.icon className="w-4 h-4 text-white" />
								</div>
								<div className="flex-1">
									<h4 className={`font-medium text-slate-900 dark:text-white ${getTextSize('text-base')}`}>
										{capability.title}
									</h4>
									<div className={`text-xs text-${capability.color}-600 dark:text-${capability.color}-400 font-mono`}>
										{capability.primaryEndpoint}
									</div>
								</div>
								<div className="flex gap-1">
									<button
										onClick={() => onRunDemo?.(capability.id)}
										className={`px-3 py-1 bg-${capability.color}-600 text-white rounded hover:bg-${capability.color}-700 transition-colors ${getTextSize('text-xs')}`}
									>
										Demo
									</button>
									<a
										href={capability.demoRoute}
										className={`px-2 py-1 border border-${capability.color}-300 dark:border-${capability.color}-700 text-${capability.color}-700 dark:text-${capability.color}-300 rounded hover:bg-${capability.color}-50 dark:hover:bg-${capability.color}-900/20 transition-colors flex items-center justify-center`}
									>
										<Rocket className="w-3 h-3" />
									</a>
								</div>
							</div>
							<p className={`text-slate-600 dark:text-slate-300 ${getTextSize('text-sm')}`}>
								{capability.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Call to Action */}
			<div className={`${getCardClass()} p-6 rounded-xl border text-center`}>
				<h3 className={`font-bold text-slate-900 dark:text-white mb-2 ${getTextSize('text-xl')}`}>
					Ready to Design?
				</h3>
				<p className={`text-slate-600 dark:text-slate-300 mb-4 ${getTextSize('text-base')}`}>
					Use the interactive design interface above to specify your objectives and watch Forge generate optimized therapeutic sequences.
				</p>
				<button
					onClick={() => {
						// Scroll to design interface
						const designSection = document.querySelector('[data-section="design-interface"]');
						designSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}}
					className={`px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium ${getTextSize('text-base')}`}
				>
					Try the Design Interface
				</button>
			</div>
		</div>
	);
};

export default ForgeCapabilityGrid; 