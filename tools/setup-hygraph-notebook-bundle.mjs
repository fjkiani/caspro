/**
 * Additive Hygraph schema: NotebookBundle model + Post.notebookBundle relation.
 *
 * Usage:
 *   node tools/setup-hygraph-notebook-bundle.mjs --dry-run
 *   node tools/setup-hygraph-notebook-bundle.mjs
 *
 * Auth: GRAPHCMS_TOKEN / HYGRAPH_TOKEN in .env.local, or /tmp/hygraph-crispro.token
 * Project: cm65g7pxd09kx07my82376f33 (us-west-2)
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

function simpleField(modelApiId, apiId, displayName, type, extras = {}) {
  return {
    createSimpleField: {
      modelApiId,
      apiId,
      displayName,
      type,
      isRequired: false,
      isList: false,
      isUnique: false,
      isLocalized: false,
      ...extras,
    },
  };
}

function buildChanges() {
  return [
    {
      createModel: {
        apiId: 'NotebookBundle',
        apiIdPlural: 'NotebookBundles',
        displayName: 'Notebook Bundle',
        description:
          'NotebookLM study pack: quiz, flashcards, mind map, audio, CSV, FAQ — linked from Post',
      },
    },
    simpleField('NotebookBundle', 'title', 'Title', 'STRING', {
      isRequired: true,
      isTitle: true,
    }),
    simpleField('NotebookBundle', 'slug', 'Slug', 'STRING', {
      isRequired: true,
      isUnique: true,
      formRenderer: 'GCMS_SLUG',
      validations: { String: { matches: { regex: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } } },
    }),
    simpleField('NotebookBundle', 'notebookId', 'Notebook ID', 'STRING', {
      isUnique: true,
      description: 'NotebookLM notebook UUID / artifact folder id',
    }),
    simpleField('NotebookBundle', 'audioUrl', 'Audio URL', 'STRING', {
      description: 'Public HTTPS URL for Listen (audio overview)',
    }),
    simpleField('NotebookBundle', 'quizJson', 'Quiz JSON', 'JSON', {
      description: 'NotebookLM quiz.json payload',
    }),
    simpleField('NotebookBundle', 'flashcardsJson', 'Flashcards JSON', 'JSON', {
      description: 'NotebookLM flashcards.json payload',
    }),
    simpleField('NotebookBundle', 'mindMapJson', 'Mind Map JSON', 'JSON', {
      description: 'NotebookLM mindMap.json payload',
    }),
    simpleField('NotebookBundle', 'dataTableCsv', 'Data Table CSV', 'STRING', {
      description: 'NotebookLM data.csv contents (plain text)',
      formRenderer: 'GCMS_MULTI_LINE',
    }),
    simpleField('NotebookBundle', 'faqJson', 'FAQ JSON', 'JSON', {
      description: 'Optional FAQ / Ask section payload',
    }),
    {
      createRelationalField: {
        modelApiId: 'NotebookBundle',
        apiId: 'slidePdf',
        displayName: 'Slide PDF',
        type: 'ASSET',
        isList: false,
        isRequired: false,
        reverseField: {
          apiId: 'notebookBundleSlidePdf',
          modelApiId: 'Asset',
          displayName: 'Notebook bundle slide PDF',
          isList: true,
          isUnidirectional: true,
        },
      },
    },
    {
      createRelationalField: {
        modelApiId: 'Post',
        apiId: 'notebookBundle',
        displayName: 'Notebook Bundle',
        type: 'RELATION',
        isList: false,
        isRequired: false,
        reverseField: {
          apiId: 'post',
          modelApiId: 'NotebookBundle',
          displayName: 'Post',
          isList: false,
        },
      },
    },
  ];
}

export const NOTEBOOK_BUNDLE_FIELD_API_IDS = [
  'title',
  'slug',
  'notebookId',
  'audioUrl',
  'quizJson',
  'flashcardsJson',
  'mindMapJson',
  'dataTableCsv',
  'faqJson',
  'slidePdf',
];

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
    name: `notebook-bundle-${Date.now()}`,
    changes,
  };

  console.log('Environment:', env.id, env.name);
  console.log('Changes:', changes.length);
  console.log('NotebookBundle fields:', NOTEBOOK_BUNDLE_FIELD_API_IDS.join(', '));
  console.log('Post relation: notebookBundle → NotebookBundle');

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
  console.log('Verify via Content API: __type(name: "NotebookBundle")');
}

main().catch((err) => {
  console.error(err?.response?.errors || err?.message || err);
  process.exit(1);
});
