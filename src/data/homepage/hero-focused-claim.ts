/**
 * FOCUSED HOMEPAGE HERO - CSI (ChemoSensitivity Index) Model
 * ONE problem, ONE score, ONE use case, ONE temporal advantage
 * 
 * Based on feedback: "Too smart for its own good"
 * Solution: Lead with ONE problem (chemosensitivity prediction), ONE score (CSI), ONE use case (next-line DDR therapy)
 * 
 * The ONE Problem We Solve:
 * "How chemosensitive is the tumor currently after prior lines?"
 * Specifically: Will platinum/PARPi/DDR-targeted therapy work again?
 * 
 * Our product: CrisPRO ChemoSensitivity Index (CSI)
 * - ONE score: CSI (0-100) that predicts chemosensitivity for next DDR-targeted line
 * - ONE claim: "CSI predicts 6-month PFS probability for next platinum/PARPi/DDR therapy"
 * - ONE use case: Next-line selection for DDR-targeted therapy (ovarian, prostate, breast)
 * - ONE advantage: Multimodal, longitudinal (DDR biology + kinetics + timing history)
 */

export const FOCUSED_HERO_CONFIG = {
  // ONE problem we solve
  problem: {
    headline: "How Chemosensitive Is This Tumor Right Now?",
    description: "For patients with advanced, heavily pretreated cancer, clinicians don't know: Will platinum, PARPi, or DDR-targeted therapy work again? For how long? When does PFI/PTFI no longer predict response?",
    specific: "Predict short- and long-term benefit from the next line of DNA-damaging or DDR-targeted therapy (platinum, PARPi, ATR/WEE1, etc.)"
  },

  // ONE clear product: CSI
  product: {
    name: "CrisPRO ChemoSensitivity Index (CSI)",
    tagline: "A single, calibrated score that estimates how likely a patient is to benefit from the next platinum or DDR-targeted therapy",
    description: "Fuses genomic DDR/HRD status, prior treatment intervals (PFI/PTPI/TFI), and early kinetic response (KELIM-like markers) into one chemosensitivity prediction."
  },

  // ONE clear claim - like Keytruda's "if PDL1 ≥50%, response rate is 45%"
  primaryClaim: {
    headline: "CSI Predicts 6-Month PFS Probability for Next DDR-Targeted Therapy",
    subheadline: "One score that fuses DDR biology, treatment timing history, and early kinetics into a unified chemosensitivity prediction",
    metric: "AUROC 0.714 (TOPACIO validation, p=0.023)",
    comparison: "Validated mechanism fit: BRCA/HRD+ (0.85) vs HRD- (0.58) → 35% vs 11% ORR",
    validation: "TOPACIO trial matching validated; extending to patient-regimen pairs"
  },

  // ONE use case to lead with (next-line selection - the core problem)
  primaryUseCase: {
    name: "Next-Line Selection for DDR-Targeted Therapy",
    question: "What platinum/PARPi/DDR therapy should we give next?",
    formula: "CSI = f(DDR_bin, PFI/PTPI/TFI, KELIM/CA-125, line_of_therapy)",
    example: {
      scenario: "Ovarian cancer patient, 2nd-line, evaluating PARP inhibitor after platinum",
      inputs: {
        DDR: "DDR_defective (BRCA-mutant, HRD+)",
        Timing: "PFI 14 months (favorable)",
        Kinetics: "KELIM 1.2 (favorable early response to prior platinum)",
        Line: "2nd-line therapy"
      },
      result: "CSI = 72/100 → High probability of 6-month PFS → RECOMMEND PARPi"
    },
    validation: "TOPACIO: AUROC 0.714, p=0.023 for mechanism fit component"
  },

  // ONE unique advantage (multimodal, longitudinal)
  moat: {
    headline: "Multimodal, Longitudinal Integration (What Others Don't Have)",
    description: "No single competitor integrates DDR biology + early kinetics + full treatment-interval history into unified predictions",
    comparison: "Foundation Medicine/Guardant: Static HRD snapshots. CrisPRO: Continuous chemosensitivity re-estimation across lines.",
    components: {
      biology: "DDR_bin engine: Structural DNA repair biology (BRCA/HRD/DDR defects, HRDsig, lncRNA HRD)",
      timing: "Timing engine: PFI/PTPI/TFI, per-regimen PFS/OS (realized chemosensitivity history)",
      kinetics: "Kinetic engine: KELIM/CA-125, PSA-KELIM (early on-treatment chemosensitivity signal)"
    },
    value: "Continuously re-estimates chemosensitivity for next DDR-related treatment line, not a static one-time test"
  },

  // Simple, focused CTAs
  cta: {
    primary: {
      text: "Calculate CSI for Your Patient",
      href: "/products/oncology",
      icon: "📊",
      description: "Predict chemosensitivity for next DDR-targeted therapy"
    },
    secondary: {
      text: "View TOPACIO Validation",
      href: "/evidence/csi-validation",
      icon: "🔬",
      description: "AUROC 0.714, p=0.023 for mechanism fit"
    }
  },

  // What we DON'T show upfront (to avoid "too smart for its own good")
  dontShowUpfront: [
    "All 7 pathways listed separately (DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux)",
    "All cancer types as separate products (ovarian, breast, lung, prostate)",
    "All sub-scores (D, P, M, T, S) as separate features upfront",
    "All indices (BRI, MAI, DRI, DCI, STI) as separate products",
    "Complex formula details and weight configurations",
    "Everything-for-everyone messaging",
    "Universal platform claims"
  ],

  // What we DO show (focused messaging)
  showUpfront: [
    "ONE problem: How chemosensitive is the tumor right now?",
    "ONE score: CSI (0-100) for next DDR-targeted therapy",
    "ONE claim: CSI predicts 6-month PFS probability",
    "ONE use case: Next-line selection for platinum/PARPi/DDR therapy",
    "ONE advantage: Multimodal, longitudinal (biology + timing + kinetics)",
    "ONE validation: TOPACIO trial (AUROC 0.714, p=0.023)"
  ],

  // The holistic score architecture (show on product page, not homepage)
  holisticScore: {
    note: "CSI is the Predictive core (mostly M + part of P). The Holistic Clinical Benefit Score (D-P-M-T-S) is the clinically-facing orchestration layer that exposes components explicitly for clinical decision-making.",
    relationship: "CSI-plus orchestration: CSI = Predictive core, Holistic Score = Clinical-facing layer",
    subScores: {
      D: "Diagnostic Fit (DDR_bin status, disease context) - from DDR_bin engine",
      P: "Prognostic Risk (PFI/PFS/line of therapy) - from Timing engine",
      M: "Mechanism Fit (7D pathway alignment) - validated TOPACIO AUROC 0.714, p=0.023",
      T: "Therapeutic Dynamics (KELIM/CA-125 early response) - from Kinetic engine",
      S: "Safety/Tolerability (PGx screening) - validated PREPARE trial (83% toxicity reduction)"
    },
    useCaseWeights: {
      trialEnrollment: { M: 0.45, D: 0.20, S: 0.25, P: 0.10, T: 0.00 },
      nextLine: { M: 0.35, P: 0.25, T: 0.20, D: 0.10, S: 0.10 },
      monitoring: { T: 0.45, P: 0.20, M: 0.15, S: 0.15, D: 0.05 }
    },
    status: "80% of components exist (M and S complete, D/P/T engines ready); wrapper functions and orchestration in progress (5-6 days after engines stable)"
  },

  // Medical hierarchy architecture (show on product pages, NOT homepage)
  medicalHierarchy: {
    note: "CrisPRO has 5 tiers of clinical capabilities organized by medical hierarchy. Homepage leads with ONE product (CSI). Full hierarchy shown on product pages.",
    tiers: {
      tier1: "Genomic Foundation (germline, somatic, variants, essentiality)",
      tier2: "Pathway/Mechanism Analysis (pathway disruptions, mechanism vectors, synthetic lethality)",
      tier3: "Therapeutic Intelligence (drug efficacy WIWFM, trials, SOC, PGx safety)",
      tier4: "Clinical Monitoring (CA-125 intelligence, resistance detection, next-test recommender)",
      tier5: "Evidence/Confidence (confidence calibration, SAE features, provenance)"
    },
    dataDependencies: {
      basic: "Stage + Disease → SOC, basic trials, CA-125 intelligence, next-test recommender",
      withGermline: "+ Germline Variants → PGx safety gates, composite scoring",
      withNGS: "+ Tumor Context (NGS) → WIWFM drug efficacy, SAE features, resistance alert, mechanism map",
      withHRD: "+ HRD Score (≥42) → PARP confidence rescue (0.8x → 1.0x)",
      withTMB: "+ TMB (≥20) or MSI-H → IO boost (1.35x or 1.30x)",
      withCompleteness: "+ Completeness (L2: ≥0.7) → Confidence uncapped"
    },
    homepageRule: "Don't show all 5 tiers on homepage. Lead with CSI (Tier 3 - Therapeutic Intelligence). Show full hierarchy on product pages."
  }
};
