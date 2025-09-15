## RUNX1 case components

Wrappers mapped from the `runx1.jsx` custom deck. Use with content from `@data/runx1Content`.

### Imports
```tsx
import { Runx1 } from '@site';
import { runx1Content } from '@data/runx1Content';

<Runx1.TwoHitDiagram steps={runx1Content.twoHit.steps} />
<Runx1.RiskMap {...runx1Content.riskMap} />
<Runx1.Arsenal {...runx1Content.arsenal} />
<Runx1.Dossier dossier={runx1Content.approval.dossier} tiers={runx1Content.approval.tiers} text={runx1Content.approval.text} />
<Runx1.CommandCenter {...runx1Content.commandCenter} />
```

### Notes
- Purge-safe colors (no dynamic Tailwind templates).
- HTML allowed in `TwoHitDiagram` titles via `dangerouslySetInnerHTML` (copied from the deck); keep sanitized.
- Icons are rendered as emoji for portability. Replace with Lucide icons if needed. 