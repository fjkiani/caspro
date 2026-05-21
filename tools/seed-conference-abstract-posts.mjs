/**
 * Seed conference abstracts as Hygraph Post entries (category: conference-abstracts).
 * node tools/seed-conference-abstract-posts.mjs
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
  process.env.HYGRAPH_ENDPOINT ||
  'https://us-west-2.cdn.hygraph.com/content/cm65g7pxd09kx07my82376f33/master';
const TOKEN = process.env.GRAPHCMS_TOKEN || process.env.HYGRAPH_TOKEN;
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai').replace(/\/$/, '');
const ABSTRACT_CATEGORY_SLUG = 'conference-abstracts';

if (!TOKEN) {
  console.error('Missing GRAPHCMS_TOKEN in .env.local');
  process.exit(1);
}

const client = new GraphQLClient(ENDPOINT, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

/** Hygraph slug regex rejects trailing hyphens. */
function hygraphSlug(slug) {
  return String(slug || '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function bodyToSlate(item) {
  const lines = (item.bodyText || item.authorLine)
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean);
  if (lines.length === 0) {
    lines.push(item.authorLine, item.venue);
  }
  return {
    children: lines.map((line) => ({
      type: 'paragraph',
      children: [{ text: line }],
    })),
  };
}

const CREATE_ASSET = `
  mutation CreateAsset($uploadUrl: String!) {
    createAsset(data: { uploadUrl: $uploadUrl }) { id }
  }
`;

const PUBLISH_ASSET = `mutation($id: ID!) { publishAsset(where: { id: $id }, to: PUBLISHED) { id } }`;

const UPSERT_CATEGORY = `
  mutation UpsertCategory($create: CategoryCreateInput!, $update: CategoryUpdateInput!) {
    upsertCategory(
      where: { slug: "${ABSTRACT_CATEGORY_SLUG}" }
      create: $create
      update: $update
    ) { id slug }
  }
`;

const PUBLISH_CATEGORY = `mutation($id: ID!) { publishCategory(where: { id: $id }, to: PUBLISHED) { id slug } }`;

const CREATE_POST = `mutation($data: PostCreateInput!) { createPost(data: $data) { id slug } }`;

const UPDATE_POST = `mutation($id: ID!, $data: PostUpdateInput!) { updatePost(where: { id: $id }, data: $data) { id slug } }`;

const PUBLISH_POST = `mutation($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id slug } }`;

async function getOrCreateCategoryId() {
  const existing = await client.request(
    `{ categories(where: { slug: "${ABSTRACT_CATEGORY_SLUG}" }) { id } }`,
  );
  if (existing.categories[0]?.id) {
    const id = existing.categories[0].id;
    try {
      await client.request(PUBLISH_CATEGORY, { id });
    } catch {
      /* noop */
    }
    return id;
  }
  const { upsertCategory } = await client.request(UPSERT_CATEGORY, {
    create: { name: 'Conference Abstracts', slug: ABSTRACT_CATEGORY_SLUG },
    update: { name: 'Conference Abstracts' },
  });
  await client.request(PUBLISH_CATEGORY, { id: upsertCategory.id });
  return upsertCategory.id;
}

async function getOrCreateAacrAssetId() {
  const uploadUrl = `${SITE_ORIGIN}/images/partners/events/aacr.png`;
  const { createAsset } = await client.request(CREATE_ASSET, { uploadUrl });
  try {
    await client.request(PUBLISH_ASSET, { id: createAsset.id });
  } catch {
    /* noop */
  }
  return createAsset.id;
}

async function trySetAbstractFields(postId, item) {
  try {
    await client.request(UPDATE_POST, {
      id: postId,
      data: {
        authorLine: item.authorLine,
        venueLine: item.venue,
        abstractYear: item.year,
        abstractOrder: item.order,
        externalLink: item.link,
      },
    });
  } catch {
    console.warn(`  (optional abstract fields skipped for ${item.slug})`);
  }
}

async function main() {
  const seedPath = path.join(__dirname, '../src/data/research-abstracts-seed.json');
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  console.log('Endpoint:', ENDPOINT);
  const categoryId = await getOrCreateCategoryId();
  console.log('Category:', categoryId);
  const assetId = await getOrCreateAacrAssetId();
  console.log('Asset:', assetId);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const UPDATE_POST = `mutation($id: ID!, $data: PostUpdateInput!) {
    updatePost(where: { id: $id }, data: $data) { id slug }
  }`;

  let created = 0;
  for (const item of seed.items) {
    await sleep(800);
    const slug = hygraphSlug(item.slug);
    const existing = await client.request(
      `{ post(where: { slug: "${slug}" }) { id slug categories { slug } featuredImage { id } } }`,
    ).catch(() => ({ post: null }));

    if (existing.post?.categories?.some((c) => c.slug === ABSTRACT_CATEGORY_SLUG)) {
      try {
        await trySetAbstractFields(existing.post.id, item);
        const patch = {
          excerpt: item.bodyText || `${item.authorLine} · ${item.venue}`,
          ...(existing.post.featuredImage?.id
            ? {}
            : { featuredImage: { connect: { id: assetId } } }),
        };
        await client.request(UPDATE_POST, { id: existing.post.id, data: patch });
        await client.request(PUBLISH_POST, { id: existing.post.id });
        console.log(`Updated: ${slug}${item.link ? ' + link' : ''}`);
      } catch (e) {
        console.warn(`Patch ${slug}:`, e.response?.errors?.[0]?.message || e.message);
      }
      continue;
    }

    if (existing.post?.id) {
      await client.request(
        `mutation($id: ID!) { updatePost(where: { id: $id }, data: { categories: { connect: [{ id: "${categoryId}" }] } }) { id slug } }`,
        { id: existing.post.id },
      );
      await trySetAbstractFields(existing.post.id, item);
      await client.request(PUBLISH_POST, { id: existing.post.id });
      console.log(`Linked: ${item.slug}`);
      created++;
      continue;
    }

    const data = {
      title: item.title,
      slug,
      excerpt: item.bodyText || `${item.authorLine} · ${item.venue}`,
      featuredPost: false,
      content: bodyToSlate(item),
      categories: { connect: [{ id: categoryId }] },
      featuredImage: { connect: { id: assetId } },
    };

    try {
      const { createPost } = await client.request(CREATE_POST, { data });
      await trySetAbstractFields(createPost.id, item);
      await client.request(PUBLISH_POST, { id: createPost.id });
      console.log(`Created: ${createPost.slug}`);
      created++;
    } catch (err) {
      console.error(`Failed ${item.slug}:`, err.response?.errors || err.message);
    }
  }

  const verify = await client.request(
    `{ posts(where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }, first: 20) { slug title } }`,
  );
  console.log('\nIn Hygraph:', verify.posts.length);
  verify.posts.forEach((p) => console.log(' ·', p.slug));
  console.log(`\nDone (${created} new/linked).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
