import { InteractiveConcept, ConceptSection } from './interactive-biology-concepts';

export const interactiveHallmarksConcepts: ConceptSection[] = [
  {
    id: 'core-hallmarks',
    title: '3.1 Core Hallmarks (The Original Six)',
    subtitle: 'The fundamental capabilities that enable cancer',
    concepts: [
      {
        id: 'growth-signals',
        title: 'Self-Sufficiency in Growth Signals',
        frontContent: 'Cancer cells can **grow without** external signals',
        backContent: 'Normal cells wait for "go" signals. Cancer cells make their own growth signals or become hypersensitive to weak signals.',
        type: 'flip',
        color: 'red',
        icon: '🚦',
        memoryAid: '**S**elf-**S**ufficient = **S**olo **S**tarter (doesn\'t need permission)',
        quiz: {
          question: 'What happens when cancer cells become self-sufficient in growth signals?',
          options: ['They stop growing', 'They grow without external signals', 'They die', 'They become normal'],
          correctAnswer: 1,
          explanation: 'Cancer cells can proliferate without waiting for external growth signals, unlike normal cells.'
        },
        relatedConcepts: ['growth-inhibition', 'apoptosis-evasion']
      },
      {
        id: 'growth-inhibition',
        title: 'Insensitivity to Growth Inhibition',
        frontContent: 'Cancer cells **ignore "stop" signals** from other cells',
        backContent: 'Normal cells respond to signals that tell them to stop growing. Cancer cells become deaf to these "brake" signals.',
        type: 'flip',
        color: 'red',
        icon: '🛑',
        memoryAid: '**I**nsensitive = **I**gnores **I**nhibition (deaf to stop signals)',
        quiz: {
          question: 'How do cancer cells respond to growth inhibition signals?',
          options: ['They stop growing immediately', 'They slow down growth', 'They ignore the signals', 'They die'],
          correctAnswer: 2,
          explanation: 'Cancer cells become insensitive to growth inhibition signals, allowing uncontrolled proliferation.'
        },
        relatedConcepts: ['growth-signals', 'contact-inhibition']
      },
      {
        id: 'apoptosis-evasion',
        title: 'Evading Apoptosis',
        frontContent: 'Cancer cells **resist programmed cell death**',
        backContent: 'Normal cells have a self-destruct mechanism when damaged. Cancer cells disable this safety mechanism and refuse to die.',
        type: 'flip',
        color: 'red',
        icon: '💀',
        memoryAid: '**E**vading **A**poptosis = **E**ternal **A**live (refuses to die)',
        quiz: {
          question: 'What is apoptosis?',
          options: ['Cell growth', 'Cell division', 'Programmed cell death', 'Cell repair'],
          correctAnswer: 2,
          explanation: 'Apoptosis is programmed cell death - a natural process that cancer cells learn to evade.'
        },
        relatedConcepts: ['dna-damage', 'p53-pathway']
      },
      {
        id: 'limitless-replication',
        title: 'Limitless Replicative Potential',
        frontContent: 'Cancer cells can **divide forever** (immortalization)',
        backContent: 'Normal cells can only divide ~50 times before dying. Cancer cells bypass this limit and become immortal.',
        type: 'flip',
        color: 'red',
        icon: '♾️',
        memoryAid: '**L**imitless **R**eplication = **L**ife **R**epeats (forever young)',
        quiz: {
          question: 'How many times can normal cells typically divide?',
          options: ['10 times', '25 times', '50 times', 'Unlimited'],
          correctAnswer: 2,
          explanation: 'Normal cells can typically divide about 50 times before reaching senescence (the Hayflick limit).'
        },
        relatedConcepts: ['telomeres', 'senescence']
      },
      {
        id: 'angiogenesis',
        title: 'Sustained Angiogenesis',
        frontContent: 'Cancer cells **recruit blood vessels** to feed the tumor',
        backContent: 'Tumors need nutrients and oxygen. Cancer cells send signals to grow new blood vessels (angiogenesis) to supply the tumor.',
        type: 'flip',
        color: 'red',
        icon: '🩸',
        memoryAid: '**A**ngiogenesis = **A**rtery **A**ddition (building blood highways)',
        quiz: {
          question: 'What is angiogenesis?',
          options: ['Cell division', 'Blood vessel formation', 'Cell death', 'DNA repair'],
          correctAnswer: 1,
          explanation: 'Angiogenesis is the formation of new blood vessels, which tumors need to grow beyond 1-2mm.'
        },
        relatedConcepts: ['vegf-signaling', 'tumor-microenvironment']
      },
      {
        id: 'invasion-metastasis',
        title: 'Tissue Invasion & Metastasis',
        frontContent: 'Cancer cells can **invade and spread** to distant sites',
        backContent: 'Normal cells stay in their designated tissue. Cancer cells break free, invade surrounding tissue, and spread throughout the body.',
        type: 'flip',
        color: 'red',
        icon: '🏃',
        memoryAid: '**I**nvasion & **M**etastasis = **I**nfiltrate & **M**igrate (cancer\'s travel plans)',
        quiz: {
          question: 'What makes metastasis so dangerous?',
          options: ['It makes cells bigger', 'It spreads cancer throughout the body', 'It changes cell color', 'It makes cells divide slower'],
          correctAnswer: 1,
          explanation: 'Metastasis is dangerous because it spreads cancer to distant organs, making treatment much more difficult.'
        },
        relatedConcepts: ['epithelial-mesenchymal-transition', 'circulating-tumor-cells']
      }
    ]
  },
  {
    id: 'emerging-hallmarks',
    title: '3.2 Emerging Hallmarks (The New Additions)',
    subtitle: 'Additional capabilities discovered in recent research',
    concepts: [
      {
        id: 'metabolism-reprogramming',
        title: 'Reprogramming Energy Metabolism',
        frontContent: 'Cancer cells **change how they make energy** (Warburg effect)',
        backContent: 'Cancer cells switch to inefficient but fast energy production, even when oxygen is available. This supports rapid growth.',
        type: 'flip',
        color: 'orange',
        icon: '⚡',
        memoryAid: '**R**eprogramming **M**etabolism = **R**apid **M**aker (fast energy production)',
        quiz: {
          question: 'What is the Warburg effect?',
          options: ['Cancer cells using oxygen efficiently', 'Cancer cells using sugar without oxygen', 'Cancer cells stopping energy production', 'Cancer cells sleeping'],
          correctAnswer: 1,
          explanation: 'The Warburg effect describes how cancer cells preferentially use glucose fermentation even when oxygen is available.'
        },
        relatedConcepts: ['glycolysis', 'lactate-production']
      },
      {
        id: 'immune-evasion',
        title: 'Evading Immune Destruction',
        frontContent: 'Cancer cells **hide from** or **disable** the immune system',
        backContent: 'The immune system should recognize and destroy cancer cells. Cancer cells develop ways to become invisible or turn off immune responses.',
        type: 'flip',
        color: 'orange',
        icon: '🥷',
        memoryAid: '**E**vading **I**mmune = **E**xpert **I**nvisibility (ninja cancer)',
        quiz: {
          question: 'How do cancer cells evade the immune system?',
          options: ['By growing faster', 'By hiding or disabling immune responses', 'By changing color', 'By moving to different organs'],
          correctAnswer: 1,
          explanation: 'Cancer cells can become invisible to immune cells or actively suppress immune responses against them.'
        },
        relatedConcepts: ['checkpoint-inhibitors', 'tumor-antigens']
      }
    ]
  },
  {
    id: 'enabling-characteristics',
    title: '3.3 Enabling Characteristics (The Facilitators)',
    subtitle: 'Characteristics that enable the acquisition of hallmarks',
    concepts: [
      {
        id: 'genomic-instability',
        title: 'Genomic Instability & Mutation',
        frontContent: 'Cancer cells have **unstable DNA** that mutates frequently',
        backContent: 'Normal cells carefully maintain their DNA. Cancer cells have defective DNA repair, leading to many mutations that drive cancer progression.',
        type: 'flip',
        color: 'purple',
        icon: '🧬',
        memoryAid: '**G**enomic **I**nstability = **G**enetic **I**rregularity (DNA chaos)',
        quiz: {
          question: 'What causes genomic instability in cancer?',
          options: ['Perfect DNA repair', 'Defective DNA repair mechanisms', 'Too much sleep', 'Healthy diet'],
          correctAnswer: 1,
          explanation: 'Genomic instability results from defective DNA repair mechanisms, allowing mutations to accumulate.'
        },
        relatedConcepts: ['dna-repair-pathways', 'mutation-accumulation']
      },
      {
        id: 'inflammation',
        title: 'Tumor-Promoting Inflammation',
        frontContent: 'Chronic **inflammation helps** cancer grow and spread',
        backContent: 'While acute inflammation fights infection, chronic inflammation creates an environment that promotes cancer development and progression.',
        type: 'flip',
        color: 'purple',
        icon: '🔥',
        memoryAid: '**T**umor **I**nflammation = **T**rouble **I**ncreases (inflammation feeds cancer)',
        quiz: {
          question: 'How does chronic inflammation affect cancer?',
          options: ['It prevents cancer', 'It promotes cancer growth', 'It has no effect', 'It only affects skin'],
          correctAnswer: 1,
          explanation: 'Chronic inflammation creates a microenvironment that promotes cancer development and progression.'
        },
        relatedConcepts: ['cytokines', 'inflammatory-mediators']
      }
    ]
  }
];

export const hallmarksMemoryAids = {
  coreHallmarksAcronym: {
    title: 'SILAGE Memory Device',
    description: 'Remember the 6 core hallmarks with this farming acronym',
    acronym: {
      'S': 'Self-sufficiency in growth signals',
      'I': 'Insensitivity to growth inhibition', 
      'L': 'Limitless replicative potential',
      'A': 'Angiogenesis (sustained)',
      'G': 'Growth inhibition (evading apoptosis)',
      'E': 'Evading immune destruction (tissue invasion & metastasis)'
    },
    note: 'Think of cancer as a "silage" that grows uncontrollably like weeds'
  },
  hallmarksHouse: {
    title: 'Cancer House Analogy',
    description: 'Think of cancer as building a house with these "rooms"',
    rooms: {
      foundation: 'Genomic instability (shaky foundation)',
      basement: 'Inflammation (toxic basement)',
      kitchen: 'Reprogrammed metabolism (changed kitchen)',
      livingRoom: 'Growth signals (always "on" TV)',
      bedroom: 'Evading apoptosis (never sleeps)',
      bathroom: 'Angiogenesis (plumbing for blood)',
      attic: 'Limitless replication (infinite storage)',
      frontDoor: 'Invasion & metastasis (door always open)'
    }
  },
  trafficLightSystem: {
    title: 'Traffic Light Memory System',
    description: 'Use traffic light colors to remember hallmark categories',
    system: {
      red: 'Core hallmarks (DANGER - the original 6)',
      yellow: 'Emerging hallmarks (CAUTION - the new 2)', 
      purple: 'Enabling characteristics (SUPPORT - the facilitators)'
    }
  }
}; 