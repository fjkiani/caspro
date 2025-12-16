/**
 * Forge (Generative AI) API Endpoints
 * 
 * These are the generative design endpoints for therapeutic development.
 * Used as local data source when Hygraph is not configured.
 */

import type { APIEndpoint } from '@/lib/docs/hygraph/types';

export const forgeEndpoints: Omit<APIEndpoint, 'description'>[] & { description: string }[] = [
  {
    id: 'generate-guide-rna',
    name: 'Generate Optimized Guide RNA',
    path: '/generate_optimized_guide_rna',
    method: 'POST',
    description: `Generate optimized CRISPR guide RNAs for therapeutic applications. Uses Evo2 guided 
    generation with multi-objective optimization for efficiency, specificity, and safety. Supports 
    knockout, base editing, and prime editing strategies.`,
    category: 'FORGE_GENERATIVE',
    parameters: [
      {
        name: 'target',
        type: 'string',
        required: true,
        description: 'Target gene or genomic region',
        example: 'BRCA1',
      },
      {
        name: 'strategy',
        type: 'string',
        required: true,
        description: 'Editing strategy',
        enum: ['knockout', 'knockin', 'base_edit', 'prime_edit'],
        example: 'knockout',
      },
      {
        name: 'cas_system',
        type: 'string',
        required: false,
        description: 'CRISPR system to use',
        defaultValue: 'SpCas9',
        enum: ['SpCas9', 'SaCas9', 'Cas12a', 'Cas13'],
      },
      {
        name: 'num_guides',
        type: 'integer',
        required: false,
        description: 'Number of guide RNAs to generate',
        defaultValue: '5',
      },
      {
        name: 'min_efficiency',
        type: 'number',
        required: false,
        description: 'Minimum efficiency threshold (0-1)',
        defaultValue: '0.7',
      },
    ],
    requestBody: {
      target: 'BRCA1',
      strategy: 'knockout',
      cas_system: 'SpCas9',
      num_guides: 5,
    },
    responseSchema: {
      guides: 'array of guide objects',
      'guides[].sequence': 'string (20-24bp)',
      'guides[].efficiency': 'number (0-1)',
      'guides[].specificity': 'number (0-1)',
      'guides[].offTargets': 'array of off-target sites',
      'guides[].gcContent': 'number',
      'guides[].position': 'genomic coordinates',
    },
    codeExamples: [
      {
        id: 'python-guide-rna',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/generate_optimized_guide_rna",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "target": "BRCA1",
        "strategy": "knockout",
        "cas_system": "SpCas9",
        "num_guides": 5
    }
)

result = response.json()
for i, guide in enumerate(result['guides'], 1):
    print(f"Guide {i}: {guide['sequence']}")
    print(f"  Efficiency: {guide['efficiency']:.3f}")
    print(f"  Specificity: {guide['specificity']:.3f}")
    print(f"  Off-targets: {len(guide['offTargets'])}")`,
        description: 'Generate optimized guide RNAs for BRCA1 knockout',
      },
      {
        id: 'curl-guide-rna',
        title: 'cURL Example',
        language: 'CURL',
        code: `curl -X POST https://api.crispro.ai/generate_optimized_guide_rna \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "target": "BRCA1",
    "strategy": "knockout",
    "num_guides": 5
  }'`,
      },
    ],
    performanceMetrics: {
      benchmark: 'Guided generation AUROC',
      auroc: 0.90,
      source: 'Internal validation',
    },
  },
  {
    id: 'generate-repair-template',
    name: 'Generate Repair Template',
    path: '/generate_repair_template',
    method: 'POST',
    description: `Generate HDR (Homology-Directed Repair) templates for precise gene correction. 
    Designs optimal homology arms, incorporates silent mutations to prevent re-cutting, and 
    ensures naturalness of the repaired sequence.`,
    category: 'FORGE_GENERATIVE',
    parameters: [
      {
        name: 'target_variant',
        type: 'string',
        required: true,
        description: 'Variant to correct in HGVS notation',
        example: 'BRCA1:c.5266dupC',
      },
      {
        name: 'correction_type',
        type: 'string',
        required: true,
        description: 'Type of correction',
        enum: ['revert_to_wildtype', 'introduce_mutation', 'insert_sequence'],
      },
      {
        name: 'homology_arm_length',
        type: 'integer',
        required: false,
        description: 'Length of homology arms in bp',
        defaultValue: '50',
      },
      {
        name: 'include_silent_mutations',
        type: 'boolean',
        required: false,
        description: 'Add silent mutations to prevent re-cutting',
        defaultValue: 'true',
      },
    ],
    requestBody: {
      target_variant: 'BRCA1:c.5266dupC',
      correction_type: 'revert_to_wildtype',
      homology_arm_length: 50,
    },
    responseSchema: {
      template: 'string (full template sequence)',
      leftArm: 'string',
      rightArm: 'string',
      correctedRegion: 'string',
      silentMutations: 'array of {position, original, modified}',
      naturalness: 'number (0-1)',
      recut_probability: 'number (0-1)',
    },
    codeExamples: [
      {
        id: 'python-repair',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/generate_repair_template",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "target_variant": "BRCA1:c.5266dupC",
        "correction_type": "revert_to_wildtype",
        "homology_arm_length": 50
    }
)

result = response.json()
print(f"Template length: {len(result['template'])} bp")
print(f"Naturalness score: {result['naturalness']:.3f}")
print(f"Re-cut probability: {result['recut_probability']:.3f}")
print(f"Silent mutations: {len(result['silentMutations'])}")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'Template naturalness',
      source: 'Internal validation',
    },
  },
  {
    id: 'generate-regulatory-element',
    name: 'Generate Optimized Regulatory Element',
    path: '/generate_optimized_regulatory_element',
    method: 'POST',
    description: `Design tissue-specific promoters and enhancers for gene therapy applications. 
    Optimizes for expression level, tissue specificity, and minimal off-target activity. 
    Uses Evo2 for sequence generation with structural validation.`,
    category: 'FORGE_GENERATIVE',
    parameters: [
      {
        name: 'element_type',
        type: 'string',
        required: true,
        description: 'Type of regulatory element',
        enum: ['promoter', 'enhancer', 'silencer', 'insulator'],
      },
      {
        name: 'target_tissue',
        type: 'string',
        required: true,
        description: 'Target tissue for expression',
        example: 'liver',
      },
      {
        name: 'expression_level',
        type: 'string',
        required: false,
        description: 'Desired expression level',
        enum: ['low', 'medium', 'high'],
        defaultValue: 'high',
      },
      {
        name: 'max_length',
        type: 'integer',
        required: false,
        description: 'Maximum element length in bp',
        defaultValue: '500',
      },
    ],
    requestBody: {
      element_type: 'promoter',
      target_tissue: 'liver',
      expression_level: 'high',
      max_length: 500,
    },
    responseSchema: {
      sequence: 'string',
      predictedActivity: 'number (0-1)',
      tissueSpecificity: 'object mapping tissue to expression',
      tfBindingSites: 'array of binding site objects',
      gcContent: 'number',
    },
    codeExamples: [
      {
        id: 'python-regulatory',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/generate_optimized_regulatory_element",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "element_type": "promoter",
        "target_tissue": "liver",
        "expression_level": "high"
    }
)

result = response.json()
print(f"Sequence length: {len(result['sequence'])} bp")
print(f"Predicted activity: {result['predictedActivity']:.3f}")
print(f"Liver specificity: {result['tissueSpecificity']['liver']:.3f}")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'Tissue specificity correlation',
      source: 'Internal validation',
    },
  },
  {
    id: 'generate-epigenome-sequence',
    name: 'Generate Epigenome-Optimized Sequence',
    path: '/generate_epigenome_optimized_sequence',
    method: 'POST',
    description: `Generate sequences optimized for specific epigenomic contexts. Designs sequences 
    that will be accessible and active in target chromatin environments while avoiding 
    silencing in non-target contexts.`,
    category: 'FORGE_GENERATIVE',
    parameters: [
      {
        name: 'target_region',
        type: 'string',
        required: true,
        description: 'Genomic region for context',
        example: 'chr17:43044000-43045000',
      },
      {
        name: 'epigenetic_state',
        type: 'string',
        required: true,
        description: 'Target epigenetic state',
        enum: ['active', 'repressed', 'poised', 'neutral'],
      },
      {
        name: 'cell_type',
        type: 'string',
        required: false,
        description: 'Target cell type',
        example: 'hepatocyte',
      },
    ],
    requestBody: {
      target_region: 'chr17:43044000-43045000',
      epigenetic_state: 'active',
      cell_type: 'hepatocyte',
    },
    responseSchema: {
      sequence: 'string',
      predictedAccessibility: 'number (0-1)',
      methylationSites: 'array of {position, probability}',
      histoneMarks: 'object of predicted histone modifications',
    },
    codeExamples: [
      {
        id: 'python-epigenome',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/generate_epigenome_optimized_sequence",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "target_region": "chr17:43044000-43045000",
        "epigenetic_state": "active",
        "cell_type": "hepatocyte"
    }
)

result = response.json()
print(f"Predicted accessibility: {result['predictedAccessibility']:.3f}")
print(f"CpG sites: {len(result['methylationSites'])}")`,
      },
    ],
    performanceMetrics: {
      benchmark: 'Chromatin accessibility prediction',
      source: 'Evo2 Paper',
    },
  },
  {
    id: 'generate-therapeutic-protein',
    name: 'Generate Therapeutic Protein',
    path: '/generate_therapeutic_protein_coding_sequence',
    method: 'POST',
    description: `Design novel therapeutic protein sequences including nanobodies, inhibitors, and 
    engineered biologics. Uses Evo2 guided generation with AlphaFold 3 structural validation. 
    Achieves 70% Pfam-hit rate for functional protein domains.`,
    category: 'FORGE_GENERATIVE',
    parameters: [
      {
        name: 'protein_type',
        type: 'string',
        required: true,
        description: 'Type of therapeutic protein',
        enum: ['nanobody', 'inhibitor', 'enzyme', 'receptor', 'custom'],
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: 'Target protein or pathway',
        example: 'PD-1',
      },
      {
        name: 'optimization_goals',
        type: 'array',
        required: false,
        description: 'Optimization objectives',
        example: "['binding_affinity', 'stability', 'immunogenicity']",
      },
      {
        name: 'length_range',
        type: 'object',
        required: false,
        description: 'Desired protein length range',
        example: "{ min: 100, max: 200 }",
      },
      {
        name: 'validate_structure',
        type: 'boolean',
        required: false,
        description: 'Run AlphaFold 3 structural validation',
        defaultValue: 'true',
      },
    ],
    requestBody: {
      protein_type: 'nanobody',
      target: 'PD-1',
      optimization_goals: ['binding_affinity', 'stability'],
      validate_structure: true,
    },
    responseSchema: {
      sequence: 'string (amino acid sequence)',
      codingSequence: 'string (DNA sequence)',
      predictedStructure: 'object (if validate_structure=true)',
      bindingAffinity: 'number (predicted Kd)',
      stability: 'number (predicted Tm)',
      pfamDomains: 'array of identified domains',
      immunogenicity: 'number (0-1)',
    },
    codeExamples: [
      {
        id: 'python-therapeutic',
        title: 'Python Example',
        language: 'PYTHON',
        code: `import requests

response = requests.post(
    "https://api.crispro.ai/generate_therapeutic_protein_coding_sequence",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "protein_type": "nanobody",
        "target": "PD-1",
        "optimization_goals": ["binding_affinity", "stability"],
        "validate_structure": True
    }
)

result = response.json()
print(f"Sequence length: {len(result['sequence'])} aa")
print(f"Predicted binding affinity: {result['bindingAffinity']:.2e} M")
print(f"Stability (Tm): {result['stability']:.1f}°C")
print(f"Pfam domains: {[d['name'] for d in result['pfamDomains']]}")

if result['predictedStructure']:
    print(f"Structure confidence: {result['predictedStructure']['confidence']:.3f}")`,
        description: 'Generate a PD-1 targeting nanobody',
      },
      {
        id: 'curl-therapeutic',
        title: 'cURL Example',
        language: 'CURL',
        code: `curl -X POST https://api.crispro.ai/generate_therapeutic_protein_coding_sequence \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "protein_type": "nanobody",
    "target": "PD-1",
    "optimization_goals": ["binding_affinity", "stability"],
    "validate_structure": true
  }'`,
      },
    ],
    performanceMetrics: {
      auroc: 0.70,
      benchmark: 'Pfam-hit rate',
      source: 'Evo2 Paper, Fig. 5H',
    },
  },
];

export default forgeEndpoints;


