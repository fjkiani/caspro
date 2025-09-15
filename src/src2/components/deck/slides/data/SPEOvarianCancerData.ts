import { type CaseStudyData } from '@slides/layouts/CaseStudyLayout.tsx';
import { Dna, GitBranch, BookOpen } from 'lucide-react';

export const ovarianCancerData: CaseStudyData = {
  title: "Ovarian Cancer",
  disease: "Ovarian Cancer",
  description: "Therapeutic design for TP53 R175H-driven high-grade serous ovarian carcinoma",

  components: [
    {
      icon: Dna,
      title: "Sequence Analysis",
      description: "TP53 R175H mutation identified as driver with complete loss of tumor suppressor function"
    },
    {
      icon: GitBranch,
      title: "Pathway Impact",
      description: "p53 pathway disruption leading to uncontrolled cell proliferation and apoptosis resistance"
    },
    {
      icon: BookOpen,
      title: "Clinical Evidence",
      description: "Clinical trials validate MDM2 inhibitors and APR-246 efficacy in TP53-mutant cancers"
    }
  ],

  jsonOutput: `{
  "prediction": {
    "drug_class": "p53_targeting",
    "confidence": 0.92,
    "recommendations": [
      "APR-246 (Eprenetapopt)",
      "MDM2_inhibitor",
      "Combined_therapy"
    ]
  },
  "evidence": {
    "sequence_score": 0.98,
    "pathway_impact": "Critical",
    "clinical_trials": 8,
    "response_rate": "35%"
  },
  "provenance": {
    "sources": ["CrisPRO.ai", "TCGA", "ClinicalTrials.gov"],
    "last_updated": "2024-01-15"
  }
}`,

  explanation: [
    {
      icon: Dna,
      title: "TP53 R175H Mutation",
      description: "Complete loss of p53 tumor suppressor function, most common mutation in high-grade serous ovarian cancer"
    },
    {
      icon: GitBranch,
      title: "p53 Pathway Disruption",
      description: "Loss of cell cycle control and apoptosis regulation, leading to chemotherapy resistance"
    },
    {
      icon: BookOpen,
      title: "Targeted Therapies",
      description: "MDM2 inhibitors and APR-246 show promising results in restoring p53 function"
    }
  ]
};


