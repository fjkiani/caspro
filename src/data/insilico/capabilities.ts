import { coPilotDetailsData } from '../copilots';
import { CoPilotDetailContent } from '../../types/copilot-types';

export interface InSilicoCapability {
  slug: string;
  title: string;
  coreCapability: string;
  evidence: {
    confidence: string;
    tier: string;
    sources: string;
    provenance: string;
  };
  targetAudience: string;
  endpoint?: string;
  quickTest?: string;
  doctrine?: string;
  status: 'live' | 'roadmap';
  icon: string;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  description: string;
  // Link to co-pilot page
  coPilotSlug: string;
}

// Map co-pilot data to in-silico capabilities
function mapCoPilotToCapability(slug: string, data: CoPilotDetailContent): InSilicoCapability {
  // Extract key metrics from the data
  const firstCapability = data.keyCapabilities?.[0];
  const scientificMetric = typeof firstCapability?.scientific === 'object' ? firstCapability.scientific.keyMetric : undefined;
  const technicalMetric = typeof firstCapability?.technical === 'object' ? firstCapability.technical.keyMetric : undefined;
  const keyMetric = scientificMetric || technicalMetric || '0.957 (ClinVar AUROC)';
  
  // Get target audience from value propositions
  const targetAudience = data.valueProps?.[0]?.audience || 'Researchers/Clinicians';
  
  // Map icon names based on co-pilot type
  const iconMap: Record<string, string> = {
    'chemo': 'Pill',
    'agentic-emr': 'FileText',
    'crispr-intelligence': 'Dna',
    'clinical-trials': 'Activity',
    'pathway': 'Activity',
    'therapy-fit': 'Pill',
    'toxicity-risk': 'Shield'
  };
  
  // Map colors based on co-pilot type
  const colorMap: Record<string, 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red'> = {
    'chemo': 'teal',
    'agentic-emr': 'green',
    'crispr-intelligence': 'purple',
    'clinical-trials': 'blue',
    'pathway': 'teal',
    'therapy-fit': 'teal',
    'toxicity-risk': 'red'
  };

  return {
    slug: slug,
    title: data.pageTitle || slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    coreCapability: data.heroSubtitle || data.vision || 'AI-powered insights for precision medicine',
    evidence: {
      confidence: keyMetric,
      tier: 'Supported/Consider/Insufficient',
      sources: 'ClinVar + Literature',
      provenance: 'run_id, profile'
    },
    targetAudience: targetAudience,
    endpoint: 'api/' + slug,
    status: 'live',
    icon: iconMap[slug] || 'Activity',
    color: colorMap[slug] || 'blue',
    description: data.vision || data.heroSubtitle || 'Advanced AI capabilities for precision medicine',
    coPilotSlug: slug
  };
}

// Generate capabilities dynamically from co-pilot data
export const inSilicoCapabilities: InSilicoCapability[] = Object.entries(coPilotDetailsData)
  .map(([slug, data]) => mapCoPilotToCapability(slug, data))
  .filter(capability => capability.status === 'live'); // Only show live capabilities
