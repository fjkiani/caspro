import { UsersIcon, TestTube2Icon, RadiationIcon } from 'lucide-react';

export const coPilotOptions = [
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