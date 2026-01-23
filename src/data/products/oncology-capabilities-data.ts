import { CapabilityCardData } from '@/components/products/shared/CapabilityShowcase';
import { Target, Shield, Activity, Search, Users } from 'lucide-react';
import TherapyMatchingDemo from '@/components/products/oncology/demos/TherapyMatchingDemo';
import ToxicityPredictionDemo from '@/components/products/oncology/demos/ToxicityPredictionDemo';
import ResistanceDetectionDemo from '@/components/products/oncology/demos/ResistanceDetectionDemo';
import { VUSResolutionDemo } from '@/components/sae';
import ClinicalTrialMatchingDemo from '@/components/products/oncology/demos/ClinicalTrialMatchingDemo';

// Match Patients to Therapies
export const MATCH_PATIENTS_CAPABILITY: CapabilityCardData = {
  id: 'match-patients',
  capabilitySlug: 'match-patients-to-therapies', // For navigation
  title: 'Match Patients to Therapies',
  subtitle: 'Mechanism-Based Drug Ranking',
  description: 'S/P/E fusion (Sequence/Pathway/Evidence) matches patients to therapies. Mechanism-based matching, not just standard of care.',
  icon: Target,
  color: 'from-green-500 to-emerald-600',
  badge: 'Mechanism-Based',
  metrics: 'Mechanism-Based Matching',
  time: '45 seconds',
  businessImpact: 'Same-day actionable drug recommendations with transparent reasoning',
  apis: ['predict_variant_impact', 'predict_gene_essentiality', 'generate_therapeutic_protein'],
  component: TherapyMatchingDemo,
  seedData: {
    rankedTherapies: [
      {
        class: 'PARP Inhibitors',
        confidence: 0.94,
        rationale: 'BRCA1 mutation creates HR pathway deficiency, making PARP inhibitors highly effective through synthetic lethality mechanism.',
        examples: ['Olaparib', 'Niraparib', 'Rucaparib'],
        evidenceLevel: 'Strong'
      },
      {
        class: 'Platinum-Based Chemotherapy',
        confidence: 0.88,
        rationale: 'Platinum sensitivity correlated with HR deficiency. High response rates in BRCA1/2 mutated ovarian cancer.',
        examples: ['Carboplatin', 'Cisplatin'],
        evidenceLevel: 'Strong'
      },
      {
        class: 'Immunotherapy (PD-1/PD-L1)',
        confidence: 0.76,
        rationale: 'TMB-High status suggests potential benefit. Moderate confidence based on biomarker profile.',
        examples: ['Pembrolizumab', 'Atezolizumab'],
        evidenceLevel: 'Supported'
      }
    ]
  }
};

// Prevent Toxicity Before It Happens
export const TOXICITY_PREDICTION_CAPABILITY: CapabilityCardData = {
  id: 'toxicity-prediction',
  capabilitySlug: 'prevent-toxicity',
  title: 'Prevent Toxicity Before It Happens',
  subtitle: '100% PGx Coverage',
  description: '100% toxicity prevention coverage for DPYD/TPMT/UGT1A1/CYP2D6. Life-threatening prevention with drug interaction checking and protective nutrition recommendations.',
  icon: Shield,
  color: 'from-red-500 to-pink-600',
  badge: 'Clinical Proof',
  metrics: '100% Coverage',
  time: '30 seconds',
  businessImpact: 'Prevent life-threatening adverse events before they happen',
  apis: ['predict_variant_impact', 'predict_protein_functionality_change'],
  component: ToxicityPredictionDemo,
  seedData: {}
};

// Predict Resistance Before It Happens
export const RESISTANCE_DETECTION_CAPABILITY: CapabilityCardData = {
  id: 'resistance-detection',
  capabilitySlug: 'predict-resistance',
  title: 'Predict Resistance Before It Happens',
  subtitle: '3-6 Weeks Early Detection',
  description: 'Proactive resistance detection 3-6 weeks faster than imaging. CA-125 intelligence with kinetics forecasting enables early intervention before treatment failure.',
  icon: Activity,
  color: 'from-orange-500 to-red-600',
  badge: 'Predictive Intelligence',
  metrics: '3-6 Weeks Earlier',
  time: '60 seconds',
  businessImpact: 'Early intervention prevents treatment failures and preserves therapeutic windows',
  apis: ['predict_gene_essentiality', 'predict_chromatin_accessibility', 'predict_protein_functionality_change'],
  component: ResistanceDetectionDemo,
  seedData: {}
};

// Resolve Genetic Uncertainty
export const VUS_RESOLUTION_CAPABILITY: CapabilityCardData = {
  id: 'vus-resolution',
  capabilitySlug: 'resolve-genetic-uncertainty',
  title: 'Resolve Genetic Uncertainty',
  subtitle: 'Zero-Shot Variant Interpretation',
  description: 'Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance with transparent biological reasoning.',
  icon: Search,
  color: 'from-blue-500 to-cyan-600',
  badge: 'Mathematical Proof',
  metrics: 'Zero-Shot Interpretation',
  time: '30 seconds',
  businessImpact: 'Same-day clinical decisions with transparent variant classification',
  apis: ['predict_variant_impact', 'predict_protein_functionality_change', 'predict_chromatin_accessibility'],
  component: VUSResolutionDemo,
  seedData: {}
};

// Match Patients to Clinical Trials
export const CLINICAL_TRIAL_MATCHING_CAPABILITY: CapabilityCardData = {
  id: 'clinical-trial-matching',
  capabilitySlug: 'match-patients-to-therapies', // Same capability as Match Patients
  title: 'Match Patients to Clinical Trials',
  subtitle: '96.6% Match Accuracy',
  description: 'Transparent eligibility reasoning with green/yellow/red flags per criterion. Mechanism-based trial matching connects patient pathways to trial drug mechanisms.',
  icon: Users,
  color: 'from-purple-500 to-violet-600',
  badge: 'Clinical Intelligence',
  metrics: 'Mechanism-Based Matching',
  time: '45 seconds',
  businessImpact: 'Same-day actionable trial matches with transparent eligibility reasoning',
  apis: ['predict_variant_impact', 'predict_gene_essentiality'],
  component: ClinicalTrialMatchingDemo,
  seedData: {
    output: {
      likely: [
        {
          title: 'NCT05678901: PARP + ATR in DDR Deficient Ovarian Cancer',
          rationale: '94% mechanism fit - BRCA1 mutation creates HR deficiency, making PARP + ATR combination highly effective. Direct synthetic lethality targeting.'
        },
        {
          title: 'NCT04729387: Olaparib + Cediranib in Advanced Ovarian Cancer',
          rationale: '91% mechanism fit - PARP inhibitor with anti-angiogenic agent. Strong evidence for BRCA1/2 mutated patients.'
        }
      ],
      potential: [
        {
          title: 'NCT03824704: Maintenance Olaparib After Platinum',
          rationale: '75% mechanism fit - Maintenance therapy option if patient responds to initial platinum. Good fit but lower priority.'
        }
      ],
      unlikely: []
    }
  }
};

export const ONCOLOGY_CAPABILITIES: CapabilityCardData[] = [
  MATCH_PATIENTS_CAPABILITY,
  TOXICITY_PREDICTION_CAPABILITY,
  RESISTANCE_DETECTION_CAPABILITY,
  VUS_RESOLUTION_CAPABILITY,
  CLINICAL_TRIAL_MATCHING_CAPABILITY
];

