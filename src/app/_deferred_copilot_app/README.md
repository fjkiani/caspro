# Deferred /co-pilot-app route

Quarantined during Release A because the copy uses militaristic language
(`Dominance`, `Annihilate`, `Launch Terminal`, `Battle Plan`, `Deploy Your
Strategic Arsenal`, `weapon systems for every front in the war against cancer`,
`conquer your clinical data`, `predictive firepower`, `Access the Forge`).

Folder starts with underscore so Next.js excludes it from routing.
Rewrite required before re-enabling:
- Drop dominance/annihilate/conquer/warfare framing entirely.
- Move to a "co-pilot preview / educational research substrate" tone.
- Anchor each claim to a receipt row on the public claim ledger.
- Route via VerticalSurface for consistency with Release A design system.

Original file preserved as-is at `page.tsx` for reference.
Original import `../platform/CoPilotOptionCard` now points to a quarantined
component inside `../platform/_deferred_copilot/CoPilotOptionCard`.

To rewrite the import path without changing behavior (still compiles):
- `../platform/CoPilotOptionCard` → `../platform/_deferred_copilot/CoPilotOptionCard`
Done in `page.tsx` on the quarantine move so tsc still resolves the symbol.
