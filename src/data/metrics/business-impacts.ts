import { BusinessImpact } from './types';

// Business Impact Metrics
export const businessImpacts: BusinessImpact[] = [
  {
    metric: "VUS Rate Reduction",
    value: "40% → 15%",
    description: "Transform uncertain variants to actionable insights",
    category: "accuracy"
  },
  {
    metric: "Experimental Cost Reduction",
    value: "$2.1M per program",
    description: "Cost savings through in-silico validation",
    category: "cost"
  },
  {
    metric: "R&D Timeline Compression",
    value: "36x faster",
    description: "From years to weeks in therapeutic development",
    category: "timeline"
  },
  {
    metric: "Discovery Acceleration",
    value: "6 months → 2 weeks",
    description: "Time to first hit in drug discovery",
    category: "timeline"
  },
  {
    metric: "Drug Failure Rate",
    value: "90% → Predictable",
    description: "Transform high-risk gamble to engineering discipline",
    category: "efficiency"
  },
  {
    metric: "VUS Resolution Rate",
    value: "73%",
    description: "Resolve variants of uncertain significance",
    category: "accuracy"
  },
  {
    metric: "Experimental Cost Reduction",
    value: "96%",
    description: "Reduction through in-silico validation",
    category: "cost"
  }
];

// Helper functions for filtering business impacts
export const getImpactsByCategory = (category: BusinessImpact['category']) => 
  businessImpacts.filter(impact => impact.category === category);

export const getCostImpacts = () => getImpactsByCategory('cost');
export const getTimelineImpacts = () => getImpactsByCategory('timeline');
export const getAccuracyImpacts = () => getImpactsByCategory('accuracy');
export const getEfficiencyImpacts = () => getImpactsByCategory('efficiency');
