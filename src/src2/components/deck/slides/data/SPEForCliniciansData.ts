import { type AudienceValuePropData } from '@slides/layouts/AudienceValuePropLayout.tsx';

export const cliniciansData: AudienceValuePropData = {
  title: "For Clinicians: Therapeutic Design Power",
  audience: "Clinicians",
  valueProp: "Design Personalized Therapies at the Point of Care",

  steps: [
    {
      icon: "🔬",
      title: "Identify Therapeutic Opportunities",
      description: "Get evidence-backed validation of therapeutic targets before investing $10M+ in preclinical development."
    },
    {
      icon: "🧬",
      title: "Design Custom Therapeutics",
      description: "Generate 10,000+ therapeutic candidates using generative AI, optimized for your specific target and disease."
    },
    {
      icon: "✅",
      title: "Validate In-Silico, Launch in Months",
      description: "Test therapeutic efficacy computationally, then advance top candidates to IND in 6-12 months."
    }
  ],

  benefits: [
    { value: "75%", label: "More effective treatments", color: "green" },
    { value: "50%", label: "Faster time to optimal therapy", color: "blue" },
    { value: "90%", label: "Reduction in trial-and-error treatments", color: "purple" }
  ],

  quote: "By combining generative AI therapeutic design with computational validation, we transform $2.8B+ drug discovery costs into de-risked opportunities that attract funding and accelerate time to clinic."
};


