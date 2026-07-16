# Deferred Co-Pilot Route Structure

Files moved here on Release A commit:
- page.tsx (old militaristic /platform landing — "Launch Terminal", "AgenticEMR™ Dominance", "Battle Plan")
- data.ts (militaristic co-pilot option catalog)
- CoPilotOptionCard.tsx (card component consuming militaristic copy)
- [coPilotSlug]/ (dynamic route into militaristic co-pilot slugs)
- forge-intelligence/, oracle-intelligence/, scribe-intelligence/ (static subroutes with same tone)

This folder starts with an underscore so Next.js excludes it from routing.
Do NOT rename without a tone rewrite that removes:
- Dominance / annihilate / conquer / battle plan / weapon systems / launch terminal / access the forge / firepower
- Unreceipted claims ("only AI you can trust for clinical decisions", "100% AlphaFold 3 structural validation",
  "eliminate the $2.6B gamble", "Transform Drug Development from Gambling to Engineering", etc.)

The canonical Release-A /platform page is /workspace/caspro/src/app/platform/page.tsx
(re-created after this quarantine).
