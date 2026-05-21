/**
 * Seed conference abstracts as Hygraph Post entries (category: conference-abstracts).
 *
 * Usage:
 *   npx tsx tools/seed-conference-abstract-posts.ts
 *
 * Requires GRAPHCMS_TOKEN / HYGRAPH_ENDPOINT in .env.local
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GraphQLClient } from 'graphql-request';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

type SeedItem = {
  title: string;
  slug: string;
  authorLine: string;
  venue: string;
  year: number | null;
  link: string | null;
  bodyText: string;
  bodyHtml: string;
  order: number;
  publishedAt: string;
};

type SeedFile = { items: SeedItem[] };

function bodyToSlate(item: SeedItem) {
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
    createAsset(data: { uploadUrl: $uploadUrl }) {
      id
    }
  }
`;

const PUBLISH_ASSET = `
  mutation PublishAsset($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) { id }
  }
`;

const UPSERT_CATEGORY = `
  mutation UpsertCategory($create: CategoryCreateInput!, $update: CategoryUpdateInput!) {
    upsertCategory(
      where: { slug: "${ABSTRACT_CATEGORY_SLUG}" }
      create: $create
      update: $update
    ) {
      id
      slug
      stage
    }
  }
`;

const PUBLISH_CATEGORY = `
  mutation PublishCategory($id: ID!) {
    publishCategory(where: { id: $id }, to: PUBLISHED) { id slug stage }
  }
`;

const CREATE_POST = `
  mutation CreatePost($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      slug
      stage
    }
  }
`;

const UPDATE_POST = `
  mutation UpdatePost($id: ID!, $data: PostUpdateInput!) {
    updatePost(where: { id: $id }, data: $data) {
      id
      slug
    }
  }
`;

const PUBLISH_POST = `
  mutation PublishPost($id: ID!) {
    publishPost(where: { id: $id }, to: PUBLISHED) { id slug stage }
  }
`;

const LIST_ABSTRACT_POSTS = `
  query ListAbstractPosts {
    posts(where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }, first: 50) {
      id
      slug
      stage
    }
    postsBySlug: posts(first: 50) {
      slug
      id
    }
  }
`;

async function getOrCreateCategoryId(): Promise<string> {
  const existing = await client.request<{ categories: { id: string; slug: string }[] }>(
    `{ categories(where: { slug: "${ABSTRACT_CATEGORY_SLUG}" }) { id slug } }`,
  );
  if (existing.categories[0]?.id) {
    const id = existing.categories[0].id;
    try {
      await client.request(PUBLISH_CATEGORY, { id });
    } catch {
      /* already published */
    }
    return id;
  }

  const { upsertCategory } = await client.request<{
    upsertCategory: { id: string };
  }>(UPSERT_CATEGORY, {
    create: { name: 'Conference Abstracts', slug: ABSTRACT_CATEGORY_SLUG },
    update: { name: 'Conference Abstracts' },
  });
  await client.request(PUBLISH_CATEGORY, { id: upsertCategory.id });
  return upsertCategory.id;
}

async function getOrCreateAacrAssetId(): Promise<string> {
  const uploadUrl = `${SITE_ORIGIN}/images/partners/events/aacr.png`;
  const { createAsset } = await client.request<{ createAsset: { id: string } }>(CREATE_ASSET, {
    uploadUrl,
  });
  try {
    await client.request(PUBLISH_ASSET, { id: createAsset.id });
  } catch {
    /* may already be published */
  }
  return createAsset.id;
}

async function trySetAbstractFields(
  postId: string,
  item: SeedItem,
): Promise<void> {
  const data: Record<string, unknown> = {
    authorLine: item.authorLine,
    venueLine: item.venue,
    abstractYear: item.year,
    abstractOrder: item.order,
    externalLink: item.link,
  };
  try {
    await client.request(UPDATE_POST, { id: postId, data });
  } catch {
    console.warn(`  (optional fields not on Content API yet for ${item.slug})`);
  }
}

async function main() {
  const seedPath = path.join(__dirname, '../src/data/research-abstracts-seed.json');
  const seed: SeedFile = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  console.log('Endpoint:', ENDPOINT);
  const categoryId = await getOrCreateCategoryId();
  console.log('Category:', ABSTRACT_CATEGORY_SLUG, categoryId);

  const assetId = await getOrCreateAacrAssetId();
  console.log('AACR asset:', assetId);

  const { posts, postsBySlug } = await client.request<{
    posts: { id: string; slug: string }[];
    postsBySlug: { id: string; slug: string }[];
  }>(LIST_ABSTRACT_POSTS);

  const existingBySlug = new Map(postsBySlug.map((p) => [p.slug, p.id]));
  const inCategory = new Set(posts.map((p) => p.slug));

  let created = 0;
  let skipped = 0;

  for (const item of seed.items) {
    if (inCategory.has(item.slug)) {
      console.log(`Skip (in category): ${item.slug}`);
      skipped++;
      continue;
    }

    const postId = existingBySlug.get(item.slug);
    if (postId) {
      try {
        await client.request(
          `mutation($id: ID!, $cats: [CategoryWhereUniqueInput!]!) {
            updatePost(where: { id: $id }, data: { categories: { connect: $cats } }) { id slug }
          }`,
          { id: postId, cats: [{ id: categoryId }] },
        );
        await trySetAbstractFields(postId, item);
        await client.request(PUBLISH_POST, { id: postId });
        console.log(`Linked + published existing post: ${item.slug}`);
        created++;
      } catch (err: unknown) {
        const e = err as { response?: { errors?: unknown[] }; message?: string };
        console.error(`Failed link ${item.slug}:`, e.response?.errors || e.message);
      }
      continue;
    }

    const data: Record<string, unknown> = {
      title: item.title,
      slug: item.slug,
      excerpt: item.bodyText || `${item.authorLine} · ${item.venue}`,
      featuredPost: false,
      content: bodyToSlate(item),
      categories: { connect: [{ id: categoryId }] },
      featuredImage: { connect: { id: assetId } },
    };

    try {
      const { createPost } = await client.request<{ createPost: { id: string; slug: string } }>(
        CREATE_POST,
        { data },
      );
      await trySetAbstractFields(createPost.id, item);
      await client.request(PUBLISH_POST, { id: createPost.id });
      console.log(`Created + published: ${createPost.slug}`);
      created++;
    } catch (err: unknown) {
      const e = err as { response?: { errors?: unknown[] }; message?: string };
      console.error(`Failed ${item.slug}:`, e.response?.errors || e.message);
    }
  }

  const verify = await client.request<{ posts: { slug: string; title: string }[] }>(
    `{ posts(where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }, first: 20, orderBy: abstractOrder_ASC) { slug title authorLine venueLine abstractYear abstractOrder externalLink } }`,
  ).catch(async () => {
    return client.request(
      `{ posts(where: { categories_some: { slug: "${ABSTRACT_CATEGORY_SLUG}" } }, first: 20) { slug title excerpt } }`,
    );
  });

  console.log('\nPublished abstract posts:', verify.posts?.length ?? 0);
  for (const p of verify.posts || []) {
    console.log(`  · ${p.slug}`);
  }
  console.log(`\nDone. created/linked=${created}, skipped=${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
