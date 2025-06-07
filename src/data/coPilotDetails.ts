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
  "precision-rad": {
    slug: "precision-rad",
    pageTitle: "PrecisionRad Co-Pilot",
    heroSubtitle: "Personalizing radiation therapy for cancer patients using AI-driven analysis of genomics and medical imaging.",
    vision: "To empower every radiation oncologist with an AI co-pilot that helps deliver the right dose to the right target, for every patient, based on their unique biology.",
    coreProblemIntro: "Standard radiation therapy doesn't account for the unique biology of each patient's tumor, leading to:",
    coreProblemPoints: [
      "Variable treatment effectiveness.",
      "Unpredictable and sometimes severe side effects on healthy tissue.",
      "Difficulty adapting plans to changes during the course of treatment."
    ],
    buildsOnStackIntro: "PrecisionRad fuses multi-modal data to create a truly personalized treatment plan:",
    buildsOnStackPoints: [
      "**Genomic Analysis:** Predicts tumor radiosensitivity by analyzing specific genetic mutations.",
      "**Imaging Insights:** Uses AI to identify radioresistant tumor sub-regions on CT/MRI scans.",
      "**Toxicity Prediction:** Analyzes a patient's germline DNA to forecast and mitigate normal tissue side effects."
    ],
    keyCapabilities: [
      {
        title: "AI-Enhanced Treatment Planning",
        business: "Create more effective and safer radiation plans in less time, improving patient outcomes and clinical efficiency.",
        technical: "AI-assisted contouring of tumors, intelligent algorithms for proposing optimal radiation beam arrangements, and predictive dosimetry models.",
        scientific: "Drives more consistent and accurate target delineation, reducing inter-observer variability and enabling biologically adaptive radiotherapy approaches."
      },
      {
        title: "Personalized Biomarker Integration",
        business: "Leverage unique patient biomarkers from genomics and imaging to stratify patients and accelerate research.",
        technical: "Seamlessly integrates genomic data with quantitative features extracted from CT, PET, and MRI scans via advanced radiomics pipelines.",
        scientific: "Provides a deeper understanding of the biological underpinnings of tumor radiosensitivity and individual predispositions to toxicity."
      },
      {
        title: "Adaptive Radiotherapy Support",
        business: "Dynamically adjust treatment plans during therapy to respond to changes in tumor biology, improving accuracy.",
        technical: "Employs AI for automated detection of anatomical and biological changes using on-board imaging, providing recommendations for replanning.",
        scientific: "Ensures more accurate dose delivery throughout the treatment course, responding dynamically to tumor shrinkage or shifts in organs at risk."
      }
    ],
    valuePropositionSections: [],
    conclusion: "PrecisionRad transforms radiation oncology from a standardized practice to a deeply personalized science, making treatment more effective and safer for every patient."
  },
  "agentic-emr": {
    slug: "agentic-emr",
    pageTitle: "AgenticEMR Co-Pilot",
    heroSubtitle: "Unlock the life-saving insights hidden in your clinical data.",
    vision: "To transform unstructured electronic medical records (EMRs) from a data burden into a strategic asset, empowering clinicians to make faster, data-driven decisions.",
    coreProblemIntro: "Clinical data in EMRs is messy, fragmented, and hard to use, causing clinicians to:",
    coreProblemPoints: [
      "Waste hours manually reviewing patient histories.",
      "Struggle to identify eligible patients for clinical trials.",
      "Miss crucial patterns and insights hidden in unstructured notes."
    ],
    buildsOnStackIntro: "The AgenticEMR Co-Pilot uses specialized AI agents to read, understand, and structure your clinical data:",
    buildsOnStackPoints: [
      "**Automated Summarization:** Instantly generates concise, clinically relevant summaries of a patient's entire history.",
      "**Intelligent Cohort Building:** Finds specific patient cohorts for research or trials in minutes, not weeks.",
      "**Clinical Trial Matching:** Automatically screens patients against complex trial eligibility criteria."
    ],
    keyCapabilities: [
      {
        title: "Unstructured Data Interpretation",
        business: "Turns messy clinical notes and reports into structured, usable data, saving clinician time.",
        technical: "Leverages specialized NLP models to extract key entities (diagnoses, medications, procedures) from all forms of clinical notes.",
        scientific: "Applies Natural Language Processing to create structured, longitudinal patient timelines from unstructured text."
      },
      {
        title: "Intelligent Clinical Trial Matching",
        business: "Drastically accelerate patient recruitment for clinical trials, bringing new therapies to market faster.",
        technical: "Performs multi-stage analysis, using vector search followed by an LLM-powered deep-dive for criterion-by-criterion eligibility checks.",
        scientific: "Applies Information Retrieval techniques to parse complex eligibility criteria and match them against structured and unstructured patient data."
      },
      {
        title: "Context-Aware Collaboration Hub",
        business: "Fosters better team collaboration with AI-powered tools directly within the clinical workflow.",
        technical: "Implements a real-time consultation feature with in-chat agent invocation to provide on-demand decision support.",
        scientific: "Explores human-computer interaction models for collaborative AI, where agents act as active participants in clinical discussions."
      }
    ],
    valuePropositionSections: [],
    conclusion: "The AgenticEMR Co-Pilot is an active member of the care team, translating vast clinical data into clear intelligence that empowers clinicians, accelerates research, and improves patient care."
  },
  "crispr-intelligence": {
    slug: "crispr-intelligence",
    pageTitle: "CRISPR Intelligence Co-Pilot",
    heroSubtitle: "Your AI partner for designing and developing gene-editing therapies, faster and safer.",
    vision: "To accelerate the journey from gene target to life-saving therapeutic by empowering scientists with an AI platform that intelligently designs, predicts, and optimizes every step of the CRISPR workflow.",
    coreProblemIntro: "Developing gene-editing therapies is slow, expensive, and risky. Scientists struggle with:",
    coreProblemPoints: [
      "Designing effective and safe guide RNAs is a complex, multi-factorial challenge.",
      "Predicting the complex and often unintended outcomes of genetic edits.",
      "Connecting promising lab results to real-world therapeutic potential and clinical viability."
    ],
    buildsOnStackIntro: "Our CRISPR Co-Pilot uses AI to transform the R&D process:",
    buildsOnStackPoints: [
      "**AI-Powered Design:** Intelligently designs optimal guide RNAs, computationally minimizing off-target risks before experiments begin.",
      "**Predictive Analysis:** Simulates the outcome of edits *in-silico* to validate strategies before costly and time-consuming lab work.",
      "**Automated Insights:** Analyzes complex next-generation sequencing data to provide clear, actionable interpretations of experimental results."
    ],
    keyCapabilities: [
      {
        title: "AI-Powered Guide RNA Design",
        business: "Design effective and safe gRNAs in minutes, not weeks, reducing costs and accelerating timelines.",
        technical: "Uses advanced algorithms for superior on-target efficiency prediction and comprehensive off-target site scoring across the genome.",
        scientific: "Enables the rapid and reliable selection of highly potent and specific gRNAs, the cornerstone of any successful CRISPR experiment."
      },
      {
        title: "Advanced Variant Effect Prediction",
        business: "Understand the precise impact of genetic variants on your target to de-risk your program from the start.",
        technical: "Integrates an advanced AI engine to deliver deep insights into genetic variations, predicting the functional impact of SNVs and indels.",
        scientific: "Critical for robust target validation, allowing researchers to assess if a gene target harbors functional variants that might affect therapeutic efficacy."
      },
      {
        title: "Automated Outcome Analysis",
        business: "Get clear, actionable interpretations from complex sequencing data, turning results into decisions faster.",
        technical: "Provides robust, automated parsing and in-depth analysis of NGS data from CRISPR experiments to precisely quantify editing outcomes.",
        scientific: "Delivers precise quantification of all editing outcomes, enabling detailed characterization of DNA repair pathway choices and mutational signatures."
      }
    ],
    valuePropositionSections: [],
    conclusion: "The CRISPR Intelligence Co-Pilot bridges the gap between the promise of gene editing and the reality of therapeutic development, providing a unified, AI-guided platform to create genetic medicines."
  }
}; 