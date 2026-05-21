/**
 * Seed ResearchAbstract entries from research-abstracts-seed.json.
 *
 * Prerequisite: ResearchAbstract model exists (run setup-hygraph-research-abstracts.ts or Studio).
 *
 * Usage:
 *   npx tsx tools/seed-research-abstracts.ts
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
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai';

if (!TOKEN) {
  console.error('Missing GRAPHCMS_TOKEN in .env.local');
  process.exit(1);
}

const client = new GraphQLClient(ENDPOINT, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const CREATE_ASSET = `
  mutation CreateAsset($uploadUrl: String!) {
    createAsset(data: { uploadUrl: $uploadUrl }) {
      id
      url
    }
  }
`;

const CREATE_ABSTRACT = `
  mutation CreateResearchAbstract($data: ResearchAbstractCreateInput!) {
    createResearchAbstract(data: $data) {
      id
      slug
    }
  }
`;

const PUBLISH = `
  mutation PublishResearchAbstract($id: ID!) {
    publishResearchAbstract(where: { id: $id }, to: PUBLISHED) {
      id
      slug
    }
  }
`;

const LIST_BY_SLUG = `
  query ListAbstracts {
    researchAbstracts(first: 100) {
      id
      slug
    }
  }
`;

type SeedFile = {
  items: Array<{
    title: string;
    slug: string;
    authorLine: string;
    venue: string;
    year: number | null;
    link: string | null;
    bodyHtml: string;
    order: number;
    publishedAt: string;
    imageUrl: string;
  }>;
};

async function getOrCreateImageAsset(): Promise<string | null> {
  const uploadUrl = `${SITE_ORIGIN.replace(/\/$/, '')}/images/partners/events/aacr.png`;
  try {
    const { createAsset } = await client.request<{ createAsset: { id: string } }>(CREATE_ASSET, {
      uploadUrl,
    });
    return createAsset.id;
  } catch (e) {
    console.warn('Could not upload AACR image asset:', (e as Error).message);
    return null;
  }
}

async function main() {
  const seedPath = path.join(__dirname, '../src/data/research-abstracts-seed.json');
  const seed: SeedFile = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  let existing = new Map<string, string>();
  try {
    const { researchAbstracts } = await client.request<{ researchAbstracts: { id: string; slug: string }[] }>(
      LIST_BY_SLUG,
    );
    existing = new Map(researchAbstracts.map((r) => [r.slug, r.id]));
  } catch {
    console.error('researchAbstracts query failed — run setup-hygraph-research-abstracts.ts first.');
    process.exit(1);
  }

  const imageId = await getOrCreateImageAsset();

  for (const item of seed.items) {
    if (existing.has(item.slug)) {
      console.log(`Skip (exists): ${item.slug}`);
      continue;
    }

    const data: Record<string, unknown> = {
      title: item.title,
      slug: item.slug,
      authorLine: item.authorLine,
      venue: item.venue,
      year: item.year,
      order: item.order,
      publishedAt: item.publishedAt,
      externalLink: item.link,
      body: { create: { children: [{ type: 'paragraph', children: [{ text: item.authorLine }] }] } },
    };

    if (item.bodyHtml) {
      data.body = item.bodyHtml;
    }

    if (imageId) {
      data.image = { connect: { id: imageId } };
    }

    try {
      const { createResearchAbstract } = await client.request<{
        createResearchAbstract: { id: string; slug: string };
      }>(CREATE_ABSTRACT, { data });
      await client.request(PUBLISH, { id: createResearchAbstract.id });
      console.log(`Created + published: ${createResearchAbstract.slug}`);
    } catch (err: unknown) {
      const e = err as { response?: { errors?: unknown[] }; message?: string };
      console.error(`Failed ${item.slug}:`, e.response?.errors || e.message);
    }
  }

  console.log('Done.');
}

main();
