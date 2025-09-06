import {
  FiCpu, FiUsers, FiFileText, FiSettings, FiEdit, FiAperture, FiBookOpen, FiCheckSquare
} from 'react-icons/fi';

export interface Agent {
  id: string;
  name: string;
  iconName: string;
  role: string;
  capabilities: string[];
  isKeyAgent: boolean;
  description?: string;
}

export const AGENTS_DATA: Agent[] = [
  {
    id: 'orchestrator',
    name: '`Orchestrator Agent`',
    iconName: 'FiSettings',
    role: 'Your AI team lead and workflow engine. It deconstructs your high-level goals and coordinates the specialist agents to deliver a comprehensive, multi-modal answer.',
    isKeyAgent: true,
    capabilities: [
      'Deconstructs complex natural language requests (e.g., "Find targets in the PI3K pathway for this patient and design a gene editing strategy").',
      'Delegates sub-tasks to the appropriate specialist agents in the correct sequence.',
      'Monitors multi-step workflows, providing real-time progress updates.',
      'Synthesizes the findings from all agents into a single, unified, and actionable report.'
    ]
  },
  {
    id: 'genomic_analyst',
    name: 'Genomic Analyst Agent',
    iconName: 'FiCpu',
    role: 'Your in-house computational biologist. It performs deep genomic analysis for therapeutic discovery, pre-clinical validation, and clinical decision support.',
    isKeyAgent: true,
    capabilities: [
      '`Variant Interpretation (Evo 2)`: Predicts the functional impact of any SNV with state-of-the-art accuracy to distinguish pathogenic drivers from benign passengers.',
      '**`Therapeutic Target Validation (CrisPRO™)`**: Identifies and annotates variants in potential drug targets to confirm their role in disease.',
      '**`Guide RNA Safety Check`**: Scans gRNA binding sites for known clinical variants in your target population that could affect binding efficiency or create off-target effects.',
      '**`Pharmacogenomics (PGx)`**: Analyzes key genes (e.g., CYP family, TPMT) to predict a patient\'s likely response to specific drugs.',
      '**`Radio-genomic Prediction`**: Assesses variants in DNA Damage Response (DDR) pathways (e.g., ATM, BRCA) to predict patient-specific radiosensitivity and toxicity risk.'
    ]
  },
  {
    id: 'clinical_data_agent',
    name: 'Clinical Data Agent',
    iconName: 'FiFileText',
    role: 'Your clinical data architect. It transforms messy, unstructured EMR data into a clean, longitudinal, and queryable patient history.',
    isKeyAgent: true,
    capabilities: [
      '**Unstructured Data Processing (AgenticEMR™):** Uses specialized NLP models to extract key entities (diagnoses, medications, procedures, timelines) from pathology reports, discharge summaries, and clinical notes.',
      '**Longitudinal Patient Timeline:** Constructs a comprehensive patient journey, mapping key clinical events over time.',
      '**Cohort Identification:** Identifies patient cohorts based on complex, multi-modal criteria (e.g., "Find all Stage III lung cancer patients with an EGFR L858R mutation who received radiation therapy").',
      '**Clinical Trial Pre-screening:** Matches patient profiles against trial eligibility criteria using the structured data it creates.'
    ]
  },
  {
    id: 'imaging_analyst',
    name: 'Medical Imaging Agent',
    iconName: 'FiAperture',
    role: 'Your virtual medical physicist and radiologist. It performs quantitative analysis on medical scans to support diagnostics and treatment planning.',
    isKeyAgent: false,
    description: "Supports the PrecisionRad™ Co-Pilot by performing automated tumor contouring, radiomic feature extraction, and tracking treatment response over time.",
    capabilities: [
        'Performs automated segmentation of tumors (GTV) and organs-at-risk (OARs) on CT and MRI scans.',
        'Extracts hundreds of quantitative radiomic features to build predictive models of treatment response.',
        'Fuses PET metabolic data with anatomical CT/MRI scans for biologically-informed targeting.',
        'Tracks changes in tumor volume and structure across multiple scans to support Adaptive Radiation Therapy (ART) decisions.'
    ]
  },
  {
    id: 'therapy_strategy_agent',
    name: 'Therapy Strategy Agent',
    iconName: 'FiEdit',
    role: 'Your in silico strategist. It designs and evaluates novel therapeutic interventions, from gene editors to radiation plans.',
    isKeyAgent: false,
    description: 'Designs novel gene editing constructs for CrisPRO™ and evaluates personalized treatment plans for PrecisionRad™.',
    capabilities: [
      'Designs and ranks thousands of guide RNA and homology-directed repair (HDR) templates for gene editing.',
      'Integrates structural biology predictions (AlphaFold) to model the downstream effect of an edit on protein function.',
      'Simulates the potential efficacy of different radiation dose-painting strategies based on fused genomic and imaging data.'
    ]
  },
  {
    id: 'knowledge_agent',
    name: 'Knowledge Agent',
    iconName: 'FiBookOpen',
    role: 'Your AI research librarian. It connects your data to the world\'s biomedical knowledge base.',
    isKeyAgent: false,
    description: 'Uses advanced Retrieval-Augmented Generation (RAG) to answer complex questions, contextualize findings, and provide evidence-based summaries.',
    capabilities: [
        'Answers complex biological questions by querying PubMed, ClinVar, drug labels, and clinical practice guidelines.',
        'Provides the specific citations and evidence supporting its conclusions.',
        'Can be configured to securely search across your internal, proprietary research documents and databases.'
    ]
  }
];

// Agent section configuration
export const AGENTS_SECTION_CONFIG = {
  sectionId: "agent-capabilities",
  title: "Your Personal AI Research Team",
  description: "Think of CrisPRO's Oncology Copilot as your personal team of highly specialized AI assistants, working together seamlessly. Each agent has a unique expertise, much like different specialists in a hospital. This 'Intelligent Agent Architecture' allows you to delegate complex tasks, from analyzing patient data to exploring treatment options, making your workflow faster and more insightful.",
  additionalAgentsTitle: "Additional Specialized Agents"
};
