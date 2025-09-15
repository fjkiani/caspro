import { type CaseStudyData } from '@slides/layouts/CaseStudyLayout.tsx';
import { Dna, GitBranch, BookOpen } from 'lucide-react';

export const melanomaData: CaseStudyData = {
  title: "Melanoma",
  disease: "Melanoma",
  description: "Therapeutic design for BRAF V600E-driven metastatic melanoma",

  components: [
    {
      icon: Dna,
      title: "Sequence Analysis",
      description: "BRAF V600E mutation identified as oncogenic driver with constitutive MAPK activation"
    },
    {
      icon: GitBranch,
      title: "Pathway Impact",
      description: "BRAF→MEK→ERK pathway hyperactivation driving uncontrolled proliferation"
    },
    {
      icon: BookOpen,
      title: "Clinical Evidence",
      description: "BRAF/MEK inhibitors show 60% response rate in BRAF V600E melanoma"
    }
  ],

  jsonOutput: `{
  "prediction": {
    "drug_class": "BRAF_MEK_inhibitor",
    "confidence": 0.97,
    "recommendations": [
      "Dabrafenib + Trametinib",
      "Vemurafenib + Cobimetinib",
      "Encorafenib + Binimetinib"
    ]
  },
  "evidence": {
    "sequence_score": 0.99,
    "pathway_impact": "Critical",
    "clinical_trials": 25,
    "response_rate": "60%"
  },
  "provenance": {
    "sources": ["CrisPRO.ai", "AlphaMissense", "ClinicalTrials.gov"],
    "last_updated": "2024-01-15"
  }
}`,

  explanation: [
    {
      icon: Dna,
      title: "BRAF V600E Mutation",
      description: "Most common oncogenic driver in melanoma, causing constitutive BRAF kinase activation"
    },
    {
      icon: GitBranch,
      title: "MAPK Pathway Activation",
      description: "BRAF→MEK→ERK cascade hyperactivation leading to uncontrolled cell proliferation and survival"
    },
    {
      icon: BookOpen,
      title: "Targeted Therapies",
      description: "BRAF/MEK inhibitor combinations are standard of care with 60% response rates"
    }
  ]
};


