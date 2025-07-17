export interface SurvivalData {
  cancerType: string;
  nonMetastatic: number;
  metastatic: number;
}

export interface TimelineEvent {
  id: string;
  year: string;
  scientist: string;
  contribution: string;
  description: string;
}

export interface MetastasisStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  details: string;
}

export interface ClinicalCase {
  id: string;
  patientAge: number;
  cancerType: string;
  primarySite: string;
  metastaticSites: string[];
  timeToMetastasis: string;
  outcome: string;
  keyLessons: string[];
}

export interface MetastasisMechanism {
  id: string;
  name: string;
  description: string;
  keyFactors: string[];
  clinicalRelevance: string;
  therapeuticTargets: string[];
}

export interface OrganTropism {
  primaryCancer: string;
  commonMetastaticSites: string[];
  mechanisms: string[];
  survivalImpact: string;
}

// Dormancy and Secondary Growth Data Structures
export interface DormancyType {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  examples: string[];
  clinicalRelevance: string;
}

export interface DormancyProperty {
  id: string;
  name: string;
  description: string;
  mechanism: string;
  clinicalImplications: string[];
}

export interface CellState {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  duration: string;
  reactivationTriggers: string[];
}

export interface OrganTropismData {
  id: string;
  primaryCancer: string;
  commonMetastaticSites: string[];
  mechanisms: string[];
  survivalImpact: string;
  dormancyPotential: string;
  reactivationFactors: string[];
}

export interface ClinicalEvidenceData {
  id: string;
  title: string;
  finding: string;
  implication: string;
  source: string;
}

export interface ReactivationTrigger {
  id: string;
  trigger: string;
  mechanism: string;
  examples: string[];
  analogy: string;
}

export interface TherapeuticStrategy {
  id: string;
  strategy: string;
  approach: string;
  rationale: string;
  challenges: string[];
  clinicalStatus: string;
}

// Morbidity and Mortality Interfaces
export interface MorbidityMortalityIntroduction {
  title: string;
  description: string;
  keyInsights: string[];
}

export interface OrganSpecificMetastasis {
  id: string;
  organ: string;
  description: string;
  mechanisms: string[];
  clinicalImpact: string;
  examples: string[];
}

export interface CancerPoison {
  id: string;
  name: string;
  description: string;
  effects: string[];
  mechanism: string;
  clinicalRelevance: string;
}

export interface PoisonSyndrome {
  id: string;
  name: string;
  description: string;
  prevalence: string;
  symptoms: string[];
  mechanism: string;
  prognosis: string;
}

export interface VirchowTriadComponent {
  id: string;
  component: string;
  description: string;
  cancerConnection: string;
  examples: string[];
}

export interface MortalityMechanism {
  id: string;
  mechanism: string;
  description: string;
  frequency: string;
  examples: string[];
  prevention: string;
}

// Existing data
export const metastasisSurvivalData: SurvivalData[] = [
  { cancerType: 'Prostate', nonMetastatic: 100, metastatic: 29 },
  { cancerType: 'Breast', nonMetastatic: 99, metastatic: 23 },
  { cancerType: 'Colorectal', nonMetastatic: 90, metastatic: 12 },
  { cancerType: 'Stomach', nonMetastatic: 62, metastatic: 4 },
  { cancerType: 'Lung', nonMetastatic: 52, metastatic: 4 },
  { cancerType: 'Liver', nonMetastatic: 28, metastatic: 2 }
];

export const metastasisTimeline: TimelineEvent[] = [
  {
    id: 'recamier-1829',
    year: '1829',
    scientist: 'Joseph Recamier',
    contribution: 'Coined the term "metastasis"',
    description: 'First to describe the spread of cancer from one part of the body to another.'
  },
  {
    id: 'virchow-1858',
    year: '1858',
    scientist: 'Rudolf Virchow',
    contribution: 'Mechanical theory',
    description: 'Proposed that metastasis was mechanical: cancer cells simply broke off and got stuck in distant blood vessels.'
  },
  {
    id: 'paget-1889',
    year: '1889',
    scientist: 'Stephen Paget',
    contribution: 'Seed and Soil hypothesis',
    description: 'Introduced the "Seed and Soil" hypothesis, arguing that cancer cells ("seeds") can only grow in specific, hospitable organs ("congenial soil").'
  },
  {
    id: 'ewing-1928',
    year: '1928',
    scientist: 'James Ewing',
    contribution: 'Anatomical route theory',
    description: 'Challenged Paget, suggesting metastasis was determined purely by the anatomical routes of blood and lymph flow.'
  },
  {
    id: 'fidler-1970s',
    year: '1970s',
    scientist: 'Josh Fidler',
    contribution: 'Multi-step process synthesis',
    description: 'Synthesized all previous theories, demonstrating that metastasis is a multi-step process involving specific cancer cell capabilities and their interaction with the microenvironment.'
  }
];

export const metastasisCascade: MetastasisStep[] = [
  {
    id: 'primary-growth',
    stepNumber: 1,
    title: 'Primary Tumor Growth',
    description: 'Uncontrolled proliferation forms a tumor mass.',
    details: 'Cancer cells acquire the ability to grow and divide uncontrollably, forming the initial tumor.'
  },
  {
    id: 'angiogenesis',
    stepNumber: 2,
    title: 'Angiogenesis',
    description: 'Tumor induces new, leaky blood vessels.',
    details: 'The tumor secretes factors like VEGF to stimulate blood vessel formation, providing nutrients and oxygen.'
  },
  {
    id: 'emt',
    stepNumber: 3,
    title: 'EMT',
    description: 'Cells become mobile and invasive.',
    details: 'Epithelial-Mesenchymal Transition: cells lose adhesion and gain migratory properties.'
  },
  {
    id: 'invasion',
    stepNumber: 4,
    title: 'Invasion',
    description: 'Mobile cells break through local tissue barriers.',
    details: 'Cancer cells invade surrounding tissue by breaking down the extracellular matrix.'
  },
  {
    id: 'intravasation',
    stepNumber: 5,
    title: 'Intravasation',
    description: 'Cancer cells enter blood or lymphatic vessels.',
    details: 'Invasive cancer cells breach vascular walls to enter the circulatory system.'
  },
  {
    id: 'circulation',
    stepNumber: 6,
    title: 'Circulation & Survival',
    description: 'Cells survive the hostile circulatory environment.',
    details: 'Most circulating tumor cells die, but some survive mechanical stress and immune attacks.'
  },
  {
    id: 'extravasation',
    stepNumber: 7,
    title: 'Extravasation',
    description: 'Surviving cells exit circulation at distant sites.',
    details: 'Circulating tumor cells adhere to vessel walls and extravasate into target tissues.'
  },
  {
    id: 'colonization',
    stepNumber: 8,
    title: 'Colonization',
    description: 'Establishment of secondary tumors.',
    details: 'Extravasated cells adapt to the new microenvironment and form metastatic colonies.'
  }
];

// New comprehensive data for Module 2

export const metastasisIntroduction = {
  title: 'Understanding Cancer Metastasis',
  description: 'Metastasis is the process by which cancer cells spread from their original location to other parts of the body. It is responsible for approximately 90% of cancer-related deaths, making it the most critical aspect of cancer biology to understand. This module will take you through the complex journey of metastatic progression, from the initial steps of local invasion to the establishment of distant colonies.'
};

export const clinicalCases: ClinicalCase[] = [
  {
    id: 'breast-to-bone',
    patientAge: 52,
    cancerType: 'Invasive Ductal Carcinoma',
    primarySite: 'Left Breast',
    metastaticSites: ['Spine', 'Ribs', 'Pelvis'],
    timeToMetastasis: '18 months post-diagnosis',
    outcome: 'Managed with targeted therapy and bisphosphonates',
    keyLessons: [
      'Bone is a common site for breast cancer metastasis due to CXCR4/CXCL12 signaling',
      'Early detection through bone scans can improve outcomes',
      'Bone-targeting agents can prevent skeletal complications'
    ]
  },
  {
    id: 'lung-to-brain',
    patientAge: 67,
    cancerType: 'Non-Small Cell Lung Cancer',
    primarySite: 'Right Upper Lobe',
    metastaticSites: ['Brain', 'Liver'],
    timeToMetastasis: '8 months post-diagnosis',
    outcome: 'Treated with stereotactic radiosurgery and immunotherapy',
    keyLessons: [
      'Brain metastases occur in 20-40% of lung cancer patients',
      'Blood-brain barrier poses challenges for systemic therapy',
      'Local treatments like SRS can provide effective disease control'
    ]
  },
  {
    id: 'colon-to-liver',
    patientAge: 59,
    cancerType: 'Colorectal Adenocarcinoma',
    primarySite: 'Sigmoid Colon',
    metastaticSites: ['Liver'],
    timeToMetastasis: 'Synchronous (present at diagnosis)',
    outcome: 'Surgical resection after neoadjuvant chemotherapy',
    keyLessons: [
      'Liver is the most common site for colorectal metastasis via portal circulation',
      'Surgical resection can be curative in selected patients',
      'Neoadjuvant therapy can convert unresectable to resectable disease'
    ]
  }
];

export const metastasisMechanisms: MetastasisMechanism[] = [
  {
    id: 'emt-mechanism',
    name: 'Epithelial-Mesenchymal Transition (EMT)',
    description: 'A cellular program that allows epithelial cells to lose their adhesive properties and gain migratory and invasive capabilities.',
    keyFactors: ['Loss of E-cadherin', 'Gain of vimentin', 'Snail/Slug transcription factors', 'TGF-β signaling'],
    clinicalRelevance: 'EMT markers correlate with poor prognosis and therapeutic resistance',
    therapeuticTargets: ['TGF-β inhibitors', 'EMT transcription factors', 'Adhesion molecules']
  },
  {
    id: 'angiogenesis-mechanism',
    name: 'Tumor Angiogenesis',
    description: 'The formation of new blood vessels from existing vasculature to supply nutrients to growing tumors.',
    keyFactors: ['VEGF signaling', 'Hypoxia-inducible factors', 'Angiopoietins', 'FGF signaling'],
    clinicalRelevance: 'Angiogenesis enables tumor growth and provides routes for metastatic dissemination',
    therapeuticTargets: ['VEGF inhibitors', 'Tyrosine kinase inhibitors', 'Angiopoietin inhibitors']
  },
  {
    id: 'immune-evasion',
    name: 'Immune System Evasion',
    description: 'Mechanisms by which cancer cells avoid detection and destruction by the immune system.',
    keyFactors: ['PD-L1 expression', 'Loss of MHC class I', 'Immunosuppressive cytokines', 'Regulatory T cells'],
    clinicalRelevance: 'Immune evasion enables tumor progression and metastatic spread',
    therapeuticTargets: ['Checkpoint inhibitors', 'CAR-T cells', 'Cancer vaccines', 'Adoptive cell therapy']
  },
  {
    id: 'dormancy-mechanism',
    name: 'Metastatic Dormancy',
    description: 'A state where disseminated tumor cells remain viable but non-proliferative for extended periods.',
    keyFactors: ['Cell cycle arrest', 'Balanced proliferation/apoptosis', 'Microenvironmental factors', 'Immune surveillance'],
    clinicalRelevance: 'Dormant cells can reactivate years later, causing late recurrences',
    therapeuticTargets: ['Dormancy maintenance', 'Reactivation prevention', 'Dormant cell elimination']
  }
];

export const organTropism: OrganTropism[] = [
  {
    primaryCancer: 'Breast Cancer',
    commonMetastaticSites: ['Bone', 'Liver', 'Lung', 'Brain'],
    mechanisms: ['CXCR4/CXCL12 signaling', 'Osteomimicry', 'VEGF expression'],
    survivalImpact: 'Bone metastases: 2-3 years median survival'
  },
  {
    primaryCancer: 'Lung Cancer',
    commonMetastaticSites: ['Brain', 'Bone', 'Liver', 'Adrenal glands'],
    mechanisms: ['Blood-brain barrier disruption', 'Neurotrophin signaling'],
    survivalImpact: 'Brain metastases: 4-6 months median survival'
  },
  {
    primaryCancer: 'Colorectal Cancer',
    commonMetastaticSites: ['Liver', 'Lung', 'Peritoneum'],
    mechanisms: ['Portal circulation', 'CEA-mediated adhesion'],
    survivalImpact: 'Liver metastases: 6-20 months median survival'
  },
  {
    primaryCancer: 'Prostate Cancer',
    commonMetastaticSites: ['Bone', 'Lymph nodes'],
    mechanisms: ['Osteoblastic factors', 'PSA signaling'],
    survivalImpact: 'Bone metastases: 1-3 years median survival'
  },
  {
    primaryCancer: 'Melanoma',
    commonMetastaticSites: ['Brain', 'Liver', 'Lung', 'Skin'],
    mechanisms: ['Neural crest cell properties', 'Neurotropism'],
    survivalImpact: 'Brain metastases: 4-5 months median survival'
  }
];

export const therapeuticStrategies = [
  {
    category: 'Prevention Strategies',
    approaches: [
      'Adjuvant chemotherapy to eliminate micrometastases',
      'Anti-angiogenic therapy to prevent vascular supply',
      'EMT inhibitors to prevent cell mobility',
      'Immune checkpoint inhibitors to enhance surveillance'
    ]
  },
  {
    category: 'Early Detection',
    approaches: [
      'Circulating tumor cell (CTC) monitoring',
      'Circulating tumor DNA (ctDNA) analysis',
      'Advanced imaging techniques',
      'Biomarker panels for metastatic risk'
    ]
  },
  {
    category: 'Targeted Interventions',
    approaches: [
      'Site-specific therapies (e.g., bone-targeting agents)',
      'Pathway-specific inhibitors',
      'Combination therapies targeting multiple steps',
      'Personalized medicine based on tumor genetics'
    ]
  },
  {
    category: 'Emerging Approaches',
    approaches: [
      'Metastasis-suppressor gene therapy',
      'Nanoparticle drug delivery systems',
      'Immunotherapy combinations',
      'Artificial intelligence-guided treatment selection'
    ]
  }
];

// Tumor Microenvironment data
export const tumorMicroenvironmentData = {
  introduction: {
    title: "The Tumor Microenvironment: A Complex Cellular Ecosystem",
    description: "Tumors don't exist in isolation - they're surrounded by a diverse community of cells that can either support or inhibit cancer progression.",
    keyPoints: [
      "Tumors contain many cell types beyond cancer cells",
      "Communication between cells drives tumor progression",
      "Microenvironment influences growth and metastasis",
      "Understanding this ecosystem reveals therapeutic targets"
    ]
  },
  
  microenvironmentComponents: [
    {
      id: "cancer-cells",
      name: "Cancer Cells",
      description: "The malignant cells that drive tumor formation and progression",
      role: "Primary drivers of tumor growth, invasion, and metastasis",
      characteristics: [
        "Abnormal proliferation",
        "Resistance to cell death",
        "Invasive capabilities",
        "Metabolic reprogramming"
      ],
      color: "red"
    },
    {
      id: "normal-cells",
      name: "Normal Cells",
      description: "Healthy cells that become part of the tumor environment",
      role: "Can be co-opted to support tumor growth or may resist cancer progression",
      characteristics: [
        "Maintain normal functions",
        "May be influenced by cancer signals",
        "Can provide structural support",
        "May compete for resources"
      ],
      color: "blue"
    },
    {
      id: "blood-vessels",
      name: "Blood Vessels & Blood Cells",
      description: "Vascular network providing nutrients and oxygen to the tumor",
      role: "Essential for tumor growth beyond 2-3mm and metastatic spread",
      characteristics: [
        "Often structurally abnormal",
        "Increased permeability",
        "Provide metastatic pathways",
        "Deliver immune cells"
      ],
      color: "purple"
    },
    {
      id: "extracellular-matrix",
      name: "Extracellular Matrix (ECM)",
      description: "Network of proteins and carbohydrates providing structural support",
      role: "Acts as barrier to invasion but can be remodeled by cancer cells",
      characteristics: [
        "Composed of collagen, fibronectin, laminin",
        "Provides tissue structure",
        "Barrier to cancer cell invasion",
        "Can be degraded by matrix metalloproteinases"
      ],
      color: "green"
    },
    {
      id: "neurons",
      name: "Neurons",
      description: "Nerve cells connecting brain to body tissues",
      role: "Can promote tumor growth through neurotransmitters and provide invasion routes",
      characteristics: [
        "Secrete neurotransmitters and peptides",
        "Some molecules promote tumor growth",
        "Can serve as invasion highways",
        "Present in most tissues"
      ],
      color: "yellow"
    },
    {
      id: "fibroblasts",
      name: "Fibroblasts & CAFs",
      description: "Connective tissue cells that produce structural fibers",
      role: "Cancer-Associated Fibroblasts (CAFs) actively promote tumor progression",
      characteristics: [
        "Produce collagen and other fibers",
        "CAFs secrete growth factors",
        "Promote EMT and invasion",
        "Support angiogenesis"
      ],
      color: "orange"
    },
    {
      id: "adipose-tissue",
      name: "Adipose Tissue",
      description: "Fat cells found throughout the body",
      role: "White adipose tissue (WAT) can promote tumor formation and progression",
      characteristics: [
        "Linked to increased cancer risk",
        "Secretes pro-tumorigenic proteins",
        "Promotes EMT and invasion",
        "Associated with obesity"
      ],
      color: "pink"
    },
    {
      id: "immune-cells",
      name: "Immune Cells",
      description: "White blood cells with complex pro- and anti-cancer roles",
      role: "Can either eliminate cancer cells or be co-opted to support tumor growth",
      characteristics: [
        "Include T cells, B cells, macrophages",
        "Some kill abnormal cancer cells",
        "Others suppress immune responses",
        "Can travel with metastatic cells"
      ],
      color: "teal"
    }
  ],

  macrophagePolarization: {
    title: "Macrophage Polarization: A Key Example",
    description: "Macrophages demonstrate the complexity of immune cell roles in cancer",
    m1Macrophages: {
      name: "M1 Macrophages",
      role: "Anti-cancer",
      characteristics: [
        "Pro-inflammatory",
        "Stimulate immune responses",
        "Promote cancer cell death",
        "Respond to infection/stress"
      ],
      color: "green"
    },
    m2Macrophages: {
      name: "M2 Macrophages",
      role: "Pro-cancer",
      characteristics: [
        "Immunosuppressive",
        "Pro-angiogenic",
        "Favor tumor growth",
        "Suppress other immune cells"
      ],
      color: "red"
    }
  },

  secretedMolecules: {
    title: "Secreted Molecules: Chemical Communication",
    description: "Cells communicate through various secreted factors that influence tumor behavior",
    categories: [
      {
        name: "Growth Factors",
        examples: ["VEGF", "PDGF", "TGF-β"],
        effects: "Promote cell division and angiogenesis"
      },
      {
        name: "Cytokines",
        examples: ["IL-6", "TNF-α", "Interferons"],
        effects: "Regulate immune responses"
      },
      {
        name: "Chemokines",
        examples: ["CXCL12", "CCL2"],
        effects: "Direct cell migration and invasion"
      },
      {
        name: "Matrix Metalloproteinases",
        examples: ["MMP-2", "MMP-9"],
        effects: "Degrade ECM to enable invasion"
      }
    ]
  }
};

// EMT and Invasion data
export const emtInvasionData = {
  introduction: {
    title: "Epithelial-Mesenchymal Transition & Invasion",
    description: "Understanding how cancer cells gain the ability to move and invade surrounding tissues through EMT and local invasion mechanisms.",
    keyPoints: [
      "EMT enables proliferative epithelial cells to gain motility",
      "Go vs Grow hypothesis explains the balance between proliferation and migration",
      "ECM plays both supportive and barrier roles in invasion",
      "Invasion occurs through individual and collective cell movement"
    ]
  },

  goVsGrowConcept: {
    title: "The Go vs Grow Hypothesis",
    description: "Normal cells can proliferate, move, or differentiate - but typically not simultaneously. Cancer cells challenge this paradigm.",
    normalCellStates: [
      {
        state: "Proliferate (Grow)",
        description: "High cell division rate",
        characteristics: ["Rapid DNA replication", "Active cell cycle", "Low motility", "Tissue maintenance"]
      },
      {
        state: "Migrate (Go)",
        description: "High motility and movement",
        characteristics: ["Active cytoskeleton", "ECM interactions", "Low proliferation", "Wound healing"]
      },
      {
        state: "Differentiate",
        description: "Terminal specialization",
        characteristics: ["Specialized function", "No proliferation", "No migration", "Tissue-specific roles"]
      }
    ],
    cancerModification: {
      title: "Cancer's Mixed Phenotype",
      description: "Cancer cells show a spectrum rather than all-or-nothing states",
      keyInsights: [
        "Primary tumor cells: High proliferation, low motility",
        "Metastatic cells: High motility, low proliferation", 
        "Many cancer cells show moderate levels of both simultaneously",
        "EMT enables the transition from proliferative to migratory"
      ]
    }
  },

  emtProcess: {
    title: "Epithelial-Mesenchymal Transition (EMT)",
    description: "The reversible process where epithelial cells lose epithelial characteristics and gain mesenchymal properties.",
    history: "First described by Elizabeth Hay in 1968, remains an active research area",
    
    epithelialCharacteristics: {
      name: "Epithelial Cells",
      morphology: "Cuboidal shape with apicobasal polarity",
      adhesion: "Strong cell-cell interactions and ECM binding",
      function: "Highly proliferative, non-motile",
      location: "Line body cavities (skin, intestine, organs)",
      junctionTypes: [
        {
          type: "Tight Junctions",
          function: "Prevent infiltration between cells",
          proteins: "Claudins",
          location: "Apical surface"
        },
        {
          type: "Adherens Junctions", 
          function: "Mechanical attachment via actin cytoskeleton",
          proteins: "Cadherins",
          location: "Below tight junctions"
        },
        {
          type: "Gap Junctions",
          function: "Direct cytoplasmic communication",
          proteins: "Connexins",
          location: "Throughout lateral membrane"
        },
        {
          type: "Desmosomes",
          function: "Mechanical strength via intermediate filaments",
          proteins: "Desmoplakin",
          location: "Throughout lateral membrane"
        }
      ],
      markers: ["E-cadherin", "Cytokeratins", "Tight junction proteins"],
      color: "blue"
    },

    mesenchymalCharacteristics: {
      name: "Mesenchymal Cells",
      morphology: "Spindle-like shape with front-back polarity",
      adhesion: "No direct cell-cell binding, ECM interactions via focal adhesions",
      function: "Highly migratory, lower proliferation",
      capabilities: [
        "Differentiate into multiple cell types",
        "Regulate immune/inflammatory responses", 
        "Modulate surrounding cells",
        "Essential for development and wound healing"
      ],
      markers: ["N-cadherin", "Fibronectin", "Vimentin", "α-SMA"],
      color: "orange"
    },

    emtSpectrum: {
      title: "EMT as a Continuum",
      description: "EMT in cancer is not binary - cells exist on a spectrum between epithelial and mesenchymal states",
      clinicalAssessment: [
        "Morphology: Cuboidal → Spindle-like",
        "Adhesion proteins: E-cadherin → N-cadherin/Fibronectin", 
        "Cell-cell interactions: High → Low",
        "Cytoskeleton: Cytokeratins → Vimentin",
        "Function: Proliferative → Migratory"
      ]
    },

    emtInducers: {
      title: "Microenvironmental EMT Triggers",
      description: "Tumor microenvironment factors that promote EMT",
      factors: [
        {
          factor: "TGF-β",
          source: "Fibroblasts, immune cells",
          mechanism: "Transcriptional reprogramming",
          effect: "Strong EMT inducer"
        },
        {
          factor: "IL-6 & IL-4", 
          source: "M2 macrophages",
          mechanism: "Inflammatory signaling",
          effect: "Promotes mesenchymal transition"
        },
        {
          factor: "Reactive Oxygen Species",
          source: "Hypoxic conditions",
          mechanism: "Oxidative stress signaling",
          effect: "Destabilizes epithelial state"
        },
        {
          factor: "Hypoxia",
          source: "Poor vascularization",
          mechanism: "HIF-1α activation",
          effect: "Promotes invasion and EMT"
        }
      ]
    },

    metReversibility: {
      title: "Mesenchymal-Epithelial Transition (MET)",
      description: "The reverse process essential for metastatic colonization",
      importance: "Migrated cells must regain proliferative capacity to form secondary tumors",
      regulation: "Controlled by epigenetic mechanisms, not genetic mutations",
      clinicalRelevance: "Explains why metastases often resemble primary tumors histologically"
    }
  },

  invasionMechanisms: {
    title: "Local Invasion Mechanisms",
    description: "How cancer cells break through tissue barriers and invade surrounding areas",
    
    ecmStructure: {
      title: "Extracellular Matrix (ECM) Composition",
      description: "Web-like matrix providing structural support for cells",
      components: [
        "Collagens (structural strength)",
        "Fibronectin (cell adhesion)",
        "Laminins (basement membrane)",
        "Proteoglycans (hydration and signaling)"
      ],
      organization: [
        {
          type: "Basement Membrane",
          function: "Cell binding surface, tissue separation",
          location: "Directly adjacent to cells"
        },
        {
          type: "Interstitial Matrix", 
          function: "Tensile strength, cell spacing",
          location: "Between cells in tissue"
        }
      ]
    },

    ecmParadox: {
      title: "ECM: Helper and Hindrance",
      description: "Cancer cells must simultaneously use and destroy the ECM for invasion",
      dualRole: [
        {
          aspect: "ECM as Support",
          description: "Cells need ECM for attachment and movement",
          mechanism: "Focal adhesions provide anchor points for migration"
        },
        {
          aspect: "ECM as Barrier",
          description: "ECM blocks invasion pathways",
          mechanism: "Must be degraded to create space for invasion"
        }
      ]
    },

    migrationProcess: {
      title: "Mesenchymal Cell Migration",
      description: "Four-step process of cell movement through ECM",
      steps: [
        {
          step: 1,
          name: "Protrusion",
          description: "Cell extends pseudopodia (false foot) in direction of movement",
          mechanism: "Actin polymerization drives membrane extension"
        },
        {
          step: 2,
          name: "Adhesion",
          description: "Pseudopodia forms focal adhesions with ECM",
          mechanism: "Integrin clusters link to ECM proteins"
        },
        {
          step: 3,
          name: "Contraction",
          description: "Cell body contracts toward leading edge",
          mechanism: "Myosin-actin interaction generates force"
        },
        {
          step: 4,
          name: "Release",
          description: "Rear focal adhesions detach, allowing forward movement",
          mechanism: "Adhesion disassembly at cell rear"
        }
      ]
    },

    invasionModes: {
      title: "Modes of Cancer Cell Invasion",
      description: "Cancer cells can invade individually or collectively",
      individualModes: [
        {
          type: "Mesenchymal Migration",
          description: "Elongated cells using focal adhesions",
          characteristics: ["Spindle morphology", "ECM degradation", "Proteolytic activity"]
        },
        {
          type: "Amoeboid Migration", 
          description: "Rounded cells with gliding movement",
          characteristics: ["Blob-like morphology", "Squeezing through gaps", "Less ECM degradation"]
        }
      ],
      collectiveMode: {
        type: "Collective Migration",
        description: "Groups of cells moving together",
        requirements: ["Cell-cell communication", "Cell-cell adhesion", "Coordinated ECM interactions"],
        advantages: ["Maintains some epithelial features", "Collective decision-making", "Enhanced survival"]
      }
    },

    ecmRemodeling: {
      title: "ECM Degradation and Remodeling",
      description: "How cancer cells break down tissue barriers",
      normalRemodeling: "Tightly regulated destruction and rebuilding of ECM",
      cancerDeregulation: [
        "Increased protease expression and secretion",
        "Host cell recruitment contributes to degradation",
        "Patchy and unstable ECM formation",
        "Enhanced permissibility to invasion"
      ],
      keyProteases: [
        {
          enzyme: "Matrix Metalloproteinases (MMPs)",
          targets: "Collagens, fibronectin, laminin",
          regulation: "Overexpressed in cancer"
        },
        {
          enzyme: "Cathepsins",
          targets: "Various ECM proteins",
          regulation: "Increased secretion in tumors"
        }
      ]
    },

    invasionTypes: {
      title: "Types of Cancer Invasion",
      description: "Local and regional invasion patterns",
      localInvasion: {
        definition: "Invasion within the organ of origin",
        example: "Prostate cancer invading healthy prostate tissue",
        significance: "Early stage of invasion process"
      },
      regionalInvasion: {
        definition: "Invasion into adjacent tissues/organs",
        example: "Bladder cancer invading local fat tissue",
        significance: "Important for tumor staging and prognosis"
      },
      clinicalRelevance: "Invasion depth and extent determine treatment options and outcomes"
    },

    intravasation: {
      title: "Intravasation: Specialized Invasion into Vessels",
      description: "The process by which cancer cells invade through vessel walls to enter circulation or lymphatic system",
      definition: "Intravasation is the invasion of cancer cells through blood or lymphatic vessel walls to gain access to systemic circulation",
      
      intravasationSteps: [
        {
          step: 1,
          name: "ECM Degradation",
          description: "Cancer cell degrades extracellular matrix surrounding vessel",
          mechanism: "Same proteolytic processes used in local invasion",
          location: "Around blood/lymphatic vessel walls"
        },
        {
          step: 2,
          name: "Basement Membrane Remodeling", 
          description: "Breakdown of basement membrane surrounding endothelial cells",
          mechanism: "Matrix metalloproteinases target laminin and collagen IV",
          location: "Vessel basement membrane"
        },
        {
          step: 3,
          name: "Endothelial Disruption",
          description: "Physical disruption of endothelial cell-cell contacts",
          mechanism: "Breaking tight junctions and adherens junctions",
          location: "Between endothelial cells"
        },
        {
          step: 4,
          name: "Shape Deformation & Entry",
          description: "Cancer cell deforms to squeeze through degraded vessel wall",
          mechanism: "Cytoskeletal reorganization enables shape changes",
          location: "Through vessel wall into lumen"
        }
      ],

      intravasationModes: {
        title: "Active vs Passive Intravasation",
        description: "Cancer cells can enter vessels through different mechanisms",
        activeMode: {
          name: "Active Intravasation",
          description: "Tumor cell actively migrates into capillary wall",
          characteristics: [
            "Cell-directed migration toward vessels",
            "Active remodeling of endothelial-associated ECM",
            "Coordinated invasion process",
            "Requires significant cellular energy"
          ],
          mechanism: "Cancer cells actively seek out and invade vessel walls",
          color: "red"
        },
        passiveMode: {
          name: "Passive Intravasation", 
          description: "Cells fall into blood/lymph stream by chance",
          characteristics: [
            "Opportunistic entry into circulation",
            "Relies on vessel proximity and fragility",
            "Less coordinated process",
            "Dependent on tumor vascularization"
          ],
          mechanism: "Made possible by disorganized sinusoidal capillaries from rapid neoangiogenesis",
          color: "blue"
        }
      },

      vesselTargets: {
        title: "Intravasation Targets",
        description: "Cancer cells can enter different types of vessels",
        bloodVessels: {
          type: "Blood Vessels",
          description: "Entry into systemic circulation",
          characteristics: [
            "Direct access to distant organs",
            "High-pressure environment",
            "Requires survival in bloodstream",
            "Leads to hematogenous metastasis"
          ],
          challenges: ["Immune surveillance", "Shear stress", "Lack of adhesion support"]
        },
        lymphaticVessels: {
          type: "Lymphatic Vessels", 
          description: "Entry into lymphatic system",
          characteristics: [
            "Lower pressure environment",
            "Natural drainage pathway",
            "Access to lymph nodes",
            "Common early metastatic route"
          ],
          challenges: ["Lymph node filtration", "Immune cell encounters", "Slower circulation"]
        }
      },

      clinicalSignificance: {
        title: "Clinical Importance of Intravasation",
        description: "Understanding intravasation helps explain metastatic patterns and timing",
        keyPoints: [
          "Represents transition from local to systemic disease",
          "Timing affects prognosis and treatment options", 
          "Different efficiency between cancer types",
          "Target for therapeutic intervention"
        ],
        therapeuticTargets: [
          "Matrix metalloproteinase inhibitors",
          "Anti-angiogenic agents to normalize vasculature",
          "Endothelial barrier stabilizers",
          "Invasion pathway inhibitors"
        ]
      }
    }
  }
};

// Circulation Survival and Extravasation data
export const circulationExtravasationData = {
  introduction: {
    title: "Circulation Survival & Extravasation",
    description: "Understanding how cancer cells survive the hostile circulation environment and successfully exit to establish metastases.",
    keyPoints: [
      "CTCs must survive anoikis, immune surveillance, and shear stress",
      "Metastasis suppressor genes are lost in metastatic cancer cells",
      "CTCs associate with other cell types for protection and assistance",
      "Extravasation involves chemokine homing and dock-and-lock mechanisms"
    ]
  },

  keyDefinitions: [
    {
      term: "Anoikis",
      definition: "A form of programmed cell death when cells detach from their native extracellular matrix (ECM)",
      significance: "Normal cells die without ECM attachment; cancer cells must evade this"
    },
    {
      term: "Circulating Tumor Cell (CTC)",
      definition: "A tumor cell that has entered the bloodstream and lymphatics and is able to survive",
      significance: "CTCs are the vehicles of metastatic spread"
    },
    {
      term: "Metastasis Suppressor Genes",
      definition: "Genes that act to slow or prevent metastases; these genes are lost in cancer cells",
      significance: "Loss of these genes dramatically increases metastatic ability"
    },
    {
      term: "Extravasation",
      definition: "Movement of cancer cells out of a blood vessel into tissues during metastasis",
      significance: "Final step before establishing secondary tumors"
    },
    {
      term: "Disseminated Tumor Cell (DTC)",
      definition: "A CTC that has left the circulation for a distant, secondary site",
      significance: "Represents successful completion of metastatic journey"
    }
  ],

  lymphaticSystem: {
    title: "The Lymphatic System in Metastasis",
    description: "Cancer cells can enter circulation through lymphatic vessels, providing an alternative route to hematogenous spread",
    structure: {
      composition: "Lymphatic vessels carry lymph fluid containing water, white blood cells (leukocytes), proteins, fats, and sugars",
      function: "Transports fluid from tissues to lymph nodes, then deposits into bloodstream; acts as immunological defense",
      circulation: [
        {
          type: "Pulmonary Circulation",
          description: "Lymph nodes intertwined with blood capillaries in lung circulation"
        },
        {
          type: "Systemic Circulation", 
          description: "Lymph nodes connected to blood capillaries throughout the body"
        }
      ]
    },
    metastaticAdvantage: {
      title: "Lymphatic Route to Systemic Circulation",
      description: "Cancer cells can reach bloodstream without directly intravasating blood vessels",
      pathway: [
        "Cancer cells intravasate lymphatic vessels",
        "Travel through lymphatic system to lymph nodes",
        "Lymph drains into venous circulation",
        "Cancer cells enter systemic bloodstream"
      ],
      clinicalEvidence: "Lymph node involvement commonly observed in cancer staging and prognosis"
    }
  },

  metastasisSuppressorGenes: {
    title: "Metastasis Suppressor Genes",
    description: "Specific genes lost in metastatic cancer cells that normally prevent metastatic spread",
    knownGenes: [
      {
        gene: "CD82 (KAI1)",
        function: "Allows normal cells to bind DARC on endothelial cells, preventing circulation",
        lossEffect: "Cancer cells can travel freely in circulation without getting stuck",
        cancerType: "Particularly important in prostate cancer"
      },
      {
        gene: "MAP Kinase 4",
        function: "Regulates cellular stress responses and apoptosis",
        lossEffect: "Enhanced survival under stress conditions"
      },
      {
        gene: "RKIP",
        function: "Inhibits metastasis-promoting signaling pathways",
        lossEffect: "Increased invasive and metastatic potential"
      },
      {
        gene: "NM23-H1/H2",
        function: "Nucleoside diphosphate kinases involved in cell motility regulation",
        lossEffect: "Enhanced cell motility and metastatic spread"
      },
      {
        gene: "KISS1",
        function: "Encodes metastin, a metastasis suppressor peptide",
        lossEffect: "Loss of metastatic suppression signals"
      }
    ],
    cd82Mechanism: {
      title: "CD82/KAI1 Detailed Mechanism",
      normalFunction: "Enables normal cells to bind Duffy Antigen Chemokine Receptor (DARC) on endothelial cells",
      normalOutcome: "Cells get stuck and cannot traverse circulation",
      cancerLoss: "Cancer cells lose CD82 expression, particularly in prostate cancer",
      cancerOutcome: "Cells can travel to distant sites and activate oncogenes like Src"
    }
  },

  anoikisResistance: {
    title: "Anoikis Resistance in Cancer",
    description: "How cancer cells evade 'homelessness-induced' cell death",
    normalAnoikis: {
      definition: "Cell death mechanism when cells lose ECM attachment (Greek: 'without a home')",
      discoveredBy: "Frisch and Francis, 1994",
      normalProcess: "Epithelial cells bound to ECM via integrins → lose attachment → undergo apoptosis"
    },
    cancerEvasion: {
      title: "Mechanisms of Anoikis Resistance",
      description: "Cancer cells use multiple pathways to survive detachment from ECM",
      egfrPathway: {
        trigger: "Upregulation of Epithelial Growth Factor Receptor (EGFR)",
        cascade: [
          "EGFR activation",
          "PI3-kinase (phosphoinositide 3-kinase) upregulation", 
          "AKT phosphorylation",
          "mTOR (Target of Rapamycin) activation",
          "Anoikis resistance achieved"
        ],
        outcome: "Cancer cells survive without ECM attachment"
      }
    }
  },

  ctcCharacteristics: {
    title: "Circulating Tumor Cells (CTCs)",
    description: "Cancer cells that survive the hostile circulation environment",
    survivalChallenges: [
      {
        challenge: "Anoikis",
        description: "Cell death from ECM detachment",
        evasion: "Upregulated survival signaling (EGFR/PI3K/AKT pathway)"
      },
      {
        challenge: "Immune Surveillance",
        description: "Immune cells continuously monitor circulation for foreign cells",
        evasion: "Association with platelets and immune checkpoint expression"
      },
      {
        challenge: "Shear Stress",
        description: "Blood pressure and flow can cause cell lysis",
        evasion: "Structural adaptations and protective cell clusters"
      }
    ],
    ctcForms: {
      singleCells: "Individual cancer cells traveling alone",
      clusters: "Heterocellular clusters of multiple cancer cells traveling together",
      advantages: "Clusters may have enhanced survival and metastatic potential"
    },
    clinicalSignificance: {
      title: "CTCs as Prognostic Markers",
      description: "CTC count correlates with patient survival outcomes",
      breastCancerData: {
        lowCTC: "< 5 CTCs in 7mL blood = ~22 months median survival",
        highCTC: "≥ 5 CTCs in 7mL blood = ~11 months median survival"
      },
      detectionChallenge: "Finding ~5 CTCs among 50-60 million white blood cells in 7mL blood",
      researchValue: "Diagnostic and screening marker for metastatic disease"
    }
  },

  ctcCellularAssociations: {
    title: "CTC Cellular Partnerships",
    description: "CTCs associate with various cell types for protection and enhanced metastatic ability",
    
    plateletAssociation: {
      cellType: "Platelets",
      description: "Anuclear cells involved in blood clotting and vessel injury response",
      mechanism: "Tumor Cell Induced Platelet Aggregation (TCIPA)",
      benefits: [
        "Shield CTCs from immune destruction",
        "Transfer MHC proteins to CTCs for immune evasion",
        "Contribute to angiogenesis",
        "Aid in extravasation process"
      ],
      process: [
        "TCIPA activates platelets",
        "Platelets attach to CTCs",
        "MHC protein transfer occurs",
        "Immune system fails to detect CTCs"
      ]
    },

    m2MacrophageAssociation: {
      cellType: "M2 Macrophages",
      description: "Wound-healing type white blood cells",
      functions: [
        "Promote epithelial-mesenchymal transition",
        "Assist in intravasation processes",
        "Recruited by CTC-secreted cytokines",
        "Suppress T-cell proliferation"
      ],
      immuneSuppression: "Upregulate PD-L1 to block T-cell responses"
    },

    myeloidCellRecruitment: {
      title: "Myeloid Cell Recruitment",
      description: "CTCs recruit myeloid lineage cells using cytokines",
      mechanism: "Cytokine-mediated chemotaxis",
      outcome: [
        "T-cell proliferation suppression",
        "Enhanced immune evasion",
        "PD-L1 checkpoint activation",
        "Survival advantage in circulation"
      ]
    },

    immuneCheckpoints: {
      title: "Immune Checkpoint Exploitation",
      description: "CTCs use checkpoint pathways to evade immune destruction",
      pdl1Pathway: {
        expression: "CTCs and associated cells express PD-L1/PD-L2",
        target: "Binds to PD-1 on T-cells and B-cells",
        effect: "Downregulates immune cell proliferation and function",
        clinicalRelevance: "Target for checkpoint inhibitor therapies"
      }
    }
  },

  ctcDetection: {
    title: "CTC Detection Technology",
    description: "Advanced biotechnology methods to identify CTCs in patient blood samples",
    johnshopkinsMethod: {
      sampleSize: "7 milliliters of patient blood",
      cancerType: "Prostate cancer",
      markers: [
        {
          marker: "HOXB13",
          function: "Prostate cancer-specific transcription factor"
        },
        {
          marker: "NKX3.1",
          function: "Prostate-specific homeobox gene"
        },
        {
          marker: "Pan-Cytokeratin",
          function: "Epithelial cell marker"
        },
        {
          marker: "CD45 (negative)",
          function: "White blood cell marker - must be absent"
        },
        {
          marker: "DAPI",
          function: "Nuclear staining (blue)"
        }
      ],
      identification: "HOXB13+, NKX3.1+, Pan-Cytokeratin+, CD45- cells",
      challenges: "Extremely rare cells requiring sophisticated detection methods"
    }
  },

  homingExtravasation: {
    title: "Homing and Extravasation Mechanisms",
    description: "How CTCs navigate to specific organs and exit the circulation",
    
    homingTheories: {
      randomTheory: {
        name: "Random Distribution Theory",
        description: "CTCs can travel anywhere in circulation like airport travel",
        analogy: "With enough resources, you can travel to any destination",
        limitation: "Doesn't explain organ-specific metastatic patterns"
      },
      seedSoilTheory: {
        name: "Seed and Soil Hypothesis",
        author: "Stephen Paget (1889)",
        paper: "The distribution of secondary growths in cancer of the breast",
        concept: "Cancer cells (seeds) preferentially metastasize to environments (soil) where they can thrive",
        examples: [
          {
            cancer: "Prostate Cancer",
            preferredSite: "Bone",
            avoidedSite: "Pancreas",
            reason: "Bone provides conducive growth environment"
          },
          {
            cancer: "Breast Cancer", 
            preferredSite: "Bone",
            avoidedSite: "Peritoneum",
            reason: "Bone microenvironment supports breast cancer growth"
          },
          {
            cancer: "Stomach Cancer",
            preferredSite: "Peritoneum", 
            avoidedSite: "Bone",
            reason: "Peritoneal environment favors gastric cancer"
          }
        ]
      }
    },

    chemokineHoming: {
      title: "Chemokine-Mediated Homing",
      description: "Chemical signals guide CTCs to specific organs",
      etymology: "Chemokines = 'chemical movement'",
      mechanism: "CTCs migrate toward high chemokine concentration gradients",
      chemokineTypes: [
        {
          type: "Basal Chemokines",
          source: "Thymus and lymphoid tissues",
          function: "Constitutional tissue-specific signaling"
        },
        {
          type: "Inflammatory Chemokines",
          source: "Injury sites",
          function: "Recruit specific cells to sites of injury",
          example: {
            chemokine: "CCL2",
            producers: "Monocytes, macrophages, mast cells",
            receptor: "CCR2",
            effect: "Recruits CCR2-expressing cells to site"
          }
        }
      ]
    },

    dockLockMechanism: {
      title: "Dock and Lock Mechanism",
      description: "Two-step process for CTC attachment to endothelium",
      docking: {
        mediator: "Integrins (transmembrane proteins)",
        target: "Endothelial cells and bone marrow",
        function: "Initial attachment to vessel wall"
      },
      locking: {
        description: "Firm adhesion enabling extravasation",
        outcome: "Stable CTC-endothelial interaction"
      }
    },

    extravasationProcess: {
      title: "Extravasation: Exit from Circulation",
      description: "Multi-step process of CTC exit from blood vessels",
      steps: [
        {
          step: 1,
          name: "Chemokine Attraction",
          description: "CTCs attracted to secondary sites via chemokine gradients",
          mechanism: "Chemotaxis toward target organs"
        },
        {
          step: 2,
          name: "Docking",
          description: "CTC attaches to endothelial cells using integrins",
          mechanism: "Integrin-mediated adhesion"
        },
        {
          step: 3,
          name: "Rolling",
          description: "CTC rolls along vessel interior due to blood flow",
          mechanism: "Continuous blood flow causes rolling motion"
        },
        {
          step: 4,
          name: "Platelet Recruitment",
          description: "Platelets are recruited to assist extravasation",
          mechanism: "CTC-platelet interactions"
        },
        {
          step: 5,
          name: "EMT Induction",
          description: "Platelets secrete factors to induce EMT in CTCs",
          factors: ["TGF-β", "PDGF (Platelet-Derived Growth Factor)"],
          outcome: "CTCs gain migratory and invasive properties"
        },
        {
          step: 6,
          name: "ECM Breakdown",
          description: "CTCs break through blood vessel ECM",
          mechanism: "Enhanced invasive capabilities from EMT"
        },
        {
          step: 7,
          name: "Vascular Permeabilization",
          description: "Platelets upregulate CCL2 to increase vessel permeability",
          outcome: "Easier passage through vessel wall"
        },
        {
          step: 8,
          name: "Tissue Entry",
          description: "CTC successfully exits circulation into target tissue",
          outcome: "CTC becomes Disseminated Tumor Cell (DTC)"
        }
      ],
      
      plateletRole: {
        title: "Critical Role of Platelets in Extravasation",
        functions: [
          "Anchor CTCs to luminal surface of endothelial cells",
          "Secrete TGF-β and PDGF to induce EMT",
          "Upregulate CCL2 for vascular permeabilization",
          "Provide mechanical assistance for vessel wall penetration"
        ]
      }
    },

    clinicalImplications: {
      title: "Clinical Significance",
      diagnosticValue: "Understanding homing patterns helps predict metastatic sites",
      therapeuticTargets: [
        "Chemokine receptor antagonists",
        "Integrin inhibitors", 
        "Platelet function inhibitors",
        "Anti-angiogenic agents",
        "Checkpoint inhibitors"
      ],
      prognosticValue: "CTC detection and characterization predicts outcomes"
    }
  }
};

// New neoangiogenesis-specific data
export const neoangiogenesisData = {
  introduction: {
    title: 'Neoangiogenesis: The Tumor\'s Lifeline',
    description: 'Neoangiogenesis is the formation of new blood vessels from existing ones, specifically in the context of tumor growth. This process is essential for tumor progression and provides routes for metastatic spread.',
    keyFacts: [
      'Tumors cannot grow beyond 1-2mm without new blood vessels',
      'Hypoxic conditions trigger angiogenic signals',
      'Tumor vessels are poorly organized and leaky',
      'Anti-angiogenic drugs are used in cancer treatment'
    ]
  },
  
  angiogenicFactors: [
    {
      name: 'VEGF-A',
      fullName: 'Vascular Endothelial Growth Factor A',
      function: 'Primary driver of angiogenesis',
      expression: 'Upregulated in hypoxic conditions',
      clinicalRelevance: 'Target of bevacizumab therapy'
    },
    {
      name: 'PDGF',
      fullName: 'Platelet-Derived Growth Factor',
      function: 'Recruits pericytes for vessel maturation',
      expression: 'Secreted by tumor and stromal cells',
      clinicalRelevance: 'Target of multi-kinase inhibitors'
    },
    {
      name: 'FGF',
      fullName: 'Fibroblast Growth Factor',
      function: 'Stimulates endothelial cell proliferation',
      expression: 'Released from extracellular matrix',
      clinicalRelevance: 'Alternative pathway in VEGF resistance'
    },
    {
      name: 'Angiopoietins',
      fullName: 'Angiopoietin-1 and Angiopoietin-2',
      function: 'Vessel stabilization and destabilization',
      expression: 'Regulated by Tie2 receptor',
      clinicalRelevance: 'Emerging therapeutic targets'
    }
  ],

  vesselCharacteristics: {
    normal: {
      organization: 'Highly organized branching pattern',
      cellJunctions: 'Tight junctions between endothelial cells',
      permeability: 'Low permeability, selective transport',
      bloodFlow: 'Laminar flow with proper regulation',
      pericytes: 'Adequate pericyte coverage'
    },
    tumor: {
      organization: 'Chaotic, poorly organized structure',
      cellJunctions: 'Loose junctions, gaps between cells',
      permeability: 'High permeability, leaky vessels',
      bloodFlow: 'Turbulent flow with dead ends',
      pericytes: 'Reduced or abnormal pericyte coverage'
    }
  },

  therapeuticTargets: [
    {
      category: 'VEGF Pathway Inhibitors',
      drugs: [
        {
          name: 'Bevacizumab',
          type: 'Monoclonal antibody',
          target: 'VEGF-A',
          mechanism: 'Neutralizes circulating VEGF-A',
          approvals: ['Colorectal', 'Lung', 'Kidney', 'Glioblastoma'],
          benefits: 'Extends progression-free survival',
          limitations: 'Limited overall survival benefit'
        },
        {
          name: 'Sorafenib',
          type: 'Small molecule',
          target: 'VEGFR, PDGFR, RAF',
          mechanism: 'Multi-kinase inhibitor',
          approvals: ['Hepatocellular', 'Renal cell', 'Thyroid'],
          benefits: 'Oral administration, multiple targets',
          limitations: 'Hand-foot syndrome, fatigue'
        },
        {
          name: 'Sunitinib',
          type: 'Small molecule',
          target: 'VEGFR, PDGFR, KIT',
          mechanism: 'Receptor tyrosine kinase inhibitor',
          approvals: ['Renal cell', 'GIST', 'Pancreatic NET'],
          benefits: 'Standard of care for RCC',
          limitations: 'Fatigue, cardiac toxicity'
        }
      ]
    }
  ],

  resistanceMechanisms: [
    {
      mechanism: 'Alternative Angiogenic Pathways',
      description: 'Tumors activate FGF, PDGF, or other pathways when VEGF is blocked',
      clinicalImpact: 'Limits efficacy of VEGF-targeted therapy',
      solutions: 'Multi-target inhibitors, combination therapy'
    },
    {
      mechanism: 'Vessel Co-option',
      description: 'Tumors grow along existing blood vessels without needing new ones',
      clinicalImpact: 'Bypasses need for angiogenesis',
      solutions: 'Targeting vessel co-option mechanisms'
    },
    {
      mechanism: 'Increased Invasiveness',
      description: 'Anti-angiogenic therapy may increase tumor invasiveness',
      clinicalImpact: 'Potential for increased metastasis',
      solutions: 'Combination with anti-invasive agents'
    }
  ]
};

// Add to existing quiz questions
export const neoangiogenesisQuizQuestions = [
  {
    id: 6,
    question: "What is the primary difference between vasculogenesis and angiogenesis?",
    options: [
      "Vasculogenesis occurs only in adults, angiogenesis in embryos",
      "Vasculogenesis creates new vessels from stem cells, angiogenesis from existing vessels", 
      "Vasculogenesis is pathological, angiogenesis is normal",
      "There is no difference between the two processes"
    ],
    correct: 1,
    explanation: "Vasculogenesis creates completely new blood vessels from stem cells (mainly embryonic), while angiogenesis builds new vessels from existing ones (growth, healing, cancer)."
  },
  {
    id: 7,
    question: "What drives neoangiogenesis in tumors?",
    options: [
      "High oxygen levels",
      "Hypoxic (low oxygen) conditions",
      "Excessive nutrients",
      "Normal cell division"
    ],
    correct: 1,
    explanation: "Hypoxic conditions in rapidly growing tumors trigger the release of angiogenic factors like VEGF that stimulate new blood vessel formation."
  },
  {
    id: 8,
    question: "Why are tumor blood vessels problematic for metastasis?",
    options: [
      "They are too well organized",
      "They prevent cancer cell movement",
      "They are leaky and provide routes for cancer cell entry",
      "They only supply oxygen, not nutrients"
    ],
    correct: 2,
    explanation: "Tumor-induced blood vessels are poorly organized and leaky, providing increased opportunities for cancer cells to enter the bloodstream and metastasize."
  },
  {
    id: 9,
    question: "What is the main target of bevacizumab?",
    options: [
      "PDGF",
      "FGF",
      "VEGF-A",
      "Angiopoietins"
    ],
    correct: 2,
    explanation: "Bevacizumab is a monoclonal antibody that specifically targets and neutralizes VEGF-A, the primary driver of tumor angiogenesis."
  },
  {
    id: 10,
    question: "Why isn't stopping angiogenesis a 'home run' cancer therapy?",
    options: [
      "Angiogenesis doesn't occur in cancer",
      "By the time tumors are detected, they already have established blood supply",
      "Anti-angiogenic drugs don't work",
      "Tumors don't need blood vessels"
    ],
    correct: 1,
    explanation: "By the time tumors are clinically detectable, they already have an established vascular network. Stopping new vessel formation doesn't eliminate existing supply, so combination approaches are needed."
  }
];

// Update the main quiz questions array to include neoangiogenesis questions
export const metastasisQuizQuestions = [
  {
    id: 1,
    question: "What percentage of cancer deaths are attributed to metastasis rather than the primary tumor?",
    options: ["50%", "70%", "90%", "95%"],
    correct: 2,
    explanation: "Approximately 90% of cancer deaths are caused by metastasis, not the primary tumor itself."
  },
  {
    id: 2,
    question: "Which step in the metastatic cascade involves cancer cells losing their adhesive properties?",
    options: ["Angiogenesis", "EMT", "Intravasation", "Colonization"],
    correct: 1,
    explanation: "Epithelial-Mesenchymal Transition (EMT) is the process where cells lose adhesion and gain mobility."
  },
  {
    id: 3,
    question: "According to Paget's 'seed and soil' hypothesis, metastasis depends on:",
    options: ["Random distribution of cancer cells", "Anatomical blood flow patterns", "Compatibility between cancer cells and target organs", "Tumor size"],
    correct: 2,
    explanation: "Paget proposed that cancer cells (seeds) can only grow in compatible organ environments (soil)."
  },
  {
    id: 4,
    question: "Which is the most common site of breast cancer metastasis?",
    options: ["Brain", "Liver", "Bone", "Lung"],
    correct: 2,
    explanation: "Bone is the most common site of breast cancer metastasis, occurring in up to 70% of patients with advanced disease."
  },
  {
    id: 5,
    question: "What is metastatic dormancy?",
    options: ["Complete elimination of cancer cells", "Temporary treatment response", "Non-proliferative state of disseminated cells", "Primary tumor shrinkage"],
    correct: 2,
    explanation: "Metastatic dormancy is a state where disseminated tumor cells remain viable but non-proliferative, potentially for years."
  },
  // Tumor Microenvironment Quiz Questions
  {
    id: 'tme-1',
    question: "Which statement best describes the tumor microenvironment?",
    options: [
      "It consists only of cancer cells and blood vessels",
      "It's a complex ecosystem of various cell types that influence tumor progression",
      "It only contains normal cells trying to fight cancer",
      "It's primarily composed of immune cells"
    ],
    correct: 1,
    explanation: "The tumor microenvironment is a complex ecosystem containing cancer cells, normal cells, immune cells, blood vessels, fibroblasts, and many other components that collectively influence tumor behavior."
  },
  {
    id: 'tme-2',
    question: "What role do Cancer-Associated Fibroblasts (CAFs) typically play?",
    options: [
      "They always suppress tumor growth",
      "They promote tumor progression through growth factors and ECM remodeling",
      "They only provide structural support",
      "They have no significant impact on cancer"
    ],
    correct: 1,
    explanation: "CAFs actively promote tumor progression by secreting growth factors, promoting EMT, supporting angiogenesis, and remodeling the extracellular matrix to facilitate invasion."
  },
  {
    id: 'tme-3',
    question: "How do M1 and M2 macrophages differ in cancer?",
    options: [
      "M1 are pro-cancer, M2 are anti-cancer",
      "M1 are anti-cancer and pro-inflammatory, M2 are pro-cancer and immunosuppressive",
      "They have identical functions",
      "M2 are only found in healthy tissue"
    ],
    correct: 1,
    explanation: "M1 macrophages are pro-inflammatory and anti-cancer, promoting immune responses against tumors. M2 macrophages are immunosuppressive and pro-cancer, supporting tumor growth and angiogenesis."
  },
  {
    id: 'tme-4',
    question: "What is the primary role of the extracellular matrix (ECM) in cancer?",
    options: [
      "It only provides nutrients to cancer cells",
      "It acts as a barrier to invasion but can be remodeled by cancer cells",
      "It has no interaction with cancer cells",
      "It always prevents cancer progression"
    ],
    correct: 1,
    explanation: "The ECM normally acts as a structural barrier to cancer cell invasion, but cancer cells can secrete enzymes like matrix metalloproteinases to degrade and remodel the ECM, facilitating invasion and metastasis."
  },
  {
    id: 'tme-5',
    question: "Which factor is NOT typically associated with adipose tissue's role in cancer?",
    options: [
      "Increased cancer risk with obesity",
      "Secretion of pro-tumorigenic proteins",
      "Promotion of EMT and invasion",
      "Direct killing of cancer cells"
    ],
    correct: 3,
    explanation: "Adipose tissue, particularly white adipose tissue (WAT), is associated with increased cancer risk, secretes proteins that promote tumor formation, and supports EMT and invasion. It does not directly kill cancer cells."
  },
  // EMT and Invasion Quiz Questions
  {
    id: 'emt-1',
    question: "What is the Go vs Grow hypothesis in cancer?",
    options: [
      "Cancer cells can only proliferate or migrate, never both",
      "Cancer cells show a spectrum of proliferation and motility rather than all-or-nothing states",
      "All cancer cells must choose between growth and movement permanently",
      "Only metastatic cells can migrate"
    ],
    correct: 1,
    explanation: "The Go vs Grow hypothesis in cancer describes how cells exist on a spectrum - primary tumor cells have high proliferation/low motility, while metastatic cells have high motility/low proliferation, with many showing moderate levels of both."
  },
  {
    id: 'emt-2',
    question: "Which characteristic is NOT typical of epithelial cells?",
    options: [
      "Cuboidal morphology with apicobasal polarity",
      "Strong cell-cell interactions through tight junctions",
      "High motility and migratory behavior",
      "Expression of E-cadherin"
    ],
    correct: 2,
    explanation: "Epithelial cells are characterized by low motility and non-migratory behavior. They have cuboidal morphology, strong cell-cell interactions, and express E-cadherin."
  },
  {
    id: 'emt-3',
    question: "What is the primary function of mesenchymal-epithelial transition (MET)?",
    options: [
      "To promote primary tumor growth",
      "To enable cancer cells to regain proliferative capacity at metastatic sites",
      "To prevent cancer cell migration",
      "To strengthen cell-cell adhesions"
    ],
    correct: 1,
    explanation: "MET is essential for metastatic colonization - migrated cancer cells must reverse EMT to regain epithelial characteristics and proliferative capacity to form secondary tumors."
  },
  {
    id: 'emt-4',
    question: "Which factor is a well-known inducer of EMT in the tumor microenvironment?",
    options: [
      "E-cadherin",
      "TGF-β secreted by fibroblasts",
      "Tight junction proteins",
      "Basement membrane components"
    ],
    correct: 1,
    explanation: "TGF-β secreted by fibroblasts is one of the most well-studied EMT inducers, promoting transcriptional reprogramming that drives the epithelial-to-mesenchymal transition."
  },
  {
    id: 'emt-5',
    question: "How does the extracellular matrix (ECM) create a paradox for invading cancer cells?",
    options: [
      "It only helps cell migration",
      "It only blocks cell movement",
      "Cells must simultaneously use it for attachment and destroy it to create space for invasion",
      "It has no role in cancer cell invasion"
    ],
    correct: 2,
    explanation: "The ECM paradox: cancer cells need ECM for focal adhesions to migrate, but must also degrade it with proteases like MMPs to create pathways for invasion - simultaneously using and destroying their support structure."
  },
  {
    id: 'emt-6',
    question: "What are the four steps of mesenchymal cell migration?",
    options: [
      "Adhesion, protrusion, contraction, release",
      "Protrusion, adhesion, contraction, release", 
      "Release, protrusion, adhesion, contraction",
      "Contraction, release, protrusion, adhesion"
    ],
    correct: 1,
    explanation: "Mesenchymal migration follows four sequential steps: 1) Protrusion of pseudopodia, 2) Adhesion formation with ECM, 3) Contraction of cell body toward leading edge, 4) Release of rear adhesions."
  },
  {
    id: 'intra-1',
    question: "What is intravasation in cancer metastasis?",
    options: [
      "The growth of new blood vessels in tumors",
      "The invasion of cancer cells through vessel walls to enter circulation",
      "The formation of secondary tumors",
      "The death of cancer cells in blood vessels"
    ],
    correct: 1,
    explanation: "Intravasation is the specialized invasion process where cancer cells break through blood or lymphatic vessel walls to gain access to systemic circulation."
  },
  {
    id: 'intra-2',
    question: "What are the key steps of intravasation?",
    options: [
      "Only ECM degradation around vessels",
      "ECM degradation, basement membrane remodeling, endothelial disruption, and shape deformation",
      "Just breaking through endothelial cells",
      "Only passive entry through damaged vessels"
    ],
    correct: 1,
    explanation: "Intravasation involves four key steps: 1) ECM degradation around vessels, 2) basement membrane remodeling, 3) endothelial cell-cell contact disruption, 4) cancer cell shape deformation to enter vessel lumen."
  },
  {
    id: 'intra-3',
    question: "How does passive intravasation differ from active intravasation?",
    options: [
      "Passive requires more energy than active",
      "Active involves cell-directed migration while passive relies on chance entry through disorganized vessels",
      "They are exactly the same process",
      "Passive only occurs in lymphatic vessels"
    ],
    correct: 1,
    explanation: "Active intravasation involves cancer cells actively migrating toward and invading vessel walls, while passive intravasation occurs when cells fall into circulation through disorganized sinusoidal capillaries created by rapid neoangiogenesis."
  },
  {
    id: 'intra-4',
    question: "Why might lymphatic vessels be preferred targets for early metastasis?",
    options: [
      "They have higher pressure than blood vessels",
      "They provide a lower pressure environment and natural drainage pathway",
      "They contain more immune cells",
      "They are harder to enter than blood vessels"
    ],
    correct: 1,
    explanation: "Lymphatic vessels offer a lower pressure environment compared to blood vessels and represent natural drainage pathways, making them common routes for early metastatic spread, though they still present challenges like lymph node filtration."
  },
  // Circulation and Extravasation Quiz Questions
  {
    id: 'ctc-1',
    question: "What is anoikis and how do cancer cells evade it?",
    options: [
      "Cell death from radiation; cancer cells have DNA repair",
      "Cell death from ECM detachment; cancer cells upregulate survival signaling",
      "Cell death from hypoxia; cancer cells promote angiogenesis",
      "Cell death from immune attack; cancer cells express checkpoints"
    ],
    correct: 1,
    explanation: "Anoikis (Greek: 'without a home') is programmed cell death when cells lose ECM attachment. Cancer cells evade this through upregulated EGFR/PI3K/AKT/mTOR survival signaling pathways."
  },
  {
    id: 'ctc-2',
    question: "What are the three main survival challenges CTCs face in circulation?",
    options: [
      "Hypoxia, nutrient depletion, and acidosis",
      "Anoikis, immune surveillance, and shear stress",
      "DNA damage, protein misfolding, and oxidative stress",
      "Competition, crowding, and resource limitation"
    ],
    correct: 1,
    explanation: "CTCs must survive: 1) Anoikis (detachment-induced death), 2) Immune surveillance (detection and destruction), and 3) Shear stress from blood flow and pressure."
  },
  {
    id: 'ctc-3',
    question: "What is the clinical significance of CTC count in breast cancer patients?",
    options: [
      "CTC count has no correlation with prognosis",
      "Higher CTC counts (≥5 in 7mL) correlate with worse survival (~11 vs 22 months)",
      "Lower CTC counts indicate more aggressive disease",
      "CTC count only matters in early-stage disease"
    ],
    correct: 1,
    explanation: "In breast cancer, patients with ≥5 CTCs in 7mL blood have median survival of ~11 months versus ~22 months for those with <5 CTCs, making CTC count a valuable prognostic marker."
  },
  {
    id: 'ctc-4',
    question: "How do platelets assist CTCs in extravasation?",
    options: [
      "They only provide nutrients to CTCs",
      "They anchor CTCs, secrete TGF-β/PDGF for EMT, and upregulate CCL2 for vascular permeabilization",
      "They simply carry CTCs passively through circulation",
      "They prevent CTCs from adhering to vessel walls"
    ],
    correct: 1,
    explanation: "Platelets play multiple active roles: anchoring CTCs to endothelial cells, secreting TGF-β and PDGF to induce EMT in CTCs, and upregulating CCL2 to increase vascular permeability for easier extravasation."
  },
  {
    id: 'ctc-5',
    question: "What is the 'Seed and Soil' hypothesis?",
    options: [
      "Cancer cells randomly metastasize to any organ",
      "Cancer cells (seeds) preferentially metastasize to environments (soil) where they can thrive",
      "All cancer types metastasize to the same organs",
      "Metastasis depends only on blood flow patterns"
    ],
    correct: 1,
    explanation: "Stephen Paget's 1889 'Seed and Soil' hypothesis explains organ-specific metastasis: cancer cells (seeds) preferentially home to and thrive in specific tissue environments (soil), like prostate cancer to bone but not pancreas."
  },
  {
    id: 'ctc-6',
    question: "What is the role of metastasis suppressor genes like CD82/KAI1?",
    options: [
      "They promote cancer cell proliferation",
      "They allow normal cells to bind DARC and get stuck in circulation, preventing metastasis",
      "They increase angiogenesis",
      "They enhance immune evasion"
    ],
    correct: 1,
    explanation: "Metastasis suppressor genes like CD82/KAI1 normally allow cells to bind DARC (Duffy Antigen Chemokine Receptor) on endothelial cells, causing them to get stuck and preventing circulation. Cancer cells lose these genes and can travel freely."
  },
  ...neoangiogenesisQuizQuestions,
  // Dormancy and Secondary Tumor Growth Quiz Questions
  {
    id: 'dormancy-1',
    question: "What is the seed and soil hypothesis in metastasis?",
    options: [
      "Cancer cells (seeds) randomly spread to any organ (soil)",
      "Cancer cells (seeds) can only survive and grow in compatible organ environments (soil)",
      "Primary tumors (seeds) require specific nutrients (soil) to grow",
      "Metastatic sites (seeds) determine where primary tumors (soil) form"
    ],
    correct: 1,
    explanation: "The seed and soil hypothesis states that cancer cells (seeds) can only survive and proliferate in organ environments (soil) that are compatible with their growth requirements, explaining organ-specific metastasis patterns."
  },
  {
    id: 'dormancy-2',
    question: "What is clinical dormancy?",
    options: [
      "The time when cancer cells are actively dividing but undetectable",
      "The period when residual tumor cells are present but undetectable",
      "The phase when cancer cells are completely eliminated",
      "The time between primary tumor detection and treatment"
    ],
    correct: 1,
    explanation: "Clinical dormancy is the period when residual tumor cells are still present in the body but remain undetectable by current clinical methods, often lasting years before becoming detectable metastases."
  },
  {
    id: 'dormancy-3',
    question: "What is the difference between quiescence and senescence?",
    options: [
      "Quiescence is irreversible, senescence is reversible",
      "Quiescence is reversible growth arrest, senescence is irreversible growth arrest",
      "Both are the same - reversible growth arrest",
      "Quiescence occurs in G1, senescence occurs in G0"
    ],
    correct: 1,
    explanation: "Quiescence is a reversible growth arrest (cells in G0 can re-enter cell cycle), while senescence is irreversible growth arrest (cells permanently stop dividing, often due to telomere shortening)."
  },
  {
    id: 'dormancy-4',
    question: "What are the two main types of tumor mass dormancy?",
    options: [
      "Cellular and molecular dormancy",
      "Angiogenic and immunologic dormancy", 
      "Primary and secondary dormancy",
      "Active and passive dormancy"
    ],
    correct: 1,
    explanation: "The two main types of tumor mass dormancy are angiogenic dormancy (limited by lack of blood vessels) and immunologic dormancy (controlled by immune system surveillance)."
  },
  {
    id: 'dormancy-5',
    question: "Why are dormant cancer cells more resistant to therapy?",
    options: [
      "They divide faster than normal cells",
      "They don't express drug targets and have stress resistance mechanisms",
      "They are located in inaccessible organs",
      "They produce drug-metabolizing enzymes"
    ],
    correct: 1,
    explanation: "Dormant cancer cells are therapy-resistant because they're not proliferating (making cell-cycle targeting drugs ineffective), have activated stress response mechanisms, and often exhibit stem-like properties."
  },
  {
    id: 'dormancy-6',
    question: "What triggers dormant cells to resume proliferation?",
    options: [
      "Only genetic mutations in the dormant cells",
      "Pro-proliferative environmental cues, inflammation, and favorable microenvironment changes",
      "Immune system suppression alone",
      "Primary tumor removal"
    ],
    correct: 1,
    explanation: "Dormant cells can be triggered to proliferate by pro-proliferative signals, inflammation, changes in extracellular matrix stiffness, and other microenvironmental factors that make the 'soil' more conducive for growth."
  },
  // Morbidity and Mortality Quiz Questions
  {
    id: 'morbidity-1',
    question: "What cancer only rarely spreads to bone?",
    options: [
      "Kidney",
      "Brain",
      "Breast", 
      "Prostate"
    ],
    correct: 1,
    explanation: "Brain cancer (CNS tumors) rarely metastasize due to the blood-brain barrier and typically remain localized. Kidney, breast, and prostate cancers commonly spread to bone."
  },
  {
    id: 'morbidity-2',
    question: "What cancer only rarely spreads to the liver?",
    options: [
      "Stomach",
      "Breast",
      "Brain",
      "Colon"
    ],
    correct: 2,
    explanation: "Brain cancers rarely metastasize to other organs, including the liver. Stomach, breast, and colon cancers commonly spread to the liver through portal or systemic circulation."
  },
  {
    id: 'morbidity-3',
    question: "Virchow's triad refers to what 3 things?",
    options: [
      "Bone fracture, blood clot, cancer spreading",
      "Blood infection, blood clotting, bleeding",
      "Cancer spreading, cancer growing, blood clotting",
      "Endothelial injury, blood stasis, hypercoagulability"
    ],
    correct: 3,
    explanation: "Virchow's triad describes the three factors that contribute to thrombosis: endothelial injury (vessel wall damage), blood stasis (slowed flow), and hypercoagulability (increased clotting tendency)."
  },
  {
    id: 'morbidity-4',
    question: "Cancer cachexia results in?",
    options: [
      "Weight gain",
      "Gain of muscle mass",
      "Increased energy for the patient",
      "Weight loss"
    ],
    correct: 3,
    explanation: "Cancer cachexia is characterized by weight loss, muscle wasting, fatigue, and weakness that cannot be reversed by nutritional support alone."
  },
  {
    id: 'morbidity-5',
    question: "Aesthenia is defined as:",
    options: [
      "Having a lot of energy",
      "Abnormal physical weakness or lack of energy",
      "Putting people to sleep for surgery",
      "Feeling very strong"
    ],
    correct: 1,
    explanation: "Aesthenia refers to abnormal physical weakness and lack of energy commonly experienced by cancer patients, particularly those with cachexia."
  },
  {
    id: 'morbidity-6',
    question: "Anorexia is defined as:",
    options: [
      "Being hungry all of the time",
      "Loss of appetite",
      "A metastasis that has spread to the lung",
      "Putting people to sleep for surgery"
    ],
    correct: 1,
    explanation: "In the cancer context, anorexia refers to loss of appetite, which is a major component of cancer cachexia syndrome."
  },
  {
    id: 'morbidity-7',
    question: "Matrix metalloproteinases (MMPs):",
    options: [
      "Build muscle",
      "Build bone",
      "Help destroy the extracellular matrix around a tumor",
      "Build fat stores"
    ],
    correct: 2,
    explanation: "MMPs are enzymes that break down the extracellular matrix around tumors, facilitating invasion and contributing to endothelial injury in Virchow's triad."
  },
  {
    id: 'morbidity-8',
    question: "Tumor necrosis factor alpha:",
    options: [
      "Builds muscle",
      "Builds bone", 
      "Builds fat stores",
      "Is thought to contribute to cancer cachexia"
    ],
    correct: 3,
    explanation: "TNF-α (also called cachexin) is a major pro-inflammatory cytokine that contributes to cancer cachexia by promoting muscle wasting and fat breakdown."
  },
  {
    id: 'morbidity-9',
    question: "True or False: Metastasis is the major cause of cancer death.",
    options: [
      "False",
      "True"
    ],
    correct: 1,
    explanation: "True. Metastasis is responsible for approximately 90% of cancer deaths, making it the major cause of cancer mortality."
  },
  {
    id: 'morbidity-10',
    question: "True or False: Cachexia is often present when people die of cancer.",
    options: [
      "False",
      "True"
    ],
    correct: 1,
    explanation: "True. Cachexia is present in 80% of terminal cancer patients and is the immediate cause of death in 20-40% of cancer patients."
  }
]; 

export const dormancyIntroduction = {
  title: 'Dormancy and Secondary Tumor Growth',
  description: 'Cancer dormancy explains why patients can experience cancer recurrence years or even decades after successful treatment of their primary tumor. Understanding this phenomenon is crucial for developing strategies to prevent metastatic recurrence, the leading cause of cancer death.',
  keyQuestions: [
    'Why do different cancers metastasize to different organs?',
    'Why do cancer patients relapse years after surgery?',
    'What controls dormant cell reactivation?',
    'How can we therapeutically target dormant cells?'
  ]
};

// Morbidity and Mortality Data
export interface MetastaticPattern {
  primaryCancer: string;
  commonMetastaticSites: string[];
  mechanisms: string[];
  survivalImpact: string;
}

export interface OrganSpecificMetastasis {
  id: string;
  organ: string;
  description: string;
  mechanisms: string[];
  clinicalImpact: string;
  examples: string[];
}

export interface CancerPoison {
  id: string;
  name: string;
  description: string;
  effects: string[];
  mechanism: string;
  clinicalRelevance: string;
}

export interface PoisonSyndrome {
  id: string;
  name: string;
  description: string;
  prevalence: string;
  symptoms: string[];
  mechanism: string;
  prognosis: string;
}

export interface VirchowTriadComponent {
  id: string;
  component: string;
  description: string;
  cancerConnection: string;
  examples: string[];
}

export interface MortalityMechanism {
  id: string;
  mechanism: string;
  description: string;
  frequency: string;
  examples: string[];
  prevention: string;
}

// Morbidity and Mortality Data
export const morbidityMortalityIntroduction: MorbidityMortalityIntroduction = {
  title: 'Morbidity and Mortality in Cancer Metastasis',
  description: 'Stephen Paget\'s landmark 1889 analysis of 735 fatal breast cancer cases revealed that metastatic patterns are not random but follow specific organ preferences. This "seed and soil" hypothesis fundamentally changed our understanding of cancer spread and the mechanisms of cancer-related death.',
  keyInsights: [
    'Metastasis is responsible for 90% of cancer deaths',
    'Cancer "poisons" like TNF-α contribute to systemic toxicity',
    'Cachexia affects 80% of terminal cancer patients',
    'Thrombosis follows Virchow\'s triad in cancer patients',
    'Organ-specific metastasis patterns determine clinical outcomes'
  ]
};

export const metastaticPatterns: MetastaticPattern[] = [
  {
    primaryCancer: 'Breast Cancer',
    commonMetastaticSites: ['Bone', 'Liver', 'Lung', 'Brain'],
    mechanisms: ['CXCR4/CXCL12 signaling', 'Osteomimicry', 'VEGF expression'],
    survivalImpact: 'Bone metastases: 2-3 years median survival'
  },
  {
    primaryCancer: 'Lung Cancer',
    commonMetastaticSites: ['Brain', 'Liver', 'Bone', 'Adrenal glands'],
    mechanisms: ['Blood-brain barrier penetration', 'Hepatic tropism', 'Osteolytic factors'],
    survivalImpact: 'Brain metastases: 4-6 months median survival'
  },
  {
    primaryCancer: 'Prostate Cancer',
    commonMetastaticSites: ['Bone', 'Lymph nodes', 'Liver'],
    mechanisms: ['Osteoblastic factors', 'PSA signaling', 'Androgen receptor pathways'],
    survivalImpact: 'Bone metastases: 1-3 years median survival'
  },
  {
    primaryCancer: 'Colorectal Cancer',
    commonMetastaticSites: ['Liver', 'Lung', 'Peritoneum'],
    mechanisms: ['Portal circulation', 'CEA signaling', 'Peritoneal seeding'],
    survivalImpact: 'Liver metastases: 6-20 months median survival'
  }
];

export const organSpecificMetastases: OrganSpecificMetastasis[] = [
  {
    id: 'bone-metastasis',
    organ: 'Bone',
    description: 'Most common site for breast and prostate cancer metastasis',
    mechanisms: ['CXCR4/CXCL12 chemokine signaling', 'Osteomimicry', 'Bone matrix proteins'],
    clinicalImpact: 'Pathological fractures, hypercalcemia, bone pain, spinal cord compression',
    examples: ['Breast cancer (65% develop bone mets)', 'Prostate cancer (90% develop bone mets)']
  },
  {
    id: 'liver-metastasis',
    organ: 'Liver',
    description: 'Primary site for colorectal cancer metastasis via portal circulation',
    mechanisms: ['Portal venous drainage', 'Hepatic growth factors', 'Sinusoidal structure'],
    clinicalImpact: 'Hepatic dysfunction, portal hypertension, liver failure',
    examples: ['Colorectal cancer (50-75% develop liver mets)', 'Breast cancer (5-12% develop liver mets)']
  },
  {
    id: 'brain-metastasis',
    organ: 'Brain',
    description: 'Common in lung cancer and melanoma due to high blood flow',
    mechanisms: ['Blood-brain barrier disruption', 'Neurotrophin signaling', 'Astrocyte interactions'],
    clinicalImpact: 'Neurological deficits, seizures, increased intracranial pressure',
    examples: ['Lung cancer (20-40% develop brain mets)', 'Melanoma (15-20% develop brain mets)']
  },
  {
    id: 'lung-metastasis',
    organ: 'Lung',
    description: 'Common secondary site due to pulmonary circulation',
    mechanisms: ['Pulmonary capillary trapping', 'Angiogenic factors', 'Surfactant interactions'],
    clinicalImpact: 'Respiratory failure, pleural effusions, pneumothorax',
    examples: ['Sarcomas (high propensity)', 'Renal cell carcinoma (common site)']
  }
];

export const cancerPoisons: CancerPoison[] = [
  {
    id: 'tnf-alpha',
    name: 'Tumor Necrosis Factor Alpha (TNF-α)',
    description: 'Pro-inflammatory cytokine also known as cachexin',
    effects: ['Muscle wasting', 'Fat breakdown', 'Appetite suppression', 'Fever'],
    mechanism: 'Activates NF-κB pathway leading to protein degradation and metabolic dysfunction',
    clinicalRelevance: 'Major contributor to cancer cachexia syndrome affecting 80% of terminal patients'
  },
  {
    id: 'il-6',
    name: 'Interleukin-6 (IL-6)',
    description: 'Pleiotropic cytokine with systemic effects',
    effects: ['Acute phase response', 'Muscle atrophy', 'Bone resorption', 'Anemia'],
    mechanism: 'JAK/STAT signaling pathway activation leading to systemic inflammation',
    clinicalRelevance: 'Elevated in most cancer patients; correlates with poor prognosis'
  },
  {
    id: 'il-1',
    name: 'Interleukin-1 (IL-1)',
    description: 'Potent pro-inflammatory mediator',
    effects: ['Fever', 'Anorexia', 'Fatigue', 'Bone destruction'],
    mechanism: 'Activates hypothalamic-pituitary-adrenal axis and inflammatory cascades',
    clinicalRelevance: 'Contributes to constitutional symptoms and bone metastasis complications'
  },
  {
    id: 'pthrp',
    name: 'Parathyroid Hormone-related Protein (PTHrP)',
    description: 'Hormone-like factor causing hypercalcemia',
    effects: ['Hypercalcemia', 'Bone resorption', 'Kidney dysfunction', 'Neurological symptoms'],
    mechanism: 'Mimics parathyroid hormone action on calcium homeostasis',
    clinicalRelevance: 'Most common cause of malignancy-associated hypercalcemia'
  }
];

export const poisonSyndromes: PoisonSyndrome[] = [
  {
    id: 'cachexia',
    name: 'Cancer Cachexia',
    description: 'Complex metabolic syndrome characterized by severe weight loss',
    prevalence: '80% of terminal cancer patients',
    symptoms: ['Severe weight loss (>5% in 6 months)', 'Muscle wasting', 'Fatigue', 'Anorexia', 'Anemia'],
    mechanism: 'TNF-α, IL-6, and other cytokines disrupt protein synthesis and energy metabolism',
    prognosis: 'Immediate cause of death in 20-40% of cancer patients'
  },
  {
    id: 'thrombosis',
    name: 'Cancer-Associated Thrombosis',
    description: 'Increased risk of blood clots due to hypercoagulable state',
    prevalence: '4-20% of cancer patients',
    symptoms: ['Deep vein thrombosis', 'Pulmonary embolism', 'Arterial thrombosis', 'DIC'],
    mechanism: 'Virchow\'s triad: hypercoagulability, endothelial damage, stasis',
    prognosis: 'Second leading cause of death in cancer patients'
  },
  {
    id: 'bone-pain',
    name: 'Bone Pain Syndrome',
    description: 'Severe pain from bone metastases and destruction',
    prevalence: '75% of patients with bone metastases',
    symptoms: ['Severe bone pain', 'Pathological fractures', 'Spinal cord compression', 'Hypercalcemia'],
    mechanism: 'Osteolysis, nerve compression, inflammatory mediators',
    prognosis: 'Major cause of morbidity; significantly impacts quality of life'
  },
  {
    id: 'paraneoplastic',
    name: 'Paraneoplastic Syndromes',
    description: 'Systemic effects not directly related to tumor mass',
    prevalence: '10-15% of cancer patients',
    symptoms: ['Neurological deficits', 'Endocrine dysfunction', 'Skin changes', 'Renal dysfunction'],
    mechanism: 'Tumor-secreted hormones, antibodies, or immune responses',
    prognosis: 'Can be reversible with tumor treatment'
  }
];

export const virchowTriad: VirchowTriadComponent[] = [
  {
    id: 'hypercoagulability',
    component: 'Hypercoagulability',
    description: 'Increased tendency for blood to clot',
    cancerConnection: 'Cancer cells release procoagulant factors and activate platelets',
    examples: ['Tissue factor expression', 'Platelet activation', 'Reduced anticoagulants', 'Mucin production']
  },
  {
    id: 'endothelial-damage',
    component: 'Endothelial Damage',
    description: 'Injury to blood vessel walls',
    cancerConnection: 'Chemotherapy, radiation, and tumor invasion damage vessel walls',
    examples: ['Chemotherapy toxicity', 'Radiation damage', 'Tumor invasion', 'Central venous catheters']
  },
  {
    id: 'stasis',
    component: 'Stasis (Slow Blood Flow)',
    description: 'Reduced blood flow velocity',
    cancerConnection: 'Immobility, tumor compression, and hyperviscosity slow blood flow',
    examples: ['Bed rest/immobility', 'Tumor compression', 'Hyperviscosity', 'Dehydration']
  }
];

export const mortalityMechanisms: MortalityMechanism[] = [
  {
    id: 'organ-failure',
    mechanism: 'Organ Failure',
    description: 'Direct replacement of normal tissue by metastatic tumor',
    frequency: '40-50% of cancer deaths',
    examples: ['Liver failure from hepatic metastases', 'Respiratory failure from lung metastases', 'Renal failure'],
    prevention: 'Early detection and treatment of metastases'
  },
  {
    id: 'cachexia-syndrome',
    mechanism: 'Cachexia Syndrome',
    description: 'Severe weight loss and muscle wasting leading to death',
    frequency: '20-40% of cancer deaths',
    examples: ['Protein-energy malnutrition', 'Cardiac cachexia', 'Respiratory muscle weakness'],
    prevention: 'Nutritional support, exercise, anti-inflammatory therapy'
  },
  {
    id: 'thromboembolism',
    mechanism: 'Thromboembolism',
    description: 'Blood clots causing fatal complications',
    frequency: '10-15% of cancer deaths',
    examples: ['Pulmonary embolism', 'Stroke', 'Myocardial infarction', 'Disseminated intravascular coagulation'],
    prevention: 'Anticoagulation therapy, early mobilization'
  },
  {
    id: 'infection',
    mechanism: 'Infection',
    description: 'Immunosuppression leading to fatal infections',
    frequency: '10-15% of cancer deaths',
    examples: ['Pneumonia', 'Sepsis', 'Opportunistic infections', 'Neutropenic fever'],
    prevention: 'Infection prophylaxis, immune support, early antibiotic treatment'
  }
];

// Add missing dormancy data exports
export const dormancyTypes: DormancyType[] = [
  {
    id: 'cellular-dormancy',
    name: 'Cellular Dormancy',
    description: 'Individual cancer cells enter a quiescent state with arrested cell cycle progression',
    characteristics: [
      'G0/G1 cell cycle arrest',
      'Reduced metabolic activity',
      'Resistance to chemotherapy',
      'Maintained viability'
    ],
    examples: [
      'Breast cancer cells in bone marrow',
      'Prostate cancer cells in lymph nodes',
      'Melanoma cells in various organs'
    ],
    clinicalRelevance: 'Most common form of dormancy; cells can remain dormant for years before reactivating'
  },
  {
    id: 'angiogenic-dormancy',
    name: 'Angiogenic Dormancy',
    description: 'Micro-metastases remain small due to lack of vascular supply',
    characteristics: [
      'Balance between proliferation and apoptosis',
      'Limited by oxygen and nutrients',
      'Size restriction (1-2mm)',
      'Angiogenic switch failure'
    ],
    examples: [
      'Breast cancer micro-metastases',
      'Melanoma dormant lesions',
      'Prostate cancer micro-tumors'
    ],
    clinicalRelevance: 'Can be detected as micro-metastases; angiogenic reactivation leads to tumor growth'
  },
  {
    id: 'immunologic-dormancy',
    name: 'Immunologic Dormancy',
    description: 'Immune system maintains cancer cells in a dormant state through equilibrium',
    characteristics: [
      'Immune surveillance active',
      'Cytotoxic T cell control',
      'IFN-γ mediated growth arrest',
      'Adaptive immune pressure'
    ],
    examples: [
      'Melanoma under immune control',
      'Lung cancer immune equilibrium',
      'Colorectal cancer dormancy'
    ],
    clinicalRelevance: 'Immunosuppression or immune escape can lead to reactivation'
  }
];

export const dormancyProperties: DormancyProperty[] = [
  {
    id: 'quiescence',
    name: 'Cellular Quiescence',
    description: 'Reversible cell cycle arrest in G0 phase',
    mechanism: 'p21/p27 cyclin-dependent kinase inhibitors block cell cycle progression',
    clinicalImplications: [
      'Resistance to cell cycle-targeting chemotherapy',
      'Maintained DNA repair capacity',
      'Potential for reactivation'
    ]
  },
  {
    id: 'senescence',
    name: 'Cellular Senescence',
    description: 'Irreversible growth arrest with metabolic activity',
    mechanism: 'p53/p16 pathways induce permanent cell cycle exit',
    clinicalImplications: [
      'SASP (senescence-associated secretory phenotype)',
      'Pro-inflammatory microenvironment',
      'Potential immune clearance'
    ]
  },
  {
    id: 'metabolic-adaptation',
    name: 'Metabolic Adaptation',
    description: 'Reduced metabolic activity to survive nutrient-poor conditions',
    mechanism: 'mTOR pathway suppression and autophagy activation',
    clinicalImplications: [
      'Resistance to metabolic inhibitors',
      'Enhanced stress tolerance',
      'Reduced drug uptake'
    ]
  }
];

export const cellStates: CellState[] = [
  {
    id: 'active-proliferation',
    name: 'Active Proliferation',
    description: 'Rapidly dividing cancer cells forming growing metastases',
    characteristics: [
      'High Ki-67 expression',
      'Active cell cycle',
      'High metabolic activity',
      'Angiogenesis stimulation'
    ],
    duration: 'Continuous until growth constraints',
    reactivationTriggers: ['Not applicable - already active']
  },
  {
    id: 'dormant-quiescent',
    name: 'Dormant (Quiescent)',
    description: 'Reversibly arrested cells that can reactivate',
    characteristics: [
      'G0/G1 arrest',
      'Low Ki-67',
      'Stress resistance',
      'Maintained viability'
    ],
    duration: 'Months to decades',
    reactivationTriggers: [
      'Growth factor stimulation',
      'Microenvironment changes',
      'Immune suppression',
      'Hormonal changes'
    ]
  },
  {
    id: 'senescent',
    name: 'Senescent',
    description: 'Permanently growth-arrested cells with secretory phenotype',
    characteristics: [
      'Irreversible growth arrest',
      'SASP activation',
      'DNA damage response',
      'Enlarged morphology'
    ],
    duration: 'Permanent (until clearance)',
    reactivationTriggers: ['Generally irreversible']
  }
];

export const organTropismData: OrganTropismData[] = [
  {
    id: 'breast-bone',
    primaryCancer: 'Breast Cancer',
    commonMetastaticSites: ['Bone', 'Liver', 'Lung', 'Brain'],
    mechanisms: ['CXCR4/CXCL12 chemokine signaling and osteomimicry', 'Osteomimicry', 'VEGF expression'],
    survivalImpact: 'Bone metastases: 2-3 years median survival',
    dormancyPotential: 'High - bone marrow provides dormancy-supporting niche',
    reactivationFactors: [
      'Bone remodeling',
      'Osteoblast activation',
      'PTHrP signaling',
      'Mechanical stress'
    ]
  },
  {
    id: 'prostate-bone',
    primaryCancer: 'Prostate Cancer',
    commonMetastaticSites: ['Bone', 'Lymph nodes'],
    mechanisms: ['PSA-mediated bone matrix degradation and osteoblast mimicry', 'Osteoblastic factors', 'PSA signaling'],
    survivalImpact: 'Bone metastases: 1-3 years median survival',
    dormancyPotential: 'Very high - can remain dormant for decades',
    reactivationFactors: [
      'Androgen deprivation therapy resistance',
      'Bone turnover increase',
      'Age-related changes'
    ]
  },
  {
    id: 'melanoma-brain',
    primaryCancer: 'Melanoma',
    commonMetastaticSites: ['Brain', 'Liver', 'Lung', 'Skin'],
    mechanisms: ['Blood-brain barrier penetration and neurotropic factors', 'Neurotrophin signaling'],
    survivalImpact: 'Brain metastases: 4-5 months median survival',
    dormancyPotential: 'Moderate - immune-privileged site',
    reactivationFactors: [
      'Blood-brain barrier disruption',
      'Neuroinflammation',
      'Astrocyte activation'
    ]
  }
];

export const clinicalEvidenceData: ClinicalEvidenceData[] = [
  {
    id: 'breast-recurrence',
    title: 'Breast Cancer Late Recurrence',
    finding: 'Late recurrences observed 15-20 years after primary treatment',
    implication: 'Need for long-term surveillance and dormancy-targeting therapies',
    source: 'Multiple retrospective cohort studies'
  },
  {
    id: 'prostate-biochemical',
    title: 'Prostate Cancer Biochemical Recurrence',
    finding: 'Biochemical recurrence can occur decades after radical prostatectomy',
    implication: 'PSA monitoring for life; dormant cell reactivation mechanisms',
    source: 'Long-term follow-up studies'
  },
  {
    id: 'melanoma-dormancy',
    title: 'Melanoma Late Recurrence',
    finding: 'Documented cases of recurrence after 10+ years of remission',
    implication: 'Immune surveillance failure; need for immune maintenance therapy',
    source: 'Case reports and registry data'
  }
];

export const reactivationTriggers: ReactivationTrigger[] = [
  {
    id: 'microenvironment-change',
    trigger: 'Microenvironment Changes',
    mechanism: 'Changes in extracellular matrix, growth factors, and cellular composition',
    examples: [
      'Wound healing',
      'Inflammation',
      'Tissue remodeling',
      'Aging-related changes'
    ],
    analogy: 'Like changing the soil conditions can cause dormant seeds to sprout'
  },
  {
    id: 'immune-suppression',
    trigger: 'Immune System Suppression',
    mechanism: 'Reduced cytotoxic T cell activity and immune checkpoint activation',
    examples: [
      'Immunosuppressive therapy',
      'Age-related immunosenescence',
      'Chronic stress',
      'Other malignancies'
    ],
    analogy: 'Like removing the security guards allows intruders to become active'
  },
  {
    id: 'hormonal-changes',
    trigger: 'Hormonal Changes',
    mechanism: 'Hormone receptor signaling pathways promote cell cycle re-entry',
    examples: [
      'Menopause (estrogen withdrawal)',
      'Pregnancy (hormonal surge)',
      'Hormone replacement therapy',
      'Androgen deprivation therapy resistance'
    ],
    analogy: 'Like seasonal changes can trigger plant growth cycles'
  }
];

export const dormancyTherapeuticStrategies: TherapeuticStrategy[] = [
  {
    id: 'dormancy-maintenance',
    strategy: 'Dormancy Maintenance',
    approach: 'Keep dormant cells in arrested state',
    rationale: 'Maintain cell cycle arrest and prevent reactivation signals',
    challenges: [
      'Long-term treatment required',
      'Difficulty in monitoring dormant cells',
      'Potential for resistance development'
    ],
    clinicalStatus: 'Preclinical and early clinical trials'
  },
  {
    id: 'dormant-cell-elimination',
    strategy: 'Dormant Cell Elimination',
    approach: 'Selectively kill dormant cancer cells',
    rationale: 'Target dormancy-specific vulnerabilities or force apoptosis',
    challenges: [
      'Distinguishing dormant cancer cells from normal quiescent cells',
      'Potential toxicity to stem cells',
      'Technical difficulty in targeting'
    ],
    clinicalStatus: 'Preclinical research'
  },
  {
    id: 'reactivation-prevention',
    strategy: 'Reactivation Prevention',
    approach: 'Block signals that reactivate dormant cells',
    rationale: 'Inhibit growth factors, angiogenesis, or immune escape pathways',
    challenges: [
      'Multiple reactivation pathways',
      'Context-dependent mechanisms',
      'Long-term safety concerns'
    ],
    clinicalStatus: 'Clinical trials for anti-angiogenic and immune therapies'
  }
];

// Metastasis Statistics Data
export interface MetastasisStatistic {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
}

export const metastasisStatistics: MetastasisStatistic[] = [
  {
    id: 'mortality-rate',
    title: 'Mortality Rate',
    value: '90%',
    description: 'of cancer deaths are caused by metastasis, not primary tumors',
    icon: 'AlertTriangle'
  },
  {
    id: 'success-rate',
    title: 'Success Rate',
    value: '<0.01%',
    description: 'of circulating tumor cells successfully metastasize',
    icon: 'TrendingDown'
  },
  {
    id: 'economic-impact',
    title: 'Economic Impact',
    value: '$200B',
    description: 'annual cost of metastatic cancer care in the US',
    icon: 'Bone'
  }
];

// Virchow Triad Data Object (for component that expects single object)
export interface VirchowTriadData {
  title: string;
  description: string;
  clinicalRelevance: string;
  components: {
    factor: string;
    mechanism: string;
    cancerConnection: string;
    examples: string[];
  }[];
}

export const virchowTriadData: VirchowTriadData = {
  title: "Virchow's Triad in Cancer",
  description: "Rudolf Virchow identified three factors that contribute to thrombosis, all of which are present in cancer patients, explaining their increased risk of blood clots.",
  clinicalRelevance: "Cancer patients have a 4-7 fold increased risk of thrombosis, making it the second leading cause of death in cancer patients after the cancer itself.",
  components: [
    {
      factor: "Hypercoagulability",
      mechanism: "Increased tendency for blood to clot due to cancer-produced procoagulant factors",
      cancerConnection: "Cancer cells release tissue factor, activate platelets, and reduce natural anticoagulants",
      examples: ["Tissue factor expression", "Platelet activation", "Reduced protein C/S", "Mucin production"]
    },
    {
      factor: "Endothelial Damage",
      mechanism: "Injury to blood vessel walls from cancer treatments and tumor invasion",
      cancerConnection: "Chemotherapy, radiation, and tumor invasion damage vessel endothelium",
      examples: ["Chemotherapy toxicity", "Radiation vasculopathy", "Tumor invasion", "Central line placement"]
    },
    {
      factor: "Stasis (Slow Blood Flow)",
      mechanism: "Reduced blood flow velocity due to immobility and tumor compression",
      cancerConnection: "Cancer patients often have reduced mobility and tumors can compress vessels",
      examples: ["Bed rest/immobility", "Tumor compression", "Hyperviscosity", "Dehydration"]
    }
  ]
};