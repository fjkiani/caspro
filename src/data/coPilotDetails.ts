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
  "precision-rad": {
    slug: "precision-rad",
    pageTitle: "PrecisionRad™ Intelligence: Predictive Warfare on Cancer",
    heroSubtitle: "Annihilating the guesswork of radiotherapy. We fuse AI-driven genomic intelligence with medical imaging to predict treatment outcomes before the first dose is ever fired.",
    vision: "The mission of PrecisionRad™ Intelligence is to transform radiation oncology from a practice of anatomical targeting into a science of predictive, biological warfare. We arm clinicians with the `in silico` tools to model tumor radiosensitivity, forecast normal tissue toxicity, and design lethally precise, adaptive treatment plans based on each patient's unique genetic battlefield.",
    
    // Simplified value props focusing on outcomes
    valueProps: [
      {
        audience: 'For Radiation Oncologists',
        icon: 'Users',
        points: [
          'Deploy treatment plans based on predicted radiosensitivity, not just anatomy.',
          'Quantify and pre-empt patient-specific toxicity risks.',
          'Dominate the battle with truly adaptive, real-time therapy adjustments.'
        ]
      },
      {
        audience: 'For Medical Physicists',
        icon: 'Microscope',
        points: [
          'Forge treatment plans with biologically-defined targets, not just geometric shapes.',
          'Automate quality assurance for complex, AI-driven adaptive plans.',
          'Author novel, data-driven protocols that establish a new standard of care.'
        ]
      }
    ],
    buildsOn: "PrecisionRad is built on a foundation of integrated, multi-modal data analysis.",
    buildsOnStackPoints: [
      "**`AI-Powered Radio-Genomics`:** Our Zeta Oracle analyzes the functional impact of any variant in a patient's DNA Damage Response (DDR) pathway to generate a quantitative radiosensitivity score.",
      "**`Quantitative Radiomics`:** We extract thousands of sub-visual features from CT, PET, and MRI scans, correlating them with genomic data to create a unified, predictive model of the tumor.",
      "**`Adaptive Warfare Engine`:** We continuously monitor on-treatment imaging, using our AI to detect biological changes and recommend tactical adjustments to the treatment plan in real-time.",
      "**`The Oracle` using its first-principles understanding of biology, calculates the Zeta Score (delta_likelihood_score) of any variant.",
      "**`our Zeta Forge` powered by a 1M token context window—to generate ultra-long, multi-kilobase homology arms** .",
      "**`Smarter Stratification` We run every patient's specific KRAS variant through our Zeta Oracle. We then stratify the trial into cohorts: High-Impact KRAS,Moderate-Impact KRAS, etc. This leads to a cleaner signal and a higher probability of trial success.",

    ],
    genomicInsightsOverview: "Our platform's core `analyze_single_variant` capability is the engine of personalization. It allows us to predict tumor radiosensitivity from somatic mutations, forecast normal tissue toxicity from germline variants, and enable biologically-guided 'dose painting' to annihilate resistant tumor sub-regions. We provide the intelligence to make every radiation plan a precision-guided weapon.",
    coreProblemIntro: "Conventional radiotherapy is powerful, but it often treats all patients with the same condition in the same way, failing to account for critical biological differences. PrecisionRad™ Intelligence was built to solve these fundamental challenges:",
    // More aggressive problem points
    coreProblemPoints: [
      "**Standardized Planning Approaches**: Current protocols often treat tumors of the same type uniformly, overlooking critical biological differences that influence treatment effectiveness.",
      "**Unseen Biological Factors**: Without deep genomic insights, clinicians lack visibility into the specific genetic drivers of a tumor's sensitivity or resistance to radiation.",
      "**Static Treatment Plans**: Initial treatment plans don't adapt to the dynamic changes in tumor biology and patient anatomy that occur during the course of therapy.",
      "**Risk of Normal Tissue Toxicity**: It is challenging to predict which patients will experience significant side effects, leading to a risk of damage to healthy tissues.",
      "**Fragmented Data**: Essential data from imaging, genomics, and clinical outcomes is often siloed, making it difficult to derive actionable insights for treatment planning."

    ],
    genomicUseCasesGrid: [
      { label: "Predicting Tumor Radiosensitivity/Radioresistance", iconName: "Activity", color: "text-blue-400" },
      { label: "Forecasting Normal Tissue Radiotoxicity", iconName: "Shield", color: "text-red-400" },
      { label: "Enabling Biologically Guided Dose Painting", iconName: "Layers", color: "text-green-400" },
      { label: "Rapid VUS Interpretation", iconName: "Lightbulb", color: "text-yellow-400" },
      { label: "Guiding Concurrent or Adjuvant Systemic Therapies", iconName: "Beaker", color: "text-purple-400" },
      { label: "Smarter Patient Stratification & Biomarker Discovery", iconName: "Users", color: "text-orange-400" }
    ],
    keyCapabilities: [
      {
        title: "AI-Enhanced Treatment Planning & Quality Assurance",
        technical: "PrecisionRad leverages deep learning AI to accelerate and refine treatment blueprints. This includes AI-assisted contouring of tumors and organs at risk (OARs) on CT/MRI scans, intelligent algorithms that propose optimal radiation beam arrangements and fluence maps, and predictive dosimetry models. Automated systems flag plans for quality assurance, ensuring adherence to best practices, while genomic insights directly inform the definition of biological target volumes, especially for radioresistant sub-regions.",
        scientific: "This AI integration drives more consistent and highly accurate target delineation, reducing inter-observer variability. It opens avenues for exploring novel, biologically-informed planning strategies where, for instance, radioresistant tumor regions identified via genomics are specifically targeted. This capability is foundational for developing sophisticated, biologically adaptive radiotherapy approaches.",
        business: `
- **Increase Efficiency:** Streamline the complex treatment planning process.
- **Improve Quality:** Enhance treatment plan consistency and quality for better patient outcomes.
- **Standardize Best Practices:** Promote uniform, high-quality care across the institution.
- **Enable Innovation:** Establish a clear pathway to advanced, adaptive, and personalized radiotherapy.
- **Enhance Reputation:** Position the clinic as an innovative leader in oncology.
`,
        genomicUseCasesParagraph: "PrecisionRad utilizes its `analyze_single_variant` AI capability to directly enhance treatment planning and QA by: \n1. **Informing target definition**: If specific tumor sub-regions are identified (e.g., through multi-sample analysis or imaging-genomic correlation) to harbor mutations predicted by the AI to confer high radioresistance (e.g., specific TP53 gain-of-function variants with strong pathogenic scores), these regions can be delineated as biological targets for dose escalation (dose painting). \n2. **Guiding selection of OAR constraints**: Germline variants analyzed by `analyze_single_variant` that indicate heightened sensitivity of certain normal tissues to radiation can inform more conservative dose constraints for those specific OARs during planning. \n3. **Contributing to QA by providing biological rationale**: When AI-driven plans incorporate dose escalation to genomically-defined resistant areas, the underlying `analyze_single_variant` predictions (pathogenicity, delta_score) provide a verifiable biological basis for these advanced planning decisions, enhancing the QA process."
      },
      {
        title: "Radio-Genomics & Biomarker Integration for Personalization",
        technical: "Our platform seamlessly integrates multi-modal patient data. This includes genomic information (germline/somatic variants analyzed via an Evo2-style `analyze_single_variant` API for functional impact scores), transcriptomics, and proteomics, alongside quantitative features extracted from CT, PET, and MRI scans via advanced radiomics pipelines. Sophisticated AI models then correlate these comprehensive molecular and imaging biomarkers with radiation response and toxicity profiles.",
        scientific: "This holistic approach provides a much deeper understanding of the biological underpinnings of tumor radiosensitivity and resistance, as well as individual predispositions to normal tissue toxicity. It enables non-invasive tumor characterization through radiomics and helps identify which patients are most likely to benefit from personalized strategies like dose escalation/de-escalation, specific radiosensitizers, or alternative therapeutic combinations based on their unique genomic and imaging profile.",
        business: `
- **Accelerate Research:** Stratify patients more effectively for clinical trials and biomarker development.
- **Attract Patients:** Draw in patients seeking advanced, personalized treatment options.
- **Support Value-Based Care:** Optimize treatment selection and resource allocation for better outcomes and cost-effectiveness.
`,
        genomicUseCasesParagraph: "PrecisionRad's integrated AI-powered `analyze_single_variant` capability is fundamental to personalizing radiation therapy. It facilitates: \n1. **Prediction of tumor radiosensitivity or resistance** based on functional impacts of somatic mutations in DNA repair/cell cycle genes. \n2. **Forecasting of normal tissue radiotoxicity** by analyzing germline variants influencing radiation susceptibility. \n3. **Enablement of biologically guided dose painting** by identifying radioresistant tumor sub-regions via their mutational profiles. \n4. **Rapid interpretation of VUS in hereditary cancer genes** for holistic patient context in radiotherapy and genetic counseling. \n5. **Guidance on concurrent/adjuvant systemic therapies** by assessing how tumor mutations affect sensitivity to those agents. \n6. **Improved patient stratification for clinical trials and discovery of novel radio-genomic biomarkers**. \nThis tailors radiation plans by understanding individual tumor/patient genomics to maximize efficacy and minimize side effects."
      },
      {
        title: "Intelligent Adaptive Radiotherapy (ART) Support",
        technical: "PrecisionRad's ART module employs AI for automated detection of anatomical and biological changes using daily/weekly on-board imaging (e.g., CBCT). It performs rapid simulations of the dosimetric impact of these changes on the current treatment plan. AI-driven algorithms then provide recommendations for replanning triggers, potentially further refined by genomic biomarkers that predict a tumor's propensity for rapid evolution or resistance development during therapy.",
        scientific: "This capability ensures more accurate and adaptive radiation dose delivery throughout the entire treatment course, responding dynamically to tumor shrinkage, swelling, or shifts in organs at risk. It enables robust research into optimal ART strategies, allowing for stratification of patients based on genomic predictors to identify who would benefit most from adaptation, thereby personalizing the adaptive approach itself.",
        business: `
- **Lead in Advanced Care:** Become a leader in responsive, adaptive cancer treatment.
- **Improve Patient Outcomes:** Proactively manage treatment to enhance efficacy and reduce complications.
- **Gain Competitive Advantage:** Offer superior, dynamic treatment management.
`,
        genomicUseCasesParagraph: "PrecisionRad's `analyze_single_variant` AI can inform ART strategies by: \n1. **Identifying tumors with genomic signatures** (e.g., mutations in genes associated with rapid clonal evolution or acquired resistance, as flagged by the AI) that may benefit most from frequent monitoring and adaptive replanning. \n2. **During adaptation**, if new imaging or biopsy data reveals emerging resistant subclones with specific mutations, the AI's functional impact assessment of these new variants can guide adjustments in the adapted plan. \n3. **Providing a biological basis for the *frequency* and *nature* of adaptations**, moving beyond purely geometric changes to incorporate predictive genomics into the ART decision loop."
      },
      {
        title: "Treatment Outcome & Toxicity Prediction",
        technical: "PrecisionRad develops advanced predictive models for Tumor Control Probability (TCP) and Normal Tissue Complication Probability (NTCP). These models uniquely incorporate not only clinical, dosimetric, and imaging data, but also crucially, detailed genomic risk factors derived from our `analyze_single_variant` AI's analysis (e.g., summed impact scores of relevant mutations). An LLM then facilitates the presentation of these personalized risk/benefit profiles in an accessible manner.",
        scientific: "This integrated approach leads to more accurate and personalized prognostication for patients. It allows for better-informed shared decision-making conversations by clearly outlining individualized predictions. Furthermore, it helps identify complex interacting factors, including specific genomic signatures and their AI-predicted functional consequences, that drive treatment success or failure, offering rich avenues for translational research.",
        business: `
- **Enhance Patient Counseling:** Improve communication and manage expectations with personalized predictions.
- **Drive Quality Improvement:** Use data for internal benchmarking and developing better survivorship plans.
- **Demonstrate Innovation:** Showcase a commitment to data-driven, patient-centered care.
`,
        genomicUseCasesParagraph: "The `analyze_single_variant` genomic engine is crucial for enhancing TCP/NTCP models within PrecisionRad by: \n1. For TCP, providing AI-derived functional impact scores (pathogenicity, delta_score) of somatic tumor mutations, quantifying their likely contribution to radioresistance (e.g., a pathogenic TP53 variant flagged by the AI) or sensitivity, directly refining outcome predictions. \n2. For NTCP, assessing germline variants analyzed by `analyze_single_variant` in pathways like DNA repair and inflammation to identify individual patient predispositions to specific radiation toxicities. \n3. These granular genomic risk factors, derived from `analyze_single_variant`'s outputs, allow for the creation of more accurate and personalized predictions of treatment success and potential side effects, improving shared decision-making."
      },
      {
        title: "Knowledge Integration & Research Support",
        technical: "The platform features an LLM for intuitive, natural language querying of extensive knowledge bases, including radiation oncology guidelines, the latest published research, and crucially, internal anonymized patient cohort data enriched with genomic findings from our `analyze_single_variant` AI. It also includes robust tools for structured data capture optimized for research, and intelligent clinical trial matching algorithms that leverage comprehensive patient profiles including detailed genomic markers.",
        scientific: "This capability actively facilitates evidence-based practice and fosters a culture of continuous learning within the clinical team. It streamlines the collection of high-quality, multi-modal data, essential for sophisticated clinical and translational research. By incorporating deep genomic insights from the AI into trial matching, it significantly improves accrual to highly relevant, genomically-informed clinical trials, advancing the science of personalized radiation oncology.",
        business: `
- **Boost Research Profile:** Elevate the institution's contribution to oncological knowledge.
- **Drive Innovation:** Support continuous quality improvement and innovation in patient care.
- **Attract Talent & Funding:** Become a magnet for top talent and research funding through a commitment to data-driven practice.
`,
        genomicUseCasesParagraph: "PrecisionRad's `analyze_single_variant` capability fuels knowledge integration and research by: \n1. **Generating standardized, AI-interpreted functional impact data (predictions, delta scores, confidence)** for every analyzed variant, creating rich, queryable genomic datasets essential for retrospective and prospective research. \n2. **Enabling researchers to investigate correlations between specific AI-predicted variant effects** (e.g., 'Likely Pathogenic' with high negative delta_score) and clinical outcomes, thereby accelerating the discovery and validation of novel radio-genomic biomarkers. \n3. **Facilitating more precise patient stratification for clinical trials** by incorporating the AI's assessment of variant pathogenicity and functional impact, moving beyond simple gene lists to actual predicted biological consequences for trial eligibility and arm assignment."
      }

    ],
    valuePropositionSections: [
      {
        audience: "For the Radiation Oncologist",
        points: [
          "**Command, Don't Guess:** Make treatment decisions based on a predictive model of biological response, not just anatomical boundaries.",
          "**Weaponize Your Data:** Fuse genomics, radiomics, and clinical outcomes into a single, actionable intelligence stream.",
          "**Dominate the Battlefield:** Deploy truly adaptive radiotherapy that outmaneuvers the enemy in real-time."
        ]
      },
      {
        audience: "For the Patient",
        points: [
          "**A Treatment Forged for You:** Receive a radiation plan engineered for your unique tumor biology, maximizing its lethality against the cancer.",
          "**Engineered to Protect:** Benefit from a plan that uses your own genetic data to minimize collateral damage to healthy tissue.",
          "**An Adaptive Shield:** Your therapy adapts as your body changes, ensuring the attack remains precise and effective throughout the entire campaign."
        ]
      },
      {
        audience: "For the Institution",
        points: [
          "**Establish Technological Supremacy:** Differentiate your institution as a center of excellence by deploying the world's most advanced radio-genomic intelligence platform.",
          "**Drive the Future of Research:** Generate high-fidelity, multi-modal data to power the next wave of discovery in radiation oncology.",
          "**Win the Value-Based War:** Deliver superior outcomes and reduce costly toxicities, proving undeniable value to patients and payers."
        ]
      }
    ],
    conclusion: "PrecisionRad™ Intelligence represents the end of the era of anatomical guesswork. By fusing deep genomic insight with advanced imaging analysis, we are transforming radiation oncology from a standardized practice into a discipline of predictive, personalized warfare. Our mission is to arm clinicians with the intelligence to deliver the right dose, to the right target, at the right time, with lethal precision."
},
  "agentic-emr": {
    slug: "agentic-emr",
    pageTitle: "AgenticEMR™ Dominance: Conquer Your Clinical Data",
    heroSubtitle: "Stop drowning in data. Start dominating it. Unleash autonomous AI agents to transform your EMR from a chaotic liability into a strategic weapon.",
    vision: "Our vision is to annihilate the clinical data problem. We deploy a swarm of specialized AI agents that conquer unstructured notes, labs, and genomic reports, fusing them into a unified, queryable intelligence layer. We don't just streamline workflows; we forge a new command and control system for clinical and research operations.",
    
    valueProps: [
      {
        audience: 'For Clinical Oncologists',
        icon: 'Users',
        points: [
          'Get a unified, longitudinal view of your patient in seconds, not hours.',
          'Instantly identify patients for mission-critical clinical trials.',
          'Arm your entire multi-disciplinary team with real-time, synthesized intelligence.'
        ]
      },
      {
        audience: 'For Research Institutions',
        icon: 'BrainCircuit',
        points: [
          'Execute cohort discovery at the speed of command.',
          'Annihilate trial recruitment bottlenecks and accelerate your research.',
          'Unlock the strategic value buried in your existing clinical data.'
        ]
      }
    ],

    coreProblemIntro: "Traditional EMRs are a disgrace. They are digital filing cabinets designed for billing, not for warfare. They create the very problems our platform was built to solve:",
    coreProblemPoints: [
      "**Data Chaos:** A disorganized flood of clinical notes, labs, pathology reports, and genomic data that makes true insight impossible.",
      "**The VUS Black Hole:** An inability to interpret the clinical significance of genomic variants, leading to diagnostic paralysis.",
      "**Manual Drudgery:** The soul-crushing, manual process of sifting through records to find patients eligible for clinical trials.",
      "**The Actionability Gap:** A complete failure to connect a genomic finding to a potential therapeutic strategy.",
      "**Fragmented Command:** A broken communication chain across the entire care team, leading to fatal delays and errors."
    ],

    keyCapabilities: [
      {
        title: "First-Principles Genomic Analysis",
        business: "Annihilate clinical uncertainty. Our platform provides definitive functional impact scores for any genetic mutation, turning ambiguity into actionable intelligence.",
        technical: "Leverages the `GenomicAnalystAgent`, powered by our Zeta Oracle, to deliver state-of-the-art variant effect prediction directly within the EMR workflow.",
        scientific: "Applies a foundational model of biology to predict pathogenicity from first principles, obsoleting the need for slow, database-lookup-based interpretation."
      },
      {
        title: "Autonomous Clinical Trial Matching",
        business: "Drastically reduce trial recruitment timelines from months to minutes. Increase patient access to novel therapies and accelerate R&D.",
        technical: "Deploys a `ClinicalTrialAgent` that uses a multi-stage process: a high-speed vector search to identify candidate trials, followed by an LLM-powered `EligibilityDeepDiveAgent` that performs a criterion-by-criterion check against the patient's full Digital Twin.",
        scientific: "Leverages advanced NLP to understand the deep biological intent of eligibility criteria, not just keyword matching."
      },
      {
        title: "Seamless `In Silico` Therapeutic Design",
        business: "Forge a direct, unbreakable link between a clinical finding and a potential cure. This is the ultimate expression of our end-to-end dominance.",
        technical: "A single click on a high-impact variant in our UI can pass its precise genomic coordinates to our integrated CRISPR Intelligence Platform, initiating a full therapeutic design workflow.",
        scientific: "Creates a true precision medicine pipeline, connecting `in silico` functional genomics directly to the tools for targeted therapeutic engineering."
      },
      {
        title: "Agentic Collaboration & Workflow Automation",
        business: "Arm your entire care team with an AI that actively participates in strategy. Automate routine intelligence gathering and decision support.",
        technical: "A real-time collaboration hub where clinicians can invoke specialized agents (e.g., `/summarize_patient_history`, `/compare_therapies`) to receive on-demand analysis directly within their workflow.",
        scientific: "Pioneers a new human-computer interaction model where AI agents act as persistent, proactive members of the clinical team."
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
   "conclusion": "The AgenticEMR™ is more than an assistant; it is an active, intelligent member of the cancer care team. By translating the vast and complex chaos of clinical data into clear, actionable intelligence, it empowers clinicians to make faster, more informed decisions. It bridges the critical gap between cutting-edge research and personalized patient care, accelerating the promise of precision oncology for every patient."
  },
  "crispr-intelligence": {
    slug: "crispr-intelligence",
    pageTitle: "CRISPR Intelligence: The Command System for Therapeutic R&D",
    heroSubtitle: "Annihilate the R&D quagmire. We replace years of guesswork with weeks of decisive, `in silico` action, forging validated therapeutic candidates with overwhelming speed and certainty.",
    vision: "Our vision is to establish the CrisPRO Intelligence Platform as the indispensable command and control system for all CRISPR-based therapeutic R&D. We will obsolete the slow, expensive, and uncertain methods of the old guard by providing a unified platform that moves from target acquisition to a validated pre-clinical asset with lethal precision.",
    
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

    coreProblemIntro: "Developing CRISPR-based therapies are a nightmare of disconnected tools and failed experiments. We have built our platform to annihilate these critical bottlenecks:",
    coreProblemPoints: [
      "**The Design Guessing Game:** Designing optimal gRNAs with high efficacy and low off-target effects is a slow, brute-force process.",
      "**The Black Hole of Outcome Analysis:** Interpreting complex NGS data from CRISPR experiments is a time-consuming, ambiguous task that stalls critical decisions.",
      "**The Translational Chasm:** A massive gap exists between a successful lab experiment and a viable therapeutic, with critical factors like immunogenicity and delivery considered far too late.",
      "**Fragmented Arsenals:** Scientists are forced to fight a modern war with a dozen disconnected, primitive tools, leading to chaos and inefficiency."
    ],

    keyCapabilities: [
      {
        title: "Predictive Guide RNA Dominance (CHOPCHOP Reforged)",
        technical: "Our platform uses advanced AI models to predict on-target efficiency and provides comprehensive, genome-wide off-target scoring. It supports all modern nuclease platforms (Cas9, Cas12, Base/Prime Editors). An integrated LLM provides a clear rationale for every design choice.",
        scientific: "Enables the rapid selection of highly potent and specific gRNAs, which is the cornerstone of any successful gene editing campaign. By computationally annihilating the risk of off-target effects from the start, we enable the confident design of any CRISPR modality.",
        business: "Dramatically accelerate the initial design phase of your R&D pipeline. By eliminating wasted resources on suboptimal gRNAs, we provide a direct path to faster, more cost-effective therapeutic development.",
        genomicUseCasesParagraph: "Our `analyze_single_variant` AI is integral to intelligent gRNA design by: \n1. **Assessing Target Site Integrity:** Before finalizing a gRNA, the AI analyzes the target genomic region for any known functional variants (SNPs) that could impact gRNA binding efficiency or PAM recognition, preventing failed edits due to patient or cell-line specific genetics. \n2. **Evaluating Potential Off-Target Impact:** For top off-target site predictions, the AI assesses if an unintended edit would fall on a known functionally important variant elsewhere in the genome, allowing for a more sophisticated risk assessment beyond simple sequence similarity. \n3. **Informing gRNA Selection Near Functional Elements:** The AI helps researchers understand if a potential gRNA target site overlaps with or is adjacent to known regulatory elements whose disruption by Cas9 cleavage could have unintended functional consequences."
      },
      {
        title: "The Zeta Oracle: First-Principles VEP & Target Validation",
        technical: "CrisPRO integrates our foundational AI engine (`analyze_single_variant` API) to deliver deep insights into any genetic variation, providing functional impact scores (`delta_score`) and confidence levels. An LLM then contextualizes these predictions, explaining their relevance to your therapeutic strategy.",
        scientific: "This is the core of our target validation capability. It allows researchers to definitively assess if a gene target harbors functional variants that might affect therapeutic efficacy, providing a clear understanding of the genetic context in any disease model or patient-derived cell line.",
        business: "By providing a thorough understanding of the target gene's genetic landscape, this feature significantly de-risks therapeutic programs. It delivers critical data to inform early-stage R&D go/no-go decisions, saving millions in wasted resources on poorly characterized targets.",
        genomicUseCasesParagraph: "The CrisPRO platform's core AI-driven `analyze_single_variant` capability provides deep genomic insights for CRISPR R&D. It enables: \n1. **Interpretation of Variants of Uncertain Significance** (VUS) in target genes to inform therapeutic strategy. \n2. **Assessment of pre-existing genetic variations** within target sequences to predict their impact on editing. \n3. **Prediction of functional consequences** for intended edits (e.g., HDR) or baseline gene function for knockouts. \n4. **Optimization of gRNA target site** selection by avoiding problematic natural variations. \n5. **Validation of genetically defined disease models** by ensuring CRISPR-introduced mutations mimic pathogenic states. \n6. **Stratification of experimental systems** to explain variability based on functional variant impacts. \nThis ensures more informed target selection, robust experimental design, accurate interpretation, and reliable disease modeling."
      },
      {
        title: "Decisive Outcome Analysis (CRISPResso2 on Steroids)",
        technical: "Our platform provides robust, automated parsing of NGS data from your CRISPR experiments. It doesn't just quantify editing efficiency; it uses our Zeta Oracle to assess the functional impact of the resulting alleles, translating a complex mess of data into a single, decisive 'Functional Knockout Score'.",
        scientific: "This AI-powered analysis delivers precise quantification of all editing outcomes, enabling detailed characterization of DNA repair pathways. It helps identify and quantify unintended events like large deletions or translocations, which are critical for safety assessment.",
        business: "Achieve faster, more reliable, and significantly more insightful analysis of your CRISPR experimental results. This provides clearer, more robust data for critical milestone reporting and internal decision-making, saving time and preventing costly misinterpretations.",
        genomicUseCasesParagraph: "The `analyze_single_variant` genomic engine enhances CRISPR outcome analysis by: \n1. **Assessing Functional Impact of Edits:** It evaluates the predicted biological consequence (e.g., pathogenicity, delta_score) of precise SNVs or small indels that occur as on-target or off-target edits, adding a layer of functional meaning beyond simple quantification. \n2. **Interpreting Allelic Heterogeneity:** When multiple distinct edited alleles are present, `analyze_single_variant` can predict the functional consequence of each, clarifying the overall biological outcome of the experiment. \n3. **Contextualizing Results:** The AI can assess if known background genetic variations in the cell line might have influenced the observed editing efficiency or repair pathway choice, aiding in a more nuanced interpretation of the results."
      },
      {
        title: "The AI Experiment Advisor & Protocol Forge",
        technical: "CrisPRO's Experiment Advisor features interactive LLM agents that act as intelligent partners in your experimental design. Based on your therapeutic goal, the AI provides dynamic, context-aware recommendations for optimal cell types, delivery methods, and analytical strategies, and can generate customizable experimental protocols on command.",
        scientific: "This capability promotes the adoption of best practices in CRISPR experimental design. The AI provides scientifically sound advice tailored to the specific application, such as appropriate vector choice for achieving high HDR rates versus efficient NHEJ, and selection of relevant controls for therapeutic validation.",
        business: "Significantly reduce experimental setup time and failure rates by optimizing designs from the outset. This accelerates the learning curve for researchers, boosting overall team productivity and improving the success rate of every experiment.",
        genomicUseCasesParagraph: "The `analyze_single_variant` engine is integral to the Experiment Advisor for CRISPR by: \n1. **Validating Therapeutic Premise:** If correcting a pathogenic variant, the AI first confirms its likely functional impact (pathogenicity, delta_score) to ensure the entire experimental premise is sound before you begin. \n2. **Guiding Disease Model Creation:** If engineering a new disease model, the AI predicts if your intended variant will produce the desired functional consequence (e.g., pathogenic loss-of-function), ensuring you build a valid model. \n3. **Prioritizing gRNA Safety:** During design, the AI can prospectively assess the potential functional impact of edits at predicted off-target sites, allowing you to select the gRNA with the safest profile to move forward with."
      }
    ],

    buildsOn: "CRISPR Intelligence is built on our two foundational weapon systems.",
    buildsOnStackPoints: [
      "**`The Zeta Oracle (Predictive AI)`**: Assesses the functional impact of any edit to validate therapeutic targets before an experiment is ever run.",
      "**`The Zeta Forge (Generative AI)`**: Designs thousands of optimal guide RNA sequences and homology repair templates in parallel.",
      "**`The `In Silico` Flywheel`**: Combines these engines to simulate entire R&D campaigns, de-risking programs and saving millions in wasted lab resources.",
      "**`CRISPR Intelligence Platform`**: A unified platform that moves from target acquisition to a validated pre-clinical asset with lethal precision.",
      "**`our Zeta Forge` powered by a 1M token context window—to generate ultra-long, multi-kilobase homology arms** .",
      "**`Smarter Stratification` We run every patient's specific KRAS variant through our Zeta Oracle. We then stratify the trial into cohorts: High-Impact KRAS,Moderate-Impact KRAS, etc. This leads to a cleaner signal and a higher probability of trial success.",

 
      
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
    conclusion: "The CRISPR Intelligence Platform transforms therapeutic design from a manual, iterative process into a scalable, AI-driven campaign. We provide the weapons to win the war against genetic disease."      
  }
}; 