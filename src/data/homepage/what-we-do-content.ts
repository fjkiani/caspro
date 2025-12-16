export interface WhatWeDoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  capabilities: string[];
  link: string;
  metrics?: string[];
}

/**
 * Unique/Exotic MOAT Capabilities
 * Different from PlatformCapabilitiesShowcase which shows the 3 products
 * This showcases the unique, exotic capabilities that set CrisPRO apart
 */
export const WHAT_WE_DO_CONTENT: WhatWeDoItem[] = [
  {
    id: 'toxicity-aware-nutrition',
    title: 'Toxicity-Aware Nutrition',
    description: 'The only system that connects drug mechanisms to personalized food recommendations with exact timing',
    icon: '🥗',
    gradient: 'from-green-500 to-emerald-600',
    capabilities: [
      'Drug → Pathway → Food: "Your carboplatin + BRCA1 = NAC 600mg post-infusion"',
      'Precise timing protocols: Stop NAC 24h before, resume 24h after',
      'Pathway-specific supplements: BER deficiency → NAC, GSH, APEX1 support',
      'Genotype-informed dosages: Not generic advice, YOUR specific variant'
    ],
    link: '/products/oncology',
    metrics: ['96.6% Match Accuracy', 'Pathway-Specific', 'Personalized Timing']
  },
  {
    id: 'resistance-prediction',
    title: 'Predict Resistance Before It Happens',
    description: 'Validated resistance prediction: DIS3 mutation = 2.08x mortality risk, detected 3-6 weeks earlier',
    icon: '🔮',
    gradient: 'from-purple-500 to-pink-600',
    capabilities: [
      'Validated markers: MAPK pathway = 2x platinum resistance (469 real patients)',
      'Early detection: 3-6 weeks before clinical progression',
      'Actionable alerts: "Switch to carfilzomib, add daratumumab, MRD every 3mo"',
      'Risk quantification: "2.08x higher risk" with confidence scores'
    ],
    link: '/products/oncology',
    metrics: ['3-6 Weeks Early', '2.08x Risk Validated', '469 Real Patients']
  },
  {
    id: 'sae-explainability',
    title: '32,768 SAE Features: See What AI Sees',
    description: 'Complete biological interpretability - 32,768 learned biological concepts explain every prediction',
    icon: '🔍',
    gradient: 'from-indigo-500 to-blue-600',
    capabilities: [
      '32,768 learned features: Exon boundaries, TF motifs, regulatory elements',
      'Step-by-step reasoning: See exactly how AI arrives at verdicts',
      'Biological validation: Features map to known biology (not black box)',
      'FDA-ready evidence: Complete audit trail for regulatory submission'
    ],
    link: '/evidence/sae-intelligence',
    metrics: ['32,768 Features', '100% Explainable', 'FDA-Ready']
  },
  {
    id: 'axis-aware-vus',
    title: 'Axis-Aware VUS Resolution',
    description: 'Personalized VUS triage: Same variant, different patient = different clinical relevance',
    icon: '🧬',
    gradient: 'from-orange-500 to-red-600',
    capabilities: [
      'Axis inference: DDR patient + DDR variant = HIGH relevance (MAPK = LOW)',
      'ML resolution: Evo2 breaks ties when ClinVar is uncertain',
      'Provenance receipts: Every API call logged with run_id for audit',
      'Next actions routing: WIWFM, trials, dossier (not "consult your doctor")'
    ],
    link: '/comparisons/patient',
    metrics: ['73% VUS Resolution', 'Axis-Aware', 'Full Provenance']
  },
  {
    id: 'synthetic-lethality',
    title: 'Synthetic Lethality Beyond Standard Biomarkers',
    description: 'Discover therapeutic vulnerabilities beyond BRCA - MBD4 loss = functional BER deficiency = PARP sensitivity',
    icon: '⚡',
    gradient: 'from-yellow-500 to-orange-600',
    capabilities: [
      'Functional pathway analysis: Not just standard biomarkers (BRCA-negative ≠ PARP-ineligible)',
      'Synthetic lethal pairs: MBD4 loss → BER deficiency → PARP inhibitor response',
      'Mechanism-based matching: Pathway disruption → Therapeutic opportunity',
      'Validated in rare cases: Where guidelines don\'t exist, we provide direction'
    ],
    link: '/products/oncology',
    metrics: ['Beyond BRCA', 'Pathway-Based', 'Rare Case Validated']
  },
  {
    id: 'continuous-intelligence',
    title: 'Continuous Agentic Intelligence',
    description: 'Upload once. Track forever. Never miss a signal - agents work 24/7 monitoring CA-125, ctDNA, alerts',
    icon: '♾️',
    gradient: 'from-cyan-500 to-teal-600',
    capabilities: [
      'Never stops working: Agents continuously monitor patient data',
      'Real-time alerts: CA-125 kinetics, ctDNA mutations, resistance signals',
      'Progressive intelligence: Each data point refines predictions',
      'Living dashboard: Not static reports, evolving intelligence'
    ],
    link: '/products/oncology',
    metrics: ['24/7 Monitoring', 'Real-Time Alerts', 'Never Miss Signals']
  }
];

