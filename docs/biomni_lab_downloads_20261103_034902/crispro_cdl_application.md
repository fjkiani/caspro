# CrisPRO — Creative Destruction Lab (CDL) Cancer Stream Application (Draft)

**Applicant / Founder:** Fahad Kiani, Founder & CEO, CrisPRO (Phylo)
**1st Site & Stream Preference:** CDL Cancer
**Companion white paper:** `crispro_cdl_whitepaper.md`
**Date:** July 2026
**Framing note:** All scientific claims are Research-Use-Only (RUO) / hypothesis-generating. No clinical-efficacy claims. All deal/valuation figures are benchmarks from comparable public transactions, not projections or guarantees.

> **How to use this draft:** The narrative answers below are written and ready to paste. The nine **"Select an Option"** fields are factual business questions only you can answer accurately — I have NOT fabricated them. Each is marked **[YOU MUST SELECT / FILL]** with a short decision guide so you can answer in seconds. Do not submit those as written.

---

## 1. What is the problem you are trying to solve with your venture, and why is this problem important to solve?

Oncology's treatment-decision layer is structurally blind. Drugs are given, and trials are designed, without reading the molecular information the tumor has already written about which therapies will work and which will fail. The result is a systemic failure that is quantified and undisputed: only about **3.4%** of oncology drugs entering Phase I ever reach approval, roughly **62.5%** of Phase III oncology trials fail to reach statistical significance, and about one in five Phase III oncology trials is terminated before completion — with accrual failure and lack of efficacy as leading causes.

The mechanism is arithmetic, not bad luck. A drug that works in 40% of patients whose tumors carry the relevant molecular dependency — but where that dependency is present in only 20% of an unselected enrolled population — produces an ~8% intent-to-treat response rate, reads as a negative trial, and is abandoned. The patients who would have benefited are permanently denied access. The dominant precision-oncology paradigm (DNA-panel testing keyed to mutations) is blind to the large fraction of clinically relevant dependencies that are transcriptional, regulatory, and microenvironmental rather than mutational.

This matters because the cost of not reading the tumor is measured in failed programs, wasted trial capital, and — most importantly — patients receiving treatments their own tumor biology predicted would fail. The single hardest case, microsatellite-stable (MSS) colorectal cancer (~95% of metastatic CRC), has defeated essentially every unselected checkpoint-immunotherapy trial for a decade, because broad enrollment dilutes any real signal to noise. The path forward is precision patient selection, not broader treatment — and that requires a computational intelligence layer that does not yet exist at the point of decision.

---

## 2. Elevator pitch

CrisPRO is a computational precision-oncology platform that reads a tumor's pre-treatment molecular profile — transcriptome, copy-number, and mutation data — maps the tumor's dependencies and pre-existing resistance/escape programs, and turns that into decision-grade outputs: patient-stratification scores, tumor-microenvironment profiles, resistance/response hypotheses, and trial-enrichment designs. We are asset-light: we never hold an IND and never run a trial. We are the intelligence layer that makes other organizations' drugs and trials work — the decision layer that stops oncology from treating the coin toss as a feature instead of a bug.

---

## 3. Long-term vision / "massive" impact

Our vision is structural, not incremental: **no first-line oncology treatment decision is made without a molecular routing step.** In ten years, pre-treatment molecular profiling is standard of care across solid tumors; CrisPRO's enrichment logic is a default input to trial enrollment; and the Phase III oncology failure rate falls materially because trials are run in the patients whose tumors say they will respond. The patient outcome is the one that matters: fewer patients die from treatments their tumors predicted would fail, and more receive the therapy their molecular profile says will work. The business outcome is an infrastructure position — the intelligence layer that pharma programs, cancer centers, and clinical trials route through — reached through an asset-light model that scales with every failed trial in the literature rather than with our own capital-intensive drug pipeline.

---

## 4. White paper link

**[YOU MUST HOST + PASTE A PUBLIC LINK]** CDL requires links to be viewable by reviewers. The white paper is prepared as `crispro_cdl_whitepaper.md`.

Recommended hosting options (pick one and paste the resulting link into the application):
- A public Google Doc / Notion page set to "anyone with the link can view" (fastest; renders cleanly).
- A public GitHub repository or Gist (renders markdown natively; e.g., under your `fjkiani` account).
- A PDF export uploaded to a public link.

Before submitting, open the link in a private/incognito window to confirm it is viewable without login.

---

## 5. Product/service description from the customer's perspective

CrisPRO delivers a molecular-intelligence workflow that a customer experiences as four connected capabilities:

- **Biomarker stratification engine.** The customer provides pre-treatment tumor molecular data; CrisPRO returns a composite enrichment score that ranks patients by predicted benefit, with a transparent, versioned scoring logic and an audit trail — designed for trial enrollment gating and companion-diagnostic development.
- **TME profiling.** From tumor biopsies, CrisPRO characterizes the immune contexture (e.g., TGF-β exclusion signatures, myeloid/SPP1⁺ macrophage burden, antigen-presentation status), explaining why a tumor will or will not respond to immune-based therapy and defining the subgroup most likely to benefit.
- **Trial-design intelligence.** CrisPRO provides adaptive-enrichment designs, power calculations against appropriate historical benchmarks, and ctDNA-based early-stopping rules — so a trial can detect a true signal in the responding subgroup instead of washing it out.
- **Resistance/response prediction.** Using functional-genomics evidence and genomic features, CrisPRO generates testable resistance/response hypotheses and the patient-selection logic behind them.

Under the hood, these run through named, independently testable modules — **Oracle** (mismatch-repair/variant classification), **Forge** (structure-guided design), and **Boltz** (structural/binding validation) — and are fed by **ZetaBridge**, our federated data-acquisition backend that legitimately streams and integrity-checks controlled-access sequencing data server-side under the data owner's approvals. A customer engages CrisPRO to maximize the scientific return on the clinical data they already collect: the right biomarkers measured, the right patients enrolled, the right endpoints powered.

---

## 6. Who is your customer?

Primary customers are **organizations that own oncology drugs or run oncology trials and need patient-selection intelligence they do not have in-house:**

- **Clinical-stage and mid-size biopharma** with a program at an enrollment or Phase II design inflection point (our live engagement is with a clinical-stage immuno-oncology company developing a therapeutic for MSS colorectal cancer).
- **Academic cancer centers** running investigator-sponsored trials who need a patient-selection algorithm, biomarker scoring, and data analysis.
- **Pharma business-development / translational teams** evaluating whether a shelved or under-enrolling asset can be rescued by a biomarker-defined population.

The economic buyer is typically the program's translational-medicine, clinical-development, or BD lead. The end beneficiary is the patient who is correctly routed to — or away from — a therapy.

---

## 7. Value proposition (with quantifiable metrics)

Customers pay CrisPRO because reading the tumor before the decision is dramatically cheaper than the failure it prevents, and because the patient-selection logic is the missing piece that makes an existing asset viable:

- **Failure avoidance at the trial level.** With ~62.5% of Phase III oncology trials failing and only ~3.4% of Phase I oncology drugs reaching approval, moving the probability of a correctly-enrolled trial even modestly is worth more than the entire cost of the analysis. Biomarker-selected arms have shown substantially higher response rates than unselected arms in meta-analysis.
- **Capital efficiency vs. a new trial.** Licensing patient-selection IP is far cheaper than running a new pivotal trial from scratch, because the sponsor has already paid for the molecule, the safety database, and the manufacturing — the only missing piece is who to enroll.
- **Validated acquisition + analysis capability, demonstrated on real controlled data.** In a live validation on a controlled-access shallow-WGS ovarian cancer cohort (BriTROC-1), CrisPRO's federated acquisition + from-raw-reads copy-number pipeline reproduced published genomic segmentation at **Spearman rho = 0.82 (p = 4.6 × 10⁻²⁰, n = 78)** under a strict integrity-gated protocol — evidence the platform can legitimately acquire and correctly analyze access-restricted clinical-grade genomic data end to end.
- **Speed and provenance.** CrisPRO produces a versioned, auditable stratification/analysis package on data the customer already holds, rather than requiring new prospective collection to begin generating hypotheses.

*(The "faster/cheaper/better" framing is grounded in the failure-rate and biomarker-selection literature above and in the live rho = 0.82 validation; no clinical-efficacy claim is made for any therapeutic.)*

---

## 8. Competitors and differentiation

**Competitor categories:**
- **Molecular-profiling / tumor-intelligence companies** (e.g., large sequencing-and-data players such as Tempus, Foundation Medicine, Caris) — strong at generating molecular data and mutation-centric reports.
- **Functional-genomics / synthetic-lethality drug developers** (e.g., Repare-style companies) — strong at target discovery, but they hold INDs and run their own trials.
- **In-house pharma translational teams** — the default build-vs-buy alternative.

**What differentiates CrisPRO:**
- **Dependency-first, not mutation-first.** We read transcriptional, regulatory, and microenvironmental dependencies and resistance programs, not just DNA panels — capturing the large fraction of clinically relevant dependencies that mutation-centric reports miss.
- **Asset-light by design.** We never hold an IND and never run a trial. We are structurally aligned with the drug owner rather than competing to own the molecule — which is why a sponsor can engage us without ceding their asset.
- **Legitimate controlled-data acquisition as a core capability.** ZetaBridge's integrity-gated federated streaming of controlled-access data is a genuine moat: most modeling groups cannot demonstrate correct end-to-end analysis on real access-restricted clinical-grade data. We can (rho = 0.82).
- **Governed, evidence-tiered outputs.** Every claim carries an explicit evidence tier; nulls and per-file failures are reported, not suppressed. This is a differentiator in a field defined by overclaiming.

---

## 9. Target market(s) and size of opportunity

**Primary market:** patient-selection / trial-enrichment intelligence for oncology drug developers and trial sponsors. The demand driver is the scale of oncology R&D spend that is currently wasted on mis-enrolled trials — with ~62.5% Phase III failure and ~3.4% Phase I-to-approval rates, even a small improvement in enrollment precision is economically large per program.

**Adjacent/expansion markets:** companion-diagnostic development; molecular routing / clinical decision support as pre-treatment profiling becomes standard of care; and asset-rescue intelligence for shelved or under-enrolling programs.

**Geographies:** initial focus is **Europe** (our live engagement is with a France-based clinical-stage company, and European academic-trial infrastructure is a natural early channel) and **North America** (the largest oncology-trial and biopharma-BD market, and where several target academic cancer centers and drug owners sit). Expansion follows the concentration of oncology clinical-trial activity.

**[OPTIONAL — YOU MAY REFINE]** If you want a specific TAM/SAM/SOM figure in the application, I can build a defensible bottom-up estimate (e.g., number of active oncology Phase II/III programs × addressable analysis/licensing value per program). I did not insert a single headline market-size dollar figure here because a fabricated round number is exactly the "slop" to avoid; a bottom-up build is stronger and I can produce it on request.

---

## 10. Current / active customers (paid or unpaid)

**[YOU MUST CONFIRM THE EXACT COMMERCIAL STATUS]** — factual and only you know it. Grounded facts to draw on:

- CrisPRO has an **active scientific engagement with a clinical-stage immuno-oncology company** (Brenus Pharma) developing a therapeutic for MSS colorectal cancer; CrisPRO has produced a diligence-grade fit-gap analysis, a biomarker/TME stratification framework, and an outreach/collaboration proposal for their active Phase I/IIa program.
- Whether this currently constitutes a **paid** contract, an **unpaid/pilot** collaboration, or a **prospective** engagement is a fact you must state accurately. Choose the truthful description; do not overstate a signed contract if one is not in place.

Suggested truthful phrasings (pick the one that matches reality): *"Active unpaid pilot/collaboration with one clinical-stage oncology company"* / *"One paid engagement"* / *"Advanced-stage prospective engagement, not yet contracted."*

---

## 11–19. "Select an Option" business/financial fields — **[YOU MUST ANSWER]**

These are factual business questions with fixed-choice answers only you can give accurately. I have deliberately not fabricated them. Answer each honestly; below is a quick decision guide.

| # | Question | How to answer |
|---|----------|---------------|
| 11 | **Has your venture generated any revenue?** | Yes / No — state the truth. If you have any paid engagement or grant-funded deliverable that counts as revenue under the form's definition, select accordingly; otherwise No. |
| 12 | **Raised money from investors for current/future equity?** | Yes / No. (Note: CrisPRO/Phylo's own equity fundraising status is yours to state. Do not conflate with the client company Brenus, which has raised ~€30M — that is a different entity.) |
| 13 | **Grant funding toward the technology/product?** | Yes / No — state the truth. |
| 14 | **Other source of capital (not grant, not equity)?** | Yes / No (e.g., revenue-based financing, loans, cloud credits if the form counts them, prize money). |
| 15 | **Do founders own the majority of the company?** | Yes / No — from your cap table. |
| 16 | **Current runway, in months** | A number. = (cash on hand) ÷ (monthly burn). |
| 17 | **Current average monthly burn** | A number in your reporting currency. |
| 18 | **Currency** | Select (e.g., USD / CAD / EUR). |
| 19 | **Intend to fundraise in next 12–18 months?** | Yes / No. (If the $500M Series A/B roadmap is the plan, this is almost certainly Yes.) |

> I did not guess any of these. Fabricated financials in a CDL application are both risky and easy to disprove — please fill them from your actual records.

---

## 20. Disruption risk / potential

CrisPRO's disruption potential is to **relocate the oncology value-creation point from the molecule to the decision.** Today, value accrues to whoever owns the drug; the patient-selection logic that determines whether the drug succeeds is an afterthought. CrisPRO makes the selection logic a licensable, defensible asset in its own right — which reframes shelved and "failed" assets as rescuable and reframes trial design around biomarker-defined populations. If pre-treatment molecular routing becomes standard of care, the intelligence layer becomes infrastructure that every program and trial depends on. The disruption risk (i.e., what could blunt it) is honestly stated: incumbent sequencing-and-data players could extend into dependency-first analytics; regulatory and reimbursement inertia could slow adoption of routine pre-treatment profiling; and the asset-light licensing model depends on defensible method/diagnostic IP. Our mitigations are the controlled-data-acquisition moat, governed evidence-tiering that builds trust, and an engagement model that aligns with (rather than threatens) drug owners.

---

## 21. Core technology in lay terms

Every tumor leaves a molecular "fingerprint" — a readout of which genes it is using, which it has amplified or deleted, and how it is hiding from the immune system. That fingerprint contains, in advance, the tumor's likely escape routes from treatment. CrisPRO is software that reads this fingerprint **before** treatment starts and answers three questions: *Which patients is this drug likely to help? Why might this tumor resist? How should the trial be designed to prove it?* A second part of our technology solves a quieter but critical problem: getting legitimate access to real, tightly controlled patient sequencing data and analyzing it correctly. Our system (ZetaBridge) streams that protected data securely — under the data owner's permission — and checks every file for corruption before using it, so the answers are built on verified data, not guesses.

---

## 22. Specific dimension of technical outperformance

CrisPRO outperforms on **legitimate, integrity-verified acquisition and correct end-to-end analysis of real controlled-access clinical-grade genomic data — and on reading dependencies that mutation-centric platforms miss.** Concretely, most computational-oncology groups cannot demonstrate that their pipeline reproduces published, peer-reviewed genomics on genuinely access-restricted data. CrisPRO can: on 78 controlled-access samples, our from-raw-reads pipeline reproduced published copy-number segmentation at **Spearman rho = 0.82 (p = 4.6 × 10⁻²⁰)** under a strict checksum-verified integrity gate that rejected every corrupted transfer during an upstream data-broker degradation. That is a measurable, reproducible outperformance on the exact capability that gates real-world clinical-genomics work.

---

## 23. Most exciting validating data (with links)

The most exciting validation is the **live BriTROC-1 controlled-access exercise** described in the white paper:

- **Pipeline concordance:** CrisPRO's independently regenerated genomic-instability measurements reproduced published values at **Spearman rho = 0.82, p = 4.6 × 10⁻²⁰ (n = 78)** — strong end-to-end validation of controlled-data acquisition + from-scratch copy-number analysis.
- **Honest secondary null:** on an exploratory resistance question, CrisPRO transparently reports no systematic diagnosis→relapse instability change (Wilcoxon p = 0.64, consistent with the published BriTROC-1 finding of copy-number stability) and an underpowered, opposite-direction cross-sectional association (events-per-variable = 9). Reporting the null in full **is** the differentiator: the capability is validated, and the exploratory hypothesis is reported honestly.

**Links to include [YOU MUST HOST + PASTE]:**
- CrisPRO white paper (`crispro_cdl_whitepaper.md`) — host publicly and paste the link.
- Published comparator: Smith, Bradley et al., *Nature Communications* 2023, DOI **10.1038/s41467-023-39867-7** (BriTROC-1 copy-number landscape).
- Scientific anchor for the CRC program: Alzeeb et al., *Frontiers in Oncology* 2024, DOI **10.3389/fonc.2024.1427428** (preclinical; murine surrogate — not evidence of human efficacy).
- Optional: a public link to your analysis repository if you choose to expose the pipeline code/outputs.

*(Do not link internal file paths; host the white paper at a public URL first.)*

---

## 24. Type of scientist best suited to assess the core technology

In point form, the ideal CDL-affiliated reviewer would be:

- A **computational cancer genomicist** with hands-on experience in **copy-number analysis from (shallow) whole-genome sequencing** (e.g., QDNAseq/ASCAT-class methods) and segmentation validation.
- Fluent in **bioinformatics data engineering** — BAM/sequence-file handling, checksum/integrity verification, and controlled-access repositories (EGA/dbGaP).
- Grounded in **tumor immunology / tumor-microenvironment biology**, especially immune exclusion in MSS colorectal cancer (TGF-β, myeloid/SPP1⁺ programs, antigen presentation).
- Experienced in **biomarker-driven clinical trial design and statistics** — adaptive enrichment, ROC/AUROC, bootstrap confidence intervals, multiple-testing control, power/EPV.
- Familiar with **functional genomics / dependency mapping** (DepMap-style analyses) and **translational precision-oncology** program development.

A single reviewer spanning computational genomics + trial biostatistics, ideally with tumor-immunology exposure, would be best positioned to assess both the acquisition/analysis capability and the clinical-application logic.

---

## 25. ML/AI problem (methods, inputs, outputs, validation)

- **Problem:** predict, from a tumor's pre-treatment molecular profile, which patients will benefit from a given therapy and which tumors will resist — and use that to gate trial enrollment and design.
- **Inputs:** pre-treatment transcriptomic profiles; copy-number features from (shallow) whole-genome sequencing; mutation/variant calls; and, where available, TME/immune-contexture readouts — linked through a provenance-tracked knowledge graph to sample, patient, treatment, and outcome/resistance labels.
- **Outputs:** a patient-level enrichment/response score; resistance/escape hypotheses; TME classifications; and trial-enrichment designs.
- **Core methods:** genomic feature extraction (copy-number segmentation and instability metrics from raw reads); dependency mapping against functional-genomics references; classifier models for molecular calling (e.g., the Oracle mismatch-repair/variant classifier, reported internal AUROC ~0.957 on its benchmark task); and structure-based modules for binding/epitope scoring (Boltz, Forge).
- **Validation approach:** pre-specified statistical criteria with bootstrap confidence intervals and multiple-testing control; **integrity-gated data acquisition** with checksum verification; **concordance against published/orthogonal comparators** (the rho = 0.82 BriTROC-1 result); and explicit power/EPV reporting with honest nulls. Our pre-registered criterion for a resistance signal — an effect in the correct direction with a bootstrap CI excluding chance, replicated across **≥2 independent cohorts** — was **not** met by the current single, underpowered cohort, and is reported as such rather than overstated.

---

## 26. Why this team

**[YOU SHOULD PERSONALIZE THE FOUNDER BIOS — I have grounded the venture-capability narrative; add your and your co-founders' specific life experiences.]**

CrisPRO is founder-led, combining computational/platform engineering (Fahad Kiani, CEO) with clinical oncology domain expertise from physician co-founders. What positions this team is demonstrated execution, not aspiration: we built a live federated-acquisition backend that streams and integrity-checks controlled-access sequencing data server-side; a reproducible from-raw-reads copy-number pipeline that matches published genomics at **rho = 0.82**; a provenance-tracked knowledge graph; named, independently testable engine modules (Oracle, Forge, Boltz); a governed evidence-tiering system that reports nulls honestly; and an active engagement with a clinical-stage oncology company on one of the hardest problems in the field (MSS CRC). The defining trait is discipline — the ability to acquire real controlled data legitimately, analyze it correctly, and report results (including the inconvenient ones) honestly. *(Add: relevant personal/professional history for each founder — prior ventures, clinical practice, technical track record — that CDL reviewers will weight heavily.)*

---

## 27. 1st CDL Site & Stream: **CDL Cancer** — why

CDL Cancer is the exact intersection of CrisPRO's science and commercial model. Our problem is oncology-specific: patient selection, resistance prediction, TME profiling, and biomarker-driven trial design. The CDL Cancer objective-setting process, its oncology-expert mentor and scientist network, and its cohort of oncology ventures and clinical/industry partners are precisely the network CrisPRO needs — to pressure-test the science with domain experts (the copy-number/tumor-immunology reviewers named above), to reach drug owners and academic cancer centers who are our customers, and to sharpen the asset-light licensing model against real BD counterparties. As an asset-light platform that never holds an IND, CrisPRO benefits disproportionately from a program built to connect computational oncology to the clinical and commercial actors who run trials — which is the defining strength of CDL Cancer.

---

### Governance / integrity statement (for internal reference; not necessarily pasted)

This application makes **no clinical-efficacy claim** for any therapeutic (including the client's MSS CRC vaccine); does **not** claim any resistance mechanism has been "broken"; does **not** extrapolate preclinical/murine results to human benefit; and treats all financial fields as user-owned facts (not fabricated). All scientific claims are RUO / hypothesis-generating. All deal/valuation figures referenced anywhere in CrisPRO materials are benchmarks from comparable public transactions, not projections or guarantees. This document is not legal or financial advice.

---
*CrisPRO CDL Cancer Application (Draft) · July 2026 · Companion white paper: crispro_cdl_whitepaper.md*
