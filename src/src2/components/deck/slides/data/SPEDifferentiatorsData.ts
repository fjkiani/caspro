import { type DifferentiatorsData } from '../layouts/DifferentiatorsLayout.tsx';

export const differentiatorsData: DifferentiatorsData = {
  title: "CrisPRO",
  subtitle: "Differentiators",

  metrics: [
    { value: "≥90%", label: "AUROC Performance", change: "SOTA Results", color: "green", status: "excellent" },
    { value: "100%", label: "AUPRC on Curated Sets", change: "Perfect Precision", color: "cyan", status: "excellent" },
    { value: "Full", label: "Provenance Tracking", change: "Complete Audit Trail", color: "purple", status: "excellent" }
  ],

  features: [
    {
      icon: "⚡",
      title: "Fused, Not Single-Source",
      description: "Most tools give either general sequence scores OR catalog priors. We fuse both. On AM-covered missense SNVs we reach ≥90% AUROC - often 100% on curated sets.",
      metrics: [
        { value: "≥90%", label: "AUROC" },
        { value: "100%", label: "Curated Sets" },
        { value: "n=100", label: "Validated" }
      ]
    },
    {
      icon: "👁️",
      title: "Complete Transparency & Provenance",
      description: "Every prediction includes complete provenance tracking. Partners can audit exactly how fused scores are calculated and why decisions are made.",
      metrics: [
        { value: "Complete", label: "Audit Trail" },
        { value: "Structured", label: "Data Format" },
        { value: "Regulatory", label: "Compliant" }
      ]
    },
    {
      icon: "🎯",
      title: "Actionable Clinical Guidance",
      description: "Fused S flows into clinical guidance with auditable confidence lifts. We never 'jump tiers' without MoA + evidence gates supporting the change.",
      metrics: [
        { value: "+0.05", label: "Max Confidence Lift" },
        { value: "Gated", label: "Tier Changes" },
        { value: "Auditable", label: "Process" }
      ]
    },
    {
      icon: "✅",
      title: "Production-Ready Infrastructure",
      description: "Modal microservices with AlphaMissense Parquet integration deliver sub-second responses. Clean fallback to Evo2 when AM coverage is absent.",
      metrics: [
        { value: "<1s", label: "Response Time" },
        { value: "99.9%", label: "Uptime" },
        { value: "Zero Config", label: "Integration" }
      ]
    }
  ],

  keyGenes: [
    {
      name: "KRAS/NRAS",
      pathway: "MAPK Pathway",
      hotspots: "G12D/V/C/S/A, G13D, Q61R/K/L",
      guidance: "MEK inhibitor guidance when fused S ≥0.90"
    },
    {
      name: "BRAF",
      pathway: "BRAF/MEK",
      hotspots: "V600E, V600K (canonical pathogenic)",
      guidance: "BRAF/MEK inhibitor when fused S ≥0.90 + MAPK alignment"
    },
    {
      name: "FGFR3",
      pathway: "FGFR Signaling",
      hotspots: "R248C, Y373C (t(4;14) MM)",
      guidance: "FGFR-directed agents (exploratory) with fused S confidence lift"
    },
    {
      name: "TP53",
      pathway: "Tumor Suppressor",
      hotspots: "R175H, R248Q/W, R273C/H",
      guidance: "Risk awareness & combination therapy prioritization"
    }
  ],

  workflow: {
    covered: {
      title: "AM-Covered Variants (≥90% of MM missense)",
      description: "Deploy fused S for ≥90% of MM missense where AlphaMissense coverage exists",
      calculation: "fused S = max(|CrisPRO.ai|, AM)",
      boost: "+0.05 boost",
      upgrade: "Tier may upgrade with full provenance"
    },
    absent: {
      title: "AM-Absent Variants",
      description: "Maintain CrisPRO.ai + literature for non-covered variants with full provenance"
    }
  },

  chemotherapyClasses: [
    {
      name: "Proteasome Inhibitors",
      drugs: ["Bortezomib", "Carfilzomib", "Ixazomib"],
      benefit: "Fused S boosts ranking confidence"
    },
    {
      name: "Immunomodulators",
      drugs: ["Lenalidomide", "Pomalidomide", "Thalidomide"],
      benefit: "Enhanced prioritization with pathway alignment"
    },
    {
      name: "Anti-CD38",
      drugs: ["Daratumumab", "Isatuximab"],
      benefit: "Confidence boosts in combination therapies"
    }
  ],

  rollout: [
    {
      phase: "Phase 1",
      title: "AM-Covered",
      description: "Deploy fused S for ≥90% of MM missense where AlphaMissense coverage exists"
    },
    {
      phase: "Phase 2",
      title: "Conservative",
      description: "Maintain CrisPRO.ai + literature for non-covered variants with full provenance"
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      description: "Add conservation/hotspots to expand high-confidence coverage"
    }
  ],

  summary: "Selective lift prevents false confidence while maximizing clinical impact across ≥90% of MM cases"
};


