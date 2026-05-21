/**
 * Create ResearchAbstract model in Hygraph (Management API).
 *
 * Usage:
 *   npx tsx tools/setup-hygraph-research-abstracts.ts
 *
 * Requires GRAPHCMS_TOKEN (or HYGRAPH_MANAGEMENT_TOKEN) in .env.local
 * Project: cm65g7pxd09kx07my82376f33 (us-west-2)
 */

import 'dotenv/config';
import { GraphQLClient } from 'graphql-request';

const PROJECT_ID = process.env.HYGRAPH_PROJECT_ID || 'cm65g7pxd09kx07my82376f33';
const TOKEN =
  process.env.HYGRAPH_MANAGEMENT_TOKEN ||
  process.env.GRAPHCMS_TOKEN ||
  process.env.HYGRAPH_TOKEN;

const MANAGEMENT_URL = `https://management-us-west-2.hygraph.com/graphql/${PROJECT_ID}`;

if (!TOKEN) {
  console.error('Missing GRAPHCMS_TOKEN or HYGRAPH_MANAGEMENT_TOKEN in .env.local');
  process.exit(1);
}

const client = new GraphQLClient(MANAGEMENT_URL, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const BATCH_MIGRATION = `
  mutation BatchMigration($name: String!, $changes: [MigrationChange!]!) {
    batchMigration(name: $name, changes: $changes) {
      id
      status
      errors {
        message
      }
    }
  }
`;

async function main() {
  const name = `add-research-abstract-${Date.now()}`;
  const changes = [
    {
      operationName: 'createModel',
      params: {
        apiId: 'ResearchAbstract',
        apiIdPlural: 'ResearchAbstracts',
        displayName: 'Research Abstract',
        description: 'Conference abstracts (image, body, external link)',
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'title',
        displayName: 'Title',
        type: 'STRING',
        isRequired: true,
        isTitle: true,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'slug',
        displayName: 'Slug',
        type: 'STRING',
        isRequired: true,
        isUnique: true,
        validations: { String: { matches: { regex: '^[a-z0-9-]+$' } } },
        fieldConfig: { String: { renderer: 'GCMS_SLUG' } },
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'body',
        displayName: 'Body',
        type: 'RICHTEXT',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'externalLink',
        displayName: 'External link',
        type: 'STRING',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'authorLine',
        displayName: 'Author line',
        type: 'STRING',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'venue',
        displayName: 'Venue',
        type: 'STRING',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'year',
        displayName: 'Year',
        type: 'INT',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'order',
        displayName: 'Order',
        type: 'INT',
        isRequired: false,
      },
    },
    {
      operationName: 'createSimpleField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'publishedAt',
        displayName: 'Published at',
        type: 'DATETIME',
        isRequired: false,
      },
    },
    {
      operationName: 'createRelationalField',
      params: {
        parentApiId: 'ResearchAbstract',
        apiId: 'image',
        displayName: 'Image',
        type: 'RELATION',
        reverseField: {
          apiId: 'researchAbstractImage',
          modelApiId: 'Asset',
          displayName: 'Research abstract image',
          isUnidirectional: true,
        },
        relationType: 'Asset',
      },
    },
  ];

  console.log(`Applying migration "${name}" to ${PROJECT_ID}...`);
  try {
    const result = await client.request<{ batchMigration: { status: string; errors?: { message: string }[] } }>(
      BATCH_MIGRATION,
      { name, changes },
    );
    console.log(JSON.stringify(result, null, 2));
    if (result.batchMigration?.status !== 'SUCCESS') {
      process.exit(1);
    }
    console.log('✅ ResearchAbstract model created. Run: npx tsx tools/seed-research-abstracts.ts');
  } catch (err: unknown) {
    const e = err as { response?: { errors?: unknown[] }; message?: string };
    console.error('Migration failed:', e.response?.errors || e.message || err);
    console.error('\nIf the model already exists, skip setup and run seed-research-abstracts.ts only.');
    process.exit(1);
  }
}

main();
