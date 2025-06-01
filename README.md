# CrisPRO Visualization Framework

A comprehensive visualization framework for CRISPR therapeutic development, including sequence analysis, risk assessment, knowledge graphs, and timeline visualization.

## Components

### Core Components

- **DataVisualizer**: Container component that handles loading, error, and empty states for visualizations
- **InteractiveCanvas**: Foundation for 3D visualizations with camera controls
- **ScientificNotation**: Components for formatting scientific values with appropriate significance indicators
- **ColorSchemes**: Consistent color palettes for biological entities and risk indicators

### Analysis Visualizations

- **SequenceViewer**: Interactive visualization of DNA/RNA sequences with annotation support
- **RiskHeatmap**: Matrix visualization for risk scores and analysis data
- **KnowledgeGraph**: Force-directed graph visualization for gene-variant-outcome relationships
- **TimelineVisualizer**: Timeline visualization for disease progression and therapeutic development

### Layout Components

- **DashboardLayout**: Flexible grid layout system for organizing visualizations

## Features

### KnowledgeGraph

A force-directed graph visualization component for displaying connections between biological entities:

- Interactive nodes representing genes, variants, outcomes, therapies, and publications
- Weighted edges showing relationships and evidence strength
- Physics simulation for automatic layout
- Node dragging and zooming controls
- Highlighting of connected nodes on hover
- Type-based filtering
- Tooltips with detailed information
- Support for custom node and edge styling

```jsx
import { KnowledgeGraph } from '@/components/visualization';

// Example usage
<KnowledgeGraph
  nodes={graphNodes}
  edges={graphEdges}
  enableDragging={true}
  showLabels={true}
  usePhysics={true}
  highlightConnections={true}
  onNodeClick={(node) => console.log('Node clicked:', node)}
/>
```

### TimelineVisualizer

A timeline visualization component for displaying events and stages over time:

- Support for multiple tracks (disease progression, treatment, biomarkers, etc.)
- Events with risk and confidence indicators
- Timeline stages showing periods of consistent state
- Interactive zooming and panning
- Relative or absolute time modes
- Customizable time formats
- Collapsible tracks
- Tooltips with detailed information

```jsx
import { TimelineVisualizer } from '@/components/visualization';

// Example usage
<TimelineVisualizer
  tracks={timelineTracks}
  timeMode="relative"
  timeUnit="days"
  showCurrentTime={true}
  enableZoom={true}
  showRiskIndicators={true}
  onEventClick={(event) => console.log('Event clicked:', event)}
/>
```

## Getting Started

To use the visualization components in your application:

1. Import the components from the visualization module:

```jsx
import { 
  SequenceViewer, 
  RiskHeatmap, 
  KnowledgeGraph,
  TimelineVisualizer,
  DashboardLayout 
} from '@/components/visualization';
```

2. Use them in your React components:

```jsx
export default function ExamplePage() {
  return (
    <div>
      <h1>Example Visualizations</h1>
      
      <DashboardLayout widgets={[
        {
          id: 'sequence-widget',
          title: 'Gene Sequence',
          content: <SequenceViewer sequence={dnaSequence} annotations={annotations} />,
          width: 'col-span-12 lg:col-span-6'
        },
        {
          id: 'risk-widget',
          title: 'Risk Assessment',
          content: <RiskHeatmap data={riskData} />,
          width: 'col-span-12 lg:col-span-6'
        },
        {
          id: 'knowledge-widget',
          title: 'Gene-Variant Network',
          content: <KnowledgeGraph nodes={nodes} edges={edges} />,
          width: 'col-span-12'
        },
        {
          id: 'timeline-widget',
          title: 'Disease Progression',
          content: <TimelineVisualizer tracks={tracks} />,
          width: 'col-span-12'
        }
      ]} />
    </div>
  );
}
```

## Demo Page

Visit the visualization demo page at `/visualization-demo` to see all components in action.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
