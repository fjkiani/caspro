# Brenus Pharma Use-Case — Master Scaffold
## Status: LIVE — populated as agent outputs arrive
## Last updated: 2026-04-27

---

## OPERATING PRINCIPLES

1. **Schema and contract truth before presentation claims** — no exposure layer invents semantics
2. **External opportunity work stays separate from internal code audits** — 8D/7D backend audit ≠ Brenus market diligence
3. **Claim class discipline**: mechanistic plausibility ≠ translational biomarker activity ≠ clinical efficacy
4. **Anti-hallucination**: every claim anchored to source, date, document type
5. **Execution sequence enforced**: Agents 1-4 → Agent 5 → Agent 6

---

## BUCKET 1: ARCHITECTURE TRUTH
*Verified realities of the CrisPRO platform — populated by internal audit, NOT by this workstream*

| Capability | Status | Evidence | Notes |
|-----------|--------|----------|-------|
| RUO status | [TBD — internal] | — | — |
| Compute spine | [TBD — internal] | — | — |
| Orchestrator/payload doctrine | [TBD — internal] | — | — |
| Case-resolution concepts | [TBD — internal] | — | — |
| Missingness handling | [TBD — internal] | — | — |
| Provenance expectations | [TBD — internal] | — | — |
| 8D mechanism-alignment family | [TBD — internal] | — | — |
| Synthetic lethality family | [TBD — internal] | — | — |

**GUARDRAIL**: Do not populate this bucket from Brenus diligence work. Populate from verified backend audit only.

---

## BUCKET 2: THERAPEUTIC STRATEGY LOGIC
*Reusable reasoning primitives — populated from scientific literature and agent outputs*

### Contradiction-Aware Interpretation Framework
- Support evidence: biomarker present AND mechanism active AND clinical signal observed
- Missing evidence: biomarker not assessed (not the same as negative)
- Negative evidence: biomarker assessed AND mechanism absent OR clinical signal absent
- **Rule**: Never treat missing as negative. Never treat mechanistic plausibility as clinical evidence.

### Subgroup Logic for MSS CRC IO
*(To be populated by Agent 4 output)*

### Treatment-Axis Reasoning
*(To be populated by Agent 2 + Agent 3 output)*

### Verified Scientific Anchors (from Alzeeb et al. 2024)
- See: `brenus_scientific_anchor_alzeeb2024.md`
- Bev normalization window: peak CD8 at cycle 2, Treg reconstitution by cycle 4 (PMID 36858688)
- Bev in MSS CRC: does NOT significantly reduce Treg density vs baseline (PMID 35135679)
- VEGF → M2 macrophage polarization via NRP-1 (PMID 31209139)

---

## BUCKET 3: TRIAL ANALYSIS TEMPLATES
*Structured trial-reading schema — populated by Agent 2 and Agent 3*

### Standard Trial Extraction Schema
| Field | Description |
|-------|-------------|
| Population definition | Exact inclusion/exclusion criteria |
| Line of therapy | 1L / 2L / maintenance / adjuvant |
| Biomarker gating | Required / stratified / all-comers |
| Control arm context | SOC, placebo, active comparator |
| Backbone therapy | Exact regimen, doses, schedule |
| Endpoint hierarchy | Primary / secondary / exploratory |
| Subgroup analyses | Pre-specified vs post-hoc |
| Contradiction signals | Where biology and enrollment conflict |
| Dilution risk | Why study may have suppressed treatment effect |

### STC-1010 / BreAK CRC-001 Trial Record
*(To be populated by Agent 2 output)*

### Comparator Trial Matrix
*(To be populated by Agent 3 output)*

---

## BUCKET 4: COMPETITIVE INTELLIGENCE PATTERNS
*Adjacent mechanism classes, competing combination strategies, converging trial designs*
*(To be populated by Agent 3 output)*

### Key Questions
1. Which programs are converging on the same clinical wedge as STC-1010?
2. What combination strategies have shown mechanistic promise in MSS CRC?
3. Where is the market positioning opportunity for a stratification-focused engagement?

---

## BUCKET 5: PROMPT AND AGENT PATTERNS
*Operational patterns that have worked — preserved for reuse*

### Anti-Hallucination Prompt Style
- Separate VERIFIED FACTS from INFERRED INTERPRETATION with explicit labels
- Source every claim with URL, date, document type
- Flag what is missing, not just what is present
- Flag claims repeated across multiple sources from same original press release

### Artifact-First Reporting
- Produce structured tables and memos before narrative summaries
- Every claim class labeled: PROTOCOL FACT / ANALYTICAL INTERPRETATION / MECHANISTIC HYPOTHESIS / CLINICAL EVIDENCE

### Task Decomposition Across Specialized Agents
- Agent 1: Corporate dossier (public sources only)
- Agent 2: Trial protocol reconstruction (ClinicalTrials.gov + conference)
- Agent 3: Comparator trial history (literature + trial registries)
- Agent 4: Biomarker biology synthesis (literature)
- Agent 5: CrisPRO fit-gap (internal architecture only)
- Agent 6: Outreach drafting (inputs from 1-5 only, no raw internet)

### Strict Claim Class Separation
| Class | Definition | Example |
|-------|-----------|---------|
| PROTOCOL FACT | Stated in trial protocol or regulatory document | "mFOLFOX6 + bev is the backbone" |
| ANALYTICAL INTERPRETATION | Reasoned inference from protocol facts | "Bev scheduling may conflict with vaccine priming window" |
| MECHANISTIC HYPOTHESIS | Supported by preclinical or translational data | "VEGF suppresses DC maturation" |
| CLINICAL EVIDENCE | Demonstrated in human clinical trial with endpoints | "Bev did not reduce Treg density in MSS CRC (PMID 35135679)" |

---

## RESEARCH QUESTIONS STATUS TRACKER

| # | Question | Agent | Status |
|---|---------|-------|--------|
| 1 | What exactly is the current Brenus program, trial design, and declared biomarker strategy? | Agent 1 + 2 | IN PROGRESS |
| 2 | What patient populations have been targeted, and where could signal dilution plausibly occur? | Agent 2 | IN PROGRESS |
| 3 | What prior CRC IO and chemo-IO studies are most relevant comparators? | Agent 3 | IN PROGRESS |
| 4 | What biomarker/co-mutation/transcriptomic/immune features separate benefit from non-benefit? | Agent 4 | IN PROGRESS |
| 5 | What can CrisPRO uniquely contribute? | Agent 5 | PENDING (awaits 1-4) |
| 6 | What evidence is required before outbound narrative becomes credible? | Agent 6 | PENDING (awaits 5) |

---

## DATA CHECKLIST STATUS

### Company and Program Data
- [ ] Corporate deck
- [ ] Pipeline descriptions
- [ ] Press releases
- [ ] Abstracts / posters / conference presentations (STC-1010)
- [ ] Trial identifiers
- [ ] Protocol synopsis
- [ ] Inclusion/exclusion criteria
- [ ] Line of therapy
- [ ] Combination backbone
- [ ] Dose-escalation and expansion design
- [ ] Biomarker plans
- [ ] Endpoint definitions
- [ ] Public statements: disease control, immune activation, translational biomarker work, safety, expansion rationale

### Clinical Trial Data
- [ ] ClinicalTrials.gov record (NCT number)
- [ ] Enrollment criteria
- [ ] MSS vs MSI handling
- [ ] Prior anti-VEGF or anti-EGFR exposure requirements
- [ ] RAS/BRAF status requirements
- [ ] Liver metastasis burden criteria
- [ ] Prior lines of therapy requirements
- [ ] Response endpoints
- [ ] Disease control rate
- [ ] PFS signals
- [ ] Immune correlates
- [ ] Subgroup disclosures

### Scientific Context Data
- [x] Mechanism-of-action description (Alzeeb et al. 2024 — VERIFIED)
- [x] Antigen logic (Alzeeb et al. 2024 — VERIFIED, 6 named TAAs + 1,190+ from MS)
- [x] Immune priming claims (Alzeeb et al. 2024 — VERIFIED, CD8↑ p=0.045, M1↑ p=0.02)
- [x] Combination with chemotherapy rationale (cyclophosphamide IS regimen — VERIFIED)
- [ ] Bevacizumab combination rationale (mechanistic tension documented — NOT resolved in protocol)
- [x] CRC immunobiology references (bevacizumab literature — VERIFIED, 7 PMIDs)
- [ ] MSS disease immune exclusion references (Agent 4 — IN PROGRESS)
- [ ] TGF-beta, KRAS, SMAD4, liver mets IO resistance (Agent 4 — IN PROGRESS)

### Comparator Trial Data
- [ ] Key IO and vaccine-related CRC trials (Agent 3 — IN PROGRESS)
- [ ] MSS CRC combination studies (Agent 3 — IN PROGRESS)
- [ ] Biomarker-enriched rescue attempts (Agent 3 — IN PROGRESS)
- [ ] Negative/equivocal trials (Agent 3 — IN PROGRESS)

### Internal Product Mapping Data
- [ ] CrisPRO current compute capability for this use-case (Agent 5 — PENDING)
- [ ] Expression through 8D/case-resolution surfaces vs bespoke deliverable (Agent 5 — PENDING)
- [ ] Reusable patient-state, intervention-state, contradiction, missingness structures (Agent 5 — PENDING)

---

## OUTPUT PACKAGE STATUS

| Deliverable | Agent | Status | File |
|------------|-------|--------|------|
| Scientific anchor document | — | COMPLETE | `brenus_scientific_anchor_alzeeb2024.md` |
| Brenus dossier | Agent 1 | IN PROGRESS | TBD |
| STC-1010 trial architecture memo | Agent 2 | IN PROGRESS | TBD |
| Comparator trial matrix | Agent 3 | IN PROGRESS | TBD |
| Biomarker and subgroup hypothesis memo | Agent 4 | IN PROGRESS | TBD |
| CrisPRO fit-gap map | Agent 5 | PENDING | TBD |
| Opportunity thesis memo | Agent 6 | PENDING | TBD |
| Partner-facing one-pager | Agent 6 | PENDING | TBD |

---

## GUARDRAILS (Active)

1. Do not let agents substitute 8D/7D backend audit findings for Brenus market diligence
2. Do not let outbound narratives outrun verified evidence
3. Do not present unsupported backend capabilities as if they already exist in production
4. Do not collapse mechanistic plausibility, translational biomarker activity, and clinical efficacy into the same claim class
5. Do not mix SL-family claims, 8D-family claims, and trial-rescue consulting claims unless each is separately grounded
