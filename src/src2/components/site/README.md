## Site Component Library

Short-path import: `@site`

Example:
```tsx
import { SlideSurface, SlideHeader, OracleScore, ForgeAssets, BoltzConfidence, ProcessStepper, DossierSummary } from '@site';
```

### Structure
- `primitives/`: low-level UI building blocks (layout, typography, cards, pills, arrows, evidence list)
- `blocks/`: domain blocks composed from primitives (OracleScore, ForgeAssets, etc.)
- root files: additional website sections (HeroSection, ValuePillarsGrid, etc.)

### Goals
- Reuse the same components across the data room and the website
- Keep props typed and simple; avoid dynamic Tailwind class strings
- Make copy/data live in `@data` registries rather than inside components

### Aliases
- `@site` → `src/components/site`
- `@slides` → `src/components/slides`
- `@data` → `src/data`

### Quick start
```tsx
import { SlideSurface, SlideHeader, OracleScore } from '@site';

export default function Example() {
  return (
    <SlideSurface enhanced>
      <SlideHeader title="Oracle in Action" subtitle="From uncertainty to a verdict" />
      <OracleScore
        left={{ title: 'Traditional Verdict', value: 'VUS', subtitle: '(Uncertain)' }}
        right={{ title: 'CrisPRO Verdict', value: 'Pathogenic', subtitle: '(Actionable)' }}
        score={{ title: 'Zeta Score (Functional Damage)', value: '-26140.8' }}
      />
    </SlideSurface>
  );
}
```

### Content registries
- Prefer importing structured content from `@data` (e.g., `securityContent`) and pass to blocks/components.

### Accessibility
- All components use scalable text and neutral colors; ensure your global `AccessibilityContext` adjusts root font-size. 