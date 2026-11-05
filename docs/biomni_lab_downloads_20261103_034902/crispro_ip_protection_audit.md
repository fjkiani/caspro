# CrisPRO IP Protection Audit
**Prepared for:** Fahad Kiani, Founder & CEO, CrisPRO  
**Engagement:** Robin Kim (Consultant) — IC Engagement Package  
**Date:** June 30, 2026  
**Classification:** ATTORNEY-CLIENT PRIVILEGED — WORK PRODUCT  

---

## Executive Summary

**Bottom line: The contracts do NOT adequately protect CrisPRO's IP estate.**

Of the 10 assets analyzed across 6 asset classes, 5 are rated CRITICAL risk, 4 are HIGH risk, and 1 is MEDIUM risk. The five most dangerous gaps are:

1. **EscapeMap vectors not explicitly enumerated** in CIAA §1.2 — the platform's most sophisticated quantitative outputs have no explicit trade secret designation
2. **LATIFY formula not explicitly enumerated** — the formula is mathematically standard; without enumeration, a DTSA claim is weak
3. **No publication restriction** — Kim can publish ZEB1→ITGAV biology and destroy trade secret protection for BRIEF-1 without breaching any contract provision
4. **"Material communications" undefined** — the non-solicitation's coverage of pharma and academic counterparties is legally uncertain
5. **Competitive moat is ~70–80% reconstructible from Kim's retained knowledge** — no residuals clause, no knowledge-use restriction, no non-compete on general analytical methodology

**Five Priority 1 fixes must be implemented before Kim signs.** Four additional fixes should be negotiated. One improvement is achievable if Kim's counsel agrees.

---

## Scope and Methodology

**Scope:** CrisPRO's IP estate only (not Kim's personal IP). Full enforcement analysis (3 departure scenarios). Fix recommendations with draft contract language.

**Assets analyzed:** 10 assets across 6 classes — BRIEF programs (4), EscapeMap vectors (2), LATIFY formula (1), computational ranker methodology (1), trial data and clinical relationships (1), competitive moat (1).

**Contract documents reviewed:** All 16 documents in the Kim engagement package, including CIAA, ICA, RSPA, Non-Compete and Non-Solicitation Agreement, and all Schedules.

**Governing law:** Delaware (entity); Utah (employment/non-compete provisions under Utah Code §34-51-201); federal (DTSA — Defend Trade Secrets Act, 18 U.S.C. §§ 1836 et seq.).

---

## Part I: Asset-by-Asset Protection Matrix

### Class 1: BRIEF Programs

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| BRIEF-1: ZEB1→ITGAV (delta=−0.7184, FDR=0.001203) | **CRITICAL** | No publication restriction; trade secret only; no patent | CIAA §1.2(a) — explicitly enumerated |
| BRIEF-2: PTEN-null→ITGAV | **HIGH** | Computational hypothesis; weak trade secret; independently derivable | CIAA §1.2(b) — explicitly enumerated |
| BRIEF-3: ZEB1+PD-1 (r=0.050, p=0.780) | **MEDIUM** | Statistically insignificant; not novel; weakest trade secret | CIAA §1.2(c) — explicitly enumerated |
| BRIEF-4: SPP1→NRF2 (delta=−0.7326, FDR=8×10⁻⁶) | **HIGH** | No patent; pharma could file patent first after Kim tip-off | CIAA §1.2(d) — explicitly enumerated |

**Class 1 Assessment:** The BRIEF programs are the best-protected assets in the contract — they are explicitly enumerated in CIAA §1.2, which creates a clear evidentiary record for DTSA claims. However, explicit enumeration alone is insufficient because: (a) there is no publication restriction preventing Kim from publishing the underlying biology; (b) there is no patent application pending on any BRIEF program; and (c) BRIEF-2 and BRIEF-3 are computational hypotheses derivable from public data, making independent development defenses available to competitors.

**BRIEF-1 is the most valuable and most vulnerable.** The ZEB1→ITGAV delta=−0.7184, FDR=0.001203 result is DEAL_READY — it is the asset most likely to generate licensing revenue. It is also the asset most at risk from Kim publishing academic work on ZEB1→ITGAV biology, which would destroy the trade secret protection for the hypothesis without Kim ever disclosing a CrisPRO document.

---

### Class 2: EscapeMap Analytical Vectors

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| OV ZEB1 vectors (HR=1.4803, HR=1.5247, HR=2.500) | **CRITICAL** | NOT explicitly enumerated in CIAA §1.2 | General Confidential Information (CIAA §1.1) only |
| GBM/M2 vectors (M2 OS=34.4 months, p=9.52×10⁻⁵) | **HIGH** | Not explicitly enumerated; GBM PERMANENTLY_CLOSED | General Confidential Information (CIAA §1.1) only |

**Class 2 Assessment:** The EscapeMap vectors are CrisPRO's most sophisticated quantitative outputs — they represent hundreds of hours of computational work on proprietary datasets. They are NOT explicitly enumerated in CIAA §1.2. They are covered only by the general Confidential Information definition in CIAA §1.1, which is the weakest form of trade secret protection.

The specific values at risk:
- OV ZEB1 continuous Cox (bevacizumab arm OS): HR=1.4803, 95% CI [1.1188, 1.9586], p=0.006042, c-statistic=0.6444
- OV ZEB1 multivariable Cox: HR=1.5247, 95% CI [1.1256, 2.0652], p=0.006447
- OV ZEB1 median-split (bevacizumab arm OS): HR=2.500, 95% CI [1.322, 4.727], log-rank p=0.0036, FDR=0.0499
- OV HIF1A (bevacizumab arm OS): HR=2.245, 95% CI [1.172, 4.300], p=0.0147
- M2 stratum beneficial median OS: 34.4 months (95% CI 32.7–38.8), p=9.52×10⁻⁵

A DTSA claim for these values requires CrisPRO to prove they qualify as trade secrets under the general definition — a higher evidentiary burden than for explicitly enumerated assets. A competitor who independently recomputes these values from the same public datasets (GOG-0218, ICON7, GLASS consortium) has a complete defense.

---

### Class 3: LATIFY Formula and Governance Record

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| LATIFY formula: fit = clip((p·t)/‖t‖₂, 0, 1) | **CRITICAL** | Not enumerated; mathematically standard; governance decisions not enumerated | General Confidential Information (CIAA §1.1) only |

**Class 3 Assessment:** The LATIFY formula is not explicitly enumerated in CIAA §1.2. The formula itself — a normalized dot-product clipped to [0,1] — is a standard mathematical operation. A competitor who independently implements the same formula has a complete defense to a DTSA claim.

The more valuable and more vulnerable elements are the governance decisions: the PATH A formula approval (signed 2026-04-28), the DL-07 quarantine designation, and the PC-02 permanent downgrade designation. These governance decisions tell a competitor exactly where CrisPRO's platform is unreliable — which is arguably more valuable competitive intelligence than the formula itself. None of these governance decisions are enumerated in CIAA §1.2.

**The governance record gap is the most dangerous element of Class 3.** Kim knows that DL-07 (DDR=0.983) is publication-blocking and that PC-02 is permanently downgraded. He can advise a competitor on CrisPRO's platform weaknesses without disclosing any document — just by describing what he observed. The contract has no provision that explicitly restricts this.

---

### Class 4: Computational Ranker Methodology

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| Drug-repurposing / target-identification methodology | **HIGH** | Residuals gap; reconstructible from memory; no residuals clause | Reserved Field exclusive license (CIAA §8.3(b)) + general CI |

**Class 4 Assessment:** The Reserved Field exclusive license (CIAA §8.3(b)) is the strongest IP provision in the contract for this asset class — it covers the full computational oncology methodology and applies to Kim's pre-existing IP as well as Inventions developed during the engagement. However, it has a fatal weakness: it applies to Inventions (defined outputs, discoveries, or creations) but NOT to retained knowledge. Kim can walk out the door with CrisPRO's entire analytical framework in his head and apply it to a competitor's pipeline without creating a single "Invention" that triggers the assignment or exclusive license provisions.

---

### Class 5: Trial Data and Clinical Relationships

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| Pharma/academic counterparty relationships (BMS, Merck, Sanofi, Pfizer; MD Anderson, MSK, Dana-Farber) | **CRITICAL** | "Material communications" undefined; Schedule 10-C blank; solicitation vs. contact ambiguity | Non-Compete §§3.3–3.5 + CIAA §1.2 enumeration |

**Class 5 Assessment:** The pharma and academic counterparties are explicitly enumerated in CIAA §1.2, which is meaningful protection. The non-solicitation provisions (Non-Compete §§3.3–3.5) prohibit Kim from soliciting these counterparties for 12 months post-termination. However, three structural gaps undermine this protection:

1. **"Material communications" is undefined.** The non-solicitation covers "Solicited Counterparties" — defined as counterparties with whom CrisPRO has had "material communications." Without a definition, CrisPRO cannot prove which counterparties qualify.

2. **Schedule 10-C is blank.** Kim's pre-existing relationships with academic medical centers (from his University of Utah Chief of Transplant role) are not listed. CrisPRO cannot prove which relationships are pre-existing (and therefore not protected) vs. developed during the engagement (and therefore protected).

3. **Solicitation vs. professional contact.** The non-solicitation covers "solicitation" — a legal term of art meaning an active request for business. It does NOT cover general professional contact, conference networking, or academic collaboration. Kim can attend ASCO, ESMO, and SITC and interact with Merck and MD Anderson representatives without breaching the non-solicitation.

---

### Class 6: Competitive Moat

| Asset | Risk | Primary Gap | Contract Coverage |
|---|---|---|---|
| 5-gate enrichment, 25+ trial failure taxonomy, fit-gap methodology | **CRITICAL** | ~70–80% reconstructible from memory; no non-compete on general framework; no residuals clause | General Confidential Information (CIAA §1.1) only |

**Class 6 Assessment:** CrisPRO's competitive moat is almost entirely reconstructible from Kim's retained knowledge. The moat consists of four layers:

**Layer 1: Enumerated Trade Secrets (CIAA §1.2) — PARTIALLY PROTECTED.** The BRIEF program values and counterparty names are explicitly enumerated. This is the strongest protection.

**Layer 2: Reserved Field Exclusive License (CIAA §8.3(b)) — STRONG ON PAPER, WEAK IN PRACTICE.** Applies to Inventions, not retained knowledge.

**Layer 3: Non-Compete (BRIEF Programs Only) — NARROW AND TIME-LIMITED.** Covers BRIEF programs for 6 months. Does not cover the methodology, EscapeMap approach, LATIFY framework, or competitive moat.

**Layer 4: General Confidential Information (CIAA §1.1) — WEAKEST PROTECTION.** Catch-all for non-enumerated assets. Subject to independent development defense and implied retained-knowledge right.

**What Kim can reconstruct from memory without accessing any CrisPRO document:**
- The 5-gate composite enrichment hypothesis (a clinical framework, not a document)
- The trial failure taxonomy (based on published trial results)
- The contradiction-aware stratification logic (a methodological approach)
- The 8D mechanism-alignment framework (a clinical reasoning structure)
- The general direction of the BRIEF programs (ZEB1, PTEN, SPP1, NRF2 — all published targets)
- The general approach to biomarker-driven patient stratification
- The specific weaknesses in CrisPRO's data (DL-07 QUARANTINED, PC-02 PERMANENTLY DOWNGRADED)

**What Kim CANNOT reconstruct from memory:**
- The specific delta/FDR values for BRIEF-1 and BRIEF-4
- The specific HR values and confidence intervals for the EscapeMap vectors
- The specific contents of the grounding register (38 rows of specific evidence classifications)

**Bottom line:** Kim can reconstruct approximately 70–80% of CrisPRO's competitive moat from retained knowledge. The contract protects the remaining 20–30% (specific quantitative outputs) through trade secret enumeration — but only for the BRIEF program values, not the EscapeMap vectors or LATIFY formula.

---

## Part II: Moat Integrity and Residuals Risk

### The Residuals Problem

The contract has no residuals clause. This is the single most dangerous gap for CrisPRO's moat.

A "residuals clause" in a standard NDA permits the consultant to use retained knowledge — general knowledge, skills, experience, and methodologies retained in unaided memory — even if that knowledge was developed or refined during the engagement. The absence of a residuals clause does NOT mean Kim cannot use retained knowledge. It means the contract is SILENT on the question. Courts in most jurisdictions (including Delaware) recognize an implied right to use retained knowledge — the "inevitable disclosure" doctrine is not recognized in Delaware, and courts are reluctant to enforce non-disclosure agreements against retained knowledge absent explicit contractual language.

**CrisPRO needs the opposite of a standard residuals clause: a knowledge-use restriction.** This is a provision that explicitly restricts Kim's use of retained knowledge for competing purposes during the non-compete period. It is aggressive and Kim's counsel will push back — but it is the correct protection for CrisPRO's moat.

### Moat Reconstructibility Quantification

| Moat Element | Reconstructible from Memory? | Protection Level |
|---|---|---|
| 5-gate composite enrichment hypothesis | YES — clinical framework | None (general CI only) |
| 25+ trial failure taxonomy | YES — based on published trials | None (general CI only) |
| Contradiction-aware stratification logic | YES — methodological approach | None (general CI only) |
| 8D mechanism-alignment framework | YES — clinical reasoning structure | None (general CI only) |
| BRIEF program target directions (ZEB1, PTEN, SPP1, NRF2) | YES — published targets | Partial (non-compete on BRIEF programs) |
| Biomarker-driven patient stratification approach | YES — general methodology | None (general CI only) |
| Platform weaknesses (DL-07, PC-02) | YES — observed during engagement | None (no competitive intelligence restriction) |
| BRIEF-1 delta/FDR values (−0.7184, 0.001203) | NO — specific computed outputs | Strong (CIAA §1.2 enumeration) |
| BRIEF-4 delta/FDR values (−0.7326, 8×10⁻⁶) | NO — specific computed outputs | Strong (CIAA §1.2 enumeration) |
| EscapeMap HR values (1.4803, 1.5247, 2.500) | NO — specific computed outputs | Weak (general CI only) |
| LATIFY formula (fit = clip((p·t)/‖t‖₂, 0, 1)) | PARTIALLY — standard math | Weak (general CI only) |
| Grounding register (38 rows) | NO — specific evidence classifications | Weak (general CI only) |

**Estimated moat reconstructibility: 70–80%.** The 20–30% that is NOT reconstructible (specific quantitative outputs) is protected by CIAA §1.2 enumeration for BRIEF programs only. The EscapeMap vectors and LATIFY formula are in the unprotected zone.

---

## Part III: Trial Data and Clinical Relationship Protection

### What the Contract Protects

The CIAA enumerates specific pharma counterparties (BMS, Merck, Sanofi, Pfizer) and academic counterparties (MD Anderson, MSK, Dana-Farber) as trade secrets. The non-solicitation provisions (Non-Compete §§3.3–3.5) prohibit Kim from soliciting these counterparties for 12 months post-termination for purposes related to Competing Activity.

### The Three Structural Gaps

**Gap 1: "Material Communications" Is Undefined**

The non-solicitation covers "Solicited Counterparties" — defined as counterparties with whom CrisPRO has had "material communications." The contract does not define "material communications." A cold email from CrisPRO to a Merck BD executive may or may not qualify. A one-page deck sent to a Sanofi licensing team may or may not qualify. If CrisPRO cannot prove "material communications," the counterparty is not a "Solicited Counterparty" and Kim can approach them freely.

**Gap 2: Schedule 10-C Is Blank**

Kim has pre-existing relationships with academic medical centers from his University of Utah Chief of Transplant role. These relationships are NOT listed on Schedule 10-C (which is blank). The contract states that failure to complete Schedule 10-C is "deemed a representation that no pre-existing relationships exist." This cuts both ways: Kim loses his carve-out protection, but CrisPRO also cannot prove which relationships are pre-existing vs. developed during the engagement.

**Gap 3: Solicitation vs. Professional Contact**

The non-solicitation covers "solicitation" — a legal term of art meaning an active request for business. It does NOT cover general professional contact, conference networking, academic collaboration, or social interaction. Kim can attend ASCO, ESMO, and SITC conferences and interact with Merck, BMS, and MD Anderson representatives without breaching the non-solicitation — as long as he does not actively pitch a competing program.

### The BreAK CRC-001 Trial Data Gap

The BreAK CRC-001 trial (NCT06934538) is a public clinical trial. Its design, endpoints, enrollment criteria, and biomarker strategy are public record. Kim can discuss the public trial design without breaching the CIAA. The non-public elements — CrisPRO's internal analysis of the trial, the biomarker biology map, the fit-gap assessment — are protected as Confidential Information. But Kim's clinical expertise about MSS CRC immunotherapy (which he had before the engagement) is not protected.

**The practical risk:** Kim knows CrisPRO's internal assessment of BreAK CRC-001's weaknesses (signal dilution risks, bevacizumab scheduling tension, KRAS/BRAF population heterogeneity). He can use this knowledge to advise a competitor on how to design a better trial — without ever disclosing a CrisPRO document. This is the residuals problem applied to trial data.

---

## Part IV: Full Enforcement Realism — 3 Departure Scenarios

### Scenario A: Kim Joins a ZEB1-Focused Oncology AI Company

**Facts:** Kim is terminated (or resigns) and joins OncAI Corp, a competing oncology AI company developing a ZEB1-based synthetic lethality program targeting NSCLC brain metastases.

| Enforcement Mechanism | Strength | Key Weakness |
|---|---|---|
| Non-Compete (Non-Compete §2.2) | MODERATE | Covers BRIEF programs only; Kim can advise on general methodology; 6-month ceiling; litigation may outlast the non-compete period |
| DTSA Trade Secret Misappropriation | STRONG (if specific values disclosed) | Must prove Kim disclosed specific enumerated values, not just worked on similar program; EscapeMap vectors and LATIFY formula not enumerated |
| Power of Attorney (ICA §6.7) | WEAK | Designed for cooperative IP assignment; requires court intervention against resisting party |

**Scenario A Verdict: MODERATE enforcement capability.** The non-compete provides a 6-month window to seek injunctive relief on BRIEF programs. The DTSA provides strong protection for explicitly enumerated values if Kim discloses them. But Kim can advise OncAI Corp on general methodology, trial design, and biomarker strategy without triggering either provision — and that is where most of the moat value leaks.

---

### Scenario B: Kim Starts a Competing Venture

**Facts:** Kim is terminated and starts KimAI Inc., an oncology AI company targeting ZEB1-based synthetic lethality. He raises seed funding from investors he met through CrisPRO's BD process.

| Enforcement Mechanism | Strength | Key Weakness |
|---|---|---|
| Non-Compete (Non-Compete §2.2) | MODERATE | 6-month ceiling; may not apply to Kim's own company; after expiry, Kim can pursue any BRIEF program |
| Non-Solicitation of Investors (Non-Compete §3.4) | MODERATE | "Material communications" undefined; Kim has personal investor relationships not covered |
| Reserved Field Exclusive License (CIAA §8.3(b)) | WEAK in practice | Applies to Inventions, not retained knowledge; complex evidentiary burden |
| DTSA | STRONG (if specific values disclosed) | Same weakness as Scenario A |

**Scenario B Verdict: WEAK-to-MODERATE enforcement capability. This is the most dangerous scenario for CrisPRO.** A competing venture is harder to enjoin than employment at a competitor. The non-compete may not apply to Kim's own company. The investor non-solicitation has the "material communications" gap. The Reserved Field exclusive license is theoretically powerful but practically difficult to enforce against retained knowledge. After the non-compete expires (6–12 months), Kim is free to compete directly on any BRIEF program.

---

### Scenario C: Kim Shares Pipeline with a Pharma Counterparty

**Facts:** Kim is terminated and, at an ASCO conference, describes CrisPRO's BRIEF-1 program (ZEB1→ITGAV, delta=−0.7184, FDR=0.001203) to a Merck oncology BD executive and suggests Merck pursue this axis independently.

| Enforcement Mechanism | Strength | Key Weakness |
|---|---|---|
| DTSA Trade Secret Misappropriation | VERY STRONG | Must prove Kim disclosed specific values, not just general hypothesis; Merck's independent development defense |
| CIAA §2.1 Non-Disclosure (breach of contract) | STRONG | Damages difficult to quantify pre-commercialization |
| Non-Solicitation (Non-Compete §3.3) | MODERATE | Solicitation vs. conversation distinction is fact-intensive |
| Injunctive Relief Against Merck | MODERATE | Courts reluctant to enjoin large pharma from research programs |

**Scenario C Verdict: STRONG enforcement capability IF Kim disclosed the specific enumerated values.** The DTSA claim is clear and the damages are quantifiable (lost licensing revenue from BRIEF-1). The weakness is proving what Kim actually said — conference conversations are rarely documented.

**Recommended countermeasure:** Implement a "canary" strategy — include one unique, non-public data point in each BD package that Kim reviews. If that specific value appears in a competitor's materials, CrisPRO can prove the source without relying on witness testimony.

---

## Part V: Ranked Fix Recommendations with Draft Contract Language

### Priority 1 — CRITICAL (Must Implement Before Kim Signs)

---

#### Fix 1: Expand CIAA §1.2 Trade Secret Enumeration

**Problem:** The EscapeMap HR values, LATIFY formula, and governance decisions are not explicitly enumerated as trade secrets. Explicit enumeration is the strongest protection under DTSA.

**Add to CIAA §1.2:**

> "(e) EscapeMap Analytical Outputs. The following quantitative analytical outputs of the Company's EscapeMap platform, including all associated confidence intervals, p-values, effect sizes, and dataset identifiers:
> (i) OV ZEB1 continuous Cox proportional hazards analysis (bevacizumab arm OS): HR=1.4803, 95% CI [1.1188, 1.9586], p=0.006042, c-statistic=0.6444;
> (ii) OV ZEB1 multivariable Cox analysis: HR=1.5247, 95% CI [1.1256, 2.0652], p=0.006447;
> (iii) OV ZEB1 median-split analysis (bevacizumab arm OS): HR=2.500, 95% CI [1.322, 4.727], log-rank p=0.0036, FDR=0.0499;
> (iv) OV HIF1A analysis (bevacizumab arm OS): HR=2.245, 95% CI [1.172, 4.300], p=0.0147;
> (v) M2 stratum beneficial median OS: 34.4 months (95% CI 32.7–38.8), p=9.52×10⁻⁵;
> (vi) GBM ZEB1 GLASS consortium analysis: delta=−0.34, p=0.000184, Cohen's d=−0.31;
> and all derivative analyses, subgroup analyses, and sensitivity analyses derived from the foregoing.
>
> (f) LATIFY Scoring Formula and Governance Record. The Company's proprietary fit-scoring formula: fit = clip((p·t) / ‖t‖₂, 0, 1), where p is the program vector and t is the target vector, together with all associated governance decisions, including but not limited to: (i) the PATH A formula approval (signed 2026-04-28); (ii) the DL-07 quarantine designation; (iii) the PC-02 permanent downgrade designation; (iv) all vector version assignments and associated delta values; and (v) all output reliability classifications.
>
> (g) Platform Governance and Quality-Control Records. All internal quality-control designations, output reliability classifications, quarantine decisions, and downgrade decisions relating to the Company's analytical platform, including but not limited to the grounding register (38 rows as of the Effective Date) and the capability map (11 capabilities, 4 tiers as of the Effective Date)."

---

#### Fix 2: Add a Knowledge-Use Restriction (Anti-Residuals Clause)

**Problem:** The contract is silent on retained knowledge. Courts imply a right to use retained knowledge. CrisPRO needs to explicitly restrict the USE of retained knowledge for competing purposes during the non-compete period.

**Add to CIAA §2:**

> "§2.7 Knowledge-Use Restriction. Notwithstanding any other provision of this Agreement, Consultant agrees that, during the Non-Compete Period (as defined in the Non-Competition and Non-Solicitation Agreement), Consultant shall not use Residual Knowledge — defined as general knowledge, skills, experience, and methodologies retained in unaided memory that were developed or refined during the engagement — to: (a) develop, design, or implement any analytical framework, scoring methodology, or target-identification pipeline that competes with the Company's Reserved Field activities; or (b) advise, consult for, or assist any Competing Entity in developing such a framework, methodology, or pipeline. For the avoidance of doubt, this Section 2.7 does not restrict Consultant's use of general clinical knowledge and expertise that Consultant possessed prior to the Effective Date and that is not specific to the Company's analytical approach."

**Negotiation note:** This provision is aggressive. Kim's counsel will push back. The compromise position is to limit the knowledge-use restriction to the Non-Compete Period (6 months) rather than indefinitely — which is what the draft above does.

---

#### Fix 3: Add a Publication Restriction for Reserved Field Work

**Problem:** The CIAA has no publication restriction. Kim can publish academic work on ZEB1→ITGAV biology without breaching the agreement — destroying the trade secret protection for BRIEF-1.

**Add to CIAA §2:**

> "§2.8 Publication Restriction. Consultant shall not publish, present, or otherwise publicly disclose any research, analysis, or findings that: (a) relate to any BRIEF Program (as defined in §1.2); (b) are derived from or incorporate any Confidential Information; or (c) fall within the Reserved Field and are based on work performed during the engagement — without the prior written consent of the Company, which consent shall not be unreasonably withheld. The Company shall respond to any publication request within thirty (30) days of receipt; failure to respond within thirty (30) days shall be deemed consent. This restriction shall survive termination of this Agreement for a period of two (2) years."

---

#### Fix 4: Define "Material Communications" in the Non-Solicitation

**Problem:** The non-solicitation's coverage of pharma and academic counterparties is legally uncertain because "material communications" is undefined.

**Add to Non-Compete §1.4:**

> "'Material Communications' means any written or oral communication between the Company and a third party that: (a) includes a description of any BRIEF Program, EscapeMap output, or LATIFY scoring result; (b) includes a non-disclosure agreement or term sheet; (c) includes a business-development package, licensing proposal, or sponsored research agreement; or (d) is documented in the Company's CRM system or BD pipeline records as of the date of Consultant's termination. For the avoidance of doubt, a cold email or introductory communication that does not include any of the foregoing does not constitute 'Material Communications.'"

---

#### Fix 5: Require Completion of Schedule 10-C Before Execution

**Problem:** Schedule 10-C (Pre-Engagement Relationships) is blank. CrisPRO cannot prove which of Kim's relationships are pre-existing vs. developed during the engagement.

**Add to Non-Compete §3.6:**

> "Consultant shall complete Schedule 10-C in full prior to execution of this Agreement. Schedule 10-C shall list all pre-existing relationships with: (a) academic medical centers, hospitals, and research institutions; (b) pharmaceutical, biotechnology, and medical device companies; (c) venture capital firms, family offices, and institutional investors; and (d) any other entity that may qualify as a Pharma Counterparty, Academic Counterparty, or Investor Counterparty under this Agreement. Failure to complete Schedule 10-C prior to execution shall be deemed a material breach of this Agreement, and the Company may withhold the equity grant under §4.1 of the ICA until Schedule 10-C is completed."

---

### Priority 2 — HIGH (Should Negotiate)

---

#### Fix 6: Extend Non-Compete to Cover the Full Analytical Methodology

**Problem:** The non-compete covers BRIEF programs only. Kim can immediately join a competing oncology AI company and apply CrisPRO's full analytical methodology to any non-BRIEF program.

**Add to Non-Compete §2.2:**

> "§2.2(b) Methodology Non-Compete. During the Non-Compete Period, Consultant shall not, directly or indirectly, use the Company's Proprietary Methodology — defined as the Company's specific approach to AI-driven oncology target identification, synthetic-lethal interaction analysis, biomarker-driven patient stratification, and pathway-driven trial design as developed and refined during the engagement — to provide services to any Competing Entity, regardless of whether such services relate to a Then-Active BRIEF Program. For the avoidance of doubt, this Section 2.2(b) does not restrict Consultant from using general clinical knowledge and expertise that Consultant possessed prior to the Effective Date."

**Enforceability note:** This provision extends the non-compete beyond BRIEF programs to the full methodology. It is more aggressive than the current non-compete and may face enforceability challenges under Utah Code §34-51-201 (which requires the restriction to be "reasonably necessary to protect the employer's legitimate business interest"). CrisPRO should be prepared to defend this provision as protecting its trade secrets, not merely restricting competition.

---

#### Fix 7: Add a "Canary" Provision for BD Package Tracking

**Problem:** CrisPRO cannot prove what Kim disclosed in conference conversations or informal BD meetings.

**Add to ICA §3.1:**

> "§3.1(d) BD Package Integrity. Each business-development package, licensing proposal, or sponsored research agreement that Consultant reviews or presents on behalf of the Company shall include a unique, non-public identifier assigned by the Company (a 'Canary Identifier'). Consultant shall not remove, alter, or obscure any Canary Identifier. The Company shall maintain a log of all Canary Identifiers and the counterparties to whom each package was presented. In any proceeding alleging trade secret misappropriation, the presence of a Canary Identifier in a third party's materials shall create a rebuttable presumption that the third party received the information from Consultant."

---

#### Fix 8: Add a Post-Termination Cooperation Obligation for IP Filings

**Problem:** The power of attorney (ICA §6.7) is the only mechanism for post-termination IP assignment. It is aggressive and may require court intervention to exercise against a resisting party.

**Add to ICA §6.7:**

> "§6.7(b) Post-Termination Cooperation. For a period of three (3) years following termination of this Agreement, Consultant shall, upon the Company's written request and at the Company's expense, execute all documents, provide all information, and take all actions reasonably necessary to: (a) file, prosecute, and maintain patent applications covering Inventions assigned to the Company under this Agreement; (b) record IP assignments with the USPTO, EPO, or any other relevant IP office; and (c) assist the Company in any proceeding relating to the validity, enforceability, or ownership of any Invention. The Company shall compensate Consultant at a rate of $[___]/hour for post-termination cooperation that requires more than [___] hours per calendar year."

---

### Priority 3 — MEDIUM (Improve If Achievable)

---

#### Fix 9: Add a Competitive Intelligence Restriction

**Problem:** Kim can advise a competitor on CrisPRO's weaknesses (DL-07 QUARANTINED, PC-02 PERMANENTLY DOWNGRADED) without disclosing any document — just by describing what he observed.

**Add to CIAA §2:**

> "§2.9 Competitive Intelligence Restriction. Consultant shall not, during or after the engagement, provide any Competing Entity with information about the Company's internal quality-control decisions, output reliability classifications, data quality issues, or platform limitations — including but not limited to any quarantine designations, downgrade decisions, or reliability classifications — whether or not such information is documented in a Company record. This restriction shall survive termination of this Agreement for a period of two (2) years."

---

## Part VI: Overall Risk Assessment and Recommended Action

### Risk Summary

| Asset Class | Risk Level | Contract Protection | Fix Priority |
|---|---|---|---|
| BRIEF Programs (4 assets) | CRITICAL / HIGH / MEDIUM | Explicit enumeration (strong) but no publication restriction | Fix 3 (Priority 1) |
| EscapeMap Vectors (2 assets) | CRITICAL / HIGH | General CI only (weak) | Fix 1 (Priority 1) |
| LATIFY Formula + Governance | CRITICAL | General CI only (weak) | Fix 1 (Priority 1) |
| Computational Ranker Methodology | HIGH | Reserved Field license (strong on paper, weak in practice) | Fix 2 (Priority 1) |
| Trial Data + Clinical Relationships | CRITICAL | Non-solicitation (moderate) with 3 structural gaps | Fixes 4, 5 (Priority 1) |
| Competitive Moat | CRITICAL | General CI only (weak); ~70–80% reconstructible | Fixes 2, 6, 9 (Priority 1–3) |

### Recommended Action Sequence

1. **Before Kim signs:** Implement Fixes 1, 2, 3, 4, 5. These are non-negotiable from CrisPRO's perspective — they close the five most dangerous gaps.

2. **During negotiation:** Push for Fixes 6, 7, 8. Expect pushback on Fix 6 (methodology non-compete) and Fix 7 (canary provision). Fix 8 (post-termination cooperation) is the most likely to be accepted.

3. **Operational (no contract change required):** Implement the canary strategy operationally — even without Fix 7 in the contract, CrisPRO can embed unique identifiers in BD packages as a matter of practice.

4. **Complete Schedule 10-C:** Require Kim to complete Schedule 10-C before execution. This is a factual exercise, not a legal negotiation — Kim should be able to list his pre-existing relationships without objection.

5. **Fill all blanks:** The RSPA share count, par value, CEO name, and company email are blank. These must be completed before execution — the §83(b) election deadline is July 28, 2026.

---

*This document is prepared for internal use by CrisPRO and its legal counsel. It does not constitute legal advice. CrisPRO should engage qualified IP and employment counsel to review and implement the recommended contract changes before execution.*
