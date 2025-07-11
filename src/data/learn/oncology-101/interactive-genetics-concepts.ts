import { InteractiveConcept, ConceptSection } from './interactive-biology-concepts';

export const interactiveGeneticsConcepts: ConceptSection[] = [
  {
    id: 'core-genetics',
    title: '2.1 Core Genetic Concepts',
    subtitle: 'Fundamental definitions in cancer genetics',
    concepts: [
      {
        id: 'gene-definition',
        title: 'Gene',
        frontContent: 'A region of **DNA** that encodes for a functional product',
        backContent: 'Humans have ~25,000 genes making up the genome, packaged into 23 pairs of chromosomes. Each gene is like a recipe for making proteins.',
        type: 'flip',
        color: 'teal',
        icon: '🧬',
        memoryAid: '**G**ene = **G**uidebook for **E**very **N**eeded **E**ngine (protein)',
        quiz: {
          question: 'How many genes do humans have approximately?',
          options: ['10,000', '25,000', '50,000', '100,000'],
          correctAnswer: 1,
          explanation: 'Humans have approximately 25,000 genes, which is surprisingly fewer than some plants!'
        },
        relatedConcepts: ['central-dogma', 'chromosome']
      },
      {
        id: 'central-dogma',
        title: 'Central Dogma',
        frontContent: 'The flow of genetic information: **DNA → RNA → Protein**',
        backContent: 'This is the fundamental process of life. DNA stores information, RNA carries the message, and proteins do the work.',
        type: 'flip',
        color: 'teal',
        icon: '➡️',
        memoryAid: '**D**ad **R**eads **P**aper (DNA → RNA → Protein)',
        quiz: {
          question: 'What is the correct flow of genetic information?',
          options: ['Protein → DNA → RNA', 'RNA → DNA → Protein', 'DNA → RNA → Protein', 'DNA → Protein → RNA'],
          correctAnswer: 2,
          explanation: 'The Central Dogma states that genetic information flows from DNA to RNA to Protein.'
        },
        relatedConcepts: ['gene-definition', 'mutation-types']
      },
      {
        id: 'mutation-types',
        title: 'Mutation Types',
        frontContent: '**Inherited** (Germline) vs **Acquired** (Somatic)',
        backContent: 'Inherited mutations are passed from parents to children. Acquired mutations happen during your lifetime and aren\'t passed on.',
        type: 'flip',
        color: 'teal',
        icon: '🔄',
        memoryAid: '**I**nherited = **I**n from birth, **A**cquired = **A**fter birth',
        quiz: {
          question: 'Which type of mutation can be passed to offspring?',
          options: ['Somatic mutations', 'Germline mutations', 'Both types', 'Neither type'],
          correctAnswer: 1,
          explanation: 'Only germline mutations (inherited) can be passed to offspring because they\'re present in reproductive cells.'
        },
        relatedConcepts: ['gene-definition', 'central-dogma']
      }
    ]
  },
  {
    id: 'oncogenes-tumor-suppressors',
    title: '2.2 Oncogenes & Tumor Suppressors',
    subtitle: 'The two main classes of cancer genes',
    concepts: [
      {
        id: 'oncogenes',
        title: 'Oncogenes (Gas Pedal)',
        frontContent: 'Genes that **promote** cell division when mutated',
        backContent: 'Normal version (proto-oncogene) helps cells grow when needed. Mutated version is like a stuck gas pedal - always telling cells to divide.',
        type: 'flip',
        color: 'red',
        icon: '🚗',
        memoryAid: '**O**ncogenes = **O**veractive **G**as pedal',
        quiz: {
          question: 'What happens when an oncogene is activated?',
          options: ['Cell division stops', 'Cell division increases', 'Cell dies', 'Nothing happens'],
          correctAnswer: 1,
          explanation: 'Activated oncogenes promote excessive cell division, like a gas pedal stuck in the "on" position.'
        },
        relatedConcepts: ['tumor-suppressors', 'two-hit-hypothesis']
      },
      {
        id: 'tumor-suppressors',
        title: 'Tumor Suppressors (Brakes)',
        frontContent: 'Genes that **prevent** cell division when working normally',
        backContent: 'These genes act like brakes on cell division. When they\'re mutated and don\'t work, cells can\'t stop dividing. Both copies usually need to be broken.',
        type: 'flip',
        color: 'green',
        icon: '🛑',
        memoryAid: '**T**umor **S**uppressors = **T**raffic **S**tops (brakes)',
        quiz: {
          question: 'What happens when tumor suppressor genes are inactivated?',
          options: ['Cells divide more', 'Cells divide less', 'Cells become immortal', 'Cells change color'],
          correctAnswer: 0,
          explanation: 'When tumor suppressors are inactivated, cells lose their "brakes" and can divide uncontrollably.'
        },
        relatedConcepts: ['oncogenes', 'two-hit-hypothesis']
      }
    ]
  },
  {
    id: 'two-hit-hypothesis',
    title: '2.3 The Two-Hit Hypothesis',
    subtitle: 'How tumor suppressor genes contribute to cancer',
    concepts: [
      {
        id: 'sporadic-cancer',
        title: 'Sporadic Cancer',
        frontContent: 'Born with **two normal** copies → Need **two hits** to get cancer',
        backContent: 'Most cancers are sporadic. You start with two working copies of tumor suppressor genes. Both need to be damaged for cancer to develop.',
        type: 'expand',
        color: 'blue',
        icon: '🎯',
        memoryAid: '**S**poradic = **S**tart with **S**afe genes, need **2** hits',
        quiz: {
          question: 'In sporadic cancer, how many tumor suppressor gene copies need to be damaged?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 1,
          explanation: 'In sporadic cancer, both copies of the tumor suppressor gene need to be damaged (two hits).'
        },
        relatedConcepts: ['hereditary-cancer', 'tumor-suppressors']
      },
      {
        id: 'hereditary-cancer',
        title: 'Hereditary Cancer',
        frontContent: 'Born with **one damaged** copy → Need only **one more hit**',
        backContent: 'In hereditary cancer, you inherit one already-damaged copy. You only need one more hit to get cancer, so the risk is much higher.',
        type: 'expand',
        color: 'purple',
        icon: '🧬',
        memoryAid: '**H**ereditary = **H**alfway there (1 hit down, 1 to go)',
        quiz: {
          question: 'Why is hereditary cancer risk higher than sporadic cancer?',
          options: ['It affects more genes', 'You start with one damaged copy', 'It spreads faster', 'It\'s more aggressive'],
          correctAnswer: 1,
          explanation: 'Hereditary cancer risk is higher because you inherit one damaged copy and only need one more hit instead of two.'
        },
        relatedConcepts: ['sporadic-cancer', 'tumor-suppressors']
      }
    ]
  }
];

export const geneticsMemoryAids = {
  centralDogmaFlow: {
    title: 'Central Dogma Memory Palace',
    description: 'Think of a library: DNA is the master book, RNA is the photocopy, Protein is the action taken',
    steps: [
      'DNA (Library Master Book) - permanent storage',
      'RNA (Photocopy) - temporary message',
      'Protein (Action) - does the actual work'
    ]
  },
  oncogeneVsTumorSuppressor: {
    title: 'Car Analogy',
    description: 'Think of cell division like driving a car',
    analogy: {
      oncogenes: 'Gas pedal - when broken, stuck accelerating',
      tumorSuppressors: 'Brakes - when broken, can\'t stop',
      cancer: 'Crash - happens when gas is stuck AND brakes fail'
    }
  },
  twoHitHypothesis: {
    title: 'Lock and Key Analogy',
    description: 'Tumor suppressor genes are like a double-lock system',
    concept: 'You need to break BOTH locks (hits) to open the door to cancer'
  }
}; 