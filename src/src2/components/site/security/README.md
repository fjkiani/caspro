## Security components (Zeta Shield)

These are website-ready wrappers for the security deck concepts. They consume structured content from `@data/securityContent` and render with primitives/blocks from `@site`.

### Suggested imports
```tsx
import { ArchitectureDiagram, DeploymentMatrix, ComplianceBadges } from '@site/security';
import { securityContent } from '@data/securityContent';

<ArchitectureDiagram layers={securityContent.architecture.layers} />
<DeploymentMatrix models={securityContent.deployments} />
<ComplianceBadges badges={securityContent.compliance} />
```

### Authoring guidance
- Keep copy and data in `@data/securityContent.ts` so the security deck and website stay in sync.
- Prefer small, composable props (arrays of layers, models, badges) over big HTML strings.
- Avoid dynamic Tailwind classnames; use variant maps. 