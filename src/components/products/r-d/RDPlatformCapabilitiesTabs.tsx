'use client';

import React from 'react';
import TabbedInterface, { TabItem } from '@/components/shared/TabbedInterface';
import { 
  Users, 
  Microscope, 
  Zap, 
  Brain, 
  MessageSquare, 
  Building2 
} from 'lucide-react';

const capabilityGroups = [
  {
    id: 'clinical-decision',
    label: 'Clinical Decision Support',
    icon: Users,
    capabilities: [
      {
        title: 'Drug Efficacy Assessment',
        description: 'Per-drug ranking frameworks with confidence scoring approaches. Evidence tier classification (STANDARD/SUPPORTED/CONSIDER/INSUFFICIENT). S/P/E framework (Sequence/Pathway/Evidence) integration.'
      },
      {
        title: 'Sporadic Cancer Intelligence',
        description: 'Supporting analysis for patients with sporadic (non-hereditary) cancers. PARP pathway considerations (HRD assessment). IO pathway considerations (TMB/MSI assessment). Confidence frameworks based on data completeness.'
      },
      {
        title: 'Treatment Line Intelligence',
        description: 'Sequencing guidance frameworks. Cross-resistance pattern analysis. Line appropriateness scoring approaches.'
      },
      {
        title: 'Toxicity Risk Assessment (PGx)',
        description: 'Pharmacogenomic screening frameworks (DPYD/TPMT/UGT1A1/CYP2D6). Drug interaction checking. MoA-overlap risk assessment. Dose adjustment recommendation frameworks.'
      },
      {
        title: 'Resistance Detection Frameworks',
        description: 'Resistance risk assessment approaches. Next-line strategy frameworks. Combination strategy exploration.'
      },
      {
        title: 'CA-125 Intelligence',
        description: 'Kinetics analysis frameworks. Response pattern assessment. Burden classification approaches.'
      },
      {
        title: 'Clinical Trial Matching',
        description: 'Trial discovery with eligibility reasoning frameworks. Mechanism-based matching approaches. Trial-specific evidence integration.'
      },
      {
        title: 'SOC Recommendation Frameworks',
        description: 'NCCN-aligned treatment plan references. Guideline-based recommendation approaches.'
      },
      {
        title: 'Unified Care Plan Integration',
        description: 'Integrated workflows combining: Drug assessments, Trial matching, Food/supplement considerations, Monitoring frameworks, Pharmacogenomic insights.'
      }
    ]
  },
  {
    id: 'research-acceleration',
    label: 'Research Acceleration',
    icon: Microscope,
    capabilities: [
      {
        title: 'Universal Hypothesis Testing',
        description: 'Compound/supplement assessment across multiple disease contexts. Large compound database integration (PubChem, ChEMBL). Calibration framework development.'
      },
      {
        title: 'VUS Explorer',
        description: 'Variant interpretation frameworks. Mechanistic interpretation approaches. Pathogenicity assessment exploration.'
      },
      {
        title: 'Metastasis Assessment',
        description: 'Cascade risk assessment frameworks. Multi-step analysis approaches.'
      },
      {
        title: 'Cohort Intelligence',
        description: 'Dataset extraction and benchmarking frameworks. cBioPortal, GDC integration.'
      },
      {
        title: 'Evidence Synthesis',
        description: 'Multi-provider literature search frameworks. Quality scoring approaches.'
      },
      {
        title: 'Knowledge Base Integration',
        description: 'Contextual help frameworks. Coverage indicator approaches. Provenance tracking.'
      }
    ]
  },
  {
    id: 'therapeutic-design',
    label: 'Therapeutic Design',
    icon: Zap,
    capabilities: [
      {
        title: 'CRISPR Guide Generation',
        description: 'Guide RNA design frameworks. Safety assessment approaches. Off-target validation frameworks.'
      },
      {
        title: 'Structural Validation',
        description: 'AlphaFold integration exploration. Structural confidence assessment approaches.'
      },
      {
        title: 'IND Package Generation',
        description: 'Regulatory documentation framework support. Submission package organization approaches.'
      },
      {
        title: 'IP Monetization Workflows',
        description: 'Multi-stage workflow exploration: Discovery frameworks, Validation approaches, Design workflows, Documentation support, Licensing exploration.'
      },
      {
        title: 'Design Router',
        description: 'PAM windowing frameworks. Scoring approaches. Safety checking frameworks.'
      }
    ]
  },
  {
    id: 'platform-intelligence',
    label: 'Platform Intelligence',
    icon: Brain,
    capabilities: [
      {
        title: 'S/P/E Framework',
        description: 'Sequence (Evo2) integration - weighting approaches. Pathway (weighted aggregation) - weighting approaches. Evidence (literature/ClinVar) - weighting approaches.'
      },
      {
        title: 'Insights Bundle',
        description: 'Multi-scale biological context frameworks: Functionality assessment, Chromatin analysis, Essentiality scoring, Regulatory impact assessment.'
      },
      {
        title: 'Fusion Engine',
        description: 'AlphaMissense integration exploration. GRCh38 missense variant coverage.'
      },
      {
        title: 'Calibration System',
        description: 'Gene-specific percentile conversion frameworks. Cross-gene comparison approaches.'
      },
      {
        title: 'Provenance Tracking',
        description: 'Audit trail frameworks. Run IDs, profiles, methods, citations.'
      },
      {
        title: 'Confidence Modulation',
        description: 'Evidence gate frameworks. Insights lift approaches. Sporadic cancer gate frameworks.'
      }
    ]
  },
  {
    id: 'conversational-ai',
    label: 'Conversational AI',
    icon: MessageSquare,
    capabilities: [
      {
        title: 'Co-Pilot Integration',
        description: 'Natural language query → structured API call frameworks. Progressive disclosure approaches.'
      },
      {
        title: 'Intent Classification',
        description: 'Q2C Router (Question-to-Component) frameworks. Multi-intent handling approaches.'
      },
      {
        title: 'Context Awareness',
        description: 'Sporadic cancer status integration. Tumor context awareness. Germline status integration.'
      },
      {
        title: 'Unified Orchestration',
        description: 'Single endpoint exploration for complete care workflows. Integrated response frameworks.'
      },
      {
        title: 'Progressive Disclosure',
        description: 'Natural language query frameworks that progressively reveal detail. Simple → detailed exploration on demand.'
      },
      {
        title: 'Food Validator Integration',
        description: 'Natural language compound/supplement query frameworks. Mechanistic validation integration.'
      }
    ]
  },
  {
    id: 'enterprise-platform',
    label: 'Enterprise Platform',
    icon: Building2,
    capabilities: [
      {
        title: 'Authentication System',
        description: 'Supabase Auth integration. JWT verification frameworks. Optional auth (backward compatible).'
      },
      {
        title: 'Admin Panel',
        description: 'User management frameworks. Analytics approaches. Activity log frameworks. Usage trend analysis.'
      },
      {
        title: 'Pricing Framework',
        description: 'Tiered pricing model exploration. Feature access frameworks.'
      },
      {
        title: 'Database Schema',
        description: 'Multi-table database structure. User, profile, subscription, quota, feature flag, session, analysis, log frameworks.'
      },
      {
        title: 'Feature Flags',
        description: 'Granular access control exploration per tier.'
      },
      {
        title: 'Usage Tracking',
        description: 'Activity log frameworks for compliance.'
      }
    ]
  }
];

export default function RDPlatformCapabilitiesTabs() {
  const tabs: TabItem[] = capabilityGroups.map((group) => ({
    id: group.id,
    label: group.label,
    icon: group.icon,
    content: (
      <div className="space-y-6">
        {group.capabilities.map((capability, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">{capability.title}</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{capability.description}</p>
          </div>
        ))}
      </div>
    )
  }));

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <TabbedInterface
          title="Platform Capabilities"
          subtitle="Six supporting areas"
          tabs={tabs}
          sidebarTitle="Capability Groups"
          sidebarSubtitle="Explore platform capabilities"
        />
      </div>
    </section>
  );
}
