# CrisPRO Multi-Agent Framework: Foghorn Therapeutics Target Package
## Instructions for the Plumber Agent + Agent 8D Pipeline

**Classification:** INTERNAL OPERATING INSTRUCTIONS  
**Target:** Foghorn Therapeutics, Inc. (Nasdaq: FHTX)  
**Point of Contact:** Steven Bellon, PhD — Chief Scientific Officer  
**Date Issued:** 2026-05-02  
**Framework Version:** v2.0 (Foghorn Adaptation of Brenus/BreAK CRC-001 playbook)

---

## SECTION 0 — FRAMEWORK OVERVIEW

This document defines the complete operating instructions for a two-agent pipeline:

1. **The Plumber** — Intelligence gatherer, enricher, and evidence wall builder. Does all dirty work: scraping, literature mining, trial auditing, lead enrichment, and structured data packaging. Produces clean, scored, admissibility-tagged artifacts. Never interprets. Never scores fit. Never drafts outreach.

2. **The PhD Matrix Agent (you)** — Receives the Plumber's packaged evidence wall. Runs the 8D vector scoring. Produces the CrisPRO fit assessment, the graveyard pipeline analysis, and the outreach brief for Steven Bellon. Never touches raw data. Never scrapes. Never enriches leads.

3. **Agent 8D** — Receives the PhD Matrix Agent's scored evidence wall. Runs the 8-dimensional admissibility and fit-gap analysis. Produces the final scored vector output and the NDA request list. Operates identically to the Brenus/BreAK CRC-001 8D protocol.

**The Plumber plumbs. The PhD Matrix scores. Agent 8D adjudicates.**

---

## SECTION 1 — TARGET INTELLIGENCE BRIEF (Pre-loaded for Plumber)

The Plumber receives this brief as ground truth. Do not re-derive. Do not contradict without sourcing.

### 1.1 Company Profile
- **Company:** Foghorn Therapeutics, Inc. (Nasdaq: FHTX)
- **HQ:** 99 Coolidge Ave, Suite 500, Watertown, MA 02472
- **Phone:** 617-586-3100
- **Stage:** Clinical-stage; one asset in Phase 1 (FHD-909), rest pre-clinical
- **Platform:** Gene Traffic Control® — chromatin regulatory system target ID and validation
- **Mechanism class:** Paralog synthetic lethality (SL) via BAF complex modulation
- **Cash:** $158.9M as of Dec 31, 2025 + $50M raise Jan 2026 → runway into H1 2028
- **Net loss 2025:** $74.3M
- **Collaboration revenue 2025:** $30.9M (Lilly-driven)
- **Key partner:** Eli Lilly — 50/50 U.S. co-dev/co-commercialization on SMARCA2 inhibitor + degrader + 1 undisclosed target + 3 discovery programs
- **Stockholders' deficit:** ($108.5M) — technically insolvent on book value; entirely Lilly-dependent for non-dilutive revenue

### 1.2 Pipeline — Full Map

| Program | Target | Modality | Indication | Stage | Rights |
|---------|--------|----------|------------|-------|--------|
| FHD-909 (LY4050784) | SMARCA2 (BRM) | Oral small molecule inhibitor (allosteric) | SMARCA4-mutant NSCLC (primary); other SMARCA4-mutant solid tumors | Phase 1 (dose escalation, first patient Oct 2024) | 50/50 U.S. w/ Lilly |
| Partnered (undisclosed) | Undisclosed | Undisclosed | Undisclosed | Pre-clinical | Lilly partnership |
| Selective SMARCA2 degrader | SMARCA2 | Degrader | SMARCA4-mutant cancers | Pre-clinical | 50/50 U.S. w/ Lilly |
| Selective CBP degrader (FHT-171 / CBPd-171) | CBP (CREBBP) | Degrader (LAI formulation) | ER+ breast cancer; EP300-mutant solid tumors | Pre-clinical → IND-enabling 2026 | Foghorn-owned |
| Selective EP300 degrader | EP300 | Degrader (VHL-based) | MM, DLBCL, other heme | Pre-clinical → IND-enabling 2026 | Foghorn-owned |
| Selective ARID1B degrader | ARID1B | Degrader (VHL + CRBN-based, oral) | ARID1A-mutant cancers (endometrial, gastric, bladder, NSCLC) | Discovery → in vivo POC 2026 | Foghorn-owned |
| 3 Discovery Programs | Undisclosed | Undisclosed | Undisclosed | Discovery | Lilly partnership |

### 1.3 Key Scientific Thesis (Foghorn's Own Words)
- All programs exploit **paralog synthetic lethality**: when one paralog (e.g., SMARCA4, ARID1A, EP300) is mutated/lost in cancer, the tumor becomes dependent on the remaining paralog (SMARCA2, ARID1B, CBP)
- This is **exactly the scientific language CrisPRO speaks** — SL prediction, paralog dependency mapping, patient stratification by mutation status
- Steven Bellon personally presented the AACR 2026 oral: *"Leveraging paralog relationships for targeting chromatin modulators in cancer: ARID1B and SMARCA2 (FHD-909)"*

### 1.4 Identified Pain Points (Pre-loaded Intelligence)
- **FHD-909 Phase 1:** No clinical efficacy data public yet. Dose escalation ongoing. SMARCA4-mutant NSCLC is ~10% of NSCLC — small, hard-to-enrich population. No validated companion diagnostic. No biomarker pre-specification published.
- **Combination strategy:** Preclinical synergy with pembrolizumab and KRAS inhibitors shown, but no clinical combo data. Front-line combo studies contingent on Phase 1 dose escalation success — Lilly decision gate.
- **Wholly-owned pipeline (CBP, EP300, ARID1B):** All pre-clinical. No Lilly backstop. IND-enabling 2026 = cash burn without revenue. Three programs competing for internal resources.
- **ARID1B:** ARID1A is mutated in ~5% of all solid tumors — small addressable population per indication. No clinical precedent for ARID1B targeting. Degrader oral bioavailability unproven in vivo.
- **Stockholders' deficit:** Book-value insolvent. Entirely dependent on Lilly milestones + capital markets. $50M raise at 30% premium to closing = dilutive desperation signal.
- **No patient stratification tool:** Foghorn has the biology but no computational infrastructure to identify which SMARCA4-mutant patients will respond, which ARID1A-mutant tumors have the highest ARID1B dependency, or how to design enrichment strategies for Phase 2.

---

## SECTION 2 — PLUMBER AGENT INSTRUCTIONS

### 2.1 Plumber Mission
Build the Foghorn evidence wall. Produce 6 structured artifacts (see Section 2.3). Tag every claim with admissibility tier. Flag every gap. Do not interpret. Do not score. Do not draft outreach. Package and hand off.

### 2.2 Plumber Source Hierarchy (Admissibility Tiers)

**Tier 1 — Admissible as-is (cite directly):**
- Peer-reviewed publications (PubMed PMID required)
- SEC filings (10-K, 8-K, proxy — cite filing date + accession number)
- ClinicalTrials.gov registry entries (NCT number required)
- FDA labels / IND summaries (public)

**Tier 2 — Admissible with caveat tag [CONF-ABS] or [PRESS-REL]:**
- Conference abstracts (AACR, ASCO, ASH, ESMO) — cite abstract number
- Company press releases — cite date + URL
- Investor presentations — cite date + slide number if available

**Tier 3 — Flag as [UNVERIFIED], do not use in scoring:**
- News articles without primary source
- Analyst reports without disclosed methodology
- Social media / LinkedIn posts
- Any claim without traceable source

**Permanent Rule:** If a claim exists only in Tier 2 or Tier 3, it CANNOT be used to score a vector above 3/5. It can only support a provisional score with caveat tag.

### 2.3 Plumber Deliverables — 6 Required Artifacts

---

#### ARTIFACT PL-01: Foghorn Pipeline Graveyard Audit
**File:** `foghorn_evidence_wall/pl_01_pipeline_graveyard.md`

**Purpose:** Identify every program in the Foghorn pipeline that has failed, been deprioritized, or is at high risk of failure. This is the "graveyard" — the evidence that Foghorn needs CrisPRO.

**Required fields per program:**
```
Program ID: [internal label e.g. FG-001]
Drug/Code: [name]
Target: [molecular target]
Indication: [tumor type + biomarker]
Last Known Stage: [Discovery / Pre-clinical / Phase 1 / Phase 2 / Terminated]
Failure Mode (if applicable): [M=Mechanism / P=Patients / A=Architecture / U=Unknown]
Primary Failure Evidence: [PMID or NCT or filing citation]
Admissibility Tier: [1 / 2 / 3]
Caveat Tag: [CONF-ABS / PRESS-REL / UNVERIFIED / NONE]
CrisPRO Relevance: [1-2 sentences: what CrisPRO would have caught]
```

**Programs to audit (minimum):**
- FHD-286 (dual SMARCA2/4 inhibitor — terminated; replaced by FHD-909)
- FHD-909 Phase 1 — active but flag all open risks
- Any prior programs discontinued before 2024 (check SEC 10-K risk factors and pipeline history)
- Competitor programs in SMARCA2/SMARCA4 space that failed (for comparative context)

**Plumber must search:**
- PubMed: "FHD-286" + "SMARCA2" + "SMARCA4" + "BAF complex inhibitor" clinical
- ClinicalTrials.gov: Foghorn Therapeutics sponsor search
- SEC EDGAR: FHTX 10-K 2022, 2023, 2024, 2025 — pipeline discontinuation disclosures
- AACR/ASCO/ASH abstract archives: FHD-286, FHD-909, Foghorn

---

#### ARTIFACT PL-02: Comparator Trial Index — Paralog SL Space
**File:** `foghorn_evidence_wall/pl_02_comparator_trial_index.csv`

**Purpose:** Map every clinical trial in the SMARCA2/SMARCA4/BAF complex/chromatin SL space. Identify what has been tried, what failed, and what the patient stratification gaps are.

**Required columns:**
```
NCT_ID | Drug | Target | Sponsor | Phase | Indication | Biomarker_Selection | 
Enrollment | Primary_Endpoint | Status | Key_Result | Failure_Mode | 
Admissibility_Tier | Source_PMID_or_NCT | Notes
```

**Minimum programs to include:**
- FHD-909 (NCT — Plumber must retrieve from ClinicalTrials.gov)
- FHD-286 (prior Foghorn program — retrieve NCT if exists)
- Tazemetostat (EZH2 — chromatin SL comparator; approved)
- Iniparib / olaparib / niraparib in BRCA-mutant tumors (canonical SL comparator)
- Any SMARCA4-mutant NSCLC trials (search ClinicalTrials.gov: SMARCA4 + NSCLC)
- ARID1A-mutant trials (search ClinicalTrials.gov: ARID1A + endometrial/gastric)
- Inobrodib (dual CBP/EP300 inhibitor — Foghorn's benchmark competitor)

**Plumber must search:**
- ClinicalTrials.gov API v2: `query.term=SMARCA4&query.term=SMARCA2&query.term=BAF+complex`
- PubMed: "SMARCA4 mutant NSCLC clinical trial" + "ARID1A synthetic lethal clinical"
- ClinicalTrials.gov: sponsor = "C4 Therapeutics" + "Relay Therapeutics" + "Prelude Therapeutics" (SMARCA2 competitors)

---

#### ARTIFACT PL-03: Biomarker Stratification Gap Matrix
**File:** `foghorn_evidence_wall/pl_03_biomarker_gap_matrix.csv`

**Purpose:** For each Foghorn program, document what biomarker pre-specification exists, what is missing, and what CrisPRO would need to fill the gap.

**Required columns:**
```
Program | Target | Biomarker_Used | Biomarker_Source | 
Companion_Dx_Status | Patient_Enrichment_Strategy | 
Co-mutation_Capture | Resistance_Biomarker | 
Admissibility_Tier | Gap_Description | CrisPRO_Fill
```

**Key gaps to document (pre-loaded intelligence — Plumber must verify and source):**
- FHD-909: SMARCA4 mutation as sole selection criterion — is co-mutation landscape (STK11, KEAP1, KRAS) captured? What % of SMARCA4-mutant NSCLC patients also carry KRAS mutations (relevant to FHD-909 + KRAS inhibitor combo)?
- FHD-909: No validated companion diagnostic — what assay is being used in Phase 1?
- ARID1B degrader: ARID1A mutation prevalence by tumor type — what is the co-mutation landscape that predicts ARID1B dependency depth?
- CBP degrader: EP300 mutation co-occurrence with ER+ breast cancer — what fraction of ER+ breast cancers carry EP300 mutations vs. are CBP-lineage-dependent by other mechanisms?
- EP300 degrader: IMiD resistance in MM — what genomic features define the IMiD-resistant MM population that EP300 degraders can rescue?

**Plumber must search:**
- PubMed: "SMARCA4 NSCLC co-mutation STK11 KEAP1" + "SMARCA4 mutation frequency NSCLC"
- PubMed: "ARID1A mutation frequency endometrial gastric bladder"
- PubMed: "EP300 mutation ER+ breast cancer" + "CBP EP300 lineage dependence"
- cBioPortal: SMARCA4 mutation co-occurrence analysis (TCGA NSCLC cohort)

---

#### ARTIFACT PL-04: Lead Enrichment Table
**File:** `foghorn_evidence_wall/pl_04_lead_enrichment.csv`

**Purpose:** Take the existing AACR 2026 Lead Audit Tracker (provided) and enrich every lead with verified contact data, current role confirmation, and CrisPRO fit scoring inputs. Also expand with new leads identified during Foghorn research.

**Input:** The 51-row AACR 2026 Lead Audit Tracker (all sheets)

**Required enrichment per lead:**
```
Lead_ID | Name | Title | Company | Email_Verified | LinkedIn_Verified | 
Phone_Verified | Current_Role_Confirmed | Score_10 | Priority | 
Foghorn_Connection | AACR_2026_Presentation | Pain_Point_Verified | 
CrisPRO_Fit_Rationale | Outreach_Status | Next_Action | 
New_Lead_Flag [Y/N] | Source_of_New_Lead
```

**Specific enrichment tasks:**

1. **Steven Bellon (Row 10, CMO-level lead #12):** Already in tracker. Enrich with:
   - Confirm current title: CSO, Foghorn Therapeutics
   - Confirm AACR 2026 oral presentation title and abstract number
   - Confirm email: steven.bellon@foghorntx.com
   - Confirm phone: 617-586-3100 (company main)
   - Flag: Score should be 9.5/10 — highest priority target given CSO role + SL expertise + public company pressure

2. **New leads to add from Foghorn org chart:**
   - Adrian Gottschalk (CEO, Foghorn) — strategic partnership decision-maker
   - Ryan Maynard (CFO, Foghorn, appointed Feb 2026) — budget authority
   - Any VP/Director of Translational Medicine or Clinical Development at Foghorn (search LinkedIn + SEC proxy)

3. **Competitor leads to add:**
   - Prelude Therapeutics (SMARCA2 competitor) — CSO/CMO
   - C4 Therapeutics (degrader platform) — CSO/CMO
   - Relay Therapeutics (chromatin) — CSO/CMO
   - Inobrodib (CG-806 / Constellation Pharma / MorphoSys) — any surviving clinical team

4. **Cross-reference existing tracker leads against Foghorn:**
   - Check if any existing tracker leads (AACR01–AACR09, INV01–INV06) have Foghorn connections (publications, collaborations, board seats)

**Plumber must search:**
- LinkedIn: Foghorn Therapeutics employees — VP/Director level and above
- SEC proxy statement (DEF 14A): board members, executive compensation
- PubMed: co-authors on Foghorn publications (Bellon et al., Collins et al., Khalil et al.)

---

#### ARTIFACT PL-05: Financial Vulnerability Dossier
**File:** `foghorn_evidence_wall/pl_05_financial_vulnerability.md`

**Purpose:** Document Foghorn's financial pressure points that create urgency for a CrisPRO engagement. This is the leverage map — not for exploitation, but to understand the decision-making timeline and budget authority.

**Required sections:**

**5.1 Cash Runway Analysis**
- Cash as of Dec 31, 2025: $158.9M
- Jan 2026 raise: +$50M at $6.71/share (30% premium to close)
- Runway: H1 2028 (stated)
- Annual burn rate: ~$74M net loss 2025 (declining from $86.6M in 2024)
- Implied runway: ~28-30 months from Jan 2026
- **Plumber must verify:** Current FHTX stock price and market cap (Yahoo Finance or SEC)
- **Plumber must flag:** Warrant overhang — 50% coverage at $13.42 and 50% at $20.13 — dilution risk if stock rises

**5.2 Lilly Dependency Analysis**
- Collaboration revenue 2025: $30.9M (100% from Lilly)
- Deferred revenue balance: $249.2M — future Lilly milestone payments
- **Critical vulnerability:** Lilly has decision gates on FHD-909 combo studies and the undisclosed partnered program. If Lilly exercises opt-out or deprioritizes, Foghorn loses its primary non-dilutive revenue stream.
- **Plumber must verify:** Any public statements from Lilly about SMARCA2 program priority (Lilly earnings calls, pipeline updates)

**5.3 Pipeline Concentration Risk**
- Only 1 clinical asset (FHD-909) — no Phase 2 data yet
- 3 wholly-owned programs all pre-clinical — all burning cash without Lilly backstop
- ARID1B in vivo POC not yet achieved — highest risk program
- **Plumber must flag:** If FHD-909 Phase 1 shows safety signal or insufficient efficacy, Foghorn has no clinical fallback

**5.4 Decision Timeline**
- FHD-909 Phase 1 dose escalation: ongoing (first patient Oct 2024) — Phase 1 data likely 2026-2027
- CBP/EP300 IND-enabling: 2026 — IND filing likely 2027
- ARID1B in vivo POC: 2026
- **CrisPRO engagement window:** NOW — before Phase 1 data readout, when patient stratification strategy is still malleable

---

#### ARTIFACT PL-06: NDA Request List (Foghorn-Specific)
**File:** `foghorn_evidence_wall/pl_06_nda_requests.md`

**Purpose:** Enumerate the data items that Foghorn would need to provide for a full CrisPRO engagement. This becomes the basis of the NDA/CDA conversation with Steven Bellon.

**Format (mirror Brenus NDA format):**
```
NDA-FG-[##]: [Data Item]
Priority: [P1 / P2 / P3]
Blocking Vector: [which 8D vector this unlocks]
Rationale: [why CrisPRO needs this]
Likely Custodian: [who at Foghorn holds this data]
Public Proxy Available: [Y/N — if Y, cite source]
```

**Minimum NDA items to generate:**

- NDA-FG-01: FHD-909 Phase 1 dose escalation data package (DLTs, PK, preliminary efficacy signals, patient biomarker profiles) — **P1, blocks D7 (First-in-Human Signal)**
- NDA-FG-02: SMARCA4 mutation co-mutation landscape from enrolled Phase 1 patients (STK11, KEAP1, KRAS status) — **P1, blocks D3 (Biomarker Pre-specification)**
- NDA-FG-03: Companion diagnostic assay specification for SMARCA4 mutation detection in Phase 1 — **P1, blocks D3**
- NDA-FG-04: ARID1B degrader in vivo efficacy data (tumor regression, PK/PD) — **P2, blocks D6 (Antigen/Target Architecture)**
- NDA-FG-05: CBPd-171 IND-enabling toxicology package — **P2, blocks D5 (Combination Timing)**
- NDA-FG-06: EP300 degrader MM patient selection criteria (IMiD-resistance biomarkers) — **P2, blocks D3**
- NDA-FG-07: Gene Traffic Control® platform output for ARID1A-mutant tumor dependency scoring — **P1, blocks D1 (Target Biology Depth)**
- NDA-FG-08: Lilly collaboration scope — which 3 discovery programs, what indications — **P3, blocks D2 (Trial Design Intelligence)**
- NDA-FG-09: FHD-909 + pembrolizumab combo preclinical data package (full, not press-release summary) — **P2, blocks D5**
- NDA-FG-10: SMARCA4-mutant patient prevalence by tumor type from Foghorn's internal database — **P2, blocks D4 (Patient Stratification)**

---

### 2.4 Plumber Quality Gates

Before handing off to the PhD Matrix Agent, the Plumber must confirm:

- [ ] All 6 artifacts exist and are non-empty
- [ ] Every claim in PL-01 and PL-02 has a Tier 1 or Tier 2 source citation
- [ ] Every Tier 2 claim is tagged [CONF-ABS] or [PRESS-REL]
- [ ] Every gap in PL-03 has a "CrisPRO_Fill" entry
- [ ] PL-04 has Steven Bellon row fully enriched with verified contact data
- [ ] PL-05 has current stock price and market cap (not stale)
- [ ] PL-06 has minimum 10 NDA items with priority and blocking vector
- [ ] No Tier 3 claims appear in any artifact without [UNVERIFIED] tag
- [ ] File paths follow convention: `foghorn_evidence_wall/pl_0X_[name].md` or `.csv`
- [ ] All artifacts committed to `fjkiani/Brenus` under `foghorn_evidence_wall/` directory

---

## SECTION 3 — PhD MATRIX AGENT INSTRUCTIONS

### 3.1 PhD Matrix Mission
Receive the 6 Plumber artifacts. Run the 8D vector pre-scoring. Produce the CrisPRO fit assessment and the graveyard pipeline analysis. Hand off to Agent 8D with a fully structured evidence wall.

### 3.2 Input Requirements
The PhD Matrix Agent will NOT proceed unless all 6 Plumber artifacts are present and the Plumber quality gates are confirmed passed.

### 3.3 PhD Matrix Deliverables — 3 Required Artifacts

---

#### ARTIFACT PHD-01: Graveyard Pipeline Analysis
**File:** `foghorn_evidence_wall/phd_01_graveyard_analysis.md`

**Purpose:** Synthesize PL-01 (pipeline audit) + PL-02 (comparator trials) into a structured failure-mode analysis. Identify the specific decisions that led to each failure and map them to CrisPRO capabilities.

**Required structure per failed/at-risk program:**
```
Program: [name]
Failure Mode (Primary): [M / P / A / U]
Failure Mode (Contributing): [M / P / A / U]
Key Decision That Failed: [1 sentence]
Evidence: [PMID or NCT or filing]
What CrisPRO Would Have Caught: [1-2 sentences, specific]
Vector Impacted: [D1–D8]
Admissibility: [Tier 1 / 2 / 3]
```

**Mandatory programs to analyze:**
1. FHD-286 (dual SMARCA2/4 inhibitor) — terminated; why?
2. FHD-909 Phase 1 — active but map open risks as "at-risk" entries
3. Inobrodib (dual CBP/EP300 inhibitor) — competitor; why is Foghorn betting against it?
4. Any SMARCA4-mutant NSCLC trial that failed (from PL-02)
5. Any ARID1A-mutant trial that failed (from PL-02)

**PhD Matrix must NOT:**
- Invent failure modes not supported by PL-01 or PL-02
- Assign failure modes to programs with only Tier 3 sources
- Use the word "likely" without a caveat tag [PROVISIONAL]

---

#### ARTIFACT PHD-02: 8D Vector Pre-Score Sheet
**File:** `foghorn_evidence_wall/phd_02_vector_prescores.md`

**Purpose:** Pre-score all 8 vectors using the Plumber's evidence. This is the PhD Matrix Agent's primary analytical output. Agent 8D will adjudicate and finalize.

**Vector Definitions (identical to Brenus/BreAK CRC-001 protocol):**

| Vector | Dimension | Scoring Anchor |
|--------|-----------|----------------|
| D1 | Target Biology Depth | How well does the public evidence establish the SL dependency? |
| D2 | Trial Design Intelligence | How well-designed is the clinical program for the target population? |
| D3 | Biomarker Pre-specification | Are patient selection biomarkers pre-specified and validated? |
| D4 | Patient Stratification | Is the enrolled population the right one? |
| D5 | Combination Timing | Is the combination strategy (if any) mechanistically justified and timed correctly? |
| D6 | Target Architecture | Is the target modality (inhibitor vs. degrader) matched to the biology? |
| D7 | First-in-Human Signal | Is there clinical proof-of-concept? |
| D8 | Conflict Resolution | Are there known conflicts (antigen mismatch, off-target, co-mutation) that undermine the thesis? |

**Scoring Rubric (0–5 per vector):**
- 5: Tier 1 evidence, no gaps, no conflicts
- 4: Tier 1 evidence, minor gaps, no conflicts
- 3: Tier 1 or 2 evidence, moderate gaps or one unresolved conflict
- 2: Tier 2 evidence only, or major gap, or unresolved conflict
- 1: Tier 3 evidence only, or multiple conflicts
- 0: No evidence, or evidence directly contradicts the thesis

**Required format per vector:**
```
Vector: D[N] — [Name]
Pre-Score: [0–5]
Status: [CLEAN / DEGRADED / BLOCKED]
  - CLEAN: score ≥ 4, no conflicts
  - DEGRADED: score 2–3, gaps present
  - BLOCKED: score 0–1, or unresolvable conflict without NDA data
Primary Evidence: [PMID / NCT / filing citation]
Admissibility Tier: [1 / 2 / 3]
Caveat Tag: [CONF-ABS / PRESS-REL / UNVERIFIED / NONE]
Gap Description: [what is missing]
NDA Item Required: [NDA-FG-## or NONE]
CrisPRO Opportunity: [what CrisPRO adds here, 1-2 sentences]
```

**PhD Matrix scoring guidance for Foghorn (pre-loaded):**

- **D1 (Target Biology):** SMARCA2/SMARCA4 paralog SL is well-established in literature. Expect score 4–5 if Plumber retrieves ≥3 Tier 1 publications. Key papers: Helming et al. 2014 (Nature Genetics), Hoffman et al. 2014 (Nature Genetics), Papillon et al. 2021.
- **D2 (Trial Design):** FHD-909 Phase 1 is SMARCA4-mutant enriched — good design. But co-mutation landscape (STK11, KEAP1) not captured in public protocol. Expect score 3 unless PL-03 shows co-mutation capture.
- **D3 (Biomarker):** No companion diagnostic validated. No biomarker pre-specification in public protocol. Expect score 2 — DEGRADED. NDA-FG-02 and NDA-FG-03 required to unblock.
- **D4 (Patient Stratification):** SMARCA4-mutant NSCLC is ~10% of NSCLC — correct population. But no liver met equivalent stratification for solid tumors. Expect score 3.
- **D5 (Combination Timing):** Preclinical combo data with pembro and KRAS inhibitors exists but is press-release-level. No clinical combo data. Expect score 2 — DEGRADED.
- **D6 (Target Architecture):** Allosteric inhibitor of SMARCA2 ATPase is mechanistically sound. Degrader program adds depth. Expect score 4.
- **D7 (First-in-Human Signal):** Phase 1 ongoing, first patient Oct 2024. No efficacy data public. Expect score 1 — BLOCKED. NDA-FG-01 required.
- **D8 (Conflict Resolution):** No known antigen mismatch equivalent. But SMARCA2 is expressed in normal tissues — selectivity window is the key conflict. Allosteric mechanism provides selectivity. Expect score 3–4 pending toxicity data.

---

#### ARTIFACT PHD-03: CrisPRO Fit Assessment + Outreach Brief
**File:** `foghorn_evidence_wall/phd_03_crispro_fit_brief.md`

**Purpose:** Synthesize the graveyard analysis and vector pre-scores into a CrisPRO fit assessment and a structured outreach brief for Steven Bellon.

**Required sections:**

**3.1 Executive Fit Score**
- Apply PATH A formula: `fit = clip((p · t) / ‖t‖₂, 0, 1)`
  - `p` = vector of 8 pre-scores (D1–D8), normalized 0–1
  - `t` = target vector (all 1s for maximum fit)
  - Report: raw dot product, normalized fit score, and qualitative tier (HIGH ≥0.7 / MEDIUM 0.4–0.69 / LOW <0.4)

**3.2 Top 3 CrisPRO Value Propositions for Foghorn**
- Specific to Foghorn's pipeline — not generic CrisPRO marketing
- Each must reference a specific program, a specific gap, and a specific CrisPRO capability
- Must be sourced from PHD-01 or PHD-02

**3.3 Graveyard Headline**
- 1–2 sentence summary of the most compelling failure-mode evidence
- Must be Tier 1 or Tier 2 sourced
- This is the opening hook for the Steven Bellon email

**3.4 Outreach Brief for Steven Bellon**
- Subject line (3 options, A/B/C)
- Opening hook (1 sentence — reference his AACR 2026 oral presentation specifically)
- Core value proposition (2–3 sentences — specific to SMARCA2/ARID1B SL + patient stratification gap)
- Proposed next step (NDA/CDA + 60-day POC offer)
- Tone: peer-to-peer scientist, not vendor pitch. Bellon is a PhD scientist who speaks SL fluently.
- Do NOT use: "AI-powered", "revolutionary", "game-changing", "disruptive"
- DO use: "paralog dependency mapping", "co-mutation landscape", "enrichment strategy", "biomarker pre-specification"

**3.5 Risk Flags**
- List any claims in PHD-01 or PHD-02 that are PROVISIONAL or BLOCKED
- List any NDA items that are P1 priority (must be resolved before full engagement)
- Flag Lilly partnership dependency: any CrisPRO engagement on FHD-909 may require Lilly consent

---

## SECTION 4 — AGENT 8D INSTRUCTIONS

### 4.1 Agent 8D Mission
Receive PHD-01, PHD-02, PHD-03 from the PhD Matrix Agent. Run the full 8D admissibility adjudication. Produce the final scored vector output and the final NDA request list. Operate identically to the Brenus/BreAK CRC-001 8D protocol (see `phd_evidence_wall/agent_8d_instructions.md` for full protocol).

### 4.2 Agent 8D Inputs Required
- PHD-02 (vector pre-scores) — primary input
- PHD-01 (graveyard analysis) — context
- PL-06 (NDA request list) — gap map
- PL-03 (biomarker gap matrix) — D3 adjudication
- `phd_evidence_wall/8d_admissibility_key.md` — permanent rules
- `phd_evidence_wall/8d_readiness_audit.md` — precedent

### 4.3 Agent 8D Adjudication Rules (Foghorn-Specific Additions)

These rules are ADDITIVE to the permanent rules in `8d_admissibility_key.md`:

**FG-RULE-01:** FHD-909 Phase 1 efficacy claims are BLOCKED until Tier 1 publication or SEC-filed clinical data package. Press releases alone cannot score D7 above 1.

**FG-RULE-02:** Lilly collaboration scope (undisclosed programs) cannot be scored. Any vector that depends on undisclosed Lilly program data is automatically BLOCKED.

**FG-RULE-03:** SMARCA4 mutation frequency claims must be sourced from TCGA or peer-reviewed epidemiology. Company-stated frequencies (e.g., "up to 10% of NSCLC") require Tier 1 verification before use in D4 scoring.

**FG-RULE-04:** Preclinical combo data (FHD-909 + pembro, FHD-909 + KRAS inhibitor) is [CONF-ABS] or [PRESS-REL] only. Cannot score D5 above 2 without Tier 1 publication.

**FG-RULE-05:** Financial vulnerability data (cash runway, net loss, Lilly dependency) is Tier 1 (SEC filing). Can be used in PHD-03 outreach brief but NOT in vector scoring.

### 4.4 Agent 8D Output Format

**File:** `foghorn_evidence_wall/8d_final_vector_scores.md`

```
=== FOGHORN THERAPEUTICS — 8D FINAL VECTOR SCORES ===
Date: [YYYY-MM-DD]
Agent: 8D
Input: PHD-02 v[X], PL-06 v[X]

D1 | Target Biology Depth     | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D2 | Trial Design Intelligence | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D3 | Biomarker Pre-specification| Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D4 | Patient Stratification    | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D5 | Combination Timing        | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D6 | Target Architecture       | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D7 | First-in-Human Signal     | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]
D8 | Conflict Resolution       | Score: [0–5] | Status: [CLEAN/DEGRADED/BLOCKED]

COMPOSITE FIT SCORE (PATH A): [0.00–1.00]
FIT TIER: [HIGH / MEDIUM / LOW]

BLOCKED VECTORS: [list]
NDA ITEMS REQUIRED TO UNBLOCK: [list NDA-FG-## items]
PROVISIONAL CLAIMS: [list with caveat tags]
```

---

## SECTION 5 — LEAD ENRICHMENT FRAMEWORK (REPEATABLE)

This section defines the repeatable framework the Plumber uses for ALL leads in the tracker — not just Foghorn. Apply to every row in the AACR 2026 Lead Audit Tracker.

### 5.1 Per-Lead Enrichment Protocol

For each lead, the Plumber executes in order:

**Step 1 — Identity Verification**
- Confirm current title and company (LinkedIn + company website)
- Flag any role changes since tracker was built
- Confirm email format (company domain pattern)
- Confirm phone (company main line if direct not available)

**Step 2 — Publication Mining**
- PubMed search: `[Last Name] [First Initial] AND [company OR institution]`
- Extract: 3 most recent publications, key topics, co-authors
- Flag: any publications that directly reference CrisPRO-relevant topics (SL, biomarker, trial design, patient stratification)

**Step 3 — Conference Footprint**
- Search AACR 2026 abstract database for lead's name
- Search ASCO 2025/2026 abstract database
- Extract: presentation title, abstract number, key data presented
- Flag: any data that reveals a pain point CrisPRO addresses

**Step 4 — Company Intelligence**
- For pharma/biotech leads: retrieve pipeline page, recent press releases, SEC filings (if public)
- For academic leads: retrieve lab page, current grants (NIH Reporter), recent publications
- For investor leads: retrieve portfolio page, recent investments in oncology/SL space

**Step 5 — Pain Point Mapping**
- Map identified pain points to CrisPRO capabilities using this taxonomy:
  - **PP-01:** Patient stratification gap (no companion Dx, no biomarker pre-specification)
  - **PP-02:** Combination strategy uncertainty (which combo, what timing)
  - **PP-03:** Trial design enrichment (wrong population, no enrichment strategy)
  - **PP-04:** Pipeline de-risking (program at risk, needs computational validation)
  - **PP-05:** Target identification (new SL targets needed for pipeline expansion)
  - **PP-06:** Resistance prediction (acquired resistance mechanisms unknown)

**Step 6 — Enrichment Output**
- Update PL-04 with all verified fields
- Add `Pain_Point_Code` column: [PP-01 through PP-06, comma-separated]
- Add `Outreach_Priority_Rationale`: 1 sentence explaining why this lead is high/medium/low priority NOW
- Add `Foghorn_Connection`: [Y/N] — does this lead have a known connection to Foghorn (co-author, collaborator, investor, board)?

### 5.2 New Lead Identification Protocol

For each target company the PhD Matrix Agent identifies (Foghorn + future targets), the Plumber must:

1. **Org chart mining:** LinkedIn company page → filter by "Science" + "Medical" + "Clinical" → extract VP and above
2. **Publication co-author mining:** For each key publication from the target company, extract all co-authors and their current affiliations
3. **Conference co-presenter mining:** For each AACR/ASCO presentation from the target company, extract all co-authors
4. **Board and SAB mining:** SEC proxy (DEF 14A) → Scientific Advisory Board members → add as leads with `New_Lead_Flag=Y`
5. **Investor mining:** SEC 13F filings → institutional investors in target company → cross-reference with INV01–INV06 in tracker

**New lead scoring criteria:**
- Score ≥ 8.0: CSO/CMO/CEO of target company + direct pain point alignment
- Score 7.0–7.9: VP/Director level + clear pain point
- Score 6.0–6.9: Senior Scientist / Principal Scientist + indirect pain point
- Score < 6.0: Do not add to tracker

---

## SECTION 6 — GITHUB COMMIT PROTOCOL

All artifacts must be committed to `fjkiani/Brenus` under the `foghorn_evidence_wall/` directory.

**Commit message format:**
```
[PLUMBER] Add [artifact name] — Foghorn evidence wall v[X]
[PHD] Add [artifact name] — Foghorn 8D pre-score v[X]
[8D] Add final vector scores — Foghorn engagement v[X]
```

**Branch:** `main`
**Remote:** `https://***REDACTED_GITHUB_PAT***@github.com/fjkiani/Brenus.git`

**Commit order:**
1. Plumber commits PL-01 through PL-06 (can be batched)
2. PhD Matrix commits PHD-01 through PHD-03 (after Plumber quality gates pass)
3. Agent 8D commits 8d_final_vector_scores.md (after PhD Matrix hand-off)

---

## SECTION 7 — REPEATABLE FRAMEWORK CHECKLIST

This is the master checklist for applying this framework to ANY new target company (not just Foghorn). The Plumber uses this as a run-card.

```
TARGET: [Company Name]
POC: [Name, Title, Email]
DATE INITIATED: [YYYY-MM-DD]

PLUMBER PHASE:
[ ] PL-01: Pipeline Graveyard Audit — COMPLETE
[ ] PL-02: Comparator Trial Index — COMPLETE
[ ] PL-03: Biomarker Stratification Gap Matrix — COMPLETE
[ ] PL-04: Lead Enrichment Table — COMPLETE
[ ] PL-05: Financial Vulnerability Dossier — COMPLETE
[ ] PL-06: NDA Request List — COMPLETE
[ ] Quality gates passed (all 10 checks)
[ ] All artifacts committed to GitHub

PHD MATRIX PHASE:
[ ] PHD-01: Graveyard Analysis — COMPLETE
[ ] PHD-02: 8D Vector Pre-Score Sheet — COMPLETE
[ ] PHD-03: CrisPRO Fit Assessment + Outreach Brief — COMPLETE
[ ] PATH A fit score computed
[ ] All artifacts committed to GitHub

AGENT 8D PHASE:
[ ] 8D Final Vector Scores — COMPLETE
[ ] Blocked vectors identified
[ ] NDA items prioritized
[ ] Final fit tier assigned
[ ] Committed to GitHub

OUTREACH PHASE (PhD Matrix → you):
[ ] Steven Bellon email drafted (3 subject line options)
[ ] LinkedIn connect message drafted
[ ] NDA/CDA conversation opener drafted
[ ] 60-day POC proposal outlined
```

---

## SECTION 8 — PROHIBITIONS (ALL AGENTS)

1. **Never fabricate data.** If a source does not exist, flag as [MISSING] and add to NDA list.
2. **Never upgrade a Tier 2 source to Tier 1.** Conference abstracts are always [CONF-ABS].
3. **Never score a BLOCKED vector above 1.** Blocked means blocked.
4. **Never use PATH B formula.** PATH A is the only approved formula: `fit = clip((p·t) / ‖t‖₂, 0, 1)`. PATH B is prohibited.
5. **Never draft outreach without a PHD-03 brief.** The Plumber does not draft. Agent 8D does not draft. Only the PhD Matrix Agent drafts, and only after PHD-02 is complete.
6. **Never commit to GitHub without quality gate confirmation.** Partial artifacts corrupt the evidence wall.
7. **Never use "AI-powered", "revolutionary", "game-changing", or "disruptive"** in any outreach material.
8. **Never disclose the internal scoring methodology** (PATH A formula, 8D vectors) in outreach materials. These are internal tools only.
9. **Never contact a lead before PHD-03 is complete.** No cold outreach without a fit brief.
10. **Never score Lilly undisclosed programs.** They are BLOCKED by FG-RULE-02.

---

*End of Foghorn Plumber + Agent 8D Instructions — v2.0*
*Framework: CrisPRO Multi-Agent Intelligence Pipeline*
*Issued: 2026-05-02*
