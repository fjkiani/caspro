# Trial Failure Matrix — BreAK CRC-001 Postmortem Engine
**Document type:** Governance — Routable Trial Design Intelligence  
**Version:** 1.0  
**Date:** 2026-04-30  
**Prepared by:** Canon Reconciliation + Migration Agent (Session 4)  
**Commissioned by:** Manager directive — one-page routable matrix  
**Routing:** Agent 5 (Fit-Gap), Agent 6 (Outreach/Strategy)  
**Evidence base:** Comparator Hunter Adjudication Master, Weaponization Agent Exploitation Queue, Agents 1–5  
**Classification:** Internal — CrisPRO Commercial Team & Scientific Leadership Only  
**Supersedes:** Narrative sections of `trial_failure_adjudication_break_crc001.md` (v1.0) — that document remains the full reference; this is the routable summary layer

---

## The Three Failure Buckets

Every entry in the shortlist maps to one or more of these:

| Code | Failure Mode | Diagnostic Question |
|------|-------------|-------------------|
| **M** | Mechanism failure | Did the IO mechanism generate peripheral immune activity but fail to overcome MSS TME suppression? |
| **S** | Selection failure | Were liver-metastatic, biologically cold, or non-enriched patients enrolled in sufficient numbers to dilute any responder subgroup? |
| **A** | Architecture failure | Did single-arm design, weak control logic, or low-quality evidence make attribution of benefit to the IO component impossible? |

Primary failure mode listed first. Contributing modes in parentheses.

---

## 8-Column Trial Failure Matrix

| Trial / NCT | Comparator Class | Evidence Quality | Failure Mode: M / S / A | Key Biomarker Lesson | Key Design Lesson | BreAK CRC-001 Countermeasure | External-Use Safe? |
|-------------|-----------------|-----------------|------------------------|---------------------|------------------|-----------------------------|--------------------|
| **QUILT-2.004** NCT03050814 | **HARD NEGATIVE BENCHMARK** — 1L MSS mCRC, randomized 2-arm, vaccine + IO + mFOLFOX6 + bev, TERMINATED | **LITERATURE-SUPPORTED** (ASCO 2023 abstract; HR 1.061 confirmed) | **M primary** (peripheral activation + checkpoint + myeloid modulation + identical backbone still failed); S contributing (all-comer, no liver met stratification); A contributing (n=30, terminated before subgroup analysis) | Peripheral immune activation is necessary but not sufficient. The bottleneck is T-cell trafficking and effector function within the TME, not antigen priming. Antigen breadth (CEA/MUC1 vs. >200 TAAs) is not the limiting factor. | Randomized design is the only way to attribute benefit. n=30 is too small for any subgroup analysis. Termination at interim destroys the ability to identify a responding subgroup retrospectively. | (1) Use as the null comparator BreAK must beat — never frame as precedent for efficacy. (2) Assume any all-comer MSS Phase IIa logic is wrong. (3) Pre-specify a pharmacodynamic endpoint that distinguishes STC-1010 from FOLFOX + avelumab combination effect. (4) Power Phase IIa for a biomarker-enriched subgroup, not the all-comer population. | **YES** — peer-reviewed-adjacent (ASCO abstract), HR confirmed, null result is citable as the primary negative benchmark. Cite as: "QUILT-2.004 (NCT03050814), HR 1.061 (0.380–2.966), p=0.91, terminated." |
| **GRANITE GO-010** NCT05141721 | **SOFT BIOMARKER-SIGNAL BENCHMARK** — 1L MSS mCRC, randomized 1:1, neoantigen vaccine + atezolizumab + mFOLFOX6, ACTIVE (company bankrupt) | **PRESS-RELEASE-ONLY** (Gritstone bio Nov 2024; not peer-reviewed; company filed Chapter 11 Oct 2024) | **S primary** (all-comer enrollment diluted ctDNA-low subgroup signal; HR 0.73 all-comers vs. HR 0.50 ctDNA-low); M contributing (personalized neoantigen approach complex and logistically fragile); A contributing (ctDNA-low subgroup was exploratory, not pre-specified; trial orphaned by bankruptcy) | ctDNA-low status is the strongest available enrichment hypothesis for vaccine-based IO in MSS mCRC. Low disease burden = less immunosuppressive TME. The all-comer population consistently dilutes any real signal. | Pre-specify ctDNA-low as a primary enrichment hypothesis before Phase IIa opens. Exploratory subgroup analyses discovered post-hoc are not credible to regulators. Personalized neoantigen approach is logistically fragile — off-the-shelf advantage is real but must be demonstrated, not assumed. | (1) Use ctDNA-low only as an internal enrichment hypothesis — do not cite HR 0.50 externally (press-release-only, wide CI, exploratory). (2) Pre-specify ctDNA-low threshold before Phase IIa opens. (3) Implement ctDNA kinetics as a co-primary pharmacodynamic endpoint. (4) Design ctDNA-based early stopping rule: expansion if ctDNA-low subgroup shows signal; termination if no signal in any subgroup. | **NO for efficacy claims** — press-release-only; HR 0.50 and HR 0.73 must not appear in external materials as evidence of vaccine efficacy. **YES for design rationale** — "GRANITE's ctDNA-low subgroup trend informed our enrichment hypothesis" is acceptable internal framing only. |
| **Sintilimab + bev + XELOX** NCT04194359 | **WEAK POSITIVE SIGNAL** — 1L RAS-mutant MSS mCRC, single-arm, n=25, Chinese single-center | **PEER-REVIEWED** (eClinicalMedicine 2023, PMID 37554125) — but single-arm, n=25, single-center, Chinese population | **A primary** (single-arm, no control; cannot determine sintilimab contribution over XELOX + bev alone; SOC DCR ~80–90% makes attribution impossible); S contributing (n=25 single-center likely reflects patient selection bias; Chinese population may not generalize) | Anti-PD-1 + bev + oxaliplatin-based chemo can achieve high ORR (84%) in selected 1L RAS-mutant MSS mCRC. But the result is uninterpretable without a control arm. The Phase III follow-on (NCT05171660, n=494, randomized) will be the definitive test. | Single-arm designs in MSS CRC are uninterpretable — the SOC response rate (~80–90% DCR, ~50–55% 12-month PFS) is too high to detect an IO contribution. BreAK CRC-001 faces the same attribution problem. | (1) Treat as hypothesis-generating only — do not use 84% ORR as a benchmark for STC-1010. (2) Reinforce the case for a concurrent control arm or randomized Phase IIa design. (3) Watch NCT05171660 for Phase III results — if positive, raises the bar for all MSS mCRC IO programs. | **CAUTION** — peer-reviewed but single-arm n=25. Acceptable to cite as "hypothesis-generating" with explicit caveats. Do not cite ORR 84% as a benchmark without noting single-arm, n=25, Chinese population limitations. |
| **Tislelizumab + XELOX + bev** NCT05970302 | **FIELD-ARCHITECTURE SIGNAL** — 1L MSS/pMMR RAS-mutated mCRC, single-arm, n=52, Chinese, no results | **PRIMARY-REGISTRY-ONLY** (no results posted) | **A primary** (no results; single-arm; primary endpoint ORR only — cannot attribute benefit); S contributing (no MSS selection criterion — likely mixed MSS/MSI-H population) | Anti-PD-1 + XELOX + bev is being tested in the same population class. If results emerge, they will be a partial comparator. Same mechanism class as CheckMate 9X8 (which failed). | Mechanism class (anti-PD-1 + chemo) has already been tested with identical backbone in CheckMate 9X8 and failed. Repeating the same mechanism in a single-arm Chinese trial does not advance the field. | (1) Mine for design choices (backbone, eligibility criteria), not efficacy claims. (2) Monitor for results — if positive, assess whether patient selection explains the discrepancy with CheckMate 9X8. | **NO** — no results; registry only. Do not cite in any external materials. |
| **Cadonilimab (AK104) + CapeOX + bev** NCT06566755 | **FIELD-ARCHITECTURE SIGNAL** — 1L RAS-mutated or right-sided MSS mCRC, single-arm, n=30, Chinese, no results | **PRIMARY-REGISTRY-ONLY** (no results posted) | **A primary** (no results; single-arm; likely Chinese registration trial only); S contributing (right-sided MSS CRC has different biology from left-sided — mixed population) | Bispecific PD-1/CTLA-4 (cadonilimab) + CapeOX + bev is being tested. More similar to BOT/BAL mechanism than to STC-1010. Right-sided vs. left-sided CRC biology is a potential confound. | Right-sided MSS CRC has higher TMB and different immune contexture than left-sided — mixing them in a single-arm trial without stratification is a design weakness. | (1) Mine for design choices only. (2) Monitor for results. (3) Note right-sided vs. left-sided stratification as a potential BreAK CRC-001 covariate. | **NO** — no results; registry only. Do not cite in any external materials. |
| **GRANITE GO-004** NCT03639714 | **STRUCTURAL PRECEDENT ONLY** — Phase 1/2, multi-tumor (not CRC-specific), end-stage, n=29, no chemo backbone, COMPLETED | **PRIMARY-REGISTRY-ONLY** (no results posted despite COMPLETED status) | **A primary** (non-randomized, multi-tumor, end-stage patients — no signal interpretable for 1L MSS mCRC); S contributing (end-stage patients are biologically distinct from 1L patients) | Early-phase neoantigen vaccine proof-of-concept. Mechanistic predecessor to GO-010. No CRC-specific or MSS-specific signal available. | Phase 1/2 multi-tumor trials in end-stage patients cannot be extrapolated to 1L MSS mCRC. Mechanistic proof-of-concept is not clinical proof-of-concept. | (1) Mine for mechanistic rationale only — neoantigen vaccine approach generates T-cell responses. (2) Do not cite as evidence of efficacy in MSS CRC. | **NO** — no results; multi-tumor end-stage; not applicable to 1L MSS mCRC. Do not cite in any external materials. |
| **SAR445877 + mFOLFOX6 + bev** NCT07500298 | **STRUCTURAL PRECEDENT — WATCH ITEM** — 1L MSS mCRC, Phase 1 safety only, n=41, NOT YET RECRUITING (start 2026-09-03), mechanism undisclosed | **PRIMARY-REGISTRY-ONLY** (no results; not yet recruiting) | **NOT APPLICABLE** — no data | Identical backbone to BreAK CRC-001. Mechanism undisclosed (Sanofi asset). Will eventually be a direct comparator. | Phase 1 safety-only trials with undisclosed mechanisms cannot be used for efficacy benchmarking. Monitor for mechanism disclosure and IND filing details. | (1) Monitor SAR445877 mechanism disclosure — if it addresses the same trafficking/effector function bottleneck as STC-1010, it becomes a competitive threat. (2) If mechanism is disclosed before BreAK CRC-001 Phase IIa opens, assess differentiation. | **NO** — no results; mechanism undisclosed; not yet recruiting. Do not cite in any external materials. |
| **STAR15** NCT06149481 | **EXCLUDED — WRONG LINE** — ≥2L refractory mCRC, multi-agent IO combination, no chemo backbone | **PRIMARY-REGISTRY-ONLY** (recruiting since March 2024; no results) | **NOT APPLICABLE** — wrong line of therapy; no population overlap with BreAK CRC-001 | Not applicable — refractory/late-line biology is distinct from 1L biology. | Wrong line of therapy is a disqualifying design mismatch. ≥2L patients have been heavily pretreated and have different immune contexture from 1L patients. | (1) Remove from benchmarking set entirely. (2) Do not cite in any BreAK CRC-001 context. | **NO** — wrong line; not applicable. Remove from all BreAK CRC-001 comparator materials. |

---

## Failure Mode Summary

| Failure Mode | Trials Where Primary | Trials Where Contributing | Field-Level Lesson |
|-------------|---------------------|--------------------------|-------------------|
| **M — Mechanism** | QUILT-2.004 | CheckMate 9X8, GRANITE GO-010 | Peripheral immune activation is necessary but not sufficient. The bottleneck is T-cell trafficking and effector function within the MSS CRC TME. Antigen breadth, checkpoint release, and myeloid modulation have all been tried in combination and failed in unselected populations. |
| **S — Selection** | GRANITE GO-010 | QUILT-2.004, CheckMate 9X8, Sintilimab, Cadonilimab | Unselected MSS enrollment consistently dilutes any real biological signal. Liver metastasis status and ctDNA level are the two strongest available enrichment variables. The responding subgroup exists but is a minority of all-comer MSS mCRC. |
| **A — Architecture** | Sintilimab, Tislelizumab, Cadonilimab, GO-004, SAR445877 | QUILT-2.004, GRANITE GO-010 | Single-arm designs in MSS CRC are uninterpretable because the SOC response rate (~80–90% DCR) is too high to detect an IO contribution. Attribution requires either a randomized control arm or a pre-specified pharmacodynamic endpoint mechanistically linked to the IO component. |

---

## External-Use Routing Summary

| External-Use Safe? | Trials | Permitted Use |
|-------------------|--------|--------------|
| **YES** | QUILT-2.004 | Cite as primary negative benchmark: "HR 1.061 (0.380–2.966), p=0.91, terminated." Null result is citable. |
| **CAUTION** | Sintilimab + bev + XELOX | Cite as hypothesis-generating only with explicit caveats: "single-arm, n=25, Chinese single-center." Do not cite ORR 84% as a benchmark. |
| **NO — internal only** | GRANITE GO-010 | ctDNA-low HR 0.50 is internal enrichment hypothesis only. Do not cite externally as evidence of vaccine efficacy. |
| **NO — do not cite** | Tislelizumab, Cadonilimab, GO-004, SAR445877, STAR15 | Registry-only, no results, wrong line, or mechanism undisclosed. Remove from all external materials. |

---

## BreAK CRC-001 Mandatory Actions (Derived from Failure Map)

These are not recommendations — they are design constraints derived from the failure taxonomy above. Each maps to a specific failure mode.

| Action | Failure Mode Addressed | Source Trial(s) | Priority |
|--------|----------------------|----------------|---------|
| Pre-specify biomarker-enriched subgroup as primary analysis population (not all-comer MSS) | S | QUILT-2.004, GRANITE, CheckMate 9X8 | **CRITICAL** |
| Add liver metastasis status as mandatory stratification factor (immediate protocol amendment) | S | BOT/BAL, REGONIVO, RIN, CO.26 | **CRITICAL** |
| Pre-specify ctDNA-low as primary enrichment hypothesis + co-primary pharmacodynamic endpoint | S | GRANITE GO-010 | **CRITICAL** |
| Pre-specify pharmacodynamic co-primary endpoint composite (DTH + ctDNA clearance + CD8+ TIL density) that distinguishes STC-1010 from FOLFOX | A | QUILT-2.004, CheckMate 9X8, Sintilimab | **CRITICAL** |
| Resolve bevacizumab optionality (mandate or stratify) before Phase IIa | M, A | CheckMate 9X8, Agent 2 | **HIGH** |
| Record KRAS mutation subtype as mandatory covariate | S | Agent 4, Agent 5 | **HIGH** |
| Pre-specify serial on-treatment biopsy endpoints (CD8+ TIL, TLS, MHC-I, tumor necrosis) | M | QUILT-2.004, GVAX, PANVAC | **HIGH** |
| Design ctDNA-based early stopping rule (expansion if ctDNA-low signal; termination if no signal in any subgroup) | A | GRANITE GO-010 | **HIGH** |
| Remove STAR15 from all BreAK CRC-001 comparator materials | — | STAR15 | **IMMEDIATE** |

---

## Routing Instructions

| Destination | What to route | Action |
|------------|--------------|--------|
| **Agent 5 (Fit-Gap)** | Full matrix + Mandatory Actions table | Update Section 2.4 (Trial Design Intelligence) with the 8-column matrix as the evidence base for the adaptive enrichment design proposal |
| **Agent 6 (Outreach/Strategy)** | External-Use Routing Summary + QUILT-2.004 and Sintilimab rows only | Update Document B (outreach email) and strategy memo Section 3 with the permitted external citations; remove all GRANITE efficacy claims from external materials |
| **Protocol Amendment Queue** | CRITICAL and HIGH actions from Mandatory Actions table | Liver metastasis stratification and ctDNA co-primary endpoint are the two highest-priority protocol amendments; both are actionable before Phase IIa opens |
| **Blocker Ledger** | No new blockers created by this document | No update required |

---

## Document Governance

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Status | FINAL — ready for manager review and routing |
| Evidence labels | All claims traceable to Agent evidence wall |
| Blockers resolved | None |
| Blockers created | None |
| Superseded by | Nothing — this is the routable summary; `trial_failure_adjudication_break_crc001.md` is the full reference |
| Commit | `fjkiani/Brenus` main — next commit batch |

---

*End of document*  
*Prepared by Canon Reconciliation + Migration Agent (Session 4)*  
*Evidence base: Comparator Hunter Agent, Weaponization Agent, Agents 1–5*  
*Classification: Internal — CrisPRO Commercial Team & Scientific Leadership Only*
