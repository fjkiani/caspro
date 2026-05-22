'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, FileText, Presentation, ArrowRight, Layers, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { PostNode } from '@/types/blog';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import type { ResearchAbstract } from '@/lib/docs/hygraph/research-abstract-types';
import { abstractHasDeck } from '@/lib/docs/hygraph/research-abstract-deck';
import { plainPreviewText } from '@/lib/research/plain-text';
import {
  researchAbstractHref,
  RESEARCH_SECTIONS,
  RESEARCH_SECTION_LABELS,
  RESEARCH_HUB_TAB_LABELS,
  researchBlogPostPath,
  researchManuscriptPath,
  researchHubTabFromQuery,
  researchHubUrl,
  type ResearchSectionId,
  type ResearchHubTab,
} from '@/lib/research/paths';
import type { DeckMediaItem } from '@/components/research/listings/DecksListing';
import ResearchSectionShell from './ResearchSectionShell';

const AACR_LOGO = 'https://www.aacr.org/wp-content/uploads/2019/01/AACR-Logo-4C.png';

type PreviewItem = {
  title: string;
  href: string;
  subtitle?: string;
  imageUrl?: string | null;
  imageHref?: string;
  badge?: string;
  external?: boolean;
};

const TAB_IDS: ResearchHubTab[] = ['overview', 'blog', 'manuscripts', 'decks', 'abstracts'];

function buildBlogPreviews(posts: PostNode[], limit = 12): PreviewItem[] {
  return posts.slice(0, limit).map((p) => ({
    title: p.title,
    href: researchBlogPostPath(p.slug),
    subtitle: plainPreviewText(p.excerpt),
    imageUrl: p.featuredImage?.url,
    badge: p.categories?.[0]?.name || 'Article',
  }));
}

function manuscriptImage(m: CmsUseCase): string | null {
  if (m.thumbnail?.url) return m.thumbnail.url;
  if (m.heroImage?.url) return m.heroImage.url;
  const pdf = m.manuscriptPdf ?? m.pdfDeck;
  if (pdf?.mimeType?.startsWith('image/') && pdf.url) return pdf.url;
  return null;
}

function buildManuscriptPreviews(manuscripts: CmsUseCase[], limit = 12): PreviewItem[] {
  return manuscripts
    .filter((m) => m.slug)
    .slice(0, limit)
    .map((m) => ({
      title: m.title,
      href: researchManuscriptPath(m.slug!),
      subtitle: plainPreviewText(m.resultsHeadline || m.description),
      imageUrl: manuscriptImage(m),
      badge: 'Manuscript',
    }));
}

function buildDeckPreviews(decks: DeckMediaItem[], limit = 12): PreviewItem[] {
  return decks.slice(0, limit).map((d) => {
    const mime = d.pdfFile?.mimeType || '';
    const isImage = mime.startsWith('image/');
    return {
      title: d.title,
      href: researchBlogPostPath(d.slug),
      subtitle: plainPreviewText(d.excerpt),
      imageUrl: d.thumbnail?.url || d.featuredImage?.url || (isImage ? d.pdfFile?.url : null),
      badge: d.deckSlug ? 'Slides' : 'Deck',
    };
  });
}

function buildAbstractPreviews(abstracts: ResearchAbstract[], limit = 12): PreviewItem[] {
  return abstracts.slice(0, limit).map((a) => {
    const hasDeck = abstractHasDeck(a.deck);
    return {
      title: a.title,
      href: researchAbstractHref(a.slug, a.link, hasDeck),
      subtitle: plainPreviewText(a.authorLine || a.venue || a.bodyText),
      imageUrl: a.imageUrl || AACR_LOGO,
      imageHref: a.aacrImageUrl,
      badge: a.conferenceId ?? (hasDeck ? 'Slides' : a.year ? String(a.year) : 'Abstract'),
      external: !hasDeck && Boolean(a.link?.trim()),
    };
  });
}

function HubTabs({
  activeTab,
  onSelect,
  counts,
  isDarkMode,
}: {
  activeTab: ResearchHubTab;
  onSelect: (tab: ResearchHubTab) => void;
  counts: Record<ResearchSectionId, number>;
  isDarkMode: boolean;
}) {
  const icons: Record<ResearchHubTab, typeof BookOpen> = {
    overview: BookOpen,
    blog: BookOpen,
    manuscripts: Layers,
    decks: Presentation,
    abstracts: FileText,
  };

  return (
    <div className={`border-b ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div role="tablist" className="flex gap-0 overflow-x-auto -mb-px">
          {TAB_IDS.map((id) => {
            const active = activeTab === id;
            const Icon = icons[id];
            const count = id !== 'overview' ? counts[id as ResearchSectionId] : null;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? isDarkMode
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-indigo-600 text-indigo-700'
                    : isDarkMode
                      ? 'border-transparent text-zinc-500 hover:text-zinc-300'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {RESEARCH_HUB_TAB_LABELS[id]}
                {count != null && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] tabular-nums ${
                      active
                        ? isDarkMode
                          ? 'bg-cyan-500/20 text-cyan-200'
                          : 'bg-indigo-100 text-indigo-800'
                        : isDarkMode
                          ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ContentCard({
  item,
  isDarkMode,
  icon: Icon,
}: {
  item: PreviewItem;
  isDarkMode: boolean;
  icon: typeof BookOpen;
}) {
  const shell = isDarkMode
    ? 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'
    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md';

  const showSeparateImageLink = Boolean(
    item.imageUrl && item.imageHref && item.imageHref !== item.href,
  );

  const imageArea = (
    <div className="relative aspect-[5/3] shrink-0 overflow-hidden bg-slate-100 dark:bg-zinc-900">
      {item.imageUrl ? (
        showSeparateImageLink ? (
          <a
            href={item.imageHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full"
            aria-label="Open linked image source"
          >
            <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
          </a>
        ) : (
          <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
        )
      ) : (
        <div className="flex h-full items-center justify-center">
          <Icon className={`h-8 w-8 opacity-25 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
        </div>
      )}
      {item.badge && (
        <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">
          {item.badge}
        </span>
      )}
    </div>
  );

  const textArea = (
    <>
      <h3 className={`text-sm font-semibold leading-snug line-clamp-2 ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
        {item.title}
      </h3>
      {item.subtitle ? (
        <p className={`mt-2 text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          {item.subtitle}
        </p>
      ) : null}
      <span
        className={`mt-auto pt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
        }`}
      >
        {item.external ? 'Open' : 'Read'}
        {item.external ? <ExternalLink className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
      </span>
    </>
  );

  const cardFrame = (
    <div className={`flex h-full flex-col overflow-hidden rounded-lg border transition-all ${shell}`}>
      {imageArea}
      {showSeparateImageLink ? (
        item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-0 flex-1 flex-col p-4"
          >
            {textArea}
          </a>
        ) : (
          <Link href={item.href} className="flex min-h-0 flex-1 flex-col p-4">
            {textArea}
          </Link>
        )
      ) : (
        <div className="flex min-h-0 flex-1 flex-col p-4">{textArea}</div>
      )}
    </div>
  );

  if (showSeparateImageLink) {
    return <div className="block h-full">{cardFrame}</div>;
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardFrame}
      </a>
    );
  }

  return (
    <Link href={item.href} className="block h-full">
      {cardFrame}
    </Link>
  );
}

function FeaturedBlog({
  post,
  isDarkMode,
}: {
  post: PostNode;
  isDarkMode: boolean;
}) {
  const excerpt = plainPreviewText(post.excerpt, 200);
  return (
    <Link
      href={researchBlogPostPath(post.slug)}
      className={`mb-8 grid overflow-hidden rounded-xl border md:grid-cols-2 ${
        isDarkMode ? 'border-zinc-700 bg-zinc-950' : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      <div className="relative min-h-[200px] md:min-h-[240px]">
        {post.featuredImage?.url ? (
          <img src={post.featuredImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'}`} />
        )}
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
          Featured article
        </p>
        <h2 className={`mt-2 text-xl font-bold leading-snug md:text-2xl ${isDarkMode ? 'text-zinc-50' : 'text-slate-900'}`}>
          {post.title}
        </h2>
        {excerpt ? (
          <p className={`mt-3 text-sm leading-relaxed line-clamp-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            {excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

function CardGrid({ items, isDarkMode, icon }: { items: PreviewItem[]; isDarkMode: boolean; icon: typeof BookOpen }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <li key={`${item.href}-${item.title}`} className="min-h-[280px]">
          <ContentCard item={item} isDarkMode={isDarkMode} icon={icon} />
        </li>
      ))}
    </ul>
  );
}

function OverviewPanel({
  previews,
  counts,
  isDarkMode,
  onSelect,
}: {
  previews: Record<ResearchSectionId, PreviewItem[]>;
  counts: Record<ResearchSectionId, number>;
  isDarkMode: boolean;
  onSelect: (tab: ResearchHubTab) => void;
}) {
  const sections: { id: ResearchSectionId; icon: typeof BookOpen; blurb: string }[] = [
    { id: 'blog', icon: BookOpen, blurb: 'Articles and series on AI oncology and precision medicine.' },
    { id: 'manuscripts', icon: Layers, blurb: 'Long-form manuscripts and preprints.' },
    { id: 'decks', icon: Presentation, blurb: 'Slide decks and programmatic posters.' },
    { id: 'abstracts', icon: FileText, blurb: 'Conference abstracts with citations.' },
  ];

  return (
    <div className="space-y-10">
      <p className={`text-sm max-w-xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
        Four collections from the CrisPRO research team. Choose a tab above to focus one lane, or browse previews below.
      </p>
      {sections.map(({ id, icon, blurb }) => (
        <section key={id}>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                {RESEARCH_SECTION_LABELS[id]}
              </h2>
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{blurb}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(id)}
              className={`text-xs font-semibold ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-600 hover:text-indigo-800'}`}
            >
              View all {counts[id]} →
            </button>
          </div>
          {previews[id].length === 0 ? (
            <p className={`text-sm py-8 text-center rounded-lg border ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-500'}`}>
              Nothing published yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {previews[id].slice(0, 3).map((item) => (
                <li key={item.href} className="min-h-[260px]">
                  <ContentCard item={item} isDarkMode={isDarkMode} icon={icon} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function SectionPanel({
  id,
  items,
  count,
  icon,
  isDarkMode,
  featuredBlog,
}: {
  id: ResearchSectionId;
  items: PreviewItem[];
  count: number;
  icon: typeof BookOpen;
  isDarkMode: boolean;
  featuredBlog?: PostNode | null;
}) {
  const intro: Record<ResearchSectionId, string> = {
    blog: 'Articles and series on AI oncology, CRISPR, and precision medicine.',
    manuscripts: 'Long-form manuscripts and preprints from the research team.',
    decks: 'Slide decks and programmatic posters linked to publications.',
    abstracts: 'AACR and conference abstracts with external citations.',
  };

  return (
    <div>
      <p className={`mb-6 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{intro[id]}</p>
      {id === 'blog' && featuredBlog && <FeaturedBlog post={featuredBlog} isDarkMode={isDarkMode} />}
      {items.length === 0 ? (
        <p className={`py-16 text-center text-sm rounded-lg border ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-500'}`}>
          No {RESEARCH_SECTION_LABELS[id].toLowerCase()} published yet.
        </p>
      ) : (
        <CardGrid items={items} isDarkMode={isDarkMode} icon={icon} />
      )}
      {count > 0 && (
        <div className="mt-8 text-center">
          <Link
            href={RESEARCH_SECTIONS[id]}
            className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold ${
              isDarkMode
                ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-900'
                : 'border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            Full {RESEARCH_SECTION_LABELS[id].toLowerCase()} index
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResearchHubOverview({
  initialTab,
  blogPosts,
  manuscripts,
  deckPosts,
  abstracts,
}: {
  initialTab: ResearchHubTab;
  blogPosts: PostNode[];
  manuscripts: CmsUseCase[];
  deckPosts: DeckMediaItem[];
  abstracts: ResearchAbstract[];
}) {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ResearchHubTab>(initialTab);

  useEffect(() => {
    setActiveTab(researchHubTabFromQuery(searchParams?.get('tab')));
  }, [searchParams]);

  const selectTab = useCallback(
    (tab: ResearchHubTab) => {
      setActiveTab(tab);
      router.replace(researchHubUrl(tab), { scroll: false });
    },
    [router],
  );

  const withSlug = manuscripts.filter((m) => m.slug);
  const featuredBlog = blogPosts[0] ?? null;
  const blogPanelPosts = featuredBlog ? blogPosts.slice(1) : blogPosts;

  const previews = useMemo(
    () => ({
      blog: buildBlogPreviews(blogPanelPosts),
      manuscripts: buildManuscriptPreviews(manuscripts),
      decks: buildDeckPreviews(deckPosts),
      abstracts: buildAbstractPreviews(abstracts),
    }),
    [blogPanelPosts, manuscripts, deckPosts, abstracts],
  );

  const overviewPreviews = useMemo(
    () => ({
      blog: buildBlogPreviews(blogPanelPosts, 3),
      manuscripts: buildManuscriptPreviews(manuscripts, 3),
      decks: buildDeckPreviews(deckPosts, 3),
      abstracts: buildAbstractPreviews(abstracts, 3),
    }),
    [blogPanelPosts, manuscripts, deckPosts, abstracts],
  );

  const counts: Record<ResearchSectionId, number> = {
    blog: blogPosts.length,
    manuscripts: withSlug.length,
    decks: deckPosts.length,
    abstracts: abstracts.length,
  };

  const icons: Record<ResearchSectionId, typeof BookOpen> = {
    blog: BookOpen,
    manuscripts: Layers,
    decks: Presentation,
    abstracts: FileText,
  };

  return (
    <ResearchSectionShell chrome={{ variant: 'hub' }}>
      <HubTabs activeTab={activeTab} onSelect={selectTab} counts={counts} isDarkMode={isDarkMode} />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {activeTab === 'overview' && (
          <OverviewPanel previews={overviewPreviews} counts={counts} isDarkMode={isDarkMode} onSelect={selectTab} />
        )}
        {activeTab === 'blog' && (
          <SectionPanel
            id="blog"
            items={previews.blog}
            count={counts.blog}
            icon={icons.blog}
            isDarkMode={isDarkMode}
            featuredBlog={featuredBlog}
          />
        )}
        {activeTab === 'manuscripts' && (
          <SectionPanel id="manuscripts" items={previews.manuscripts} count={counts.manuscripts} icon={icons.manuscripts} isDarkMode={isDarkMode} />
        )}
        {activeTab === 'decks' && (
          <SectionPanel id="decks" items={previews.decks} count={counts.decks} icon={icons.decks} isDarkMode={isDarkMode} />
        )}
        {activeTab === 'abstracts' && (
          <SectionPanel id="abstracts" items={previews.abstracts} count={counts.abstracts} icon={icons.abstracts} isDarkMode={isDarkMode} />
        )}
      </div>
    </ResearchSectionShell>
  );
}
