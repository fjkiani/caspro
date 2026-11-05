# 609-Trial MoA Vector Registry Audit Report

**Audit date:** 2026-07-12 07:50 UTC
**Registry:** `/workspace/crispro-backend-v2/api/resources/trial_moa_vectors.json`
**Registry size:** 609 trials, 431 KB, single-line JSON
**Registry mtime:** 2026-07-05 (per file stat)
**CT.gov lookups:** enabled
**Overall health score:** 0/100

---

## Executive summary

The registry is **severely degraded** and unfit for production use without remediation. 
Health score: **0/100**. Key findings:

- **D1 Sparsity:** 349/609 (57.3%) all-zero vectors; only 118 (19.4%) have multi-axis signal.
- **D2 Type inconsistency:** 20 string-confidence, 22 missing source, 28 missing reviewed_by.
- **D3 Anchor defects:** 4 defective, 1 absent out of 5 PC-02 anchors.
- **D4 Contamination:** 291 CT.gov-confirmed non-oncology trials (0.082 false-positive rate on keyword heuristic).
- **D5 Axis dominance:** 1 axes with single-entry dominance.
- **D6 Source quality:** 11 sources; cohere_batch_tagging supplies 498 trials (82%).
- **D7 GLB set:** 3 defective, 3 absent out of 6 GLB IP-valuation trials.

**Go/no-go recommendation:** NO-GO for production use without remediation. See remediation blueprint for prioritized fixes.

---

## D1 — Sparsity (all-zero and single-axis vectors)

**Severity:** high

| Metric | Count | % |
|---|---|---|
| All-zero vectors | 349 | 57.3% |
| Single-axis | 142 | 23.3% |
| Multi-axis (≥2) | 118 | 19.4% |

**Single-axis distribution** (which axis dominates the single-axis trials):

- `io`: 78
- `ddr`: 30
- `mapk`: 9
- `vegf`: 8
- `pi3k`: 8
- `her2`: 7
- `efflux`: 2

**Evidence samples** (first 5 all-zero, first 5 single-axis):
- `NCT05531279` (all-zero): A Study of PEG-rhG-CSF and rhG-CSF Used for Aplastic Anemia 
- `NCT06030479` (all-zero): Topical Adrenaline Versus Warm Saline Solution for Minimizin
- `NCT06326879` (all-zero): A Comparative Study Between Early Onset Colorectal Cancer an
- `NCT06233279` (all-zero): Study of Application of Transcutaneous Trigeminal Nerve Stim
- `NCT06724679` (all-zero): VRFR- Immersive Virtual Reality Use in a Spine Functional Re
- `NCT06331130` (single-axis ['her2=0.95']): Mesenteric Infiltration in Ovarian Cancer
- `NCT04284969` (single-axis ['ddr=0.95']): PROADAPT-ovary/EWOC-2
- `NCT04001023` (single-axis ['ddr=0.9']): 
- `NCT01000259` (single-axis ['vegf=0.9']): Study of Tumor Tissue Samples From Patients Who Have Undergo
- `NCT02655016` (single-axis ['ddr=0.95']): A Study of Niraparib (GSK3985771) Maintenance Treatment in P

---

## D2 — Type inconsistency (confidence / source / reviewed_by)

**Severity:** medium

| Issue | Count |
|---|---|
| String confidence values | 20 |
| Missing confidence | 0 |
| Missing source | 22 |
| Missing reviewed_by | 28 |

**String-confidence entries** (should be numeric):

- `NCT05065021`: confidence=`Medium` — Using Genetic Profile to Determine the Treatment f
- `NCT03579316`: confidence=`High` — Adavosertib With or Without Olaparib in Treating P
- `NCT02264678`: confidence=`Medium` — Ascending Doses of Ceralasertib in Combination Wit
- `NCT04585750`: confidence=`Low` — The Evaluation of PC14586 in Patients With Advance
- `NCT04034927`: confidence=`High` — Testing the Addition of an Immunotherapy Drug, Tre
- `NCT06107868`: confidence=`Low` — Phase 1 Study of RP-6306 With Carboplatin and Pacl
- `NCT02571725`: confidence=`Medium` — PARP-inhibition and CTLA-4 Blockade in BRCA-defici
- `NCT05877599`: confidence=`Low` — A Study of NT-175 in Adult Subjects With Unresecta
- `NCT05990192`: confidence=`Low` — SBRT Alone or Followed by Niraparib for Oligometas
- `NCT06827353`: confidence=`Medium` — Niraparib Versus Bevacizumab as Maintenance Therap
- `NCT06433219`: confidence=`High` — Tuvusertib Combined With Niraparib or Lartesertib 
- `NCT06545942`: confidence=`Medium` — Study of Orally Administered MOMA-313 in Participa
- `NCT06856499`: confidence=`High` — Cirtuvivint/Olaparib in Breast Cancer Susceptibili
- `NCT03740165`: confidence=`Medium` — Study of Chemotherapy With Pembrolizumab (MK-3475)
- `NCT04616534`: confidence=`High` — Testing the Addition of an Anti-cancer Drug, Elimu
- `NCT03113487`: confidence=`Medium` — P53MVA and Pembrolizumab in Treating Patients With
- `NCT02298959`: confidence=`Medium` — Testing the PD-1 Antibody, MK3475, Given With Ziv-
- `NCT03522246`: confidence=`High` — A Study in Ovarian Cancer Patients Evaluating Ruca
- `NCT04044859`: confidence=`Medium` — ADP-A2M4CD8 as Monotherapy or in Combination With 
- `NCT03734692`: confidence=`Medium` — Systemic Immune Checkpoint Blockade and Intraperit

---

## D3 — Mechanism-coding defects on PC-02 anchor trials

**Severity:** critical

| NCT | Drug | Verdict | Defect |
|---|---|---|---|
| `NCT02595892` | Berzosertib (M6620) ATRi + gem | **DEFECTIVE** | rss=0.75 dominates — routes RS to non-responder side under PATH A (LIF |
| `NCT03579316` | Adavosertib (AZD1775) WEE1i +  | **DEFECTIVE** | pi3k=1.0 encodes PTEN-loss resistance as a drug target (LIFT-004 D2);  |
| `NCT03462342` | Ceralasertib + olaparib (CAPRI | **ABSENT** | Trial not in registry |
| `NCT05450692` | Ceralasertib + durvalumab (LAT | **DEFECTIVE** | QUARANTINED under CT-03 regardless of vector (patent +0.366 vs receipt |
| `NCT02264678` | Ceralasertib + olaparib (Phase | **DEFECTIVE** | ddr=0.0 missing for ATR+PARP combo (LIFT-004 D3); mapk=1.0 spurious fo |

**Per-anchor detail:**

### `NCT02595892` — Berzosertib (M6620) ATRi + gemcitabine
- **Verdict:** DEFECTIVE
- **Published:** RS-Low HR 0.34 (responder) vs RS-High HR 1.11 (non-responder), PMID 34552099
- **Expected direction:** ddr-dominant; rss should favour responder (RS-Low), not non-responder
- **Registry vector:** `{'ddr': 0.9, 'mapk': 0.0, 'pi3k': 0.0, 'vegf': 0.0, 'her2': 0.0, 'io': 0.0, 'efflux': 0.0, 'rss': 0.75}`
- **Source:** retroactive_validation, **Confidence:** 0.92
- **Defect:** rss=0.75 dominates — routes RS to non-responder side under PATH A (LIFT-004 D1)

### `NCT03579316` — Adavosertib (AZD1775) WEE1i + gemcitabine
- **Verdict:** DEFECTIVE
- **Published:** CCNE1-amp ORR 36% (responder) vs PTEN-loss ORR 0% (non-responder), JCO 2023
- **Expected direction:** ddr + rss_exploit; PTEN-loss (pi3k) is resistance, NOT a target
- **Registry vector:** `{'ddr': 1.0, 'mapk': 1.0, 'pi3k': 1.0, 'vegf': 0.0, 'her2': 0.0, 'io': 0.0, 'efflux': 0.0, 'rss': 0.7}`
- **Source:** None, **Confidence:** High
- **Defect:** pi3k=1.0 encodes PTEN-loss resistance as a drug target (LIFT-004 D2); mapk=1.0 spurious for WEE1i (LIFT-004)

### `NCT03462342` — Ceralasertib + olaparib (CAPRI Phase II)
- **Verdict:** ABSENT
- **Published:** PARPi-naive 54% vs ITT 0%, Shah Clin Cancer Res 2023
- **Expected direction:** ddr-dominant (ATR+PARP combo)
- **Defect:** Trial not in registry

### `NCT05450692` — Ceralasertib + durvalumab (LATIFY)
- **Verdict:** DEFECTIVE
- **Published:** QUARANTINED CT-03 (patent +0.366 vs receipt +0.2641)
- **Expected direction:** ddr + io; quarantined regardless
- **Registry vector:** `{'ddr': 0.85, 'mapk': 0.1, 'pi3k': 0.0, 'vegf': 0.0, 'her2': 0.0, 'io': 0.75, 'efflux': 0.0, 'rss': 0.75}`
- **Source:** retroactive_validation, **Confidence:** 0.92
- **Defect:** QUARANTINED under CT-03 regardless of vector (patent +0.366 vs receipt +0.2641)

### `NCT02264678` — Ceralasertib + olaparib (Phase I/Ib)
- **Verdict:** DEFECTIVE
- **Published:** ITT 0%, BRCA1-mut trend, PARPi-naive 54%, Drew JCO 2022
- **Expected direction:** ddr-dominant (ATR+PARP combo); patient-B vector undefined (CT-04)
- **Registry vector:** `{'ddr': 0.0, 'mapk': 1.0, 'pi3k': 1.0, 'vegf': 0.0, 'her2': 0.0, 'io': 0.0, 'efflux': 0.0, 'rss': 0.0}`
- **Source:** None, **Confidence:** Medium
- **Defect:** ddr=0.0 missing for ATR+PARP combo (LIFT-004 D3); mapk=1.0 spurious for ATR+PARP combo

---

## D4 — Non-oncology contamination

**Severity:** critical

| Metric | Count |
|---|---|
| Keyword-flagged (Pass 1) | 317 |
| CT.gov-confirmed non-oncology | 291 |
| False-positive flags (flagged but actually oncology) | 26 |
| False-positive rate | 0.082 |
| False-negative sample size | 29 |
| False-negative count (non-flagged but non-oncology) | 1 |
| False-negative rate | 0.034 |
| CT.gov fetch failures | 0 |
| CT.gov 404 (not found) | 0 |

**CT.gov-confirmed non-oncology trials** (delete candidates — Tier 1):

| NCT | Title | CT.gov conditions | Assigned axis | Source |
|---|---|---|---|---|
| `NCT02244879` | Effects of Resveratrol on Inflammation in Typ | Type 2 Diabetes Mellitus, Inflammation, Insulin Re | ddr | manual_keyword_matching |
| `NCT03735979` | Multi-arm Optimization of Stroke Thrombolysis | Acute Ischemic Stroke | ddr | manual_keyword_matching |
| `NCT02680379` | Combined Treatment of Minocycline and Lovasta | Fragile X Syndrome | ddr | manual_keyword_matching |
| `NCT00652379` | Co-treatment With Pegvisomant and a Somatosta | Acromegaly, Insulin Resistance, Impaired Glucose T | ddr | manual_keyword_matching |
| `NCT04850079` | EHR Precision Drug Treatment in Neonates | Pain, Acute, Pain, Chronic | ddr | manual_keyword_matching |
| `NCT03470779` | Impact of Combined Psychotherapy and Physioth | Pain Syndrome, Disability Physical | ddr | manual_keyword_matching |
| `NCT06395779` | Comparison of Neuromuscular Exercises and Dan | Geriatrics, Neuromuscular Exercise, Dance Therapy | ddr | manual_keyword_matching |
| `NCT00339079` | Treatment of Hypochondriasis With CBT and/or  | Hypochondriasis | ddr | manual_keyword_matching |
| `NCT04534179` | Vacuum Myofascial Therapy Device and Physical | Chronic Nonspecific Low Back Pain | ddr | manual_keyword_matching |
| `NCT02575079` | Parafilm to Prevent CLABSI in Pediatric Patie | Central Line Associated Bloodstream Infections (CL | ddr,mapk | manual_keyword_matching |
| `NCT04470479` | Oral Pilocarpine in the Treatment of the Dry  | Dry Eye | ddr | manual_keyword_matching |
| `NCT06101979` | A Prospective Study of Fortiva in Hernia Repa | Ventral Hernia, Incisional Hernia, Abdominal Wall  | ddr | manual_keyword_matching |
| `NCT06963879` | Validation Study of a New Digital Diagnostic  | Alzheimer Disease, MCI | ddr | manual_keyword_matching |
| `NCT02359279` | Radiographic Contrast To Differentiate Cavita | Dental Caries | mapk | manual_keyword_matching |
| `NCT06638879` | Tacrolimus Toothpaste for Management of Oral  | Chronic Graft Versus Host Disease Oral | mapk | manual_keyword_matching |
| `NCT01979679` | A D2 Receptor Occupancy and fMRI Study in Sch | Schizophrenia | mapk | manual_keyword_matching |
| `NCT01961479` | Treatment of Premenstrual Syndrome - Internet | Premenstrual Syndrome (PMS) | ddr | manual_keyword_matching |
| `NCT05190679` | Prospective Phenotyping for Genetic Subtypes  | Atrial Fibrillation | ddr | manual_keyword_matching |
| `NCT02498379` | PET Imaging of Natriuretic Peptide Receptor C | Atherosclerosis | ddr | manual_keyword_matching |
| `NCT00574379` | Efficacy, Safety and PK of Once or Twice Dail | Seasonal Allergic Rhinitis, Hay Fever, Allergic Co | ddr | manual_keyword_matching |
| `NCT00501579` | Study of Difluprednate in the Treatment of Uv | Uveitis | ddr | manual_keyword_matching |
| `NCT05201079` | Primary or Recurrent Clostridioides Difficile | Recurrent Clostridium Difficile Infection, Primary | ddr | manual_keyword_matching |
| `NCT03479879` | Estradiol Pretreatment With Misoprostol in Se | Miscarriage | ddr | manual_keyword_matching |
| `NCT05531279` | A Study of PEG-rhG-CSF and rhG-CSF Used for A | Severe Aplastic Anemia |  |  |
| `NCT06233279` | Study of Application of Transcutaneous Trigem | Autism Spectrum Disorder |  | openai_batch_tagging |
| `NCT06724679` | VRFR- Immersive Virtual Reality Use in a Spin | Chronic Low Back Pain |  | openai_batch_tagging |
| `NCT07017179` | This is a Multi-centre, Multi-drug, Platform  | Obesity/Overweight |  | openai_batch_tagging |
| `NCT05800379` | Study on Hospitalization of Children With Bro | Asthma in Children |  | openai_batch_tagging |
| `NCT05943379` | RC48-ADC in Combination With Gemcitabine in H | NMIBC | her2 | openai_batch_tagging |
| `NCT04872179` | International Registry of Patients With Alpha | Alpha-Thalassemia, Alpha Thalassemia Major, Alpha  |  | openai_batch_tagging |

*...and 261 more (see defects CSV)*

**False-positive flags** (26 flagged but CT.gov confirms oncology — title was just poorly worded):

- `NCT04284969`: PROADAPT-ovary/EWOC-2 → conditions: Ovarian Cancer, Surgery
- `NCT04001023`:  → conditions: Epithelial Ovarian Cancer, Fallopian Tube Cancer, Peritoneal Carcinoma
- `NCT04986579`: Scalp Cooling in MBC → conditions: Metastatic Breast Cancer, Chemotherapy-induced Alopecia
- `NCT01609179`: IPI-926 Extension Protocol for Continuation of Tre → conditions: Basal Cell Carcinoma, Chondrosarcoma
- `NCT00006379`: Non-Ablative Allo HSCT For Hematologic Malignancie → conditions: Chronic Myeloproliferative Disorders, Leukemia, Lymphoma
- `NCT05839379`: Targeted Pediatric High-Grade Glioma Therapy → conditions: High Grade Glioma, Diffuse Intrinsic Pontine Glioma, Anaplastic Astrocytoma
- `NCT05788679`: A Study Using Subject-specific MRD to Adopt Treatm → conditions: Myelodysplastic Syndromes, Acute Myeloid Leukemia With Myelodysplasia Related Disease and < 30% Blasts, Mixed Myelodysplastic/Myeloproliferative Disease
- `NCT05457595`: Clinical Study on the Re-irradiation of Lateral Pe → conditions: Tumor Recurrence, Malignant Epithelial Neoplasm of Vulva, Malignant Epithelial Tumor of Ovary
- `NCT06103916`: Prospective RegIstration Of the peRformance of the → conditions: Ovarian Tumor, Ovarian Cancer
- `NCT06378905`: Cukurova Score Validation Study → conditions: Epithelial Ovarian Cancer, Primary Cytoreduction

**False negatives** (1 non-flagged trials that CT.gov says are non-oncology — keyword heuristic missed these):

- `NCT01321879`: Study to Evaluate the Safety and Efficacy of Telav → conditions: Infection, Bacteremia

---

## D5 — Axis-magnitude distribution and dominance

**Severity:** high

| Axis | Nonzero count | Mean | Max |
|---|---|---|---|
| `ddr` | 106 | 0.672 | 1.0 |
| `mapk` | 46 | 0.489 | 1.0 |
| `pi3k` | 39 | 0.441 | 1.0 |
| `vegf` | 49 | 0.543 | 1.0 |
| `her2` | 16 | 0.641 | 1.0 |
| `io` | 173 | 0.576 | 1.0 |
| `efflux` | 7 | 0.429 | 0.8 |
| `rss` | 3 | 0.733 | 0.75 |

**Dominance issues** (axes where a single high-magnitude entry dominates):

- **rss**: Only 3 nonzero entries, max=0.75 — single entry dominates
  - Top entry: `NCT05450692` = 0.75

---

## D6 — Provenance / source-quality audit

**Severity:** high

| Source | Count | All-zero rate | Single-axis rate | Non-onco rate | Mean confidence |
|---|---|---|---|---|---|
| `cohere_batch_tagging` | 498 | 0.612 | 0.163 | 0.492 | 0.656 |
| `manual_keyword_matching` | 42 | 0.0 | 0.952 | 0.548 | 0.845 |
| `MISSING` | 22 | 0.727 | 0.182 | 0.045 | 0.75 |
| `gemini_batch_tagging` | 22 | 0.727 | 0.273 | 0.727 | 0.477 |
| `openai_batch_tagging` | 10 | 0.9 | 0.1 | 0.6 | 0.08 |
| `manual_intelligence_report` | 5 | 0.0 | 1.0 | 0.0 | 0.93 |
| `manual_zo_addition` | 3 | 0.333 | 0.667 | 0.0 | 0.93 |
| `gemini_batch_v2` | 2 | 0.0 | 1.0 | 0.0 | 0.975 |
| `manual_zo_correction` | 2 | 1.0 | 0.0 | 0.0 | 0.99 |
| `retroactive_validation` | 2 | 0.0 | 0.0 | 0.0 | 0.92 |
| `manual_zo_update` | 1 | 0.0 | 1.0 | 0.0 | 0.99 |

---

## D7 — GLB IP-valuation set per-trial verdicts

**Severity:** critical

| NCT | Drug | Verdict | Defect |
|---|---|---|---|
| `NCT02595892` | Berzosertib (M6620) ATRi + gem | **DEFECTIVE** | D3: rss=0.75 dominates — routes RS to non-responder side under PATH A  |
| `NCT03579316` | Adavosertib (AZD1775) WEE1i +  | **DEFECTIVE** | D3: pi3k=1.0 encodes PTEN-loss resistance as a drug target (LIFT-004 D |
| `NCT03462342` | Ceralasertib + olaparib (CAPRI | **ABSENT** | Not in registry |
| `NCT05450692` | Ceralasertib + durvalumab (LAT | **DEFECTIVE** | D3: QUARANTINED under CT-03 regardless of vector (patent +0.366 vs rec |
| `NCT04154956` | Tusamitamab ravtansine (CARMEN | **ABSENT** | Not in registry |
| `NCT02870920` | Durvalumab (CCTG CO.26) | **ABSENT** | Not in registry |

---

## Go/no-go recommendation

**Health score: 0/100** — 
**NO-GO for production use.** Registry requires substantial remediation before it can be used in any external-facing deliverable or as the production ranker's trial substrate.

**Reasoning:**
- 57.3% of vectors carry no mechanism signal (all-zero).
- 4/5 PC-02 anchors have mechanism-coding defects; 1 are absent.
- 291 confirmed non-oncology trials contaminate the registry.
- The rss axis has only 3 nonzero entries — the 8D extension is effectively unused.
- cohere_batch_tagging supplies 498/609 trials; its all-zero rate is 0.612.

See `registry_remediation_blueprint.md` for the prioritized fix list.
