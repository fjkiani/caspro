export interface TreatmentModality {
  id: string;
  name: string;
  description: string;
  category: 'local' | 'systemic';
  mechanism: string;
  examples?: string[];
}

export interface TreatmentTiming {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const treatmentTimings: TreatmentTiming[] = [
  {
    id: 'neoadjuvant',
    name: 'Neoadjuvant Therapy',
    description: 'Treatment (like chemotherapy) given before the main treatment (surgery/radiation) to shrink the tumor.',
    color: 'amber'
  },
  {
    id: 'adjuvant',
    name: 'Adjuvant Therapy',
    description: 'Treatment given after the main treatment to kill any remaining microscopic cancer cells.',
    color: 'amber'
  }
];

export const localTreatments: TreatmentModality[] = [
  {
    id: 'surgery',
    name: 'Surgery',
    description: 'Physical removal of the tumor and surrounding tissue.',
    category: 'local',
    mechanism: 'Direct removal of cancer cells',
    examples: ['Tumor resection', 'Lymph node dissection', 'Organ-sparing procedures']
  },
  {
    id: 'radiation',
    name: 'Radiation Therapy',
    description: 'High-energy beams that cause DNA damage leading to cancer cell death.',
    category: 'local',
    mechanism: 'DNA damage causes apoptosis in rapidly dividing cells',
    examples: ['External beam radiation', 'Brachytherapy', 'Stereotactic radiosurgery']
  }
];

export const systemicTreatments: TreatmentModality[] = [
  {
    id: 'chemotherapy',
    name: 'Chemotherapy',
    description: 'Drugs designed to kill rapidly dividing cells.',
    category: 'systemic',
    mechanism: 'Inhibits DNA replication or interferes with mitosis',
    examples: ['Alkylating agents', 'Antimetabolites', 'Taxanes', 'Platinum compounds']
  },
  {
    id: 'hormonal-therapy',
    name: 'Hormonal Therapy',
    description: 'Blocks hormone production or hormone receptors for hormone-sensitive cancers.',
    category: 'systemic',
    mechanism: 'Prevents growth signals from hormones like estrogen or testosterone',
    examples: ['Tamoxifen (breast)', 'Aromatase inhibitors', 'Anti-androgen therapy (prostate)']
  },
  {
    id: 'targeted-therapy',
    name: 'Targeted Therapy',
    description: 'Drugs that inhibit specific proteins mutated or overexpressed in cancer cells.',
    category: 'systemic',
    mechanism: 'Blocks specific molecular pathways critical for cancer growth',
    examples: ['Herceptin (HER2)', 'Avastin (VEGF)', 'Tarceva (EGFR)']
  },
  {
    id: 'immunotherapy',
    name: 'Immunotherapy',
    description: 'Stimulates the patient\'s immune system to destroy cancer cells.',
    category: 'systemic',
    mechanism: 'Releases immune system brakes or enhances immune recognition',
    examples: ['Checkpoint inhibitors (PD-1, CTLA-4)', 'CAR-T therapy', 'Cancer vaccines']
  }
];

export const chemotherapyMechanisms = [
  {
    category: 'DNA Replication Inhibitors',
    description: 'Prevent cancer cells from copying their DNA',
    examples: ['Anti-metabolites', 'Topoisomerase inhibitors', 'Alkylating agents', 'Platinum agents']
  },
  {
    category: 'Mitosis Inhibitors',
    description: 'Disrupt the process of cell division',
    examples: ['Taxanes', 'Vinca alkaloids']
  }
];

export const treatmentIntroduction = {
  title: 'The Armory - Cancer Treatment Modalities',
  description: 'Surgery and radiation form the backbone of cancer therapy, curing ~50% of patients by removing or killing tumors before they spread. Modern systemic therapies target cancer cells throughout the body.'
}; 