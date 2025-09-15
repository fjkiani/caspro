# Use-Case Slides with Live JSON Outputs

This document explains how to create investor-friendly slides that show live JSON outputs, explain what each field means, and tie results back to clinical framing using the reusable components.

## Components Created

### 1. `UseCaseSlideTemplate.tsx`
A reusable template component that provides the standard layout for use-case slides:
- Left panel: Live JSON output in monospace code block
- Right panel: 3 explanatory bullets with icons
- Footer: Research-mode qualifier and run ID

### 2. Example Use-Case Slides
- `SPEMultipleMyelomaUseCaseSlide.tsx` - Multiple Myeloma example
- `SPEOvarianCancerUseCaseSlide.tsx` - Ovarian Cancer example  
- `SPEMelanomaUseCaseSlide.tsx` - Melanoma example
- `SPEAPIIntegrationSlide.tsx` - API integration demonstration

### 3. `spe-use-cases.tsx`
A complete deck demonstrating all use-case slides with navigation.

## How to Create New Use-Case Slides

### Step 1: Use the Template
```typescript
import UseCaseSlideTemplate from '../../shared/UseCaseSlideTemplate';

const MyNewUseCaseSlide = () => {
  const jsonOutput = `{
  "therapy": "Your Therapy",
  "disease": "Your Disease",
  "on_label": true,
  "tier": "I",
  // ... rest of your JSON
}`;

  const explanations = [
    {
      title: "Your First Point",
      description: "Explanation of what this means clinically",
      icon: <CheckCircle size={24} className="text-green-400" />
    },
    // ... 2 more explanations
  ];

  return (
    <UseCaseSlideTemplate
      title="Your Disease: What the Live Output Means"
      subtitle="Aligned with FDA labels and transparent evidence"
      jsonOutput={jsonOutput}
      explanations={explanations}
      footnote="Research-mode; cohort-dependent"
      runId="your-run-id"
    />
  );
};
```

### Step 2: Follow the JSON Schema
Use the canonical schema for consistency:

```json
{
  "therapy": "string",                 
  "disease": "string",
  "on_label": true,
  "tier": "I|II|III|IV",
  "strength": "low|moderate|high",
  "efficacy_score": 0.0,
  "confidence": 0.0,
  "insights": { 
    "functionality": 0.0, 
    "chromatin": 0.0, 
    "essentiality": 0.0, 
    "regulatory": 0.0 
  },
  "rationale": ["short strings"],
  "citations": ["pmid strings"],
  "evidence_tier": "consider|supported|insufficient",
  "badges": ["RCT|Guideline|ClinVar-Strong"],
  "provenance": { "efficacy_run": "short id" }
}
```

### Step 3: Explain Key Concepts
Always include explanations for:
1. **FDA Alignment & Clinical Gates** - What `on_label` and `tier` mean
2. **Efficacy vs Confidence** - Difference between ranking and trust scores
3. **Transparent Provenance** - How citations and run IDs ensure auditability

### Step 4: Add to Your Deck
```typescript
// In your deck file
import { MyNewUseCaseSlide } from '../../components/deck/slides/SPE_Slides';

const slides = [
  // ... other slides
  MyNewUseCaseSlide,
  // ... more slides
];
```

## Key Principles

### Field Meanings
- **efficacy_score**: 0–1 signal combining S/P/E, not a probability; used to rank options
- **confidence**: 0–1 trust in the recommendation, modulated by evidence strength
- **on_label + tier**: Clinical framing gates (Tier I for FDA on-label)
- **insights**: Supportive signals surfaced as chips in UI
- **rationale, citations**: Human-readable why and PubMed PMIDs for auditability

### Slide Content Pattern
- **Title**: "<Disease/Use-case>: What the live output means"
- **Subtitle**: "Aligned with FDA labels and transparent evidence"
- **Left panel**: Monospace JSON block from backend
- **Right panel**: 3 short bullets explaining the output
- **Footer**: Research-mode qualifier + run ID

### API Integration
Use the local backend at `http://127.0.0.1:8000`:

```bash
curl -sS -X POST http://127.0.0.1:8000/api/efficacy/predict \
  -H 'Content-Type: application/json' \
  -d '{
    "model_id":"evo2_1b",
    "mutations":[{"gene":"BRAF","hgvs_p":"V600E","chrom":"7","pos":140453136,"ref":"T","alt":"A"}],
    "options":{"adaptive":true,"ensemble":true},
    "api_base":"http://127.0.0.1:8000"
  }'
```

## Examples

### Multiple Myeloma
- Shows off-label therapy with moderate evidence
- Demonstrates how clinical gates work
- Explains efficacy vs confidence scoring

### Ovarian Cancer  
- Shows essentiality analysis combined with guidance
- Demonstrates Tier I FDA alignment
- Explains evidence hierarchy in action

### Melanoma
- Shows on-label therapy with high confidence
- Demonstrates "Yes GO" clinical gating
- Explains transparent provenance

## Best Practices

1. **Always use live JSON** (or recent saved output) on the left
2. **Right panel**: 3 bullets covering FDA/on-label framing, clinical gates, transparent provenance
3. **Add footnote**: "Research-mode; cohort-dependent" + efficacy_run ID
4. **Avoid numeric guarantees**; prefer profile comparisons
5. **Explain what numbers mean** rather than just showing them
6. **Use consistent iconography** (CheckCircle, FileText, Database)
7. **Maintain research-mode transparency** throughout

## Integration with Existing Slides

These use-case slides complement the existing SPE slides by:
- Providing concrete examples of the S/P/E framework in action
- Showing real API outputs and clinical decision-making
- Demonstrating the value proposition with live data
- Building investor confidence through transparency

The slides can be integrated into any existing deck by importing from `SPE_Slides` and adding to the slides array.
