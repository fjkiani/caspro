import { Cpu, Share2, Edit, Workflow } from 'lucide-react';

export const DEEP_DIVE_CONFIG = {
  sectionId: "technology-deep-dive",
  title: "The Science & Engineering Behind CrisPRO",
  subtitle: "end-to-end in silico agentic war machine to conquer the future with a command and control system for therapeutic R&D with state of the art accuracy.",
  
  technologies: [
    {
      id: "evo2",
      icon: Cpu,
      title: "The Zeta Oracle (The Intelligence Agent)",
      modelPath: "/models/dna.glb",
      scientificBasis: "To achieve total information dominance by delivering a definitive, quantitative verdict on any biological question.",
      howItWorks: " The Oracle is our discriminative AI weapon. It is a 40B-parameter foundational model of biology that we use to analyze and score existing sequences. Using delta_likelihood_score Zeta measures the functional damage of any mutation from first principles and annihilates 'Variants of Uncertain Significance' by finding  the truth."
    },
    {
      id: "alphafold3",
      icon: Share2,
      title: "The Zeta Forge (The Weapons Factory)",
      modelPath: "/models/3nmm-haemoglobin.glb",
      scientificBasis: "To transform intelligence into overwhelming firepower. It does not analyze; it creates weapons.",
      howItWorks: "The Forge is our generative weapon. We give it a mission-based prompt—from a simple DNA 'bait' sequence to a high-level command —and it forges novel, biologically coherent therapeutics from scratch. This is the engine that builds our 'Gene Correction Blueprints,' our 'Precision Interception' gRNAs, and our 'Novel Biologic Inhibitors.' It forges the cure."
    },
    {
      id: "crispr",
      icon: Edit,
      title: "Zeta Boltz (The Crucible Agent)",
      modelPath: "/models/dna_rna.glb",
      scientificBasis: " To ensure that every weapon we forge is not just beautiful on paper, but can withstand the brutal physics of the real world.",
      howItWorks: "The Boltz is our structural validation engine. It takes the 1D protein sequences forged by the Zeta Forge and subjects them to the gauntlet of 3D biophysical simulation. It returns a hard, quantitative pLDDT score, a measure of structural integrity ensuring our weapons will not break."
    },
    {
        id: "crispr",
        icon: Edit,
        title: "CRISPR: Precision Gene Editing",
        modelPath: "/models/dna.glb",
        scientificBasis: "A programmable gene editing tool using a guide RNA to direct a Cas enzyme for precise DNA modifications. It can disrupt genes or, with a repair template, correct or insert genetic material.",
        howItWorks: "Zeta Oracle's analysis and generative capabilities directly inform CRISPR component creation. CrisPRO facilitates designing optimal guide RNAs and repair templates for specific therapeutic goals."
      }
  ],

  workflow: {
    title: "The CrisPRO Integrated Workflow",
    subtitle: "CrisPRO intelligently orchestrates these technologies into a seamless workflow from genomic data to therapeutic insights.",
    icon: Workflow,
    steps: [
      { title: "Genomic Data Input", text: "Patient genomic data, including mutations and coordinates." },
      { title: "Evo2 Variant Analysis", text: "Accurate functional impact prediction to identify key drivers and targets." },
      { title: "Target Identification", text: "Prioritize mutations/genomic regions for intervention based on Evo2 and clinical context." },
      { title: "AI-Guided Therapeutic Design", text: "Evo2 generates candidate sequences for CRISPR components (guides, templates)." },
      { title: "AlphaFold 3 Structural Evaluation", text: "Predict 3D structures and interactions of designed components." },
      { title: "Integrated Scoring & Evaluation", text: "Combine Evo2 & AlphaFold 3 insights to score therapeutic strategies." },
      { title: "Recommendation Generation", text: "Present top AI-designed therapeutic candidates with simulated supporting evidence." },
    ]
  },

  summary: {
    title: "Synergistic Power",
    text: "CrisPRO synergizes Evo2's high-accuracy predictions and generative power with AlphaFold 3's structural insights. This enables rapid in silico design and evaluation of novel genetic sequences for targeted cancer therapies, accelerating the path from discovery to intervention."
  }
}; 