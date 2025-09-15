import { type AudienceValuePropData } from '@slides/layouts/AudienceValuePropLayout.tsx';

export const biotechsData: AudienceValuePropData = {
  title: "For Biotechs: Therapeutic Design & Validation",
  audience: "Biotechs",
  valueProp: "From Target to Therapeutic in Weeks, Not Years",

  steps: [
    {
      icon: "🔬",
      title: "Validate Targets Before Investment",
      description: "Get evidence-backed validation of therapeutic targets before investing $10M+ in preclinical development."
    },
    {
      icon: "🧬",
      title: "Design Novel Therapeutics",
      description: "Generate 10,000+ therapeutic candidates using generative AI, optimized for your specific target and disease."
    },
    {
      icon: "✅",
      title: "Validate In-Silico, Launch in Months",
      description: "Test therapeutic efficacy computationally, then advance top candidates to IND in 6-12 months."
    }
  ],

  benefits: [
    { value: "$50M+", label: "Average biotech Series A", color: "green" },
    { value: "12-18 months", label: "From target to IND", color: "blue" },
    { value: "75%", label: "Higher success rate", color: "purple" }
  ],

  quote: "By combining generative AI therapeutic design with computational validation, we transform $2.8B+ drug discovery costs into de-risked opportunities that attract funding and accelerate time to clinic."
};


