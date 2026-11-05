# Brenus Pharma — CrisPRO Data Room
## Executive Summary
**Prepared by:** CrisPRO Platform | Phylo
**Date:** 2026-05-07
**Audience:** Brenus Pharma BD, Clinical Development, KOL Partners
**Confidentiality:** Partner-facing — do not distribute without authorization

---

## What This Document Is

This is the executive layer of the CrisPRO data room for Brenus Pharma's BreAK CRC-001 trial (NCT06934538). It synthesizes the mechanistic decode of 7 CORE comparator trials in MSS/pMMR metastatic colorectal cancer — the trials that failed before BreAK CRC-001, and what those failures mean for STC-1010's design and positioning.

The full data room contains:
- **7 trial decode files** (01_trial_decodes/) — mechanism-level analysis of each comparator
- **PATH A scores** (02_scores/) — quantitative fit analysis using the CrisPRO formula
- **3 cross-cutting analyses** (03_cross_cutting/) — failure taxonomy, liver-met stratification, STC-1010 positioning
- **Governance records** (04_governance/) — formula lock, admissibility rules, open conflicts
- **Agent handoff package** (05_agent_handoff/) — structured inputs for downstream CrisPRO agents

---

## The Landscape in One Paragraph

MSS/pMMR colorectal cancer is the largest unmet need in GI oncology. It represents ~95% of all mCRC cases — approximately 140,000 patients per year in the US and EU combined. Every IO trial in this population has failed. The failure rate is not random: it follows a consistent pattern of 8 identifiable failure domains (biology, selection, architecture, biomarker, attribution, interpretability, translational, systemic). The 7 CORE comparator trials collectively cover 6 of these 8 domains. BreAK CRC-001 is currently at risk of replicating 3 of them.

---

## The 7 CORE Trials — What They Tell Us

| CORE | Trial | Outcome | Primary Failure Domain | fit_A | Δ | Tier |
|---|---|---|---|---|---|---|
| CORE-01 | QUILT-2.004 | HR=1.061, terminated | D1 Biology + D3 Architecture | 0.5815 | 0.2261 | TIER1 |
| CORE-02 | GRANITE GO-010 | Primary endpoint not met | D6 Interpretability + D8 Systemic | 0.5411 ⚠️ | 0.2579 | TIER2 |
| CORE-03 | GVAX + CY + Pembro | ORR 0% | D1 Biology + D2 Selection | 0.4486 | 0.2991 | TIER1 |
| CORE-04 | IMblaze370 | OS HR=1.00, Phase III | D1 Biology + D7 Translational | 0.8262 ⚠️ | 0.1511 | TIER1 |
| CORE-05 | AtezoTRIBE | PFS HR=0.86 NS (pMMR) | D2 Selection + D5 Attribution | 0.5843 | 0.2172 | TIER1 |
| CORE-06 | MEDITREME | ORR 64.5%, no control arm | D3 Architecture + D5 Attribution | 0.5037 | 0.2949 | TIER1 |
| CORE-07 | CCTG CO.26 | OS HR=0.73 (borderline) | D2 Selection + D6 Interpretability | 0.4000 | 0.3000 | TIER1 |

**⚠️ CORE-04 IMblaze370:** fit_A=0.8262 is a FALSE POSITIVE. High score reflects patient population MAPK burden, not a positive precedent. IMblaze370 failed with OS HR=1.00 in Phase III. Do not cite as supportive evidence.

**⚠️ CORE-02 GRANITE:** TIER2 — data from press release only; company bankrupt; peer review unlikely. Use with caution.

---

## The Three Most Important Findings

### Finding 1: Liver Metastasis Is the Dominant IO Suppressor

Across every trial that has reported liver-metastasis subgroup data, the pattern is identical:
- **Non-liver-metastatic patients:** OS HR ~0.50 (CO.26), ORR 22–33% (REGONIVO, RIN)
- **Liver-metastatic patients:** OS HR ~0.90 (CO.26), ORR ~0% (REGONIVO, RIN)

The mechanism is established (Yu et al. Nat Med 2021): hepatic macrophages eliminate activated CD8+ T cells via FasL-mediated apoptosis, creating systemic immune tolerance that operates regardless of drug class, line of therapy, or tumor molecular profile.

**BreAK CRC-001 risk:** GAP-01 (CRITICAL) — liver-metastasis status is not pre-specified as a stratification variable. STC-1010 is a pure IO mechanism with a high IO axis weight. It is maximally sensitive to liver-met IO suppression. Without liver-met stratification, a positive signal in the non-liver-met subgroup will be diluted by the liver-met majority.

### Finding 2: T-Cell Priming Alone Is Insufficient — GVAX Proved It

GVAX + cyclophosphamide + pembrolizumab is the mechanistic mirror of STC-1010. Both are whole-cell vaccines. Both use cyclophosphamide. Both combine with immune checkpoint modulation. GVAX failed with ORR 0% despite confirmed T-cell responses and CD8+ infiltration.

The bottleneck was not T-cell priming. The bottleneck was T-cell trafficking and effector function within the TME. TGF-β and MDSCs suppressed the primed T cells before they could kill tumor cells.

**STC-1010 differentiation:** DNFB haptenation creates a contact hypersensitivity danger signal — a qualitatively different DC activation pathway than GVAX's GM-CSF secretion. Whether this difference is sufficient to overcome the same TME bottleneck that defeated GVAX is the central scientific question of BreAK CRC-001.

### Finding 3: The Field Has Never Pre-Specified a Predictive Biomarker

Zero of the 7 CORE comparator trials pre-specified a predictive biomarker as an enrollment criterion for the MSS/pMMR population. Every biomarker signal in the field (pTMB ≥28, Immunoscore-IC, ctDNA-low, non-liver-met) was identified post-hoc.

**BreAK CRC-001 opportunity:** Pre-specifying even one biomarker as a primary stratification variable would differentiate BreAK CRC-001 from every prior trial in the field. The strongest candidates: liver-met status (strongest clinical signal), Immunoscore-IC (strongest immune signal), pTMB ≥28 (strongest molecular signal).

---

## BreAK CRC-001 — Current Risk Profile

| Risk | Domain | Severity | Status |
|---|---|---|---|
| Liver-met not stratified | D2 Selection | CRITICAL | GAP-01 OPEN |
| STC-1010 mechanism untested in humans | D1 Biology | HIGH | Inherent — BreAK CRC-001 is first human test |
| Murine preclinical data only | D7 Translational | HIGH | Inherent — Alzeeb et al. 2024 is murine surrogate |
| Control arm status unclear | D3 Architecture | MEDIUM | Requires protocol review |
| No pre-specified predictive biomarker | D4 Biomarker | MEDIUM | Opportunity — not yet addressed |
| mFOLFOX6 backbone attribution | D5 Attribution | MEDIUM | Requires randomized arm or historical control |
| HT29 BRAF V600E conflict | SC-001 | ACTIVE | Arm 2A-1 KRAS enrichment — BRAF V600E status unresolved |

---

## What CrisPRO Recommends

**Immediate (before enrollment opens):**
1. **Address GAP-01:** Pre-specify liver-metastasis status as a stratification variable. This is the single highest-impact protocol modification available.
2. **Resolve SC-001:** Clarify BRAF V600E/WT status in Arm 2A-1 KRAS-enriched cohort. HT29 is BRAF V600E — if KRAS-enriched patients include BRAF V600E, the arm assignment logic is compromised.
3. **Add historical control floor:** Pre-specify the historical ORR floor for mFOLFOX6 + bev in 1L KRAS-mutant mCRC (~50–55%) as the attribution benchmark.

**Before interim analysis:**
4. **Pre-specify all biomarker analyses:** Commit to biomarker thresholds (pTMB, Immunoscore-IC, ctDNA) before unblinding. Any post-hoc threshold will face the same D6 interpretability challenge as CO.26's pTMB signal.
5. **Power the non-liver-met subgroup:** If liver-met stratification is implemented, ensure the non-liver-met subgroup is powered as a co-primary or key secondary analysis.

---

## The CrisPRO Value Proposition for Brenus

CrisPRO's 7D mechanism vector framework identified the liver-met stratification gap (GAP-01) before enrollment opened. The same framework identified the GVAX mechanistic mirror — the most important comparator for STC-1010 positioning — and the specific bottleneck (T-cell trafficking, not T-cell priming) that GVAX failed to overcome.

This is not retrospective analysis. The failure taxonomy, the liver-met signal, and the GVAX comparison are all available in the published literature. CrisPRO's contribution is systematic synthesis: converting 30+ trial reports into a structured, queryable evidence wall that can be updated as new data emerges and used to guide protocol decisions in real time.

The data room you are reading is the MVP. The full CrisPRO platform extends this framework to:
- Real-time trial monitoring (new publications, conference abstracts, regulatory filings)
- Patient-level biomarker scoring (Immunoscore-IC, pTMB, ctDNA integration)
- Arm-level vector assignment (B-004 bevacizumab arm resolution pending)
- Synthetic lethality screen integration (18,858-gene screen → AlphaFold 3 → clinical gate)

---

## Data Room Navigation

| Folder | Contents | Audience |
|---|---|---|
| `00_executive_summary/` | This document | BD, clinical partners, KOLs |
| `01_trial_decodes/` | 7 mechanism-level trial analyses | Clinical development, medical affairs |
| `02_scores/` | PATH A scores, rankings, ceiling proofs | CrisPRO platform, data science |
| `03_cross_cutting/` | Failure taxonomy, liver-met analysis, STC-1010 positioning | All |
| `04_governance/` | Formula lock, admissibility rules, open conflicts | CrisPRO platform, compliance |
| `05_agent_handoff/` | Structured inputs for downstream agents | CrisPRO platform only |

---

*CrisPRO Platform | Phylo | 2026-05-07*
*Formula: PATH A (LOCKED 2026-04-28) — fit = clip((p·t)/‖t‖₂, 0, 1)*
*Governance: MANIFEST.yaml | PATH B: PROHIBITED*
*Open conflicts: SC-001 (HT29 BRAF V600E), B-004 (bev arm assignment), GAP-01 (liver-met stratification)*
