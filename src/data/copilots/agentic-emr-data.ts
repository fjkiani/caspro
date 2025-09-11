import { CoPilotDetailContent } from '../../types/copilot-types';

export const agenticEmrData: CoPilotDetailContent = {
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
      technical: "Leverages advanced AI models to deliver state-of-the-art variant effect prediction directly within the EMR workflow.",
      scientific: "Applies comprehensive biological models to predict pathogenicity from first principles, providing faster and more accurate interpretation.",
      business: "Reduce clinical uncertainty by providing definitive functional impact scores for genetic mutations, transforming ambiguous results into actionable clinical intelligence."
    },
    {
      title: "Intelligent Clinical Trial Matching",
      technical: "Deploys AI agents that use multi-stage processes: high-speed vector search to identify candidate trials, followed by detailed eligibility analysis.",
      scientific: "Leverages advanced natural language processing to understand the biological intent of eligibility criteria, going beyond simple keyword matching.",
      business: "Significantly reduce trial recruitment timelines. Increase patient access to novel therapies and accelerate research."
    },
    {
      title: "Integrated Therapeutic Design",
      technical: "Seamless integration allows high-impact variants to be passed to therapeutic design platforms, initiating comprehensive drug discovery workflows.",
      scientific: "Creates a complete precision medicine pipeline, connecting functional genomics directly to targeted therapeutic development tools.",
      business: "Create direct connections between clinical findings and potential therapeutic strategies, enabling comprehensive precision medicine workflows."
    },
    {
      title: "AI-Powered Collaboration & Workflow Automation",
      technical: "Real-time collaboration platform where clinicians can invoke specialized AI agents for on-demand analysis directly within their workflow.",
      scientific: "Advances human-computer interaction by integrating AI agents as persistent, proactive members of the clinical team.",
      business: "Enhance care team efficiency with AI that actively supports clinical decision-making. Automate routine analysis and provide intelligent decision support."
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
};
