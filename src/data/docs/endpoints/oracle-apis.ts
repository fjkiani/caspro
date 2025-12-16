/**
 * Oracle (Discriminative AI) API Endpoints
 * 
 * These are the zero-shot prediction endpoints powered by Evo2.
 * Used as local data source when Hygraph is not configured.
 */

import type { APIEndpoint, PerformanceMetrics } from '@/lib/docs/hygraph/types';

export const oracleEndpoints: Omit<APIEndpoint, 'description'>[] & { description: string }[] = [
  {
    id: 'predict-variant-impact',
    name: 'Predict Variant Impact',
    path: '/predict_variant_impact',
    method: 'POST',
    description: `Zero-shot pathogenicity prediction for genetic variants. Uses Evo2 delta-likelihood scoring 
    to quantify functional disruption without task-specific training. Supports all variant types including 
    SNVs, indels, coding, and noncoding regions.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'variant',
        type: 'string',
        required: true,
        description: 'Genomic variant in HGVS notation or chr:pos:ref>alt format',
        example: 'chr17:43044295:A>T',
      },
      {
        name: 'gene',
        type: 'string',
        required: false,
        description: 'Gene symbol for context-aware analysis',
        example: 'BRCA1',
      },
      {
        name: 'assembly',
        type: 'string',
        required: false,
        description: 'Reference genome assembly',
        defaultValue: 'GRCh38',
        enum: ['GRCh37', 'GRCh38'],
      },
      {
        name: 'context',
        type: 'object',
        required: false,
        description: 'Additional context for analysis (tissue type, disease)',
      },
    ],
    requestBody: {
      variant: 'chr17:43044295:A>T',
      gene: 'BRCA1',
      assembly: 'GRCh38',
    },
    responseSchema: {
      pathogenicity: 'number (0-1)',
      confidence: 'number (0-1)',
      classification: 'string (Pathogenic|Likely Pathogenic|VUS|Likely Benign|Benign)',
      deltaLikelihood: 'number',
      explanation: 'object (SAE features, disrupted motifs)',
    },
    codeExamples: [
      {
        id: 'python-variant',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/predict_variant_impact",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "variant": "chr17:43044295:A>T",
        "gene": "BRCA1",
        "assembly": "GRCh38"
    }
)

result = response.json()
print(f"Classification: {result['classification']}")
print(f"Pathogenicity: {result['pathogenicity']:.3f}")
print(f"Confidence: {result['confidence']:.3f}")`,
        description: 'Predict pathogenicity for a BRCA1 variant',
      },
      {
        id: 'curl-variant',
        title: 'cURL Example',
        language: 'CURL',
        code: `curl -X POST https://api.crispro.ai/predict_variant_impact \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "variant": "chr17:43044295:A>T",
    "gene": "BRCA1"
  }'`,
      },
    ],
    performanceMetrics: {
      auroc: 0.957,
      samples: 14319,
      benchmark: 'ClinVar SNV coding',
      source: 'Evo2 Paper, Fig. 3C',
    },
  },
  {
    id: 'predict-gene-essentiality',
    name: 'Predict Gene Essentiality',
    path: '/predict_gene_essentiality',
    method: 'POST',
    description: `Predict context-dependent gene essentiality to identify therapeutic vulnerabilities. 
    Identifies "Achilles' heels" - genes that cancer cells depend on for survival but normal cells don't. 
    Validated against DepMap cancer cell line dependencies.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'gene',
        type: 'string',
        required: true,
        description: 'Gene symbol to analyze',
        example: 'BRCA1',
      },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: 'Cellular/tissue context for analysis',
        example: 'breast-cancer',
      },
      {
        name: 'cell_line',
        type: 'string',
        required: false,
        description: 'Specific cell line for comparison',
      },
    ],
    requestBody: {
      gene: 'BRCA1',
      context: 'breast-cancer',
    },
    responseSchema: {
      essentiality: 'number (0-1)',
      dependency: 'string (high|medium|low)',
      syntheticLethal: 'array of gene symbols',
      confidence: 'number',
    },
    codeExamples: [
      {
        id: 'python-essentiality',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/predict_gene_essentiality",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "gene": "BRCA1",
        "context": "breast-cancer"
    }
)

result = response.json()
print(f"Essentiality: {result['essentiality']:.3f}")
print(f"Dependency: {result['dependency']}")
print(f"Synthetic lethal partners: {result['syntheticLethal']}")`,
      },
    ],
    performanceMetrics: {
      auroc: 0.73,
      benchmark: 'DepMap correlation',
      source: 'Evo2 Paper',
    },
  },
  {
    id: 'predict-protein-functionality',
    name: 'Predict Protein Functionality Change',
    path: '/predict_protein_functionality_change',
    method: 'POST',
    description: `Predict how mutations affect protein function using deep mutational scanning correlations. 
    Analyzes impact on stability, binding affinity, and structural integrity. Strong correlation with 
    experimental DMS data.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'protein',
        type: 'string',
        required: true,
        description: 'Protein identifier (UniProt ID or gene symbol)',
        example: 'BRCA1',
      },
      {
        name: 'mutation',
        type: 'string',
        required: true,
        description: 'Amino acid change in standard notation',
        example: 'C61G',
      },
      {
        name: 'include_structure',
        type: 'boolean',
        required: false,
        description: 'Include structural impact analysis',
        defaultValue: 'true',
      },
    ],
    requestBody: {
      protein: 'BRCA1',
      mutation: 'C61G',
      include_structure: true,
    },
    responseSchema: {
      functionalImpact: 'number (0-1)',
      stabilityChange: 'number (ddG in kcal/mol)',
      bindingAffinity: 'object',
      structuralIntegrity: 'number (0-1)',
      confidence: 'number',
    },
    codeExamples: [
      {
        id: 'python-protein',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/predict_protein_functionality_change",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "protein": "BRCA1",
        "mutation": "C61G",
        "include_structure": True
    }
)

result = response.json()
print(f"Functional Impact: {result['functionalImpact']:.3f}")
print(f"Stability Change: {result['stabilityChange']:.2f} kcal/mol")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'DMS correlation',
      source: 'Evo2 Paper, Fig. 2E',
    },
  },
  {
    id: 'predict-chromatin-accessibility',
    name: 'Predict Chromatin Accessibility',
    path: '/predict_chromatin_accessibility',
    method: 'POST',
    description: `Predict chromatin accessibility and regulatory element activity. Uses SAE features 
    to identify transcription factor binding sites, enhancers, and other regulatory elements. 
    Essential for CRISPR guide accessibility analysis.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'locus',
        type: 'string',
        required: true,
        description: 'Genomic locus to analyze',
        example: 'chr17:43044000-43045000',
      },
      {
        name: 'cell_type',
        type: 'string',
        required: false,
        description: 'Cell type for context-specific prediction',
        example: 'MCF7',
      },
    ],
    requestBody: {
      locus: 'chr17:43044000-43045000',
      cell_type: 'MCF7',
    },
    responseSchema: {
      accessibility: 'number (0-1)',
      regulatoryElements: 'array of {type, position, score}',
      tfBindingSites: 'array of {tf, position, affinity}',
      dnaseHypersensitive: 'boolean',
    },
    codeExamples: [
      {
        id: 'python-chromatin',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/predict_chromatin_accessibility",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "locus": "chr17:43044000-43045000",
        "cell_type": "MCF7"
    }
)

result = response.json()
print(f"Accessibility: {result['accessibility']:.3f}")
for element in result['regulatoryElements']:
    print(f"  {element['type']} at {element['position']}: {element['score']:.2f}")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'SAE features',
      source: 'Evo2 Paper',
    },
  },
  {
    id: 'predict-crispr-efficacy',
    name: 'Predict CRISPR Spacer Efficacy',
    path: '/predict_crispr_spacer_efficacy',
    method: 'POST',
    description: `Predict CRISPR guide RNA cutting efficiency and specificity. Combines variant impact 
    simulation with empirical priors for guide RNA design. Essential for therapeutic CRISPR applications.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'target_sequence',
        type: 'string',
        required: true,
        description: '23bp target sequence (20bp spacer + 3bp PAM)',
        example: 'GTTCCAGAACCTGAAAGCTGNGG',
      },
      {
        name: 'gene',
        type: 'string',
        required: false,
        description: 'Target gene for context',
        example: 'BRCA1',
      },
      {
        name: 'cas_type',
        type: 'string',
        required: false,
        description: 'CRISPR system type',
        defaultValue: 'Cas9',
        enum: ['Cas9', 'Cas12a', 'Cas13'],
      },
    ],
    requestBody: {
      target_sequence: 'GTTCCAGAACCTGAAAGCTGNGG',
      gene: 'BRCA1',
      cas_type: 'Cas9',
    },
    responseSchema: {
      efficiency: 'number (0-1)',
      specificity: 'number (0-1)',
      offTargets: 'array of {sequence, mismatches, score}',
      gcContent: 'number',
      recommendation: 'string',
    },
    codeExamples: [
      {
        id: 'python-crispr',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/predict_crispr_spacer_efficacy",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "target_sequence": "GTTCCAGAACCTGAAAGCTGNGG",
        "gene": "BRCA1",
        "cas_type": "Cas9"
    }
)

result = response.json()
print(f"Efficiency: {result['efficiency']:.3f}")
print(f"Specificity: {result['specificity']:.3f}")
print(f"Off-targets found: {len(result['offTargets'])}")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'Guide efficiency correlation',
      source: 'Internal validation',
    },
  },
  {
    id: 'exon-intron-map',
    name: 'Exon-Intron Map',
    path: '/exon_intron_map',
    method: 'POST',
    description: `Generate detailed exon-intron boundary mapping for a gene or locus. Uses SAE features 
    to identify splice sites and structural boundaries with high accuracy.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'gene',
        type: 'string',
        required: true,
        description: 'Gene symbol or ENSG ID',
        example: 'BRCA1',
      },
      {
        name: 'transcript',
        type: 'string',
        required: false,
        description: 'Specific transcript ID',
      },
    ],
    requestBody: {
      gene: 'BRCA1',
    },
    responseSchema: {
      gene: 'string',
      transcripts: 'array of transcript objects',
      exons: 'array of {start, end, number, phase}',
      introns: 'array of {start, end, number}',
      spliceSites: 'array of {position, type, strength}',
    },
    codeExamples: [
      {
        id: 'python-exon',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/exon_intron_map",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"gene": "BRCA1"}
)

result = response.json()
print(f"Gene: {result['gene']}")
print(f"Exons: {len(result['exons'])}")
for exon in result['exons'][:3]:
    print(f"  Exon {exon['number']}: {exon['start']}-{exon['end']}")`,
      },
    ],
    performanceMetrics: {
      auroc: 0.95,
      benchmark: 'Cross-species exon classification',
      source: 'Evo2 Paper',
    },
  },
  {
    id: 'brca-classifier',
    name: 'BRCA Classifier',
    path: '/brca_classifier',
    method: 'POST',
    description: `Specialized classifier for BRCA1/2 variants. Combines zero-shot prediction with 
    supervised learning for clinical-grade accuracy. Optimized for hereditary breast cancer risk assessment.`,
    category: 'ORACLE_DISCRIMINATIVE',
    parameters: [
      {
        name: 'variant',
        type: 'string',
        required: true,
        description: 'BRCA variant in HGVS notation',
        example: 'BRCA1:c.5266dupC',
      },
      {
        name: 'include_functional',
        type: 'boolean',
        required: false,
        description: 'Include functional assay predictions',
        defaultValue: 'true',
      },
    ],
    requestBody: {
      variant: 'BRCA1:c.5266dupC',
      include_functional: true,
    },
    responseSchema: {
      classification: 'string (Pathogenic|Likely Pathogenic|VUS|Likely Benign|Benign)',
      confidence: 'number (0-1)',
      evidence: 'array of evidence items',
      functionalPredictions: 'object',
      clinicalSignificance: 'string',
    },
    codeExamples: [
      {
        id: 'python-brca',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/brca_classifier",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "variant": "BRCA1:c.5266dupC",
        "include_functional": True
    }
)

result = response.json()
print(f"Classification: {result['classification']}")
print(f"Confidence: {result['confidence']:.3f}")
print(f"Clinical Significance: {result['clinicalSignificance']}")`,
      },
    ],
    performanceMetrics: {
      auroc: 0.94,
      auprc: 0.84,
      samples: 3893,
      benchmark: 'BRCA1 supervised (coding SNV)',
      source: 'Evo2 Paper, Methods 4.3.16',
    },
  },
];

export default oracleEndpoints;


