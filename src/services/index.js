import { GraphQLClient, gql } from 'graphql-request';
import { TRIAL_RECEIPT_NAV } from '@/data/trial-receipt-nav';

// Use process.env for Next.js environment variables
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken = process.env.GRAPHCMS_TOKEN;

// Check if the environment variable is loaded
if (!graphqlAPI) {
  console.error("CRITICAL: NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined. Check your .env.local file and ensure the Next.js development server was restarted after creating/modifying it.");
  // This will prevent the app from crashing if it's missing during build/runtime,
  // but the blog will not fetch data.
}

// Initialize GraphQL Client with Auth Header if token is present
const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: graphqlToken ? `Bearer ${graphqlToken}` : '',
  },
});

export const getPosts = async () => {
  if (!graphqlAPI) {
    console.warn("getPosts: graphqlAPI endpoint is not defined. Returning empty array.");
    return [];
  }
  const query = gql`
    query GetPostsQuery { # Renamed query for clarity
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query);
    return result?.postsConnection?.edges || []; // Robustly return an array
  } catch (error) {
    console.error("Error fetching posts in getPosts service:", error);
    return []; // Return empty array on error
  }
};

export const getCategories = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `;
  try {
    const result = await graphQLClient.request(query);
    return result?.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

/**
 * Core post query — only fields that exist on every Hygraph `Post` in this project.
 * Deck / PDF fields are fetched separately so a missing schema field does not 400 the whole post.
 */
const GET_POST_DETAILS_CORE = gql`
  query GetPostDetailsCore($slug: String!) {
    post(where: { slug: $slug }) {
      title
      excerpt
      featuredImage { url width height mimeType fileName }
      author { name bio photo { url } }
      createdAt
      slug
      content { raw markdown text }
      categories { name slug }
    }
  }
`;

/**
 * Same `pdfDeck` Asset selection as CMS use cases (`src/lib/docs/hygraph/use-case-queries.ts`).
 * On `Post`, add an Asset field with API ID **pdfDeck** (same as UseCase) and upload the PDF there.
 * Kept in its own query so missing *other* optional fields never blocks this from merging.
 */
const MERGE_POST_PDF_DECK = gql`
  query MergePostPdfDeck($slug: String!) {
    post(where: { slug: $slug }) {
      pdfDeck {
        id
        url
        fileName
        mimeType
      }
    }
  }
`;

const MERGE_POST_SLIDE_DECK_SLUG = gql`
  query MergePostSlideDeckSlug($slug: String!) {
    post(where: { slug: $slug }) {
      slideDeckSlug
    }
  }
`;

const MERGE_POST_PDF_DECK_URL = gql`
  query MergePostPdfDeckUrl($slug: String!) {
    post(where: { slug: $slug }) {
      pdfDeckUrl
    }
  }
`;

/** Some studios add a PDF deck under API ID `deck` instead of `pdfDeck` (Asset on Post). */
const MERGE_POST_DECK_ASSET = gql`
  query MergePostDeckAsset($slug: String!) {
    post(where: { slug: $slug }) {
      deck {
        id
        url
        fileName
        mimeType
      }
    }
  }
`;

/** Same API ID `deck` when it is a MediaItem reference (PDF / DECK + slug fields). */
const MERGE_POST_DECK_MEDIA_ITEM = gql`
  query MergePostDeckMediaItem($slug: String!) {
    post(where: { slug: $slug }) {
      deck {
        slug
        deckSlug
        slideDeckSlug
        pdfFile {
          id
          url
          fileName
          mimeType
        }
        pdfDeck {
          id
          url
          fileName
          mimeType
        }
      }
    }
  }
`;

/** Alternate single-line slug (registry id) when `slideDeckSlug` is not used. */
const MERGE_POST_DECK_SLUG_FIELD = gql`
  query MergePostDeckSlugField($slug: String!) {
    post(where: { slug: $slug }) {
      deckSlug
    }
  }
`;

/** Alternate registry id field name on Post. */
const MERGE_POST_DECK_ID_FIELD = gql`
  query MergePostDeckIdField($slug: String!) {
    post(where: { slug: $slug }) {
      deckId
    }
  }
`;

/** Some Hygraph models use `slideDeck` (Asset) for uploaded slide PDFs. */
const MERGE_POST_SLIDE_DECK_ASSET = gql`
  query MergePostSlideDeckAsset($slug: String!) {
    post(where: { slug: $slug }) {
      slideDeck {
        id
        url
        fileName
        mimeType
      }
    }
  }
`;

const MERGE_MEDIA_ITEM_SLIDE_DECK_SLUG = gql`
  query MergeMediaItemSlideDeckSlug($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      slideDeckSlug
    }
  }
`;

/**
 * Deck/PDF often live on `MediaItem` (pdfFile, deckSlug) while the article body
 * stays on `Post` — same slug in both. Merge so the blog route matches Studio.
 */
const MERGE_MEDIA_ITEM_BY_POST_SLUG = gql`
  query MergeMediaItemByPostSlug($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      pdfFile {
        id
        url
        fileName
        mimeType
      }
      deckSlug
    }
  }
`;

/** Some projects store the blog PDF on `MediaItem.pdfDeck` instead of `pdfFile`. */
const MERGE_MEDIA_ITEM_PDF_DECK = gql`
  query MergeMediaItemPdfDeck($slug: String!) {
    mediaItem(where: { slug: $slug }) {
      pdfDeck {
        id
        url
        fileName
        mimeType
      }
    }
  }
`;

/** When singular `author` is missing or wrong, Hygraph may still link `authors` (plural). */
const MERGE_POST_AUTHORS = gql`
  query MergePostAuthors($slug: String!) {
    post(where: { slug: $slug }) {
      authors {
        id
        name
        bio
        photo {
          url
        }
      }
    }
  }
`;

/** Optional `writers` relation on `Post` (Hygraph naming varies). */
const MERGE_POST_WRITERS = gql`
  query MergePostWriters($slug: String!) {
    post(where: { slug: $slug }) {
      writers {
        id
        name
        bio
        photo {
          url
        }
      }
    }
  }
`;

function pickAuthorName(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object') {
    if (typeof value.en === 'string' && value.en.trim()) return value.en.trim();
    for (const v of Object.values(value)) {
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
  }
  return '';
}

/** Hygraph `createdBy` is often a workspace member email — never use as article byline. */
function isLikelyEmail(s) {
  const t = (s || '').trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(t);
}

function collectAuthorNameCandidates(post) {
  const out = [];
  if (post.author?.name != null) out.push(post.author.name);
  if (Array.isArray(post.authors)) {
    for (const x of post.authors) {
      if (x?.name != null) out.push(x.name);
    }
  }
  if (Array.isArray(post.writers)) {
    for (const x of post.writers) {
      if (x?.name != null) out.push(x.name);
    }
  }
  return out;
}

function pickDisplayAuthorName(post) {
  for (const raw of collectAuthorNameCandidates(post)) {
    const n = pickAuthorName(raw);
    if (n && !isLikelyEmail(n)) return n;
  }
  return '';
}

function findAuthorRecordForDisplayName(post, displayName) {
  const target = (displayName || '').trim().toLowerCase();
  const match = (rec) => pickAuthorName(rec?.name).toLowerCase() === target;
  if (post.author && match(post.author)) return post.author;
  if (Array.isArray(post.authors)) {
    const hit = post.authors.find((x) => match(x));
    if (hit) return hit;
  }
  if (Array.isArray(post.writers)) {
    const hitW = post.writers.find((x) => match(x));
    if (hitW) return hitW;
  }
  if (post.author && !isLikelyEmail(pickAuthorName(post.author.name))) return post.author;
  if (Array.isArray(post.authors) && post.authors.length > 0) {
    const ok = post.authors.find((x) => !isLikelyEmail(pickAuthorName(x?.name)));
    if (ok) return ok;
  }
  if (Array.isArray(post.writers) && post.writers.length > 0) {
    const okW = post.writers.find((x) => !isLikelyEmail(pickAuthorName(x?.name)));
    if (okW) return okW;
  }
  return post.author || post.authors?.[0] || post.writers?.[0];
}

function normalizePostAuthor(post) {
  if (!post) return;
  const name = pickDisplayAuthorName(post);
  if (!name) {
    const cur = pickAuthorName(post.author?.name);
    if (cur && isLikelyEmail(cur)) {
      post.author = { ...post.author, name: '' };
    }
    return;
  }
  const record = findAuthorRecordForDisplayName(post, name) || {};
  post.author = {
    ...record,
    id: record.id || post.author?.id || post.authors?.[0]?.id || post.writers?.[0]?.id || 'author',
    name,
    bio: record.bio ?? post.author?.bio,
    photo: record.photo ?? post.author?.photo,
  };
}

/**
 * Blog post slugs are often `capri-ceralasertib-olaparib` while the paired `MediaItem`
 * in Hygraph uses the short trial id `capri` — same pattern as `/ledger/{slug}/`.
 */
function trialMediaItemFallbackSlugs(postSlug) {
  const out = [];
  if (!postSlug) return out;
  const p = String(postSlug).replace(/\/+$/, '').trim();
  for (const row of TRIAL_RECEIPT_NAV) {
    const id = row.id;
    if (p !== id && p.startsWith(`${id}-`)) out.push(id);
  }
  return out;
}

/**
 * When a `MediaItem` exists for this slug, it is the canonical deck for trial/blog pairing
 * (Post-level `pdfDeck` / `slideDeckSlug` are often stale or duplicated). Always prefer
 * MediaItem assets and registry slugs over whatever was merged from `Post` earlier.
 */
async function mergeMediaItemDeckBySlug(post, slugKey) {
  try {
    const r = await graphQLClient.request(MERGE_MEDIA_ITEM_BY_POST_SLUG, { slug: slugKey });
    const mi = r?.mediaItem;
    if (mi) {
      const pdf = mi.pdfFile;
      if (pdf?.url) {
        post.pdfDeck = {
          id: pdf.id,
          url: pdf.url,
          fileName: pdf.fileName ?? null,
          mimeType: pdf.mimeType ?? null,
        };
      }
      const ds = typeof mi.deckSlug === 'string' ? mi.deckSlug.trim() : '';
      if (ds) post.slideDeckSlug = ds;
    }
  } catch {
    /* MediaItem or fields not in schema */
  }

  try {
    const r2 = await graphQLClient.request(MERGE_MEDIA_ITEM_SLIDE_DECK_SLUG, { slug: slugKey });
    const alt = r2?.mediaItem?.slideDeckSlug;
    if (typeof alt === 'string' && alt.trim()) post.slideDeckSlug = alt.trim();
  } catch {
    /* slideDeckSlug not on MediaItem */
  }

  try {
    const rDeck = await graphQLClient.request(MERGE_MEDIA_ITEM_PDF_DECK, { slug: slugKey });
    const pd = rDeck?.mediaItem?.pdfDeck;
    if (pd?.url) {
      post.pdfDeck = {
        id: pd.id,
        url: pd.url,
        fileName: pd.fileName ?? null,
        mimeType: pd.mimeType ?? null,
      };
    }
  } catch {
    /* MediaItem.pdfDeck not in schema */
  }
}

const GET_POST_DETAILS_RAW_ONLY = gql`
  query GetPostDetailsRawOnly($slug: String!) {
    post(where: { slug: $slug }) {
      title
      excerpt
      featuredImage { url width height mimeType fileName }
      author { name bio photo { url } }
      createdAt
      slug
      content { raw }
      categories { name slug }
    }
  }
`;

export const getPostDetails = async (slug) => {
  const s = typeof slug === 'string' ? slug.replace(/\/+$/, '').trim() : '';
  if (!graphqlAPI || !s) return null;
  let post = null;
  try {
    const result = await graphQLClient.request(GET_POST_DETAILS_CORE, { slug: s });
    post = result?.post || null;
  } catch (e2) {
    console.warn(`getPostDetails core query failed for ${slug}:`, e2?.message || e2);
    try {
      const result = await graphQLClient.request(GET_POST_DETAILS_RAW_ONLY, { slug: s });
      post = result?.post || null;
    } catch (e3) {
      console.error(`Error fetching post details for ${slug}:`, e3);
      return null;
    }
  }
  if (!post) return null;

  const tryMerge = async (query) => {
    try {
      const r = await graphQLClient.request(query, { slug: s });
      if (r?.post) Object.assign(post, r.post);
    } catch {
      /* field not on Post schema */
    }
  };

  await tryMerge(MERGE_POST_PDF_DECK);
  await tryMerge(MERGE_POST_SLIDE_DECK_SLUG);
  await tryMerge(MERGE_POST_PDF_DECK_URL);

  try {
    const rDeckAsset = await graphQLClient.request(MERGE_POST_DECK_ASSET, { slug: s });
    const d0 = rDeckAsset?.post?.deck;
    if (d0?.url && !post.pdfDeck?.url) {
      post.pdfDeck = {
        id: d0.id,
        url: d0.url,
        fileName: d0.fileName ?? null,
        mimeType: d0.mimeType ?? null,
      };
    }
  } catch {
    /* `deck` is not an Asset (e.g. MediaItem) or field absent */
  }

  try {
    const rDeckMi = await graphQLClient.request(MERGE_POST_DECK_MEDIA_ITEM, { slug: s });
    const d1 = rDeckMi?.post?.deck;
    if (d1 && typeof d1 === 'object') {
      const pdf = d1.pdfFile || d1.pdfDeck;
      if (pdf?.url && !post.pdfDeck?.url) {
        post.pdfDeck = {
          id: pdf.id,
          url: pdf.url,
          fileName: pdf.fileName ?? null,
          mimeType: pdf.mimeType ?? null,
        };
      }
      const ds =
        (typeof d1.deckSlug === 'string' ? d1.deckSlug.trim() : '') ||
        (typeof d1.slideDeckSlug === 'string' ? d1.slideDeckSlug.trim() : '');
      if (ds && !post.slideDeckSlug) post.slideDeckSlug = ds;
    }
  } catch {
    /* `deck` is not a MediaItem or field absent */
  }

  await tryMerge(MERGE_POST_SLIDE_DECK_ASSET);
  if (post.slideDeck?.url && !post.pdfDeck?.url) {
    post.pdfDeck = {
      id: post.slideDeck.id,
      url: post.slideDeck.url,
      fileName: post.slideDeck.fileName ?? null,
      mimeType: post.slideDeck.mimeType ?? null,
    };
  }
  delete post.slideDeck;

  await tryMerge(MERGE_POST_DECK_SLUG_FIELD);
  if (typeof post.deckSlug === 'string') {
    const t = post.deckSlug.trim();
    if (t && !post.slideDeckSlug) post.slideDeckSlug = t;
  }
  delete post.deckSlug;

  await tryMerge(MERGE_POST_DECK_ID_FIELD);
  if (post.deckId != null && !post.slideDeckSlug) {
    const raw = post.deckId;
    let t = '';
    if (typeof raw === 'string') t = raw.trim();
    else if (typeof raw === 'number') t = String(raw);
    else if (typeof raw === 'object' && raw !== null) {
      if (typeof raw.slug === 'string' && raw.slug.trim()) t = raw.slug.trim();
      else if (typeof raw.id === 'string' && raw.id.trim()) t = raw.id.trim();
      else if (typeof raw.id === 'number') t = String(raw.id);
    }
    if (t) post.slideDeckSlug = t;
  }
  delete post.deckId;

  await mergeMediaItemDeckBySlug(post, s);
  /* Trial posts: Hygraph `Post` may carry an outdated `pdfDeck` while the live deck lives on
   * `MediaItem` keyed by short trial id (`capri`). Always merge those slugs so they overwrite Post. */
  for (const altSlug of trialMediaItemFallbackSlugs(s)) {
    await mergeMediaItemDeckBySlug(post, altSlug);
  }

  await tryMerge(MERGE_POST_AUTHORS);
  await tryMerge(MERGE_POST_WRITERS);
  normalizePostAuthor(post);

  return post;
};

/**
 * Next post for the in-article "Next article" CTA.
 * Tries the next post (oldest first after `createdAt`) within any of the same categories.
 * Falls back to the next post anywhere, then to the most recent other post.
 */
/**
 * @param {{ slug: string; createdAt?: string; categorySlugs?: string[] }} [opts]
 */
export const getNextPost = async ({ slug, createdAt, categorySlugs = [] } = {}) => {
  if (!graphqlAPI || !slug) return null;
  const NEXT_IN_CATEGORY = gql`
    query GetNextPostInCategory($slug: String!, $createdAt: DateTime!, $categories: [String!]) {
      posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, createdAt_gt: $createdAt, categories_some: { slug_in: $categories } }
      ) {
        title slug createdAt excerpt
        featuredImage { url }
        categories { name slug }
      }
    }
  `;
  const NEXT_GLOBAL = gql`
    query GetNextPostGlobal($slug: String!, $createdAt: DateTime!) {
      posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, createdAt_gt: $createdAt }
      ) {
        title slug createdAt excerpt
        featuredImage { url }
        categories { name slug }
      }
    }
  `;
  const FALLBACK_RECENT = gql`
    query GetFallbackRecent($slug: String!) {
      posts(first: 1, orderBy: createdAt_DESC, where: { slug_not: $slug }) {
        title slug createdAt excerpt
        featuredImage { url }
        categories { name slug }
      }
    }
  `;

  if (createdAt && Array.isArray(categorySlugs) && categorySlugs.length > 0) {
    try {
      const r = await graphQLClient.request(NEXT_IN_CATEGORY, { slug, createdAt, categories: categorySlugs });
      if (r?.posts?.[0]) return r.posts[0];
    } catch (err) {
      console.warn(`getNextPost (in-category) failed for ${slug}:`, err?.message || err);
    }
  }

  if (createdAt) {
    try {
      const r = await graphQLClient.request(NEXT_GLOBAL, { slug, createdAt });
      if (r?.posts?.[0]) return r.posts[0];
    } catch (err) {
      console.warn(`getNextPost (global) failed for ${slug}:`, err?.message || err);
    }
  }

  try {
    const r = await graphQLClient.request(FALLBACK_RECENT, { slug });
    return r?.posts?.[0] || null;
  } catch (err) {
    console.error(`getNextPost (fallback) failed for ${slug}:`, err);
    return null;
  }
};

export const getSimilarPosts = async (categories, slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, { slug, categories });
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    return [];
  }
};

export const getRecentPosts = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetRecentBlogPosts { # Renamed for clarity
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }   
  `;
  try {
    const result = await graphQLClient.request(query);
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
};

export const getAdjacentPosts = async (createdAt, slug) => {
  if (!graphqlAPI) return { next: null, previous: null };
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, { slug, createdAt });
    return { next: result?.next?.[0] || null, previous: result?.previous?.[0] || null };
  } catch (error) {
    console.error("Error fetching adjacent posts:", error);
    return { next: null, previous: null };
  }
};

export const getCategoryPost = async (slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, { slug });
    return result?.postsConnection?.edges || [];
  } catch (error) {
    console.error(`Error fetching category post for ${slug}:`, error);
    return [];
  }
};

export const getFeaturedPosts = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetFeaturedPosts { # Renamed for clarity
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;
  try {
    const result = await graphQLClient.request(query);
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

export const submitComment = async (obj) => {
  // This function doesn't use graphqlAPI directly, but for consistency with API calls:
  try {
    const result = await fetch('/api/comments', { // Assuming this is a Next.js API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return result.json();
  } catch (error) {
    console.error("Error submitting comment:", error);
    // Depending on expected return type, might throw error or return specific error object
    throw error; // Or return { error: true, message: error.message }
  }
};

export const getComments = async (slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query, { slug });
    return result?.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for ${slug}:`, error);
    return [];
  }
};


/**
 * Fetch published DECK MediaItems from Hygraph.
 * Decks live on the MediaItem type (not Post) — confirmed via schema introspection.
 * Only returns isPublished: true items.
 */
export const getDeckPosts = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetDeckMediaItems {
      mediaItems(where: { type: DECK, isPublished: true }, orderBy: createdAt_DESC) {
        id
        title
        slug
        excerpt
        deckSlug
        deckId
        pdfFile { url fileName mimeType }
        thumbnail { url }
        featuredImage { url }
        isPublished
        type
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query);
    return result?.mediaItems || [];
  } catch (error) {
    console.error('getDeckPosts: MediaItem query failed', error);
    return [];
  }
};
