## Data registries

Keep copy and structured props here so decks and website share the same content.

### Aliases
- Import with `@data/...`

### Examples
- `securityContent.ts`: content for the Zeta Shield site sections and security deck slides.

### Usage with components
```tsx
import { securityContent } from '@data/securityContent';
import { ArchitectureDiagram, DeploymentModels, TrustBadges } from '@site';

<ArchitectureDiagram layers={securityContent.architecture.layers} />
<DeploymentModels models={securityContent.deployments} />
<TrustBadges badges={securityContent.compliance} />
```

### Guidelines
- No JSX in registry files; keep them pure data objects.
- Prefer IDs and enums for variants; avoid dynamic Tailwind class strings.
- Reuse shared types from `src/types/site.ts`. 