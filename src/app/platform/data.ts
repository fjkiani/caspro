import { UsersIcon, TestTube2Icon, RadiationIcon, BrainCircuitIcon, WrenchIcon, MessageSquareIcon } from 'lucide-react';
import { CoPilotOption } from './CoPilotOptionCard';

export const coPilotOptions: CoPilotOption[] = [
  {
    id: 'agentic-emr',
    // The title asserts dominance over a domain.
    title: 'AgenticEMR™ Dominance',
    icon: 'UsersIcon',
    userDescription: 'For Clinicians: Doctors, Nurses, Admins, Healthcare Consultants',
    // The description focuses on the problems we annihilate.
    mainDescription: "Unleash autonomous AI agents to conquer your clinical data. Our platform transforms unstructured EMR notes into a strategic, queryable asset. Automate patient summarization, cohort discovery, and trial matching to move at the speed of command, not the speed of clicks.",
    link: '/platform/agentic-emr',
    // The CTA is a command.
    linkText: 'Launch Terminal',
    status: 'active'
  },
  {
    id: 'oracle-intelligence',
    title: 'Oracle Intelligence Platform',
    icon: 'BrainCircuitIcon',
    userDescription: 'For Clinicians & Researchers: Genetic Counselors, Lab Directors, Biotech Teams',
    mainDescription: "Experience the S/P/E framework where Sequence, Pathway, and Evidence combine for transparent, auditable variant predictions. Eliminate VUS uncertainty with four biological insight components and gene-specific calibration. The only AI you can trust for clinical decisions.",
    link: '/platform/oracle-intelligence',
    linkText: 'Experience S/P/E',
    status: 'active'
  },
  {
    id: 'forge-intelligence',
    title: 'Forge Intelligence Platform',
    icon: 'WrenchIcon',
    userDescription: 'For Biotech Founders & Drug Hunters: Therapeutic Design Teams',
    mainDescription: "Experience the generative AI that designs precision therapeutics from first principles. CRISPR guides, protein inhibitors, and HDR templates engineered for maximum efficacy with 100% AlphaFold 3 structural validation. Every therapeutic is engineered, not discovered.",
    link: '/platform/forge-intelligence',
    linkText: 'Access the Forge',
    status: 'active'
  },
  {
    id: 'scribe-intelligence',
    title: 'Scribe Intelligence Platform',
    icon: 'MessageSquareIcon',
    userDescription: 'For Clinicians, Patients & Researchers: Natural Language AI Co-Pilot',
    mainDescription: "Ask questions naturally, get evidence-backed answers. Progressive disclosure means you get exactly the level of detail you need - start simple ('What drugs?') and drill down ('Complete care plan?') when ready. Audience-appropriate explanations for everyone.",
    link: '/platform/scribe-intelligence',
    linkText: 'Try Co-Pilot',
    status: 'active'
  },
  {
    id: 'crispr-intelligence',
    title: 'CRISPR Intelligence Platform',
    icon: 'TestTube2Icon',
    userDescription: 'For Researchers: Scientists, Bioinformaticians, R&D Teams',
    // We don't "empower." We provide an end-to-end conquest engine.
    mainDescription: "The definitive command system for therapeutic R&D. Execute an entire pre-clinical campaign—from target validation to designing a novel therapeutic—entirely `in silico`. Annihilate the R&D quagmire and compress years of guesswork into weeks of decisive action.",
    link: '/platform/crispr-intelligence',
    linkText: 'Access the Forge',
    status: 'coming-soon'
  },
  {
    id: 'precision-rad',
    title: 'PrecisionRad™ Intelligence',
    icon: 'RadiationIcon',
    userDescription: 'For Radiation Oncologists, Medical Physicists, Researchers',
    // We don't "revolutionize." We provide predictive firepower.
    mainDescription: "Predict patient-specific radiosensitivity and toxicity before the first dose is ever administered. Our Zeta Oracle analyzes a tumor's DNA Damage Repair pathways to provide a quantitative forecast of treatment response, arming you with the intelligence to design truly personalized radiation plans.",
    link: '/platform/precision-rad',
    linkText: 'View Battle Plan',
    status: 'coming-soon'
  }
] as const; 