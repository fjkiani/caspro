import { CoPilotDetailContent } from '../../types/copilot-types';

export const forgeIntelligenceData: CoPilotDetailContent = {
  slug: "forge-intelligence",
  pageTitle: "Forge Intelligence — Therapeutic Design AI",
  heroSubtitle: "AI that designs precision therapeutics from first principles - CRISPR guides, protein inhibitors, and HDR templates engineered for efficacy.",

  vision: "We design precision interventions from molecular first principles, validated through structural modeling and optimized for clinical success. Every therapeutic is engineered, not discovered.",

  valueProps: [
    {
      audience: 'For Biotech Founders',
      icon: 'Wrench',
      points: [
        'Design CRISPR guides with 100% AlphaFold 3 validation before lab work.',
        'Generate novel protein therapeutics with optimized binding affinity.',
        'Create HDR repair templates optimized for clinical success.'
      ]
    },
    {
      audience: 'For Drug Hunters',
      icon: 'Target',
      points: [
        'Access therapeutic design capabilities that rival Big Pharma R&D.',
        'Reduce design cycles from months to days with AI assistance.',
        'Validate designs in-silico before expensive synthesis and testing.'
      ]
    },
    {
      audience: 'For Research Institutions',
      icon: 'Flask',
      points: [
        'Accelerate therapeutic development with state-of-the-art design tools.',
        'Generate patent-worthy candidates with validated structural integrity.',
        'Bridge the gap between academic research and clinical translation.'
      ]
    }
  ],

  coreProblemIntro: "Traditional therapeutic design relies on trial-and-error approaches that waste millions in failed experiments. Our platform addresses these fundamental challenges:",
  coreProblemPoints: [
    "**Design Uncertainty:** Most therapeutic designs fail due to poor molecular understanding, leading to wasted resources and delayed timelines.",
    "**Structural Instability:** Many designed therapeutics lack the structural integrity needed for clinical efficacy and safety.",
    "**Inefficient Optimization:** Manual design iteration cycles are slow and expensive, limiting the exploration of design space.",
    "**Regulatory Gaps:** Lack of structural validation and mechanistic understanding creates regulatory uncertainty.",
    "**Scale Limitations:** Traditional methods cannot explore the vast therapeutic design space efficiently."
  ],

  keyCapabilities: [
    {
      title: "CRISPR Guide Generation",
      technical: "Evo2-powered guide RNA design with PAM windowing, heuristic scoring, and viral content checks.",
      scientific: "Generates precision CRISPR guides with predicted cutting efficiency and off-target assessment.",
      business: "Design validated CRISPR therapeutics before investing in expensive lab work and animal studies."
    },
    {
      title: "Protein Therapeutic Engineering",
      technical: "Generative protein design using Evo2 + structural oracles for novel biologics and inhibitors.",
      scientific: "Creates antibody fragments, nanobodies, and enzyme inhibitors with optimized binding affinity and stability.",
      business: "Develop patent-worthy biologic candidates with superior therapeutic properties."
    },
    {
      title: "HDR Template Design",
      technical: "Homology-directed repair blueprint generation with synteny preservation and naturalness validation.",
      scientific: "Engineers DNA repair templates that maintain genomic context and functional integrity.",
      business: "Create precise gene correction therapies with minimal off-target effects."
    },
    {
      title: "Structural Validation Engine",
      technical: "AlphaFold 3 integration with pLDDT ≥70 threshold for 3D structural confidence scoring.",
      scientific: "Validates all generated therapeutics have plausible 3D structures and binding conformations.",
      business: "Eliminate structurally unstable candidates before synthesis, saving time and money."
    }
  ],

  buildsOn: "Forge Intelligence builds on our validated generative AI foundation, delivering therapeutic design capabilities:",
  buildsOnStackPoints: [
    "**Evo2 Generative Foundation:** 40B parameter model with 1M token context for molecular design from first principles.",
    "**AlphaFold 3 Structural Validation:** 95.8% average confidence scores for generated protein complexes.",
    "**Guided Generation Pipeline:** Objective-driven design with peak optimization and constraint satisfaction.",
    "**Multi-Modal Validation:** Structural integrity, binding affinity, and functional coherence assessment.",
    "**Quality Control Framework:** Synteny preservation, dinucleotide KL divergence, and naturalness validation.",
    "**Patent-Ready Generation:** Designs engineered for intellectual property protection and regulatory approval."
  ],

  genomicUseCasesGrid: [
    { "label": "CRISPR Guide Forge", "iconName": "Scissors", "color": "text-blue-400" },
    { "label": "Protein Engineering", "iconName": "Molecule", "color": "text-green-400" },
    { "label": "HDR Template Design", "iconName": "Dna", "color": "text-purple-400" },
    { "label": "Structural Validation", "iconName": "CheckCircle", "color": "text-red-400" },
    { "label": "Therapeutic Optimization", "iconName": "Zap", "color": "text-orange-400" },
    { "label": "Regulatory Documentation", "iconName": "FileText", "color": "text-yellow-400" }
  ],

  valuePropositionSections: [
    {
      audience: "For Biotech Startups",
      points: [
        "Access therapeutic design capabilities that rival Big Pharma labs.",
        "Reduce design cycles from 6-12 months to 2-4 weeks.",
        "Generate patent-worthy candidates with validated efficacy.",
        "Attract investment with data-backed therapeutic portfolios.",
        "Scale R&D capacity without proportional cost increases."
      ]
    },
    {
      audience: "For Academic Research Labs",
      points: [
        "Accelerate translation from basic research to clinical candidates.",
        "Generate novel therapeutic modalities for disease models.",
        "Validate research hypotheses with in-silico therapeutic design.",
        "Compete for grants with novel therapeutic approaches.",
        "Bridge the valley of death between research and clinical application."
      ]
    },
    {
      audience: "For Drug Discovery Teams",
      points: [
        "Explore vast therapeutic design spaces efficiently.",
        "Design multi-specific antibodies and complex biologics.",
        "Optimize pharmacokinetics and pharmacodynamics upfront.",
        "Reduce late-stage failures due to poor molecular design.",
        "Accelerate IND filing with validated therapeutic candidates."
      ]
    }
  ],

  conclusion: "Forge Intelligence provides generative AI that engineers precision interventions from molecular first principles. By combining Evo2's generative power with AlphaFold 3's structural validation, we reduce guesswork and waste from traditional drug design. Every therapeutic generated by Forge is structurally validated, functionally optimized, and ready for the clinic."
};
