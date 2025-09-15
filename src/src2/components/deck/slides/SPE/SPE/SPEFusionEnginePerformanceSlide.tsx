import { createPerformanceSlide } from '../../shared/SlideTemplates';

// 🎯 That's it! Just 25 lines of configuration!
const SPEFusionEnginePerformanceSlide = createPerformanceSlide({
  title: "State of the Art Research‑Mode:",

  // 📊 Performance metrics - easy to update
  metrics: [
    { value: "≥0.90", label: "AUROC (Fusion)", trend: "AM‑covered micro", color: "green" },
    { value: "3", label: "Profiles", trend: "Baseline · Richer · Fusion", color: "cyan" },
    { value: "Provenance", label: "Full Tracking", trend: "Auditable", color: "purple" }
  ],

  // 🎯 Key differentiators
  features: [
    {
      icon: "🧠",
      title: "Clearer answers, not single‑signal",
      description: "We combine our model with a trusted reference when available. On covered missense variants, internal micro‑runs showed ≥0.90 AUROC. Results are cohort‑dependent (research‑mode).",
      metrics: [
        { value: "1M Context Window", label: "Ultra Long Context" },
        { value: "From SNV to WGS", label: "40B, 7b and 1b Parameter" },
       
      ]
    },
    {
      icon: "🛡️",
      title: "Transparent and traceable",
      description: "Every result comes with sources, settings, and a run ID. Easy to audit, share, and repeat.",
      metrics: [
        { value: "Complete", label: "Audit trail" },
        { value: "Exportable", label: "Artifacts" },
      ]
    }
  ],

  // ✅ Validation results
  validation: {
    cancers: 1,
    variants: 6,
    cohorts: 1,
    correlation: 0
  },

  // 📝 Performance summary
  summary: "Demo snapshots with full provenance. Fusion showed ≥0.90 AUROC on a small AM‑covered micro‑set (research‑mode; cohort‑dependent). Compare Baseline, Richer, and Fusion profiles side‑by‑side."
});

export default SPEFusionEnginePerformanceSlide;
