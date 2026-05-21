/**
 * Push full conference abstract content + metadata into Hygraph Posts.
 * node tools/push-abstract-content-to-hygraph.mjs
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GraphQLClient } from 'graphql-request';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ||
  process.env.HYGRAPH_ENDPOINT;
const TOKEN = process.env.GRAPHCMS_TOKEN || process.env.HYGRAPH_TOKEN;
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai').replace(/\/$/, '');
const ABSTRACT_CATEGORY_SLUG = 'conference-abstracts';

if (!ENDPOINT || !TOKEN) {
  console.error('Missing GRAPHCMS_TOKEN / endpoint in .env.local');
  process.exit(1);
}

const client = new GraphQLClient(ENDPOINT, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

function hygraphSlug(slug) {
  return String(slug || '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function bodyToSlate(item) {
  const children = [
    {
      type: 'heading-two',
      children: [{ text: item.title }],
    },
  ];
  if (item.summary?.trim()) {
    children.push({
      type: 'paragraph',
      children: [{ text: item.summary.trim() }],
    });
  }
  children.push({
    type: 'paragraph',
    children: [{ text: item.authorLine }],
  });
  children.push({
    type: 'paragraph',
    children: [{ text: item.venue }],
  });
  if (item.link) {
    children.push({
      type: 'paragraph',
      children: [
        { text: 'Published abstract: ' },
        {
          type: 'link',
          href: item.link,
          children: [{ text: item.link }],
        },
      ],
    });
  }
  return { children };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getAacrAssetId() {
  const uploadUrl = `${SITE_ORIGIN}/images/partners/events/aacr.png`;
  const { createAsset } = await client.request(
    `mutation($u: String!) { createAsset(data: { uploadUrl: $u }) { id } }`,
    { u: uploadUrl },
  );
  try {
    await client.request(`mutation($id: ID!) { publishAsset(where: { id: $id }, to: PUBLISHED) { id } }`, {
      id: createAsset.id,
    });
  } catch {
    /* noop */
  }
  return createAsset.id;
}

async function pushViaContentApi(postId, item, assetId) {
  const data = {
    title: item.title,
    excerpt: item.bodyText || `${item.authorLine} · ${item.venue}`,
    content: bodyToSlate(item),
    featuredPost: false,
    featuredImage: { connect: { id: assetId } },
  };

  await client.request(
    `mutation($id: ID!, $data: PostUpdateInput!) {
      updatePost(where: { id: $id }, data: $data) { id slug }
    }`,
    { id: postId, data },
  );

  await client.request(
    `mutation($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id slug } }`,
    { id: postId },
  );
}

/** Hygraph MCP-equivalent fields (may only work via Management; also written to abstract-deck-config). */
async function pushViaOptionalFields(postId, item) {
  const optional = {
    authorLine: item.authorLine,
    venueLine: item.venue,
    abstractYear: item.year,
    abstractOrder: item.order,
    externalLink: item.link,
    pdfDeckUrl: item.pdfDeckUrl || null,
  };
  try {
    await client.request(
      `mutation($id: ID!, $data: PostUpdateInput!) {
        updatePost(where: { id: $id }, data: $data) { id }
      }`,
      { id: postId, data: optional },
    );
    await client.request(
      `mutation($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id } }`,
      { id: postId },
    );
    return true;
  } catch {
    return false;
  }
}

function updateLocalDeckConfig(items) {
  const configPath = path.join(__dirname, '../src/data/abstract-deck-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  config.items = items.map((item) => ({
    slug: hygraphSlug(item.slug),
    ...(item.pdfDeckUrl ? { pdfDeckUrl: item.pdfDeckUrl } : {}),
    ...(item.slideDeckSlug ? { slideDeckSlug: item.slideDeckSlug } : {}),
  }));
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
}

async function main() {
  const seedPath = path.join(__dirname, '../src/data/research-abstracts-seed.json');
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const assetId = await getAacrAssetId();
  updateLocalDeckConfig(seed.items);

  console.log('Pushing', seed.items.length, 'abstracts to Hygraph...\n');

  for (const item of seed.items) {
    await sleep(600);
    const slug = hygraphSlug(item.slug);
    const { post } = await client.request(
      `{ post(where: { slug: "${slug}" }) { id slug title content { text } } }`,
    ).catch(() => ({ post: null }));

    if (!post?.id) {
      console.warn(`✗ No post for slug: ${slug} — run seed-conference-abstract-posts.mjs first`);
      continue;
    }

    try {
      await pushViaContentApi(post.id, item, assetId);
      const metaOk = await pushViaOptionalFields(post.id, item);
      const verify = await client.request(
        `{ post(where: { slug: "${slug}" }) { content { text } excerpt } }`,
      );
      const textLen = verify.post?.content?.text?.length ?? 0;
      console.log(
        `✓ ${slug}`,
        `| content ${textLen} chars`,
        metaOk ? '| metadata' : '| metadata → local fallback only',
      );
    } catch (e) {
      console.error(`✗ ${slug}:`, e.response?.errors?.[0]?.message || e.message);
    }
  }

  console.log('\nDone. Refresh /research/abstracts/ to verify.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
