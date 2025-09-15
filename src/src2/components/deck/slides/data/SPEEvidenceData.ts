import { type EvidencePrinciplesData } from '@slides/layouts/EvidencePrinciplesLayout.tsx';
import { Shield, Eye, FileText, AlertTriangle } from 'lucide-react';

export const evidenceData: EvidencePrinciplesData = {
  title: "Simple Evidence Doctrine",
  principles: [
    {
      icon: Shield,
      title: "Clinical-Grade Safety",
      description: "Every prediction meets clinical standards - no speculation, only validated evidence.",
      details: [
        { label: "Validation", value: "Multi-source evidence required" },
        { label: "Threshold", value: "95% confidence minimum" }
      ]
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Full provenance tracking - see exactly how each prediction was calculated and why.",
      details: [
        { label: "Audit Trail", value: "Every calculation logged" },
        { label: "Data Sources", value: "All inputs documented" }
      ]
    },
    {
      icon: FileText,
      title: "Regulatory Compliance",
      description: "Designed for FDA submission - structured outputs ready for IND documentation.",
      details: [
        { label: "Format", value: "21 CFR Part 11 compliant" },
        { label: "Documentation", value: "Complete audit trails" }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Conservative Defaults",
      description: "When in doubt, err on the side of caution - better safe than speculative.",
      details: [
        { label: "Fallback", value: "Conservative when uncertain" },
        { label: "Bias", value: "Safety over sensitivity" }
      ]
    }
  ],

  metrics: [
    { value: "100%", label: "Reproducible results", color: "green" },
    { value: "Full", label: "Audit compliance", color: "blue" },
    { value: "Zero", label: "Speculative predictions", color: "purple" }
  ]
};


