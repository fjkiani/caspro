/**
 * Additive Hygraph schema: NotebookBundle.infographic (Asset) + infographicUrl (STRING).
 *
 * Usage:
 *   node tools/setup-hygraph-notebook-infographic.mjs --dry-run
 *   node tools/setup-hygraph-notebook-infographic.mjs
 *
 * Auth: GRAPHCMS_TOKEN / HYGRAPH_TOKEN in .env.local, or /tmp/hygraph-crispro.token
 * Management: https://management-us-west-2.hygraph.com/graphql/<projectId>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = process.env.HYGRAPH_PROJECT_ID || 'cm65g7pxd09kx07my82376f33';
const MANAGEMENT_URL = `https://management-us-west-2.hygraph.com/graphql/${PROJECT_ID}`;
const DRY_RUN = process.argv.includes('--dry-run');

function loadEnvLocal() {
  const p = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

loadEnvLocal();

const TOKEN =
  process.env.HYGRAPH_MANAGEMENT_TOKEN ||
  process.env.GRAPHCMS_TOKEN ||
  process.env.HYGRAPH_TOKEN ||
  (fs.existsSync('/tmp/hygraph-crispro.token')
    ? fs.readFileSync('/tmp/hygraph-crispro.token', 'utf8').trim()
    : null);

if (!TOKEN) {
  console.error('Missing Hygraph token (.env.local or /tmp/hygraph-crispro.token)');
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch(MANAGEMENT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    const err = new Error(json.errors.map((e) => e.message).join('; '));
    err.response = json;
    throw err;
  }
  return json.data;
}

function buildChanges() {
  return [
    {
      createSimpleField: {
        modelApiId: 'NotebookBundle',
        apiId: 'infographicUrl',
        displayName: 'Infographic URL',
        type: 'STRING',
        isRequired: false,
        isList: false,
        isUnique: false,
        isLocalized: false,
        description:
          'Public HTTPS URL for NotebookLM Studio infographic PNG (fallback when Asset unset)',
      },
    },
    {
      createRelationalField: {
        modelApiId: 'NotebookBundle',
        apiId: 'infographic',
        displayName: 'Infographic',
        type: 'ASSET',
        isList: false,
        isRequired: false,
        reverseField: {
          apiId: 'notebookBundleInfographic',
          modelApiId: 'Asset',
          displayName: 'Notebook bundle infographic',
          isList: true,
          isUnidirectional: true,
        },
      },
    },
  ];
}

async function main() {
  const data = await gql(`
    query {
      viewer {
        ... on TokenViewer {
          project {
            environments { id name }
          }
        }
      }
    }
  `);
  const env = data.viewer?.project?.environments?.find((e) => e.name === 'master');
  if (!env?.id) {
    console.error('Could not resolve master environment id');
    process.exit(1);
  }

  const changes = buildChanges();
  const payload = {
    environmentId: env.id,
    name: `notebook-bundle-infographic-${Date.now()}`,
    changes,
  };

  console.log('Environment:', env.id, env.name);
  console.log('Changes:', changes.length);

  if (DRY_RUN) {
    console.log('\n--dry-run: not submitting. Payload preview:');
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(`\nSubmitting migration "${payload.name}"...`);
  const result = await gql(
    `mutation SubmitBatch($data: BatchMigrationInput!) {
      submitBatchChanges(data: $data) {
        migration { id name status errors }
      }
    }`,
    { data: payload },
  );
  console.log(JSON.stringify(result, null, 2));
  const mig = result?.submitBatchChanges?.migration;
  if (mig?.errors) {
    console.error('Migration errors:', mig.errors);
    process.exit(1);
  }
  console.log('✅ Migration submitted:', mig?.id, mig?.status);
}

main().catch((err) => {
  console.error(err?.response?.errors || err?.message || err);
  process.exit(1);
});
