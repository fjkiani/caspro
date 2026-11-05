# Evidence Label Glossary — Comparator Hunter Agent
**Date:** 2026-04-28
**Purpose:** Define all evidence and decision labels used in Comparator Hunter deliverables. Downstream agents must apply these labels consistently.

---

## Evidence Labels

### PEER-REVIEWED
**Definition:** Data published in an indexed, peer-reviewed journal. Full text verified by primary source query.
**Usage:** Cite with journal name, year, DOI/PMID. Specific numbers (ORR, PFS, HR) may be used in downstream outputs with citation.
**Caution:** Even peer-reviewed data from small single-arm trials (n<50) should be labeled with sample size caveat.
**Example:** Sintilimab + bev + XELOX (NCT04194359); eClinicalMedicine 2023; PMID 37554125.

### LITERATURE-SUPPORTED
**Definition:** Registry record confirmed AND cross-referenced with published literature (peer-reviewed or conference abstract with full data table). Both sources agree on key numbers.
**Usage:** Cite both registry and publication. Numbers may be used in downstream outputs.
**Example:** QUILT-2.004 (NCT03050814); HR 1.061 confirmed in both registry results and prior literature.

### PRESS-RELEASE-ONLY
**Definition:** Data from company press release, investor presentation, or conference summary without full peer-reviewed publication. Not independently verified.
**Usage:** MUST be labeled "preliminary" or "press-release-only" in all downstream outputs. Numbers may be cited for landscape context but must not be presented as established evidence.
**Critical rule:** Do NOT cite press-release-only HR values as if they were peer-reviewed. Do NOT use them in regulatory or clinical claims without explicit caveat.
**Example:** GRANITE GO-010 (NCT05141721); HR 0.73 (90%CI 0.44–1.21); Gritstone bio press release, November 2024.

### PRIMARY-REGISTRY-ONLY
**Definition:** ClinicalTrials.gov record confirmed; no results posted; no peer-reviewed publication identified.
**Usage:** Registry facts (status, phase, enrollment, design, eligibility) may be cited. No efficacy claims possible.
**Example:** NCT05970302 (tislelizumab + XELOX + bev); RECRUITING; no results.

---

## Decision Labels

### DIRECT COMPARATOR
**Definition:** Trial meets ALL of the following criteria:
1. Same disease setting (1L metastatic MSS/pMMR CRC or close equivalent)
2. Same backbone class (oxaliplatin-based + bevacizumab)
3. Randomized design (≥2 arms)
4. Results available OR actively maturing with interim data
**Implication:** Use for head-to-head positioning. Key efficacy numbers (HR, PFS) are directly relevant to BreAK CRC-001 benchmark-setting.
**Current set:** QUILT-2.004 (HIGH confidence), GRANITE GO-010 (MEDIUM confidence — press-release-only data)

### PARTIAL COMPARATOR
**Definition:** Trial meets SOME but not all direct comparator criteria. Overlaps on ≥2 of: disease, line, backbone, mechanism. Differs on ≥1 of: randomization, backbone, population restriction, geography.
**Implication:** Use for landscape context and biological plausibility. Do not use for head-to-head efficacy benchmarking without explicit caveats.
**Current set:** Sintilimab + bev + XELOX (MEDIUM), Tislelizumab + XELOX + bev (LOW), Cadonilimab + CapeOX + bev (LOW)

### STRUCTURAL PRECEDENT ONLY
**Definition:** Trial provides mechanistic, regulatory, or platform precedent but does not overlap sufficiently on disease, line, backbone, or randomization to serve as a comparator.
**Implication:** Use for mechanism narrative and platform validation. Do not cite efficacy numbers as benchmarks for BreAK CRC-001.
**Current set:** GRANITE GO-004 (NCT03639714), SAR445877 + FOLFOX6 + bev (NCT07500298)

### EXCLUDE
**Definition:** Trial has a fundamental mismatch (wrong line, wrong disease, wrong population) that makes it irrelevant as a comparator for BreAK CRC-001.
**Implication:** Do not include in comparator tables or positioning matrices. May be noted in excluded trials log for completeness.
**Current set:** STAR15 (NCT06149481) — refractory ≥2L, no chemo backbone

---

## Confidence Levels

### HIGH
Both the decision and the evidence base are robust. Primary source data confirmed. No material ambiguity.

### MEDIUM
Decision is well-supported but evidence has a material limitation (e.g., press-release-only data, small n, single-arm design, or interim data not yet peer-reviewed).

### LOW
Decision is based on registry record only (no results) or on data with severe limitations (n<30, single-center, non-generalizable population). Treat as provisional; update when results become available.

---

## Special Flags

### BANKRUPTCY FLAG
Applied to GRANITE GO-010 (Gritstone bio filed Chapter 11, October 2024). Program continuity uncertain. Phase 3 portion may not complete. All GRANITE data should carry this flag in downstream outputs.

### IDENTIFIER-CORRECTED
Applied to GRANITE GO-004 (NCT03639714) and STAR15 (NCT06149481). Prior canon files contained identifier errors that have been corrected in this agent run.
- NCT03639714 ≠ "GRANITE" (it is GO-004, Phase 1/2, not the registrational trial)
- STAR15 ≠ "NCT pending" (it is NCT06149481, registered November 2023, recruiting March 2024)

### WATCH
Applied to trials not currently in the comparator set but likely to become relevant. Current watch items:
- NCT05171660 (BBCAPX Phase III, sintilimab + bev + XELOX, randomized, n=494, China) — no results yet
- NCT07500298 (SAR445877 + FOLFOX6 + bev) — not yet recruiting; identical backbone to BreAK CRC-001

---

## Downstream Agent Routing Rules

| Downstream Agent | Permitted Evidence Labels | Prohibited |
|-----------------|--------------------------|-----------|
| Agent 5 (CrisPRO Fit-Gap) | PEER-REVIEWED, LITERATURE-SUPPORTED, PRESS-RELEASE-ONLY (with label) | Do not present PRESS-RELEASE-ONLY as established |
| Agent 6 (Outreach) | PEER-REVIEWED, LITERATURE-SUPPORTED only | Do not cite PRESS-RELEASE-ONLY in external communications |
| Any regulatory document | PEER-REVIEWED, LITERATURE-SUPPORTED only | PRESS-RELEASE-ONLY and PRIMARY-REGISTRY-ONLY prohibited |
| Internal strategy memo | All labels permitted with explicit caveats | None prohibited if labeled |

---

*Glossary generated 2026-04-28. Apply consistently across all Brenus Pharma / CrisPRO deliverables.*
