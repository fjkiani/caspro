## Blocks — Domain components

Import from `@site` or `@site/blocks`.

Available blocks:
- `OracleScore`
- `ForgeAssets`
- `BoltzConfidence`
- `ProcessStepper`
- `DossierSummary`

### OracleScore
```tsx
<OracleScore
  left={{ title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' }}
  right={{ title: 'CrisPRO Verdict', value: 'Pathogenic', subtitle: '(Actionable)' }}
  score={{ title: 'Zeta Score (Functional Damage)', value: '-26140.8' }}
/>
```

### ForgeAssets
```tsx
<ForgeAssets
  input="Validated Pathogenic Threat"
  mission="Engineer Multi-Modal Therapeutics"
  assets={[{ icon: '🧬' as any, label: 'Gene Correction Blueprint' }]}
  advantageTitle="Our Unfair Advantage:"
  advantageHighlight="1M Token Context"
  advantageDescription="We see the entire genomic neighborhood."
  forgeHeader="This allows us to forge:"
  forgeText="Ultra-long homology arms for high-efficiency correction."
/>
```

### BoltzConfidence
```tsx
<BoltzConfidence
  title="Zeta Boltz: Structural Validation"
  confidenceLabel="complex_plddt"
  confidenceValue="95.78"
/>
```

### ProcessStepper
```tsx
<ProcessStepper
  steps=[
    { title: 'Validate Target', accent: 'cyan' },
    { title: 'Design Candidates', accent: 'purple' },
    { title: 'Validate In Silico', accent: 'orange' },
  ]
/>
```

### DossierSummary
```tsx
<DossierSummary
  assetId="Asset: CS-RUNX1-GC-001"
  status="Ready for Wet-Lab"
  checkpoints={[{ label: 'Target Validation: COMPLETE' }, { label: 'Design: COMPLETE' }]}
  description="Full sequence data, efficacy and safety scores, structural predictions."
/>
``` 