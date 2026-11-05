# Pivot Directive — Claim Provenance Memo

**Author:** Fahad Kiani / Brenus Pharma / CrisPRO
**Purpose:** Map each factual claim in the "systemic pivot" directive to its actual evidence
status *before* any of it reaches a customer (Brenus), an investor deck, or a compute
allocation decision. This is an internal integrity check, not a strategy rejection.

---

## 1. The headline Brenus asset — "KRAS–EGFR response interaction (p=0.0002)"

**Status: DOES NOT EXIST AS STATED. Two unrelated facts fused into one fictional claim.**

| Component | What it actually is | Source | Verdict |
|---|---|---|---|
| `p=0.0002` | Alzeeb 2024 **Study B**: CT26 subcutaneous mouse model, IS+3CL-SH vaccine tumor volume **150 mm³ vs 341 mm³** at day 24 (Student's t-test). Preclinical vaccine efficacy. | `brenus_verified_claim_ledger_v1.md` C-007, verbatim-sourced, `scope: preclinical-only` | VERIFIED — but it is a **mouse tumor-volume** result for the STC-1010 backbone. Nothing to do with KRAS, EGFR, or any interaction test. |
| "KRAS–EGFR interaction" | A **deterministic DISALLOW policy rule** in the CrisPRO knowledge graph: "KRAS-mut → EGFR TKIs = DISALLOW." A contraindication guardrail. | `crispro_knowledge_graph_v2.json` (evidence field: "KRAS mutation is a contraindication for EGFR TKI benefit") | REAL as a **rule**, grounded in prior clinical trials (PRIME, N0147). **No computed interaction p-value exists.** |

**Risk if used as-is:** Presenting "KRAS–EGFR interaction, p=0.0002" to Brenus as a validated
clinical-context asset is indefensible. The first competent reviewer on the partner side will
trace the p-value to a CT26 tumor-volume measurement and find it has no relationship to the
KRAS/EGFR rule. That destroys credibility with the anchor customer — a worse commercial outcome
than any cautious paper.

**The real, sellable versions (kept separate):**
- **Alzeeb Study B (p=0.0002)** → legitimate *preclinical efficacy* anchor for the STC-1010 vaccine, cited as preclinical mouse data.
- **KRAS–EGFR DISALLOW rule** → legitimate *platform-capability* story: "CrisPRO's rule engine blocks clinically-harmful false positives." Not a statistical finding.

---

## 2. "182-pair ovarian cohort" for Serial-SAE scale-up

**Status: EXISTS AS A SAMPLE MANIFEST ONLY. Signal is n=1.**

- `real_data_validation/subject_ledger.csv` = **182 data rows** (the manifest is real).
- `cn_status` breakdown: **5 computed** (4 `computed` + 1 `COMPUTED_QDNAseq_hg19_30kb`), **177 `NOT_COMPUTED_bams_not_downloaded`**.
- The Serial-SAE signal (Subject 260, breakpoint delta +60) is **a single patient** — a hypothesis, not a validated resistance predictor.

**Risk:** "Redirect 5 workers to scale Serial-SAE to the full 182-pair cohort" is not a worker
redirect. It requires: EGA controlled-access download of ~177 remaining paired sWGS BAMs →
QDNAseq on all → define the SAE architecture signature → test breakpoint-delta vs platinum
resistance with proper statistics. That is a multi-week primary-analysis project with a real
data-access dependency. Selling "longitudinal sWGS predicts platinum resistance" *before* that
analysis runs is the same overclaim the biomarker paper correctly avoids — just pointed at a new
modality.

---

## 3. "Bulk-expression is a dead-end modality" (decommission decision)

**Status: SCIENTIFICALLY DEFENSIBLE.**

- PI3K/mTOR: 0/17 strict, one significant *inverse* cohort. Genuine null. (`w4_baseline_scan_reaudit.json`)
- Riester: 1 strict cohort, and it is inside the signature's own development compendium (non-independent). (`w2_prognostic_replication_reaudit.json`)

Reallocating *investment* away from bulk-mRNA resistance scanning toward structural CIN evolution
is a sound resource decision. Killing a dead modality is a real result. **This part of the pivot
is correct.**

---

## 4. "Freeze the clinical validation code / decommission the honesty gates"

**Status: RECOMMEND AGAINST.**

The validation gates are why you *know* Serial-SAE is your live signal and bulk-mRNA is not.
Disabling them because they returned "No" removes the only mechanism preventing the next n=1
from being sold as validated — which is precisely what buries a biotech SaaS. In this very memo,
the gates caught the fused p=0.0002/KRAS–EGFR claim before it reached Brenus. Keep them on.

---

## Bottom line

| Pivot claim | Verdict | Action |
|---|---|---|
| Bulk-mRNA is a dead modality → stop spending on it | **Correct** | Adopt |
| Structural CIN is the live lead worth scaling | **Correct as a hypothesis** | Scope the 182-pair study properly (EGA + stats + gates on) |
| Serial-SAE "predicts platinum resistance" (sellable now) | **Overclaim (n=1)** | Do not sell until the cohort analysis exists |
| "KRAS–EGFR interaction p=0.0002" as a Brenus asset | **Fabricated composite** | Split into the two real, separate claims |
| Freeze/decommission the honesty gates | **Recommend against** | Keep gates on |
| Bury the biomarker paper | **Reframe, don't bury** | Rewrite as "modality triage": dead modality killed, live modality surfaced |

Nothing here has been committed, pushed, or sent to any customer. No compute has been
reallocated. This memo is the checkpoint before those actions.
