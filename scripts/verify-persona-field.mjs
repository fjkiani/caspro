// Verify personaField() reads persona overlays with English fallback.
// Uses tsx runtime to import the actual TS registry.

import { CAPABILITY_REGISTRY, COMPARATORS, ROI_SCENARIOS, UNIQUE_POSITION_DECK, SUMMARY_VALUE_STATEMENT_DECK } from '../src/data/capability-registry.ts';
import { personaField } from '../src/lib/persona-copy-guards.ts';

const personas = ['oncologist', 'patient', 'pharma'];

let ok = 0;
let bad = 0;

// Every capability must have persona-varying oneLiner + description
for (const cap of CAPABILITY_REGISTRY) {
  const variants = personas.map((p) => personaField(cap, 'oneLiner', p));
  const uniq = new Set(variants);
  if (uniq.size < 3) {
    console.log(`FAIL ${cap.slug} oneLiner has only ${uniq.size} unique variants across 3 personas`);
    bad += 1;
  } else {
    ok += 1;
  }
  const descs = personas.map((p) => personaField(cap, 'description', p));
  const udesc = new Set(descs);
  if (udesc.size < 3) {
    console.log(`FAIL ${cap.slug} description has only ${udesc.size} unique variants across 3 personas`);
    bad += 1;
  } else {
    ok += 1;
  }
}

for (const cmp of COMPARATORS) {
  const variants = personas.map((p) => personaField(cmp, 'whatTheyDo', p));
  const uniq = new Set(variants);
  if (uniq.size < 3) {
    console.log(`FAIL ${cmp.slug} whatTheyDo has only ${uniq.size} unique variants across 3 personas`);
    bad += 1;
  } else {
    ok += 1;
  }
}

for (const roi of ROI_SCENARIOS) {
  const variants = personas.map((p) => personaField(roi, 'valueProtected', p));
  const uniq = new Set(variants);
  if (uniq.size < 3) {
    console.log(`FAIL ${roi.slug} valueProtected has only ${uniq.size} unique variants across 3 personas`);
    bad += 1;
  } else {
    ok += 1;
  }
}

// Deck-level checks
if (new Set(personas.map((p) => UNIQUE_POSITION_DECK[p])).size < 3) {
  console.log('FAIL UNIQUE_POSITION_DECK not varying');
  bad += 1;
} else {
  ok += 1;
}
if (new Set(personas.map((p) => SUMMARY_VALUE_STATEMENT_DECK[p])).size < 3) {
  console.log('FAIL SUMMARY_VALUE_STATEMENT_DECK not varying');
  bad += 1;
} else {
  ok += 1;
}

console.log(`\nresult: ${ok} pass, ${bad} fail`);
process.exit(bad > 0 ? 1 : 0);
