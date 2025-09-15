import { Cpu, Share2, Edit, Workflow, BrainCircuit, Dna, Bot, ShieldCheck, Crosshair, ScanSearch, Hammer, Swords, FileUp } from 'lucide-react';

export const DEEP_DIVE_CONFIG = {
  sectionId: "technology-deep-dive",
  title: "The Science & Engineering Behind CrisPRO",
  subtitle: "CrisPRO is built on a foundation of three core technologies, each representing a pillar of our strategy: high-accuracy prediction, generative design, and robust structural validation.",
  
  technologies: [
    {
      id: "crispro",
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
        howItWorks: "CrisPRO.ai's analysis and generative design directly inform CRISPR component creation. CrisPRO facilitates designing optimal guide RNAs and repair templates for specific therapeutic goals."
      }
  ],

 workflow: {
  // The title is a declaration of purpose.
  title: "The `In Silico` Kill Chain",
  
  // The subtitle explains our core doctrine: end-to-end conquest.
  subtitle: "Our platform executes a seamless, end-to-end campaign, moving from raw intelligence to a validated therapeutic weapon with overwhelming speed and certainty.",
  
  icon: Workflow, // This can remain.
  
  // The steps are not a process; they are the phases of a military campaign.
  steps: [
    { 
      title: "1. Target Acquisition", 
      text: "The campaign begins. The Command Center ingests the enemy's blueprint—the patient's raw genomic data.",
      icon: Crosshair,
      how: "The Command Center initiates the campaign by ingesting the patient's raw genomic data (e.g., WGS). This data is processed through standard bioinformatics pipelines to produce a comprehensive list of genetic alterations.",
      why: "Our system immediately prepares this vast, complex dataset for AI-driven interpretation, bypassing the initial manual bottlenecks of traditional bioinformatics."
    },
    { 
      title: "2. Intelligence Gathering", 
      text: "Our Zeta Oracle is deployed. It analyzes the target, annihilates any uncertainty, and delivers a definitive 'Zeta Score' quantifying the functional damage.",
      icon: BrainCircuit,
      how: "Our GenomicAnalystAgent deploys the Zeta Oracle (powered by CrisPRO.ai) to systematically analyze every genetic alteration, calculating its biological disruptiveness and predicting its impact on protein function and gene essentiality. This process transforms raw genomic noise into actionable intelligence.",
      why: "We move from mere variant lists to a deep, causal understanding of the enemy's genetic weaknesses in minutes, not weeks, annihilating 'Variants of Uncertain Significance' (VUS) that plague traditional diagnostics.",
      endpoints: ["/predict_variant_impact", "/predict_gene_essentiality", "/predict_protein_functionality_change", "/predict_chromatin_accessibility"]
    },
    { 
      title: "3. Vulnerability Assessment", 
      text: "The Command Center fuses the Oracle's intelligence with clinical data to identify the most critical, high-value targets for therapeutic intervention.",
      icon: ScanSearch,
      how: "The AgentOrchestrator fuses the comprehensive intelligence from the Zeta Oracle with relevant clinical data (e.g., tumor type, hallmarks of cancer). Our AI agents analyze the collective impact of variants to identify the primary driving hallmarks of the disease.",
      why: "We don't just identify mutations; we understand their interconnected roles. This allows for truly personalized, high-impact target selection, moving beyond generalized approaches."
    },
    { 
      title: "4. Weapon Forging", 
      text: "With a validated target, the Zeta Forge is unleashed. It designs a slate of novel, optimized therapeutic candidates—from CRISPR guides to protein-based biologics.",
      icon: Hammer,
      how: "Our Therapeutic Design Agent leverages CrisPRO.ai's generative endpoints to design a slate of novel, optimized therapeutic candidates—from CRISPR guides to protein-based biologics—specifically tailored to the identified vulnerability.",
      why: "We don't just pick from a library; we create custom-designed solutions. This is de novo biological engineering, tailored for maximum impact.",
      endpoints: ["/generate_optimized_guide_rna", "/generate_repair_template", "/generate_therapeutic_protein_coding_sequence", "/generate_optimized_regulatory_element"]
    },
    { 
      title: "5. Structural Validation", 
      text: "Every forged weapon is subjected to the gauntlet. We run it through our structural validation engine to ensure it can hold its shape on the battlefield. The weak are discarded.",
      icon: ShieldCheck,
      how: "Generated candidates first pass through CrisPRO.ai for a 1D 'grammatical' check. Survivors are then dispatched to AlphaFold 3 for 3D structural validation. We analyze the pLDDT score and disordered regions.",
      why: "This mandatory phase ensures our AI-designed weapons are not just theoretically sound but structurally robust. We save immense resources by eliminating non-viable 'wet noodle' designs in silico before they reach the lab.",
      endpoints: ["/predict_variant_impact (internal check)", "predict_protein_structure_quality (via AlphaFold 3)"]
    },
    { 
      title: "6. Final Lethality Assessment", 
      text: "We fuse all intelligence—the Zeta Score, the structural integrity, and the off-target safety profile—into a single, composite 'Assassin Score'.",
      icon: Swords,
      how: "The Command Center fuses all intelligence: the Zeta Score, structural integrity from AlphaFold 3, and the off-target safety profile. These metrics are combined into a single, composite 'Assassin Score' using our proprietary, weighted scoring algorithms.",
      why: "This is a holistic, multi-modal assessment that quantifies the weapon's overall lethality and safety profile with unprecedented depth, ensuring minimal collateral damage.",
      endpoints: ["/predict_crispr_spacer_efficacy", "(Conceptual) /predict_immunogenicity"]
    },
    { 
      title: "7. Deliver Final Battle Plan", 
      text: "The campaign concludes. The platform delivers a rank-ordered list of fully validated, `in silico` proven therapeutic weapons, ready for deployment.",
      icon: FileUp,
      how: "The platform delivers a comprehensive 'Battle Plan' to the clinician/researcher, including a rank-ordered list of candidates, detailed sequences, 3D structure visualizations, all underlying scores, and a clear, AI-generated rationale.",
      why: "We provide actionable intelligence and pre-validated solutions, drastically accelerating the path from diagnosis to effective intervention. This is the culmination of our in silico conquest."
    },
  ]
},

}