import { Database, Clock, Workflow, TrendingUp } from 'lucide-react';

export const PROBLEM_CONFIG = {
  sectionId: "the-problem",
  title: "From Complex Challenges to Clear Solutions",
  subtitle: "CrisPRO's AI-powered platform is engineered to resolve the fundamental bottlenecks that slow down cancer research and limit therapeutic breakthroughs.",
  challenges: [
    {
      icon: Database,
      title: 'Genomic Data Interpretation',
      problem: {
        description: "Researchers face overwhelming amounts of genomic data. Manual analysis is slow, error-prone, and often results in 'Variants of Uncertain Significance' (VUS) that stall clinical decisions."
      },
      solution: {
        title: 'AI-Powered Variant Resolution',
        points: [
          "Resolve VUS with >95% accuracy using advanced AI.",
          "Identify causal disease drivers with high confidence.",
          "Automate cohort analysis, reducing timelines from months to minutes."
        ]
      }
    },
    {
      icon: Clock,
      title: 'Drug Development Timelines',
      problem: {
        description: "Traditional R&D involves multi-year, multi-billion dollar cycles with high failure rates. Physical testing of a limited number of candidates is a resource-intensive gamble."
      },
      solution: {
        title: 'In Silico Discovery Acceleration',
        points: [
          "Execute thousands of virtual therapeutic experiments in parallel.",
          "Validate top candidates with the highest probability of success before wet lab commitment.",
          "Compress pre-clinical timelines from years to weeks."
        ]
      }
    },
    {
      icon: Workflow,
      title: 'Fragmented Research Workflows',
      problem: {
        description: 'Scientists work with disconnected tools, creating inefficient and error-prone workflows that slow down the pace of research and collaboration.'
      },
      solution: {
        title: 'Unified & Collaborative Platform',
        points: [
          "An integrated interface for the entire R&D lifecycle.",
          "AI co-pilot manages complex, multi-step analyses.",
          "Seamlessly integrate all data sources into one comprehensive view."
        ]
      }
    },
    {
      icon: TrendingUp,
      title: 'Limitations in Scalability',
      problem: {
        description: 'The exponential growth in genomic data and therapeutic opportunities is outpacing the capabilities of traditional, manual R&D workflows.'
      },
      solution: {
        title: 'AI-Native Scalable Architecture',
        points: [
          "Scale seamlessly from single variants to entire patient cohorts.",
          "Cloud-native architecture provides on-demand computational power.",
          "Purpose-built to meet the evolving demands of precision medicine."
        ]
      }
    }
  ],
  summaryTitle: "From Complexity to Clarity",
  summaryText: "The CrisPRO Intelligence Platform is engineered to resolve the core inefficiencies in therapeutic R&D. We replace slow, manual, and uncertain processes with an AI-powered, unified system that delivers results with speed, accuracy, and confidence."
}; 