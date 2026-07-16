// ==============================================================================
// CAPABILITY REGISTRY — Single source of truth for the CrisPRO capability spine.
// Vague-scrubbed against caspro-lint/README.md (no retired numerics, no client-linked
// terminology). Source: ceacam5 vague-framing template layer_1_platform_capabilities.
//
// Persona sidecar (D15/persona-sweep): every user-visible string field carries an
// optional `personaCopy` overlay. Consumers read fields via personaField(entry, k,
// persona) so a persona-scoped variant renders when present and the English default
// renders otherwise. Non-breaking: entries without personaCopy behave exactly as they
// did pre-sweep.
// ==============================================================================

import type { PersonaOverlay } from '@/lib/persona-copy-guards';

export interface CapabilityRoiHook {
  scenario_slug: string;
  title: string;
  value_at_stake: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

// Fields that carry user-visible copy — safe to overlay per persona.
export interface CapabilityCopyFields {
  name: string;
  oneLiner: string;
  description: string;
  demoOutput: string;
  clinicalValue: string;
}

export interface CapabilityEntry extends CapabilityCopyFields {
  id: string;               // CAP-1 .. CAP-5
  slug: string;             // route-safe slug (used inside /engine and /pipeline tabs)
  primarySurface: string;   // where in the app this capability is embodied
  proofCaseSlug: string;    // links into the trial-case-file receipts we ship
  personaCopy?: PersonaOverlay<CapabilityCopyFields>;
}

export const CAPABILITY_REGISTRY: CapabilityEntry[] = [
  {
    id: 'CAP-1',
    slug: 'gate-tier-scoring',
    name: 'Gate Tier Scoring',
    oneLiner: 'Ranks candidate patient-selection gates by expected mechanism alignment.',
    description:
      'For any candidate biomarker gate (target expression threshold, pathway signature, subgroup rule), CrisPRO quantifies how much the gate improves mechanism alignment between the drug and the selected population — and flags gates that are counterproductive (i.e., the unselected population aligns better than the gate-positive one).',
    demoOutput:
      'GATE-FAIL: a lenient target-expression gate is counterproductive vs. the unselected population. Under 30 seconds.',
    clinicalValue:
      'Prevents Phase III repeats of gate-selection failures by testing candidate gates in silico before protocol design.',
    primarySurface: '/engine (Gate Tier Scoring tab)',
    proofCaseSlug: 'ceacam5',
    personaCopy: {
      oncologist: {
        oneLiner: 'Ranks candidate biomarker gates by expected mechanism alignment for the drug and disease context.',
        description:
          'CrisPRO scores every candidate patient-selection gate (target expression threshold, pathway signature, subgroup rule) against the drug MOA and returns whether the gate improves alignment vs. the unselected arm. Flags counterproductive gates — the classic false-positive gate — before the trial commits.',
        demoOutput:
          'Gate Tier Scoring · ceacam5 exemplar: a lenient target-expression gate is counterproductive vs. the unselected arm. Runs in seconds.',
        clinicalValue:
          'Falsifies gate-selection failures in silico before Phase III commits — reduces the risk of shipping a gate that dilutes signal.',
      },
      patient: {
        name: 'Making sure the right patients get the drug',
        oneLiner: 'A test that ranks the rules doctors use to pick who gets the drug, so the right patients are chosen.',
        description:
          'When a trial picks patients for a new drug, it uses a "gate" — a rule like "only patients whose tumors have a lot of this protein." Sometimes the rule doesn\'t work: the patients it picks do worse than a broader group. CrisPRO checks how well each rule matches the drug\'s biology, so trials use rules that actually help.',
        demoOutput:
          'Ranking of rules for one example drug: one rule that seemed reasonable actually picks patients less likely to respond than the broader group.',
        clinicalValue:
          'Helps trials avoid the kind of mistake where the wrong rule sends the drug to the wrong patients — before the trial starts.',
      },
      pharma: {
        oneLiner: 'Prospective ranking of gate rules by mechanism-alignment weight — auditable, receipt-backed.',
        description:
          'For every candidate gate a sponsor could write into a protocol, CrisPRO returns the mechanism-alignment delta between gate-positive and unselected populations, with a receipt. Counterproductive gates surface as negative deltas before protocol lock. Supports gate-tier scoring as an auditable Phase III de-risker rather than a post-hoc explainer.',
        demoOutput:
          'Gate tier scorecard · ceacam5 template: one lenient gate scored counterproductive vs. all-comers. Attribution: mechanism-alignment axes, drug MOA, receipt on file.',
        clinicalValue:
          'Protects the majority of Phase III downside on a gate-selection failure — quantifies the value-at-stake of the gate choice as an audit-trail line item.',
      },
    },
  },
  {
    id: 'CAP-2',
    slug: 'multi-asset-scoring',
    name: 'Multi-Asset Simultaneous Scoring',
    oneLiner: 'Scores every asset in a franchise against every patient subgroup — in one pass.',
    description:
      'For a franchise with multiple candidates (e.g., two ADC formats against the same target, or an ADC + a bispecific), CrisPRO scores each asset against each candidate patient subgroup and returns a mechanism-alignment matrix. Reveals when two assets nominally targeting the same disease are actually addressing structurally different patient populations.',
    demoOutput:
      'ASSET-SPLIT: two franchise assets show meaningfully different IO-context alignment against the same target.',
    clinicalValue:
      'Prevents mis-allocation of asset development across a franchise; supports parallel-track vs. staged-track decisions.',
    primarySurface: '/engine (Multi-Asset tab)',
    proofCaseSlug: 'ceacam5',
    personaCopy: {
      oncologist: {
        oneLiner: 'Scores every asset in a franchise against every candidate subgroup — one alignment matrix, one pass.',
        description:
          'Two assets nominally hitting the same target can behave like two different drugs against two different populations. CrisPRO returns a mechanism-alignment matrix across every asset × subgroup cell, so the "same-target" comparison is done on biology and not on package inserts.',
        demoOutput:
          'Multi-asset scoring · ceacam5 exemplar: two franchise assets show meaningfully different IO-context alignment on the same target.',
        clinicalValue:
          'Names the mechanistic split between franchise assets before both go to the same indication with the same enrollment plan.',
      },
      patient: {
        name: 'Comparing several versions of a drug',
        oneLiner: 'A test that checks whether two drugs that look alike really work the same way for different kinds of patients.',
        description:
          'Sometimes a company has two drugs that both target the same problem, but they don\'t work the same for everyone. CrisPRO compares them side by side across many patient groups, so nobody wastes a year finding out the "backup" drug was actually the right one for some patients.',
        demoOutput:
          'One example: two drugs that both target the same tumor protein turned out to fit different patient groups — one worked much better for one subset than the other.',
        clinicalValue:
          'Keeps development focused on the drug that actually helps each patient group, instead of chasing the wrong drug down the wrong path.',
      },
      pharma: {
        oneLiner: 'One-pass franchise-vs-subgroup alignment matrix — supports asset-triage before enrollment commits.',
        description:
          'A franchise carrying multiple candidates against the same target still has to allocate development. CrisPRO returns the alignment-delta between every asset × subgroup pair, so the "parallel vs. staged" decision is made on mechanism receipts rather than pipeline politics. Named asset splits enter the audit trail.',
        demoOutput:
          'Franchise scorecard · ceacam5 template: two assets on the same target register meaningfully different IO-context weights across candidate subgroups.',
        clinicalValue:
          'Prevents mis-allocation of Phase II / III development across a franchise — quantifies the cost of picking the wrong asset for a given subgroup.',
      },
    },
  },
  {
    id: 'CAP-3',
    slug: 'biomarker-failure-prediction',
    name: 'Prospective Biomarker Failure Prediction',
    oneLiner: 'Predicts which biomarker will fail — and which will succeed — before the trial reads out.',
    description:
      'CrisPRO ranks candidate biomarkers by predicted mechanism-alignment weight for the drug and disease context. Distinguishes local-tissue biomarkers from systemic biomarkers, and flags when the more accessible biomarker is likely to be less predictive than a harder-to-measure alternative.',
    demoOutput:
      'TMB-DECODE: peripheral TMB is meaningfully more predictive than tissue TMB in an IO-context indication.',
    clinicalValue:
      'Prevents adoption of the wrong biomarker as a companion diagnostic; corrects biomarker strategy pre-trial.',
    primarySurface: '/engine (Biomarker Prediction tab)',
    proofCaseSlug: 'ceacam5',
    personaCopy: {
      oncologist: {
        oneLiner: 'Ranks candidate biomarkers by mechanism-alignment weight — separates the local-tissue read from the systemic read pre-trial.',
        description:
          'When a trial has two candidate biomarkers — usually one tissue-based and one systemic — the mechanistic prediction is often the opposite of the convenience prediction. CrisPRO scores each candidate biomarker against the drug MOA and returns a ranking, so the biomarker strategy is decided on mechanism, not on assay ease.',
        demoOutput:
          'Biomarker prediction · ceacam5 template: peripheral TMB scores meaningfully higher than tissue TMB in an IO-context indication.',
        clinicalValue:
          'Corrects biomarker strategy pre-trial — reduces the odds of shipping a companion diagnostic that turns out to be the less predictive of the two candidates.',
      },
      patient: {
        name: 'Picking the right test to predict who benefits',
        oneLiner: 'A test that predicts which lab test will actually tell doctors who is going to benefit from a drug, before the trial happens.',
        description:
          'Drugs work better for some patients than others, and doctors use lab tests to try to figure out who benefits most. But sometimes the obvious test isn\'t the right one — a blood test might explain things better than a tumor biopsy, or the other way around. CrisPRO predicts which test will actually work, before the trial spends years finding out.',
        demoOutput:
          'One example: a blood test measuring the amount of DNA damage a tumor has explains who benefits from an immune-based drug much better than the tumor-biopsy version of the same test.',
        clinicalValue:
          'Trials get the right lab test the first time — so the drug lands with the right patients faster, not five years later.',
      },
      pharma: {
        oneLiner: 'Prospective biomarker-modality ranking — separates the CDx-of-convenience from the CDx that will actually clear.',
        description:
          'Every trial with two candidate biomarker modalities makes an implicit bet on which one to develop as the CDx. CrisPRO returns the mechanism-alignment weight of each candidate against the drug MOA before the bet is placed, so the CDx pathway matches the biology and not the assay-vendor economics. Named biomarker-modality mismatches enter the audit trail.',
        demoOutput:
          'Biomarker-modality scorecard · ceacam5 template: peripheral TMB ranks meaningfully higher than tissue TMB against an IO-context franchise MOA.',
        clinicalValue:
          'Locks the CDx pathway to the mechanistically strongest modality — protects downstream label negotiation and reduces the odds of a biomarker-failure amendment mid-Phase II.',
      },
    },
  },
  {
    id: 'CAP-4',
    slug: 'population-funnel',
    name: 'Population Funnel Optimization',
    oneLiner: 'Turns a disease-wide addressable market into a mechanism-aligned enrollment target.',
    description:
      'For any indication, CrisPRO projects the funnel from disease prevalence → gate-eligible → mechanism-aligned. Returns the size of the mechanism-aligned population, the ORR/HR delta between all-comers and the aligned population, and the resulting cost-per-responder change.',
    demoOutput:
      'CEA-GATE (illustrative): funnel drops from tens of thousands to low-thousands of patients per year with a two-gate framework; ORR improves several-fold; cost-per-responder drops meaningfully.',
    clinicalValue:
      'Aligns commercial forecasts and enrollment plans with the biology-defined addressable population, not the disease-defined one.',
    primarySurface: '/engine (Population Funnel tab)',
    proofCaseSlug: 'ceacam5',
    personaCopy: {
      oncologist: {
        oneLiner: 'Projects the funnel from disease prevalence to mechanism-aligned enrollment target — returns the ORR/HR delta.',
        description:
          'For any indication CrisPRO returns the funnel: disease prevalence → gate-eligible → mechanism-aligned. Emits the size of the aligned population, the ORR/HR delta between all-comers and the aligned arm, and the resulting cost-per-responder change. Grounds enrollment planning in biology rather than epidemiology.',
        demoOutput:
          'Population funnel · ceacam5 template: two-gate framework funnels tens-of-thousands prevalent to low-thousands mechanism-aligned; ORR improves several-fold; cost-per-responder drops meaningfully.',
        clinicalValue:
          'Turns "we could enroll anyone with disease X" into "we should enroll the aligned population" — reduces the odds of a diluted signal in the pivotal.',
      },
      patient: {
        name: 'Finding the patients a drug is most likely to help',
        oneLiner: 'A test that figures out, from all the people with a disease, which ones are most likely to actually benefit from a drug.',
        description:
          'When a disease affects tens of thousands of people, only some of them will benefit from any given drug. CrisPRO estimates which subset the drug is actually built for — how many people that is, how much better the response is likely to be, and what that means for making the drug available faster. The idea is: match the drug to the right patients from the start.',
        demoOutput:
          'One example: instead of testing a drug in tens of thousands of possible patients, the analysis narrowed the group to a few thousand where the drug is much more likely to help. Response was several times higher in the smaller, matched group.',
        clinicalValue:
          'Helps drug developers focus on the patients most likely to benefit — so drugs reach those patients faster and with better evidence.',
      },
      pharma: {
        oneLiner: 'Prevalence → gate-eligible → mechanism-aligned funnel; returns cost-per-responder and CPD-relevant addressable market.',
        description:
          'The disease-wide addressable market is not the mechanism-aligned addressable market. CrisPRO projects the funnel — prevalence → gate-eligible → mechanism-aligned — and returns the ORR/HR delta and the cost-per-responder implication. Anchors commercial modelling and enrollment planning to the biology-defined market, not the disease-code market.',
        demoOutput:
          'Population funnel · ceacam5 template: tens-of-thousands prevalent → low-thousands aligned under a two-gate framework; ORR uplift several-fold; cost-per-responder drops meaningfully.',
        clinicalValue:
          'Reconciles commercial forecast and enrollment plan with mechanism-aligned population size — reduces the risk of a launch that misses the CPD-defined market.',
      },
    },
  },
  {
    id: 'CAP-5',
    slug: 'mechanism-divergence',
    name: 'Mechanism Divergence Explanation',
    oneLiner: 'Explains why two trials in nominally the same indication produced opposite results.',
    description:
      "When two trials in the same indication contradict each other (e.g., positive vs. negative in a subgroup, or an interaction p-value that flips signal direction), CrisPRO decomposes the contradiction into mechanism-alignment axes and identifies which axis (IO context, VEGF context, DDR, etc.) is doing the work. Turns 'unexplained heterogeneity' into a named mechanism split.",
    demoOutput:
      'LIVER-SPLIT: an interaction p-value in one trial reflects a VEGF-context divergence not visible at the primary-endpoint level.',
    clinicalValue:
      "Turns 'trial failure was unlucky' into 'trial failure was mechanistically named' — supports program-level go/no-go with attribution.",
    primarySurface: '/engine (Mechanism Divergence tab)',
    proofCaseSlug: 'ceacam5',
    personaCopy: {
      oncologist: {
        oneLiner: 'Decomposes a discordant pair of trials into named mechanism-alignment axes — attributes the split.',
        description:
          'When two trials in the same indication return opposite results (positive vs. negative in a subgroup, or an interaction p-value that flips signal direction), CrisPRO returns the mechanism-alignment decomposition — which axis (IO context, VEGF context, DDR, etc.) actually explains the discrepancy. Replaces "unexplained heterogeneity" with a named mechanistic split.',
        demoOutput:
          'Mechanism divergence · liver-split exemplar: a subgroup interaction p-value reflects a VEGF-context divergence not visible at the primary endpoint level.',
        clinicalValue:
          'Turns a heterogeneous trial into a named mechanistic split — supports program-level go/no-go with attribution rather than "we got unlucky".',
      },
      patient: {
        name: 'Explaining why the same drug worked one time and not the next',
        oneLiner: 'A test that explains why the same drug seemed to work in one trial and not in another — by finding the biological reason.',
        description:
          'Sometimes a drug looks great in one study and then flops in another. The most common assumption is bad luck. Often, the real reason is that the two studies enrolled patients whose biology was different in a way nobody spotted. CrisPRO finds that difference — the biological reason the results split — so decisions about the drug are based on what actually happened, not on guessing.',
        demoOutput:
          'One example: two studies of the same drug in the same disease had opposite results. The difference turned out to be how the tumor was interacting with blood-vessel-growth signals — a difference that was invisible in the primary study summary.',
        clinicalValue:
          'Helps drug developers, regulators, and doctors understand what actually happened when two trials disagree — instead of writing one of them off.',
      },
      pharma: {
        oneLiner: 'Attribution-grade decomposition of trial-vs-trial discordance — replaces "unexplained heterogeneity" with a named receipt.',
        description:
          'A discordant pair of pivotal-adjacent trials is normally handled as a heterogeneity story with no attribution. CrisPRO returns the mechanism-alignment decomposition of the discrepancy — which axis, which subgroup, which context. The named receipt supports program-level go/no-go, regulator narrative, and salvage-path design.',
        demoOutput:
          'Discordance decomposition · liver-split exemplar: interaction p-value in one trial is attributable to a VEGF-context divergence — invisible at the primary endpoint, visible in the alignment axes.',
        clinicalValue:
          'Program-level decisions after a discordant readout — go/no-go, retention of investment, salvage path — happen against a named mechanistic split rather than a shrug. Reduces the odds of a program being written off on statistics alone.',
      },
    },
  },
];

export interface ComparatorCopyFields {
  name: string;
  exampleOfClass: string;
  whatTheyDo: string;
  whatTheyCannotDo: string;
  crisproPosition: string;
  relationship: string;
}

export interface Comparator extends ComparatorCopyFields {
  slug: string;
  personaCopy?: PersonaOverlay<ComparatorCopyFields>;
}

export const COMPARATORS: Comparator[] = [
  {
    slug: 'tissue-histology',
    name: 'Tissue histology platforms',
    exampleOfClass: 'Owkin AI, spatial transcriptomics vendors',
    whatTheyDo: 'Tissue biopsy analysis: IHC density, spatial patterns, H&E morphology.',
    whatTheyCannotDo:
      'Do not compute mechanism alignment between patient biology and drug MOA. Cannot flag counterproductive gates, cross-asset structural contradictions, or biomarker-modality failures.',
    crisproPosition:
      'CrisPRO operates one layer above tissue morphology and one layer below clinical outcome. The signals CrisPRO detects are structurally invisible to histology platforms.',
    relationship:
      "COMPLEMENTARY — they answer 'what does the tumor look like?', CrisPRO answers 'how well does this drug engage this tumor?'",
    personaCopy: {
      oncologist: {
        whatTheyDo: 'Tissue-biopsy readouts — IHC density, spatial neighbourhood, H&E morphology.',
        whatTheyCannotDo:
          'Do not compute mechanism-alignment between patient biology and drug MOA — cannot flag counterproductive gates or biomarker-modality failures.',
        crisproPosition:
          'CrisPRO sits between tissue morphology and clinical outcome. The signals CrisPRO reads are one layer above the histology substrate.',
        relationship:
          "COMPLEMENTARY — histology answers 'what does the tumour look like?', CrisPRO answers 'how well does this drug engage this tumour?'",
      },
      patient: {
        name: 'Platforms that look at what the tumor looks like',
        whatTheyDo: 'These platforms take a tissue sample and study it: how the cells look, how they are arranged, which proteins show up on staining.',
        whatTheyCannotDo:
          "They can't tell you how well a specific drug is likely to engage that tumor. They describe the tumor; they don't match it to a drug.",
        crisproPosition:
          "CrisPRO adds the missing step: given what the tumor is like, how well is this drug going to actually reach and kill it? That's a different layer.",
        relationship:
          "COMPLEMENTARY — these platforms describe the tumor. CrisPRO picks up from there and asks 'how well does this drug fit this tumor?'",
      },
      pharma: {
        whatTheyDo: 'Tissue-biopsy platforms: IHC, spatial transcriptomics, H&E-based analytics.',
        whatTheyCannotDo:
          'Cannot generate mechanism-alignment receipts for MOA-vs-population comparison. Do not surface counterproductive gates or asset splits.',
        crisproPosition:
          'CrisPRO occupies the mechanism-alignment layer above tissue morphology — the alignment receipts CrisPRO issues do not have an equivalent output in histology.',
        relationship:
          'COMPLEMENTARY — histology platforms provide the tissue substrate; CrisPRO provides the mechanism-alignment audit trail that sits on top.',
      },
    },
  },
  {
    slug: 'comprehensive-genomic-profiling',
    name: 'Comprehensive genomic profiling',
    exampleOfClass: 'Foundation Medicine / FoundationOne CDx',
    whatTheyDo: 'Tumor genomic profiling: TMB, MSI, SNVs, CNVs, fusions from tissue biopsy.',
    whatTheyCannotDo:
      'Do not distinguish tissue-level biomarkers from systemic biomarkers as a function of mechanism context, and do not predict which genomic feature will be predictive for a given drug mechanism.',
    crisproPosition:
      'CrisPRO can predict — pre-trial — which biomarker modality will fail for a given mechanism and disease context. Prospective, not post-hoc.',
    relationship:
      'COMPLEMENTARY — genomic platforms provide the data; CrisPRO determines which features are mechanistically relevant.',
    personaCopy: {
      oncologist: {
        whatTheyDo: 'Tumour-tissue genomic profiling — TMB, MSI status, SNVs, CNVs, fusions.',
        whatTheyCannotDo:
          'Do not distinguish tissue-level biomarkers from systemic biomarkers as a function of mechanism context, and do not rank candidate biomarkers for a given drug MOA.',
        crisproPosition:
          'CrisPRO predicts pre-trial which biomarker modality will read out for a given mechanism. Prospective, not post-hoc.',
        relationship:
          'COMPLEMENTARY — genomic profiling provides the substrate; CrisPRO decides which substrate features are mechanistically load-bearing.',
      },
      patient: {
        name: 'Platforms that read the tumor’s DNA',
        whatTheyDo: 'These platforms sequence the DNA in a tumor sample: how many mutations it has, whether specific genes are damaged, and so on.',
        whatTheyCannotDo:
          "They give the reading, but they don't tell you which reading is the one that predicts whether a specific drug will work for that tumor.",
        crisproPosition:
          "CrisPRO fills that gap: given the DNA readings, which of them is the one that actually forecasts response to this specific drug — before the trial says so.",
        relationship:
          'COMPLEMENTARY — DNA-profiling platforms give the data. CrisPRO tells the trial team which piece of data is the one worth acting on.',
      },
      pharma: {
        whatTheyDo: 'Tumour genomic profiling — TMB, MSI, SNV/CNV/fusion panels; standard CDx substrate.',
        whatTheyCannotDo:
          'Cannot predict which biomarker modality will clear for a given MOA. Cannot rank tissue-vs-peripheral candidates on mechanism weight.',
        crisproPosition:
          'CrisPRO is the prospective biomarker-modality ranker — the layer that decides which of the substrate features a CDx should actually be built around.',
        relationship:
          'COMPLEMENTARY — genomic-profiling platforms supply the CDx substrate; CrisPRO determines which substrate features belong on the CDx label.',
      },
    },
  },
  {
    slug: 'real-world-evidence',
    name: 'Multimodal real-world evidence platforms',
    exampleOfClass: 'Tempus AI and similar',
    whatTheyDo:
      'Multimodal integration of genomics, clinical records, imaging, pathology. Real-world evidence generation.',
    whatTheyCannotDo:
      'Real-world evidence identifies correlations — it does not deliver mechanistic causality. Cannot run prospective gate optimization for a specific drug mechanism.',
    crisproPosition:
      'CrisPRO provides mechanistic causality grounded in drug MOA, not correlation observed in aggregate real-world data.',
    relationship:
      'COMPLEMENTARY — real-world platforms provide the evidence base; CrisPRO provides the mechanistic framework to interpret it.',
    personaCopy: {
      oncologist: {
        whatTheyDo: 'Multimodal RWE — genomics, clinical records, imaging, pathology integrated across cohorts.',
        whatTheyCannotDo:
          'RWE returns correlation across a heterogeneous cohort — it does not return mechanism-alignment for a specific drug MOA, and cannot run prospective gate optimization.',
        crisproPosition:
          'CrisPRO returns mechanistic attribution against the drug MOA — the receipt is grounded in mechanism, not in aggregate correlation.',
        relationship:
          'COMPLEMENTARY — RWE provides the aggregate observational base; CrisPRO provides the mechanistic frame to interpret which signals in the base are load-bearing.',
      },
      patient: {
        name: 'Platforms that study large numbers of real patient records',
        whatTheyDo: 'These platforms look at thousands of real patient records — DNA, imaging, treatment history, outcomes — to spot patterns.',
        whatTheyCannotDo:
          "They can tell you 'these two things went together' in real patients, but not 'this drug is going to work for this patient because of this biology.' Correlation, not mechanism.",
        crisproPosition:
          "CrisPRO adds the mechanistic 'why': not just that two things went together, but the biological reason a drug will engage a particular tumor.",
        relationship:
          "COMPLEMENTARY — real-world platforms observe what happened. CrisPRO explains why, so the pattern is usable when a new patient shows up.",
      },
      pharma: {
        whatTheyDo: 'Multimodal RWE integration — cross-modal cohort assembly for correlation-grade evidence generation.',
        whatTheyCannotDo:
          'Correlation-grade output. Cannot underwrite mechanism-alignment claims against a specific MOA, and cannot serve as a prospective gate-optimization substrate.',
        crisproPosition:
          'CrisPRO issues mechanism-grade receipts anchored to a specific MOA — the audit substrate an RWE correlation cannot underwrite.',
        relationship:
          'COMPLEMENTARY — RWE platforms provide the observational cohort; CrisPRO provides the mechanism-alignment audit trail that lets a correlation become a decision.',
      },
    },
  },
];

// UNIQUE_POSITION — legacy default string used by consumers that have not yet
// wired the persona-aware variant. Kept for backward compatibility.
export const UNIQUE_POSITION =
  'CrisPRO occupies the mechanism alignment layer — the gap between tissue biology (histology / genomics / RWE) and clinical outcome (trial data).';

// Persona-aware variant. Consumers rewire to UNIQUE_POSITION_DECK[persona].
export const UNIQUE_POSITION_DECK: Record<'oncologist' | 'patient' | 'pharma', string> = {
  oncologist:
    'CrisPRO sits at the mechanism-alignment layer — the gap between tissue biology (histology / genomics / RWE) and clinical outcome (trial data). The alignment is the receipt.',
  patient:
    'CrisPRO fills the missing step between studying a tumor and knowing which drug is going to work for it. Tests describe the tumor. Trials describe the outcome. CrisPRO explains how well a drug is going to reach a specific tumor — the piece that used to be a guess.',
  pharma:
    'CrisPRO occupies the mechanism-alignment audit layer — the gap between tissue-substrate platforms (histology, genomics, RWE) and clinical-outcome data. Every alignment call CrisPRO issues carries a receipt.',
};

export interface RoiScenarioCopyFields {
  title: string;
  investment: string;
  valueAtStake: string;
  riskOfInaction: string;
  valueProtected: string;
  urgency: string;
  claimType: string;
}

export interface RoiScenario extends RoiScenarioCopyFields {
  slug: string;
  personaCopy?: PersonaOverlay<RoiScenarioCopyFields>;
}

export const ROI_SCENARIOS: RoiScenario[] = [
  {
    slug: 'gate-definition-pre-phase-1',
    title: 'Gate Definition Before Phase 1 Enrollment',
    investment: 'Single CrisPRO analysis session',
    valueAtStake: 'Phase 1 signal integrity for a franchise asset',
    riskOfInaction:
      'Phase 1 enrolls a mix of aligned and misaligned patients. Signal is diluted. Phase 2 repeats a prior gate-selection failure.',
    valueProtected:
      'Order of 18–24 months of Phase 2 development time and mid-nine-figure Phase 2 cost avoidance if the gate is defined correctly in Phase 1.',
    urgency: 'Time-boxed — expires when Phase 1 enrollment opens.',
    claimType: 'OPEN_ASSUMPTION — Phase 2 cost avoided based on industry benchmarks.',
    personaCopy: {
      oncologist: {
        valueAtStake: 'Phase 1 signal integrity for a franchise asset before enrollment locks.',
        riskOfInaction:
          'Phase 1 enrols a mixed aligned/misaligned population; the signal comes back diluted; Phase 2 repeats a prior gate-selection failure.',
        valueProtected:
          '18–24 months of Phase 2 development time and mid-nine-figure Phase 2 cost avoidance if the gate is defined correctly at the Phase 1 protocol lock.',
      },
      patient: {
        title: 'Getting the patient-selection rule right before the trial starts',
        investment: 'One analysis session with the CrisPRO team',
        valueAtStake: "Whether the first trial gives a clear answer about who the drug helps.",
        riskOfInaction:
          'The trial enrolls a mix of patients — some the drug fits and some it doesn’t — so the results are muddy. The next trial has to start over with a different rule, delaying the drug for the patients who need it.',
        valueProtected:
          'Roughly 18–24 months of extra waiting for the next-stage trial, and about $100M+ in extra cost, are avoided when the rule is set correctly the first time.',
        urgency: "Limited window — once the trial opens for enrollment, the rule is locked and can't be fixed without going back to the start.",
        claimType: "OPEN_ASSUMPTION — the time and cost numbers come from industry benchmarks, not from a single completed trial.",
      },
      pharma: {
        valueAtStake: 'Phase 1 signal integrity for a franchise asset — the gate lock is a program-level lever.',
        riskOfInaction:
          'Phase 1 mixes aligned and misaligned enrolment; signal dilutes; Phase 2 repeats a prior gate-selection failure — cost centre repeats.',
        valueProtected:
          '18–24 months of Phase 2 development time and mid-nine-figure Phase 2 cost avoidance when the gate is fixed at the Phase 1 protocol lock, per benchmark. OPEN_ASSUMPTION on the cost line item.',
      },
    },
  },
  {
    slug: 'retrospective-co-stratification',
    title: 'Retrospective Sub-Gate Co-Stratification',
    investment: 'Standard clinical lab test on existing biobank samples',
    valueAtStake: 'Salvage path for an asset whose registrational trial failed',
    riskOfInaction:
      'The failed trial stands as unexplained. The responder subgroup remains statistically post-hoc and cannot anchor a prospective Phase 2.',
    valueProtected:
      'If the sub-gate confirms a meaningful ORR delta in the retained subgroup, the program has a prospective Phase 2 path in a defined population. NPV of a successful Phase 2 in a defined sub-population: single-digit to low-double-digit millions [OA].',
    urgency: 'HIGH — biobank samples from failed trials have a finite storage window.',
    claimType: 'OPEN_ASSUMPTION [OA] — NPV range from prior CrisPRO analysis.',
    personaCopy: {
      oncologist: {
        valueAtStake: 'Salvage path for a franchise asset whose registrational readout failed — the responder subgroup is the substrate.',
        riskOfInaction:
          'The failed trial stands as unexplained heterogeneity; the responder subgroup is post-hoc; no prospective Phase 2 protocol can anchor on it.',
        valueProtected:
          'A confirmed sub-gate ORR delta in the retained subgroup underwrites a prospective Phase 2 in a defined population — an NPV of single-digit to low-double-digit millions on an otherwise sunk asset [OA].',
      },
      patient: {
        title: 'Rescuing a drug from a failed trial by finding the patients it did help',
        investment: 'A standard lab test run on tumor samples the trial already collected',
        valueAtStake: 'A second chance for a drug that failed its trial but did help a specific group of patients.',
        riskOfInaction:
          'The trial is written off. The patients who actually responded to the drug are noted but never confirmed. The drug never gets a properly designed second trial for that group.',
        valueProtected:
          'If the lab test confirms who really benefited, the drug can go into a new trial designed for that specific group of patients — instead of being shelved entirely.',
        urgency: 'HIGH — biobank samples from failed trials get discarded after a set number of years.',
        claimType: 'OPEN_ASSUMPTION — the estimated value comes from prior CrisPRO analyses, not from a single completed rescue trial.',
      },
      pharma: {
        valueAtStake: 'Salvage path for a failed registrational asset — retained subgroup as the sub-gate substrate.',
        riskOfInaction:
          'Failed trial stays unexplained; responder subgroup remains post-hoc; asset is written off with no receipt to underwrite a resumed Phase 2.',
        valueProtected:
          'Confirmed sub-gate ORR delta on the retained subgroup underwrites a prospective Phase 2 in a defined sub-population. NPV single-digit to low-double-digit millions on the salvaged asset [OA].',
      },
    },
  },
  {
    slug: 'prospective-co-stratification',
    title: 'Prospective Biomarker Co-Stratification in Ongoing Phase 1',
    investment: 'Protocol amendment adding a systemic biomarker as a co-stratification variable',
    valueAtStake: 'Phase 1 biomarker strategy for a franchise asset',
    riskOfInaction:
      'Phase 1 cannot distinguish aligned from misaligned patients. The systemic biomarker signal is never prospectively validated. Phase 2 biomarker strategy remains undefined.',
    valueProtected:
      'Co-stratification cost is a rounding error against Phase 2 biomarker-failure cost. Eliminates one Phase 2 biomarker-failure cycle in the estimated tens-of-millions range.',
    urgency: 'HIGH — trial is ongoing.',
    claimType: 'OPEN_ASSUMPTION — Phase 2 biomarker failure cost based on industry benchmarks.',
    personaCopy: {
      oncologist: {
        valueAtStake: 'Biomarker strategy for a franchise asset in an ongoing Phase 1 — locks the systemic-vs-tissue read prospectively.',
        riskOfInaction:
          'Phase 1 cannot resolve aligned vs. misaligned enrolment; the systemic biomarker signal is never prospectively validated; Phase 2 biomarker strategy stays undefined.',
        valueProtected:
          'A co-stratification amendment costs a rounding error against Phase 2 biomarker-failure cost, and eliminates one Phase 2 biomarker-failure cycle in the tens-of-millions range.',
      },
      patient: {
        title: 'Adding a small blood test to an ongoing trial so the next trial gets the right marker',
        investment: 'A protocol change adding a simple blood measurement to a trial that is already running',
        valueAtStake: 'Whether the next trial uses the lab test that actually predicts who benefits.',
        riskOfInaction:
          'The ongoing trial mixes patients whose biology fits the drug and patients whose biology doesn’t, without a way to tell them apart. The next trial has no confirmed test to use.',
        valueProtected:
          'The extra measurement costs almost nothing compared to running another whole trial after a biomarker guess fails. It saves one full trial cycle costing tens of millions.',
        urgency: 'HIGH — this can only be added while the current trial is still enrolling.',
        claimType: 'OPEN_ASSUMPTION — the trial-cost numbers come from industry benchmarks, not a single trial.',
      },
      pharma: {
        valueAtStake: 'Phase 1 biomarker strategy for a franchise asset — prospective co-stratification is the audit substrate.',
        riskOfInaction:
          'Phase 1 cannot separate aligned from misaligned enrolment; systemic biomarker read never prospectively validated; Phase 2 biomarker strategy remains a bet.',
        valueProtected:
          'Amendment cost is a rounding error against Phase 2 biomarker-failure cost. Eliminates one Phase 2 biomarker-failure cycle — tens-of-millions range, on the OPEN_ASSUMPTION cost benchmark.',
      },
    },
  },
];

// Legacy default; kept for backward compatibility with consumers not yet rewired.
export const SUMMARY_VALUE_STATEMENT =
  'Three CrisPRO analysis modes — gate definition, retrospective sub-gate, prospective co-stratification — jointly protect the majority of Phase 2 downside risk for a mechanism-defined asset.';

// Persona-aware variant. Consumers rewire to SUMMARY_VALUE_STATEMENT_DECK[persona].
export const SUMMARY_VALUE_STATEMENT_DECK: Record<'oncologist' | 'patient' | 'pharma', string> = {
  oncologist:
    'Three CrisPRO analysis modes — gate definition, retrospective sub-gate, prospective co-stratification — jointly cover the dominant Phase 2 downside risks on a mechanism-defined asset.',
  patient:
    'Three ways CrisPRO helps a drug program: get the patient-selection rule right before the trial starts, find who the drug really helped in a failed trial, and add the right test to a trial that is still running. Together they take the guesswork out of who benefits from a drug.',
  pharma:
    'Three CrisPRO analysis modes — pre-Phase-1 gate definition, retrospective sub-gate salvage, prospective co-stratification — jointly underwrite the majority of Phase 2 downside on a mechanism-defined asset, each as an audit-grade receipt.',
};

export const getCapability = (slug: string): CapabilityEntry | undefined =>
  CAPABILITY_REGISTRY.find((c) => c.slug === slug);

export const getComparator = (slug: string): Comparator | undefined =>
  COMPARATORS.find((c) => c.slug === slug);

export const getRoiScenario = (slug: string): RoiScenario | undefined =>
  ROI_SCENARIOS.find((r) => r.slug === slug);
