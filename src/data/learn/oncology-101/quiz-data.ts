export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string | string[];
  type: 'single' | 'multiple';
  hint: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'lung-cancer-risk',
    question: 'What is the major risk factor for developing lung cancer?',
    options: ['Smoking', 'Age', 'Diet', 'Asbestos'],
    correctAnswer: 'Smoking',
    type: 'single',
    hint: 'Smoking is the leading cause of lung cancer deaths. See Part 11: Cross-Cancer Prevention Strategies.',
    category: 'Risk Factors'
  },
  {
    id: 'liver-cancer-risk',
    question: 'What are the major risk factors for developing liver cancer?',
    options: ['Hepatitis and cirrhosis', 'Smoking and diet', 'Age and gender', 'High blood pressure'],
    correctAnswer: 'Hepatitis and cirrhosis',
    type: 'single',
    hint: 'Chronic hepatitis infections leading to cirrhosis are the most common risk factors. See Part 10.',
    category: 'Risk Factors'
  },
  {
    id: 'breast-cancer-risk',
    question: 'What are the major risk factors for developing breast cancer?',
    options: ['Age, + family history, BRCA1 carrier', 'Diet high in red meat', 'Smoking', 'Lack of exercise'],
    correctAnswer: 'Age, + family history, BRCA1 carrier',
    type: 'single',
    hint: 'Age, family history, and genetic mutations like BRCA1 are significant risk factors. See Part 10.',
    category: 'Risk Factors'
  },
  {
    id: 'cancer-definition',
    question: 'How is cancer best defined?',
    options: ['Uncontrolled growth', 'A single mutation', 'A benign tumor', 'A viral infection'],
    correctAnswer: 'Uncontrolled growth',
    type: 'single',
    hint: 'Cancer is fundamentally characterized by the uncontrolled division of abnormal cells. See Part 1.',
    category: 'Basic Concepts'
  },
  {
    id: 'cancer-types',
    question: 'Name the major types of cancer',
    options: ['Carcinoma, sarcoma, leukemia, lymphoma', 'Adenoma, fibroma, myeloma, blastoma', 'All of the above', 'None of the above'],
    correctAnswer: 'Carcinoma, sarcoma, leukemia, lymphoma',
    type: 'single',
    hint: 'These are the four main classifications based on tissue of origin. See Part 1.',
    category: 'Basic Concepts'
  },
  {
    id: 'warburg-effect',
    question: 'One way cancer cells differ from normal cells is metabolism. What effect is this phenomena known as?',
    options: ['Warburg Effect', 'None of these options', 'Watson Effect', 'Telomerase Effect'],
    correctAnswer: 'Warburg Effect',
    type: 'single',
    hint: 'Review Part 3: Hallmarks of Cancer, specifically "Deregulating Cellular Metabolism".',
    category: 'Hallmarks'
  },
  {
    id: 'pd-l1',
    question: 'Cancer cells differ from normal cells as they are able to up-regulate signals to attenuate CD-8+ T Cell proliferation. What ligand do tumor cells up-regulate?',
    options: ['PD L1.', 'CP L2.', 'Both of these.'],
    correctAnswer: 'PD L1.',
    type: 'single',
    hint: 'Refer to Part 3, "Avoiding Immune Destruction" to learn about the PD-1/PD-L1 checkpoint.',
    category: 'Hallmarks'
  },
  {
    id: 'telomerase',
    question: 'One way cancer cells differ from normal cells is that cancer cells can become immortal. Which enzyme do cancer cells use to elongate telomeres?',
    options: ['None of these options', 'DNA', 'Telomerase', 'Ribosomes'],
    correctAnswer: 'Telomerase',
    type: 'single',
    hint: 'See the "Enabling Replicative Immortality" hallmark in Part 3.',
    category: 'Hallmarks'
  },
  {
    id: 'oncogene',
    question: 'Typically, a cancer cell can over-express a gene that contributes to tumor cell proliferation and tumor formation. This gene is known as ________',
    options: ['a tumor suppressor', 'a blue gene', 'an oncogene'],
    correctAnswer: 'an oncogene',
    type: 'single',
    hint: 'Review "Oncogenes & Tumor Suppressors" in Part 2.',
    category: 'Genetics'
  },
  {
    id: 'tumor-suppressors',
    question: 'Genes that are found to be deleted or mutationally inactivated in cancers and allow them to grow are called ______________ .',
    options: ['Tumor Suppressor Genes and Oncogene', 'Tumor Suppressor Genes', 'Nutrients', 'Oncogenes', 'Nutrients and Tumor Suppressor Genes'],
    correctAnswer: 'Tumor Suppressor Genes',
    type: 'single',
    hint: 'Losing the "brakes" (Tumor Suppressors) is critical for cancer growth. See Part 2.',
    category: 'Genetics'
  },
  {
    id: 'metastasis-steps',
    question: 'Which of the following are key steps in metastasis?',
    options: ['Invasion', 'Extravasation', 'Intravasation', 'All of the above'],
    correctAnswer: ['All of the above'],
    type: 'multiple',
    hint: 'The Metastatic Cascade in Part 4 details these steps.',
    category: 'Metastasis'
  },
  {
    id: 'adjuvant-therapy',
    question: 'Adjuvant therapy:',
    options: ['Occurs before surgery or radiation', 'Is a type of imaging', 'Occurs after surgery or radiation to treat a primary tumor', 'Is only for metastatic disease'],
    correctAnswer: 'Occurs after surgery or radiation to treat a primary tumor',
    type: 'single',
    hint: 'Adjuvant therapy is additional treatment given after the primary treatment to lower the risk of recurrence. See Part 7: The Armory.',
    category: 'Treatment'
  },
  {
    id: 'prostate-first-line',
    question: 'The first line therapy for metastatic prostate cancer is:',
    options: ['Chemotherapy', 'Hormone therapy', 'Surgery', 'Radiation'],
    correctAnswer: 'Hormone therapy',
    type: 'single',
    hint: 'Androgen deprivation therapy (ADT), a type of hormone therapy, is the standard first-line treatment for metastatic hormone-sensitive prostate cancer. See Part 10.',
    category: 'Treatment'
  },
  {
    id: 'avastin',
    question: 'Bevacizumab (Avastin®) inhibits:',
    options: ['EGFR', 'HER2', 'VEGF', 'PD-1'],
    correctAnswer: 'VEGF',
    type: 'single',
    hint: 'Bevacizumab is designed to block Vascular Endothelial Growth Factor (VEGF) to inhibit angiogenesis. See Part 7: The Armory.',
    category: 'Treatment'
  },
  {
    id: 'checkpoint-inhibitors',
    question: 'The two checkpoints currently targeted by immunotherapy are:',
    options: ['VEGF and EGFR', 'PD-1 and CTLA-4', 'mTOR and ALK', 'ER and PR'],
    correctAnswer: 'PD-1 and CTLA-4',
    type: 'single',
    hint: 'These are the two most common targets for immune checkpoint inhibitors. See Part 7: The Armory.',
    category: 'Treatment'
  }
];

export const quizCategories = [
  'Risk Factors',
  'Basic Concepts', 
  'Hallmarks',
  'Genetics',
  'Metastasis',
  'Treatment'
]; 