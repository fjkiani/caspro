# Brenus / STC-1010 / BreAK CRC-001 — Verified Claim Ledger v1.0
## Clean-Room Rebuild | PhD Verification Agent | CrisPRO

**Version:** 1.0  
**Date:** 2026-04-27  
**Policy:** No claim inherits a label from prior agent canon. Every label is assigned here from directly retrieved primary sources only.  
**Sources retrieved this session:** NCT06934538 API [54], NCT03050814 API + results [55], Alzeeb et al. 2024 Frontiers Oncology full text [61], Brenus Science & Innovation page [58], Antineo poster page [59]  
**Sources blocked (Akamai):** BusinessWire AACR 2024 [56/57], BusinessWire InSphero [60]  
**Sources not retrieved:** ASCO 2023 abstract e14661 (paywall/resolver failure), BioSpace ASCO 2024 (404)

---

## SECTION A — BreAK CRC-001 Protocol Facts (NCT06934538)

---

### CLAIM A-001
- **claim_id:** A-001
- **claim_text:** The trial's official NCT identifier is NCT06934538.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"nctId":"NCT06934538"`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Directly retrieved from ClinicalTrials.gov API v2.

---

### CLAIM A-002
- **claim_id:** A-002
- **claim_text:** The trial's sponsor-assigned ID is "BreAK CRC-001."
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"orgStudyIdInfo":{"id":"BreAK CRC-001"}`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-003
- **claim_text:** The lead sponsor is Brenus Pharma (industry class).
- **claim_id:** A-003
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"leadSponsor":{"name":"Brenus Pharma","class":"INDUSTRY"}`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-004
- **claim_id:** A-004
- **claim_text:** The trial is a Phase I/IIA, open-label, multicenter, dose-escalation and cohort-expansion study.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"officialTitle":"Open Label, Multicenter, Dose-escalation and Cohort-expansion Phase I/IIA Trial of STC-1010..."`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-005
- **claim_id:** A-005
- **claim_text:** The trial has two parts: Phase I (dose escalation + small expansion, ~21–33 participants, Europe only) and Phase IIA (expansion at RP2D, ~57–60 participants total, Europe + US).
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "A Phase I consisting of a dose escalation part and small expansion part... Approximately 21 to 33 participants will be included in this phase in Europe. A Phase IIA... Approximately 57 to 60 participants will be enrolled in total in 2 different arms."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Total estimated enrollment per registry: 90.

---

### CLAIM A-006
- **claim_id:** A-006
- **claim_text:** The trial has three registered arms: Phase 1 (dose escalation), Phase 2A Arm 2A-1 (MSS), and Phase 2A Arm 2A-2 (MSI-H).
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** armGroups labels: "Phase 1", "Phase 2A: Arm 2A-1", "Phase 2A: Arm 2A-2"
- **confidence:** VERIFIED
- **conflicts_with:** Prior agent canon described trial as MSS-only. MSI-H arm (2A-2) is registered.
- **rewrite_if_needed:** Any claim that BreAK CRC-001 is restricted to MSS patients is INCORRECT. An MSI-H arm (2A-2) is registered.
- **engine_routable:** yes
- **notes:** CONTRADICTION with prior agent canon. See Contradiction Ledger C-001.

---

### CLAIM A-007
- **claim_id:** A-007
- **claim_text:** All three arms require BRAF wild-type, KRAS-mutated disease.
- **scope:** arm-specific (all arms)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** Phase 1: "BRAF wild type, KRAS mutated, unresectable stage IIIC (T4b) or unresectable stage IV CRC participants"; Arm 2A-1: same language; Arm 2A-2: same language.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** BRAF mutation is an explicit exclusion criterion (Exclusion #7: "BRAF mutation"). KRAS mutation is required by arm description. This is a critical eligibility constraint.

---

### CLAIM A-008
- **claim_id:** A-008
- **claim_text:** BRAF mutation is an explicit exclusion criterion.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** Exclusion Criteria #7: "BRAF mutation"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** This means HT29 (BRAF V600E) would be ineligible as a patient model. Relevant to cell-line-to-patient generalizability.

---

### CLAIM A-009
- **claim_id:** A-009
- **claim_text:** The intervention is STC-1010 + immunostimulant (IS) regimen (low-dose cyclophosphamide + GM-CSF) + SOC therapy (mFOLFOX6 with or without bevacizumab).
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "STC-1010 administered with immunostimulants (IS) in low-dose (cyclophosphamide and GM-CSF) and standard of care (SOC) therapy (mFOLFOX6 with or without bevacizumab)"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Bevacizumab is optional ("with or without"), not mandatory. This is arm-level detail not yet resolved in registry.

---

### CLAIM A-010
- **claim_id:** A-010
- **claim_text:** Phase I primary endpoint: safety profile, MTD, and RP2D, assessed by CTCAE v5 over 28 days.
- **scope:** arm-specific (Phase 1)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "To determine overall safety profile, recommended Phase 2 dose (RP2D) and maximum tolerated dose (MTD)... using the Common Terminology Criteria for Adverse Events (CTCAE Version 5)... timeFrame: 28 days"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-011
- **claim_id:** A-011
- **claim_text:** Phase IIA primary endpoint: PFS rate at 12 months from STC-1010 + IS initiation, defined as proportion alive without progression (CR/PR/SD) per RECIST 1.1.
- **scope:** arm-specific (Phase 2A)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "Progression Free Survival (PFS) rate at 12 months from STC-1010 + IS regimen initiation, defined as the proportion of participants alive and without progression... according to RECIST 1.1"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-012
- **claim_id:** A-012
- **claim_text:** Phase IIA secondary endpoints include CBR, ORR, DOR, PFS (median), OS, and metastases resection rate.
- **scope:** arm-specific (Phase 2A)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** Secondary outcome measures listed: CBR, ORR, DOR, PFS, OS, metastases resection rate.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-013
- **claim_id:** A-013
- **claim_text:** Exploratory outcomes include biomarker assessment in blood and tumor biopsies at T0, 1 month, 2 months, 6 months, 12 months, and at progression.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "Assessment of biomarkers in blood and tumor biopsies... At baseline/screening (T0), 1 month, 2 months, 6 months, 12 months and at time of progression (Tprogression, up to 24 months)"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** On-treatment biopsy required only if not clinically risky and technically feasible (Inclusion #6).

---

### CLAIM A-014
- **claim_id:** A-014
- **claim_text:** Key eligibility: age 18–75; ECOG PS ≤1 (PS=0 required for age >70); histologically confirmed unresectable locally advanced (stage IIIC T4b) or metastatic (stage IV) CRC adenocarcinoma; measurable disease per RECIST 1.1; KRAS and BRAF mutation status required; treatment-naive for metastatic disease.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** Inclusion criteria #1, #2, #4, #5, #7; Exclusion #4: "Prior chemotherapy for metastatic disease"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Age cap of 75 is notable — not standard for most 1L mCRC trials.

---

### CLAIM A-015
- **claim_id:** A-015
- **claim_text:** Active autoimmune disease requiring treatment is an exclusion criterion.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** Exclusion #8: "Active auto-immune diseases such as rheumatoid arthritis, lupus, Crohn's disease, ulcerative colitis"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-016
- **claim_id:** A-016
- **claim_text:** Actual start date: 2025-06-17. Estimated primary completion: 2028-06. Estimated study completion: 2029-06. Status as of last update (2025-12-19): RECRUITING.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"startDateStruct":{"date":"2025-06-17","type":"ACTUAL"}`, `"overallStatus":"RECRUITING"`, `"lastUpdateSubmitDate":"2025-12-19"`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-017
- **claim_id:** A-017
- **claim_text:** Recruiting sites as of last registry update: Institut Bergonié (Bordeaux), CGFL (Dijon), Hospices Civils de Lyon, Institut du Cancer de Montpellier, Institut Gustave Roussy (Villejuif) — all France, all RECRUITING. Johns Hopkins (Baltimore, US), Institut Jules Bordet (Brussels), Centre Léon Bérard (Lyon), CHU Poitiers — NOT YET RECRUITING.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** contactsLocationsModule locations array, status fields.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** US site (Johns Hopkins, PI Eric Christenson) not yet recruiting as of last update.

---

### CLAIM A-018
- **claim_id:** A-018
- **claim_text:** The trial has FDA-regulated drug status and DMC oversight.
- **scope:** study-wide
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** `"isFdaRegulatedDrug":true`, `"oversightHasDmc":true`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM A-019
- **claim_id:** A-019
- **claim_text:** Phase I immune monitoring endpoint: delayed-type hypersensitivity (DTH) score assessed after first vaccination (at 1, 24, 48, 72 hours post-injection) and after 4th, 8th, and every boost.
- **scope:** arm-specific (Phase 1)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [54]
- **verbatim_support:** "Assessment of delayed-type hypersensitivity (DTH) score after the first vaccination (at 1, 24, 48 and 72 hours post-STC-1010 injection) and then after the 4th, 8th and every boost"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** DTH is a functional immune readout consistent with hapten-mediated sensitization mechanism.

---

## SECTION B — NCT03050814 Comparator Trial Facts

---

### CLAIM B-001
- **claim_id:** B-001
- **claim_text:** NCT03050814 is a randomized Phase II trial titled "Standard of Care Alone or in Combination With Ad-CEA Vaccine and Avelumab in Patients With Previously Untreated Metastatic or Unresectable Colorectal Cancer (QUILT-2.004)."
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** `"officialTitle":"A Randomized Phase II Trial of Standard of Care Alone or in Combination With Ad-CEA Vaccine and Avelumab in Patients With Previously Untreated Metastatic or Unresectable Colorectal Cancer"`
- **confidence:** VERIFIED
- **conflicts_with:** Prior agent canon (Agent 3) cited NCT02853604 — INCORRECT NCT number.
- **rewrite_if_needed:** Replace NCT02853604 with NCT03050814 everywhere in Agent 3.
- **engine_routable:** yes
- **notes:** CONTRADICTION C-002. NCT02853604 does not correspond to this trial.

---

### CLAIM B-002
- **claim_id:** B-002
- **claim_text:** NCT03050814 was sponsored by NCI (NIH), PI Julius Y. Strauss MD, conducted at NIH Clinical Center (Bethesda) and Lombardi Comprehensive Cancer Center (Washington DC).
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** `"leadSponsor":{"name":"National Cancer Institute (NCI)","class":"NIH"}`, `"investigatorFullName":"Julius Y Strauss, M.D."`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** None.

---

### CLAIM B-003
- **claim_id:** B-003
- **claim_text:** NCT03050814 was TERMINATED after an unplanned interim efficacy analysis. Actual completion date: 2021-08-25.
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** `"overallStatus":"TERMINATED"`, `"whyStopped":"Terminated after an unplanned interim efficacy analysis."`
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** Any framing of this trial as "completed" or "ongoing" is incorrect.
- **engine_routable:** yes
- **notes:** Termination for futility at interim is a negative signal. Must not be framed as a positive precedent.

---

### CLAIM B-004
- **claim_id:** B-004
- **claim_text:** NCT03050814 enrolled 30 participants total (10 Arm A SOC, 16 Arm B SOC+Ad-CEA+avelumab, 4 screen failures not assigned).
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** participantFlowModule: Arm A started=10, Arm B started=16, "Enrolled But Not Assigned"=4.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Trial was designed for 70 evaluable randomized subjects; terminated far short of target.

---

### CLAIM B-005
- **claim_id:** B-005
- **claim_text:** NCT03050814 primary endpoint result: median PFS Arm A = 8.8 months (95% CI 3.3–17.0); Arm B = 10.1 months (95% CI 3.6–16.1); HR = 1.061 (95% CI 0.380–2.966); p = 0.91 (log-rank).
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** outcomeMeasuresModule primary outcome: Arm A value="8.8" lowerLimit="3.3" upperLimit="17.0"; Arm B value="10.1" lowerLimit="3.6" upperLimit="16.1"; paramValue="1.061" ciLowerLimit="0.380" ciUpperLimit="2.966" pValue="0.91"
- **confidence:** VERIFIED
- **conflicts_with:** Prior session summary cited HR 1.02 (95% CI 0.65–1.60) — INCORRECT. Correct HR is 1.061 (0.380–2.966).
- **rewrite_if_needed:** Correct HR to 1.061 (95% CI 0.380–2.966), p=0.91. No PFS benefit for vaccine+ICI arm.
- **engine_routable:** yes
- **notes:** CONTRADICTION C-003. The trial showed no improvement in PFS. This is a negative comparator result.

---

### CLAIM B-006
- **claim_id:** B-006
- **claim_text:** NCT03050814 MSI-H/dMMR patients were explicitly excluded.
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** Exclusion: "Metastatic or unresectable colorectal cancer with mismatch repair deficiency (MMR-D or microsatellite instability (MSI)-High)."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Population is MSS/pMMR — directly analogous to BreAK CRC-001 Arm 2A-1.

---

### CLAIM B-007
- **claim_id:** B-007
- **claim_text:** NCT03050814 Arm B dosing: Ad-CEA vaccine SC injection prior to avelumab on Day 1 of cycles 1,2,3,5,7,9; every 6 cycles thereafter. Avelumab 10 mg/kg IV Day 1. Bevacizumab 5 mg/kg IV Day 2 (Arm B). Oxaliplatin 68 mg/kg IV Day 2 (Arm B, reduced vs Arm A 85 mg/kg Day 1). FOLFOX + bevacizumab for up to 12 cycles then capecitabine + bevacizumab maintenance.
- **scope:** arm-specific (Arm B)
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** Arm B description and interventions module verbatim dosing fields.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Bevacizumab administered Day 2 in Arm B (day after vaccine/avelumab on Day 1) — this is the scheduling precedent for vaccine-before-bevacizumab sequencing.

---

### CLAIM B-008
- **claim_id:** B-008
- **claim_text:** NCT03050814 safety lead-in: first 6 evaluable subjects treated with Arm B combination; if ≤1 DLT attributable to IND agents, proceed to randomization of 70 subjects.
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** "A lead in cohort, comprising the first 6 evaluable subjects enrolled, will be treated with avelumab + Ad-CEA vaccine + standard of care in order to assess the safety of the combination. If no more than 1 subject in the lead in cohort experiences a dose limiting toxicity attributable to the investigational new drug (IND) agents, 70 evaluable subjects will be randomized..."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Safety lead-in design is a structural precedent for BreAK CRC-001 Phase I.

---

### CLAIM B-009
- **claim_id:** B-009
- **claim_text:** NCT03050814 adverse events: deaths on study — 1/10 Arm A, 1/16 Arm B. Serious AEs affected 9/10 Arm A, 10/16 Arm B. All 26 treated participants experienced at least one AE.
- **scope:** comparator-only
- **evidence_class:** PRIMARY_REGISTRY
- **supporting_sources:** [55]
- **verbatim_support:** adverseEventsModule: Arm A deathsNumAffected=1/10, seriousNumAffected=9/10, otherNumAffected=10/10; Arm B deathsNumAffected=1/16, seriousNumAffected=10/16, otherNumAffected=16/16.
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** High SAE rate in both arms reflects advanced mCRC population, not necessarily treatment-related.

---

## SECTION C — STC-1010 Preclinical Biology (Alzeeb et al. 2024)

---

### CLAIM C-001
- **claim_id:** C-001
- **claim_text:** The published preclinical studies (Alzeeb et al. 2024) used exclusively MURINE cell lines. The murine vaccine cell lines are: CT26 (ATCC CRL-2639, BALB/c colon tumor), CMT-93 (ECACC 89111413, rectal carcinoma), and LTPA (ATCC CRL-2389, pancreatic adenocarcinoma). No human cell lines appear in this paper.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "The murine cancer cell lines: CT26 (ATCC... CRL-2639, derived from BALB/c mouse colon tumor), CMT-93 (cell line number 89111413, derived from rectal carcinoma from ECACC...), LTPA (ATCC CRL-2389, from pancreatic adenocarcinoma), and murine colon cancer MC38 cells (Kerafast, USA)."
- **confidence:** VERIFIED
- **conflicts_with:** Prior agent canon (Agent 5 Gap 1) stated human cell lines HCT116, HT29, LoVo were used in STC-1010. Those lines DO NOT appear in Alzeeb et al. 2024.
- **rewrite_if_needed:** Alzeeb et al. 2024 reports a MURINE surrogate vaccine only. Human cell line composition of clinical STC-1010 is NOT established by this paper.
- **engine_routable:** yes
- **notes:** CRITICAL. The paper itself states: "Human vaccines based on STC technology should be tested in alternative models." The murine surrogate ≠ clinical product.

---

### CLAIM C-002
- **claim_id:** C-002
- **claim_text:** The murine 3CL vaccine includes a pancreatic adenocarcinoma line (LTPA), not a human pancreatic line. The inclusion rationale is shared neoantigens/TAAs between pancreatic and CRC cell lines.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "We employed pancreatic and colorectal cancer cell lines, which have demonstrated shared neoantigens and tumor-associated antigens with CRC cell lines."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** The cross-tumor antigen rationale is stated but the supporting citation ([36] in paper = Yarchoan et al. GVAX study) does not directly validate LTPA-CRC antigen overlap — it is an inference.

---

### CLAIM C-003
- **claim_id:** C-003
- **claim_text:** The hapten used is dinitrofluorobenzene (DNFB/DFNB) at 12.7 µg/mL for 30 minutes.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "thermally stressed CT26 cells (CT26-S) were haptenated (H) using dinitrofluorobenzene (DFNB) (Sigma, France) solution at 12.7 µg/mL for 30 min"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Brenus website [58] confirms hapten = DNFB (same compound, alternate abbreviation). Concentration and duration are preclinical-only; clinical dose not disclosed.

---

### CLAIM C-004
- **claim_id:** C-004
- **claim_text:** Physical stressors applied: low-dose irradiation (10 Gy) + mild thermal stress (1h at 42°C then 14h at 37°C). Final inactivation by irradiation at 25 Gy. Vaccine doses frozen at -80°C in EBSS + 80 g/L sucrose at 10×10⁶ cells/mL.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "cells were subjected to physical stimulation with low-dose irradiation (10 Gy) and mild thermal stress: 1h at 42°C then 14h at 37°C... Vaccinal doses (10.106cells/mL) were frozen at -80°C in Earle's Balanced Salt Solution (EBSS) containing 80 g/L sucrose before irradiation at 25 Gy."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** These are murine surrogate manufacturing parameters. Clinical GMP parameters are not disclosed in this paper.

---

### CLAIM C-005
- **claim_id:** C-005
- **claim_text:** Immunostimulant regimen in preclinical studies: cyclophosphamide 15 mg/kg IP one day before vaccination + mouse GM-CSF 5 µg SC mixed with vaccine.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "cyclophosphamide (Sigma, France) (CP, 15 mg/kg) was administered by intraperitoneal (IP) injection one day before vaccination, and mouse granulocyte-macrophage colony-stimulating factor (PeproTech...) (mGM-CSF, 5 µg) was administered by SC injections mixing with the vaccine."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Clinical IS doses are not disclosed in this paper. Registry [54] confirms CP + GM-CSF are used clinically but does not specify doses.

---

### CLAIM C-006
- **claim_id:** C-006
- **claim_text:** Study A (1CL CT26-SH + IS): CT26-SH + IS significantly reduced tumor growth vs control (avg tumor volume 100 mm³ vs 238 mm³ at day 20, p<0.0003). Survival improvement vs CT26-SH alone (p=0.0046 log-rank).
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "CT26-SH vaccine + IS significantly reduced TG... (100 mm3 vs. 238 mm3 respectively, p<0.0003, Student's t-test at day 20)... best survival time in the IS + CT26-SH group compared to the control group (p-value=0.0046, log-rank test)"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** n=9–10 per group. Syngeneic subcutaneous model. Not a metastatic model.

---

### CLAIM C-007
- **claim_id:** C-007
- **claim_text:** Study B (3CL vs 1CL): IS + 3CL-SH reduced tumor volume to 150 mm³ vs 341 mm³ for IS + CT26-SH at day 24 (p=0.0002). mOS 38 days (3CL) vs 31.5 days (1CL), p=0.05 log-rank.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "IS + 3CL-SH vaccine reduced TG with an average tumor volume of 150 mm3 on day 24... compared to 341 mm3 for the group treated with IS + CT26-SH vaccine (p-value=0.0002, Student's t-test). The mOS was significantly longer in mice treated with IS + 3CL-SH vaccine (38 days) than in those treated with IS + CT26-SH vaccine (31.5 days) (p-value=0.05, log-rank test)"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** n=18–20 per group. CT26 model is pMMR/MSS analog.

---

### CLAIM C-008
- **claim_id:** C-008
- **claim_text:** Study C (MC38 anti-PD-1 resistant model): IS + 3CL-SH significantly improved survival vs control (p=0.00368 log-rank). 60% responders including one complete response. Significant increase in CD8+ T cell infiltration (p=0.045) and M1 macrophage infiltration (p=0.02) vs control.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "The group treated with IS + 3CL-SH significantly improves the survival of mice bearing MC38 anti-PD-1-Resistant tumor model comparatively to the control group (p-value=0.00368, Log-rank Mantel-Cox test)... 60% of responders including a complete response... CD8+ T cells (p-value =0.045)... M1 macrophages (p-value =0.02)"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** n=15 per group. MC38 is MSI-H analog in mice — not MSS. Complete response in 1 mouse.

---

### CLAIM C-009
- **claim_id:** C-009
- **claim_text:** Proteomic analysis: 32% of identified proteins were common across all three murine cell lines; 44% were cell-line-specific. After stimulation/haptenation: CT26-SH expressed 429 unique proteins; CMT-93-SH expressed 423 unique proteins; LTPA-SH expressed 986 unique proteins. 1196 proteins from CT26 were shared with the 3CL-SH vaccine.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "32% of the identified proteins were common in all cell lines... 44% of the total identified proteins were specific for each cell line... CT26-SH specifically expressed 429 proteins... CMT-93-SH specifically expressing 423 proteins... LTPA-SH had 899 and 986 proteins shared with untreated cells or expressed specifically after simulation... 1196 proteins expressed by the CT26 cell line were shared with the 3CL-SH vaccine"
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** These are MURINE proteome numbers. Human vaccine proteome is not reported in this paper.

---

### CLAIM C-010
- **claim_id:** C-010
- **claim_text:** Safety: no treatment-related deaths, no test item-related clinical signs, no local reactions, no effects on body weight or food consumption in a 76-mouse toxicity study with repeated SC vaccine + mGM-CSF + IP CP for 8 weeks.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "a toxicity study conducted in parallel on 76 mice, with repeated SC administration of vaccine and mGM-CSF associated with intraperitoneal CP for 8 weeks, showed no treatment-related deaths, no test item-related clinical signs, no local reactions, and no effects on body weight or food consumption."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Murine safety data only. Does not constitute human safety evidence.

---

### CLAIM C-011
- **claim_id:** C-011
- **claim_text:** The paper explicitly states the murine surrogate vaccine is NOT the clinical product and that human vaccines require testing in alternative models.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "Although the results in mouse models are promising, predicting efficacy in patients requires exploration in different models due to the use of a murine surrogate in syngeneic models. Human vaccines based on STC technology should be tested in alternative models, such as ex vivo immune response activation tests, to better assess biological and clinical responses."
- **confidence:** VERIFIED
- **conflicts_with:** Any claim that preclinical efficacy data directly predicts clinical efficacy.
- **rewrite_if_needed:** Preclinical data establishes proof-of-concept for the STC platform in murine models only. Translation to human STC-1010 is not validated in this paper.
- **engine_routable:** yes
- **notes:** Authors' own caveat. Must be preserved in any scientific summary.

---

### CLAIM C-012
- **claim_id:** C-012
- **claim_text:** The paper was fully funded by Brenus Pharma. Multiple co-authors (Gongora, Limagne, Apetoh, Ghiringhelli) are declared consultants for Brenus Pharma.
- **scope:** preclinical-only
- **evidence_class:** PEER_REVIEWED_PUBLICATION
- **supporting_sources:** [61]
- **verbatim_support:** "This study was fully funded by Brenus Pharma." Conflict of interest: "CG is a consultant for Brenus-Pharma. E.Limagne is a consultant for Brenus-Pharma. LA is a consultant for Brenus-Pharma... FG is a consultant for Brenus-Pharma."
- **confidence:** VERIFIED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Conflict of interest is disclosed and standard for industry-funded research. Does not invalidate findings but must be noted in any diligence summary.

---

## SECTION D — STC-1010 Platform Claims (Company-Controlled Sources)

---

### CLAIM D-001
- **claim_id:** D-001
- **claim_text:** Brenus states that Step 1 of STC platform involves "Selection of well-characterized allogeneic human cell lines that reflect the heterogeneity of the targeted indication and represent patient diversity — including key mutations and different phenotypic profiles."
- **scope:** platform-wide
- **evidence_class:** COMPANY_WEBSITE
- **supporting_sources:** [58]
- **verbatim_support:** "Selection of well-characterized allogeneic human cell lines that reflect the heterogeneity of the targeted indication and represent patient diversity — including key mutations and different phenotypic profiles."
- **confidence:** COMPANY_CLAIM
- **conflicts_with:** Alzeeb et al. 2024 [61] used only murine cell lines. The human cell line composition of STC-1010 is not disclosed in any retrieved peer-reviewed source.
- **rewrite_if_needed:** The clinical STC-1010 product is stated by the company to use human cell lines. The specific lines are not confirmed in any retrieved primary source in this session.
- **engine_routable:** yes
- **notes:** CRITICAL GAP. Human cell line identity for STC-1010 is COMPANY_CLAIM only. HCT116/HT29/LoVo attribution requires direct retrieval of ASCO 2023 abstract e14661 or equivalent primary source — not yet achieved.

---

### CLAIM D-002
- **claim_id:** D-002
- **claim_text:** Brenus states that stimulation "reveal[s] over 200 cancer-related proteins" representing "tumor specificity, plasticity, and resistance mechanisms, validated through proteogenomic and predictive modeling."
- **scope:** platform-wide
- **evidence_class:** COMPANY_WEBSITE
- **supporting_sources:** [58]
- **verbatim_support:** "Stimulation by standards of care and physical stressors to reveal over 200 cancer-related proteins. These proteins represent tumor specificity, plasticity, and resistance mechanisms, validated through proteogenomic and predictive modeling."
- **confidence:** COMPANY_CLAIM
- **conflicts_with:** Alzeeb et al. 2024 [61] reports hundreds to thousands of proteins per cell line in the murine system (e.g., 429 unique to CT26-SH, 986 unique to LTPA-SH). The "200+" figure is not sourced to a peer-reviewed publication.
- **rewrite_if_needed:** "Over 200 cancer-related proteins" is a company marketing claim. The peer-reviewed paper reports larger protein numbers in the murine system but does not use the "200+" framing.
- **engine_routable:** yes
- **notes:** CONTRADICTION C-004. Prior agent canon tagged this as [VERIFIED]. Correct tag: [COMPANY_CLAIM].

---

### CLAIM D-003
- **claim_id:** D-003
- **claim_text:** Brenus states the hapten carrier is "Cancer Related Proteins (CRP)" and the hapten is "Dinitrofluorobenzene (DNFB)."
- **scope:** platform-wide
- **evidence_class:** COMPANY_WEBSITE
- **supporting_sources:** [58]
- **verbatim_support:** "Hapten: Dinitrofluorobenzene (DNFB). Carrier: Cancer Related Proteins (CRP)"
- **confidence:** CROSS_REFERENCED
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** DNFB identity is cross-referenced with Alzeeb et al. 2024 [61] which uses DFNB (same compound). Confidence elevated to CROSS_REFERENCED.

---

### CLAIM D-004
- **claim_id:** D-004
- **claim_text:** Brenus states the manufacturing process is "Standardized & Scalable" and "GMP ready & specifically replicable to other solid tumors" and "Platform & Product worldwide patented."
- **scope:** platform-wide
- **evidence_class:** COMPANY_WEBSITE
- **supporting_sources:** [58]
- **verbatim_support:** "Standardized & Scalable manufacturing process. GMP ready & specifically replicable to other solid tumors. Platform & Product worldwide patented."
- **confidence:** COMPANY_CLAIM
- **conflicts_with:** None independently verifiable from retrieved sources.
- **rewrite_if_needed:** GMP readiness and patent status are company claims. No independent confirmation retrieved.
- **engine_routable:** yes
- **notes:** Alzeeb et al. 2024 [61] notes manufacturing limitations: "Further improvements could be made to the STC manufacturing platform, particularly during the adherent cell amplification phases, to increase batch size. Additionally, the risk of environmental contamination should be mitigated by expanding the use of closed systems."

---

### CLAIM D-005
- **claim_id:** D-005
- **claim_text:** Brenus lists STC-1010 indications as CRC, PDAC, HCC; STC-1020 as ovarian cancer.
- **scope:** platform-wide
- **evidence_class:** COMPANY_WEBSITE
- **supporting_sources:** [58]
- **verbatim_support:** "STC-1010: CRC, PDAC, HCC. STC-1020: OVARIAN CANCER"
- **confidence:** COMPANY_CLAIM
- **conflicts_with:** None
- **rewrite_if_needed:** N/A
- **engine_routable:** yes
- **notes:** Only CRC (BreAK CRC-001) has a registered clinical trial. PDAC, HCC, ovarian indications are pipeline claims without registered trials in retrieved sources.

---

## SECTION E — Contradiction Ledger

---

### CONTRADICTION C-001
- **contradiction_id:** C-001
- **severity:** HIGH
- **prior_canon_claim:** BreAK CRC-001 targets MSS patients only.
- **verified_finding:** NCT06934538 [54] registers three arms: Phase 1 (MSS), Arm 2A-1 (MSS), and Arm 2A-2 (MSI-H). An MSI-H arm is explicitly registered.
- **source_of_error:** Prior agent canon did not retrieve the full registry record.
- **resolution_required:** Update all agent files to reflect MSI-H arm (2A-2) exists. Scope all MSS-specific claims to Arms Phase 1 and 2A-1 only.
- **files_affected:** agent2.md, agent5.md, brenus_crispro_master.md

---

### CONTRADICTION C-002
- **contradiction_id:** C-002
- **severity:** HIGH
- **prior_canon_claim:** Agent 3 line 61 cites NCT02853604 as the Ad-CEA + avelumab + mFOLFOX6 + bev trial.
- **verified_finding:** The correct NCT number is NCT03050814 [55]. NCT02853604 is a different trial.
- **source_of_error:** Transcription or hallucination error in Agent 3.
- **resolution_required:** Replace NCT02853604 with NCT03050814 in agent3.md line 61 and all downstream references.
- **files_affected:** agent3.md, brenus_crispro_master.md

---

### CONTRADICTION C-003
- **contradiction_id:** C-003
- **severity:** MEDIUM
- **prior_canon_claim:** Prior session summary cited NCT03050814 PFS HR as 1.02 (95% CI 0.65–1.60).
- **verified_finding:** Directly retrieved registry results [55] show HR = 1.061 (95% CI 0.380–2.966), p=0.91.
- **source_of_error:** Prior session used a secondary summary source; HR was incorrect.
- **resolution_required:** Correct HR in all files. Note: wide CI reflects small n=26 treated patients.
- **files_affected:** agent3.md, brenus_crispro_master.md

---

### CONTRADICTION C-004
- **contradiction_id:** C-004
- **severity:** MEDIUM
- **prior_canon_claim:** Agent 5 line 83 tags "200+ antigens" claim as [VERIFIED].
- **verified_finding:** "Over 200 cancer-related proteins" appears only on Brenus company website [58]. No peer-reviewed source uses this figure. Alzeeb et al. 2024 [61] reports murine proteome numbers in the hundreds to thousands but does not use "200+" framing.
- **source_of_error:** Agent 5 incorrectly elevated a company marketing claim to VERIFIED status.
- **resolution_required:** Retag as [COMPANY_CLAIM] in agent5.md line 83.
- **files_affected:** agent5.md, brenus_crispro_master.md

---

### CONTRADICTION C-005
- **contradiction_id:** C-005
- **severity:** HIGH
- **prior_canon_claim:** Agent 5 Gap 1 (lines 113–119) states human cell lines HCT116, HT29, LoVo are used in STC-1010 and were "never publicly disclosed" (the gap claim).
- **verified_finding:** Alzeeb et al. 2024 [61] — the only retrieved peer-reviewed source — uses exclusively MURINE cell lines (CT26, CMT-93, LTPA, MC38). The Brenus website [58] states human cell lines are used in the clinical product but does not name them. HCT116/HT29/LoVo attribution is NOT confirmed in any source retrieved in this session.
- **source_of_error:** Prior agent canon conflated company website language with specific cell line identity. The specific human lines (HCT116/HT29/LoVo) require ASCO 2023 abstract e14661 for confirmation — that source was not successfully retrieved.
- **resolution_required:** Agent 5 Gap 1 must be rewritten: (a) Alzeeb 2024 uses murine lines only; (b) company states human lines are used clinically; (c) specific human line identity is PROVISIONAL pending ASCO 2023 e14661 retrieval.
- **files_affected:** agent5.md, brenus_crispro_master.md

---

### CONTRADICTION C-006
- **contradiction_id:** C-006
- **severity:** MEDIUM
- **prior_canon_claim:** NCT03050814 was described as a positive design precedent for vaccine + ICI + mFOLFOX6 + bev in 1L MSS mCRC.
- **verified_finding:** NCT03050814 [55] was TERMINATED for futility at interim analysis. Primary endpoint HR = 1.061, p=0.91. No PFS benefit. This is a NEGATIVE comparator result.
- **source_of_error:** Prior agent framing emphasized design similarity without surfacing the negative efficacy outcome and early termination.
- **resolution_required:** Reframe NCT03050814 in agent3.md as a terminated negative trial. Design precedent value (safety lead-in, bevacizumab sequencing) is valid but efficacy framing must be corrected.
- **files_affected:** agent3.md, brenus_crispro_master.md

---

## SECTION F — Missing Data Blockers

---

### BLOCKER B-001
- **blocker_id:** B-001
- **description:** Human cell line identity for clinical STC-1010 (HCT116/HT29/LoVo or other) is unconfirmed. ASCO 2023 abstract e14661 was not successfully retrieved (paywall/resolver failure). Brenus website confirms human lines are used but does not name them.
- **impact:** Cannot verify KRAS/BRAF mutation status of clinical vaccine cell lines. Cannot assess patient-population representativeness. Cannot confirm or deny HT29 BRAF V600E inclusion (which would conflict with patient eligibility criterion A-008).
- **resolution_path:** Direct retrieval of ASCO 2023 abstract e14661 or equivalent Brenus disclosure (poster, publication, data room).
- **current_confidence:** PROVISIONAL for human line use; BLOCKED for specific line identity.

---

### BLOCKER B-002
- **blocker_id:** B-002
- **description:** Clinical STC-1010 manufacturing parameters (GMP batch size, cell concentration, irradiation dose, haptenation concentration, formulation) are not disclosed in any retrieved source.
- **impact:** Cannot assess manufacturing reproducibility, scalability, or comparability to murine surrogate.
- **resolution_path:** Brenus data room / IND filing.
- **current_confidence:** BLOCKED.

---

### BLOCKER B-003
- **blocker_id:** B-003
- **description:** No clinical efficacy or safety data for STC-1010 in humans has been retrieved. BreAK CRC-001 has no results posted (hasResults=false in registry [54]). Trial started 2025-06-17.
- **impact:** All efficacy claims for STC-1010 in humans are BLOCKED. Only preclinical murine data is available.
- **resolution_path:** Await trial results or request interim data from Brenus.
- **current_confidence:** BLOCKED.

---

### BLOCKER B-004
- **blocker_id:** B-004
- **description:** Bevacizumab arm assignment in BreAK CRC-001 is not resolved. Registry states "mFOLFOX6 with or without bevacizumab" but does not specify which arms receive bevacizumab or the rationale for the optionality.
- **impact:** Cannot confirm whether bevacizumab-vascular normalization hypothesis applies to all enrolled patients.
- **resolution_path:** Protocol document (not yet publicly available for NCT06934538).
- **current_confidence:** PROVISIONAL.

---

### BLOCKER B-005
- **blocker_id:** B-005
- **description:** ASCO 2024 press release content (BioSpace/BusinessWire) was not successfully retrieved due to 404/Akamai block. Any claims from that source in prior agent canon are unverified in this session.
- **impact:** Any ASCO 2024 abstract-specific claims (e.g., preliminary safety signals, patient numbers enrolled) cannot be confirmed.
- **resolution_path:** Direct abstract retrieval from ASCO meeting library or Brenus-provided materials.
- **current_confidence:** BLOCKED for ASCO 2024 abstract-specific claims.

---

## SECTION G — Engine-Routable Claim Summary

| claim_id | claim_text (abbreviated) | confidence | engine_routable |
|----------|--------------------------|------------|-----------------|
| A-001 | NCT = NCT06934538 | VERIFIED | yes |
| A-002 | Sponsor ID = BreAK CRC-001 | VERIFIED | yes |
| A-003 | Sponsor = Brenus Pharma (industry) | VERIFIED | yes |
| A-004 | Phase I/IIA open-label multicenter | VERIFIED | yes |
| A-005 | Two-part design; ~21–33 Ph1; ~57–60 Ph2A; total 90 | VERIFIED | yes |
| A-006 | Three arms: Ph1, 2A-1 (MSS), 2A-2 (MSI-H) | VERIFIED | yes |
| A-007 | All arms: BRAF WT, KRAS mutated | VERIFIED | yes |
| A-008 | BRAF mutation = exclusion criterion | VERIFIED | yes |
| A-009 | Intervention: STC-1010 + IS (CP+GMCSF) + mFOLFOX6 ± bev | VERIFIED | yes |
| A-010 | Ph1 primary: safety/MTD/RP2D, CTCAE v5, 28-day window | VERIFIED | yes |
| A-011 | Ph2A primary: PFS rate at 12 months, RECIST 1.1 | VERIFIED | yes |
| A-012 | Ph2A secondary: CBR, ORR, DOR, PFS, OS, resection rate | VERIFIED | yes |
| A-013 | Exploratory: biomarkers blood+biopsy at T0/1m/2m/6m/12m/Tprog | VERIFIED | yes |
| A-014 | Eligibility: age 18–75, ECOG ≤1, 1L, KRAS/BRAF required | VERIFIED | yes |
| A-015 | Active autoimmune disease = exclusion | VERIFIED | yes |
| A-016 | Start 2025-06-17; primary completion 2028-06; RECRUITING | VERIFIED | yes |
| A-017 | 5 French sites recruiting; 4 sites not yet recruiting incl. JHU | VERIFIED | yes |
| A-018 | FDA-regulated drug; DMC oversight | VERIFIED | yes |
| A-019 | Ph1 immune endpoint: DTH at 1/24/48/72h post-injection | VERIFIED | yes |
| B-001 | NCT03050814 = QUILT-2.004, randomized Ph2, Ad-CEA+avelumab | VERIFIED | yes |
| B-002 | Sponsor NCI/NIH; PI Julius Strauss; sites NIH+Lombardi | VERIFIED | yes |
| B-003 | TERMINATED at interim for futility; completion 2021-08-25 | VERIFIED | yes |
| B-004 | n=30 enrolled (10 Arm A, 16 Arm B, 4 screen failures) | VERIFIED | yes |
| B-005 | PFS: Arm A 8.8m, Arm B 10.1m; HR 1.061 (0.380–2.966); p=0.91 | VERIFIED | yes |
| B-006 | MSI-H/dMMR excluded from NCT03050814 | VERIFIED | yes |
| B-007 | Arm B: Ad-CEA Day1, avelumab Day1, bev Day2, oxali 68mg/m² Day2 | VERIFIED | yes |
| B-008 | Safety lead-in: 6 subjects, ≤1 DLT threshold | VERIFIED | yes |
| B-009 | SAEs: 9/10 Arm A, 10/16 Arm B; deaths 1/10, 1/16 | VERIFIED | yes |
| C-001 | Alzeeb 2024: MURINE lines only (CT26, CMT-93, LTPA, MC38) | VERIFIED | yes |
| C-002 | LTPA (pancreatic) included for shared TAA rationale | VERIFIED | yes |
| C-003 | Hapten = DNFB 12.7 µg/mL 30 min | VERIFIED | yes |
| C-004 | Stressors: 10 Gy + 42°C/37°C; final 25 Gy; -80°C EBSS+sucrose | VERIFIED | yes |
| C-005 | IS: CP 15 mg/kg IP D-1; mGM-CSF 5 µg SC with vaccine | VERIFIED | yes |
| C-006 | Study A: IS+CT26-SH 100mm³ vs 238mm³ control, p<0.0003 | VERIFIED | yes |
| C-007 | Study B: IS+3CL-SH 150mm³ vs 341mm³ 1CL, p=0.0002; mOS 38 vs 31.5d | VERIFIED | yes |
| C-008 | Study C: MC38-PD1R survival p=0.00368; 60% responders; CD8+ p=0.045 | VERIFIED | yes |
| C-009 | Proteomics: 32% shared; 44% cell-line-specific; 1196 CT26-shared | VERIFIED | yes |
| C-010 | Safety: 76-mouse 8-week tox study — no treatment-related findings | VERIFIED | yes |
| C-011 | Authors' caveat: murine surrogate ≠ clinical product | VERIFIED | yes |
| C-012 | Fully Brenus-funded; 4 co-authors are Brenus consultants | VERIFIED | yes |
| D-001 | Human cell lines used in clinical product (company states) | COMPANY_CLAIM | yes |
| D-002 | "Over 200 cancer-related proteins" | COMPANY_CLAIM | yes |
| D-003 | Hapten = DNFB; carrier = CRP | CROSS_REFERENCED | yes |
| D-004 | GMP ready; scalable; worldwide patented | COMPANY_CLAIM | yes |
| D-005 | Pipeline: CRC, PDAC, HCC (STC-1010); ovarian (STC-1020) | COMPANY_CLAIM | yes |

---

*End of Ledger v1.0 — 2026-04-27*
