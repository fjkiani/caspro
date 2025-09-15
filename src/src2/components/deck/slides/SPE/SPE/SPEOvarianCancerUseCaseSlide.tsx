import { CheckCircle, FileText, Database } from 'lucide-react';
import UseCaseSlideTemplate from '../../shared/UseCaseSlideTemplate';

const SPEOvarianCancerUseCaseSlide = () => {
  const jsonOutput = `{
  "essentiality_report": [{
    "gene": "BRCA1",
    "result": {
      "essentiality_score": 0.35,
      "confidence": 0.55
    }
  }],
  "guidance": {
    "therapy": "PARP inhibitor",
    "disease": "ovarian cancer",
    "on_label": true,
    "tier": "I",
    "strength": "high",
    "efficacy_score": 0.78,
    "confidence": 0.89,
    "insights": {
      "functionality": 0.82,
      "chromatin": 0.45,
      "essentiality": 0.35,
      "regulatory": 0.91
    },
    "rationale": [
      "Synthetic lethality: BRCA1/2 + PARPi",
      "evidence_strength=0.95",
      "FDA approved indication"
    ],
    "citations": ["40512670", "39845416", "40123456"],
    "evidence_tier": "supported",
    "badges": ["RCT", "Guideline", "ClinVar-Strong"],
    "provenance": {
      "efficacy_run": "eee0cee0315c"
    }
  }
}`;

  const explanations = [
    {
      title: "Essentiality ≠ Sensitivity",
      description: "The low 'essentiality_score: 0.35' for BRCA1 means the cancer isn't dependent on the gene, but the guidance layer correctly identifies that this specific mutation creates vulnerability to PARP inhibitors through synthetic lethality.",
      icon: <CheckCircle size={24} className="text-green-400" />
    },
    {
      title: "Tier I FDA Alignment",
      description: "The 'on_label: true' and 'tier: I' confirm this is an FDA-approved therapy for this specific mutation and disease, leading to high-confidence, actionable guidance with 'confidence: 0.89'.",
      icon: <FileText size={24} className="text-blue-400" />
    },
    {
      title: "Evidence Hierarchy in Action",
      description: "The 'evidence_tier: supported' with RCT, Guideline, and ClinVar-Strong badges demonstrates our evidence hierarchy working correctly, prioritizing the strongest clinical evidence for decision-making.",
      icon: <Database size={24} className="text-purple-400" />
    }
  ];

  return (
    <UseCaseSlideTemplate
      title="Ovarian Cancer: From Essentiality to Actionable Guidance"
      subtitle="Essentiality analysis combined with clinical evidence for therapeutic recommendations"
      jsonOutput={jsonOutput}
      explanations={explanations}
      footnote="Research-mode; cohort-dependent"
      runId="eee0cee0315c"
    />
  );
};

export default SPEOvarianCancerUseCaseSlide;
