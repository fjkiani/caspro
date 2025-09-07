import { WorkflowStep } from './types';

// End-to-End RUO Workflow
export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Problem Framing & Data Curation",
    description: "Assemble genomic loci, clinical variants, DMS datasets",
    capability: "Data Integration",
    businessValue: "Ensure comprehensive input for accurate analysis"
  },
  {
    step: 2,
    title: "Target Assessment (Discriminative)",
    description: "CrisPRO zero-shot ΔLL scoring in 8,192 bp context",
    capability: "Variant Interpretation",
    businessValue: "95.7% AUROC ClinVar validation prevents costly failures"
  },
  {
    step: 3,
    title: "Mechanistic Triage & Hypothesis",
    description: "CrisPRO embeddings for exon/intron classification",
    capability: "Functional Classification",
    businessValue: "Identify functional variants affecting drug response"
  },
  {
    step: 4,
    title: "Design (Generative)",
    description: "CrisPRO proposals with Enformer+Borzoi scoring",
    capability: "Therapeutic Design",
    businessValue: "1M token context enables comprehensive candidate generation"
  },
  {
    step: 5,
    title: "In-Silico Validation",
    description: "Aggregate scores with structure metrics (pLDDT/PAE)",
    capability: "Structural Validation",
    businessValue: "96% reduction in experimental costs through validation"
  },
  {
    step: 6,
    title: "Feedback & Calibration",
    description: "Lightweight supervised heads on CrisPRO embeddings",
    capability: "Continuous Learning",
    businessValue: "Improve performance with domain-specific data"
  },
  {
    step: 7,
    title: "Reporting & Provenance",
    description: "Evidence reports with traceable citations",
    capability: "Transparency",
    businessValue: "Build trust through complete audit trails"
  }
];

// Helper functions for workflow steps
export const getWorkflowStepByNumber = (step: number) => 
  workflowSteps.find(workflowStep => workflowStep.step === step);

export const getWorkflowStepsByCapability = (capability: string) => 
  workflowSteps.filter(step => 
    step.capability.toLowerCase().includes(capability.toLowerCase())
  );

export const getWorkflowStepsByBusinessValue = (valueKeyword: string) => 
  workflowSteps.filter(step => 
    step.businessValue.toLowerCase().includes(valueKeyword.toLowerCase())
  );
