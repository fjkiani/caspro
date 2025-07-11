export interface GeneticConcept {
  id: string;
  title: string;
  description: string;
  type: 'basic' | 'oncogene' | 'tumor-suppressor';
}

export interface TwoHitStep {
  id: string;
  title: string;
  description: string;
  genes: Array<{
    status: 'normal' | 'mutated';
  }>;
}

export interface TwoHitPathway {
  id: string;
  title: string;
  steps: TwoHitStep[];
}

export const geneticConcepts: GeneticConcept[] = [
  {
    id: 'gene-definition',
    title: 'Gene',
    description: 'A region of DNA that encodes for a functional product (RNA or protein). Humans have ~25,000 genes making up the genome.',
    type: 'basic'
  },
  {
    id: 'central-dogma',
    title: 'Central Dogma',
    description: 'The flow of genetic information: DNA → RNA → Protein',
    type: 'basic'
  },
  {
    id: 'mutation-types',
    title: 'Mutation Types',
    description: 'Inherited (Germline): Present in egg/sperm, passed to offspring. Acquired (Somatic): Occurs during life, not inherited.',
    type: 'basic'
  }
];

export const oncogeneVsTumorSuppressor = {
  oncogenes: {
    title: 'Oncogenes (Gas Pedal)',
    description: 'An activating mutation leads to uncontrolled proliferation.',
    color: 'red',
    mechanism: 'Gain of function - promotes cell division'
  },
  tumorSuppressors: {
    title: 'Tumor Suppressors (Brakes)',
    description: 'An inactivating mutation removes protection against proliferation.',
    color: 'green',
    mechanism: 'Loss of function - normally prevents cell division'
  }
};

export const twoHitPathways: TwoHitPathway[] = [
  {
    id: 'sporadic-cancer',
    title: 'Sporadic Cancer',
    steps: [
      {
        id: 'sporadic-start',
        title: 'Born with two normal alleles',
        description: 'Individual starts with two functional copies of tumor suppressor gene',
        genes: [
          { status: 'normal' },
          { status: 'normal' }
        ]
      },
      {
        id: 'sporadic-first-hit',
        title: 'First Hit (Somatic)',
        description: 'One copy becomes mutated during lifetime',
        genes: [
          { status: 'mutated' },
          { status: 'normal' }
        ]
      },
      {
        id: 'sporadic-second-hit',
        title: 'Second Hit (Somatic)',
        description: 'Second copy becomes mutated - cancer develops',
        genes: [
          { status: 'mutated' },
          { status: 'mutated' }
        ]
      }
    ]
  },
  {
    id: 'hereditary-cancer',
    title: 'Hereditary Cancer',
    steps: [
      {
        id: 'hereditary-start',
        title: 'Born with one mutated allele (First Hit)',
        description: 'Individual inherits one defective copy from parent',
        genes: [
          { status: 'mutated' },
          { status: 'normal' }
        ]
      },
      {
        id: 'hereditary-second-hit',
        title: 'Only one more somatic Second Hit is needed',
        description: 'Much higher cancer risk - only need one more mutation',
        genes: [
          { status: 'mutated' },
          { status: 'mutated' }
        ]
      }
    ]
  }
];

export const centralDogmaSteps = [
  {
    id: 'dna',
    name: 'DNA',
    process: 'Replication',
    description: 'Genetic information stored in chromosomes'
  },
  {
    id: 'rna',
    name: 'RNA',
    process: 'Transcription',
    description: 'Messenger molecule that carries genetic code'
  },
  {
    id: 'protein',
    name: 'Protein',
    process: 'Translation',
    description: 'Functional molecules that carry out cellular processes'
  }
]; 