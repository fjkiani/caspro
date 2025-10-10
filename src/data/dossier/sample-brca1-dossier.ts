export const sampleBRCA1Dossier = {
  header: {
    variant: 'c.5266dupC',
    gene: 'BRCA1',
    runId: 'RUN-2025-001-BRCA1',
    engines: ['Oracle', 'Forge', 'Boltz'],
    precision: 0.95
  },
  variant: {
    id: 'BRCA1:c.5266dupC',
    gene: 'BRCA1',
    chromosome: '17',
    position: '43044295',
    reference: 'C',
    alternate: 'CC',
    consequence: 'frameshift',
    pathogenicity: 'Pathogenic',
    confidence: 0.95
  },
  analysis: {
    oracleScore: 0.89,
    essentialityScore: 0.76,
    chromatinAccessibility: 0.45,
    regulatoryImpact: 0.23
  },
  therapeuticDesign: {
    guideRNAs: [
      {
        sequence: 'GTTCCAGAACCTGAAAGCTG',
        efficiency: 0.87,
        specificity: 0.94,
        assassinScore: 0.82
      }
    ],
    repairTemplate: 'ATCGATCGATCG...',
    deliveryMethod: 'AAV9'
  },
  validation: {
    inSilico: {
      cuttingEfficiency: 0.87,
      offTargetRisk: 0.06,
      functionalImpact: 0.82
    },
    experimental: {
      cellLineValidation: 'Pending',
      animalModel: 'Pending'
    }
  },
  executiveSummary: {
    title: 'BRCA1 Pathogenic Variant Analysis',
    summary: 'Comprehensive analysis of BRCA1:c.5266dupC frameshift variant',
    keyFindings: ['Pathogenic classification', 'High therapeutic potential', 'IND-ready candidate']
  },
  saeAnalysis: {
    features: ['Exon boundary', 'Protein domain', 'Regulatory element'],
    scores: [0.89, 0.76, 0.45]
  },
  saeIntelligence: {
    features: ['Exon boundary', 'Protein domain', 'Regulatory element'],
    scores: [0.89, 0.76, 0.45],
    interpretation: 'SAE features indicate strong functional disruption'
  },
  speFusion: {
    perturbationEffects: ['Cell viability', 'DNA repair', 'Apoptosis'],
    fusionScores: [0.82, 0.91, 0.78]
  },
  cohortContext: {
    title: 'BRCA1+ Patient Cohort Analysis',
    subtitle: 'Population-specific data improves treatment selection accuracy by 67%',
    cohorts: [
      {
        id: 'brca1-positive',
        name: 'BRCA1+ Patients',
        population: 'Hereditary breast cancer patients',
        size: 156,
        riskStratification: 'high' as const,
        demographics: { avgAge: 52, genderSplit: { male: 2, female: 98 }, ethnicity: {} },
        geneticProfile: { variantFrequency: 0.34, pathogenicVariants: 156, vusCount: 89 },
        clinicalOutcomes: { responseRate: 0.78, progressionFreeMonths: 24.3, overallSurvivalMonths: 67.8 },
        biomarkers: ['BRCA1/2 mutations', 'Homologous recombination deficiency'],
        therapeuticRecommendations: ['PARP inhibitors', 'Platinum-based chemotherapy']
      }
    ]
  },
  dataLab: {
    experimentalData: ['Cutting efficiency', 'Off-target analysis', 'Functional validation'],
    results: [0.87, 0.06, 0.82]
  },
  clinicalTrial: {
    design: 'Phase I safety study',
    endpoints: ['Safety', 'Efficacy', 'Biomarkers'],
    timeline: '18 months'
  },
  clinicalTrials: {
    title: 'Clinical Trial Matching',
    subtitle: 'BRCA1+ patients eligible for targeted therapies',
    eligibility: [
      { criterion: 'BRCA1/2 mutation', status: 'Eligible', confidence: 0.95 },
      { criterion: 'Advanced breast cancer', status: 'Eligible', confidence: 0.89 },
      { criterion: 'Prior PARP inhibitor', status: 'Not applicable', confidence: 1.0 }
    ],
    recommendations: [
      { trial: 'PARP Inhibitor Study', likelihood: 'High', details: 'Primary endpoint: PFS' },
      { trial: 'Platinum Chemotherapy', likelihood: 'High', details: 'Secondary endpoint: ORR' }
    ],
    conclusion: {
      title: 'High Trial Eligibility',
      points: ['95% eligibility for PARP inhibitors', '89% eligibility for platinum therapy', 'Strong biomarker profile'],
      finalVerdict: 'Recommended for clinical trial enrollment'
    },
    actions: [
      { label: 'View Trial Details', link: '/trials/parp-inhibitor' },
      { label: 'Contact Study Coordinator' }
    ],
    researchUseNotice: 'For research use only - not for clinical decision making'
  }
};
