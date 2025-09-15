import React from 'react';
import { CheckCircle, FileText, Database } from 'lucide-react';
import UseCaseSlideTemplate from '../../shared/UseCaseSlideTemplate';

const SPEMelanomaUseCaseSlide = () => {
  const jsonOutput = `{
  "therapy": "BRAF inhibitor",
  "disease": "melanoma",
  "on_label": true,
  "tier": "I",
  "strength": "moderate",
  "efficacy_score": 0.261,
  "confidence": 0.51,
  "insights": {
    "functionality": 0.48,
    "chromatin": 0.35,
    "essentiality": 0.42,
    "regulatory": 0.38
  },
  "rationale": [
    "MoA alignment: MAPK blockade",
    "evidence_strength=0.6",
    "BRAF V600E target confirmed"
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
      title: "Direct FDA Alignment",
      description: "The 'on_label: true' field confirms this is an FDA-approved therapy for BRAF V600E mutations in melanoma, leading to a high-confidence, actionable 'tier: I' recommendation despite moderate efficacy scores.",
      icon: <CheckCircle size={24} className="text-green-400" />
    },
    {
      title: "Clinical Gating in Action",
      description: "Even with a moderate 'efficacy_score: 0.261', the system's clinical gates recognize the therapy's on-label status and strong evidence, pushing it to the definitive 'Yes GO' verdict for clinical consideration.",
      icon: <FileText size={24} className="text-blue-400" />
    },
    {
      title: "Transparent Provenance",
      description: "Every decision includes 'rationale', 'citations' (PubMed PMIDs), and 'provenance' with run IDs. This ensures full auditability and traceability for regulatory compliance and research reproducibility.",
      icon: <Database size={24} className="text-purple-400" />
    }
  ];

  return (
    <UseCaseSlideTemplate
      title="Melanoma: The 'Yes GO' in Action"
      subtitle="Aligning with FDA guidance for unprecedented clarity"
      jsonOutput={jsonOutput}
      explanations={explanations}
      footnote="Research-mode; cohort-dependent"
      runId="a02d6a540d4f"
    />
  );
};

export default SPEMelanomaUseCaseSlide;
