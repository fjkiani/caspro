import React from 'react';
import { CheckCircle, FileText, Database } from 'lucide-react';
import UseCaseSlideTemplate from '../../shared/UseCaseSlideTemplate';

const SPEMultipleMyelomaUseCaseSlide = () => {
  const jsonOutput = `{
  "therapy": "BRAF inhibitor",
  "disease": "multiple myeloma",
  "on_label": false,
  "tier": "II",
  "strength": "moderate",
  "efficacy_score": 0.261,
  "confidence": 0.51,
  "insights": {
    "functionality": 0.45,
    "chromatin": 0.32,
    "essentiality": 0.28,
    "regulatory": 0.38
  },
  "rationale": [
    "MoA alignment: MAPK blockade",
    "evidence_strength=0.6",
    "pathway disruption: -4.2"
  ],
  "citations": ["39866931", "40411938", "40484006"],
  "evidence_tier": "consider",
  "badges": ["ClinVar-Strong"],
  "provenance": {
    "efficacy_run": "a02d6a540d4f"
  }
}`;

  const explanations = [
    {
      title: "FDA Alignment & Clinical Gates",
      description: "The 'on_label: false' and 'tier: II' indicate this is an off-label therapy with moderate evidence. Our clinical gates recognize the therapy's potential while maintaining research-mode transparency.",
      icon: <CheckCircle size={24} className="text-green-400" />
    },
    {
      title: "Efficacy Score vs Confidence",
      description: "The 'efficacy_score: 0.261' ranks this option against alternatives (not a probability), while 'confidence: 0.51' reflects evidence strength and insight agreement. Both scores help prioritize therapeutic candidates.",
      icon: <FileText size={24} className="text-blue-400" />
    },
    {
      title: "Transparent Provenance",
      description: "Every decision includes 'rationale', 'citations' (PubMed PMIDs), and 'provenance' with run IDs. This ensures full auditability and reproducibility for research and regulatory purposes.",
      icon: <Database size={24} className="text-purple-400" />
    }
  ];

  return (
    <UseCaseSlideTemplate
      title="Multiple Myeloma: What the Live Output Means"
      subtitle="Aligned with FDA labels and transparent evidence"
      jsonOutput={jsonOutput}
      explanations={explanations}
      footnote="Research-mode; cohort-dependent"
      runId="a02d6a540d4f"
    />
  );
};

export default SPEMultipleMyelomaUseCaseSlide;
