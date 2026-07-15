// ============================================================================
// depth-layer.ts — the substrate that backs every product capability.
//
// Sources:
//   - Internal capability registry + governance audit (kept off-site)
//   - Public science: BRCA/PARP mechanism, DepMap dependency signal,
//     CIViC, ClinicalTrials.gov, PMID 35428381 (MBD4-LOF + gemcitabine)
//
// Discipline:
//   - PUBLISHED here: axis names, modality definitions, tier criteria,
//     governance commitments, public gene/target anchors, PMIDs.
//   - NEVER published here: client program identifiers, ranker math,
//     dimensionality claims, cosine/dot-product notation, retired numerics.
//     The caspro-lint/forbidden_values.py scanner is the source of truth.
//   - Every capability MUST resolve substrateSlugs + governanceSlugs against
//     entries in this file (enforced by caspro-lint/capability_depth_lint.py).
//
// Persona overlay (D15):
//   - PATIENT_VECTOR_AXES, EVIDENCE_MODALITIES_7, EVIDENCE_TIERS_4, and
//     GOVERNANCE_GUARDRAILS each carry an optional personaCopy overlay.
//   - PUBLIC_MANDATORY_DISCLOSURES_DECK + PUBLIC_PROHIBITED_CLAIMS_DECK
//     expose persona-varied disclosures alongside the legacy defaults.
//   - Access at read sites via personaField(entry, key, persona) from
//     src/lib/persona-copy-guards; the fallback is always the English root.
// ============================================================================

import type { Persona } from '@/context/PersonaContext';
import type { PersonaOverlay } from '@/lib/persona-copy-guards';

// ---------------------------------------------------------------------------
// PATIENT_VECTOR_AXES — the biology axes we score a patient on.
// Each axis is a measurable feature of tumour biology; the site describes
// what each axis captures, not how the axes combine into a score.
// ---------------------------------------------------------------------------

export interface PatientVectorAxisCopyFields {
  name: string;
  oneLiner: string;
  whatMeasures: string;
  publicAnchor: string;
}

export interface PatientVectorAxis extends PatientVectorAxisCopyFields {
  axis: string;
  capabilitiesThatUseIt: string[]; // capability slugs from CAPABILITY_REGISTRY
  personaCopy?: PersonaOverlay<PatientVectorAxisCopyFields>;
}

export const PATIENT_VECTOR_AXES: PatientVectorAxis[] = [
  {
    axis: 'ddr',
    name: 'DNA damage response',
    oneLiner: 'How intact the tumour’s DNA repair machinery is.',
    whatMeasures:
      'Somatic and germline status of DDR genes (BRCA1/2, ATM, PALB2, RAD51 paralogs, mismatch-repair genes) plus homologous-recombination deficiency (HRD) signal and microsatellite-instability (MSI) status.',
    publicAnchor:
      'BRCA1/2 loss + PARP inhibitor sensitivity is the canonical DDR-vulnerability signal established in ovarian, breast, prostate, and pancreatic cancer.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'biomarker-failure-prediction',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'How well the tumour can repair its own DNA',
        oneLiner: 'Whether the tumour can still fix broken DNA — or whether the repair kit is missing.',
        whatMeasures:
          'The tumour is checked for damage to the genes that normally fix broken DNA (including BRCA1, BRCA2, and a handful of related ones). When several of those repair genes are broken, the tumour has a harder time surviving a drug that keeps damaging its DNA.',
        publicAnchor:
          'BRCA1 or BRCA2 damage predicts response to a class of drugs called PARP inhibitors. This is one of the best-known examples of matching a drug to the exact biology of a tumour.',
      },
      pharma: {
        name: 'DDR / HRD / MSI axis',
        oneLiner: 'DDR-competence status — the primary substrate for PARP, ATRi, and DDR-combo franchise decisions.',
        whatMeasures:
          'Composite DDR read: somatic + germline DDR-gene status (BRCA1/2, ATM, PALB2, RAD51 paralogs, MMR genes), HRD score, MSI status. Feeds admissible-set derivation for DDR-directed and platinum-context assets.',
        publicAnchor:
          'BRCA1/2-loss → PARPi sensitivity is the canonical DDR biomarker–drug alignment in ovarian, breast, prostate, and pancreatic franchises. Cited across CDx pathways and DDR-combo pipelines.',
      },
    },
  },
  {
    axis: 'mapk',
    name: 'MAPK pathway state',
    oneLiner: 'Which node of the MAPK cascade is active in this tumour.',
    whatMeasures:
      'KRAS / NRAS / BRAF mutation status and subtype (KRAS-G12C vs G12D vs G12V, BRAF-V600E vs class II/III), plus downstream MEK/ERK activation signals.',
    publicAnchor:
      'KRAS-G12C responds to sotorasib/adagrasib, BRAF-V600E to BRAF+MEK combinations; the same MAPK-driven tumour has very different admissible therapy sets by subtype.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'Which growth-signal switch is stuck "on"',
        oneLiner: 'Which specific growth switch is stuck on inside the tumour.',
        whatMeasures:
          'The tumour is checked for changes in the KRAS, NRAS, and BRAF genes — the switches that tell a tumour to keep growing. The exact letter that is changed matters. A KRAS change at position "G12C" and one at "G12D" look similar on paper but respond to very different drugs.',
        publicAnchor:
          'The drug that works for a KRAS-G12C tumour does not work for a KRAS-G12D tumour, even though both are called "KRAS-mutant." A drug for a BRAF-V600E tumour does not work for a BRAF change of a different type.',
      },
      pharma: {
        name: 'MAPK pathway substrate',
        oneLiner: 'MAPK-node substrate: sub-lesion resolution determines admissible franchise assets and combo logic.',
        whatMeasures:
          'KRAS / NRAS / BRAF status resolved at lesion sub-type (G12C vs G12D vs G12V, class I vs II vs III BRAF) plus MEK/ERK activation read. Feeds franchise-alignment matrix + combo admissibility.',
        publicAnchor:
          'KRAS-G12C → sotorasib / adagrasib; BRAF-V600E → BRAFi + MEKi. Same axis, non-overlapping admissible sets — differentiated substrate is a franchise-level differentiator in NDA-track programs.',
      },
    },
  },
  {
    axis: 'pi3k',
    name: 'PI3K / AKT / mTOR axis',
    oneLiner: 'How active the PI3K survival axis is, and why.',
    whatMeasures:
      'PTEN loss (protein and copy-number), PIK3CA hotspot mutations (E545K, H1047R), and PI3K-pathway activation signatures.',
    publicAnchor:
      'PTEN-null tumours behave differently from PIK3CA-mutant tumours even when both look "PI3K-active" on a shallow read.',
    capabilitiesThatUseIt: ['gate-tier-scoring', 'multi-asset-scoring'],
    personaCopy: {
      patient: {
        name: 'A survival pathway inside the tumour',
        oneLiner: 'How much the tumour is relying on a growth-and-survival wiring called PI3K.',
        whatMeasures:
          'Two things: whether a "brake" gene called PTEN is missing, and whether a "gas pedal" gene called PIK3CA has a specific change. Even when both make the same pathway look active from a distance, the two situations respond to different drugs.',
        publicAnchor:
          'A tumour with a missing PTEN brake behaves differently from a tumour with a broken PIK3CA gas pedal. Both look "PI3K-active" at a glance — but they need different drug choices.',
      },
      pharma: {
        name: 'PI3K / AKT / mTOR axis substrate',
        oneLiner: 'PI3K substrate resolved by lesion class — PTEN-null vs PIK3CA-hotspot admissible sets diverge.',
        whatMeasures:
          'PTEN loss (protein IHC + copy-number), PIK3CA hotspot lesions (E545K, H1047R), and pathway activation signatures. Feeds admissible-asset derivation for PI3K/AKT/mTOR-directed franchises.',
        publicAnchor:
          'PTEN-null and PIK3CA-mutant look convergent at signature level but diverge on admissible franchise assets — a lesion-resolution differentiator in franchise-fit audits.',
      },
    },
  },
  {
    axis: 'vegf',
    name: 'Angiogenesis / VEGF signalling',
    oneLiner: 'How much the tumour depends on new blood-vessel formation.',
    whatMeasures:
      'VEGF-A / VEGF-C expression, VEGF-receptor status, and hypoxia signalling (HIF1A, hypoxia signatures).',
    publicAnchor:
      'Bevacizumab, aflibercept, and TKI angiogenesis inhibitors have established but heterogeneous benefit; the axis identifies where VEGF-directed therapy is a real gate vs a shrug.',
    capabilitiesThatUseIt: ['population-funnel', 'mechanism-divergence'],
    personaCopy: {
      patient: {
        name: 'How much the tumour needs new blood vessels',
        oneLiner: 'How much the tumour is relying on making new blood vessels to keep itself fed.',
        whatMeasures:
          'The tumour is checked for signals it is sending to grow new blood vessels (VEGF signals) and for signs it is running low on oxygen. Tumours that need a lot of new blood vessels can be more vulnerable to drugs that block that process.',
        publicAnchor:
          'Bevacizumab and similar drugs starve tumours by cutting off new blood vessels. They work well for some tumours and barely at all for others. This axis helps sort those two groups apart.',
      },
      pharma: {
        name: 'Angiogenesis / VEGF axis',
        oneLiner: 'Angiogenesis substrate — the differentiator for VEGF-directed franchise admissibility in a heterogeneous responder pool.',
        whatMeasures:
          'VEGF-A / VEGF-C expression, VEGF-receptor status, hypoxia read (HIF1A + signature). Separates gate-selection anti-angiogenics from generic anti-VEGF exposure.',
        publicAnchor:
          'Bevacizumab, aflibercept, TKI anti-angiogenics — established benefit with heterogeneous responder pool. Axis-resolved gating turns a labelled indication into a franchise-fit call.',
      },
    },
  },
  {
    axis: 'her2',
    name: 'HER-family receptor state',
    oneLiner: 'Which HER-family receptor is driving proliferation.',
    whatMeasures:
      'HER2 (ERBB2) amplification and mutation, EGFR (ERBB1) amplification and mutation, HER3 (ERBB3) expression, and downstream PI3K/MAPK activation.',
    publicAnchor:
      'HER2-amplified tumours respond to HER2-directed antibodies and ADCs; HER2-mutant (non-amplified) tumours use a different admissible set (tucatinib, neratinib, T-DXd context).',
    capabilitiesThatUseIt: ['multi-asset-scoring', 'biomarker-failure-prediction'],
    personaCopy: {
      patient: {
        name: 'Which HER receptor is driving the tumour',
        oneLiner: 'Which specific receptor in the HER family is making the tumour grow.',
        whatMeasures:
          'The tumour is checked for extra copies of HER2, changes in the HER2 gene, extra copies of EGFR, changes in EGFR, and how much HER3 is being made. Two tumours can both be called "HER2" — but a tumour with too many copies of HER2 responds to different drugs than a tumour with a change inside the HER2 gene.',
        publicAnchor:
          'A tumour with too many copies of HER2 responds to trastuzumab and other HER2-directed drugs. A tumour with a change (mutation) inside the HER2 gene, without extra copies, uses a different drug set including tucatinib, neratinib, and the antibody-drug conjugate T-DXd.',
      },
      pharma: {
        name: 'HER-family receptor state',
        oneLiner: 'HER-family substrate — amplification vs mutation resolution drives admissible ADC / TKI / mAb franchise sets.',
        whatMeasures:
          'ERBB2 amplification and mutation, ERBB1 (EGFR) amplification and mutation, ERBB3 expression, plus downstream PI3K/MAPK read. Feeds admissible-asset derivation across HER2-directed antibody, ADC, and pan-HER TKI franchises.',
        publicAnchor:
          'HER2-amp → HER2-mAb / ADC franchise. HER2-mut (non-amp) → different admissible set (tucatinib, neratinib, T-DXd). Amp vs mut is a franchise-alignment differentiator in HER2-track programs.',
      },
    },
  },
  {
    axis: 'io',
    name: 'Immune / IO axis',
    oneLiner: 'How likely this tumour is to see benefit from immunotherapy.',
    whatMeasures:
      'Tumour mutational burden (tissue TMB and blood TMB), MSI-H status, PD-L1 combined positive score (CPS), CD8+ T-cell infiltration, and interferon-γ signature.',
    publicAnchor:
      'MSI-H and TMB-high tumours drive most durable checkpoint-inhibitor responses; MSS tumours require different logic.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'How visible the tumour is to the immune system',
        oneLiner: 'How much the tumour looks "foreign" to the immune system — and whether immunotherapy is likely to work.',
        whatMeasures:
          'Several signals are combined: how many mutations the tumour is carrying (more mutations often make it easier for the immune system to spot), whether the tumour has a specific instability pattern called MSI-high, how much PD-L1 the tumour is making, how many immune cells have made it inside the tumour, and how "hot" the tumour looks by inflammation signals.',
        publicAnchor:
          'Tumours that are MSI-high or that carry many mutations get the biggest benefit from immunotherapy drugs (checkpoint inhibitors). Tumours in the opposite group — called MSS — usually need a different plan.',
      },
      pharma: {
        name: 'Immune / IO axis substrate',
        oneLiner: 'IO-responsiveness substrate — the primary read for IO franchise fit, IO-combo admissibility, and IO-resistant-population strategy.',
        whatMeasures:
          'Composite IO substrate: tissue + blood TMB, MSI status, PD-L1 CPS, CD8 infiltration, IFN-γ signature. Feeds IO franchise fit + IO-resistant-population franchise strategy.',
        publicAnchor:
          'MSI-H / TMB-high defines the durable IO-responder pool. MSS + IO-cold requires a differentiated strategy (IO-priming combos, mechanism-alternative franchises) — an axis-resolved substrate call.',
      },
    },
  },
  {
    axis: 'efflux',
    name: 'Drug-efflux capacity',
    oneLiner: 'How well the tumour pumps small-molecule drugs out.',
    whatMeasures:
      'ABC-transporter expression: MDR1 (ABCB1), BCRP (ABCG2), MRP family (ABCC1-6). High efflux capacity is a known resistance mechanism for many oral small molecules.',
    publicAnchor:
      'Efflux status is under-used as a gate/no-gate signal even though it explains a real fraction of small-molecule non-response.',
    capabilitiesThatUseIt: ['gate-tier-scoring', 'population-funnel'],
    personaCopy: {
      patient: {
        name: 'How well the tumour pushes drugs back out',
        oneLiner: 'How well the tumour can pump a pill-form drug back out before the drug does its job.',
        whatMeasures:
          'The tumour is checked for the amount of "pump" proteins on its surface that push small drug molecules out — the ABC-transporter family, including MDR1 and BCRP. When those pumps are very active, a small-molecule pill can be pushed out of the tumour cells before it has time to work.',
        publicAnchor:
          'This is an under-used signal. It explains a real slice of cases where a pill-form drug looked promising in the lab but did not work in a patient — because the tumour was pumping the drug back out.',
      },
      pharma: {
        name: 'Drug-efflux capacity',
        oneLiner: 'Efflux substrate — an under-scored gate/no-gate call that explains a measurable slice of small-molecule non-response.',
        whatMeasures:
          'ABC-transporter panel: ABCB1 (MDR1), ABCG2 (BCRP), ABCC1-6 (MRP family). Feeds gate-selection call for small-molecule assets and explains a slice of oral-small-molecule non-response.',
        publicAnchor:
          'Efflux capacity is under-scored across the industry as a gate/no-gate signal — an axis-resolved efflux call is a differentiator in oral-small-molecule franchise selection.',
      },
    },
  },
  {
    axis: 'rss',
    name: 'Replication-stress signature',
    oneLiner: 'How much the tumour is running on replication-stress signalling.',
    whatMeasures:
      'CCNE1 amplification, MYC amplification, ARID1A loss-of-function, TP53 loss-of-function, and MSI-H status — all drivers of replication stress that create ATR/CHK1/WEE1-inhibitor vulnerability.',
    publicAnchor:
      'CCNE1-amplified tumours are the canonical ATR-inhibitor-sensitive population; the replication-stress axis identifies mechanistically related vulnerabilities across histologies.',
    capabilitiesThatUseIt: [
      'biomarker-failure-prediction',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'How stressed the tumour’s copying machinery is',
        oneLiner: 'How stressed-out the tumour’s DNA-copying machinery is — and whether that stress can be pushed until it kills the tumour.',
        whatMeasures:
          'The tumour is checked for a mix of changes — extra copies of CCNE1 or MYC, and broken versions of ARID1A or TP53 — that all push the tumour into fast, sloppy DNA copying. That "hurry-up" behaviour makes the tumour vulnerable to drugs that block the safety checks (ATR, CHK1, or WEE1 inhibitors).',
        publicAnchor:
          'Tumours with extra copies of CCNE1 are the best-known example of tumours that respond to ATR inhibitors. The same axis picks up similar vulnerabilities across many tumour types.',
      },
      pharma: {
        name: 'Replication-stress substrate',
        oneLiner: 'Replication-stress substrate — the cross-histology admissible-set anchor for ATR / CHK1 / WEE1 franchises.',
        whatMeasures:
          'CCNE1 amp, MYC amp, ARID1A LOF, TP53 LOF, MSI-H — drivers of replication stress that create ATR/CHK1/WEE1 admissible substrate. Feeds cross-histology franchise-fit read.',
        publicAnchor:
          'CCNE1-amp → ATRi sensitivity is the canonical rep-stress anchor. Substrate lets ATRi/CHK1i/WEE1i franchises operate on a cross-histology admissible pool instead of a single-histology label.',
      },
    },
  },
];

// ---------------------------------------------------------------------------
// EVIDENCE_MODALITIES_7 — the 7 evidence types we score dependency claims on.
// Each modality has a weight in the internal admissibility scorecard and a
// public-facing example. The modality-weight table is internal; the modality
// definitions themselves are published so the site can show what evidence
// depth means for a claim.
// ---------------------------------------------------------------------------

export interface EvidenceModalityCopyFields {
  name: string;
  whatItMeasures: string;
  dataSource: string;
  positiveThreshold: string;
  publicExample: string;
}

export interface EvidenceModality extends EvidenceModalityCopyFields {
  modality: string;
  personaCopy?: PersonaOverlay<EvidenceModalityCopyFields>;
}

export const EVIDENCE_MODALITIES_7: EvidenceModality[] = [
  {
    modality: 'crispr-dependency',
    name: 'CRISPR dependency (genetic KO)',
    whatItMeasures:
      'Does knocking out gene X selectively kill tumour cells that carry biomarker Y? Genome-scale CRISPR-Cas9 knockout screens across hundreds of cancer cell lines, stratified by biomarker status.',
    dataSource:
      'DepMap Portal (Broad Institute), Sanger Cancer Dependency Map, Achilles project',
    positiveThreshold:
      'Wilcoxon FDR < 0.05 AND Cohen’s d ≥ 0.5 across biomarker-positive vs biomarker-negative lines.',
    publicExample:
      'CDK2 dependency selectively enriched in CCNE1-amplified cell lines in DepMap.',
    personaCopy: {
      patient: {
        name: 'Which gene the tumour cannot live without',
        whatItMeasures:
          'Scientists switch off one gene at a time in hundreds of different tumour cell lines. If a tumour cell dies specifically when a particular gene is turned off — and only in tumours that have a specific biomarker — that gene is one the tumour depends on. The scientists then check if a drug can hit the same gene safely in patients.',
        dataSource:
          'Public research libraries built by the Broad Institute (DepMap) and the Sanger Institute — where the results of thousands of these switch-off experiments are collected.',
        positiveThreshold:
          'The effect has to be large (much stronger tumour-cell death in the biomarker group than in the non-biomarker group) and it has to be reliable (statistically strong even after accounting for many genes being tested).',
        publicExample:
          'CDK2 is a gene that some tumours depend on. Tumours with extra copies of CCNE1 die more strongly when CDK2 is switched off — a real, reproducible pattern in these public libraries.',
      },
      pharma: {
        name: 'CRISPR dependency (DepMap-class evidence)',
        whatItMeasures:
          'Genome-scale CRISPR-Cas9 knockout screens across cancer cell lines, biomarker-stratified. This is the primary source-of-truth modality for dependency claims and admissible-target derivation — the DepMap-class read that every downstream modality is triangulated against.',
        dataSource:
          'DepMap Portal (Broad), Sanger Cancer Dependency Map, Achilles — third-party audited, quarterly-refreshed dependency evidence base.',
        positiveThreshold:
          'Wilcoxon FDR < 0.05 AND Cohen’s d ≥ 0.5 across biomarker-positive vs biomarker-negative lines. Both thresholds required — one alone is not admissible.',
        publicExample:
          'CDK2 dependency in CCNE1-amplified lines — DepMap Cohen’s d ≈ −0.72, an audit-trail-grade dependency signal.',
      },
    },
  },
  {
    modality: 'in-vitro-functional',
    name: 'In vitro functional (pharmacology + isogenic KO)',
    whatItMeasures:
      'Does the drug/target combination produce a real killing effect in a cell-line model, with a matched isogenic KO/rescue?',
    dataSource:
      'PubMed-indexed primary in-vitro pharmacology, isogenic knockout/knock-in studies',
    positiveThreshold:
      'IC50 ratio ≥ 3.0 between biomarker-positive and biomarker-negative isogenic pairs, with rescue on re-expression.',
    publicExample:
      'PARP inhibitor sensitivity in BRCA1-null vs BRCA1-restored isogenic pairs.',
    personaCopy: {
      patient: {
        name: 'Does the drug actually work in a matched lab test?',
        whatItMeasures:
          'A drug is tested against two nearly-identical tumour cell lines — one with the biomarker (say, a broken BRCA1 gene) and one without. If the drug kills the biomarker-carrying cells at a much lower dose, and if replacing the missing gene rescues the cells, that is a real, matched-pair signal that the drug is going after the right thing.',
        dataSource:
          'Published lab studies collected in PubMed — the standard public library of biomedical research.',
        positiveThreshold:
          'The dose needed to kill the biomarker-carrying cells has to be at least 3x lower than the dose needed for the biomarker-free cells. Putting the missing gene back has to make the cells resistant again.',
        publicExample:
          'PARP inhibitors like olaparib kill tumour cells with a broken BRCA1 gene at a much lower dose than tumour cells with BRCA1 replaced. This is the canonical example of a drug-biomarker match confirmed in a matched pair.',
      },
      pharma: {
        name: 'In vitro functional (isogenic KO + pharmacology)',
        whatItMeasures:
          'Biomarker–asset pharmacology in matched isogenic knockout/knock-in pairs. This is the second-tier evidence layer after DepMap-class dependency — every substrate claim expects a matched isogenic read on the audit trail.',
        dataSource:
          'PubMed-indexed primary pharmacology and isogenic KO/KI studies. Third-party publication receipt required.',
        positiveThreshold:
          'IC50 ratio ≥ 3.0 in biomarker-pos vs biomarker-neg isogenic pairs, PLUS rescue on re-expression. Both required — one alone is downgraded.',
        publicExample:
          'PARPi in BRCA1-null vs BRCA1-restored isogenic pairs — the canonical isogenic-KO-with-rescue receipt on the PARPi audit trail.',
      },
    },
  },
  {
    modality: 'in-vivo',
    name: 'In vivo efficacy (xenograft / PDX)',
    whatItMeasures:
      'Does the drug/target combination produce durable tumour regression in a mouse model that carries the relevant biomarker?',
    dataSource:
      'PubMed-indexed xenograft and patient-derived-xenograft (PDX) studies',
    positiveThreshold:
      'Statistically significant tumour regression (p < 0.05) in biomarker-positive PDX/xenograft vs vehicle control.',
    publicExample:
      'PARP-inhibitor tumour regression in BRCA-mutant ovarian and pancreatic PDX models.',
    personaCopy: {
      patient: {
        name: 'Does the drug shrink a tumour in a mouse model?',
        whatItMeasures:
          'A drug is tested in mice that carry a real human tumour with the relevant biomarker. If the tumour shrinks in those mice compared to mice given no drug, that is a stronger sign the drug will work in patients.',
        dataSource:
          'Published mouse-model studies collected in PubMed. Patient-derived xenograft models (PDX) — where the tumour comes from a real patient and is grown in a mouse — are the closest lab model to a real patient tumour.',
        positiveThreshold:
          'The tumour has to shrink in the biomarker-carrying mice, and the shrinkage has to be statistically strong compared to mice given nothing.',
        publicExample:
          'PARP inhibitors shrink BRCA-mutant ovarian and pancreatic tumours in patient-derived mouse models. That was one of the strongest signals before the drug was tested in patients.',
      },
      pharma: {
        name: 'In vivo efficacy (PDX / xenograft)',
        whatItMeasures:
          'Third modality on the audit trail — durable tumour regression in a biomarker-carrying PDX or xenograft. PDX-class evidence is the closest preclinical proxy to a franchise-relevant patient population.',
        dataSource:
          'PubMed-indexed PDX / xenograft studies. Third-party audit-trail receipt.',
        positiveThreshold:
          'Statistically significant biomarker-positive tumour regression (p < 0.05) vs vehicle control, with a durable-regression read (not transient stasis).',
        publicExample:
          'PARPi tumour regression in BRCA-mutant ovarian and pancreatic PDX — the canonical in-vivo receipt on the PARPi franchise audit trail.',
      },
    },
  },
  {
    modality: 'clinical',
    name: 'Clinical (human evidence)',
    whatItMeasures:
      'Have real patients with this biomarker responded to this therapy in a clinical trial or registry?',
    dataSource:
      'CIViC, Cancer Genome Interpreter, ClinicalTrials.gov, published Phase II/III trial reports',
    positiveThreshold:
      'At least one confirmed clinical response OR Phase II+ trial with pre-specified biomarker subgroup meeting its primary endpoint.',
    publicExample:
      'Olaparib in BRCA-mutant ovarian cancer (SOLO-1 first-line maintenance, SOLO-2 platinum-sensitive relapsed) — the canonical DDR-clinical anchor.',
    personaCopy: {
      patient: {
        name: 'Has this drug worked in real patients yet?',
        whatItMeasures:
          'Has a real patient with this specific biomarker responded to this drug in a real clinical trial? That is the strongest kind of evidence — because it is the closest thing to answering the question "will this work for me?"',
        dataSource:
          'Public medical databases (CIViC, Cancer Genome Interpreter, ClinicalTrials.gov) plus published reports from mid-stage and late-stage clinical trials.',
        positiveThreshold:
          'At least one patient with the biomarker has to have responded to the drug in a documented case — or a mid-stage trial has to have shown the drug helped the biomarker-carrying group meet its main goal.',
        publicExample:
          'Olaparib for BRCA-mutant ovarian cancer is one of the best examples: two large trials (SOLO-1 for first-line care and SOLO-2 for later care) showed patients with BRCA changes benefit.',
      },
      pharma: {
        name: 'Clinical (human receipt)',
        whatItMeasures:
          'Confirmed biomarker–asset clinical receipt. This is the highest-weight modality on the admissibility scorecard — an audit-trail-grade signal that translates franchise-fit substrate into franchise-fit outcome.',
        dataSource:
          'CIViC, Cancer Genome Interpreter, ClinicalTrials.gov, published Phase II/III trial reports. Third-party audit-trail receipt.',
        positiveThreshold:
          'At least one confirmed biomarker-defined clinical response OR a Phase II+ pre-specified biomarker subgroup meeting its primary endpoint. Ambiguous subgroup reads are downgraded to MECHANISTIC pending re-read.',
        publicExample:
          'Olaparib in BRCA-mutant ovarian (SOLO-1 first-line maintenance, SOLO-2 platinum-sensitive relapsed) — canonical DDR clinical receipt referenced across DDR franchise audits.',
      },
    },
  },
  {
    modality: 'pharmacologic-prism',
    name: 'Pharmacologic — PRISM',
    whatItMeasures:
      'Does the compound show biomarker-stratified activity in the PRISM barcoded multiplexed cell-line screen?',
    dataSource: 'Broad PRISM Repurposing Hub',
    positiveThreshold:
      'Delta AUC ≥ 2.0 between biomarker groups at FDR < 0.10.',
    publicExample:
      'PRISM-scored differential activity of ATR inhibitors across CCNE1-amp vs non-amp lines.',
    personaCopy: {
      patient: {
        name: 'Does the drug show up in a big multi-drug lab screen?',
        whatItMeasures:
          'Scientists test many drugs at once against hundreds of tumour cell lines, using a barcoding trick that lets them tell each cell line apart. If the drug is more active against tumour cells with the biomarker than against tumour cells without it, that is a supporting signal.',
        dataSource:
          'The PRISM Repurposing Hub — a public library run by the Broad Institute where thousands of compounds have been screened this way.',
        positiveThreshold:
          'The gap in drug activity between the biomarker group and the non-biomarker group has to be big enough — and consistent enough across many cell lines — to not be a chance finding.',
        publicExample:
          'ATR inhibitors show stronger activity in tumour cells with extra copies of CCNE1 in this screen — matching the mechanism-based expectation.',
      },
      pharma: {
        name: 'Pharmacologic — PRISM',
        whatItMeasures:
          'Barcoded multiplexed cell-line pharmacology from the Broad PRISM Repurposing Hub. Convergent-modality read — a PRISM hit alone is not admissible, but stacked with DepMap-class dependency + isogenic KO it consolidates the substrate call.',
        dataSource:
          'Broad PRISM Repurposing Hub — third-party audited, publicly indexed.',
        positiveThreshold:
          'Delta AUC ≥ 2.0 between biomarker groups at FDR < 0.10.',
        publicExample:
          'PRISM-scored differential ATR-inhibitor activity across CCNE1-amp vs non-amp lines — convergent-modality signal on the ATRi rep-stress franchise.',
      },
    },
  },
  {
    modality: 'pharmacologic-gdsc',
    name: 'Pharmacologic — GDSC',
    whatItMeasures:
      'Does the compound show biomarker-stratified IC50 in the Sanger GDSC panel?',
    dataSource: 'Genomics of Drug Sensitivity in Cancer (GDSC1 + GDSC2), Sanger Institute',
    positiveThreshold: 'IC50 fold-change ≥ 2.0 between biomarker groups.',
    publicExample:
      'GDSC-scored MEK-inhibitor differential IC50 across KRAS-mutant vs wild-type lines.',
    personaCopy: {
      patient: {
        name: 'Does the drug act stronger in matched lab lines?',
        whatItMeasures:
          'A second big lab library — run by the Sanger Institute in Cambridge — tests how much drug it takes to kill each of hundreds of tumour cell lines. If tumour cells with the biomarker need far less drug than tumour cells without it, that is another supporting signal.',
        dataSource:
          'GDSC (Genomics of Drug Sensitivity in Cancer) — a public research library from the Sanger Institute.',
        positiveThreshold:
          'The dose needed to kill the biomarker-carrying cells has to be at least 2x lower than the dose needed for the non-biomarker cells.',
        publicExample:
          'MEK-inhibitor drugs are more active against tumour cells with KRAS changes than against tumour cells without them — a clear pattern in this library.',
      },
      pharma: {
        name: 'Pharmacologic — GDSC',
        whatItMeasures:
          'Biomarker-stratified IC50 across the Sanger GDSC1 + GDSC2 panels. Convergent-modality read that consolidates DepMap + PRISM + isogenic evidence into a stackable substrate call.',
        dataSource:
          'GDSC1 + GDSC2, Sanger Institute — third-party audited, publicly indexed.',
        positiveThreshold:
          'IC50 fold-change ≥ 2.0 between biomarker groups.',
        publicExample:
          'GDSC-scored MEK-inhibitor differential IC50 across KRAS-mut vs wild-type — convergent-modality signal on the MAPK franchise substrate.',
      },
    },
  },
  {
    modality: 'expression-association',
    name: 'Expression association',
    whatItMeasures:
      'Does target expression covary with biomarker status across primary tumours or model systems? This is the weakest modality on its own; used to build mechanistic plausibility for a hypothesis, not to close one.',
    dataSource: 'TCGA, GEO, cBioPortal, CCLE expression',
    positiveThreshold: 'Spearman ρ > 0.3 at FDR < 0.05 across a defined tumour cohort.',
    publicExample:
      'MSI-H tumours show elevated CD8+ infiltration signature across TCGA colorectal.',
    personaCopy: {
      patient: {
        name: 'Do the tumour’s activity levels line up?',
        whatItMeasures:
          'Do tumours with the biomarker also make more (or less) of the protein the drug is going to hit? This is the weakest kind of signal on its own — it only builds a plausible story. It is used to support a hypothesis, never to prove one by itself.',
        dataSource:
          'Large public tumour databases like TCGA, GEO, cBioPortal, and CCLE — collections of tumour data from many patients across many hospitals and studies.',
        positiveThreshold:
          'The link between the biomarker and the protein activity has to be at least moderately strong and reliable across many tumours.',
        publicExample:
          'MSI-H colorectal tumours show more immune-cell activity than non-MSI-H tumours in the public colorectal database — consistent with why MSI-H tumours respond to immunotherapy.',
      },
      pharma: {
        name: 'Expression association',
        whatItMeasures:
          'Target-biomarker covariation across primary tumours or model systems. Weakest-weight modality on its own — used to build mechanistic plausibility, never to close a claim. INSUFFICIENT if the strongest modality on the stack is expression-only.',
        dataSource:
          'TCGA, GEO, cBioPortal, CCLE expression — third-party audited public tumour cohorts.',
        positiveThreshold:
          'Spearman ρ > 0.3 at FDR < 0.05 across a defined tumour cohort.',
        publicExample:
          'MSI-H → CD8-infiltration covariation in TCGA CRC — consistent with the IO franchise substrate but not on its own an IO franchise-fit call.',
      },
    },
  },
];

// ---------------------------------------------------------------------------
// EVIDENCE_TIERS_4 — the 4 tiers a dependency claim can hold.
// Every claim on the site is tier-labelled. VALIDATED is a high bar and is
// NEVER auto-assigned by the internal admissibility engine — it requires
// manual sign-off against the entry criteria.
// ---------------------------------------------------------------------------

export interface EvidenceTierCopyFields {
  name: string;
  entryCriteria: string;
  clinicalActionability: string;
  canonicalPublicExample: string;
  invariant?: string;
}

export interface EvidenceTier extends EvidenceTierCopyFields {
  tier: string;
  personaCopy?: PersonaOverlay<EvidenceTierCopyFields>;
}

export const EVIDENCE_TIERS_4: EvidenceTier[] = [
  {
    tier: 'validated',
    name: 'VALIDATED',
    entryCriteria:
      'In-vitro isogenic KO/KI evidence AND in-vivo PDX/xenograft efficacy AND at least one confirmed clinical receipt (single-patient response, case series, or Phase II+ biomarker-defined arm).',
    clinicalActionability:
      'Sufficient evidence depth to consider as a first-line hypothesis in the mechanism-fit ranker. This is where our confidence bar is set.',
    canonicalPublicExample:
      'MBD4-LOF + gemcitabine sensitivity (PMID 35428381) — isogenic KO + xenograft + confirmed clinical response.',
    invariant:
      'NEVER auto-assigned. Every VALIDATED claim on the site is manually signed off against these three criteria.',
    personaCopy: {
      patient: {
        name: 'VALIDATED — strongest evidence',
        entryCriteria:
          'Three separate kinds of evidence all point the same way: a matched-pair lab test with the missing gene put back, tumour shrinkage in a mouse carrying a real human tumour, and at least one real patient with the biomarker who responded to the drug.',
        clinicalActionability:
          'This is the highest-confidence label. A tumour hypothesis in this category is strong enough to be the first idea we bring forward when a program is being designed.',
        canonicalPublicExample:
          'MBD4 damage + gemcitabine — the biology fits, mice with these tumours shrink on gemcitabine, and a real patient with a MBD4-damaged tumour responded to gemcitabine (published in the medical journal literature).',
        invariant:
          'The VALIDATED label is never given automatically. A person has to sign off on each one against these three requirements.',
      },
      pharma: {
        name: 'VALIDATED — audit-trail-grade',
        entryCriteria:
          'Three-modality convergence: isogenic KO/KI + PDX-class in-vivo + confirmed biomarker–asset clinical receipt (single-patient, case series, or Phase II+ pre-specified biomarker subgroup). All three required — one missing modality drops the claim to STRONG or MECHANISTIC.',
        clinicalActionability:
          'Franchise-fit-grade evidence — first-line hypothesis in the mechanism-fit ranker. Sufficient depth to underwrite a franchise-alignment call and to sit on the audit trail behind an NDA-track program.',
        canonicalPublicExample:
          'MBD4-LOF + gemcitabine (PMID 35428381) — isogenic KO + xenograft + confirmed clinical response. Canonical VALIDATED audit-trail example.',
        invariant:
          'NEVER auto-assigned. Manual sign-off against the three-modality entry criteria — every VALIDATED tier on the site is on the audit trail with a named signer.',
      },
    },
  },
  {
    tier: 'strong',
    name: 'STRONG',
    entryCriteria:
      'In-vitro functional evidence + in-vivo efficacy, OR in-vitro functional evidence + pharmacologic convergence (PRISM or GDSC) at Cohen’s d ≥ 0.5.',
    clinicalActionability:
      'Sufficient depth to prioritise for confirmatory work and to include as a supporting hypothesis in the mechanism-fit ranker.',
    canonicalPublicExample:
      'CDK2 dependency in CCNE1-amplified cell lines (DepMap Cohen’s d ≈ −0.72) + in-vitro CDK2 inhibitor sensitivity.',
    personaCopy: {
      patient: {
        name: 'STRONG — solid evidence, not yet in patients',
        entryCriteria:
          'Two kinds of evidence point the same way — either matched-pair lab tests AND tumour shrinkage in mice, or matched-pair lab tests AND a big lab-library screen showing the same pattern.',
        clinicalActionability:
          'Solid enough to be worth doing the next round of confirming work — and to be considered as a supporting idea in a program, but not yet the leading idea.',
        canonicalPublicExample:
          'CDK2 as a target in tumours with extra copies of CCNE1 — strong signal in a public lab library, plus lab evidence that CDK2 inhibitors kill those tumour cells.',
      },
      pharma: {
        name: 'STRONG — franchise-supporting evidence',
        entryCriteria:
          'Convergent two-modality read: isogenic-KO functional + in-vivo, OR isogenic-KO functional + PRISM/GDSC convergence at Cohen’s d ≥ 0.5.',
        clinicalActionability:
          'Franchise-supporting-grade — sufficient depth to underwrite confirmatory work and to sit as a supporting hypothesis in the mechanism-fit ranker.',
        canonicalPublicExample:
          'CDK2 dependency in CCNE1-amp (DepMap Cohen’s d ≈ −0.72) + isogenic CDK2i sensitivity — convergent STRONG-tier read on the CCNE1-rep-stress franchise.',
      },
    },
  },
  {
    tier: 'mechanistic',
    name: 'MECHANISTIC',
    entryCriteria:
      'Pathway logic + expression association or literature precedent, without direct in-vitro/in-vivo receipts for the specific biomarker–target pair.',
    clinicalActionability:
      'A hypothesis worth pursuing; surfaced as a labelled MECHANISTIC candidate, not as a first-line ranker output.',
    canonicalPublicExample:
      'ATR / WEE1 inhibitor sensitivity in BER-deficient tumours by pathway reasoning + expression covariation.',
    personaCopy: {
      patient: {
        name: 'MECHANISTIC — a plausible idea',
        entryCriteria:
          'The biology story lines up, and there is some supporting activity data — but no direct lab test yet where scientists knocked out the specific gene and matched it to the specific drug.',
        clinicalActionability:
          'A worth-following-up idea, not a first-line recommendation. It gets labelled clearly as a plausible candidate.',
        canonicalPublicExample:
          'ATR- and WEE1-blocking drugs may work in tumours with problems in a specific DNA-repair route (BER) — a real biological reason to look, but no direct lab receipt yet.',
      },
      pharma: {
        name: 'MECHANISTIC — labelled hypothesis',
        entryCriteria:
          'Pathway logic + expression association or literature precedent, without direct isogenic-KO or PDX-class in-vivo receipts for the specific biomarker–target pair.',
        clinicalActionability:
          'Labelled MECHANISTIC candidate — held on the audit trail as a hypothesis worth pursuing, not surfaced as a first-line ranker output. Distinct from STRONG on modality depth.',
        canonicalPublicExample:
          'ATRi / WEE1i sensitivity in BER-deficient tumours by pathway reasoning + expression covariation — labelled MECHANISTIC pending isogenic-KO + in-vivo receipts.',
      },
    },
  },
  {
    tier: 'insufficient',
    name: 'INSUFFICIENT',
    entryCriteria:
      'Fewer than two independent modalities meet threshold, or the strongest modality is expression-association alone.',
    clinicalActionability:
      'Not surfaced as an actionable claim. Held in the internal audit queue for re-evaluation as evidence accumulates.',
    canonicalPublicExample:
      'Expression-only associations without functional or clinical corroboration.',
    personaCopy: {
      patient: {
        name: 'INSUFFICIENT — not enough evidence to act on',
        entryCriteria:
          'Only one kind of evidence has been found, or the only evidence is that some proteins go up and down together — which is the weakest kind of signal on its own.',
        clinicalActionability:
          'Not shown as an actionable idea on the site. We keep track of it internally and re-check as new evidence appears.',
        canonicalPublicExample:
          'A pattern where two things move together in tumour data — but with no lab or patient evidence to confirm the drug actually works.',
      },
      pharma: {
        name: 'INSUFFICIENT — held off the surfaced audit trail',
        entryCriteria:
          'Fewer than two independent modalities meet threshold, or the strongest modality is expression-association alone. Fails the admissibility scorecard.',
        clinicalActionability:
          'Held in the internal audit queue — not surfaced as a franchise-fit call, not on the released ranker output. Re-evaluated as evidence stacks.',
        canonicalPublicExample:
          'Expression-only association absent isogenic / in-vivo / clinical convergence — held INSUFFICIENT until the modality stack builds.',
      },
    },
  },
];

// ---------------------------------------------------------------------------
// GOVERNANCE_GUARDRAILS — commitments that back every capability output.
// The math of the ranker is internal. What we publish is the operational
// commitments: version-locking, admissibility, receipts, and reproducibility.
// ---------------------------------------------------------------------------

export interface GovernanceGuardrailCopyFields {
  name: string;
  whatItLocks: string;
  publicDisclosure: string;
}

export interface GovernanceGuardrail extends GovernanceGuardrailCopyFields {
  slug: string;
  receiptLocation: string;
  appliesToCapabilities: string[]; // capability slugs
  personaCopy?: PersonaOverlay<GovernanceGuardrailCopyFields>;
}

export const GOVERNANCE_GUARDRAILS: GovernanceGuardrail[] = [
  {
    slug: 'ranker-version-lock',
    name: 'Ranker version lock',
    whatItLocks:
      'The mechanism-fit ranking function is version-locked. Every score carries the ranker version that produced it, and the ranker is immutable within a release. Any ranker change is a labelled release with a re-run of every affected output.',
    publicDisclosure:
      'CrisPRO reports a single deterministic fit score for any patient-biology / trial-target pair under a given ranker version. The score is reproducible on demand.',
    receiptLocation: 'Internal ranker manifest signed at release cut.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'Same input, same answer',
        whatItLocks:
          'The math CrisPRO uses to rank drug-tumour matches is frozen inside each release. Same tumour and same drug will always give the same number as long as the release is the same. When the math is ever changed, everything is re-run and the change is written down publicly.',
        publicDisclosure:
          'A given tumour and a given drug will always get the same ranking from CrisPRO — as long as the version of the tool has not changed. That number can be re-checked at any time.',
      },
      pharma: {
        name: 'Ranker version-lock — audit-trail commitment',
        whatItLocks:
          'Mechanism-fit ranker is version-locked and immutable within release. Every emitted score carries its ranker version manifest. Any ranker delta is a labelled release with a full re-run of affected outputs and a named signer on the audit trail.',
        publicDisclosure:
          'For a given patient-biology / trial-target pair under a given ranker version, CrisPRO emits a deterministic fit score. The score is reproducible on demand — a franchise-audit-grade reproducibility commitment.',
      },
    },
  },
  {
    slug: 'ranker-variant-prohibition',
    name: 'Ranker-variant prohibition',
    whatItLocks:
      'Alternative scoring variants that were considered and rejected during ranker design are prohibited from production outputs. The prohibited-variant list is enforced by the caspro-lint scanner.',
    publicDisclosure:
      'CrisPRO does not fall back to a rejected scoring variant if the primary output looks unfavourable. Only the released ranker version is admissible.',
    receiptLocation: 'caspro-lint/forbidden_values.py',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'No swapping to a "friendlier" math',
        whatItLocks:
          'When the CrisPRO team was picking a formula, several other options were considered and put aside. Those rejected options are blocked from ever showing up in the answers the tool gives — so no one can ever swap in an old formula because a new tumour did not look "friendly" enough.',
        publicDisclosure:
          'If the answer for a tumour looks unfavourable, the tool never quietly switches to an old, rejected formula to make it look better. Only the current, released version of the math is used.',
      },
      pharma: {
        name: 'Ranker-variant prohibition',
        whatItLocks:
          'Scoring variants considered and rejected during ranker design are prohibited from production outputs. The prohibited-variant list is enforced by the caspro-lint scanner as a hard gate on every release.',
        publicDisclosure:
          'CrisPRO does not fall back to a rejected scoring variant when a primary output looks unfavourable. Only the released ranker version is admissible — a franchise-audit-grade guardrail against post-hoc variant swap.',
      },
    },
  },
  {
    slug: 'admissibility-policy',
    name: 'Admissibility policy',
    whatItLocks:
      'Every claim, every score, every population estimate must be traceable to a source receipt. No claim is admissible without a source; unsourced aggregates are downgraded to a labelled OPEN_ASSUMPTION.',
    publicDisclosure:
      'CrisPRO reports carry source receipts for every claim. Any aggregate that cannot be traced is labelled as an assumption on the surface it appears on.',
    receiptLocation: 'Internal source-receipt audit + KG quantitative anchors.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'Every number has a source',
        whatItLocks:
          'Every claim, every score, and every patient-count number CrisPRO gives has to point back to a real source (a real paper, a real database, a real trial record). When a number cannot be traced back to a source, it is clearly labelled as an assumption instead of an evidence-based claim.',
        publicDisclosure:
          'The reports CrisPRO produces show where every number came from. Anything that could not be traced is called out as an assumption — not hidden.',
      },
      pharma: {
        name: 'Admissibility policy — receipt discipline',
        whatItLocks:
          'Every claim, score, and population estimate on the audit trail must be traceable to a source receipt. Unsourced aggregates are downgraded to labelled OPEN_ASSUMPTION and quarantined until the receipt is resolved.',
        publicDisclosure:
          'CrisPRO reports carry source receipts on every claim. Untraceable aggregates are labelled OPEN_ASSUMPTION on the surface they appear — a franchise-audit-grade admissibility commitment.',
      },
    },
  },
  {
    slug: 'forbidden-string-audit',
    name: 'Forbidden-string audit',
    whatItLocks:
      'Retired numerics, quarantined identifiers, and prohibited terminology are blocked from every commit before merge. The scanner runs on every build and is a hard gate.',
    publicDisclosure:
      'CrisPRO ships with an open lint layer (caspro-lint) that blocks quarantined values from ever reaching the site. The lint is a hard gate on every release.',
    receiptLocation: 'caspro-lint/forbidden_values.py',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'Retired numbers and words are blocked',
        whatItLocks:
          'Old numbers that were withdrawn, IDs that were flagged, and words that are not supposed to be used anymore are all blocked automatically — before any code change reaches the website. A scanner runs on every code change and refuses to let anything on the block-list through.',
        publicDisclosure:
          'A tool called caspro-lint runs before every website update and blocks old, withdrawn, or restricted content from ever appearing on the site. Blocking is automatic — a person cannot override it.',
      },
      pharma: {
        name: 'Forbidden-string audit — hard build gate',
        whatItLocks:
          'Retired numerics, quarantined identifiers, and prohibited terminology are blocked from every commit before merge. Enforced as a hard build gate on every release — no manual override on the CI path.',
        publicDisclosure:
          'CrisPRO ships with an open-source lint layer (caspro-lint) that blocks quarantined values from ever reaching the site. The lint is a franchise-audit-grade hard gate on every release.',
      },
    },
  },
  {
    slug: 'reproducibility-lock',
    name: 'Reproducibility lock',
    whatItLocks:
      'Every capability output must be reproducible from source data + the released ranker version. Any output that cannot be re-derived is quarantined until the delta is resolved.',
    publicDisclosure:
      'CrisPRO commits to reproducibility on every capability. An output that cannot be re-derived from source + ranker version is not surfaced to a partner.',
    receiptLocation: 'src/data/capability-registry.ts + release audit trail.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
    personaCopy: {
      patient: {
        name: 'Every answer can be re-checked',
        whatItLocks:
          'Every answer the CrisPRO tool gives must be reproducible — meaning you can start from the raw evidence and the same math and get the same answer. If an answer cannot be re-checked in that way, it is held back from the site until the reason is figured out.',
        publicDisclosure:
          'CrisPRO promises that any answer on the site can be re-checked from the underlying evidence. Anything that cannot be re-checked is held back — not shown to a partner or a program team.',
      },
      pharma: {
        name: 'Reproducibility lock',
        whatItLocks:
          'Every capability output must be re-derivable from source data + the released ranker version. Non-reproducible output is quarantined off the surfaced audit trail until the delta is resolved and re-signed.',
        publicDisclosure:
          'CrisPRO commits to reproducibility on every capability output. Non-reproducible outputs never leave the internal quarantine — a franchise-audit-grade reproducibility floor.',
      },
    },
  },
];

// ---------------------------------------------------------------------------
// PUBLIC_MANDATORY_DISCLOSURES — the subset we surface on the site.
// Client-tainted disclosures stay in the internal audit trail.
// ---------------------------------------------------------------------------

export const PUBLIC_MANDATORY_DISCLOSURES: string[] = [
  'All deal figures, patient-population estimates, and cost-avoidance ranges are benchmarks derived from comparable transactions and industry data. They are not guaranteed outcomes for any specific program.',
  'CrisPRO does NOT predict individual patient outcomes and is NOT a clinical decision-support tool. Every output is intended for research and program-strategy use, not for direct patient care.',
];

// Persona-varied disclosures (D15). Legacy list above kept for backward compat.
export const PUBLIC_MANDATORY_DISCLOSURES_DECK: Record<Persona, string[]> = {
  oncologist: PUBLIC_MANDATORY_DISCLOSURES,
  patient: [
    'Every deal figure, patient-count estimate, and cost-avoidance range on this site is a benchmark based on similar deals and public data. These are examples of what has happened elsewhere — they are not promises about what will happen for any specific drug or trial.',
    'CrisPRO does not predict what will happen for a specific patient. This is not a clinical tool for individual care. Every answer here is meant for people who are designing research and drug programs — not for choosing your own treatment.',
  ],
  pharma: [
    'All deal figures, patient-population estimates, and cost-avoidance ranges are benchmarks derived from comparable transactions and industry data. They are not guaranteed outcomes for any specific program — every franchise underwrite is program-specific.',
    'CrisPRO is not a clinical decision-support tool and does not predict individual patient outcomes. Every output is intended for research, franchise-alignment, and program-strategy use — not for direct patient care.',
  ],
};

// ---------------------------------------------------------------------------
// PUBLIC_PROHIBITED_CLAIMS — the commitments we publish alongside our claims.
// ---------------------------------------------------------------------------

export const PUBLIC_PROHIBITED_CLAIMS: string[] = [
  'CrisPRO does not claim to predict individual patient outcomes.',
  'CrisPRO does not claim FDA clearance or CE marking. It is not a regulated medical device.',
  'CrisPRO does not fall back to a rejected scoring variant when the primary ranker output looks unfavourable. Only the released ranker version is admissible.',
  'CrisPRO does not claim to be a clinical decision-support tool.',
];

// Persona-varied prohibited claims (D15). Legacy list above kept for backward compat.
export const PUBLIC_PROHIBITED_CLAIMS_DECK: Record<Persona, string[]> = {
  oncologist: PUBLIC_PROHIBITED_CLAIMS,
  patient: [
    'CrisPRO does not predict what will happen for a specific patient.',
    'CrisPRO is not cleared by the FDA and does not have a CE mark. It is not a regulated medical device.',
    'CrisPRO never quietly switches to an old, rejected formula because the answer for a tumour looks unfavourable. Only the current, released version of the math is used.',
    'CrisPRO is not a tool to decide what treatment a patient should get.',
  ],
  pharma: [
    'CrisPRO does not claim to predict individual patient outcomes — franchise-fit is a population-level substrate call, not an individual-outcome projection.',
    'CrisPRO does not claim FDA clearance or CE marking. It is not a regulated medical device — franchise-audit use only.',
    'CrisPRO does not fall back to a rejected scoring variant when the primary ranker output looks unfavourable. Only the released ranker version is admissible — a franchise-audit-grade discipline.',
    'CrisPRO is not a clinical decision-support tool.',
  ],
};

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export const getAxis = (axis: string) => PATIENT_VECTOR_AXES.find((a) => a.axis === axis);
export const getModality = (modality: string) =>
  EVIDENCE_MODALITIES_7.find((m) => m.modality === modality);
export const getTier = (tier: string) => EVIDENCE_TIERS_4.find((t) => t.tier === tier);
export const getGuardrail = (slug: string) =>
  GOVERNANCE_GUARDRAILS.find((g) => g.slug === slug);
