import type { DeploymentModel, TrustBadge, CompetitiveRow, PricingTier, ValuePillar, ArchitectureLayer } from '../types/site';
import { Fingerprint, FileClock, Lock, Globe, Building, Cpu, Search, Target } from 'lucide-react';

export const securityContent = {
	hero: {
		title: 'Zeta Shield: Security Operating System',
		subtitle: 'Comprehensive security architecture for AI-driven R&D',
		cta: { label: 'Book a Demo', href: '/contact' },
	},
	pillars: [] as ValuePillar[],
	identity: {
		auth0: { title: 'Identity Verification', text: 'Auth0 verifies who you are.' },
		blockchain: { title: 'Permission Verification', text: "Blockchain verifies what you're allowed to do." },
		strategic: {
			title: 'The Strategic Opportunity',
			points: [
				{ title: 'Bridge Web2 & Web3', text: "Combine Auth0's enterprise identity with immutable verification." },
				{ title: 'Solve a High-Value Problem', text: 'Purpose-built for securing multi-billion dollar digital assets.' },
				{ title: 'Expand the Ecosystem', text: 'Extend identity into verifiable, decentralized data.' },
			],
		},
	},
	architecture: {
		layers: [
			{ title: 'Data Integrity', color: 'violet', icon: Fingerprint as any, features: [
				"How can partners trust in silico results haven't been tampered with?",
				'Cryptographic signatures on every data point',
				'Immutable proof of computational integrity',
				'Verifiable chain of custody from lab to IP',
			] },
			{ title: 'Granular Access Control', color: 'blue', icon: Lock as any, features: [
				'Grant access to specific therapeutic designs only',
				'No exposure of entire pipeline or platform',
				'Smart contract-controlled permissions',
				'Wallet-based asset mapping',
			] },
			{ title: 'Proof of Invention', color: 'emerald', icon: FileClock as any, features: [
				'Unforgeable record of invention timestamps',
				'Blockchain-native IP documentation',
				'Tamper-proof research progression',
				'Legal-grade evidence for patent disputes',
			] },
		] as ArchitectureLayer[],
	},
	researchPipeline: {
		steps: [
			{ icon: Search as any, title: '1. Predictive Analysis', description: 'Zeta Oracle analyzes variants and delivers quantitative risk scores. Predictions are cryptographically signed.' },
			{ icon: Cpu as any, title: '2. Therapeutic Design', description: 'Zeta Forge generates candidates from validated targets. Smart contracts gate design initiation.' },
			{ icon: Target as any, title: '3. Structural Validation', description: 'Zeta Boltz runs 3D simulations to validate binding; results stored on-chain.' },
			{ icon: FileClock as any, title: '4. IP Asset Creation', description: 'Research packaged into verifiable IP-NFTs with complete provenance.' },
		],
		footerText: 'Secures every workflow—from variant classification to discovery to precision medicine—backed by cryptographic proof of each engine.',
	},
	accessMatrix: {
		title: 'Verifiable Access Control',
		items: [
			{ label: 'Zeta Oracle', status: '✓ Verified', statusColor: 'green', description: 'RUNX1 variant classified as Pathogenic (Zeta Score: 0.97)', metadata: 'Hash: 0x4f7a...b3d2 | Block: 12,847,293' },
			{ label: 'Zeta Forge', status: '✓ Verified', statusColor: 'green', description: 'Generated optimized CRISPR design for validated target', metadata: 'Hash: 0x8a2f...c7e1 | Block: 12,847,305' },
			{ label: 'Zeta Boltz', status: '✓ Verified', statusColor: 'green', description: 'Structural validation: 98.7% binding affinity confirmed', metadata: 'Hash: 0x1c9e...f4a8 | Block: 12,847,312' },
		],
	},
	deployments: [
		{ title: 'Zeta Shield Cloud', icon: Globe as any, color: 'indigo', features: ['Multi-tenant SaaS', '99.99% uptime SLA', 'Global edge deployment', 'Automatic scaling'], pricing: 'Starting at $10K/month', ideal: 'Startups & Mid-size Biotechs' },
		{ title: 'Zeta Shield Enterprise', icon: Building as any, color: 'purple', features: ['Private cloud deployment', 'Custom compliance configs', 'Dedicated support', 'On-premises option'], pricing: 'Custom enterprise pricing', ideal: 'Large Pharma & Fortune 500' },
		{ title: 'Zeta Shield Embedded', icon: Cpu as any, color: 'cyan', features: ['API-first integration', 'White-label options', 'Custom workflows', 'Revenue sharing'], pricing: 'Per-transaction pricing', ideal: 'Platform Providers & VCs' },
	] as DeploymentModel[],
	compliance: [
		{ label: 'SOC 2 Type II' },
		{ label: 'HIPAA' },
		{ label: 'GDPR' },
		{ label: 'ISO 27001' },
	] as TrustBadge[],
	competitive: {
		rows: [
			{ name: 'Traditional IT Security', features: ['Network perimeter defense', 'Server-based protection', 'Role-based system access'], limitations: ['IP can be copied instantly', 'No proof of data integrity', 'Generic permissions for all assets'], score: 'Inadequate' },
			{ name: 'Cloud Security Platforms', features: ['Infrastructure monitoring', 'General threat detection', 'Compliance dashboards'], limitations: ['One-size-fits-all approach', 'No granular asset tracking', 'No verifiable audit trails'], score: 'Insufficient' },
			{ name: 'Zeta Shield', features: ['Asset-specific protection', 'Cryptographic access control', 'Immutable audit trails', 'Smart contract permissions', 'Therapeutic IP security'], score: 'Purpose-Built', highlight: true },
		] as CompetitiveRow[],
	},
	pricing: [] as PricingTier[],
};

export type SecurityContent = typeof securityContent; 