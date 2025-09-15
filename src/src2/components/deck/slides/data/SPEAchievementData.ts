import { type HeroIntroData } from  '@slides/layouts/HeroIntroLayout.tsx' ; // This is just a forward alias for @slides/layouts/HeroIntroLayout.tsx

export const achievementData: HeroIntroData = {
  title: "From Hypothesis to Validated Therapeutic",
  subtitle: "AI-Powered Drug Design & Validation Platform",
  description: "Our platform doesn't just predict - it predicts, designs, AND validates therapeutics using generative AI, reducing drug discovery from years to days.",

  problem: {
    title: "Traditional Drug Discovery",
    description: "Years-long process with high failure rates and massive costs"
  },

  solution: {
    title: "AI-Powered Platform",
    description: "Complete therapeutic design and validation in days, not years"
  },

  metrics: [
    { value: "$2.8B+", label: "Annual drug discovery costs saved", color: "green" },
    { value: "90%", label: "Faster therapeutic validation", color: "blue" },
    { value: "10x", label: "More therapeutic candidates explored", color: "purple" }
  ],

  framework: {
    components: [
      { letter: "🔬", name: "Identify", description: "Transform genetic variants into actionable therapeutic design opportunities with evidence-backed validation", color: "blue" },
      { letter: "🧬", name: "Design", description: "Generate and validate personalized therapeutic candidates optimized for your patient's specific genetic profile", color: "purple" },
      { letter: "✅", name: "Validate", description: "Test therapeutic efficacy computationally before clinical trials, accelerating personalized medicine", color: "green" }
    ]
  }
};


