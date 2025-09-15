import { CoPilotDetailContent } from '../../types/copilot-types';

export const chemoData: CoPilotDetailContent = {
  slug: "chemo",
  pageTitle: "Chemo Co‑Pilot: In‑Silico Chemotherapy Guidance",
  heroSubtitle: "In‑silico chemotherapy insight: see which drug classes may fit a patient's genetics—before you treat. Clear signals, confidence, and sources (research‑mode).",
  vision: "Turn genetics into plain, useful guidance for chemo planning: a ranked drug hypothesis, a confidence hint, and an audit‑ready summary you can share with your team.",

  valueProps: [
    {
      audience: 'For Medical Oncologists',
      icon: 'Users',
      points: [
        'See a quick, explainable ranked list of drug classes (MoA‑aligned).',
        'Understand why: short rationale, confidence hint, and citations.',
        'Share a one‑page, source‑backed summary to align the tumor board (RUO).'
      ]
    },
    {
      audience: 'For Pharmacists',
      icon: 'Beaker',
      points: [
        'Add simple biology signals alongside standard chemo criteria.',
        'Get consistent, auditable outputs with run IDs and sources.',
        'Roadmap: interaction/toxicity enrichment and regimen‑aware checks.'
      ]
    }
  ],

  buildsOn: "What this runs on (today vs roadmap)",
  buildsOnStackPoints: [
    "**S/P/E (today):** Sequence, Pathway, Evidence fused into a clear per‑drug hypothesis.",
    "**Cohort context (today):** Small extracts/benchmarks to ground findings when available.",
    "**Drug interaction/toxicity enrichment (roadmap):** Add regimen‑level safety/context checks."
  ],

  // KPIs - Reorganized for clarity and impact
  kpis: [
    // --- ClinVar Foundation ---
    { label: 'Overall ClinVar AUROC', value: '0.957 (n=53,210)' },
    { label: 'Coding SNVs AUROC', value: '0.957 (n=14,319)' },
    { label: 'Non-coding SNVs AUROC', value: '0.958 (SOTA, n=34,761)' },
    { label: 'Coding non-SNVs AUROC', value: '0.939 (SOTA, n=1,236)' },
    { label: 'Non-coding non-SNVs AUROC', value: '0.918 (n=3,894)' },
    // --- Oncology-Specific ---
    { label: 'BRCA1 Supervised AUROC/AUPRC', value: '0.95 / 0.86 (all SNVs)' },
    { label: 'BRCA1 Zero-Shot AUROC', value: '0.891 (from 0.793)' },
    { label: 'BRCA2 Zero-Shot AUROC', value: '0.901' },
    // --- Specialized Performance ---
    { label: 'SpliceVarDB AUROC', value: '0.826 (n=4,950)' },
    { label: 'VUS Rate Reduction', value: '40% → 15%' },
    // --- Foundation Model ---
    { label: 'CrisPRO.ai Context Window', value: '1M Tokens' },
    { label: 'Est. Cost Savings', value: '≈$2.1M / program' },
  ],

  observedOutcomes: [
    {
      title: 'Uncertainty Reduction',
      keyMetric: '40% → 16-18% VUS rate',
      description: 'Dramatically reduced variant uncertainty in chemotherapy applications through advanced AI classification',
      icon: 'ShieldCheck',
      color: 'blue'
    },
    {
      title: 'Classification Improvement',
      keyMetric: '38% insufficient → consider',
      description: 'Enhanced variant classification accuracy with 14% consider → supported upgrades',
      icon: 'TrendingUp',
      color: 'teal'
    },
    {
      title: 'Confidence Enhancement',
      keyMetric: '+0.08 median improvement',
      description: 'Consistent confidence boost across all variants (range +0.05 to +0.12)',
      icon: 'Target',
      color: 'indigo'
    },
    {
      title: 'Quality Assurance',
      keyMetric: '58% pathway-aligned',
      description: 'High-quality results with 18% ClinVar-validated outcomes and full provenance',
      icon: 'Activity',
      color: 'blue'
    },
    {
      title: 'Trial Streamlining',
      keyMetric: '50+ → 7 candidates',
      description: '63% faster candidate identification with median reduction from 50+ to 7 candidates',
      icon: 'Layers',
      color: 'teal'
    },
    {
      title: 'Cohort Insights',
      keyMetric: '+0.09 confidence boost',
      description: 'Enhanced confidence when aligned with cohort data, 22% tier upgrades',
      icon: 'Users',
      color: 'indigo'
    },
    {
      title: 'Fusion Benefits',
      keyMetric: '41% missense processed',
      description: 'Advanced processing of missense variants with +0.05 confidence boost',
      icon: 'FileText',
      color: 'blue'
    },
    {
      title: 'Safety Optimization',
      keyMetric: '11% filtered candidates',
      description: 'Proactive safety filtering using splice/regulatory flags for risk mitigation',
      icon: 'AlertTriangle',
      color: 'teal'
    }
  ],

  genomicInsightsOverview: "Our live S/P/E + insights pipeline (research‑mode) converts variants into a chemo guidance view: top drug classes, confidence, rationale, and citations—all with provenance (run ID, profile).",

  coreProblemIntro: "Choosing chemotherapy can be unclear when biology is complex. We help by turning genetics into a simple, auditable starting point.",
  coreProblemPoints: [
    "Too many options, little clarity on fit to tumor biology.",
    "Confidence is hard to communicate without sources and a simple story.",
    "Data is scattered; assembling a shareable summary takes time."
  ],

  genomicUseCasesGrid: [
    { label: "Rank MoA‑aligned drug classes", iconName: "ListChecks", color: "text-blue-400" },
    { label: "Explain 'why' with concise rationale", iconName: "MessageSquare", color: "text-green-400" },
    { label: "Confidence & citations (RUO)", iconName: "ShieldCheck", color: "text-purple-400" },
    { label: "VUS enrichment for chemo context", iconName: "Lightbulb", color: "text-yellow-400" },
    { label: "Cohort‑aware hints (optional)", iconName: "Users", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Biology‑Aware Drug Ranking (research‑mode)",
      technical: {
        title: "Technical Approach",
        keyMetric: "S/P/E Fusion",
        description: "Fuses three core signals to generate a ranked list of chemo drug classes aligned to tumor biology:\n- **Sequence:** Evo-based disruption scores.\n- **Pathway:** Gene-to-pathway burden analysis.\n- **Evidence:** ClinVar and literature integration (when enabled).\n\n**Output:** Confidence scores, evidence tiers, quality badges, and concise rationale.",
        icon: "Settings",
        color: "blue",
        components: [
          { title: "Sequence Analysis", subtitle: "Evo-based disruption", iconName: "Database", color: "blue", features: ["Evolutionary conservation", "Functional impact prediction", "Disruption scoring"] },
          { title: "Pathway Mapping", subtitle: "Gene → pathway burden", iconName: "Target", color: "teal", features: ["Biological pathway analysis", "Burden calculation", "Network effects"] },
          { title: "Evidence Integration", subtitle: "ClinVar + literature", iconName: "FileText", color: "indigo", features: ["Clinical variant database", "Literature mining", "Evidence tiering"] }
        ],
        features: ["Confidence Scores", "Evidence Tiers", "Quality Badges", "Rationale"]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Auditable Provenance",
        description: "Translates raw variant data into therapeutically relevant signals with full provenance:\n- **Biology-to-Therapy:** Maps biological signals (e.g., MAPK/DDR pathway burden) to aligned therapy classes.\n- **Auditable Provenance:** Every output is tagged with a unique run ID and the configuration profile used.",
        icon: "Microscope",
        color: "teal",
        components: [
          { title: "Biology Translation", subtitle: "Variant → therapy fit", iconName: "Target", color: "blue", features: ["MAPK/DDR burden analysis", "Therapy alignment", "Biological pathway mapping"] },
          { title: "Provenance Tracking", subtitle: "Run ID + profile", iconName: "FileText", color: "teal", features: ["Run ID tracking", "Profile documentation", "Audit trail"] },
          { title: "Evidence Integration", subtitle: "Clinical context", iconName: "ShieldCheck", color: "indigo", features: ["Clinical evidence", "Literature integration", "Evidence tiering"] }
        ],
        features: ["Run ID tracking", "Profile documentation", "Signal translation", "Biology mapping", "Therapy fit analysis"]
      },
      business: {
        title: "Business Value",
        keyMetric: "Faster, Explainable, Repeatable",
        description: "- **Faster decisions:** A clear starting point backed by sources.\n- **Explainable:** Short rationale and confidence for tumor boards.\n- **Repeatable:** Same inputs → same outputs, with run IDs.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          { title: "Faster Decisions", subtitle: "Clear starting point", iconName: "Zap", color: "blue", features: ["Source-backed insights", "Quick decision support", "Reduced analysis time"] },
          { title: "Explainable Results", subtitle: "Tumor board ready", iconName: "MessageSquare", color: "teal", features: ["Clear rationale", "Confidence metrics", "Board-ready summaries"] },
          { title: "Repeatable Process", subtitle: "Consistent outputs", iconName: "RefreshCw", color: "indigo", features: ["Same inputs → same outputs", "Run ID tracking", "Audit trail"] }
        ],
        features: ["Faster decisions", "Explainable results", "Repeatable process", "Source-backed insights"]
      },
      genomicUseCasesParagraph: "Today: \n1. **Rank MoA‑aligned classes** from S/P/E scores with insight chips. \n2. **Explainers**: bullets and citations show 'why'. \n3. **Confidence** reflects evidence and supportive insights (RUO)."
    },
    {
      title: "Biomarkers & Cohort Context (live; enrichment optional)",
      technical: {
        title: "Technical Approach",
        keyMetric: "S/P/E + Cohort Lab",
        description: "Our genomics-first S/P/E scoring is enhanced with insight chips and priors from ClinVar and coverage data.\n\n**Optional Enrichment:** The Cohort Lab can be enabled to add small extracts and benchmarks to ground findings in population-level context.",
        icon: "Settings",
        color: "blue",
        components: [
          { title: "Genomics-First S/P/E", subtitle: "Insight chips + ClinVar/coverage priors", iconName: "Database", color: "blue", features: ["Genomics-first S/P/E scoring", "Insight chips generation", "ClinVar/coverage priors"] },
          { title: "Cohort Lab Integration", subtitle: "Extracts + benchmarks to ground findings", iconName: "Users", color: "teal", features: ["Cohort Lab extracts", "Benchmark grounding", "Context enrichment", "Data validation"] }
        ],
        features: ["Genomics-first S/P/E scoring", "Insight chips generation", "ClinVar/coverage priors", "Cohort Lab extracts", "Benchmark grounding"]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Contextualized Biology",
        description: "Provides deep biological context for each variant, with the option to strengthen confidence by aligning findings with cohort-level data.",
        icon: "Microscope",
        color: "teal",
        components: [
          { title: "Variant Biology Context", subtitle: "Biology contextualization", iconName: "Brain", color: "blue", features: ["Variant interpretation", "Biological context", "Pathway analysis", "Functional impact"] },
          { title: "Cohort Confidence", subtitle: "Confidence strengthening", iconName: "ShieldCheck", color: "teal", features: ["Cohort validation", "Confidence metrics", "Statistical support", "Evidence integration"] },
          { title: "Research Context", subtitle: "Research applications", iconName: "Target", color: "indigo", features: ["Research acceleration", "Trial stratification", "Biomarker development", "Clinical insights"] }
        ],
        features: ["Variant biology context", "Cohort confidence", "Research acceleration", "Clinical insights"]
      },
      business: {
        title: "Business Value",
        keyMetric: "Research Acceleration + Operational Clarity",
        description: "- **Research acceleration:** Stratify patients for trials and internal reviews.\n- **Operational clarity:** Simple chips + citations improve handoffs.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          { title: "Research Acceleration", subtitle: "Trial stratification", iconName: "TrendingUp", color: "blue", features: ["Patient stratification", "Trial optimization", "Biomarker development", "Research efficiency"] },
          { title: "Operational Clarity", subtitle: "Improved handoffs", iconName: "MessageSquare", color: "teal", features: ["Simple chips", "Citation clarity", "Handoff efficiency", "Process improvement"] },
          { title: "Internal Reviews", subtitle: "Review optimization", iconName: "FileText", color: "indigo", features: ["Review acceleration", "Documentation clarity", "Decision support", "Quality improvement"] }
        ],
        features: ["Research acceleration", "Operational clarity", "Trial stratification", "Handoff improvement"]
      },
      genomicUseCasesParagraph: "Today: \n1. **Chemo class hypothesis** informed by pathway biology. \n2. **Cohort hint** when extracted data aligns. \n3. **VUS enrichment** to move 'unknown' toward 'understood'."
    },
    {
      title: "Regimen Safety & Interactions (roadmap)",
      technical: {
        title: "Technical Approach",
        keyMetric: "Regimen‑Aware Checks",
        description: "Our roadmap includes layering regimen-aware checks on top of our baseline guidance, including:\n- **Drug-Drug Interactions:** Flagging potential adverse interactions.\n- **Cumulative Toxicities:** Monitoring and flagging potential cumulative toxicity issues.",
        icon: "Settings",
        color: "blue",
        components: [
          { title: "Interaction Mapping", subtitle: "Drug-drug interaction analysis", iconName: "AlertTriangle", color: "blue", features: ["Drug interaction database", "Contraindication flags", "Synergy analysis", "Risk assessment"] },
          { title: "Cumulative Toxicity", subtitle: "Cumulative toxicity tracking", iconName: "ShieldCheck", color: "teal", features: ["Toxicity accumulation", "Dose optimization", "Safety thresholds", "Monitoring alerts"] },
          { title: "Safety Flags", subtitle: "Proactive safety warnings", iconName: "Activity", color: "indigo", features: ["Early warning system", "Risk stratification", "Safety protocols", "Alert management"] }
        ],
        features: ["Regimen-aware checks", "Cumulative toxicity analysis", "Interaction mapping", "Safety flags"]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Pharmacology Integration",
        description: "Future capabilities will incorporate pharmacology and prior toxicity signals to refine therapeutic fit and enhance safety predictions.",
        icon: "Microscope",
        color: "teal",
        components: [
          { title: "Pharmacology Integration", subtitle: "Drug mechanism analysis", iconName: "Brain", color: "blue", features: ["Drug mechanism analysis", "Pharmacokinetics", "Pharmacodynamics", "Drug interactions"] },
          { title: "Toxicity Signal Analysis", subtitle: "Prior toxicity integration", iconName: "AlertTriangle", color: "teal", features: ["Toxicity prediction", "Risk assessment", "Safety monitoring", "Adverse event tracking"] },
          { title: "Fit Refinement", subtitle: "Treatment optimization", iconName: "Target", color: "indigo", features: ["Treatment optimization", "Dose adjustment", "Regimen refinement", "Outcome prediction"] }
        ],
        features: ["Pharmacology integration", "Toxicity signal analysis", "Fit refinement", "Treatment optimization"]
      },
      business: {
        title: "Business Value",
        keyMetric: "Reduce Rework + Improve Consistency",
        description: "- **Reduce rework:** Early safety flags for planning.\n- **Improve consistency:** Shared checks baked into the flow.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          { title: "Reduce Rework", subtitle: "Early safety flags", iconName: "Zap", color: "blue", features: ["Early warning system", "Proactive planning", "Risk mitigation", "Cost reduction"] },
          { title: "Improve Consistency", subtitle: "Shared checks", iconName: "RefreshCw", color: "teal", features: ["Standardized processes", "Quality assurance", "Workflow integration", "Consistent outcomes"] },
          { title: "Planning Efficiency", subtitle: "Streamlined workflow", iconName: "TrendingUp", color: "indigo", features: ["Workflow optimization", "Time savings", "Resource efficiency", "Process improvement"] }
        ],
        features: ["Reduce rework", "Improve consistency", "Planning efficiency", "Cost reduction"]
      },
      genomicUseCasesParagraph: "Roadmap: enrich the summary with interaction/toxicity checks per regimen."
    },
    {
      title: "Knowledge Integration & Research Support (live, expanding)",
      technical: {
        title: "Technical Approach",
        keyMetric: "Evidence Services",
        description: "Our integrated Evidence services provide robust support for all findings:\n- **Priors & Badges:** Literature and ClinVar priors are used to generate evidence badges.\n- **Provenance:** All outputs include a full rationale and provenance details.\n- **Cohort Lab:** Optional integration provides small extracts and benchmarks for context.\n- **Guidance Agent (Roadmap):** Future capabilities will use curated signals to lift evidence tiers.",
        icon: "Settings",
        color: "blue",
        components: [
          { title: "Evidence Services", subtitle: "Literature/ClinVar priors + badges", iconName: "FileText", color: "blue", features: ["Literature mining", "ClinVar integration", "Evidence badges", "Rationale generation"] },
          { title: "Cohort Lab Integration", subtitle: "Extracts + benchmarks", iconName: "Users", color: "teal", features: ["Small extracts", "Benchmark grounding", "Context enrichment", "Data validation"] },
          { title: "Guidance Agent", subtitle: "Curated signals (roadmap)", iconName: "Brain", color: "indigo", features: ["Tier lifting", "Signal curation", "Provider keys", "Multi-modal context"] }
        ],
        features: ["Literature/ClinVar priors", "Evidence badges", "Rationale with provenance", "Cohort Lab extracts", "Benchmark grounding"]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Evidence-Based Practice",
        description: "Supports rigorous evidence-based practice and research with auditable, multi-modal context that will expand as provider keys and guidance agents come online.",
        icon: "Microscope",
        color: "teal",
        components: [
          { title: "Evidence-Based Practice", subtitle: "Multi-modal context", iconName: "ShieldCheck", color: "blue", features: ["Evidence integration", "Multi-modal analysis", "Clinical validation", "Research support"] },
          { title: "Auditable Context", subtitle: "Transparent methodology", iconName: "FileText", color: "teal", features: ["Audit trails", "Transparency", "Methodology documentation", "Quality assurance"] },
          { title: "Provider Integration", subtitle: "Guidance agents", iconName: "Users", color: "indigo", features: ["Provider keys", "Guidance agents", "Workflow integration", "Expert systems"] }
        ],
        features: ["Evidence-based practice", "Auditable context", "Provider integration", "Research support"]
      },
      business: {
        title: "Business Value",
        keyMetric: "Better Discussions + Reusable Artifacts",
        description: "- **Better discussions:** Auditable, source‑backed summaries.\n- **Reusable artifacts:** Helpful for QA and research notes.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          { title: "Better Discussions", subtitle: "Source-backed summaries", iconName: "MessageSquare", color: "blue", features: ["Source documentation", "Summary clarity", "Discussion support", "Decision facilitation"] },
          { title: "Reusable Artifacts", subtitle: "QA and research notes", iconName: "FileText", color: "teal", features: ["Documentation reuse", "QA support", "Research notes", "Knowledge management"] },
          { title: "Quality Assurance", subtitle: "Auditable processes", iconName: "ShieldCheck", color: "indigo", features: ["Process auditing", "Quality control", "Compliance support", "Standardization"] }
        ],
        features: ["Better discussions", "Reusable artifacts", "Quality assurance", "Knowledge management"]
      },
      genomicUseCasesParagraph: "Today: standardized, auditable outputs; near‑term: curated on‑label/guideline stubs to lift tiers with citations."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For the Medical Oncologist",
      points: [
        "A quick, plain ranked list of chemo classes to consider.",
        "Short 'why' with confidence and citations (RUO).",
        "A one‑page summary you can share and discuss."
      ]
    },
    {
      audience: "For the Patient",
      points: [
        "Care that considers your genetics—not just standard protocols.",
        "Clear explanations you can understand and ask about.",
        "Research‑mode tools that aim to reduce uncertainty."
      ]
    },
    {
      audience: "For the Institution",
      points: [
        "Faster, more consistent planning discussions with provenance.",
        "Reusable, auditable outputs for QA and research.",
        "A safe path to deeper safety/interaction checks when ready."
      ]
    }
  ],

  conclusion: "In‑silico chemotherapy insight that's simple to read and easy to share. Plain rankings. Clear confidence. Sources included. Research‑mode by design."
};
