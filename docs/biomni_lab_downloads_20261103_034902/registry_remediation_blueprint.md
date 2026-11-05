# Registry Remediation Blueprint

**Generated:** 2026-07-12 07:50 UTC
**Health score:** 0/100
**Registry:** 609 trials

Ranks fixes by impact × effort. Each tier is independent — execute in order for maximum impact per unit effort.

---

## Tier 1 — Delete confirmed non-oncology trials

**Action:** Delete 291 CT.gov-confirmed non-oncology trials from the registry.
**Effort:** Minutes (one JSON edit).
**Impact:** Removes false DDR/MAPK/IO signal from psychiatric, endocrine, cardiovascular, and other non-oncology trials that were mis-tagged by automated keyword matchers.
**Risk:** Low — these trials should never have been in an oncology MoA vector registry.

**Trials to delete:**

- `NCT02244879`: Effects of Resveratrol on Inflammation in Type 2 Diabetic Pa → conditions: Type 2 Diabetes Mellitus, Inflammation
- `NCT03735979`: Multi-arm Optimization of Stroke Thrombolysis → conditions: Acute Ischemic Stroke
- `NCT02680379`: Combined Treatment of Minocycline and Lovastatin to Treat In → conditions: Fragile X Syndrome
- `NCT00652379`: Co-treatment With Pegvisomant and a Somatostatin Analogue (S → conditions: Acromegaly, Insulin Resistance
- `NCT04850079`: EHR Precision Drug Treatment in Neonates → conditions: Pain, Acute, Pain, Chronic
- `NCT03470779`: Impact of Combined Psychotherapy and Physiotherapy Group Tre → conditions: Pain Syndrome, Disability Physical
- `NCT06395779`: Comparison of Neuromuscular Exercises and Dance Therapy on P → conditions: Geriatrics, Neuromuscular Exercise
- `NCT00339079`: Treatment of Hypochondriasis With CBT and/or SSRI → conditions: Hypochondriasis
- `NCT04534179`: Vacuum Myofascial Therapy Device and Physical Activity for t → conditions: Chronic Nonspecific Low Back Pain
- `NCT02575079`: Parafilm to Prevent CLABSI in Pediatric Patients Undergoing  → conditions: Central Line Associated Bloodstream Infections (CLABSI), Bone Marrow Transplant
- `NCT04470479`: Oral Pilocarpine in the Treatment of the Dry Eye of Patients → conditions: Dry Eye
- `NCT06101979`: A Prospective Study of Fortiva in Hernia Repair → conditions: Ventral Hernia, Incisional Hernia
- `NCT06963879`: Validation Study of a New Digital Diagnostic and Treatment T → conditions: Alzheimer Disease, MCI
- `NCT02359279`: Radiographic Contrast To Differentiate Cavitated From Non-ca → conditions: Dental Caries
- `NCT06638879`: Tacrolimus Toothpaste for Management of Oral Chronic Graft v → conditions: Chronic Graft Versus Host Disease Oral
- `NCT01979679`: A D2 Receptor Occupancy and fMRI Study in Schizophrenic Subj → conditions: Schizophrenia
- `NCT01961479`: Treatment of Premenstrual Syndrome - Internet-based Self-hel → conditions: Premenstrual Syndrome (PMS)
- `NCT05190679`: Prospective Phenotyping for Genetic Subtypes of Early-onset  → conditions: Atrial Fibrillation
- `NCT02498379`: PET Imaging of Natriuretic Peptide Receptor C (NPR-C) in Car → conditions: Atherosclerosis
- `NCT00574379`: Efficacy, Safety and PK of Once or Twice Daily Bilastine (10 → conditions: Seasonal Allergic Rhinitis, Hay Fever
- `NCT00501579`: Study of Difluprednate in the Treatment of Uveitis → conditions: Uveitis
- `NCT05201079`: Primary or Recurrent Clostridioides Difficile Infection Trea → conditions: Recurrent Clostridium Difficile Infection, Primary Clostridium Difficile Infection
- `NCT03479879`: Estradiol Pretreatment With Misoprostol in Second Trimester  → conditions: Miscarriage
- `NCT05531279`: A Study of PEG-rhG-CSF and rhG-CSF Used for Aplastic Anemia  → conditions: Severe Aplastic Anemia
- `NCT06233279`: Study of Application of Transcutaneous Trigeminal Nerve Stim → conditions: Autism Spectrum Disorder
- `NCT06724679`: VRFR- Immersive Virtual Reality Use in a Spine Functional Re → conditions: Chronic Low Back Pain
- `NCT07017179`: This is a Multi-centre, Multi-drug, Platform Study in Chines → conditions: Obesity/Overweight
- `NCT05800379`: Study on Hospitalization of Children With Bronchial Asthma → conditions: Asthma in Children
- `NCT05943379`: RC48-ADC in Combination With Gemcitabine in High Risk NMIBC  → conditions: NMIBC
- `NCT04872179`: International Registry of Patients With Alpha Thalassemia → conditions: Alpha-Thalassemia, Alpha Thalassemia Major
- `NCT06373679`: Switch or Quit R01 → conditions: Cigarette Smoking, Smoking Behaviors
- `NCT05700279`: Preventing the Development of Chronic Pain: Treating PTSD at → conditions: PTSD, Chronic Pain
- `NCT04158479`: China Extracorporeal Life Support Registry → conditions: Cardiogenic Shock, Cardiac Arrest
- `NCT03821779`: Prefrontal Oscillations in Social Anxiety Disorder (POSAD) → conditions: Anxiety Disorders, Anxiety
- `NCT06748079`: A Clinical Study of TQC3721 Inhalation Powder in Patients Wi → conditions: Chronic Obstructive Pulmonary Disease (COPD)
- `NCT03622879`: Mirror Therapy with Cutaneous Electrical Sensory Stimulation → conditions: Stroke
- `NCT03672279`: Validation of a Novel Self-Administered Cognitive Assessment → conditions: Dementia Alzheimers, Mild Cognitive Impairment
- `NCT03368079`: Utilization of Negative Pressure Suction to Reduce Aspiratio → conditions: Oropharyngeal Dysphagia
- `NCT05006079`: Opioid/Benzodiazepine Polydrug Abuse: Aim 3 → conditions: Opioid Abuse, Benzodiazepine Abuse
- `NCT07005479`: Long-Term Outcomes in SLE at Peking University People's Hosp → conditions: Systemic Lupus Erythematosus

*...and 251 more (see defects CSV)*

---

## Tier 2 — Re-tag PC-02 anchor trials

**Action:** Fix the 4 defective/absent PC-02 anchors using published-mechanism vectors from LIFT-004 §5.2.
**Effort:** ~1 hour with published-mechanism lookup.
**Impact:** Unblocks the PC-02 retroactive-prediction re-test (the locked lift criterion). Without this, PC-02 stays permanently downgraded.
**Risk:** Medium — requires mechanism-vetted vectors; LIFT-004 v2 vectors are diagnostic-only (engineered-to-pass), so an independent re-tag is needed.

**Specific fixes:**

| NCT | Current vector | Corrected vector (per LIFT-004 v2) | Rationale |
|---|---|---|---|
| `NCT02595892` | `{ddr:0.9, rss:0.75}` | `{ddr:0.9, rss_exploit:0.75}` | RS is the exploitable target of ATRi, routed to responder-favouring axis |
| `NCT03579316` | `{ddr:1.0, mapk:1.0, pi3k:1.0, rss:0.7}` | `{ddr:1.0, rss_exploit:0.7}` | Drop PTEN-loss resistance (pi3k) and spurious mapk; WEE1i acts on DDR/RS |
| `NCT02264678` | `{mapk:1.0, pi3k:1.0}` | `{ddr:1.0, rss_exploit:0.6}` | Restore DDR axis for ATR+PARP combo |
| `NCT03462342` | (absent) | `{ddr:1.0, rss_exploit:0.6}` | Add CAPRI to registry with correct DDR-dominant vector |

**Note:** The `rss_exploit` / `rss_resist` axis split requires a schema change to the registry (8D → 9D). This is a separate governance decision. Alternatively, keep 8D but flip the rss sign convention so high rss = exploitable (responder-favouring), not resistant.

---

## Tier 3 — Audit and re-tag cohere_batch_tagging source

**Action:** Audit the `cohere_batch_tagging` source (498 trials, 82% of registry).
**Effort:** Days (systemic re-tagging or manual review of top-N).
**Impact:** Determines whether the registry is salvageable as a whole or needs to be rebuilt.
**Risk:** High — if the tagger's false-positive rate is >20%, most of the registry is suspect.

**Current cohere_batch_tagging defect rates:**
- All-zero rate: 0.612
- Single-axis rate: 0.163
- Confirmed non-oncology rate: 0.492
- Mean confidence: 0.656

**Decision gate:** If confirmed non-oncology rate >20%, rebuild the registry from scratch with a vetted tagger. If <20%, re-tag the defective subset only.

---

## Tier 4 — Normalize types and backfill missing fields

**Action:** Fix 20 string-confidence entries, 22 missing source, 28 missing reviewed_by.
**Effort:** Minutes.
**Impact:** Unblocks downstream confidence-based filtering and sorting.
**Risk:** None.

**Specific fixes:**
- Convert string confidence values ('High', 'Medium', 'Low') to numeric (0.9, 0.7, 0.5).
- Backfill missing `source` from git history or mark as `unknown`.
- Backfill missing `reviewed_by` from git history or mark as `unknown`.

---

## Tier 5 — Decide on all-zero vectors (owner-gated)

**Action:** Decide the fate of 349 all-zero vectors (57.3% of registry).
**Effort:** Decision + execution.
**Impact:** Determines registry size and discriminative power.
**Risk:** Strategy decision — not a technical fix.

**Options:**
1. **Delete** — no mechanism signal = no value. Reduces registry to ~260 trials.
2. **Re-tag** — run a better tagger (manual review or improved LLM prompt) to populate vectors. High effort.
3. **Keep as 'unknown mechanism' markers** — explicit `source: unknown_mechanism`, excluded from ranker scoring but retained for provenance.

**Recommendation:** Option 3 (keep as markers) is safest — preserves provenance without contaminating the ranker. Option 1 is fastest but loses trial coverage. Option 2 is ideal but expensive.

---

## Summary

| Tier | Action | Trial count | Effort | Impact |
|---|---|---|---|---|
| 1 | Delete non-oncology | 291 | minutes | high |
| 2 | Re-tag anchors | 5 | ~1 hour | critical (unblocks PC-02) |
| 3 | Re-tag cohere source | 498 | days | systemic |
| 4 | Normalize types | 70 | minutes | low |
| 5 | Decide on all-zero | 349 | decision | high |

**Recommended execution order:** Tier 1 → Tier 2 → Tier 4 → Tier 5 decision → Tier 3 (if needed).
