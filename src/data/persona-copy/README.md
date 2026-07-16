# src/data/persona-copy/

Consolidated home for all `PersonaCopyDeck<T>` substrates.

## Files (populated by D11–D16 tickets)

| File | Owner ticket | Contents |
|---|---|---|
| `tumor-board.ts` | D12 (w-patients-ind) | Walker + AK subpanels + anchor panels + legacy scroll/tab surfaces + patient-bundle narrative fields |
| `ledger.ts` | D13 (w-products) | Main + trial + wall + af3 + programs + gated links (component-owned copy) |
| `pipeline.ts` | D13 (w-products) | Master + program cards + intro |
| `engine.ts` | D14 (ir-build) | Target-lock + MoA + SL + safety-dosing (intros + workspaces + scroll/tabs + BrmPipelineWorkspace) |
| `registries.ts` | D15 (w-partners) | Persona-scoped mirror of trial-ledger-registry, ledger-programs, pipeline-programs narrative fields |
| `chrome.ts` | D16 (ir-build) | Nav labels + footer/doctrine strip + PersonaHero overrides |

## Invariant contract

Every deck co-locates three optional arrays alongside the deck literal:

```ts
const HEADER_DECK: PersonaCopyDeck<{...}> = { oncologist: {...}, patient: {...}, pharma: {...} };

const HEADER_DECK_INVARIANTS = [
  'PATH A', 'DL-07',       // governance tokens
];
const HEADER_DECK_NUMBERS = [
  '42', '17', '0.138',     // numeric receipts
];
const HEADER_DECK_NAMES = [
  'PARP1', 'MBD4',         // drug/target/biomarker names
];

assertPersonaDeck(HEADER_DECK, {
  deck: 'file.HEADER_DECK',
  invariants: HEADER_DECK_INVARIANTS,
  numbers: HEADER_DECK_NUMBERS,
  names: HEADER_DECK_NAMES,
});
```

- `caspro-lint` scans for `*_INVARIANTS` and `*_NAMES` arrays paired by name
  (`HEADER_DECK_INVARIANTS` ↔ `HEADER_DECK`) and enforces the same rule at
  build time.
- `PERSONA_PATIENT_JARGON` rule (also in caspro-lint) fires on bare
  technical acronyms in `patient` blocks without a plain-language companion.

## Voice reference

`src/components/ledger/Af3ProvenanceSurface.tsx` lines 85–160 are the
gold-standard 3-voice reference blocks. Every worker starts by reading them.
w-research-kb runs D-REVIEW to diff every landed deck against those blocks.
