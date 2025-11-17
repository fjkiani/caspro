// Product Capabilities from product.mdc - 6 Core Capability Groups
// Aligned with product.mdc landing page copy

export interface ProductCapability {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  icon: string; // Icon name for iconMap
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  kpis: Array<{
    label: string;
    value: string | number;
    unit?: string;
  }>;
}

export const PRODUCT_CAPABILITIES: ProductCapability[] = [
  {
    id: 'clinical-decision-support',
    title: 'Will It Work For Me?',
    subtitle: 'Clinical Decision Support',
    blurb: 'Get evidence-backed drug efficacy predictions with 70-85% confidence. Every recommendation shows WHY (eligibility + fit + conditions), not just WHAT. Complete unified care plans integrate drugs, trials, food/supplements, and monitoring in one place. Proactive resistance detection predicts risks BEFORE they happen. Life-threatening toxicity prevention (DPYD/TPMT/UGT1A1/CYP2D6) prevents adverse events. Treatment line intelligence guides sequencing decisions. Action-ready dossiers mean you can call trial sites the same day. Seamless upgrade from guideline-based (pre-NGS) to personalized predictions (post-NGS).',
    features: [
      'Per-drug efficacy ranking with transparent reasoning and evidence tiers (STANDARD/SUPPORTED)',
      'Sporadic cancer intelligence (85% of patients) - PARP rescue, IO boosts',
      'Toxicity prevention (DPYD/TPMT/UGT1A1/CYP2D6) - prevents life-threatening adverse events',
      'Treatment line intelligence (L1/L2/L3) with cross-resistance analysis',
      'Proactive resistance detection (predict risks BEFORE they happen)',
      'Early resistance detection (3-6 weeks faster via CA-125 kinetics)',
      'Clinical trial matching with match percentages (96.6%) and trial-specific evidence',
      'Complete unified care plans (drugs + trials + food + monitoring in one place)',
      'Biomarker-aware recommendations (HRD+, TMB, TP53) for drugs and food',
      'Evidence-backed dosage extraction from papers (not generic recommendations)',
      'Clinician-ready dossiers (contacts, checklists, monitoring protocols)',
      'Deterministic confidence (90-100% from checkboxes, not AI magic)',
      'Honest limitations ("Awaiting NGS" instead of fake predictions)',
    ],
    cta: {
      text: 'Try WIWFM',
      href: '/solutions/clinical-decision-support',
    },
    icon: 'Stethoscope',
    color: 'blue',
    kpis: [
      { label: 'Efficacy Confidence', value: '70-85%', unit: '%' },
      { label: 'Toxicity Prevention', value: '100%', unit: '%' },
      { label: 'Trial Match %', value: 96.6, unit: '%' },
    ],
  },
  {
    id: 'research-acceleration',
    title: 'Universal Hypothesis Testing',
    subtitle: 'Research Acceleration',
    blurb: 'Test any compound against any disease with mechanistic validation. 50+ diseases, 110M+ compounds, complete audit trails. Validate hypotheses in hours, not months. Turn "unknown" variants into "understood and actionable" insights with the VUS Explorer. Assess metastasis risk with an 8-step cascade prediction. Extract, label, and benchmark datasets from cBioPortal and GDC. Synthesize evidence with multi-provider literature searches (PubMed, OpenAlex, S2).',
    features: [
      '50+ diseases supported',
      '110M+ compounds queryable',
      'VUS Explorer (unknown → understood)',
      'Cohort intelligence (extract, label, benchmark)',
      'Metastasis Assessment (8-step cascade risk prediction)',
      'Evidence Synthesis (multi-provider literature search)',
    ],
    cta: {
      text: 'Explore Research Tools',
      href: '/solutions/research-acceleration',
    },
    icon: 'FlaskConical',
    color: 'teal',
    kpis: [
      { label: 'Diseases Supported', value: 50, unit: '+' },
      { label: 'Compounds Queryable', value: '110M', unit: '+' },
      { label: 'Hypothesis Validation', value: 'Hours', unit: '' },
    ],
  },
  {
    id: 'therapeutic-design',
    title: 'Design Precision Interventions',
    subtitle: 'Therapeutic Design',
    blurb: 'Design CRISPR guides and therapeutic candidates with structural validation. Every design is validated (pLDDT ≥70) and patent-ready. Generate IND packages automatically. Implement a 5-stage IP monetization workflow (Victory → Fortify → Arm → Fund → Conquer). Utilize a design router for PAM windowing, heuristic scoring, and viral content checks.',
    features: [
      'CRISPR guide generation (Evo2-powered)',
      'Structural validation (AlphaFold 3)',
      'IND package generation (FDA-grade)',
      'IP monetization workflow',
      'Design Router (PAM windowing, heuristic scoring, viral content checks)',
    ],
    cta: {
      text: 'Start Designing',
      href: '/solutions/therapeutic-design',
    },
    icon: 'Sword',
    color: 'indigo',
    kpis: [
      { label: 'Guides Validated', value: '100%', unit: '%' },
      { label: 'Structural Confidence (pLDDT)', value: 70, unit: '≥' },
      { label: 'FDA Docs Generated', value: 'Complete', unit: '' },
    ],
  },
  {
    id: 'platform-intelligence',
    title: 'Multi-Modal AI Validation',
    subtitle: 'Platform Intelligence',
    blurb: 'S/P/E framework combines Sequence (Evo2), Pathway (weighted aggregation), and Evidence (literature/ClinVar) signals. Get insights with 4 chips (Functionality, Chromatin, Essentiality, Regulatory). Benefit from Fusion Engine with AlphaMissense integration for GRCh38 missense variants. Utilize gene-specific percentile conversion and complete audit trails for transparent confidence modulation.',
    features: [
      'S/P/E framework (30/40/30 weighting)',
      '4 insight chips (Functionality, Chromatin, Essentiality, Regulatory)',
      'Fusion Engine (AlphaMissense integration)',
      'Calibration System (gene-specific percentile conversion)',
      'Provenance Tracking (complete audit trails)',
      'Confidence Modulation (evidence gates, insights lifts)',
    ],
    cta: {
      text: 'See How It Works',
      href: '/platform-intelligence',
    },
    icon: 'Brain',
    color: 'purple',
    kpis: [
      { label: 'S/P/E Weighting', value: '30/40/30', unit: '' },
      { label: 'Insights Chips', value: 4, unit: '' },
      { label: 'Audit Trails', value: 'Complete', unit: '' },
    ],
  },
  {
    id: 'conversational-ai',
    title: 'Ask Questions Naturally',
    subtitle: 'Conversational AI',
    blurb: 'Ask questions in plain English, get evidence-backed answers. Progressive disclosure means you get exactly the level of detail you need - start simple ("What drugs?") and drill down ("Complete care plan?") when ready. All responses are sporadic-aware (PARP rescue, HRD badges, germline exclusion) automatically. Mechanistic validation of food/supplement recommendations is integrated into the care plan, answering questions like, "Can turmeric help with my ovarian cancer?"',
    features: [
      'Natural language queries with progressive disclosure',
      'Context-aware responses (sporadic-aware throughout)',
      'Unified orchestration (drugs + trials + food in one response)',
      'Intent classification (Q2C Router)',
      'Food validator (mechanistic validation integrated)',
    ],
    cta: {
      text: 'Try Co-Pilot',
      href: '/conversational-ai',
    },
    icon: 'MessageSquare',
    color: 'green',
    kpis: [
      { label: 'Natural Language Parsing', value: 'High', unit: '' },
      { label: 'Context Awareness', value: 'Sporadic-Aware', unit: '' },
      { label: 'Multi-Intent Handling', value: 'Seamless', unit: '' },
    ],
  },
  {
    id: 'enterprise-platform',
    title: 'Production-Ready SaaS',
    subtitle: 'Enterprise Platform',
    blurb: 'Enterprise-ready platform with robust authentication, admin controls, and usage analytics. Scale from research to production with complete compliance tracking, including a 3-tier pricing model (Free, Pro, Enterprise) and granular feature flags. The backend database schema includes 9 tables for comprehensive data management (users, profiles, subscriptions, quotas, feature flags, sessions, analyses, logs).',
    features: [
      'Authentication & authorization (Supabase Auth, JWT)',
      'Admin panel (users, analytics, logs)',
      '3-tier pricing (Free/Pro/Enterprise)',
      'Database schema (9 tables)',
      'Feature flags (granular access control)',
      'Usage tracking & compliance',
    ],
    cta: {
      text: 'View Pricing',
      href: '/pricing',
    },
    icon: 'Building2',
    color: 'red',
    kpis: [
      { label: 'Database Schema', value: 9, unit: 'tables' },
      { label: 'Pricing Tiers', value: 3, unit: '' },
      { label: 'Admin Controls', value: 'Complete', unit: '' },
    ],
  },
];
