export interface InteractiveConcept {
  id: string;
  title: string;
  frontContent: string;
  backContent?: string;
  type: 'flip' | 'expand' | 'hover';
  color: string;
  icon: string;
  memoryAid?: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  relatedConcepts?: string[];
}

export interface ConceptSection {
  id: string;
  title: string;
  subtitle: string;
  concepts: InteractiveConcept[];
  interactiveElements?: {
    type: 'comparison' | 'sequence' | 'hierarchy';
    data: any;
  };
}

export const interactiveBiologyConcepts: ConceptSection[] = [
  {
    id: 'core-concepts',
    title: '1.1 Core Concepts',
    subtitle: 'Fundamental definitions in oncology',
    concepts: [
      {
        id: 'cancer-definition',
        title: 'Cancer',
        frontContent: 'A disease of **uncontrolled growth**',
        backContent: 'Cancer is fundamentally a **genetic disease** that results from accumulated genomic variations that affect normal cellular processes.',
        type: 'flip',
        color: 'red',
        icon: '🦠',
        memoryAid: 'Think: **C**ells **A**re **N**ot **C**ontrolled **E**nough **R**ight',
        quiz: {
          question: 'What is the fundamental nature of cancer?',
          options: [
            'A viral infection',
            'A genetic disease of uncontrolled growth',
            'An autoimmune disorder',
            'A metabolic dysfunction'
          ],
          correctAnswer: 1,
          explanation: 'Cancer is fundamentally a genetic disease where cells lose their normal growth control mechanisms due to accumulated mutations.'
        },
        relatedConcepts: ['tumor-definition', 'oncology']
      },
      {
        id: 'tumor-definition',
        title: 'Tumor/Neoplasm',
        frontContent: 'A swelling or **new, abnormal growth** of tissue',
        backContent: 'Not all tumors are cancerous! **Benign** tumors grow locally but don\'t spread. **Malignant** tumors can invade and metastasize.',
        type: 'flip',
        color: 'amber',
        icon: '🎯',
        memoryAid: 'Neo = New, Plasm = Growth → **New Growth**',
        quiz: {
          question: 'What\'s the difference between benign and malignant tumors?',
          options: [
            'Benign tumors are smaller',
            'Malignant tumors can spread to other parts of the body',
            'Benign tumors are more dangerous',
            'There is no difference'
          ],
          correctAnswer: 1,
          explanation: 'Malignant tumors have the ability to invade surrounding tissues and metastasize to distant sites, while benign tumors remain localized.'
        },
        relatedConcepts: ['cancer-definition', 'metastasis']
      },
      {
        id: 'oncology',
        title: 'Oncology',
        frontContent: 'The study of **tumors and cancers**',
        backContent: 'From Greek: **onkos** (mass/tumor) + **logos** (study). Oncologists are the doctors who specialize in cancer treatment.',
        type: 'flip',
        color: 'blue',
        icon: '🔬',
        memoryAid: '**Onk**os = lump, **ology** = study of',
        relatedConcepts: ['cancer-definition', 'tumor-definition']
      },
      {
        id: 'metastasis',
        title: 'Metastasis',
        frontContent: 'The spread of cancer from a **primary site** to distant organs',
        backContent: 'This is what makes cancer truly dangerous. Metastatic cancer is responsible for ~90% of cancer deaths.',
        type: 'flip',
        color: 'purple',
        icon: '🌐',
        memoryAid: '**Meta** = beyond, **stasis** = standing → **Standing Beyond** original location',
        quiz: {
          question: 'What percentage of cancer deaths are caused by metastasis?',
          options: ['30%', '50%', '70%', '90%'],
          correctAnswer: 3,
          explanation: 'Approximately 90% of cancer deaths are due to metastasis, not the primary tumor itself.'
        },
        relatedConcepts: ['cancer-definition', 'tumor-definition']
      }
    ]
  },
  {
    id: 'classification',
    title: '1.2 Classification by Origin',
    subtitle: 'How cancers are categorized based on tissue type',
    concepts: [
      {
        id: 'carcinoma',
        title: 'Carcinoma',
        frontContent: 'Cancer from **epithelial tissue** (linings)',
        backContent: 'Most common type (~85% of cancers). Includes breast, lung, colon, prostate cancers. Epithelial cells line our organs and body surfaces.',
        type: 'flip',
        color: 'cyan',
        icon: '🏢',
        memoryAid: '**Carcinoma** = **Car**pets line floors, epithelial cells **line** organs',
        quiz: {
          question: 'Which type of cancer is most common?',
          options: ['Sarcoma', 'Leukemia', 'Carcinoma', 'Lymphoma'],
          correctAnswer: 2,
          explanation: 'Carcinomas account for about 85% of all cancers because epithelial tissues are constantly dividing and exposed to carcinogens.'
        },
        relatedConcepts: ['sarcoma', 'leukemia', 'lymphoma']
      },
      {
        id: 'sarcoma',
        title: 'Sarcoma',
        frontContent: 'Cancer from **connective tissue** (bone, muscle)',
        backContent: 'Rare but aggressive. Includes bone sarcomas, soft tissue sarcomas. "Sarcoma" means "fleshy tumor" in Greek.',
        type: 'flip',
        color: 'red',
        icon: '💪',
        memoryAid: '**Sarc** = flesh, **oma** = tumor → **Flesh Tumor**',
        relatedConcepts: ['carcinoma', 'leukemia', 'lymphoma']
      },
      {
        id: 'leukemia',
        title: 'Leukemia',
        frontContent: 'Cancer of the **blood** (bone marrow)',
        backContent: 'Literally "white blood" - abnormal white blood cells crowd out normal blood cells. Acute vs. chronic forms.',
        type: 'flip',
        color: 'red',
        icon: '🩸',
        memoryAid: '**Leuk** = white, **emia** = blood → **White Blood** disease',
        quiz: {
          question: 'What does "leukemia" literally mean?',
          options: ['Red blood', 'White blood', 'No blood', 'Bad blood'],
          correctAnswer: 1,
          explanation: 'Leukemia comes from Greek "leukos" (white) and "haima" (blood), referring to the abnormal white blood cells.'
        },
        relatedConcepts: ['lymphoma', 'carcinoma', 'sarcoma']
      },
      {
        id: 'lymphoma',
        title: 'Lymphoma',
        frontContent: 'Cancer of the **lymph system**',
        backContent: 'Affects lymph nodes, spleen, thymus. Two main types: Hodgkin and Non-Hodgkin lymphoma. Part of our immune system.',
        type: 'flip',
        color: 'green',
        icon: '🛡️',
        memoryAid: '**Lymph** = clear fluid, **oma** = tumor → **Lymph system** tumor',
        relatedConcepts: ['leukemia', 'carcinoma', 'sarcoma']
      }
    ]
  },
  {
    id: 'malignancy-path',
    title: '1.3 The Path to Malignancy',
    subtitle: 'The progression from normal cells to invasive cancer',
    concepts: [
      {
        id: 'normal-cells',
        title: 'Normal Cells',
        frontContent: 'Controlled growth, proper function, **organized**',
        backContent: 'Normal cells follow strict rules: grow when needed, stop when told, die when damaged, stay in their designated location.',
        type: 'expand',
        color: 'green',
        icon: '✅',
        memoryAid: 'Normal = **N**eat, **O**rganized, **R**egulated **M**achine **A**lways **L**istening',
        relatedConcepts: ['hyperplasia', 'dysplasia', 'neoplasia']
      },
      {
        id: 'hyperplasia',
        title: 'Hyperplasia',
        frontContent: 'Increased cell **number** (still normal cells)',
        backContent: 'Cells multiply more than usual but are still normal. Reversible if stimulus is removed. Like muscle growth from exercise.',
        type: 'expand',
        color: 'yellow',
        icon: '📈',
        memoryAid: '**Hyper** = excessive, **plasia** = formation → **Excessive Formation**',
        relatedConcepts: ['normal-cells', 'dysplasia', 'neoplasia']
      },
      {
        id: 'dysplasia',
        title: 'Dysplasia',
        frontContent: 'Abnormal cell **appearance** and organization',
        backContent: 'Cells look abnormal under microscope but haven\'t invaded. Often reversible. Like precancerous changes in cervical cells.',
        type: 'expand',
        color: 'orange',
        icon: '⚠️',
        memoryAid: '**Dys** = abnormal, **plasia** = formation → **Abnormal Formation**',
        quiz: {
          question: 'Is dysplasia reversible?',
          options: ['Never', 'Sometimes', 'Always', 'Only in children'],
          correctAnswer: 1,
          explanation: 'Dysplasia is often reversible if the underlying cause is addressed, unlike true neoplasia.'
        },
        relatedConcepts: ['hyperplasia', 'neoplasia', 'normal-cells']
      },
      {
        id: 'neoplasia',
        title: 'Neoplasia',
        frontContent: 'New growth that is **autonomous** and **irreversible**',
        backContent: 'True tumor formation. Cells have lost normal growth controls. Can be benign or malignant.',
        type: 'expand',
        color: 'red',
        icon: '🔴',
        memoryAid: '**Neo** = new, **plasia** = formation → **New Formation** (that won\'t stop)',
        relatedConcepts: ['dysplasia', 'hyperplasia', 'invasion']
      },
      {
        id: 'invasion',
        title: 'Invasion & Metastasis',
        frontContent: 'Cancer cells **break through** boundaries and **spread**',
        backContent: 'The hallmark of malignancy. Cancer cells invade surrounding tissues and can travel to distant sites.',
        type: 'expand',
        color: 'purple',
        icon: '🌊',
        memoryAid: 'Like water **breaking through** a dam and **flooding** everywhere',
        relatedConcepts: ['neoplasia', 'metastasis']
      }
    ]
  }
];

// Memory techniques and study strategies
export const studyStrategies = {
  memoryPalace: {
    title: 'Memory Palace Technique',
    description: 'Associate each cancer type with a room in your house',
    example: 'Kitchen = Carcinoma (lining), Gym = Sarcoma (muscle), Bathroom = Leukemia (blood)'
  },
  mnemonics: {
    title: 'Acronyms & Mnemonics',
    examples: [
      'CLSL: **C**arcinoma **L**ymphoma **S**arcoma **L**eukemia',
      'Normal → Hyper → Dys → Neo → Invasion: **N**ice **H**orse **D**ancing **N**aked **I**n-field'
    ]
  },
  visualization: {
    title: 'Visual Associations',
    description: 'Create mental images that connect concepts',
    example: 'Metastasis = Seeds (cancer cells) blown by wind (blood/lymph) to new soil (organs)'
  }
}; 