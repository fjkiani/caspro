'use client';

/**
 * RnaVsProteinDoctrineBadge
 * -------------------------
 * Two-cohort doctrine badge for structural viewers.
 *
 * cohort='protein'  → AFDB v2 protein monomer doctrine (Jumper 2021)
 * cohort='rna-dna'  → AF3 3-chain guide-target doctrine (Abramson 2024)
 *
 * The whole point of this component is to prevent a category error:
 *   applying pLDDT ≥70 (protein) to an RNA-DNA complex rejects real biology.
 *   applying pLDDT ≥50 + iPTM ≥0.30 (RNA-DNA) to a protein monomer accepts noise.
 *
 * Persona-aware — three voice registers per cohort:
 *   oncologist → scientific gloss ("because IDRs are real biology")
 *   patient    → plain-language reassurance ("your care doesn't depend on them")
 *   pharma     → citation + n-pass fraction ("21/28 PASS · Jumper 2021")
 *
 * All numeric claims trace to /mnt/results/audits/af3_28_protein_claim_audit.md
 * and /mnt/results/audits/af3_metastasis_15_guide_raw.md (Biomni AF3 audit).
 */

import { usePersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

interface Props {
  cohort: 'protein' | 'rna-dna';
}

const PROTEIN_CRITERION = 'pLDDT ≥ 70';
const PROTEIN_CITATION = 'Jumper 2021 Nature';
const RNA_DNA_CRITERION = 'pLDDT ≥ 50 · iPTM ≥ 0.30';
const RNA_DNA_CITATION = 'Abramson 2024 Nature';

// Persona gloss for cohort='protein'
const PROTEIN_GLOSS: PersonaCopyDeck<string> = {
  oncologist:
    'Low-confidence spans usually mean the region is an intrinsically-disordered region, not that AF got it wrong. Your patient\'s tumor suppressors have IDRs — the model is being honest about them.',
  patient:
    'Some parts of a protein map look blurry. That is not a mistake — some proteins have naturally floppy regions. Your care doesn\'t depend on those parts.',
  pharma:
    '21 / 28 PASS across the AFDB Cohort A audit. 7 IDR-heavy (BRCA1 41.59, ABL1 63.37, VEGFA 63.91, SMARCA4 64.02, BCR 64.78, TWIST1 66.31, ESR1 66.43) — documented native IDR per DisProt / MobiDB, not model failure.',
};

// Persona gloss for cohort='rna-dna'
const RNA_DNA_GLOSS: PersonaCopyDeck<string> = {
  oncologist:
    'RNA-DNA R-loop interfaces are inherently transient in solution — AF3 correctly assigns them lower confidence than rigid protein interfaces. Applying the protein cut here rejects all 15 real guides.',
  patient:
    'This guide molecule passes internal safety checks calibrated to its molecule type before it can be used. Different molecule types have different reasonable standards — one size does not fit all.',
  pharma:
    '15 / 15 PASS under RNA-DNA cut. 0 / 15 PASS under mis-applied protein cut. chain_pair_iptm: dsDNA duplex (B↔C) ≈ 0.44; RNA-DNA R-loop (A↔B, A↔C) ≈ 0.20–0.23; cohort iPTM 0.36 ± 0.01.',
};

export default function RnaVsProteinDoctrineBadge({ cohort }: Props) {
  const proteinGloss = usePersonaContent(PROTEIN_GLOSS);
  const rnaDnaGloss = usePersonaContent(RNA_DNA_GLOSS);

  const isProtein = cohort === 'protein';
  const label = isProtein ? 'protein-monomer doctrine' : 'rna-dna guide-target doctrine';
  const criterion = isProtein ? PROTEIN_CRITERION : RNA_DNA_CRITERION;
  const citation = isProtein ? PROTEIN_CITATION : RNA_DNA_CITATION;
  const gloss = isProtein ? proteinGloss : rnaDnaGloss;
  const color = isProtein ? '#0279EE' : '#75A025';

  return (
    <div className="flex flex-col gap-1">
      <div
        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] px-2 py-1 border"
        style={{ color, borderColor: `${color}55`, backgroundColor: `${color}10` }}
      >
        <span>{label}</span>
        <span className="opacity-60">·</span>
        <span className="tabular-nums">{criterion}</span>
        <span className="opacity-60">·</span>
        <span className="opacity-80">{citation}</span>
      </div>
      <div className="text-[10px] leading-relaxed font-sans opacity-70 max-w-2xl">{gloss}</div>
    </div>
  );
}
