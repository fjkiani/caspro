import { type CaseStudyData } from '@slides/layouts/CaseStudyLayout.tsx';
import { Dna, GitBranch, BookOpen } from 'lucide-react';

export const multipleMyelomaData: CaseStudyData = {
  title: "Multiple Myeloma",
  disease: "Multiple Myeloma",
  description: "Complete therapeutic design workflow for KRAS G12D-driven multiple myeloma",

  components: [
    {
      icon: Dna,
      title: "Sequence Analysis",
      description: "KRAS G12D mutation identified as driver with high functional disruption score"
    },
    {
      icon: GitBranch,
      title: "Pathway Impact",
      description: "MAPK pathway hyperactivation confirmed through integrated analysis"
    },
    {
      icon: BookOpen,
      title: "Clinical Evidence",
      description: "15+ clinical trials validate MEK inhibition efficacy in KRAS-mutant cancers"
    }
  ],

  jsonOutput: `{
  "prediction": {
    "drug_class": "MEK_inhibitor",
    "confidence": 0.95,
    "recommendations": [
      "Trametinib",
      "Cobimetinib",
      "Binimetinib"
    ]
  },
  "evidence": {
    "sequence_score": 0.94,
    "pathway_impact": "High",
    "clinical_trials": 15,
    "response_rate": "40%"
  },
  "provenance": {
    "sources": ["CrisPRO.ai", "AlphaMissense", "ClinicalTrials.gov"],
    "last_updated": "2024-01-15"
  }
}`,

  explanation: [
    {
      icon: Dna,
      title: "KRAS G12D Driver Mutation",
      description: "Highly disruptive mutation activating MAPK pathway, validated by multiple independent studies"
    },
    {
      icon: GitBranch,
      title: "Pathway Hyperactivation",
      description: "KRAS→RAF→MEK→ERK cascade shows significant upregulation, confirmed by pathway analysis"
    },
    {
      icon: BookOpen,
      title: "Clinical Validation",
      description: "15 clinical trials demonstrate 40% response rate to MEK inhibitors in KRAS-mutant cancers"
    }
  ]
};


