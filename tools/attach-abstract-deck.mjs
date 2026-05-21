/**
 * Attach deck fields to a conference-abstract Post in Hygraph (Management / MCP API).
 *
 * Usage:
 *   node tools/attach-abstract-deck.mjs <post-slug> --pdf-url "https://..."
 *   node tools/attach-abstract-deck.mjs <post-slug> --slide-deck-slug "crispro-101"
 *   node tools/attach-abstract-deck.mjs <post-slug> --pdf-asset "https://crispro.ai/path/to.pdf"
 *
 * Also appends to src/data/abstract-deck-config.json for Content API fallback.
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GraphQLClient } from 'graphql-request';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || process.env.HYGRAPH_ENDPOINT;
const TOKEN = process.env.GRAPHCMS_TOKEN || process.env.HYGRAPH_TOKEN;

const args = process.argv.slice(2);
const slugArg = args.find((a) => !a.startsWith('--'));
const pdfUrl = args.includes('--pdf-url') ? args[args.indexOf('--pdf-url') + 1] : null;
const slideDeckSlug = args.includes('--slide-deck-slug')
  ? args[args.indexOf('--slide-deck-slug') + 1]
  : null;
const pdfAssetUrl = args.includes('--pdf-asset') ? args[args.indexOf('--pdf-asset') + 1] : null;

if (!slugArg) {
  console.error(
    'Usage: node tools/attach-abstract-deck.mjs <slug> [--pdf-url URL] [--slide-deck-slug id] [--pdf-asset uploadUrl]',
  );
  process.exit(1);
}

const slug = slugArg.replace(/\/+$/, '').replace(/-+$/, '');

function updateLocalConfig() {
  const configPath = path.join(__dirname, '../src/data/abstract-deck-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const items = config.items || [];
  const idx = items.findIndex((i) => i.slug.replace(/-+$/, '') === slug);
  const row = {
    slug,
    ...(pdfUrl ? { pdfDeckUrl: pdfUrl } : {}),
    ...(slideDeckSlug ? { slideDeckSlug } : {}),
    ...(pdfAssetUrl && !pdfUrl ? { pdfDeckUrl: pdfAssetUrl } : {}),
  };
  if (idx >= 0) items[idx] = { ...items[idx], ...row };
  else items.push(row);
  config.items = items;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log('Updated', configPath);
}

async function main() {
  updateLocalConfig();

  if (!ENDPOINT || !TOKEN) {
    console.log('No Hygraph token — local config only.');
    return;
  }

  const client = new GraphQLClient(ENDPOINT, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const { post } = await client.request(
    `{ post(where: { slug: "${slug}" }) { id title } }`,
  );
  if (!post?.id) {
    console.error('Post not found for slug:', slug);
    process.exit(1);
  }

  const data = {};
  if (pdfUrl) data.pdfDeckUrl = pdfUrl;
  if (slideDeckSlug) data.slideDeckSlug = slideDeckSlug;

  if (pdfAssetUrl) {
    try {
      const { createAsset } = await client.request(
        `mutation($u: String!) { createAsset(data: { uploadUrl: $u }) { id } }`,
        { u: pdfAssetUrl },
      );
      await client.request(`mutation($id: ID!) { publishAsset(where: { id: $id }, to: PUBLISHED) { id } }`, {
        id: createAsset.id,
      });
      data.pdfDeck = { connect: { id: createAsset.id } };
    } catch (e) {
      console.warn('Asset upload failed:', e.response?.errors?.[0]?.message || e.message);
    }
  }

  if (!Object.keys(data).length) {
    console.log('Nothing to push — pass --pdf-url, --slide-deck-slug, or --pdf-asset');
    return;
  }

  try {
    await client.request(
      `mutation($id: ID!, $data: PostUpdateInput!) {
        updatePost(where: { id: $id }, data: $data) { id slug }
      }`,
      { id: post.id, data },
    );
    await client.request(
      `mutation($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id } }`,
      { id: post.id },
    );
    console.log(`Hygraph updated + published: ${post.title}`);
  } catch (e) {
    console.warn(
      'Hygraph update failed (fields may not be on Content API yet):',
      e.response?.errors?.[0]?.message || e.message,
    );
    console.log('Local abstract-deck-config.json was still updated for the app.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
