# OBL#3 — CN Signature Identity Resolution (source-provenance, not column-label trust)

**Purpose:** Before building any "s3 = HRD-axis" claim, resolve which BriTROC-1 CN
signature is the HRD axis, and in which direction it relates to platinum resistance,
from the *source literature that defined the signatures* — not from a trusted column label.

## 1. Source definitions (Macintyre 2018 Nat Genet; Smith/Bradley 2023 Nat Commun)

| Signature | Biological identity (source-defined) | Prognosis | Source |
|---|---|---|---|
| **s1** | RAS/MAPK-associated; low break-point count, large segments | Poor survival; marks **primary platinum resistance**; anti-correlated with s3 | Macintyre 2018; Smith 2023 |
| **s3** | **BRCA1/2-related HRD axis** (enriched in BRCA1/BRCA2 + other HR-gene mutants) | **Positively prognostic (improved OS)** | Macintyre 2018 (Nat Genet 50:1262); Smith 2023 |
| **s7** | HR-associated but **NOT** BRCA1/2-enriched ("alternative HRD mechanisms"); even correlation with HRD SNV-signature 3 | Positively prognostic | Macintyre 2018 |

Direct source quotes:
- Macintyre 2018: "CN signature 3 was significantly enriched in cases with mutations in *BRCA1* and *BRCA2*, and other HR genes… High exposure to CN signature 3, characterised by *BRCA1/2*-related HRD, was associated with improved overall survival."
- Macintyre 2018 on s7: "CN signature 7, like CN signature 3, also demonstrated an even correlation with the HRD-related SNV signature 3, [but] there was no enrichment with *BRCA1/2* mutation, suggesting alternative HRD mechanisms."
- Smith/Bradley 2023 (Nat Commun 14:4387): "CN signature 3 (s3), associated with defective HR, was significantly **lower** and s1 significantly **higher** in the primary resistant population at diagnosis."

## 2. Two consequences that reshape the manuscript claim

**(a) s3 is the HRD axis — confirmed.** The manuscript's use of "s3 = HRD-associated" is CORRECT.

**(b) s3 is PROTECTIVE, and the manuscript's "s7 = CCNE1 amplification" annotation is WRONG.**
- Per source, higher s3 → **sensitive** (improved outcome), i.e. s3 is a *protective* / favorable-prognosis axis, and s3 is *lower* in resistant patients at diagnosis.
- s7 is HR-adjacent (non-BRCA), **not** a CCNE1-amplification signature. The manuscript sentence "Signature 7 is associated with CCNE1 amplification, a known resistance mechanism" is not supported by the signature definitions and must be deleted/corrected. (CCNE1 amplification is a *gene-level* driver Nature reports separately; it is not what defines s7.)

## 3. Resolution of the "s3 AUROC 0.729" claim (the flagged index-confusion)

Reproduced per-signature AUROC at diagnosis (positive class = RESISTANT), n=98, 20 events:

| Feature | AUROC | Direction | BH-q |
|---|---|---|---|
| s3_diag | **0.2715** | higher = SENSITIVE (protective) | **0.0118** (only signature to survive FDR) |
| s4_diag | 0.6487 | higher = resistant | 0.1387 (does NOT survive FDR) |

Two facts settle it:
1. **The literal "0.729" number is `1 − AUROC(s3_diag)` = 1 − 0.2715 = 0.7285.** The manuscript reported the *protective-direction discrimination* of s3 as "0.729" **without stating that s3 is protective** (higher s3 → sensitive). The magnitude is real; the framing (implying higher s3 → resistant biomarker) was wrong.
2. A separate coincidence: **0.730 is also the raw AUROC of s4** (s4_diag = s4_rel = 0.7297) on the paired 40-cohort. So "0.729" is ambiguous between "protective s3 discrimination" and "s4 raw AUROC." Neither reading supports a "higher-s3 → resistant" biomarker, and s4 does not survive multiple-testing correction.

**Canonical, source-anchored statement adopted for OBL#3:**
> The HRD axis (CN signature 3) is significantly **lower** at diagnosis in primary-platinum-resistant HGSOC (per-patient AUROC 0.27, i.e. protective discrimination 0.73; MWU p=0.0017; BH-q=0.012 across all 7 signatures; Cox OS HR 0.69 per SD, p=0.043). This is directionally concordant with Nature's cohort-level observation and is quantified here at the patient level with multiple-testing and survival linkage.
