export type HygraphRichText = {
  html?: string | null;
  text?: string | null;
};

export type CmsTeamMemberLink = {
  label: string;
  url: string;
  kind: 'linkedin' | 'github' | 'email' | 'website' | 'other';
};

export type CmsTeamMemberStat = {
  label: string;
  value: string;
};

export type CmsTeamMember = {
  id: string;
  name: string;
  role: string;
  slug: string | null;
  order: number | null;
  bioText: string;
  bioHtml: string | null;
  imageUrl: string | null;
  stats: CmsTeamMemberStat[];
  links: CmsTeamMemberLink[];
};

export type CmsAboutHero = {
  title: string;
  subtitle: string;
  description: string;
};

export type CmsAboutStory = {
  title: string;
  excerpt: string | null;
  html: string | null;
  text: string | null;
};

export type CmsAboutPageContent = {
  source: 'hygraph' | 'fallback';
  hero: CmsAboutHero;
  story: CmsAboutStory | null;
  teamSectionTitle: string;
  teamSectionSubtitle: string;
  team: CmsTeamMember[];
};
