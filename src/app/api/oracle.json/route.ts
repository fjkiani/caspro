import { NextResponse } from 'next/server';
import { BENCHMARKS, BENCHMARK_LICENSE } from '@/data/benchmarks';

/**
 * /api/oracle.json — machine-readable Oracle capability + benchmark manifest.
 *
 * Consumers: LLM crawlers, partner integrations, internal dashboards. This is
 * the JSON front-door to Oracle: what it does, what it exposes, what it has
 * been benchmarked against.
 */

export const dynamic = 'force-static';

const CAPABILITIES = [
  {
    id: 'variant-interpretation',
    name: 'Variant interpretation',
    description:
      'Zero-shot pathogenicity call plus mechanism score per variant, with Supported / Consider / Insufficient tier.',
    input: 'Variant call (chrom, pos, ref, alt) or HGVS notation',
    output: 'Pathogenicity tier + mechanism score + evidence badges',
  },
  {
    id: 'mechanism-scoring',
    name: 'Mechanism scoring',
    description:
      'Project a variant onto the curated pathway graph and surface the residual dependency it participates in.',
    input: 'Variant call + optional expression / TME context',
    output: 'Ranked pathway dependencies with scores + badges',
  },
  {
    id: 'zero-shot-benchmarking',
    name: 'Zero-shot benchmarking',
    description:
      'Run Oracle in inference-only mode against a caller-supplied held-out cohort and return the AUROC + confusion matrix.',
    input: 'Held-out cohort in ClinVar-compatible format',
    output: 'AUROC + confusion matrix + per-class tier distribution',
  },
  {
    id: 'evidence-ledger',
    name: 'Evidence ledger emission',
    description:
      'Emit an append-only ledger entry per call (model version, features, output, tier, run_id) so downstream systems can audit.',
    input: 'Any Oracle call',
    output: 'Ledger entry (run_id, model_version, features_hash, tier, badges)',
  },
];

export function GET() {
  const body = {
    name: 'CrisPRO Oracle',
    description:
      'Discriminative AI for variant interpretation and mechanism scoring. Every call returns a tiered decision plus provenance.',
    url: 'https://crispro.ai/platform/oracle-intelligence',
    version: '2026.07',
    license: BENCHMARK_LICENSE,
    capabilities: CAPABILITIES,
    benchmarks: BENCHMARKS.map((b) => ({
      id: b.id,
      name: b.name,
      value: b.value,
      dataset: b.dataset,
      sampleSize: b.sampleSize ?? null,
      badge: b.badge,
      lastVerified: b.lastVerified,
      seeAlso: `https://crispro.ai/benchmarks#${b.id}`,
    })),
    contact: {
      email: 'fahad@crispro.ai',
      site: 'https://crispro.ai/contact',
    },
    machineReadable: {
      benchmarksJson: 'https://crispro.ai/benchmarks/data.json',
      openapi: 'https://crispro.ai/openapi.json',
      llmsTxt: 'https://crispro.ai/llms.txt',
    },
  };

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
