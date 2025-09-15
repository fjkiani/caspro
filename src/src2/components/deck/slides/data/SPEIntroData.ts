import { type HeroIntroData } from '@slides/layouts/HeroIntroLayout.tsx' ; // This is just a forward alias for @slides/layouts/HeroIntroLayout.tsx

export const heroIntroData: HeroIntroData = {
  title: "S/P/E Framework",
  subtitle: "AI-Powered Therapeutic Design & Validation Platform",
  description: "Predict + Design + Validate • Reduce $2.8B+ drug discovery costs • From months to days",

  problem: {
    title: "The Problem",
    description: "Drug discovery takes 10+ years and costs $2.8B+ per approved drug, with 90% failure rate in clinical trials"
  },

  solution: {
    title: "Our Solution",
    description: "AI-powered platform that predicts, designs, AND validates therapeutics in silico before clinical trials"
  },

  framework: {
    components: [
      { letter: "S", name: "Sequence", description: "How disruptive is this DNA change?", color: "sky" },
      { letter: "P", name: "Pathway", description: "Combined impact on disease pathways", color: "purple" },
      { letter: "E", name: "Evidence", description: "Clinical databases & literature validation", color: "green" }
    ]
  }
};


