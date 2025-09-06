// import { Users, Microscope, BrainCircuit } from 'lucide-react';

export interface KeyCapability {
  title: string;
  technical: string;
  scientific: string;
  business: string;
  genomicUseCasesParagraph?: string;
}

export interface ValuePropositionSection {
  audience: string;
  points: string[];
}

export interface GenomicUseCaseGridItem {
  label: string;
  iconName: string;
  color: string;
}

export interface CoPilotDetailContent {
  slug: string;
  pageTitle: string; 
  heroSubtitle?: string; 
  vision: string;
  valueProps: { audience: string; points: string[], icon: string }[];
  buildsOn: string;
  genomicInsightsOverview?: string;
  coreProblemIntro?: string;
  coreProblemPoints?: string[];
  buildsOnStackIntro?: string;
  buildsOnStackPoints?: string[];
  genomicUseCasesGrid?: GenomicUseCaseGridItem[];
  keyCapabilities: KeyCapability[];
  valuePropositionIntro?: string;
  valuePropositionSections: ValuePropositionSection[];
  conclusion: string;
}

// Populate this with the actual content for each co-pilot
// Using PrecisionRad as the primary example based on the provided markdown

export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
 "chemo": {
  slug: "chemo",
  pageTitle: "In-Silico Chemotherapy Research",
  heroSubtitle: "Accelerate chemotherapy research with validated AI engines. Transform months of drug selection into days of computational analysis with 95.7% AUROC ClinVar validation and transparent methodology.",
  vision: "CrisPRO delivers research-use-only AI engines for chemotherapy development. Our platform combines Oracle (variant analysis), Forge (drug design), and Boltz (interaction validation) to accelerate target validation, drug ranking, and therapeutic candidate generation.",

  valueProps: [
    {
      audience: 'For Medical Oncologists',
      icon: 'Users',
      points: [
        'De-risk chemotherapy selection with validated pharmacogenomic insights.',
        'Compress drug selection timelines from weeks to hours.',
        'Generate safer, more effective, and more personalized chemotherapy regimens.'
      ]
    },
    {
      audience: 'For Pharmacists & Clinical Teams',
      icon: 'Beaker',
      points: [
        'Execute more precise drug-gene interaction analysis with high-throughput screening.',
        'Generate evidence-based, AI-validated drug recommendations and interactions.',
        'Focus clinical resources on drug combinations with the highest probability of success.'
      ]
    }
  ],

  coreProblemIntro: "Choosing chemotherapy faces significant challenges with current tools and methodologies. Our platform addresses these critical bottlenecks:",
  coreProblemPoints: [
    "**Complex Drug Selection:** Matching chemotherapy drugs to patient genetics requires extensive pharmacogenomic expertise and testing.",
    "**Data Analysis Complexity:** Interpreting complex drug-gene interaction data is time-consuming and requires specialized knowledge.",
    "**Translation Challenges:** Significant gaps exist between genetic test results and actionable chemotherapy recommendations, with critical factors like drug interactions often addressed late in treatment planning.",
    "**Tool Fragmentation:** Clinicians must use multiple disconnected tools and platforms, leading to inefficiencies and integration challenges."
  ],

  keyCapabilities: [
    {
      title: "Predict: Chemotherapy Target Validation",
      technical: "95.7% AUROC ClinVar validation for variant impact prediction. Analyzes drug targets for functional variants that could affect chemotherapy response and toxicity risk.",
      scientific: "Resolves 73% of VUS cases with transparent explanations. Validates chemotherapy targets before treatment, preventing failed responses due to patient-specific genetics.",
      business: "Transform 40% VUS rate to 15% with validated predictions, accelerating chemotherapy selection and reducing treatment costs.",
      genomicUseCasesParagraph: "Oracle validates chemotherapy targets by: assessing drug-gene interactions, evaluating pharmacogenomic variants, and informing drug selection based on genetic profiles."
    },
    {
      title: "Generate: Drug Ranking & Regimen Design",
      technical: "1M token context window for comprehensive drug ranking. Generates optimal chemotherapy combinations with interaction analysis and toxicity prediction.",
      scientific: "Designs chemotherapy regimens with validated quality control metrics. Supports all major drug classes with transparent methodology and evidence-based recommendations.",
      business: "Accelerate drug selection from weeks to hours with validated generation and comprehensive interaction analysis.",
      genomicUseCasesParagraph: "Forge designs: optimal drug combinations, interaction analysis, toxicity prediction, and personalized chemotherapy strategies."
    },
    {
      title: "Validate: Chemotherapy Outcome Validation",
      technical: "3D structural validation for drug interactions. Predicts functional impact of chemotherapy combinations and validates therapeutic efficacy.",
      scientific: "Analyzes chemotherapy outcomes with structural confidence scores. Quantifies drug efficacy and functional consequences of pharmacogenomic interactions.",
      business: "Reduce post-treatment analysis time with computational validation and functional impact assessment.",
      genomicUseCasesParagraph: "Boltz validates: drug interactions, functional impact of combinations, toxicity predictions, and therapeutic efficacy assessments."
    }
  ],

  buildsOn: "CrisPRO accelerates chemotherapy discovery with validated AI research engines.",
  buildsOnStackPoints: [
    "**Oracle (Discriminative AI)**: Predicts variant impact with 95.7% accuracy on ClinVar (53,210 samples). Validates chemotherapy targets before treatment.",
    "**Forge (Generative AI)**: Designs chemotherapy regimens with 1M token context window. Generates drug combinations, interaction analysis, and toxicity predictions.",
    "**Research Validation Pipeline**: Combines Oracle and Forge to simulate chemotherapy campaigns, reducing treatment costs and accelerating discovery.",
    "**Unified Research Platform**: End-to-end workflow from target identification to validated chemotherapy regimens with transparent methodology.",
    "**Long-Context Generation**: Forge's 1M token window enables analysis of complex drug-gene interaction networks.",
    "**Patient Stratification**: Oracle analyzes patient variants to stratify chemotherapy trials by predicted response, improving success rates and signal clarity."
  ],

  "genomicUseCasesGrid": [
    { label: "Rank MoA-aligned drug classes", iconName: "ListChecks", color: "text-blue-400" },
    { label: "Explain 'why' with concise rationale", iconName: "MessageSquare", color: "text-green-400" },
    { label: "Confidence & citations (RUO)", iconName: "ShieldCheck", color: "text-purple-400" },
    { label: "VUS enrichment for chemo context", iconName: "Lightbulb", color: "text-yellow-400" },
    { label: "Cohort-aware hints (optional)", iconName: "Users", color: "text-orange-400" },
    { label: "Drug interaction analysis", iconName: "Beaker", color: "text-red-400" }
  ],



    valuePropositionSections: [
      {
        audience: "For the Radiation Oncologist",
        points: [
          "A quick, plain radiosensitivity hint to guide discussion.",
          "A simple toxicity risk hint to plan conservatively when needed.",
          "A one‑page, source‑backed summary you can share (RUO)."
        ]
      },
      {
        audience: "For the Patient",
        points: [
          "Care that considers your genetics—not just imaging.",
          "Clear explanations you can understand and discuss.",
          "Research‑mode tools that aim to reduce risk and uncertainty."
        ]
      },
      {
        audience: "For the Institution",
        points: [
          "Faster, more consistent planning discussions with provenance.",
          "Reusable, auditable outputs for QA and research.",
          "A safe path to imaging‑driven adaptation when ready."
        ]
      }
    ],
    conclusion: "In‑silico radiation insight that’s simple to read and easy to share. Plain signals. Clear confidence. Sources included. Research‑mode by design."
},

  "agentic-emr": {
    slug: "agentic-emr",
    pageTitle: "AgenticEMR™: Intelligent Clinical Data Management",
    heroSubtitle: "Transform clinical data management with autonomous AI agents that convert unstructured EMR data into actionable clinical insights.",
    vision: "Our vision is to solve the clinical data complexity challenge. We deploy specialized AI agents that process unstructured notes, labs, and genomic reports, integrating them into a unified, queryable intelligence platform. We streamline workflows and create an intelligent system for clinical and research operations.",
    
    valueProps: [
      {
        audience: 'For Clinical Oncologists',
        icon: 'Users',
        points: [
          'Access a unified, longitudinal view of your patient in seconds, not hours.',
          'Quickly identify patients for relevant clinical trials.',
          'Provide your entire multi-disciplinary team with real-time, synthesized clinical intelligence.'
        ]
      },
      {
        audience: 'For Research Institutions',
        icon: 'BrainCircuit',
        points: [
          'Accelerate cohort discovery with intelligent data analysis.',
          'Streamline trial recruitment processes and accelerate research timelines.',
          'Unlock valuable insights from your existing clinical data repositories.'
        ]
      }
    ],

    coreProblemIntro: "Traditional EMRs present significant challenges for modern clinical practice. They are designed primarily for billing and documentation, not for clinical intelligence. Our platform addresses these key limitations:",
    coreProblemPoints: [
      "**Data Fragmentation:** Unstructured clinical notes, labs, pathology reports, and genomic data that are difficult to analyze comprehensively.",
      "**Variant Interpretation Challenges:** Limited ability to interpret the clinical significance of genomic variants, creating uncertainty in diagnosis and treatment.",
      "**Manual Processes:** Time-consuming manual review of records to identify patients eligible for clinical trials.",
      "**Clinical Translation Gap:** Difficulty connecting genomic findings to potential therapeutic strategies.",
      "**Care Coordination Challenges:** Fragmented communication across care teams, leading to delays and potential errors."
    ],

    keyCapabilities: [
      {
        title: "Advanced Genomic Analysis",
        business: "Reduce clinical uncertainty by providing definitive functional impact scores for genetic mutations, transforming ambiguous results into actionable clinical intelligence.",
        technical: "Leverages advanced AI models to deliver state-of-the-art variant effect prediction directly within the EMR workflow.",
        scientific: "Applies comprehensive biological models to predict pathogenicity from first principles, providing faster and more accurate interpretation than traditional database-lookup methods."
      },
      {
        title: "Intelligent Clinical Trial Matching",
        business: "Significantly reduce trial recruitment timelines from months to days. Increase patient access to novel therapies and accelerate research.",
        technical: "Deploys AI agents that use multi-stage processes: high-speed vector search to identify candidate trials, followed by detailed eligibility analysis against comprehensive patient profiles.",
        scientific: "Leverages advanced natural language processing to understand the biological intent of eligibility criteria, going beyond simple keyword matching."
      },
      {
        title: "Integrated Therapeutic Design",
        business: "Create direct connections between clinical findings and potential therapeutic strategies, enabling comprehensive precision medicine workflows.",
        technical: "Seamless integration allows high-impact variants to be passed to therapeutic design platforms, initiating comprehensive drug discovery workflows.",
        scientific: "Creates a complete precision medicine pipeline, connecting functional genomics directly to targeted therapeutic development tools."
      },
      {
        title: "AI-Powered Collaboration & Workflow Automation",
        business: "Enhance care team efficiency with AI that actively supports clinical decision-making. Automate routine analysis and provide intelligent decision support.",
        technical: "Real-time collaboration platform where clinicians can invoke specialized AI agents for on-demand analysis directly within their workflow.",
        scientific: "Advances human-computer interaction by integrating AI agents as persistent, proactive members of the clinical team."
      }
    ],

    buildsOn: "AgenticEMR™ Dominance is built on a sophisticated AI agent architecture. Specialized agents collaborate to provide deep, contextual insights, moving beyond simple data retrieval to execute complex analysis and workflow automation:",
    buildsOnStackPoints: [
      "**`Deep Variant Interpretation`:** We don't just list mutations; our `GenomicAnalystAgent` assesses their functional impact, providing immediate clinical context.",
      "**`Automated Eligibility Screening`:** The `EligibilityDeepDiveAgent` autonomously scans patient records against complex trial criteria, extracting key data points from unstructured notes to confirm eligibility.",
      "**`From Analysis to Action`:** We connect genomic findings to therapeutic possibilities, offering workflows to translate a high-impact variant into a potential gene-editing research strategy.",
      "**`Contextual Decision Support`:** Clinicians can invoke specialized agents to ask complex questions and receive AI-generated summaries and therapeutic comparisons directly within their workflow.",
      "**`Proactive Patient Management`:** Build custom agents to automate time-consuming research tasks, such as monitoring new publications related to specific patient cohorts.",
      "**`Holistic Patient Summarization`:** Our `DataAnalysisAgent` generates a 'deep dive' summary, pulling not just the latest lab values but also conceptual insights to provide a truly holistic patient overview."
    ],
    
    genomicUseCasesGrid: [
       { "label": "Annihilate VUS (`GenomicAnalystAgent`)", "iconName": "Beaker", "color": "text-purple-400" },
       { "label": "Automate Trial Conquest (`EligibilityDeepDiveAgent`)", "iconName": "Users", "color": "text-blue-400" },
       { "label": "Forge Therapeutics from Insights", "iconName": "Layers", "color": "text-green-400" },
       { "label": "Deploy In-Consult Intelligence", "iconName": "Lightbulb", "color": "text-yellow-400" },
       { "label": "Launch Autonomous Research Agents", "iconName": "Activity", "color": "text-orange-400" },
       { "label": "Generate Pre-Encounter Dossiers", "iconName": "Shield", "color": "text-red-400" }
     ],

     "valuePropositionSections": [
      {
        "audience": "For Oncologists & Care Teams",
        "points": [
            "Dramatically reduce time spent on data analysis and trial searching.",
            "Instant access to interpreted genomic insights and eligibility reports.",
            "Enhanced clinical decision-making with AI-driven variant interpretation and therapy suggestions.",
            "Reduced cognitive load and burnout.",
            "More face-to-face time with patients."
        ]
      },
      {
        "audience": "For Oncology Departments & Research Institutions",
        "points": [
            "Accelerated research-to-treatment cycles.",
            "Increased patient enrollment in high-value clinical trials.",
            "Streamlined care coordination across multi-disciplinary teams.",
            "Enhanced data quality for reporting and analytics.",
            "Attraction and retention of top clinical and research talent."
        ]
      },
      {
        "audience": "For Patients",
        "points": [
            "More engaged and focused clinicians.",
            "Faster access to personalized treatment options and clinical trials.",
            "Improved care coordination and safety.",
            "Clearer understanding of their care plan through AI-assisted communication tools."
        ]
      }
    ],
   "conclusion": "AgenticEMR™ is more than an assistant; it is an intelligent, integrated member of the cancer care team. By transforming complex clinical data into clear, actionable insights, it empowers clinicians to make faster, more informed decisions. It bridges the critical gap between cutting-edge research and personalized patient care, accelerating the promise of precision oncology for every patient."
  },
   "crispr-intelligence": {
  slug: "crispr-intelligence",
  pageTitle: "In-Silico CRISPR Research",
  heroSubtitle: "Accelerate CRISPR research with validated AI engines. Transform months of experimental validation into days of computational analysis with 95.7% AUROC ClinVar validation and transparent methodology.",
  vision: "CrisPRO delivers research-use-only AI engines for CRISPR therapeutic development. Our platform combines Oracle (variant analysis), Forge (sequence design), and Boltz (structural validation) to accelerate target validation, guide RNA design, and therapeutic candidate generation.",

    
    valueProps: [
      {
        audience: 'For Biotech & Pharma R&D',
        icon: 'Microscope',
        points: [
          'De-risk your entire therapeutic pipeline with `in silico` validation.',
          'Compress R&D timelines from years to weeks.',
          'Forge safer, more effective, and more defensible gene editing assets.'
        ]
      },
      {
        audience: 'For Academic & Research Labs',
        icon: 'BrainCircuit',
        points: [
          'Execute more ambitious therapeutic hypotheses with high-throughput `in silico` screening.',
          'Generate publication-quality, AI-validated designs and predictions.',
          'Focus your lab resources on candidates with the highest probability of success.'
        ]
      }
    ],

    coreProblemIntro: "Developing CRISPR-based therapies faces significant challenges with current tools and methodologies. Our platform addresses these critical bottlenecks:",
    coreProblemPoints: [
      "**Complex Design Optimization:** Designing optimal gRNAs with high efficacy and minimal off-target effects requires extensive optimization and testing.",
      "**Data Analysis Complexity:** Interpreting complex NGS data from CRISPR experiments is time-consuming and requires specialized expertise.",
      "**Translation Challenges:** Significant gaps exist between successful lab experiments and viable therapeutics, with critical factors like immunogenicity and delivery often addressed late in development.",
      "**Tool Fragmentation:** Scientists must use multiple disconnected tools and platforms, leading to inefficiencies and integration challenges."
    ],

    keyCapabilities: [
      {
        title: "Predict: CRISPR Target Validation",
        technical: "95.7% AUROC ClinVar validation for variant impact prediction. Analyzes target sites for functional variants that could affect gRNA binding efficiency and PAM recognition.",
        scientific: "Resolves 73% of VUS cases with transparent explanations. Validates therapeutic targets before CRISPR experiments, preventing failed edits due to patient-specific genetics.",
        business: "Transform 40% VUS rate to 15% with validated predictions, accelerating CRISPR target selection and reducing experimental costs.",
        genomicUseCasesParagraph: "Oracle validates CRISPR targets by: assessing target site integrity, evaluating off-target functional impact, and informing gRNA selection near regulatory elements."
      },
      {
        title: "Generate: Guide RNA Design & Optimization",
        technical: "1M token context window for comprehensive guide RNA design. Generates optimal sequences with off-target analysis and HDR template design.",
        scientific: "Designs guide RNAs with validated quality control metrics. Supports all modern nucleases (Cas9, Cas12, Base/Prime Editors) with transparent methodology.",
        business: "Accelerate guide RNA design from weeks to hours with validated generation and comprehensive off-target analysis.",
        genomicUseCasesParagraph: "Forge designs: optimal guide RNAs, HDR repair templates, off-target analysis, and multi-modal CRISPR strategies."
      },
      {
        title: "Validate: CRISPR Outcome Validation",
        technical: "3D structural validation for CRISPR outcomes. Predicts functional impact of edited alleles and validates therapeutic efficacy.",
        scientific: "Analyzes CRISPR experimental results with structural confidence scores. Quantifies editing efficiency and functional consequences of DNA repair pathways.",
        business: "Reduce post-experiment analysis time with computational validation and functional impact assessment.",
        genomicUseCasesParagraph: "Boltz validates: editing outcomes, functional impact of edits, allelic heterogeneity, and therapeutic efficacy predictions."
      }
    ],

    buildsOn: "CrisPRO accelerates therapeutic discovery with validated AI research engines.",
    buildsOnStackPoints: [
      "**Oracle (Discriminative AI)**: Predicts variant impact with 95.7% accuracy on ClinVar (53,210 samples). Validates therapeutic targets before experiments.",
      "**Forge (Generative AI)**: Designs therapeutic candidates with 1M token context window. Generates guide RNAs, repair templates, and protein sequences.",
      "**Research Validation Pipeline**: Combines Oracle and Forge to simulate R&D campaigns, reducing experimental costs and accelerating discovery.",
      "**Unified Research Platform**: End-to-end workflow from target identification to validated therapeutic candidates with transparent methodology.",
      "**Long-Context Generation**: Forge's 1M token window enables generation of multi-kilobase sequences for complex therapeutic designs.",
      "**Patient Stratification**: Oracle analyzes patient variants to stratify trials by predicted impact, improving success rates and signal clarity."      
    ],
    
    "genomicUseCasesGrid": [
      { label: "Perform VUS Interpretation (Target/Disease Context)", iconName: "Lightbulb", color: "text-yellow-400" },
      { label: "Predicting On-Target Efficacy & Specificity", iconName: "Activity", color: "text-blue-400" },
      { label: "Forecasting Off-Target Editing Risks", iconName: "Shield", color: "text-red-400" },
      { label: "Optimizing gRNA Design & Delivery", iconName: "Layers", color: "text-green-400" },
      { label: "Guiding HDR Strategies & Donor Design", iconName: "Beaker", color: "text-purple-400" },
      { label: "Stratifying Studies & Biomarker ID", iconName: "Users", color: "text-orange-400" }
    ],
    "valuePropositionSections": [
      {
        audience: "For Scientists & Research Labs",
        points: [
          "Design with Unprecedented Confidence: Leverage best-in-class AI to design highly potent and specific guide RNAs from the start, dramatically increasing the success rate of your editing experiments and minimizing costly validation cycles.",
          "Go from Raw Data to Actionable Insight, Faster: Let our AI Co-Pilot handle the heavy lifting of complex NGS data analysis and therapeutic contextualization, transforming your experimental results into clear, decision-ready insights in a fraction of the time.",
          "Democratize Advanced Computational Biology: Access a suite of sophisticated AI tools for variant effect prediction, off-target analysis, and experimental design, without needing a dedicated bioinformatics team. Focus on your science, not on building analysis pipelines.",
          "Produce High-Impact, Publishable Results: Generate higher quality, more reproducible data with AI-guided experimental design and analysis, strengthening your publications, grant applications, and contributions to the field."
        ]
      },
      {
        audience: "For Biotechnology & Pharmaceutical Leaders",
        points: [
          "De-Risk Your Therapeutic Pipeline: Make more informed go/no-go decisions with AI-driven insights into target validity, off-target safety, and potential translational hurdles, significantly reducing the risk profile of your preclinical programs.",
          "Accelerate Timelines to the Clinic: Shorten the entire discovery and preclinical development cycle for CRISPR therapies by streamlining design, automating complex analysis, and contextualizing results for therapeutic viability from day one.",
          "Build a Moat Around Your IP: Strengthen your intellectual property position with novel, highly optimized, and well-characterized gene editing strategies and therapeutic candidates designed and validated through the platform.",
          "Maximize Your R&D Investment: Improve the overall efficiency and success rate of your therapeutic programs, ensuring your resources are focused on the most promising candidates and strategies, leading to a higher potential return on investment."
        ]
      }
    ],
    conclusion: "The CRISPR Intelligence Platform transforms therapeutic design from a manual, iterative process into a scalable, AI-driven system. We provide the tools to advance the fight against genetic disease through precision medicine."      
  }
}; 