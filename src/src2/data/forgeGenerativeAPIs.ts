export interface GenerativeAPIDemo {
  id: string;
  name: string;
  endpoint: string;
  icon: string;
  color: string;
  description: string;
  capabilities: string[];
  useCases: {
    title: string;
    description: string;
    examples: string[];
  }[];
  simulation: {
    input: any;
    steps: {
      title: string;
      description: string;
      duration: number;
      output?: any;
    }[];
    finalOutput: any;
  };
}

// This is the definitive, doctrinally-sound mapping of our Zeta Forge's capabilities.
export const forgeGenerativeAPIs: GenerativeAPIDemo[] = [
  {
    id: 'generate_crispr_payload',
    name: 'Design CRISPR Guide RNAs',
    endpoint: '/generate_crispr_payload',
    icon: '🎯',
    color: 'red',
    description: 'Engineer and validate high-efficiency CRISPR guide RNAs for precise gene editing and transcriptional modulation.',
    capabilities: [
      'De Novo Guide RNA Design',
      'Efficiency Prediction (via Zeta Index)',
      'Off-Target Analysis (Genome-Wide)',
      'Universal PAM Compatibility'
    ],
    useCases: [
      {
        title: 'Oncogene Targeting',
        description: 'Design guide RNAs for precise targeting of oncogenes and disease-driving genetic elements.',
        examples: ['MYC Targeting', 'KRAS G12C Editing', 'BCR-ABL Fusion Gene Correction']
      },
      {
        title: 'Gene Activation (CRISPRa)',
        description: 'Engineer guide RNAs for transcriptional activation of tumor suppressor genes.',
        examples: ['TP53 Activation', 'PTEN Restoration']
      }
    ],
    simulation: {
      input: {
        target_locus: 'chr8:127735434-127735534', // MYC locus
        editing_type: 'knockout',
        pam_type: 'any',
        off_target_threshold: 0,
      },
      steps: [
        {
          title: 'Target Analysis',
          description: 'Analyzing 1M token genomic context with Evo2 for optimal guide RNA placement',
          duration: 1800
        },
        {
          title: 'Guide RNA Generation',
          description: 'Generating candidate guide RNAs engineered for maximum on-target efficiency',
          duration: 2500
        },
        {
          title: 'Off-Target Assessment',
          description: 'Executing genome-wide scan to ensure minimal off-target activity',
          duration: 3000
        },
        {
          title: 'Efficiency Scoring (Zeta Index)',
          description: 'Calculating the probability of successful target editing and ranking candidates',
          duration: 1200
        }
      ],
      finalOutput: {
        candidates: [
          { sequence: 'GTTCCAGAACCTGAAAGCTG', editing_efficiency: 0.98, off_targets: 0, pam: 'TGG' },
          { sequence: 'CTGAAAGCTGACCCTGAAGT', editing_efficiency: 0.95, off_targets: 0, pam: 'AGG' },
          { sequence: 'AGCTGACCCTGAAGTCAGAT', editing_efficiency: 0.91, off_targets: 0, pam: 'CGG' }
        ],
        summary: {
          total_candidates_generated: 127,
          high_efficiency_candidates: 3,
          zero_off_targets: 3,
        }
      }
    }
  },
  {
    id: 'generate_repair_template',
    name: 'Engineer Correction Template',
    endpoint: '/generate_repair_template',
    icon: '🔧',
    color: 'blue',
    description: 'Forge flawless, high-efficiency DNA repair templates for perfect, scarless correction of genetic defects.',
    capabilities: [
      'Biologically-Optimized Homology Arms (up to 10kb)',
      'Predictive HDR Success Rate > 85%',
      'Suppression of Indel Formation',
      'Intelligent Recombination Site Placement'
    ],
    useCases: [
      {
        title: 'Genetic Defect Reversal',
        description: 'Reverse catastrophic, disease-causing mutations with absolute fidelity.',
        examples: ['RUNX1 Germline Restoration', 'CFTR Defect Correction', 'Huntingtin Trinucleotide Contraction']
      },
      {
        title: 'Strategic Payload Integration',
        description: 'Insert any genetic circuit or therapeutic payload into genomically stable safe harbors.',
        examples: ['AAVS1 Safe Harbor Insertion', 'CCR5 Fortification']
      }
    ],
    simulation: {
      input: {
        target_locus: 'chr4:3076603', // Huntingtin gene
        correction_type: 'trinucleotide_contraction',
        homology_arm_length: 5000, // 5kb arms
        desired_CAG_repeats: 20
      },
      steps: [
        {
          title: 'Locus Deconstruction',
          description: 'Deconstructing the target locus and its epigenetic landscape for optimal template design',
          duration: 2200
        },
        {
          title: 'Homology Arm Forging',
          description: 'Forging 5kb homology arms with maximal biological plausibility score from Evo2',
          duration: 4500
        },
        {
          title: 'Correction Fidelity Simulation',
          description: 'Simulating the repair process to predict a near-certain successful correction via Zeta Index',
          duration: 1800
        }
      ],
      finalOutput: {
        template: {
          left_arm: 'ATCGATCGATCG...5000bp',
          corrected_sequence: '[CAG]x20',
          right_arm: 'GCTAGCTAGCTA...5000bp',
          total_length: 10060,
          predicted_correction_fidelity: 0.89,
        },
        quality_control: {
          inhibitory_structures: 'none',
          repeat_elements: 'purged',
        }
      }
    }
  },
  {
    id: 'generate_therapeutic_protein',
    name: 'Design Therapeutic Proteins',
    endpoint: '/generate_therapeutic_protein_coding_sequence',
    icon: '🧬',
    color: 'green',
    description: 'Engineer de novo therapeutic proteins (e.g., nanobodies, inhibitors) with high binding affinity and stability.',
    capabilities: [
      'Picomolar Binding Affinity Prediction',
      'Enhanced Thermostability Engineering',
      'Immunogenicity Minimization',
      'Optimized Codon Usage'
    ],
    useCases: [
      {
        title: 'De Novo Biologics',
        description: 'Design high-affinity nanobodies or molecular inhibitors for specific biological targets.',
        examples: ['Anti-RUNX1 Nanobody', 'Anti-MMP9 Metastasis Inhibitor']
      },
      {
        title: 'Enzyme Engineering',
        description: 'Engineer enhanced enzymes for metabolic disorders or therapeutic applications.',
        examples: ['Stable Lysosomal Enzymes', 'High-Activity Metabolic Enzymes']
      }
    ],
    simulation: {
      input: {
        protein_type: 'nanobody',
        target_protein: 'PD-L1',
        design_parameters: ['high_binding_affinity', 'thermostability', 'low_immunogenicity'],
      },
      steps: [
        {
          title: 'Candidate Generation',
          description: 'Generating novel protein sequences with the Zeta Forge',
          duration: 4000
        },
        {
          title: 'Structural Validation (Zeta Boltz)',
          description: 'Simulating 3D target binding with AlphaFold 3 to confirm optimal protein-target interaction',
          duration: 4500
        },
        {
          title: 'Performance Scoring (Zeta Index)',
          description: 'Ranking candidates by binding affinity, stability, and immunogenicity profile',
          duration: 1500
        }
      ],
      finalOutput: {
        top_candidates: [
          {
            sequence: 'QVQLQESGGGLVQPGGSLRLSCAASGFTFSSYAMSWVRQAPGKGLEWVSGISWNSGSIGYADSVKGR...',
            predicted_binding_affinity_kd: '52 pM', // Picomolar
            predicted_melting_temp: '95°C',
            immunogenicity_risk: 'low',
          }
        ],
        design_summary: {
          total_candidates_generated: 2103,
          high_affinity_candidates: 22,
          low_immunogenicity_candidates: 412,
        }
      }
    }
  },
  {
    id: 'generate_genomic_sequence',
    name: 'Design Synthetic Genomes',
    endpoint: '/generate_genomic_sequence',
    icon: '📜',
    color: 'purple',
    description: 'Generate complete, biologically coherent genomes with functional gene architecture and regulatory elements.',
    capabilities: [
      'Large-Scale Generation (up to 10Mb)',
      'Conserved Synteny and Gene Architecture',
      'De Novo Functional Gene Creation',
      'Multi-Domain Organism Design'
    ],
    useCases: [
      {
        title: 'Synthetic Biology Design',
        description: 'Generate complete and functional mitochondrial, prokaryotic, or eukaryotic genomes.',
        examples: ['Custom Mitochondria (~16kb)', 'Minimal Bacterial Chassis (~580kb)', 'Synthetic Yeast Chromosome (~330kb)']
      },
      {
        title: 'Genome Completion',
        description: 'Complete and optimize partial genetic sequences with high accuracy.',
        examples: ['Ancient DNA Reconstruction', 'Cross-species Gene Synthesis']
      }
    ],
    simulation: {
      input: {
        genome_class: 'minimal_prokaryote',
        length_kb: 580,
        base_organism: 'mycoplasma_genitalium'
      },
      steps: [
        {
          title: 'Seeding Creation',
          description: 'Initializing autoregressive creation with a genetic seed from the base organism',
          duration: 800
        },
        {
          title: 'Genome Authoring',
          description: 'Authoring 580kb of novel, coherent genomic code',
          duration: 6000
        },
        {
          title: 'Blueprint Validation',
          description: 'Verifying perfect gene architecture, content, and coding integrity',
          duration: 1800
        }
      ],
      finalOutput: {
        sequence: 'GATCACAGGTCTATCACCCTATTAACCACTCACGGGAGCTCTCCATGCATTTGGTATTTTCGTCTGGGGGGTATGCACGCGATAGCATTGCGAGACGCTGGAGCCGGAGCACCCTATGTCGCAGTATCTGTCTTTGATTCCTG...',
        validation_report: {
          predicted_gene_count: 482,
          functional_protein_families: 475, // Pfam hits
          trna_count: 33,
          rrna_operons: 1,
          synteny_coherence_score: 0.99
        }
      }
    }
  },
  {
    id: 'generate_regulatory_element',
    name: 'Design Regulatory Elements',
    endpoint: '/generate_optimized_regulatory_element',
    icon: '⚡',
    color: 'orange',
    description: 'Design precise genetic regulatory elements that respond to specific cellular conditions and states.',
    capabilities: [
      'Tissue-Specific Expression Control',
      'Custom Transcription Factor Logic',
      'Epigenetic State Programming',
      'Methylation-Resistant Design'
    ],
    useCases: [
      {
        title: 'Targeted Gene Therapy',
        description: 'Create regulatory elements that activate therapeutic genes only in specific tissues.',
        examples: ['Tumor-Specific Promoters', 'Neuron-Specific Enhancers']
      },
      {
        title: 'Synthetic Biology Circuits',
        description: 'Engineer genetic logic gates for advanced synthetic biology applications.',
        examples: ['AND-gate for dual-input activation', 'NOT-gate for repression']
      }
    ],
    simulation: {
      input: {
        element_type: 'promoter',
        activation_context: 'hypoxia AND lactate > 5mM', // Tumor microenvironment
        target_tfs: ['HIF1A', 'MYC']
      },
      steps: [
        {
          title: 'Logic Gate Design',
          description: 'Designing optimal binding sites for HIF1A and MYC to create an AND-gate',
          duration: 2800
        },
        {
          title: 'State Programming',
          description: 'Generating sequence predicted to be active ONLY in the specified tumor microenvironment',
          duration: 3500
        },
        {
          title: 'Specificity Validation',
          description: 'Scoring final sequence for zero activation in healthy tissues',
          duration: 1500
        }
      ],
      finalOutput: {
        designed_elements: [
          {
            sequence: 'TATAAAAGGCGCGCCGATCGATCGATC...',
            element_type: 'promoter',
            predicted_specificity_score: 0.99, // 1% activation in normal tissue
            predicted_activation_strength: '200x vs baseline',
          }
        ],
        validation: {
          tfbs_sites_present: ['HIF1A', 'MYC'],
          cpg_islands: 'purged',
        }
      }
    }
  }
];
