/**
 * Hygraph queries for `/about`: hero (`HeroContent`), narrative (`Post` slug `about`),
 * and team (`TeamMember` + `portfolioAsset` link convention).
 */

import { fetchWithCache, hygraphClient } from './client';
import type {
  CmsAboutHero,
  CmsAboutPageContent,
  CmsAboutStory,
  CmsTeamMember,
  CmsTeamMemberLink,
  CmsTeamMemberStat,
  HygraphRichText,
} from './about-types';
import { extractAboutHero, extractStorySection } from '@/data/about/about-extractor';

const isHygraphConfigured = !!(
  process.env.HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
);

const ABOUT_POST_SLUG = (process.env.NEXT_PUBLIC_HYGRAPH_ABOUT_POST_SLUG || 'about').trim();
const ABOUT_HERO_TITLE = (process.env.NEXT_PUBLIC_HYGRAPH_ABOUT_HERO_TITLE || 'About').trim();

const GET_ABOUT_PAGE = `
  query GetAboutPage($postSlug: String!, $heroTitle: String!) {
    heroContents(first: 1, where: { title_contains: $heroTitle }) {
      title
      subtitle
    }
    post(where: { slug: $postSlug }) {
      title
      excerpt
      content {
        html
        text
      }
    }
    teamMembers(first: 50, orderBy: order_ASC) {
      id
      name
      role
      slug
      order
      stage
      bio {
        html
        text
      }
      image {
        url
      }
      quickStats {
        label
        value
      }
      portfolioAsset {
        title
        projectUrl
      }
    }
  }
`;

type PortfolioAssetGql = {
  title: string | null;
  projectUrl: string | null;
};

type TeamMemberGql = {
  id: string;
  name: string;
  role: string | null;
  slug: string | null;
  order: number | null;
  stage?: string | null;
  bio: HygraphRichText | null;
  image: { url: string } | null;
  quickStats: { label: string | null; value: string | null }[] | null;
  portfolioAsset: PortfolioAssetGql[] | null;
};

type AboutPageGql = {
  heroContents: { title: string; subtitle: string | null }[];
  post: {
    title: string;
    excerpt: string | null;
    content: HygraphRichText | null;
  } | null;
  teamMembers: TeamMemberGql[];
};

function linkKindFromTitle(title: string): CmsTeamMemberLink['kind'] {
  const t = title.toLowerCase();
  if (t.includes('linkedin')) return 'linkedin';
  if (t.includes('github')) return 'github';
  if (t.includes('email') || t.includes('mail')) return 'email';
  if (t.includes('web') || t.includes('site') || t.includes('portfolio')) return 'website';
  return 'other';
}

function linksFromPortfolio(assets: PortfolioAssetGql[] | null | undefined): CmsTeamMemberLink[] {
  if (!assets?.length) return [];
  const links: CmsTeamMemberLink[] = [];
  for (const asset of assets) {
    const url = asset.projectUrl?.trim();
    if (!url) continue;
    const title = (asset.title || 'Link').trim();
    links.push({
      label: title,
      url: url.startsWith('mailto:') ? url : url,
      kind: linkKindFromTitle(title),
    });
  }
  return links;
}

function linksFromBioHtml(html: string | null | undefined): CmsTeamMemberLink[] {
  if (!html) return [];
  const links: CmsTeamMemberLink[] = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const url = match[1]?.trim();
    const label = (match[2] || url || 'Link').trim();
    if (!url) continue;
    links.push({
      label: label || 'Link',
      url,
      kind: linkKindFromTitle(label + url),
    });
  }
  return links;
}

function dedupeLinks(links: CmsTeamMemberLink[]): CmsTeamMemberLink[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    const key = `${l.kind}:${l.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mapTeamMember(row: TeamMemberGql): CmsTeamMember {
  const bioText = row.bio?.text?.trim() || '';
  const bioHtml = row.bio?.html?.trim() || null;
  const stats: CmsTeamMemberStat[] = (row.quickStats ?? [])
    .filter((s) => s.label && s.value)
    .map((s) => ({ label: s.label!, value: s.value! }));

  const links = dedupeLinks([
    ...linksFromPortfolio(row.portfolioAsset),
    ...linksFromBioHtml(bioHtml),
  ]);

  return {
    id: row.id,
    name: row.name,
    role: row.role?.trim() || '',
    slug: row.slug,
    order: row.order,
    bioText,
    bioHtml,
    imageUrl: row.image?.url ?? null,
    stats,
    links,
  };
}

function fallbackContent(): CmsAboutPageContent {
  const heroStatic = extractAboutHero();
  const storyStatic = extractStorySection();
  return {
    source: 'fallback',
    hero: {
      title: heroStatic.title,
      subtitle: heroStatic.subtitle,
      description: heroStatic.description,
    },
    story: {
      title: storyStatic.title,
      excerpt: storyStatic.subtitle ?? null,
      html: null,
      text: storyStatic.description,
    },
    teamSectionTitle: 'Meet Our Core Team',
    teamSectionSubtitle:
      'CrisPRO is spearheaded by a dedicated team combining deep AI expertise with critical clinical insight.',
    team: [],
  };
}

function buildHero(
  heroRows: AboutPageGql['heroContents'],
  post: AboutPageGql['post'],
  fallback: CmsAboutHero
): CmsAboutHero {
  const cmsHero = heroRows[0];
  if (!cmsHero) return fallback;
  return {
    title: cmsHero.title?.trim() || fallback.title,
    subtitle: cmsHero.subtitle?.trim() || fallback.subtitle,
    description:
      post?.excerpt?.trim() ||
      post?.content?.text?.trim()?.slice(0, 500) ||
      fallback.description,
  };
}

function buildStory(post: AboutPageGql['post'], fallback: CmsAboutStory | null): CmsAboutStory | null {
  if (!post) return fallback;
  return {
    title: post.title,
    excerpt: post.excerpt,
    html: post.content?.html ?? null,
    text: post.content?.text ?? null,
  };
}

/**
 * Loads About page content from Hygraph with static fallbacks when CMS is empty or unavailable.
 */
export async function getAboutPageContent(): Promise<CmsAboutPageContent> {
  const fallback = fallbackContent();

  if (!isHygraphConfigured || !hygraphClient) {
    return fallback;
  }

  try {
    const data = await fetchWithCache<AboutPageGql>(GET_ABOUT_PAGE, {
      postSlug: ABOUT_POST_SLUG,
      heroTitle: ABOUT_HERO_TITLE,
    });

    const publishedTeam = (data.teamMembers ?? []).filter(
      (m) => !m.stage || m.stage === 'PUBLISHED'
    );

    const team = publishedTeam
      .map(mapTeamMember)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    const storyFallback: CmsAboutStory | null = fallback.story;
    const hero = buildHero(data.heroContents ?? [], data.post, fallback.hero);
    const story = buildStory(data.post, storyFallback);

    const hasCms = team.length > 0 || !!data.heroContents?.length || !!data.post;

    return {
      source: hasCms ? 'hygraph' : 'fallback',
      hero,
      story,
      teamSectionTitle: 'Meet the team',
      teamSectionSubtitle: hasCms
        ? 'The people building CrisPRO — clinical, engineering, and design.'
        : fallback.teamSectionSubtitle,
      team,
    };
  } catch (error) {
    console.error('[about] Hygraph fetch failed:', error);
    return fallback;
  }
}
