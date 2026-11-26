/**
 * publishNotebookToBlog — upsert NotebookBundle + Post (+ optional MediaItem DECK)
 * from local NotebookLM artifact folder or explicit paths.
 *
 * Usage:
 *   node tools/publishNotebookToBlog.mjs \
 *     --artifacts /workspace/portal/public/artifacts/<notebookId> \
 *     --slug nlm-test-python-types \
 *     --title "NotebookLM: Python Data Types (TEST)" \
 *     [--draft] [--publish] [--no-media]
 *
 * Defaults: --publish (publish Post + NotebookBundle). Use --draft to leave DRAFT.
 *
 * Flow:
 *   1. Ensure Category slug `notebooklm-learning`
 *   2. Optional: createAsset from slides.pdf public URL or local file via uploadUrl
 *   3. Upsert NotebookBundle (quiz/flashcards/mindMap/csv/audio)
 *   4. Upsert Post body + connect notebookBundle (+ category, author, featuredImage)
 *   5. Optional MediaItem DECK with same slug
 *   6. publish*
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const ENDPOINT =
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const TOKEN =
  process.env.GRAPHCMS_TOKEN ||
  process.env.HYGRAPH_TOKEN ||
  (fs.existsSync('/tmp/hygraph-crispro.token')
    ? fs.readFileSync('/tmp/hygraph-crispro.token', 'utf8').trim()
    : null);

const CATEGORY_SLUG = 'notebooklm-learning';
const CATEGORY_NAME = 'NotebookLM Learning';
const AUTHOR_ID = process.env.HYGRAPH_DEFAULT_AUTHOR_ID || 'cm2u1z1jfc8zt08n1rwdpblpe';
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://crispro.ai').replace(/\/$/, '');

if (!ENDPOINT || !TOKEN) {
  console.error('Missing HYGRAPH_ENDPOINT / token');
  process.exit(1);
}

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  if (!next || next.startsWith('--')) return true;
  return next;
}

function hygraphSlug(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
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

function readJsonIfExists(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readTextIfExists(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function bodyToSlate({ title, excerpt, notebookId }) {
  return {
    children: [
      { type: 'heading-two', children: [{ text: title }] },
      {
        type: 'paragraph',
        children: [
          {
            text:
              excerpt ||
              'Interactive NotebookLM study pack (quiz, flashcards, mind map, audio).',
          },
        ],
      },
      notebookId
        ? {
            type: 'paragraph',
            children: [{ text: `Notebook ID: ${notebookId}` }],
          }
        : null,
      {
        type: 'paragraph',
        children: [
          {
            text: 'Scroll to the Notebook study pack below for Listen → Explore → Study → Ask.',
          },
        ],
      },
    ].filter(Boolean),
  };
}

async function ensureCategory() {
  for (const stage of ['DRAFT', 'PUBLISHED']) {
    const existing = await gql(
      `query($slug: String!) { category(where: { slug: $slug }, stage: ${stage}) { id slug name } }`,
      { slug: CATEGORY_SLUG },
    );
    if (existing?.category?.id) {
      try {
        await gql(
          `mutation($id: ID!) { publishCategory(where: { id: $id }, to: PUBLISHED) { id } }`,
          { id: existing.category.id },
        );
      } catch {
        /* already published */
      }
      return existing.category;
    }
  }

  const created = await gql(
    `mutation($data: CategoryCreateInput!) {
      createCategory(data: $data) { id slug name }
    }`,
    { data: { name: CATEGORY_NAME, slug: CATEGORY_SLUG } },
  );
  const cat = created.createCategory;
  try {
    await gql(`mutation($id: ID!) { publishCategory(where: { id: $id }, to: PUBLISHED) { id } }`, {
      id: cat.id,
    });
  } catch {
    /* optional */
  }
  return cat;
}

async function ensureFeaturedImageAsset() {
  // Reuse a known published asset from an existing post when possible
  const q = await gql(`{ posts(first: 1) { featuredImage { id url } } }`);
  const existing = q?.posts?.[0]?.featuredImage;
  if (existing?.id) return existing.id;

  const uploadUrl = `${SITE_ORIGIN}/og-image.png`;
  const { createAsset } = await gql(
    `mutation($u: String!) { createAsset(data: { uploadUrl: $u }) { id } }`,
    { u: uploadUrl },
  );
  try {
    await gql(`mutation($id: ID!) { publishAsset(where: { id: $id }, to: PUBLISHED) { id } }`, {
      id: createAsset.id,
    });
  } catch {
    /* noop */
  }
  return createAsset.id;
}

async function createAssetFromUploadUrl(uploadUrl) {
  if (!uploadUrl) return null;
  const { createAsset } = await gql(
    `mutation($u: String!) { createAsset(data: { uploadUrl: $u }) { id url } }`,
    { u: uploadUrl },
  );
  try {
    await gql(`mutation($id: ID!) { publishAsset(where: { id: $id }, to: PUBLISHED) { id } }`, {
      id: createAsset.id,
    });
  } catch {
    /* asset may still be processing */
  }
  return createAsset;
}

/**
 * @param {object} opts
 * @param {string} opts.slug
 * @param {string} opts.title
 * @param {string} [opts.excerpt]
 * @param {string} [opts.notebookId]
 * @param {string} [opts.artifactsDir]
 * @param {string} [opts.quizPath]
 * @param {string} [opts.flashcardsPath]
 * @param {string} [opts.mindMapPath]
 * @param {string} [opts.csvPath]
 * @param {string} [opts.audioUrl]
 * @param {string} [opts.slidesUploadUrl] public HTTPS for slides.pdf
 * @param {boolean} [opts.publish]
 * @param {boolean} [opts.withMediaItem]
 */
export async function publishNotebookToBlog(opts) {
  const slug = hygraphSlug(opts.slug);
  const title = opts.title || slug;
  const excerpt =
    opts.excerpt ||
    `TEST NotebookLM learning post — ${title}. Interactive quiz / flashcards / mind map.`;
  const artifactsDir = opts.artifactsDir || null;
  const notebookId =
    opts.notebookId ||
    (artifactsDir ? path.basename(artifactsDir) : null) ||
    slug;

  const quiz =
    opts.quizJson ||
    readJsonIfExists(opts.quizPath) ||
    readJsonIfExists(artifactsDir && path.join(artifactsDir, 'quiz.json'));
  const flashcards =
    opts.flashcardsJson ||
    readJsonIfExists(opts.flashcardsPath) ||
    readJsonIfExists(artifactsDir && path.join(artifactsDir, 'flashcards.json'));
  const mindMap =
    opts.mindMapJson ||
    readJsonIfExists(opts.mindMapPath) ||
    readJsonIfExists(artifactsDir && path.join(artifactsDir, 'mindMap.json'));
  const dataTableCsv =
    opts.dataTableCsv ||
    readTextIfExists(opts.csvPath) ||
    readTextIfExists(artifactsDir && path.join(artifactsDir, 'data.csv'));

  let audioUrl = opts.audioUrl || null;
  if (!audioUrl && artifactsDir) {
    const audioPath = path.join(artifactsDir, 'audio.mp3');
    // Local file is not public; only set if caller provided uploadUrl/public URL
    if (fs.existsSync(audioPath) && opts.audioUploadUrl) {
      audioUrl = opts.audioUploadUrl;
    }
  }

  const category = await ensureCategory();
  const featuredImageId = await ensureFeaturedImageAsset();

  let slideAsset = null;
  const slidesUploadUrl = opts.slidesUploadUrl || null;
  if (slidesUploadUrl) {
    slideAsset = await createAssetFromUploadUrl(slidesUploadUrl);
  }

  // Upsert NotebookBundle
  const bundleData = {
    title: quiz?.title || flashcards?.title || mindMap?.title || title,
    slug,
    notebookId,
    audioUrl: audioUrl || undefined,
    quizJson: quiz || undefined,
    flashcardsJson: flashcards || undefined,
    mindMapJson: mindMap || undefined,
    dataTableCsv: dataTableCsv || undefined,
    faqJson: opts.faqJson || undefined,
    ...(slideAsset?.id ? { slidePdf: { connect: { id: slideAsset.id } } } : {}),
  };

  async function findBySlug(type, s) {
    // Content API defaults to PUBLISHED — also check DRAFT for upserts
    for (const stage of ['DRAFT', 'PUBLISHED']) {
      const q =
        type === 'bundle'
          ? `query($slug: String!) { notebookBundle(where: { slug: $slug }, stage: ${stage}) { id } }`
          : type === 'post'
            ? `query($slug: String!) { post(where: { slug: $slug }, stage: ${stage}) { id } }`
            : `query($slug: String!) { mediaItem(where: { slug: $slug }, stage: ${stage}) { id } }`;
      const data = await gql(q, { slug: s });
      const node =
        data.notebookBundle || data.post || data.mediaItem || null;
      if (node?.id) return node;
    }
    return null;
  }

  const existingBundle = await findBySlug('bundle', slug);

  let bundleId;
  if (existingBundle?.id) {
    const { slug: _slug, ...updateBundle } = bundleData;
    const updated = await gql(
      `mutation($id: ID!, $data: NotebookBundleUpdateInput!) {
        updateNotebookBundle(where: { id: $id }, data: $data) { id slug }
      }`,
      { id: existingBundle.id, data: updateBundle },
    );
    bundleId = updated.updateNotebookBundle.id;
  } else {
    const created = await gql(
      `mutation($data: NotebookBundleCreateInput!) {
        createNotebookBundle(data: $data) { id slug }
      }`,
      { data: bundleData },
    );
    bundleId = created.createNotebookBundle.id;
  }

  // Upsert Post
  const postData = {
    title,
    excerpt,
    featuredPost: false,
    content: bodyToSlate({ title, excerpt, notebookId }),
    featuredImage: { connect: { id: featuredImageId } },
    author: { connect: [{ id: AUTHOR_ID }] },
    categories: { connect: [{ id: category.id }] },
    notebookBundle: { connect: { id: bundleId } },
  };

  const existingPost = await findBySlug('post', slug);

  let postId;
  if (existingPost?.id) {
    const updated = await gql(
      `mutation($id: ID!, $data: PostUpdateInput!) {
        updatePost(where: { id: $id }, data: $data) { id slug }
      }`,
      {
        id: existingPost.id,
        data: {
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          featuredPost: false,
          notebookBundle: { connect: { id: bundleId } },
          // UpdateManyInline uses CategoryConnectInput { where }
          categories: { connect: [{ where: { id: category.id } }] },
        },
      },
    );
    postId = updated.updatePost.id;
  } else {
    const created = await gql(
      `mutation($data: PostCreateInput!) {
        createPost(data: $data) { id slug }
      }`,
      {
        data: {
          ...postData,
          slug,
        },
      },
    );
    postId = created.createPost.id;
  }

  // Optional MediaItem DECK (same slug) for existing BlogPostMedia merge path
  let mediaItemId = null;
  if (opts.withMediaItem !== false && slideAsset?.id) {
    try {
      const existingMedia = await findBySlug('media', slug);
      const mediaData = {
        title,
        slug,
        excerpt: excerpt.slice(0, 200),
        isPublished: true,
        deckSlug: slug,
        type: 'DECK',
        pdfFile: { connect: { id: slideAsset.id } },
      };
      if (existingMedia?.id) {
        const u = await gql(
          `mutation($id: ID!, $data: MediaItemUpdateInput!) {
            updateMediaItem(where: { id: $id }, data: $data) { id }
          }`,
          {
            id: existingMedia.id,
            data: {
              title,
              excerpt: excerpt.slice(0, 200),
              isPublished: true,
              deckSlug: slug,
              pdfFile: { connect: { id: slideAsset.id } },
            },
          },
        );
        mediaItemId = u.updateMediaItem.id;
      } else {
        const c = await gql(
          `mutation($data: MediaItemCreateInput!) {
            createMediaItem(data: $data) { id }
          }`,
          { data: mediaData },
        );
        mediaItemId = c.createMediaItem.id;
      }
    } catch (e) {
      console.warn('MediaItem upsert skipped:', e.message);
    }
  }

  const shouldPublish = opts.publish !== false;
  if (shouldPublish) {
    await gql(
      `mutation($id: ID!) { publishNotebookBundle(where: { id: $id }, to: PUBLISHED) { id } }`,
      { id: bundleId },
    );
    await gql(
      `mutation($id: ID!) { publishPost(where: { id: $id }, to: PUBLISHED) { id slug } }`,
      { id: postId },
    );
    if (mediaItemId) {
      try {
        await gql(
          `mutation($id: ID!) { publishMediaItem(where: { id: $id }, to: PUBLISHED) { id } }`,
          { id: mediaItemId },
        );
      } catch {
        /* optional */
      }
    }
  }

  return {
    slug,
    postId,
    bundleId,
    mediaItemId,
    categorySlug: category.slug,
    published: shouldPublish,
    routes: {
      research: `/research/blog/${slug}/`,
      blog: `/blog/post/${slug}/`,
    },
  };
}

async function main() {
  const artifacts = arg('artifacts');
  const slug = arg('slug', artifacts ? `nlm-test-${path.basename(artifacts).slice(0, 12)}` : null);
  const title = arg('title', 'NotebookLM study pack (TEST)');
  const draft = Boolean(arg('draft'));
  const noMedia = Boolean(arg('no-media'));
  const slidesUploadUrl = arg('slides-upload-url');
  const audioUrl = arg('audio-url');

  if (!slug) {
    console.error('Required: --slug and usually --artifacts <dir>');
    process.exit(1);
  }

  const result = await publishNotebookToBlog({
    slug,
    title,
    artifactsDir: artifacts || undefined,
    slidesUploadUrl: slidesUploadUrl || undefined,
    audioUrl: audioUrl || undefined,
    publish: !draft,
    withMediaItem: !noMedia,
  });

  console.log(JSON.stringify(result, null, 2));
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((err) => {
    console.error(err?.response?.errors || err?.message || err);
    process.exit(1);
  });
}
