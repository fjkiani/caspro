import { NextResponse } from 'next/server';
import { BENCHMARKS, BENCHMARK_LICENSE, BENCHMARK_METHODOLOGY_STEPS } from '@/data/benchmarks';

/**
 * Machine-readable dump of /benchmarks. This is the canonical JSON emission
 * of the same records the HTML page renders — LLMs, partners, and analytics
 * consume this endpoint instead of scraping the page.
 */

export const dynamic = 'force-static';

export function GET() {
  const body = {
    name: 'CrisPRO Oracle public benchmarks',
    url: 'https://crispro.ai/benchmarks',
    license: BENCHMARK_LICENSE,
    dateModified: '2026-07-04',
    methodology: BENCHMARK_METHODOLOGY_STEPS,
    benchmarks: BENCHMARKS.map((b) => ({
      id: b.id,
      name: b.name,
      value: b.value,
      description: b.description,
      dataset: b.dataset,
      sampleSize: b.sampleSize ?? null,
      category: b.category,
      badge: b.badge,
      featured: b.featured,
      lastVerified: b.lastVerified,
    })),
  };

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
