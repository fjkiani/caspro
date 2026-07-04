import { NextResponse } from 'next/server';

/**
 * /openapi.json — OpenAPI 3.0.3 spec for the public JSON endpoints on the site.
 *
 * This does NOT describe internal Oracle/Forge inference endpoints (those are
 * partner-only). It describes the public machine-readable endpoints:
 *   - /api/oracle.json       (Oracle capability + benchmark manifest)
 *   - /benchmarks/data.json  (canonical benchmark record dump)
 *   - /openapi.json          (this spec)
 *   - /llms.txt              (LLM-crawler manifest)
 *   - /sitemap.xml           (URL index)
 *   - /robots.txt            (crawler rules)
 */

export const dynamic = 'force-static';

const SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'CrisPRO.ai API',
    version: '2026.07',
    description:
      'Public machine-readable endpoints for CrisPRO.ai. Human-facing pages live at https://crispro.ai/ — this spec describes only the JSON, plain-text, and XML surfaces.',
    contact: {
      name: 'CrisPRO.ai',
      url: 'https://crispro.ai/contact',
      email: 'fahad@crispro.ai',
    },
    license: {
      name: 'CC BY 4.0 (benchmarks + capability manifest)',
      url: 'https://creativecommons.org/licenses/by/4.0/',
    },
  },
  servers: [
    {
      url: 'https://crispro.ai',
      description: 'Production',
    },
  ],
  paths: {
    '/api/oracle.json': {
      get: {
        summary: 'Oracle capability + benchmark manifest',
        description:
          'Machine-readable manifest of Oracle capabilities, current benchmark values, and pointers to other machine-readable endpoints. Cache-Control: public, max-age=3600.',
        operationId: 'getOracleManifest',
        tags: ['manifest'],
        responses: {
          '200': {
            description: 'Oracle manifest',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OracleManifest' },
              },
            },
          },
        },
      },
    },
    '/benchmarks/data.json': {
      get: {
        summary: 'Public benchmark record dump',
        description:
          'Canonical dump of the same benchmark records rendered at /benchmarks. CC BY 4.0.',
        operationId: 'getBenchmarksData',
        tags: ['benchmarks'],
        responses: {
          '200': {
            description: 'Benchmark records',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BenchmarksData' },
              },
            },
          },
        },
      },
    },
    '/openapi.json': {
      get: {
        summary: 'This OpenAPI 3.0.3 spec',
        description:
          'Self-describing OpenAPI 3.0.3 specification for the public machine-readable endpoints.',
        operationId: 'getOpenApiSpec',
        tags: ['manifest'],
        responses: {
          '200': {
            description: 'OpenAPI 3.0.3 spec',
            content: { 'application/json': {} },
          },
        },
      },
    },
    '/llms.txt': {
      get: {
        summary: 'LLM-crawler manifest',
        description:
          'Plain-text manifest for LLM crawlers (RFC-style). Includes documentation entry points and machine-readable endpoints.',
        operationId: 'getLlmsTxt',
        tags: ['manifest'],
        responses: {
          '200': {
            description: 'LLM crawler manifest',
            content: { 'text/plain': {} },
          },
        },
      },
    },
    '/sitemap.xml': {
      get: {
        summary: 'URL sitemap',
        description: 'Sitemap XML for the public site.',
        operationId: 'getSitemap',
        tags: ['manifest'],
        responses: {
          '200': {
            description: 'Sitemap',
            content: { 'application/xml': {} },
          },
        },
      },
    },
    '/robots.txt': {
      get: {
        summary: 'Robots.txt',
        description: 'Robots exclusion protocol file.',
        operationId: 'getRobots',
        tags: ['manifest'],
        responses: {
          '200': {
            description: 'Robots exclusion protocol file',
            content: { 'text/plain': {} },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      OracleManifest: {
        type: 'object',
        required: ['name', 'description', 'url', 'version', 'capabilities', 'benchmarks'],
        properties: {
          name: { type: 'string', example: 'CrisPRO Oracle' },
          description: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          version: { type: 'string', example: '2026.07' },
          license: { type: 'string', format: 'uri' },
          capabilities: {
            type: 'array',
            items: { $ref: '#/components/schemas/OracleCapability' },
          },
          benchmarks: {
            type: 'array',
            items: { $ref: '#/components/schemas/OracleBenchmark' },
          },
          contact: {
            type: 'object',
            properties: {
              email: { type: 'string', format: 'email' },
              site: { type: 'string', format: 'uri' },
            },
          },
          machineReadable: {
            type: 'object',
            properties: {
              benchmarksJson: { type: 'string', format: 'uri' },
              openapi: { type: 'string', format: 'uri' },
              llmsTxt: { type: 'string', format: 'uri' },
            },
          },
        },
      },
      OracleCapability: {
        type: 'object',
        required: ['id', 'name', 'description'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          input: { type: 'string' },
          output: { type: 'string' },
        },
      },
      OracleBenchmark: {
        type: 'object',
        required: ['id', 'name', 'value', 'dataset', 'badge'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          value: { type: 'string', example: '95.7%' },
          dataset: { type: 'string' },
          sampleSize: { type: 'integer', nullable: true },
          badge: {
            type: 'string',
            enum: ['ClinVar-Strong', 'SOTA', 'Validated', 'Pathway-Aligned', 'RCT', 'Guideline'],
          },
          lastVerified: { type: 'string', format: 'date' },
          seeAlso: { type: 'string', format: 'uri' },
        },
      },
      BenchmarksData: {
        type: 'object',
        required: ['name', 'url', 'benchmarks'],
        properties: {
          name: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          license: { type: 'string', format: 'uri' },
          dateModified: { type: 'string', format: 'date' },
          methodology: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                text: { type: 'string' },
              },
            },
          },
          benchmarks: {
            type: 'array',
            items: { $ref: '#/components/schemas/OracleBenchmark' },
          },
        },
      },
    },
  },
  tags: [
    { name: 'manifest', description: 'Machine-readable manifests for crawlers and integrations.' },
    { name: 'benchmarks', description: 'Public benchmark records for CrisPRO Oracle.' },
  ],
};

export function GET() {
  return NextResponse.json(SPEC, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
