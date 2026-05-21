/**
 * Verify Hygraph abstracts match app query path.
 * node tools/verify-hygraph-abstracts.mjs
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GraphQLClient } from 'graphql-request';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const ENDPOINT =
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const TOKEN = process.env.HYGRAPH_TOKEN || process.env.GRAPHCMS_TOKEN;

console.log('endpoint:', ENDPOINT ? 'set' : 'MISSING');
console.log('token:', TOKEN ? 'set' : 'MISSING');

if (!ENDPOINT || !TOKEN) {
  console.error('FAIL: missing env');
  process.exit(1);
}

const client = new GraphQLClient(ENDPOINT, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const BARE = `
  query GetResearchAbstractPostsBare {
    posts(
      first: 50
      orderBy: publishedAt_DESC
      where: { categories_some: { slug: "conference-abstracts" } }
    ) {
      id slug title excerpt
    }
  }
`;

const data = await client.request(BARE);
const count = data.posts?.length ?? 0;
console.log('hygraph posts:', count);
if (count >= 5) {
  console.log('OK — app should use source=hygraph when client is configured');
  data.posts.forEach((p) => console.log(' ·', p.slug));
  process.exit(0);
}
console.error('FAIL — expected 5 posts, got', count);
process.exit(1);
