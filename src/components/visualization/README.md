# CrisPRO Visualization Framework

The CrisPRO Visualization Framework is a comprehensive component library for visualizing genomic data, CRISPR designs, protein structures, and therapeutic analyses. This framework is designed for researchers, clinicians, and other stakeholders working in the field of CRISPR-based therapeutic development.

## Framework Architecture

The visualization framework is organized into several component categories:

### Foundation Components

- **DataVisualizer**: A container component that handles common data visualization states (loading, error, empty).
- **InteractiveCanvas**: A foundation for 3D visualizations with camera controls (rotation, zoom, pan).
- **DashboardLayout**: A flexible grid layout for organizing visualizations with options for responsive sizing.
- **ScientificNotation**: Formatting components for scientific values with appropriate notation and styling.
- **ColorSchemes**: Consistent color palettes for various biological entities and data types.

### Genomic Visualization

- **SequenceViewer**: For visualizing DNA/RNA sequences with annotations and highlighting.
- **DoubleDnaHelix**: 3D visualization of the DNA double helix structure.
- **CrisprGenomeEditor**: Visualization of the CRISPR-Cas9 editing process.

### Protein Visualization

- **ProteinFoldingVisualizer**: Visualization of protein folding from primary to tertiary structure.
- **ProteinModelViewer**: 3D protein structure viewer with various coloring options.

### Analysis Visualization

- **RiskHeatmap**: Visualization of risk scores and other analytical data in a matrix format.

## Quick Start

### Installation

All components are included in the CrisPRO codebase. To use them, simply import from the appropriate path:

```tsx
import { 
  DataVisualizer, 
  SequenceViewer, 
  RiskHeatmap 
} from '@/components/visualization';
```

### Basic Usage Examples

#### Visualizing a DNA Sequence

```tsx
import { SequenceViewer } from '@/components/visualization';

function GenomeViewer() {
  const demoSequence = "ATGCCTGAGCTAGTCGAACGTACGTACGTAGCT";
  
  const highlightedRegions = [
    { 
      start: 5, 
      end: 15, 
      label: 'Guide RNA', 
      color: 'rgba(20, 184, 166, 0.5)', 
      type: 'guide',
      description: 'CRISPR guide RNA binding site' 
    },
    { 
      start: 16, 
      end: 18, 
      label: 'PAM Site', 
      color: 'rgba(244, 114, 182, 0.5)', 
      type: 'pam',
      description: 'Protospacer Adjacent Motif (NGG)' 
    },
  ];
  
  return (
    <SequenceViewer
      sequence={demoSequence}
      highlightedRanges={highlightedRegions}
      showPositions={true}
      basesPerLine={40}
      enableSelection={true}
      showGuideConnections={true}
      onBaseClick={(position, base) => console.log(`Clicked ${base} at ${position}`)}
    />
  );
}
```

#### Creating a Risk Assessment Dashboard

```tsx
import { RiskHeatmap, DashboardLayout } from '@/components/visualization';

function RiskAssessment() {
  const riskCategories = [
    { id: 'off_target', name: 'Off-Target Risk', description: 'Probability of off-target effects' },
    { id: 'immunogenicity', name: 'Immunogenicity', description: 'Likelihood of immune response' },
    { id: 'delivery', name: 'Delivery Efficacy', description: 'Efficiency of delivery to target cells' },
  ];
  
  const riskItems = [
    { 
      id: 'design1', 
      name: 'Design 1',
      description: 'Standard CRISPR-Cas9 with lentiviral delivery',
      categories: { 
        off_target: 0.62, 
        immunogenicity: 0.45, 
        delivery: 0.78, 
      }
    },
    { 
      id: 'design2', 
      name: 'Design 2',
      description: 'High-fidelity Cas9 with AAV delivery',
      categories: { 
        off_target: 0.28, 
        immunogenicity: 0.52, 
        delivery: 0.65, 
      }
    },
  ];
  
  const dashboardPanels = [
    {
      id: 'risk_assessment',
      title: 'CRISPR Design Risk Assessment',
      content: (
        <RiskHeatmap
          categories={riskCategories}
          items={riskItems}
          showSummaryScore={true}
        />
      ),
      width: 'full',
      height: 'medium',
      collapsible: true,
    },
    // Additional panels can be added here
  ];
  
  return (
    <DashboardLayout
      panels={dashboardPanels}
      title="Therapeutic Design Analysis"
      backgroundStyle="gradient"
    />
  );
}
```

#### Using the CRISPR Genome Editor

```tsx
import { CrisprGenomeEditor } from '@/components/ui';

function GenomeEditing() {
  return (
    <div className="h-96">
      <CrisprGenomeEditor 
        baseCount={20}
        targetSequence="ATGCCTGAGCTAGTCGAA"
        rotationSpeed={40}
      />
    </div>
  );
}
```

## Component Documentation

### DataVisualizer

A container component that handles common data visualization states:
- Loading state with optional spinner
- Error state with message
- Empty state when data is available but empty
- Rendering children with data when available

```tsx
<DataVisualizer
  data={myData}
  isLoading={loading}
  error={error}
  minimumLoadingTime={500}
  animate={true}
>
  {(data) => <YourVisualization data={data} />}
</DataVisualizer>
```

### InteractiveCanvas

A foundation for 3D visualizations with camera controls:
- Rotation (mouse drag)
- Zoom (scroll wheel)
- Auto-rotation
- Camera positioning

```tsx
<InteractiveCanvas
  enableRotation={true}
  enableZoom={true}
  autoRotate={true}
  autoRotateSpeed={0.5}
  initialCameraPosition={{ x: 20, y: 0, z: 0 }}
  backgroundGradient={{
    from: 'from-indigo-950',
    to: 'to-slate-900',
  }}
>
  {/* Your 3D content here */}
</InteractiveCanvas>
```

### SequenceViewer

Displays DNA or RNA sequences with optional highlighting, annotations, and interactive features:
- Base highlighting with custom colors
- Region annotations with tooltips
- Selection of sequence ranges
- Position numbering
- Guide RNA and PAM site connection visualization

```tsx
<SequenceViewer
  sequence={dnaSequence}
  isRna={false}
  highlightedRanges={regions}
  showPositions={true}
  basesPerLine={50}
  enableSelection={true}
  onBaseClick={(position, base) => handleBaseClick(position, base)}
  onRangeSelect={(start, end) => handleRangeSelect(start, end)}
  showGuideConnections={true}
/>
```

### RiskHeatmap

Displays a matrix of risk scores or other analytical data with color coding:
- Color-coded cells based on value
- Summary scores
- Tooltips with detailed information
- Weighted averages
- Custom color ranges

```tsx
<RiskHeatmap
  categories={categories}
  items={items}
  showSummaryScore={true}
  summaryMethod="weighted"
  categoryWeights={{
    category1: 2,
    category2: 1,
  }}
  showValues={true}
  colorRange={{
    min: 0,
    max: 1,
    minColor: '#22c55e',
    maxColor: '#ef4444',
  }}
/>
```

### DashboardLayout

Arranges visualization components in a flexible grid layout:
- Responsive sizing
- Collapsible panels
- Refreshable content
- Custom panel sizes
- Grid gap control

```tsx
<DashboardLayout
  panels={[
    {
      id: 'panel1',
      title: 'Panel Title',
      content: <YourComponent />,
      width: 'half',
      height: 'medium',
      collapsible: true,
      refreshable: true,
      onRefresh: () => fetchNewData(),
    },
    // More panels
  ]}
  title="Dashboard Title"
  subtitle="Dashboard description"
  backgroundStyle="gradient"
  gap="medium"
/>
```

### ScientificNotation

Renders numeric values in a consistent, scientifically appropriate format:
- Scientific notation for small/large numbers
- Proper rounding and formatting
- Unit display
- Significance highlighting
- Percentage formatting

```tsx
<ScientificNotation value={0.00000123} scientific={true} units="M" />
<PValue value={0.0023} />
<Score value={0.85} threshold={0.7} />
```

## Color Schemes

The framework provides consistent color schemes for various biological entities:

- **Nucleotides**: A (red), T (blue), G (yellow), C (green), U (purple for RNA)
- **Amino Acids**: Colored by property (hydrophobic, neutral, hydrophilic)
- **Protein Structure**: Helix (red), Sheet (blue), Coil (yellow), Turn (purple)
- **Risk Levels**: High (red), Medium (orange), Low (yellow), None (green)
- **Confidence Levels**: High (green), Medium (yellow), Low (red)

```tsx
import { 
  getColorForNucleotide, 
  getColorForAminoAcid, 
  getColorForRisk 
} from '@/components/visualization';

const nucleotideColor = getColorForNucleotide('A'); // Returns '#f87171' (red)
const aaColor = getColorForAminoAcid('K'); // Returns color for Lysine
const riskColor = getColorForRisk(0.8); // Returns high risk color
```

## Demo Page

A comprehensive demo of all visualization components is available at `/visualization-demo`.

## Best Practices

1. **Data Handling**: Always wrap visualizations with DataVisualizer to handle loading/error states consistently.
2. **Responsive Design**: Use width properties in DashboardLayout to ensure visualizations adapt to different screen sizes.
3. **Interactive Features**: Provide tooltips and interactive elements to enhance user experience.
4. **Consistent Styling**: Use the provided color schemes for consistency across visualizations.
5. **Performance**: For large datasets, consider pagination, virtualization, or data sampling. 