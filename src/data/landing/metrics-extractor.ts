// Utility to extract metrics from existing data structures for landing page

import { discriminativeMetrics, generativeMetrics, businessMetrics } from '../metrics/core-metrics';
import { multipleMyelomaUseCase } from '../use-cases/multiple-myeloma';
import { inSilicoCapabilities } from '../insilico/capabilities';
import { KPIMetric, CapabilityCard } from './landing-data';

// Extract key metrics for hero section
export const extractHeroKPIs = (): KPIMetric[] => {
  // Get ClinVar total coverage
  const clinvarGroup = discriminativeMetrics.find(m => m.id === 'clinvar-coverage');
  const totalClinvar = clinvarGroup?.benchmarks.find(b => b.title === 'Coding SNVs');
  
  // Get SpliceVarDB metrics
  const spliceGroup = discriminativeMetrics.find(m => m.id === 'splice-prediction');
  const spliceMetric = spliceGroup?.benchmarks.find(b => b.title === 'Exonic Splice Variants');
  
  // Get VUS metrics
  const vusGroup = businessMetrics.find(m => m.id === 'vus-resolution');
  const vusMetric = vusGroup?.benchmarks.find(b => b.title === 'VUS Rate Reduction');

  return [
    {
      label: "AUROC",
      value: totalClinvar?.value.value || 0.957,
      tooltip: `Across ${totalClinvar?.sampleSize.toLocaleString() || '53,210'} ClinVar variants`
    },
    {
      label: "Splice AUROC", 
      value: spliceMetric?.value.value || 0.826,
      tooltip: `SpliceVarDB (n=${spliceMetric?.sampleSize.toLocaleString() || '4,950'})`
    },
    {
      label: "VUS",
      value: "→ 15% target",
      tooltip: "Research-mode reduction target"
    }
  ];
};

// Extract capability cards from existing in-silico capabilities
export const extractCapabilityCards = (): CapabilityCard[] => {
  return inSilicoCapabilities.map(capability => {
    // Extract relevant metrics for each capability
    const kpis: KPIMetric[] = [];
    
    // Add core metrics based on capability type
    if (capability.slug === 'chemo') {
      kpis.push(
        { label: "AUROC", value: 0.957 },
        { label: "VUS", value: "→ 15%" },
        { label: "Confidence", value: "~0.45–0.51" }
      );
    } else if (capability.slug === 'agentic-emr') {
      kpis.push(
        { label: "AUROC", value: 0.957 },
        { label: "BRCA1", value: "0.94/0.84" },
        { label: "Splice", value: "~0.826" }
      );
    } else if (capability.slug === 'clinical-trials') {
      kpis.push(
        { label: "Shortlist", value: "50+ → 5–12" },
        { label: "Time", value: "−60%" }
      );
    } else if (capability.slug === 'pathway') {
      kpis.push(
        { label: "Time", value: "minutes" },
        { label: "Confidence lift", value: "+0.05–0.12" }
      );
    } else if (capability.slug === 'crispr-intelligence') {
      kpis.push(
        { label: "Context", value: "1M tokens" },
        { label: "Safety", value: "guided" }
      );
    } else if (capability.slug === 'toxicity-risk') {
      kpis.push(
        { label: "Missed flags", value: "−20–30%" },
        { label: "False positives", value: "−10–15%" }
      );
    }

    return {
      title: capability.title,
      subtitle: capability.coreCapability,
      kpis,
      actions: [{ 
        label: capability.slug === 'chemo' ? 'Open Digital Twin' : 
               capability.slug === 'agentic-emr' ? 'Analyze a Variant' :
               capability.slug === 'clinical-trials' ? 'Find Trials' :
               capability.slug === 'pathway' ? 'See Pathways' :
               capability.slug === 'crispr-intelligence' ? 'Check Readiness' :
               capability.slug === 'toxicity-risk' ? 'See Caution Signals' :
               'Explore',
        href: `/platform/${capability.coPilotSlug}`
      }],
      icon: capability.icon,
      color: capability.color
    };
  });
};

// Extract evidence band data from existing metrics
export const extractEvidenceBand = () => {
  // Get confidence from MM use case
  const mmConfidence = multipleMyelomaUseCase.specificFindings?.[0]?.metrics.find(m => m.title.includes('Confidence'));
  
  return {
    confidence: { 
      value: mmConfidence?.value.value || 0.5, 
      tier: "Consider" 
    },
    badges: ["Pathway-Aligned", "ClinVar-Strong"],
    provenance: { hasRun: false }
  };
};

// Extract SPE items (these are conceptual, so we can keep them as is)
export const extractSPEItems = () => [
  { label: "Sequence", helper: "Variant impact with long-context understanding." },
  { label: "Pathway", helper: "What's likely driving the biology." },
  { label: "Evidence", helper: "Priors + optional literature with transparent badges." }
];

// Extract action items from capabilities
export const extractActionItems = () => [
  { label: "Analyze a Variant", href: "/platform/agentic-emr" },
  { label: "Run Therapy Fit", href: "/platform/chemo" },
  { label: "Find Clinical Trials", href: "/platform/clinical-trials" }
];
