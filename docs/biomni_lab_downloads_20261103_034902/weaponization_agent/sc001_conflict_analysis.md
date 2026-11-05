# SC-001 Conflict Analysis: HT29 BRAF V600E in BRAF WT Patient Vaccine
**Generated:** 2026-04-28  
**Agent:** Weaponization Agent (Session 3)  
**Conflict ID:** SC-001 / B-006  
**Status:** ACTIVE CONFLICT — UNRESOLVABLE FROM PUBLIC SOURCES

---

## Conflict Statement

**Fact A:** HT29 is one of three human CRC cell lines in STC-1010 (confirmed: ASCO 2023 e14661, B-001 RESOLVED)  
**Fact B:** HT29 carries BRAF V600E mutation (established cell line biology, ATCC HTB-38)  
**Fact C:** BreAK CRC-001 Exclusion Criterion #7 excludes patients with BRAF V600E mutation  
**Conflict:** A vaccine containing BRAF V600E-expressing cells is being administered to patients who are specifically selected to be BRAF WT — the scientific rationale for this is not publicly disclosed

---

## Evidence Review

### HT29 Mutation Status (Established)
HT29 (ATCC HTB-38) is a well-characterized human colorectal adenocarcinoma cell line with the following confirmed mutations:
- **BRAF V600E** (confirmed by ATCC, CCLE, COSMIC)
- KRAS wild-type
- TP53 R273H
- PIK3CA P449T
- APC truncating mutation

HT29 BRAF V600E status is not in dispute — it is one of the most widely used BRAF V600E model systems in CRC research.

### BreAK CRC-001 Exclusion Criterion #7
Per NCT06934538 registry: patients with BRAF V600E mutation are excluded from BreAK CRC-001. This is a standard exclusion in MSS CRC trials because BRAF V600E-mutant MSS CRC has distinct biology, prognosis, and treatment landscape (BEACON CRC regimen).

### Alzeeb 2024 (Front. Oncol.) — Does NOT Address This Conflict
The Alzeeb 2024 paper describes only the **murine** STC vaccine:
- Murine cell lines used: CT26 (BALB/c colon), CMT-93 (rectal carcinoma), LTPA (pancreatic adenocarcinoma)
- No human cell lines are used or described in this paper
- No BRAF mutation status is discussed for any cell line
- No antigen selection rationale for human STC-1010 is provided
- The paper explicitly states: "Human vaccines based on STC technology should be tested in alternative models"

The paper does not resolve SC-001.

### What Alzeeb 2024 Does Establish (Relevant to SC-001 Context)
The STC platform rationale is **antigen breadth**, not mutation-specific targeting:
- "This technology allows a multi-specific education of the immune system to target tumor cells harboring resistant clones"
- "The STC vaccine is composed of characterized CRC cell lines that are selected to represent tumor patients"
- Proteomic validation: vaccine antigens cross-referenced against patient biopsy databases
- Key antigens are stress proteins (HSP70), DAMPs, resistance proteins (MDR1), tumor plasticity proteins — NOT mutation-specific neoantigens

This suggests the platform is designed for **shared tumor-associated antigens (TAAs)**, not mutation-specific neoantigens. Under this framework, BRAF V600E in HT29 would contribute shared TAAs (CDKs, MDR proteins, stress proteins) rather than BRAF V600E-specific neoantigen peptides.

### Hypothetical Scientific Rationale (NOT CONFIRMED — FOR INTERNAL ANALYSIS ONLY)
Three possible rationales exist for including HT29 despite BRAF V600E:

**Hypothesis 1: TAA breadth, not neoantigen targeting**  
HT29 is included for its shared TAA repertoire (CEA, MUC1, stress proteins, resistance proteins), not for BRAF V600E-specific peptides. The haptenation/irradiation process generates immunogenic cell debris — the immune response is polyclonal and not BRAF V600E-directed. Under this model, BRAF V600E is irrelevant to the vaccine's mechanism of action in BRAF WT patients.  
**Assessment:** Scientifically plausible given the platform's multi-specific design. Would require proteomic validation showing BRAF V600E peptides are not dominant antigens in the vaccine preparation.

**Hypothesis 2: Cross-reactive antigens**  
BRAF V600E-expressing cells share a large proportion of their proteome with BRAF WT cells. The immune response to HT29-derived antigens would be directed primarily at shared proteins, with BRAF V600E-specific peptides representing a minor fraction of the total antigen load.  
**Assessment:** Plausible but unquantified. No public data on BRAF V600E peptide fraction in STC-1010 preparation.

**Hypothesis 3: Deliberate inclusion for antigen diversity**  
HT29 was selected because it represents a distinct CRC subtype (right-sided, BRAF V600E, serrated pathway) that contributes unique TAAs not present in HCT116 (MSI-H, KRAS WT) or LoVo (MSS, KRAS G13D). The three-cell-line combination maximizes antigen breadth across CRC heterogeneity.  
**Assessment:** Consistent with Alzeeb 2024 rationale for 3CL > 1CL vaccine. Does not explain why BRAF V600E patients are excluded if BRAF V600E antigens are present in the vaccine.

### The Unresolved Tension
If Hypothesis 3 is correct (HT29 included for antigen diversity including BRAF V600E antigens), then:
- Why are BRAF V600E patients excluded? If the vaccine contains BRAF V600E antigens, BRAF V600E patients might be expected to benefit equally or more
- The exclusion criterion suggests Brenus may have a specific concern about BRAF V600E patients receiving BRAF V600E-expressing cell vaccine — but this concern is not publicly articulated

If Hypothesis 1 is correct (HT29 included for shared TAAs only):
- The exclusion of BRAF V600E patients is unrelated to the vaccine composition
- BRAF V600E patients are excluded for clinical/prognostic reasons (distinct biology, different SoC), not immunological ones
- This would be the most scientifically coherent resolution

**The conflict cannot be resolved without Brenus internal data on:**
1. Proteomic characterization of human STC-1010 antigen composition
2. Explicit statement of HT29 inclusion rationale
3. Clarification of whether BRAF V600E exclusion is immunological or clinical

---

## Impact Assessment

### CrisPRO Impact
- OQ-01 (active conflict flag) remains active
- Any CrisPRO output referencing STC-1010 mechanism of action must carry SC-001 caveat
- Fit-gap scoring for "antigen specificity" dimension is unreliable until SC-001 resolved

### Regulatory/BD Impact
- If SC-001 is raised by a pharma partner in due diligence, Brenus must have a prepared scientific response
- The conflict is a legitimate scientific question — not a fatal flaw — but requires explicit articulation
- Recommended: Brenus prepare a one-page scientific rationale document for HT29 inclusion

### Recommended Resolution Path
1. **Immediate:** Request Brenus internal document on cell line selection rationale for human STC-1010
2. **Short-term:** Commission proteomic analysis of human STC-1010 to quantify BRAF V600E peptide fraction
3. **Long-term:** If BRAF V600E peptides are confirmed absent or negligible in vaccine preparation, SC-001 can be closed with evidence

---

## Status
**SC-001:** ACTIVE CONFLICT — UNRESOLVABLE FROM PUBLIC SOURCES  
**Recommended action:** Escalate to Brenus scientific team for internal resolution  
**CrisPRO routing:** OQ-01 flag maintained; all SC-001-dependent claims remain QUARANTINED
