import { type FrameworkExplanationData } from '@slides/layouts/FrameworkExplanationLayout.tsx';
import { Dna, GitBranch, BookOpen } from 'lucide-react';

export const frameworkData: FrameworkExplanationData = {
  title: "S/P/E Framework",
  framework: "Sequence + Pathway + Evidence = Therapeutic Validation",

  components: [
    {
      letter: "S",
      name: "Sequence",
      icon: Dna,
      description: "How disruptive is this DNA change?",
      color: "sky",
      example: "KRAS G12D - highly disruptive missense mutation"
    },
    {
      letter: "P",
      name: "Pathway",
      icon: GitBranch,
      description: "Combined impact on disease pathways",
      color: "purple",
      example: "MAPK pathway activation driving proliferation"
    },
    {
      letter: "E",
      name: "Evidence",
      icon: BookOpen,
      description: "Clinical databases & literature validation",
      color: "green",
      example: "50+ clinical studies confirming MEK inhibition efficacy"
    }
  ],

  clinicalExample: {
    prediction: "MEK inhibitor sensitivity (trametinib, cobimetinib)",
    confidence: "95% (fused CrisPRO.ai + AlphaMissense + literature)",
    evidence: "KRAS G12D + MAPK pathway + 15 clinical trials showing 40% response rate"
  }
};


