// Export all organism components
export { default as IntroductionSection } from './IntroductionSection';
export { default as ComparisonSection } from './ComparisonSection';
export { default as TimelineSection } from './TimelineSection';
export { default as StatisticsSection } from './StatisticsSection';
export { default as SummarySection } from './SummarySection';

// Placeholder components for missing organisms
import React from 'react';

const PlaceholderSection: React.FC<{ data: any; type: string }> = ({ data, type }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
      {type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())} Section
    </h3>
    <p className="text-yellow-700 mb-4">
      This section type is not yet implemented. The data structure is ready and can be rendered.
    </p>
    <pre className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export const TabbedSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="tabbed" />
);

export const QuizSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="quiz" />
);

export const VisualizationSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="visualization" />
);

export const CaseStudySection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="case_study" />
);

export const InsightsSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="insights" />
);

export const MechanismsSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="mechanisms" />
);

export const ClinicalRelevanceSection: React.FC<{ data: any }> = ({ data }) => (
  <PlaceholderSection data={data} type="clinical_relevance" />
); 