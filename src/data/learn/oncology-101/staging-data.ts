export interface TNMComponent {
  letter: string;
  name: string;
  description: string;
  color: string;
}

export interface EcologySection {
  title: string;
  description: string;
  concepts: string[];
}

export const tnmComponents: TNMComponent[] = [
  {
    letter: 'T',
    name: 'Tumor',
    description: 'Describes the size and extent of the primary tumor. A larger number (e.g., T4 vs. T1) indicates a larger or more invasive tumor.',
    color: 'blue'
  },
  {
    letter: 'N',
    name: 'Node',
    description: 'Indicates if the cancer has spread to nearby lymph nodes. N0 means no spread; N1, N2, etc., indicate increasing involvement.',
    color: 'green'
  },
  {
    letter: 'M',
    name: 'Metastasis',
    description: 'Indicates if the cancer has metastasized to distant parts of the body. M0 means no metastasis; M1 means it has spread.',
    color: 'red'
  }
];

export const stagingIntroduction = {
  title: 'The TNM Staging System',
  description: 'A universal system to classify the extent of cancer spread, guiding prognosis and treatment.',
  example: 'Example: A patient with a T1 N0 M0 stage has a small, localized tumor with a good prognosis. A T4 N2 M1 stage indicates a large, invasive tumor that has spread to lymph nodes and distant organs, representing a much more serious condition.'
};

export const cancerEcology: EcologySection[] = [
  {
    title: 'Seed and Soil',
    description: 'Proposed by Stephen Paget in 1889, this hypothesis states that metastatic cancer cells (the "seeds") can only grow in specific, hospitable distant organs (the "soil").',
    concepts: [
      'Explains why certain cancers tend to metastasize to specific sites',
      'Prostate cancer commonly spreads to bone',
      'Breast cancer often metastasizes to liver, lung, bone, and brain',
      'Colon cancer frequently spreads to liver'
    ]
  },
  {
    title: 'The Cancer Swamp',
    description: 'The primary tumor creates its own hostile ecosystem—hypoxic, acidic, and nutrient-poor.',
    concepts: [
      'Harsh environment drives evolution of aggressive cancer cells',
      'Hypoxic (low oxygen) conditions',
      'Acidic pH from altered metabolism',
      'Nutrient depletion from rapid growth',
      'Pressures cells to escape (metastasize) in search of better environment'
    ]
  }
];

export const oligometastasisConcept = {
  title: 'Oligometastasis: A State of Limited Metastatic Disease',
  description: 'A theory that a less aggressive "laid back" form of metastasis exists, where patients have only a few metastatic lesions and may still be curable.',
  comparison: {
    limited: {
      title: 'Oligometastasis (Limited)',
      characteristics: [
        'Primary tumor is less harsh',
        'Fewer, less aggressive CTCs are shed',
        'Distant organs are less hospitable "soil"',
        'Result: Few, treatable metastatic lesions'
      ],
      color: 'green'
    },
    widespread: {
      title: 'Widespread Metastasis (Aggressive)',
      characteristics: [
        'Primary tumor is a harsh "cancer swamp"',
        'Many, aggressive CTCs are shed',
        'Distant organs are fertile "soil"',
        'Result: Numerous, difficult-to-treat lesions'
      ],
      color: 'red'
    }
  }
}; 