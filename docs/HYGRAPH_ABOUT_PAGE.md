# Hygraph — About page

The `/about` route loads copy and team profiles from your existing Hygraph project (same endpoint as blog: `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` + `GRAPHCMS_TOKEN`).

## Content models used

| Model | Purpose |
|-------|---------|
| **HeroContent** | Hero title + subtitle (match title containing env `NEXT_PUBLIC_HYGRAPH_ABOUT_HERO_TITLE`, default `About`) |
| **Post** | Long-form mission copy (`slug` = env `NEXT_PUBLIC_HYGRAPH_ABOUT_POST_SLUG`, default `about`) |
| **TeamMember** | Team cards: name, role, bio, image, order, stats, links |

## Team members

1. In Hygraph Studio, open **TeamMember** → create or edit entries.
2. Set **order** (lower = first), **name**, **role**, **bio** (rich text), **image** (asset).
3. **Publish** each entry (stage must be `PUBLISHED` on the Content API).
4. Optional **quickStats**: label + value pairs shown on the card.
5. **Links** — use **portfolioAsset** rows:
   - **title**: `LinkedIn`, `GitHub`, `Email`, or `Website` (label is shown on the site).
   - **projectUrl**: full URL (`https://…`) or `mailto:name@domain.com`.

Links can also appear as `<a href="…">` inside **bio** HTML.

## Hero & mission

- **Hero**: create a **HeroContent** entry whose title contains `About` (or your env override).
- **Mission body**: create a **Post** with slug `about` and fill **content** + optional **excerpt** (used as hero description when HeroContent exists).

If CMS entries are missing, the page falls back to static copy in `src/data/about/about-extractor.ts`.

## MCP

Use the **Hygraph MCP Server** tools (`list_entities`, `get_entity_schema`, `create_entry`, `update_entry`, `publish_entry`) on typename `TeamMember`, `HeroContent`, and `Post`.

Example GraphQL (Content API):

```graphql
query AboutPage {
  heroContents(first: 1, where: { title_contains: "About" }) {
    title
    subtitle
  }
  post(where: { slug: "about" }) {
    title
    excerpt
    content { html text }
  }
  teamMembers(first: 20, orderBy: order_ASC) {
    id
    name
    role
    slug
    order
    bio { text html }
    image { url }
    quickStats { label value }
    portfolioAsset { title projectUrl }
  }
}
```
