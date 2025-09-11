// Landing page data structure based on landing.md doctrine
// Now using existing metrics structure for DRY principles

import { 
  extractHeroKPIs, 
  extractCapabilityCards, 
  extractEvidenceBand, 
  extractSPEItems, 
  extractActionItems 
} from './metrics-extractor';

export interface KPIMetric {
  label: string;
  value: number | string;
  unit?: string;
  tooltip?: string;
}

export interface CapabilityCard {
  title: string;
  subtitle: string;
  kpis: KPIMetric[];
  actions: Array<{
    label: string;
    href: string;
  }>;
  icon?: string;
  color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
}

export interface SPEItem {
  label: string;
  helper: string;
  icon?: string;
}

export interface LandingData {
  hero: {
    headline: string;
    subtitle: string;
    kpis: KPIMetric[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  capabilities: CapabilityCard[];
  evidenceBand: {
    confidence: { value: number; tier: string };
    badges: string[];
    provenance: { hasRun: boolean };
  };
  spe: SPEItem[];
  actions: Array<{ label: string; href: string }>;
}

// Generate landing data using existing metrics structure
export const landingData: LandingData = {
  hero: {
    headline: "In-Silico Therapeutics for Research Oncology (RUO)",
    subtitle: "From variants to therapies and trials in minutes — with confidence, evidence, and provenance.",
    kpis: extractHeroKPIs(),
    primaryCta: { label: "Explore Myeloma Digital Twin", href: "/platform/chemo" },
    secondaryCta: { label: "See all capabilities", href: "/insilico" }
  },
  capabilities: extractCapabilityCards(),
  evidenceBand: extractEvidenceBand(),
  spe: extractSPEItems(),
  actions: extractActionItems()
};
