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
    description: 'Cancer cells enter the bloodstream or lymphatics.',
    details: 'Cells penetrate blood or lymphatic vessel walls to enter circulation.'
  },
  {
    id: 'circulation-survival',
    stepNumber: 6,
    title: 'Survival in Circulation',
    description: 'CTCs survive immune attack and physical stress.',
    details: 'Circulating tumor cells (CTCs) must survive immune surveillance and mechanical stress in the bloodstream.'
  },
  {
    id: 'extravasation',
    stepNumber: 7,
    title: 'Extravasation',
    description: 'CTCs exit circulation into a new organ.',
    details: 'Cancer cells adhere to and penetrate blood vessel walls at distant sites.'
  },
  {
    id: 'dormancy-growth',
    stepNumber: 8,
    title: 'Dormancy & Growth',
    description: 'Cells may lie dormant before forming a secondary tumor.',
    details: 'Cells may remain dormant for years before conditions allow them to grow into metastatic tumors.'
  }
];

export const metastasisIntroduction = {
  title: 'Understanding Cancer Metastasis: The Real Killer',
  description: 'Metastasis is the process by which tumor cells move from a primary site to a different organ. A tumor\'s ability to metastasize is what defines it as malignant, and it is the primary cause of death in cancer patients. All the previously discussed hallmarks of cancer enable this deadly process.'
}; 