export interface ConceptItem {
  term: string;
  definition: string;
}

export interface ConceptSection {
  title: string;
  subtitle: string;
  items: ConceptItem[];
}

export interface PathStep {
  step: number;
  name: string;
  description: string;
}

export const biologyConcepts: ConceptSection[] = [
  {
    title: "1.1 Core Concepts",
    subtitle: "Fundamental definitions in oncology",
    items: [
      {
        term: "Cancer",
        definition: "A disease of **uncontrolled growth**; fundamentally a **genetic disease** from accumulated genomic variations."
      },
      {
        term: "Tumor/Neoplasm",
        definition: "A swelling or new, abnormal growth of tissue."
      },
      {
        term: "Oncology",
        definition: "The study of tumors and cancers."
      },
      {
        term: "Metastasis",
        definition: "The spread of cancer from a primary site to distant organs."
      }
    ]
  },
  {
    title: "1.2 Classification by Origin",
    subtitle: "How cancers are categorized based on tissue type",
    items: [
      {
        term: "Carcinoma",
        definition: "From epithelial tissue (linings). Most common."
      },
      {
        term: "Sarcoma",
        definition: "From connective tissue (bone, muscle)."
      },
      {
        term: "Leukemia",
        definition: "Cancer of the blood (bone marrow)."
      },
      {
        term: "Lymphoma",
        definition: "Cancer of the lymph system."
      }
    ]
  }
];

export const pathToMalignancy: PathStep[] = [
  {
    step: 1,
    name: "Normal",
    description: "Uniform cells."
  },
  {
    step: 2,
    name: "Hyperplasia",
    description: "Increased number of cells."
  },
  {
    step: 3,
    name: "Dysplasia",
    description: "Disorganized, abnormal cells."
  },
  {
    step: 4,
    name: "Carcinoma in situ",
    description: "\"Cancer in place,\" not yet invasive."
  },
  {
    step: 5,
    name: "Invasive Cancer",
    description: "Invades surrounding tissue, can metastasize."
  }
]; 